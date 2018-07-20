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
              <div :class="`emphasis-font text-${textColors.totalEquity}`">
                {{perfData.result.portfolio_stat.equity.toFixed(0)}}
                <!-- <sub>{{perfData.result.portfolio_stat.cash_unit.toUpperCase()}}</sub> -->
              </div>
              <!-- <div :class="`text-${textColors.totalEquity}`">($ {{perfData.result.total_equity_usd}} )</div> -->
              <div>총 자산</div>
            </th>
            <th>초기자산</th>
            <td>{{perfData.result.portfolio_stat.init_cash}} {{perfData.result.portfolio_stat.cash_unit.toUpperCase()}}</td>
          </tr>
          <tr>
            <th>수수료</th>
            <td>
              <!-- this.perfData.result.portfolio_stat.convertTotalCommission -->
              <ul class="list-group list-group-flush">
                <li v-for="coin in Object.keys(perfData.result.portfolio_stat.convertTotalCommission)"
                    :key="coin.id"
                    class="list-group-item">
                  <span v-if="coin.toLowerCase() === 'usdt'" class="text-danger">
                    {{perfData.result.portfolio_stat.convertTotalCommission[coin].toFixed(2)}} {{coin.toUpperCase()}}
                  </span>
                  <span v-if="coin.toLowerCase() !== 'usdt'" class="text-danger">
                    {{perfData.result.portfolio_stat.convertTotalCommission[coin].toFixed(8)}} {{coin.toUpperCase()}}
                  </span>
                </li>
              </ul>
              <!-- <span class="text-danger">{{perfData.result.portfolio_stat.total_commission}} {{perfData.request.baseUnit}}</span> -->
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th>
              <div :class="`emphasis-font text-${textColors.returnPct}`">{{perfData.result.returns_pct}} %</div>
              <div>수익률</div>
            </th>
            <th>최대수익</th>
            <td :class="`text-${textColors.maxReturnPct}`">{{perfData.result.max_returns_pct.toFixed(2)}} %</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th rowspan="3">
              <div :class="`emphasis-font text-${textColors.winsPct}`">{{perfData.result.trade_stat.win_rate * 100}} %</div>
              <div>승률</div>
            </th>
            <th>거래횟수</th>
            <td>{{perfData.result.trade_stat.trade_count}}</td>
          </tr>
          <tr>
            <th>이익횟수</th>
            <td class="text-success">{{perfData.result.trade_stat.win_count}}</td>
          </tr>
          <tr>
            <th>손해횟수</th>
            <td class="text-danger">{{perfData.result.trade_stat.lose_count}}</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th rowspan="2">
              <div :class="`emphasis-font text-${textColors.pnlRate}`">{{perfData.result.trade_stat.pnl_rate}}</div>
              <div>손익비</div>
            </th>
            <th>평균수익</th>
            <td>{{perfData.result.trade_stat.formatProfitAvg}} %</td>
          </tr>
          <tr>
            <th>평균손실</th>
            <td>{{perfData.result.trade_stat.formatLossAvg}} %</td>
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
    this.perfData.result.trade_stat.formatProfitAvg = Number(this.perfData.result.trade_stat.profit_rate_avg * 100).toFixed(0)
    this.perfData.result.trade_stat.formatLossAvg = Number(this.perfData.result.trade_stat.loss_rate_avg * 100).toFixed(0)
    let totalCommission = {}
    try {
      totalCommission = JSON.parse(this.perfData.result.portfolio_stat.total_commission)
    } catch (e) {
      console.log('parse fail', e)
    }
    this.perfData.result.portfolio_stat.convertTotalCommission = totalCommission
  },
  beforeMount () {},
  mounted () {
    if (Number(this.perfData.result.portfolio_stat.equity) <= 1.0) {
      this.textColors.TotalEquity = 'danger'
    }
    if (Number(this.perfData.result.returns_pct) <= 1.0) {
      this.textColors.returnPct = 'danger'
    }
    if (Number(this.perfData.result.trade_stat.win_rate) * 100 <= 50) {
      this.textColors.winsPct = 'danger'
    }
    if (Number(this.perfData.result.trade_stat.pnl_rate) <= 1.0) {
      this.textColors.pnlRate = 'danger'
    }
    if (Number(this.perfData.result.max_returns_pct) <= 1.0) {
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
