<template>
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <!-- <img src="static/img/avatars/6.jpg" class="img-avatar" alt="testuser"> -->
          <ul class="nav navbar-nav d-md-down-none">
            <li class="nav-item pr-2">
              {{userId}} <i class="fa fa-sort-down"></i>
            </li>
          </ul>
        </template>
        <b-dropdown-item>
          <i class="fa fa-gear"></i> 계정설정
        </b-dropdown-item>
        <!-- <b-dropdown-divider></b-dropdown-divider> -->
        <b-dropdown-item @click="logout">
          <i class="fa fa-lock"></i> 로그아웃
        </b-dropdown-item>
      </b-nav-item-dropdown>
</template>
<script>
import utils from '../components/Utils'
import config from '../config/Config'
import axios from 'axios'

export default {
  name: 'header-dropdown-accnt',
  data: () => {
    return { userId: 'testUser' }
  },
  methods: {
    logout () {
      axios.post(config.serverHost + '/auth/logout', this.userInfo).then((result) => {
        this.$router.replace('/')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
        this.$router.replace('/')
      })
    }
  }
}
</script>
