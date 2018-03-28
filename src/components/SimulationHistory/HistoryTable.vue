<template>
  <b-card>
    <div>
      <h5 class="lead">History</h5>
      <br />
      <b-table striped hover :items="items"></b-table>
    </div>
  </b-card>
</template>

<script>

const items = [
  { Action: 'Sell', Time: '2018/01/01 03:25:00', Order_Type: 'Stop', Type: 'Short', Price_ETH_in_BTC: 0.05905971, Profit: '-', Asset: 'ETH/BTC' },
  { Action: 'Buy', Time: '2018/01/01 03:27:00', Order_Type: 'Limit', Type: 'Short', Price_ETH_in_BTC: 1.05905971, Profit: '+5.35%', Asset: 'ETH/BTC' },
  { Action: 'Sell', Time: '2018/01/01 03:20:00', Order_Type: 'Stop', Type: 'Short', Price_ETH_in_BTC: 0.05905971, Profit: '-', Asset: 'ETH/BTC' },
  { Action: 'Buy', Time: '2018/01/01 03:37:00', Order_Type: 'Limit', Type: 'Short', Price_ETH_in_BTC: 1.02345971, Profit: '-0.35%', Asset: 'ETH/BTC' }
]

export default {
  data () {
    return {
      items: items
    }
  }
}
</script>
