<template>
  <div id="market" class="wrapper">
    <b-row>
      <b-col>
        <h2>투자상품</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="8">
        모집마감일 다음날 오후 12시에 투자가 시작됩니다.
      </b-col>

      <!-- 관리자메뉴 -->
      <b-col v-if="$store.isManager === 'true'"
             cols="4"
             class="text-right">
             <RegisterGoodsModal />
      </b-col>
      <!-- 관리자메뉴 끝 -->
    </b-row>

    <b-row>
      <b-col>
        <b-tabs slot="tabs"
                class="mt-4"
                nav-class="mb-2"
                content-class="d-none">
          <template slot="tabs">
            <b-nav-item v-for="item in exchange.options"
                        :key="item.key"
                        :active="item.en === exchange.selected"
                        @click="changeExchange(item.en)">
                        {{item.ko}}
            </b-nav-item>
          </template>
        </b-tabs>
      </b-col>
    </b-row>

    <b-row v-if="$store.isManager === 'true'"
           class="mt-2">
      <b-col>
        <div class="form-check form-check-inline">
          <input class="form-check-input"
                 type="radio"
                 name="typeRadio"
                 id="waitRadio"
                 checked>
          <label class="form-check-label"
                 for="waitRadio">대기</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input"
                 type="radio"
                 name="typeRadio"
                 id="runningRadio">
          <label class="form-check-label"
                 for="runningRadio">진행</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input"
                 type="radio"
                 name="typeRadio"
                 id="closeRadio">
          <label class="form-check-label"
                 for="closeRadio">종료</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input"
                 type="radio"
                 name="typeRadio"
                 id="allRadio">
          <label class="form-check-label"
                 for="allRadio">전체</label>
        </div>
        <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <InvestGoodsList :strategies="registerStrategies"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import InvestGoodsList from '../components/cards/InvestGoodsList'
import RegisterGoodsModal from '../components/modals/registerGoodsModal'
import datePicker from 'vuejs-datepicker'
import config from '../Config'
import utils from '../Utils'

export default {
  name: 'investGoods',
  extends: '',
  components: {
    InvestGoodsList,
    RegisterGoodsModal
  },
  props: [],
  data () {
    return {
      exchange: {
        selected: null,
        options: []
      },
      registerStrategies: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    changeExchange (exchange) {
      this.exchange.selected = exchange
    },
    retrieveGoodsList () {
      let url = `${config.serverHost}/${config.serverVer}/goods?exchange=${this.exchange.selected}`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        console.log(response.data)
      }).catch((e) => {
        let message = {
          '401': '상품조회의 권한이 없습니다.',
          '500': '상품조회가 실패하였습니다.'
        }
        utils.httpFailNotify(e, this, message)
      })
    }
  },
  beforeCreate () {},
  created () {
    this.exchange.options = config.liveExchanges
    this.exchange.selected = this.exchange.options[0].en
    this.retrieveGoodsList()
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style>
.wrapper {
  margin-top: 20px;
}
.market-text {
  font-size: 11pt;
  align: center;
  text-align: center;
}
.align-items-end {
  text-align: end;
}
.text-ellipsis {
  text-overflow: ellipsis;
  overflow-y: hidden;
  width: 100%;
  white-space: nowrap;
  padding: 0px;
}
.vdp-datepicker input {
  /* datepicker */
  padding: 5px;
  font-size: 100%;
  border: 1px solid #ccc;
  width: 100%
}
@media only screen and (max-width: 959px) {
  .hidden-sm-and-down {
      display: none!important;
  }
}

</style>
