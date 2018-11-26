<template>
  <div>
    <div class="table-responsive">
      <b-table striped
               :fields="fields"
               :items="items"
               :showEmpty="true"
               emptyText="투자참여자가 없습니다."
               class="mb-0 table-hidden-more">
        <template slot="userId" slot-scope="data">
          {{data.value}} <br/>
          <b-badge v-if="data.item.isPaper" variant="secondary">모의</b-badge>
          <b-badge v-if="!data.item.isPaper" variant="primary">실전</b-badge>
          <b-badge v-if="data.item.isFinished" variant="dark">종료</b-badge>
        </template>

        <template slot="time" slot-scope="data">
          <div>({{data.item.days}} 일)</div>
          <div>{{data.item.startTime}}</div>
          <div v-if="data.item.isFinished === true">
            ~ {{data.item.endTime}}
          </div>
          <div v-if="data.item.isFinished === false">
            ~ <a href="javascript:void(0);" class="text-danger" @click="removeInvestor(`${data.item.investId}`)">종료하기</a>
          </div>
        </template>
      </b-table>
    </div>
    <div>
      <button v-if="isMore === true"
              class="btn btn-secondary btn-block more-font-size"
              @click="oneMore">
        더보기
      </button>
    </div>
  </div>
</template>

<script>
import config from '../../Config.js'
import utils from '../../Utils.js'

export default {
  name: 'name',
  extends: '',
  components: {},
  props: ['goods', 'isInvestorClosed', 'isInvestorSimulation'],
  data () {
    return {
      fields: [
        { label: '#', key: 'seq', class: 'align-middle text-nowrap' },
        { label: '아이디', key: 'userId', class: 'align-middle text-nowrap' },
        { label: '투자자산', key: 'initCash', class: 'align-middle text-nowrap' },
        { label: '수익률', key: 'returnsPct', class: 'align-middle text-nowrap' },
        { label: '자산가치', key: 'equity', class: 'align-middle text-nowrap' },
        { label: '현재자산', key: 'positions', class: 'align-middle p-0 text-nowrap' },
        { label: '투자기간', key: 'time', class: 'align-middle p-0 text-nowrap' }
      ],
      items: [],
      investors: [],
      isMore: false
    }
  },
  computed: {},
  watch: {
    'goods.investors' () {
      if (this.goods !== undefined && this.goods !== null) {
        this.investors = this.goods.investors
        this.refreshInvestors()
      }
    },
    isInvestorClosed () {
      this.refreshInvestors()
    },
    isInvestorSimulation () {
      this.refreshInvestors()
    }
  },
  methods: {
    refreshInvestors (oneMore) {
      this.isMore = false
      this.items = []
      this.investors.forEach((investor, index) => {
        if (this.isInvestorClosed === false && investor.finished === true) {
          return true
        }
        if (this.isInvestorSimulation === false && investor.paper === true) {
          return true
        }
        let startTime = utils.timestampToTime(investor.createTime, 'S', 'H')
        let endTime = null
        if (investor.endTime) {
          endTime = utils.timestampToTime(investor.endTime, 'S', 'H')
        } else {
          endTime = utils.timestampToTime(new Date().getTime(), 'S', 'H')
        }
        let days = utils.obtainingDateDays(startTime.replace(/-/gi, ''), endTime.replace(/-/gi, ''))
        let cashQuantity = 0
        if (this.goods.cashUnit === 'USDT') {
          cashQuantity = utils.comma(Math.floor(investor.cash * 100) / 100)
        } else {
          cashQuantity = utils.comma(Math.floor(investor.cash * 100000000) / 100000000)
        }
        let positions = `${this.goods.cashUnit}: ${cashQuantity} <br/>`
        if (investor.positions !== undefined && investor.positions !== null) {
          let tmpFormatPosition = JSON.parse(investor.positions)
          Object.keys(tmpFormatPosition).forEach(symbol => {
            positions += `${symbol.split('/')[0].toUpperCase()}: ${utils.comma(Math.floor(tmpFormatPosition[symbol].quantity * 100000000) / 100000000)} <br/>`
          })
        }
        if (this.items.length < 15 || oneMore) {
          this.items.push({
            investId: investor.id,
            seq: this.items.length + 1,
            userId: investor.userId,
            initCash: `${utils.comma(investor.investCash)} ${this.goods.cashUnit}`,
            returnsPct: `${investor.returnsPct}%`,
            equity: `${utils.comma(investor.equity)} ${this.goods.cashUnit}`,
            positions: positions,
            days: days,
            startTime: startTime,
            endTime: endTime,
            time: '',
            isFinished: investor.finished,
            isPaper: investor.paper
          })
        } else {
          this.isMore = true
          return false
        }
      })
    },
    oneMore () {
      this.refreshInvestors(true)
    },
    removeInvestor (investId) {
      if (!confirm('정말 종료하시겠습니까?')) {
        return false
      }
      let url = `${config.serverHost}/${config.serverVer}/investGoods/${investId}/actions?action=CLOSE_INVEST`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        this.$vueOnToast.pop('success', '성공', '투자를 종료하였습니다.')
        this.$emit('getGoods', this.goods.id)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>

<style scoped>
.more-font-size {
  font-size: 1.09375rem;
}
</style>
