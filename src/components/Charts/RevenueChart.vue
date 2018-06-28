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
  props: ['revenues'],
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
  methods: {},
  watch: {
    revenues () {
      this.chartConfig.dataProvider = []
      if (this.revenues !== null && this.revenues !== undefined) {
        let sum = 0
        Object.keys(this.revenues).forEach((key, i) => {
          let tick = {
            date: AmCharts.stringToDate(Utils.timestampToTime(key), Config.amChartDateFormat),
            value: this.revenues[key]
          }
          this.chartConfig.dataProvider.push(tick)
        })
      }
      setTimeout(() => {
        this.chart = AmCharts.makeChart(this.$refs.revenueChart, this.chartConfig)
      }, 500)
    }
  },
  created () {
  },
  mounted () {}
}
</script>

<style scoped>

</style>
