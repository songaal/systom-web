<template>
  <div class="animated fadeIn wrapper">
    <b-row>
      <b-col col cols="12" xs="12" sm="12" md="4" lg="4">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text font-weight-bold">
              <b-link to="/account">{{$store.userId.toUpperCase()}}</b-link></b-col>
            <b-col class="text-right text-nowrap sub-text">
              {{$store.email}}
            </b-col>
          </b-row>
          <hr/>
          <b-row class="mt-1 mb-1">
            <b-col class="text-left text-nowrap sub-text wp-136">화폐단위</b-col>
            <b-col class="text-right text-nowrap sub-text"><b>USDT</b></b-col>
          </b-row>
          <b-row class="mt-1 mb-1">
            <b-col class="text-left text-nowrap sub-text wp-136">현재 투자금액</b-col>
            <b-col class="text-right text-nowrap sub-text">{{cash||0}}</b-col>
          </b-row>
          <b-row class="mt-1 mb-1">
            <b-col class="text-left text-nowrap sub-text wp-136">현재 자산가치</b-col>
            <b-col class="text-right text-nowrap sub-text">{{equity||0}}</b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="4" lg="4">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text wp-136">이번달 수익률</b-col>
            <b-col :class="`text-right text-nowrap main-text text-${lastMonthReturnPct >= 0 ? 'success': 'danger'}`">
              {{lastMonthReturnPct}} %
            </b-col>
          </b-row>
          <hr/>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">이번달 수익금액</b-col>
            <b-col class="text-right text-nowrap sub-text">{{lastMonthReturn}}</b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="4" lg="4">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text wp-136">이번달 투자금액</b-col>
            <b-col class="text-right text-success text-nowrap main-text">{{lastMonthInvestCash}}</b-col>
          </b-row>
          <hr/>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">누적 투자금액</b-col>
            <b-col class="text-right text-nowrap sub-text">{{totalInvestCash}}</b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col col xs="12" sm="12" md="6" lg="6" cols="12">
        <BarChartCard wideType="half" name="monthReturnPctList" title="월별 수익률" type="pct" :dataProvider="monthInvestList"></BarChartCard>
      </b-col>
      <b-col col xs="12" sm="12" md="6" lg="6" cols="12">
        <BarChartCard wideType="half" name="monthInvestList" title="월별 투자금액" type="price" :dataProvider="monthInvestList"></BarChartCard>
      </b-col>
    </b-row>

    <b-card>
      <b-row>
        <b-col class="text-left text-nowrap main-text mb-3" >나의 투자 상품</b-col>
      </b-row>
      <b-row>
        <b-col>
          <InvestGoodsTabTable />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import BarChartCard from '../components/Charts/BarChartCard'
import InvestGoodsTabTable from '../components/Tables/InvestGoodsTabTable'
import config from '../Config'
import utils from '../Utils'

export default {
  name: 'investment',
  extends: '',
  components: {
    BarChartCard,
    InvestGoodsTabTable
  },
  props: [],
  data () {
    return {
      interval: null,
      cash: null,
      equity: null,
      lastMonthReturnPct: null,
      lastMonthReturn: null,
      lastMonthInvestCash: null,
      totalInvestCash: null,
      monthInvestList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    retrieveMonthlyInvest () {
      this.cash = 0
      this.equity = 0
      this.lastMonthReturnPct = 0
      this.lastMonthReturn = 0
      this.lastMonthInvestCash = 0
      this.totalInvestCash = 0
      this.monthInvestList = []
      let url = `${config.serverHost}/${config.serverVer}/userMonthlyInvest`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        let monthlyInvest = response.data
        this.cash = utils.comma(monthlyInvest.cash || 0)
        let equity = monthlyInvest.equity || 0
        this.equity = utils.comma((Math.floor(equity * 100) / 100))
        let userMonthlyInvestList = monthlyInvest.userMonthlyInvestList
        let investListLength = userMonthlyInvestList.length
        if (userMonthlyInvestList !== undefined && investListLength > 0) {
          let nowMonth = new Date()
          nowMonth = nowMonth.getFullYear() + (Number(nowMonth.getMonth() + 1) < 10 ? '0' + (nowMonth.getMonth() + 1) : (nowMonth.getMonth() + 1))
          userMonthlyInvestList.forEach((m, i) => {
            if (nowMonth === m.date) {
              try {
                this.lastMonthReturnPct = Math.floor(m.monthlyReturnPct * 100) / 100
                this.lastMonthReturn = Math.floor(m.monthlyReturn * 100) / 100
              } catch (e) {
                console.log('ee', e)
              }
              this.lastMonthInvestCash = utils.comma(m.initCash || 0)
              this.totalInvestCash = utils.comma(m.sumCash || 0)
            }
            this.monthInvestList.push({
              date: m.date,
              returnPct: Math.floor(m.monthlyReturnPct * 100) / 100,
              price: m.initCash
            })
          })
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  beforeCreate () {},
  created () {
    this.retrieveMonthlyInvest()
    this.interval = setInterval(() => {
      if (this.$route.name === 'Investment') {
        this.retrieveMonthlyInvest()
      } else {
        clearInterval(this.interval)
      }
    }, 1 * 60 * 1000)
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
.wp-136 {
  min-width: 136px;
}
</style>
