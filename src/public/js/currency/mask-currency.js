/* eslint-disable no-undef */

/**
 *Class responsible to contain currency's info
 */
class CurrencyConfig {
  constructor(precision, separator, delimiter, unit) {
    this.precision = precision;
    this.separator = separator;
    this.delimiter = delimiter;
    this.unit = unit;
  }

  // Formatting common pattern to mostly of the currencies
  static DefaultWithUnit(unit) {
    return new CurrencyConfig(2, '.', ',', unit);
  }
}

/**
 *Function that applys a mask on the field with conversion's value
 * @param {CurrencyConfig} currencyConfig
 *
 * @author Raul Ryan
 */
function setCurrencyMask(currencyConfig) {
  VMasker(document.getElementById('conversion-value')).maskMoney({
    precision: currencyConfig.precision,
    separator: currencyConfig.separator,
    delimiter: currencyConfig.delimiter,
    unit: currencyConfig.unit,
  });
}

/**
 *Recovers the country's formatting config through country code
 * @param {string} countryCode
 * @returns Currency's formatting config
 *
 * @author Raul Ryan
 */
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

/**
 * Recovers the currency's formatting config through country code selected, then
 * calls the function to the formatting be applied
 * @param {string} selectedCountryCode
 *
 * @author Raul Ryan
 */
function setSelectCurrency(selectedCountryCode) {
  const countryCurrencyConfig = getCountryCurrencyConfig(selectedCountryCode);
  document.getElementById('conversion-value').value = 0;
  setCurrencyMask(countryCurrencyConfig);
}

const countriesSelect = document.getElementById('countries');

// Listen to change's event at 'select' tag
countriesSelect.addEventListener('change', (event) => {
  const selectedCountryCode = event.target.value;
  setSelectCurrency(selectedCountryCode);
});

// Functions's call to initial formatting
setSelectCurrency(countriesSelect.value);
