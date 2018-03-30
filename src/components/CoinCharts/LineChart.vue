<script>
import { Bar } from './BaseCharts'
import moment from 'moment'

export default {
  extends: Bar,
  data () {
    return {
      chartData: {
        labels: [],
        date: [],
        datasets: [{
          label: 'CHRT - Chart.js Corporation',
          data: [],
          type: 'line',
          pointRadius: 0,
          fill: false,
          lineTension: 0,
          borderWidth: 2
        }]
      },
      chartOptions: {
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            ticks: {
              source: 'labels'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Closing price ($)'
            }
          }]
        },
        height: 200
      }
    }
  },
  created () {
    var dateFormat = 'MMMM DD YYYY'
    var date = moment('April 01 2017', dateFormat)
    var data = [this.randomBar(date, 30)]
    var labels = [date]
    while (data.length < 60) {
      date = date.clone().add(1, 'd')
      if (date.isoWeekday() <= 5) {
        data.push(this.randomBar(date, data[data.length - 1].y))
        labels.push(date)
      }
    }

    this.chartData.labels = labels
    this.chartData.date = date
    this.chartData.datasets.data = data
  },
  methods: {
    randomNumber (min, max) {
      return Math.random() * (max - min) + min
    },
    randomBar (date, lastClose) {
      let open = this.randomNumber(lastClose * 0.95, lastClose * 1.05)
      let close = this.randomNumber(open * 0.95, open * 1.05)
      return {
        t: this.chartData.date.valueOf(),
        y: close
      }
    }
  },
  mounted () {
    console.log('data', this.chartData.datasets.data)
    this.renderChart(this.chartData.datasets.data, this.chartOptions)
  }
}
</script>
