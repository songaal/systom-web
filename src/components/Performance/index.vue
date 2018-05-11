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
        <td class="font-weight-bold"><h5>{{LossRate}}</h5></td>
        <td class="font-weight-bold"><h5>{{totalFee}}</h5></td>
      </tr>
    </table>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
