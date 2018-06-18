<template>
  <div id="market" class="wrapper">
    <!-- <b-row>
      <b-col>
        <b-card header="최고수익 전략">



        </b-card>
      </b-col>
    </b-row> -->

    <!-- <b-row>
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
    </b-row> -->


    <div class="row text-center market-text mb-2 d-sm-down-none market-field">
      <div class="col-md-1 mt-1">
        심볼
      </div>
      <div class="col-md-3 mt-1">
        전략이름
      </div>
      <div class="col-md-1">
        등급
      </div>
      <div class="col-md-1 mt-1">
        수익률
      </div>
      <div class="col-md-2 mt-1">
        시작일
      </div>
      <div class="col-md-1 mt-1">
        모집금
      </div>
      <div class="col-md-2">
        모집률
      </div>
      <div class="col-md-1"></div>
    </div>


    <div class="row text-center bg-white pt-3 pb-3 market-symbol market-text mb-2 d-sm-down-none">
      <div class="col-md-1 mt-1">
        BTC/USDT
      </div>
      <div class="col-md-3 mt-1 market-name-ellipsis">
        무료전략입니다.
      </div>
      <div class="col-md-1">
        <span class="badge badge-pill badge-primary">A-</span>
      </div>
      <div class="col-md-1 mt-1">
        15.71%
      </div>
      <div class="col-md-2 mt-1">
        2018-01-01
      </div>
      <div class="col-md-1 mt-1">
        1K/2K
      </div>
      <div class="col-md-2">
        <div class="progress-group">
          <div class="progress-group-header align-items-end">
            <div class="text-muted small">(56%)</div>
          </div>
          <div class="progress-group-bars">
            <div class="progress progress-xs">
              <div class="progress-bar bg-success"
                   role="progressbar"
                   style="width: 56%"
                   aria-valuenow="56"
                   aria-valuemin="0"
                   aria-valuemax="100">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-1 pl-2">
        <button class="btn btn-outline-primary">투자</button>
      </div>
    </div>

    <div class="text-center bg-white pt-2 pb-2 market-symbol market-text mb-2 d-md-none">

      <div class="row">
        <div class="col mt-1">
          BTC/USDT
        </div>
        <div class="col mt-1 market-name-ellipsis">
          무료 전략입니다.
        </div>
        <div class="col">
          <button class="btn btn-outline-primary">투자</button>
        </div>
      </div>

      <div class="row">
        <div class="col mt-2">
          <div class="progress-group">
            <div class="progress-group-bars">
              <div class="progress progress-xs">
                <div class="progress-bar bg-success"
                     role="progressbar"
                     style="width: 56%"
                     aria-valuenow="56"
                     aria-valuemin="0"
                     aria-valuemax="100">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col mt-2">
          등급
        </div>
        <div class="col mt-2">
          수익률
        </div>
        <div class="col mt-2">
          모집금
        </div>
      </div>

      <div class="row">
        <div class="col">
          <span class="badge badge-pill badge-primary">A-</span>
        </div>
        <div class="col">
          15.71%
        </div>
        <div class="col">
          1K/2K
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import strategyCard from '../components/cards/StrategyCard3'
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
        // let tmpRegisterStrategise = []
        // for (let i = 0; i < strategies.length; i += 3) {
        //   let tmpStrategies = []
        //   for (let j = 0; j < 3; j++) {
        //     if (strategies[i + j] !== undefined) {
        //       tmpStrategies.push(strategies[i + j])
        //     }
        //   }
        //   tmpRegisterStrategise.push(tmpStrategies)
        // }
        // this.registerStrategies = tmpRegisterStrategise
        this.registerStrategies = strategies
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
  mounted () {
    console.log('1')
  },
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
  font-size: 12pt;
  align: center;
  text-align: center;
}
.market-symbol {
  box-shadow: 1px 2px silver;
}
.market-field {
  cursor: default;
}
.align-items-end {
  text-align: end;
}
.market-name-ellipsis {
  text-overflow: ellipsis;
  overflow-y: hidden;
  width: 100%;
  white-space: nowrap;
  padding: 0px;
}
@media only screen and (max-width: 959px)
.hidden-sm-and-down {
    display: none!important;
}
</style>
