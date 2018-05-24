<template>
  <div>
    <div id='chartdiv' style='width: 100%; height: 400px;' ref='revenueChart'></div>
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
  props: ['returns'],
  data () {
    return {
      chart: '',
      sum: 1000,
      chartConfig: {
        path: '/libs/amcharts/',
        pathToImages: 'http://cdn.amcharts.com/lib/3/images/',
        type: 'serial',
        theme: 'light',
        // legend: {
        //   equalWidths: false,
        //   useGraphSettings: true,
        //   valueAlign: 'left',
        //   valueWidth: 120
        // },
        autoMarginOffset: 5,
        // marginRight: 10,
        // marginLeft: 0,
        mouseWheelZoomEnabled: true,
        dataProvider: [],
        valueAxes: [{
          id: 'revenueAxis',
          valueField: 'revenueSum',
          position: 'left',
          title: '거래',
          fillColorsField: 'color',
          fillAlphas: 0.9
        }, {
          id: 'revenueSumAxis',
          axisAlpha: 0,
          gridAlpha: 0,
          inside: true,
          position: 'right',
          title: '누적'
        }],
        graphs: [{
          id: 'g1',
          alphaField: 'alpha',
          // 'balloonText': '[[value]] miles',
          balloonText: '[[value]] %',
          dashLengthField: 'dashLength',
          fillAlphas: 0.7,
          // 'legendPeriodValueText': 'total: [[value.sum]]',
          // 'legendValueText': '[[value]] mi',
          legendValueText: '[[value]]',
          title: '거래',
          type: 'column',
          valueField: 'revenue',
          valueAxis: 'revenueAxis',
          colorField: 'color'
        },
        {
          id: 'g2',
          dashLengthField: 'dashLength',
          // 'legendValueText': '[[value]]',
          balloonText: '[[value]] %',
          legendValueText: '[[value]]',
          title: '누적',
          fillAlphas: 0,
          lineColor: '#3579e8',
          valueField: 'revenueSum',
          valueAxis: 'revenueSumAxis',
          lineThickness: 4,
          type: 'line'
        }
        ],
        chartCursor: {
          pan: true,
          categoryBalloonDateFormat: Config.amChartDateFormat,
          cursorAlpha: 0.2,
          valueLineEnabled: true,
          valueLineBalloonEnabled: true,
          valueLineAlpha: 0.5,
          fullWidth: true,
          valueZoomable: true
        },
        chartScrollbar: {
          graph: 'g2',
          oppositeAxis: false,
          offset: 30,
          scrollbarHeight: 80,
          backgroundAlpha: 0,
          selectedBackgroundAlpha: 0.1,
          selectedBackgroundColor: '#888888',
          graphFillAlpha: 0,
          graphLineAlpha: 0.5,
          selectedGraphFillAlpha: 0,
          selectedGraphLineAlpha: 1,
          autoGridCount: true,
          color: '#AAAAAA'
        },
        dataDateFormat: Config.amChartDateFormat,
        categoryField: 'date',
        categoryAxis: {
          parseDates: true,
          autoGridCount: true,
          gridAlpha: 0.1,
          minorGridEnabled: true,
          dashLength: 1,
          minPeriod: 'mm'
        },
        export: {
          enabled: false
        }
      }
    }
  },
  methods: {
    zoomChart () {
      this.chart.zoomToIndexes(this.chart.dataProvider.length - 20, this.chart.dataProvider.length - 1)
    }
  },
  created () {
    this.chartConfig.dataProvider = []
    if (this.returns !== null && this.returns !== undefined) {
      let sum = 0
      console.log('returns', this.returns)
      Object.keys(this.returns).forEach((key, i) => {
        sum += Number(this.returns[key])
        let tick = {
          date: AmCharts.stringToDate(Utils.timestampToTime(key), Config.amChartDateFormat),
          revenue: this.returns[key],
          revenueSum: sum,
          alpha: 1,
          color: this.returns[key] < 0 ? '#e8124b' : '#1fe022',
          legendColor: this.returns[key] < 0 ? '#e8124b' : '#1fe022'
        }
        this.chartConfig.dataProvider.push(tick)
      })
    }
  },
  mounted () {
    AmCharts.addInitHandler((chart) => {}, ['serial'])
    // this.chartInit(chart)
    this.chart = AmCharts.makeChart(this.$refs.revenueChart, this.chartConfig)
    this.chart.addListener('init', (e) => {
      let i1 = e.chart
      let i2 = e.chart
      let chart = e.chart
      // WALKTHROUGH PANELS
      for (i1 = 0; i1 < chart.panels.length; i1++) {
        let graphs = []
        // WALKTHROUGH GRAPHS; GATHER THOSE WHICH WANT TO SET THE COLOR
        for (i2 = 0; i2 < chart.panels[i1].stockGraphs.length; i2++) {
          let graph = chart.panels[ i1 ].stockGraphs[ i2 ]
          if (graph.legendColorField) {
            graphs.push(graph)
          }
        }
        // FOUND?!; OBSERVE PANELS CURSOR TO APPLY THE COLOR
        if (graphs.length) {
          chart.panels[i1].addListener('changed', ((graphs) => {
            return (e) => {
              let dataitem = chart.mainDataSet.dataProvider[e.index]
              for (i1 = 0; i1 < graphs.length; i1++) {
                let graph = graphs[i1]
                let marker = graph.legendEntry.node.getElementsByTagName('path')[0]
                marker.setAttribute('fill', dataitem[graph.legendColorField])
                marker.setAttribute('stroke', dataitem[graph.legendColorField])
              }
            }
          })(graphs))
        }
      }
    })
    this.chart.addListener('rendered', this.zoomChart)
    this.zoomChart()
  }
}
</script>

<style lang='css'>
#chartdiv {
  width: 100%;
  height: 400px;
}
</style>
