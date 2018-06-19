<template>
  <div id="StrategyCard">
    <div class="d-sm-down-none">
      <b-row class="text-center market-text mb-2 ml-0 mr-0 text-nowrap">
        <b-col cols="2" size="md">심볼</b-col>
        <b-col cols="2" size="md">이름</b-col>
        <b-col cols="1" size="md">등급</b-col>
        <b-col cols="1" size="md">수익</b-col>
        <b-col cols="2" size="md">MDD</b-col>
        <b-col cols="1" size="md">손익비</b-col>
        <b-col cols="2" size="md">모집률</b-col>
        <b-col cols="1" size="md"></b-col>
      </b-row>

      <b-row class="text-center bg-light pt-1 pb-1 border border-secondary market-text mb-2 ml-0 mr-0 text-nowrap">
        <b-col cols="2" size="md" class="mt-1">BTC/USDT</b-col>
        <b-col cols="2" size="md" class="mt-1 text-ellipsis">무료전략입니다.</b-col>
        <b-col cols="1" size="md" class="mt-1"><span class="badge badge-pill badge-primary">A-</span></b-col>
        <b-col cols="1" size="md" class="mt-1">25.73%</b-col>
        <b-col cols="2" size="md" class="mt-1">50%</b-col>
        <b-col cols="1" size="md" class="mt-1">1.3</b-col>
        <b-col cols="2" size="md" class="mt-1">
          <div class="progress-group-header">
            <div class="text-muted small">
              <div class="float-left">
                2k/3k
              </div>
              <div class="text-right">
                (56%)
              </div>
            </div>
          </div>
          <div class="progress progress-xs bg-white">
            <div class="progress-bar bg-success"
                 role="progressbar"
                 style="width: 56%"
                 aria-valuenow="56"
                 aria-valuemin="0"
                 aria-valuemax="100">
            </div>
          </div>
        </b-col>
        <b-col cols="1" size="md" class="pl-2">
          <button class="btn btn-outline-primary">투자</button>
        </b-col>
      </b-row>


      <b-row class="text-center bg-light pt-1 pb-1 border border-secondary market-text mb-2 ml-0 mr-0 text-nowrap">
        <b-col cols="2" size="md" class="mt-1">BTC/USDT</b-col>
        <b-col cols="2" size="md" class="mt-1 text-ellipsis">무료전략입니다.</b-col>
        <b-col cols="1" size="md" class="mt-1"><span class="badge badge-pill badge-primary">A-</span></b-col>
        <b-col cols="1" size="md" class="mt-1">25.73%</b-col>
        <b-col cols="2" size="md" class="mt-1">50%</b-col>
        <b-col cols="1" size="md" class="mt-1">1.3</b-col>
        <b-col cols="2" size="md" class="mt-1">
          <div class="progress-group-header">
            <div class="text-muted small">
              <div class="float-left">
                2k/3k
              </div>
              <div class="text-right">
                (56%)
              </div>
            </div>
          </div>
          <div class="progress progress-xs bg-white">
            <div class="progress-bar bg-success"
                 role="progressbar"
                 style="width: 56%"
                 aria-valuenow="56"
                 aria-valuemin="0"
                 aria-valuemax="100">
            </div>
          </div>
        </b-col>
        <b-col cols="1" size="md" class="pl-2">
          <button class="btn btn-outline-primary">투자</button>
        </b-col>
      </b-row>
    </div>

    <div class="d-md-none">
      <div class="text-center bg-light pt-2 pb-2 border border-secondary market-text mb-2 text-nowrap">
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
              <div class="progress progress-xs bg-white">
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
          <b-col class="mt-2">수익률</b-col>
          <b-col class="mt-2">손익비</b-col>
          <b-col class="mt-2">MDD</b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2"><span class="badge badge-pill badge-primary">A-</span></b-col>
          <b-col class="mt-2">25.73%</b-col>
          <b-col class="mt-2">1.3</b-col>
          <b-col class="mt-2">50%</b-col>
        </b-row>
      </div>

      <div class="text-center bg-light pt-2 pb-2 border border-secondary market-text mb-2 text-nowrap">
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
              <div class="progress progress-xs bg-white">
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
          <b-col class="mt-2">수익률</b-col>
          <b-col class="mt-2">손익비</b-col>
          <b-col class="mt-2">MDD</b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2"><span class="badge badge-pill badge-primary">A-</span></b-col>
          <b-col class="mt-2">25.73%</b-col>
          <b-col class="mt-2">1.3</b-col>
          <b-col class="mt-2">50%</b-col>
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

</style>
