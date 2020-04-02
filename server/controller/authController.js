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

  console.log(email);
  console.log(password);

  client.connect((err,db) => {
    if(err){
      let error ={
        message: "Internal Server Error"
      };
      console.log(err);
      res.status(500).json(error);
      //return console.log(err)

    } else {
      var collection = db.db("brockerDb").collection("users").findOne({email : email, password:password}, function(err,result){
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
          console.log(result);
          res.status(404).json(error)
        }

        else {
          credentials = result;
         //let token = generateToken(email);
         //console.log(token);
        

          jwt.sign({credentials}, 'secret', {
            algorithm: 'HS256',
            expiresIn : 500
          },(err,token)=>{
            console.log('token');
            credentials.token = token;
            res.status(200).json(credentials)
          })

         // res.status(200).json(token)
        }

        db.close()
      });
    }


  });



};

exports.register = function (req, res, next) {

}
