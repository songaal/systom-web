<template>
  <div>
    <div id="chartdiv" style='width: 100%; height: 200px;' ref='drawdownChart'></div>
  </div>
</template>

<script>
import 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import 'amcharts3/amcharts/themes/light'
import Utils from '../../Utils'
import Config from '../../Config'

export default {
  name: 'DrawdownChart',
  components: {},
  props: ['drawdowns', 'fromDate', 'toDate', 'isTest'],
  data () {
    return {
      chart: null,
      chartConfig: {
        hideCredits: true,
        path: '/libs/amcharts/',
        pathToImages: 'http://cdn.amcharts.com/lib/3/images/',
        type: 'serial',
        theme: 'light',
        marginRight: 5,
        marginLeft: 35,
        autoMarginOffset: 20,
        dataDateFormat: Config.amChartDateFormat,
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
          fillAlphas: 0.2,
          selectBackgroundColor: 'red',
          lineColor: 'red',
          hideBulletsCount: 50,
          lineThickness: 1,
          title: 'red line',
          useLineColorForBulletBorder: true,
          valueField: 'value',
          balloonText: '<span>[[value]] %</span>'
        } ],
        chartCursor: {
          pan: true,
          valueLineEnabled: true,
          valueLineBalloonEnabled: true,
          categoryBalloonDateFormat: Config.amChartDateFormat,
          cursorAlpha: 0,
          zoomable: true,
          valueZoomable: true,
          valueLineAlpha: 0.5
        },
        categoryField: 'date',
        // categoryAxis: {
        //   parseDates: true,
        //   dashLength: 1,
        //   minorGridEnabled: true,
        //   minPeriod: 'mm'
        // },
        // export: {
        //   enabled: true
        // },
        dataProvider: []
      }
    }
  },
  computed: {},
  watch: {
    drawdowns () {
      this.setData()
    }
  },
  methods: {
    zoomChart () {
      this.chart.zoomToIndexes(this.chart.dataProvider.length - 40, this.chart.dataProvider.length - 1)
    },
    yyyymmdd (date) {
      let yyyy = date.getFullYear().toString()
      let mm = (date.getMonth() + 1).toString()
      let dd = date.getDate().toString()
      return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0])
    },
    deConvertDate (date) {
      let y = Number(date.substring(0, 4))
      let m = Number(date.substring(4, 6))
      let d = Number(date.substring(6, 8))
      return new Date(y, m, d)
    },
    setData () {
      this.chartConfig.dataProvider = []
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
            tmp = Number(this.drawdowns[strDate]) * -1
          } else {
            this.drawdowns.forEach(o => {
              if (strDate === o.date) {
                tmp = Number(o.cumReturnPct) * -1
              }
            })
          }
          let tick = {
            // date: AmCharts.formatDate(date, 'YYYY.MM.DD'),
            date: AmCharts.formatDate(date, 'YY.MM.DD'),
            value: tmp === null ? undefined : tmp
          }
          this.chartConfig.dataProvider.push(tick)
        }
        setTimeout(() => {
          this.chart = AmCharts.makeChart(this.$refs.drawdownChart, this.chartConfig)
        }, 500)
      }
    }
  },
  beforeCreate () {},
  created () {
    this.setData()
    // this.chartConfig.dataProvider = []
    // if (this.drawdowns !== null && this.drawdowns !== undefined) {
    //   Object.keys(this.drawdowns).forEach((key, i) => {
    //     let tick = {
    //       date: AmCharts.stringToDate(Utils.timestampToTime(key), Config.amChartDateFormat),
    //       value: this.drawdowns[key] * -1
    //     }
    //     this.chartConfig.dataProvider.push(tick)
    //   })
    // }
  },
  beforeMount () {},
  mounted () {
    // this.chart = AmCharts.makeChart(this.$refs.drawdownChart, this.chartConfig)
  },
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>

</style>
