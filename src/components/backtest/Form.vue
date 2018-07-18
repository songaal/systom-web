<template>
  <div class="backtestForm">
    <b-row>
      <b-col col cols="12" xs="12" sm="12" md="6" lg="6">
        <b-form-group
          label="시작일"
          :label-cols="2"
          :horizontal="true"
          label-size="md">
          <date-picker v-model="datePickerstartDate"
                       format="yyyy-MM-dd"
                       language="ko"
                       :disabled="disabled"
          />
        </b-form-group>
      </b-col>
      <b-col col cols="12" xs="12" sm="12" md="6" lg="6">
        <b-form-group
          label="종료일"
          :label-cols="2"
          :horizontal="true"
          label-size="md">
          <date-picker v-model="datePickerendDate"
                       format="yyyy-MM-dd"
                       language="ko"
                       :disabled="disabled"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col cols="12">
        <button v-if="isTesting === false" class="btn btn-primary btn-block" @click="backtestRun">
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
      <div class="mb-3">
        <h5>성과지표
          <!-- <button class="btn btn-sm btn-primary float-right"
                  @click="saveBackTest"
          >이 결과 저장하기</button> -->
        </h5>
      </div>
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
  props: ['strategyId', 'version', 'exchange', 'symbol', 'cashUnit', 'cash'],
  data () {
    // backtestProcess.step: 0 error, 1 before, 2 invoke, 3 after
    return {
      startDate: null,
      endDate: null,
      isTesting: false,
      backtestProcess: {
        step: 1,
        progress: 0,
        variant: 'info',
        pctInterval: null
      },
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
    datePickerstartDate: {
      get () {
        return this.startDate
      },
      set (t) {
        this.startDate = utils.timeToString(t)
      }
    },
    datePickerendDate: {
      get () {
        return this.endDate
      },
      set (t) {
        this.endDate = utils.timeToString(t)
      }
    }
  },
  watch: {
    '$store.state.strategy' () {
      this.backtestProcess.step = 1
      this.backtestProcess.progress = 0
      this.backtestProcess.variant = 'info'
      this.backtestProcess.isTesting = false
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
            if (this.backtestProcess.progress >= 99) {
              clearInterval(this.backtestProcess.pctInterval)
              this.backtestProcess.pctInterval = null
            } else {
              pct += 1
              this.backtestProcess.progress = pct
            }
          }, 30)
        }, 500)
      } else if (step === 3) {
        // finish
        this.backtestProcess.pctInterval = null
        this.backtestProcess.progress = 100
        this.backtestProcess.variant = 'success'
      }
    },
    // formatPerformanceData (result) {
    //   if (result.status === 'success') {
    //     this.performanceData = result.result
    //     this.performanceData.exchange = utils.capitalizeFirstLetter(this.exchange)
    //     this.performanceData.symbol = this.symbol.toUpperCase()
    //     this.performanceData.start = this.startDate
    //     this.performanceData.end = this.endDate
    //     this.performanceData.days = result.request.days
    //     this.performanceData.coin = this.symbol.toUpperCase().split('/')[0]
    //     this.performanceData.base = this.symbol.toUpperCase().split('/')[1]
    //     this.handleProgress(3, 100)
    //   } else {
    //     this.$vueOnToast.pop('warning', '실패', '테스트가 실패하였습니다.')
    //     this.handleProgress(0)
    //   }
    // },
    backtestRun () {
      if (this.backtestProcess.step === 2) {
        this.$vueOnToast.pop('warning', '실패', '테스트가 진행 중 입니다.')
        return
      }
      if (this.strategyId === undefined || this.strategyId === null) {
        this.$vueOnToast.pop('error', '실패', '전략이 선택되지 않았습니다.')
        return
      }
      if (this.startDate > this.endDate) {
        this.$vueOnToast.pop('error', '실패', '시작일은 종료일보다 크거나 같을수없습니다.')
        return
      }

      let body = {
        strategyId: this.strategyId,
        version: this.version,
        exchange: this.exchange,
        coinUnit: this.symbol.replace('_', '/').split('/')[0],
        baseUnit: this.symbol.replace('_', '/').split('/')[1],
        cashUnit: this.cashUnit,
        cash: this.cash,
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.handleProgress(2, 0)
      let url = config.serverHost + '/' + config.serverVer + '/tasks'
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        console.log('테스트결과: ', response)
        let resultJson = response.data
        if (resultJson.status === 'success') {
          this.performanceData = resultJson
          this.performanceData.request.exchange = utils.capitalizeFirstLetter(this.exchange)
          this.performanceData.request.startDate = this.startDate
          this.performanceData.request.endDate = this.endDate
          this.performanceData.request.cashUnit = this.cashUnit
          this.performanceData.request.cash = this.cash
          this.handleProgress(3, 100)
        } else {
          this.$vueOnToast.pop('warning', '실패', '테스트가 실패하였습니다.')
          this.handleProgress(0)
        }
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
    this.endDate = utils.timeToString(nowTime)
    nowTime.setDate(nowTime.getDate() - 90)
    this.startDate = utils.timeToString(nowTime)
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
  min-height: 100px;
}
.vdp-datepicker input {
    padding: 5px;
    font-size: 100%;
    border: 1px solid #ccc;
    width: 100%
}
.vdp-datepicker__calendar {
  top: -282px;
}
@media only screen and (max-width: 805px) {
  .endDate .vdp-datepicker__calendar {
    left: -67px;
  }
}
@media only screen and (max-width: 540px) {
  .endDate .vdp-datepicker__calendar {
    left: -135px;
  }
}


</style>
