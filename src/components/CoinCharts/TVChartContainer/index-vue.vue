<template>
  <div id="TVChartContainer" class="TVChartContainer"></div>
</template>

<script>
import './index.css'

export default {
  name: 'TVChartContainer',
  props: {},
  data () {
    return {
      widget: '',
      symbol: 'AAPL',
      interval: 'D',
      containerId: 'TVChartContainer',
      datafeedUrl: 'https://demo_feed.tradingview.com',
      libraryPath: '/charting_library/',
      chartsStorageUrl: 'https://saveload.tradingview.com',
      chartsStorageApiVersion: '1.1',
      clientId: 'tradingview.com',
      userId: 'public_user_id',
      fullscreen: false,
      autosize: true,
      studiesOverrides: {}
    }
  },
  methods: {
    getLanguageFromURL () {
      const regex = new RegExp('[\\?&]lang=([^&#]*)')
      const results = regex.exec(window.location.search)
      return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
    }
  },
  created () {
    const widgetOptions = {
      symbol: this.symbol,
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl),
      interval: this.interval,
      container_id: this.containerId,
      library_path: this.libraryPath,
      locale: 'ko',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: this.chartsStorageUrl,
      charts_storage_api_version: this.chartsStorageApiVersion,
      client_id: this.clientId,
      user_id: this.userId,
      fullscreen: this.fullscreen,
      autosize: this.autosize,
      studies_overrides: this.studiesOverrides
    }
    console.log('차트 위젯 옵션:', widgetOptions)
    console.log('window.TradingView', window.TradingView)
    window.TradingView.onready(() => {
      console.log('onready')
    })
    console.log(window.TradingView.widget)
    this.widget = new window.TradingView.widget(widgetOptions)
  }
}
</script>

<style scoped>

</style>
