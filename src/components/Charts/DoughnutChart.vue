<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['type'],
  mounted () {
    if (this.type === 'revenue') {
      this.renderChart({
        labels: ['이동평균전략', '복합기술분석전략', '테스트전략'],
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF'
            ],
            data: [1, 1, 1]
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    } else if (this.type === 'risk') {
      this.renderChart({
        labels: ['A등급', 'B등급', 'C등급', 'D등급'],
        datasets: [
          {
            backgroundColor: [
              '#42f47d',
              '#41ebf4',
              '#4144f4',
              '#e841f4',
              '#42f47d'
            ],
            data: [1, 1, 1, 0, 0, 0]
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    }
  }
}
</script>
