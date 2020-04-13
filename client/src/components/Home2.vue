<template>
  <div class="wrapper">
    <side-bar2></side-bar2>
    <div id="content">
      <navBar v-on:chartData="canvas" v-on:stockInfo="stockCard"></navBar>
      <div id="dashboard-container" class="dashboard-container">
        <div id="chart-body-container" class="chart-card-body">
          <div id="chart-container" class="chart-container">
            <loader></loader>
            <canvas id="myChart" class="canvasChart" height="320px"></canvas>
          </div>
        </div>
        <stockCard
          @stockBought="stockBought"
          :results="stockInfo"
          :funds="funds"
          v-if="this.stockPicked === true"
        ></stockCard>
        <div v-if="this.stockPicked === false" class="main-box">
          <h1 class="main-header">
            <span class="primary-header">TRADE STOCKS</span>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar2 from "./sideBar2";
import navBar from "./navBar";
import stockCard from "./stockCard";
import { db, increment } from "../main.js";
import loader from "../components/loader";
import axios from "axios";

var myChart;
export default {
  name: "Home2",
  components: {
    sideBar2: sideBar2,
    navBar: navBar,
    // dashboard: dashboard,
    stockCard,
    loader
  },
  data() {
    return {
      funds: 0,
      success: false,
      stockInfo: {},
      timeSeries: [],
      myChart: null,
      stockData: false,
      canvasData: {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              fill: false,
              label: "Monthly",
              data: [],
              backgroundColor: " rgb(34, 51, 38);",
              borderColor: " rgb(34, 51, 38);",
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
                  labelString: "Date"
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
      // stockPicked: false
    };
  },
  methods: {
    canvas(canvasData) {
      this.canvasData = canvasData;
      this.createChart("Intra Day Chart", canvasData);
    },
    createChart(chartId, chartData) {
      if (myChart) {
        document.getElementById("myChart").remove();
        let canvas = document.createElement("canvas");
        canvas.setAttribute("id", "myChart");
        canvas.setAttribute("width", "300px");
        canvas.setAttribute("height", "300px");
        document.getElementById("chart-container").appendChild(canvas);
        myChart.destroy();
      }
      var ctx = document.getElementById("myChart").getContext("2d");

      myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
      this.stockData = true;
    },
    stockCard(stockInfo) {
      this.stockInfo = stockInfo;
    },
    stockBought() {
      this.success = true;
    }
  },
  mounted() {
    if (
      this.$store.getters.getUserFunds === null ||
      this.$store.getters.getUserFunds === undefined
    ) {

      let token = localStorage.getItem("token");
      axios
        .get("http://localhost:5000/portfolio/", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          this.funds = res.data.funds;
          this.portfolio = res.data.stock;
        })
        .then(() => {
          this.loaded = true;
          this.$store.commit("updateFunds", this.funds);
        })
        .then(() => {
          this.$store.commit("SET_PORTFOLIO", this.portfolio);
        })
        .catch(err => {
          // Hnadle all errors from server
          console.log(err);
        });
    } else {
      this.funds = this.$store.getters.getUserFunds;
      this.portfolio = this.$store.state.stocks;
      this.loaded = true;
    }
  },
  computed: {
    //Checking if the stock info object is empty
    stockPicked: function() {
      for (var key in this.stockInfo) {
        if (this.stockInfo.hasOwnProperty(key)) return true;
      }
      return false;
    },
    timeSeriesPicked: function() {
      if (this.canvasData.data) {
      }
    }
  }
};
</script>

<style scoped>
.main-box {
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.main-header {
  font-weight: 900;
  font-size: 40px;
  letter-spacing: 25px;
  animation-name: moveInLeft;
  animation-duration: 1.7s;
  animation-timing-function: ease-out;
}
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
/* ---------------------------------------------------
          Chart STYLE
   ----------------------------------------------------- */
.body {
  /* font-family: "Oswald"; */
  background: #fafafa;
  font-family: "Montserrat", sans-serif;
}
.dashboard-container {
  /* background: yellow; */
  display: flex;
  flex-flow: row wrap;
  /*justify-content: space-between;*/
  /*border: 2px solid red;*/
  height: 100vh;
  padding: 5px;
}
.dashboard-graph {
  height: 50px;
  border: 2px solid red;
  flex: flex-grow;
}
.dashboard-info {
  background: black;
  height: 100px;
  border: 2px solid red;
}
.chart-card-body {
  /* width: 60%; */
  width: 90%;
  height: 25rem;
  /* box-shadow: 2px 2px 2px 0 hsla(0, 0%, 0%, 0.5); */
  border-radius: 15px;
  border: black;
  /*position: absolute;*/
  /* top: 150px;
  left: 120px; */
  /*background: blue;*/
  margin: 5px;
  /*flex: flex-grow;*/
  /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1); */
}

.loader-container {
  font-family: "Montserrat", sans-serif;
  position: relative;
  bottom: 50%;
}
p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
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
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1); */
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
/* ---------------------------------------------------
        SIDEBAR STYLE
    ----------------------------------------------------- */
$lila: $turbo-yellow /*#7386D5*/;
$lila-60: $turbo-yellow-60 /*#6d7fcc*/;
$lila-line: $turbo-yellow-70 /*#47748b*/;
$text-sidebar: #6b6b6b /*#fff*/;
$text-sidebar-hover: #6b6b6b /*#fff*/;
.text-sidebar {
  color: $text-sidebar;
}
.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
  font-family: "Montserrat", sans-serif;
}

#sidebar.active {
  margin-left: -250px;
}
#sidebar .sidebar-header {
  padding: 20px;
  background: $lila-60 /*#6d7fcc*/;
}
#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid $lila-line;
}
#sidebar ul p {
  color: $text-sidebar;
  padding: 10px;
}
#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}
#sidebar ul li a:hover {
  color: $lila;
  background: $text-sidebar-hover;
}
#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: $text-sidebar;
  background: $lila-60;
}
a[data-toggle="collapse"] {
  position: relative;
}
.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: $lila-60;
}
ul.CTAs {
  padding: 20px;
}
ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}
a.download {
  background: $text-sidebar;
  color: $lila;
}
a.article,
a.article:hover {
  background: $lila-60 !important;
  color: $text-sidebar !important;
}
/* ---------------------------------------------------
        CONTENT STYLE
    ----------------------------------------------------- */
#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
  /*background:blue;*/
}
/* ---------------------------------------------------
        MEDIAQUERIES
    ----------------------------------------------------- */
@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
  }
  #sidebar.active {
    margin-left: 0;
  }
  #sidebarCollapse span {
    display: none;
  }
}
</style>