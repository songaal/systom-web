<template lang="html">
  <div>
    <b-card class="wrapper">
      <h5 slot="header"
          class="mb-0"
      >
      에이전트
     </h5>
     <div class="table-responsive">
       <b-table :fields="agentFields"
                :items="agentList"
                hover

                class="text-nowrap"
       >

        <template slot="name" slot-scope="data">
          <b-link :to="`/agents/${data.item.id}`">{{data.item.name}}</b-link>
        </template>
        <template slot="strategyName" slot-scope="data">
          <b-link :to="`/strategies/${data.item.strategyId}`">{{data.item.strategyName}}</b-link>
        </template>
        <template slot="simulationOrder" slot-scope="data">
          <span>{{data.item.simulationOrder == '' ? '' : data.item.simulationOrder== true ? '페이퍼' : '라이브'}}</span>
        </template>
        <template slot="action" slot-scope="data">
          <b-button v-if="data.item.state == 'running'"
                    variant="warning"
                    @click="changeStopState(data.item.id, data.item.simulationOrder)"
          >정지</b-button>
          <b-button v-if="data.item.state == 'stop'"
                    variant="primary"
                    @click="changeStartState(data.item.id)"
          >실행</b-button>
        </template>
       </b-table>
     </div>
    </b-card>

    <b-modal id="AgentRunModal"
             size="md"
             class="text-center"
             title="에이전트 실행"
    >
      <b-form-group label="실행할 모드를 선택하세요.">
        <b-form-radio-group buttons
                            :options="['라이브', '페이퍼']"
                            v-model="mode"
                            size="lg"
                            button-variant="outline-primary"
                            block
        />
      </b-form-group>
      <div slot="modal-footer">
        <button class="btn btn-secondary" @click="() => {this.$root.$emit('bv::hide::modal', 'AgentRunModal')}">취소</button>
        <button class="btn btn-primary" @click="agentRun">확인</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import config from '../Config'
import utils from '../Utils'

export default {
  data () {
    return {
      mode: '라이브',
      agentId: '',
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
        simulationOrder: {label: '모드', sortable: true, class: 'text-center'},
        action: {label: '실행', sortable: false, class: 'text-center'}
      },
      agentList: []
    }
  },
  methods: {
    getAgentList () {
      this.agentList = []
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
    },
    changeStopState (agentId, simulationOrder) {
      if (!confirm('정지 하시겠습니까?')) {
        return
      }
      let mode = simulationOrder === false ? 'live' : 'paper'
      let body = {
        mode: mode,
        action: 'stop'
      }
      let url = config.serverHost + '/' + config.serverVer + '/agents/' + agentId + '/actions'
      this.axios.post(url, body, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        if (result.status === 200) {
          this.$vueOnToast.pop('info', '성공', '에이전트 정지 되었습니다.')
        } else {
          this.$vueOnToast.pop('warning', '실패', '에이전트 정지 실패하였습니다.')
        }
        this.getAgentList()
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    changeStartState (agentId) {
      this.agentId = agentId
      this.$root.$emit('bv::show::modal', 'AgentRunModal')
    },
    agentRun () {
      this.$root.$emit('bv::hide::modal', 'AgentRunModal')
      let mode = this.mode === '라이브' ? 'live' : 'paper'
      let body = {
        mode: mode,
        action: 'run',
        exchangeKeyId: ''
      }
      let url = config.serverHost + '/' + config.serverVer + '/agents/' + this.agentId + '/actions'
      this.axios.post(url, body, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        if (result.status === 200) {
          this.$vueOnToast.pop('info', '성공', '에이전트 실행 되었습니다.')
        } else {
          this.$vueOnToast.pop('warning', '실패', '에이전트 실행 실패하였습니다.')
        }
        this.getAgentList()
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  computed: {
    changeExchangeKey: {
      get () {
        let index = this.exchange.idList.indexOf(this.exchangeKeyId)
        return this.exchange.nameList[index]
      },
      set (newValue) {
        let index = this.exchange.nameList.indexOf(newValue)
        this.exchangeKeyId = this.exchange.idList[index]
      }
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
