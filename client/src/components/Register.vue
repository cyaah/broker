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
import { isError } from "util";
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
        password: this.password,
        funds: 10000,
        portfolio: []
      };

      axios.post('http://localhost:5000/register',userData).then(res=>{

          this.$store.commit("LOGIN", res.data);
      }).then(()=>{
          this.$router.push({ path: "/" });

      }).catch(err=>{
         alert('Email already registered')
        console.log(err);
      })
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