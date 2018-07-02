<template>
  <div>
    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th rowspan="2">
              <div class="emphasis-font">{{perfData.symbol}}</div>
              <div>{{perfData.exchange}}</div>
            </th>
            <th>기간</th>
            <td> {{perfData.days}} 일</td>
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
        <table class="perf table text-center table-bordered">
          <tr>
            <th rowspan="2">
              <div :class="`emphasis-font text-${textColors.totalEquity}`">{{perfData.total_equity}} <sub>{{perfData.base}}</sub></div>
              <div :class="`text-${textColors.totalEquity}`">($ {{perfData.total_equity_usd}} )</div>
              <div>총 자산</div>
            </th>
            <th>초기자산</th>
            <td>1.0 {{perfData.base}}</td>
          </tr>
          <tr>
            <th>수수료</th>
            <td><span class="text-danger">{{perfData.total_commission}} {{perfData.base}}</span></td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th>
              <div :class="`emphasis-font text-${textColors.returnPct}`">{{perfData.return_pct}} %</div>
              <div>수익률</div>
            </th>
            <th>최대수익</th>
            <td :class="`text-${textColors.maxReturnPct}`">{{perfData.max_return_pct}} %</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th rowspan="3">
              <div :class="`emphasis-font text-${textColors.winsPct}`">{{perfData.wins_pct}} %</div>
              <div>승률</div>
            </th>
            <th>거래횟수</th>
            <td>{{perfData.trades}}</td>
          </tr>
          <tr>
            <th>이익횟수</th>
            <td class="text-success">{{perfData.wins_count}}</td>
          </tr>
          <tr>
            <th>손해횟수</th>
            <td class="text-danger">{{perfData.lose_count}}</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th rowspan="2">
              <div :class="`emphasis-font text-${textColors.pnlRate}`">{{perfData.pnl_rate}}</div>
              <div>손익비</div>
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
        <table class="perf table text-center table-bordered">
          <tr>
            <th>
              <div class="emphasis-font text-danger">{{perfData.max_drawdown_pct}} %</div>
              <div>최대손실</div>
            </th>
            <th>최대손실기간</th>
            <td class="text-danger">{{perfData.max_drawdown_duration}}</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h5>수익</h5>
        <RevenueChart :revenues="perfData.cum_returns"></RevenueChart>
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
        <historyTable type="tradeHistory" :trade_history="perfData.trade_history"></historyTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RevenueChart from '../Charts/RevenueChart'
import DrawdownChart from '../Charts/DrawdownChart'
import historyTable from '../Tables/HistoryTable'

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
      textColors: {
        totalEquity: 'success',
        returnPct: 'success',
        winsPct: 'success',
        pnlRate: 'success',
        maxReturnPct: 'success'
      }
    }
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    if (Number(this.perfData.total_equity) <= 1.0) {
      this.textColors.TotalEquity = 'danger'
    }
    if (Number(this.perfData.return_pct) <= 1.0) {
      this.textColors.returnPct = 'danger'
    }
    if (Number(this.perfData.wins_pct) <= 50) {
      this.textColors.winsPct = 'danger'
    }
    if (Number(this.perfData.pnl_rate) <= 1.0) {
      this.textColors.pnlRate = 'danger'
    }
    if (Number(this.perfData.max_return_pct) <= 1.0) {
      this.textColors.maxReturnPct = 'danger'
    }
  },
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>
table.perf th:first-child {
  width: 30%;
}
table.perf th:nth-child(2) {
  width: 30%;
}
table.perf th {
  font-size: 12pt;
  font-weight: bold;
  vertical-align: middle;
}
table.perf td {
  vertical-align: middle;
}
table.perf emphasis-font {
  font-size: 14pt;
}
</style>
