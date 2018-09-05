<template>
  <div id="coinChart" class="chartContainer"></div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'coinChart',
  props: ['tradeHistory', 'exchange', 'symbol', 'timeInterval', 'backtest', 'isControl'],
  data () {
    return {
      initChart: {
        exchange: null,
        symbol: null,
        interval: null
      },
      widget: '',
      shapeIds: [],
      widgetOptions: {
        symbol: null,
        containerId: 'coinChart',
        clientId: 'tradingview.com',
        userId: 'public_user_id',
        fullscreen: false,
        autosize: true
      },
      isChartCheck: null
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
      if (this.tradeHistory !== undefined) {
        if (this.isChartCheck !== null) {
          return false
        }
        this.isChartCheck = setTimeout(() => {
          this.shapeIds.forEach(id => {
            this.removeTradeMark(id)
          })
          this.shapeIds = []
          this.tradeHistory.forEach((trade, index) => {
            let title = `[${index + 1}] `
            title += trade.action === 'BOT' ? '매수 ' : '매도 '
            title += trade.symbol.split('/')[0]
            title += ': ' + trade.price.toFixed(8)
            let tooltip = title
            tooltip += ', 갯수: ' + trade.quantity
            let actionTime = null
            if (/^[0-9]+$/gi.test(trade.tradeTime)) {
              actionTime = trade.tradeTime.substring(0, 10)
            } else {
              actionTime = String(utils.timeToTimestamp(trade.tradeTime)).substring(0, 10)
            }
            let tradePrice = trade.price
            let direction = trade.action === 'BOT' ? 'Buy' : 'Sell'
            this.addTradeMark(actionTime, tradePrice, title, direction, tooltip)
          })
          this.isChartCheck = null
        }, 3000)
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
      let disableFeatures = Object.assign([], config.chartsDisabledFeatures)
      let chartsEnabledFeatures = Object.assign([], config.chartsEnabledFeatures)
      if (this.isControl === false) {
        disableFeatures.push('header_widget')
        disableFeatures.push('edit_buttons_in_legend')
        disableFeatures.push('context_menus')
        disableFeatures.push('left_toolbar')
        disableFeatures.push('timezone_menu')
        disableFeatures.push('legend_context_menu')
      } else {
        chartsEnabledFeatures.push('header_widget')
        chartsEnabledFeatures.push('edit_buttons_in_legend')
        chartsEnabledFeatures.push('context_menus')
        chartsEnabledFeatures.push('left_toolbar')
        chartsEnabledFeatures.push('timezone_menu')
        chartsEnabledFeatures.push('legend_context_menu')
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
        enabled_features: chartsEnabledFeatures
      }
    },
    refreshChart (symbol) {
      this.shapeIds = []
      if (this.isChange() === true) {
        this.widget.constructor(this.chartOptions())
      }
    },
    isChange () {
      if (this.initChart.exchange === this.exchange &&
        this.initChart.symbol === this.symbol &&
        this.initChart.interval === this.timeInterval) {
        return false
      } else {
        this.initChart.exchange = this.exchange
        this.initChart.symbol = this.symbol
        this.initChart.interval = this.timeInterval
        return true
      }
    },
    removeTradeMark (shapeId) {
      try {
        this.widget.chart().removeEntity(shapeId)
      } catch (e) {
        // ignore
      }
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
          // console.log('mark randering...')
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
    setTimeout(() => {
      this.widget = new window.TradingView.widget(this.chartOptions())
    }, 1000)
  },
  beforeDestroy () {
    // this.tradeHistory = []
  },
  destroyed () {}
}
</script>

<style>
.chartContainer {
	height: 650px;
}
</style>
