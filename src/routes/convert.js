const express = require('express');

const Convert = require('../controllers/convert');

router = express.Router();

router.get('/:origin/:dest', Convert.coin);

module.exports = router