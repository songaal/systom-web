<template>
      <b-nav-item-dropdown right no-caret class="">
        <template slot="button-content">
          <!-- <img src="static/img/avatars/6.jpg" class="img-avatar" alt="testuser"> -->
          <ul class="nav navbar-nav username-margin">
            <li class="nav-item">
              {{userId}} <i class="fa fa-sort-down"></i>
            </li>
          </ul>
          <!-- <ul class="nav navbar-nav d-sm-down-none">
            <li class="nav-item pr-2">
              {{userId}} <i class="fa fa-sort-down"></i>
            </li>
          </ul> -->
          <!-- <ul class="nav navbar-nav d-sm-down-block d-md-none">
            <li class="nav-item pr-2">
              {{userId.split('@')}} <i class="fa fa-sort-down"></i>
            </li>
          </ul> -->
        </template>
        <b-dropdown-item @click="moveAcount">
          <i class="fa fa-user"></i> 계정설정
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
    return { userId: '' }
  },
  created () {
    this.authentication()
  },
  methods: {
    authentication () {
      let url = config.serverHost + '/auth'
      axios.get(url, {withCredentials: true}).then((result) => {
        if (result.status === 200) {
          this.userId = result.data.username
        } else {
          console.log('token expire not access.')
          this.$router.push('/login')
        }
      }).catch((e) => {
        console.log('auth request error.', e)
        this.$router.push('/login')
      })
    },
    logout () {
      axios.post(config.serverHost + '/auth/logout', {}, {withCredentials: true}).then((result) => {
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
</style>
