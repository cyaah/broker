//const config = require('config');
const axios = require('axios');

exports.getStocks = function(req, res, next){
res.status(200).send('test')
}


exports.getBalance = function(req, res, next){
  res.status(200).send('test balance')
  }