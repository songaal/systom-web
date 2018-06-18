<template>
  <div class="backtestForm">
    <b-row>
      <b-col>
        <b-form-group
          label="시작일"
          :label-cols="2"
          :horizontal="true"
          label-size="md">
          <date-picker v-model="datePickerStartTime"
                       format="yyyy-MM-dd"
                       language="ko"
                       :disabled="disabled"
          />
        </b-form-group>
      </b-col>
      <b-col class="endTime">
        <b-form-group
          label="종료일"
          :label-cols="2"
          :horizontal="true"
          label-size="md">
          <date-picker v-model="datePickerEndTime"
                       format="yyyy-MM-dd"
                       language="ko"
                       :disabled="disabled"
          />
        </b-form-group>
      </b-col>
    </b-row>



    <!-- <h5>추가옵션</h5>
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
    </b-row> -->

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
          <button class="btn btn-sm btn-primary float-right"
                  v-if="isBuyer === false && typeof $route.params.version === 'string' && $route.meta.backtest !== true"
                  @click="saveBackTest"
          >이 결과 저장하기</button>
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
  props: ['strategyDetail', 'exchange', 'symbol', 'timeInterval', 'isBuyer', 'backtest'],
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
      },
      backtestRequest: null
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
      // let tmpOptions = JSON.parse(this.strategyDetail.options)
      // tmpOptions.forEach(topt => {
      //   this.options.forEach(opt => {
      //     if (opt.key === topt.key) {
      //       topt.value = opt.value
      //     }
      //   })
      // })
      // this.options = tmpOptions
      this.backtestProcess.step = 1
      this.backtestProcess.progress = 0
      this.backtestProcess.variant = 'info'
      this.backtestProcess.isTesting = false
    },
    backtest () {
      // this.options = Object.assign(this.options, JSON.parse(this.backtest.options))
      this.startTime = this.backtest.startTime
      this.endTime = this.backtest.endTime.substring(0, 10)
      this.backtestRun()
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
    performanceShow (response, requetBody) {
      try {
        response = JSON.parse(response)
      } catch (e) {
        console.log('json parsing error:', e)
      }
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
        this.$vueOnToast.pop('warning', '실패', '테스트가 실패하였습니다. ' + response.message)
        this.handleProgress(0)
      }
    },
    backtestRun () {
      if (this.backtestProcess.step === 2) {
        this.$vueOnToast.pop('warning', '실패', '테스트가 진행 중 입니다.')
        return
      }
      if (this.strategyDetail.id === undefined) {
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
      // let isEmptyValueOptions = this.options.filter(o => {
      //   return o.value === '' || o.value === null || o.value === undefined
      // })
      // if (isEmptyValueOptions.length !== 0) {
      //   this.$vueOnToast.pop('error', '실패', '추가 옵션 항목을 입력하세요.')
      //   return
      // }
      let body = {
        strategyId: this.$store.strategyId,
        exchangeName: this.exchange,
        symbol: this.symbol.replace('_', '/'),
        timeInterval: this.timeInterval,
        startTime: this.startTime,
        endTime: this.endTime + ' 23:59:59'
        // options: JSON.stringify(this.options)
      }
      this.handleProgress(2, 0)
      console.log('백테스트 요청:', body)
      if (process.env.API_SERVER === 'localhost') {
        let url = 'http://127.0.0.1:8080/result.json'
        console.log('[개발용] 데이터 요청 보냄: ', url)
        this.axios.get(url, {crossdomain: true, 'Access-Control-Allow-Origin': '*'}).then((response) => {
          console.log('응답: ', response.data)
          this.backtestRequest = body
          this.performanceShow(response.data, body)
        }).catch((e) => {
          this.handleProgress(0)
          utils.httpFailNotify(e, this)
        })
      } else {
        let url = config.serverHost + '/' + config.serverVer + '/tasks/backtest'
        this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
          this.backtestRequest = body
          this.performanceShow(response.data.resultJson, body)
        }).catch((e) => {
          this.handleProgress(0)
          utils.httpFailNotify(e, this)
        })
      }
    },
    saveBackTest () {
      if (this.$route.params.version === undefined) {
        console.log('배포 후 진행하세요.')
        return
      }
      if (!confirm('저장하시겠습니까?')) {
        return
      }
      let backtest = JSON.stringify({
        exchange: this.backtestRequest.exchangeName,
        timeInterval: this.backtestRequest.timeInterval,
        startTime: this.backtestRequest.startTime,
        endTime: this.backtestRequest.endTime,
        // options: this.backtestRequest.options,
        days: this.performanceData.days,
        return_pct: this.performanceData.return_pct,
        symbol: this.performanceData.symbol,
        pnl_rate: this.performanceData.pnl_rate,
        max_drawdown_pct: this.performanceData.max_drawdown_pct
      })
      let url = `${config.serverHost}/${config.serverVer}`
      url += `/strategies/${this.backtestRequest.strategyId}`
      url += `/versions/${this.$route.params.version}/saveBacktest`
      this.axios.post(url, {backtest: backtest}, config.getAxiosPostOptions()).then((response) => {
        this.$vueOnToast.pop('success', '성공', '테스트 결과를 저장하였습니다.')
      }).catch((e) => {
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
  .endTime .vdp-datepicker__calendar {
    left: -67px;
  }
}
@media only screen and (max-width: 540px) {
  .endTime .vdp-datepicker__calendar {
    left: -135px;
  }
}


</style>
