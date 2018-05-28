<template>
  <div class="backtestForm">
    <b-row>
      <b-col>
        <b-form-group
          label="거래소"
          :label-cols="2"
          :horizontal="true">
          <b-form-select v-model="exchange.selected"
                        :options="exchange.options"
          >
            <template slot="first">
              <option :value="null" disabled>거래소를 선탁하세요.</option>
            </template>
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
          label="코인"
          :label-cols="2"
          :horizontal="true">
          <b-form-select v-model="coinList.selected"
                        :options="coinList.options"
          >
            <template slot="first">
              <option :value="null" disabled>코인을 선탁하세요.</option>
            </template>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
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
    <b-row>
      <b-col cols="6">
        <b-form-group
          label="데이터 시간간격"
          :label-cols="2"
          :horizontal="true">
          <b-form-select :options="timeInterval.options"
                         v-model="timeInterval.selected"
          >
            <template slot="first">
              <option :value="null" disabled>시간간격을 선탁하세요.</option>
            </template>
          </b-form-select>
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
        <button class="col-lg-12 btn btn-lg btn-primary" @click="backtestRun">테스트</button>
      </b-col>
    </b-row>

    <div v-if="backtestProcess.step > 1">
      <b-card>
        <div class="h4 m-0">{{backtestProcess.progress}}%</div>
        <div>진행율</div>
        <b-progress class="progress-xs my-3" variant="success" :value="backtestProcess.progress" animated/>
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

export default {
  name: 'backtestForm',
  extends: '',
  components: {
    performanceIndex,
    datePicker
  },
  props: ['strategyDetail'],
  data () {
    // backtestProcess.step: 0 error, 1 before, 2 invoke, 3 after
    return {
      backtestProcess: {
        step: 1,
        progress: 0
      },
      exchange: {
        selected: null,
        options: config.backtestExchanges
      },
      coinList: {
        selected: null,
        options: ['BTC', 'ETH', 'BNB', 'QTUM']
      },
      timeInterval: {
        options: [],
        selected: null
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
        cum_returns: []
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
    performanceShow (response) {
      if (response.status === 200 && response.data.status === 'success') {
        let reuqest = response.data.request
        let result = response.data.result
        this.performanceData = result
        this.performanceData.exchange = utils.capitalizeFirstLetter(reuqest.exchange)
        this.performanceData.symbol = reuqest.symbol.toUpperCase()
        this.performanceData.start = reuqest.start
        this.performanceData.end = reuqest.end
        this.performanceData.days = reuqest.days
        this.$emit('setBacktestPerfomance', this.performanceData)
        this.backtestProcess.progress = 100
        this.backtestProcess.step = 3
      } else {
        this.backtestProcess.progress = 0
        this.backtestProcess.step = 0
      }
    },
    backtestRun () {
      if (this.exchange.selected === null) {
        this.$vueOnToast.pop('error', '실패', '거래소를 선택하세요.')
        return
      }
      if (this.coinList.selected === null) {
        this.$vueOnToast.pop('error', '실패', '코인을 선택하세요.')
        return
      }
      if (this.timeInterval.selected === null) {
        this.$vueOnToast.pop('error', '실패', '데이터 시간간격을 선택하세요.')
        return
      }
      let isEmptyValueOptions = this.options.filter(o => {
        return o.value === ''
      })
      if (isEmptyValueOptions.length !== 0) {
        this.$vueOnToast.pop('error', '실패', '추가 옵션 항목을 입력하세요.')
        return
      }
      let body = {
        strategyId: this.$store.strategyId,
        exchangeName: this.exchange.selected,
        coin: this.coinList.selected,
        timeInterval: config.formatKoToEnTimeInterval(this.timeInterval.selected),
        startTime: this.startTime,
        endTime: this.endTime,
        options: JSON.stringify(this.options)
      }
      this.backtestProcess.step = 2

      if (process.env.COIN_DEV === 'true') {
        console.log('[COIN_DEV] 개발모드 입니다.')
        let url = 'http://localhost:8080/result.json'
        this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
          this.performanceShow(response)
        }).catch((e) => {
          utils.httpFailNotify(e, this)
        })
      } else {
        let url = config.serverHost + '/' + config.serverVer + '/tasks/backtest'
        this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
          this.performanceShow(response)
        }).catch((e) => {
          utils.httpFailNotify(e, this)
        })
      }
    }
  },
  beforeCreate () {},
  created () {
    let nowTime = new Date()
    nowTime.setDate(nowTime.getDate() - 1)
    this.startTime = utils.timeToString(nowTime)
    this.endTime = utils.timeToString(nowTime)
    this.timeInterval.options = config.getTimeIntervalList()
    // utils.exchangeSymbols('binance')
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>
.backtestForm {
  min-height: 300px;
}
.vdp-datepicker input {
  width: 100%;
  height: 35px;
  border: 1px solid '#c2cfd6';
}
</style>
