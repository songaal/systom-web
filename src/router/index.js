import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Agent from '@/views/Agent'
import AgentList from '@/views/AgentList'

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
