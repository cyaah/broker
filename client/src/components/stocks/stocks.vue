<template>
  <div>
    <!-- <h1 v-for="(stock,index) in stocks" :key="index"> {{ stock.name }} </h1> -->
    <appstock v-for="(stock,index) in stocks" :key="index" :stock="stock"></appstock>
    <h1>asc</h1>
  </div>
</template>

<script>
import stock from "./stock.vue";
import { mapGetters } from "vuex";

export default {
  //Fix bug when this component re-renders it calls the axios get request again.
  // mounted(){
  //     this.$store.dispatch('loadStocks')
  // },
  components: {
    appstock: stock
  },

  // computed: {
  //   ...mapGetters([
  //         'stocks'
  //     ])
  // }
  computed: {
    stocks() {
      console.log('xoxoxoxox')
      return this.$store.getters.stocks;
    }
  }
};
</script>

<style>
</style>


