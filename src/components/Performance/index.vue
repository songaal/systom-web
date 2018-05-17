<template lang="html">
  <div>
    <b-row>
      <b-col>
        <table class="table text-center table-bordered">
          <tr>
            <th class="font-weight-bold">거래 횟수</th>
            <th class="font-weight-bold">Win</th>
            <td class="text-success">17</td>
          </tr>
          <tr>
            <td rowspan="2" class="align-middle"><h2>61</h2></td>
            <th class="font-weight-bold">Lose</th>
            <td class="text-danger">13</td>
          </tr>
          <tr>
            <th class="font-weight-bold">Safety</th>
            <td>3</td>
          </tr>
        </table>
      </b-col>
      <b-col>
        <table class="table table-bordered text-center">
          <tr>
            <th class="font-weight-bold">승률</th>
            <th class="font-weight-bold">최대 이익</th>
            <td class="text-success">48.41 %</td>
          </tr>
          <tr>
            <td rowspan="1" class="align-middle"><h2>56.67 %</h2></td>
            <th class="font-weight-bold">최대 손실</th>
            <td class="text-danger">-4.89 %</td>
          </tr>
        </table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <table class="table table-bordered text-center">
          <tr>
            <th class="font-weight-bold">총 자산</th>
            <th class="font-weight-bold">초기투자금</th>
            <td>1,000,000 KRW</td>
          </tr>
          <tr>
            <td rowspan="3" class="align-middle"><h2>5,983,712 <br /> KRW</h2></td>
            <th class="font-weight-bold">수익률</th>
            <td class="text-success">498.37 %</td>
          </tr>
          <tr>
            <th class="font-weight-bold">수수료</th>
            <td>196.947 KRW</td>
          </tr>
          <tr>
            <th class="font-weight-bold">슬리피지 비율</th>
            <td>0.15 %</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <table class="table text-center">
      <!-- <tr>
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
      <tr>
        <th>승률</th>
        <th>슬리피지 비율</th>
        <th>총 자산</th>
      </tr>
      <tr>
        <td class="font-weight-bold"><h5>56.67%</h5></td>
        <td class="font-weight-bold"><h5>0.15%</h5></td>
        <td class="font-weight-bold"><h5>5.983.712</h5></td>
      </tr>
      <tr>
        <th>WIN</th>
        <th>LOSE</th>
        <th>Safety</th>
      </tr>
      <tr>
        <td class="font-weight-bold"><h5>17</h5></td>
        <td class="font-weight-bold"><h5>13</h5></td>
        <td class="font-weight-bold"><h5>3</h5></td>
      </tr> -->

    </table>
    <RevenueChart></RevenueChart>
  </div>
</template>

<script>
import RevenueChart from '../Charts/RevenueChart'

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
