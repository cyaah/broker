const express = require('express');
const router = express.Router();
const portfolioController = require('../controller/portfolioController');
const searchController = require('../controller/searchController');
const authController = require('../controller/authController');


//Middleware
const validate = (req, res, callback)=> {
  console.log('x0x0')
  var token = req.headers.authorization;
  var decoded = verify(token);

  function verify(token) {
    var decoded = false;
    try {
      decoded = jwt.verify(token, secret);
    } catch (e) {
      decoded = false; // still false
    }

  }

  if (!decoded || !decoded.auth) {
    res.status(400).json({
      message: 'not authorized'
    });
    // return callback(res);
  } else {
    next()
  }
}





//Routes
router.get('/stocks', portfolioController.getStocks);
router.get('/balance', portfolioController.getBalance);
router.get('/search/stock',validate, searchController.getStockInfo)
router.get('/search/timeseries', searchController.getTimeSeries)
router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router;