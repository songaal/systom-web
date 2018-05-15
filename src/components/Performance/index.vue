<template lang="html">
  <div>
    <table class="table text-center">
      <tr>
        <th>초기투자금</th>
        <th>수익률</th>
        <th>최대수익률</th>
      </tr>
      <tr>
        <td class="font-weight-bold"><h5>{{capitalBase}} {{baseCurrency}}</h5></td>
        <td class="font-weight-bold"><h5>{{revenue}}%</h5></td>
        <td class="font-weight-bold"><h5>{{maxRevenue}}%</h5></td>
      </tr>
      <tr>
        <th>거래횟수</th>
        <th>최대 손실폭</th>
        <th>총 수수료</th>
      </tr>
      <tr>
        <td class="font-weight-bold"><h5>{{tradeCount}}</h5></td>
        <td class="font-weight-bold"><h5>{{LossRate}}%</h5></td>
        <td class="font-weight-bold"><h5>{{totalFee}}</h5></td>
      </tr>
    </table>
    <RevenueChart></RevenueChart>
  </div>
</template>

<script>
import RevenueChart from '../../components/Charts/RevenueChart'

export default {
  data () {
    return {
      capitalBase: '1.0',
      baseCurrency: 'BTC',
      revenue: '20',
      maxRevenue: '75',
      tradeCount: '13',
      LossRate: '10',
      totalFee: '1.3'
    }
  },
  components: {
    RevenueChart
  }
}
</script>

<style lang="css">
</style>
