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
                  <th>예상수익률</th>
                  <th>기간</th>
                  <th>취소금액</th>
                </tr>
                <tr>
                  <td class="text-left">[{{goods.formatGoodsId}}호] {{goods.name}}</td>
                  <td>{{goods.formatCoin}}</td>
                  <td>{{goods.performance.returnPct}}%</td>
                  <td>{{goods.investDays}} 일</td>
                  <td>
                    {{investGoods.amount}} {{goods.formatCurrency}}
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
          <b-col class="text-left">{{goods.formatCoin}}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">예상수익률</b-col>
          <b-col class="text-left">{{goods.performance.returnPct}} %</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">기간</b-col>
          <b-col class="text-left">{{goods.investDays}} 일</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">투자금액</b-col>
          <b-col class="text-left">{{investGoods.amount}} {{goods.formatCurrency}}</b-col>
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
        performance: {
          returnPct: null
        }
      },
      investGoods: {
        id: null,
        amount: null
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
        this.goods.formatCoin = this.goods.coin.toUpperCase()
        this.goods.formatGoodsId = utils.LPAD(this.goods.id, '0', 5)
        this.goods.formatCurrency = this.goods.currency.toUpperCase()
        this.goods.convertRecruitStart = utils.timestampToTime(this.goods.recruitStart, 's', false).replace(/-/gi, '.')
        this.goods.convertRecruitEnd = utils.timestampToTime(this.goods.recruitEnd, 's', false).replace(/-/gi, '.')
        this.goods.investDays = utils.obtainingDateDays(this.goods.investStart, this.goods.investEnd)
        this.goods.recruitPct = utils.calculationReturnPct(this.goods.amount, this.goods.recruitAmount)
        let nowTime = new Date().getTime()
        if (this.goods.recruitStart <= nowTime && nowTime <= this.goods.recruitEnd) {
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
    getInvestGoods (goodsId) {
      let url = `${config.serverHost}/${config.serverVer}/investGoods/${goodsId}`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        this.investGoods = response.data
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
      let url = `${config.serverHost}/${config.serverVer}/investGoods/${this.investGoods.goodsId}`
      this.axios.delete(url, config.getAxiosDeleteOptions({})).then((response) => {
        this.$vueOnToast.pop('success', '성공', '투자를 취소하셨습니다.')
        this.$router.replace(`/investGoods/${this.investGoods.goodsId}`)
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '요청이 잘못 되었습니다.'},
          '500': {type: 'error', title: '실패', msg: '요청이 실패하였습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    }
  },
  beforeCreate () {},
  created () {
    let goodsId = this.$route.params.goodsId
    if (goodsId !== undefined && goodsId !== null) {
      this.getGoods(goodsId)
      this.getInvestGoods(goodsId)
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
