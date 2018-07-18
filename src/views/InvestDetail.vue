warning<template>
  <div class="wrapper">
    <div class="d-sm-down-none">
      <b-row>
        <b-col cols="4">
          투자상품 {{investGoods.id}}호
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
          <span v-if="investGoods.status === 'warning'" class="strong-text text-warning" :title="investGoods.recruitEnd">대기중</span>
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
              <span class="main-text text-success">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.sumReturnPct}} </span>
              <span >%</span>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="text-left text-nowrap sub-text">초기자산</b-col>
            <b-col class="text-right text-nowrap sub-text">{{investGoods.investCash}} {{investGoods.cashUnit}}</b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">수수료</b-col>
            <b-col class="text-right text-nowrap sub-text">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.commission}} USDT</b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">최대낙폭</b-col>
            <b-col class="text-right text-nowrap sub-text">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.mdd}} %</b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="3" lg="3">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text">승률</b-col>
            <b-col class="text-right text-nowrap">
              <span class="main-text text-success">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.avgWin}}</span>
              <span> %</span>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="text-left text-nowrap sub-text">거래횟수</b-col>
            <b-col class="text-right text-nowrap sub-text">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.trades}}</b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">이익횟수</b-col>
            <b-col class="text-right text-nowrap sub-text">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.winCount}}</b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">손실횟수</b-col>
            <b-col class="text-right text-nowrap sub-text">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.loseCount}}</b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="3" lg="3">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text">손익비</b-col>
            <b-col class="text-right text-nowrap main-text text-success">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.pnlRate}}</b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="text-left text-nowrap sub-text">평균수익</b-col>
            <b-col class="text-right text-nowrap sub-text">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.avgProfit}} %</b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">평균손실</b-col>
            <b-col class="text-right text-nowrap sub-text">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.avgLose}} %</b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="3" lg="3">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text">총 자산</b-col>
            <b-col class="text-right text-nowrap main-text">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.equity}}</b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="text-left text-nowrap sub-text">{{investGoods.coinUnit}}</b-col>
            <b-col class="text-right text-nowrap sub-text">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.coin}}</b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">{{investGoods.baseUnit}}</b-col>
            <b-col class="text-right text-nowrap sub-text">{{investGoods.performanceSummary === undefined ? 0 : investGoods.performanceSummary.base}}</b-col>
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
      </b-row>
      <b-row>
        <b-col>
          <b-tabs class="d-sm-down-none">
            <b-tab title="차트">
              <CoinChart :isControl="false"
                         :tradeHistory="investGoods.performanceSummary.tradeHistory"
                         :viewExchange="investGoods.exchange"
                         :viewSymbol="`${investGoods.coinUnit}/${investGoods.baseUnit}`"
                         viewTimeInterval="1H"
              />
            </b-tab>
            <b-tab title="데이터">
              <TradeHistory type="goods"
                            :trade_history="investGoods.performanceSummary.tradeHistory"
                            :exchange="investGoods.exchange"
                            :symbol="`${investGoods.coinUnit}/${investGoods.baseUnit}`"
                            timeInterval="1H"
              />
            </b-tab>
          </b-tabs>
          <div class="d-md-none">
            <TradeHistory type="goods"
                          :trade_history="investGoods.performanceSummary.tradeHistory"
                          :exchange="investGoods.exchange"
                          :symbol="`${investGoods.coinUnit}/${investGoods.baseUnit}`"
                          timeInterval="1H"
            />
          </div>
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
        sumReturnPct: null,
        investStart: null,
        investEnd: null,
        performanceSummary: {
          tradeHistory: null,
          avgWin: null
        }
      },
      tradeHistory: [],
      cum_returns: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    getInvestGoods (investId) {
      let url = `${config.serverHost}/${config.serverVer}/investGoods/${investId}`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        let goods = response.data
        this.investGoods = goods
        this.investGoods.id = utils.LPAD(goods.id, '0', 5)
        this.investGoods.exchange = utils.capitalizeFirstLetter(this.investGoods.exchange)
        this.investGoods.coinUnit = this.investGoods.coinUnit.toUpperCase()
        this.investGoods.baseUnit = this.investGoods.baseUnit.toUpperCase()
        this.investGoods.cashUnit = this.investGoods.cashUnit.toUpperCase()
        this.investGoods.convertInvestStart = this.convertDate(goods.investStart)
        this.investGoods.convertInvestEnd = this.convertDate(goods.investEnd)
        let trades = goods.performanceSummary.trades
        let winCount = goods.performanceSummary.winCount
        this.investGoods.performanceSummary.avgWin = this.calAvgWin(trades, winCount)
        this.investGoods.investDays = utils.obtainingDateDays(goods.investStart, goods.investEnd)

        let nowDate = this.getNowDate()
        if (goods.recruitStart <= nowDate && goods.recruitEnd >= nowDate) {
          this.investGoods.status = 'warning'
          this.investGoods.runningPct = this.datePct(goods.recruitStart, goods.recruitEnd)
        } else if (goods.investStart <= nowDate && goods.investEnd >= nowDate) {
          this.investGoods.status = 'success'
          this.investGoods.runningPct = this.datePct(goods.investStart, goods.investEnd)
        } else {
          this.investGoods.status = 'dark'
          this.investGoods.runningPct = 100
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
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
    },
    calAvgWin (trades, winCount) {
      if (Number(trades) !== 0 && Number(winCount) !== 0) {
        return Math.floor((Number(winCount) / Number(trades)))
      } else {
        return 0
      }
    }
  },
  beforeCreate () {},
  created () {
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
