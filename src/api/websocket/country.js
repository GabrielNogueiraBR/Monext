const { io } = require('../../http');
const { CountriesService } = require('../services/countriesService');

const serviceCountries = new CountriesService(); // Create service country

// Create a list of countries by default
let listCountries = serviceCountries.createAllCountriesFromMock();

io.on('connection', (socket) => {
  socket.emit('sendCountriesFromServer', listCountries);

  socket.on('sendCountries', (countries) => {
    listCountries = countries; // Update list with User params
  });
});

io.on('envia-para-servidor', (args) => {
  io.broadcast.emit('send-control', args);
});
