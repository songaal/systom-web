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
  props: ['drawdowns'],
  data () {
    return {
      chart: null,
      chartConfig: {
        hideCredits: true,
        path: '/libs/amcharts/',
        pathToImages: 'http://cdn.amcharts.com/lib/3/images/',
        type: 'serial',
        theme: 'light',
        marginRight: 20,
        marginLeft: 50,
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
          balloonText: '<span>[[value]]</span>'
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
        categoryAxis: {
          parseDates: true,
          dashLength: 1,
          minorGridEnabled: true,
          minPeriod: 'mm'
        },
        export: {
          enabled: true
        },
        dataProvider: []
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    zoomChart () {
      this.chart.zoomToIndexes(this.chart.dataProvider.length - 40, this.chart.dataProvider.length - 1)
    },
    yyyymmdd (date) {
      let yyyy = date.getFullYear().toString()
      let mm = (date.getMonth() + 1).toString()
      let dd = date.getDate().toString()
      return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0])
    }
  },
  beforeCreate () {},
  created () {
    this.chartConfig.dataProvider = []
    if (this.drawdowns !== null && this.drawdowns !== undefined) {
      Object.keys(this.drawdowns).forEach((key, i) => {
        let tick = {
          date: AmCharts.stringToDate(Utils.timestampToTime(key), Config.amChartDateFormat),
          value: this.drawdowns[key] * -1
        }
        this.chartConfig.dataProvider.push(tick)
      })
    }
  },
  beforeMount () {},
  mounted () {
    this.chart = AmCharts.makeChart(this.$refs.drawdownChart, this.chartConfig)
  },
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>

</style>
