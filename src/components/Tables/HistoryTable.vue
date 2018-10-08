<template>
  <div class="table-responsive text-nowrap">
    <b-table striped
             :fields="fields"
             :items="items"
             :showEmpty="true"
             emptyText="거래 이력이 없습니다."
             class="mb-0"
    >

      <template slot="action" slot-scope="data">
        <span :class="`text-${data.item.textColor}`"
        >{{data.value}}</span>
      </template>
      <template slot="price" slot-scope="data">
        <span :class="`text-${data.item.textColor}`"
        >{{data.value}}</span>
      </template>
      <template slot="quantity" slot-scope="data">
        <span :class="`text-${data.item.textColor}`"
        >{{data.value}}</span>
      </template>
      <template slot="commission" slot-scope="data">
        <span v-if="data.item.commissionUnit === 'USDT'">
          {{data.value.toFixed(2)}} {{data.item.commissionUnit}}
        </span>
        <span v-if="data.item.commissionUnit !== 'USDT'">
          {{data.value}} {{data.item.commissionUnit}}
        </span>
      </template>
      <template slot="reason" slot-scope="data">
        <ReasonModal :trade_history="trade_history" :seq="data.item.seq - 1"></ReasonModal>
      </template>
      <template slot="pnlRate" slot-scope="data">
        <span :class="`text-${data.item.profitColor}`">
          {{data.value.toFixed(1)}}%
        </span>
      </template>
    </b-table>
    <button v-if="isOneMore === true"
            class="btn btn-secondary btn-block"
            @click="oneMore">
      더보기
    </button>
  </div>
</template>

<script>
import utils from '../../Utils'
import config from '../../Config'
import ReasonModal from '../modals/ReasonModal'

export default {
  name: 'historyTable',
  extends: '',
  components: {
    ReasonModal
  },
  props: ['type', 'trade_history'],
  data () {
    return {
      fields: [],
      items: [],
      isOneMore: false
    }
  },
  computed: {},
  watch: {
    trade_history () {
      this.setData(15)
    }
  },
  methods: {
    backtestFields () {
      return [
        { label: '번호', key: 'seq' },
        { label: '주문', key: 'action' },
        { label: '시간', key: 'time' },
        { label: '심볼', key: 'symbol' },
        { label: '거래가격', key: 'price' },
        { label: '수량', key: 'quantity' },
        { label: '수수료', key: 'commission' },
        { label: '이익', key: 'pnlRate' },
        { label: '거래이유', key: 'reason' }
      ]
    },
    goodsFields () {
      return [
        { label: '번호', key: 'seq' },
        { label: '주문', key: 'action' },
        { label: '시간', key: 'time' },
        { label: '코인', key: 'symbol' },
        { label: '거래가격', key: 'price' },
        { label: '수량', key: 'quantity' },
        { label: '수수료', key: 'commission' },
        { label: '이익', key: 'pnlRate' }
      ]
    },
    oneMore () {
      this.setData()
    },
    setData (rowCount) {
      this.items = []
      if (this.trade_history !== undefined && this.trade_history.length > 0) {
        let tmpItems = []
        let tmpBotPrice = {}
        this.trade_history.some((trade, index) => {
          let action = trade.action === 'BOT' ? '매수' : '매도'
          let textColor = trade.action === 'BOT' ? 'success' : 'danger'
          let symbol = trade.symbol.replace('_', '/').toUpperCase()
          let coinUnit = symbol.split('/')[0]
          let baseUnit = symbol.split('/')[1]
          let price = Math.floor(trade.price * 100000000) / 100000000
          let quantity = Math.floor(trade.quantity * 100000000) / 100000000
          let commission = Math.floor(trade.commission * 100000000) / 100000000
          let profit = null
          let profitColor = null
          let pnlRate = Math.floor((trade.pnlRate * 100) * 100000000) / 100000000
          if (pnlRate > 0) {
            profitColor = 'success'
          } else if (pnlRate < 0) {
            profitColor = 'danger'
          }
          let tradeTime = null
          if (/^[0-9]+$/gi.test(trade.tradeTime)) {
            tradeTime = utils.timestampToTime(trade.tradeTime * 1000, 's')
          } else {
            tradeTime = utils.timeToString(trade.tradeTime)
          }
          let reason = {
            target: 0,
            score: 0,
            condition: []
          }
          try {
            reason = JSON.parse(trade.reason)
          } catch (e) {
            console.log('json parsing error. seq', index)
            console.log('json parsing error. trade', trade)
          }
          tmpItems.push({
            seq: (index + 1),
            textColor: textColor,
            action: action,
            time: tradeTime,
            symbol: symbol,
            price: utils.comma(price),
            quantity: quantity,
            commission: commission,
            commissionUnit: trade.commissionUnit,
            pnlRate: pnlRate,
            profitColor: profitColor,
            reason: reason
          })
        })
        this.items = tmpItems.reverse()
      }
    }
  },
  beforeCreate () {},
  created () {
    this.total = 0
    this.data = []
    this.columns = []
    this.totalData = []
    if (this.type === 'backTest') {
      this.fields = this.backtestFields()
      this.setData()
    } else if (this.type === 'goods') {
      this.fields = this.goodsFields()
    }
  },
  mounted () {},
  beforeMount () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>
.action {
  font-size: 12pt
},
.emphasis-font {
  font-size: 14pt;
}
.score {
  border-right: 1px solid '#758696';
  text-align: center;
  vertical-align: middle;
}
table,
table span,
table button {
  font-size: 10pt;
}
</style>
