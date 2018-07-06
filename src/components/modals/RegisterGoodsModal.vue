<template>
  <div>
    <button class="btn btn-primary"
            @click="showRegisterGoodsModal"
    >상품등록</button>
    <b-modal id="newGoodsForm"
             title="상품 등록하기"
             size="lg"
             class="text-left"
    >
      <b-row class="mb-2">
        <b-col sm="3" class="pt-2">
          <label for="newGoodsByStrategy">전략</label>
        </b-col>
        <b-col sm="9">
          <ModelSelect placeholder="전략을 선택하세요."
                       id="newGoodsByStrategy"
                       v-model="newGoods.strategyId"
                       :options="strategies"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <label for="newGoodsByVersion">버전</label>
        </b-col>
        <b-col sm="9">
          <ModelSelect placeholder="버전을 선택하세요."
                       id="newGoodsByVersion"
                       v-model="newGoods.version"
                       :options="versionList"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <label for="newGoodsByExchange">거래소</label>
        </b-col>
        <b-col sm="9">
          <ModelSelect placeholder="거래소를 선택하세요."
                       id="newGoodsByExchange"
                       v-model="newGoods.exchange"
                       :options="exchangeList"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <label for="newGoodsByCoin">코인</label>
        </b-col>
        <b-col sm="9">
          <ModelSelect placeholder="코인을 선택하세요."
                       id="newGoodsByCoin"
                       v-model="newGoods.coin"
                       :options="coinList"
          />
        </b-col>
      </b-row>
      <hr />
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <label for="newGoodsByAmount">모집금액</label>
        </b-col>
        <b-col sm="9">
          <b-input-group>
            <b-form-input id="newGoodsByAmount"
                          v-model="newGoods.amount"/>
            <b-input-group-button class="input-group-prepend">
              <b-dropdown :text="newGoods.currency" variant="primary" right>
                <b-dropdown-item @click="changeCurrency('USDT')">USDT</b-dropdown-item>
                <b-dropdown-item @click="changeCurrency('BTC')">BTC</b-dropdown-item>
              </b-dropdown>
            </b-input-group-button>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <div @click="clearDatePickers('recruitStartDatePicker')">
            모집시작일
          </div>
        </b-col>
        <b-col sm="9">
          <date-picker format="yyyy-MM-dd"
                       language="ko"
                       ref="recruitStartDatePicker"
                       @opened="clearDatePickers('recruitStartDatePicker')"
                       v-model="newGoods.recruitStart"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <div @click="clearDatePickers('recruitEndDatePicker')">
            모집종료일
          </div>
        </b-col>
        <b-col sm="9">
          <date-picker format="yyyy-MM-dd"
                       language="ko"
                       ref="recruitEndDatePicker"
                       @opened="clearDatePickers('recruitEndDatePicker')"
                       v-model="newGoods.recruitEnd"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <div @click="clearDatePickers('investStartDatePicker')">
             투자시작일
          </div>
        </b-col>
        <b-col sm="9">
          <date-picker format="yyyy-MM-dd"
                       language="ko"
                       ref="investStartDatePicker"
                       @opened="clearDatePickers('investStartDatePicker')"
                       v-model="newGoods.investStart"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <div @click="clearDatePickers('investEndDatePicker')">
             투자종료일
          </div>
        </b-col>
        <b-col sm="9">
          <date-picker format="yyyy-MM-dd"
                       language="ko"
                       ref="investEndDatePicker"
                       @opened="clearDatePickers('investEndDatePicker')"
                       v-model="newGoods.investEnd"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <div @click="clearDatePickers('backTestStartDatePicker')">
            백테스트 시작일
          </div>
        </b-col>
        <b-col sm="9">
          <date-picker format="yyyy-MM-dd"
                       language="ko"
                       ref="backTestStartDatePicker"
                       @opened="clearDatePickers('backTestStartDatePicker')"
                       v-model="newGoods.backtestStart"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <div @click="clearDatePickers('backTestEndDatePicker')">
            백테스트 종료일
          </div>
        </b-col>
        <b-col sm="9">
          <date-picker format="yyyy-MM-dd"
                       language="ko"
                       ref="backTestEndDatePicker"
                       @opened="clearDatePickers('backTestEndDatePicker')"
                       v-model="newGoods.backtestEnd"
          />
        </b-col>
      </b-row>
      <hr />
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <label for="newGoodsByName">상품명</label>
        </b-col>
        <b-col sm="9">
          <input class="form-control"
                 id="newGoodsByName"
                 v-model="newGoods.name"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <label for="newGoodsByDescription">설명</label>
        </b-col>
        <b-col sm="9">
          <textarea class="form-control"
                    rows="10"
                    id="newGoodsByDescription"
                    v-model="newGoods.description"
          />
        </b-col>
      </b-row>

      <template slot="modal-footer">
        <b-button @click="(e) => {this.$root.$emit('bv::hide::modal', 'newGoodsForm')}">취소</b-button>
        <b-button @click="registerGoods"
                  variant="primary">확인</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { ModelSelect } from 'vue-search-select'
import datePicker from 'vuejs-datepicker'
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'registerGoodsModal',
  extends: '',
  components: {
    ModelSelect,
    datePicker
  },
  props: [],
  data () {
    return {
      strategies: [],
      versionList: [],
      exchangeList: [],
      coinList: [],
      currencyList: [],
      newGoods: {
        strategyId: null,
        version: null,
        description: null,
        name: null,
        exchange: null,
        coin: null,
        recruitStart: null,
        recruitEnd: null,
        investStart: null,
        investEnd: null,
        backtestStart: null,
        backtestEnd: null,
        amount: null,
        currency: 'USDT'
      }
    }
  },
  computed: {},
  watch: {
    'newGoods.exchange' () {
      this.changeCoinList()
    },
    'newGoods.currency' () {
      this.changeCoinList()
    },
    'newGoods.strategyId' () {
      this.retrieveVersionList()
    }
  },
  methods: {
    showRegisterGoodsModal () {
      this.exchangeList = []
      config.liveExchanges.forEach((o, i) => {
        this.exchangeList.push({text: o.ko + '(' + utils.capitalizeFirstLetter(o.en) + ')', value: o.en})
      })
      this.initDefaultGoods()
      this.retrieveStrategies()
    },
    retrieveStrategies () {
      this.strategies = []
      this.newGoods.version = null
      let url = config.serverHost + '/' + config.serverVer + '/strategies'
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        response.data.forEach(strategy => {
          this.strategies.push({
            text: strategy.name,
            value: strategy.id
          })
        })
        this.$root.$emit('bv::show::modal', 'newGoodsForm')
      }).catch((e) => {
        console.log('response err', e)
      })
    },
    retrieveVersionList () {
      this.versionList = []
      let url = config.serverHost + '/' + config.serverVer + '/strategies/'
      url += this.newGoods.strategyId + '/versions'
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        response.data.forEach(strategyDeploy => {
          this.versionList.push({
            text: '버전' + strategyDeploy.version + ' :' + strategyDeploy.description,
            value: strategyDeploy.version
          })
        })
      }).catch((e) => {
        console.log('response err', e)
      })
    },
    changeCoinList () {
      let exchange = this.newGoods.exchange
      let currency = this.newGoods.currency
      let url = `${config.datafeedUrl}/exchange_symbols?exchange=${exchange}`
      this.axios.get(url).then((response) => {
        let jsonData = JSON.parse(response.data.body)
        let tmpCoinSet = new Set()
        jsonData.forEach(o => {
          if (currency !== o.coin && currency === o.base) {
            tmpCoinSet.add(o.coin)
          }
        })
        let isCoin = false
        this.coinList = []
        Array.from(tmpCoinSet).forEach((o, i) => {
          this.coinList.push({text: o, value: o})
          if (o === this.newGoods.coin) {
            isCoin = true
          }
        })
        if (!isCoin) {
          this.newGoods.coin = null
        }
      }).catch((e) => {
        console.log('response err', e)
      })
    },
    registerGoods () {
      let newGoods = this.newGoods
      if (newGoods.strategyId === null) {
        this.$vueOnToast.pop('error', '실패', '전략을 선택하세요.')
        return false
      } else if (newGoods.version === null) {
        this.$vueOnToast.pop('error', '실패', '버전을 선택하세요.')
        return false
      } else if (newGoods.exchange === null) {
        this.$vueOnToast.pop('error', '실패', '거래소를 선택하세요.')
        return false
      } else if (newGoods.coin === null) {
        this.$vueOnToast.pop('error', '실패', '코인을 선택하세요.')
        return false
      } else if (newGoods.amount === null) {
        this.$vueOnToast.pop('error', '실패', '모집 금액을 입력하세요.')
        return false
      } else if (newGoods.amount % 2 !== 0) {
        this.$vueOnToast.pop('error', '실패', '모집 금액은 홀수금액은 입력할 수 없습니다.')
        return false
      } else if (newGoods.currency === null) {
        this.$vueOnToast.pop('error', '실패', '모집 통화를 선택하세요.')
        return false
      } else if (newGoods.recruitStart === null) {
        this.$vueOnToast.pop('error', '실패', '모집 시작일을 선택하세요.')
        return false
      } else if (newGoods.recruitEnd === null) {
        this.$vueOnToast.pop('error', '실패', '모집 종료일을 선택하세요.')
        return false
      } else if (newGoods.investStart === null) {
        this.$vueOnToast.pop('error', '실패', '투자 시작일을 선택하세요.')
        return false
      } else if (newGoods.investEnd === null) {
        this.$vueOnToast.pop('error', '실패', '투자 종료일을 선택하세요.')
        return false
      } else if (newGoods.backtestStart === null) {
        this.$vueOnToast.pop('error', '실패', '백테스트 시작일을 선택하세요.')
        return false
      } else if (newGoods.backtestEnd === null) {
        this.$vueOnToast.pop('error', '실패', '백테스트 종료일을 선택하세요.')
        return false
      } else if (newGoods.name === null) {
        this.$vueOnToast.pop('error', '실패', '상품명을 입력하세요.')
        return false
      } else if (newGoods.description === null) {
        this.$vueOnToast.pop('error', '실패', '상품 설명을 입력하세요.')
        return false
      }
      newGoods.recruitStart = utils.timeToTimestamp(newGoods.recruitStart)
      newGoods.recruitEnd = utils.timeToTimestamp(newGoods.recruitEnd)
      newGoods.investStart = utils.timeToTimestamp(newGoods.investStart)
      newGoods.investEnd = utils.timeToTimestamp(newGoods.investEnd)
      newGoods.backtestStart = utils.timeToTimestamp(newGoods.backtestStart)
      newGoods.backtestEnd = utils.timeToTimestamp(newGoods.backtestEnd)
      let url = config.serverHost + '/' + config.serverVer + '/goods'
      this.axios.post(url, newGoods, config.getAxiosPostOptions()).then((response) => {
        this.$vueOnToast.pop('success', '성공', '상품을 등록하였습니다.')
        // this.$emit('retrieveGoodsList', newGoods, 'wait')
        this.$root.$emit('bv::hide::modal', 'newGoodsForm')
        this.$router.push('/investGoods/' + response.data.id)
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '상품등록 정보가 잘못되었습니다.'},
          '500': {type: 'error', title: '실패', msg: '등록이 실패하였습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    clearDatePickers (ref) {
      if (ref !== 'recruitStartDatePicker') {
        this.$refs.recruitStartDatePicker.close()
      }
      if (ref !== 'recruitEndDatePicker') {
        this.$refs.recruitEndDatePicker.close()
      }
      if (ref !== 'investStartDatePicker') {
        this.$refs.investStartDatePicker.close()
      }
      if (ref !== 'investEndDatePicker') {
        this.$refs.investEndDatePicker.close()
      }
      if (ref !== 'backTestStartDatePicker') {
        this.$refs.backTestStartDatePicker.close()
      }
      if (ref !== 'backTestEndDatePicker') {
        this.$refs.backTestEndDatePicker.close()
      }
      if (!this.$refs[ref].isOpen) {
        this.$refs[ref].showCalendar()
      }
    },
    changeCurrency (currency) {
      this.newGoods.currency = currency
    },
    initDefaultGoods () {
      this.newGoods.strategyId = null
      this.newGoods.version = null
      this.newGoods.name = null
      this.newGoods.description = null
      this.newGoods.coin = null
      this.newGoods.amount = null
      this.newGoods.currency = 'USDT'
      let time = new Date()
      this.newGoods.recruitStart = utils.timeToString(time, false)
      time.setDate(time.getDate() + 30)
      this.newGoods.recruitEnd = utils.timeToString(time, false)
      time.setDate(time.getDate() + 1)
      this.newGoods.investStart = utils.timeToString(time, false)
      time.setDate(time.getDate() + 30)
      this.newGoods.investEnd = utils.timeToString(time, false)
      time = new Date()
      time.setDate(time.getDate() - 1)
      this.newGoods.backtestEnd = utils.timeToString(time, false)
      time.setDate(time.getDate() - 179)
      this.newGoods.backtestStart = utils.timeToString(time, false)
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
.modal {
  padding-left: 0px!important;
}
</style>
