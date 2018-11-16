<template>
  <span>
    <button @click="showReasonModal(seq)" class="btn btn-link pt-0 pb-0" style="margin-top: -3px;">조회</button>

    <b-modal :id="`reasonModal-${seq}`" title="거래이유" size="lg">
      <div class="table-responsive">
        <table class="table table-bordered">

          <tr v-if="reason.condition === undefined">
            <!-- <td class="score text-center"
                style="vertical-align: middle;"
                v-if="reason.message === undefined">
              <div class="emphasis-font">
                점수: <span class="emphasis-font">{{reason.score}}</span>
              </div>
              <div class="emphasis-font">
                목표: <span class="emphasis-font">{{reason.target}}</span>
              </div>
            </td> -->
            <td class="text-center" style="vertical-align: middle;" v-if="reason.message === undefined && reason.author === undefined">
              <div>종료</div>
            </td>
            <td class="text-center" style="vertical-align: middle;" v-if="reason.message !== undefined">
              <div>{{reason.message}}</div>
            </td>
          </tr>

          <tr v-if="reason.condition !== undefined && reason.condition.length === 0">
            <td class="score text-center" style="vertical-align: middle;">
            </td>
          </tr>

          <tr v-if="reason.condition !== undefined"
              v-for="(condition, index) in reason.condition">
            <td v-if="index === 0"
                :rowspan="reason.condition.length"
                class="score text-center"
                style="vertical-align: middle;"
            >
              <div class="emphasis-font">
                점수: <span class="emphasis-font">{{reason.score}}</span>
              </div>
              <div class="emphasis-font">
                목표: <span class="emphasis-font">{{reason.target}}</span>
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
        <button class="btn btn-primary" @click="hideReasonModal(seq)">확인</button>
      </div>
    </b-modal>
  </span>
</template>

<script>
export default {
  name: 'name',
  extends: '',
  components: {},
  props: ['trade_history', 'seq'],
  data () {
    return {
      reason: {
        target: 0,
        score: 0,
        condition: []
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    showReasonModal (seq) {
      this.reason = JSON.parse(this.trade_history[seq].reason)
      this.$root.$emit('bv::show::modal', `reasonModal-${seq}`)
    },
    hideReasonModal (seq) {
      this.$root.$emit('bv::hide::modal', `reasonModal-${seq}`)
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
