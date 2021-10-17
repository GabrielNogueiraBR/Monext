const axios = require('axios').default;

class FetchDataService {
  constructor() {
    this.exchangeApiUrl = process.env.EXCHANGE_API_URL;
    this.exchangeApiKey = process.env.EXCHANGE_API_KEY;
    this.timezoneApiUrl = process.env.TIMEZONE_API_URL;
    this.timezoneApiKey = process.env.TIMEZONE_API_KEY;
    this.getPostmanApiUrl = process.env.GET_POSTMAN_API_URL;
  }

  fetchExchangeApi(baseCurrency, targetCurrency) {
    let url = `${this.exchangeApiUrl}?api_key=${this.exchangeApiKey}&base=${baseCurrency}`;

    if (targetCurrency) url = url.concat(`&target=${targetCurrency}`);

    return this.axiosGet(url);
  }

  fetchTimezoneApi(capital, country) {
    const url = `${this.timezoneApiUrl}?api_key=${this.timezoneApiKey}&location=${capital}, ${country}`;
    console.log(url);
    return this.axiosGet(url);
  }

  fetchCountriesInfoApi() {
    const infos = [
      'currency',
      'capital',
      'flag',
    ];
    const infoString = infos.concat(',');
    const url = `${this.getPostmanApiUrl}/countries/info?returns=${infoString}`;
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
