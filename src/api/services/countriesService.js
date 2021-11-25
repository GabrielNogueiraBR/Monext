/* eslint-disable class-methods-use-this */
const moment = require('moment');

const FetchDataService = require('../helpers/fetchDataService');
const countriesMocked = require('../mock/countries');
const currenciesMocked = require('../mock/currency');
const timezoneMocked = require('../mock/timezone');
const Country = require('../models/country');

const fetchService = new FetchDataService();

/**
 * Set of countries supported by this application.
 */
const CountriesSet = [
  'Argentina',
  'Brazil',
  'Canada',
  'China',
  'Italy',
  'Mexico',
  'Japan',
  'Russia',
  'United Kingdom',
  'United States',
];

/**
 * Class responsible to handle hard data
 * and build the object what goes compose the country screen.
 */
class CountriesService {
  /**
   * "Public" method to create all countries.
   * @param {string} countryName Base cuntry name.
   * @param {number} valueConversion Value to be converted.
   * @returns Array of countries object.
   */
  async createAllCountries(countryName, valueConversion) {
    // Fetch all necessary data to compose country object.
    const countriesData = await this.findCountriesData(countryName, CountriesSet);
    // Group all countries data by country name.
    const groupedData = this.groupDataByCountry(countryName, countriesData);
    // Definitely build countries object.
    const countriesObject = this.buildCountryObject(groupedData, valueConversion);
    // Return array of countries.
    return countriesObject;
  }

  /**
   * Build Country object by grouped countries data.
   * @param {*} countriesData Grouped countries.
   * @param {number} valueConversion Value to be converted.
   * @returns {Country} Array of Country objects.
   */
  buildCountryObject(countriesData, valueConversion) {
    const countries = countriesData.map((data) => {
      const { timezone, weather } = data;

      // Flag path in internal project for current country.
      const { flag } = countriesMocked.find((mock) => mock.name === data.country);

      // Currency name (not acronym) from mock.
      const { currencyName } = currenciesMocked.find((mock) => mock.countryName === data.country);
      const valueConverted = valueConversion * data.exchange;

      // Applying the GMT offset for the respective country and format.
      const date = moment().utcOffset(parseInt(timezone.gmt, 10)).format('DD/MM/YYYY HH:mm:ss');

      // Build Country object that will provide the necessary data for the countries-page.
      const country = new Country(
        data.country,
        data.capital,
        data.currencyAcronym,
        currencyName,
        valueConverted.toFixed(2),
        flag,
        date,
        timezone.gmt,
        weather.temp_c,
      );

      return country;
    });
    return countries;
  }

  /**
   * Group country data by your country.
   * @param {string} countryName Name of selected country, comes from request.
   * @param {*} countriesData Hard data from external APIs.
   * @returns Data grouped by country name.
   */
  groupDataByCountry(countryName, countriesData) {
    const grouped = [];

    // countriesCapital is defined in findCountriesData method.
    countriesData.countriesCapital.forEach((data) => {
      const aux = {};

      // Find currency acronym.
      const { currency: currencyAcronym } = countriesData.countriesCurrency.find((country) => country.name === data.name);

      let exchange;

      // If the country analyzed is the same as the one you chose, you must assign 1 for the exchange, as it is 1:1
      if (data.name === countryName) {
        exchange = 1;
      } else {
        const country = countriesData.countriesExchange.find((c) => c.name === data.name);
        exchange = country.exchange;
      }

      const weather = countriesData.weatherCapitals.find((country) => {
        let nameOfCountry = country.country;
        // Because USA has different name in APIs, it's necessary to convert.
        if (country.country === 'United States of America') nameOfCountry = 'United States';
        return nameOfCountry === data.name;
      });

      // Find the timezone in mock, because is not avaible in external API.
      const timezoneData = timezoneMocked.find((mock) => mock.countryName === data.name);

      aux.country = data.name;
      aux.capital = data.capital;
      aux.currencyAcronym = currencyAcronym;
      aux.exchange = exchange;
      aux.weather = {
        temp_c: weather.temp_c,
        temp_f: weather.temp_f,
      };
      aux.timezone = {
        tz: timezoneData.timezone,
        gmt: timezoneData.gmt_offset,
      };

      grouped.push(aux);
    });

    return grouped;
  }

  /**
   * Find all necessary countries data from external APIs.
   * @param {string} countryName Name of selected country, comes from request.
   * @param {string[]} countries Set of countries.
   * @returns Capital, currency, exchange and weather for each coutries.
   */
  async findCountriesData(countryName, countries) {
    // Fetch countries capital.
    const countriesCapital = await fetchService.fetchCountriesCapital(countries);
    // Fetch countries currency acronyms.
    const countriesCurrency = await fetchService.fetchCountriesCurrency(countries);
    // Find currency name of countryName to exchange.
    const baseCurrency = countriesCurrency.find((country) => country.name === countryName).currency;
    // Fetch exchanged values.
    const countriesExchange = await fetchService.fetchExchangeApi(baseCurrency, countriesCurrency);
    // Fetch weather in the respective country capitals.
    const weatherCapitals = await fetchService.fetchWeatherApi(countriesCapital);

    return {
      countriesCapital,
      countriesCurrency,
      countriesExchange,
      weatherCapitals,
    };
  }
}

module.exports = { CountriesService };
