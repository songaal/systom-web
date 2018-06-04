<template>
  <div id='dataTable'>
    <datatable v-bind="$data" />
  </div>
</template>

<script>
import config from '../../Utils'
import reasonCell from './compCells/ReasonCell'
import actionCell from './compCells/ActionCell'
import priceCell from './compCells/PriceCell'

export default {
  name: 'dataTable',
  extends: '',
  components: {
    reasonCell,
    actionCell,
    priceCell
  },
  props: ['row', 'type', 'trade_history'],
  data () {
    return {
      HeaderSettings: false,
      columns: [],
      data: [],
      totalData: [],
      total: 0,
      query: {}
    }
  },
  computed: {},
  watch: {
    query: {
      handler (query) {
        this.data = this.totalData.filter((o, i) => {
          return query.offset <= i && i <= (Number(query.offset) + Number(query.limit))
        })
      },
      deep: true
    }
  },
  methods: {
    backtestColumns () {
      return [
        { title: '번호', field: 'seq' },
        { title: '주문', tdComp: 'actionCell', visible: 'true' },
        { title: '시간', field: 'time' },
        { title: '심볼', field: 'symbol' },
        { title: '거래가격', tdComp: 'priceCell', visible: 'true' },
        { title: '수량', field: 'quantity' },
        { title: '수수료', field: 'commission' },
        { title: '거래이유', tdComp: 'reasonCell', visible: 'true' }
      ]
    }
  },
  beforeCreate () {},
  created () {
    this.total = 0
    this.data = []
    this.columns = []
    this.totalData = []
    if (this.type === 'tradeHistory') {
      this.columns = this.backtestColumns()
      this.total = this.trade_history.length
      this.trade_history.forEach((trade, index) => {
        this.totalData.push({
          seq: (index + 1),
          action: trade.action,
          time: config.timestampToTime(trade.timestamp),
          symbol: trade.ticker.replace('_', '/').toUpperCase(),
          price: trade.price,
          quantity: trade.quantity,
          commission: trade.commission,
          reason: trade.reason,
          exchange: trade.exchange
        })
      })
    } else if (this.type === 'backtest') {

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
}
</style>
