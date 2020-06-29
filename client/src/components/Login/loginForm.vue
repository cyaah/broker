<template>
<div class="container">
  <div class="form-container">
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
      </form>
      <router-link class="registerLink" to="/register">Register</router-link>
    </div>
  </div>
</div>  
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import { store } from "../store/store.js";

export default {
  name: "loginForm",

  data (){
    return {
     email: '',
     password: '',
    }
  },
  methods: {
    loginUser() {
       let body = {
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:5000/login/',body).then(res=>{
        this.$store.commit("LOGIN", res.data);

      }).then(()=>{
          this.$router.push({ path: "/" });
      })

      .catch(err=>{
        console.log(err)
        alert('Email or password incorrect')
      })
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