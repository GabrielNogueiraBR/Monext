/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
const axios = require('axios').default;
require('dotenv').config();

/**
 * Class responsible for fetch the necessary data from
 * external APIs, such as weather and currencies.
 */
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

  /**
   * Fetch and filter countries exchange currency based on set.
   * @param {string} baseCurrency Base currency that will be used to convert 1:x.
   * @param {*} countriesCurrency Array of countries with their currencys acronyms.
   * @param {string} targetCurrency Is optional. But it is used to convert to a specific currency.
   * @returns Countries exchange.
   */
  async fetchExchangeApi(baseCurrency, countriesCurrency, targetCurrency = null) {
    let url = `${this.exchangeApiUrl}?api_key=${this.exchangeApiKey}&base=${baseCurrency}`;
    if (targetCurrency) url = url.concat(`&target=${targetCurrency}`);

    const response = await this.axiosGet(url);
    return this.filterExchange(baseCurrency, response.exchange_rates, countriesCurrency);
  }

  /**
   * Fetch and filter countries weather based on caountry capitals set.
   * @param {*} countriesCapital Countries with their capitals.
   * @returns Capitals weather for now.
   */
  async fetchWeatherApi(countriesCapital) {
    const promises = countriesCapital.map((country) => {
      const city = country.capital;
      const url = `${this.weatherApiUrl}/current.json?key=${this.weatherApiKey}&q=${city}`;
      return this.axiosGet(url);
    });
    const resolves = await Promise.all(promises);
    return this.filterWeatherInfos(resolves);
  }

  /**
   * Fetch and filter countries capital based on set.
   * @param {string[]} countriesSet Set of countries name.
   * @returns Countries with their respective capitals.
   */
  async fetchCountriesCapital(countriesSet) {
    const url = `${this.getPostmanApiUrl}/countries/capital`;
    const response = await this.axiosGet(url);
    console.log(response.data);
    return this.filterCountries(countriesSet, response.data);
  }

  /**
   * Fetch and filter countries currency based on set.
   * @param {string[]} countriesSet Set of countries name.
   * @returns Countries with their respective currency.
   */
  async fetchCountriesCurrency(countriesSet) {
    const url = `${this.getPostmanApiUrl}/countries/currency`;
    const response = await this.axiosGet(url);
    return this.filterCountries(countriesSet, response.data);
  }

  /**
   * Filter only countries is in countries set.
   * @param {string[]} countriesSet Set of countries name.
   * @param {*} countriesResponse Countries with data returned by external API.
   * @returns Filtered countries.
   */
  filterCountries(countriesSet, countriesResponse) {
    const countries = countriesResponse.filter((country) => countriesSet.includes(country.name));
    return countries;
  }

  /**
   * Filter only exchanges for the set of countries.
   * @param {string} baseCurrency Base currency.
   * @param {*} exchangeRates Exchage rates from external API.
   * @param {*} countriesCurrency Currency acronyms.
   * @returns Filtered exchanges.
   */
  filterExchange(baseCurrency, exchangeRates, countriesCurrency) {
    const exchanges = [];
    exchanges.baseCurrency = baseCurrency;

    Object.keys(exchangeRates).forEach((exchange) => {
      const find = countriesCurrency.find((country) => country.currency === exchange);
      if (find) exchanges.push({ ...find, exchange: exchangeRates[exchange] });
    });

    return exchanges;
  }

  /**
   * Filter only necessary weather data.
   * @param {*} weatherResponse Weather response from external API.
   * @returns Filtered weather.
   */
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

  /**
   * Responsible for making http calls to external services.
   * @param {string} url
   * @returns
   */
  async axiosGet(url) {
    return axios.get(url)
      .then((response) => response.data)
      .catch((error) => { throw new Error(error); });
  }
}

module.exports = FetchDataService;
