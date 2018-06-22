<template>
  <div>
    <nav class="sidebar-nav" v-if="type === 'menu'">
      <div slot="header"></div>
      <ul class="nav">
        <template v-for="(item, index) in navItems">
          <template v-if="item.title">
            <SidebarNavTitle :name="item.name" :classes="item.class" :wrapper="item.wrapper"/>
          </template>
          <template v-else-if="item.divider">
            <SidebarNavDivider :classes="item.class"/>
          </template>
          <template v-else>
            <template v-if="item.children">
              <!-- First level dropdown -->
              <SidebarNavDropdown :name="item.name" :url="item.url" :icon="item.icon">
                <template v-for="(childL1, index) in item.children">
                  <template v-if="childL1.children">
                    <!-- Second level dropdown -->
                    <SidebarNavDropdown :name="childL1.name" :url="childL1.url" :icon="childL1.icon">
                      <li class="nav-item" v-for="(childL2, index) in childL1.children">
                        <SidebarNavLink :name="childL2.name" :url="childL2.url" :icon="childL2.icon" :badge="childL2.badge" :variant="item.variant"/>
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <template v-else>
                    <SidebarNavItem :classes="item.class">
                      <SidebarNavLink :name="childL1.name" :url="childL1.url" :icon="childL1.icon" :badge="childL1.badge" :variant="item.variant"/>
                    </SidebarNavItem>
                  </template>
                </template>
              </SidebarNavDropdown>
            </template>
            <template v-else>
              <SidebarNavItem :classes="item.class">
                <SidebarNavLink :name="item.name" :url="item.url" :icon="item.icon" :badge="item.badge" :variant="item.variant"/>
              </SidebarNavItem>
            </template>
          </template>
        </template>
      </ul>
      <slot></slot>
    </nav>



    <b-nav-item-dropdown v-if="type === 'header'" right no-caret>
      <template slot="button-content">
        <ul class="nav navbar-nav username-margin">
          <li class="nav-item gnb-nav-item">
            {{$store.userId}} <i class="ml-1 fa fa-sort-down"></i>
          </li>
        </ul>
      </template>
      <b-dropdown-item @click="() => {this.$router.push('/investment')}">
        <i class="fa fa-tachometer"></i> 나의투자상품
      </b-dropdown-item>
      <b-dropdown-item @click="moveAcount">
        <i class="fa fa-user"></i> 계정설정
      </b-dropdown-item>
      <b-dropdown-item @click="logout">
        <i class="fa fa-lock"></i> 로그아웃
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </div>

</template>
<script>
import SidebarFooter from '../components/Sidebar/SidebarFooter'
import SidebarForm from '../components/Sidebar/SidebarForm'
import SidebarHeader from '../components/Sidebar/SidebarHeader'
import SidebarMinimizer from '../components/Sidebar/SidebarMinimizer'
import SidebarNavDivider from '../components/Sidebar/SidebarNavDivider'
import SidebarNavDropdown from '../components/Sidebar/SidebarNavDropdown'
import SidebarNavLink from '../components/Sidebar/SidebarNavLink'
import SidebarNavTitle from '../components/Sidebar/SidebarNavTitle'
import SidebarNavItem from '../components/Sidebar/SidebarNavItem'
import nav from '../_nav'
import config from '../Config'
import utils from '../Utils'

export default {
  name: 'AccountInfo',
  props: ['type'],
  components: {
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNavDivider,
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarNavItem
  },
  data () {
    return {
      navItems: nav.items
    }
  },
  created () {},
  methods: {
    logout () {
      this.axios.post(config.serverHost + '/auth/logout', {}, config.getAxiosPostOptions()).then((result) => {
        this.$router.replace('/')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
        this.$router.replace('/')
      })
    },
    moveAcount () {
      this.$router.push('/account')
    }
  }
}
</script>
<style>
.username-margin {
  margin-right:20px
}
.gnb-nav-item {
  /* font-size: 16pt;
  line-height: 18px; */
}
</style>
