import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
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