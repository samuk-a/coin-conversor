const express = require('express');

const Convert = require('../controllers/convert');

router = express.Router();

router.get('/currencies', Convert.listCurrencies);
router.get('/:value', Convert.coin);

module.exports = router