<template>
  <div class="table-responsive text-nowrap">
    <b-table striped
             :fields="fields"
             :items="items"
             :showEmpty="true"
             emptyText="거래 이력이 없습니다."
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
      <template slot="reason" slot-scope="data">
        <button class="btn btn-link" @click="showModal">조회</button>
        <b-modal ref="reasonModal" title="거래이유" size="lg">
          <div class="table-responsive">
            <table class="table table-bordered">
              <tr v-for="(condition, index) in data.item.reason.condition">
                <td v-if="index === 0"
                    :rowspan="data.item.reason.condition.length"
                    class="score"
                >
                  <div class="emphasis-font">
                    점수: <span class="emphasis-font">{{data.item.reason.score}}</span>
                  </div>
                  <div class="emphasis-font">
                    목표: <span class="emphasis-font">{{data.item.reason.target}}</span>
                  </div>
                </td>
                <td v-if="index === 0">
                  <div>점수: {{condition.score}}</div>
                  <div>이름: {{condition.name}}</div>
                  <div>조건: {{condition.value}}</div>
                </td>
                <td v-if="index > 0">
                  <div>점수: {{condition.score}}</div>
                  <div>이름: {{condition.name}}</div>
                  <div>조건: {{condition.value}}</div>
                </td>
              </tr>
            </table>
          </div>
          <div slot="modal-footer">
            <button class="btn btn-primary" @click="hideModal">확인</button>
          </div>
        </b-modal>
      </template>

    </b-table>
  </div>
</template>

<script>
import config from '../../Utils'

export default {
  name: 'historyTable',
  extends: '',
  components: {},
  props: ['type', 'trade_history'],
  data () {
    return {
      fields: [],
      items: []
    }
  },
  computed: {},
  watch: {
    trade_history () {
      // created -> watch 이동됨...
      this.items = []
      if (this.trade_history !== undefined && this.trade_history.length > 0) {
        let tmpItems = []
        this.trade_history.forEach((trade, index) => {
          let action = trade.action === 'BOT' ? '매수' : '매도'
          let textColor = trade.action === 'BOT' ? 'success' : 'danger'
          tmpItems.push({
            seq: (index + 1),
            textColor: textColor,
            action: action,
            time: config.timestampToTime(trade.timestamp),
            symbol: trade.ticker.replace('_', '/').toUpperCase(),
            price: trade.price,
            quantity: trade.quantity,
            commission: trade.commission,
            profit: trade.profit || '',
            reason: trade.reason,
            exchange: trade.exchange
          })
        })
        // TODO 임시 정렬 순서 변경 차후 DB 조회 순
        this.items = tmpItems.reverse()
        console.log('this.items', this.items)
      }
    }
  },
  methods: {
    backtestFields () {
      return [
        { label: '번호', key: 'seq' },
        { label: '주문', key: 'action' },
        { label: '시간', key: 'time' },
        { label: '코인', key: 'symbol' },
        { label: '거래가격', key: 'price' },
        { label: '수량', key: 'quantity' },
        { label: '수수료', key: 'commission' },
        { label: '이익', key: 'profit' },
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
        { label: '이익', key: 'profit' }
      ]
    },
    showModal () {
      this.$refs.reasonModal.show()
    },
    hideModal () {
      this.$refs.reasonModal.hide()
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
