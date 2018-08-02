<template>
  <div>
    <a href="#"
       class="text-primary"
       @click="showChangePasswordModal">
      <u>변경</u>
    </a>
    <b-modal id="changePasswordModal">
      <template slot="modal-header">
        <h5>비밀번호 변경</h5>
      </template>

        <b-row>
          <b-col cols="3">기존 비밀번호</b-col>
          <b-col cols="9"><b-input type="password" class="mt-0" v-model="changePassword.oldPassword" /></b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="3">신규 비밀번호</b-col>
          <b-col cols="9"><b-input type="password" class="mt-0" v-model="changePassword.newPassword" /></b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="3">확인 비밀번호</b-col>
          <b-col cols="9"><b-input type="password" class="mt-0" v-model="changePassword.confirmPassword" /></b-col>
        </b-row>

      <template slot="modal-footer">
        <b-button @click="(e) => {this.$root.$emit('bv::hide::modal', 'changePasswordModal')}">취소</b-button>
        <b-button variant="primary" @click="sendChangePassword">변경</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'ChangePasswordModal',
  extends: '',
  components: {},
  props: [],
  data () {
    return {
      changePassword: {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    showChangePasswordModal () {
      this.changePassword.oldPassword = null
      this.changePassword.newPassword = null
      this.changePassword.confirmPassword = null
      this.$root.$emit('bv::show::modal', 'changePasswordModal')
    },
    sendChangePassword () {
      if (this.changePassword.oldPassword === null || this.changePassword.oldPassword === '') {
        this.$vueOnToast.pop('error', '실패', '기존비밀번호를 입력하세요.')
        return false
      }
      if (this.changePassword.newPassword === null || this.changePassword.newPassword === '') {
        this.$vueOnToast.pop('error', '실패', '신규비밀번호를 입력하세요.')
        return false
      }
      if (this.changePassword.confirmPassword === null || this.changePassword.confirmPassword === '') {
        this.$vueOnToast.pop('error', '실패', '확인비밀번호를 입력하세요.')
        return false
      }
      if (this.changePassword.newPassword.length < 6) {
        this.$vueOnToast.pop('error', '실패', '비밀번호는 6자리 이상입니다.')
        return false
      }
      if (!/[a-z]/gi.test(this.changePassword.newPassword) || !/[0-9]/gi.test(this.changePassword.newPassword)) {
        this.$vueOnToast.pop('error', '실패', '비밀번호는 영문, 숫자를 필수로 입력하세요.')
        return false
      }
      if (this.changePassword.confirmPassword === null || this.changePassword.confirmPassword === '') {
        this.$vueOnToast.pop('error', '실패', '확인비밀번호를 입력하세요.')
        return false
      }
      if (this.changePassword.confirmPassword !== this.changePassword.newPassword) {
        this.$vueOnToast.pop('error', '실패', '비밀번호가 일치 하지 않습니다.')
        return false
      }

      let url = config.serverHost + '/auth/changePassword'
      this.axios.post(url, this.changePassword, config.getAxiosPostOptions()).then((response) => {
        this.$vueOnToast.pop('success', '성공', '비밀번호가 변경되었습니다.')
        this.$root.$emit('bv::hide::modal', 'changePasswordModal')
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '비밀번호가 잘못되었습니다.'}
        }
        if (e.response.data !== undefined && e.response.data.message === 'LimitExceeded') {
          message = {
            '400': {type: 'error', title: '실패', msg: '너무많은 요청을 하였습니다. 잠시후 진행하세요.'}
          }
        }
        utils.httpFailNotify(e, this, message)
      })
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>

</style>
