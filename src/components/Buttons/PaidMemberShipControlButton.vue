<template>
  <div>
    <div v-if="type === 'WAIT'">
      <!-- 가입대기 -->
      <b-row>
        <b-col cols="1">
          <span>없음</span>
        </b-col>
        <b-col cols="11">
          <PlanSignUpModal :isDefaultCard="paidMemberShip.isDefaultCard"
                           @refresh="refresh"/>
        </b-col>
      </b-row>
    </div>
    <div v-if="type === 'JOIN'">
      <!-- 가입중 -->
      <b-row>
        <b-col cols="1">
          <span>유료</span>
        </b-col>
        <b-col cols="11">
          <PlanChangeModal :paidMemberShip="paidMemberShip"
                           @refresh="refresh"/>
        </b-col>
      </b-row>
    </div>
    <div v-if="type === 'CANCEL'">
      <!-- 취소중 -->
      <b-row>
        <b-col cols="6">
          <span>취소됨. 유효기간: {{endDate}}</span>
        </b-col>
        <b-col cols="6">
          <PlanReUseModal :paidMemberShip="paidMemberShip"
                          @refresh="refresh"/>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import PlanSignUpModal from '../../components/modals/PlanSignUpModal'
import PlanChangeModal from '../../components/modals/PlanChangeModal'
import PlanReUseModal from '../../components/modals/PlanReUseModal'
import utils from '../../Utils'
import config from '../../Config'

export default {
  name: 'PlanControlButton',
  extends: '',
  components: {
    PlanSignUpModal,
    PlanChangeModal,
    PlanReUseModal
  },
  props: ['paidMemberShip'],
  data () {
    // type: WAIT, JOIN, CANCEL
    return {
      type: 'WAIT',
      endDate: null
    }
  },
  computed: {},
  watch: {
    paidMemberShip () {
      this.handlePlanType()
    }
  },
  methods: {
    handlePlanType () {
      if (this.paidMemberShip.time === null) {
        return false
      }
      if (this.paidMemberShip.isPaidUser === true) {
        // 가입중
        this.type = 'JOIN'
      } else if (this.paidMemberShip.isPaidPlanCancel === true && this.paidMemberShip.dueDate > new Date().getTime()) {
        // 취소 중
        this.endDate = utils.timeToString(new Date(this.paidMemberShip.dueDate))
        this.type = 'CANCEL'
      }
    },
    refresh () {
      this.$emit('getPaidMemberShip')
    }
  },
  beforeCreate () {},
  created () {
    this.handlePlanType()
  },
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
