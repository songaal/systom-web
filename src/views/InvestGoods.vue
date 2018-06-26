<template>
  <div id="market" class="wrapper">

    <b-row v-for="strategies in registerStrategies"
           :key="strategies.id"
    >
      <b-col lg="4"
             md="12"
             sm="12"
             cols="12"
             col
             v-for="strategy in strategies"
             :key="strategy.id"
             class="mb-3"
      >
        <TopInvestGoodsList :strategy="strategy"/>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col>
        <InvestGoodsList :strategies="registerStrategies"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TopInvestGoodsList from '../components/cards/TopInvestGoodsList'
import InvestGoodsList from '../components/cards/InvestGoodsList'
import config from '../Config'
import utils from '../Utils'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'investGoods',
  extends: '',
  components: {
    TopInvestGoodsList,
    InvestGoodsList,
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
      // let url = config.serverHost + '/' + config.serverVer + '/marketplace'
      let url = `http://localhost:8080/marketlist.json`
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
.market-text {
  font-size: 11pt;
  align: center;
  text-align: center;
}
.align-items-end {
  text-align: end;
}
.text-ellipsis {
  text-overflow: ellipsis;
  overflow-y: hidden;
  width: 100%;
  white-space: nowrap;
  padding: 0px;
}
@media only screen and (max-width: 959px) {
  .hidden-sm-and-down {
      display: none!important;
  }
}

</style>
