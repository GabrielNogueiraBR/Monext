/* eslint-disable no-undef */

// ================ SOCKET ================

// Connection with socket server
const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const socket = io(`${url}/form`);

// ================ EVENTS ================

function removeMask(valueConversion) {
  const withoutSymbol = valueConversion.split(' ')[1];
  const withoutPunctuation = withoutSymbol.replace(/[,.]/g, '');

  // Formatting the value from 5.000,25 to 5000.25 (accepted by the API)
  const valueFormatted = [withoutPunctuation.slice(0, -2), '.', withoutPunctuation.slice(-2)].join('');

  return valueFormatted;
}

// Add event to button confirm
document.querySelector('#btn-confirm').addEventListener('click', (e) => {
  e.preventDefault();

  (async () => {
    // Get values from fields
    const country = document.getElementById('countries').value;
    // Remove the currency mask with split
    const valueConversion = removeMask(document.getElementById('conversion-value').value);

    // Create an request config
    const myRequest = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country, valueConversion }),
    };

    // Send request using fetch API
    fetch('/countries/create', myRequest)
      .then((res) => res.json())
      .then((countries) => socket.emit('updateCountries', countries)) // Update list of countries
      .then(() => {
        window.open(`${url}/country-page`, '_blank', 'height=705,width=430'); // Open country page on new window
      })
      .then(() => {
        window.location.href = '/controller'; // Redirect page
      });
  })();
});
