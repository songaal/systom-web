<template>
  <div class="wrapper">
    <div class="d-sm-down-none">
      <b-row>
        <b-col>
          투자상품 {{goods.formatGoodsId}}호
        </b-col>
        <b-col class="text-right">
          모집기간 {{goods.convertRecruitStart}} ~ {{goods.convertRecruitEnd}}
        </b-col>
      </b-row>
    </div>
    <div class="d-md-none">
      <b-row>
        <b-col>
          투자상품
        </b-col>
        <b-col class="text-right">
          모집기간
        </b-col>
      </b-row>
      <b-row>
        <b-col>{{goods.formatGoodsId}}호</b-col>
        <b-col class="text-right">{{goods.convertRecruitStart}} ~ {{goods.convertRecruitEnd}}</b-col>
      </b-row>
    </div>
    <hr />
    <b-row>
      <b-col cols="8">
        <h1 class="mb-3">
          {{goods.name}}
        </h1>
        <p v-if="goods.description !== undefined && goods.description !== null" class="mb-5">
          <pre style="overflow: visible;">{{goods.description}}</pre>
        </p>
      </b-col>
      <b-col v-if="$store.isManager === 'true'"
             cols="4"
             class="text-right">
        <GoodsControlButton :goods="goods" @setGoods="setGoods"/>
      </b-col>
    </b-row>

    <div class="d-sm-down-none">
      <b-row class="text-center text-nowrap mb-3">
        <b-col col sm="4" md="2">거래소</b-col>
        <b-col col sm="4" md="2">코인</b-col>
        <b-col col sm="4" md="2">예상수익률</b-col>
        <b-col col sm="4" md="2">기간</b-col>
        <b-col col sm="6" md="3">모집현황</b-col>
      </b-row>

      <b-row class="text-center mb-2">
        <b-col col sm="4" md="2"><span class="strong-text">{{goods.formatExchange}}</span></b-col>
        <b-col col sm="4" md="2"><span class="strong-text">{{goods.formatCoin}}</span></b-col>
        <b-col col sm="4" md="2"><span class="strong-text">{{goods.performance.returnPct}}</span>%</b-col>
        <b-col col sm="4" md="2"><span class="strong-text">{{goods.investDays}}</span> 일</b-col>
        <b-col col sm="6" md="3"><span class="strong-text">{{goods.convertRecruitAmount}} / {{goods.convertAmount}}</span></b-col>
      </b-row>
    </div>

    <div class="d-md-none">
      <b-row class="text-center text-nowrap">
        <b-col col xs="4">거래소</b-col>
        <b-col col xs="4">코인</b-col>
        <b-col col xs="4">예상수익률</b-col>
      </b-row>

      <b-row class="text-center mb-3">
        <b-col col xs="4"><span class="strong-text">{{goods.formatExchange}}</span></b-col>
        <b-col col xs="4"><span class="strong-text">{{goods.formatCoin}}</span></b-col>
        <b-col col xs="4"><span class="strong-text">{{goods.performance.returnPct}}</span>%</b-col>
      </b-row>

      <b-row class="text-center text-nowrap">
        <b-col col xs="4">기간</b-col>
        <b-col col xs="4">모집현황</b-col>
      </b-row>

      <b-row class="text-center mb-2">
        <b-col col xs="4"><span class="strong-text">{{goods.investDays}}</span> 일</b-col>
        <b-col col xs="4"><span class="strong-text">{{goods.convertRecruitAmount}} / {{goods.convertAmount}}</span></b-col>
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
                      name="monthRevenue"
                      title="월별 수익률"
                      type="pct"
                      :dataProvider="monthRevenue">
        </BarChartCard>
        <div v-if="$store.isManager === 'true' && goods.performance.trades === 0"
             style="position: relative; width: 100%;height:  0px;">
          <div style="position: relative; top: -297px; width:  100%; height: 273px; background-color: #585858b0;">
            <button class="btn btn-lg btn-primary btn-block"
                   style="position: relative; top: 40%; width:  80%; text-align:  center; height:  30%; left: 10%;">
                   데이터 생성
            </button>
            </div>
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
            예상수익은 {{testReturnAmount}} {{goods.formatCurrency}}입니다.
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col class="text-center">
          <b-link v-if="goods.invest === false"
                  class="btn btn-lg btn-block btn-primary"
                  :to="`/investGoods/${goods.id}/apply`"
                  :disabled="$store.isManager === 'true' || isInvest === false"
          >투자하기</b-link>
          <b-link v-if="goods.invest === true"
                  class="btn btn-lg btn-block btn-secondary"
                  :to="`/investGoods/${goods.id}/cancel`"
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
                       :tradeHistory="goods.tradeHistory"
            />
          </div>
          <div ref="tradeHistoryData" class="d-none">
            <TradeHistory type="goods"
                          :trade_history="goods.tradeHistory"
                          exchange="binance"
                          symbol="ETH/BTC"
                          timeInterval="1H"
            />
          </div>
        </b-col>
        <b-col class="d-md-none">
          <TradeHistory type="goods"
                        :trade_history="goods.tradeHistory"
                        exchange="binance"
                        symbol="ETH/BTC"
                        timeInterval="1H"
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
import config from '../Config'
import utils from '../Utils'

export default {
  name: 'InvestGoodsDetail',
  extends: '',
  components: {
    CoinChart,
    TradeHistory,
    BarChartCard,
    GoodsControlButton
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
        convertAmount: null,
        convertRecruitAmount: null,
        recruitPct: null,
        performance: {
          returnPct: null
        },
        tradeHistory: []
      },
      isInvest: false,
      tradeHistoryIsChart: true,
      testAmount: null,
      testReturnAmount: null,
      amountList: [],
      monthRevenue: [{
        date: '2018.02',
        pct: 10
      }, {
        date: '2018.03',
        pct: 0
      }, {
        date: '2018.04',
        pct: 30
      }, {
        date: '2018.05',
        pct: 24
      }, {
        date: '2018.06',
        pct: 3
      }, {
        date: '2018.07',
        pct: 50
      }]
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
        this.goods.performance !== undefined && this.goods.performance !== null &&
        this.goods.performance.returnPct !== undefined && this.goods.performance.returnPct !== null) {
        let p = Number(this.goods.performance.returnPct) * 0.01
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
      this.goods.formatCoin = this.goods.coin.toUpperCase()
      this.goods.formatGoodsId = utils.LPAD(this.goods.id, '0', 5)
      this.goods.formatCurrency = this.goods.currency.toUpperCase()
      this.goods.convertRecruitStart = utils.timestampToTime(this.goods.recruitStart, 's', false).replace(/-/gi, '.')
      this.goods.convertRecruitEnd = utils.timestampToTime(this.goods.recruitEnd, 's', false).replace(/-/gi, '.')
      this.goods.investDays = utils.obtainingDateDays(this.goods.investStart, this.goods.investEnd)
      this.goods.convertAmount = utils.convertAmountUnits(this.goods.amount)
      this.goods.convertRecruitAmount = utils.convertAmountUnits(this.goods.recruitAmount)
      this.goods.recruitPct = utils.calculationReturnPct(this.goods.amount, this.goods.recruitAmount)
      this.testAmount = Number(this.goods.minAmount).toFixed(2)
      this.amountList = this.generatorAmountList(this.goods.minAmount, this.goods.maxAmount, this.goods.formatCurrency)
      let nowTime = new Date().getTime()
      let diffAmount = Number(this.goods.amount) - Number(this.goods.recruitAmount)
      if (this.goods.recruitStart <= nowTime && nowTime <= this.goods.recruitEnd && diffAmount > 0) {
        this.isInvest = true
      }
    },
    getGoods (goodsId) {
      let url = `${config.serverHost}/${config.serverVer}/goods/${goodsId}`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        this.setGoods(response.data)
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '상품 조회 요청이 잘못되었습니다.'},
          '500': {type: 'error', title: '실패', msg: '상품 조회를 할 수 없습니다.'}
        }
        utils.httpFailNotify(e, this, message)
        this.$router.go(-1)
      })
    },
    generatorAmountList (minAmount, maxAmount, currency) {
      let tmpAmountList = []
      tmpAmountList.push({value: null, text: '투자금액을 선택하세요.', disabled: true})
      for (let i = Number(minAmount); i <= Number(maxAmount); i = Number(i) + Number(minAmount)) {
        tmpAmountList.push({value: i.toFixed(2), text: (i.toFixed(2) + ' ' + currency)})
      }
      return tmpAmountList
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
