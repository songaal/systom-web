<template lang="html">
  <div class="wrapper">
    <b-card>
      <h5 slot="header"
          class="mb-0"
      >
      전략
      </h5>
      <b-tabs>
        <b-tab title="내가 만든 전략" active>
          <div solt="header" class="mb-2">
            <b-button variant="primary" to="strategy">새 전략 생성</b-button>
          </div>
          <b-table :fields="strategyFields"
                   :items="strategyList"
                   hover
                   col="12"
                   size="md"
          >
            <template slot="name" slot-scope="data">
              <b-link :to="`/strategys/${data.item.id}`" class="text-nowrap">{{data.value}}</b-link>
            </template>
            <template slot="action" slot-scope="data">
              <b-link variant="primary"
                      class="text-nowrap"
                      @click="showModal(data.item.id, data.item.name, data.item.version, data.item.options)"
              >에이전트 생성</b-link>
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </b-card>
    <div>
    <!-- Modal Component -->
    <b-modal id="createAgentForm"
             title="새로운 에이전트"
             size="lg"
    >
      <portfolioForm :createAgentData="createAgentData"
                     :strategyId="createAgentData.strategyId"
      />
      <div slot="modal-footer">
        <button class="btn btn-secondary" @click="() => {this.$root.$emit('bv::hide::modal', 'createAgentForm')}">취소</button>
        <button class="btn btn-primary" @click="eventCreateAgent">확인</button>
      </div>
    </b-modal>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
// import Router from 'vue-router'
import config from '../Config'
import utils from '../Utils'
import portfolioForm from '../components/Portfolio/form'

// Vue.use(Router)

export default {
  data () {
    return {
      strategyFields: {
        name: {label: '이름', sortable: true, class: 'text-center'},
        // version: {label: '버전', sortable: true, class: 'text-center'},
        revenue: {label: '수익', sortable: true, class: 'text-center'},
        createTime: {label: '생성날짜', sortable: true, class: 'text-center'},
        updateTime: {label: '수정날짜', sortable: true, class: 'text-center'},
        writer: {label: '작성자', sortable: true, class: 'text-center'},
        action: {label: '실행', sortable: false, class: 'text-center'}
      },
      strategyList: [],
      createAgentData: {
        name: '',
        exchangeKeyId: '',
        baseCurrency: '',
        capitalBase: '',
        strategyId: '',
        strategyName: '',
        strategyVersion: '',
        options: []
      }
    }
  },
  components: {
    portfolioForm
  },
  methods: {
    eventCreateAgent (e) {
      e.preventDefault()
      if (this.createAgentData.name === '') {
        this.$vueOnToast.pop('warning', '실패', '에이전트 이름을 입력하세요.')
        return
      }
      if (this.createAgentData.exchangeKeyId === '') {
        this.$vueOnToast.pop('warning', '실패', '거래소키를 선택하세요.')
        return
      }
      if (this.createAgentData.capitalBase === '') {
        this.$vueOnToast.pop('warning', '실패', '기본 잔액을 입력하세요.')
        return
      }
      if (!/\d+/.test(this.createAgentData.capitalBase)) {
        this.$vueOnToast.pop('warning', '실패', '기본 잔액은 숫자로 입력하세요.')
        return
      }
      if (this.createAgentData.baseCurrency === '') {
        this.$vueOnToast.pop('warning', '실패', '통화를 선택하세요.')
        return
      }
      if (!/\S+/.test(this.createAgentData.baseCurrency)) {
        this.$vueOnToast.pop('warning', '실패', '통화는 문자만 입력가능합니다.')
        return
      }

      let check = this.createAgentData.options.filter((o) => {
        if (o.value === '' && (o.must === 'false' || o.must === 'true')) {
          return true
        } else {
          return false
        }
      })
      if (check.length !== 0) {
        this.$vueOnToast.pop('warning', '실패', '옵션을 입력하세요.')
        return
      }
      let options = this.createAgentData.options.filter((o) => {
        if (o.must === 'true' || o.must === 'false') {
          return true
        } else {
          return false
        }
      })
      let body = {
        strategyId: Number(this.createAgentData.strategyId),
        strategyVersion: this.createAgentData.strategyVersion,
        baseCurrency: this.createAgentData.baseCurrency,
        capitalBase: Number(this.createAgentData.capitalBase),
        name: this.createAgentData.name,
        exchangeKeyId: Number(this.createAgentData.exchangeKeyId),
        options: JSON.stringify(options)
      }
      console.log('요청 데이터: ', body)
      let url = config.serverHost + '/' + config.serverVer + '/agents'
      this.axios.post(url, body, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        if (result.status === 200) {
          this.$root.$emit('bv::hide::modal', 'createAgentForm')
          this.$vueOnToast.pop('info', '성공', '에이전트 생성 되었습니다.')
          this.$router.push('/agents/' + result.data.id)
        } else {
          this.$vueOnToast.pop('warning', '실패', '에이전트 생성 실패하였습니다.')
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    showModal (strategyId, strategyName, strategyVersion, options) {
      this.createAgentData = { name: '', exchangeKeyId: '', baseCurrency: '', capitalBase: '', strategyId: '', strategyVersion: '', strategyName: '', options: [] }
      this.createAgentData.strategyId = strategyId
      this.createAgentData.strategyName = strategyName
      this.createAgentData.strategyVersion = strategyVersion
      let tmpOptions = JSON.parse(options)
      tmpOptions = tmpOptions.map((o, i) => {
        o.value = ''
        return o
      })
      this.createAgentData.options = tmpOptions
      this.$root.$emit('bv::show::modal', 'createAgentForm')
    }
  },
  created () {
    let url = config.serverHost + '/' + config.serverVer + '/strategy/me'
    this.axios.get(url, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
      result.data.map((v) => {
        v.createTime = utils.timestampToTime(v.createTime, 's')
        v.updateTime = v.updateTime === null ? '-' : utils.timestampToTime(v.updateTime, 's')
        v.writer = v.userId === null ? '-' : v.userId
        v.revenue = v.revenue === null ? '-' : v.revenue
        return v
      })
      this.strategyList = result.data
    }).catch((e) => {
      utils.httpFailNotify(e, this)
    })
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
</style>
