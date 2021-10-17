/* eslint-disable class-methods-use-this */
const FetchDataService = require('../helpers/fetchDataService');

class FormsController {
  async send(req, res) {
    const { baseCurrency, targetCurrency } = req.body;

    const fetchService = new FetchDataService();

    try {
      const countriesInfo = await fetchService.fetchCountriesInfoApi();
      const exchange = await fetchService.fetchExchangeApi(baseCurrency, targetCurrency);

      res.status(201).json({
        countriesInfo,
        exchange,
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = FormsController;
