<template>
  <div class="wrapper">
    <div class="d-sm-down-none">
      <b-row>
        <b-col cols="4">
          투자상품 <b-link :to="`/investGoods/${Number(investGoods.id)}`">{{investGoods.id}}</b-link>호
        </b-col>
        <b-col cols="8" class="text-right">
          투자기간 {{investGoods.startInvestDate}}
          ~
          {{investGoods.finished === true ? investGoods.endInvestDate : '현재'}}
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
        <b-col cols="4"><b-link :to="`/investGoods/${Number(investGoods.id)}`">{{investGoods.id}}</b-link>호</b-col>
        <b-col cols="8" class="text-right">
          {{investGoods.startInvestDate}}
          ~
          {{investGoods.finished === true ? investGoods.endInvestDate : '현재'}}
        </b-col>
      </b-row>
    </div>

    <hr />

    <b-row class="mb-3">
      <b-col cols="10"md="10">
        <h1 class="mb-3 d-inline">
          {{investGoods.name}}
        </h1>
        <sup class="invest-mode-badge">
          <b-badge v-if="!investGoods.paper" variant="primary">실전투자</b-badge>
          <b-badge v-if="investGoods.paper" variant="secondary">모의투자</b-badge>
        </sup>
      </b-col>
      <b-col cols="2" md="2">
        <InvestControlButton @refreshInvestGoods="getInvestGoods" :isDisable="isDisableControlBtn" />
      </b-col>
    </b-row>

    <div class="d-sm-down-none">
      <b-row class="text-center text-nowrap mb-2">
        <b-col cols="3">거래소</b-col>
        <b-col cols="3">심볼</b-col>
        <b-col cols="3">투자기간</b-col>
        <b-col cols="3">진행상태</b-col>
      </b-row>

      <b-row class="text-center mb-3">
        <b-col cols="3" col xs="6" sm="6" md="3"><span class="strong-text">{{investGoods.exchange}}</span></b-col>
        <b-col cols="3" col xs="6" sm="6" md="3"><span class="strong-text">{{investGoods.coinUnit}}/{{investGoods.baseUnit}}</span></b-col>
        <b-col cols="3" col xs="6" sm="6" md="3"><span class="strong-text">{{investGoods.investDays}}</span> 일</b-col>
        <b-col cols="3" col xs="6" sm="6" md="3">
          <span v-if="investGoods.finished === false" class="strong-text text-success">진행중</span>
          <span v-if="investGoods.finished === true" class="strong-text text-dark">종료</span>
        </b-col>
      </b-row>
    </div>

    <div class="d-md-none mb-3">
      <b-row class="text-center text-nowrap">
        <b-col cols="6">거래소</b-col>
        <b-col cols="6">코인</b-col>
      </b-row>
      <b-row class="text-center  mb-2">
        <b-col cols="6"><span class="strong-text">{{investGoods.exchange}}</span></b-col>
        <b-col cols="6"><span class="strong-text">{{investGoods.coinUnit}}/{{investGoods.baseUnit}}</span></b-col>
      </b-row>

      <b-row class="text-center">
        <b-col cols="6">투자기간</b-col>
        <b-col cols="6">진행상태</b-col>
      </b-row>
      <b-row class="text-center">
        <b-col cols="6"><span class="strong-text">{{investGoods.investDays}}</span> 일</b-col>
        <b-col cols="6">
          <span v-if="investGoods.finished === false" class="strong-text text-success">진행중</span>
          <span v-if="investGoods.finished === true" class="strong-text text-dark">종료</span>
        </b-col>
      </b-row>
    </div>

    <b-row class="mb-4">
      <b-col>
        <div class="progress progress-xs" style="background: #d2cccc4f;">
          <div :class="`progress-bar bg-${this.investGoods.finished === true ? 'dark' : 'success'}`"
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
      <b-col col cols="12" xs="12" sm="12" md="3" lg="3">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text">수익률</b-col>
            <b-col class="text-right text-nowrap">
              <span :class="`main-text text-${investGoods.performanceSummary === undefined ? 'danger' : investGoods.performanceSummary.returnsPct >= 0 ? 'success' : 'danger'}`">
                {{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.returnsPct}}
              </span>
              <span >%</span>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="text-left text-nowrap sub-text">초기자산</b-col>
            <b-col class="text-right text-nowrap sub-text">{{investGoods.formatInvestCash}} {{investGoods.cashUnit}}</b-col>
          </b-row>

          <b-row v-if="formatCommission !== undefined && formatCommission !== null">
            <b-col class="text-left text-nowrap sub-text">수수료</b-col>
            <b-col class="text-right text-nowrap sub-text" style="padding-right:10px;">
              <span v-for="base in Object.keys(formatCommission)"
                    :key="base.id">
                {{formatCommission[base]}} {{base.toUpperCase()}}
                <br/>
              </span>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="text-left text-nowrap sub-text">최대수익</b-col>
            <b-col class="text-right text-nowrap sub-text">
              {{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.maxReturnsPct}} %
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">최대손실</b-col>
            <b-col class="text-right text-nowrap sub-text">
              {{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.mdd}} %
            </b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="3" lg="3">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text">승률</b-col>
            <b-col class="text-right text-nowrap">
              <span class="main-text text-success">
                {{investGoods.tradeStat === undefined ? 0 : investGoods.tradeStat.winRate * 100 }}
              </span>
              <span> %</span>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="text-left text-nowrap sub-text">거래횟수</b-col>
            <b-col class="text-right text-nowrap sub-text">
              {{investGoods.tradeStat === undefined ? 0 : investGoods.tradeStat.tradeCount}}
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">이익횟수</b-col>
            <b-col class="text-right text-nowrap sub-text">
              {{investGoods.tradeStat === undefined ? 0 : investGoods.tradeStat.winCount}}
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">손실횟수</b-col>
            <b-col class="text-right text-nowrap sub-text">
              {{investGoods.tradeStat === undefined ? 0 : investGoods.tradeStat.loseCount}}
            </b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="3" lg="3">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text">손익비</b-col>
            <b-col class="text-right text-nowrap main-text text-success">
              {{investGoods.tradeStat === undefined ? 0 : investGoods.tradeStat.pnlRate}}
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="text-left text-nowrap sub-text">평균수익률</b-col>
            <b-col class="text-right text-nowrap sub-text">
              {{investGoods.tradeStat === undefined ? 0 : investGoods.tradeStat.profitRateAvg * 100}} %
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">평균손실률</b-col>
            <b-col class="text-right text-nowrap sub-text">
              {{investGoods.tradeStat === undefined ? 0 : investGoods.tradeStat.lossRateAvg * 100}} %
            </b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="3" lg="3">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text">자산가치</b-col>
            <b-col class="text-right main-text text-nowrap">
              {{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.formatEquity}}
              {{investGoods.cashUnit}}
            </b-col>
          </b-row>
          <hr />

          <b-row v-if="exchangeKeyName !== undefined && exchangeKeyName !== null">
            <b-col class="text-left text-nowrap sub-text">
              거래소키
            </b-col>
            <b-col class="text-right text-nowrap sub-text">
              {{exchangeKeyName}}
            </b-col>
          </b-row>

          <b-row>
            <b-col class="text-left text-nowrap sub-text">
              {{investGoods.cashUnit}}
            </b-col>
            <b-col class="text-right text-nowrap sub-text">
              {{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.cash}}
            </b-col>
          </b-row>
          <b-row v-for="position in Object.values(formatPosition)"
                :key="position.id">
            <b-col class="text-left text-nowrap sub-text">{{position.symbol.split('/')[0].toUpperCase()}}</b-col>
            <b-col class="text-right text-nowrap sub-text">{{position.quantity}}</b-col>
          </b-row>

        </b-card>
      </b-col>

    </b-row>


    <b-card class="mb-4">
      <b-row class="mb-3">
        <b-col>
          <h4>수익 이력</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <RevenueChart :revenues="investGoods.performanceDaily"
                        :fromDate="investGoods.investStart || null"
                        :toDate="investGoods.investEnd || null"
                        isTest="false"
          />
        </b-col>
      </b-row>
    </b-card>

    <b-card class="mb-5">
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
                       :viewExchange="investGoods.exchange"
                       :viewSymbol="`${investGoods.coinUnit}/${investGoods.baseUnit}`"
                       viewTimeInterval="1H"
            />
          </div>
          <div ref="tradeHistoryData" class="d-none">
            <TradeHistory type="goods"
                          :trade_history="investGoods.tradeHistory"
                          :exchange="investGoods.exchange"
                          :symbol="`${investGoods.coinUnit}/${investGoods.baseUnit}`"
            />
          </div>
        </b-col>
        <b-col class="d-md-none">
          <TradeHistory type="goods"
                        :trade_history="investGoods.tradeHistory"
                        :exchange="investGoods.exchange"
                        :symbol="`${investGoods.coinUnit}/${investGoods.baseUnit}`"
          />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import config from '../Config'
import utils from '../Utils'
import RevenueChart from '../components/Charts/RevenueChart'
import CoinChart from '../components/Charts/CoinChart'
import TradeHistory from '../components/Tables/HistoryTable'
import InvestControlButton from '../components/Buttons/InvestControlButton'

export default {
  name: 'investDetail',
  extends: '',
  components: {
    RevenueChart,
    TradeHistory,
    CoinChart,
    InvestControlButton
  },
  props: [],
  data () {
    return {
      investGoods: {
        id: null,
        returnPct: null,
        investStart: null,
        investEnd: null,
        performanceSummary: {
          tradeHistory: null,
          avgWin: null
        }
      },
      exchangeKeyName: null,
      formatPosition: {},
      formatCommission: null,
      tradeHistory: [],
      cum_returns: [],
      tradeHistoryIsChart: true,
      isDisableControlBtn: false
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
    getInvestGoods (investId) {
      this.$store.state.coinChart.tradeHistory = []
      let url = `${config.serverHost}/${config.serverVer}/investGoods/${investId}`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        let goods = response.data.goodsDetail
        this.exchangeKeyName = response.data.exchangeKeyName
        this.investGoods = goods
        this.investGoods.id = utils.LPAD(goods.id, '0', 5)
        this.investGoods.formatInvestCash = utils.comma(this.investGoods.investCash || 0)
        this.investGoods.performanceSummary.formatEquity = utils.comma(this.investGoods.performanceSummary.equity || 0)
        this.investGoods.exchange = utils.capitalizeFirstLetter(this.investGoods.exchange)
        this.investGoods.coinUnit = this.investGoods.coinUnit.toUpperCase()
        this.investGoods.baseUnit = this.investGoods.baseUnit.toUpperCase()
        this.investGoods.cashUnit = this.investGoods.cashUnit.toUpperCase()
        // 수익차트 마지막일 정하기.
        // 투자기간이 30일전이면 시작 ~ 30, 아니면 시작 ~ 마지막
        let investDate = new Date(this.investGoods.investTime)
        this.investGoods.investStart = this.formatDate(investDate.getFullYear(), investDate.getMonth() + 1, investDate.getDate())
        let addMonthDate = new Date()
        addMonthDate.setTime(investDate.getTime())
        addMonthDate.setMonth(addMonthDate.getMonth() + 1)
        let nowTime = new Date()
        if (addMonthDate.getTime() > nowTime.getTime()) {
          this.investGoods.investEnd = this.formatDate(addMonthDate.getFullYear(), addMonthDate.getMonth() + 1, addMonthDate.getDate())
        } else {
          this.investGoods.investEnd = this.formatDate(nowTime.getFullYear(), nowTime.getMonth() + 1, nowTime.getDate())
        }
        let diffTime = 0
        this.isDisableControlBtn = this.investGoods.finished
        if (this.investGoods.finished === true) {
          this.investGoods.endInvestDate = this.humanReadDate(new Date(this.investGoods.endTime)).replace(/-/g, '.')
          diffTime = this.investGoods.endTime - investDate.getTime()
        } else {
          diffTime = nowTime.getTime() - investDate.getTime()
        }
        this.investGoods.investDays = Math.floor(diffTime / 1000 / 3600 / 24) + 1
        this.investGoods.performanceSummary.cash = utils.comma(goods.performanceSummary.cash)
        this.investGoods.startInvestDate = this.humanReadDate(investDate).replace(/-/g, '.')
        this.formatPosition = {}
        this.formatPosition[`${goods.coinUnit}/${goods.baseUnit}`] = {symbol: `${goods.coinUnit}/${goods.baseUnit}`, quantity: 0}
        this.formatPosition[`${goods.baseUnit}/${goods.cashUnit}`] = {symbol: `${goods.baseUnit}/${goods.cashUnit}`, quantity: 0}
        if (this.investGoods.performanceSummary.positions !== undefined && this.investGoods.performanceSummary.positions !== null) {
          this.formatPosition = JSON.parse(this.investGoods.performanceSummary.positions)
          Object.keys(this.formatPosition).forEach(symbol => {
            this.formatPosition[symbol].quantity = utils.comma(Math.floor(this.formatPosition[symbol].quantity * 100000000) / 100000000)
          })
        }
        if (this.investGoods.performanceSummary.commission !== undefined && this.investGoods.performanceSummary.commission !== null) {
          this.formatCommission = JSON.parse(this.investGoods.performanceSummary.commission)
          Object.keys(this.formatCommission).forEach(coin => {
            if (coin.toLowerCase() === 'usdt') {
              this.formatCommission[coin] = utils.comma(Math.floor(this.formatCommission[coin] * 100) / 100)
            } else {
              this.formatCommission[coin] = utils.comma(Math.floor(this.formatCommission[coin] * 100000000) / 100000000)
            }
          })
        }
        this.investGoods.tradeStat.profitRateAvg = Math.floor(this.investGoods.tradeStat.profitRateAvg * 100) / 100
        this.investGoods.tradeStat.lossRateAvg = Math.floor(this.investGoods.tradeStat.lossRateAvg * 100) / 100
        let tradeHistory = goods.tradeHistory
        if (tradeHistory !== undefined && tradeHistory !== null) {
          this.$store.state.coinChart.tradeHistory = tradeHistory
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    formatDate (y, m, d) {
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
    },
    convertDate (date) {
      let y = Number(date.substring(0, 4))
      let m = Number(date.substring(4, 6))
      let d = Number(date.substring(6, 8))
      return this.formatDate(y, m, d)
    },
    humanReadDate (date) {
      return this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
    }
  },
  beforeCreate () {},
  created () {
    this.$store.state.coinChart.tradeHistory = []
    let investId = this.$route.params.investId
    if (investId !== undefined && investId !== null) {
      this.getInvestGoods(investId)
    } else {
      this.$vueOnToast.pop('error', '실패', '잘못된 접근입니다.')
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
.wrapper {
  margin-top: 20px;
}
.main-text {
  color: #3C3C3C;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.3px;
}
.sub-text {
  color: #8A8A8A;
}
.strong-text {
  font-size: 18pt;
}
.invest-mode-badge {
  font-size: 1.2em
}
</style>
