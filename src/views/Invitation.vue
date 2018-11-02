<template>
  <div>
    <div class="login-page login-3" :class="{'d-none': !isShow}">
      <div class="site-wrapper">
        <div class="login-box">
          <div class="box-wrapper">
            <div class="logo-main">
              <img src="/static/img/systom_logo.png" alt="systom logo" class="mb-4">
              <h3 ref="message"></h3>
            </div>
            <div>
              <div class="form-group">
                  <input type="text"
                         class="form-control form-control-danger"
                         placeholder="아이디를 입력하세요."
                         v-model="userInfo.userId"
                         @keyup="enterSignUp"
                         maxlength="30"
                         :disabled="isDisabled">
              </div>
              <div class="form-group">
                  <input type="email"
                         class="form-control form-control-danger"
                         placeholder="이메일을 입력하세요."
                         v-model="userInfo.email"
                         @keyup="enterSignUp"
                         :disabled="isDisabled">
              </div>
              <div class="form-group">
                  <input type="text"
                         class="form-control form-control-danger"
                         placeholder="초대코드를 입력하세요."
                         v-model="userInfo.ref"
                         @keyup="enterSignUp"
                         :disabled="isDisabled">
              </div>
              <div class="form-group">
                  <input type="checkbox"
                         v-model="userInfo.isOk">
                  <a class="text-info" href="/static/terms.html" target="_blank">이용약관</a> 및
                  <a class="text-info" href="/static/privacy.html" target="_blank">개인정보취급방침</a>에 동의합니다.
              </div>
              <button class="btn btn-login btn-full"
                      @click="signUp"
                      :disabled="isDisabled || !userInfo.isOk"
              >
                가입
              </button>
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

    <b-modal id="signUpSuccess"
             title="회원가입 완료"
             size="lg"
             v-b-modal.modal-center
             ok-only
             @shown="setFocus"
    >
      <div class="text-center">
        메일로 임시 비밀번호가 발급되었습니다.<br/>
        아이디, 임시비밀번호로 로그인을 진행하세요.<br/>
        이메일 :[ {{userInfo.email}} ]<br/>
      </div>
      <div slot="modal-footer">
       <b-btn block variant="primary" class="modal-close" @click="modalClose" ref="focusThis">확인</b-btn>
      </div>
    </b-modal>

    <toast-container/>
  </div>
</template>

<script>
import './global/css/Laraspace.css'
import axios from 'axios'
import config from '../Config'
import utils from '../Utils'

export default {
  name: 'Register',
  data () {
    return {
      height: 0,
      isDisabled: true,
      isShow: false,
      userInfo: {
        userId: '',
        email: '',
        ref: null,
        isOk: false
      }
    }
  },
  created () {
    this.validRefCode()
    this.height = window.innerHeight
    setInterval(() => { this.height = window.innerHeight }, 100)
  },
  mounted () {
    this.$el.querySelector('.site-wrapper').style.height = this.height + 'px'
    setInterval(() => { this.$el.querySelector('.site-wrapper').style.height = this.height + 'px' }, 100)
  },
  methods: {
    enterSignUp (e) {
      if (e.keyCode === 13) {
        this.signUp()
      }
    },
    signUp (el) {
      if (this.userInfo.userId === '') {
        this.$vueOnToast.pop('warning', '실패', '아이디를 입력하세요.')
        return
      }
      if (!/[a-zA-Z0-9-_]{4,20}/gi.test(this.userInfo.email)) {
        this.$vueOnToast.pop('warning', '실패', '아이디 글자수는 6자 이상입니다.')
        return
      }
      if (this.userInfo.email === '') {
        this.$vueOnToast.pop('warning', '실패', '이메일을 입력하세요.')
        return
      }
      if (!/\S+@\S+\.\S+/gi.test(this.userInfo.email)) {
        this.$vueOnToast.pop('warning', '실패', '이메일 형식이 맞지 않습니다.')
        return
      }
      el.disabled = true
      axios.post(config.serverHost + '/auth/signUp', this.userInfo, {headers: config.defaultHeaders()}).then((result) => {
        el.disabled = false
        if (result.status === 200) {
          this.$root.$emit('bv::show::modal', 'signUpSuccess')
          this.$el.querySelector('.modal-close').focus()
        } else {
          this.$vueOnToast.pop('warning', '실패', '회원가입 실패하였습니다.')
        }
      }).catch((e) => {
        el.disabled = false
        let message = {
          '500': {type: 'warning', title: '실패', msg: '이미 사용중인 아이디/이메일 입니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    modalClose () {
      this.$root.$emit('bv::hide::modal', 'signUpSuccess')
      this.$router.push('/login')
    },
    setFocus () {
      this.$refs.focusThis.focus()
    },
    validRefCode () {
      let ref = this.$route.query.ref
      if (ref === undefined || ref === null || ref === '') {
        this.isShow = true
        this.isDisabled = false
        // this.$router.replace({name: 'PageNotFound'})
        return false
      }
      let url = config.serverHost + '/invitations?ref=' + ref
      axios.get(url, {headers: config.defaultHeaders()}).then((response) => {
        let invitation = response.data
        if (invitation === undefined || invitation === null) {
          this.$router.replace({name: 'PageNotFound'})
          return false
        }
        this.isShow = true
        this.isDisabled = false
        this.userInfo.ref = ref
        this.$refs.message.innerHTML = invitation.userId + '님에게 초대받았습니다.'
      }).catch((e) => {
        this.isShow = true
        // utils.httpFailNotify(e, this)
        // this.$router.replace({name: 'PageNotFound'})
        this.$refs.message.innerHTML = '사용할 수 없는 초대코드입니다.'
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
