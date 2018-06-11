<template>
  <div>
    <b-row>
      <b-col>
        <model-select :options="exchange.options"
                      v-model="exchange.selected"
                      placeholder="거래소를 선탁하세요."
                      @input="getSymbols">
        </model-select>
      </b-col>
      <b-col>
        <model-select :options="symbolList.options"
                      v-model="symbolList.selected"
                      placeholder="코인을 선탁하세요."
                      @input="selectedSymbol">
        </model-select>
      </b-col>
      <b-col>
        <model-select :options="timeInterval.options"
                      v-model="getTimeInterval"
                      placeholder="시간간격을 선탁하세요."
                      @input="selectedTimeInterval">
        </model-select>
      </b-col>
    </b-row>
    <br />
    <div>
      <TradingView :tradeHistory="tradeHistory"
                   :exchange="exchange.selected"
                   :symbol="symbolList.selected"
                   :timeInterval="getTimeInterval"
                   :backtest="backtest"
      />
    </div>
  </div>
</template>

<script>
import TradingView from './TradingViewChart'
import config from '../../Config'
import utils from '../../Utils'
import { ModelSelect } from 'vue-search-select'

export default {
  components: {
    TradingView,
    ModelSelect
  },
  props: ['tradeHistory', 'requestBody', 'backtest'],
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
        selected: '1D'
      }
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
        this.$emit('setSymbols', exchange, null, null)
      }
    },
    selectedSymbol (symbol) {
      this.$emit('setSymbols', null, symbol, null)
    },
    selectedTimeInterval (timeInterval) {
      this.$emit('setSymbols', null, null, timeInterval)
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    this.getSymbols(config.defaultChartsExchagne)
    this.timeInterval.options = config.getTimeIntervalKeyValueList()
    this.$emit('setSymbols', this.exchange.selected, this.symbolList.selected, this.timeInterval.selected)
  },
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>

</style>
