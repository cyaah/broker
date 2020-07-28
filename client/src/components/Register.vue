<template>
  <div class="container">
    <div class="main-box">
      <h1 class="main-header">
        <strong class="primary-header">TRADE STOCKS</strong>
      </h1>
    </div>
    <registerForm></registerForm>
  </div>
</template>

<script>
import axios from "axios";
import { db, increment } from "../main.js";
import { isError } from "util";
import registerForm from "./registerForm";


export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      id: ""
    };
  },
  components: {
    registerForm
  },

  methods: {
    onSubmit() {
      var userData = {
        username: this.username,
        email: this.email,
        password: this.password,
        funds: 10000,
        portfolio: []
      };

      axios
        .post(`${process.env.ROOT}register`, userData)
        .then(res => {
          this.$store.commit("LOGIN", res.data);
        })
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          alert("Email already registered");
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
/* .container {
  background-color: rgb(33, 49, 58);
  min-width: 100%;
  min-height: 100vh;
}
.form-container {
  /* background-color: white;
  /* width: 50; */
  /* width: 25%;
  min-height: 100vh;
  right: 20px;
  position: relative;  */
  /* width: 25%;
  min-height: 100vh;
  background: white;
  font-family: "Oswald", sans-serif;
  font-weight: bold; */
/* }
.form-card {
  position: relative;
  width: 50%;
  top: 265px;
  left: 80px;
} */
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

</style>




