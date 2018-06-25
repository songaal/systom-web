<template>
  <div class="wrapper">
    <b-row>
      <b-col>
        00001호 투자 상품
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col>
        <h1 class="mb-3">
          단순이동평균전략
        </h1>
        <p class="mb-5">
          본 대출자는 46 세 남성으로 공공기관에 재직 중입니다. 8퍼센트 대출금으로 캐피탈 대출 1건을 상환할 예정입니다. 8퍼센트 심사팀은 본 대출자의 연체이력이 없다는 점을 감안하였습니다. 제공된 대출자의 신용 및 기존 대출 정보는 KCB 2018년 06월 19일 기준 입니다. 본 대출금은 총 2,568만원으로 642만원은 원리금균등, 1,926만원은 월이자지급 방식입니다.
        </p>
      </b-col>
    </b-row>

    <div class="d-sm-down-none">
      <b-row class="text-center text-nowrap mb-3">
        <b-col col sm="4" md="2">심볼</b-col>
        <b-col col sm="4" md="2">예상수익</b-col>
        <b-col col sm="4" md="2">등급</b-col>
        <b-col col sm="4" md="2">기간</b-col>
        <b-col col sm="4" md="2">최소금액</b-col>
        <b-col col sm="4" md="2">모집현황</b-col>
      </b-row>

      <b-row class="text-center mb-2">
        <b-col col sm="4" md="2"><span class="strong-text">ETH/BTC</span></b-col>
        <b-col col sm="4" md="2"><span class="strong-text">23</span>%</b-col>
        <b-col col sm="4" md="2"><span class="strong-text">A</span></b-col>
        <b-col col sm="4" md="2"><span class="strong-text">3</span> 개월</b-col>
        <b-col col sm="4" md="2"><span class="strong-text">500</span> 만원</b-col>
        <b-col col sm="4" md="2"><span class="strong-text">500 / 1,000</span> 만원</b-col>
      </b-row>
    </div>

    <div class="d-md-none">
      <b-row class="text-center text-nowrap">
        <b-col col xs="4">심볼</b-col>
        <b-col col xs="4">예상수익</b-col>
        <b-col col xs="4">등급</b-col>
      </b-row>

      <b-row class="text-center mb-3">
        <b-col col xs="4"><span class="strong-text">ETH/BTC</span></b-col>
        <b-col col xs="4"><span class="strong-text">23</span>%</b-col>
        <b-col col xs="4"><span class="strong-text">A</span></b-col>
      </b-row>

      <b-row class="text-center text-nowrap">
        <b-col col xs="4">기간</b-col>
        <b-col col xs="4">최소금액</b-col>
        <b-col col xs="4">모집현황</b-col>
      </b-row>

      <b-row class="text-center mb-2">
        <b-col col xs="4"><span class="strong-text">3</span> 개월</b-col>
        <b-col col xs="4"><span class="strong-text">500</span>만원</b-col>
        <b-col col xs="4"><span class="strong-text">500 / 1,000</span>만원</b-col>
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
      <b-row class="mb-3">
        <b-col>
          <h4>
            거래 이력
            <sub class="text-secondary">2018.01.01 ~ 2018.05.01</sub>
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
              <TradeHistory type="tradeHistory"
                            :trade_history="tradeHistory"
                            exchange="binance"
                            symbol="ETH/BTC"
                            timeInterval="1H"
              />
            </b-tab>
          </b-tabs>
          <div class="d-md-none">
            <TradeHistory type="tradeHistory"
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
    let url = 'http://127.0.0.1:8080/result.json'
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
