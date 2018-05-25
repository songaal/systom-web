<template>
  <div>
    <div id="chartdiv" style='width: 100%; height: 400px;' ref='drawdownChart'></div>
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
        marginRight: 50,
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
          // bullet: 'round',
          // bulletBorderAlpha: 1,
          // bulletColor: '#FFFFFF',
          selectBackgroundColor: 'red',
          lineColor: 'red',
          // bulletSize: 5,
          hideBulletsCount: 50,
          lineThickness: 2,
          title: 'red line',
          useLineColorForBulletBorder: true,
          valueField: 'value',
          balloonText: '<span>[[value]]</span>'
        } ],
        chartCursor: {
          pan: true,
          valueLineEnabled: true,
          valueLineBalloonEnabled: true,
          cursorAlpha: 0,
          zoomable: true,
          valueZoomable: true,
          valueLineAlpha: 0.5
        },
        // valueScrollbar: {
        //   autoGridCount: true,
        //   color: '#000000',
        //   scrollbarHeight: 50
        // },
        categoryField: 'date',
        categoryAxis: {
          parseDates: true,
          dashLength: 1,
          minorGridEnabled: true,
          minPeriod: 'mm'
        },
        // chartScrollbar: {
        //   graph: 'g1',
        //   oppositeAxis: false,
        //   offset: 30,
        //   scrollbarHeight: 80,
        //   backgroundAlpha: 0,
        //   selectedBackgroundAlpha: 0.1,
        //   selectedBackgroundColor: '#888888',
        //   graphFillAlpha: 0,
        //   graphLineAlpha: 0.5,
        //   selectedGraphFillAlpha: 0,
        //   selectedGraphLineAlpha: 1,
        //   autoGridCount: true,
        //   color: '#AAAAAA'
        // },
        export: {
          enabled: true
        },
        dataProvider: [{
          date: '2012-07-27',
          value: -13
        }, {
          date: '2012-07-28',
          value: -11
        }, {
          date: '2012-07-29',
          value: -15
        }]
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
    // let tradeDate = new Date(2000, 5, 1)
    // for (let i = 0; i < 1000; i++) {
    //   let price = Math.random() * 10
    //   tradeDate.setTime(tradeDate.getTime() + (i * 866400))
    //   this.chartConfig.dataProvider.push({
    //     'date': this.yyyymmdd(tradeDate),
    //     value: (price * -1)
    //   })
    // }
  },
  beforeMount () {},
  mounted () {
    this.chart = AmCharts.makeChart(this.$refs.drawdownChart, this.chartConfig)
    // this.chart.addListener('rendered', this.zoomChart)
    // this.zoomChart()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>

</style>
