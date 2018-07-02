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
          투자기간
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
        <b-col col sm="4" md="2">투자기간</b-col>
      </b-row>

      <b-row class="text-center mb-2">
        <b-col col sm="4" md="2"><span class="strong-text">Binance</span></b-col>
        <b-col col sm="4" md="2"><span class="strong-text">ETH</span></b-col>
        <b-col col sm="4" md="2"><span class="strong-text">30</span> 일</b-col>
      </b-row>
    </div>

    <div class="d-md-none">
      <b-row class="text-center text-nowrap">
        <b-col col xs="4">거래소</b-col>
        <b-col col xs="4">코인</b-col>
        <b-col col xs="4">투자기간</b-col>
      </b-row>

      <b-row class="text-center mb-3">
        <b-col col xs="4"><span class="strong-text">Binance</span></b-col>
        <b-col col xs="4"><span class="strong-text">ETH</span></b-col>
        <b-col col xs="4"><span class="strong-text">30</span> 일</b-col>
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
      <b-col col cols="12" xs="12" sm="12" md="3" lg="3">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text">수익률</b-col>
            <b-col class="text-right text-nowrap">
              <span class="main-text text-success">2.3 </span>
              <span class=""> %</span>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="text-left text-nowrap sub-text">초기자산</b-col>
            <b-col class="text-right text-nowrap sub-text">500 USDT</b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">수수료</b-col>
            <b-col class="text-right text-nowrap sub-text">0.55 USDT</b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="3" lg="3">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text">승률</b-col>
            <b-col class="text-right text-nowrap main-text text-danger">41.56 %</b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="text-left text-nowrap sub-text">거래횟수</b-col>
            <b-col class="text-right text-nowrap sub-text">13</b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">이익횟수</b-col>
            <b-col class="text-right text-nowrap sub-text">5</b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">손실횟수</b-col>
            <b-col class="text-right text-nowrap sub-text">7</b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="3" lg="3">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text">손익비</b-col>
            <b-col class="text-right text-nowrap main-text text-success">1.02</b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="text-left text-nowrap sub-text">평균수익</b-col>
            <b-col class="text-right text-nowrap sub-text">0.96 %</b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">평균손실</b-col>
            <b-col class="text-right text-nowrap sub-text">5.57 %</b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="3" lg="3">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text">총 자산</b-col>
            <b-col class="text-right text-nowrap main-text">502.35</b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col class="text-left text-nowrap sub-text">EOS</b-col>
            <b-col class="text-right text-nowrap sub-text">2.00000000</b-col>
          </b-row>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">USDT</b-col>
            <b-col class="text-right text-nowrap sub-text">500</b-col>
          </b-row>
        </b-card>
      </b-col>

    </b-row>


    <b-card class="mb-4">
      <b-row class="mb-3">
        <b-col>
          <h4>수익 이력</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <RevenueChart :revenues="cum_returns"></RevenueChart>
        </b-col>
      </b-row>
    </b-card>

    <b-card class="mb-5">
      <b-row class="mb-3">
        <b-col>
          <h4>거래 이력</h4>
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
import config from '../Config'
import utils from '../Utils'
import RevenueChart from '../components/Charts/RevenueChart'
import CoinChart from '../components/Charts/CoinChart'
import TradeHistory from '../components/Tables/HistoryTable'

export default {
  name: 'Invest',
  extends: '',
  components: {
    RevenueChart,
    TradeHistory,
    CoinChart
  },
  props: [],
  data () {
    return {
      tradeHistory: [],
      cum_returns: []
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
      this.tradeHistory = response.data.result.trade_history
      this.cum_returns = response.data.result.cum_returns
    }).catch((e) => {
      this.handleProgress(0)
      utils.httpFailNotify(e, this)
    })
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
.wrapper {
  margin-top: 20px;
}
.main-text {
  color: #3C3C3C;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.3px;
}
.sub-text {
  color: #8A8A8A;
}
.strong-text {
  font-size: 18pt;
}
</style>
