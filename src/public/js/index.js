/* eslint-disable no-undef */

// ================ SOCKET ================

// Connection with socket server
const socket = io('http://localhost:3000/form');

// ================ EVENTS ================

// Add event to button confirm
document.querySelector('#btn-confirm').addEventListener('click', (e) => {
  e.preventDefault();

  // Get values from fields
  const country = document.getElementById('countrys').value;
  const valueConversion = document.getElementById('conversion-value').value;

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
  fetch('/forms/countries/create', myRequest)
    .then((res) => res.json())
    .then((countries) => socket.emit('updateCountries', countries)) // Update list of countries
    .then(window.location.href = '/controller'); // Redirect page
});
