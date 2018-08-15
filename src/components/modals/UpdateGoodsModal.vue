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
          <label for="updateGoodsByCoin">심볼</label>
        </b-col>
        <b-col sm="9">
          <ModelSelect placeholder="심볼을 선택하세요."
                       id="updateGoodsByCoin"
                       v-model="updateGoods.symbol"
                       :options="symbolList"
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
                          v-model="updateGoods.cash"/>
            <b-input-group-button class="input-group-prepend">
              <b-dropdown :text="updateGoods.cashUnit" variant="primary" right>
                <b-dropdown-item @click="changeCurrency('USDT')">USDT</b-dropdown-item>
                <b-dropdown-item @click="changeCurrency('BTC')">BTC</b-dropdown-item>
              </b-dropdown>
            </b-input-group-button>
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <div @click="clearDatePickers('collectStartDatePicker')">
            모집시작일
          </div>
        </b-col>
        <b-col sm="9">
          <date-picker format="yyyy-MM-dd"
                       language="ko"
                       ref="collectStartDatePicker"
                       @opened="clearDatePickers('collectStartDatePicker')"
                       v-model="updateGoods.collectStart"
                       :disabled="collectStartDisabled"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="3" class="pt-2">
          <div @click="clearDatePickers('collectEndDatePicker')">
            모집종료일
          </div>
        </b-col>
        <b-col sm="9">
          <date-picker format="yyyy-MM-dd"
                       language="ko"
                       ref="collectEndDatePicker"
                       @opened="clearDatePickers('collectEndDatePicker')"
                       v-model="updateGoods.collectEnd"
                       :disabled="collectEndDisabled"
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
                       :disabled="investStartDisabled"
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
                       :disabled="investEndDisabled"
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
                       v-model="updateGoods.testStart"
                       :disabled="testStartDisabled"
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
                       v-model="updateGoods.testEnd"
                       :disabled="testEndDisabled"
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
      symbolList: [],
      cashUnitList: [],
      updateGoods: {
        id: null,
        strategyId: null,
        version: null,
        description: null,
        name: null,
        symbol: null,
        exchange: null,
        coinUnit: null,
        baseUnit: null,
        collectStart: null,
        collectEnd: null,
        investStart: null,
        investEnd: null,
        testStart: null,
        testEnd: null,
        cash: null,
        cashUnit: 'USDT'
      },
      standardDate: null,
      isEdit: false
    }
  },
  computed: {
    collectStartDisabled () {
      let date = new Date()
      date.setTime(this.standardDate)
      date.setDate(date.getDate() - 1)
      return { to: date }
    },
    collectEndDisabled () {
      let date = new Date()
      date.setTime(this.standardDate)
      date.setDate(date.getDate() - 1)
      return { to: date }
    },
    investStartDisabled () {
      let date = new Date()
      date.setTime(this.standardDate)
      // // date.setDate(date.getDate() + 1)
      date.setDate(date.getDate() - 1)
      return { to: date }
    },
    investEndDisabled () {
      let date = new Date()
      date.setTime(this.standardDate)
      date.setDate(date.getDate() + 2)
      return { to: date }
    },
    testStartDisabled () {
      let date = new Date()
      date.setDate(date.getDate() - 1)
      return { from: date }
    },
    testEndDisabled () {
      let date = new Date()
      date.setDate(date.getDate())
      return { from: date }
    }
  },
  watch: {
    'updateGoods.exchange' () {
      if (this.isEdit === true) {
        this.changeSymbolList()
      }
    },
    'updateGoods.cashUnit' () {
      if (this.isEdit === true) {
        this.changeSymbolList()
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
        let isStrategy = false
        let strategyId = this.updateGoods.strategyId
        let strategyName = this.updateGoods.name
        response.data.forEach(strategy => {
          if (strategyId === strategy.id) {
            isStrategy = true
          }
          this.strategies.push({
            text: strategy.name,
            value: strategy.id
          })
        })
        if (!isStrategy) {
          this.strategies.push({
            text: strategyName,
            value: strategyId
          })
        }
      }).catch((e) => {
        console.log('response err', e)
      })
    },
    retrieveVersionList () {
      this.versionList = []
      let url = config.serverHost + '/' + config.serverVer + '/strategies/'
      url += this.updateGoods.strategyId + '/versions'
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        console.log('response.data', response.data)
        response.data.forEach(strategyDeploy => {
          console.log('response.data', response.data)
          this.versionList.push({
            text: '버전' + strategyDeploy.version + ' :' + strategyDeploy.description,
            value: strategyDeploy.version
          })
        })
      }).catch((e) => {
        console.log('response err', e)
      })
    },
    changeSymbolList () {
      let exchange = this.updateGoods.exchange
      let cashUnit = this.updateGoods.cashUnit
      let url = `${config.datafeedUrl}/exchange_symbols?exchange=${exchange}`
      this.axios.get(url).then((response) => {
        let jsonData = JSON.parse(response.data.body)
        jsonData.forEach(o => {
          this.symbolList.push({text: o.symbol, value: o.symbol})
        })
      }).catch((e) => {
        console.log('response err', e)
      })
    },
    updateRegisteredGoods () {
      let updateGoods = this.updateGoods
      if (updateGoods.strategyId === null || updateGoods.strategyId === '') {
        this.$vueOnToast.pop('error', '실패', '전략을 선택하세요.')
        return false
      } else if (updateGoods.version === null || updateGoods.version === '') {
        this.$vueOnToast.pop('error', '실패', '버전을 선택하세요.')
        return false
      } else if (updateGoods.exchange === null || updateGoods.exchange === '') {
        this.$vueOnToast.pop('error', '실패', '거래소를 선택하세요.')
        return false
      } else if (updateGoods.symbol === null || updateGoods.symbol === '') {
        this.$vueOnToast.pop('error', '실패', '심볼을 선택하세요.')
        return false
      } else if (updateGoods.cash === null || updateGoods.cash === '') {
        this.$vueOnToast.pop('error', '실패', '모집 금액을 입력하세요.')
        return false
      } else if (updateGoods.cash % 2 !== 0) {
        this.$vueOnToast.pop('error', '실패', '모집 금액은 홀수금액은 입력할 수 없습니다.')
        return false
      } else if (updateGoods.cash <= updateGoods.investCash) {
        this.$vueOnToast.pop('error', '실패', '모집 금액은 모집된 금액보다 작을 수 없습니다.')
        return false
      } else if (updateGoods.cashUnit === null || updateGoods.cashUnit === '') {
        this.$vueOnToast.pop('error', '실패', '모집 통화를 선택하세요.')
        return false
      } else if (updateGoods.collectStart === null || updateGoods.collectStart === '') {
        this.$vueOnToast.pop('error', '실패', '모집 시작일을 선택하세요.')
        return false
      } else if (updateGoods.collectEnd === null || updateGoods.collectEnd === '') {
        this.$vueOnToast.pop('error', '실패', '모집 종료일을 선택하세요.')
        return false
      } else if (updateGoods.investStart === null || updateGoods.investStart === '') {
        this.$vueOnToast.pop('error', '실패', '투자 시작일을 선택하세요.')
        return false
      } else if (updateGoods.investEnd === null || updateGoods.investEnd === '') {
        this.$vueOnToast.pop('error', '실패', '투자 종료일을 선택하세요.')
        return false
      } else if (updateGoods.testStart === null || updateGoods.testStart === '') {
        this.$vueOnToast.pop('error', '실패', '백테스트 시작일을 선택하세요.')
        return false
      } else if (updateGoods.testEnd === null || updateGoods.testEnd === '') {
        this.$vueOnToast.pop('error', '실패', '백테스트 종료일을 선택하세요.')
        return false
      } else if (updateGoods.name === null || updateGoods.name === '') {
        this.$vueOnToast.pop('error', '실패', '상품명을 입력하세요.')
        return false
      } else if (updateGoods.description === null || updateGoods.description === '') {
        this.$vueOnToast.pop('error', '실패', '상품 설명을 입력하세요.')
        return false
      }
      updateGoods.collectStart = utils.timeToString(updateGoods.collectStart).replace(/-/g, '')
      updateGoods.collectEnd = utils.timeToString(updateGoods.collectEnd).replace(/-/g, '')
      updateGoods.investStart = utils.timeToString(updateGoods.investStart).replace(/-/g, '')
      updateGoods.investEnd = utils.timeToString(updateGoods.investEnd).replace(/-/g, '')
      updateGoods.testStart = utils.timeToString(updateGoods.testStart).replace(/-/g, '')
      updateGoods.testEnd = utils.timeToString(updateGoods.testEnd).replace(/-/g, '')
      updateGoods.coinUnit = updateGoods.symbol.split('/')[0]
      updateGoods.baseUnit = updateGoods.symbol.split('/')[1]
      let url = config.serverHost + '/' + config.serverVer + '/goods/' + updateGoods.id
      this.axios.put(url, updateGoods, config.getAxiosPostOptions()).then((response) => {
        this.$root.$emit('bv::hide::modal', 'updateGoodsForm')
        this.$vueOnToast.pop('success', '성공', '상품을 편집하였습니다.')
        this.$emit('updateGoods', response.data)
        // console.log('response.data.id', response.data.id, response.data)
        // this.$router.push('/investGoods/' + response.data.id)
      }).catch((e) => {
        let msg = '상품편집 정보가 잘못되었습니다.'
        if (e.response.data.message === 'not collect invest goods') {
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
      if (ref !== 'collectStartDatePicker') {
        this.$refs.collectStartDatePicker.close()
      }
      if (ref !== 'collectEndDatePicker') {
        this.$refs.collectEndDatePicker.close()
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
    changeCurrency (cashUnit) {
      this.updateGoods.cashUnit = cashUnit
    },
    initGoods () {
      this.updateGoods.id = this.goods.id
      this.updateGoods.strategyId = this.goods.strategyId
      this.updateGoods.version = this.goods.version
      this.updateGoods.name = this.goods.name
      this.updateGoods.exchange = this.goods.exchange
      this.updateGoods.symbol = this.goods.coinUnit.toUpperCase() + '/' + this.goods.baseUnit.toUpperCase()
      this.updateGoods.description = this.goods.description
      this.updateGoods.cash = this.goods.cash
      this.updateGoods.cashUnit = this.goods.cashUnit.toUpperCase()
      this.updateGoods.collectStart = this.convertDate(this.goods.collectStart)
      this.updateGoods.collectEnd = this.convertDate(this.goods.collectEnd)
      this.updateGoods.investStart = this.convertDate(this.goods.investStart)
      this.updateGoods.investEnd = this.convertDate(this.goods.investEnd)
      this.updateGoods.testStart = this.convertDate(this.goods.testStart)
      this.updateGoods.testEnd = this.convertDate(this.goods.testEnd)
      this.standardDate = this.goods.createTime
      this.changeSymbolList()
    },
    convertDate (date) {
      let y = Number(date.substring(0, 4))
      let m = Number(date.substring(4, 6))
      let d = Number(date.substring(6, 8))
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
    },
    strToDate (str) {
      if (typeof str !== 'string') {
        return str
      }
      return new Date(Number(str.substring(0, 4)), Number(str.substring(4, 6)), Number(str.substring(6, 8)))
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
