import Chart from 'chart.js'
import { generateChart } from './BaseCharts'

Chart.defaults.LineWithLine = Chart.defaults.line
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  draw: function (ease) {
    Chart.controllers.line.prototype.draw.call(this, ease)

    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      let activePoint = this.chart.tooltip._active[0]
      let ctx = this.chart.ctx
      let x = activePoint.tooltipPosition().x
      let topY = this.chart.scales['y-axis-0'].top
      let bottomY = this.chart.scales['y-axis-0'].bottom

      // draw line
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x, topY)
      ctx.lineTo(x, bottomY)
      ctx.lineWidth = 2
      ctx.strokeStyle = '#07C'
      ctx.stroke()
      ctx.restore()
    }
  }
})

const LineWithLine = generateChart('line-with-chart', 'LineWithLine')

export default {
  extends: LineWithLine,
  props: ['height'],
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'MA5',
          backgroundColor: '#111111',
          fill: false,
          data: [10, 29, 30, 50, 59, 81, 40]
        },
        {
          label: 'MA50',
          backgroundColor: '#eeaabb',
          fill: false,
          data: [140, 239, 310, 440, 39, 80, 40]
        },
        {
          label: 'price',
          backgroundColor: '#115533',
          fill: false,
          data: [55, 56, 45, 77, 33, 22, 13]
        }
      ]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        intersect: false
      }
    })
  }
}
