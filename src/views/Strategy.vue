<template>
  <div class="wrapper">
    <b-card>
      <coin-chart :tradeHistory="backtestResult.tradeHistory"
                  @setSymbols="setSymbols"
      />
    </b-card>
    <b-card>
      <b-tabs>
        <b-tab title="코드편집">
          <strategy-editor :strategyDetail="strategyDetail"
                           @updateStrategyDetail=updateStrategyDetail
          />
        </b-tab>
        <b-tab title="전략테스트">
          <backtest-form :strategyDetail="strategyDetail"
                         @setBacktestPerfomance="setBacktestPerfomance"
                         :exchange="exchange"
                         :symbol="symbol"
                         :timeInterval="timeInterval"
          />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Config from '../Config'
import Utils from '../Utils'
import CoinChart from '../components/Charts/CoinChart'
import StrategyEditor from '../components/Editor/StrategyEditor'
import BackTestForm from '../components/backtest/Form'

export default {
  name: 'Strategy',
  extends: '',
  components: {
    'backtest-form': BackTestForm,
    'strategy-editor': StrategyEditor,
    'coin-chart': CoinChart
  },
  props: [],
  data () {
    return {
      strategyDetail: {
        id: null,
        code: null,
        options: []
      },
      exchange: null,
      symbol: null,
      timeInterval: null,
      backtestResult: {
        tradeHistory: []
      }
    }
  },
  watch: {},
  methods: {
    setBacktestPerfomance (perfData) {
      this.backtestResult.tradeHistory = perfData.trade_history
    },
    updateStrategyDetail (detail) {
      this.strategyDetail = detail
      this.$store.strategyId = detail.id
    },
    setSymbols (exchange, symbol, timeInterval) {
      if (exchange !== null) {
        this.exchange = exchange
      }
      if (symbol !== null) {
        this.symbol = symbol
      }
      if (timeInterval !== null) {
        this.timeInterval = timeInterval
      }
    }
  },
  beforeCreate () {},
  created () {
    const strategyId = this.$route.params.strategyId
    if (strategyId !== undefined) {
      this.$store.strategyId = strategyId
      let url = `${Config.serverHost}/${Config.serverVer}/strategys/${strategyId}`
      this.axios.get(url, Config.getAxiosGetOptions()).then((result) => {
        this.strategyDetail = result.data
      }).catch((e) => {
        console.log(`[Error] Strategy Detail Error`, url, e)
        Utils.httpFailNotify(e, this)
      })
    }
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
.wrapper {margin-top: 20px}
</style>
