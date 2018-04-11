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
import PageNotFound from '@/views/Page404'
Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/Dashboard',
      name: 'Home',
      component: Full,
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
    },
    {
      path: '*',
      component: PageNotFound
    }
  ]
})
