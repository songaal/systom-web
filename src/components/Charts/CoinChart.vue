<template>
  <div>
    <b-row v-if="Boolean(isControl) === true" class="mb-3">
      <b-col col cols="12" xs="12" sm="4" md="4" lg="4">
        <ModelSelect :options="exchange.options"
                      v-model="exchange.selected"
                      placeholder="거래소를 선탁하세요."
                      @input="getSymbols"
        />
      </b-col>
      <b-col col cols="12" xs="12" sm="4" md="4" lg="4">
        <ModelSelect :options="symbolList.options"
                      v-model="symbolList.selected"
                      placeholder="코인을 선탁하세요."
                      @input="selectedSymbol"
        />
      </b-col>
      <b-col col cols="12" xs="12" sm="4" md="4" lg="4">
        <ModelSelect :options="timeInterval.options"
                      v-model="getTimeInterval"
                      placeholder="시간간격을 선탁하세요."
                      @input="selectedTimeInterval"
        />
      </b-col>
    </b-row>

    <TradingView tradeHistory="tradeHistory"
                 :exchange="exchange.selected"
                 :symbol="symbolList.selected"
                 :timeInterval="getTimeInterval"
                 :isControl="isControl"
    />
  </div>
</template>

<script>
import TradingView from './TradingViewChart'
import { ModelSelect } from 'vue-search-select'
import config from '../../Config'
import utils from '../../Utils'

export default {
  components: {
    TradingView,
    ModelSelect
  },
  props: ['isControl'],
  data () {
    return {
      exchange: {
        selected: config.defaultChartsExchagne,
        options: config.backtestExchanges
      },
      symbolList: {
        selected: 'BTC/USDT',
        exchange: null,
        options: []
      },
      timeInterval: {
        options: [],
        selected: config.defaultChartsInterval
      },
      tradeHistory: []
    }
  },
  computed: {
    getTimeInterval: {
      get () {
        return this.timeInterval.selected
      },
      set (timeInterval) {
        this.timeInterval.selected = timeInterval
      }
    }
  },
  watch: {},
  methods: {
    getSymbols (exchange) {
      if (exchange !== null && exchange !== this.symbolList.exchange) {
        let url = `${config.datafeedUrl}/exchange_symbols?exchange=${exchange}`
        this.axios.get(url).then((response) => {
          let jsonData = JSON.parse(response.data.body)
          this.symbolList.options = jsonData.map(o => {
            return { value: o.symbol, text: o.symbol }
          })
          if (this.backtest !== undefined && this.backtest !== null) {
            // TODO 거래소 변경 시 ..
            // this.exchange.selected = utils.capitalizeFirstLetter(this.backtest.exchange)
            this.symbolList.selected = this.backtest.symbol.replace('_', '/')
            this.timeInterval.selected = this.backtest.timeInterval
          }
        }).catch((e) => {
          console.log('response err', e)
        })
        // this.$store.state.backtest.exchange = exchange
      }
    },
    selectedSymbol (symbol) {
      this.$store.state.backtest.symbol = symbol
    },
    selectedTimeInterval (timeInterval) {
      this.$store.state.backtest.timeInterval = timeInterval
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    this.getSymbols(config.defaultChartsExchagne)
    this.timeInterval.options = config.getTimeIntervalKeyValueList()
    this.$store.state.backtest.exchange = this.exchange.selected
    this.$store.state.backtest.symbol = this.symbolList.selected
    this.$store.state.backtest.timeInterval = this.timeInterval.selected
  },
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>

</style>
