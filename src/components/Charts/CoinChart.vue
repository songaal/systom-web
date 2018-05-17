<template lang="html">
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
