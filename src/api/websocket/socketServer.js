const { io } = require('../../http');

const countryPageMock = require('../mock/country-page');

// Create an list of countries by default in mock
let listCountries = countryPageMock;

// Create an list of sockets by type
const sockets = {
  home: [],
  country: [],
  controller: [],
};

// Create an offSet for controller
let offSetController = 0;

// ================ NAMESPACE FORM ================
io.of('/home').on('connection', (socket) => {
  const socketsNamespace = sockets.home;

  // Add connection to list of sockets
  socketsNamespace.push(socket.id);

  // When a form send an update of countries
  socket.on('updateCountries', (countries) => {
    listCountries = countries; // Update list with User options

    // Update all country-page by the new list of countries using their namespace
    io.of('country').emit('updateCountryConfig', listCountries);

    // Message on log for debbug
    console.log('countries mounted 😎: ');
    if (Array.isArray(listCountries)) {
      listCountries.map((e) => console.log(`${listCountries.indexOf(e)} - ${e.name}`));
    }
  });

  // Remove socket from list of sockets during disconnecting
  socket.on('disconnecting', () => {
    socketsNamespace.pop(socket.id);
  });
});

// ================ NAMESPACE COUNTRY PAGE ================
io.of('country').on('connection', (socket) => {
  const socketsNamespace = sockets.country;

  // Add connection to list of sockets
  socketsNamespace.push(socket.id);

  // Declare offSet of instance page by its identifier on list
  const offSet = socketsNamespace.indexOf(socket.id);

  // Send data for new page of countries with offset and a list of countries
  socket.emit('inicializeCountryConfig', offSet + offSetController, listCountries);

  // When all pages complete a transition animation of change country
  socket.on('transitionCompleted', () => {
    // Emit an event for controller, enabling the button of offset
    io.of('controller').emit('transitionCompleted');
  });
});

// ================ NAMESPACE CONTROLLER ================
io.of('controller').on('connection', (socket) => {
  const socketsNamespace = sockets.controller;

  // Add connection to list of sockets
  socketsNamespace.push(socket.id);

  // When controller send a event of change on offset
  socket.on('sendOffSetController', (value) => {
    // Emit an event for update countries on pages slides
    io.of('country').emit('updateOffSetController', value);

    // Update offset of controller
    offSetController += value;
  });

  // When a socket is disconnecting
  socket.on('disconnecting', () => {
    // Remove socket from list of sockets during disconnecting
    socketsNamespace.pop(socket.id);
  });
});
