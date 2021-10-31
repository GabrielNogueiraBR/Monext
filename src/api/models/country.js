class Country {
  constructor(name, capital, currency, exchange, flag, date, gmt, temperature) {
    this.flag = flag;
    this.name = name;
    this.exchange = exchange;
    this.currency = currency;
    this.date = date;
    this.gmt = gmt;
    this.temperature = temperature;
    this.capital = capital;
  }
}

module.exports = Country;
