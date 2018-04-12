<template>
  <header class="app-header navbar">
    <!-- mobile -->
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- brand -->
    <b-link class="navbar-brand" to="#"></b-link>
    <!-- desktop -->
    <button class="navbar-toggler sidebar-toggler d-md-down-none m-10" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-navbar-nav class="ml-auto">
      <HeaderDropdownAccnt/>
    </b-navbar-nav>
  </header>
  <!-- <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none mr-auto" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-nav-item-dropdown right no-caret>
      <template slot="button-content">
        <img src="static/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
      </template>
      <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-bell-o"></i> Updates<b-badge variant="info">{{itemsCount}}</b-badge></b-dropdown-item>
      <b-dropdown-item><i class="fa fa-envelope-o"></i> Messages<b-badge variant="success">{{itemsCount}}</b-badge></b-dropdown-item>
      <b-dropdown-item><i class="fa fa-tasks"></i> Tasks<b-badge variant="danger">{{itemsCount}}</b-badge></b-dropdown-item>
      <b-dropdown-item><i class="fa fa-comments"></i> Comments<b-badge variant="warning">{{itemsCount}}</b-badge></b-dropdown-item>
      <b-dropdown-header tag="div" class="text-center"><strong>Settings</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user"></i> Profile</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench"></i> Settings</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-usd"></i> Payments<b-badge variant="light">{{itemsCount}}</b-badge></b-dropdown-item>
      <b-dropdown-item><i class="fa fa-file"></i> Projects<b-badge variant="primary">{{itemsCount}}</b-badge></b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item><i class="fa fa-shield"></i> Lock Account</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-lock"></i> Logout</b-dropdown-item>
    </b-nav-item-dropdown>
  </header> -->
</template>
<script>
import HeaderDropdownAccnt from './HeaderDropdownAccnt.vue'
export default {
  name: 'c-header',
  components: {
    HeaderDropdownAccnt
  },
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>
<style>
.navbar-toggler {margin-top: 10px;}
</style>
