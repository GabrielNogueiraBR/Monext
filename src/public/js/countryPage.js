/* eslint-disable no-undef */
const socket = io('http://localhost:3000/country');
let offSetInstance;
let offSetController = 0;
let countryInstance;
let listCountries;

function calculateOffSet(value) {
  if (offSetController + value + offSetInstance < 0) {
    return calculateOffSet(value + listCountries.length);
  }
  if (offSetController + value + offSetInstance >= listCountries.length) {
    return calculateOffSet(value - listCountries.length);
  }
  return value;
}

function displayCountry(offSet, countries) {
  listCountries = countries;
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

function inicializeCountryConfig(offSet, countries) {
  listCountries = countries;
  offSetInstance = 0;
  offSetInstance = calculateOffSet(offSet);
  displayCountry(offSetInstance, listCountries);
}

// ================ SOCKET ================

socket.on('inicializeCountryConfig', (offSet, countries) => inicializeCountryConfig(offSet, countries));

socket.on('updateCountryConfig', (countries) => {
  listCountries = countries;
  displayCountry(offSetInstance, countries);
});

socket.on('updateOffSetController', (value) => {
  // choosing the movement
  switch (value) {
    case -2:
      // move big left
      console.log('move big left');
      offSetController += calculateOffSet(value);
      displayCountry(offSetController + offSetInstance, listCountries);
      break;
    case -1:
      // move left
      console.log('move left');
      offSetController += calculateOffSet(value);
      displayCountry(offSetController + offSetInstance, listCountries);
      break;
    case 1:
      // move right
      console.log('move right');
      offSetController += calculateOffSet(value);
      displayCountry(offSetController + offSetInstance, listCountries);
      break;
    case 2:
      // move big right
      console.log('move big right');
      offSetController += calculateOffSet(value);
      displayCountry(offSetController + offSetInstance, listCountries);
      break;
    default:
      // move to home
      console.log('move to home');
      break;
  }
});
