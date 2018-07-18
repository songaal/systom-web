<template>
  <div style="position: relative; top: -297px; width:  100%; height: 273px; background-color: #585858b0;">
    <button class="btn btn-lg btn-primary btn-block btn-backtest"
            @click="createBackTestData">
      데이터 생성
    </button>
    거래소 {{exchange}} <br/>
    심볼 {{symbol}} <br/>
    시작일 {{startDate}} <br/>
    종료일 {{endDate}} <br/>
    모집금단위 {{cashUnit}} <br/>
    테스트기본 자금 {{cash}} <br/>
    전략아이디 {{strategyId}} <br/>
    버전 {{version}}
  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'name',
  extends: '',
  components: {},
  props: ['strategyId', 'version', 'exchange', 'symbol', 'startDate', 'endDate', 'cashUnit', 'cash'],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    createBackTestData () {
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
      let url = config.serverHost + '/' + config.serverVer + '/tasks'
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        let resultJson = response.data
        console.log(resultJson)
        // if (resultJson.status === 'success') {
        //
        //   this.handleProgress(3, 100)
        // } else {
        //   this.$vueOnToast.pop('warning', '실패', '테스트가 실패하였습니다.')
        //   this.handleProgress(0)
        // }
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
