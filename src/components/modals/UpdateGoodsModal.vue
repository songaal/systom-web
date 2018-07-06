<template>
  <div>
    <b-modal id="updateGoodsForm"
             title="상품 편집하기"
             size="lg"
             class="text-left"
             @shown="showUpdateGoodsModal"
    >
      <b-row class="mb-2">
        <b-col sm="3" class="pt-2">
          <label for="updateGoodsByStrategy">전략</label>
        </b-col>
        <b-col sm="9">
          <ModelSelect placeholder="전략을 선택하세요."
                       id="updateGoodsByStrategy"
                       v-model="updateGoods.strategyId"
                       :options="strategies"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <label for="updateGoodsByVersion">버전</label>
        </b-col>
        <b-col sm="9">
          <ModelSelect placeholder="버전을 선택하세요."
                       id="updateGoodsByVersion"
                       v-model="updateGoods.version"
                       :options="versionList"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <label for="updateGoodsByExchange">거래소</label>
        </b-col>
        <b-col sm="9">
          <ModelSelect placeholder="거래소를 선택하세요."
                       id="updateGoodsByExchange"
                       v-model="updateGoods.exchange"
                       :options="exchangeList"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <label for="updateGoodsByCoin">코인</label>
        </b-col>
        <b-col sm="9">
          <ModelSelect placeholder="코인을 선택하세요."
                       id="updateGoodsByCoin"
                       v-model="updateGoods.coin"
                       :options="coinList"
          />
        </b-col>
      </b-row>
      <hr />
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <label for="updateGoodsByAmount">모집금액</label>
        </b-col>
        <b-col sm="9">
          <b-input-group>
            <b-form-input id="updateGoodsByAmount"
                          v-model="updateGoods.amount"/>
            <b-input-group-button class="input-group-prepend">
              <b-dropdown :text="updateGoods.currency" variant="primary" right>
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
                       v-model="updateGoods.recruitStart"
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
                       v-model="updateGoods.recruitEnd"
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
                       v-model="updateGoods.investStart"
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
                       v-model="updateGoods.investEnd"
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
                       v-model="updateGoods.backtestStart"
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
                       v-model="updateGoods.backtestEnd"
          />
        </b-col>
      </b-row>
      <hr />
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <label for="updateGoodsByName">상품명</label>
        </b-col>
        <b-col sm="9">
          <input class="form-control"
                 id="updateGoodsByName"
                 v-model="updateGoods.name"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <label for="updateGoodsByDescription">설명</label>
        </b-col>
        <b-col sm="9">
          <textarea class="form-control"
                    rows="10"
                    id="updateGoodsByDescription"
                    v-model="updateGoods.description"
          />
        </b-col>
      </b-row>

      <template slot="modal-footer">
        <b-button @click="(e) => {this.$root.$emit('bv::hide::modal', 'updateGoodsForm')}">취소</b-button>
        <b-button @click="updateRegisteredGoods"
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
  name: 'updateGoodsModal',
  extends: '',
  components: {
    ModelSelect,
    datePicker
  },
  props: ['goods'],
  data () {
    return {
      strategies: [],
      versionList: [],
      exchangeList: [],
      coinList: [],
      currencyList: [],
      updateGoods: {
        id: null,
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
      },
      isEdit: false
    }
  },
  computed: {},
  watch: {
    'updateGoods.exchange' () {
      if (this.isEdit === true) {
        this.changeCoinList()
      }
    },
    'updateGoods.currency' () {
      if (this.isEdit === true) {
        this.changeCoinList()
      }
    },
    'updateGoods.strategyId' () {
      this.retrieveVersionList()
    }
  },
  methods: {
    showUpdateGoodsModal () {
      this.isEdit = false
      this.exchangeList = []
      config.liveExchanges.forEach((o, i) => {
        this.exchangeList.push({text: o.ko + '(' + utils.capitalizeFirstLetter(o.en) + ')', value: o.en})
      })
      this.retrieveStrategies()
      this.initGoods()
    },
    retrieveStrategies () {
      this.strategies = []
      this.updateGoods.version = null
      let url = config.serverHost + '/' + config.serverVer + '/strategies'
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        response.data.forEach(strategy => {
          this.strategies.push({
            text: strategy.name,
            value: strategy.id
          })
        })
      }).catch((e) => {
        console.log('response err', e)
      })
    },
    retrieveVersionList () {
      this.versionList = []
      let url = config.serverHost + '/' + config.serverVer + '/strategies/'
      url += this.updateGoods.strategyId + '/versions'
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
      let exchange = this.updateGoods.exchange
      let currency = this.updateGoods.currency
      let url = `${config.datafeedUrl}/exchange_symbols?exchange=${exchange}`
      this.axios.get(url).then((response) => {
        let jsonData = JSON.parse(response.data.body)
        let tmpCoinSet = new Set()
        jsonData.forEach(o => {
          if (currency.toUpperCase() !== o.coin.toUpperCase() &&
            currency.toUpperCase() === o.base.toUpperCase()) {
            tmpCoinSet.add(o.coin)
          }
        })
        let isCoin = false
        this.coinList = []
        Array.from(tmpCoinSet).forEach((o, i) => {
          this.coinList.push({text: o, value: o})
          if (o.toUpperCase() === this.updateGoods.coin.toUpperCase()) {
            isCoin = true
          }
        })
        if (!isCoin) {
          this.updateGoods.coin = null
        }
        this.isEdit = true
      }).catch((e) => {
        console.log('response err', e)
      })
    },
    updateRegisteredGoods () {
      let updateGoods = this.updateGoods
      updateGoods.recruitStart = utils.timeToTimestamp(updateGoods.recruitStart)
      updateGoods.recruitEnd = utils.timeToTimestamp(updateGoods.recruitEnd)
      updateGoods.investStart = utils.timeToTimestamp(updateGoods.investStart)
      updateGoods.investEnd = utils.timeToTimestamp(updateGoods.investEnd)
      updateGoods.backtestStart = utils.timeToTimestamp(updateGoods.backtestStart)
      updateGoods.backtestEnd = utils.timeToTimestamp(updateGoods.backtestEnd)
      if (updateGoods.strategyId === null || updateGoods.strategyId === '') {
        this.$vueOnToast.pop('error', '실패', '전략을 선택하세요.')
        return false
      } else if (updateGoods.version === null || updateGoods.version === '') {
        this.$vueOnToast.pop('error', '실패', '버전을 선택하세요.')
        return false
      } else if (updateGoods.exchange === null || updateGoods.exchange === '') {
        this.$vueOnToast.pop('error', '실패', '거래소를 선택하세요.')
        return false
      } else if (updateGoods.coin === null || updateGoods.coin === '') {
        this.$vueOnToast.pop('error', '실패', '코인을 선택하세요.')
        return false
      } else if (updateGoods.amount === null || updateGoods.amount === '') {
        this.$vueOnToast.pop('error', '실패', '모집 금액을 입력하세요.')
        return false
      } else if (updateGoods.amount % 2 !== 0) {
        this.$vueOnToast.pop('error', '실패', '모집 금액은 홀수금액은 입력할 수 없습니다.')
        return false
      } else if (updateGoods.amount <= updateGoods.recruitAmount) {
        this.$vueOnToast.pop('error', '실패', '모집 금액은 모집된 금액보다 작을 수 없습니다.')
        return false
      } else if (updateGoods.currency === null || updateGoods.currency === '') {
        this.$vueOnToast.pop('error', '실패', '모집 통화를 선택하세요.')
        return false
      } else if (updateGoods.recruitStart === null || updateGoods.recruitStart === '') {
        this.$vueOnToast.pop('error', '실패', '모집 시작일을 선택하세요.')
        return false
      } else if (updateGoods.recruitEnd === null || updateGoods.recruitEnd === '') {
        this.$vueOnToast.pop('error', '실패', '모집 종료일을 선택하세요.')
        return false
      } else if (updateGoods.investStart === null || updateGoods.investStart === '') {
        this.$vueOnToast.pop('error', '실패', '투자 시작일을 선택하세요.')
        return false
      } else if (updateGoods.investEnd === null || updateGoods.investEnd === '') {
        this.$vueOnToast.pop('error', '실패', '투자 종료일을 선택하세요.')
        return false
      } else if (updateGoods.backtestStart === null || updateGoods.backtestStart === '') {
        this.$vueOnToast.pop('error', '실패', '백테스트 시작일을 선택하세요.')
        return false
      } else if (updateGoods.backtestEnd === null || updateGoods.backtestEnd === '') {
        this.$vueOnToast.pop('error', '실패', '백테스트 종료일을 선택하세요.')
        return false
      } else if (updateGoods.name === null || updateGoods.name === '') {
        this.$vueOnToast.pop('error', '실패', '상품명을 입력하세요.')
        return false
      } else if (updateGoods.description === null || updateGoods.description === '') {
        this.$vueOnToast.pop('error', '실패', '상품 설명을 입력하세요.')
        return false
      }
      let url = config.serverHost + '/' + config.serverVer + '/goods/' + updateGoods.id
      this.axios.put(url, updateGoods, config.getAxiosPostOptions()).then((response) => {
        this.$vueOnToast.pop('success', '성공', '상품을 편집하였습니다.')
        this.$root.$emit('bv::hide::modal', 'updateGoodsForm')
        this.$router.push('/investGoods/' + response.data.id)
      }).catch((e) => {
        let msg = '상품편집 정보가 잘못되었습니다.'
        if (e.response.data.message === 'not recruit invest goods') {
          msg = '대기 상품만 수정 할 수 있습니다.'
        }
        let message = {
          '400': {type: 'error', title: '실패', msg: msg},
          '500': {type: 'error', title: '실패', msg: '편집이 실패하였습니다.'}
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
      this.updateGoods.currency = currency
    },
    initGoods () {
      this.updateGoods.id = this.goods.id
      this.updateGoods.strategyId = this.goods.strategyId
      this.updateGoods.version = this.goods.version
      this.updateGoods.name = this.goods.name
      this.updateGoods.exchange = this.goods.exchange
      this.updateGoods.coin = this.goods.coin.toUpperCase()
      this.updateGoods.description = this.goods.description
      this.updateGoods.amount = this.goods.amount
      this.updateGoods.currency = this.goods.currency
      this.updateGoods.recruitStart = utils.timestampToTime(this.goods.recruitStart, 's', false)
      this.updateGoods.recruitEnd = utils.timestampToTime(this.goods.recruitEnd, 's', false)
      this.updateGoods.investStart = utils.timestampToTime(this.goods.investStart, 's', false)
      this.updateGoods.investEnd = utils.timestampToTime(this.goods.investEnd, 's', false)
      this.updateGoods.backtestStart = utils.timestampToTime(this.goods.backtestStart, 's', false)
      this.updateGoods.backtestEnd = utils.timestampToTime(this.goods.backtestEnd, 's', false)
      this.changeCoinList()
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
