<template>
  <div class="wrapper">
    <b-card>
      <coin-chart />
    </b-card>
    <b-card>
      <b-tabs>
        <b-tab title="코드편집">
          <strategy-editor detail="strategyDetail"/>
        </b-tab>
        <b-tab title="전략테스트" active>
          <backtest-form detail="strategyDetail"/>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import moment from 'moment'
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
      strategyDetail: ''
    }
  },
  watch: {},
  methods: {},
  beforeCreate () {},
  created () {
    const strategyId = this.$route.params.strategyId
    if (strategyId !== undefined) {
      this.$store.strategyId = strategyId
      let url = `${Config.serverHost}/${Config.serverVer}/strategys/${strategyId}`
      console.log(`[Request] Strategy Detail`, url)
      this.axios.get(url, Config.getAxiosGetOptions()).then((result) => {
        console.log(`[Response] Strategy Detail`, url, result)
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

</style>
