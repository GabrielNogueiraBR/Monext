/* eslint-disable no-undef */
const socket = io('http://localhost:3000/country');

/**
 * Function responsible for receiving an offset and a list of
 * country-type objects and creating the screen based on past data.

 * @param {Number} offSet
 * @param {Object} countries
 */
function inicializeCountryConfig(offSet, countries) {
  console.log(offSet);
  console.log(countries);
  console.log(countries[offSet]);
}

// ================ SOCKET ================

socket.on('inicializeCountryConfig', (offSet, countries) => inicializeCountryConfig(offSet, countries));
