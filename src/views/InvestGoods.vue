<template>
  <div id="market" class="wrapper">
    <b-row>
      <b-col>
        <h2>투자상품</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        모집마감일 다음날 오후 12시에 투자가 시작됩니다.
      </b-col>
    </b-row>

    <!-- <b-row v-for="strategies in registerStrategies"
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
    </b-row> -->

    <b-tabs slot="tabs" class="mt-4" nav-class="mb-2" content-class="d-none">
      <template slot="tabs">
        <b-nav-item href="#" active @click="()=>{}">바이낸스</b-nav-item>
        <b-nav-item href="#" @click="()=>{}">후오비</b-nav-item>
        <b-nav-item href="#" @click="()=>{}">빗썸</b-nav-item>
      </template>
    </b-tabs>

    <b-row>
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

export default {
  name: 'investGoods',
  extends: '',
  components: {
    TopInvestGoodsList,
    InvestGoodsList
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
      let url = `${config.serverHost}/marketlist.json`
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
