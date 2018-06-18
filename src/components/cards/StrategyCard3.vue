<template>
  <div class="strategyCard">
    <b-card border-variant="info"
            header-bg-variant="info"
            footer-bg-variant="light">
      <h5 slot="header" v-if="rank !== undefined">{{rank}} 등</h5>
      <b-row>
        <b-col>
          <b-row>
            <b-col class="text-nowrap">
              <h5>
                <span>{{name}} <small>v{{version}}</small></span>
              </h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col style="color:gray;">
              <i class="fa fa-user-circle fa-md mt-2"></i>
              <span>{{userId}}</span>
            </b-col>
          </b-row>
        </b-col>

        <b-col>
          <b-row>
            <b-col class="text-right">
              <!-- <select class="form-control">
                <option selected>BTC/USDT</option>
                <option>XRP/BTC</option>
                <option>ETH/BTC</option>
                <option>BNB/BTC</option>
              </select> -->
              <StrategyOrderModal :strategy="strategy"/>
              <div class="pt-1 float-right">XRP/BTC</div>
            </b-col>
          </b-row>
        </b-col>


        <!-- <b-col class="text-right">
          <b-link class="btn btn-sm btn-outline-dark mt-1"
                  :to="`/strategies/${this.id}/versions/${this.version}/backtest`"
          >백테스트</b-link>
          <StrategyOrderModal :strategy="strategy"/>
        </b-col> -->

      </b-row>

      <b-row>
        <b-col>
          <MarketTradeChart></MarketTradeChart>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div class="progress-group">
            <div class="progress-group-header">
              <div class="text-muted small">
                <div class="float-left">1k/10k</div>
                <div class="text-right">(56%)</div>
              </div>
            </div>
            <div class="progress-group-bars">
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
            <div> 심볼 </div>
            <div> {{backtest.symbol || '--'}} </div>
          </b-col>
          <b-col class="text-center">
            <div> 시간간격 </div>
            <div> {{backtest.timeInterval || '--'}} </div>
          </b-col>
          <b-col class="text-center">
            <div> 기간 </div>
            <div :title="`${backtest.startTime || ''} ~ ${backtest.endTime || ''}`"> {{days}}일 </div>
          </b-col>
        </b-row>
        <hr />
        <b-row class="mt-2">
          <b-col class="text-center">
            <div> 수익률 </div>
            <div :class="`mt-1 text-${textColors.returnPct}`">{{returnPct}}%</div>
          </b-col>
          <b-col class="text-center">
            <div> 손익비 </div>
            <div class="mt-1">{{pnlRate}}</div>
          </b-col>
          <b-col class="text-center">
            <div> MDD </div>
            <div class="mt-1">{{maxDrawdownPct}}%</div>
          </b-col>
        </b-row>
      </template>
    </b-card>
  </div>
</template>

<script>
import Rating from '../Rating'
import config from '../../Config'
import StrategyOrderModal from '../modals/StrategyOrderModal2'
import MarketTradeChart from '../Charts/MarketTradeChart'

export default {
  name: 'StrategyCard',
  extends: '',
  components: {
    Rating,
    StrategyOrderModal,
    MarketTradeChart
  },
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
