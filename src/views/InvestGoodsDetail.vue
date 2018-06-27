<template>
  <div class="wrapper">
    <b-row>
      <b-col>
        00001호 투자 상품
      </b-col>
      <b-col class="text-right">
        모집기간 2018.06.15 ~ 2018.06.30
      </b-col>
    </b-row>
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
        <b-col col sm="4" md="2">코인</b-col>
        <b-col col sm="4" md="2">예상수익률</b-col>
        <b-col col sm="4" md="2">기간</b-col>
        <b-col col sm="4" md="2">최소금액</b-col>
        <b-col col sm="6" md="3">모집현황</b-col>
      </b-row>

      <b-row class="text-center mb-2">
        <b-col col sm="4" md="2"><span class="strong-text">ETH</span></b-col>
        <b-col col sm="4" md="2"><span class="strong-text">11.5</span>%</b-col>
        <b-col col sm="4" md="2"><span class="strong-text">30</span> 일</b-col>
        <b-col col sm="4" md="2"><span class="strong-text">100</span> USDT</b-col>
        <b-col col sm="6" md="3"><span class="strong-text">5.3k / 10k</span> USDT</b-col>
      </b-row>
    </div>

    <div class="d-md-none">
      <b-row class="text-center text-nowrap">
        <b-col col xs="4">코인</b-col>
        <b-col col xs="4">예상수익률</b-col>
      </b-row>

      <b-row class="text-center mb-3">
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
        <div class="progress progress-xs">
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

    <b-card>
      <b-row>
        <b-col class="text-center">

          <div class="mb-2" style="font-size:1.1em;">
            <select>
              <option>
                100 USDT
              </option>
              <option>
                200 USDT
              </option>
            </select> 을 투자할 경우,
          </div>
          <div class="mb-2" style="font-size:1.1em;">
            예상수익은 11.5 USDT 입니다.
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
          <h4>
            거래 이력
          </h4>
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

export default {
  name: 'InvestGoodsDetail',
  extends: '',
  components: {
    CoinChart,
    TradeHistory
  },
  props: [],
  data () {
    return {
      tradeHistory: null
    }
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate () {},
  created () {
    let url = 'http://192.168.2.11:8080/result.json'
    console.log('[개발용] 데이터 요청 보냄: ', url)
    this.axios.get(url, {crossdomain: true, 'Access-Control-Allow-Origin': '*'}).then((response) => {
      console.log('응답: ', response.data)
      this.tradeHistory = response.data.result.trade_history
      console.log('this.tradeHistory', this.tradeHistory)
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
.wrapper {margin-top: 20px;}
.strong-text {
  font-size: 18pt;
}
</style>
