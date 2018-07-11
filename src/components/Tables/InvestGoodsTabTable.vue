<template>
  <b-tabs>
    <b-tab title="진행">
      <div class="table-responsive">
        <b-table hover
                 :fields="fields"
                 :items="runningInvestGoodsList"
                 :showEmpty="true"
                 class="text-nowrap"
                 emptyText="진행 중인 투자상품이 없습니다."
        >
          <template slot="name" slot-scope="data">
            <b-link :to="`/investDetail/${data.item.investId}`">{{data.value}}</b-link>
          </template>
          <template slot="returnPct" slot-scope="data">
            <span>{{data.value}} %</span>
          </template>
          <template slot="status" slot-scope="data">
            <span class="text-info">{{data.value}}</span>
          </template>
        </b-table>
      </div>
    </b-tab><!-- 진행 탭 끝-->
    <b-tab title="대기">
      <div class="table-responsive">
        <b-table hover
                 :fields="fields"
                 :items="waitInvestGoodsList"
                 :showEmpty="true"
                 class="text-nowrap"
                 emptyText="대기 중인 투자상품이 없습니다."
        >
          <template slot="name" slot-scope="data">
            <b-link :to="`/investGoods/${data.item.id}`">{{data.value}}</b-link>
          </template>
          <template slot="returnPct" slot-scope="data">
            <span>{{data.value}} %</span>
          </template>
          <template slot="status" slot-scope="data">
            <span class="text-warning">{{data.value}}</span>
          </template>
        </b-table>
      </div>
    </b-tab><!-- 대기 탭 끝-->

    <b-tab title="종료">
      <div class="table-responsive">
        <b-table hover
                 :fields="fields"
                 :items="closeInvestGoodsList"
                 :showEmpty="true"
                 class="text-nowrap"
                 emptyText="종료된 투자상품이 없습니다."
        >
          <template slot="name" slot-scope="data">
            <b-link :to="`/investDetail/${data.item.investId}`">{{data.value}}</b-link>
          </template>
          <template slot="returnPct" slot-scope="data">
            <span>{{data.value}} %</span>
          </template>
          <template slot="status" slot-scope="data">
            <span class="text-success">{{data.value}}</span>
          </template>
        </b-table>
      </div>
    </b-tab> <!-- 종료 탭 끝 -->
    <b-tab title="전체">
      <div class="table-responsive">
        <b-table hover
                 :fields="fields"
                 :items="investGoodsList"
                 :showEmpty="true"
                 emptyText="투자상품이 없습니다."
        >
          <template slot="name" slot-scope="data">
            <b-link v-if="data.item.status === '대기'" :to="`/investGoods/${data.item.id}`">{{data.value}}</b-link>
            <b-link v-if="data.item.status !== '대기'" :to="`/investDetail/${data.item.investId}`">{{data.value}}</b-link>
          </template>
          <template slot="returnPct" slot-scope="data">
            <span>{{data.value}} %</span>
          </template>
          <template slot="status" slot-scope="data">
            <span :class="{'text-info': data.value === '진행', 'text-warning': data.value === '대기', 'text-success': data.value === '종료'}">
              {{data.value}}
            </span>
          </template>
        </b-table>
      </div>
    </b-tab><!-- 종료 -->
  </b-tabs>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'name',
  extends: '',
  components: {},
  props: [],
  data () {
    return {
      fields: [
        { label: '상품이름', key: 'name' },
        { label: '수익률', key: 'returnPct' },
        { label: '상태', key: 'status' }
      ],
      waitInvestGoodsList: [],
      runningInvestGoodsList: [],
      closeInvestGoodsList: [],
      investGoodsList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    retrieveInvestGoods () {
      this.waitInvestGoodsList = []
      this.runningInvestGoodsList = []
      this.closeInvestGoodsList = []
      this.investGoodsList = []
      let url = `${config.serverHost}/${config.serverVer}/investGoods`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        let registerInvestGoodsList = response.data.registerInvestGoodsList
        let nowDate = Number(response.data.nowDate)
        if (registerInvestGoodsList !== undefined && registerInvestGoodsList.length > 0) {
          registerInvestGoodsList.forEach((investGoods, index) => {
            let tmpName = investGoods.name
            let tmpSumReturnPct = investGoods.performanceSummary.sumReturnPct
            let tmpRecruitStart = Number(investGoods.recruitStart)
            let tmpRecruitEnd = Number(investGoods.recruitEnd)
            let tmpInvestStart = Number(investGoods.investStart)
            let tmpInvestEnd = Number(investGoods.investEnd)
            let tmpInvestGoods = {
              id: investGoods.id,
              name: tmpName,
              returnPct: tmpSumReturnPct,
              investId: investGoods.investId
            }
            if (nowDate <= tmpRecruitEnd) {
              tmpInvestGoods.status = '대기'
              this.waitInvestGoodsList.push(tmpInvestGoods)
            } else if (tmpInvestStart <= nowDate && nowDate <= tmpInvestEnd) {
              tmpInvestGoods.status = '진행'
              this.runningInvestGoodsList.push(tmpInvestGoods)
            } else {
              tmpInvestGoods.status = '종료'
              this.closeInvestGoodsList.push(tmpInvestGoods)
            }
            this.investGoodsList.push(tmpInvestGoods)
          })
        }
      }).catch((e) => {
        let message = {
          '400': {type: 'error', title: '실패', msg: '조회 요청이 잘못되었습니다.'},
          '403': {type: 'error', title: '실패', msg: '조회 요청이 잘못되었습니다.'},
          '500': {type: 'error', title: '실패', msg: '조회를 할 수 없습니다.'}
        }
        utils.httpFailNotify(e, this, message)
      })
    }
  },
  beforeCreate () {},
  created () {
    this.retrieveInvestGoods()
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

</style>
