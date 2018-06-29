<template>
  <div class="wrapper">
    <div class="d-sm-down-none">
      <b-row>
        <b-col>
          투자상품 00001호
        </b-col>
        <b-col class="text-right">
          투자기간 2018.06.20 ~ 2018.07.20
        </b-col>
      </b-row>
    </div>
    <div class="d-md-none">
      <b-row>
        <b-col>
          투자상품
        </b-col>
        <b-col class="text-right">
          모집기간
        </b-col>
      </b-row>
      <b-row>
        <b-col>00001호</b-col>
        <b-col class="text-right">2018.06.20 ~ 2018.07.20</b-col>
      </b-row>
    </div>
    <hr />
    <b-row>
      <b-col>
        <h1 class="mb-3">
          EOS 다중지표전략
        </h1>
        <p class="mb-5">
          본 전략은 6월에 있을 EOS의 메인넷 런칭을 대비하여 가격이 상승할 것을 예상하고, 5가지의 지표가중치를 산정후 매도 매수를 진행합니다.</p>
      </b-col>
    </b-row>

    <div class="d-sm-down-none">
      <b-row class="text-center text-nowrap mb-3">
        <b-col col sm="4" md="2">거래소</b-col>
        <b-col col sm="4" md="2">코인</b-col>
        <b-col col sm="4" md="2">예상수익률</b-col>
        <b-col col sm="4" md="2">기간</b-col>
        <!-- <b-col col sm="4" md="2">최소금액</b-col> -->
        <b-col col sm="6" md="3">모집현황</b-col>
      </b-row>

      <b-row class="text-center mb-2">
        <b-col col sm="4" md="2"><span class="strong-text">Binance</span></b-col>
        <b-col col sm="4" md="2"><span class="strong-text">ETH</span></b-col>
        <b-col col sm="4" md="2"><span class="strong-text">11.5</span>%</b-col>
        <b-col col sm="4" md="2"><span class="strong-text">30</span> 일</b-col>
        <!-- <b-col col sm="4" md="2"><span class="strong-text">100</span> USDT</b-col> -->
        <b-col col sm="6" md="3"><span class="strong-text">5.3k / 10k</span> USDT</b-col>
      </b-row>
    </div>

    <div class="d-md-none">
      <b-row class="text-center text-nowrap">
        <b-col col xs="4">거래소</b-col>
        <b-col col xs="4">코인</b-col>
        <b-col col xs="4">예상수익률</b-col>
      </b-row>

      <b-row class="text-center mb-3">
        <b-col col xs="4"><span class="strong-text">Binance</span></b-col>
        <b-col col xs="4"><span class="strong-text">ETH</span></b-col>
        <b-col col xs="4"><span class="strong-text">11.5</span>%</b-col>
      </b-row>

      <b-row class="text-center text-nowrap">
        <b-col col xs="4">기간</b-col>
        <b-col col xs="4">모집현황</b-col>
      </b-row>

      <b-row class="text-center mb-2">
        <b-col col xs="4"><span class="strong-text">30</span> 일</b-col>
        <b-col col xs="4"><span class="strong-text">5.3k / 10k</span> USDT</b-col>
      </b-row>
    </div>

    <b-row class="mb-4">
      <b-col>
        <div class="progress progress-xs" style="background: #d2cccc4f;">
          <div class="progress-bar bg-success"
               role="progressbar"
               style="width: 56%;"
               aria-valuenow="56"
               aria-valuemin="0"
               aria-valuemax="100">
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <BarChart wideType="full" name="monthRevenue" title="월별 수익률" type="pct" :dataProvider="monthRevenue"></BarChart>
      </b-col>
    </b-row>

    <b-card>
      <b-row>
        <b-col class="text-center">

          <div class="mb-2" style="font-size:1.1em;">
            <div class="d-inline-block">
              <b-form-select v-model="price"
                             :options="pirceList"
                             class="mb-3"
                             :select-size="1"
              />
            </div>
            <span>을 투자할 경우,</span>
          </div>
          <div class="mb-2" style="font-size:1.1em;">
            예상수익은 {{price || 0}} 입니다.
          </div>

        </b-col>
      </b-row>

      <b-row>
        <b-col class="text-center">
          <!-- <b-link class="btn btn-lg btn-block btn-primary" to="/investGoods/1/apply">투자하기</b-link> -->
          <b-link class="btn btn-lg btn-block btn-secondary" to="/investGoods/1/cancel">투자취소</b-link>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <b-row class="mb-3">
        <b-col>
          <h4>거래 이력</h4>
        </b-col>
        <b-col class="text-right d-sm-down-none">
          <div class="form-check form-check-inline">
            <input class="form-check-input"
                   type="radio"
                   name="tradeHistory"
                   id="tradeHistoryChartFrame"
                   checked
                   @change="() => {tradeHistoryIsChart = true}">
            <label class="form-check-label"
                   for="tradeHistoryChartFrame">
              차트
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input"
                   type="radio"
                   name="tradeHistory"
                   id="tradeHistoryDataFrame"
                   @change="() => {tradeHistoryIsChart = false}">
            <label class="form-check-label"
                   for="tradeHistoryDataFrame">
                   데이터</label>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>

          <b-tabs class="d-sm-down-none">
            <b-tab title="차트">
              <CoinChart :isControl="false" :tradeHistory="tradeHistory"/>
            </b-tab>
            <b-tab title="데이터">
              <TradeHistory type="goods"
                            :trade_history="tradeHistory"
                            exchange="binance"
                            symbol="ETH/BTC"
                            timeInterval="1H"
              />
            </b-tab>
          </b-tabs>
          <div class="d-md-none">
            <TradeHistory type="goods"
                          :trade_history="tradeHistory"
                          exchange="binance"
                          symbol="ETH/BTC"
                          timeInterval="1H"
            />
          </div>
        </b-col>
      </b-row>
    </b-card>

  </div>
</template>

<script>
import CoinChart from '../components/Charts/CoinChart'
import TradeHistory from '../components/SimulationHistory/HistoryTable'
import BarChart from '../components/Charts/BarChart'
import config from '../Config'

export default {
  name: 'InvestGoodsDetail',
  extends: '',
  components: {
    CoinChart,
    TradeHistory,
    BarChart
  },
  props: [],
  data () {
    return {
      tradeHistory: null,
      price: '10 USDT',
      pirceList: [],
      monthRevenue: [{
        date: '01',
        pct: 0
      }, {
        date: '02',
        pct: 10
      }, {
        date: '03',
        pct: 0
      }, {
        date: '04',
        pct: 30
      }, {
        date: '05',
        pct: 24
      }, {
        date: '06',
        pct: 3
      }, {
        date: '07',
        pct: 0
      }, {
        date: '08',
        pct: 0
      }, {
        date: '09',
        pct: 0
      }, {
        date: '10',
        pct: 0
      }, {
        date: '11',
        pct: 0
      }, {
        date: '12',
        pct: 0
      }]
    }
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate () {},
  created () {
    let url = `${config.serverHost}/result.json`
    console.log('[개발용] 데이터 요청 보냄: ', url)
    this.axios.get(url, {crossdomain: true, 'Access-Control-Allow-Origin': '*'}).then((response) => {
      console.log('응답: ', response.data)
      this.tradeHistory = response.data.result.trade_history
      console.log('this.tradeHistory', this.tradeHistory)
    }).catch((e) => {
      this.handleProgress(0)
      utils.httpFailNotify(e, this)
    })
    let pirceList = []
    pirceList.push({value: null, text: '투자금액을 선택하세요.', disabled: true})
    for (let i = 10; i < 1000; i += 10) {
      pirceList.push({value: (i + ' USDT'), text: (i + ' USDT')})
    }
    for (let i = 1.0; i < 10; i += 0.1) {
      pirceList.push({value: (i.toFixed(1) + 'K USDT'), text: (i.toFixed(1) + 'K USDT')})
    }
    this.pirceList = pirceList
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
.wrapper {margin-top: 20px;}
.strong-text {
  font-size: 18pt;
}
</style>
