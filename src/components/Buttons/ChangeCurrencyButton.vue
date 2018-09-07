<template>
  <div>
    <b-dropdown :text="currency" size="sm" split variant="primary">
      <b-dropdown-item @click="changeCurrency('USDT')">USDT</b-dropdown-item>
      <b-dropdown-item @click="changeCurrency('KRW')">KRW</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import utils from '../../Utils'

export default {
  name: 'ChangeCurrencyButton',
  extends: '',
  components: {},
  props: [],
  data () {
    return {
      currencyKey: null,
      currency: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    changeCurrency (currency) {
      this.currency = currency
      utils.setCookie(this.currencyKey, this.currency)
    }
  },
  beforeCreate () {},
  created () {
    this.currencyKey = `currency_${this.$store.userId}`
    this.currency = utils.getCookie(this.currencyKey)
    if (this.currency === null) {
      this.currency = 'USDT'
      utils.setCookie(this.currencyKey, this.currency)
    }
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

</style>
