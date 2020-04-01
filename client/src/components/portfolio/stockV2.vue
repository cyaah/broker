<template>
  <tr class="stockEntry" @click="stockSelected(stockInfo)">
    <!--    <th scope="row">{{a}}</th>-->
    <td>{{ stock.name }}</td>
    <td>{{stockInfo.companyName}}</td>
    <td>$ {{stockInfo.latestPrice}}</td>
    <td>{{ stock.quantity }}</td>
    <td>$ {{totalChange }}</td>
    <td>{{ percentChange}}%</td>
  </tr>
</template>

<script>
import axios from "axios";
import { EventBus } from "./../eventBus";

export default {
  props: ["stock", "portfolio", "index"],
  data() {
    return {
      quantity: 0,
      stockInfo: {},
      dbQuantity: 0
    };
  },
  created() {
    //Getting stock price info
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${encodeURIComponent(
          this.stock.name
        )}/quote?token=pk_f606ae9814ec4d9e991aa1def338e260`
      )
      .then(res => {
        if (res) {
          this.stockInfo = res.data;
          // console.log(this.stockInfo);
        }
      })
      .then(con => {
        let q = this.stock.quantity;
        //Getting stock price info
      }).catch(err =>{
        console.log(err)
      });
  },
  methods: {
    stockSelected: function(stock) {
      EventBus.$emit("stockSelected", stock);
    }
  },
  computed: {
    totalChange: function() {
      return (
        parseFloat(this.stockInfo.latestPrice) *
          parseFloat(this.stock.quantity) -
        parseFloat(this.stock.price) * parseFloat(this.stock.quantity)
      ).toFixed(2);
    },
    percentChange: function() {
      return (
        this.totalChange /
        (parseFloat(this.stock.price) * parseFloat(this.stock.quantity))
      ).toFixed(2);
    }
  }
};
</script>

<style scoped>
.stockEntry {
  /*display: inline-block;*/
  cursor: pointer;

  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  overflow: hidden;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: color, background-color;
  transition-property: color, background-color;
}
.stockEntry:hover,
.stockEntry:focus,
.stockEntry:active {
  background-color: #2ba84a;
  color: white;
}
td {
  font-family: "Montserrat", sans-serif;
}
</style>
