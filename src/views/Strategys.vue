<template lang="html">
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col lg="6">
          <pythonEditor @saveStrategy="saveStrategy"/>
        </b-col>

        <b-col lg="6">
          <BackTestForm :coinData="coinData"
                        :strategysId="strategysId"
                        @wsConnection="wsConnection"
          />
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="6">
          <HistoryTable :items="lastTopHistory"
                        fieldType="lastTopHistoryFields"
                        title="테스트 이력"
          />
        </b-col>
        <b-col lg="6">
          <HistoryTable :items="backtestHistory"
                        fieldType="backtestHistoryFields"
                        title="거래 이력"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import BackTestForm from '../components/BackTest/BackTestForm'
import pythonEditor from '../components/Editor/PythonEditor'
import HistoryTable from '../components/SimulationHistory/HistoryTable'
import config from '../config/Config'
import utils from '../components/Utils'

export default {
  name: 'Strategys',
  data () {
    return {
      strategysId: '',
      webSocket: '',
      lastTopHistory: [
        // {version: '1.5.1', exchange: 'poloniex', symbol: 'ETH_BTC', revenue: '+12%', startTime: '2018/03/01', endTime: '2018/03/30'}
      ],
      backtestHistory: [
        // {action: '매도', orderTime: '2018/01/01 03:25:00', orderType: 'Market', price: '0.05905971', revenue: '-5%', symbol: 'ETH_BTC', description: 'corss MA5 MA50'}
      ],
      coinData: {
        labels: [],
        datasets: [
          {
            label: 'price',
            borderColor: '#115533',
            backgroundColor: '#115533',
            fill: false,
            data: []
          }
        ]
      }
    }
  },
  components: {
    BackTestForm,
    pythonEditor,
    HistoryTable
  },
  methods: {
    saveStrategy (strategysId) {
      this.strategysId = strategysId
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    wsConnection (userId, backTestId) {
      let wsUrl = config.baseWsUrl + '/' + userId + '_' + this.strategysId + '_' + backTestId
      // let wsUrl = config.baseWsUrl + '/' + userId + '_' + 1 + '_' + 1
      this.webSocket = new WebSocket(wsUrl)
      this.webSocket.onopen = () => {
        this.webSocket.send('Message to send')
        console.log('Message is sent...')
      }
      this.webSocket.onmessage = (event) => {
        let jsonData = JSON.parse(event.data)
        let orders = jsonData.orders
        let prices = jsonData.price
        this.coinData.labels.push(utils.timestampToTime(prices.timestamp))
        this.coinData.datasets[0].data.push(prices.price)
        for (let i = 0; i < orders.length; i++) {
          let action = orders[i].amount > 0 ? '매수' : '매도'
          let orderTime = utils.timestampToTime(orders[i].timestamp)
          this.backtestHistory.push({
            action: action,
            orderTime: orderTime,
            orderType: 'market',
            price: orders[i].price,
            symbol: orders[i].coin + '/' + orders[i].base,
            description: orders[i].desc
          })
        }
      }
      this.webSocket.onclose = () => {
        console.log('Connection is closed...')
      }
    }
  },
  created () {
    this.strategysId = this.$route.params.strategysId
    // setInterval(() => {
    //   this.tmpSeq += 1
    //   let a = '2018/09/0'.concat(this.tmpSeq)
    //   this.coinData.labels.push(a)
    //   this.coinData.datasets[0].data.push(this.getRandomInt())
    // }, 5000)
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
