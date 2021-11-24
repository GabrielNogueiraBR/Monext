/* eslint-disable class-methods-use-this */
const { CountriesService } = require('../services/countriesService');

const countriesService = new CountriesService();

/**
 * Controller resposible to handle requests
 * to build country data.
 */
class CountriesController {
  /**
   * Create countries data.
   * @param {Request} req
   * @param {Response} res
   */
  async create(req, res) {
    try {
      // Receiving country and value of conversion
      const { country, valueConversion } = req.body;

      // Access countries service to create all countries based on requested data.
      const countries = await countriesService.createAllCountries(country, valueConversion);

      // Send response (Array of countries)
      res.send(countries);
    } catch (err) {
      console.error(err); // If has error, print in console.
      res.status(500).send({ error: err }); // Send error 500.
    }
  }
}

module.exports = CountriesController;
