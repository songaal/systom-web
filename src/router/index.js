import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Console from '@/containers/Console'

// Views
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import Register from '@/views/Register'
import UnRegister from '@/views/UnRegister'
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

// manager only
import Strategy from '@/views/Strategy'
import Strategies from '@/views/Strategies'

import Invoice from '@/views/Invoice'
import Invitation from '@/views/Invitation'
// error page
import PageNotFound from '@/views/Page404'

import FrontEnd from '@/containers/FrontEnd.vue'
import Main from '@/views/main.vue'
import Faq from '@/views/faq.vue'
import Docs from '@/views/docs.vue'

import axios from 'axios'
import config from '../Config'
import utils from '../Utils'
import { store } from '../store'

Vue.use(Router)

const excludeAuth = {
  'InvestGoods': true,
  'InvestGoodsDetail': true
}

let isAuth = (to, from, next) => {
  axios.get(`${config.serverHost}/auth`, config.getAxiosGetOptions()).then((result) => {
    store.userId = result.data.username
    store.isManager = result.data.isManager
    store.email = result.data.email
    store.guest = false
    store.isCertification = result.data.isCertification === 'true'
    // isPaidPlan
    next()
  }).catch((e) => {
    store.userId = null
    store.isManager = null
    store.email = null
    store.guest = null
    store.isCertification = null
    if (excludeAuth[to.name]) {
      store.guest = true
      next()
    } else {
      next('/login')
    }
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
    {
      path: '/invitation',
      name: 'Invitation',
      component: Invitation
    },
    {
      path: '/register',
      name: 'Register',
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
      name: 'FrontEnd',
      component: FrontEnd,
      children: [
        {
          path: '/',
          name: 'Main',
          component: Main
        },
        {
          path: '/faq',
          name: 'Faq',
          component: Faq
        },
        {
          path: '/docs',
          name: 'Docs',
          component: Docs
        }
      ]
    },
    {
      path: '/',
      name: 'Console',
      component: Console,
      beforeEnter (to, from, next) {
        store.state.coinChart.tradeHistory = []
        isAuth(to, from, next)
      },
      children: [
        {
          path: '/unRegister',
          name: 'UnRegister',
          component: UnRegister
        },
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
