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
                {{perfData.result.portfolioStat.equity.toFixed(0)}}
              </div>
              <div>총 자산</div>
            </th>
            <th>초기자산</th>
            <td>{{perfData.result.portfolioStat.initCash}} {{perfData.result.portfolioStat.cashUnit.toUpperCase()}}</td>
          </tr>
          <tr>
            <th>수수료</th>
            <td>
              <ul class="list-group list-group-flush">
                <li v-for="coin in Object.keys(perfData.result.portfolioStat.convertTotalCommission)"
                    :key="coin.id"
                    class="list-group-item pl-0 pr-0">
                  <span class="text-danger">
                    {{perfData.result.portfolioStat.convertTotalCommission[coin].toFixed(8)}} {{coin.toUpperCase()}}
                  </span>
                </li>
              </ul>
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
              <div :class="`emphasis-font text-${textColors.returnPct}`">{{perfData.result.returnsPct}} %</div>
              <div>수익률</div>
            </th>
            <th>최대수익</th>
            <td :class="`text-${textColors.maxReturnPct}`">{{perfData.result.maxReturnsPct.toFixed(2)}} %</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th rowspan="3">
              <div :class="`emphasis-font text-${textColors.winsPct}`">{{perfData.result.tradeStat.winRate * 100}} %</div>
              <div>승률</div>
            </th>
            <th>거래횟수</th>
            <td>{{perfData.result.tradeStat.tradeCount}}</td>
          </tr>
          <tr>
            <th>이익횟수</th>
            <td class="text-success">{{perfData.result.tradeStat.winCount}}</td>
          </tr>
          <tr>
            <th>손해횟수</th>
            <td class="text-danger">{{perfData.result.tradeStat.loseCount}}</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th rowspan="2">
              <div :class="`emphasis-font text-${textColors.pnlRate}`">{{perfData.result.tradeStat.pnlRate}}</div>
              <div>손익비</div>
            </th>
            <th>평균수익</th>
            <td>{{perfData.result.tradeStat.formatProfitAvg}} %</td>
          </tr>
          <tr>
            <th>평균손실</th>
            <td>{{perfData.result.tradeStat.formatLossAvg}} %</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="perf table text-center table-bordered">
          <tr>
            <th>
              <div class="emphasis-font text-danger">{{perfData.result.maxDrawdownPct}} %</div>
              <div>최대손실</div>
            </th>
            <th>최대손실기간</th>
            <td class="text-danger">{{perfData.result.maxDrawdownDuration}}</td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <h5>수익</h5>
        <RevenueChart :revenues="perfData.result.cumReturns"
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
                      :trade_history="perfData.result.tradeHistory"
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
    this.$store.state.coinChart.tradeHistory = Object.assign([], this.perfData.result.tradeHistory)
    this.perfData.result.tradeStat.formatProfitAvg = Number(this.perfData.result.tradeStat.profitRateAvg * 100).toFixed(0)
    this.perfData.result.tradeStat.formatLossAvg = Number(this.perfData.result.tradeStat.lossRateAvg * 100).toFixed(0)
    let commission = {}
    try {
      commission = JSON.parse(this.perfData.result.portfolioStat.commission)
    } catch (e) {
      console.log('parse fail', e)
    }
    this.perfData.result.portfolioStat.convertTotalCommission = commission
  },
  beforeMount () {},
  mounted () {
    if (Number(this.perfData.result.portfolioStat.equity) <= 1.0) {
      this.textColors.TotalEquity = 'danger'
    }
    if (Number(this.perfData.result.returnsPct) <= 1.0) {
      this.textColors.returnPct = 'danger'
    }
    if (Number(this.perfData.result.tradeStat.winRate) * 100 <= 50) {
      this.textColors.winsPct = 'danger'
    }
    if (Number(this.perfData.result.tradeStat.pnlRate) <= 1.0) {
      this.textColors.pnlRate = 'danger'
    }
    if (Number(this.perfData.result.maxReturnsPct) <= 1.0) {
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
