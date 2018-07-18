// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    strategy: null,
    backtest: {
      exchange: null,
      symbol: null,
      timeInterval: null
    },
    coinChart: {
      tradeHistory: []
    }
  }
})
