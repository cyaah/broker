<template>
  <div class="container">
    <div class="main-box">
      <h1 class="main-header">
        <strong class="primary-header">TRADE STOCKS</strong>
      </h1>
    </div>
    <loginForm></loginForm>
  </div>
</template>


<script>
import { isError } from "util";
import loginForm from "./loginForm";
export default {
  data() {
    return {
      user: null,
      email: "",
      password: ""
    };
  },

  components: {
    loginForm
  }
};
</script>

<style scoped>
body {
  /*background-image: url();*/
  background-color: #cccccc;
  font-family: "Oswald", sans-serif;
} 

.container {
  min-width: 100%;
  min-height: 100vh;
  background-color: rgb(33, 49, 58);
  /*background-color: #1126CE;*/
  background: rgb(33, 49, 58);
  /* background: linear-gradient(
    rgba(2, 0, 36, 1) 0%,
    rgba(17, 38, 206, 1) 39%,
    rgba(0, 212, 255, 1) 100%
  ); */
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0;
  font-family: "Oswald", sans-serif;
  font-weight: bold;
}
.main-box {
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.main-header {
  font-weight: 550;
  font-size: 52px;
  letter-spacing: 14px;
  animation-name: moveInRight;
  animation-duration: 1.7s;
  animation-timing-function: ease-out;
  color: rgb(29, 196, 86);
}
.main-box {
  position: absolute;
  top: 47%;
  left: 70%;
  transform: translate(-50%, -50%);
}
80% {
  transform: translateX(-15px);
}
100% {
  opacity: 1;
  /* We use tranlate 0 since it just renders it to how it actually is */
  transform: translate(0);
}
/*body {*/
/*  background-image: url("../../../images/roberto-junior-4fsCBcZt9H8-unsplash.jpg");*/
/*  !* background: #2b0c5c; *!*/
/*  background-size: cover;*/
/*  background-position: top;*/
/*  background-repeat: no-repeat;*/
/*}*/
/*.form-card {*/
/*  position: absolute;*/
/*  width: 35%;*/
/*  top: 20%;*/
/*  left: 80px;*/
/*}*/
/*.form-control {*/
/*  width: 60%;*/
/*}*/
</style>