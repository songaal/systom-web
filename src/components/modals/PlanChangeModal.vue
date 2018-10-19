<template>
  <div>
    <a href="javascript:void(0);"
       @click="planChangeShowModal">
       <u>변경하기</u>
    </a>
    <b-modal id="planChangeModal" no-fade>
      <template slot="modal-header">
        <h5>멤버십변경</h5>
      </template>
      <b-alert show variant="warning" class="ws-pre-line">지금 멤버십을 취소하셔도 남은 기간까지는 멤버십을 이용하실수 있으며 언제든지 다시 재시사용할 수 있습니다.</b-alert>
      멤버십 유효기간: <b>{{paidMemberShip.endDate}}</b>
      <template slot="modal-footer">
        <b-button @click="(e) => this.$root.$emit('bv::hide::modal', 'planChangeModal')">취소</b-button>
        <b-button variant="warning"
                  @click="el => cancel(el)">멤버십취소</b-button>
      </template>
    </b-modal>

  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'PlanChangeUpModal',
  extends: '',
  components: {},
  props: ['paidMemberShip'],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    planChangeShowModal () {
      this.$root.$emit('bv::show::modal', 'planChangeModal')
    },
    cancel (el) {
      el.target.disabled = true
      let url = `${config.serverHost}/${config.serverVer}/paidMemberShip?action=delete`
      this.axios.put(url, {}, config.getAxiosPutOptions()).then((response) => {
        el.target.disabled = false
        this.$emit('refresh')
        this.$root.$emit('bv::hide::modal', 'planChangeModal')
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
.ws-pre-line {
  white-space: pre-line;
}
</style>
