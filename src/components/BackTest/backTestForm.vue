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
        <date-picker class="mb-2 mr-sm-2 mb-sm-0"
                     v-model="startTime"
                     format="yyyy-MM-dd"
                     language="ko"
                     :disabled="disabled"
        />
      </b-col>
      <b-col sm="4">
        <date-picker class="mb-2 mr-sm-2 mb-sm-0"
                     v-model="endTime"
                     format="yyyy-MM-dd"
                     language="ko"
                     :disabled="disabled"
        />
      </b-col>
      <b-col sm="4">
        <b-button class="mb-2 mr-sm-2 mb-sm-0"
                        variant="primary"
                        size="sm"
                        block
                        @click="backtestRun"
        >
            <span>테스트</span>
        </b-button>
      </b-col>
    </b-row>
    <br />

    <b-tabs>
      <b-tab title="옵션">
        <b-row class="my-1">
          <b-col class="text-center"
                 md="6">
            <label>키</label>
          </b-col>
          <b-col class="text-center"
                 md="6">
            <label>값</label>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group :label-cols="6"
                          breakpoint="md"
                          description=""
                          label="데이터 시간간격"
                          class="text-center"
                          horizontal>
              <b-form-select :options="timeInterval.options"
                             v-model="timeInterval.selected"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group :label-cols="6"
                          breakpoint="md"
                          description=""
                          label="코인"
                          class="text-center"
                          horizontal>
              <b-form-input v-model="coins"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <hr />

        </b-row>
        <b-row class="my-1 options"
               v-for="(field, index) in strategy.options"
               v-if="field.key !== ''"
               :key="field.id"
        >
          <b-col>
            <b-form-group :label-cols="6"
                          breakpoint="md"
                          :description="field.desc"
                          :label="field.key"
                          class="text-center"
                          horizontal>
              <b-form-input v-model="field.value"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

      </b-tab>

      <b-tab title="성과지표" v-if="showProgressBar">

        <b-row>
          <b-col>
            <b-card>
              <div class="h4 m-0">{{testProcess}}%</div>
              <div>진행율</div>
              <b-progress height={} class="progress-xs my-3" variant="success" :value="testProcess" animated/>
            </b-card>
          </b-col>
        </b-row>
        <br />
        <b-row>
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

      </b-tab>
    </b-tabs>

  </b-card>
</template>

<script>
import axios from 'axios'
import config from '../../config/Config'
import utils from '../Utils'
import DatePicker from 'vuejs-datepicker'

export default {
  name: 'BackTest',
  props: ['strategy', 'coinData', 'testProcess', 'revenue', 'maxRevenue', 'tradeCount', 'LossRate', 'totalFee'],
  data () {
    return {
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
    DatePicker
  },
  created () {
    let nowTime = new Date()
    nowTime.setDate(nowTime.getDate() - 1)
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
    }
  }
}
</script>
<style>
.backtestForm {
  height: 680px;
}
.vdp-datepicker input {
  width: 100%
}
</style>
