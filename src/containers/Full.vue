<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar class="d-lg-none"/>
      <main class="main">
        <div class="container-fluid">
          <router-view />
        </div>
      </main>
    </div>
    <AppFooter/>
    <toast-container :toastConfig="toastConfig"/>
  </div>
</template>

<script>
import { Header as AppHeader, Sidebar, Footer as AppFooter } from '../components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    AppFooter,
    Sidebar
  },
  data () {
    return {
      toastConfig: {
        timeout: 2000
      }
    }
  },
  created () {}
}
</script>

<style>
.sidebar-fixed .main,
.sidebar-fixed .app-footer {
  margin-left: 0px;
}
@media all and (max-width: 768px) {
  .container-fluid {
    padding-left: 10px!important;
    padding-right: 10px!important;
  }
}
</style>
