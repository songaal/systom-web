<template>
  <div class="wrapper">

    <b-card>
      <h5 slot="header">
        {{strategy.name}} :
        <span v-if="strategy.version === undefined">작업본</span>
        <span v-if="strategy.version !== undefined">{{strategy.version}}</span>
      </h5>

      <CoinChart isControl="true"/>
    </b-card>

    <b-card>
      <b-tabs>
        <b-tab title="코드편집">
          <StrategyEditor />
          <!-- <StrategyEditor :strategyDetail="strategyDetail"
                           @updateStrategyDetail="updateStrategyDetail"
          /> -->
        </b-tab>
        <b-tab title="전략테스트">
          <!-- <BackTestForm /> -->
          <!-- <BackTestForm :strategyDetail="strategyDetail"
                         @setBacktestPerfomance="setBacktestPerfomance"
                         :exchange="backtest.exchange"
                         :symbol="backtest.symbol"
                         :timeInterval="backtest.timeInterval"
                         :backtest="backtest"
          /> -->
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import config from '../Config'
import utils from '../Utils'
import CoinChart from '../components/Charts/CoinChart'
import StrategyEditor from '../components/Editor/StrategyEditor'
import BackTestForm from '../components/backtest/Form'

export default {
  name: 'Strategy',
  extends: '',
  components: {
    CoinChart,
    StrategyEditor,
    BackTestForm
  },
  props: [],
  data () {
    return {
      strategy: {
        id: null,
        name: null,
        version: null
      }
    }
  },
  computed: {
    getStrategy () {
      return this.$store.state.strategy
    }
  },
  watch: {
    getStrategy () {
      this.strategy = this.$store.state.strategy
    },
    '$route.params.version' () {
      this.setStrategy()
    },
    '$route.params.strategyId' () {
      this.setStrategy()
    }
  },
  methods: {
    setStrategy () {
      const strategyId = this.$route.params.strategyId
      const version = this.$route.params.version
      let url = `${config.serverHost}/${config.serverVer}/strategies/${strategyId}`
      url += version !== undefined ? `/versions/${version}` : ''
      this.axios.get(url, config.getAxiosGetOptions()).then((result) => {
        if (result.data !== undefined && result.data !== null) {
          this.$store.state.strategy = result.data
        } else {
          this.$vueOnToast.pop('error', '실패', '전략 조회 실패하였습니다.')
          this.$router.go(-1)
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  beforeCreate () {},
  created () {
    this.setStrategy()
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
