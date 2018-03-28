<template>
  <b-card>
    <b-row>
      <b-col>
        <b-form inline>
          <b-select v-model="exchangeSelected"
                    :options="exchangeOptions"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    size="sm"
          />
          <b-input class="mb-2 mr-sm-2 mb-sm-0"
                   placeholder="금액"
                   size="sm"
          />
          <b-input class="mb-2 mr-sm-2 mb-sm-0"
                   placeholder="기본 통화"
                   size="sm"
          />
          <b-input class="mb-2 mr-sm-2 mb-sm-0"
                   placeholder="시작"
                   size="sm"
          />
          <b-input class="mb-2 mr-sm-2 mb-sm-0"
                   placeholder="종료"
                   size="sm"
          />
          <b-select v-model="unitSelected"
                    :options="unitOptions"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    size="sm"
          />
          <b-button variant="primary"
                    size="sm">
            BackTest
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <lineChart :data="chartData"
                   :height="380"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import lineChart from '../CoinCharts/LineChart'

export default {
  name: 'BackTest',
  props: ['chartData', 'chartOption'],
  data () {
    return {
      exchangeSelected: 'poloniex',
      exchangeOptions: ['poloniex', 'bittrex'],
      unitSelected: '5m',
      unitOptions: ['1m', '5m', '1h', '4h', '1d']
    }
  },
  methods: {

  },
  components: {
    lineChart
  }
}
</script>
