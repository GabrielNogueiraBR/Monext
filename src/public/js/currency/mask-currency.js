class CurrencyConfig {
   constructor(precision, separator, delimiter, unit){
      this.precision = precision;
      this.separator = separator;
      this.delimiter = delimiter;
      this.unit = unit;
   }

   static DefaultWithUnit(unit){
      return new CurrencyConfig(2,',','.',unit);
   }
}

function setCurrencyMask(currencyConfig){
   VMasker(document.getElementById("conversion-value")).maskMoney({
      precision: currencyConfig.precision,
      separator: currencyConfig.separator,
      delimiter: currencyConfig.delimiter,
      unit: currencyConfig.unit,
   });
}

function getCountryCurrencyConfig(countryCode){
   switch(countryCode){
      case 'BR':
         return new CurrencyConfig(2,',','.','R$');
      case 'GB':
         return CurrencyConfig.DefaultWithUnit('£');
      case 'JP':
      case 'CN':
         return new CurrencyConfig(0,'','','¥');
      case 'DE':
      case 'IT':
         return CurrencyConfig.DefaultWithUnit('€');
      case 'RU':
         return CurrencyConfig.DefaultWithUnit('p.');
      default:
         return CurrencyConfig.DefaultWithUnit('$');
   }
}

function setSelectCurrency(selectedCountryCode) {
   let countryCurrencyConfig = getCountryCurrencyConfig(selectedCountryCode);
   document.getElementById("conversion-value").value = 0;
   setCurrencyMask(countryCurrencyConfig);
}

const countriesSelect = document.getElementById('countries');

countriesSelect.addEventListener('change', (event) => {
  let selectedCountryCode = event.target.value;
  setSelectCurrency(selectedCountryCode);
});


setSelectCurrency(countriesSelect.value);
