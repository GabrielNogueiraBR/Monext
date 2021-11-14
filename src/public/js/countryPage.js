/* eslint-disable no-undef */
const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const socket = io(`${url}/country`);

let offSetInstance;
let offSetController = 0;
let countryInstance;
let listCountries;

const Direction = {
  BIG_LEFT: -2,
  LEFT: -1,
  HOME: 0,
  RIGHT: 1,
  BIG_RIGHT: 2,
};

function calculateOffSet(value) {
  if (offSetController + value + offSetInstance < 0) {
    return calculateOffSet(value + listCountries.length);
  }
  if (offSetController + value + offSetInstance >= listCountries.length) {
    return calculateOffSet(value - listCountries.length);
  }
  return value;
}

function whiteSwatch(swatch) {
  return (swatch[0] > 190 && swatch[1] > 190 && swatch[2] > 190);
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
  const img = new Image();
  img.src = countryInstance.flag;

  if (img.complete) {
    // eslint-disable-next-line no-use-before-define
    setBackgroudColorFade();
  } else {
    img.addEventListener('load', () => {
      // eslint-disable-next-line no-use-before-define
      setBackgroudColorFade();
    });
  }

  function setBackgroudColorFade() {
    let dominantColor = colorThief.getColor(img);
    let palette = colorThief.getPalette(img);

    palette = palette.filter((swatch) => !whiteSwatch(swatch));

    // eslint-disable-next-line prefer-destructuring
    if (whiteSwatch(dominantColor)) dominantColor = palette[0];

    // eslint-disable-next-line max-len
    countryContainer.style.background = `linear-gradient(to top,rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]}) 0%, #fff 80%)`;
  }
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
  const infoContainer = document.getElementById('info-container');
  const countryContainer = document.getElementById('country-container');

  // choosing the movement
  switch (value) {
    case Direction.BIG_LEFT:
      // move big left
      console.log('move big left');
      infoContainer.classList.add('slideOutBigRight');
      countryContainer.classList.add('backgroundTransition');
      break;
    case Direction.LEFT:
      // move left
      console.log('move left');
      infoContainer.classList.add('slideOutRight');
      countryContainer.classList.add('backgroundTransition');
      break;
    case Direction.RIGHT:
      // move right
      console.log('move right');      
      infoContainer.classList.add('slideOutLeft');
      countryContainer.classList.add('backgroundTransition');
      break;
    case Direction.BIG_RIGHT:
      // move big right
      console.log('move big right');
      infoContainer.classList.add('slideOutBigLeft');
      countryContainer.classList.add('backgroundTransition');           
      break;
    default:
      // move to home
      console.log('move to home');
      break;
  }

  setTimeout(() => { 
    offSetController += calculateOffSet(value);
    displayCountry(offSetController + offSetInstance, listCountries);
  }, 500);
   
  setTimeout(() => {
    infoContainer.classList.remove('slideOutRight');
    infoContainer.classList.remove('slideOutLeft');
    infoContainer.classList.remove('slideOutBigRight');
    infoContainer.classList.remove('slideOutBigLeft');
    countryContainer.classList.remove('backgroundTransition');
    socket.emit('transitionCompleted');
  }, 1200);
});
