import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import firebase from 'firebase';
import VueRouter from 'vue-router';
import Notifications from 'vue-notification';
import 'bootstrap';
import {
  routes
} from './routes';
//import store from './components/store/store';
import { store } from './components/store/store.js';








Vue.use(Notifications);
Vue.use(VueRouter);
Vue.use(Vuex);


Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyA8saY_c4QiZLXXKYnPbjub2bIqP0E4oAY",
  authDomain: "stocksim-f8101.firebaseapp.com",
  databaseURL: "https://stocksim-f8101.firebaseio.com",
  projectId: "stocksim-f8101",
  storageBucket: "stocksim-f8101.appspot.com",
  messagingSenderId: "704433915147",
  appId: "1:704433915147:web:bbd2c35df8239e5b"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();








const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

})