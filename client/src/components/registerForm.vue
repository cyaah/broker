<template>
<div class="container">
  <div class="form-container">
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
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <Strong>Password</Strong>
            <input type="password" class="form-control" placeholder="Password" v-model="password" />
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      <router-link class="registerLink" to="/register">Register</router-link>
    </div>
  </div>
</div>  
</template>

<script>
export default {
  
}
</script>

<style>
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