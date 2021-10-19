/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
const countriesMocked = require('../mock/countries');
const currenciesMocked = require('../mock/currency');
const Country = require('../models/country');

class CountriesService {
  constructor() {
    this.countriesMocked = countriesMocked;
    this.currenciesMocked = currenciesMocked;
  }

  create(countryName, convertQuantity) {
    const countryData = this.countriesMocked.find((country) => country.name === countryName);
    const country = new Country(
      countryData.name,
    );
    return countryData;
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

  findCurrencyValueInMock(currencyParam) {
    return this.currenciesMocked.data[currencyParam];
  }
}

module.exports = { CountriesService };
