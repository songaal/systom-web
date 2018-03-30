<template>
  <b-card>
    <b-row>
      <b-col sm="4">
        <b-select v-model="exchangeSelected"
                  :options="exchangeOptions"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  size="sm"
        />
      </b-col>
      <b-col sm="4">
        <b-input class="mb-2 mr-sm-2 mb-sm-0"
                 placeholder="시작금액"
                 size="sm"
        />
      </b-col>
      <b-col sm="4">
        <b-input class="mb-2 mr-sm-2 mb-sm-0"
                 placeholder="통화"
                 size="sm"
        />
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col sm="4">
        <b-input class="mb-2 mr-sm-2 mb-sm-0"
                 placeholder="시작시간"
                 size="sm"
        />
      </b-col>
      <b-col sm="4">
        <b-input class="mb-2 mr-sm-2 mb-sm-0"
                 placeholder="종료시간"
                 size="sm"
        />
      </b-col>
      <b-col sm="4">
        <b-button class="mb-2 mr-sm-2 mb-sm-0"
                  variant="primary"
                  size="sm"
                  block
        >
          테스트
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <!-- <lineChart :data="chartData"
                   :height="510"
        /> -->
        <CoinChart :height="580"></CoinChart>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
// import lineChart from '../CoinCharts/LineChart'
import CoinChart from '../CoinCharts/CoinChart.js'

export default {
  name: 'BackTest',
  props: ['chartData', 'chartOption'],
  data () {
    return {
      exchangeSelected: 'poloniex',
      exchangeOptions: ['poloniex', 'bittrex', 'bitfinex']
    }
  },
  methods: {

  },
  components: {
    CoinChart
    // lineChart
  }
}
</script>
