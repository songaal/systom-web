<template>
  <div class="sidebar">
    <AccountInfo type="menu" />
    <nav>
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
  </div>
</template>
<script>
import AccountInfo from '../AccountInfo'
import SidebarFooter from './SidebarFooter'
import SidebarForm from './SidebarForm'
import SidebarHeader from './SidebarHeader'
import SidebarMinimizer from './SidebarMinimizer'
import SidebarNavDivider from './SidebarNavDivider'
import SidebarNavDropdown from './SidebarNavDropdown'
import SidebarNavLink from './SidebarNavLink'
import SidebarNavTitle from './SidebarNavTitle'
import SidebarNavItem from './SidebarNavItem'
import nav from '../../_nav'

export default {
  name: 'sidebar',
  props: {},
  components: {
    AccountInfo,
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
  methods: {},
  created () {
    if (this.$store.guest === true) {
      // guest.
      this.navItems = this.navItems.filter(navItem => navItem.guest || navItem.guestOnly)
    } else {
      this.navItems = this.navItems.filter(navItem => !navItem.guestOnly)
    }
  },
  mounted () {
    let strategiesUrl = '/strategies'
    if (this.$store.isManager !== undefined && this.$store.isManager === 'true') {
      let isFill = false
      this.navItems.forEach(navItem => {
        if (navItem.url === strategiesUrl) {
          isFill = true
        }
      })
      if (!isFill) {
        this.navItems.unshift({
          name: '전략관리',
          url: '/strategies',
          icon: 'cui-code'
        })
      }
    } else {
      this.navItems.forEach((navItem, index) => {
        if (navItem.url === strategiesUrl) {
          this.navItems.splice(index, 1)
        }
      })
    }
  }
}
</script>

<style lang="css">
  .nav-link {
    cursor:pointer;
  }
</style>
