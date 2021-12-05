/* eslint-disable no-undef */
const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const socket = io(`${url}/country`);

/**
 * Variables to control the offset of the page (instance),
 * offset of controller, the country what is showing now and
 * a list of all countries on application.
 */
let offSetInstance;
let offSetController = 0;
let countryInstance;
let listCountries;

/**
 * Constant to store all possible moviments receive from
 * controller actions. This will be used for make animation
 * of transation.
 */
const Direction = {
  BIG_LEFT: -2,
  LEFT: -1,
  HOME: 0,
  RIGHT: 1,
  BIG_RIGHT: 2,
};

/**
 * This function is responsible for calculate the new value
 * of offset based on circular queue. This way, we use a recursive
 * function to find the offset between 0 and last country index
 * on array.
 *
 * @param {int} value New offset to country page.
 *
 * @author Gabriel Nogueira
 * @returns {int} new offset to add on controller offset.
 */
function calculateOffSet(value) {
  if (offSetController + value + offSetInstance < 0) {
    return calculateOffSet(value + listCountries.length);
  }
  if (offSetController + value + offSetInstance >= listCountries.length) {
    return calculateOffSet(value - listCountries.length);
  }
  return value;
}

/**
 * This function is responsible for verify if the color dominant
 * on the country's flag is like to white color.If the domintant color
 * is nearby to white color, we return false. In this case, we consider
 * RBG(190,190,190) as white for more accuracy.
 *
 * @param {Object} swatch Array with 3 items representing RBG(a,b,c).
 *
 * @author Raul Ryan
 * @returns {boolean} return true or false if the color is near white color or not.
 */
function whiteSwatch(swatch) {
  return (swatch[0] > 190 && swatch[1] > 190 && swatch[2] > 190);
}

/**
 * This function is responsible for display on screen of user the country information,
 * like currency, datetime, temperature and other things.
 *
 * @param {int} offSet offset of country to be displayed on array of contries.
 * @param {Array} countries array of all countries available on application.
 */
function displayCountry(offSet, countries) {
  // Receiving the countries information
  listCountries = countries;
  // Get country to be displayed based on offset
  countryInstance = countries[offSet];

  // Getting elements HTML using Javascript
  const countryName = document.getElementById('country-name');
  const convertValue = document.getElementById('convert-value');
  const currencyName = document.getElementById('currency');
  const dateTime = document.getElementById('datetime-country');
  const timezone = document.getElementById('timezone-country');
  const capital = document.getElementById('capital-country');
  const flag = document.getElementById('country-flag');
  const countryContainer = document.getElementById('country-container');

  // Insert of all informations of country on HTML page using Javascript
  flag.style.backgroundImage = `url(${countryInstance.flag})`;
  countryName.innerHTML = countryInstance.name;
  convertValue.innerHTML = `${countryInstance.currencyAcronym} ${countryInstance.exchange}`;
  currencyName.innerHTML = `${countryInstance.currencyAcronym} - ${countryInstance.currencyName}`;
  dateTime.innerHTML = countryInstance.date;
  timezone.innerHTML = `GMT ${countryInstance.gmt}`;
  capital.innerHTML = `${countryInstance.temperature} °C ${countryInstance.capital}`;

  // Using the library Color Thief to get the dominant color of the country's flag
  // Repository of the library -> (https://github.com/lokesh/color-thief)
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

  /**
   * This function is responsible to get the dominant color on country's flag
   * and set this color on background of page. This way, the background will be
   * changed by the country displayed.
   *
   * @author Raul Ryan
   */
  function setBackgroudColorFade() {
    // getting the dominant color using the lib Color Thief
    let dominantColor = colorThief.getColor(img);
    // getting the palette color of country's flag using the lib Color Thief
    let palette = colorThief.getPalette(img);

    // Filtering the palette to find all colors different to white
    palette = palette.filter((swatch) => !whiteSwatch(swatch));

    // eslint-disable-next-line prefer-destructuring
    if (whiteSwatch(dominantColor)) dominantColor = palette[0]; // when dominant color is near white

    // eslint-disable-next-line max-len
    countryContainer.style.background = `linear-gradient(to top,rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]}) 0%, #fff 80%)`;
  }
}

/**
 * This function is responsible for receive initial informations about offset and countries.
 * After that, this function will call another to display a initial country.
 *
 * @param {int} offSet offset of country to be displayed on array of contries.
 * @param {Array} countries array of all countries available on application.
 *
 * @author Gabriel Nogueira
 */
function inicializeCountryConfig(offSet, countries) {
  listCountries = countries;
  offSetInstance = 0;
  offSetInstance = calculateOffSet(offSet);
  displayCountry(offSetInstance, listCountries);
}

// ================ SOCKET ================

// When the socket listen an event to initialize a country config on the page
socket.on('inicializeCountryConfig', (offSet, countries) => inicializeCountryConfig(offSet, countries));

// When the socket listen an event to update all countries information
socket.on('updateCountryConfig', (countries) => {
  // update countries information
  listCountries = countries;
  // display on the screen the new configuration
  displayCountry(offSetInstance, countries);
});

// When socket listen an event to update the value of offset of controller
socket.on('updateOffSetController', (value) => {
  // Elements HTML
  const infoContainer = document.getElementById('info-container');
  const countryContainer = document.getElementById('country-container');

  // choosing the movement based on past value
  switch (value) {
    case Direction.BIG_LEFT:
      // adding to the elements the class responsible for make animation of transition
      infoContainer.classList.add('slideOutBigRight');
      countryContainer.classList.add('backgroundTransition');
      break;
    case Direction.LEFT:
      // adding to the elements the class responsible for make animation of transition
      infoContainer.classList.add('slideOutRight');
      countryContainer.classList.add('backgroundTransition');
      break;
    case Direction.RIGHT:
      // adding to the elements the class responsible for make animation of transition
      infoContainer.classList.add('slideOutLeft');
      countryContainer.classList.add('backgroundTransition');
      break;
    case Direction.BIG_RIGHT:
      // adding to the elements the class responsible for make animation of transition
      infoContainer.classList.add('slideOutBigLeft');
      countryContainer.classList.add('backgroundTransition');
      break;
    default:
      // do nothing
      break;
  }

  /**
   * This setTimeout is used to change value just after the animation
   * is playing.
   */
  setTimeout(() => {
    offSetController += calculateOffSet(value);
    displayCountry(offSetController + offSetInstance, listCountries);
  }, 500);

  /**
   * This setTimeout is used to remove from elements HTML the
   * animation of transition after the time past.
   */
  setTimeout(() => {
    infoContainer.classList.remove('slideOutRight');
    infoContainer.classList.remove('slideOutLeft');
    infoContainer.classList.remove('slideOutBigRight');
    infoContainer.classList.remove('slideOutBigLeft');
    countryContainer.classList.remove('backgroundTransition');
    socket.emit('transitionCompleted');
  }, 1200);
});
