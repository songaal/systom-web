<template>
  <div>
    <div class="login-page login-3">
      <div class="site-wrapper">
        <div class="login-box">
          <div class="box-wrapper">
            <div class="logo-main">
              <img src="/static/img/93278056_s.jpg" alt="coincloud Logo">
              <h3>비밀번호 변경</h3>
            </div>
            <div>
              <div class="form-group">
                <input type="text" class="form-control form-control-danger" disabled  v-model="userInfo.userId">
              </div>
              <div class="form-group">
                <input type="password" class="form-control form-control-danger" placeholder="새로운 비밀번호를 입력하세요." v-model="userInfo.password">
              </div>
              <div class="form-group">
                <input type="password" class="form-control form-control-danger" placeholder="확인 비밀번호를 입력하세요." v-model="userInfo.confirmPassword">
              </div>
              <b-link class="btn btn-theme btn-full" @click="changePassword">비밀번호 변경</b-link>
            </div>
            <div class="page-copyright">
              <p>CoinCloud © 2018</p>
            </div>
          </div>
        </div>
        <div class="content-box">
            <h1>
              암호화폐 로봇 트레이딩 플랫폼<br /><b>코인클라우드</b>
            </h1>
        </div>
      </div>
    </div>
    <toast-container/>
  </div>
</template>

<script>
import './global/css/Laraspace.css'
import utils from '../Utils'
import config from '../Config'
import axios from 'axios'

export default {
  name: 'ChangePassword',
  data () {
    return {
      height: 0,
      userInfo: {
        userId: '',
        password: '',
        confirmPassword: '',
        session: ''
      }
    }
  },
  created () {
    this.height = window.innerHeight
    setInterval(() => { this.height = window.innerHeight }, 100)
    this.userInfo.userId = this.$route.query.u
    this.userInfo.session = this.$route.query.s
  },
  mounted () {
    this.$el.querySelector('.site-wrapper').style.height = this.height + 'px'
    setInterval(() => { this.$el.querySelector('.site-wrapper').style.height = this.height + 'px' }, 100)
  },
  methods: {
    changePassword () {
      if (this.userInfo.userId === '') {
        this.$vueOnToast.pop('warning', '실패', '잘못된 접근.')
        this.$router.replace('/login')
        return
      }
      if (this.userInfo.password === '') {
        this.$vueOnToast.pop('warning', '실패', '비밀번호를 입력하세요.')
        return
      }
      if (this.userInfo.password.length < 6) {
        this.$vueOnToast.pop('warning', '실패', '비밀번호는 6자리 이상입니다.')
        return
      }
      if (!/[a-z]/gi.test(this.userInfo.password) || !/[0-9]/gi.test(this.userInfo.password)) {
        this.$vueOnToast.pop('warning', '실패', '비밀번호는 영문, 숫자를 필수로 입력하세요.')
        return
      }
      if (this.userInfo.confirmPassword !== this.userInfo.password) {
        this.$vueOnToast.pop('warning', '실패', '비밀번호가 일치 하지 않습니다.')
        return
      }
      axios.post(config.serverHost + '/auth/changeTempPassword', this.userInfo).then((result) => {
        if (result.status === 200) {
          this.$router.replace('/dashboard')
        } else {
          this.$vueOnToast.pop('warning', '실패', '비밀번호 변경이 실패 하였습니다.')
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  }
}
</script>
