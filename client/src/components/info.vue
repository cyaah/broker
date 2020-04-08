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
import axios from 'axios';

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
       let token = localStorage.getItem('token');
      var order = {
        name: this.results["symbol"],
        price: parseFloat(this.results["latestPrice"]).toFixed(2),
        quantity: parseInt(this.quantity)
      };

       axios.post('http://localhost:5000/buyStock/',order, { headers: {"Authorization" : `Bearer ${token}`}} ).then(res=>{
         if(res.status === 200){
        let funds = res.data.funds;
        this.funds = funds;
        this.$emit("boughtStock", funds);
        this.$emit("stockBought", true);
        this.$store.commit("BUY_STOCK", order);
        EventBus.$emit("successNotification", "notification");
         } 
       }).catch(err=>{
         console.log(err)
         alert("Not enough funds to buy stock");
       });
      this.quantity = 0;
    },
    sellStock() {
      let token = localStorage.getItem('token');
        var order = {
        name: this.results["symbol"],
        price: parseFloat(this.results["latestPrice"]).toFixed(2),
        quantity: parseInt(this.quantity)
      };
      axios.post('http://localhost:5000/sellStock/',order, { headers: {"Authorization" : `Bearer ${token}`}} ).then(res=>{
        if(res.status === 200){
            this.$store.commit("SELL_STOCK", order);
            EventBus.$emit("soldNotification");

        }
      
    
      });

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
