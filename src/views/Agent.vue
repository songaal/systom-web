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
            <b-tab title="기본">
              <b-container fluid>
                <b-row class="my-1"
                       v-for="field in fields"
                       :key="field.id"
                >
                  <b-col sm="3">
                    <label :for="`type-${field.id}`">{{ field.label }}:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input :id="`type-${field.id}`"
                                  :type="field.type"
                                  :value="field.value"
                                  class="bg-white border-0"
                                  disabled
                  />
                  </b-col>
                </b-row>
              </b-container>
            </b-tab>
            <b-tab title="설정">
              <b-container fluid>
                <b-row class="my-1"
                       v-for="field in optionFields"
                       :key="field.id"
                >
                  <b-col sm="3">
                    <label :for="`type-${field.id}`">{{field.label}}</label>
                  </b-col>
                  <b-col sm="9">
                    {{field.value}}
                  </b-col>
                </b-row>
              </b-container>
            </b-tab>
          </b-tabs>

          <hr />
          <b-row>
            <b-col>
              <b-button id="stopBtn"
                        v-if="state == 'run'"
                        variant="warning"
                        @click="changeState"
                        block
              >
              정지
              </b-button>
              <b-button id="runBtn"
                        v-if="state == 'stop'"
                        variant="primary"
                        @click="changeState"
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
          <h5>
            거래 이력 차트
          </h5>
          <hr />
          <lineChart :data="chartData"
                     :height="620"
          />
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <historyTable :items="history"/>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import historyTable from '../components/SimulationHistory/HistoryTable'
import lineChart from '../components/CoinCharts/LineChart'

export default {
  data () {
    return {
      state: 'stop',
      fields: [
        {type: 'text', id: 'agentId', label: '아이디', value: 'BAAA-1234-bbbb-5555'},
        {type: 'text', id: 'agentName', label: '이름', value: 'BAAA-NAME-bbbb-5555'},
        {type: 'text', id: 'algorithmId', label: '전략 아이디', value: 'AAA-1234-bbbb-5555'},
        {type: 'text', id: 'algorithmName', label: '전략 이름', value: '테스트 알고리즘'},
        {type: 'text', id: 'cumulativeReturn', label: '수익', value: '0.01%'},
        {type: 'text', id: 'exchange', label: '거래소', value: 'bittrex'},
        {type: 'text', id: 'currency', label: '통화', value: 'BTC'},
        {type: 'text', id: 'startBaseBalance', label: '시작 금액', value: '10000'},
        {type: 'text', id: 'nowBaseBalance', label: '현재 금액', value: '15000'},
        {type: 'text', id: 'coin', label: '코인 이름', value: 'ETH'},
        {type: 'text', id: 'coinCount', label: '보유 코인 수', value: '33'},
        {type: 'text', id: 'start', label: '시작시간', value: 'Running'},
        {type: 'text', id: 'tradeCount', label: '거래 횟수', value: '15'},
        {type: 'text', id: 'state', label: '상태', value: 'Running'}
      ],
      optionFields: [
        {label: 'sort', value: '5', desc: '설명 이것저것 합니다.'},
        {label: 'long', value: '50', desc: ''}
      ],
      chartData: {
        labels: ['BTC'],
        datasets: [
          {
            label: '가격',
            backgroundColor: '#f87979',
            data: [31, 62, 23, 54, 45, 76, 57, 18, 29, 310]
          }
        ]
      },
      history: [
        { '주문': '매도', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': 0.05905971, '수익률': '-5%', '심볼': 'ETH/BTC' },
        { '주문': '매수', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': 0.05905971, '수익률': '-', '심볼': 'ETH/BTC' },
        { '주문': '매도', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': 0.05905971, '수익률': '+1%', '심볼': 'ETH/BTC' },
        { '주문': '매수', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': 0.05905971, '수익률': '-', '심볼': 'ETH/BTC' }
      ]
    }
  },
  methods: {
    changeState () {
      this.state = this.state === 'run' ? 'stop' : 'run'
    }
  },
  components: {
    historyTable,
    lineChart
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px}
</style>
