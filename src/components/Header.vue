<template>
  <header class="app-header navbar">
    <div class="container-fluid">
      <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
        <span class="navbar-toggler-icon"></span>
      </button>

      <a class="navbar-brand text-center text-primary font-weight-bold" href="/">
        SYSTOM
      </a>
      <ul class="nav navbar-nav mr-auto d-md-down-none">

        <li class="nav-item px-3">
          <b-link class="nav-link" to="/investGoods">투자하기</b-link>
        </li>

        <li class="nav-item px-3" v-if="$store.isManager === 'true'">
          <b-link class="nav-link" to="/strategies">전략관리</b-link>
        </li>

      </ul>

      <b-navbar-nav class="ml-auto d-md-down-none">
        <AccountInfo type="header" />
      </b-navbar-nav>
    </div>
  </header>
</template>

<script>
import AccountInfo from '../components/AccountInfo'

export default {
  name: '',
  extends: '',
  components: {
    AccountInfo
  },
  props: [],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>
.navbar-brand {
  line-height: 35px;
  padding: 0.6rem 1rem;
}
</style>
