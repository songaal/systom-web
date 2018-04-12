<template lang="html">
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col lg="8">
          <pythonEditor @saveStrategy="saveStrategy"
                        @setInterval="setInterval"
          />
        </b-col>

        <b-col lg="4">
          <BackTestForm :strategyId="strategyId"
                        @wsConnection="wsConnection"
                        @setTestTime="setTestTime"
                        :testProcess="testProcess"
                        :revenue="performance.revenue"
                        :maxRevenue="performance.maxRevenue"
                        :tradeCount="performance.tradeCount"
                        :LossRate="performance.LossRate"
                        :totalFee="performance.totalFee"
                        :interval="interval"
                        :intervalUnit="intervalUnit"
          />
        </b-col>
      </b-row>

      <b-card>
        <CoinChart :height="300"
                   :coinData="coinData"
        />
      </b-card>

      <b-card>
        <b-tabs>
          <b-tab title="테스트 이력">
            <HistoryTable :items="lastTopHistory"
                          fieldType="lastTopHistoryFields"
            />
          </b-tab>
          <b-tab title="거래 이력">
            <HistoryTable :items="backtestHistory"
                          fieldType="backtestHistoryFields"
            />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import BackTestForm from '../components/BackTest/BackTestForm'
import pythonEditor from '../components/Editor/PythonEditor'
import HistoryTable from '../components/SimulationHistory/HistoryTable'
import config from '../config/Config'
import utils from '../components/Utils'
import axios from 'axios'
import CoinChart from '../components/CoinCharts/CoinChart2'
import moment from 'moment'

const dateFormat = 'YYYY-MM-DD HH:mm'

export default {
  name: 'Strategy',
  data () {
    return {
      strategyId: '',
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
    pythonEditor,
    HistoryTable,
    CoinChart,
    moment
  },
  methods: {
    saveStrategy (strategyId) {
      this.strategyId = strategyId
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
      let wsUrl = config.baseTestWsUrl + '/' + userId + '_' + this.strategyId + '_' + backTestId
      this.webSocket = new WebSocket(wsUrl)
      this.webSocket.onopen = () => {
        this.clearData()
        this.setLastHistory(this.strategyId)
        this.setChartLabels()
        console.log('Connection is opened...')
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
      let currentTime = new Date(this.startTime)
      let endTime = new Date(this.endTime)
      currentTime.setHours(0)
      currentTime.setMinutes(0)
      endTime.setHours(23)
      endTime.setMinutes(59)
      while (currentTime.getTime() <= endTime.getTime()) {
        if (this.intervalUnit === 'T') {
          currentTime.setMinutes(currentTime.getMinutes() + Number(this.interval))
        } else if (this.intervalUnit === 'H') {
          currentTime.setHours(currentTime.getHours() + Number(this.interval))
        } else if (this.intervalUnit === 'D') {
          currentTime.setDate(currentTime.getDate() + Number(this.interval))
        }
        console.log('time label: ', utils.timeToString(currentTime, false))
        this.coinData.labels.push(moment(utils.timeToString(currentTime), dateFormat))
      }
      this.candleSize = this.coinData.labels.length
      console.log('candleSize:', this.candleSize)
    },
    setPriceChart (prices) {
      let priceTime = utils.timestampToTime(prices.timestamp, 'm')
      this.coinData.datasets[0].data.push({
        t: moment(priceTime, dateFormat),
        y: prices.price
      })
    },
    setTradeChart (orders) {
      for (let i = 0; i < orders.length; i++) {
        let orderTime = utils.timestampToTime(orders[i].timestamp, 'm')
        if (orders[i].amount < 0) {
          // 매도
          console.log(moment(orderTime, dateFormat))
          this.coinData.datasets[1].data.push({
            t: moment(utils.timeFormat(orderTime), dateFormat),
            y: orders[i].price,
            r: 10
          })
        } else if (orders[i].amount > 0) {
          // 매수
          this.coinData.datasets[2].data.push({
            t: moment(orderTime, dateFormat),
            y: orders[i].price,
            r: 10
          })
        }
      }
    },
    setTradeHistory (orders) {
      for (let i = 0; i < orders.length; i++) {
        let action = orders[i].amount < 0 ? 'Buy' : 'Sell'
        let orderTime = utils.timestampToTime(orders[i].timestamp, 'm')
        console.log(orders[i].amount * orders[i].price)
        this.backtestHistory.push({
          action: action,
          orderTime: orderTime,
          orderType: 'market',
          amount: orders[i].amount,
          price: String(orders[i].price).substring(0, 10),
          symbol: orders[i].base + '_' + orders[i].coin,
          description: orders[i].desc,
          sum: String(Number(orders[i].amount) * Number(orders[i].price)).substring(0, 10)
        })
      }
    },
    setLastHistory (strategyId) {
      let url = config.serverHost + '/' + config.serverVer + '/tasks'
      axios.get(url, {headers: config.defaultHeaders(), params: {strategyId: strategyId}}).then((result) => {
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
    this.strategyId = this.$route.params.strategyId
    if (this.strategyId !== undefined) {
      this.setLastHistory(this.strategyId)
    }
  },
  beforeDestroy () {
    if (this.webSocket !== '') {
      this.webSocket.close()
    }
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
</style>
