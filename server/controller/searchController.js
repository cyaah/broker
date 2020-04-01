const axios = require('axios');



exports.getStockInfo = function (req, res, next) {
  //Get both time series and stock info, consolidate and respond
  //put token in config file. Dont hard code

  let ticker = req.query.ticker;
  /*Getting stock info
   *
   */
  axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_f606ae9814ec4d9e991aa1def338e260`)
    .then(response => {

      var info = response.data;
      let body = {
        stockInfo: []
      }
      //fix this logic
      body.stockInfo = info;

      res.status(200).send(body)
    })
    .catch(err => {
      console.log(err)
      let message = err.response.data
      let error = {
        status: '',
        reason: ''
      }

      switch (err.response.status) {
        case 400:
          error.reason = message,
            error.status = err.response.status
          break;

        case 401:
          error.reason = message,
            error.status = err.response.status
          break;
        case 404:
          error.reason = message,
            error.status = err.response.status
          break;
        case 503:
          error.reason = message,
            error.status = err.response.status
          break;
        default:
          error.reason = 'Internal Server Error',
            error.status = 500
          break;
      }

      console.log(error)
      res.status(500).send(error)
    });

}


exports.getTimeSeries = function (req, res, next) {
  /*Getting time serires info
   *
   */
  let ticker = req.query.ticker

  axios
    .get(
      `https://cloud.iexapis.com/stable/stock/${
    ticker}/time-series/?token=pk_f606ae9814ec4d9e991aa1def338e260`
    )
    .then(response => {
      let timeSeriesData = response.data;
      let body = {}
      let labels = [];
      let dataPoints = []
      for (var i = 0; i < timeSeriesData.length; i++) {
        labels.push(
          new Date(timeSeriesData[i].date)
        );
        dataPoints.push(
          timeSeriesData[i].close
        );
      }
      body.labels = labels
      body.dataPoints = dataPoints
      res.status(200).json(body)
    })
    .catch(err => {
      let message = err.response.data
      let error = {
        status: '',
        reason: ''
      }
      switch (err.response.status) {
        case 400:
          error.reason = message,
            error.status = err.response.status
          break;

        case 401:
          error.reason = message,
            error.status = err.response.status
          break;
        case 404:
          error.reason = message,
            error.status = err.response.status
          break;
        case 503:
          error.reason = message,
            error.status = err.response.status
          break;
        default:
          error.reason = 'Internal Server Error',
            error.status = 500
          break;
      }
      console.log(err);
      res.status(500).send(error)

    });
}