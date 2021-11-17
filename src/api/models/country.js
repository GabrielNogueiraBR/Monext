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
