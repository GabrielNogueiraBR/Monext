/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
const axios = require('axios').default;
require('dotenv').config();

class FetchDataService {
  constructor() {
    this.exchangeApiUrl = process.env.EXCHANGE_API_URL;
    this.exchangeApiKey = process.env.EXCHANGE_API_KEY;
    this.timezoneApiUrl = process.env.TIMEZONE_API_URL;
    this.timezoneApiKey = process.env.TIMEZONE_API_KEY;
    this.weatherApiUrl = process.env.WEATHER_API_URL;
    this.weatherApiKey = process.env.WEATHER_API_KEY;
    this.getPostmanApiUrl = process.env.GET_POSTMAN_API_URL;
  }

  async fetchExchangeApi(baseCurrency, countriesCurrency, targetCurrency = null) {
    let url = `${this.exchangeApiUrl}?api_key=${this.exchangeApiKey}&base=${baseCurrency}`;
    if (targetCurrency) url = url.concat(`&target=${targetCurrency}`);

    const response = await this.axiosGet(url);
    return this.filterExchange(baseCurrency, response.exchange_rates, countriesCurrency);
  }

  async fetchWeatherApi(countriesCapital) {
    const promises = countriesCapital.map((country) => {
      const city = country.capital;
      const url = `${this.weatherApiUrl}/current.json?key=${this.weatherApiKey}&q=${city}`;
      return this.axiosGet(url);
    });
    const resolves = await Promise.all(promises);
    return this.filterWeatherInfos(resolves);
  }

  async fetchCountriesCapital(countriesSet) {
    const url = `${this.getPostmanApiUrl}/countries/capital`;
    const response = await this.axiosGet(url);
    return this.filterCountries(countriesSet, response.data);
  }

  async fetchCountriesCurrency(countriesSet) {
    const url = `${this.getPostmanApiUrl}/countries/currency`;
    const response = await this.axiosGet(url);
    return this.filterCountries(countriesSet, response.data);
  }

  filterCountries(countriesSet, countriesResponse) {
    const countries = countriesResponse.filter((country) => countriesSet.has(country.name));
    return countries;
  }

  filterExchange(baseCurrency, exchangeRates, countriesCurrency) {
    const exchanges = [];
    exchanges.baseCurrency = baseCurrency;

    Object.keys(exchangeRates).forEach((exchange) => {
      const find = countriesCurrency.find((country) => country.currency === exchange);
      if (find) exchanges.push({ ...find, exchange: exchangeRates[exchange] });
    });

    return exchanges;
  }

  filterWeatherInfos(weatherResponse) {
    const weathers = weatherResponse.map((weather) => {
      const { name: capital, country, tz_id: timezone } = weather.location;
      // eslint-disable-next-line camelcase
      const { temp_c, temp_f } = weather.current;
      const timezoneSplited = timezone.split('/');
      const timezoneCity = timezoneSplited[timezoneSplited.length - 1];

      return {
        country,
        capital,
        timezoneCity,
        timezone,
        temp_c,
        temp_f,
      };
    });
    return weathers;
  }

  async axiosGet(url) {
    return axios.get(url)
      .then((response) => response.data)
      .catch((error) => { throw new Error(error); });
  }
}

module.exports = FetchDataService;
