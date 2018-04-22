<template lang="html">
  <b-container fluid>

    <!-- <b-row class="my-1">
      <b-col sm="2">
        <label for="strategyId">전략 아이디:</label>
      </b-col>
      <b-col sm="6">
        <b-form-input size="md"
                      v-model="strategyId"
                      readonly
        />
      </b-col>
      <b-col sm="1">
        <label for="selectedStrategyVersion">버전:</label>
      </b-col>
      <b-col sm="3">
        <b-form-select size="md"
                       :v-model="selectedStrategyVersion"
                       :options="strategyVersionList"
        />
      </b-col>
    </b-row> -->

    <b-row class="my-1">
      <b-col md="3">
        <label for="strategyName" class="text-nowrap">전략 이름:</label>
      </b-col>
      <b-col md="9">
        <b-form-input v-model="createAgentData.strategyName"
                      size="md"
                      type="text"
                      readonly
        />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col md="3">
        <label for="strategyName" class="text-nowrap">에이전트 이름:</label>
      </b-col>
      <b-col md="9">
        <b-form-input size="md"
                      v-model="createAgentData.name"
        />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col md="3">
        <label for="baseCurrency" class="text-nowrap">기본 잔액:</label>
      </b-col>
      <b-col md="9">
        <b-form-input v-model="createAgentData.capitalBase"
                      size="md"
                      type="text"
                      placeholder="0.01"
        />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col md="3">
        <label for="baseCurrency" class="text-nowrap">통화:</label>
      </b-col>
      <b-col md="9">
        <b-form-input v-model="createAgentData.baseCurrency"
                      size="md"
                      type="text"
                      placeholder="btc"
        />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col md="3">
        <label for="exchange" class="text-nowrap">거래소키:</label>
      </b-col>
      <b-col md="9">
        <b-form-select v-model="changeExchangeKey"
                       :options="exchange.nameList"
                       size="md"
                       aria-describedby="choiceExchangeName"
        />
        <b-form-text id="choiceExchangeName">거래소: {{exchange.choiceExchangeName}}</b-form-text>
      </b-col>
    </b-row>

    <hr/>

    <h5>필수 항목</h5>
    <b-form-group :label-cols="3"
                  breakpoint="md"
                  label="데이터 시간간격:"
                   class="text-nowrap"
                  horizontal>
      <b-form-select :options="timeInterval.options"
                     v-model="timeInterval.selected"
                     @change="changeTimeInterval"
      />
    </b-form-group>
    <br />
    <h5 v-if="!optionTitle" >추가 항목</h5>
    <b-form-group v-for="(field, index) in createAgentData.options"
                  v-if="field.must == 'false'"
                  :key="field.key"
                  :label-cols="3"
                  breakpoint="md"
                  :description="field.desc"
                  :label="field.label"
                  horizontal
                  label-for="inputHorizontal"
                  class="strategyOption">

      <b-form-input v-model="field.value"
      />
    </b-form-group>
  </b-container>
</template>

<script>
import config from '../../config/Config'
import utils from '../../components/Utils'

export default {
  props: ['strategyId', 'createAgentData'],
  data () {
    return {
      exchange: {
        nameList: [],
        idList: [],
        exchangeNameList: []
      },
      timeInterval: {
        selected: '1분',
        options: []
      },
      optionTitle: true
    }
  },
  created () {
    this.timeInterval.options = config.getTimeIntervalList()
    this.initPortfolio()
  },
  watch: {
    strategyId (e) {
      this.initPortfolio()
    }
  },
  methods: {
    initPortfolio () {
      let check = this.createAgentData.options.map((o) => { return o.must })
      if (check.includes('false')) {
        this.optionTitle = false
      } else {
        this.optionTitle = true
      }
      this.changeTimeInterval(this.timeInterval.options[0])
      let url = config.serverHost + '/auth/exchangeKey'
      this.axios.get(url, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        if (result.data.length > 0) {
          this.exchange.nameList = result.data.map((o) => {
            return o.name
          })
          this.exchange.idList = result.data.map((o) => {
            return o.id
          })
          this.exchange.exchangeNameList = result.data.map((o) => {
            return o.exchangeName
          })
          this.exchange.choiceExchangeName = this.exchange.exchangeNameList[0]
          this.createAgentData.exchangeKeyId = this.exchange.idList[0]
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    changeTimeInterval (e) {
      let optionSize = this.createAgentData.options.length
      for (let i = 0; i < optionSize; i++) {
        if (this.createAgentData.options[i].key === 'timeInterval') {
          this.createAgentData.options[i].value = config.formatKoToEnTimeInterval(e)
        }
      }
    }
  },
  computed: {
    changeExchangeKey: {
      get () {
        let index = this.exchange.idList.indexOf(this.createAgentData.exchangeKeyId)
        return this.exchange.nameList[index]
      },
      set (newValue) {
        let index = this.exchange.nameList.indexOf(newValue)
        this.exchange.choiceExchangeName = this.exchange.exchangeNameList[index]
        this.createAgentData.exchangeKeyId = this.exchange.idList[index]
      }
    }
  }
}
</script>

<style lang="css">
</style>
