/**
 * Class responsible for constructing the main entity of the project.
 *
 * @param {object} flag Offset to be send flag country.
 * @param {string} name Offset to be send name country.
 * @param {number} exchange Offset to be send conversion money.
 * @param {string} currencyAcronym Offset to be send  currency acronym of country.
 * @param {string} currencyName Offset to be send currency name of country.
 * @param {number} date Offset to be send country date.
 * @param {number} gmt Offset to be send GMT value for country time conversion.
 * @param {number} temperature Offset to be send temperature country.
 * @param {string} capital Offset to be send capital country.
 *
 * @author Gabriel Perin
 */
class Country {
  constructor(name, capital, currencyAcronym, currencyName, exchange, flag, date, gmt, temperature) {
    this.flag = flag;
    this.name = name;
    this.exchange = exchange;
    this.currencyAcronym = currencyAcronym;
    this.currencyName = currencyName;
    this.date = date;
    this.gmt = gmt;
    this.temperature = temperature;
    this.capital = capital;
  }
}

module.exports = Country;
