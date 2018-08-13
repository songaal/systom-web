import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import Register from '@/views/Register'
import ChangePassword from '@/views/ChangePassword'
import Account from '@/views/Account'

import Investment from '@/views/Investment'
import InvestDetail from '@/views/InvestDetail'

import InvestGoods from '@/views/InvestGoods'
import InvestGoodsDetail from '@/views/InvestGoodsDetail'

// invest application
import InvestGoodsApply from '@/views/InvestPartic/InvestGoodsApply'
import InvestGoodsTerms from '@/views/InvestPartic/InvestGoodsTerms'
import InvestGoodsResult from '@/views/InvestPartic/InvestGoodsResult'

import InvestGoodsCancel from '@/views/InvestPartic/InvestGoodsCancel'

// manager only
import Strategy from '@/views/Strategy'
import Strategies from '@/views/Strategies'

import Invoice from '@/views/Invoice'
import Invitation from '@/views/Invitation'
// error page
import PageNotFound from '@/views/Page404'

import axios from 'axios'
import config from '../Config'
import utils from '../Utils'
import { store } from '../store'

Vue.use(Router)

let isAuth = (to, from, next) => {
  axios.get(`${config.serverHost}/auth`, config.getAxiosGetOptions()).then((result) => {
    if (result.status === 200) {
      store.userId = result.data.username
      store.isManager = result.data.isManager
      store.email = result.data.email
      next()
    } else {
      store.userId = null
      store.isManager = null
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
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    // {
    //   path: '/register',
    //   name: 'Register',
    //   component: Register
    // },
    {
      path: '/invitation',
      name: 'Invitation',
      component: Invitation
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
        store.state.coinChart.tradeHistory = []
        isAuth(to, from, next)
      },
      children: [
        {
          path: '/account',
          name: 'Account',
          component: Account
        },
        {
          path: '/investment',
          name: 'Investment',
          component: Investment
        },
        {
          path: '/investDetail/:investId',
          name: 'InvestDetail',
          component: InvestDetail
        },
        {
          path: '/investGoods',
          name: 'InvestGoods',
          component: InvestGoods
        },
        {
          path: '/investGoods/:goodsId',
          name: 'InvestGoodsDetail',
          component: InvestGoodsDetail
        },
        {
          path: '/investGoods/:goodsId/apply',
          name: 'InvestGoodsApply',
          component: InvestGoodsApply
        },
        {
          path: '/investGoods/:goodsId/terms',
          name: 'InvestGoodsTerms',
          component: InvestGoodsTerms
        },
        {
          path: '/investGoods/:goodsId/result',
          name: 'InvestGoodsResult',
          component: InvestGoodsResult
        },
        {
          path: '/investGoods/:investId/cancel',
          name: 'InvestGoodsCancel',
          component: InvestGoodsCancel
        },
        {
          path: '/strategies',
          name: 'Strategies',
          component: Strategies
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
          path: '/invoice',
          name: 'Invoice',
          component: Invoice
        }
      ]
    }
  ]
})
