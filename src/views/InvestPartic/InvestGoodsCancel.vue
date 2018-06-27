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
                  <td class="text-left">[0001호] 변동성돌파전략</td>
                  <td>ETH</td>
                  <td>11.5%</td>
                  <td>30 일</td>
                  <td>
                    500 USDT
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
          <b-col class="text-left">변동성돌파전략</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">코인</b-col>
          <b-col class="text-left">ETH</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">예상수익률</b-col>
          <b-col class="text-left">11.5 %</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">기간</b-col>
          <b-col class="text-left">30 일</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">투자금액</b-col>
          <b-col class="text-left">500 USDT</b-col>
        </b-row>
      </div>
    </b-card>

    <b-row>
      <b-col cols="12">
        <div class="text-center">
          <b-link class="btn btn-lg btn-outline-primary" @click="() => {this.$router.go(-1)}">이전으로</b-link>
          <b-link class="btn btn-lg btn-primary" to="/investGoods">투자 취소하기</b-link>
        </div>
      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
  name: 'InvestGoodsCancel',
  extends: '',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate () {},
  created () {},
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
