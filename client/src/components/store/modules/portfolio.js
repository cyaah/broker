// const state = {
//     funds: 100000,
//     stocks: [],
//     accessToken: null,
//     loggedIn: false,
//     loginError: null
// };

// const mutations = {
//     'BUY_STOCK'(state, {name, price, quantity}) {

//         //console.log(state.stocks[0]);
//         console.log("check")

//         if(quantity >0){
//             const record = state.stocks.find(element => {
//                 console.log(element);
//                 return element.name === name});
                
//                 console.log(record);
//             if(record){
//                 record.quantity =  parseFloat(quantity) + parseFloat(record.quantity);
//                 console.log(record.quantity);
//                 console.log('if stock exists')
//             } else {
//                 state.stocks.push({name : name,
//                 quantity: quantity, price: price });
//                 console.log("adding new stock")
//                 console.log(state.stocks);
    
//             }
//             state.funds -= quantity * price;
//             console.log(state.funds);
//         }
        
//     },
//     'SET_PORTFOLIO' (state, portfolio) {
//         state.funds = funds;
//         console.log("stock portfolio");
//         state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
//         console.log(state.stocks);
//     },
//     'SELL_STOCK' (state, {price, name, quantity}){
//         console.log("stock sold");
//         //console.log(name);
//         //console.log(state.stocks[0].name);
//         const record = state.stocks.find(element => {
//             //element.name === name
//             console.log(name);
//             console.log(element.name);
            
//             return element.name === name
//         });
//         console.log("=+=");
//         console.log(record);
//         if(record.quantity > quantity){
//             record.quantity -= quantity
//         } else {
//             state.stocks.splice(state.stocks.indexOf(record),1);
//         }
//         state.funds += price * quantity;
//         console.log(state.stocks);
//     },
//     'LOGIN' (accessToken) {
//         console.log("LOGIN_1_")
//         state.loggedIn = true,
//         state.accessToken = accessToken;
//     },
//     'LOGOUT' (){
//         state.loggedIn = false
//     },
//     'STOCKINFO'(stockInfo){
//      console.log('we got here in VUEX')
//     }

// };

// const actions = {
//     // doLogin({ commit }, loginData) {
//     //     commit('LOGIN')
//     // },
//     getStockInfo: ({commit}, stockInfo)=>{
//         console.log('almost')
//         commit('STOCKINFO', stockInfo)
//     }

    
// };

// const getters = {
//     stockPortfolio (state,getters) {
//         //console.log(state.stocks);
//         console.log("inside getters stockPortfolio");
//         // console.log(getters);
//         // console.log(state.stocks);
//          console.log(getters.stocks)
//        return state.stocks.map(stock => {
//             //console.log(getters.stocks[0]['01. symbol'])
            
           
//             console.log(stock);
//              const record = getters.stocks.find(element =>  element.name === stock.name);
//              console.log("-=-=-=");
//              //console.log(record);
//              console.log(stock.quantity);
//              //return record;
//               return {
//                  quantity: stock.quantity,
//                  name: record.name,
//                  price: record.price
//              }
//         });

       
    
//     },


//     stocks: state => {
//         return state.stocks;
//     }
// }









// export default {
//     state,
//     mutations,
//     actions,
//     getters,

// }