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
      <b-dropdown-item @click="showOrderModal">주문하기</b-dropdown-item>
    </b-dropdown>
    <UpdateGoodsModal :goods="tmpGoods" @updateGoods="updateGoods"/>
    <Loading :active.sync="visible" :can-cancel="false"></Loading>

    <b-modal id="executorOrderModal" @shown="orderModalShow" @hidden="orderModalHide">
      <template slot="modal-header">
        <h5>주문하기</h5>
      </template>
      <div class="text-left">
        <b-row v-if="goods !== undefined" >
          <b-col>
            <h4>{{goods.coinUnit}}/{{goods.baseUnit}}</h4>
            <div class="slider-full coin-slider">
              <b-form-slider ref="coinSlider"
                             :value="0"
                             :min="-100"
                             :max="100"
                             :step="20"
                             :ticksSnapBounds="20"
                             selection="none"
                             tooltip="show"
                             :ticks_tooltip="true"
                             :ticks="[-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]"
                             :ticksLabels="['100', '80', '60', '40', '20', '0', '20', '40', '60', '80', '100']"
                             :rangeHighlights="[{start:-100, end:0, class:'sld-zone'}, {start:0, end:100, class:'bot-zone'}]">
              </b-form-slider>
            </div>
          </b-col>
          <!-- :ticks="[-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]" -->
          <!-- :ticksLabels="['100%', '60%', '20%', '0%', '20%', '60%', '100%']" -->
        </b-row>
        <b-row v-if="goods !== undefined && goods.baseUnit !== goods.cashUnit"
               class="mt-3">
          <b-col>
            <h4>{{goods.baseUnit}}/{{goods.cashUnit}}</h4>
            <div class="slider-full base-slider">
              <b-form-slider ref="baseSlider"
                             :value="0"
                             :min="-100"
                             :max="100"
                             :step="20"
                             :ticksSnapBounds="20"
                             selection="none"
                             tooltip="show"
                             :ticks_tooltip="true"
                             :ticks="[-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]"
                             :ticksLabels="['100', '80', '60', '40', '20', '0', '20', '40', '60', '80', '100']"
                             :rangeHighlights="[{start:-100, end:0, class:'sld-zone'}, {start:0, end:100, class:'bot-zone'}]">
              </b-form-slider>
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col>
            <b-form-group label="메세지">
              <b-form-input v-model="orderMessage"/>
            </b-form-group>
          </b-col>
        </b-row>
      </div>

      <template slot="modal-footer">
        <b-row class="m-0" style="width:100%;">
          <b-col class="text-left text-danger d-none" ref="isExecuting">
            <b-row>
              <b-col style="padding-top:3px">
                <span style="font-size: 1.2em;">주문실행중</span>
              </b-col>
              <b-col style="margin-left:-30%;">
                <b-button-spinner style="width: 70px;"></b-button-spinner>
              </b-col>
            </b-row>
          </b-col>
          <b-col>
            <b-button @click="(e) => this.$root.$emit('bv::hide::modal', 'executorOrderModal')">취소</b-button>
            <b-button variant="primary" @click="(e) => {orderRun(e)}" ref="orderExceCuteBtn">주문실행</b-button>
          </b-col>
        </b-row>

      </template>
    </b-modal>

  </div>
</template>

<script>
import UpdateGoodsModal from '../modals/UpdateGoodsModal'
import config from '../../Config'
import utils from '../../Utils'
import cSwitch from '../Switch'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.min.css'
import {bFormSlider} from 'vue-bootstrap-slider'
import 'bootstrap-slider/dist/css/bootstrap-slider.css'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'GoodsControlButton',
  extends: '',
  components: {
    UpdateGoodsModal,
    cSwitch,
    Loading,
    'b-form-slider': bFormSlider,
    'b-button-spinner': Spinner
  },
  props: ['goods', 'disabled'],
  data () {
    return {
      tmpGoods: {
        taskEcsId: null
      },
      visible: false,
      isTaskStart: true,
      isTaskStop: true,
      orderMessage: null,
      isExecuteEventCode: null
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
    },
    showOrderModal () {
      if (this.goods.taskRunning === false) {
        console.log('ECS Container Ended.')
        this.$vueOnToast.pop('error', '실패', '작업이 중지 상태입니다.')
        return false
      }
      this.$root.$emit('bv::show::modal', 'executorOrderModal')
    },
    orderModalShow () {
      this.isOrderExecuting()
      this.orderMessage = null
      this.$el.querySelector('.coin-slider input').value = 0
      this.$refs.coinSlider.slider.refresh()
      if (this.$refs.baseSlider) {
        this.$el.querySelector('.base-slider input').value = 0
        this.$refs.baseSlider.slider.refresh()
      }
    },
    orderRun (el) {
      if (el.target.disabled) {
        return false
      }
      el.target.disabled = true
      let body = {}
      body.action = 'order'
      let coinWeight = this.$el.querySelector('.coin-slider input').value
      let coinAction = Number(coinWeight) === 0 ? 'NTR' : (Number(coinWeight) < 0 ? 'SLD' : 'BOT')
      coinWeight = Math.abs(coinWeight * 0.01)
      body.coinWeight = coinWeight
      body.coinAction = coinAction
      if (this.$refs.baseSlider) {
        let baseWeight = this.$el.querySelector('.base-slider input').value
        let baseAction = Number(baseWeight) === 0 ? 'NTR' : (Number(baseWeight) < 0 ? 'SLD' : 'BOT')
        baseWeight = Math.abs(baseWeight * 0.01)
        body.baseWeight = baseWeight
        body.baseAction = baseAction
      }
      body.message = this.orderMessage
      if (!confirm('주문을 실행하시겠습니까?')) {
        el.target.disabled = false
        return false
      }
      let url = `${config.serverHost}/${config.serverVer}/goods/${this.goods.id}/actions`
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        el.target.disabled = false
        this.$root.$emit('bv::hide::modal', 'executorOrderModal')
        this.$vueOnToast.pop('success', '성공', '주문성공')
      }).catch((e) => {
        el.target.disabled = false
        utils.httpFailNotify(e, this)
      })
    },
    orderModalHide () {
      if (this.isExecuteEventCode !== null) {
        clearTimeout(this.isExecuteEventCode)
        this.isExecuteEventCode = null
      }
    },
    isOrderExecuting () {
      if (Number(this.$route.params.goodsId) !== Number(this.goods.id)) {
        clearTimeout(this.isExecuteEventCode)
        this.isExecuteEventCode = null
        return false
      }
      let url = `${config.serverHost}/${config.serverVer}/goods/${this.goods.id}/isExecute`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        if (response.data) {
          this.$refs.orderExceCuteBtn.innerHTML = '주문실행'
          this.$refs.isExecuting.classList.remove('d-none')
        } else {
          this.$refs.orderExceCuteBtn.innerHTML = '주문가능'
          this.$refs.isExecuting.classList.add('d-none')
        }
        this.isExecuteEventCode = setTimeout(this.isOrderExecuting, 5000)
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

<style>
.slider-full {
  text-align: center;
}
.slider-full>div,.slider {
  width: 95%!important;
}
.slider-selection.tick-slider-selection {
  background-image: linear-gradient(to bottom, #fb000057 0%, #f70606a6 100%)!important;
}
.sld-zone {
  background: #d033336e!important;
}
.bot-zone {
  background: #0080003d!important;
}
</style>
