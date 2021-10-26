/* eslint-disable no-undef */
const socket = io('http://localhost:3000/country');

const Direction = {
  BIG_LEFT: -2,
  LEFT: -1,
  HOME: 0,
  RIGHT: 1,
  BIG_RIGHT: 2,
};

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
  const lastCountryIndex = countries.length - 1;

  let offSetAux = 0;
  if ((offSetInstance === lastCountryIndex || offSetInstance === 0)
     && (value === Direction.BIG_LEFT || value === Direction.BIG_RIGHT)) {
    offSetAux = 1;
  }

  offSetInstance += value;

  if (offSetInstance < 0) {
    offSetInstance = lastCountryIndex - offSetAux;
  } else if (offSetInstance > lastCountryIndex) {
    offSetInstance = 0 + offSetAux;
  }

  inicializeCountryConfig(offSetInstance, countries);
});

socket.on('updateOffSetController', (value) => {
  const infoContainer = document.getElementById('info-container');
  const countryContainer = document.getElementById('country-container');

  // choosing the movement
  switch (value) {
    case Direction.BIG_LEFT:
      // move big left
      infoContainer.classList.add('slideOutBigRight');
      countryContainer.classList.add('backgroundTransition');
      break;
    case Direction.LEFT:
      infoContainer.classList.add('slideOutRight');
      countryContainer.classList.add('backgroundTransition');
      break;
    case Direction.RIGHT:
      // move right
      infoContainer.classList.add('slideOutLeft');
      countryContainer.classList.add('backgroundTransition');
      break;
    case Direction.BIG_RIGHT:
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
  }, 1200);
});
