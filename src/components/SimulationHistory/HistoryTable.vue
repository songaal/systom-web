<template>
  <div id='dataTable'>
    <datatable v-bind="$data" />
  </div>
</template>

<script>
// import mockData from './_mockData'

export default {
  name: 'dataTable',
  extends: '',
  components: {},
  props: [],
  data () {
    return {
      columns: [
        { title: '주문', field: 'order', sortable: true },
        { title: '시간', field: 'time' },
        { title: '심볼', field: 'symbol', sortable: true },
        { title: '거래가격', field: 'price' },
        { title: '수량', field: 'quantity' },
        { title: '합계', field: 'sum' },
        { title: '수익', field: 'revenue' },
        { title: '거래이유', field: 'reason' }
      ],
      data: [],
      total: 0,
      query: {}
    }
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate () {},
  created () {},
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
