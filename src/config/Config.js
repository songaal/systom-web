const humanTimeInterval = ['1분', '3분', '5분', '15분', '30분', '1시', '2시', '3시', '4시', '6시', '12시', '1일']
const timeInterval = ['1T', '3T', '5T', '15T', '30T', '1H', '2H', '3H', '4H', '6H', '12H', '1D']

const server = 'localhost:8080'

export default {
  serverHost: 'http://' + server,
  serverVer: 'v1',
  baseTestWsUrl: 'ws://' + server + '/backtest',
  baseAgentWsUrl: 'ws://' + server + '/agent',
  chartsLibraryPath: '/static/lib/charting_library/',
  chartsDisabledFeatures: ['adaptive_logo'],
  chartsEnabledFeatures: ['study_templates', 'use_localstorage_for_settings', 'symbol_info', 'symbol_search_hot_key'],
  datafeedUrl: 'https://9u3jawxuod.execute-api.ap-northeast-2.amazonaws.com/v1_1',
  chartsStorageUrl: 'https://saveload.tradingview.com',
  defaultLocale: 'ko',
  chartsStorageApiVersion: '1.1',
  defaultChartsSymbol: 'BTC/USDT',
  defaultChartsInterval: 'D',
  defaultTimezone: 'Asia/Seoul',
  maxCandleSize: 30,
  defaultHeaders () {
    return {
      'Content-type': 'application/json'
    }
  },
  backtestExchanges: ['poloniex', 'bittrex', 'bitfinex'],
  agentExchanges: ['poloniex', 'bittrex', 'bitfinex'],
  getTimeIntervalList: () => {
    return humanTimeInterval
  },
  formatKoToEnTimeInterval: (interval) => {
    let index = humanTimeInterval.indexOf(interval)
    return timeInterval[index]
  },
  formatEnToKoTimeInterval: (interval) => {
    let index = timeInterval.indexOf(interval)
    return humanTimeInterval[index]
  }
}
