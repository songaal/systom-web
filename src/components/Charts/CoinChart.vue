<template>
  <div id="coinChartContainer" class="ChartContainer"></div>
</template>

<script>
import './CoinChart.css'
import config from '../../config/Config'

export default {
  name: 'coinChart',
  props: {},
  data () {
    return {
      widget: '',
      widgetOptions: {
        libraryPath: '/static/lib/charting_library/',
        containerId: 'coinChartContainer',
        datafeed: '',
        chartsStorageUrl: config.chartsStorageUrl,
        chartsStorageApiVersion: config.chartsStorageApiVersion,
        symbol: config.defaultChartsSymbol,
        interval: config.defaultChartsInterval,
        timezone: config.defaultTimezone,
        clientId: 'tradingview.com',
        userId: 'public_user_id',
        locale: config.defaultLocale,
        fullscreen: false,
        autosize: true
      }
    }
  },
  methods: {
    addTradeMark (ts, price, text = '', direction = '', tooltip = '', color = 'black') {
      this.widget.chart()
        .createExecutionShape()
        .setText(text)
        .setDirection(direction)
        .setTooltip(tooltip)
        .setTextColor(color)
        .setArrowColor(color)
        .setTime(ts)
        .setPrice(price)
    }
  },
  mounted () {
    this.widgetOptions['datafeed'] = new window.Datafeeds.UDFCompatibleDatafeed(config.datafeedUrl)
    console.log('widget options', this.widgetOptions)
    this.widget = new window.TradingView.widget(this.widgetOptions)
    // window.TradingView.onready(() => {
    //   this.widget = new window.TradingView.widget(widgetOptions)
    // })
  }
}
</script>

<style scoped>

</style>
