<template>
  <div class="strategyCard">
    <b-card header-bg-variant="info"
            footer-bg-variant="light"
            class="p-0 m-0">
      <h5 slot="header" v-if="rank !== undefined">{{rank}} 등</h5>
      <b-row>
        <b-col>
          <b-row>
            <b-col class="text-nowrap">
              <h5>
                <b-link to="/investGoods/1">{{name}}</b-link>
              </h5>
            </b-col>
          </b-row>
        </b-col>

        <b-col class="text-right mb-2">
          <b-link class="btn mt-1 ml-1 btn-outline-primary" to="/investGoods/1/apply">투자</b-link>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div class="progress-group">
            <div class="progress-group-header">
              <div class="text-muted small">
                <div class="float-left">1K/10K</div>
                <div class="text-right">56%</div>
              </div>
            </div>
            <div class="progress progress-xs">
              <div class="progress-bar bg-success"
                   role="progressbar"
                   style="width: 43%"
                   aria-valuenow="43"
                   aria-valuemin="0"
                   aria-valuemax="100">
              </div>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div class="mt-4">
            <pre class="text-justify mb-0 descbox">{{description}}</pre>
          </div>
        </b-col>
      </b-row>

      <template slot="footer">
        <b-row>
          <b-col class="text-center">
            <div> 코인 </div>
            <div> {{typeof backtest.symbol === 'string' ? backtest.symbol.substring(0, 3) : '--'}} </div>
          </b-col>
          <b-col class="text-center">
            <div> 예상수익률 </div>
            <div :class="`mt-1 text-${textColors.returnPct}`">{{returnPct}}%</div>
          </b-col>
          <b-col class="text-center">
            <div> 투자기간 </div>
            <div>60 일</div>
            <!-- <div :title="`${backtest.startTime || ''} ~ ${backtest.endTime || ''}`"> {{days}}일 </div> -->
          </b-col>
        </b-row>
        <hr />
        <b-row class="mt-2">
          <b-col class="text-center">
            <div>최소금액</div>
            <div class="mt-1">500 USDT</div>
          </b-col>
          <b-col class="text-center">
            <div>모집현황</div>
            <div>1K / 10K <span class="text-nowrap">USDT</span></div>
          </b-col>
        </b-row>
      </template>
    </b-card>
  </div>
</template>

<script>
import config from '../../Config'

export default {
  name: 'StrategyCard',
  extends: '',
  components: {},
  props: ['rank', 'strategy'],
  data () {
    return {
      id: null,
      name: null,
      version: null,
      userId: null,
      price: null,
      description: null,
      sellCount: null,
      days: '0',
      returnPct: '0',
      pnlRate: '0',
      maxDrawdownPct: '0',
      backtest: {
        exchange: null,
        symbol: null,
        timeInterval: null,
        startTime: null,
        endTime: null,
        options: []
      },
      textColors: {
        returnPct: 'success'
      }
    }
  },
  computed: {},
  watch: {
    'strategy.sellCount' () {
      this.sellCount = this.strategy.sellCount
    }
  },
  methods: {},
  beforeCreate () {},
  created () {
    if (this.strategy !== null && this.strategy !== undefined) {
      this.id = this.strategy.id
      this.name = this.strategy.name
      this.version = this.strategy.version
      this.userId = this.strategy.userId
      this.price = this.strategy.price
      this.description = this.strategy.description
      this.sellCount = this.strategy.sellCount
      if (this.strategy.backtest !== null && this.strategy.backtest !== undefined) {
        let backtest = JSON.parse(this.strategy.backtest)
        this.backtest.symbol = backtest.symbol.replace('_', '/')
        this.backtest.timeInterval = config.formatEnToKoTimeInterval(backtest.timeInterval)
        this.backtest.startTime = backtest.startTime
        this.backtest.endTime = backtest.endTime.substring(0, 10)
        this.days = backtest.days
        this.returnPct = backtest.return_pct
        this.pnlRate = backtest.pnl_rate
        this.maxDrawdownPct = backtest.max_drawdown_pct
        if (Number(backtest.return_pct) <= 1.0) {
          this.textColors.returnPct = 'danger'
        }
      }
    }
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>
.descbox {
  height: 39px;
  overflow-y: auto;
}
.card-body,
.card-footer {
  padding: 0.75rem
}
</style>
