/* eslint-disable class-methods-use-this */
const FetchDataService = require('../helpers/fetchDataService');

class FormsController {
  async send(req, res) {
    const { baseCurrency, targetCurrency } = req.body;

    const fetchService = new FetchDataService();

    try {
      const currency = await fetchService.fetchExchangeApi(baseCurrency, targetCurrency);
      const capital = await fetchService.fetchCountriesCapitalApi();

      res.status(201).json({
        currency,
        capital,
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = FormsController;
