// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueOnToast from 'vue-on-toast'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store'
import Config from './Config'
import Utils from './Utils'
// import Datatable from 'vue2-datatable-component'

Vue.use(VueOnToast)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
// Vue.use(Datatable)

/* Import Bootstrap Vue Styles */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
