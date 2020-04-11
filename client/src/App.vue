<template>
  <!--  <div class="header">-->
  <!--    <app-header></app-header>-->
  <!--  </div>-->
  <div class="page">
    <router-view></router-view>
    <notifications
      group="notification"
      :duration="8000"
      :width="500"
      animation-name="v-fade-left"
      position="top left"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Chart from "chart.js";
import { EventBus } from "../src/components/eventBus";


export default {
  components: {
    // appHeader: Header
    //appHome: Home
  },
  data() {
    return {
      keywords: "",
      reults: []
    };
  },
  mounted() {
    console.log("at create");
    //this.$store.dispatch("loadStocks");
    EventBus.$on("successNotification", resp => {
      console.log(resp);
      this.show("notification", "success");
    });

    EventBus.$on("soldNotification", resp => {
      console.log("x0x0x0x0x0x0");
      this.show("notification", "error");
    });
  },

  methods: {
    show(group, type = "") {
      console.log("sucess");
      let action = type === "success" ? "Bought" : "Sold";
      const text = `
        Shares Sucessfully ${action}!
        <br>
        Date: ${new Date()}
      `;
      this.$notify({
        group,
        title: text,

        type,
        data: {
          randomNumber: Math.random()
        }
      });
    },
    clean(group) {
      this.$notify({ group, clean: true });
    }
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css"
    /* .container{
          font-family: 'Taviraj', serif;
        } */
    /*body {*/ /*  background-size: 100%;*/ /*  background-size: cover;*/ /*}*/
    body,
  html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}

.header {
  /*background-color: yellow;*/
}
.page {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  font-family: "Montserrat", sans-serif;
}

</style>
