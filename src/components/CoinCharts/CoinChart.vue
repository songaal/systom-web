<template lang="html">
  <div>
    <select id="type">
  		<option value="line">Line</option>
  		<option value="bar">Bar</option>
  	</select>
  	<button id="update">update</button>
  </div>
</template>

<script>
import moment from 'moment'
import Chart from 'chart.js'

export default {
  methods: {
    randomNumber (min, max) {
      return Math.random() * (max - min) + min
    },
    randomBar (date, lastClose) {
      var open = this.randomNumber(lastClose * 0.95, lastClose * 1.05)
      var close = this.randomNumber(open * 0.95, open * 1.05)
      return {
        t: date.valueOf(),
        y: close
      }
    },
    typeEvent () {
      var type = document.getElementById('type').value
      this.$data.config.data.datasets[0].type = type
      this.$data.update()
    }
  },
  mounted () {
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

    var ctx = document.getElementById('chart1').getContext('2d')
    ctx.canvas.width = 1000
    ctx.canvas.height = 300
    var cfg = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'CHRT - Chart.js Corporation',
          data: data,
          type: 'line',
          pointRadius: 0,
          fill: false,
          lineTension: 0,
          borderWidth: 2
        }]
      },
      options: {
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
        }
      }
    }
    this.$data._chart = new Chart(ctx, cfg)

    document.getElementById('update').addEventListener('click', this.typeEvent)
  },
  components: {
    moment
  }
}
</script>

<style lang="css">
</style>
