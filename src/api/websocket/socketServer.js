const { io } = require('../../http');
const { CountriesService } = require('../services/countriesService');

const serviceCountries = new CountriesService(); // Create service country

// Create an list of countries by default
let listCountries = serviceCountries.createAllCountriesFromMock();

// Create an list of sockets by type
const sockets = {
  form: [],
  country: [],
  controller: [],
};

// Create an offSet for controller
let offSetController = 0;

// ================ NAMESPACE FORM ================
io.of('/form').on('connection', (socket) => {
  const socketsNamespace = sockets.form;

  // Add connection to list of sockets
  socketsNamespace.push(socket.id);

  socket.on('updateCountries', (countries) => {
    listCountries = countries; // Update list with User options

    io.of('country').emit('updateCountryConfig', listCountries); // Update all country-page by list
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

  // Declare offSet of instance page
  const offSet = socketsNamespace.indexOf(socket.id);
  console.log(`offSet: ${offSet}`);
  console.log(`offSetController: ${offSetController}`);
  // Send country information
  socket.emit('inicializeCountryConfig', offSet + offSetController, listCountries);
});

// ================ NAMESPACE CONTROLLER ================
io.of('controller').on('connection', (socket) => {
  const socketsNamespace = sockets.controller;

  // Add connection to list of sockets
  socketsNamespace.push(socket.id);

  // Event for change offset
  socket.on('sendOffSetController', (value) => {
    io.of('country').emit('updateOffSetController', value);

    offSetController += value;
  });

  // Remove socket from list of sockets during disconnecting
  socket.on('disconnecting', () => {
    socketsNamespace.pop(socket.id);
  });
});