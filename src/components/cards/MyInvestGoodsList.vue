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

      <b-row v-if="runningInvestGoodsList.length === 0">
        <b-col class="text-center py-2 market-text mb-3 ml-0 mr-0 text-nowrap">
          투자상품이 없습니다.
        </b-col>
      </b-row>

      <b-row class="text-center bg-white py-2 border border-secondary market-text mb-3 ml-0 mr-0 text-nowrap cursor-pointer"
             v-for="(investGoods, index) in runningInvestGoodsList"
             :key="investGoods.key"
             @click="goDetail(investGoods.investId)"
      >
        <b-col cols="2" size="md" class="market-goods">
          {{investGoods.coinUnit.toUpperCase()}}/{{investGoods.baseUnit.toUpperCase()}}
        </b-col>

        <b-col cols="2" size="md" class="market-goods text-ellipsis" style="overflow:hidden;">
          <b-badge v-if="!investGoods.paper" variant="primary">실전</b-badge>
          <b-badge v-if="investGoods.paper" variant="secondary">모의</b-badge>
          <b-link :to="`/investDetail/${investGoods.investId}`" :title="investGoods.name">{{investGoods.name}}</b-link>
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

      <!-- close invest goods list start -->
      <b-row class="text-center bg-light py-2 border border-secondary market-text mb-3 ml-0 mr-0 text-nowrap cursor-pointer"
             v-if="isCloseGoodsComprise === true"
             v-for="(investGoods, index) in closeInvestGoodsList"
             :key="investGoods.key"
             @click="goDetail(investGoods.investId)"
      >
        <b-col cols="2" size="md" class="market-goods">
          {{investGoods.coinUnit.toUpperCase()}}/{{investGoods.baseUnit.toUpperCase()}}
        </b-col>

        <b-col cols="2" size="md" class="market-goods text-ellipsis" style="overflow:hidden;">
          <b-badge v-if="!investGoods.paper" variant="primary">실전</b-badge>
          <b-badge v-if="investGoods.paper" variant="secondary">모의</b-badge>
          <b-link :to="`/investDetail/${investGoods.investId}`" :title="investGoods.name">{{investGoods.name}}</b-link>
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
      <!-- close invest goods list end -->
    </div>
    <!-- mobile -->
    <div class="d-md-none">
      <b-row v-if="runningInvestGoodsList.length === 0">
        <b-col class="text-center pt-2 pb-2 market-text mb-2 text-nowrap">
          투자상품이 없습니다.
        </b-col>
      </b-row>
      <div v-for="(investGoods, index) in runningInvestGoodsList"
           :key="investGoods.key"
           class="text-center bg-white pt-2 pb-2 border border-secondary market-text mb-2 text-nowrap cursor-pointer"
           @click="goDetail(investGoods.investId)">
        <b-row>
          <b-col class="ml-1 mt-1">{{investGoods.coinUnit.toUpperCase()}}/{{investGoods.baseUnit.toUpperCase()}}</b-col>
          <b-col class="mt-1 text-ellipsis" style="overflow:hidden;">
            <b-badge v-if="!investGoods.paper" variant="primary">실전</b-badge>
            <b-badge v-if="investGoods.paper" variant="secondary">모의</b-badge>
            <b-link :to="`/investDetail/${investGoods.investId}`" :title="investGoods.name">{{investGoods.name}}</b-link>
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

      <!-- close invest goods list start -->
      <div v-for="(investGoods, index) in closeInvestGoodsList"
           v-if="isCloseGoodsComprise === true"
           :key="investGoods.key"
           class="text-center bg-light pt-2 pb-2 border border-secondary market-text mb-2 text-nowrap cursor-pointer"
           @click="goDetail(investGoods.investId)">
        <b-row>
          <b-col class="ml-1 mt-1">{{investGoods.coinUnit.toUpperCase()}}/{{investGoods.baseUnit.toUpperCase()}}</b-col>
          <b-col class="mt-1 text-ellipsis" style="overflow:hidden;">
            <b-link :to="`/investDetail/${investGoods.investId}`" :title="investGoods.name">{{investGoods.name}}</b-link>
            <b-badge v-if="!investGoods.paper" variant="primary">실전</b-badge>
            <b-badge v-if="investGoods.paper" variant="secondary">모의</b-badge>
          </b-col>
          <b-col>
            {{investGoods.exchange}}
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">
            <div class="progress-group-bars">
              <div class="progress progress-xs">
                <div class="progress-bar bg-secondary"
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
      <!-- close invest goods list end -->

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
  props: ['investGoodsList', 'isCloseGoodsComprise'],
  data () {
    return {
      runningInvestGoodsList: [],
      closeInvestGoodsList: [],
      isShowCloseInvestGoods: true
    }
  },
  computed: {},
  watch: {
    investGoodsList () {
      this.investGoodsList.map(o => {
        if (o.finished === true) {
          o.investDays = Math.floor(((new Date(o.endTime).getTime() - new Date(o.investTime).getTime()) / 1000 / 3600 / 24) + 1)
        } else {
          o.investDays = Math.floor(((new Date().getTime() - new Date(o.investTime).getTime()) / 1000 / 3600 / 24) + 1)
        }
        o.performanceSummary.equity = utils.comma(o.performanceSummary.equity)
        o.exchange = config.liveExchanges.filter(e => e.en.toUpperCase() === o.exchange.toUpperCase())[0].ko
      })
      this.runningInvestGoodsList = this.investGoodsList.filter(o => o.finished === false)
      this.closeInvestGoodsList = this.investGoodsList.filter(o => o.finished === true)
    }
  },
  methods: {
    goDetail (investId) {
      this.$router.push(`/investDetail/${investId}`)
    }
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
