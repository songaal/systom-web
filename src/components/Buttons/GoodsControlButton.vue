<template>
  <div>
    <b-dropdown text="더보기" class="m-md-2" variant="warning" right>
      <b-dropdown-item @click="taskStart">작업시작하기</b-dropdown-item>
      <b-dropdown-item @click="taskStop">작업정지하기</b-dropdown-item>
      <b-dropdown-item @click="showUpdateGoodsModal">편집하기</b-dropdown-item>
      <b-dropdown-item @click="resetTestResult">데이터초기화</b-dropdown-item>
      <b-dropdown-item @click="removeGoods">삭제하기</b-dropdown-item>
      <b-dropdown-item @click="signalLogView">Signal 로그보기</b-dropdown-item>
      <b-dropdown-item @click="executorLogView">Executor 로그보기</b-dropdown-item>
    </b-dropdown>
    <UpdateGoodsModal :goods="tmpGoods" @updateGoods="updateGoods"/>
    <Loading :active.sync="visible" :can-cancel="false"></Loading>
  </div>
</template>

<script>
import UpdateGoodsModal from '../modals/UpdateGoodsModal'
import config from '../../Config'
import utils from '../../Utils'
import cSwitch from '../Switch'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.min.css'

export default {
  name: 'GoodsControlButton',
  extends: '',
  components: {
    UpdateGoodsModal,
    cSwitch,
    Loading
  },
  props: ['goods', 'disabled'],
  data () {
    return {
      tmpGoods: {
        taskEcsId: null
      },
      visible: false,
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
    signalLogView () {
      let goods = this.goods
      if (goods.taskEcsId === undefined || goods.taskEcsId === null || goods.taskEcsId === '') {
        this.$vueOnToast.pop('error', '실패', '작업 아이디가 없습니다.')
        return false
      }
      let idx = goods.taskEcsId.lastIndexOf('/')
      let taskId = goods.taskEcsId.substring(idx + 1)
      let url = 'https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logEventViewer:group=/ecs/systom;stream=_/systom-signal/'
      url += taskId
      this.openPopup(url, 'signal 로그')
    },
    executorLogView () {
      let goods = this.goods
      if (goods.taskEcsId === undefined || goods.taskEcsId === null || goods.taskEcsId === '') {
        this.$vueOnToast.pop('error', '실패', '작업 아이디가 없습니다.')
        return false
      }
      let idx = goods.taskEcsId.lastIndexOf('/')
      let taskId = goods.taskEcsId.substring(idx + 1)
      let url = 'https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#logEventViewer:group=/ecs/systom;stream=_/systom-executor/'
      url += taskId
      this.openPopup(url, 'Executor 로그')
    },
    openPopup (url, title) {
      window.open(url, title, 'width:500px;height:500px;toolbar:no;status:no;')
    },
    resetTestResult () {
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
      this.visible = true
      let url = `${config.serverHost}/${config.serverVer}/goods/${this.goods.id}/actions`
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        this.visible = false
        this.isTaskStart = true
        this.$emit('updateTask', this.tmpGoods.id, response.lastStatus)
        this.$vueOnToast.pop('success', '성공', '작업이 시작되었습니다.')
      }).catch((e) => {
        this.visible = false
        this.isTaskStart = true
        let message = {
          '400': {type: 'error', title: '실패', msg: '요청이 잘못되었습니다.'},
          '500': {type: 'error', title: '실패', msg: '작입 시작이 실패하였습니다.'}
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
      this.visible = true
      let url = `${config.serverHost}/${config.serverVer}/goods/${this.goods.id}/actions`
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        this.isTaskStop = true
        this.visible = false
        this.$emit('updateTask', this.tmpGoods.id, response.lastStatus)
        this.$vueOnToast.pop('success', '성공', '작업이 정지되었습니다.')
      }).catch((e) => {
        this.isTaskStop = true
        this.visible = false
        let message = {
          '400': {type: 'error', title: '실패', msg: '요청이 잘못되었습니다.'},
          '500': {type: 'error', title: '실패', msg: '이미 작업이 정지 중 입니다.'}
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
      if (this.goods.taskRunning === true) {
        this.$vueOnToast.pop('warning', '실패', '작업이 진행 중입니다.')
        return false
      }
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
