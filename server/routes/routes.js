const express = require('express');
const router = express.Router();
const portfolioController = require('../controller/portfolioController');
const searchController = require('../controller/searchController');
const authController = require('../controller/authController');
const jwt = require('jsonwebtoken')


//Middleware
const validate = (req, res, next) => {
  console.log('x0x0')
  let bearerHeader = req.headers['authorization'];
  let currentTime = Date.now().valueOf() / 1000;
  console.log(currentTime)
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    let token = bearer[1];
    console.log(token)
    var decoded = verify(token);
    console.log(decoded)
    if (!decoded || !decoded.credentials || currentTime> decoded.exp) {
      console.log('not allowed')
      res.status(403).json({
        message: 'not authorized'
      });
      // return callback(res);
    } else {
      console.log('all good')
      next()
    }

  } else {
    console.log('forbidden else')
    // Forbidden
    res.status(400).json({
      message: 'not authorized'
    });
  }



  // var token = req.headers.authorization;



  function verify(token) {
    console.log('verify')
    var decoded = false;
    try {
      console.log('try')
      decoded = jwt.verify(token, 'secret');
    } catch (e) {
      console.log('e')
      console.log(e)
      decoded = false; // still false
    }
    return decoded
  }


}





//Routes
router.get('/stocks', portfolioController.getStocks);
router.get('/balance', portfolioController.getBalance);
router.get('/search/stock', validate, searchController.getStockInfo)
router.get('/search/timeseries', searchController.getTimeSeries)
router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router;