const { Router } = require('express');
const CountriesController = require('../controllers/countriesController');

const countriesController = new CountriesController();
const router = Router();

router.post('/create', countriesController.create);

module.exports = router;
