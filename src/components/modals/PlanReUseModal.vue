<template>
  <div>
    <a href="javascript:void(0);" @click="showModal"><u>재사용하기</u></a>

    <b-modal id="planReUseModal" no-fade>
      <template slot="modal-header">
        <h5>멤버십재사용</h5>
      </template>
      <b-alert show variant="info" class="ws-pre-line">멤버십을 다시 사용하시겠습니까?</b-alert>
      <template slot="modal-footer">
        <b-button @click="(e) => this.$root.$emit('bv::hide::modal', 'planReUseModal')">취소</b-button>
        <b-button variant="info"
                  @click="el => reUse(el)">멤버십재사용</b-button>
      </template>
    </b-modal>

  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'planReUseModal',
  extends: '',
  components: {},
  props: ['paidMemberShip'],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    showModal () {
      this.$root.$emit('bv::show::modal', 'planReUseModal')
    },
    reUse (el) {
      el.target.disabled = true
      let url = `${config.serverHost}/${config.serverVer}/paidMemberShip?action=reUse`
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

</style>
