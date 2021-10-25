/* eslint-disable class-methods-use-this */
const moment = require('moment-timezone');

const FetchDataService = require('../helpers/fetchDataService');
const countriesMocked = require('../mock/countries');
const currenciesMocked = require('../mock/currency');
const timezoneMocked = require('../mock/timezone');
const Country = require('../models/country');

const fetchService = new FetchDataService();

const CountriesSet = [
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
];

class CountriesService {
  constructor() {
    this.countriesMocked = countriesMocked;
    this.currenciesMocked = currenciesMocked;
  }

  async createAllCountries(countryName, valueConversion) {
    const countries = CountriesSet.filter((country) => country !== countryName);
    const countriesData = await this.findCountriesData(countryName, countries);
    const groupedData = this.groupDataByCountry(countriesData);
    const contriesObject = this.buildCountryObject(groupedData, valueConversion);

    return contriesObject;
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

  buildCountryObject(countriesData, valueConversion) {
    const countries = countriesData.map((data) => {
      const { timezone, weather } = data;
      const { flag } = countriesMocked.find((mock) => mock.name === data.country);
      const valueConverted = valueConversion * data.exchange;
      const date = moment().tz(timezone.tz).format('YYYY-MM-DD HH:mm:SS');

      const country = new Country(
        data.country,
        data.capital,
        data.currency,
        valueConverted,
        flag,
        date,
        timezone.gmt,
        weather.temp_c,
      );

      return country;
    });
    return countries;
  }

  groupDataByCountry(countriesData) {
    const grouped = [];

    // countriesCapital is defined in findCountriesData method.
    countriesData.countriesCapital.forEach((data) => {
      const aux = {};

      const { currency } = countriesData.countriesCurrency.find((country) => country.name === data.name);
      const { exchange } = countriesData.countriesExchange.find((country) => country.name === data.name);
      const weather = countriesData.weatherCapitals.find((country) => {
        let countryName = country.country;
        if (country.country === 'United States of America') countryName = 'United States'; // the 'diferentão'
        return countryName === data.name;
      });
      const timezoneData = countriesData.timezoneMocked.find((country) => country.name === data.name);

      aux.country = data.name;
      aux.capital = data.capital;
      aux.currency = currency;
      aux.exchange = exchange;
      aux.weather = {
        temp_c: weather.temp_c,
        temp_f: weather.temp_f,
      };
      aux.timezone = {
        // gambis - for America / Mexico_City ", note the double quotes, this is coming from the API and breaks our flow
        tz: timezoneData.timezone.replace('"', ''),
        gmt: timezoneData.gmt_offset,
      };

      grouped.push(aux);
    });

    return grouped;
  }

  async findCountriesData(countryName, countries) {
    const countriesCapital = await fetchService.fetchCountriesCapital(countries);
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
