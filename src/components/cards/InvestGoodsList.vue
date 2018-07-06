<template>
  <div>
    <!-- pc -->
    <div class="d-sm-down-none">
      <b-row class="text-center market-text mb-2 ml-0 mr-0 text-nowrap">
        <b-col cols="1" size="md" class="goods-list-field">코인</b-col>
        <b-col cols="2" size="md" class="goods-list-field">이름</b-col>
        <b-col cols="1" size="md" class="goods-list-field pl-md-0 pl-lg-3">예상수익률</b-col>
        <b-col cols="1" size="md" class="goods-list-field">투자기간</b-col>
        <b-col cols="2" size="md" class="goods-list-field">모집현황</b-col>
        <b-col cols="2" size="md" class="goods-list-field">모집률</b-col>
        <b-col cols="2" size="md" class="goods-list-field">모집마감일</b-col>
        <b-col cols="1" size="md" class="pl-0">
          <span v-if="$store.isManager == 'true'">공개여부</span>
        </b-col>
      </b-row>

      <b-row v-if="goodsList.length === 0">
        <b-col class="text-center py-2 market-text mb-3 ml-0 mr-0 text-nowrap">
          투자상품이 없습니다.
        </b-col>
      </b-row>

      <b-row class="text-center bg-white py-2 border border-secondary market-text mb-3 ml-0 mr-0 text-nowrap"
             v-for="(goods, index) in goodsList"
             :key="goods.key"
      >
        <b-col cols="1" size="md" class="market-goods">{{goods.coin.toUpperCase()}}</b-col>
        <b-col cols="2" size="md" class="market-goods text-ellipsis">
          <b-link :to="`/investGoods/${goods.id}`">{{goods.name}}</b-link>
        </b-col>
        <b-col cols="1" size="md" class="market-goods">{{goods.performance.returnPct}}%</b-col>
        <b-col cols="1" size="md" class="market-goods">{{goods.investDays}}일</b-col>
        <b-col cols="2" size="md" class="market-goods">{{goods.convertRecruitAmount}} / {{goods.convertAmount}}</b-col>
        <b-col cols="2" size="md" class="market-goods">
          <div class="progress progress-xs mr-2 ml-1" style="width: 65%; display: inline-block; margin-bottom: 3px;">
            <div class="progress-bar bg-success"
                 role="progressbar"
                 :style="`width: ${goods.recruitPct}%; display:list-item; height:4px;`"
                 :aria-valuenow="goods.recruitPct"
                 aria-valuemin="0"
                 aria-valuemax="100">
            </div>
          </div>
          <span>{{goods.recruitPct}}%</span>
        </b-col>
        <b-col cols="2" size="md" class="market-goods">
          {{goods.recruitEnd}}
        </b-col>
        <b-col cols="1" size="md" class="pl-0">

          <div v-if="$store.isManager == 'false'">
            <b-link :class="{'btn': true, 'btn-outline-primary': !goods.invest, 'btn-secondary': goods.invest}"
                    :disabled="goods.invest"
                    :to="`/investGoods/${goods.id}/apply`"
            >투자</b-link>
          </div>

          <div class="mt-2" v-if="$store.isManager == 'true'">
            <c-switch type="icon"
                      variant="primary"
                      v-bind="{on: '\uf00c', off: '\uf00d'}"
                      :pill="true"
                      :checked="goods.display"
                      @change="changeDisplay(goods, index)"
            />
          </div>

        </b-col>
      </b-row>
    </div>
    <!-- mobile -->
    <div class="d-md-none">
      <b-row v-if="goodsList.length === 0">
        <b-col class="text-center pt-2 pb-2 market-text mb-2 text-nowrap">
          투자상품이 없습니다.
        </b-col>
      </b-row>
      <div v-for="(goods, index) in goodsList"
           :key="goods.key"
           class="text-center bg-white pt-2 pb-2 border border-secondary market-text mb-2 text-nowrap">
        <b-row>
          <b-col class="ml-1 mt-1">{{goods.coin.toUpperCase()}}</b-col>
          <b-col class="mt-1 text-ellipsis">
            <b-link :to="`/investGoods/${goods.id}`">{{goods.name}}</b-link>
          </b-col>
          <b-col>

            <div v-if="$store.isManager == 'false'">
              <b-link :class="{'btn': true, 'btn-outline-primary': !goods.invest, 'btn-secondary': goods.invest}"
                      :disabled="goods.invest"
                      :to="`/investGoods/${goods.id}/apply`"
              >투자</b-link>
            </div>

            <div class="mt-2" v-if="$store.isManager == 'true'">
              <c-switch type="icon"
                        variant="primary"
                        v-bind="{on: '\uf00c', off: '\uf00d'}"
                        :pill="true"
                        :checked="goods.display"
                        @change="changeDisplay(goods, index)"
              />
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">
            <div class="progress-group-bars">
              <div class="progress progress-xs">
                <div class="progress-bar bg-success"
                     role="progressbar"
                     :style="`width: ${goods.recruitPct}%;`"
                     :aria-valuenow="goods.recruitPct"
                     aria-valuemin="0"
                     aria-valuemax="100">
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">예상수익률</b-col>
          <b-col class="mt-2">투자기간</b-col>
          <b-col class="mt-2">모집마감일</b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">{{goods.performance.returnPct}}%</b-col>
          <b-col class="mt-2">{{goods.investDays}}일</b-col>
          <b-col class="mt-2">{{goods.recruitEnd}}</b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import cSwitch from '../Switch'
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'goodsCard',
  extends: '',
  components: {
    cSwitch
  },
  props: ['goodsList'],
  data () {
    return {}
  },
  computed: {},
  watch: {
    goodsList () {
      this.goodsList.forEach(goods => {
        // 투자 기간 산정
        goods.investDays = utils.obtainingDateDays(goods.investStart, goods.investEnd)
        goods.convertAmount = utils.convertAmountUnits(goods.amount)
        goods.convertRecruitAmount = utils.convertAmountUnits(goods.recruitAmount)
        goods.recruitPct = utils.calculationReturnPct(goods.amount, goods.recruitAmount)
        goods.recruitEnd = utils.timestampToTime(goods.recruitEnd, 's', false)
      })
    }
  },
  methods: {
    changeDisplay (goods, index) {
      let goodsId = goods.id
      let isDisplay = goods.display
      let display = null
      if (!isDisplay && confirm('해당 상품을 공개하시겠습니까?')) {
        display = 'show'
      } else if (isDisplay && confirm('상품을 숨기겠습니까?')) {
        display = 'hide'
      }
      if (display !== null) {
        let url = `${config.serverHost}/${config.serverVer}/goods/${goodsId}/${display}`
        this.axios.put(url, {}, config.getAxiosPutOptions()).then((response) => {
          let type = display === 'show' ? '공개' : '숨김'
          goods.display = !goods.display
          this.$vueOnToast.pop('success', '성공', type + ' 되었습니다.')
        }).catch((e) => {
          let message = {
            '400': {type: 'error', title: '실패', msg: '요청이 잘못 되었습니다.'},
            '500': {type: 'error', title: '실패', msg: '수정이 실패하였습니다.'}
          }
          utils.httpFailNotify(e, this, message)
        })
      } else {
        this.$el.querySelectorAll('.switch-input')[index].checked = goods.display
      }
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
.market-goods {
  line-height: 40px;
}
.cursor-pointer {
  cursor: pointer;
}
.goods-list-field {
  cursor: default;
}
</style>
