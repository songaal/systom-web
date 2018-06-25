<template>
  <div></div>
</template>

<script>
import utils from '../Utils'
import config from '../Config'

export default {
  name: 'Logout',
  data () {
    return {}
  },
  created () {
    this.axios.post(config.serverHost + '/auth/logout', {}, config.getAxiosPostOptions()).then((result) => {
      this.$router.replace('/')
    }).catch((e) => {
      utils.httpFailNotify(e, this)
      this.$router.replace('/')
    })
  }
}
</script>

<style>
</style>
