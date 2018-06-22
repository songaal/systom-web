<template>
  <div class="sidebar">
    <AccountInfo type="menu" />
  </div>
</template>
<script>
import AccountInfo from '../AccountInfo'

export default {
  name: 'sidebar',
  props: {},
  components: {
    AccountInfo
  },
  methods: {}
}
</script>

<style lang="css">
  .nav-link {
    cursor:pointer;
  }
</style>
