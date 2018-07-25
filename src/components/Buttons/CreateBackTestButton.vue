<template>
  <div style="position: relative; top: -297px; width:  100%; height: 273px; background-color: #585858b0;">
    <button class="btn btn-lg btn-primary btn-block btn-backtest"
            @click="createBackTestData"
            :disabled="!isCreate"
    >
      <span :class="{'d-none': !isCreate}">데이터 생성</span>
      <b-button-spinner :class="{'d-none': isCreate}" size="large"></b-button-spinner>
    </button>
  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'CreateBackTestButton',
  extends: '',
  components: {
    'b-button-spinner': Spinner
  },
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
        sessionType: 'backtest',
        strategyId: this.strategyId,
        version: this.version,
        exchange: this.exchange,
        coinUnit: this.symbol.replace('_', '/').split('/')[0],
        baseUnit: this.symbol.replace('_', '/').split('/')[1],
        cashUnit: this.cashUnit,
        cash: this.cash,
        startDate: this.startDate,
        endDate: this.endDate + ' 23:59:59'
      }
      let goodsId = this.$route.params.goodsId
      let url = config.serverHost + '/' + config.serverVer + '/goods/' + goodsId + '/actions'
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
