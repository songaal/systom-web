<template>
  <div>
    <div class="login-page login-3">
      <div class="site-wrapper">
        <div class="login-box">
          <div class="box-wrapper">
            <div class="logo-main">
              <img src="/static/img/systom_logo.png" alt="systom logo" class="mb-4">
              <h3>비밀번호 변경</h3>
            </div>
            <div>
              <div class="form-group">
                <input type="text" class="form-control form-control-danger" disabled  v-model="userInfo.userId">
              </div>
              <div class="form-group">
                <input type="password" class="form-control form-control-danger" placeholder="새로운 비밀번호를 입력하세요." v-model="userInfo.password"  maxlength="30">
              </div>
              <div class="form-group">
                <input type="password" class="form-control form-control-danger" placeholder="확인 비밀번호를 입력하세요." v-model="userInfo.confirmPassword" maxlength="30">
              </div>
              <b-link class="btn btn-theme btn-full" @click="changePassword">비밀번호 변경</b-link>
            </div>
            <div class="page-copyright">
              <p class="footer-font">systom © 2018 <br />
                문의: <a class="text-info" href="mailto:hello@systom.io">hello@systom.io</a> <br />
                (주)지앤클라우드 | 서울특별시 서초구 신반포로45길 18, 501호 <br />
                전화번호: <a href="tel:02-508-1151"></a>02-508-1151 <br />
                사업자등록번호: 220-88-03822 <br />
                대표이사: 송상욱 |
                <a class="text-dark" href="/static/terms.html" target="_blank">이용약관</a> | 
                <a class="text-dark" href="/static/privacy.html" target="_blank">개인정보취급방침</a>
              </p>
            </div>
          </div>
        </div>
        <div class="content-box">
            <h1>
              암호화폐 로봇 트레이딩 플랫폼<br /><b>시스텀</b>
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
        // this.$router.replace('/login?changed')
        setTimeout(() => {
          this.reLogin()
        }, 500)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
        if (e.response.status === 500) {
          this.$router.replace('/login?chagefail')
        }
      })
    },
    reLogin () {
      this.axios.post(config.serverHost + '/auth/login', this.userInfo, {withCredentials: true}).then((result) => {
        if (result.data.challengeName !== undefined && result.data.challengeName === 'NEW_PASSWORD_REQUIRED' && result.data.session !== undefined) {
          this.$router.push('/change-password?u=' + this.userInfo.userId + '&s=' + result.data.session)
        } else {
          this.$router.push('/investment')
        }
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '로그인 실패', msg: '아이디/패스워드가 잘못되었습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    }
  }
}
</script>
<style>
.content-box {
  background-image: url('/static/img/systom_background.jpg');
}
.login-page.login-3 .logo-main img {
  width: 150px;
}
.footer-font {
  font-size: 0.9em;
}
</style>
