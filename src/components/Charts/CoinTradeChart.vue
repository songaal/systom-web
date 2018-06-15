<template>
  <div class="market-chart" ref="chartdiv"></div>
</template>

<script>
import 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import 'amcharts3/amcharts/themes/light'

export default {
  name: 'CoinTradeChart',
  extends: '',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    AmCharts.makeChart(this.$refs.chartdiv, {
      'type': 'serial',
      'titleField': 'title',
      'valueField': 'value',
      'dataProvider': [
        {
          title: 'Big slice',
          'value': 555
        },
        {
          title: 'Small slice',
          'value': 25
        }
      ]}
    )
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
