<template>
  <div>
    <div class="d-sm-down-none">
      <b-row class="text-center market-text mb-2 ml-0 mr-0 text-nowrap">
        <b-col cols="1" size="md" class="goods-list-field">코인</b-col>
        <b-col cols="2" size="md" class="goods-list-field">이름</b-col>
        <b-col cols="1" size="md" class="goods-list-field">예상수익률</b-col>
        <b-col cols="1" size="md" class="goods-list-field">투자기간</b-col>
        <b-col cols="2" size="md" class="goods-list-field">모집현황</b-col>
        <b-col cols="2" size="md" class="goods-list-field">모집률</b-col>
        <b-col cols="2" size="md" class="goods-list-field">모집마감일</b-col>
        <b-col cols="1" size="md"></b-col>
      </b-row>

      <b-row class="text-center bg-white py-2 border border-secondary market-text mb-3 ml-0 mr-0 text-nowrap">
        <b-col cols="1" size="md" class="market-strategy">BTC</b-col>
        <b-col cols="2" size="md" class="market-strategy text-ellipsis">
          <b-link to="/investGoods/1">변동성돌파전략</b-link>
        </b-col>
        <b-col cols="1" size="md" class="market-strategy">11.5%</b-col>
        <b-col cols="1" size="md" class="market-strategy">30일</b-col>
        <b-col cols="2" size="md" class="market-strategy">5.3K / 5K</b-col>
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
          <span>56%</span>
        </b-col>
        <b-col cols="2" size="md" class="market-strategy">2018.06.30</b-col>

        <b-col cols="1" size="md" class="pl-0">

          <!-- <b-link class="btn btn-outline-primary" to="/investGoods/1/apply">투자</b-link> -->

          <!-- 관리자 메뉴 -->
          <b-link class="btn btn-outline-primary" to="/investGoods/1/apply">공개</b-link>
          <!-- <b-link class="btn btn-outline-danger" to="/investGoods/1/apply">숨김</b-link> -->
          <!--
          <b-dropdown split
                      variant="outline-primary"
          >
            <template slot="button-content">
              보이기
            </template>
            <b-dropdown-item >
              감추기
            </b-dropdown-item>
          </b-dropdown> -->
          <!-- 관리자 메뉴 끝 -->
        </b-col>


      </b-row>

      <b-row class="text-center bg-white py-2 border border-secondary market-text mb-3 ml-0 mr-0 text-nowrap">
        <b-col cols="1" size="md" class="market-strategy">BTC</b-col>
        <b-col cols="2" size="md" class="market-strategy text-ellipsis">
          <b-link to="/investGoods/1">변동성돌파전략</b-link>
        </b-col>
        <b-col cols="1" size="md" class="market-strategy">15.73%</b-col>
        <b-col cols="1" size="md" class="market-strategy">60 일</b-col>
        <b-col cols="2" size="md" class="market-strategy">1.2K / 5K</b-col>
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
          <span>56%</span>
        </b-col>
        <b-col cols="2" size="md" class="market-strategy">2018.07.15</b-col>
        <b-col cols="1" size="md" class="pl-0">
          <!-- <b-link class="btn btn-outline-primary" to="/investGoods/1/apply">투자</b-link> -->
          <b-link class="btn btn-outline-danger" to="/investGoods/1/apply">숨김</b-link>
        </b-col>
      </b-row>
    </div>




    <div class="d-md-none">
      <div class="text-center bg-white pt-2 pb-2 border border-secondary market-text mb-2 text-nowrap">
        <b-row>
          <b-col class="ml-1 mt-1">BTC</b-col>
          <b-col class="mt-1 text-ellipsis">
            <b-link to="/investGoods/1">변동성돌파전략</b-link>
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
          <b-col class="mt-2">예상수익률</b-col>
          <b-col class="mt-2">투자기간</b-col>
          <b-col class="mt-2">모집마감일</b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">11.5%</b-col>
          <b-col class="mt-2">30 일</b-col>
          <b-col class="mt-2">2018.06.30</b-col>
        </b-row>
      </div>

      <div class="text-center bg-white pt-2 pb-2 border border-secondary market-text mb-2 text-nowrap">
        <b-row>
          <b-col class="ml-1 mt-1">BTC</b-col>
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
          <b-col class="mt-2">예상수익률</b-col>
          <b-col class="mt-2">기간</b-col>
          <b-col class="mt-2">모집마강일</b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">5.73%</b-col>
          <b-col class="mt-2">60 일</b-col>
          <b-col class="mt-2">2018.06.30</b-col>
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
.goods-list-field {
  cursor: default;
}
</style>
