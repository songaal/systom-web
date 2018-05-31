<template>
  <div id="coinChart" class="chartContainer"></div>
</template>

<script>
import './CoinChart.css'
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'coinChart',
  props: ['tradeHistory', 'exchange', 'symbol', 'timeInterval'],
  data () {
    return {
      widget: '',
      WidgetLoadInterval: null,
      widgetOptions: {
        symbol: null,
        containerId: 'coinChart',
        clientId: 'tradingview.com',
        userId: 'public_user_id',
        fullscreen: false,
        autosize: true
      }
    }
  },
  watch: {
    exchange () {
      this.refreshChart()
    },
    symbol () {
      this.refreshChart()
    },
    timeInterval () {
      this.refreshChart()
    },
    tradeHistory () {
      // this.widget.chart()
      //   .createExecutionShape()
      //   .remove()
      this.tradeHistory.forEach((trade, index) => {
        let ts = String(trade.timestamp).length
        if (ts < 10) {
          console.log('TradingView timestamp require second', ts)
          return
        }
        let title = `[${index + 1}] `
        title += trade.action === 'BOT' ? '매수' : '매도'
        let tooltip = title
        tooltip += ': 가격: ' + trade.price
        tooltip += ', 갯수: ' + trade.quantity
        let actionTime = ts > 10 ? trade.timestamp / 1000 : trade.timestamp
        let tradePrice = trade.price
        let direction = trade.action === 'BOT' ? 'Buy' : 'Sell'
        // let reason = `${direction}: ${String(trade.price)}`
        this.addTradeMark(actionTime, tradePrice, title, direction, tooltip)
      })
    }
  },
  methods: {
    chartOptions () {
      return {
        symbol: (this.symbol !== '' ? this.symbol : config.defaultChartsSymbol),
        interval: (this.timeInterval !== '' ? this.timeInterval : config.defaultChartsInterval),
        container_id: this.widgetOptions.containerId,
        userId: this.widgetOptions.userId,
        clientId: this.widgetOptions.clientId,
        fullscreen: this.widgetOptions.fullscreen,
        autosize: this.widgetOptions.autosize,
        datafeed: new window.Datafeeds.UDFCompatibleDatafeed(config.datafeedUrl),
        library_path: config.chartsLibraryPath,
        charts_storage_url: config.chartsStorageUrl,
        charts_storage_api_version: config.chartsStorageApiVersion,
        timezone: config.defaultTimezone,
        locale: config.defaultLocale,
        disabled_features: config.chartsDisabledFeatures,
        enabled_features: config.chartsEnabledFeatures
      }
    },
    refreshChart (symbol) {
      // this.widget.constructor(this.chartOptions())
    },
    addTradeMark (ts, price = 0.0, text = '', direction, tooltip) {
      direction = direction.toLowerCase()
      if (direction === 'buy' || direction === 'sell') {
        let color = direction === 'buy' ? 'rgba(0, 0, 255, 0.8)' : 'rgba(255, 0, 0, 0.8)'
        try {
          this.widget.chart()
            .createExecutionShape()
            .setTime(ts)
            .setPrice(price)
            .setText(text)
            .setTextColor(color)
            .setTooltip(tooltip)
            .setArrowColor(color)
            .setDirection(direction)
        } catch (e) {
          console.log('err', e)
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
    }
  },
  mounted () {
    this.widget = new window.TradingView.widget(this.chartOptions())
  }
}
</script>

<style scoped>

</style>
