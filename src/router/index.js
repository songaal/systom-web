import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Strategy from '@/views/Strategy'
import StrategyList from '@/views/StrategyList'
import Agent from '@/views/Agent'
import AgentList from '@/views/AgentList'
import Login from '@/views/Login'
import Register from '@/views/Register'
import ChangePassword from '@/views/ChangePassword'
import Account from '@/views/Account'

import MarketPlace from '@/views/MarketPlace'

// error page
import PageNotFound from '@/views/Page404'

import Investment from '@/views/Investment'

import axios from 'axios'
import config from '../Config'
import utils from '../Utils'
import { store } from '../store'
Vue.use(Router)

let isAuth = (to, from, next) => {
  axios.get(`${config.serverHost}/auth`, config.getAxiosGetOptions()).then((result) => {
    if (result.status === 200) {
      store.userId = result.data.username
      next()
    } else {
      store.userId = null
      console.log('token expire not access.')
      next('/login')
    }
  }).catch((e) => {
    store.userId = null
    console.log('auth request error.', e)
    next('/login')
  })
}

export default new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '*',
      component: PageNotFound
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: ChangePassword,
      params: true
    },
    {
      path: '/',
      redirect: '/login',
      name: 'Home',
      component: Full,
      beforeEnter (to, from, next) {
        isAuth(to, from, next)
      },
      children: [
        {
          path: '/investment',
          name: 'Investment',
          component: Investment
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/strategy',
          name: 'Strategy',
          component: Strategy
        },
        {
          path: '/strategies/:strategyId',
          name: 'StrategyDetail',
          component: Strategy
        },
        {
          path: '/strategies/:strategyId/versions/:version',
          name: 'StrategyVersionDetail',
          component: Strategy
        },
        {
          path: '/strategies/:strategyId/versions/:version/backtest',
          name: 'StrategyVersionBacktest',
          component: Strategy,
          meta: {backtest: true}
        },
        {
          path: '/strategies',
          name: 'StrategyList',
          component: StrategyList
        },
        {
          path: '/agents/:agentId',
          name: 'Agent',
          component: Agent,
          props: true
        },
        {
          path: '/agents',
          name: 'AgentList',
          component: AgentList
        },
        {
          path: '/account',
          name: 'Account',
          component: Account
        },
        {
          path: '/marketPlace',
          name: 'MarketPlace',
          component: MarketPlace
        }
      ]
    }
  ]
})
