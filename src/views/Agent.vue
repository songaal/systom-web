<template lang="html">
  <div class="wrapper">
    <b-row>
      <b-col sm="6"
             size="sm"
      >
        <b-card>
          <h5>
            에이전트 정보
          </h5>
          <hr />
          <b-tabs>
            <b-tab title="기본" card no-body>
              <b-container fluid>
                <b-row class="my-1"
                       v-for="field in fields"
                       :key="field.id"
                >
                  <b-col sm="3">
                    <label>{{ field.label }}:</label>
                  </b-col>
                  <b-col sm="9">
                    {{field.value}}
                  </b-col>
                </b-row>
              </b-container>
            </b-tab>
            <b-tab title="설정">
              <b-container fluid>
                <b-row class="my-1">
                  <b-col class="text-center"
                         xs="3" sm="3">
                    <label>키</label>
                  </b-col>
                  <b-col class="text-center"
                         xs="4" sm="4">
                    <label>값</label>
                  </b-col>
                  <b-col class="text-center"
                         xs="4" sm="4">
                    <label>설명</label>
                  </b-col>
                </b-row>
                <b-row class="my-1"
                       v-for="field in optionFields"
                       :key="field.id"
                >
                  <b-col class="text-center"
                         xs="3" sm="3">
                    <label>{{field.label}}</label>
                  </b-col>
                  <b-col class="text-center"
                         xs="4" sm="4">
                    {{field.value}}
                  </b-col>
                  <b-col class="text-center"
                         xs="4" sm="4">
                    {{field.desc}}
                  </b-col>
                </b-row>
              </b-container>
            </b-tab>
          </b-tabs>

          <hr />
          <b-row>
            <b-col>
              <b-button variant="warning"
                        @click="changeStopState"
                        v-if="state === 'running'"
                        block
              >
              정지
              </b-button>
              <b-button variant="primary"
                        v-if="state === 'stop'"
                        @click="changeStartState"
                        block
              >
              실행
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col sm="6"
             size="sm"
      >
        <b-card>
          <b-row>
            <b-col>
              <h5>성과지표</h5>
              <table class="table text-center">
                <tr>
                  <th>보유투자금</th>
                  <th>수익률</th>
                  <th>최대수익률</th>
                </tr>
                <tr>
                  <td class="font-weight-bold"><h5>{{performance.capitalBase}} {{performance.baseCurrency}}</h5></td>
                  <td class="font-weight-bold"><h5>{{performance.revenue}}%</h5></td>
                  <td class="font-weight-bold"><h5>{{performance.maxRevenue}}%</h5></td>
                </tr>
                <tr>
                  <th>거래횟수</th>
                  <th>최대 손실폭</th>
                  <th>총 수수료</th>
                </tr>
                <tr>
                  <td class="font-weight-bold"><h5>{{performance.tradeCount}}</h5></td>
                  <td class="font-weight-bold"><h5>{{performance.LossRate}}</h5></td>
                  <td class="font-weight-bold"><h5>{{performance.totalFee}}</h5></td>
                </tr>
              </table>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-card>
      <CoinChart :height="300"
                 :coinData="coinData"
      />
    </b-card>

    <b-row>
      <b-col>
        <b-card>
          <h5>
            거래 이력
          </h5>
          <historyTable :items="history"/>
        </b-card>
      </b-col>
    </b-row>

    <b-modal id="AgentRunModal"
             size="sm"
             class="text-center"
             title="에이전트 실행"
             @ok="agentRun">
      <b-form-group label="실행할 모드를 선택하세요.">
        <b-form-radio-group buttons
                            :options="['라이브', '페이퍼']"
                            v-model="mode"
                            size="lg"
                            button-variant="outline-primary"
                            block
        />
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import historyTable from '../components/SimulationHistory/HistoryTable'
import CoinChart from '../components/CoinCharts/CoinChart2'
import config from '../config/Config'
import utils from '../components/Utils'
// import moment from 'moment'

// const dateFormat = 'YYYY-MM-DD HH:mm'

export default {
  data () {
    return {
      agentId: '',
      state: '',
      fields: [],
      optionFields: [],
      createTime: '',
      mode: '페이퍼',
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
        capitalBase: '10',
        baseCurrency: 'BTC',
        revenue: '10',
        maxRevenue: '30',
        tradeCount: '99',
        LossRate: '-10',
        totalFee: '0.111'
      },
      history: [
        // { '주문': '매도', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': 0.05905971, '수익률': '-5%', '코인': 'ETH' },
        // { '주문': '매수', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': 0.05905971, '수익률': '-', '코인': 'ETH' },
        // { '주문': '매도', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': 0.05905971, '수익률': '+1%', '코인': 'ETH' },
        // { '주문': '매수', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': 0.05905971, '수익률': '-', '코인': 'ETH' }
      ]
    }
  },
  methods: {
    getAgent () {
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
        this.wsConnection()
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
      }
      this.webSocket.onclose = () => {
        console.log('Connection is closed...')
      }
    },
    appendCoinData () {
      console.log('appendCoinData')
    },
    changeStopState () {
      if (!confirm('정지 하시겠습니까?')) {
        this.$vueOnToast.pop('info', '성공', '정지 되었습니다.')
        return false
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
    }
  },
  components: {
    historyTable,
    CoinChart
  },
  created () {
    this.agentId = this.$route.params.agentId
    if (this.agentId !== '') {
      this.getAgent()
    }
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px}
</style>
