<template>
  <b-card>
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
        <b-input v-model="startTime"
                 class="mb-2 mr-sm-2 mb-sm-0"
                 placeholder="시작시간"
                 size="sm"
        />
      </b-col>
      <b-col sm="4">
        <b-input v-model="endTime"
                 class="mb-2 mr-sm-2 mb-sm-0"
                 placeholder="종료시간"
                 size="sm"
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
    <b-row>
      <b-col>
        <CoinChart :height="580"
                   :coinData="coinData"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import CoinChart from '../CoinCharts/CoinChart2'
import axios from 'axios'
import config from '../../config/Config'
import utils from '../Utils'

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
    CoinChart
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
  }
}
</script>
