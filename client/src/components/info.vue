<template>
  <!-- <div class="search-results"> -->
  <div class="card-body-stock">
    <h3 class="ticker">{{ this.results["symbol"] }}</h3>
    <div class="card-info-left">
      <p class="card-info">Current price: {{ this.results["latestPrice"] }}$</p>
      <!-- <p class="data">{{ this.results["latestPrice"] }}</p> -->
      <p class="card-info">Market Cap: $ {{ this.results["marketCap"] }}</p>
      <p class="card-info">Open: {{ this.results["open"] }}</p>
      <p class="card-info">High: {{ this.results["high"] }}</p>
      <p class="card-info">Low: {{ this.results["low"] }}</p>
    </div>
    <div class="card-info-right">
      <p class="card-info">Volume: {{ this.results["volume"] }}</p>
      <p class="card-info">Previous close: {{ this.results["previousClose"] }}</p>
      <p class="card-info">Change: {{ this.results["change"] }}</p>
      <p class="card-info">Change%: {{ this.results["changePercent"] }}</p>
      <p class="card-info">P/E Ratio: {{ this.results["peRatio"] }}</p>
    </div>
    <!-- bug- Input allows the enter of 'e' when only shouldbe number. Result in empty string quantity-->
    <div class="input-group">
      <input
        v-on:keyup.enter="buyStock"
        type="number"
        id="searchBuy"
        placeholder="Enter Quantity"
        aria-describedby="basic-addon2"
        v-model="quantity"
        min="1"
      />
      <div>
        <button class="btn btn-outline-success" @click="buyStock">Buy</button>
      </div>
      <div v-if="this.$route.name === 'portfolio' " class="input-group-append">
        <button class="btn btn-outline-success" id="sellButton" @click="sellStock">Sell</button>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import { mapGetters } from "vuex";
import { db, increment } from "../main.js";
import firebase from "firebase";
import firestore from "firebase";
import { EventBus } from "../components/eventBus";

export default {
  props: ["results"],
  data() {
    return {
      currentUser: null,
      funds: 0,
      userId: "",
      quantity: 0
    };
  },
  methods: {
    buyStock() {
      var order = {
        name: this.results["symbol"],
        price: parseFloat(this.results["latestPrice"]).toFixed(2),
        quantity: parseInt(this.quantity)
      };
      var user = firebase.auth().currentUser;
      var buyingPrice =
        parseFloat(order.price).toFixed(2) * parseInt(order.quantity);
      var name = order.name;
      this.userId = user.uid;

      //CHeck if you have enough funds
      if (buyingPrice > this.funds) {
        console.log("cant afford");
        alert("Not enough funds to buy stock");
      } else {
        //Updating portfolio funds to firestore
        var stockRef = db.collection(this.userId).doc("Portfolio");
        stockRef.get().then(doc => {
          console.log("doc does not exist");
          var currentStock = doc.data().stock;

          //Creating new stock
          if (!currentStock[order.name] && !Object.keys({}).length) {
            console.log("inside if");
            stockRef
              .set({ stock: { [order.name]: order } }, { merge: true })
              //Tried to change db scheme but this only make it into an array by default. Look into inserting straight object instead of object
              //.set({[order.name]: [order]},  { merge: true })
              .then(resp => {
                console.log("New stock added");
                //stockRef.FieldValue('stock').add({ [order.name]: order})
              });

            //Update existing stock
          } else {
            console.log("else");
            var quantity =
              parseInt(currentStock[order.name].quantity) +
              parseInt(order.quantity);

            var totalPrice =
              parseFloat(currentStock[order.name].quantity).toFixed(2) *
                parseFloat(currentStock[order.name].price).toFixed(2) +
              parseInt(order.quantity) * parseInt(order.price);
            console.log("total price");
            var average =
              parseFloat(totalPrice).toFixed(2) / parseInt(quantity).toFixed(2);
            var name = currentStock[order.name].name;

            var newOrder = {
              name: name,
              price: average,
              quantity: quantity
            };
            var update = {};
            update[`stock.${name}`] = newOrder;
            console.log("does exist");
            stockRef.update(update);
          }
        });
        console.log("when buying price less than funds");

        //updating funds
        var newFunds = (this.funds - buyingPrice).toFixed(2);
        var decreaseBy = firebase.firestore.FieldValue.increment(
          buyingPrice * -1
        );
        stockRef.update({ funds: decreaseBy });
        this.funds = newFunds;
        this.$emit("boughtStock", newFunds);
        this.$emit("stockBought", true);
        this.$store.commit("BUY_STOCK", order);
        EventBus.$emit("successNotification", "notification");
      }

      this.quantity = 0;
    },
    sellStock() {
      console.log("sell_stock");
      var user = firebase.auth().currentUser;
      this.userId = user.uid;
      //Building the order
      var order = {
        name: this.results["symbol"],
        price: parseFloat(this.results["latestPrice"]).toFixed(2),
        quantity: parseInt(this.quantity)
      };
      console.log(order);
      var stockRef = db.collection(this.userId).doc("Portfolio");
      console.log("stock");
      console.log("axaxa");
      //Retrieving stock info from firebase
      stockRef.get().then(doc => {
        var currentStock = doc.data().stock[order.name];
        var funds = doc.data().funds;
        var quan = parseInt(currentStock.quantity) - parseInt(order.quantity);
        console.log(currentStock);
        console.log(parseInt(order.quantity));
        console.log(quan);
        var sellingPrice =
          parseFloat(this.results["latestPrice"]).toFixed(2) *
          parseInt(order.quantity);
        var newFunds = parseFloat(funds) + sellingPrice;
        console.log("selling price");
        console.log(sellingPrice);
        console.log("funds");
        console.log(funds);
        console.log(newFunds);
        console.log("newFunds");
        var increaseBy = firebase.firestore.FieldValue.increment(sellingPrice);

        stockRef.update({ funds: increaseBy });

        if (currentStock) {
          //Selling all shares
          if (quan <= 0) {
            let name = currentStock.name;
            // let update = stockRef.update({
            //   name: firebase.firestore.FieldValue.delete()
            // });
            //stockRef.update({ 'stock': {[order.name]: firebase.firestore.FieldValue.delete() }});
            stockRef.update({
              ["stock." + name]: firebase.firestore.FieldValue.delete()
            });
            // var update = {};
            // update[`stock.${name}`] = newOrder;
            //  stockRef.update(update);
            // console.log("check delete");
            // console.log("index" + this.index);
            var payload = {
              index: this.index,
              sellingPrice: sellingPrice
            };
            this.$emit("deleteStock", payload);

            //Selling from db
          } else {
            order = {
              name: this.results["symbol"],
              price: this.results["latestPrice"].toFixed(2),
              quantity: quan
            };

            //Updating firestore with the change in quantity
            var update = {};
            update[`stock.${this.results["symbol"]}`] = order;
            // stockRef.update({stock: {[order.name]: {[order.name.quantity] : decrement}})
            stockRef.update(update);
            order.sellingPrice = sellingPrice;
            this.$store.commit("SELL_STOCK", order);

            this.dbQuantity = quan;
          }
          EventBus.$emit("soldNotification");
          this.quantity = 0;
        }
      });

      //this.placeSellOrder(order);
      //this.dbQuantity = 0;
    }
  },
  computed: {
    userId() {
      return this.$store.state.user_id;
    }
  },
  created() {
    this.userId = this.$store.getters.GETUSERID;
  }
};
</script>

<style scoped>
.search-results {
  margin: 5px;
}
/* .input-group {
  margin-top: 25px;
} */
.input-groupmb-3 {
  margin-top: 25px;
}
.infoRight {
  margin-left: 140px;
}
/* .main-search {
  margin-left: 120px;
  width: 60%;
} */
.card-body-stock {
  left: 25px;
  top: 20px;
  /*box-shadow: 2px 2px 2px 0 hsla(0, 0%, 0%, 0.5);*/
  /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1); */
  font-family: "Montserrat", sans-serif;

  border-radius: 15px;
  border: black;
  position: relative;
}

.stockBuy {
  position: relative;
  bottom: 20px;
}
.card {
  position: absolute;
  left: 800px;
}
.card-info {
  font-weight: 300;
  /* letter-spacing: 4px; */
  font-weight: 400;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 0;
  
}

.card-info-left {
  position: relative;
  left: 25px;
  /* background-color: black; */
  width: 50%;
  float: left;
}
.card-info-right {
  position: relative;
  /* background-color: red; */
  width: 50%;
  float: right;
  font-weight: 400;
  left: 60px;
}

#sellButton {
  left: 25px;
  border-radius: 5px;
}

#searchBuy {
  border-radius: 5px;
}
.btn {
  left: 10px;
  position: relative;
}

.ticker {
  font-weight: bold;
  letter-spacing: 2.5px;
}
</style>
