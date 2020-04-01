<template>
  <div class="dashboard-container">
    <div class="dashboard-graph">
      <div class="card-body">
          <div v-if="this.canvasCreated" id="chart-container">
            <canvas id="myChart" width="320px" height="320px"></canvas>
          </div>
        </div>
        <p>{{getTimeSeries}}</p>
    </div>
    <!-- <div>{{getstockInfo}}</div> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
var myChart;
export default {
  data (){
    return {
      stockInfo: [],
      timeSeries:[],
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
      },
      canvasCreated: false
    }
  },
  created() {

  },
  methods: {
      canvas(canvasData) {
        console.log('121221121212121212121212')
      this.createChart("Intra Day Chart", canvasData);
    },

    createChart(chartId, chartData) {
      console.log("chartData" );
      console.log(chartId)
      console.log(chartData)

      if (myChart) {
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
      console.log("ctx" + myChart);
      console.log('xoxoxoxoxoxoxoxoxoxo')
      const ctx = document.getElementById("myChart").getContext("2d");

      myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
      this.canvasCreated = true;
    },
  },
  computed: {
    // ...mapGetters([
    //   'getstockInfo',
    //   'gettimeSeries'
    // ]),
    getTimeSeries (){
      console.log('triggered')
       this.canvas(this.$store.getters.getTimeSeries);
       //this.canvasCreated = true
      //return this.$store.getters.getTimeSeries

    },
    getstockInfo (){
      return this.$store.getters.getStockInfo
    }
  },
  watch:{

  }
};
</script>

<style scoped>
.dashboard-container {
  /* background: yellow; */
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  flex-wrap: wrap;
  border: 2px solid red;
  height: 100vh;
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

.card-body {
  /* width: 60%; */
  width: 680px;
  height: 25rem;
  box-shadow: 2px 2px 2px 0 hsla(0, 0%, 0%, 0.5);
  font-family: "Roboto", sans-serif;
  border-radius: 15px;
  border: black;
  position: absolute;
  top: 150px;
  left: 120px;

  /*background: blue;*/
}
</style>