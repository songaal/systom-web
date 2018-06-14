<template>
  <div>
    <button class="btn btn-sm btn-outline-primary mt-1 ml-1"
            @click="openOrderModal"
            v-if="strategy.isPurchase === 'Unpurchase'"
    >{{strategy.price}}코인/월에 구매하기</button>

    <b-modal id="StrategyOrderModal"
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
          <h5>구매를 진행합니다.</h5>
        </b-col>
      </b-row>

      <div slot="modal-footer">
        <button class="btn btn-secondary"
                @click="() => {this.$root.$emit('bv::hide::modal', 'StrategyOrderModal')}"
        >취소</button>
        <button class="btn btn-primary"
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
      userCoin: {
        amount: 0,
        balance: 0
      },
      textColors: {
        balance: 'info'
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    openOrderModal () {
      let url = `${config.serverHost}/${config.serverVer}/coin/me`
      this.axios.get(url, config.getAxiosGetOptions()).then((result) => {
        this.userCoin.amount = result.data.amount
        this.userCoin.balance = (this.userCoin.amount - this.strategy.price || 0)
        if (Number(this.userCoin.balance) < 0) {
          this.textColors.balance = 'danger'
        }
        this.$root.$emit('bv::show::modal', 'StrategyOrderModal')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    StrategyOrder () {
      if (Number(this.userCoin.balance) < 0) {
        this.$vueOnToast.pop('error', '실패', '보유 코인이 부족합니다.')
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
        this.$vueOnToast.pop('success', '성공', '구매가 완료 되었습니다.')
        this.$root.$emit('bv::hide::modal', 'StrategyOrderModal')
      }).catch((e) => {
        let message = {
          '500': error.response.data
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
