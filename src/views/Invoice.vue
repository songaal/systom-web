<template>
  <div class="wrapper">
    <b-row>
      <b-col>
        <h2>과금관리</h2>
      </b-col>
    </b-row>

    <b-card class="mt-4">
      <h5 slot="header">입금계좌</h5>
      <b-alert show
               variant="secondary"
               v-for="addr in addrList"
               :key="addr.id">
        <h4 class="alert-heading">{{addr.coin}} 입금 주소</h4>
        <p>
          <span :ref="addr.coin" class="text-addr">{{addr.addr}}</span></p>
        <hr>
        <div class="text-right">
          <b-button variant="primary" @click="clipboard(addr.coin)">클립보드로 복사하기</b-button>
          <b-button variant="primary" @click="showQRCode(addr.coin)">QR코드</b-button>
        </div>
      </b-alert>
    </b-card>

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
            <td>5000 USDT</td>
            <td><span class="text-danger">연체</span></td>
            <td>
              <button class="btn btn-primary" @click="showInvoice">보기</button>
            </td>
          </tr>
          <tr>
            <td>2018-08-07</td>
            <td>변동성돌파상품(투자상품00004호)</td>
            <td>10000 USDT</td>
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
      <div class="mb-5 mt-3">
        <h3>지앤클라우드</h3>
        <p>
          서울시 서초구 신반포로45길 18 주일빌딩 5층
        </p>
      </div>
      <div class="table-responsive mb-3">
        <table class="table text-nowrap">
          <tr>
            <th class="text-center">상품명</th>
            <th class="text-center">금액</th>
            <th class="text-center">이름</th>
            <th class="text-center">수익금액</th>
            <th class="text-center">수수료율(50%)</th>
            <th class="text-center">총액</th>
          </tr>
          <tr>
            <td class="text-center">평균이동전략(투자상품00005호)</td>
            <td class="text-center">5000 USDT</td>
            <td class="text-center">testuser</td>
            <td class="text-center">20 USDT</td>
            <td class="text-center">10 USDT</td>
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
        {coin: 'USDT', addr: '14Hrh22WTjyjM8ao8x9s86rn3jCwRkAEXc', qr: ''},
        {coin: 'KRW', addr: '111111', qr: ''}
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
