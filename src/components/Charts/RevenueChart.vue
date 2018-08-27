<template>
  <div>
    <div id='chartdiv' style='width: 100%; height: 200px;' ref='revenueChart'></div>
  </div>
</template>
<script>
import 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import 'amcharts3/amcharts/themes/light'

export default {
  name: 'RevenueChart',
  props: ['revenues', 'fromDate', 'toDate', 'status', 'isTest'],
  data () {
    return {
      chart: '',
      chartconfig: {
        hideCredits: true,
        path: '/libs/amcharts/',
        pathToImages: 'http://cdn.amcharts.com/lib/3/images/',
        type: 'serial',
        theme: 'light',
        marginRight: 5,
        marginLeft: 35,
        autoMarginOffset: 20,
        // dataDateFormat: 'YYYY.MM.DD',
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
          categoryBalloonDateFormat: 'YYYY.MM.DD',
          cursorAlpha: 0,
          zoomable: true,
          valueZoomable: true,
          valueLineAlpha: 0.5,
          categoryBalloonEnabled: true
        },
        categoryField: 'date',
        // categoryAxis: {
        //   parseDates: true,
        //   dashLength: 1,
        //   minorGridEnabled: true,
        //   minPeriod: 'DD'
        // },
        // export: {
        //   enabled: true
        // },
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
    },
    setData () {
      this.chartconfig.dataProvider = []
      if (this.fromDate !== undefined && this.fromDate !== null && this.toDate !== undefined && this.toDate !== null) {
        let tmpFromDate = this.deConvertDate(this.fromDate.replace(/-/g, ''))
        let tmpToDate = this.deConvertDate(this.toDate.replace(/-/g, ''))
        let current = []
        let index = 0
        for (let current = tmpFromDate; current.getTime() <= tmpToDate.getTime(); current.setDate(current.getDate() + 1)) {
          current[index++] = current
          let ts = current.getTime()
          let date = new Date()
          date.setTime(ts)
          date.setMonth(date.getMonth() - 1)
          let tmp = null
          let y = current.getFullYear()
          let m = (Number(current.getMonth()) + 1) < 10 ? '0' + (Number(current.getMonth())) : (Number(current.getMonth()))
          let d = current.getDate() < 10 ? '0' + current.getDate() : current.getDate()
          let strDate = String(y) + String(m) + String(d)
          if (this.isTest === 'true') {
            tmp = this.revenues[strDate]
          } else {
            if (this.revenues !== undefined && this.revenues !== null && this.revenues.length > 0) {
              this.revenues.forEach(o => {
                if (strDate === o.date) {
                  tmp = o.cumReturnsPct
                }
              })
            } else {
              tmp = 0
            }
          }
          let tick = {
            date: AmCharts.formatDate(date, 'YY.MM.DD'),
            value: tmp === null ? undefined : tmp
          }
          this.chartconfig.dataProvider.push(tick)
        }
        setTimeout(() => {
          this.chart = AmCharts.makeChart(this.$refs.revenueChart, this.chartconfig)
        }, 500)
      }
    }
  },
  watch: {
    revenues () {
      this.setData()
    }
  },
  created () {
    this.setData()
  },
  mounted () {}
}
</script>

<style scoped>

</style>
