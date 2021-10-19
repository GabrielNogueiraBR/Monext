const { Router } = require('express');
const FormsController = require('../controllers/formsController');
const { CountriesService } = require('../services/countriesService');

const formsController = new FormsController();
const router = Router();
const serviceCountries = new CountriesService(); // Create service country

router.post('/', formsController.send);

router.post('/countries/create', (req, res) => {
  // Receiving country and value of conversion
  const { country, valueConversion } = req.body;

  // From test application
  const countries = serviceCountries.createAllCountriesFromMock();

  // Send response (Array of countries)
  res.send(countries);
});

module.exports = router;
