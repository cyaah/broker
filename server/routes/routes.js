const express = require('express');
const router = express.Router();
const portfolioController = require('../controller/portfolioController');
const searchController = require('../controller/searchController');



//Routes
router.get('/stocks', portfolioController.getStocks);
router.get('/balance', portfolioController.getBalance);
router.get('/search/stock', searchController.getStockInfo)
router.get('/search/timeseries', searchController.getTimeSeries)


module.exports = router;