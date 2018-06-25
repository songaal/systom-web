<template>
  <div>
    <div v-if="type === 'menu'"
         class="sidebar-header">
      <b-row>
        <b-col>
          {{$store.userId}}
        </b-col>
      </b-row>
    </div>
    <b-nav-item-dropdown v-if="type === 'header'" right no-caret>
      <template slot="button-content">
        <ul class="nav navbar-nav username-margin">
          <li class="nav-item gnb-nav-item">
            {{$store.userId}} <i class="ml-1 fa fa-sort-down"></i>
          </li>
        </ul>
      </template>
      <b-dropdown-item @click="() => {this.$router.push('/investment')}">
        <i class="fa fa-tachometer"></i> 나의투자보기
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
import config from '../Config'
import utils from '../Utils'

export default {
  name: 'AccountInfo',
  props: ['type'],
  components: {},
  data () {
    return {}
  },
  created () {},
  methods: {
    logout () {
      this.$router.push('/logout')
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
