<template>
  <div class="container">
    <topNavBar></topNavBar>
    <div class="funds-div">
      <p>Funds: {{this.funds}}</p>
    </div>
    <sideBar></sideBar>
    <div class="dashboard">
    <div class="search-box">
      <div class="input-groupmb-3">  
        <input
          v-on:keyup.enter="search"
          v-on:keyyp.enter="canvas"
          type="search"
          class="form-control"
          placeholder="Enter Stock Ticker"
          aria-label="Recipient's username"
          v-model="searchTerm"
          id="main-search"
        />
      </div>
    </div>
    <div v-if="notSearched" class="main-box">
      <h1 class="main-header">
        <span class="primary-header">TRADE STOCKS</span>
      </h1>
    </div>
    <stockCard v-on:boughtStock="boughtStock" :results="results" v-if="this.results"></stockCard>
    <div class="search-results">
      <div class="card-body-stock" v-if="results.length > 0">
    </div>
    </div>
    <div
      v-if="noResults"
      class="modalfade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              @click="resetError"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">No symbol provided.</div>
          <div class="modal-footer">
            <button
              @click="resetError"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >Close</button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="error"
      class="modalfade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              @click="resetError"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">Could not find stock.</div>
          <div class="modal-footer">
            <button
              @click="resetError"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >Close</button>
          </div>
        </div>
      </div>
    </div>
    <!--<div>-->
    <!--<button @click="check" class="logout">Check</button>-->
    <!--</div>-->
  </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js";
import planetChartData from "./chart-data.js";
import stockCard from "./stockCard";
import { db, increment } from "../main.js";
//import firebase from "firebase";
//import firestore from "firebase";
import { isError } from "util";
// import header from './Header.vue'
const FieldValue = require("firebase").firestore.FieldValue;
import sideBar from "./sideBar";
var myChart;

export default {
  data() {
    return {
      myChart: null,
      currentUser: null,
      searchTerm: "",
      portfolio: {},
      funds: 0,
      userId: "",
      results: [],
      noResults: false,
      notSearched: true,
      error: false,
      quantity: 0,
      planetChartDaisEmptyta: planetChartData,
      timeSeriesData: [],
      canvasCreated: false,
      canvasData: {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              fill: false,
              label: "price",
              data: [],
              backgroundColor: "rgb(34,139,34)",

              borderColor: "rgb(34,139,34)",

              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          maintainAspectRatio: false,

          scales: {
            xAxes: [
              {
                type: "time",
                display: true,
                scaleLabel: {
                  display: true,
                  labalString: "Date"
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  padding: 25
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Price"
                }
              }
            ]
          }
        }
      }
    };
  },
  created() {
    console.log("CREATED")
    // let user = firebase.auth().currentUser; //checking to see who the user is if logged in
    // this.currentUser = user;
    // let id = this.$store.getters.GETUSERID;
    //
    // var stockRef = db.collection(id).doc("Portfolio");
    // stockRef.get().then(doc => {
    //   console.log('01010101')
    //   if (doc.exists) {
    //     console.log("doc");
    //     this.funds = doc.data().funds.toFixed(2);
    //     this.portfolio = doc.data();
    //     this.$store.commit("updateFunds", this.funds);
    //   }
    // });
  },
  methods: {
    canvas() {
      this.createChart("Intra Day Chart", this.canvasData);
    },
    // search: function() {
    //   var term = this.searchTerm;
    //   if (this.myChart != null) {
    //     this.myChart.destroy();
    //     this.canvasData.data.datasets[0].data = [];
    //     console.log(this.myChart);
    //   }
    //   //Getting stock price info
    //   axios
    //     .get(
    //       `https://cloud.iexapis.com/stable/stock/${encodeURIComponent(
    //         term
    //       )}/quote?token=pk_f606ae9814ec4d9e991aa1def338e260`
    //     )
    //     .then(res => {
    //       if (res) {
    //         console.log(res.data);
    //         console.log("res");
    //         this.results = [];

    //         this.noResults = false;
    //         var s = res.data;
    //         console.log(s);
    //         //fix this logic
    //         if (isEmpty(s)) {
    //           this.noResults = true;
    //           console.log("is empty");
    //           console.log(this.noResults);
    //         } else {
    //           this.notSearched = false;
    //           this.results.push(s);
    //           console.log("124555");
    //           console.log(this.results);
    //         }
    //       }
    //     })
    //     .catch(error => {
    //       this.error = true;
    //       console.log("error");
    //       console.log(this.error);
    //       console.log(error);
    //     });

    //   //Getting time series data
    //   axios
    //     .get(
    //       `https://cloud.iexapis.com/stable/stock/${encodeURIComponent(
    //         term
    //       )}/time-series/?token=pk_f606ae9814ec4d9e991aa1def338e260`
    //     )
    //     .then(res => {
    //       console.log("TIME SERIES");
    //       this.timeSeriesData = res.data;
    //       //this.canvasData.labels = res.data;
    //       for (var i = 0; i < this.timeSeriesData.length; i++) {
    //         this.canvasData.data.labels.push(
    //           new Date(this.timeSeriesData[i].date)
    //         );
    //         this.canvasData.data.datasets[0].data.push(
    //           this.timeSeriesData[i].close
    //         );
    //       }
    //       console.log(this.canvasData.data.labels);
    //       console.log(this.canvasData.data.datasets[0].data);
    //       console.log("canvas data");
    //       this.canvas();
    //     });

    //   var isEmpty = obj => {
    //     console.log("isEMpty");
    //     for (var key in obj) {
    //       if (obj.hasOwnProperty(key)) {
    //         return false;
    //       }
    //     }
    //     return true;
    //   };
    //   //console.log("timeseries123");
    //   this.term = "";
    //   this.noResults = false;
    //   this.searchTerm = "";
    //   this.canvasData.data.labels = [];
    //   this.canvasData.data.datasets[0].data.length = 0;
    //   console.log("checking if empty", this.canvasData.data.datasets[0].data);
    // },

    createChart(chartId, chartData) {
      console.log("chartData" );
      console.log(chartId)
      console.log(chartData)

      if (myChart) {
        console.log("00000000000000000000000000000000000000000000000000000000000000000")
        document.getElementById("myChart").remove();
        console.log(document.getElementById("myChart"));
        let canvas = document.createElement("canvas");
        canvas.setAttribute("id", "myChart");
        canvas.setAttribute("width", "300px");
        canvas.setAttribute("height", "300px");
        console.log(document.getElementById("chart-container"));
        document.getElementById("chart-container").appendChild(canvas);

        myChart.destroy();
      }
     
      console.log('xoxoxoxoxoxoxoxoxoxo')
      const ctx = document.getElementById("myChart").getContext("2d");
       console.log(ctx);
      myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
      this.canvasCreated = true;
    },
    resetError() {
      console.log("reset");
      this.error = false;
      this.noResults = false;
    },
    boughtStock (funds){
      console.log(funds)
      console.log('recieved funds in parent')
      this.funds = funds.toFixed(2)
    },
    check() {
      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     // User is signed in.
      //     console.log(user)
      //   } else {
      //     // No user is signed in.
      //     console.log('not logged in')
      //   }
      // });
     // var user = firebase.auth().currentUser;
      if (user) {
        // User is signed in.
        console.log(user);
        console.log("signed in");
      } else {
        // No user is signed in.
        console.log("signed out");
        console.log(user);
      }
    }
  },
  mounted() {},
  components: {
    stockCard,
    // topNavBar:header,
    sideBar
  }
  // }
};
</script>

<style scoped>
  body{
    background-color: #black;
    background-size: 100%;
    background-size: cover;
  }
.container {
  font-family: "Roboto", sans-serif;
  width: 100%;
  /*margin: 210px auto;*/
  background: #e5e5e517;
  display: flex;
  width: 100%;
  height: 100vh;
  background: yellow;
  background-size: cover;
  align-items: stretch;

}
.funds-div {
  position: absolute;
  left: 90%;
  top: 40px;
}
.search-box {
  position: absolute;
  width: 50%;
  left: 1%;
  top: 65px;
}

.card {
  position: absolute;
  left: 800px;
}
.form-control {
  border-radius: 100px;
  width: 400px;
}

#searchBuy {
  border-radius: 5px;
  width: 80px;
}
.main-box {
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.main-header {
  font-weight: 500;
  font-size: 40px;
  letter-spacing: 25px;
  animation-name: moveInLeft;
  animation-duration: 1.7s;
  animation-timing-function: ease-out;
}
input-group {
  margin-top: 25px;
}
.input-groupmb-3 {
  margin-top: 25px;
}
.infoRight {
  margin-left: 140px;
}
/* .main-search {
  margin-left: 120px;
  width: 60%;
} */
.card-info {
  font-weight: 300;
  font-family: "Roboto", sans-serif;
  letter-spacing: 4px;
  font-weight: 400;
}
/* .card-body-stock { */
/* width: 60%; */
/* width: 40rem;
  height: 20rem;
  box-shadow: 2px 2px 2px 0 hsla(0, 0%, 0%, 0.5);
  font-family: "Roboto", sans-serif;
  border-radius: 15px;
  border: black;
  position: absolute;
  top: 200px;
  left: 15px; */
/* } */

.card-info-left {
  position: relative;
  left: 25px;
  /* background-color: black; */
  width: 50%;
  float: left;
}
.card-info-right {
  position: relative;
  /* background-color: red; */
  width: 50%;
  float: right;
  letter-spacing: 4px;
  font-weight: 400;
}
.input-group-append {
  width: 400px;
}
.chart-container {
  width: 800px;
  height: 500px;
}
/* canvas {
    width:800px !important;
    height:700px !important;
} */

@keyframes moveInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }

  80% {
    transform: translateX(15px);
  }

  100% {
    opacity: 1;

    /* We use tranlate 0 since it just renders it to how it actually is */
    transform: translate(0);
  }
}
</style>
