<template>
  <div class='market-chart' ref='chartdiv' style="width: 100%; height: 200px;"></div>
</template>

<script>
import 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import 'amcharts3/amcharts/themes/light'
import 'amstock3/amcharts/amstock'
import config from '../../Config'

export default {
  name: 'CoinTradeChart',
  extends: '',
  components: {},
  props: [],
  data () {
    return {
      chart: null,
      chartData: []
    }
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate () {},
  created () {
    let firstDate = new Date(2012, 0, 1)
    firstDate.setDate(firstDate.getDate() - 500)
    firstDate.setHours(0, 0, 0, 0)
    for (let i = 0; i < 500; i++) {
      let newDate = new Date(firstDate)
      newDate.setDate(newDate.getDate() + i)
      let a = Math.round(Math.random() * (40 + i)) + 100 + i
      let b = Math.round(Math.random() * 100000000)
      this.chartData.push({
        date: newDate,
        value: a,
        volume: b
      })
    }
  },
  beforeMount () {},
  mounted () {
    this.chart = AmCharts.makeChart(this.$refs.chartdiv, {
      hideCredits: true,
      type: 'stock',
      theme: 'light',
      path: '/libs/amcharts/',
      pathToImages: 'http://cdn.amcharts.com/lib/3/images/',
      dataSets: [{
        color: 'blue',
        fieldMappings: [{
          fromField: 'value',
          toField: 'value'
        }, {
          fromField: 'volume',
          toField: 'volume'
        }],
        dataProvider: this.chartData,
        categoryField: 'date',
        stockEvents: [
          {
            date: new Date(2011, 5, 15),
            // type: 'arrowUp',
            type: 'sign',
            // backgroundColor: 'blue',
            backgroundColor: 'white',
            color: 'green',
            graph: 'g1',
            text: 'B',
            description: '[1]매수 414'
          }, {
            date: new Date(2011, 6, 25),
            // type: 'arrowDown',
            type: 'sign',
            // backgroundColor: 'red',
            backgroundColor: 'white',
            color: 'red',
            graph: 'g1',
            text: 'S',
            description: '[2]매도 753'
          }]
      }],
      panels: [
        {
          title: '가격',
          stockGraphs: [
            {
              id: 'g1',
              valueField: 'value'
            }
          ],
          stockLegend: {
            valueTextRegular: ' ',
            markerType: 'none'
          }
        }
      ],
      chartScrollbarSettings: {
        enabled: false,
        graph: 'g1'
      },
      chartCursorSettings: {
        pan: true,
        valueBalloonsEnabled: true,
        graphBulletSize: 1,
        valueLineBalloonEnabled: true,
        valueLineEnabled: true,
        valueLineAlpha: 0.5
      },
      panelsSettings: {
        usePrefixes: true
      },
      export: {
        enabled: false
      }
    })
  },
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>
.market-chart {
  width: 100%;
  height: 100px;
}
</style>
