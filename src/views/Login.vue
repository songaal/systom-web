<template>
  <div>
    <div class="login-page login-3">
      <div class="site-wrapper">
        <div class="login-box">
          <div class="box-wrapper">
            <div class="logo-main">
              <img src="/static/img/systom_logo.png" alt="systom logo" class="mb-4">
              <h3>로그인</h3>
            </div>
            <div>
              <div class="form-group">
                <input type="text" class="form-control form-control-danger" placeholder="아이디를 입력하세요." v-model="userInfo.userId"  @keyup="enterLogin" maxlength="30">
              </div>
              <div class="form-group">
                <input type="password" class="form-control form-control-danger" placeholder="비밀번호를 입력하세요." v-model="userInfo.password"  @keyup="enterLogin" maxlength="30">
              </div>
              <div class="other-actions row">
                  <div class="col-6">
                  </div>
                  <div class="col-6 text-right">
                    <ForgotPasswordModal value="비밀번호 초기화"></ForgotPasswordModal>
                  </div>
              </div>
              <b-link @click="login" class="btn btn-theme btn-full">로그인</b-link>
              <!-- <div class="form-group other-options">
                  <div class="social-icons pull-right">
                    <b-link to="/register" class="forgot-link">
                      회원가입
                    </b-link>
                  </div>
              </div> -->
            </div>
            <div class="page-copyright">
              <p class="footer-font">SYSTOM © 2018 <br />
                문의: <a class="text-info" href="mailto:hello@systom.io">hello@systom.io</a> <br />
                (주)지앤클라우드 | 서울특별시 서초구 신반포로45길 18, 501호 <br />
                전화번호: <a href="tel:02-508-1151"></a>02-508-1151 <br />
                사업자등록번호: 220-88-03822 <br />
                대표이사: 송상욱
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
import ForgotPasswordModal from '../components/modals/ForgotPasswordModal'

const mainPage = '/investment'

export default {
  name: 'Login',
  data () {
    return {
      height: 0,
      userInfo: {
        userId: '',
        password: ''
      }
    }
  },
  components: {
    ForgotPasswordModal
  },
  methods: {
    enterLogin (e) {
      if (e.keyCode === 13) {
        this.login()
      }
    },
    login () {
      if (this.userInfo.userId === '') {
        this.$vueOnToast.pop('warning', '실패', '아이디를 입력하세요.')
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

      this.axios.post(config.serverHost + '/auth/login', this.userInfo, {withCredentials: true}).then((result) => {
        if (result.data.challengeName !== undefined && result.data.challengeName === 'NEW_PASSWORD_REQUIRED' && result.data.session !== undefined) {
          this.$router.push('/change-password?u=' + this.userInfo.userId + '&s=' + result.data.session)
        } else {
          this.$router.push(mainPage)
        }
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '로그인 실패', msg: '아이디/패스워드가 잘못되었습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    isLogged () {
      this.axios.get(config.serverHost + '/auth', {withCredentials: true}).then((result) => {
        let userInfo = result.data
        this.$router.push(mainPage)
      }).catch((e) => {
        // ignore
      })
    }
  },
  created () {
    this.isLogged()
    this.height = window.innerHeight
    setInterval(() => { this.height = window.innerHeight }, 100)
  },
  mounted () {
    if (this.$route.query.changed === null) {
      this.$vueOnToast.pop('success', '성공', '비밀번호가 변경되었습니다. 변경된 비밀번호로 로그인해주세요.')
    } else if (this.$route.query.changefail === null) {
      this.$vueOnToast.pop('error', '실패', '비밀번호 변경 시간이 초과되었습니다. 다시 로그인 시도해 주세요.')
    }
    this.$el.querySelector('.site-wrapper').style.height = this.height + 'px'
    setInterval(() => { this.$el.querySelector('.site-wrapper').style.height = this.height + 'px' }, 100)
  }
}
</script>

<style>
.content-box {
  background-image: url('/static/img/systom_background.jpg') !important;
}
.login-page.login-3 .logo-main img {
    width: 150px;
}
.login-page.login-3::before {
  background-image: url('/static/img/systom_background.jpg') !important;
}
.footer-font {
  font-size: 0.9em;
}
</style>
