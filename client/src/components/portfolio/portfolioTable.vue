<template>
  <div class="column">
    <table class="table">
      <thead class="thead">
        <tr>
          <th scope="col">Ticker</th>
          <th scope="col">Name</th>
          <th scope="col">Current Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Gain/Loss</th>
          <th scope="col">% Change</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(stock,index) in stocks"
          is="stock"
          :portfolio="portfolio"
          :key="stock.name"
          :stock="stock"
        ></tr>
        <!--          <th scope="row">{{stock.name}}</th>-->
        <!--          <td>Mark</td>-->
        <!--          <td>Otto</td>-->
        <!--          <td>@mdo</td> -->
      </tbody>
    </table>
  </div>
</template>

<script>
import stock from "./stockV2";

export default {
  props: {
    portfolio: Array
  },
  components: {
    stock
  },
  data() {
    return {
      stocks: this.portfolio
    };
  },
  mounted() {
    console.log(this.portfolio);
    console.log(this.stocks);
  }
};
</script>

<style scoped>
th {
  color: white;
  font-family: "Montserrat", sans-serif;
}

.thead {
  background-color: #040f0f;
}
</style>