<template lang="html">
  <b-container fluid>

    <b-row class="my-1">
      <b-col sm="2">
        <label for="strategyName">에이전트 이름:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input size="md"
                      v-model="createAgentData.name"
        />
      </b-col>
    </b-row>
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
      <b-col sm="2">
        <label for="strategyName">전략 이름:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input v-model="createAgentData.strategyName"
                      size="md"
                      type="text"
                      readonly
        />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label for="baseCurrency">통화:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input v-model="createAgentData.baseCurrency"
                      size="md"
                      type="text"
        />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label for="baseCurrency">기본 잔액:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input v-model="createAgentData.capitalBase"
                      size="md"
                      type="text"
        />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label for="exchange">거래소키:</label>
      </b-col>
      <b-col sm="10">
        <b-form-select v-model="changeExchangeKey"
                       :options="exchange.nameList"
                       size="md"
        />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label for="exchange">실거래 여부:</label>
      </b-col>
      <b-col sm="10" class="mt-1">
        <toggle-button v-model="createAgentData.simulationOrder" :labels="true"/>
      </b-col>
    </b-row>

    <hr/>

    <h5>필수 항목</h5>
    <b-form-group :label-cols="2"
                  breakpoint="sm"
                  label="데이터 시간간격:"
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
                  :label-cols="2"
                  breakpoint="sm"
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
        idList: []
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
  },
  watch: {
    strategyId (e) {
      let check = this.createAgentData.options.map((o) => { return o.must })
      if (check.includes('false')) {
        this.optionTitle = false
      } else {
        this.optionTitle = true
      }
      this.changeTimeInterval(this.timeInterval.options[0])
      let url = config.serverHost + '/' + '/auth/exchangeKey'
      this.axios.get(url, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        this.exchange.nameList = result.data.map((o) => {
          return o.name
        })
        this.exchange.idList = result.data.map((o) => {
          return o.id
        })
        this.createAgentData.exchangeKeyId = this.exchange.idList[0]
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  methods: {
    changeTimeInterval (e) {
      let optionSize = this.createAgentData.options.length
      console.log('set1', optionSize)
      for (let i = 0; i < optionSize; i++) {
        console.log('set1')
        if (this.createAgentData.options[i].key === 'timeInterval') {
          console.log('set2')
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
        this.createAgentData.exchangeKeyId = this.exchange.idList[index]
      }
    }
  }
}
</script>

<style lang="css">
</style>
