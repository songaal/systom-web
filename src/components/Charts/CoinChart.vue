<template>
  <div id="coinChart" class="chartContainer"></div>
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
        containerId: 'coinChart',
        clientId: 'tradingview.com',
        userId: 'public_user_id',
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
    const options = {
      container_id: this.widgetOptions.containerId,
      userId: this.widgetOptions.userId,
      clientId: this.widgetOptions.clientId,
      fullscreen: this.widgetOptions.fullscreen,
      autosize: this.widgetOptions.autosize,
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(config.datafeedUrl),
      library_path: config.chartsLibraryPath,
      charts_storage_url: config.chartsStorageUrl,
      charts_storage_api_version: config.chartsStorageApiVersion,
      symbol: config.defaultChartsSymbol,
      interval: config.defaultChartsInterval,
      timezone: config.defaultTimezone,
      locale: config.defaultLocale,
      disabled_features: config.chartsDisabledFeatures,
      enabled_features: config.chartsEnabledFeatures
    }
    // window.TradingView.onready(() => {
    //   this.widget = new window.TradingView.widget(options)
    // })
    this.widget = new window.TradingView.widget(options)
  }
}
</script>

<style scoped>

</style>
