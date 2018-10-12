<template>
  <div>
    <a href="javascript:void(0);" @click="() => this.$root.$emit('bv::show::modal', 'planSignUpModal')"><u>플랜가입</u></a>

    <b-modal id="planSignUpModal">
      <template slot="modal-header">
        <h5>플랜가입</h5>
      </template>
      <ul>
        <li>
           <h4>가격: 1000원/월</h4>
        </li>
        <li>
          <h4>기능</h4>
          <ul>
            <li>모의투자</li>
            <li>실전투자</li>
          </ul>
        </li>
      </ul>

      <template slot="modal-footer">
        <b-button @click="(e) => this.$root.$emit('bv::hide::modal', 'planSignUpModal')">취소</b-button>
        <b-button  variant="primary">플랜가입</b-button>
      </template>
    </b-modal>

  </div>
</template>

<script>
export default {
  name: 'PlanSignUpModal',
  extends: '',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
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
