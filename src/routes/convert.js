const express = require('express');

const Convert = require('../controllers/convert');

router = express.Router();

router.get('/currencies', Convert.listCurrencies);
router.get('/:origin/:dest/:value/', Convert.coin);

module.exports = router