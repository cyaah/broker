<template>
  <div class="form-container">
    <strong>StockSim</strong>

    <div class="form-card">
      <form>
        <div class="form-group">
          <strong for="exampleInputEmail1">Email address</strong>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
          />
          <small id="emailHelp" class="form-text">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <strong for="exampleInputPassword1">Password</strong>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <button @click.prevent="loginUser" class="btn btn-primary">Login</button>
        <!-- <button class="btn btn-primary" >Register</button> -->
      </form>
      <router-link class="registerLink" to="/register">Register</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { db, increment } from "../../main.js";
import firebase from "firebase";
import firestore from "firebase";
import { isError } from "util";
const FieldValue = require("firebase").firestore.FieldValue;
import { mapActions } from "vuex";
import { store } from "../store/store.js";

export default {
  name: "loginForm",
  methods: {
    loginUser() {
       let body = {
        email: this.email,
        password: this.password
      }
      // console.log(this.email);
      // console.log(this.password);
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(this.email, this.password)
      //   .then(cred => {
      //     console.log("login");
      //     console.log(cred.user);
      //     this.$store.commit("LOGIN", cred.user);
      //   })
      //   .then(res => {
      //     console.log(this.email);
      //     console.log("email");
      //     //this.$store.dispatch("buyStock", order);
      //     this.$router.push({ path: "/" });
      //   })
      //   .catch(error => {
      //     // Handle Errors here.
      //     var errorCode = error.code;
      //     var errorMessage = error.message;

      //     switch (errorCode) {
      //       case "auth/invalid-email":
      //         alert("The user/email is invalid");
      //         break;
      //       case "auth/wrong-password":
      //         alert("The email or password is wrong");
      //         break;
      //       case "auth/user-not-found":
      //         alert("The user was not found");
      //         break;
      //       default:
      //         alert(errorMessage);
      //         break;
      //     }
          // if (errorCode == "auth/wrong-password") {
          //   alert("The password or the user is invalid.");
          // } else if (errorCode == "auth/invalid-email"){
          //
          // } else {
          //   alert(errorMessage);
          // }
          //console.log(error);


      axios.post('http://localhost:5000/login/',body).then(res=>{
        this.$store.commit("LOGIN", res.data);

      }).then(()=>{
        console.log('router')
          this.$router.push({ path: "/" });
      })

      .catch(err=>{
        console.log(err)
        alert('Email or password incorrect')
      })
        // });
    }
  }
};
</script>

<style scoped>
.logo {
  font-family: "Oswald", sans-serif;
  font-weight: bold;
}
.form-container {
  /*background-size: cover;*/
  width: 25%;
  min-height: 100vh;
  background: white;
  font-family: "Oswald", sans-serif;
  font-weight: bold;
}
.form-card {
  position: absolute;
  width: 50%;
  height: 40%;
  top: 35%;
  left: 80px;
  /*background: yellow;*/
  background-size: cover;
}
.form-control {
  width: 38%;
}
</style>