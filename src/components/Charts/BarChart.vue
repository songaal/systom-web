<template>
  <div>
    <div id="chartdiv" style='width: 100%; height: 200px;' ref='barChart'></div>
  </div>
</template>

<script>
import 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import 'amcharts3/amcharts/themes/light'

export default {
  name: 'BarChart',
  components: {},
  props: ['type', 'dataProvider'],
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
        marginLeft: 50,
        autoMarginOffset: 0,
        valueAxes: [ {
          id: 'v1',
          axisAlpha: 0,
          position: 'left',
          ignoreAxisWidth: true,
          minimum: 0
        } ],
        balloon: {
          borderThickness: 1,
          shadowAlpha: 0
        },
        graphs: [ {
          alphaField: 'alpha',
          balloonText: null,
          fillAlphas: 1,
          title: '수익률',
          type: 'column',
          valueField: null,
          dashLengthField: 'dashLengthColumn'
        }],
        categoryField: 'date',
        dataProvider: []
      }
    }
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate () {},
  created () {
    this.chartConfig.dataProvider = this.dataProvider
  },
  beforeMount () {},
  mounted () {
    if (this.type === 'pct') {
      this.chartConfig.valueAxes[0]['maximum'] = this.maximum
      this.chartConfig.graphs[0]['balloonText'] = "<span style='font-size:12px;'>[[category]] 월 [[title]]:<br><span style='font-size:20px;'>[[value]] %</span></span>"
      this.chartConfig.graphs[0]['valueField'] = 'pct'
      this.chartConfig.graphs[0]['title'] = '수익률'
    } else if (this.type === 'price') {
      this.chartConfig.graphs[0]['balloonText'] = "<span style='font-size:12px;'>[[category]] 월 [[title]]:<br><span style='font-size:20px;'>[[value]] USDT</span></span>"
      this.chartConfig.graphs[0]['valueField'] = 'price'
      this.chartConfig.graphs[0]['title'] = '투자금액'
    }
    this.chart = AmCharts.makeChart(this.$refs.barChart, this.chartConfig)
  },
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>

</style>
