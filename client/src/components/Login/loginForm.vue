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

  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    loginUser() {
      let body = {
        email: this.email,
        password: this.password
      };
      axios
        .post(`${process.env.VUE_APP_BASE_URI}login/`, body)
        .then(res => {
          this.$store.commit("LOGIN", res.data);
        })
        .then(() => {
          this.$router.push({ path: "/" });
        })

        .catch(err => {
          console.log(err);
          alert("Email or password incorrect");
        });
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
  width: 28%;
  /*background-size: cover;*/
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

.btn-primary {
  background-color: rgb(29, 196, 86);
  border-color: rgb(29, 196, 86);
}
.btn-primary:hover {
  border-color: rgb(15, 175, 68);
  background-color: rgb(15, 175, 68);
}

.registerLink {
  color: rgb(33, 49, 58);;
  border-color: rgb(29, 196, 86);
}


</style>