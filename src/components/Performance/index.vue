<template>
  <div>
    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th rowspan="2">
              <div class="emphasis-font">{{perfData.request.formatSymbol}}</div>
              <div>{{perfData.request.exchange}}</div>
            </th>
            <th>기간</th>
            <td> {{perfData.request.days}} 일</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td> {{perfData.request.startDate}} ~ {{perfData.request.endDate}} </td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th rowspan="2">
              <div :class="`emphasis-font text-${textColors.totalEquity}`">{{perfData.result.total_equity}} <sub>{{perfData.request.cashUnit}}</sub></div>
              <div :class="`text-${textColors.totalEquity}`">($ {{perfData.result.total_equity_usd}} )</div>
              <div>총 자산</div>
            </th>
            <th>초기자산</th>
            <td>{{perfData.request.cash}} {{perfData.request.cashUnit}}</td>
          </tr>
          <tr>
            <th>수수료</th>
            <td><span class="text-danger">{{perfData.result.total_commission}} {{perfData.request.baseUnit}}</span></td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th>
              <div :class="`emphasis-font text-${textColors.returnPct}`">{{perfData.result.return_pct}} %</div>
              <div>수익률</div>
            </th>
            <th>최대수익</th>
            <td :class="`text-${textColors.maxReturnPct}`">{{perfData.result.max_return_pct}} %</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th rowspan="3">
              <div :class="`emphasis-font text-${textColors.winsPct}`">{{perfData.result.wins_pct}} %</div>
              <div>승률</div>
            </th>
            <th>거래횟수</th>
            <td>{{perfData.result.trades}}</td>
          </tr>
          <tr>
            <th>이익횟수</th>
            <td class="text-success">{{perfData.result.wins_count}}</td>
          </tr>
          <tr>
            <th>손해횟수</th>
            <td class="text-danger">{{perfData.result.lose_count}}</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th rowspan="2">
              <div :class="`emphasis-font text-${textColors.pnlRate}`">{{perfData.result.pnl_rate}}</div>
              <div>손익비</div>
            </th>
            <th>평균수익</th>
            <td>{{perfData.result.wins_return_avg}} %</td>
          </tr>
          <tr>
            <th>평균손실</th>
            <td>{{perfData.result.lose_return_avg}} %</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th>
              <div class="emphasis-font text-danger">{{perfData.result.max_drawdown_pct}} %</div>
              <div>최대손실</div>
            </th>
            <th>최대손실기간</th>
            <td class="text-danger">{{perfData.result.max_drawdown_duration}}</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h5>수익</h5>
        <RevenueChart :revenues="perfData.result.cum_returns"
                      :fromDate="perfData.request.startDate"
                      :toDate="perfData.request.endDate"
                      isTest="true"
        />
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h5>손실</h5>
        <DrawdownChart :drawdowns="perfData.result.drawdowns"
                       :fromDate="perfData.request.startDate"
                       :toDate="perfData.request.endDate"
                       isTest="true"
        />
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h5>거래이력</h5>
        <HistoryTable type="backTest"
                      :trade_history="perfData.result.trade_history"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RevenueChart from '../Charts/RevenueChart'
import DrawdownChart from '../Charts/DrawdownChart'
import HistoryTable from '../Tables/HistoryTable'

export default {
  name: 'PerformanceForm',
  extends: '',
  components: {
    RevenueChart,
    DrawdownChart,
    HistoryTable
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
  created () {
    this.perfData.request.formatSymbol = this.perfData.request.symbol.replace('_', '/').toUpperCase()
    this.$store.state.coinChart.tradeHistory = Object.assign([], this.perfData.result.trade_history)
  },
  beforeMount () {},
  mounted () {
    if (Number(this.perfData.result.total_equity) <= 1.0) {
      this.textColors.TotalEquity = 'danger'
    }
    if (Number(this.perfData.result.return_pct) <= 1.0) {
      this.textColors.returnPct = 'danger'
    }
    if (Number(this.perfData.result.wins_pct) <= 50) {
      this.textColors.winsPct = 'danger'
    }
    if (Number(this.perfData.result.pnl_rate) <= 1.0) {
      this.textColors.pnlRate = 'danger'
    }
    if (Number(this.perfData.result.max_return_pct) <= 1.0) {
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
