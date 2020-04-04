const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');
const jwt = require('jsonwebtoken')
const uri = "mongodb+srv://cyah_13:Fifastreet3@brokerdb-lffjq.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

exports.getPortfolio = function(req, res, next){
  let Header = req.headers['authorization'].split(' ');;
  let token = Header[1];

  let decoded = verify(token);

  let userName = decoded.credentials.userName;
  let portfolio = {};
  client.connect((err,db) => {
    if(err){
      let error ={
        message: "Internal Server Error"
      };
      console.log(err);
      res.status(500).json(error);
      //return console.log(err)

    } else {
      var collection = db.db("brockerDb").collection("users").findOne({userName : userName}, function(err,result){
        if(err) {
          let error ={
            message: "Internal Server Error"
          };
          console.log(err);
          res.status(500).json(error)
        }else if (result === null){
          let error = {
            message: "Email Or Password Incorrect"
          };
          res.status(404).json(error)
        }
        else {
          portfolio.stock = result.portfolio;
          portfolio.funds = result.funds;


           res.status(200).json(portfolio)
        }
        // db.close()
      });
    }
  });









  //res.status(200).json(portfolio);








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



};
