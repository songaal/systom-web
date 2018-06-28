<template>
  <div class="wrapper">
    <b-row class="mb-4">
      <b-col class="text-center">
        <h2>투자 신청하기</h2>
        <!-- <div class="text-center">
          <div class="d-inline-block bg-secondary" style="width: 10px; height:10px; border-radius: 90px;"></div>
          <div class="d-inline-block bg-info" style="width: 10px; height:10px; border-radius: 90px;"></div>
        </div> -->
      </b-col>
    </b-row>

    <b-card>
      <b-row class="mb-2">
        <b-col>
          <h5>투자상품</h5>
        </b-col>
        <b-col>
          <h5 class="text-right">변동성돌파전략</h5>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <h4>총 투자금액</h4>
        </b-col>
        <b-col>
          <h4 class="text-right">500 USDT</h4>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <b-row class="mb-3">
        <b-col>
          <h5>투자 안내사항/투자 위험고지</h5>
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
          <b-form inline>
            <span class="mr-2" style="font-size:1.2em;">
              나, {{$store.userId}}은(는)
              <a href="https://8percent.kr/info/terms/investor_terms/" target="_blank">
                투자자 이용약관
              </a>
              을 확인하였으며 위 내용에
            </span>
            <b-form-input placeholder="동의함" v-model="isOk" ref="termsInput"/>
          </b-form>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-center mb-3">
          <b-link :class="`d-sm-down-none btn btn-lg w-50 btn-${isOk === '동의함' ? 'primary' : 'secondary'}`" to="/investGoods/1/result">{{btnName}}</b-link>
          <b-link :class="`d-md-none btn btn-lg btn-block btn-${isOk === '동의함' ? 'primary' : 'secondary'}`" to="/investGoods/1/result">{{btnName}}</b-link>
        </b-col>
      </b-row>
    </b-card>

  </div>
</template>

<script>
import InvestorTerms from '../terms/investor_terms'

export default {
  name: 'InvestGoodsTerms',
  extends: '',
  components: {
    InvestorTerms
  },
  props: [],
  data () {
    return {
      isOk: null,
      btnName: '동의함을 입력해주세요.'
    }
  },
  computed: {},
  watch: {
    isOk () {
      if (this.isOk === '동의함') {
        this.btnName = '동의함'
      } else {
        this.btnName = '동의함을 입력해주세요.'
      }
    }
  },
  methods: {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    this.$refs.termsInput.focus()
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
