<template>
  <div class="float-right">
    <!-- <b-col style="color:gray;">
      <div class="float-right">
        <i class="fa fa-credit-card fa-md mt-2"></i>
        <span>{{sellCount}} 판매</span>
      </div>
    </b-col> -->
    <!-- <i class="fa fa-credit-card fa-md mt-2"></i>
    <span>{{strategy.sellCount}} 판매</span> -->

    <button :class="`btn btn-sm mt-1 ml-1 btn-outline-${textColors.btnColor}`"
            @click="openOrderModal"
            :disabled="disabled"
            v-if="strategy.price !== undefined"
    >{{disabled ? '가져오기' : '가져옴'}}</button>
    <b-modal :id="`StrategyOrderModal-${strategy.id}`"
             title="구매하기">
      <b-row class="mb-2">
        <b-col md="3">
          <label class="text-nowrap">전략:</label>
        </b-col>
        <b-col md="9" class="text-left">
          <span>{{strategy.name}}</span>
        </b-col>
      </b-row>

      <b-row class="mb-2">
        <b-col md="3">
          <label class="text-nowrap">버전:</label>
        </b-col>
        <b-col md="9" class="text-left">
          {{strategy.version}}
        </b-col>
      </b-row>

      <b-row class="mb-2">
        <b-col md="3">
          <label class="text-nowrap">가격:</label>
        </b-col>
        <b-col md="9" class="text-left">
          {{strategy.price}}
        </b-col>
      </b-row>

      <b-row class="mb-2">
        <b-col md="3">
          <label class="text-nowrap">보유코인:</label>
        </b-col>
        <b-col md="9" class="text-left">
          {{userCoin.amount}}
        </b-col>
      </b-row>

      <b-row class="mb-2">
        <b-col md="3">
          <label class="text-nowrap">구매후잔액:</label>
        </b-col>
        <b-col md="9" class="text-left">
          <span :class="`text-${textColors.balance}`">{{userCoin.balance}}</span>
        </b-col>
      </b-row>

      <b-row class="mb-2">
        <b-col md="12" class="text-center">
          <h5>{{orderText}}</h5>
        </b-col>
      </b-row>

      <div slot="modal-footer">
        <button class="btn btn-secondary"
                @click="() => {this.$root.$emit('bv::hide::modal', `StrategyOrderModal-${strategy.id}`)}"
        >취소</button>
        <button :class="`btn btn-${textColors.orderBtn}`"
                :disabled="disabled"
                @click="StrategyOrder"
        >구매</button>
      </div>

    </b-modal>
  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'StrategyOrderModal',
  extends: '',
  components: {},
  props: ['strategy'],
  data () {
    return {
      disabled: true,
      orderText: '구매를 진행합니다.',
      userCoin: {
        amount: 0,
        balance: 0
      },
      textColors: {
        balance: 'info',
        btnColor: 'secondary',
        orderBtn: 'primary'
      }
    }
  },
  computed: {},
  watch: {
    strategy () {
      if (this.strategy.isPurchase !== 'purchase' && this.strategy.buyer === true) {
        this.disabled = false
        this.textColors.btnColor = 'primary'
      }
    }
  },
  methods: {
    openOrderModal () {
      let url = `${config.serverHost}/${config.serverVer}/coin/me`
      this.axios.get(url, config.getAxiosGetOptions()).then((result) => {
        this.userCoin.amount = result.data.amount || 0
        if (this.strategy.price > this.userCoin.amount) {
          this.textColors.balance = 'danger'
          this.orderText = '보유 코인이 부족합니다.'
          this.textColors.orderBtn = 'secondary'
          this.userCoin.balance = 0
        } else {
          let diffPrice = this.userCoin.amount - this.strategy.price
          this.userCoin.balance = diffPrice
        }
        this.$root.$emit('bv::show::modal', `StrategyOrderModal-${this.strategy.id}`)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    StrategyOrder () {
      if (this.strategy.price > this.userCoin.amount) {
        return
      }
      if (this.strategy.id === null) {
        this.$vueOnToast.pop('error', '실패', '구매 실패 다시 시도하세요.')
        return
      }
      if (this.strategy.version === null) {
        this.$vueOnToast.pop('error', '실패', '구매 실패 다시 시도하세요.')
        return
      }
      let body = {
        id: this.strategy.id,
        version: this.strategy.version
      }
      let url = `${config.serverHost}/${config.serverVer}/orders/strategy`
      this.axios.post(url, body, config.getAxiosPostOptions()).then((result) => {
        this.strategy.isPurchase = 'purchase'
        this.textColors.btnColor = 'secondary'
        this.disabled = true
        this.strategy.sellCount += 1
        this.$vueOnToast.pop('success', '성공', '구매가 완료 되었습니다.')
        this.$root.$emit('bv::hide::modal', `StrategyOrderModal-${this.strategy.id}`)
      }).catch((e) => {
        console.log(e)
        let message = {
          '500': {type: 'error', 'title': '실패', msg: '구매가 실패하였습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    }
  },
  beforeCreate () {},
  created () {
    this.textColors.balance = 'primary'
    this.orderText = '구매를 진행합니다.'
    this.textColors.orderBtn = 'primary'
    this.userCoin.balance = 0
    if (this.strategy.isPurchase !== 'purchase' && this.strategy.buyer === true) {
      this.disabled = false
      this.textColors.btnColor = 'primary'
    }
  },
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
