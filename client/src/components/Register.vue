<template>
  <div class="container">
    <div class="form-card">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <Strong>User Name:</Strong>
          <input
            id="userName"
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            v-model="username"
          />
        </div>
        <div class="form-group">
          <Strong for="exampleInputEmail1">Email address</Strong>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
          />
          <Strong
            id="emailHelp"
            class="form-text text-muted"
          >We'll never share your email with anyone else.</Strong>
        </div>
        <div class="form-group">
          <Strong>Password</Strong>
          <input type="password" class="form-control" placeholder="Password" v-model="password" />
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
      <router-link class="registerLink" to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { db, increment } from "../main.js";
import firebase from "firebase";
import firestore from "firebase";
import { isError } from "util";
const FieldValue = require("firebase").firestore.FieldValue;
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      id: ""
    };
  },

  methods: {
    onSubmit() {
      var userData = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          this.id = cred.user.uid;
          return cred.user.updateProfile({
            displayName: document.getElementById("userName").value
          });
        })
        .then(res => {
          return db
            .collection(this.id)
            .doc("Portfolio")
            .set({
              stock: {},
              funds: 1000
            });
          // console.log('res')
          // console.log(res)
        })
        .then(res => {
          // console.log(res)
          // console.log('PUSH HOME')
          var blah = firebase.auth().currentUser;
          console.log(blah);
          this.$store.commit("LOGIN", this.id);
          this.$router.push({ path: "/" });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
  }
};
</script>

<style>
.form-card {
  position: absolute;
  width: 35%;
  top: 20%;
  left: 80px;
}
</style>