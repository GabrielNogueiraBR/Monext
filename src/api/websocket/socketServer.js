const { io } = require('../../http');

const countryPageMock = require('../mock/country-page');

// Create an list of countries by default in mock
let listCountries = countryPageMock;

// Create an list of sockets by type
const sockets = {
  home: [],
  country: {
    list: [],
    connections: 0,
  },
  controller: [],
};

// Create an offSet for controller
let offSetController = 0;

// Controll the sending of events via socket about offset
let isInTransition = false;

/**
 * This function is responsible for send information about offset
 * on country page using socket with namespaces.
 *
 * @param {int} value value of offset
 * @author Gabriel Nogueira
 */
async function sendingOffSet(value) {
  // If another event already was sent then we return function to await
  if (isInTransition || sockets.country.connections === 0) {
    if (sockets.country.connections === 0) {
      isInTransition = false;
    }
    return;
  }

  // for block others calls
  isInTransition = true;

  // Emitting the event to all sockets on namespace 'country'
  io.of('country').emit('updateOffSetController', value);

  // Update offset of controller
  offSetController += value;
}

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
  // Add connection to list of sockets
  sockets.country.list.push(socket.id);
  sockets.country.connections += 1;

  // Declare offSet of instance page by its identifier on list
  const offSet = sockets.country.list.indexOf(socket.id);

  // Send data for new page of countries with offset and a list of countries
  socket.emit('inicializeCountryConfig', offSet + offSetController, listCountries);

  // When all pages complete a transition animation of change country
  socket.on('transitionCompleted', () => {
    isInTransition = false;

    // Emit an event for controller, enabling the button of offset
    io.of('controller').emit('transitionCompleted');
  });

  // Remove socket from list of sockets during disconnecting
  socket.on('disconnecting', () => {
    sockets.country.connections -= 1;
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
    sendingOffSet(value);
  });

  // When a socket is disconnecting
  socket.on('disconnecting', () => {
    // Remove socket from list of sockets during disconnecting
    socketsNamespace.pop(socket.id);
  });
});

/**
 * This function is responsible for make the country page and controller
 * offSet automatic increment after x seconds by passing on paramter
 * the value of seconds we want.
 *
 * @param {int} time time in seconds for automatic navigation.
 * @author Gabriel Nogueira
 */
async function automaticNavigation(time) {
  await setTimeout(() => {
    sendingOffSet(1);
    automaticNavigation(time);
  }, time * 1000);
}

// Automatic navigation after 30 seconds
automaticNavigation(30);
