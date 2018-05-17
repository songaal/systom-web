<template lang="html">
  <div class="wrapper">
    <b-card>
      <CoinChart :orders="orders" />
    </b-card>
    <b-card>
      <b-tabs>
        <b-tab title="코드편집">
          <PythonEditor />
        </b-tab>
        <b-tab title="전략테스트">
          <BackTestForm />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import moment from 'moment'
import Config from '../Config'
import Utils from '../Utils'
import CoinChart from '../components/Charts/CoinChart'
import PythonEditor from '../components/Editor/PythonEditor'
import BackTestForm from '../components/BackTest/BackTestForm'
import HistoryTable from '../components/SimulationHistory/HistoryTable'

export default {
  name: 'Strategy',
  data () {
    return {
      orders: [],
      strategy: {
        strategyId: '',
        name: '',
        version: '1.0',
        code: '',
        options: []
      },
      interval: '1',
      intervalUnit: 'T',
      webSocket: '',
      startTime: '',
      endTime: '',
      lastTopHistory: [],
      backtestHistory: [],
      coinData: {
        labels: [],
        datasets: [{
          label: '가격',
          borderColor: 'silver',
          backgroundColor: 'silver',
          fill: false,
          data: []
        },
        {
          label: '매도',
          borderColor: 'blue',
          backgroundColor: 'blue',
          fill: false,
          type: 'bubble',
          data: []
        },
        {
          label: '매수',
          borderColor: 'red',
          backgroundColor: 'red',
          fill: false,
          type: 'bubble',
          data: []
        }
        ]
      },
      testProcess: 0,
      candleSize: 0,
      receiveCandleSize: 0,
      performance: {
        revenue: '0',
        maxRevenue: '0',
        tradeCount: 0,
        LossRate: '0',
        totalFee: '0'
      }
    }
  },
  components: {
    BackTestForm,
    PythonEditor,
    HistoryTable,
    CoinChart
  },
  methods: {
    saveStrategy (strategyId) {
      this.strategy.strategyId = strategyId
    },
    setInterval (interval, intervalUnit) {
      this.interval = interval
      this.intervalUnit = intervalUnit
    },
    setTestTime (startTime, endTime) {
      this.startTime = startTime
      this.endTime = endTime
    },
    wsConnection (userId, backTestId) {
      if (this.webSocket !== '') {
        this.webSocket.close()
      }
      let wsUrl = Config.baseTestWsUrl + '/' + backTestId
      this.webSocket = new WebSocket(wsUrl)
      this.webSocket.onopen = () => {
        this.clearData()
        this.setLastHistory(this.strategy.strategyId)
        this.setChartLabels()
        console.log('Connection is opened...', wsUrl)
      }
      this.webSocket.onmessage = (event) => {
        let jsonData = JSON.parse(event.data)
        console.log('전달받은 데이터', jsonData)
        this.receiveCandleSize += 1
        this.testProcess = Math.floor((this.receiveCandleSize / this.candleSize) * 100)
        this.setPriceChart(jsonData.price)
        this.setTradeChart(jsonData.orders)
        this.setTradeHistory(jsonData.orders)
        if (Number(this.receiveCandleSize) === Number(this.candleSize)) {
          this.webSocket.close()
        }
      }
      this.webSocket.onclose = () => {
        console.log('Connection is closed...')
      }
    },
    setChartLabels () {
      let labelData = utils.getChartLabels(this.startTime, this.endTime, this.interval, this.intervalUnit, Config.dateFormat)
      this.coinData.labels = labelData.labels
      this.candleSize = labelData.size
      console.log('candleSize:', this.candleSize)
    },
    setPriceChart (prices) {
      let priceTime = utils.timestampToTime(prices.timestamp, 'm')
      this.coinData.datasets[0].data.push({
        t: moment(priceTime, Config.dateFormat),
        y: prices.price
      })
    },
    setTradeChart (orders) {
      for (let i = 0; i < orders.length; i++) {
        let orderTime = utils.timestampToTime(orders[i].timestamp, 'm')
        if (orders[i].amount < 0) {
          // 매도
          this.coinData.datasets[1].data.push({
            t: moment(orderTime, Config.dateFormat),
            y: orders[i].price,
            r: 10
          })
        } else if (orders[i].amount > 0) {
          // 매수
          this.coinData.datasets[2].data.push({
            t: moment(orderTime, Config.dateFormat),
            y: orders[i].price,
            r: 10
          })
        }
      }
    },
    setTradeHistory (orders) {
      orders.sort((f, s) => {
        return f.timestamp > s.timestamp
      })
      for (let i = 0; i < orders.length; i++) {
        let action = orders[i].amount < 0 ? 'Buy' : 'Sell'
        let orderTime = utils.timestampToTime(orders[i].timestamp, 'm')
        console.log('action', action, 'orders[i].amount', orders[i].amount, orders[i].amount * orders[i].price)
        this.backtestHistory.push({
          action: action,
          orderTime: orderTime,
          orderType: 'market',
          amount: utils.numberWithCommas(Math.abs(Number(orders[i].amount))),
          price: utils.numberWithCommas(Number(String(orders[i].price).substring(0, 10))),
          symbol: orders[i].base + '_' + orders[i].coin,
          description: orders[i].desc,
          sum: utils.numberWithCommas(Number(String(Number(orders[i].amount) * Number(orders[i].price)).substring(0, 10)))
        })
      }
    },
    setLastHistory (strategyId) {
      let url = Config.serverHost + '/' + Config.serverVer + '/tasks'
      this.axios.get(url, {headers: Config.defaultHeaders(), params: {strategyId: strategyId}, withCredentials: true}).then((result) => {
        if (result.data !== undefined && result.data.length > 0) {
          for (let i = 0; i < result.data.length; i++) {
            let testHistory = result.data[i]
            let tmpHist = {
              testTime: utils.timestampToTime(testHistory.testTime, 's'),
              version: testHistory.version,
              exchange: testHistory.exchangeName,
              revenue: testHistory.revenue,
              startTime: testHistory.startTime,
              endTime: testHistory.endTime
            }
            this.lastTopHistory.push(tmpHist)
          }
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    clearData () {
      this.backtestHistory = []
      this.lastTopHistory = []
      this.coinData.datasets[0].data = []
      this.coinData.datasets[1].data = []
      this.coinData.datasets[2].data = []
      this.candleSize = this.coinData.labels = []
    }
  },
  created () {
    this.strategy.strategyId = this.$route.params.strategyId
    if (this.strategy.strategyId !== undefined) {
      let url = Config.serverHost + '/' + Config.serverVer + '/strategy/' + this.strategy.strategyId
      this.axios.get(url, {headers: Config.defaultHeaders(), withCredentials: true}).then((result) => {
        let options = JSON.parse(result.data.options).filter((o) => { return o.must === 'false' })
        let strategy = {
          strategyId: result.data.id,
          name: result.data.name,
          version: result.data.version,
          code: result.data.code,
          options: options
        }
        this.strategy = strategy
        this.setLastHistory(this.strategy.strategyId)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  beforeDestroy () {
    if (this.webSocket !== '') {
      this.webSocket.close()
    }
  },
  mounted () {}
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
</style>
