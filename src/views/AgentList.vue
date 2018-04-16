<template lang="html">
    <b-card class="wrapper">
      <h5 slot="header"
          class="mb-0"
      >
      에이전트
     </h5>
     <b-table :fields="agentFields"
              :items="agentList"
              hover
     >

      <template slot="name" slot-scope="data">
        <b-link :to="`/agents/${data.item.id}`">{{data.item.name}}</b-link>
      </template>
      <template slot="strategyName" slot-scope="data">
        <b-link :to="`/strategys/${data.item.strategyId}`">{{data.item.strategyName}}</b-link>
      </template>
      <template slot="action" slot-scope="data">
        <b-button v-if="data.item.state == 'running'"
                  variant="warning"
                  @click="changeStopState(data.item.id)"
        >
        정지
        </b-button>
        <b-button v-if="data.item.state == 'stop'"
                  variant="primary"
                  @click="changeStartState(data.item.id)"
        >
        실행
        </b-button>
      </template>
     </b-table>
    </b-card>
</template>

<script>
import config from '../config/Config'
import utils from '../components/Utils'

export default {
  data () {
    return {
      agentFields: {
        name: {label: '이름', sortable: true, class: 'text-center'},
        // id: {label: ' 에이전트 아이디', sortable: true, class: 'text-center'},
        strategyName: {label: '전략 이름', sortable: true, class: 'text-center'},
        // strategyVersione: {label: '전략 버전', sortable: true, class: 'text-center'},
        // strategyId: {label: '전략 아이디', sortable: true, class: 'text-center'},
        state: {label: '상태', sortable: true, class: 'text-center'},
        revenue: {label: '수익', sortable: true, class: 'text-center'},
        exchangeName: {label: '거래소', sortable: true, class: 'text-center'},
        baseCurrency: {label: '통화', sortable: true, class: 'text-center'},
        capitalBase: {label: '시작금액', sortable: true, class: 'text-center'},
        action: {label: '실행', sortable: false, class: 'text-center'}
      },
      agentList: []
    }
  },
  methods: {
    changeStopState (id) {
      console.log('stop 요청:', id)
    },
    changeStartState (id) {
      console.log('start 요청:', id)
    },
    getAgentList () {
      let url = config.serverHost + '/' + config.serverVer + '/agents'
      this.axios.get(url, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        console.log('agent 목록 조회 응답 결과:', result)
        if (result.status === 200) {
          let agentList = result.data
          agentList.forEach((o, i) => {
            this.agentList.push(o)
          })
        } else {
          this.$vueOnToast.pop('warning', '실패', '에이전트 조회 실패하였습니다.')
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  created () {
    this.getAgentList()
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
</style>
