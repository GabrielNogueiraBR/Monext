const axios = require('axios');

class FetchDataService {
  constructor() {
    this.currencyApiUrl = process.env.FREE_CURRENCY_API_URL;
    this.currencyApiKey = process.env.FREE_CURRENCY_API_KEY;
  }

  async fetchCurrentyApi(baseCurrency) {
    const url = `${this.currencyApiUrl}/latest?apiKey${this.currencyApiKey}?bas_currency=${baseCurrency}`;

    const response = await axios.get(url);

    return response.data;
  }
}

module.exports = FetchDataService;
