warning<template>
  <div class="wrapper">
    <div class="d-sm-down-none">
      <b-row>
        <b-col cols="4">
          투자상품 <b-link :to="`/investGoods/${Number(investGoods.id)}`">{{investGoods.id}}</b-link>호
        </b-col>
        <b-col cols="8" class="text-right">
          투자기간 {{investGoods.convertInvestStart}} ~ {{investGoods.convertInvestEnd}}
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
        <b-col cols="4">{{investGoods.id}}호</b-col>
        <b-col cols="8" class="text-right">{{investGoods.convertInvestStart}} ~ {{investGoods.convertInvestEnd}}</b-col>
      </b-row>
    </div>


    <hr />

    <b-row>
      <b-col>
        <h1 class="mb-3">
          {{investGoods.name}}
        </h1>
      </b-col>
    </b-row>

    <div class="d-sm-down-none">
      <b-row class="text-center text-nowrap mb-2">
        <b-col col sm="4" md="2">거래소</b-col>
        <b-col col sm="4" md="2">심볼</b-col>
        <b-col col sm="4" md="2">투자기간</b-col>
        <b-col col sm="4" md="2">진행상태</b-col>
      </b-row>

      <b-row class="text-center mb-3">
        <b-col cols="6" col xs="6" sm="6" md="2"><span class="strong-text">{{investGoods.exchange}}</span></b-col>
        <b-col cols="6" col xs="6" sm="6" md="2"><span class="strong-text">{{investGoods.coinUnit}}/{{investGoods.baseUnit}}</span></b-col>
        <b-col cols="6" col xs="6" sm="6" md="2"><span class="strong-text">{{investGoods.investDays}}</span> 일</b-col>
        <b-col cols="6" col xs="6" sm="6" md="2">
          <span v-if="investGoods.status === 'warning'" class="strong-text text-warning" :title="investGoods.collectEnd">대기중</span>
          <span v-if="investGoods.status === 'success'" class="strong-text text-primary">진행중</span>
          <span v-if="investGoods.status === 'dark'" class="strong-text">종료</span>
        </b-col>
        <!-- 대기중 노랑, 진행중 파랑, 종료 검정, 에러 빨강, -->
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
          <span v-if="investGoods.status === 'warning'" class="strong-text text-warning">대기중</span>
          <span v-if="investGoods.status === 'success'" class="strong-text text-primary">진행중</span>
          <span v-if="investGoods.status === 'dark'" class="strong-text">종료</span>
        </b-col>
      </b-row>
    </div>


    <b-row class="mb-4">
      <b-col>
        <div class="progress progress-xs" style="background: #d2cccc4f;">
          <div :class="`progress-bar bg-${this.investGoods.status}`"
               role="progressbar"
               :style="`width: ${investGoods.runningPct}%;`"
               :aria-valuenow="investGoods.runningPct"
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
              <span class="main-text text-success">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.returnsPct}} </span>
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
          <!-- <b-row v-for="base in Object.keys(formatCommission)" :key="base.id">
              <b-col class="text-left text-nowrap sub-text">수수료 [{{base}}]</b-col>
              <b-col class="text-right text-nowrap sub-text">{{formatCommission[base]}}</b-col>
          </b-row> -->

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
                        :status="investGoods.status"
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

export default {
  name: 'Invest',
  extends: '',
  components: {
    RevenueChart,
    TradeHistory,
    CoinChart
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
      formatPosition: {},
      formatCommission: null,
      tradeHistory: [],
      cum_returns: [],
      tradeHistoryIsChart: true
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
        let goods = response.data
        this.investGoods = goods
        this.investGoods.id = utils.LPAD(goods.id, '0', 5)
        this.investGoods.formatInvestCash = utils.comma(this.investGoods.investCash || 0)
        this.investGoods.performanceSummary.formatEquity = utils.comma(this.investGoods.performanceSummary.equity || 0)
        this.investGoods.exchange = utils.capitalizeFirstLetter(this.investGoods.exchange)
        this.investGoods.coinUnit = this.investGoods.coinUnit.toUpperCase()
        this.investGoods.baseUnit = this.investGoods.baseUnit.toUpperCase()
        this.investGoods.cashUnit = this.investGoods.cashUnit.toUpperCase()
        this.investGoods.convertInvestStart = this.convertDate(goods.investStart)
        this.investGoods.convertInvestEnd = this.convertDate(goods.investEnd)
        this.investGoods.performanceSummary.cash = utils.comma(goods.performanceSummary.cash)
        this.investGoods.investDays = utils.obtainingDateDays(goods.investStart, goods.investEnd)
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
        // let nowDate = this.getNowDate()
        if (goods.status === 'RUNNING') {
          this.investGoods.status = 'success'
          this.investGoods.runningPct = this.datePct(goods.investStart, goods.investEnd)
        } else if (goods.status === 'WAIT') {
          this.investGoods.status = 'warning'
          this.investGoods.runningPct = this.datePct(goods.collectStart, goods.collectEnd)
        } else {
          this.investGoods.status = 'dark'
          this.investGoods.runningPct = 100
        }
        // if (goods.collectStart <= nowDate && goods.collectEnd >= nowDate) {
        //   this.investGoods.status = 'warning'
        //   this.investGoods.runningPct = this.datePct(goods.collectStart, goods.collectEnd)
        // } else if (goods.investStart <= nowDate && goods.investEnd >= nowDate) {
        //   this.investGoods.status = 'success'
        //   this.investGoods.runningPct = this.datePct(goods.investStart, goods.investEnd)
        // } else {
        //   this.investGoods.status = 'dark'
        //   this.investGoods.runningPct = 100
        // }
        let tradeHistory = goods.tradeHistory
        if (tradeHistory !== undefined && tradeHistory !== null) {
          this.$store.state.coinChart.tradeHistory = tradeHistory
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    convertTime (date) {
      let h = date.getHours() < 10 ? '0' + date.getHours() : date.getMonth()
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return h + m + s
    },
    convertDate (date) {
      let y = Number(date.substring(0, 4))
      let m = Number(date.substring(4, 6))
      let d = Number(date.substring(6, 8))
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
    },
    getNowDate () {
      let date = new Date()
      let y = date.getFullYear()
      let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()
      let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return y + m + d
    },
    datePct (fromDate, toDate) {
      let nowDate = this.getNowDate()
      if (nowDate >= toDate) {
        return 100
      }
      let diffDate = utils.obtainingDateDays(fromDate, toDate)
      let nowDiffDate = utils.obtainingDateDays(fromDate, nowDate)
      return Math.floor((Number(nowDiffDate) / Number(diffDate)) * 100)
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
</style>
