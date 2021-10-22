/* eslint-disable no-undef */
const socket = io('http://localhost:3000/country');
let offSetInstance;
let countryInstance;

/**
 * Function responsible for receiving an offset and a list of
 * country-type objects and creating the screen based on past data.

 * @param {Number} offSet
 * @param {Object} countries
 */
function inicializeCountryConfig(offSet, countries) {
  countryInstance = countries[offSet];
  console.log(countryInstance);

  const countryName = document.getElementById('country-name');
  const convertValue = document.getElementById('convert-value');
  const currencyName = document.getElementById('currency');
  const dateTime = document.getElementById('datetime-country');
  const timezone = document.getElementById('timezone-country');
  const capital = document.getElementById('capital-country');

  countryName.innerHTML = countryInstance.name;
  convertValue.innerHTML = `${countryInstance.currency} 0000`;
  currencyName.innerHTML = `${countryInstance.currency} - nome completo`;
  dateTime.innerHTML = countryInstance.timezone;
  timezone.innerHTML = 'GMT -3 (COLOCAR)';
  capital.innerHTML = `0 ºC ${countryInstance.capital}`;
}

// ================ SOCKET ================

socket.on('inicializeCountryConfig', (offSet, countries) => {
  offSetInstance = offSet;
  inicializeCountryConfig(offSet, countries);
});

socket.on('updateCountryConfig', (countries) => {
  inicializeCountryConfig(offSetInstance, countries);
});

socket.on('updateCountryWithOffset', (value, countries) => {
  offSetInstance += value;

  if (offSetInstance < 0) offSetInstance = countries.length - 1;
  if (offSetInstance > countries.length - 1) offSetInstance = 0;

  inicializeCountryConfig(offSetInstance, countries);
});

socket.on('updateOffSetController', (value) => {
  const infoContainer = document.getElementById('info-container');
  const countryContainer = document.getElementById('country-container');

  // choosing the movement
  switch (value) {
    case -2:
      // move big left
      infoContainer.classList.add('slideOutBigRight');
      countryContainer.classList.add('backgroundTransition');
      break;
    case -1:
      infoContainer.classList.add('slideOutRight');
      countryContainer.classList.add('backgroundTransition');
      break;
    case 1:
      // move right
      infoContainer.classList.add('slideOutLeft');
      countryContainer.classList.add('backgroundTransition');
      break;
    case 2:
      // move big right
      infoContainer.classList.add('slideOutBigLeft');
      countryContainer.classList.add('backgroundTransition');
      break;
    default:
      // move to home
      console.log('move to home');
      break;
  }

  setTimeout(() => {
    infoContainer.classList.remove('slideOutRight');
    infoContainer.classList.remove('slideOutLeft');
    infoContainer.classList.remove('slideOutBigRight');
    infoContainer.classList.remove('slideOutBigLeft');
    countryContainer.classList.remove('backgroundTransition');
  }, 1500);
});
