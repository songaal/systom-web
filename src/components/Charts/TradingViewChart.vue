<template>
  <div id="coinChart" class="chartContainer"></div>
</template>

<script>
import './CoinChart.css'
import config from '../../Config'

export default {
  name: 'coinChart',
  props: ['height', 'orders', 'coin', 'base', 'interval'],
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
  watch: {
    orders () {
      this.orders.forEach((o) => {
        console.log('CoinChart.orders orderData', o)
        // this.addTradeMark(1525935900, 999, 'BuyText', 'buy')
        // this.addTradeMark(1525935900, 999, 'SellText', 'sell')
      })
    }
  },
  methods: {
    addTradeMark (ts, price = 0.0, text = '', direction) {
      if (direction === 'buy' || direction === 'sell') {
        let color = direction === 'buy' ? 'rgba(0, 0, 255, 0.8)' : 'rgba(255, 0, 0, 0.8)'
        this.widget.chart()
          .createExecutionShape()
          .setTime(ts)
          .setPrice(price)
          .setText(text)
          .setTextColor(color)
          .setArrowColor(color)
          .setDirection(direction)
      }
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
    this.widget = new window.TradingView.widget(options)
  }
}
</script>

<style scoped>

</style>
