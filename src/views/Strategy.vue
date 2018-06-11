<template>
  <div class="wrapper">
    <b-card>
      <div slot="header">
        <h5>
          {{strategyDetail.name}} :
          <span v-if="strategyDetail.version === null">작업본</span>
          <span v-if="strategyDetail.version !== null">{{strategyDetail.version}}</span>
          <button v-if="isBuyer === true"
                  class="float-right btn btn-primary"
                  @click="() => {console.log('구매하기')}"
          >구매하기</button>
        </h5>
      </div>
      <coin-chart :tradeHistory="backtestResult.tradeHistory"
                  @setSymbols="setSymbols"
                  :isBuyer="isBuyer"
      />
    </b-card>
    <b-card>
      <b-tabs>
        <b-tab title="코드편집" v-if="isBuyer === false">
          <strategy-editor :strategyDetail="strategyDetail"
                           @updateStrategyDetail="updateStrategyDetail"
                           :isBuyer="isBuyer"
          />
        </b-tab>
        <b-tab title="전략테스트">
          <backtest-form :strategyDetail="strategyDetail"
                         @setBacktestPerfomance="setBacktestPerfomance"
                         :exchange="exchange"
                         :symbol="symbol"
                         :timeInterval="timeInterval"
                         :isBuyer="isBuyer"
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
      isBuyer: false,
      strategyDetail: {
        id: null,
        name: null,
        version: null,
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
  watch: {
    '$route.params.version' () {
      this.initStrategy()
    }
  },
  methods: {
    setBacktestPerfomance (perfData) {
      console.log('perfData', perfData)
      console.log('perfData.trade_history', perfData.trade_history)
      if (perfData !== undefined && perfData.trade_history !== undefined) {
        this.backtestResult.tradeHistory = perfData.trade_history
      } else {
        this.backtestResult.tradeHistory = []
      }
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
    },
    initStrategy () {
      const strategyId = this.$route.params.strategyId
      const version = this.$route.params.version
      this.$store.strategyId = strategyId
      let url = `${Config.serverHost}/${Config.serverVer}/strategies/${strategyId}`
      url += version !== undefined ? `/versions/${version}` : ''
      this.axios.get(url, Config.getAxiosGetOptions()).then((result) => {
        if (result.data !== '') {
          this.strategyDetail = result.data
          this.isBuyer = result.data.buyer
        } else {
          this.$vueOnToast.pop('error', '실패', '접근 권한이 없습니다.')
          this.$router.go(-1)
        }
      }).catch((e) => {
        console.log(`[Error] Strategy Detail Error`, url, e)
        Utils.httpFailNotify(e, this)
      })
    }
  },
  beforeCreate () {},
  created () {
    this.initStrategy()
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
