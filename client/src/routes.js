import Home from './components/Home.vue';
import Portfolio from './components/portfolio/portfolio.vue';
import Stocks from './components/stocks/stocks.vue';
import Login from './components/Login/Login.vue';
import Register from './components/Register.vue';
import Home2 from './components/Home2.vue';
import {
    store
} from './components/store/store.js';

import firebase from "firebase";




export const routes = [
    // {
    //     path: '/login',
    //     component: Login
    // },
    {
        path: '/login',
        component: Login,
        beforeEnter: (to, from, next) => {
            // console.log("navguard logged in")
            // console.log(store.state.loggedIn)
            if (store.state.loggedIn) {
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
            //console.log(this.store.getters.loggedIn);
            // console.log("router guard before if");
            // console.log(store.getters.CHECKLOGIN)
            if (store.getters.CHECKLOGIN) {
                //console.log('signed in')
                next()
            } else {
              //  console.log('user is not signed in')
                next('/login')
            }
        }
    },
    {
        path: '/portfolio',
        name: 'portfolio',
        component: Portfolio,
        beforeEnter: (to, from, next) => {
            if (store.getters.CHECKLOGIN) {
                //console.log('signed in')
                next()
            } else {
              //  console.log('user is not signed in')
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