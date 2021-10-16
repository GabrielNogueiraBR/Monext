/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
const countriesMocked = require('../mock/countries');
const Country = require('../models/country');

class CountriesService {
  constructor() {
    this.countriesMocked = countriesMocked;
  }

  create(countryName, convertQuantity) {
    const countryData = this.countriesMocked.find((country) => country.name === countryName);
    const country = new Country(
      countryData.name,
    );
    return countryData;
  }
}

module.exports = { CountriesService };
