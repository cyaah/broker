<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="search-container" v-if="this.$route.path === '/'">
          <!--          <div v-if="this.error === true " class="alert alert-dark" role="alert">-->
          <!--            Error stock ticker "{{searchTerm}}" cannot be found. Try another ticker-->
          <!--            <button type="button" class="close" data-dismiss="alert" aria-label="Close">-->
          <!--              <span aria-hidden="true">&times;</span>-->
          <!--            </button>-->
          <!--          </div>-->
          <input
            v-on:keyup.enter="search"
            v-on:keyyp.enter="canvas"
            v-on:click="errorChange"
            type="search"
            class="form-control"
            placeholder="Enter Stock Ticker"
            aria-label="Recipient's username"
            v-model="searchTerm"
            id="main-search"
          />
        </div>
        <div v-if="this.error === true" class="alert alert-dark" role="alert">
          Error stock ticker "{{ searchTerm }}" cannot be found. Try another
          ticker
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
            @click="errorReset"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <ul class="nav navbar-nav ml-auto">
          <li>
            <span id="user" class="funds">{{ userName }}</span>
          </li>
          <li class="fundsLi">
            <span class="funds">{{ funds | currency }}</span>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-primary-outline"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="logout"
            >Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { store } from "./store/store.js";
import firebase from "firebase";
import { db } from "../main.js";
var jwtDecode = require('jwt-decode');


export default {
  name: "navBar",
  data() {
    return {
      userName: "",
      searchTerm: "",
      term: "",
      timeSeriesData: [],
      results: {},
      myChart: null,
      error: false,
      canvasData: {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              fill: false,
              label: "Monthly",
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
    var user = firebase.auth().currentUser;
    let token = localStorage.getItem('token');
    let decoded = jwtDecode(token);
    this.userName = decoded.credentials.userName;


  },
  computed: {
    funds() {
      return this.$store.getters.getUserFunds;
    }
  },
  methods: {
    searchToggle(obj, evt) {
      var container = $(obj).closest(".search-wrapper");
      if (!container.hasClass("active")) {
        container.addClass("active");
        evt.preventDefault();
      } else if (
        container.hasClass("active") &&
        $(obj).closest(".input-holder").length == 0
      ) {
        container.removeClass("active");
        // clear input
        container.find(".search-input").val("");
      }
    },
    logout() {
      console.log('logggg')
     this.$store.dispatch("doLogout");
     this.$router.push({ path: "login" }).catch(err=>{console.log(err)});
    },
    search: function() {
      let token = localStorage.getItem('token')
      var term = this.searchTerm;
      //   if (this.myChart != null) {
      //     this.myChart.destroy();
      this.canvasData.data.datasets[0].data = [];
      this.canvasData.data.labels = [];
      //   }
      this.results = [];
      this.$store.dispatch("changeLoading", true); //Getting stock price info
      // axios
      //   .get(
      //     `https://cloud.iexapis.com/stable/stock/${encodeURIComponent(
      //       term
      //     )}/quote?token=pk_f606ae9814ec4d9e991aa1def338e260`
      //   )
       axios
        .get(
          `http://localhost:5000/search/stock?ticker=${encodeURIComponent(
            term
          )}`, { headers: {"Authorization" : `Bearer ${token}`}}
        )
        .then(res => {
          if (res) {
            this.results = {};
            this.noResults = false;
            var s = res.data.stockInfo;

            //fix this logic
            if (isEmpty(s)) {
              this.noResults = true;
            } else {
              //turning the object and storing it in an array
              this.notSearched = false;
              this.results = s;
            }
          }
        })
        .then(res => {
          this.$store.dispatch("getStockInfo", this.results);
          this.$emit("stockInfo", this.results);

          this.error = false;
        })
        .catch(err => {
          console.log(err);

          this.$store.dispatch("changeLoading", false);
        });
      //Getting time series data
      axios
        .get(
          `http://localhost:5000/search/timeseries?ticker=${encodeURIComponent(
            term
          )}`, { headers: {"Authorization" : `Bearer ${token}`}}
        )
        .then(res => {
          console.log('IN HEREREERERRE')
          this.timeSeriesData = res.data;

          this.canvasData.data.labels =  this.timeSeriesData.labels
          this.canvasData.data.datasets[0].data = this.timeSeriesData.dataPoints
          this.$emit("chartData", this.canvasData);
          // this.canvas();
        })
        .then(res => {
          this.$store.dispatch("getTimeSeries", this.canvasData);
          // this.$emit("chartData", this.canvasData);
        })
        .then(() => {
          if(this.$router.currentRoute.fullPath !== '/'){
          this.$router.push({ path: "/" }).catch(err=>{console.log(err)});
          }
          this.$store.dispatch("changeLoading", false);
        })
        .catch(err => {

          this.$store.dispatch("changeLoading", false);
          this.error = true;
          console.log(err);
        });

      var isEmpty = obj => {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            return false;
          }
        }
        return true;
      };
      // var stockInfo = { timeseries: this.timeSeriesData, stock: this.results };
      this.term = "";
      this.noResults = false;
      // this.$router.push({ path: "/" });
      // this.searchTerm = "";
    },
    canvas: function() {
      this.createChart("Intra Day Chart", this.canvasData);
    },
    errorChange: function() {
      this.error = false;
    },
    errorReset: function() {
      this.error = false;
    }
  },
  filters: {
    currency: function(value) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    }
  }
};
</script>

<style scoped>
$turbo-yellow: #ffcc19;
$turbo-yellow-10: lighten($turbo-yellow, 40%);
$turbo-yellow-20: lighten($turbo-yellow, 30%);
$turbo-yellow-30: lighten($turbo-yellow, 20%);
$turbo-yellow-40: lighten($turbo-yellow, 10%);
$turbo-yellow-50: lighten($turbo-yellow, 0%);
$turbo-yellow-60: darken($turbo-yellow, 10%);
$turbo-yellow-70: darken($turbo-yellow, 20%);
$turbo-yellow-80: darken($turbo-yellow, 30%);
$turbo-yellow-90: darken($turbo-yellow, 40%);

.bg-turbo-yellow {
  background-color: $turbo-yellow;
}

.bg-turbo-yellow-10 {
  background-color: $turbo-yellow-10;
}
.bg-turbo-yellow-20 {
  background-color: $turbo-yellow-20;
}
.bg-turbo-yellow-30 {
  background-color: $turbo-yellow-30;
}
.bg-turbo-yellow-40 {
  background-color: $turbo-yellow-40;
}
.bg-turbo-yellow-50 {
  background-color: $turbo-yellow-50;
}
.bg-turbo-yellow-60 {
  background-color: $turbo-yellow-60;
}
.bg-turbo-yellow-70 {
  background-color: $turbo-yellow-70;
}
.bg-turbo-yellow-80 {
  background-color: $turbo-yellow-80;
}
.bg-turbo-yellow-90 {
  background-color: $turbo-yellow-90;
}

.container-fluid {
  font-family: "Montserrat", sans-serif;
}
.funds {
  font-weight: bold;
  letter-spacing: 1.5px;
  font-size: 20px;
}

.btn-primary-outline {
  background-color: transparent;
  bottom: 7px;

  position: relative;
  font-weight: bolder;
  font-size: 20px;
  letter-spacing: 1.5px;
}

p {
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

#user {
  right: 10px;
  position: relative;
  font-family: "Montserrat", sans-serif;
}
a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.navbar {
  padding: 15px 10px;
  /*background: yellow;*/
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1); */
}
nav li {
  display: inline-block;
  padding: 0 0.25em 0 0;
}

nav li:after {
  content: " | ";
  color: #ccc;
  display: inline-block;
  font-size: 100%;
  margin: 0 0 0 0.5em;
}

nav li:last-child:after {
  content: " ";
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}

.search-container {
  width: 55%;
  position: relative;
  right: 00px;
  background: white;
}

.search-form {
  /*height: 90px;*/
  width: 35%;
}

.search-container {
  color: #666;
  font-family: "Montserrat", sans-serif;
  /* width: 800px; */
  max-width: 96%;
  /* right: 90%;
  position: relative; */
}
/* .form-control {
  right: 60%;
  position: relative;
} */
input {
  outline: none;
}
input[type="search"] {
  -webkit-appearance: textfield;
  -webkit-box-sizing: content-box;
  font-family: inherit;
  font-size: 100%;
}
input::-webkit-search-decoration,
input::-webkit-search-cancel-button {
  display: none;
}

input[type="search"] {
  background: #ededed
    url(https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png) no-repeat
    9px center;
  border: solid 1px #ccc;
  padding: 9px 10px 9px 32px;
  width: 90px;

  -webkit-border-radius: 10em;
  -moz-border-radius: 10em;
  border-radius: 10em;

  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}
input[type="search"]:focus {
  width: 150px;
  background-color: #fff;
  border-color: #2ba84a;

  -webkit-box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
  -moz-box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);

  box-shadow: 0 0 5px rgba(109, 207, 246, 0.5);
}

input:-moz-placeholder {
  color: #999;
}
input::-webkit-input-placeholder {
  color: #999;
}

.alert-dark {
  right: 80px;
}
</style>
