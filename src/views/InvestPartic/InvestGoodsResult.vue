<template>
  <div class="wrapper">
    <b-row class="mb-4">
      <b-col class="text-center">
        <h2>투자에 참여하였습니다.</h2>
      </b-col>
    </b-row>

    <b-card>
      <b-row>
        <b-col>
          <h4>요약</h4>
        </b-col>
      </b-row>
      <div class="d-sm-down-none">
        <b-row>
          <b-col>
            <div class="table-responsive">
              <table class="table text-nowrap text-center">
                <tr>
                  <th class="text-left">상품이름</th>
                  <th>코인</th>
                  <th>최대월수익률</th>
                  <th>최대월손실률</th>
                  <th>투자금액</th>
                  <th>처리결과</th>
                  <th>투자유형</th>
                </tr>
                <tr>
                  <td class="text-left">[{{investGoods.formatGoodsId}}호] {{investGoods.goodsName}}</td>
                  <td>{{investGoods.coinUnit}}/{{investGoods.baseUnit}}</td>
                  <td>{{investGoods.testMaxMonthlyPct}}%</td>
                  <td class="text-danger">{{investGoods.testMinMonthlyPct}} %</td>
                  <td>
                    {{investGoods.formatInvestCash}} {{investGoods.cashUnit}}
                  </td>
                  <td>
                    <span :class="{'text-success': investGoods.id !== null, 'text-danger': investGoods.id === null}">
                      {{investGoods.id !== null ? '완료' : '실패'}}
                    </span>
                  </td>
                  <td>
                    <span>
                      {{investGoods.isPaper ? '모의투자' : '실전투자'}}
                    </span>
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
          <b-col class="text-left">{{investGoods.goodsName}}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">심볼</b-col>
          <b-col class="text-left">{{investGoods.coinUnit}}/{{investGoods.baseUnit}}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">최대월수익률</b-col>
          <b-col class="text-left">{{investGoods.testMaxMonthlyPct || 0}} %</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">최대월손실률</b-col>
          <b-col class="text-left">{{investGoods.testMinMonthlyPct || 0}} %</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">투자금액</b-col>
          <b-col class="text-left">{{investGoods.investCash}} {{investGoods.cashUnit}}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">처리결과</b-col>
          <b-col class="text-left text-success">
            <span :class="{'text-success': investGoods.id !== null, 'text-danger': investGoods.id === null}">
              {{investGoods.id !== null ? '완료' : '실패'}}
            </span>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">투자유형</b-col>
          <b-col class="text-left text-success">
            <span>
              {{investGoods.isPaper ? '모의투자' : '실전투자'}}
            </span>
          </b-col>
        </b-row>
      </div>

      <!-- <hr /> -->

      <!-- <b-row>
        <b-col>
          <p class="text-danger">
            &#8251; 모집 마감일 +1일 12시30분전까지 투자 코인을 보유하고 있어야 됩니다.<br/>
          </p>
        </b-col>
      </b-row> -->
    </b-card>

    <b-row>
      <b-col cols="12">
        <div class="text-center">
          <b-link class="btn btn-lg btn-outline-primary" to="/investment">나의투자보기</b-link>
          <b-link class="btn btn-lg btn-primary" to="/investGoods">다른상품 보러가기</b-link>
        </div>
      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
  name: 'InvestGoodsResult',
  extends: '',
  components: {},
  props: [],
  data () {
    return {
      investGoods: {
        id: null,
        goodsId: null,
        goodsName: null,
        amount: null,
        currency: null,
        exchangeKeyId: null,
        formatGoodsId: null,
        exchangeKeyName: null,
        exchange: null,
        testMaxMonthlyPct: null,
        testMinMonthlyPct: null,
        isOk: null
      }
    }
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate () {},
  created () {
    if (this.$store.investGoods !== undefined && this.$store.investGoods !== null &&
      String(this.$route.params.goodsId) === String(this.$store.investGoods.goodsId)) {
      this.investGoods = this.$store.investGoods
    } else {
      this.$router.go(-1)
    }
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {
    this.$store.investGoods = null
  }
}
</script>

<style scoped>
.wrapper {margin-top: 20px;}
</style>
