/* eslint-disable class-methods-use-this */
const moment = require('moment-timezone');
const { CountriesService } = require('../services/countriesService');
const FetchDataService = require('../helpers/fetchDataService');

const countriesService = new CountriesService();

class CountriesController {
  async send(req, res) {
    const {
      baseCurrency, targetCurrency, capital, country,
    } = req.body;

    const fetchService = new FetchDataService();

    try {
      // The order here to call external services matters,
      // because we are using two features of the same API (fetch exchange and timezone API),
      // and if we send one after the other we get error 429 (many requests in a row),
      // needing to have a "interval" between requests,
      // this "interval" we are using a request for an API from another domain.
      const exchange = await fetchService.fetchExchangeApi(baseCurrency, targetCurrency);
      const countriesInfo = await fetchService.fetchCountriesInfoApi();
      // example coming from request body (capital and country) for fetch timezone
      const timezone = await fetchService.fetchTimezoneApi(capital, country);
      const weather = await fetchService.fetchWeatherApi(capital);

      // Example generating current time with GMT of other countries specifying
      // with timezone_location coming from timezone API.
      const tz = moment().tz(timezone.timezone_location).format();
      console.log(tz);

      res.status(201).json({
        countriesInfo,
        exchange,
        timezone,
        weather,
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  async create(req, res) {
    // Receiving country and value of conversion
    const { country, valueConversion } = req.body;

    // From test application
    const countries = await countriesService.createAllCountries(country, valueConversion);
    // const countries = countriesService.createAllCountriesFromMock();

    // Send response (Array of countries)
    res.send(countries);
  }
}

module.exports = CountriesController;
