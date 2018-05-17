// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strategy: {
    name: '',
    code: '',
    options: []
  }
})
