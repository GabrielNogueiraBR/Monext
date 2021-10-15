const { Router } = require('express');
const FormsController = require('../controllers/formsController');

const formsController = new FormsController();
const router = Router();

router.post('/', formsController.send);

module.exports = router;
