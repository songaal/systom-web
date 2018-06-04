<template>
  <div class="backtestForm">
    <b-row>
      <b-col>
        <b-form-group
          label="시작일"
          :label-cols="2"
          :horizontal="true">
          <date-picker v-model="datePickerStartTime"
                       format="yyyy-MM-dd"
                       language="ko"
                       :disabled="disabled"
          />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
          label="종료일"
          :label-cols="2"
          :horizontal="true">
          <date-picker v-model="datePickerEndTime"
                       format="yyyy-MM-dd"
                       language="ko"
                       :disabled="disabled"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <hr />

    <h5>추가옵션</h5>
    <b-row>
      <b-col>
        <table class="table">
          <colgroup>
            <col width="30%"/>
            <col width="30%"/>
            <col width="*"/>
          </colgroup>
          <thead>
            <tr>
              <th scope="col">키</th>
              <th scope="col">값</th>
              <th scope="col">설명</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="options.length === 0">
              <td colspan="3" class="text-center">추가 옵션 항목이 없습니다.</td>
            </tr>
            <tr v-for="(option, index) in options"
            >
              <td>{{option.key}}</td>
              <td><b-form-input v-model="options[index].value"/></td>
              <td>{{option.desc}}</td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col cols="12">
        <button v-if="isTesting === false" class="btn btn-lg btn-primary btn-block" @click="backtestRun">
          <span class="ladda-label">테스트</span>
        </button>
        <b-button-spinner  v-if="isTesting === true" size="large"></b-button-spinner>
      </b-col>
    </b-row>

    <div v-if="backtestProcess.step > 1 || backtestProcess.step === 0">
      <b-card>
        <div class="h4 m-0">{{backtestProcess.progress}}%</div>
        <div>진행율</div>
        <b-progress class="progress-xs my-3" :variant="backtestProcess.variant" :value="backtestProcess.progress"/>
      </b-card>
    </div>

    <div v-if="backtestProcess.step == 3" id="performanceForm">
      <h5>성과지표</h5>
      <b-row>
        <b-col>
          <performanceIndex :perfData="performanceData"></performanceIndex>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import datePicker from 'vuejs-datepicker'
import config from '../../Config'
import utils from '../../Utils'
import performanceIndex from '../Performance/index'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'backtestForm',
  extends: '',
  components: {
    performanceIndex,
    datePicker,
    'b-button-spinner': Spinner
  },
  props: ['strategyDetail', 'exchange', 'symbol', 'timeInterval'],
  data () {
    // backtestProcess.step: 0 error, 1 before, 2 invoke, 3 after
    return {
      isTesting: false,
      backtestProcess: {
        step: 1,
        progress: 0,
        variant: 'info',
        pctInterval: null
      },
      startTime: null,
      endTime: null,
      options: [],
      performanceData: {
        exchange: null,
        symbol: null,
        start: null,
        end: null,
        stuats: null,
        days: 0,
        message: null,
        time: 0,
        request: {},
        max_return_pct: 0,
        total_equity_usd: 0,
        total_commission: 0,
        drawdowns: [],
        wins_pct: 0,
        wins_count: 0,
        trades: 0,
        lose_count: 0,
        wins_rate: 0,
        max_returns: 0,
        total_equity: 0,
        return_pct: 0,
        pnl_rate: 0,
        max_drawdown: 0,
        max_drawdown_duration: 0,
        wins_return_avg: 0,
        lose_return_avg: 0,
        positions: [],
        equity: [],
        cum_returns: [],
        trade_history: []
      }
    }
  },
  computed: {
    disabled () {
      let nowTime = new Date()
      nowTime.setDate(nowTime.getDate() - 1)
      return {
        to: new Date(2017, 4, 1),
        from: nowTime
      }
    },
    datePickerStartTime: {
      get () {
        return this.startTime
      },
      set (t) {
        this.startTime = utils.timeToString(t)
      }
    },
    datePickerEndTime: {
      get () {
        return this.endTime
      },
      set (t) {
        this.endTime = utils.timeToString(t)
      }
    }
  },
  watch: {
    strategyDetail () {
      this.options = JSON.parse(this.strategyDetail.options)
    }
  },
  methods: {
    handleProgress (step, pct) {
      this.isTesting = false
      this.backtestProcess.step = step
      if (pct !== null && pct !== undefined) {
        this.backtestProcess.progress = pct
      }
      if (this.backtestProcess.pctInterval !== null) {
        clearInterval(this.backtestProcess.pctInterval)
      }
      if (step === 0) {
        // Error
        this.backtestProcess.variant = 'danger'
      } else if (step === 1) {
        // wait
        this.backtestProcess.variant = 'info'
        this.backtestProcess.progress = 0
      } else if (step === 2) {
        // ing
        this.isTesting = true
        this.backtestProcess.variant = 'info'
        setTimeout(() => {
          this.backtestProcess.pctInterval = setInterval(() => {
            pct += 1
            this.backtestProcess.progress = pct
            if (this.backtestProcess.progress >= 99) {
              clearInterval(this.backtestProcess.pctInterval)
              this.backtestProcess.pctInterval = null
            }
          }, 30)
        }, 500)
      } else if (step === 3) {
        // finish
        this.backtestProcess.variant = 'success'
      }
    },
    performanceShow (response, requetBody) {
      response = JSON.parse(response)
      if (response.status === 'success') {
        let reuqest = response.request
        this.performanceData = response.result
        this.performanceData.exchange = utils.capitalizeFirstLetter(reuqest.exchange)
        this.performanceData.symbol = reuqest.symbol.toUpperCase()
        this.performanceData.start = reuqest.start
        this.performanceData.end = reuqest.end
        this.performanceData.days = reuqest.days
        this.performanceData.coin = requetBody.symbol.split('/')[0]
        this.performanceData.base = requetBody.symbol.split('/')[1]
        this.$emit('setBacktestPerfomance', this.performanceData)
        this.handleProgress(3, 100)
      } else {
        this.handleProgress(0)
      }
    },
    backtestRun () {
      if (this.backtestProcess.step === 2) {
        this.$vueOnToast.pop('warning', '실패', '테스트가 진행 중 입니다.')
        return
      }
      if (this.$route.params.strategyId === undefined) {
        this.$vueOnToast.pop('error', '실패', '코드를 저장해주세요.')
        return
      }
      if (this.exchange === null) {
        this.$vueOnToast.pop('error', '실패', '거래소를 선택하세요.')
        return
      }
      if (this.symbol === null) {
        this.$vueOnToast.pop('error', '실패', '심볼을 선택하세요.')
        return
      }
      if (this.startTime > this.endTime) {
        this.$vueOnToast.pop('error', '실패', '시작일은 종료일보다 크거나 같을수없습니다.')
        return
      }
      if (this.timeInterval === null) {
        this.$vueOnToast.pop('error', '실패', '데이터 시간간격을 선택하세요.')
        return
      }
      let isEmptyValueOptions = this.options.filter(o => {
        return o.value === '' || o.value === null || o.value === undefined
      })
      if (isEmptyValueOptions.length !== 0) {
        this.$vueOnToast.pop('error', '실패', '추가 옵션 항목을 입력하세요.')
        return
      }
      let body = {
        strategyId: this.$store.strategyId,
        exchangeName: this.exchange,
        symbol: this.symbol,
        timeInterval: this.timeInterval,
        startTime: this.startTime,
        endTime: this.endTime + ' 23:59:59',
        options: JSON.stringify(this.options)
      }
      this.handleProgress(2, 0)
      let url = config.serverHost + '/' + config.serverVer + '/tasks/backtest'
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        this.performanceShow(response.data.resultJson, body)
      }).catch((e) => {
        this.handleProgress(0)
        utils.httpFailNotify(e, this)
      })
    }
  },
  beforeCreate () {},
  created () {
    let nowTime = new Date()
    nowTime.setDate(nowTime.getDate() - 1)
    this.startTime = utils.timeToString(nowTime)
    this.endTime = utils.timeToString(nowTime)
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style>
.backtestForm {
  min-height: 300px;
}
.vdp-datepicker input {
    padding: .75em .5em;
    font-size: 100%;
    border: 1px solid #ccc;
    width: 100%
}
</style>
