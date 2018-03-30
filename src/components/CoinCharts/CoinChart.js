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
      labels: ['2018/09/01 11:01', '2018/09/01 11:02', '2018/09/01 11:03', '2018/09/01 11:03', '2018/09/01 11:04', '2018/09/01 11:05', '2018/09/01 11:05'],
      datasets: [
        {
          label: 'price',
          borderColor: '#115533',
          fill: false,
          data: [55, 56, 45, 77, 33, 22, 400]
        },
        {
          label: 'sma',
          borderColor: '#111111',
          fill: false,
          data: [10, 29, 30, 50, 59, 81, 40]
        },
        {
          label: 'lma',
          borderColor: '#eeaabb',
          fill: false,
          data: [140, 239, 310, 440, 39, 80, 40]
        },
        {
          label: 'sell',
          backgroundColor: '#f44242',
          type: 'bubble',
          data: [
            {x: '2018/09/01 11:01', y: 55, r: 10},
            {x: '2018/09/01 11:03', y: 45, r: 10},
            {x: '2018/09/01 11:05', y: 77, r: 10}
          ]
        },
        {
          label: 'buy',
          backgroundColor: '#4153f4',
          type: 'bubble',
          data: [
            {x: '2018/09/01 11:02', y: 56, r: 10},
            {x: '2018/09/01 11:04', y: 33, r: 10}
          ]
        },
        {
          label: 'volume',
          backgroundColor: '#41f44c',
          type: 'bar',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
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
