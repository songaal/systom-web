<template>
  <div id="market" class="wrapper">
    <b-row>
      <b-col>
        <h2>투자상품</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" v-if="$store.isManager === 'false'">
        <!-- 모집마감일 다음날 오후 12시30분에 투자가 시작됩니다. -->
      </b-col>
      <b-col cols="8" v-if="$store.isManager === 'true'">
        <!-- 모집마감일 다음날 오후 12시30분에 투자가 시작됩니다. -->
      </b-col>

      <!-- 관리자메뉴 -->
      <b-col v-if="$store.isManager === 'true'"
             cols="4"
             class="text-right">
             <RegisterGoodsModal/>
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
                 name="type"
                 id="open"
                 checked
                 @change="changeType('open')">
          <label class="form-check-label"
                 for="open">공개</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input"
                 type="radio"
                 name="type"
                 id="close"
                 @change="changeType('close')">
          <label class="form-check-label"
                 for="close">비공개</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input"
                 type="radio"
                 name="type"
                 id="all"
                 @change="changeType('all')">
          <label class="form-check-label"
                 for="all">전체</label>
        </div>
        <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <InvestGoodsList :goodsList="goodsList"/>
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
      type: 'open',
      goodsList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    changeExchange (exchange) {
      this.exchange.selected = exchange
      location.hash = `exchange=${this.exchange.selected}`
      if (this.$store.isManager === 'true') {
        location.hash += `#display=${this.type}`
      }
      this.retrieveGoodsList()
    },
    changeType (type) {
      this.type = type
      location.hash = `exchange=${this.exchange.selected}`
      if (this.$store.isManager === 'true') {
        location.hash += `#display=${this.type}`
      }
      this.retrieveGoodsList()
    },
    retrieveGoodsList () {
      let targetExchange = this.exchange.selected
      let targetType = this.type
      this.goodsList = []
      let url = `${config.serverHost}/${config.serverVer}/goods?exchange=${targetExchange}`
      url += targetType !== undefined && targetType !== null ? `&type=${targetType}` : ''
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        this.goodsList = response.data
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '상품 조회의 요정이 잘못되었습니다.'},
          '500': {type: 'error', title: '실패', msg: '상품 조회가 실패하였습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    getHash (key) {
      let paramMap = {}
      let params = location.hash.split('#')
      if (params.length > 0) {
        params.forEach(param => {
          paramMap[param.split('=')[0]] = param.split('=')[1]
        })
      }
      return paramMap[key]
    }
  },
  beforeCreate () {},
  created () {
    this.exchange.options = config.liveExchanges.filter((o) => {
      return o.disable === true
    })
    let exchange = this.getHash('exchange')
    if (exchange) {
      this.exchange.options.forEach(o => {
        if (String(o.en).toUpperCase() === String(exchange).toUpperCase()) {
          this.exchange.selected = o.en
          return false
        }
      })
    }
    let display = this.getHash('display')
    if (display) {
      ['open', 'close', 'all'].forEach(o => {
        if (String(o).toUpperCase() === String(display).toUpperCase()) {
          this.type = o
          return false
        }
      })
    }
    if (this.exchange.selected === null) {
      this.exchange.selected = this.exchange.options[0].en
      location.hash = `exchange=${this.exchange.selected}`
      if (this.$store.isManager === 'true') {
        location.hash += `#display=${this.type}`
      }
    }
    this.retrieveGoodsList()
  },
  beforeMount () {},
  mounted () {
    if (this.$store.isManager === 'true') {
      document.querySelector('#' + this.type).checked = true
    }
  },
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
