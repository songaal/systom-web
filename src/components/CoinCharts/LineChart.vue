<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'height'],
  data () {
    return {
      chartOption: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.data, this.chartOption)
  }
}
</script>
