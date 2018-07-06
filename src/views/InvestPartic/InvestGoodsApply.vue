<template>
  <div class="wrapper">
    <b-row class="mb-4">
      <b-col class="text-center">
        <h2>투자 신청하기</h2>
        <!-- <div class="text-center">
          <div class="d-inline-block bg-info" style="width: 10px; height:10px; border-radius: 90px;"></div>
          <div class="d-inline-block bg-secondary" style="width: 10px; height:10px; border-radius: 90px;"></div>
        </div> -->
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
                  <th>코인</th>
                  <th>예상수익률</th>
                  <th>기간</th>
                  <th>투자금액</th>
                </tr>
                <tr>
                  <td class="text-left">[{{investGoods.formatGoodsId || 0}}호] {{goods.name}}</td>
                  <td>{{goods.coin}}</td>
                  <td>{{goods.performance.returnPct}}%</td>
                  <td>{{goods.investDays}} 일</td>
                  <td>
                    <!-- <ModelSelect placeholder="투자금액을 선택하세요."
                                 :options="amountList"
                                 v-model="investGoods.amount"

                    /> -->
                    <b-form-select v-model="investGoods.amount"
                                   :options="amountList"
                                   class="mb-3"
                                   :select-size="1"
                    />
                  </td>
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
          <b-col class="text-left text-nowrap">코인</b-col>
          <b-col class="text-left">{{goods.coin}}</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">예상수익률</b-col>
          <b-col class="text-left">{{goods.performance.returnPct}} %</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">기간</b-col>
          <b-col class="text-left">{{goods.investDays}} 일</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">투자금액</b-col>
          <b-col class="text-left">
            <!-- <ModelSelect placeholder="투자금액을 선택하세요."
                         class="mb-3"
                         :options="amountList"
                         v-model="investGoods.amount"
            /> -->
            <b-form-select v-model="investGoods.amount"
                           :options="amountList"
                           class="mb-3"
                           :select-size="1"
            />
          </b-col>
        </b-row>
      </div>

      <hr />
      <b-row>
        <b-col class="text-left text-secondary">
          <h5>총 투자금액</h5>
        </b-col>
        <b-col class="text-right text-primary">
          <h5>{{investGoods.amount}} {{investGoods.amount !== null ? goods.currency : ''}}</h5>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row class="mb-4">
        <b-col>
          <h4>거래소키</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col col cols="12" xs="12" sm="12" md="6" class="mb-2">
          <b-row>
            <b-col col cols="6" xs="6">
              거래소
            </b-col>
            <b-col col cols="6" xs="6">
              {{goods.formatExchange}}
            </b-col>
          </b-row>
        </b-col>

        <b-col col cols="12" xs="12" sm="12" md="6" class="mb-2">
          <b-row>
            <b-col col cols="6" xs="6" sm="6" md="4" lg="4">
              거래소키
            </b-col>
            <b-col col cols="6" xs="6" sm="6" md="8" lg="8">
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
          <b-link class="text-secondary" to="/account">거래소 키 등록하러 가기</b-link>
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

    <b-row class="mb-5">
      <b-col class="text-center">
        <button class="d-sm-down-none btn btn-lg btn-primary w-50" @click="next">다음</button>
        <button class="d-md-none btn btn-lg btn-block btn-primary" @click="next">다음</button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'
import { ModelSelect } from 'vue-search-select'

export default {
  name: 'InvestGoodsApply',
  extends: '',
  components: {
    ModelSelect
  },
  props: [],
  data () {
    return {
      goods: {
        id: null,
        name: null,
        investDays: null,
        coin: null,
        formatExchange: null,
        performance: {
          returnPct: null
        }
      },
      investGoods: {
        goodsId: null,
        goodsName: null,
        amount: null,
        currency: null,
        exchangeKeyId: null,
        formatGoodsId: null,
        exchangeKeyName: null,
        exchange: null,
        investDays: null,
        performance: {
          returnPct: null
        }
      },
      exchangeKeyList: [],
      amountList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    getGoods (goodsId) {
      let url = `${config.serverHost}/${config.serverVer}/goods/${goodsId}`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        let goods = response.data
        this.goods = goods
        this.goods.coin = this.goods.coin.toUpperCase()
        this.goods.currency = goods.currency.toUpperCase()
        this.goods.investDays = utils.obtainingDateDays(goods.investStart, goods.investEnd)
        this.goods.convertAmount = utils.convertAmountUnits(goods.amount)
        let maxAmount = goods.maxAmount - goods.recruitAmount
        let minAmount = goods.minAmount
        this.amountList = this.generatorAmountList(minAmount, maxAmount, this.goods.currency)
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
        this.investGoods.coin = this.goods.coin
        this.investGoods.currency = this.goods.currency
        this.investGoods.investDays = this.goods.investDays
        this.investGoods.performance.returnPct = this.goods.performance.returnPct
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '요청이 잘못 되었습니다.'}
        }
        utils.httpFailNotify(e, this, message)
        // this.$router.go(-1)
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
            name: key.name
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
    changeExchangeKey (keyId) {
      this.exchangeKeyList.forEach(key => {
        if (key.value === keyId) {
          this.investGoods.exchangeKeyId = keyId
          this.investGoods.exchangeKeyName = key.name
          return false
        }
      })
    },
    generatorAmountList (minAmount, maxAmount, currency) {
      let tmpAmountList = []
      tmpAmountList.push({value: null, text: '투자금액을 선택하세요.', disabled: true})
      for (let i = minAmount; i <= maxAmount; i += minAmount) {
        tmpAmountList.push({value: i, text: (i + ' ' + currency)})
      }
      return tmpAmountList
    },
    next () {
      if (this.investGoods.goodsId === null) {
        this.$vueOnToast.pop('error', '실패', '상품정보가 없습니다.')
        return false
      } else if (this.investGoods.amount === null) {
        this.$vueOnToast.pop('warning', '실패', '투자금액을 선택하세요.')
        return false
      } else if (this.investGoods.exchangeKeyId === null) {
        this.$vueOnToast.pop('warning', '실패', '거래소키를 선택하세요.')
        return false
      }
      this.$store.investGoods = this.investGoods
      this.$router.replace(`/investGoods/${this.investGoods.goodsId}/terms`)
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
</style>
