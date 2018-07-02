<template>
  <div class="d-inline-block">
    <b-button variant="primary"
            @click="() => {this.$root.$emit('bv::show::modal', 'createStrategyForm')}">
      새 전략 생성
    </b-button>
    <b-modal id="createStrategyForm"
             title="새 전략 생성"
    >
      <b-form>
        <b-input v-model="name"
                 placeholder="전략이름을 입력하세요."
                 max-length="20"
                 min-length="5"/>
      </b-form>
      <div slot="modal-footer">
        <button class="btn btn-secondary"
                @click="() => {this.$root.$emit('bv::hide::modal', 'createStrategyForm')}"
        >취소</button>
        <button class="btn btn-primary"
                @click="saveNewStrategyFrame"
        >확인</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'CreateStrategyModalButton',
  extends: '',
  components: {},
  props: [],
  data () {
    return {
      name: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    saveNewStrategyFrame () {
      let newStrategyName = this.name
      // 앞뒤 공백제거 /(^\s*|\s*$)/
      if (newStrategyName === null || newStrategyName.replace(/(^\s*|\s*$)/gi, '') === '') {
        this.$vueOnToast.pop('warning', '실패', '전략 이름을 입력하세요.')
        return
      }
      let url = `${config.serverHost}/${config.serverVer}/strategies`
      this.axios.post(url, {name: newStrategyName}, config.getAxiosPostOptions()).then((result) => {
        this.$router.replace('/strategies/' + result.data.id)
        this.$vueOnToast.pop('success', '성공', '생성 완료되었습니다.')
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '생성 실패', msg: '사용할 수 없는 전략이름입니다.'}
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
