import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios'


Vue.use(Vuex);
Vue.use(VueAxios, axios);

// export default new Vuex.Store({
//     actions,
//     state: {
//         stocks,
//         portfolio
//     }
// })

export const store = new Vuex.Store({
    state: {
        funds: null,
        stocks: [],
        credentials: {},
        user_id: '',
        loggedIn: false,
        loginError: null,
        stockInfo: {},
        timeSeries:{},
        loading: false,
        token: ''
    },
    mutations: {
        BUY_STOCK(state, {
            name,
            price,
            quantity
        }) {
            //console.log(state.stocks[0]);
            if (quantity > 0) {
                const record = state.stocks.find(element => {
                    console.log(element);
                    return element.name === name
                });

                if (record) {
                    record.quantity = parseFloat(quantity) + parseFloat(record.quantity);

                } else {
                    state.stocks.push({
                        name: name,
                        quantity: quantity,
                        price: price
                    });
                }
                state.funds -= quantity * price;
            }
        },
        SET_PORTFOLIO(state, portfolio) {
            // state.funds = funds;
            console.log("stock portfolio");
            console.log(portfolio)
            state.stocks = portfolio
            console.log(state.stocks);
        },
        SELL_STOCK(state, {
            price,
            name,
            quantity
        }) {
            console.log("stock sold");
            //console.log(name);
            console.log(state);
            console.log(state.stocks);
            const record = state.stocks.find(element => {
                console.log(element);
                return element.name === name
            });

            console.log("=+=");
            console.log(record.quantity);
            console.log(quantity)
            if (record.quantity > quantity) {
                record.quantity = quantity
                console.log(record.quantity)
            } else {
                state.stocks.splice(state.stocks.indexOf(record), 1);
            }
            state.funds += price * quantity;
            console.log(state.stocks);
        },
        LOGIN(state,user) {
            console.log(user);
            state.loggedIn = true;
            //this.state.accessToken = accessToken;
            state.credentials =user;
            state.user_id = user.userName;
            state.token = user.token;
            localStorage.setItem("token", user.token);

            console.log("LOGIN_202022");

            console.log(state.token)
        },
        LOGOUT() {
            console.log('store logout');
            this.state.loggedIn = false
        },
        updateFunds(state, funds) {
            state.funds = funds;
        },
        STOCKINFO(state, stockInfo) {
            console.log(stockInfo);
            state.stockInfo = {};
            state.stockInfo = stockInfo
            console.log(state.stockInfo)
            console.log(state.stockInfo.length)

        },
        TIMESERIES(state, timeSeries) {
            console.log('THIIS TIME SERIES');
            state.timeSeries = {};
            //console.log(state.timeSeries.data.labels)
            state.timeSeries = timeSeries;
            console.log(state.timeSeries)
        },
        loadingStatus(state, loadingStatus){
            console.log(state.loading)
            console.log('loading status')
            state.loading=loadingStatus;
            console.log(state.loading)
        }
    },
    actions: {
        doLogin({
            commit
        }, loginData) {
            commit('LOGIN')
        },
        doLogout({
            commit
        }) {
            ('LOGOUT')
        },
        getStockInfo({
            commit
        }, stockInfo) {
            commit('STOCKINFO', stockInfo)
        },
        getTimeSeries({
            commit
        }, timeSeries) {
            commit('TIMESERIES', timeSeries)
        },
        changeLoading({
            commit
        }, loadingStatus){
            commit('loadingStatus', loadingStatus)
        }
    },
    getters: {
        CHECKLOGIN: state => {
            return state.loggedIn
        },

        GETUSERID: state => {
            return state.user_id
        },

        getUserFunds: state => {
            console.log('trying')
            console.log(state.funds)
            return state.funds
        },
        getStockInfo: state => {
            console.log('getting from store stock info ')
            return state.stockInfo
        },
        getTimeSeries: state => {
            console.log('123545454')
            return state.timeSeries
        },
        getLoadingStatus: state =>{
            console.log('get loading status')
            return state.loading
        },
        getCredentials: state =>{
            console.log('getting credentials');
            return state.credentials
        }

    }
})