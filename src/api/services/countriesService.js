/* eslint-disable class-methods-use-this */
const FetchDataService = require('../helpers/fetchDataService');
const countriesMocked = require('../mock/countries');
const currenciesMocked = require('../mock/currency');
const timezoneMocked = require('../mock/timezone');
const Country = require('../models/country');

const fetchService = new FetchDataService();

const CountriesSet = new Set([
  'Argentina',
  'Brazil',
  'Canada',
  'China',
  'Italy',
  'Japan',
  'Mexico',
  'Russia',
  'United Kingdom',
  'United States',
]);

class CountriesService {
  constructor() {
    this.countriesMocked = countriesMocked;
    this.currenciesMocked = currenciesMocked;
  }

  async createAllCountries(countryName, valueConversion) {
    return this.findCountriesData(countryName);
  }

  createAllCountriesFromMock() {
    // Return array of Country objects
    return this.countriesMocked.map((mock) => {
      const country = new Country();
      country.name = mock.name;
      country.capital = mock.capital;
      country.symbol = mock.iso2Code;
      country.flag = mock.flag;
      country.currency = mock.currency;
      country.timezone = mock.timezone;
      country.temperature = 0;

      return country;
    });
  }

  async findCountriesData(countryName) {
    const countriesCapital = await fetchService.fetchCountriesCapital(CountriesSet);
    const countriesCurrency = await fetchService.fetchCountriesCurrency(CountriesSet);
    const baseCurrency = countriesCurrency.find((country) => country.name === countryName).currency;
    const countriesExchange = await fetchService.fetchExchangeApi(baseCurrency, countriesCurrency);
    const weatherCapitals = await fetchService.fetchWeatherApi(countriesCapital);

    return {
      countriesCapital,
      countriesCurrency,
      countriesExchange,
      weatherCapitals,
      timezoneMocked,
    };
  }

  findCurrencyValueInMock(currencyParam) {
    return this.currenciesMocked.data[currencyParam];
  }
}

module.exports = { CountriesService };
