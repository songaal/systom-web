<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'SparkLine',
  extends: Line,
  props: ['height', 'labels', 'datasets'],
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: this.datasets
    }, {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent'
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent'
          }
        }],
        yAxes: [{
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, this.datasets[0].data) - 5,
            max: Math.max.apply(Math, this.datasets[0].data) + 5
          }
        }]
      },
      elements: {
        line: {
          borderWidth: 1
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4
        }
      }
    })
  }
}
</script>
