<template>
  <header class="app-header navbar">
    <b-link class="navbar-brand" to="#"></b-link>

     <b-navbar-nav class="ml-auto">
       <b-nav-item-dropdown right>
           <!-- Using button-content slot -->
             <template slot="button-content">
               <em>홍길동</em>
             </template>
             </button>
           <b-dropdown-item href="#">Profile</b-dropdown-item>
           <b-dropdown-item href="#">Signout</b-dropdown-item>
         </b-nav-item-dropdown>
       </b-navbar-nav>
     </b-navbar-nav>
  </header>
</template>
<script>
export default {
  name: 'c-header'
}
</script>
<style>

</style>
