<template>
  <div class="wrapper">
    <b-row>
      <b-col>
        <h2>과금관리</h2>
      </b-col>
    </b-row>

    <div class="mt-3">
      <b-alert show
               variant="primary"
               v-for="addr in addrList"
               :key="addr.id">
        <h4 class="alert-heading">{{addr.coin}} 입금 주소</h4>
        <p>
          <b-link :ref="addr.coin" class="text-addr" @click="clipboard(addr.coin)">{{addr.addr}}</b-link></p>
        <hr>
        <div class="text-right">
          <b-button variant="primary" @click="clipboard(addr.coin)">클립보드로 복사하기</b-button>
          <b-button variant="primary" @click="showQRCode(addr.coin)">QR코드</b-button>
        </div>
      </b-alert>
    </div>

    <b-card>
      <h5 slot="header">과금내역</h5>
      <div class="table-responsive">
        <table class="table text-nowrap">
          <tr>
            <th>발행일</th>
            <th>상품명</th>
            <th>금액</th>
            <th>상태</th>
            <th>인보이스</th>
          </tr>
          <tr>
            <td>2018-08-07</td>
            <td>평균이동전략(투자상품00005호)</td>
            <td>5,000 USDT</td>
            <td><span class="text-danger">연체</span></td>
            <td>
              <button class="btn btn-primary" @click="showInvoice">보기</button>
            </td>
          </tr>
          <tr>
            <td>2018-08-07</td>
            <td>변동성돌파상품(투자상품00004호)</td>
            <td>10,000 USDT</td>
            <td><span class="text-success">정상</span></td>
            <td>
              <button class="btn btn-primary" @click="showInvoice">보기</button>
            </td>
          </tr>
        </table>
      </div>
    </b-card>

    <b-modal id="qrcodeModal"
             hide-footer
             :title="`${coin} 입금 주소`">
      <div class="text-center mb-4">
        <div>
          <canvas ref="qecode"></canvas>
        </div>
        <div>
          {{addr}}
        </div>
      </div>
    </b-modal>

    <b-modal id="invoiceModal"
             hide-footer
             title="2018년 8월 7일 계산서"
             size="lg">
      <b-row class="mb-3 mt-3">
        <b-col>
          <h1>SYSTOM</h1>
          <p>암호화폐 로봇 트레이딩 플랫폼 시스텀</p>
        </b-col>
        <b-col>
          <div class="text-right">
            <b>(주)지앤클라우드</b>
            <p class="text-nowrap">서울시 서초구 신반포로45길 18 주일빌딩 5층</p>
          </div>
        </b-col>
      </b-row>

      <b-row  class="mb-4">
        <b-col>
          <h5 class="mb-2">대상자</h5>
          <div>
            testuser
          </div>
          <div>
            jwkim@gncloud.kr
          </div>
        </b-col>
      </b-row>

      <div class="table-responsive mb-3">
        <table class="table text-nowrap">
          <tr>
            <th class="text-center">상품명</th>
            <th class="text-center">투자금액</th>
            <th class="text-center">수익금액</th>
            <th class="text-center">수수료율</th>
            <th class="text-center">금액</th>
          </tr>
          <tr>
            <td class="text-center">평균이동전략(투자상품00005호)</td>
            <td class="text-center">5,000 USDT</td>
            <td class="text-center">20 USDT</td>
            <td class="text-center">49%</td>
            <td class="text-center">10 USDT</td>
          </tr>
          <tr>
            <th colspan="3" class="text-center"></th>
            <th class="text-center">합계</th>
            <td class="text-center">10 USDT</td>
          </tr>
        </table>
      </div>
    </b-modal>

  </div>
</template>

<script>
var QRCode = require('qrcode')

export default {
  name: 'invoice',
  extends: '',
  components: {},
  props: [],
  data () {
    return {
      addrList: [
        {coin: 'USDT', addr: '14Hrh22WTjyjM8ao8x9s86rn3jCwRkAEXc'}
      ],
      coin: null,
      addr: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    clipboard (coin) {
      let addr = this.$refs[coin][0].innerText
      let t = document.createElement('textarea')
      document.body.appendChild(t)
      t.value = addr
      t.select()
      document.execCommand('copy')
      document.body.removeChild(t)
      this.$vueOnToast.pop('info', '완료', '클립보드에 복사하였습니다.')
    },
    showQRCode (coin) {
      let addr = this.$refs[coin][0].innerText
      var canvas = this.$refs['qecode']
      this.coin = coin
      this.addr = addr
      QRCode.toCanvas(canvas, addr, { width: 200 })
      this.$root.$emit('bv::show::modal', 'qrcodeModal')
    },
    showInvoice () {
      this.$root.$emit('bv::show::modal', 'invoiceModal')
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>

<style scoped>
.wrapper {margin-top: 20px;}
</style>
