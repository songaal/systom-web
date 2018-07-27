<template>
  <div>
    <div class="login-page login-3">
      <div class="site-wrapper">
        <div class="login-box">
          <div class="box-wrapper">
            <div class="logo-main">
              <img src="/static/img/systom_logo.png" alt="systom logo" class="mb-4">
              <h3>회원가입</h3>
            </div>
            <div>
              <div class="form-group">
                  <input type="text" class="form-control form-control-danger" placeholder="아이디를 입력하세요." v-model="userInfo.userId" @keyup="enterSignUp">
              </div>
              <div class="form-group">
                  <input type="email" class="form-control form-control-danger" placeholder="이메일을 입력하세요." v-model="userInfo.email" @keyup="enterSignUp">
              </div>
              <button class="btn btn-login btn-full" @click="signUp">가입</button>
            </div>
            <div class="page-copyright">
                <p>systom © 2018</p>
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
      userInfo: {
        userId: '',
        email: ''
      }
    }
  },
  created () {
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
    signUp () {
      console.log('userId', this.userInfo.userId, 'email', this.userInfo.email)
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
      axios.post(config.serverHost + '/auth/signUp', this.userInfo, {headers: config.defaultHeaders()}).then((result) => {
        console.log('회원가입 결과 받음:', result)
        if (result.status === 200) {
          this.$root.$emit('bv::show::modal', 'signUpSuccess')
          this.$el.querySelector('.modal-close').focus()
        } else {
          this.$vueOnToast.pop('warning', '실패', '회원가입 실패하였습니다.')
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    modalClose () {
      this.$root.$emit('bv::hide::modal', 'signUpSuccess')
      this.$router.push('/login')
    },
    setFocus () {
      this.$refs.focusThis.focus()
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
</style>
