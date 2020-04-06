const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');
const jwt = require('jsonwebtoken')
const uri = "mongodb+srv://cyah_13:Fifastreet3@brokerdb-lffjq.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

exports.getPortfolio = function (req, res, next) {
  let Header = req.headers['authorization'].split(' ');;
  let token = Header[1];

  let decoded = verify(token);

  let userName = decoded.credentials.userName;
  let portfolio = {};
  client.connect((err, db) => {
    if (err) {
      let error = {
        message: "Internal Server Error"
      };
      console.log(err);
      res.status(500).json(error);

    } else {
      var collection = db.db("brockerDb").collection("users").findOne({
        userName: userName
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
          portfolio.stock = result.portfolio;
          portfolio.funds = result.funds;


          res.status(200).json(portfolio)
        }
        // db.close()
      });
    }
  });









  //res.status(200).json(portfolio);








};



exports.buyStock = function (req, res, next) {
  let Header = req.headers['authorization'].split(' ');;
  let token = Header[1];
  let decoded = verify(token);
  let userName = decoded.credentials.userName;
  let stock = req.body.name;
  let cost = parseFloat(req.body.price * req.body.quantity);


  client.connect((err, db) => {
    if (err) {
      let error = {
        message: "Internal Server Error"
      };
      console.log(err);
      console.log('1');
      res.status(500).json(error);

    } else {

      var collection = db.db("brockerDb").collection("users")
      collection.findOne({
        userName: userName
      }, function (err, result) {
        if (err) {
          console.log('2');

          let error = {
            message: "Internal Server Error"
          };
          console.log(err);
          res.status(500).json(error)
        } else if (result === null) {
          console.log('3');

          let error = {
            message: "Cant find user's portfolio"
          };
          res.status(404).json(error)
        } else {

          let portfolio = result.portfolio;
          let funds = result.funds;
          let newFunds = funds - cost;
          if (funds >= cost) {
            let oldQuan = 0;
            let oldPrice = 0;
            let exists = false;
            for (var i = 0; i < result.portfolio.length; i++) {
              if (portfolio[i].name === stock) {
                oldQuan = portfolio[i].quantity
                oldPrice = portfolio[i].price
                exists = true;
                break;
              }
            }
            if (exists === false) {
              let obj = {
                name: stock,
                price: req.body.price,
                quantity: req.body.quantity
              }

              db.db("brockerDb").collection("users").updateOne({
                userName: userName
              }, {
                $push: {
                  portfolio: obj
                }
              }, function (err) {
                if (err) {
                  console.log('5');

                  let error = {
                    message: 'Internal Server Error'
                  }
                  res.status(500).json(error)
                } else {
                  // res.status(200).json({
                  //   'message': 'Successfully updated portfolio'
                  // })
                  db.db("brockerDb").collection("users").updateOne({
                    userName: userName
                  },{
                    $set: {
                      funds: newFunds
                    }
                  }, function (err) {
                    if (err) {
                      console.log('6');

                      let error = {
                        message: 'Internal Server Error'
                      }
                      res.status(500).json(error)
                    } else {
                      res.status(200).json({
                        'message': 'Successfully updated portfolio'
                      })
                    }
                  })
                }
              })

            } else {
              let newQuantity = parseInt(req.body.quantity) + parseInt(oldQuan);
              let totalPrice = parseFloat(oldQuan).toFixed(2) * parseFloat(oldPrice).toFixed(2) + cost
              let average = parseFloat(totalPrice) / parseInt(newQuantity);

              db.db("brockerDb").collection("users").updateOne({
                userName: userName,
                "portfolio.name": stock
              }, {
                $set: {
                  "portfolio.$.price": average,
                  "portfolio.$.quantity": newQuantity
                }
              }, function (err, resp) {
                if (err) {
                  console.log('7');

                  let error = {
                    message: 'Internal Server Error'
                  }
                  res.status(500).json(error)
                } else {
                  db.db("brockerDb").collection("users").updateOne({
                    userName: userName
                  }, {
                    $set: {
                      funds: newFunds
                    }

                  }, function (err) {
                    if (err) {
                      console.log('8');

                      let error = {
                        message: 'Internal Server Error'
                      }
                      res.status(500).json(error)
                    } else {
                      res.status(200).json({
                        'message': 'Successfully updated portfolio'
                      })
                    }
                  })

                  // res.status(200).json({
                  //   'message': 'Successfully updated portfolio'
                  // })
                }
              })
            }
          } else {

            res.status(400).json({
              message: 'Not enough funds'
            })
          }

          //res.status(200).json(portfolio)
        }
      });
    }
  });




};


// exports.sellStock = function (req, res, next) {
//   let Header = req.headers['authorization'].split(' ');;
//   let token = Header[1];
//   let decoded = verify(token);
//   let userName = decoded.credentials.userName;
//   let stock = req.body.name;
//   let cost = parseFloat(req.body.price * req.body.quantity);


//   client.connect((err, db) => {
//     if (err) {
//       let error = {
//         message: "Internal Server Error"
//       };
//       console.log(err);
//       res.status(500).json(error);

//     } else {

//       var collection = db.db("brockerDb").collection("users")
//       collection.findOne({
//         userName: userName
//       }, function (err, result) {
//         if (err) {
//           let error = {
//             message: "Internal Server Error"
//           };
//           console.log(err);
//           res.status(500).json(error)
//         } else if (result === null) {
//           let error = {
//             message: "Cant find user's portfolio"
//           };
//           res.status(404).json(error)
//         } else {

//           let portfolio = result.portfolio;
//           let funds = result.funds;
//           if (funds >= cost) {
//             let oldQuan = 0;
//             let oldPrice = 0;
//             let exists = false;
//             for (var i = 0; i < result.portfolio.length; i++) {
//               if (portfolio[i].name === stock) {
//                 oldQuan = portfolio[i].quantity
//                 oldPrice = portfolio[i].price
//                 exists = true;
//                 break;
//               }
//             }
//             if (exists === false) {
//               let obj = {
//                 name: stock,
//                 price: req.body.price,
//                 quantity: req.body.quantity
//               }
//               db.db("brockerDb").collection("users").updateOne, ({
//                 userName: userName
//               }, {
//                 $push: {
//                   portfolio: obj
//                 }
//               }, function (err) {
//                 if (err) {
//                   let error = {
//                     message: 'Internal Server Error'
//                   }
//                   res.status(500).json(error)
//                 } else {
//                   res.status(200).json({
//                     'message': 'Successfully updated portfolio'
//                   })
//                 }
//               })

//             } else {
//               let newQuantity = parseInt(req.body.quantity) + parseInt(oldQuan);
//               let totalPrice = parseFloat(oldQuan).toFixed(2) * parseFloat(oldPrice).toFixed(2) + cost
//               let average = parseFloat(totalPrice) / parseInt(newQuantity);

//               db.db("brockerDb").collection("users").updateOne({
//                 userName: userName,
//                 "portfolio.name": stock
//               }, {
//                 $set: {
//                   "portfolio.$.price": average,
//                   "portfolio.$.quantity": newQuantity
//                 }
//               }, function (err, resp) {
//                 if (err) {
//                   let error = {
//                     message: 'Internal Server Error'
//                   }
//                   res.status(500).json(error)
//                 } else {
//                   res.status(200).json({
//                     'message': 'Successfully updated portfolio'
//                   })
//                 }
//               })
//             }
//           } else {

//             res.status(400).json({
//               message: 'Not enough funds'
//             })
//           }

//           //res.status(200).json(portfolio)
//         }
//       });
//     }
//   });

// };

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