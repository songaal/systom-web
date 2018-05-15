<template>
  <div>
    <div id='chartdiv' style='width: 100%; height: 400px;' ref='chartdiv'></div>
  </div>
</template>
<script>
import 'amcharts3'
import AmSerial from 'amcharts3/amcharts/serial'
import 'amcharts3/amcharts/themes/light'

export default {
  name: 'RevenueChart',
  data () {
    return {
      chart: '',
      dataList: [],
      sum: 1000,
      chartConfigs: {
        'path': '/libs/amcharts/',
        'pathToImages': 'http://cdn.amcharts.com/lib/3/images/',
        'type': 'serial',
        'theme': 'light',
        'legend': {
          'equalWidths': false,
          'useGraphSettings': true,
          'valueAlign': 'left',
          'valueWidth': 120
        },
        'autoMarginOffset': 20,
        'mouseWheelZoomEnabled': true,
        'dataProvider': '',
        'valueAxes': [{
          'id': 'distanceAxis',
          'valueField': 'duration',
          'position': 'left',
          'title': '거래',
          'fillColorsField': 'color',
          'fillAlphas': 0.9
        }, {
          'id': 'durationAxis',
          'axisAlpha': 0,
          'gridAlpha': 0,
          'inside': true,
          'position': 'right',
          'title': '누적'
        }],
        'graphs': [{
          'id': 'g1',
          'alphaField': 'alpha',
          // 'balloonText': '[[value]] miles',
          'balloonText': '[[value]] %',
          'dashLengthField': 'dashLength',
          'fillAlphas': 0.7,
          // 'legendPeriodValueText': 'total: [[value.sum]]',
          // 'legendValueText': '[[value]] mi',
          'legendValueText': '[[value]]',
          'title': '거래',
          'type': 'column',
          'valueField': 'distance',
          'valueAxis': 'distanceAxis',
          'colorField': 'color'
        },
        {
          'id': 'g2',
          'dashLengthField': 'dashLength',
          // 'legendValueText': '[[value]]',
          'balloonText': '[[value]] %',
          'legendValueText': '[[value]]',
          'title': '누적',
          'fillAlphas': 0,
          'lineColor': '#3579e8',
          'valueField': 'duration',
          'valueAxis': 'durationAxis',
          'lineThickness': 4,
          'type': 'line'
        }
        ],
        'chartCursor': {
          'pan': true,
          'categoryBalloonDateFormat': 'YYYY-MM-DD',
          'cursorAlpha': 0.2,
          'valueLineEnabled': true,
          'valueLineBalloonEnabled': true,
          'valueLineAlpha': 0.5,
          'fullWidth': true,
          'valueZoomable': true
        },
        'chartScrollbar': {
          'graph': 'g2',
          'oppositeAxis': false,
          'offset': 30,
          'scrollbarHeight': 80,
          'valueField': 'duration',
          'autoGridCount': true,
          'color': '#AAAAAA',
          'graphType': 'line'
        },
        'dataDateFormat': 'YYYY-MM-DD',
        'categoryField': 'date',
        'categoryAxis': {
          'parseDates': true,
          'autoGridCount': true,
          'gridAlpha': 0.1,
          'minorGridEnabled': true,
          'dashLength': 1
        },
        'export': { 'enabled': true }
      }
    }
  },
  methods: {
    yyyymmdd (date) {
      let yyyy = date.getFullYear().toString()
      let mm = (date.getMonth() + 1).toString()
      let dd = date.getDate().toString()
      return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0])
    },
    ColorLuminance (hex, lum) {
      hex = String(hex).replace(/[^0-9a-f]/gi, '')
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
      }
      lum = lum || 0
      let rgb = '#'
      let c
      let i
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16)
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
        rgb += ('00' + c).substr(c.length)
      }
      return rgb
    },
    chartInit (chart) {
      let dataProvider = chart.dataProvider
      let colorRanges = chart.colorRanges
      if (colorRanges) {
        var item
        var range
        var valueProperty
        var value
        var average
        var variation
        for (var i = 0, iLen = dataProvider.length; i < iLen; i++) {
          item = dataProvider[i]
          for (var x = 0, xLen = colorRanges.length; x < xLen; x++) {
            range = colorRanges[x]
            valueProperty = range.valueProperty
            value = item[valueProperty]
            if (value >= range.start && value <= range.end) {
              average = (range.start - range.end) / 2
              if (value <= average) {
                variation = (range.variation * -1) / value * average
              } else if (value > average) {
                variation = range.variation / value * average
              }
              item[range.colorProperty] = this.ColorLuminance(range.color, variation.toFixed(2))
            }
          }
        }
      }
    },
    zoomChart () {
      this.chart.zoomToIndexes(this.chart.dataProvider.length - 40, this.chart.dataProvider.length - 1)
    }
  },
  created () {
    let tradeDate = new Date(2000, 5, 1)
    for (let i = 0; i < 1000; i++) {
      let price = Math.random() * 10
      this.sum += Math.floor(price % 2) === 0 ? price : price * -1
      tradeDate.setTime(tradeDate.getTime() + (i * 866400))
      this.dataList.push({
        'date': this.yyyymmdd(tradeDate),
        'distance': price,
        'duration': this.sum,
        'alpha': 1,
        'color': Math.floor(price % 2) !== 0 ? '#e8124b' : '#1fe022'
      })
    }
  },
  mounted () {
    AmCharts.addInitHandler((chart) => {
      this.chartInit(chart)
    }, ['serial'])
    this.chartConfigs.dataProvider = this.dataList
    this.chart = AmCharts.makeChart(this.$refs.chartdiv, this.chartConfigs)
    this.chart.addListener('rendered', this.zoomChart)
  }
}
</script>

<style lang='css'>
#chartdiv {
  width: 100%;
  height: 400px;
}
</style>
