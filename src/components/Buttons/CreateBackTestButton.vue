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
        action: 'backtest',
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
      let url = config.serverHost + '/' + config.serverVer + '/goods/' + goodsId + '/actions'
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        let resultJson = response.data
        this.isCreate = true
        this.$emit('updateGoods', goodsId)
      }).catch((e) => {
        this.isCreate = true
        let message = {}
        if (e.response.data !== undefined && e.response.data.message === '[FAIL] Not Catch Performance') {
          message['500'] = {type: 'error', title: '실패', msg: '테스트결과가 없습니다.'}
        }
        if (e.response.data !== undefined && e.response.data.message === '[FAIL] Running BackTest.') {
          message['500'] = {type: 'error', title: '실패', msg: '전략이 정상 종료되지 않았습니다.'}
        }
        utils.httpFailNotify(e, this, message)
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
