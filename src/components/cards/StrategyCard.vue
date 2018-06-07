<template>
  <div class="strategyCard">
    <b-card border-variant="info"
            header-bg-variant="info"
            footer-bg-variant="light">
      <h5 slot="header" v-if="level !== undefined">{{level}} 등</h5>
      <b-row>
        <b-col class="text-nowrap">
          <h5>
            <span>이동평균전략</span>
          </h5>
          <div>
            <i class="fa fa-tags fa-md mt-1"></i>
            <span>13</span>
          </div>
        </b-col>
        <b-col>
        <div>
          <i class="fa fa-shopping-cart fa-md mt-2"></i>
          <span>99 판매</span>
        </div>

        <div>
          <i class="fa fa-krw fa-md mt-2"></i>
          <span class="text-info">1.5 코인</span>
        </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="mt-2">
            <p class="text-justify mb-0 descbox">
              수익 발생하는 전략! 테스트 소개. 수익 발생하는 전략! 테스트 소개수익 발생하는 전략! 테스트 소개
              수익 발생하는 전략! 테스트 소개<br/>
              수익 발생하는 전략! 테스트 소개. 수익 발생하는 전략! 테스트 소개수익 발생하는 전략! 테스트 소개
            </p>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-3 text-right">
          <button class="btn btn-sm btn-outline-dark mr-1">백테스트</button>
          <button class="btn btn-sm btn-outline-primary">구매하기</button>
        </b-col>
      </b-row>
      <template slot="footer">
        <b-row>
          <b-col class="text-center">
            <div>
              수익률
            </div>
            <div class="mt-1 text-success">45%</div>
          </b-col>
          <b-col class="text-center">
            <div>
              손익비
            </div>
            <div class="mt-1">0.7</div>
          </b-col>
          <b-col class="text-center">
            <div>
              MDD
            </div>
            <div class="mt-1">15%</div>
          </b-col>
        </b-row>

      </template>
    </b-card>
  </div>
</template>

<script>
import Rating from '../Rating'

export default {
  name: 'StrategyCard',
  extends: '',
  components: {
    Rating
  },
  props: ['level'],
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
.descbox {
  height: 150px;
  overflow-y: auto;
}
</style>
