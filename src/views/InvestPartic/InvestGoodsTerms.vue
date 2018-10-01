<template>
  <div class="wrapper">
    <b-row class="mb-4">
      <b-col class="text-center">
        <h2>투자 신청하기</h2>
      </b-col>
    </b-row>

    <b-card>
      <b-row class="mb-2">
        <b-col>
          <h5>투자상품</h5>
        </b-col>
        <b-col>
          <h5 class="text-right">{{investGoods.goodsName}}</h5>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <h4>총 투자금액</h4>
        </b-col>
        <b-col>
          <h4 class="text-right">{{investGoods.formatInvestCash}} {{investGoods.cashUnit}}</h4>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <b-row class="mb-3">
        <b-col>
          <h5>투자 안내사항</h5>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col>
          <div class="border border-light w-100" style="height:300px; overflow: auto;">
            <InvestorTerms></InvestorTerms>
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col>
          <form class="form-inline" action="javascript:void(0)">
            <span class="mr-2" style="font-size:1.2em;">
              나, {{$store.userId}}은(는) 위 내용에
            </span>
            <b-input v-on:keyup.native="isNext" placeholder="동의함" v-model="investGoods.isOk" ref="termsInput"/>
          </form>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-center mb-3">
          <button :class="`d-sm-down-none btn btn-lg w-50 btn-${investGoods.isOk === '동의함' ? 'primary' : 'secondary'}`"
                  @click="next">{{btnName}}</button>
          <button :class="`d-md-none btn btn-lg btn-block btn-${investGoods.isOk === '동의함' ? 'primary' : 'secondary'}`"
                  @click="next">{{btnName}}</button>
        </b-col>
      </b-row>
    </b-card>

  </div>
</template>

<script>
import InvestorTerms from '../terms/investor_terms'
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'InvestGoodsTerms',
  extends: '',
  components: {
    InvestorTerms
  },
  props: [],
  data () {
    return {
      isProcess: false,
      investGoods: {
        id: null,
        goodsId: null,
        goodsName: null,
        cash: null,
        cashUnit: null,
        exchangeKeyId: null,
        formatGoodsId: null,
        exchangeKeyName: null,
        exchange: null,
        testReturnPct: null,
        isOk: null,
        formatInvestCash: null,
        testMaxMonthlyPct: null,
        testMinMonthlyPct: null
      },
      btnName: '동의함을 입력해주세요.'
    }
  },
  computed: {},
  watch: {
    'investGoods.isOk' () {
      if (this.investGoods !== undefined && this.investGoods.isOk === '동의함') {
        this.btnName = '동의함'
      } else {
        this.btnName = '동의함을 입력해주세요.'
      }
    }
  },
  methods: {
    isNext (e) {
      if (e.code === 'Enter' && this.investGoods.isOk === '동의함') {
        this.next()
      }
    },
    next () {
      if (this.$store.investGoods !== undefined && this.investGoods.isOk === '동의함') {
        if (this.isProcess) {
          return false
        }
        this.isProcess = true
        let url = `${config.serverHost}/${config.serverVer}/investGoods`
        this.axios.post(url, this.investGoods, config.getAxiosPostOptions()).then((response) => {
          this.isProcess = false
          this.investGoods.id = response.data.id
          this.$store.investGoods = this.investGoods
          this.$router.replace(`/investGoods/${this.investGoods.goodsId}/result`)
        }).catch((e) => {
          this.isProcess = false
          this.$store.investGoods = this.investGoods
          this.$store.investGoods.id = null
          this.$router.replace(`/investGoods/${this.investGoods.goodsId}/result`)
        })
      } else {
        this.$vueOnToast.pop('warning', '실패', '동의함을 입력하세요.')
      }
    }
  },
  beforeCreate () {},
  created () {
    this.investGoods = this.$store.investGoods
    let isInvestGoods = this.investGoods !== undefined && this.investGoods !== null
    if (!isInvestGoods || String(this.$route.params.goodsId) !== String(this.investGoods.goodsId)) {
      this.$router.go(-1)
    }
  },
  beforeMount () {},
  mounted () {
    if (this.$refs.termsInput !== undefined) {
      this.$refs.termsInput.focus()
    }
  },
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>
.wrapper {margin-top: 20px;}
.form-control::-moz-placeholder {
  color: #cbcbcb;
  opacity: 1;
}
.form-control:-ms-input-placeholder {
  color: #cbcbcb;
}
.form-control::-webkit-input-placeholder {
  color: #cbcbcb;
}
</style>
