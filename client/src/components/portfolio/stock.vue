<template>
  <!-- <div class="col-sm-6 col-md-4">

  </div>-->
  <div class="col">
    <div class="card text-left" style="width: 18rem;">
      <div class="card-body">
        <p class="card-info">Name: {{stock.name}}</p>
        <p class="card-info">Purchase Price: {{stock.price}}</p>
        <p class="card-info">Quantity: {{this.dbQuantity}}</p>
        <p class="card-info">Current Price: {{this.stockInfo.latestPrice}}</p>
        <p class="card-info">Total Change: {{this.totalChange}}</p>
        <!-- <p class="card-text">Quantity: {{stock}} Price: {{stock}</p> -->
        <!-- {{stock}} -->
        <div class="input-group mb-3">
          <input
            type="number"
            class="form-control"
            placeholder="Enter Quantity"
            v-model="quantity"
            min="1"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-success" @click="sellStock">Sell</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { db, increment } from "../../main.js";
import firebase from "firebase";
import firestore from "firebase";
const FieldValue = require("firebase").firestore.FieldValue;
import axios from "axios";

export default {
  props: {
    stock: Object,
    portfolio: Array,
    index: Number
  },
  data() {
    return {
      quantity: 0,
      stockInfo: {},
      totalChange: 0,
      dbQuantity: 0,
      userId:""
    };
  },
  created() {
    console.log('created')

    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${encodeURIComponent(
          this.stock.name
        )}/quote?token=pk_f606ae9814ec4d9e991aa1def338e260`
      )
      .then(res => {
        if (res) {
          console.log("data for each stock");
          this.stockInfo = res.data;
          console.log(this.stockInfo)
          this.totalChange = (
            parseFloat(this.stockInfo.latestPrice) *
              parseFloat(this.stock.quantity) -
            parseFloat(this.stock.price) * parseFloat(this.stock.quantity)
          ).toFixed(2);
        }
      })
      .then(con => {
        let q = this.stock.quantity;
        this.dbQuantity += q;
        // console.log(this.stock.name);
        // console.log("db");
        // console.log(this.dbQuantity);
        // console.log(this.stock.quantity);
      });
  },
  methods: {
    ...mapActions({
      placeSellOrder: "sellStock"
    }),
    timeSeries() {
      axios
        .get(
          `https://cloud.iexapis.com/stable/stock/AAPL/time-series/?token=pk_f606ae9814ec4d9e991aa1def338e260`
        )
        .then(res => {
          // console.log("timeseries");
          // console.log(res);
        });
    },
    sellStock() {
      console.log("sell_stock");
      var user = firebase.auth().currentUser;
      this.userId = user.uid;
      //Building the order
      var order = {
        name: this.stock.name,
        price: parseFloat(this.stock.price).toFixed(2),
        quantity: parseInt(this.quantity)
      };
      console.log(order);
      var stockRef = db.collection(this.userId).doc("Portfolio");
      console.log("stock");
      console.log("axaxa");
      //Retrieving stock info from firebase
      stockRef.get().then(doc => {
        var currentStock = doc.data().stock[this.stockInfo.symbol];
        var funds = doc.data().funds;
        var quan = parseInt(currentStock.quantity) - parseInt(order.quantity);
        console.log(parseInt(funds) + 70);
        var sellingPrice =
          parseFloat(this.stock.price).toFixed(2) * parseInt(order.quantity);
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
          } else {
            // console.log("ELSE");
            //Fix currently completely wiping db
            order = {
              name: this.stock.name,
              price: this.stock.price,
              quantity: quan
            };

            //Updating firestore with the change in quantity
            var update = {};
            update[`stock.${this.stock.name}`] = order;
            // stockRef.update({stock: {[order.name]: {[order.name.quantity] : decrement}})
            stockRef.update(update);
            order.sellingPrice = sellingPrice;
            this.$emit("updateStock", order);

            this.dbQuantity = quan;
          }

          this.quantity = 0;
        }
      });

      //this.placeSellOrder(order);
      //this.dbQuantity = 0;
    }
  },
  computed:{
    currentPrice: {
  
    }
  }
};
</script>
<style>
.col {
  margin-left: 10px;
  margin-top: 17px;
}
</style>
