<template>
  <div>
    <button @click="apiTest">테스트</button>
  </div>
</template>

<script>
import ccxt from 'ccxt'

export default {
  name: 'name',
  extends: '',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    apiTest: async () => {
      try {
        // const proxy = 'https://cors-anywhere.herokuapp.com/'
        var binance = new ccxt.binance({
          'proxy': 'https://cors-anywhere.herokuapp.com/',
          'apiKey': 'bMjObDSbYDmE2EPXMTxnzwFRMN8Z7ZY7t5aBtAT2pzsqWgV4XU3jMug4LVKwdeGX',
          'secret': 'QR3GKSCRNznsEUvMPosMLFzL28F0Apmr9bsBgt3mMr01wMpsVbX9zPyTpDx8hIEi'
        })
        // console.log('binance', binance)
        let balance = await binance.fetchBalance()
        console.log('balance', balance, typeof balance)
      } catch (e) {
        console.error('error:', e)
      }
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

</style>
