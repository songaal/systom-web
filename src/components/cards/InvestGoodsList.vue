<template>
  <div id="StrategyCard">
    <div class="d-sm-down-none">
      <b-row class="text-center market-text mb-2 ml-0 mr-0 text-nowrap">
        <b-col cols="1" size="md">심볼</b-col>
        <b-col cols="2" size="md">이름</b-col>
        <b-col cols="1" size="md">예상수익</b-col>
        <b-col cols="1" size="md">등급</b-col>
        <b-col cols="1" size="md">기간</b-col>
        <b-col cols="1" size="md">최소금액</b-col>
        <b-col cols="2" size="md">참여현황</b-col>
        <b-col cols="2" size="md">참여율</b-col>
        <b-col cols="1" size="md"></b-col>
      </b-row>

      <b-row class="text-center bg-white py-2 border border-secondary market-text mb-3 ml-0 mr-0 text-nowrap">
        <b-col cols="1" size="md" class="market-strategy">BTC/USDT</b-col>
        <b-col cols="2" size="md" class="market-strategy text-ellipsis">
          <b-link to="/investGoods/1">변동성돌파전략</b-link>
        </b-col>
        <b-col cols="1" size="md" class="market-strategy">25.73%</b-col>
        <b-col cols="1" size="md" class="market-strategy">
          <span class="badge badge-pill badge-primary">A-</span>
        </b-col>
        <b-col cols="1" size="md" class="market-strategy">3개월</b-col>
        <b-col cols="1" size="md" class="market-strategy">500 만원</b-col>
        <b-col cols="2" size="md" class="market-strategy">
          3000만원 / 5000만원
        </b-col>
        <b-col cols="2" size="md" class="market-strategy">
          <div class="progress progress-xs mr-2 ml-1" style="width: 65%; display: inline-block; margin-bottom: 3px;">
            <div class="progress-bar bg-success"
                 role="progressbar"
                 style="width: 56%; display:list-item; height:4px;"
                 aria-valuenow="56"
                 aria-valuemin="0"
                 aria-valuemax="100">
            </div>
          </div>
          <span>
            56%
          </span>
        </b-col>
        <b-col cols="1" size="md" class="pl-2">
          <button class="btn btn-outline-primary ">투자</button>
        </b-col>
      </b-row>

      <b-row class="text-center bg-white py-2 border border-secondary market-text mb-3 ml-0 mr-0 text-nowrap">
        <b-col cols="1" size="md" class="market-strategy">BTC/USDT</b-col>
        <b-col cols="2" size="md" class="market-strategy text-ellipsis">
          <b-link to="/investGoods/1">변동성돌파전략</b-link>
        </b-col>
        <b-col cols="1" size="md" class="market-strategy">25.73%</b-col>
        <b-col cols="1" size="md" class="market-strategy">
          <span class="badge badge-pill badge-primary">A-</span>
        </b-col>
        <b-col cols="1" size="md" class="market-strategy">1 개월</b-col>
        <b-col cols="1" size="md" class="market-strategy">10 만원</b-col>
        <b-col cols="2" size="md" class="market-strategy">
          100만원 / 500만원
        </b-col>
        <b-col cols="2" size="md" class="market-strategy">
          <div class="progress progress-xs mr-2 ml-1" style="width: 65%; display: inline-block; margin-bottom: 3px;">
            <div class="progress-bar bg-success"
                 role="progressbar"
                 style="width: 56%; display:list-item; height:4px;"
                 aria-valuenow="56"
                 aria-valuemin="0"
                 aria-valuemax="100">
            </div>
          </div>
          <span>
            56%
          </span>
        </b-col>
        <b-col cols="1" size="md" class="pl-2">
          <button class="btn btn-outline-primary ">투자</button>
        </b-col>
      </b-row>


    </div>





    <div class="d-md-none">
      <div class="text-center bg-white pt-2 pb-2 border border-secondary market-text mb-2 text-nowrap">
        <b-row>
          <b-col class="ml-1 mt-1">BTC/USDT</b-col>
          <b-col class="mt-1 text-ellipsis">
            <b-link to="/investGoods/1">무료 전략입니다.</b-link>
          </b-col>
          <b-col>
            <button class="btn btn-outline-primary">투자</button>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">
            <div class="progress-group-bars">
              <div class="progress progress-xs">
                <div class="progress-bar bg-success"
                     role="progressbar"
                     style="width: 56%"
                     aria-valuenow="56"
                     aria-valuemin="0"
                     aria-valuemax="100">
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">예상수익</b-col>
          <b-col class="mt-2">등급</b-col>
          <b-col class="mt-2">기간</b-col>
          <b-col class="mt-2">최소금액</b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">25.73%</b-col>
          <b-col class="mt-2">
            <span class="badge badge-pill badge-primary">A-</span>
          </b-col>
          <b-col class="mt-2">3 개월</b-col>
          <b-col class="mt-2">500 만원</b-col>
        </b-row>
      </div>

      <div class="text-center bg-white pt-2 pb-2 border border-secondary market-text mb-2 text-nowrap">
        <b-row>
          <b-col class="ml-1 mt-1">BTC/USDT</b-col>
          <b-col class="mt-1 text-ellipsis">무료 전략입니다.</b-col>
          <b-col>
            <button class="btn btn-outline-primary">투자</button>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">
            <div class="progress-group-bars">
              <div class="progress progress-xs">
                <div class="progress-bar bg-success"
                     role="progressbar"
                     style="width: 56%"
                     aria-valuenow="56"
                     aria-valuemin="0"
                     aria-valuemax="100">
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">등급</b-col>
          <b-col class="mt-2">예상수익</b-col>
          <b-col class="mt-2">기간</b-col>
          <b-col class="mt-2">최소금액</b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">
            <span class="badge badge-pill badge-primary">A-</span>
          </b-col>
          <b-col class="mt-2">25.73%</b-col>
          <b-col class="mt-2">1 개월</b-col>
          <b-col class="mt-2">10만원</b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StrategyCard',
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
.market-strategy {
  line-height: 40px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
