import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueOnToast from 'vue-on-toast'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store'

Vue.use(VueOnToast)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

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
