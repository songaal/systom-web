<template>
  <div>
    <a href="javascript:void(0);" @click="planSignUpShowModal"><u>가입하기</u></a>

    <b-modal id="planSignUpModal" no-fade>
      <template slot="modal-header">
        <h5>멤버십 가입하기</h5>
      </template>
      <ul>
        <li>
           <h5>가격: 1,000원/월</h5>
        </li>
        <li>
          <h5>기능: 실전투자</h5>
        </li>
      </ul>
      <b-alert show variant="warning" class="ws-pre-line"><input id="signUpCheck" v-model="isOk" type="checkbox"/> <label for="signUpCheck">비용은 매월 자동으로 청구되며 이 사항에 동의합니다.</label></b-alert>

      <template slot="modal-footer">
        <b-button @click="(e) => this.$root.$emit('bv::hide::modal', 'planSignUpModal')">취소</b-button>
        <b-button ref="submitBtn"
                  variant="primary"
                  :disabled="!isOk"
                  @click="e => join(e)">멤버십가입</b-button>
      </template>
    </b-modal>

  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'PlanSignUpModal',
  extends: '',
  components: {},
  props: ['isDefaultCard'],
  data () {
    return {
      isOk: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    planSignUpShowModal () {
      this.isOk = false
      if (this.isDefaultCard === false) {
        this.$vueOnToast.pop('error', '실패', '멤버십가입을 위해 먼저 신용카드를 추가해주세요.')
        return false
      }
      this.$root.$emit('bv::show::modal', 'planSignUpModal')
      return true
    },
    join (el) {
      el.target.disabled = true
      let url = `${config.serverHost}/${config.serverVer}/paidMemberShip`
      this.axios.post(url, {}, config.getAxiosPostOptions()).then((response) => {
        el.target.disabled = false
        this.$emit('refresh')
        this.$vueOnToast.pop('success', '성공', '멤버십에 가입되었습니다.')
        this.$root.$emit('bv::hide::modal', 'planSignUpModal')
      }).catch((e) => {
        el.target.disabled = false
        utils.httpFailNotify(e, this)
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
