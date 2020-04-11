const MongoClient = require('mongodb').MongoClient;
var serviceAccount = require("../config/serviceaccount.json");
const jwt = require('jsonwebtoken')
const uri = "mongodb+srv://cyah_13:Fifastreet3@brokerdb-lffjq.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

exports.login = function (req, res, next) {
  var credentials = {};
  let email = req.body.email;
  let password = req.body.password;

  client.connect((err, db) => {
    if (err) {
      let error = {
        message: "Internal Server Error"
      };
      console.log(err);
      res.status(500).json(error);

    } else {
      var collection = db.db("brockerDb").collection("users").findOne({
        email: email,
        password: password
      }, function (err, result) {
        if (err) {
          let error = {
            message: "Internal Server Error"
          };
          console.log(err);
          res.status(500).json(error)
        } else if (result === null) {
          let error = {
            message: "Email Or Password Incorrect"
          };
          res.status(404).json(error)
        } else {
          credentials.userName = result.userName;
          credentials.email = result.email;
          credentials.password = result.password;
          credentials.id = result._id;
          jwt.sign({
            credentials
          }, 'secret', {
            algorithm: 'HS256',
            expiresIn: 3600
          }, (err, token) => {
            credentials.token = token;
            res.status(200).json(credentials)
          })
          // res.status(200).json(token)
        }
        // db.close()
      });
    }
  });
};

exports.register = function (req, res, next) {
  var credentials = {};
  credentials.funds = 10000;
  credentials.userName = req.body.username;
  credentials.email = req.body.email;
  credentials.password = req.body.password;
  credentials.portfolio = []
  client.connect((err, db) => {
    if (err) {
      let error = {
        message: "Internal Server Error"
      };
      console.log(err);
      res.status(500).json(error);
      //return console.log(err)

    } else {
      var collection = db.db("brockerDb").collection("users").findOne({
        email: req.body.email
      }, function (err, result) {
        if (err) {
          let error = {
            message: "Internal Server Error"
          };
          console.log(err);
          res.status(500).json(error)
        } else if (result === null) {
          db.db("brockerDb").collection("users").insertOne(
            credentials
          , function (err, resp) {
            if (err) {
              let error = {
                message: "Internal Server Error"
              };
              console.log(err);
              res.status(500).json(error)
            } else {
              console.log(resp)
              console.log('resp')
            
              credentials.id = resp._id;
              jwt.sign({
                credentials
              }, 'secret', {
                algorithm: 'HS256',
                expiresIn: 3600
              }, (err, token) => {
                credentials.token = token;
                res.status(200).json(credentials)
              })

            }
          })
        } else {
          // credentials.userName = result.userName;
          // credentials.email = result.email;
          // credentials.password = result.password;
          // credentials.id = result._id;
          // jwt.sign({credentials}, 'secret', {
          //   algorithm: 'HS256',
          //   expiresIn : 3600
          // },(err,token)=>{
          //   credentials.token = token;
          //   res.status(200).json(credentials)
          // })

          let error = {
            message: 'Email has already been registered'
          }
          res.status(404).json(error)

        }
      });
    }
  });
}