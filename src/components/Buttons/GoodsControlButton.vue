<template>
  <div>
    <b-dropdown text="더보기" class="m-md-2" variant="warning" right>
      <b-dropdown-item @click="taskStart">작업시작하기</b-dropdown-item>
      <b-dropdown-item @click="taskStop">작업정지하기</b-dropdown-item>
      <b-dropdown-item :disabled="disabled" @click="showUpdateGoodsModal">편집하기</b-dropdown-item>
      <b-dropdown-item @click="resetTestResult">데이터초기화</b-dropdown-item>
      <b-dropdown-item @click="removeGoods">삭제하기</b-dropdown-item>
    </b-dropdown>
    <UpdateGoodsModal :goods="tmpGoods" @updateGoods="updateGoods"/>
  </div>
</template>

<script>
import UpdateGoodsModal from '../modals/UpdateGoodsModal'
import config from '../../Config'
import utils from '../../Utils'
import cSwitch from '../Switch'

export default {
  name: 'name',
  extends: '',
  components: {
    UpdateGoodsModal,
    cSwitch
  },
  props: ['goods', 'disabled'],
  data () {
    return {
      tmpGoods: {
        taskEcsId: null
      },
      isTaskStart: true,
      isTaskStop: true
    }
  },
  computed: {},
  watch: {
    goods () {
      this.tmpGoods = Object.assign({}, this.goods)
    }
  },
  methods: {
    resetTestResult () {
      if (!confirm('작업을 정지하시겠습니까?')) {
        return
      }
      let body = {
        action: 'reset'
      }
      let url = `${config.serverHost}/${config.serverVer}/goods/${this.goods.id}/actions`
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        this.$emit('setGoods', response.data)
        this.$vueOnToast.pop('success', '성공', '데이터가 초기화되었습니다.')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    taskStart () {
      if (!this.isTaskStart) {
        this.$vueOnToast.pop('warning', '실패', '작업이 시작 중 입니다.')
        return
      }
      this.isTaskStart = false
      if (!confirm('작업을 시작하시겠습니까?')) {
        return
      }
      let body = {
        action: 'start'
      }
      let url = `${config.serverHost}/${config.serverVer}/goods/${this.goods.id}/actions`
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        this.isTaskStart = true
        this.$emit('updateTask', this.tmpGoods.id, response.lastStatus)
        this.$vueOnToast.pop('success', '성공', '작업이 시작되었습니다.')
      }).catch((e) => {
        this.isTaskStart = true
        let msg = '작업시작 중 에러가 발생하였습니다.'
        let type = 'error'
        if (e.response.data.message === 'It is already in progress.') {
          msg = '시작 중인 작업이 있습니다.'
          type = 'warning'
        }
        let message = {
          '400': {type: type, title: '실패', msg: '요청이 잘못되었습니다.'},
          '500': {type: type, title: '실패', msg: msg}
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    taskStop () {
      if (!this.isTaskStop) {
        this.$vueOnToast.pop('warning', '실패', '작업이 정지 중 입니다.')
        return
      }
      this.isTaskStop = false
      if (!confirm('작업을 정지하시겠습니까?')) {
        return
      }
      let body = {
        action: 'stop'
      }
      let url = `${config.serverHost}/${config.serverVer}/goods/${this.goods.id}/actions`
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        this.isTaskStop = true
        this.$emit('updateTask', this.tmpGoods.id, response.lastStatus)
        this.$vueOnToast.pop('success', '성공', '작업이 정지되었습니다.')
      }).catch((e) => {
        this.isTaskStop = true
        let msg = '작업정지 중 에러가 발생하였습니다.'
        let type = 'error'
        if (e.response.data.message === 'It is already in progress.') {
          msg = '정지 중인 작업이 있습니다.'
          type = 'warning'
        }
        let message = {
          '400': {type: type, title: '실패', msg: '요청이 잘못되었습니다.'},
          '500': {type: type, title: '실패', msg: msg}
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    updateGoods (goods) {
      this.$emit('setGoods', goods)
    },
    showUpdateGoodsModal () {
      this.$root.$emit('bv::show::modal', 'updateGoodsForm')
    },
    removeGoods () {
      if (!confirm('해당 상품을 삭제하시곘습니까?')) {
        return false
      }
      let url = `${config.serverHost}/${config.serverVer}/goods/${this.goods.id}`
      this.axios.delete(url, config.getAxiosDeleteOptions()).then((response) => {
        this.$vueOnToast.pop('success', '성공', '상품이 삭제되었습니다.')
        this.$router.replace('/investGoods')
      }).catch((e) => {
        let err = '삭제할 수 없습니다.'
        if (e.response.data.message === 'not empty') {
          err = '투자자가 있어 삭제할 수 없습니다.'
        }
        let message = {
          '400': {type: 'error', title: '실패', msg: err},
          '500': {type: 'error', title: '실패', msg: '삭제할 수 없습니다.'}
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
