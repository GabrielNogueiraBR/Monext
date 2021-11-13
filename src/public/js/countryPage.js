/* eslint-disable no-undef */
const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const socket = io(`${url}/country`);

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
  const flag = document.getElementById('country-flag');
  const countryContainer = document.getElementById('country-container');

  countryName.innerHTML = countryInstance.name;
  convertValue.innerHTML = `${countryInstance.currency} 0000`;
  currencyName.innerHTML = `${countryInstance.currency} - nome completo`;
  dateTime.innerHTML = countryInstance.timezone;
  timezone.innerHTML = 'GMT -3 (COLOCAR)';
  capital.innerHTML = `0 ºC ${countryInstance.capital}`;
  flag.style.backgroundImage = `url(${countryInstance.flag})`;

  const colorThief = new ColorThief();
  let img = new Image();
  img.src = countryInstance.flag;
  
  if(img.complete){
    setBackgroudColorFade();
  } else {
    img.addEventListener('load', function() {
      setBackgroudColorFade();
    });
  }

  function setBackgroudColorFade() {
    let dominantColor = colorThief.getColor(img);
    let palette = colorThief.getPalette(img);

    palette = palette.filter(swatch => !whiteSwatch(swatch));

    if (whiteSwatch(dominantColor))
      dominantColor = palette[0];

    countryContainer.style.background = `linear-gradient(to top,rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]}) 0%, #fff 80%)`;
  }
}

function whiteSwatch(swatch){
  return (swatch[0] > 190 && swatch[1] > 190 && swatch[2] > 190);
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
