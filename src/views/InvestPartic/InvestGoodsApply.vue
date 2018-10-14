<template>
  <div class="wrapper">
    <b-row class="mb-4">
      <b-col class="text-center">
        <h2>투자하기</h2>
      </b-col>
    </b-row>

    <b-card>
      <b-row class="mb-4">
        <b-col>
          <h4>투자상품</h4>
        </b-col>
      </b-row>
      <div class="d-sm-down-none">
        <b-row>
          <b-col>
            <div>
              <table class="table text-nowrap text-center">
                <tr>
                  <th class="text-left">상품이름</th>
                  <th>심볼</th>
                  <th>최대월수익률</th>
                  <th>최대월손실률</th>
                </tr>
                <tr>
                  <td class="text-left">[{{investGoods.formatGoodsId}}호] {{goods.name}}</td>
                  <td>{{goods.coinUnit}}/{{goods.baseUnit}}</td>
                  <td>{{goods.testMaxMonthlyPct || 0}}%</td>
                  <td class="text-danger">{{goods.testMinMonthlyPct || 0}}%</td>
                </tr>
              </table>
            </div>
          </b-col>
        </b-row>
      </div>

      <div class="d-md-none">
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">상품이름</b-col>
          <b-col class="text-left">{{goods.name}}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">심볼</b-col>
          <b-col class="text-left">{{goods.coinUnit}}/{{goods.baseUnit}}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">최대월수익률</b-col>
          <b-col class="text-left">{{goods.testMaxMonthlyPct || 0}} %</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">최대월손실률</b-col>
          <b-col class="text-left text-danger">{{goods.testMinMonthlyPct || 0}} %</b-col>
        </b-row>
      </div>
    </b-card>

    <b-card>
      <b-row class="mb-4">
        <b-col>
          <h4>투자유형</h4>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col cols="6">
          <button :class="{'btn': true,
                          'btn-block': true,
                          'invest-type': true,
                          'btn-primary': !investGoods.isPaper,
                          'btn-outline-primary': investGoods.isPaper}"
                  @click="changeInvestMode(false)">
            실전투자
          </button>
        </b-col>
        <b-col cols="6">
          <button :class="{'btn': true,
                          'btn-block': true,
                          'invest-type': true,
                          'btn-primary': investGoods.isPaper,
                          'btn-outline-primary': !investGoods.isPaper}"
                  @click="changeInvestMode(true)">
            모의투자
          </button>
        </b-col>
      </b-row>
    </b-card>

    <div v-if="investGoods.isPaper === false">
      <b-card>
        <b-row class="mb-4">
          <b-col>
            <h4>거래소키</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col col cols="12" xs="12" sm="12" md="6" class="mb-2">
            <b-row>
              <b-col col cols="4" xs="4" sm="6" md="4" lg="4">
                거래소
              </b-col>
              <b-col col cols="8" xs="8" sm="6" md="8" lg="8">
                {{goods.formatExchange}}
              </b-col>
            </b-row>
          </b-col>

          <b-col col cols="12" xs="12" sm="12" md="6" class="mb-2">
            <b-row>
              <b-col class="pt-1" col cols="4" xs="4" sm="6" md="4" lg="4">
                거래소키
              </b-col>
              <b-col col cols="8" xs="8" sm="6" md="8" lg="8">
                <b-form-select v-model="investGoods.exchangeKeyId"
                               :options="exchangeKeyList"
                               class="mb-3"
                               :select-size="1"
                               @input="changeExchangeKey"
                />
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-link class="text-primary" to="/account">거래소 키 등록하러 가기</b-link>
          </b-col>
        </b-row>
        <hr />

        <b-row>
          <b-col class="text-left text-secondary">
            <h5>선택한 거래소키</h5>
          </b-col>
          <b-col class="text-right text-primary">
            <h5>{{investGoods.exchangeKeyName}}</h5>
          </b-col>
        </b-row>
      </b-card>
    </div>

    <div v-if="investGoods.isPaper === true || investGoods.exchangeKeyId !== null">
      <b-card>
        <b-row class="mb-4">
          <b-col>
            <h4>투자금액</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col col cols="12" xs="12" sm="12" md="6" class="mb-2"
                v-if="investGoods.isPaper === false">
            <b-row>
              <b-col col cols="4" xs="4" sm="6" md="4" lg="4"
                     class="text-left text-nowrap">
                잔고
              </b-col>
              <b-col  col cols="8" xs="8" sm="6" md="8" lg="8"
                      class="text-left text-primary">
                <div v-for="balance in balanceList"
                     v-if="balance.coin === investGoods.cashUnit"
                     :id="balance.key">
                     {{balance.cash}} {{balance.coin}}
                </div>
                <div v-for="balance in balanceList"
                     v-if="investGoods.baseUnit !== investGoods.cashUnit && balance.coin === investGoods.baseUnit"
                     :id="balance.key">
                     {{balance.cash}} {{balance.coin}}
                </div>
                <div v-for="balance in balanceList"
                     v-if="balance.coin === investGoods.coinUnit"
                     :id="balance.key">
                     {{balance.cash}} {{balance.coin}}
                </div>
                <b-button-spinner v-if="isGetBalanceLoding"
                                  size="large"
                                  class="f-left">
                </b-button-spinner>
              </b-col>
            </b-row>
          </b-col>
          <b-col col cols="12" xs="12" sm="12" md="6" class="mb-2">
            <b-row>
              <b-col class="pt-1" col cols="4" xs="4" sm="6" md="4" lg="4">
                투자금액
              </b-col>
              <b-col col cols="8" xs="8" sm="6" md="8" lg="8">
                <div class="input-group">
                  <b-form-input v-model="investGoods.investCash"
                                placeholder="투자금액을 입력하세요."
                                :disabled="isGetBalanceLoding"
                                type="number"
                                step="0.1"/>
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2">USDT</span>
                  </div>
                </div>
                <div class="invalid-feedback d-block">
                  <span ref="inValidBalanceMsg"></span>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </div>

    <b-row class="mb-5">
      <b-col class="text-center">
        <button :class="{'d-sm-down-none':true,
                        'btn':true,
                        'btn-lg':true,
                        'w-50':true,
                        'btn-primary':isNextStep,
                        'btn-secondary':!isNextStep}"
                :disabled="!isNextStep"
                @click="next">
          다음
        </button>
        <button :class="{'d-md-none':true,
                        'btn':true,
                        'btn-lg btn-block':true,
                        'btn-primary': isNextStep,
                        'btn-secondary': !isNextStep}"
                :disabled="!isNextStep"
                @click="next">
          다음
        </button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'
import ccxt from 'ccxt'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'InvestGoodsApply',
  extends: '',
  components: {
    'b-button-spinner': Spinner
  },
  props: [],
  data () {
    return {
      goods: {
        id: null,
        name: null,
        coinUnit: null,
        baseUnit: null,
        formatExchange: null,
        testMaxMonthlyPct: null,
        testMinMonthlyPct: null,
        exchange: null
      },
      investGoods: {
        goodsId: null,
        goodsName: null,
        investCash: null,
        cashUnit: null,
        exchangeKeyId: null,
        formatGoodsId: null,
        exchangeKeyName: null,
        exchange: null,
        testMaxMonthlyPct: null,
        testMinMonthlyPct: null,
        formatInvestCash: null,
        isPaper: false
      },
      exchangeKeyList: [],
      investCashList: [],
      balanceList: [],
      isGetBalanceLoding: false,
      isNextStep: false
    }
  },
  computed: {},
  watch: {
    'investGoods.investCash' () {
      this.investGoods.formatInvestCash = utils.comma(this.investGoods.investCash)
      if (this.isValidCheck()) {
        this.isNextStep = true
      }
    }
  },
  methods: {
    getGoods (goodsId) {
      let url = `${config.serverHost}/${config.serverVer}/goods/${goodsId}`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        let goods = response.data
        this.goods = goods
        this.goods.coinUnit = this.goods.coinUnit.toUpperCase()
        this.goods.baseUnit = this.goods.baseUnit.toUpperCase()
        this.goods.cashUnit = goods.cashUnit.toUpperCase()
        this.goods.exchange = goods.exchange
        this.goods.convertCash = utils.convertCash(goods.cash, 0, this.goods.cashUnit)
        let maxCash = goods.cash - goods.investCash
        let tmpCash = Number(goods.cash) / 2
        let tmpInvestGoods = Number(goods.cash - goods.investCash) / 2
        let maxAmount = maxCash <= tmpInvestGoods ? tmpInvestGoods : tmpCash
        if (maxCash <= maxAmount) {
          maxAmount = maxCash
        }
        let minAmount = Number(goods.cash) / 100
        this.investCashList = this.generatorAmountList(minAmount, maxAmount, this.goods.cashUnit)
        config.liveExchanges.forEach(o => {
          if (this.goods.exchange === o.en) {
            this.goods.formatExchange = utils.capitalizeFirstLetter(o.en) + '(' + o.ko + ')'
            return false
          }
        })
        this.retrieveExchangeKeyList(this.goods.exchange)
        this.investGoods.goodsId = goods.id
        this.investGoods.goodsName = goods.name
        this.investGoods.exchange = goods.exchange
        this.investGoods.formatGoodsId = utils.LPAD(goods.id, '0', 5)
        this.investGoods.coinUnit = this.goods.coinUnit
        this.investGoods.baseUnit = this.goods.baseUnit
        this.investGoods.cashUnit = this.goods.cashUnit
        let testResult = JSON.parse(this.goods.testResult)
        this.goods.testMaxDrawDownPct = testResult.testMaxDrawDownPct
        this.goods.testMaxMonthlyPct = testResult.testMaxMonthlyPct
        this.goods.testMinMonthlyPct = testResult.testMinMonthlyPct
        this.investGoods.testMaxMonthlyPct = this.goods.testMaxMonthlyPct || 0
        this.investGoods.testMinMonthlyPct = this.goods.testMinMonthlyPct || 0
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '요청이 잘못 되었습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    retrieveExchangeKeyList (exchange) {
      this.exchangeKeyList = []
      this.exchangeKeyList.push({value: null, text: '거래소키를 선택하세요.', disabled: true})
      let url = `${config.serverHost}/auth/exchangeKey`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        response.data.forEach(key => {
          this.exchangeKeyList.push({
            text: `[${key.exchange}] ${key.name}`,
            value: key.id,
            disabled: (key.exchange.toLowerCase() !== exchange.toLowerCase()),
            exchange: key.exchange,
            name: key.name,
            apiKey: key.apiKey,
            secretKey: key.secretKey
          })
        })
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '요청이 잘못 되었습니다.'}
        }
        utils.httpFailNotify(e, this, message)
        this.$router.go(-1)
      })
    },
    getBalance: async (el, exchangeName, apiKey, secretKey, useCoinUnitList) => {
      try {
        var exchange = new ccxt[exchangeName.toLowerCase()]({
          'proxy': 'https://cors-anywhere.herokuapp.com/',
          'apiKey': apiKey,
          'secret': secretKey
        })
        let balance = await exchange.fetchBalance()
        let tmpBalance = []
        Object.keys(balance).forEach((coinUnit) => {
          if (useCoinUnitList.has(coinUnit)) {
            tmpBalance.push({
              coin: coinUnit,
              cash: utils.comma(balance[coinUnit].total)
            })
          }
        })
        el.isGetBalanceLoding = false
        el.balanceList = tmpBalance
      } catch (e) {
        this.isGetBalanceLoding = false
        el.$vueOnToast.pop('error', '실패', '지갑정보 조회 실패하였습니다.')
        console.log('잘못된 거래소키:', e)
      }
    },
    changeExchangeKey (keyId) {
      this.balanceList = []
      this.investGoods.investCash = null
      this.exchangeKeyList.forEach(key => {
        if (key.value === keyId) {
          this.investGoods.exchangeKeyId = keyId
          this.investGoods.exchangeKeyName = key.name
          let useCoinUnitList = new Set()
          useCoinUnitList.add(this.investGoods.cashUnit.toUpperCase())
          useCoinUnitList.add(this.investGoods.baseUnit.toUpperCase())
          useCoinUnitList.add(this.investGoods.coinUnit.toUpperCase())
          this.isGetBalanceLoding = true
          this.getBalance(this, key.exchange, key.apiKey, key.secretKey, useCoinUnitList)
          return false
        }
      })
    },
    generatorAmountList (minAmount, maxAmount, currency) {
      let tmpAmountList = []
      minAmount = minAmount <= 0 ? 1 : minAmount
      let sum = 0
      tmpAmountList.push({value: null, text: '투자금액을 선택하세요.', disabled: true})
      for (let i = Number(minAmount); i < Number(maxAmount) + Number(minAmount); i = Number(i) + Number(minAmount)) {
        sum = parseFloat(i.toFixed(0))
        tmpAmountList.push({value: i.toFixed(0), text: (utils.comma(i.toFixed(0)) + ' ' + currency)})
      }
      if (sum > maxAmount) {
        tmpAmountList[tmpAmountList.length - 1].value = maxAmount.toFixed(0)
        tmpAmountList[tmpAmountList.length - 1].text = (maxAmount.toFixed(0) + ' ' + currency)
      }
      return tmpAmountList
    },
    next () {
      if (!this.isValidCheck()) {
        return false
      }
      if (this.investGoods.isPaper) {
        this.investGoods.exchange = this.goods.exchange
      }
      this.$store.investGoods = this.investGoods
      this.$router.replace(`/investGoods/${this.investGoods.goodsId}/terms`)
    },
    changeInvestMode (checked) {
      this.investGoods.investCash = null
      this.balanceList = []
      this.investGoods.exchangeKeyId = null
      this.investGoods.exchangeKeyName = null
      this.investGoods.exchange = null
      this.investGoods.isPaper = checked
      this.isGetBalanceLoding = false
      if (this.$refs.hasOwnProperty('inValidBalanceMsg') && this.$refs.inValidBalanceMsg) {
        this.$refs.inValidBalanceMsg.innerText = ''
      }
    },
    isValidCheck () {
      this.isNextStep = false
      if (!this.$refs.hasOwnProperty('inValidBalanceMsg') || !this.$refs.inValidBalanceMsg) {
        return false
      }
      this.$refs.inValidBalanceMsg.innerText = ''
      if (this.investGoods.investCash === null || this.investGoods.investCash <= 0) {
        this.$refs.inValidBalanceMsg.innerHTML = '금액을 입력하세요.'
        return false
      }
      if (!this.investGoods.isPaper) {
        // 실전투자
        if (Number(this.investGoods.investCash) > Number(this.balanceList.filter(o => o.coin === this.investGoods.cashUnit)[0].cash)) {
          this.$refs.inValidBalanceMsg.innerHTML = '잔고가 부족합니다.'
          return false
        }
        if (this.investGoods.exchangeKeyId === null) {
          this.$vueOnToast.pop('warning', '실패', '거래소키를 선택하세요.')
          return false
        }
      }
      return true
    }
  },
  beforeCreate () {},
  created () {
    if (this.$route.params.goodsId !== undefined && this.$route.params.goodsId !== null) {
      this.getGoods(this.$route.params.goodsId)
    } else {
      this.$router.go(-1)
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
.wrapper {margin-top: 20px;}
.invest-type {font-size: 1.2em; min-height:80px}
.f-left {float: left;}
</style>
