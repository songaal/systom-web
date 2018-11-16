<template>
  <div class="wrapper">
    <div class="d-sm-down-none">
      <b-row>
        <b-col cols="12">
          투자상품 {{goods.formatGoodsId}}호
        </b-col>
      </b-row>
    </div>
    <div class="d-md-none">
      <b-row>
        <b-col cols="12">
          투자상품
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">{{goods.formatGoodsId}}호</b-col>
      </b-row>
    </div>
    <hr />
    <b-row class="mb-2">
      <b-col v-if="$store.isManager === 'false' || $store.guest === true"
             cols="12" col xs="12" sm="12">
        <h1 class="float-left mr-3" style="max-width:70%;">
          {{goods.name}}
        </h1>
      </b-col>
      <b-col v-if="$store.isManager === 'true'"
             cols="9" col xs="9" sm="9" md="8" lg="8">
        <h1 class="float-left mr-3" style="max-width:80%;">
          <i :class="{'circle': true, 'fa': true, 'fa-circle': true, 'text-danger': !goods.taskRunning, 'text-success': goods.taskRunning}"></i>
          {{goods.name}}
        </h1>
      </b-col>
      <b-col v-if="$store.isManager === 'true'"
             cols="3" col xs="3" sm="3" md="4" lg="4"
             class="text-right">
        <GoodsControlButton :goods="goods"
                            @setGoods="setGoods"
                            :disabled="!isControl"
                            @updateTask="updateTask"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p v-if="goods.description !== undefined && goods.description !== null" class="mb-5">
          <pre style="overflow: visible; white-space: normal; font-size:1.1em;">{{goods.description}}</pre>
        </p>
      </b-col>
    </b-row>

    <div class="d-sm-down-none">
      <b-row class="text-center text-nowrap mb-3">
        <b-col col sm="4" md="3">거래소</b-col>
        <b-col col sm="4" md="3">심볼</b-col>
        <b-col col sm="4" md="3">최대월수익률</b-col>
        <b-col col sm="4" md="3">최대월손실률</b-col>
      </b-row>

      <b-row class="text-center mb-2">
        <b-col col sm="4" md="3"><span class="strong-text">{{goods.formatExchange}}</span></b-col>
        <b-col col sm="4" md="3"><span class="strong-text">{{goods.formatSymbol}}</span></b-col>
        <b-col col sm="4" md="3"><span class="strong-text">{{goods.testResult.testMaxMonthlyPct}}</span> %</b-col>
        <b-col col sm="4" md="3">
          <span class="strong-text text-danger">
            {{goods.testResult.testMinMonthlyPct}}
          </span>
          <span class="text-danger"> %</span>
        </b-col>
      </b-row>
    </div>

    <div class="d-md-none">
      <b-row class="text-center text-nowrap">
        <b-col col xs="4">거래소</b-col>
        <b-col col xs="4">심볼</b-col>
      </b-row>

      <b-row class="text-center mb-3">
        <b-col col xs="4"><span class="strong-text">{{goods.formatExchange}}</span></b-col>
        <b-col col xs="4"><span class="strong-text">{{goods.formatSymbol}}</span></b-col>
      </b-row>

      <b-row class="text-center text-nowrap">
        <b-col col xs="4">최대월수익률</b-col>
        <b-col col xs="4">최대월손실률</b-col>
      </b-row>

      <b-row class="text-center mb-2">
        <b-col col xs="4"><span class="strong-text">{{goods.testResult.testMaxMonthlyPct}}</span> %</b-col>
        <b-col col xs="4">
          <span class="strong-text text-danger">{{goods.testResult.testMinMonthlyPct}}</span><span class="text-danger"> %</span>
        </b-col>
      </b-row>
    </div>

    <b-row class="mb-4">
      <b-col>
        <div class="progress progress-xs" style="background: #d2cccc4f;">
          <div class="progress-bar bg-success"
               role="progressbar"
               :style="`width: 100%;`"
               :aria-valuenow="100"
               aria-valuemin="0"
               aria-valuemax="100">
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <BarChartCard wideType="dual"
                      name="testMonthlyReturn"
                      title="월별 수익률"
                      type="pct"
                      :dataProvider="monthlyReturns">
        </BarChartCard>

        <div v-if="$store.isManager === 'true' && goods.testResult.testMaxMonthlyPct === 0 && goods.testResult.tradeHistorySize === 0"
             style="position: relative; width: 100%;height:  0px;">
          <CreateBackTestButton :strategyId="goods.strategyId"
                                :version="goods.version"
                                :exchange="goods.exchange"
                                :symbol="goods.formatSymbol"
                                :startDate="goods.testStart"
                                :endDate="goods.testEnd"
                                :cashUnit="goods.cashUnit"
                                cash="10000"
                                @updateGoods="getGoods"
          />
        </div>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col class="text-center">
        <b-link v-if="goods.investId === null && $store.guest === false"
                :class="`btn btn-lg btn-block btn-${$store.isManager === 'true' ? 'secondary' : 'primary'}`"
                :to="`/investGoods/${goods.id}/apply`"
                :disabled="$store.isManager === 'true' || (goods.cash <= this.goods.investCash)"
        >투자하기</b-link>

        <b-link v-if="goods.investId !== null && $store.guest === false"
                class="btn btn-lg btn-block btn-success"
                :to="`/investDetail/${goods.investId}`"
                :disabled="$store.isManager === 'true'"
        >투자중</b-link>
        <!-- 모집금액 충족하면 버튼비활성화됨.. -->

        <button v-if="$store.guest === true"
                class="btn btn-lg btn-block btn-primary"
                @click="noPermission"
        >투자하기</button>
      </b-col>
    </b-row>

    <b-card>
      <b-row class="mb-3">
        <b-col>
          <h4>거래 이력</h4>
        </b-col>
        <b-col class="text-right">
          <div class="form-check form-check-inline">
            <input class="form-check-input"
                   type="radio"
                   name="tradeHistory"
                   id="tradeHistoryChartFrame"
                   checked
                   @change="() => {tradeHistoryIsChart = true}">
            <label class="form-check-label"
                   for="tradeHistoryChartFrame">
              차트
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input"
                   type="radio"
                   name="tradeHistory"
                   id="tradeHistoryDataFrame"
                   @change="() => {tradeHistoryIsChart = false}">
            <label class="form-check-label"
                   for="tradeHistoryDataFrame">
                   데이터</label>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div ref="tradeHistoryChart">
            <CoinChart :isControl="false"
                       :viewExchange="goods.exchange"
                       :viewSymbol="goods.formatSymbol"
                       viewTimeInterval="1H"
            />
          </div>
          <div ref="tradeHistoryData" class="d-none">
            <TradeHistory type="goods"
                          :trade_history="goods.publicTradeHistory || goods.testResult.tradeHistory"
            />
          </div>
        </b-col>
        <!-- <b-col class="d-md-none">
          <TradeHistory type="goods"
                        :trade_history="goods.testResult.tradeHistory"
          />
        </b-col> -->
      </b-row>
    </b-card>
  </div>
</template>

<script>
import CoinChart from '../components/Charts/CoinChart'
import TradeHistory from '../components/Tables/HistoryTable'
import BarChartCard from '../components/Charts/BarChartCard'
import GoodsControlButton from '../components/Buttons/GoodsControlButton'
import CreateBackTestButton from '../components/Buttons/CreateBackTestButton'
import config from '../Config'
import utils from '../Utils'

export default {
  name: 'InvestGoodsDetail',
  extends: '',
  components: {
    CoinChart,
    TradeHistory,
    BarChartCard,
    GoodsControlButton,
    CreateBackTestButton
  },
  props: [],
  data () {
    return {
      intervalGoods: null,
      goods: {
        formatGoodsId: null,
        id: null,
        name: null,
        testResult: {
          testMonthlyReturn: [],
          tradeHistory: [],
          tradeHistorySize: 0
        }
      },
      isControl: true,
      tradeHistoryIsChart: true,
      testAmount: null,
      testReturnAmount: null,
      amountList: [],
      monthlyReturns: []
    }
  },
  computed: {},
  watch: {
    tradeHistoryIsChart () {
      if (this.tradeHistoryIsChart === true) {
        this.$refs.tradeHistoryData.classList.add('d-none')
        this.$refs.tradeHistoryChart.classList.remove('d-none')
      } else {
        this.$refs.tradeHistoryChart.classList.add('d-none')
        this.$refs.tradeHistoryData.classList.remove('d-none')
      }
    }
  },
  methods: {
    setGoods (goods) {
      this.goods = goods
      this.goods.formatExchange = utils.capitalizeFirstLetter(this.goods.exchange)
      this.goods.formatSymbol = this.goods.coinUnit.toUpperCase() + '/' + this.goods.baseUnit.toUpperCase()
      this.goods.formatGoodsId = utils.LPAD(this.goods.id, '0', 5)
      this.goods.formatCash = this.goods.cashUnit.toUpperCase()
      let nowTime = new Date()
      let y = nowTime.getFullYear()
      let m = nowTime.getMonth()
      let d = nowTime.getDate()
      this.goods.testResult = JSON.parse(goods.testResult)
      // if (goods.testResult.testMonthlyReturnList !== undefined) {
      //   goods.testResult.testMonthlyReturnList.forEach((o) => {
      //     if (o.returnPct > 0) {
      //       o.returnPct = o.returnPct
      //     }
      //   })
      // }
      if (this.goods.publicInvestId) {
        this.goods.testResult.tradeHistorySize = this.goods.publicTradeHistory.length
        this.$store.state.coinChart.tradeHistory = this.goods.publicTradeHistory
        this.monthlyReturns = goods.publicMonthlyReturnsPct
      } else {
        this.goods.testResult.tradeHistorySize = this.goods.testResult.tradeHistory.length
        this.$store.state.coinChart.tradeHistory = this.goods.testResult.tradeHistory
        this.monthlyReturns = goods.testResult.testMonthlyReturnList
      }
    },
    updateTask (goodsId, status) {
      this.goods.taskRunning = status
      this.getGoods(goodsId)
    },
    getGoods (goodsId) {
      this.$store.state.coinChart.tradeHistory = []
      let url = `${config.serverHost}/${config.serverVer}/goods/${goodsId}`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        this.setGoods(response.data)
      }).catch((e) => {
        console.log('error', e)
        let message = {
          '400': {type: 'error', title: '실패', msg: '상품 조회 요청이 잘못되었습니다.'},
          '403': {type: 'error', title: '실패', msg: '상품 조회 요청이 잘못되었습니다.'},
          '500': {type: 'error', title: '실패', msg: '상품 조회를 할 수 없습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    noPermission () {
      alert('로그인후 진행하세요.')
    }
  },
  beforeCreate () {},
  created () {
    let goodsId = this.$route.params.goodsId
    if (goodsId !== undefined && goodsId !== null) {
      this.getGoods(goodsId)
      this.intervalGoods = setInterval(() => {
        if (this.$route.params.goodsId !== undefined && this.$route.params.goodsId === goodsId) {
          this.getGoods(goodsId)
        } else {
          clearInterval(this.intervalGoods)
          this.intervalGoods = null
        }
      }, 1 * 60 * 1000)
    } else {
      this.$router.go(-1)
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
.wrapper {margin-top: 20px;}
.strong-text {
  font-size: 18pt;
}
.fs-1em {
  font-size:1.1em;
}
.main-text {
  color: #3C3C3C;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.3px;
}
.circle {
  font-size: 0.4em;
  vertical-align: middle;
}
</style>
