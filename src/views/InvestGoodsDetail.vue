<template>
  <div class="wrapper">
    <div class="d-sm-down-none">
      <b-row>
        <b-col cols="4">
          투자상품 {{goods.formatGoodsId}}호
        </b-col>
        <b-col cols="8" class="text-right">
          투자기간 {{goods.convertInvestStart}} ~ {{goods.convertInvestEnd}}
        </b-col>
      </b-row>
    </div>
    <div class="d-md-none">
      <b-row>
        <b-col cols="4">
          투자상품
        </b-col>
        <b-col cols="8" class="text-right">
          투자기간
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">{{goods.formatGoodsId}}호</b-col>
        <b-col cols="8" class="text-right">{{goods.convertInvestStart}} ~ {{goods.convertInvestEnd}}</b-col>
      </b-row>
    </div>
    <hr />
    <b-row class="mb-2">
      <b-col v-if="$store.isManager === 'false'"
             cols="12" col xs="12" sm="12">
        <h1 class="float-left mr-3">
          {{goods.name}}
        </h1>
        <span v-if="goods.closeDay >= 0" class="badge badge-sm badge-pill badge-warning">마감 {{goods.closeDay}}일전</span>
        <!-- <p v-if="goods.description !== undefined && goods.description !== null" class="mb-5">
          <pre style="overflow: visible; white-space: normal;">{{goods.description}}</pre>
        </p> -->
      </b-col>
      <b-col v-if="$store.isManager === 'true'"
             cols="9" col xs="9" sm="9" md="8" lg="8">
        <h1 class="float-left mr-3">
          {{goods.name}}
        </h1>
        <span v-if="goods.closeDay >= 0" class="badge badge-sm badge-pill badge-warning">마감 {{goods.closeDay}}일전</span>
      </b-col>
      <b-col v-if="$store.isManager === 'true'"
             cols="3" col xs="3" sm="3" md="4" lg="4"
             class="text-right">
        <GoodsControlButton :goods="goods" @setGoods="setGoods" :disabled="!isControl"/>
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
        <b-col col sm="4" md="2">거래소</b-col>
        <b-col col sm="4" md="2">심볼</b-col>
        <b-col col sm="4" md="2">예상수익률</b-col>
        <b-col col sm="4" md="2">기간</b-col>
        <b-col col sm="6" md="3">모집현황</b-col>
      </b-row>

      <b-row class="text-center mb-2">
        <b-col col sm="4" md="2"><span class="strong-text">{{goods.formatExchange}}</span></b-col>
        <b-col col sm="4" md="2"><span class="strong-text">{{goods.formatSymbol}}</span></b-col>
        <b-col col sm="4" md="2"><span class="strong-text">{{goods.testReturnPct}}</span>%</b-col>
        <b-col col sm="4" md="2"><span class="strong-text">{{goods.investDays}}</span> 일</b-col>
        <b-col col sm="6" md="3"><span class="strong-text">{{goods.convertInvestCash}} / {{goods.convertCash}}</span></b-col>
      </b-row>
    </div>

    <div class="d-md-none">
      <b-row class="text-center text-nowrap">
        <b-col col xs="4">거래소</b-col>
        <b-col col xs="4">심볼</b-col>
        <b-col col xs="4">예상수익률</b-col>
      </b-row>

      <b-row class="text-center mb-3">
        <b-col col xs="4"><span class="strong-text">{{goods.formatExchange}}</span></b-col>
        <b-col col xs="4"><span class="strong-text">{{goods.formatSymbol}}</span></b-col>
        <b-col col xs="4"><span class="strong-text">{{goods.testReturnPct}}</span>%</b-col>
      </b-row>

      <b-row class="text-center text-nowrap">
        <b-col col xs="4">기간</b-col>
        <b-col col xs="4">모집현황</b-col>
      </b-row>

      <b-row class="text-center mb-2">
        <b-col col xs="4"><span class="strong-text">{{goods.investDays}}</span> 일</b-col>
        <b-col col xs="4"><span class="strong-text">{{goods.convertInvestCash}} / {{goods.convertCash}}</span></b-col>
      </b-row>
    </div>

    <b-row class="mb-4">
      <b-col>
        <div class="progress progress-xs" style="background: #d2cccc4f;">
          <div class="progress-bar bg-success"
               role="progressbar"
               :style="`width: ${goods.recruitPct}%;`"
               :aria-valuenow="goods.recruitPct"
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
                      :dataProvider="goods.testMonthlyReturn">
        </BarChartCard>
        <div v-if="$store.isManager === 'true' && goods.testReturnPct === 0"
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

    <b-card>
      <b-row>
        <b-col class="text-center">

          <div class="mb-2 fs-1em">
            <div class="d-inline-block">
              <b-form-select v-model="testAmount"
                             :options="amountList"
                             :select-size="1"
                             class="mb-1"
              />
            </div>
            <span class="fs-1em">을 투자할 경우,</span>
          </div>
          <div class="mb-3 fs-1em">
            예상수익은 {{testReturnAmount.toFixed(0)}} {{goods.formatCash}}입니다.
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="text-center">
          <b-link v-if="goods.investId === null"
                  :class="`btn btn-lg btn-block btn-${$store.isManager === 'true' ? 'secondary' : 'primary'}`"
                  :to="`/investGoods/${goods.id}/apply`"
                  :disabled="$store.isManager === 'true' || isInvest === false || diffCash === 0"
          >투자하기</b-link>
          <b-link v-if="goods.investId !== null"
                  class="btn btn-lg btn-block btn-secondary"
                  :to="`/investGoods/${goods.investId}/cancel`"
                  :disabled="$store.isManager === 'true' || isInvest === false"
          >투자취소</b-link>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <b-row class="mb-3">
        <b-col>
          <h4>거래 이력</h4>
        </b-col>
        <b-col class="text-right d-sm-down-none">
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
        <b-col class="d-sm-down-none">
          <div ref="tradeHistoryChart">
            <CoinChart :isControl="false"
                       :viewExchange="goods.exchange"
                       :viewSymbol="goods.formatSymbol"
                       viewTimeInterval="1H"
            />
          </div>
          <div ref="tradeHistoryData" class="d-none">
            <TradeHistory type="goods"
                          :trade_history="goods.tradeHistory"
            />
          </div>
        </b-col>
        <b-col class="d-md-none">
          <TradeHistory type="goods"
                        :trade_history="goods.tradeHistory"
          />
        </b-col>
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
      goods: {
        formatGoodsId: null,
        id: null,
        name: null,
        convertRecruitStart: null,
        convertRecruitEnd: null,
        investDays: null,
        convertCash: null,
        convertInvestCash: null,
        recruitPct: null,
        testReturnPct: null,
        testMonthlyReturn: [],
        tradeHistory: []
      },
      diffCash: null,
      isControl: true,
      isInvest: false,
      tradeHistoryIsChart: true,
      testAmount: null,
      testReturnAmount: null,
      amountList: []
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
    },
    testAmount () {
      if (this.testAmount !== undefined && this.testAmount !== null &&
        this.goods.testReturnPct !== undefined && this.goods.testReturnPct !== null) {
        let p = Number(this.goods.testReturnPct) * 0.01
        this.testReturnAmount = this.testAmount * p
      } else {
        this.testReturnAmount = 0
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
      this.goods.convertRecruitStart = this.convertDate(goods.recruitStart)
      this.goods.convertRecruitEnd = this.convertDate(goods.recruitEnd)
      this.goods.convertInvestStart = this.convertDate(goods.investStart)
      this.goods.convertInvestEnd = this.convertDate(goods.investEnd)
      this.goods.investDays = utils.obtainingDateDays(goods.investStart, goods.investEnd)
      this.goods.convertCash = utils.convertCash(goods.cash)
      this.goods.convertInvestCash = utils.convertCash(goods.investCash)
      this.goods.recruitPct = utils.calculationRecruitPct(goods.cash, goods.investCash)
      let minTestAmount = Math.floor(goods.cash / 100).toFixed(2)
      this.testAmount = minTestAmount <= 0 ? '1.00' : minTestAmount
      this.amountList = this.generatorTestCashList(Math.floor(goods.cash / 100).toFixed(2), Math.floor(goods.cash / 2).toFixed(2), this.goods.formatCash)
      let nowTime = new Date()
      let y = nowTime.getFullYear()
      let m = nowTime.getMonth()
      let d = nowTime.getDate()
      nowTime = y + (Number(m) < 10 ? '0' + (Number(m) + 1) : (Number(m) + 1)) + (Number(d) < 10 ? '0' + Number(d) : Number(d))
      this.goods.closeDay = utils.obtainingDateDays(nowTime, goods.recruitEnd)
      this.diffCash = Number(this.goods.cash) - Number(this.goods.investCash)
      if ((this.goods.recruitStart <= nowTime && nowTime <= this.goods.recruitEnd)) {
        this.isInvest = true
      }
      if (goods.investStart <= nowTime) {
        this.isControl = false
      }
      this.$store.state.coinChart.tradeHistory = goods.tradeHistory
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
        this.$router.go(-1)
      })
    },
    generatorTestCashList (minAmount, maxAmount, currency) {
      let tmpAmountList = []
      tmpAmountList.push({value: null, text: '투자금액을 선택하세요.', disabled: true})
      minAmount = minAmount <= 0 ? 1 : minAmount
      for (let i = Number(minAmount); i <= Number(maxAmount); i = Number(i) + Number(minAmount)) {
        tmpAmountList.push({value: i.toFixed(2), text: (i.toFixed(2) + ' ' + currency)})
      }
      return tmpAmountList
    },
    convertDate (date) {
      let y = Number(date.substring(0, 4))
      let m = Number(date.substring(4, 6))
      let d = Number(date.substring(6, 8))
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
    }
  },
  beforeCreate () {},
  created () {
    let goodsId = this.$route.params.goodsId
    if (goodsId !== undefined && goodsId !== null) {
      this.getGoods(goodsId)
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
</style>
