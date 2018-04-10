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
        />
      </b-col>
      <b-col sm="4">
        <date-picker v-model="endTime"
                     class="mb-2 mr-sm-2 mb-sm-0 datepicker"
                     size="sm"
                     lang="en"
                     width="100%"
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
    <b-row>
      <b-col>
        <b-card>
          <div class="h4 m-0">89.9%</div>
          <div>진행율</div>
          <b-progress height={} class="progress-xs my-3" variant="success" :value="25"/>
          <!-- <small class="text-muted">Lorem ipsum dolor sit amet enim.</small> -->
        </b-card>
      </b-col>
      <!--
      <b-col class="mt-3 text-center"
             sm="2">
        진행율
      </b-col>
      <b-col sm="10">
        <div class="progress mt-3" style="height:20px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated"
               aria-valuenow="75"
               aria-valuemin="0"
               aria-valuemax="100"
               style="width: 75%;">
          </div>
        </div>
      </b-col> -->
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
            <td>100 BTC</td>
            <td>+0.5%</td>
            <td>+20%</td>
          </tr>
          <tr>
            <th>거래횟수</th>
            <th>최대 손실폭</th>
            <th>총 수수료</th>
          </tr>
          <tr>
            <td>99</td>
            <td>-0.01%</td>
            <td>0.1</td>
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
  props: ['coinData', 'strategysId'],
  data () {
    return {
      exchange: {
        selected: 'poloniex',
        options: ['poloniex', 'bittrex', 'bitfinex']
      },
      capitalBase: '10',
      baseCurrency: 'btc',
      startTime: '2018-01-01',
      endTime: '2018-01-31'
    }
  },
  components: {
    CoinChart,
    DatePicker
  },
  methods: {
    backtestRun () {
      let body = {
        task: {
          strategyId: this.strategysId,
          exchangeName: this.exchange.selected,
          capitalBase: this.capitalBase,
          baseCurrency: this.baseCurrency,
          live: false,
          startTime: this.startTime,
          endTime: this.endTime,
          dataFrequency: 'minute'
        }
      }
      this.$emit('setTestTime', this.startTime, this.endTime)
      axios.post(config.baseUrl + '/tasks', body, {headers: config.defaultHeaders()}).then((result) => {
        this.$vueOnToast.pop('success', '성공', '테스트가 시작 되었습니다.')
        console.log('작업 생성. ', result)
        this.$emit('wsConnection', result.data.userId, result.data.id)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  mounted () {
    console.log(this.$el)
  }
}
</script>
<style>
.backtestForm {
  height: 680px;
}
</style>
