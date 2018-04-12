export default {
  serverHost: 'http://localhost:8080',
  serverVer: 'v1',
  baseTestWsUrl: 'ws://localhost:8080/test',
  baseAgentWsUrl: 'ws://localhost:8080/agent',
  defaultHeaders () {
    return {
      'X-coincloud-user-id': 'testuser',
      'Content-type': 'application/json'
    }
  },
  backtestExchanges: ['poloniex', 'bittrex', 'bitfinex'],
  agentExchanges: ['poloniex', 'bittrex', 'bitfinex']
}
