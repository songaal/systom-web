<template>
  <div class="wrapper">
    <b-row class="mb-5">
      <b-col class="text-center">
        <h2>투자 취소하기</h2>
      </b-col>
    </b-row>

    <b-card>
      <div class="d-sm-down-none">
        <b-row>
          <b-col>
            <div class="table-responsive">
              <table class="table text-nowrap text-center">
                <tr>
                  <th class="text-left">상품이름</th>
                  <th>코인</th>
                  <th>최대수익률</th>
                  <th>최대손실률</th>
                  <th>기간</th>
                  <th>취소금액</th>
                </tr>
                <tr>
                  <td class="text-left">[{{goods.formatGoodsId}}호] {{goods.name}}</td>
                  <td>{{goods.formatCoinUnit}}/{{goods.formatBaseUnit}}</td>
                  <td>{{goods.testMaxMonthlyPct}} %</td>
                  <td class="text-danger">{{goods.testMinMonthlyPct}} %</td>
                  <td>{{goods.investDays}} 일</td>
                  <td>
                    {{investGoods.formatInvestCash}} {{goods.formatCashUnit}}
                  </td>
                </tr>
              </table>
            </div>
          </b-col>
        </b-row>
      </div>

      <div class="d-md-none">
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">상품이름</b-col>
          <b-col class="text-left">{{goods.name}}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">코인</b-col>
          <b-col class="text-left">{{goods.formatCoinUnit}}/{{goods.formatBaseUnit}}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">최대월수익률</b-col>
          <b-col class="text-left">{{goods.testMaxMonthlyPct}} %</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">최대월손실률</b-col>
          <b-col class="text-left text-danger">{{goods.testMinMonthlyPct}} %</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">기간</b-col>
          <b-col class="text-left">{{goods.investDays}} 일</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">투자금액</b-col>
          <b-col class="text-left">{{investGoods.investCash}} {{goods.formatCashUnit}}</b-col>
        </b-row>
      </div>
    </b-card>

    <b-row>
      <b-col cols="12">
        <div class="text-center">
          <b-link class="btn btn-lg btn-outline-primary"
                  @click="() => {this.$router.go(-1)}"
          >이전으로</b-link>
          <button :class="{'btn': true, 'btn-lg': true, 'btn-primary': isRecruit, 'btn-secondary': !isRecruit}"
                  @click="removeInvestGoods"
                  :disabled="!isRecruit"
          >투자 취소하기</button>
        </div>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'InvestGoodsCancel',
  extends: '',
  components: {},
  props: [],
  data () {
    return {
      goods: {
        id: null,
        name: null,
        formatGoodsId: null,
        formatCoin: null,
        investDays: null,
        testMaxMonthlyPct: null,
        testMinMonthlyPct: null
      },
      investGoods: {
        id: null,
        investCash: null
      },
      isRecruit: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    getGoods (goodsId) {
      let url = `${config.serverHost}/${config.serverVer}/goods/${goodsId}`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        this.goods = response.data
        let testResult = JSON.parse(this.goods.testResult)
        this.goods.testMaxMonthlyPct = testResult.testMaxMonthlyPct
        this.goods.testMinMonthlyPct = testResult.testMinMonthlyPct
        this.goods.formatCoinUnit = this.goods.coinUnit.toUpperCase()
        this.goods.formatBaseUnit = this.goods.baseUnit.toUpperCase()
        this.goods.formatGoodsId = utils.LPAD(this.goods.id, '0', 5)
        this.goods.formatCashUnit = this.goods.cashUnit.toUpperCase()
        this.goods.convertRecruitStart = this.convertDate(this.goods.collectStart)
        this.goods.convertRecruitEnd = this.convertDate(this.goods.collectEnd)
        this.goods.investDays = utils.obtainingDateDays(this.goods.investStart, this.goods.investEnd)
        let nowTime = new Date()
        let y = nowTime.getFullYear()
        let m = nowTime.getMonth() + 1
        let d = nowTime.getDate()
        nowTime = y + (Number(m) < 10 ? '0' + Number(m) : m) + (Number(d) < 10 ? '0' + Number(d) : d)
        if (this.goods.collectStart <= nowTime && nowTime <= this.goods.collectEnd) {
          this.isRecruit = true
        } else {
          this.isRecruit = false
          this.$vueOnToast.pop('warning', '확인', '모집기간에만 투자 취소를 할 수 있습니다.')
        }
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '상품 조회 요청이 잘못되었습니다.'},
          '500': {type: 'error', title: '실패', msg: '상품 조회를 할 수 없습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    getInvestGoods (investId) {
      let url = `${config.serverHost}/${config.serverVer}/investGoods/${investId}`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        this.investGoods = response.data
        this.investGoods.formatInvestCash = utils.comma(this.investGoods.investCash)
        this.getGoods(this.investGoods.id)
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '투자취소 조회 요청이 잘못되었습니다.'},
          '500': {type: 'error', title: '실패', msg: '조회를 할 수 없습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    removeInvestGoods () {
      if (!this.isRecruit) {
        this.$vueOnToast.pop('warning', '확인', '모집기간에만 투자 취소를 할 수 있습니다.')
        return false
      }
      let url = `${config.serverHost}/${config.serverVer}/investGoods/${this.investGoods.investId}`
      this.axios.delete(url, config.getAxiosDeleteOptions({})).then((response) => {
        this.$vueOnToast.pop('success', '성공', '투자를 취소하셨습니다.')
        this.$router.replace(`/investGoods/${response.data.goodsId}`)
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '요청이 잘못 되었습니다.'},
          '500': {type: 'error', title: '실패', msg: '요청이 실패하였습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
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
    let investId = this.$route.params.investId
    if (investId !== undefined && investId !== null) {
      this.getInvestGoods(investId)
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
</style>
