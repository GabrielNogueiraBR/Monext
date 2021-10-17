const axios = require('axios').default;

class FetchDataService {
  constructor() {
    this.exchangeApiUrl = process.env.EXCHANGE_API_URL;
    this.exchangeApiKey = process.env.EXCHANGE_API_KEY;
    this.getPostmanApiUrl = process.env.GET_POSTMAN_API_URL;
  }

  fetchExchangeApi(baseCurrency, targetCurrency) {
    let url = `${this.exchangeApiUrl}?api_key=${this.exchangeApiKey}&base=${baseCurrency}`;

    if (targetCurrency) url = url.concat(`&target=${targetCurrency}`);

    return this.axiosGet(url);
  }

  async fetchCountriesCapitalApi() {
    const url = `${this.getPostmanApiUrl}/countries/capital`;
    return this.axiosGet(url);
  }

  // eslint-disable-next-line class-methods-use-this
  async axiosGet(url) {
    return axios.get(url)
      .then((response) => response.data)
      .catch((error) => { throw new Error(error); });
  }
}

module.exports = FetchDataService;
