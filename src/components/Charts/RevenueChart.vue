<template>
  <div>
    <div id='chartdiv' style='width: 100%; height: 200px;' ref='revenueChart'></div>
  </div>
</template>
<script>
import 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import 'amcharts3/amcharts/themes/light'
import Utils from '../../Utils'
import Config from '../../Config'

export default {
  name: 'RevenueChart',
  props: ['revenues', 'fromDate', 'toDate'],
  data () {
    return {
      chart: '',
      chartConfig: {
        hideCredits: true,
        path: '/libs/amcharts/',
        pathToImages: 'http://cdn.amcharts.com/lib/3/images/',
        type: 'serial',
        theme: 'light',
        marginRight: 5,
        marginLeft: 30,
        autoMarginOffset: 20,
        dataDateFormat: 'YYYY-MM-DD',
        valueAxes: [ {
          id: 'v1',
          axisAlpha: 0,
          position: 'left',
          ignoreAxisWidth: true
        } ],
        balloon: {
          borderThickness: 1,
          shadowAlpha: 0
        },
        graphs: [ {
          id: 'g1',
          fillAlphas: 0,
          lineColor: '#3579e8',
          hideBulletsCount: 50,
          lineThickness: 1,
          useLineColorForBulletBorder: true,
          valueField: 'value',
          balloonText: '[[value]] %'
        } ],
        chartCursor: {
          pan: true,
          valueLineEnabled: true,
          valueLineBalloonEnabled: true,
          categoryBalloonDateFormat: 'YYYY-MM-DD',
          cursorAlpha: 0,
          zoomable: true,
          valueZoomable: true,
          valueLineAlpha: 0.5
        },
        categoryField: 'date',
        categoryAxis: {
          parseDates: true,
          dashLength: 1,
          minorGridEnabled: true,
          minPeriod: 'DD'
        },
        export: {
          enabled: true
        },
        dataProvider: []
      }
    }
  },
  methods: {
    deConvertDate (date) {
      let y = Number(date.substring(0, 4))
      let m = Number(date.substring(4, 6))
      let d = Number(date.substring(6, 8))
      return new Date(y, m, d)
    }
  },
  watch: {
    revenues () {
      this.chartConfig.dataProvider = []
      if (this.fromDate !== undefined && this.fromDate !== null && this.toDate !== undefined && this.toDate !== null) {
        let tmpFromDate = this.deConvertDate(this.fromDate)
        let tmpToDate = this.deConvertDate(this.toDate)
        let current = []
        let index = 0
        for (let current = tmpFromDate; current.getTime() <= tmpToDate.getTime();) {
          current[index++] = current
          let ts = current.getTime()
          let date = new Date()
          date.setTime(ts)
          date.setMonth(date.getMonth() - 1)
          let tmp = null
          let y = current.getFullYear()
          let m = (Number(current.getMonth()) + 1) < 10 ? '0' + (Number(current.getMonth())) : (Number(current.getMonth()))
          let d = current.getDate() < 10 ? '0' + current.getDate() : current.getDate()
          this.revenues.forEach(o => {
            let tmpDate = String(y) + String(m) + String(d)
            if (tmpDate === o.date) {
              tmp = o.cumReturnPct
            }
          })
          // AmCharts.stringToDate(Utils.timestampToTime(date.getTime()), 'YYYY-MM-DD'),
          console.log(date, tmp)
          if (tmp !== null) {
            let tick = {
              date: AmCharts.formatDate(date, 'YYYY.MM.DD'),
              value: tmp
            }
            this.chartConfig.dataProvider.push(tick)
          }
          current.setDate(current.getDate() + 1)
        }
        setTimeout(() => {
          this.chart = AmCharts.makeChart(this.$refs.revenueChart, this.chartConfig)
        }, 500)
      }
    }
  },
  created () {
  },
  mounted () {}
}
</script>

<style scoped>

</style>
