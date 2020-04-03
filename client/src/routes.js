import Home from './components/Home.vue';
import Portfolio from './components/portfolio/portfolio.vue';
import Stocks from './components/stocks/stocks.vue';
import Login from './components/Login/Login.vue';
import Register from './components/Register.vue';
import Home2 from './components/Home2.vue';
import {
    store
} from './components/store/store.js';

var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');





export const routes = [
    {
        path: '/login',
        component: Login,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('token');
            let currentTime = (Date.now().valueOf() / 1000);
            let decoded = jwtDecode(token);
             //console.log(store.getters.CHECKLOGIN)
            if (token && decoded.exp> currentTime) {
                //console.log('store.state.loggedIn')
                next('/')
            } else {
                next()
            }
        }
    },
    {
        path: '/',
        component: Home2,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('token');
            let currentTime = (Date.now().valueOf() / 1000);
            let decoded = jwtDecode(token);

            if(token && decoded.exp> currentTime){
               // console.log('store.getters.getCredentials');
                //console.log(decoded.exp);
            //    console.log('user is signed in');
                next()
            } else {
           // console.log('user is not signed in');
                next('/login')
            }



        }
    },
    {
        path: '/portfolio',
        name: 'portfolio',
        component: Portfolio,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('token');
            let currentTime = (Date.now().valueOf() / 1000);
            let decoded = jwtDecode(token);

            //console.log(token);
            if(token && decoded.exp> currentTime){
                // console.log('store.getters.getCredentials');
                //console.log(decoded.exp);
                console.log('user is signed in');
                next()
            } else {
                console.log('user is not signed in');
                next('/login')
            }

        }
    },
    {
        path: '/stocks',
        component: Stocks
    },

    {
        path: '/register',
        component: Register
    }
];