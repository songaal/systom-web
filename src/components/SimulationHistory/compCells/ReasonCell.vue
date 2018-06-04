<template>
  <div id="reasonCell">
    <button class="btn btn-link" @click="showModal">조회</button>
    <b-modal ref="reasonModal" title="거래이유" size="lg">
      <div class="responsive">
        <table class="table table-bordered">
          <tr v-for="(condition, index) in row.reason.condition">
            <td v-if="index === 0"
                :rowspan="row.reason.condition.length"
                class="score"
            >
              <div class="emphasis-font">
                점수: <span>{{row.reason.score}}</span>
              </div>
              <div class="emphasis-font">
                목표:  <span>{{row.reason.target}}</span>
              </div>
            </td>
            <td v-if="index === 0">
              <div>점수: {{condition.score}}</div>
              <div>이름: {{condition.name}}</div>
              <div>조건: {{condition.value}}</div>
            </td>
            <td v-if="index > 0">
              <div>점수: {{condition.score}}</div>
              <div>이름: {{condition.name}}</div>
              <div>조건: {{condition.value}}</div>
            </td>
          </tr>
        </table>
      </div>
      <div slot="modal-footer">
        <button class="btn btn-primary" @click="hideModal">확인</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'reasonCell',
  extends: '',
  components: {},
  props: ['row', 'nested'],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    showModal () {
      this.$refs.reasonModal.show()
    },
    hideModal () {
      this.$refs.reasonModal.hide()
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
.emphasis-font {
  font-size: 18pt;
}
.score {
  border-right: 1px solid '#758696';
  text-align: center;
  vertical-align: middle;
}
</style>
