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
            <b-col class="text-right text-nowrap sub-text">
              <ChangeCurrencyButton @randerDisplay="randerDisplay"/>
            </b-col>
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
        <BarChartCard wideType="half"
                      name="monthReturnPctList"
                      title="월별 수익률"
                      type="pct"
                      :dataProvider="monthInvestList"
        />
      </b-col>
      <b-col col xs="12" sm="12" md="6" lg="6" cols="12">
        <BarChartCard wideType="half"
                      name="monthInvestList"
                      title="월별 투자금액"
                      type="price"
                      :dataProvider="monthInvestList"
                      :currency="currency"
        />
      </b-col>
    </b-row>

    <b-card>
      <b-row>
        <b-col class="text-left text-nowrap main-text mb-3" >나의 투자 상품</b-col>
        <b-col class="text-right">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="toggleCloseGoodsComprise" @change="toggleCloseGoodsComprise">
            <label class="form-check-label" for="toggleCloseGoodsComprise">종료상품포함</label>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <MyInvestGoodsList :investGoodsList="investGoodsList" :isCloseGoodsComprise="isCloseGoodsComprise"/>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import BarChartCard from '../components/Charts/BarChartCard'
import MyInvestGoodsList from '../components/cards/MyInvestGoodsList'
import config from '../Config'
import utils from '../Utils'
import ChangeCurrencyButton from '../components/Buttons/ChangeCurrencyButton'

export default {
  name: 'investment',
  extends: '',
  components: {
    BarChartCard,
    MyInvestGoodsList,
    ChangeCurrencyButton
  },
  props: [],
  data () {
    return {
      currency: null,
      interval: null,
      cash: null,
      equity: null,
      lastMonthReturnPct: null,
      lastMonthReturn: null,
      lastMonthInvestCash: null,
      totalInvestCash: null,
      monthInvestList: [],
      registerMonthlyData: null,
      isCloseGoodsComprise: false,
      investGoodsList: [],
      sumUsdtInitCash: 0,
      sumKrwInitCash: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    toggleCloseGoodsComprise () {
      this.isCloseGoodsComprise = !this.isCloseGoodsComprise
    },
    retrieveMyInvestGoods () {
      this.runningMyInvestGoodsList = []
      this.closeMyInvestGoodsList = []
      let url = `${config.serverHost}/${config.serverVer}/investGoods`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        if (response.data !== undefined && response.data.length > 0) {
          this.investGoodsList = response.data
        } else {
          this.investGoodsList = []
        }
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '조회 요청이 잘못되었습니다.'},
          '403': {type: 'error', title: '실패', msg: '조회 요청이 잘못되었습니다.'},
          '500': {type: 'error', title: '실패', msg: '조회를 할 수 없습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    retrieveMonthlyInvest () {
      let url = `${config.serverHost}/${config.serverVer}/userMonthlyInvest`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        let monthlyInvest = response.data
        this.registerMonthlyData = monthlyInvest
        this.sumUsdtInitCash = monthlyInvest.sumUsdtInitCash
        this.sumKrwInitCash = monthlyInvest.sumKrwInitCash
        this.randerDisplay()
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    randerDisplay (currency) {
      let monthlyInvest = this.registerMonthlyData
      if (currency === undefined || currency === null) {
        let currencyKey = `currency_${this.$store.userId}`
        this.currency = utils.getCookie(currencyKey)
        if (this.currency === null) {
          this.currency = 'USDT'
        }
      } else {
        this.currency = currency
      }
      this.cash = 0
      this.equity = 0
      this.lastMonthReturnPct = 0
      this.lastMonthReturn = 0
      this.lastMonthInvestCash = 0
      this.totalInvestCash = 0
      this.monthInvestList = []
      let initCash = JSON.parse(monthlyInvest.initCash)
      let equity = JSON.parse(monthlyInvest.equity)
      if (this.currency === 'KRW') {
        this.cash = utils.comma(initCash.KRW)
        this.equity = utils.comma(Math.floor(equity.KRW))
      } else {
        this.cash = utils.comma(initCash.USDT)
        // 자릿수 2개만..
        this.equity = utils.comma((Math.floor(equity.USDT * 100) / 100))
      }
      let userMonthlyInvestList = monthlyInvest.userMonthlyInvestList
      let investListLength = userMonthlyInvestList.length
      if (userMonthlyInvestList !== undefined && investListLength > 0) {
        let nowMonth = new Date()
        let strNowMonth = nowMonth.getFullYear()
        strNowMonth += String((nowMonth.getMonth() + 1) < 10 ? '0' + (nowMonth.getMonth() + 1) : (nowMonth.getMonth() + 1))
        userMonthlyInvestList.forEach((m, i) => {
          let tmpReturns = JSON.parse(m.monthlyReturn)
          let tmpInitCash = JSON.parse(m.initCash)
          if (strNowMonth === m.date) {
            this.lastMonthReturnPct = m.monthlyReturnPct.toFixed(2)
            if (this.currency === 'KRW') {
              this.lastMonthReturn = utils.comma(Math.floor(tmpReturns.KRW))
              this.lastMonthInvestCash = utils.comma(Math.floor(tmpInitCash.KRW))
              this.totalInvestCash = utils.comma(Math.floor(this.sumKrwInitCash))
            } else {
              this.lastMonthReturn = utils.comma(tmpReturns.USDT.toFixed(2))
              this.lastMonthInvestCash = utils.comma(tmpInitCash.USDT.toFixed(2))
              this.totalInvestCash = utils.comma(this.sumUsdtInitCash.toFixed(2))
            }
          }
          let item = {
            date: m.date,
            returnPct: m.monthlyReturnPct,
            price: 0,
            length: 2
          }
          if (this.currency === 'KRW') {
            item.price = tmpInitCash.KRW
          } else {
            item.price = tmpInitCash.USDT
          }
          this.monthInvestList.push(item)
        })
      }
    }
  },
  beforeCreate () {},
  created () {
    this.retrieveMonthlyInvest()
    this.retrieveMyInvestGoods()
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
