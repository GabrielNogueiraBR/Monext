const { Router } = require('express');
const CountriesController = require('../controllers/countriesController');

const countriesController = new CountriesController();
const router = Router();

/**
 * POST route to create all countries to fill the countries-page.
 */
router.post('/create', countriesController.create);

module.exports = router;
