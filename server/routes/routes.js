const express = require('express');
const router = express.Router();
const portfolioController = require('../controller/portfolioController');
const searchController = require('../controller/searchController');
const authController = require('../controller/authController');
const jwt = require('jsonwebtoken')


//Middleware
const validate = (req, res, next) => {
  let bearerHeader = req.headers['authorization'];
  let currentTime = Date.now().valueOf() / 1000;
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    let token = bearer[1];
    var decoded = verify(token);
    if (!decoded || !decoded.credentials || currentTime> decoded.exp) {
      res.status(403).json({
        message: 'not authorized'
      });
      // return callback(res);
    } else {
      next()
    }

  } else {
    // Forbidden
    res.status(403).json({
      message: 'not authorized'
    });
  }



  // var token = req.headers.authorization;

  function verify(token) {
    var decoded = false;
    try {
      decoded = jwt.verify(token, 'secret');
    } catch (e) {
      console.log(e);
      decoded = false; // still false
    }
    return decoded
  }
}





//Routes
router.get('/portfolio',validate, portfolioController.getPortfolio);
router.get('/search/stock', validate, searchController.getStockInfo);
router.get('/search/timeseries', searchController.getTimeSeries);
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;