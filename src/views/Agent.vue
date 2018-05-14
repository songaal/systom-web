<template lang="html">
  <div class="wrapper">
     <b-alert show variant="success">진행</b-alert>
     <!-- <b-alert show variant="danger">중지</b-alert> -->
    <b-card>
      <b-tabs>
        <b-tab title="성과지표">
          <PerfomanceIndex></PerfomanceIndex>
        </b-tab>
        <b-tab title="에이전트정보">
          <b-row>
            <b-col>
              <table class="table">
                <tr>
                  <th>에이전트 이름</th>
                  <th>전략 이름</th>
                  <th>거래소</th>
                  <th>거래소키</th>
                </tr>
                <tr>
                  <td>테스트봇</td>
                  <td>평균이동전략</td>
                  <td>Poloniex</td>
                  <td>test계정키</td>
                </tr>
                <tr>
                  <th>통화</th>
                  <th>초기 투자금</th>
                  <th>상태</th>
                  <th></th>
                </tr>
                <tr>
                  <td>USDT</td>
                  <td>9500</td>
                  <td class="text-info">진행</td>
                  <td></td>
                </tr>
              </table>
            </b-col>
          </b-row>
          <h5>옵션</h5>
          <b-row>
            <b-col>
              <table class="table">
                <tr>
                  <th>키</th>
                  <th>값</th>
                  <th>설명</th>
                </tr>
                <tr v-for="field in optionFields"
                    :key="field.id">
                  <td>{{field.label}}</td>
                  <td>{{field.value}}</td>
                  <td>{{field.desc}}</td>
                </tr>
              </table>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-button variant="warning"
                        @click="changeStopState"
                        v-if="state === 'running'"
              >
              정지
              </b-button>
              <b-dropdown variant="primary"
                          v-if="state === 'stop'"
                          @click="changeStartState"
                          text="실행"
                          split
              >
                <b-dropdown-item @click="removeAgent">삭제</b-dropdown-item>
              </b-dropdown>
            </b-col>
          </b-row>

        </b-tab>
      </b-tabs>
    </b-card>

    <b-card>
      <b-tabs>
        <b-tab title="차트">
          <CoinChart />
        </b-tab>
        <b-tab title="거래이력">
          <historyTable :items="liveTradeHistory"
                        fieldType="liveTradeHistory"
          />
        </b-tab>
      </b-tabs>

    </b-card>

    <b-modal id="AgentRunModal"
             size="sm"
             class="text-center"
             title="에이전트 실행"
    >
      <b-form-group label="실행할 모드를 선택하세요.">
        <b-form-radio-group buttons
                            :options="['라이브', '페이퍼']"
                            v-model="mode"
                            size="lg"
                            button-variant="outline-primary"
                            block
        />
      </b-form-group>
      <div slot="modal-footer">
        <button class="btn btn-secondary" @click="() => {this.$root.$emit('bv::hide::modal', 'AgentRunModal')}">취소</button>
        <button class="btn btn-primary" @click="agentRun">확인</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import historyTable from '../components/SimulationHistory/HistoryTable'
import CoinChart from '../components/Charts/CoinChart'
import config from '../config/Config'
import utils from '../components/Utils'
import moment from 'moment'
import PerfomanceIndex from '../components/Performance/index'
const dateFormat = 'YYYY-MM-DD HH:mm'

export default {
  data () {
    return {
      agentId: '',
      state: '',
      fields: [],
      optionFields: [],
      createTime: '',
      mode: '라이브',
      webSocket: '',
      dataLoadCycle: {
        interval: '',
        intervalUnit: ''
      },
      coinData: {
        labels: [],
        datasets: [
          { label: '가격', borderColor: 'silver', backgroundColor: 'silver', fill: false, data: [] },
          { label: '매도', borderColor: 'blue', backgroundColor: 'blue', fill: false, type: 'bubble', data: [] },
          { label: '매수', borderColor: 'red', backgroundColor: 'red', fill: false, type: 'bubble', data: [] }
        ]
      },
      performance: {
        capitalBase: '-',
        baseCurrency: '-',
        revenue: '-',
        maxRevenue: '-',
        tradeCount: '-',
        LossRate: '-',
        totalFee: '-'
      },
      liveTradeHistory: []
    }
  },
  methods: {
    getAgent () {
      this.$root.$emit('bv::hide::modal', 'AgentRunModal')
      let url = config.serverHost + '/' + config.serverVer + '/agents/' + this.agentId
      this.axios.get(url, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        console.log('agent 조회', result)
        let agentData = result.data
        this.fields.push({label: '에이전트 이름', value: agentData.name})
        this.fields.push({label: '전략 이름', value: agentData.strategyName})
        this.fields.push({label: '통화', value: agentData.baseCurrency})
        this.fields.push({label: '초기 투자금', value: agentData.capitalBase})
        this.fields.push({label: '거래소', value: agentData.exchangeName})
        this.fields.push({label: '거래소키', value: agentData.exchangeKeyName})
        this.fields.push({label: '상태', value: agentData.state})
        this.optionFields = JSON.parse(agentData.options)
        let timeInterval = this.optionFields.filter((o) => { return o.key === 'timeInterval' })[0]
        this.optionFields.map((o) => {
          o.value = o.key === 'timeInterval' ? config.formatEnToKoTimeInterval(o.value) : o.value
        })
        this.dataLoadCycle.interval = timeInterval.value.length === 2 ? timeInterval.value.substring(0, 1) : timeInterval.value.substring(0, 2)
        this.dataLoadCycle.intervalUnit = timeInterval.value.length === 2 ? timeInterval.value.substring(1, 2) : timeInterval.value.substring(2, 3)
        this.createTime = agentData.createTime
        this.state = agentData.state
        if (this.state === 'running') {
          this.wsConnection()
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    getTradeHistory () {
      let url = config.serverHost + '/' + config.serverVer + '/agents/' + this.agentId + '/trade'
      this.axios.get(url, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        this.setTradeHistory(result.data)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    wsConnection () {
      if (this.webSocket !== '') {
        this.webSocket.close()
      }
      let wsUrl = config.baseAgentWsUrl + '/' + this.agentId
      this.webSocket = new WebSocket(wsUrl)
      this.webSocket.onopen = () => {
        console.log('Connection is opened...', wsUrl)
      }
      this.webSocket.onmessage = (event) => {
        let jsonData = JSON.parse(event.data)
        console.log('전달받은 데이터', jsonData)
        this.setPriceChart(jsonData.price)
        this.setTradeChart(jsonData.orders)
        this.setTradeHistory(jsonData.orders)
      }
      this.webSocket.onclose = () => {
        console.log('Connection is closed...')
      }
    },
    setPriceChart (prices) {
      let priceTime = utils.timestampToTime(prices.timestamp, 'm')
      // if (config.maxCandleSize <= this.coinData.labels.length) {
      //   this.coinData.labels.splice(0, 1)
      //   this.coinData.datasets.forEach((o) => {
      //     o.data.splice(0, 1)
      //   })
      // }
      this.coinData.labels.push(priceTime)
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
          this.coinData.datasets[1].data.push({
            t: moment(orderTime, dateFormat),
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
      console.log('history', orders)
      for (let i = 0; i < orders.length; i++) {
        let action = orders[i].amount < 0 ? 'Sell' : 'Buy'
        let orderTime = utils.timestampToTime(orders[i].timestamp, 'm')
        this.liveTradeHistory.push({
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
    changeStopState () {
      if (!confirm('정지 하시겠습니까?')) {
        return
      }
      let mode = this.mode === '라이브' ? 'live' : 'paper'
      let body = {
        mode: mode,
        action: 'stop'
      }
      let url = config.serverHost + '/' + config.serverVer + '/agents/' + this.agentId + '/actions'
      this.axios.post(url, body, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        if (result.status === 200) {
          this.$vueOnToast.pop('info', '성공', '에이전트 정지 되었습니다.')
        } else {
          this.$vueOnToast.pop('warning', '실패', '에이전트 정지 실패하였습니다.')
        }
        this.clearData()
        this.getAgent()
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    changeStartState () {
      this.$root.$emit('bv::show::modal', 'AgentRunModal')
    },
    agentRun () {
      let mode = this.mode === '라이브' ? 'live' : 'paper'
      let body = {
        mode: mode,
        action: 'run'
      }
      let url = config.serverHost + '/' + config.serverVer + '/agents/' + this.agentId + '/actions'
      this.axios.post(url, body, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        if (result.status === 200) {
          this.$vueOnToast.pop('info', '성공', '에이전트 실행 되었습니다.')
        } else {
          this.$vueOnToast.pop('warning', '실패', '에이전트 실행 실패하였습니다.')
        }
        this.clearData()
        this.getAgent()
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    clearData () {
      this.fields = []
      if (this.webSocket !== '') {
        this.webSocket.close()
      }
    },
    removeAgent () {
      if (!confirm('에이전트를 삭제 하시겠습니까?')) {
        return
      }
      let url = config.serverHost + '/' + config.serverVer + '/agents/' + this.agentId
      this.axios.delete(url, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        if (result.status === 200) {
          this.$vueOnToast.pop('info', '성공', '에이전트 삭제 되었습니다.')
          this.$router.replace('/agents')
        } else {
          this.$vueOnToast.pop('warning', '실패', '에이전트 삭제 실패하였습니다.')
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  components: {
    historyTable,
    CoinChart,
    PerfomanceIndex
  },
  created () {
    this.agentId = this.$route.params.agentId
    if (this.agentId !== '') {
      this.getAgent()
      this.getTradeHistory()
    }
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px}
.btn-flex {
  display: flex;
  align-items: stretch;
  align-content: stretch;
}
.btn-flex .btn:first-child {
  flex-grow: 1;
  text-align: center;
}
</style>
