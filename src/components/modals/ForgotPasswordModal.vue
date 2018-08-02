<template>
  <div>
    <b-link to="#" class="forgot-link" @click="showForgotPasswordModal">
      {{value}}
    </b-link>
    <b-modal id="forgotPasswordModal" no-close-on-backdrop :hide-footer="step === 4" >
      <template slot="modal-header">
        <h5>비밀번호 초기화</h5>
      </template>
      <div v-if="step === 1">
        <b-row>
          <b-col cols="3" class="mt-1">
            아이디
          </b-col>
          <b-col cols="9">
            <b-input class="mt-0" v-model="forgotPassword.userId"  maxlength="30"/>
          </b-col>
        </b-row>
      </div>

      <div v-if="step === 2">
        <b-row>
          <b-col cols="3" class="mt-1">
            전송메일
          </b-col>
          <b-col cols="9">
            <b-input class="mt-0" v-model="forgotPassword.email" disabled/>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="3" class="mt-1">
            확인코드
          </b-col>
          <b-col cols="9">
            <b-input class="mt-0" v-model="forgotPassword.confirmCode"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <span class="text-danger">메일로 전송된 확인코드를 입력하세요.</span>
          </b-col>
        </b-row>
      </div>

      <div v-if="step === 3">
        <b-row>
          <b-col cols="3" class="mt-1">
            변경비밀번호
          </b-col>
          <b-col cols="9">
            <b-input type="password" class="mt-0" v-model="forgotPassword.password"/>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="3" class="mt-1">
            확인비밀번호
          </b-col>
          <b-col cols="9">
            <b-input type="password" class="mt-0" v-model="forgotPassword.confirmPassword"/>
          </b-col>
        </b-row>
      </div>

      <div v-if="step === 4">
        <b-row class="mt-3">
          <b-col class="text-center">
            <h5>비밀번호가 변경되었습니다</h5>
            <b-button class="mt-4 mb-3" variant="outline-primary" block @click="(e) => {this.$root.$emit('bv::hide::modal', 'forgotPasswordModal')}">
              확인
            </b-button>
          </b-col>
        </b-row>
      </div>

      <template slot="modal-footer">
        <b-button v-if="step <= 3" @click="(e) => {this.$root.$emit('bv::hide::modal', 'forgotPasswordModal')}">취소</b-button>
        <b-button v-if="step === 1" variant="info" @click="sendConfirmCode">다음</b-button>
        <b-button v-if="step === 2" variant="info" @click="keyinConfirmCode">다음</b-button>
        <b-button v-if="step === 3" variant="primary" @click="resetForgotPassword">다음</b-button>
        <b-button v-if="step === 4" variant="primary" @click="(e) => {this.$root.$emit('bv::hide::modal', 'forgotPasswordModal')}">확인</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'ForgotPassword',
  extends: '',
  components: {},
  props: ['value'],
  data () {
    return {
      step: 1,
      forgotPassword: {
        action: null,
        userId: null,
        email: null,
        confirmCode: null,
        password: null,
        confirmPassword: null
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    showForgotPasswordModal () {
      this.forgotPassword.userId = null
      this.forgotPassword.email = null
      this.forgotPassword.confirmCode = null
      this.forgotPassword.password = null
      this.forgotPassword.confirmPassword = null
      this.step = 1
      this.$root.$emit('bv::show::modal', 'forgotPasswordModal')
    },
    sendConfirmCode () {
      if (this.forgotPassword.userId === null || this.forgotPassword.userId === '') {
        this.$vueOnToast.pop('error', '실패', '아이디를 입력하세요.')
        return false
      }
      this.forgotPassword.action = 'confirm'
      let url = config.serverHost + '/auth/forgotPassword'
      this.axios.post(url, this.forgotPassword, config.getAxiosPostOptions()).then((response) => {
        this.forgotPassword.email = response.data
        this.step = 2
        // this.$vueOnToast.pop('success', '성공', '상품을 등록하였습니다.')
      }).catch((e) => {
        let message = {}
        if (e.response.data !== undefined && e.response.data.message === 'LimitExceeded') {
          message = {
            '400': {type: 'error', title: '실패', msg: '요청 횟수가 초과하였습니다. 잠시후 시도해주세요.'}
          }
        } else {
          message = {
            '400': {type: 'error', title: '실패', msg: '아이디가 잘못되었습니다.'}
          }
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    keyinConfirmCode () {
      if (this.forgotPassword.confirmCode === null || this.forgotPassword.confirmCode === '') {
        this.$vueOnToast.pop('error', '실패', '확인코드를 입력하세요.')
        return false
      } else {
        this.step = 3
      }
    },
    resetForgotPassword () {
      if (this.forgotPassword.password === null || this.forgotPassword.password === '') {
        this.$vueOnToast.pop('error', '실패', '변경비밀번호를 입력하세요.')
        return false
      }
      if (this.forgotPassword.password.length < 6) {
        this.$vueOnToast.pop('warning', '실패', '비밀번호는 6자리 이상입니다.')
        return false
      }
      if (!/[a-z]/gi.test(this.forgotPassword.password) || !/[0-9]/gi.test(this.forgotPassword.password)) {
        this.$vueOnToast.pop('warning', '실패', '비밀번호는 영문, 숫자를 필수로 입력하세요.')
        return false
      }
      if (this.forgotPassword.confirmPassword === null || this.forgotPassword.confirmPassword === '') {
        this.$vueOnToast.pop('error', '실패', '확인비밀번호를 입력하세요.')
        return false
      }
      if (this.forgotPassword.confirmPassword !== this.forgotPassword.password) {
        this.$vueOnToast.pop('warning', '실패', '비밀번호가 일치 하지 않습니다.')
        return false
      }
      this.forgotPassword.action = 'reset'
      let url = config.serverHost + '/auth/forgotPassword'
      this.axios.post(url, this.forgotPassword, config.getAxiosPostOptions()).then((response) => {
        this.forgotPassword.email = response.data
        this.step = 4
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '확인코드/비밀번호가 잘못되었습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    // this.step = 4
    // this.$root.$emit('bv::show::modal', 'forgotPasswordModal')
  },
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>

</style>
