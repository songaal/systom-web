<template>
  <div id="market" class="wrapper">
    <!-- <b-row>
      <b-col>
        <b-card header="최고수익 전략">



        </b-card>
      </b-col>
    </b-row> -->

    <b-row>
      <b-col>
        <b-card header="판매중인 전략">

          <b-row v-for="strategies in registerStrategies"
                 :key="strategies.id"
          >
            <b-col md="6"
                   lg="4"
                   v-for="strategy in strategies"
                   :key="strategy.id"
            >
              <strategyCard :strategy="strategy"/>
            </b-col>
          </b-row>

        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import strategyCard from '../components/cards/StrategyCard'
import config from '../Config'
import utils from '../Utils'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'MarketPlace',
  extends: '',
  components: {
    strategyCard,
    InfiniteLoading
  },
  props: [],
  data () {
    return {
      registerStrategies: [],
      pageSize: 15
    }
  },
  computed: {},
  watch: {},
  methods: {
    retrieveRegisterStrategies () {
      let url = config.serverHost + '/' + config.serverVer + '/marketplace'
      this.axios.get(url, config.getAxiosGetOptions()).then((result) => {
        let strategies = result.data
        let tmpRegisterStrategise = []
        for (let i = 0; i < strategies.length; i += 3) {
          let tmpStrategies = []
          for (let j = 0; j < 3; j++) {
            if (strategies[i + j] !== undefined) {
              tmpStrategies.push(strategies[i + j])
            }
          }
          tmpRegisterStrategise.push(tmpStrategies)
        }
        this.registerStrategies = tmpRegisterStrategise
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  beforeCreate () {},
  created () {
    this.retrieveRegisterStrategies()
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
.wrapper {
  margin-top: 20px;
}
</style>
