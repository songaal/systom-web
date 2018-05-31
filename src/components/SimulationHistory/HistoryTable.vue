<template>
  <div id='dataTable'>
    <datatable v-bind="$data" />
  </div>
</template>

<script>
import config from '../../Utils'
import DisplayRow from './revenueCell'

export default {
  name: 'dataTable',
  extends: '',
  components: {
    DisplayRow
  },
  props: ['row', 'type', 'trade_history'],
  data () {
    return {
      columns: [],
      data: [],
      total: 0,
      query: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    backtestColumns () {
      return [
        { title: '주문', field: 'action', sortable: true },
        { title: '시간', field: 'time', sortable: true },
        { title: '심볼', field: 'symbol' },
        { title: '거래가격', field: 'price', sortable: true },
        { title: '수량', field: 'quantity', sortable: true },
        { title: '수수료', field: 'commission' },
        { title: '거래이유', tdComp: 'DisplayRow', visible: 'true' }
      ]
    }
  },
  beforeCreate () {},
  created () {
    if (this.type === 'tradeHistory') {
      this.columns = this.backtestColumns()
      this.trade_history.forEach(trade => {
        this.data.push({
          action: trade.action,
          time: config.timestampToTime(trade.timestamp, 'm'),
          symbol: trade.ticker.toUpperCase(),
          price: trade.price,
          quantity: trade.quantity,
          commission: trade.commission
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
