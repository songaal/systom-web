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
        <b-input v-model="startMoney"
                 class="mb-2 mr-sm-2 mb-sm-0"
                 placeholder="시작금액"
                 size="sm"
        />
      </b-col>
      <b-col sm="4">
        <b-input v-model="currency"
                 class="mb-2 mr-sm-2 mb-sm-0"
                 placeholder="통화"
                 size="sm"
        />
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col sm="4">
        <b-input v-model="start"
                 class="mb-2 mr-sm-2 mb-sm-0"
                 placeholder="시작시간"
                 size="sm"
        />
      </b-col>
      <b-col sm="4">
        <b-input v-model="end"
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
        >
          테스트
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <CoinChart :height="chartHeight"
                   :chartData="chartData"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import CoinChart from '../CoinCharts/CoinChart.js'

export default {
  name: 'BackTest',
  props: [
    'chartData',
    'chartOption',
    'exchangeOptions',
    'startMoney',
    'currency',
    'start',
    'end'
  ],
  data () {
    return {
      chartHeight: 580
    }
  },
  components: {
    CoinChart
  }
}
</script>
