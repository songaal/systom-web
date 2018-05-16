<template>
  <div class="backtestForm">

    <b-row class="form-group">
      <b-col sm="4">
        <b-row>
          <b-col cols="3" class="text-center">
            <label class="col-form-label">거래소</label>
          </b-col>
          <b-col cols="9">
            <b-form-select v-model="exchange.selected"
                          :options="exchange.options"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="4">
        <b-row>
          <b-col cols="3" class="text-center">
            <label class="col-form-label">코인</label>
          </b-col>
          <b-col cols="9">
            <b-form-input v-model="coins"></b-form-input>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="form-group">
      <b-col sm="4">
        <b-row>
          <b-col cols="3" class="text-center">
            <label class="col-form-label">시작일</label>
          </b-col>
          <b-col cols="9">
            <date-picker v-model="startTime"
                         format="yyyy-MM-dd"
                         language="ko"
                         :disabled="disabled"
            />
          </b-col>
        </b-row>
      </b-col>

      <b-col sm="4">
        <b-row>
          <b-col cols="3" class="text-center">
            <label class="col-form-label">종료일</label>
          </b-col>
          <b-col cols="9">
            <date-picker v-model="endTime"
                         format="yyyy-MM-dd"
                         language="ko"
                         :disabled="disabled"
            />
          </b-col>
        </b-row>
      </b-col>

      <b-col sm="4">
        <b-row>
          <b-col cols="3" class="text-center">
            <label class="col-form-label">데이터 시간간격</label>
          </b-col>
          <b-col cols="9">
            <b-form-select :options="timeInterval.options"
                           v-model="timeInterval.selected"
            ></b-form-select>
          </b-col>
        </b-row>
      </b-col>

    </b-row>
    <hr />
    <h5>추가옵션</h5>
    <b-row>
      <b-col>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">키</th>
              <th scope="col">값</th>
              <th scope="col">설명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sell</td>
              <td><b-form-input value="10.000000"></b-form-input></td>
              <td>가격이 동일하면 판매</td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col cols="12">
        <button class="col-lg-12 btn btn-lg btn-primary" >테스트</button>
      </b-col>
    </b-row>

    <div class="testing">
      <b-card>
        <div class="h4 m-0">100%</div>
        <div>진행율</div>
        <b-progress class="progress-xs my-3" variant="success" :value="100" animated/>
      </b-card>
    </div>

    <!-- <div class="test-error">
      에러
    </div> -->

    <div class="tested">
      <h5>성과지표</h5>
      <b-row>
        <b-col>
          <performanceIndex></performanceIndex>
        </b-col>
      </b-row>
      <h5>거래이력</h5>
      <b-row>
        <b-col>
          <backtestHistory :items="lastTopHistory"
                           fieldType="lastTopHistoryFields"
          />
        </b-col>
      </b-row>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import config from '../../config/Config'
import utils from '../Utils'
import DatePicker from 'vuejs-datepicker'
import performanceIndex from '../Performance/index'
import backtestHistory from '../SimulationHistory/HistoryTable'

export default {
  name: 'BackTest',
  props: ['strategy', 'coinData', 'testProcess', 'revenue', 'maxRevenue', 'tradeCount', 'LossRate', 'totalFee'],
  data () {
    return {
      isShow: '',
      backtestHistory: [],
      exchange: {
        selected: config.backtestExchanges[0],
        options: config.backtestExchanges
      },
      timeInterval: {
        options: [],
        selected: ''
      },
      coins: '',
      capitalBase: '10',
      baseCurrency: 'btc',
      startTime: '',
      endTime: '',
      showProgressBar: false,
      showPerformance: false,
      nowTime: ''
    }
  },
  computed: {
    disabled () {
      return {
        to: new Date(2017, 0, 1),
        from: this.nowTime
      }
    }
  },
  components: {
    DatePicker,
    performanceIndex,
    backtestHistory
  },
  created () {
    let nowTime = new Date()
    nowTime.setDate(nowTime.getDate() - 2)
    this.nowTime = nowTime
    this.startTime = utils.timeToString(nowTime)
    this.endTime = utils.timeToString(nowTime)
    this.timeInterval.options = config.getTimeIntervalList()
    this.timeInterval.selected = this.timeInterval.options[0]
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
      let tmpTimeInterval = config.formatKoToEnTimeInterval(this.timeInterval.selected)
      let interval = tmpTimeInterval.replace(/[^0-9]/g, '')
      let intervalUnit = tmpTimeInterval.substring(tmpTimeInterval.length - 1)
      console.log('interval', interval, tmpTimeInterval)
      if (intervalUnit === 'T' || intervalUnit === 'H') {
        this.startTime = typeof this.startTime === 'object' ? utils.timeToString(this.startTime, false) : this.startTime
        this.endTime = typeof this.endTime === 'object' ? utils.timeToString(this.endTime, false) : this.endTime
      } else {
        this.startTime = typeof this.startTime === 'object' ? utils.timeToString(this.startTime, false) : this.startTime
        this.endTime = typeof this.endTime === 'object' ? utils.timeToString(this.endTime, false) : this.endTime
      }
      if (intervalUnit === 'T' && this.startTime !== this.endTime) {
        this.$vueOnToast.pop('error', '실패', '테스트 범위 1일 입니다.')
        return
      } else if (intervalUnit === 'H') {
        let tmpStartTime = new Date(this.startTime)
        let tmpEndTime = new Date(this.endTime)
        tmpStartTime.setDate(tmpStartTime.getDate() + Number(31))
        if (tmpStartTime.getTime() <= tmpEndTime.getTime()) {
          this.$vueOnToast.pop('error', '실패', '테스트 범위 31일 입니다.')
          return
        }
      }

      if (this.coins === '') {
        this.$vueOnToast.pop('error', '실패', '사용할 코인을 입력하세요.')
        return
      } else if (!/[a-z,]/gi.test(this.coins)) {
        this.$vueOnToast.pop('error', '실패', '코인은 영문만 입력할수있습니다.')
        return
      }

      let backtestOptions = {}
      let optionsSize = this.strategy.options.length
      for (let i = 0; i < optionsSize; i++) {
        if (this.strategy.options[i].value === undefined || this.strategy.options[i].value === '') {
          this.$vueOnToast.pop('error', '실패', '옵션을 입력하세요.')
          return
        }
        backtestOptions[this.strategy.options[i].key] = this.strategy.options[i].value
      }

      let coinList = this.coins.split(',')
      for (let i = 0; i < coinList.length; i++) {
        if (coinList[i] !== '') {
          coinList[i] = coinList[i] + '_' + this.baseCurrency
        }
      }
      backtestOptions['symbol'] = coinList.join(',')
      backtestOptions['timeInterval'] = config.formatKoToEnTimeInterval(this.timeInterval.selected)
      let dataFrequency = backtestOptions['timeInterval'].toLowerCase().indexOf('d') !== -1 ? 'daily' : 'minute'
      let body = {
        task: {
          strategyId: this.strategy.strategyId,
          exchangeName: this.exchange.selected,
          capitalBase: this.capitalBase,
          baseCurrency: this.baseCurrency,
          live: false,
          startTime: this.startTime,
          endTime: this.endTime,
          dataFrequency: dataFrequency,
          options: JSON.stringify(backtestOptions)
        }
      }
      console.log('testing...', body)
      this.$emit('setInterval', interval, intervalUnit)
      this.$emit('setTestTime', this.startTime, this.endTime)
      let url = config.serverHost + '/' + config.serverVer + '/tasks/backtest'
      axios.post(url, body, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        this.$vueOnToast.pop('success', '성공', '테스트가 시작 되었습니다.')
        this.showProgressBar = true
        this.showPerformance = true
        this.testProcess = 0
        this.$emit('wsConnection', result.data.userId, result.data.id)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    testRun () {
      setTimeout(() => {
        this.isShow = 'ok'
      }, 3000)
    }
  },
  mouned () {
    this.testRun()
  }
}
</script>
<style>
.backtestForm {
  min-height: 300px;
}
.vdp-datepicker input {
  width: 100%;
  height: 35px;
  border: 1px solid '#c2cfd6';
}
.testing {
  /* display: none; */
}
.tested {
  /* display: none; */
}
.test-error {
  /* display: none; */
}
</style>
