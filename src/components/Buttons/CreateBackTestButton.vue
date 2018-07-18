<template>
  <div style="position: relative; top: -297px; width:  100%; height: 273px; background-color: #585858b0;">
    <button class="btn btn-lg btn-primary btn-block btn-backtest"
            @click="createBackTestData">
      데이터 생성
    </button>
  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'CreateBackTestButton',
  extends: '',
  components: {},
  props: ['strategyId', 'version', 'exchange', 'symbol', 'startDate', 'endDate', 'cashUnit', 'cash'],
  data () {
    return {
      isCreate: true
    }
  },
  computed: {},
  watch: {},
  methods: {
    createBackTestData () {
      if (!this.isCreate) {
        return false
      }
      this.isCreate = false
      let body = {
        strategyId: this.strategyId,
        version: this.version,
        exchange: this.exchange,
        coinUnit: this.symbol.replace('_', '/').split('/')[0],
        baseUnit: this.symbol.replace('_', '/').split('/')[1],
        cashUnit: this.cashUnit,
        cash: this.cash,
        startDate: this.startDate,
        endDate: this.endDate
      }
      let goodsId = this.$route.params.goodsId
      let url = config.serverHost + '/' + config.serverVer + '/goods/' + goodsId + '/backTest'
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        let resultJson = response.data
        this.isCreate = true
        this.$emit('updateGoods', goodsId)
      }).catch((e) => {
        this.handleProgress(0)
        utils.httpFailNotify(e, this)
      })
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
.btn-backtest {
  position: relative;
  top: 40%;
  width:  80%;
  text-align: center;
  height: 30%;
  left: 10%;
}
</style>
