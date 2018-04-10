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
          <BackTestForm :strategysId="strategysId"
                        @wsConnection="wsConnection"
                        @setTestTime="setTestTime"
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
      strategysId: '',
      interval: '1',
      intervalUnit: 'T',
      webSocket: '',
      startTime: '2018-01-01',
      endTime: '2018-01-31',
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
          label: '매수',
          borderColor: 'red',
          backgroundColor: 'red',
          fill: false,
          type: 'bubble',
          data: []
        },
        {
          label: '매도',
          borderColor: 'blue',
          backgroundColor: 'blue',
          fill: false,
          type: 'bubble',
          data: []
        }]
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
    saveStrategy (strategysId) {
      this.strategysId = strategysId
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
      let wsUrl = config.baseTestWsUrl + '/' + userId + '_' + this.strategysId + '_' + backTestId
      this.webSocket = new WebSocket(wsUrl)
      this.webSocket.onopen = () => {
        this.backtestHistory = []
        this.lastTopHistory = []
        this.coinData.datasets[0].data = []
        this.coinData.datasets[1].data = []
        this.coinData.datasets[2].data = []
        this.setLastHistory(this.strategysId)
        this.setChartLabels()
      }
      this.webSocket.onmessage = (event) => {
        let jsonData = JSON.parse(event.data)
        this.setPriceChart(jsonData.price)
        this.setTradeChart(jsonData.orders)
        this.setTradeHistory(jsonData.orders)
      }
      this.webSocket.onclose = () => {
        console.log('Connection is closed...')
      }
    },
    setChartLabels () {
      let currencyTime = new Date(this.startTime)
      let endTime = new Date(this.endTime)
      while (currencyTime.getTime() < endTime.getTime()) {
        if (this.intervalUnit === 'T') {
          currencyTime.setMinutes(currencyTime.getMinutes() + this.interval)
        }
        if (this.intervalUnit === 'H') {
          currencyTime.setHours(currencyTime.getHours() + this.interval)
        }
        this.coinData.labels.push(moment(utils.timeFormat(currencyTime), dateFormat))
      }
    },
    setPriceChart (prices) {
      let priceTime = utils.timestampToTime(prices.timestamp)
      this.coinData.datasets[0].data.push({
        t: moment(priceTime, dateFormat),
        y: prices.price
      })
    },
    setTradeChart (orders) {
      for (let i = 0; i < orders.length; i++) {
        let orderTime = utils.timestampToTime(orders[i].timestamp)
        if (orders[i].amount > 0) {
          this.coinData.datasets[1].data.push({
            t: moment(orderTime, dateFormat),
            y: orders[i].price,
            r: 10
          })
        } else if (orders[i].amount < 0) {
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
        let action = orders[i].amount > 0 ? '매수' : '매도'
        let orderTime = utils.timestampToTime(orders[i].timestamp)
        this.backtestHistory.push({
          action: action,
          orderTime: orderTime,
          orderType: 'market',
          amount: orders[i].amount,
          price: orders[i].price,
          symbol: orders[i].coin + '/' + orders[i].base,
          description: orders[i].desc,
          sum: orders[i].amount * orders[i].price
        })
      }
    },
    setLastHistory (strategysId) {
      axios.get(config.baseUrl + '/tasks', {headers: config.defaultHeaders(), params: {strategysId: strategysId}}).then((result) => {
        if (result.data !== undefined && result.data.length > 0) {
          for (let i = 0; i < result.data.length; i++) {
            let testHistory = result.data[i]
            let tmpHist = {
              testTime: utils.timestampToTime(testHistory.testTime * 1000000),
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
    }
  },
  created () {
    this.strategysId = this.$route.params.strategysId
    if (this.strategysId !== undefined) {
      this.setLastHistory(this.strategysId)
    }
    this.setChartLabels()
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
