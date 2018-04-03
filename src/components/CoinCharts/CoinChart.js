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
  props: ['height', 'chartData'],
  data () {
    return {
      chartOption: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          intersect: true
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.chartOption)
  }
}
