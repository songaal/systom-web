<template>
  <div>
    <b-row>
      <b-col cols="6">
        <b-form-group
          label="거래소"
          label-for="exchangeSelect"
          :label-cols="1"
          :horizontal="true">
          <b-form-select value='Binance'
                        :options="['Binance']"
                        id="exchangeSelect"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group
          label="심볼"
          label-for="exchangeSelect"
          :label-cols="1"
          :horizontal="true">
          <b-form-select value='BTC/USDT'
                        :options="['BTC/USDT', 'ETH/BTC']"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <br />
    <div>
      <TradingView :tradeHistory="tradeHistory"
                   :exchange="exchange"
                   :symbol="symbol"
                   :timeInterval="timeInterval"
      />
    </div>
  </div>
</template>

<script>
import TradingView from './TradingViewChart'

export default {
  components: {
    TradingView
  },
  props: ['tradeHistory', 'requestBody'],
  data () {
    return {
      exchange: '',
      symbol: '',
      timeInterval: ''
    }
  },
  computed: {},
  watch: {
    requestBody () {
      let tmpTimeInterval = this.requestBody.timeInterval
      if (/[a-z]/gi.test(tmpTimeInterval)) {
        // 단위 있는 경우
        let interval = tmpTimeInterval.replace(/[^0-9]/gi, '')
        let unit = tmpTimeInterval.substring(tmpTimeInterval.length - 1).toUpperCase()
        if (interval === '1' && unit === 'D' && unit === 'W') {
          // 1일, 1주 단위만 전송
          this.timeInterval = unit
          return
        } else if (unit === 'T' || unit === 'M') {
          this.timeInterval = interval
        } else if (unit === 'H') {
          this.timeInterval = interval * 60
        } else if (unit === 'D') {
          this.timeInterval = interval * 60 * 24
        } else if (unit === 'W') {
          this.timeInterval = interval * 60 * 24 * 7
        }
      } else {
        // 단위 없는 경우
        this.timeInterval = tmpTimeInterval
      }
      this.exchange = this.requestBody.exchange
      this.symbol = this.requestBody.symbol
    }
  },
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
