const FetchDataService = require('../helpers/fetchDataService');

class FormsController {
  constructor() {
    this.fetchService = new FetchDataService();
  }

  async send(req, res) {
    const { baseCurrency } = req.body;

    const data = await this.fetchService.fetchCurrentyApi(baseCurrency);

    return res.json(data);
  }
}

module.exports = FormsController;
