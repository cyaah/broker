<template>
  <!-- <div class="col-sm-6 col-md-4">
         
  </div>-->
  <div class="row">
    <div class="col">
      <div class="card text-right" style="width: 18rem;">
        <div class="card-body">
          <!-- <h5 class="card-title">Name: {{stock['01. symbol']}}</h5>
          <p class="card-text">Price: ${{stock['05. price']}}</p>
          <p class="card-text">High: ${{stock['03. high']}}</p>
          <p class="card-text">Low: ${{stock['04. low']}}</p>
          <p class="card-text">Prev Close: ${{stock['08. previous close']}}</p>
          <div class="input-group mb-3">-->
          <input
            type="number"
            v-model="quantity"
            class="form-control"
            placeholder="Enter Quantity"
            aria-describedby="basic-addon2"
          />
          <!-- <div class="input-group-append">
              <button @click="buyStock">Buy</button>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>





<script>
export default {
  props: {
    stock: Object
  },

  data() {
    return {
      quantity: 0
    };
  },

  methods: {
    buyStock() {
      console.log("stock buy button");

      const order = {
        name: this.stock["01. symbol"],
        price: this.stock["05. price"],
        quantity: this.quantity
      };
      console.log("order");
      console.log(order);
      //calling at action buy stock and passing order info as payload
      this.$store.dispatch("buyStock", order);

      this.quantity = 0;
      //console.log(order);
    }
  }
};
</script>

<style>
</style>
