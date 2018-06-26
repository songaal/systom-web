<template>
  <div id="coinChart" class="chartContainer"></div>
</template>

<script>
import './CoinChart.css'
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'coinChart',
  props: ['tradeHistory', 'exchange', 'symbol', 'timeInterval', 'backtest', 'isControl'],
  data () {
    return {
      widget: '',
      shapeIds: [],
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
      this.shapeIds.forEach(id => {
        this.removeTradeMark(id)
      })
      this.shapeIds = []
      if (this.tradeHistory !== undefined) {
        this.tradeHistory.forEach((trade, index) => {
          let ts = String(trade.timestamp).length
          if (ts < 10) {
            console.log('TradingView timestamp require second', ts)
            return
          }
          let title = `[${index + 1}] `
          title += trade.action === 'BOT' ? '매수' : '매도'
          title += ': 가격: ' + trade.price
          let tooltip = title
          tooltip += ', 갯수: ' + trade.quantity
          let actionTime = ts > 10 ? trade.timestamp / 1000 : trade.timestamp
          let tradePrice = trade.price
          let direction = trade.action === 'BOT' ? 'Buy' : 'Sell'
          this.addTradeMark(actionTime, tradePrice, title, direction, tooltip)
        })
      }
    }
  },
  methods: {
    chartOptions () {
      let tmpTimeInterval = this.timeInterval
      let tmpChartInterval = null
      if (/[a-z]/gi.test(tmpTimeInterval)) {
        // 단위 있는 경우
        let interval = tmpTimeInterval.replace(/[^0-9]/gi, '')
        let unit = tmpTimeInterval.substring(tmpTimeInterval.length - 1).toUpperCase()
        if (interval === '1' && (unit === 'D' || unit === 'W')) {
          // 1일, 1주 단위만 전송
          tmpChartInterval = unit
        } else if (unit === 'T' || unit === 'M') {
          tmpChartInterval = interval
        } else if (unit === 'H') {
          tmpChartInterval = interval * 60
        } else if (unit === 'D') {
          tmpChartInterval = tmpTimeInterval
        } else if (unit === 'W') {
          tmpChartInterval = tmpTimeInterval
        }
      } else {
        // 단위 없는 경우
        tmpChartInterval = tmpTimeInterval
      }
      let disableFeatures = config.chartsDisabledFeatures
      if (this.isControl === false) {
        disableFeatures.push('header_widget')
        disableFeatures.push('edit_buttons_in_legend')
        disableFeatures.push('context_menus')
        disableFeatures.push('left_toolbar')
        disableFeatures.push('timezone_menu')
        disableFeatures.push('legend_context_menu')
      }
      return {
        symbol: (this.symbol !== null ? this.symbol : config.defaultChartsSymbol),
        interval: tmpChartInterval,
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
        disabled_features: disableFeatures,
        enabled_features: config.chartsEnabledFeatures
      }
    },
    refreshChart (symbol) {
      this.widget.constructor(this.chartOptions())
    },
    removeTradeMark (shapeId) {
      this.widget.chart().removeEntity(shapeId)
    },
    addTradeMark (ts, price = 0.0, text = '', direction, tooltip, retry = 5) {
      direction = direction.toLowerCase()
      if (direction === 'buy' || direction === 'sell') {
        let color = direction === 'buy' ? 'rgba(0, 0, 255, 0.8)' : 'rgba(255, 0, 0, 0.8)'
        try {
          let shape = this.widget.chart()
            .createExecutionShape()
            .setTime(ts)
            .setPrice(price)
            .setText(text)
            .setTextColor(color)
            .setTooltip(tooltip)
            .setArrowColor(color)
            .setDirection(direction)
          this.shapeIds.push(shape._line.id())
        } catch (e) {
          console.log('mark randering...')
          if (retry >= 0) {
            setTimeout(() => {
              this.addTradeMark(ts, price, text, direction, tooltip, retry - 1)
            }, 3000)
          }
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
