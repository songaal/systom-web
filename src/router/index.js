import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Strategys from '@/views/Strategys'
import StrategysList from '@/views/StrategysList'
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
          path: '/strategys',
          name: 'Strategys',
          component: Strategys
        },
        {
          path: '/strategys/:strategysId',
          name: 'Strategys',
          component: Strategys,
          props: true
        },
        {
          path: '/strategysList',
          name: 'StrategysList',
          component: StrategysList
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
