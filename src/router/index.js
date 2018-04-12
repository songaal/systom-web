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

// error page
import PageNotFound from '@/views/Page404'

Vue.use(Router)

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
      afterEach: (to, from) => {
        console.log('to, from', to, from)
      },
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/strategy',
          name: 'strategy',
          component: Strategy
        },
        {
          path: '/strategy/:strategyId',
          name: 'Strategy',
          component: Strategy,
          props: true
        },
        {
          path: '/strategyList',
          name: 'StrategyList',
          component: StrategyList
        },
        {
          path: '/agent',
          name: 'Agent',
          component: Agent
        },
        {
          path: '/agentList',
          name: 'AgentList',
          component: AgentList
        }
      ]
    }
  ]
})
