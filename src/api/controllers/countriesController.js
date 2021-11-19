/* eslint-disable class-methods-use-this */
const { CountriesService } = require('../services/countriesService');

const countriesService = new CountriesService();

class CountriesController {
  async create(req, res) {
    try {
      // Receiving country and value of conversion
      const { country, valueConversion } = req.body;

      const countries = await countriesService.createAllCountries(country, valueConversion);

      // Send response (Array of countries)
      res.send(countries);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err }); // TODO: WHY NOT SEND THE ERROR OBJECT?????
    }
  }
}

module.exports = CountriesController;
