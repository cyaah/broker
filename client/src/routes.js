import Portfolio from './components/portfolio/portfolio.vue';
import Login from './components/Login/Login.vue';
import Register from './components/Register.vue';
import Home2 from './components/Home2.vue';
import {
    store
} from './components/store/store.js';

var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');
// let token = localStorage.getItem('token');
// let currentTime = (Date.now().valueOf() / 1000);
// let decoded = jwtDecode(token);




export const routes = [{
        path: '/login',
        component: Login,
        beforeEnter: (to, from, next) => {
            let token = localStorage.getItem('token');
            let currentTime = (Date.now().valueOf() / 1000);
            if (token) {
                let decoded = jwtDecode(token);
                if (decoded.exp < currentTime) {
                    next()
                } else {
                    next('/')
                }
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
            if (token) {
                let decoded = jwtDecode(token);
                if (decoded.exp > currentTime) {
                    next()
                } else {
                    next('/login')
                }
            } else {
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
            if (token) {
                let decoded = jwtDecode(token);
                if (decoded.exp > currentTime) {
                    next()
                } else {
                    next('/login')
                }
            } else {
                next('/login')
            }
        }
    },

    {
        path: '/register',
        component: Register
    }
];