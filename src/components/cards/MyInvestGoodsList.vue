<template>
  <div>
    <!-- pc -->
    <div class="d-sm-down-none">
      <b-row class="text-center market-text mb-2 ml-0 mr-0 text-nowrap">
        <b-col cols="2" size="md" class="goods-list-field pl-md-4">심볼</b-col>
        <b-col cols="2" size="md" class="goods-list-field">이름</b-col>
        <b-col cols="2" size="md" class="goods-list-field pl-md-0">수익률</b-col>
        <b-col cols="2" size="md" class="goods-list-field pl-md-0">자산가치</b-col>
        <b-col cols="2" size="md" class="goods-list-field pl-md-0">진행기간</b-col>
        <b-col cols="2" size="md" class="pl-0 goods-list-field">거래소</b-col>
      </b-row>

      <b-row v-if="investGoodsList.length === 0">
        <b-col class="text-center py-2 market-text mb-3 ml-0 mr-0 text-nowrap">
          투자상품이 없습니다.
        </b-col>
      </b-row>

      <b-row class="text-center bg-white py-2 border border-secondary market-text mb-3 ml-0 mr-0 text-nowrap"
             v-for="(investGoods, index) in investGoodsList"
             :key="investGoods.key"
      >
        <b-col cols="2" size="md" class="market-goods">
          {{investGoods.coinUnit.toUpperCase()}}/{{investGoods.baseUnit.toUpperCase()}}
        </b-col>

        <b-col cols="2" size="md" class="market-goods text-ellipsis" style="overflow:hidden;">
          <b-link :to="`/investDetail/${investGoods.investId}`" :title="investGoods.name">{{investGoods.name}}</b-link>
          <b-badge variant="primary">실전</b-badge>
          <!-- TODO 실전, 모의 구분 -->
        </b-col>

        <b-col cols="2" size="md" class="market-goods">
          {{investGoods.performanceSummary.returnsPct||0}}%
        </b-col>
        <b-col cols="2" size="md" class="market-goods">
          {{investGoods.performanceSummary.equity||0}} {{investGoods.cashUnit.toUpperCase()}}
        </b-col>
        <b-col cols="2" size="md" class="market-goods">
          {{investGoods.investDays}}일
        </b-col>
        <b-col cols="2" size="md" class="market-goods">
          {{investGoods.exchange}}
        </b-col>
      </b-row>
    </div>
    <!-- mobile -->
    <div class="d-md-none">
      <b-row v-if="investGoodsList.length === 0">
        <b-col class="text-center pt-2 pb-2 market-text mb-2 text-nowrap">
          투자상품이 없습니다.
        </b-col>
      </b-row>
      <div v-for="(investGoods, index) in investGoodsList"
           :key="investGoods.key"
           class="text-center bg-white pt-2 pb-2 border border-secondary market-text mb-2 text-nowrap">
        <b-row>
          <b-col class="ml-1 mt-1">{{investGoods.coinUnit.toUpperCase()}}/{{investGoods.baseUnit.toUpperCase()}}</b-col>
          <b-col class="mt-1 text-ellipsis" style="overflow:hidden;">
            <b-link :to="`/investDetail/${investGoods.investId}`" :title="investGoods.name">{{investGoods.name}}</b-link>
            <b-badge variant="primary">실전</b-badge>
            <!-- TODO 실전, 모의 구분 -->
          </b-col>
          <b-col>
            {{investGoods.exchange}}
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">
            <div class="progress-group-bars">
              <div class="progress progress-xs">
                <div class="progress-bar bg-success"
                     role="progressbar"
                     :style="`width: 100%;`"
                     :aria-valuenow="100"
                     aria-valuemin="0"
                     aria-valuemax="100">
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2 pl-3 pr-2">수익률</b-col>
          <b-col class="mt-2 pl-2 pr-2">자산가치</b-col>
          <b-col class="mt-2 pl-2 pr-2">진행기간</b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2 pl-3 pr-2">
            {{investGoods.performanceSummary.returnsPct||0}}%
          </b-col>
          <b-col class="mt-2 pl-2 pr-2">
            {{investGoods.performanceSummary.equity||0}} {{investGoods.cashUnit.toUpperCase()}}
          </b-col>
          <b-col class="mt-2 pl-2 pr-2">
            {{investGoods.investDays}}일
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'goodsCard',
  extends: '',
  components: {},
  props: ['investGoodsList'],
  data () {
    return {}
  },
  computed: {},
  watch: {
    investGoodsList () {
      let nowTime = new Date()
      this.investGoodsList.map(o => {
        o.investDays = Math.floor(((nowTime.getTime() - new Date(o.investTime).getTime()) / 1000 / 3600 / 24) + 1)
        o.performanceSummary.equity = utils.comma(o.performanceSummary.equity)
        o.exchange = config.liveExchanges.filter(e => e.en.toUpperCase() === o.exchange.toUpperCase())[0].ko
      })
    }
  },
  methods: {
  },
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
.market-goods {
  line-height: 40px;
}
.cursor-pointer {
  cursor: pointer;
}
.goods-list-field {
  cursor: default;
}
</style>
