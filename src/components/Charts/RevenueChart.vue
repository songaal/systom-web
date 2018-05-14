<template>
  <div>
    <div id="chartdiv"></div>
  </div>
</template>
<script>
import AmCharts from 'amcharts3'

export default {
  data () {
    return {}
  },
  created () {
    AmCharts.makeChart('chartdiv', {
      type: 'serial',
      categoryField: 'type',
      chartCursor: {},
      graphs: [{
        type: 'column',
        title: 'Pizza types',
        valueField: 'sold',
        fillAlphas: 0.8
      }],
      dataProvider: [
        {type: 'Margherita', sold: 120},
        {type: 'Funghi', sold: 82},
        {type: 'Capricciosa', sold: 78},
        {type: 'Quattro Stagioni', sold: 71}
      ]}
    )
  }
}
</script>

<style lang="css">
#chartdiv {
  width: 100%;
  height: 400px;
}
</style>
