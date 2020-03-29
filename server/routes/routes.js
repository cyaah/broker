const express = require('express');
const router = express.Router();
const portfolioController = require('../controller/portfolioController');



//Routes
router.get('/stocks', portfolioController.getStocks)

module.exports = router;