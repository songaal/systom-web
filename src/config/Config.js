const humanTimeInterval = ['1분', '3분', '5분', '15분', '30분', '1시', '2시', '3시', '4시', '6시', '12시', '1일']
const timeInterval = ['1T', '3T', '5T', '15T', '30T', '1H', '2H', '3H', '4H', '6H', '12H', '1D']

const server = 'http://localhost:8080'

export default {
  serverHost: server,
  serverVer: 'v1',
  baseTestWsUrl: 'ws://' + server + '/backtest',
  baseAgentWsUrl: 'ws://' + server + '/agent',
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
