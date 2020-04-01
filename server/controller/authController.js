const MongoClient = require('mongodb').MongoClient;
var serviceAccount = require("../config/serviceaccount.json");


exports.login = function (req, res, next) {
  const uri = "mongodb+srv://cyah_13:Fifastreet3@brokerdb-lffjq.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('login')

  client.connect(err => {
    const collection = client.db("sample_airbnb").collection("listingsAndReviews").findOne({name : 'Apt Linda Vista Lagoa - Rio'})

    // perform actions on the collection object
   
    
   
   // client.close();
  }).then(()=>{
    console.log(collection)
  });


  console.log('user')
  //res.status(200).json(user)

}

exports.register = function (req, res, next) {

}