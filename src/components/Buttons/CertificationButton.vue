<template>
  <div>
    <div v-if="certification === null">
      <!-- 인증대기 -->
      <b-row>
        <b-col cols="12">
          <span class="d-inline text-danger">미인증</span>
          <a href="#" @click="userCertification" class="text-primary"><u>휴대전화 인증하기</u></a>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col class="d-lg-none" cols="12">
          <a href="#" @click="userCertification"  class="text-primary"><u>인증하기</u></a>
        </b-col>
      </b-row> -->
    </div>
    <div v-if="certification !== null">
      <!-- 인증완료 -->
      <b-row>
        <b-col cols="12">
          <!-- <span class="d-inline">인증완료. 끝자리 {{lastNum}}</span> -->
          <span class="d-inline">인증완료.</span>
          <a href="#" @click="userCertification"  class="text-primary"><u>다시인증하기</u></a>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col class="d-lg-none" cols="12">
          <a href="#" @click="userCertification"  class="text-primary"><u>다시인증하기</u></a>
        </b-col>
      </b-row> -->
    </div>
  </div>
</template>

<script>
import utils from '../../Utils'
import config from '../../Config'

IMP.init('imp52219493')

export default {
  name: 'CertifiationButton',
  extends: '',
  components: {},
  props: ['certification'],
  data () {
    return {
      isCertification: false,
      isProcess: false,
      lastNum: null
    }
  },
  computed: {},
  watch: {
    certification () {
      if (this.certification === null) {
        return false
      }
      // TODO 폰번호정보를 제공안함...
      // let phone = this.certification.phone
      // this.lastNum = phone.substring(phone.length - 4, phone.length)
    }
  },
  methods: {
    userCertification () {
      // if (this.isProcess) {
      //   return false
      // }
      // this.isProcess = true
      // if (!confirm('개인정보 수집 동의에 동의하십니까?')) {
      //   this.isProcess = false
      //   return false
      // }
      // IMP.certification(param, callback) 호출
      // error_code: null
      // error_msg: null
      // imp_uid: "imp_089150518997"
      // merchant_uid: "ORD20180131-0000011"
      // pg_provider: "danal"
      // pg_type: "certification"
      // success: true
      // __proto__: Object
      IMP.certification({merchant_uid: 'ORDER-' + new Date().getTime()}, (rsp) => { // callback
        if (rsp.success) {
          console.log('성공', rsp)
          this.saveCertification(rsp)
        } else {
          console.log('실패', rsp)
          this.$vueOnToast.pop('error', '실패', '휴대폰 본인인증 실패하였습니다.')
        }
      })
      // this.saveCertification()
    },
    saveCertification (rsp) {
      let body = {
        userId: this.$store.userId,
        impUid: rsp.imp_uid,
        uniqueInSite: 'SYSTOM'
      }
      let url = `${config.serverHost}/${config.serverVer}/certifications`
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        this.isProcess = false
        this.$emit('getCertification')
        this.$store.isCertification = true
        this.$vueOnToast.pop('success', '성공', '휴대폰 본인인증에 완료하였습니다.')
      }).catch((e) => {
        this.isProcess = false
        let message = {
          '500': {type: 'error', title: '실패', msg: '휴대폰 본인인증 실패하였습니다.'}
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
  beforeDestroy () {},
  destroyed () {}
}
</script>

<style scoped>

</style>
