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

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'strategy',
          name: 'Strategy',
          component: Strategy
        },
        {
          path: 'strategyList',
          name: 'StrategyList',
          component: StrategyList
        },
        {
          path: 'Agent',
          name: 'Agent',
          component: Agent
        },
        {
          path: 'AgentList',
          name: 'AgentList',
          component: AgentList
        }
      ]
    }
  ]
})
