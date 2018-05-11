<template lang="html">
  <div>
    <b-row class="text-center">
      <b-col cols="1">
        <label class="col-form-label">거래소</label>
      </b-col>
      <b-col  cols="5">
        <b-form-select value='Binance'
                      :options="['Binance', 'Poloniex', 'Bittrex', 'Bitfinex', 'Okcoin']">
        </b-form-select>
      </b-col>
      <b-col  cols="1">
        <label class="col-form-label">심볼</label>
      </b-col>
      <b-col  cols="5">
        <b-form-select value='BTC/USDT'
                      :options="['BTC/USDT', 'ETH/BTC']">
        </b-form-select>
      </b-col>
    </b-row>

    <br />
    <div>
      <TradingView :height='height'
                   :orders='orders'
                   :coin='coin'
                   :base='base'
                   :interval='interval'
      />
    </div>
  </div>
</template>

<script>
import TradingView from './TradingViewChart'
export default {
  props: ['height', 'orders', 'coin', 'base', 'interval'],
  data: {
  },
  components: {
    TradingView
  }
}
</script>

<style lang="css">
</style>
