<template>
  <b-card class="backtestForm">
    <b-row>
      <b-col sm="4">
        <b-select v-model="exchange.selected"
                  :options="exchange.options"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  size="sm"
        />
      </b-col>
      <b-col sm="4">
        <b-input v-model="capitalBase"
                 class="mb-2 mr-sm-2 mb-sm-0"
                 placeholder="시작금액"
                 size="sm"
        />
      </b-col>
      <b-col sm="4">
        <b-input v-model="baseCurrency"
                 class="mb-2 mr-sm-2 mb-sm-0"
                 placeholder="통화"
                 size="sm"
        />
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col sm="4">
        <date-picker v-model="startTime"
                     class="mb-2 mr-sm-2 mb-sm-0 datepicker"
                     size="sm"
                     lang="en"
                     width="100%"
                     :not-after="nowTime"
        />
      </b-col>
      <b-col sm="4">
        <date-picker v-model="endTime"
                     class="mb-2 mr-sm-2 mb-sm-0 datepicker"
                     size="sm"
                     lang="en"
                     width="100%"
                     :not-after="nowTime"
        />
      </b-col>
      <b-col sm="4">
        <b-button class="mb-2 mr-sm-2 mb-sm-0"
                  variant="primary"
                  size="sm"
                  block
                  @click="backtestRun"
        >
          테스트
        </b-button>
      </b-col>
    </b-row>
    <br />
    <b-row v-show="showProgressBar">
      <b-col>
        <b-card>
          <div class="h4 m-0">{{testProcess}}%</div>
          <div>진행율</div>
          <b-progress height={} class="progress-xs my-3" variant="success" :value="testProcess" animated/>
        </b-card>
      </b-col>
    </b-row>
    <br />
    <b-row v-show="showPerformance">
      <b-col>
        <h5>성과지표</h5>
        <table class="table text-center">
          <tr>
            <th>초기투자금</th>
            <th>수익률</th>
            <th>최대수익률</th>
          </tr>
          <tr>
            <td class="font-weight-bold"><h5>{{capitalBase}} {{baseCurrency}}</h5></td>
            <td class="font-weight-bold"><h5>{{revenue}}%</h5></td>
            <td class="font-weight-bold"><h5>{{maxRevenue}}%</h5></td>
          </tr>
          <tr>
            <th>거래횟수</th>
            <th>최대 손실폭</th>
            <th>총 수수료</th>
          </tr>
          <tr>
            <td class="font-weight-bold"><h5>{{tradeCount}}</h5></td>
            <td class="font-weight-bold"><h5>{{LossRate}}</h5></td>
            <td class="font-weight-bold"><h5>{{totalFee}}</h5></td>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import CoinChart from '../CoinCharts/CoinChart2'
import axios from 'axios'
import config from '../../config/Config'
import utils from '../Utils'
import DatePicker from 'vue2-datepicker'

export default {
  name: 'BackTest',
  props: ['coinData', 'strategyId', 'testProcess', 'revenue', 'maxRevenue', 'tradeCount', 'LossRate', 'totalFee', 'interval', 'intervalUnit'],
  data () {
    return {
      exchange: {
        selected: config.backtestExchanges[0],
        options: config.backtestExchanges
      },
      capitalBase: '10',
      baseCurrency: 'btc',
      startTime: '',
      endTime: '',
      showProgressBar: false,
      showPerformance: false,
      nowTime: ''
    }
  },
  components: {
    CoinChart,
    DatePicker
  },
  methods: {
    backtestRun () {
      if (this.capitalBase === '') {
        this.$vueOnToast.pop('error', '실패', '시작금액을 입력하세요.')
        return
      }
      if (this.baseCurrency === '') {
        this.$vueOnToast.pop('error', '실패', '통화를 입력하세요.')
        return
      }
      if (this.startTime === '') {
        this.$vueOnToast.pop('error', '실패', '시작시간를 선택하세요.')
        return
      }
      if (this.endTime === '') {
        this.$vueOnToast.pop('error', '실패', '종료시간를 선택하세요.')
        return
      }
      if (new Date(this.startTime) > new Date(this.endTime)) {
        this.$vueOnToast.pop('error', '실패', '시작시간은 종료시간 보다 클 수 없습니다.')
        return
      }
      if (this.intervalUnit === 'T' && utils.timeToString(this.startTime) !== utils.timeToString(this.endTime)) {
        this.$vueOnToast.pop('error', '실패', '테스트 범위 1일 입니다.')
        return
      } else if (this.intervalUnit === 'H') {
        let tmpStartTime = new Date(this.startTime)
        let tmpEndTime = new Date(this.endTime)
        tmpStartTime.setDate(tmpStartTime.getDate() + Number(31))
        if (tmpStartTime.getTime() <= tmpEndTime.getTime()) {
          this.$vueOnToast.pop('error', '실패', '테스트 범위 31일 입니다.')
          return
        }
      }
      console.log('testing... startTime:', utils.timeToString(this.startTime), ', endTime:', utils.timeToString(this.endTime), this.endTime)
      let body = {
        task: {
          strategyId: this.strategyId,
          exchangeName: this.exchange.selected,
          capitalBase: this.capitalBase,
          baseCurrency: this.baseCurrency,
          live: false,
          startTime: utils.timeToString(this.startTime),
          endTime: utils.timeToString(this.endTime),
          dataFrequency: 'minute'
        }
      }
      this.$emit('setTestTime', this.startTime, this.endTime)
      axios.post(config.baseUrl + '/tasks/test', body, {headers: config.defaultHeaders()}).then((result) => {
        this.$vueOnToast.pop('success', '성공', '테스트가 시작 되었습니다.')
        this.showProgressBar = true
        this.showPerformance = true
        this.testProcess = 0
        this.$emit('wsConnection', result.data.userId, result.data.id)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  created () {
    let nowTime = new Date()
    nowTime.setDate(nowTime.getDate() - 1)
    this.nowTime = nowTime
    nowTime.setDate(nowTime.getDate() - 1)
    this.startTime = nowTime
    this.endTime = nowTime
  }
}
</script>
<style>
.backtestForm {
  height: 680px;
}
</style>
