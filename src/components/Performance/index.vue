<template>
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
    <b-row>
      <b-col>
        <h5>수익</h5>
        <RevenueChart :returns="perfData.returns"></RevenueChart>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h5>손실</h5>
        <DrawdownChart :drawdowns="perfData.drawdowns"></DrawdownChart>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RevenueChart from '../Charts/RevenueChart'
import DrawdownChart from '../Charts/DrawdownChart'

export default {
  name: 'PerformanceForm',
  extends: '',
  components: {
    RevenueChart,
    DrawdownChart
  },
  props: ['perfData'],
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
  computed: {},
  watch: {},
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
