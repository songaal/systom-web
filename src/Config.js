const humanTimeInterval = ['1분', '3분', '5분', '15분', '30분', '1시', '2시', '3시', '4시', '6시', '12시', '1일']
const timeInterval = ['1T', '3T', '5T', '15T', '30T', '1H', '2H', '3H', '4H', '6H', '12H', '1D']
let protocol = 'https'
let apiServerHost = 'api.systom.io'
if (process.env.API_SERVER === 'localhost') {
  apiServerHost = 'localhost:8080'
  protocol = 'http'
}
console.log('API_SERVER: ', process.env)
const code = `
class Main(AbstractStrategy):

  def __init__(self, ticker, events_queue):


  def calculate_signals(self, event):

`
export default {
  defaultStrategyCode: code,
  serverHost: protocol + '://' + apiServerHost,
  serverVer: 'v1',
  chartsLibraryPath: '/static/lib/charting_library/',
  chartsDisabledFeatures: ['adaptive_logo', 'header_symbol_search', 'header_resolutions', 'header_interval_dialog_button', 'show_interval_dialog_on_key_press', 'symbol_search_hot_key', 'show_dialog_on_snapshot_ready'],
  chartsEnabledFeatures: ['study_templates', 'use_localstorage_for_settings', 'symbol_info'],
  datafeedUrl: 'https://9u3jawxuod.execute-api.ap-northeast-2.amazonaws.com/v1_1',
  chartsStorageUrl: 'https://saveload.tradingview.com',
  defaultLocale: 'ko',
  chartsStorageApiVersion: '1.1',
  defaultChartsSymbol: 'BTC/USDT',
  defaultChartsExchagne: 'binance',
  defaultChartsInterval: '1H',
  defaultTimezone: 'Asia/Seoul',
  maxCandleSize: 30,
  dateFormat: 'YYYY-MM-DD',
  amChartDateFormat: 'YYYY-MM-DD JJ:NN',
  getAxiosGetOptions () {
    return {
      'crossdomain': true,
      'withCredentials': true,
      'headers': {
        'Content-type': 'application/json'
      }
    }
  },
  getAxiosPostOptions () {
    return {
      'withCredentials': true,
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  },
  getAxiosPutOptions () {
    return {
      'withCredentials': true,
      'headers': {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  },
  getAxiosDeleteOptions (data) {
    return {
      data: data,
      withCredentials: true,
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  },
  defaultHeaders () {
    return {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  },
  backtestExchanges: [{value: 'binance', text: 'Binance'}],
  agentExchanges: ['poloniex', 'bittrex', 'bitfinex', 'binance'],
  getTimeIntervalList: () => {
    return humanTimeInterval
  },
  getEnTimeIntervalList: () => {
    return timeInterval
  },
  getTimeIntervalKeyValueList: () => {
    let timeIntervalObj = humanTimeInterval.map((o, i) => {
      return {
        value: timeInterval[i],
        text: o
      }
    })
    return timeIntervalObj
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
