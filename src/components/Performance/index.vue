<template>
  <div>

    <b-row>
      <b-col>
        <table class="table text-center table-bordered">
          <tr>
            <th rowspan="2">
              <span class="emphasis-font">{{perfData.symbol}}</span>
              <p>{{perfData.exchange}}</p>
            </th>
            <th>기간</th>
            <td> {{perfData.days}} </td>
          </tr>
          <tr>
            <th>날짜</th>
            <td> {{perfData.start}} ~ {{perfData.end}} </td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="table text-center table-bordered">
          <tr>
            <th rowspan="2">
              <span class="emphasis-font">{{perfData.total_equity}} <sub>BTC</sub></span>
              <p>($ {{perfData.total_equity_usd}} )</p>
              <span>총 자산</span>
            </th>
            <th>초기자산</th>
            <td>1.0 BTC</td>
          </tr>
          <tr>
            <th>수수료</th>
            <td> {{perfData.total_commission}} </td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="table text-center table-bordered">
          <tr>
            <th>
              <span class="emphasis-font">{{perfData.return_pct}} %</span>
              <p>수익률</p>
            </th>
            <th>최대수익</th>
            <td>{{perfData.max_return_pct}} %</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="table text-center table-bordered">
          <tr>
            <th rowspan="3">
              <span class="emphasis-font">{{perfData.wins_pct}} %</span>
              <p>승률</p>
            </th>
            <th>거래횟수</th>
            <td>{{perfData.trades}}</td>
          </tr>
          <tr>
            <th>이익횟수</th>
            <td>{{perfData.wins_count}}</td>
          </tr>
          <tr>
            <th>손해횟수</th>
            <td>{{perfData.lose_count}}</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="table text-center table-bordered">
          <tr>
            <th rowspan="2">
              <span class="emphasis-font">{{perfData.pnl_rate}}</span>
              <p>손익비</p>
            </th>
            <th>평균수익</th>
            <td>{{perfData.wins_return_avg}} %</td>
          </tr>
          <tr>
            <th>평균손실</th>
            <td>{{perfData.lose_return_avg}} %</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="table text-center table-bordered">
          <tr>
            <th>
              <span class="emphasis-font">{{perfData.max_drawdown_pct}} %</span>
              <p>최대손실</p>
            </th>
            <th>최대손실기간</th>
            <td>{{perfData.max_drawdown_duration}}</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h5>수익</h5>
        <RevenueChart :revenues="perfData.equity"></RevenueChart>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h5>손실</h5>
        <DrawdownChart :drawdowns="perfData.drawdowns"></DrawdownChart>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h5>거래이력</h5>
        <historyTable></historyTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RevenueChart from '../Charts/RevenueChart'
import DrawdownChart from '../Charts/DrawdownChart'
import historyTable from '../SimulationHistory/HistoryTable'

export default {
  name: 'PerformanceForm',
  extends: '',
  components: {
    RevenueChart,
    DrawdownChart,
    historyTable
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
table th:first-child {
  width: 30%;
}
table th:nth-child(2) {
  width: 30%;
}
table th {
  font-size: 12pt;
  font-weight: bold;
  vertical-align: middle;
}
table td {
  vertical-align: middle;
}
.emphasis-font {
  font-size: 14pt;
}
</style>
