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
          <strategy-order-modal :strategy="strategyDetail" />
        </h5>
      </div>
      <coin-chart :tradeHistory="backtestResult.tradeHistory"
                  @setSymbols="setSymbols"
                  :isBuyer="isBuyer"
                  :backtest="backtest"
      />
    </b-card>
    <b-card>
      <b-tabs>
        <b-tab title="코드편집" v-if="isBuyer === false && $route.meta.backtest !== true">
          <strategy-editor :strategyDetail="strategyDetail"
                           @updateStrategyDetail="updateStrategyDetail"
                           :isBuyer="isBuyer"
          />
        </b-tab>
        <b-tab title="전략테스트">
          <backtest-form :strategyDetail="strategyDetail"
                         @setBacktestPerfomance="setBacktestPerfomance"
                         :exchange="backtest.exchange"
                         :symbol="backtest.symbol"
                         :timeInterval="backtest.timeInterval"
                         :isBuyer="isBuyer"
                         :backtest="backtest"
          />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import config from '../Config'
import Utils from '../Utils'
import CoinChart from '../components/Charts/CoinChart'
import StrategyEditor from '../components/Editor/StrategyEditor'
import BackTestForm from '../components/backtest/Form'
import StrategyOrderModal from '../components/modals/StrategyOrderModal'

export default {
  name: 'Strategy',
  extends: '',
  components: {
    'backtest-form': BackTestForm,
    'strategy-editor': StrategyEditor,
    'coin-chart': CoinChart,
    'strategy-order-modal': StrategyOrderModal
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
      backtest: {
        exchange: null,
        symbol: null,
        timeInterval: null,
        startTime: null,
        endTime: null,
        options: null
      },
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
        this.backtest.exchange = exchange
      }
      if (symbol !== null) {
        this.backtest.symbol = symbol
      }
      if (timeInterval !== null) {
        this.backtest.timeInterval = timeInterval
      }
    },
    initStrategy () {
      const strategyId = this.$route.params.strategyId
      const version = this.$route.params.version
      this.$store.strategyId = strategyId
      let url = `${config.serverHost}/${config.serverVer}/strategies/${strategyId}`
      url += version !== undefined ? `/versions/${version}` : ''
      this.axios.get(url, config.getAxiosGetOptions()).then((result) => {
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
    },
    getBackTestOptions () {
      this.isBuyer = true
      let url = `${config.serverHost}/${config.serverVer}`
      url += `/strategies/${this.$route.params.strategyId}`
      url += `/versions/${this.$route.params.version}`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        let backtestSetting = response.data
        try {
          if (backtestSetting.backtest !== null && backtestSetting.backtest !== undefined && backtestSetting.backtest !== '') {
            this.backtest = JSON.parse(backtestSetting.backtest)
          }
        } catch (e) {
          console.log('backtest > json parse error: ', e)
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  beforeCreate () {},
  created () {
    this.initStrategy()
    let isGetBackTestData = this.$route.meta.backtest
    if (isGetBackTestData !== undefined && isGetBackTestData === true) {
      this.getBackTestOptions()
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
