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
        <b-row>
          <b-col col cols="12" xs="12" sm="12" md="6" lg="6">
            <h4 class="alert-heading">{{addr.coin}} 입금 주소</h4>
            <b-button variant="link" :ref="addr.coin" class="text-addr p-0" @click="clipboard(addr.coin)">{{addr.addr}}</b-button>
            <!-- <p>
              <b-link :ref="addr.coin" class="text-addr" @click="clipboard(addr.coin)">{{addr.addr}}</b-link>
            </p> -->
          </b-col>
          <b-col col cols="12" xs="12" sm="12" md="6" lg="6" class="pt-1 mt-2">
            <!-- <b-button variant="primary" @click="clipboard(addr.coin)">클립보드로 복사하기</b-button> -->
            <div class="d-sm-down-none text-right">
              <b-button variant="primary" @click="showQRCode(addr.coin)">QR코드</b-button>
            </div>
            <div class="d-md-none">
              <b-button block variant="primary" @click="showQRCode(addr.coin)">QR코드</b-button>
            </div>
          </b-col>
        </b-row>
      </b-alert>
    </div>

    <b-card>
      <h5 slot="header">과금내역</h5>
      <div class="table-responsive">
        <table class="table text-nowrap">
          <tr>
            <th>발행일</th>
            <th>상품명</th>
            <th>납부금액</th>
            <th>상태</th>
            <th>인보이스</th>
          </tr>
          <tr v-for="(invoice, index) in invoiceList">
            <td>{{invoice.formatCreateTime}}</td>
            <td>
              {{invoice.name}}
              <span v-if="invoice.type === 'goods'">
                (투자상품{{invoice.formatGoodsId}}호)
              </span>
            </td>
            <td>{{invoice.formatPaymentPrice}} {{invoice.cashUnit}}</td>
            <td>
              <span :class="`text-${invoice.status === null ? 'dark' : invoice.status === 'DELAY' ? 'danger' : 'success'}`">
                {{invoice.status === null ? '미납부' : invoice.status === 'DELAY' ? '연체' : '납부완료'}}
              </span>
            </td>
            <td class="pt-1 pb-0">
              <button class="btn btn-primary"
                      @click="showInvoice(index)"
                      :disabled="invoice.type !== 'goods'">
                보기
              </button>
            </td>
          </tr>
          <tr v-if="noData !== null">
            <tr>
              <td colspan="5" class="text-center">
                {{noData}}
              </td>
            </tr>
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
             :title="`${invoiceDetail.formatKoCreateTime} 계산서`"
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
            {{invoiceDetail.userId}}
          </div>
          <div>
            {{$store.email}}
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
            <td class="text-center">{{invoiceDetail.name}} (투자상품{{invoiceDetail.formatGoodsId}}호)</td>
            <td class="text-center">{{invoiceDetail.formatInitCash}} {{invoiceDetail.cashUnit}}</td>
            <td class="text-center">{{invoiceDetail.returns}} {{invoiceDetail.cashUnit}}</td>
            <td class="text-center">{{invoiceDetail.commissionRate * 100}}%</td>
            <td class="text-center">{{invoiceDetail.paymentPrice}} {{invoiceDetail.cashUnit}}</td>
          </tr>
          <tr>
            <th colspan="3" class="text-center"></th>
            <th class="text-center">합계</th>
            <td class="text-center">{{invoiceDetail.paymentPrice}} {{invoiceDetail.cashUnit}}</td>
          </tr>
        </table>
      </div>
    </b-modal>

  </div>
</template>

<script>
import config from '../Config'
import utils from '../Utils'

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
      addr: null,
      invoiceList: [],
      noData: null,
      invoiceDetail: {
        createTime: null
      }
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
    showInvoice (index) {
      this.invoiceDetail = this.invoiceList[index]
      this.$root.$emit('bv::show::modal', 'invoiceModal')
    },
    retrieveInvoice () {
      let url = `${config.serverHost}/${config.serverVer}/invoice`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        if (response.data.length !== 0) {
          let invoiceList = response.data
          invoiceList.forEach(i => {
            i.formatCreateTime = utils.timestampToTime(i.createTime, 'S', false)
            i.formatKoCreateTime = this.formatKoDate(i.formatCreateTime)
            i.formatPaymentTime = utils.timestampToTime(i.paymentTime)
            i.formatInitCash = utils.comma(i.initCash)
            i.formatPaymentPrice = utils.comma(i.paymentPrice)
            i.formatGoodsId = utils.LPAD(i.goodsId, '0', 5)
          })
          this.invoiceList = invoiceList
        } else {
          this.noData = '인보이스가 없습니다.'
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    formatKoDate (date) {
      let y = date.substring(0, 4)
      let m = date.substring(5, 7)
      let d = date.substring(8, 10)
      return y + '년' + m + '월' + d + '일'
    }
  },
  beforeCreate () {},
  created () {
    this.retrieveInvoice()
  },
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
