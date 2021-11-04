/* eslint-disable no-undef */
class CurrencyConfig {
  constructor(precision, separator, delimiter, unit) {
    this.precision = precision;
    this.separator = separator;
    this.delimiter = delimiter;
    this.unit = unit;
  }

  static DefaultWithUnit(unit) {
    return new CurrencyConfig(2, '.', ',', unit);
  }
}

function setCurrencyMask(currencyConfig) {
  VMasker(document.getElementById('conversion-value')).maskMoney({
    precision: currencyConfig.precision,
    separator: currencyConfig.separator,
    delimiter: currencyConfig.delimiter,
    unit: currencyConfig.unit,
  });
}

function getCountryCurrencyConfig(countryCode) {
  switch (countryCode) {
    case 'Brazil':
      return new CurrencyConfig(2, ',', '.', 'R$');
    case 'United Kingdom':
      return CurrencyConfig.DefaultWithUnit('£');
    case 'Japan':
    case 'China':
      return new CurrencyConfig(0, '', '', '¥');
    case 'Italy':
      return CurrencyConfig.DefaultWithUnit('€');
    case 'Russia':
      return CurrencyConfig.DefaultWithUnit('p.');
    default:
      return CurrencyConfig.DefaultWithUnit('$');
  }
}

function setSelectCurrency(selectedCountryCode) {
  const countryCurrencyConfig = getCountryCurrencyConfig(selectedCountryCode);
  document.getElementById('conversion-value').value = 0;
  setCurrencyMask(countryCurrencyConfig);
}

const countriesSelect = document.getElementById('countries');

countriesSelect.addEventListener('change', (event) => {
  const selectedCountryCode = event.target.value;
  setSelectCurrency(selectedCountryCode);
});

setSelectCurrency(countriesSelect.value);
