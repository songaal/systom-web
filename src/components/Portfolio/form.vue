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
        <b-form-select v-model="createAgentData.exchangeKeyId"
                       :options="exchange"
                       size="md"
        />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label for="exchange">실거래 여부:</label>
      </b-col>
      <b-col sm="10" class="mt-1">
        <toggle-button :value="false" :labels="true"/>
      </b-col>
    </b-row>

    <hr/>

    <h5>필수 항목</h5>
    <b-form-group v-for="(field, index) in createAgentData.options"
                  v-if="field.must == 'true'"
                  :key="field.key"
                  :label-cols="2"
                  breakpoint="sm"
                  :description="field.desc"
                  :label="field.label"
                  horizontal
                  label-for="inputHorizontal">

      <b-form-select v-if="field.key === 'timeInterval'"
                     :options="timeInterval.options"
                     v-model="timeInterval.selected"
      />
    </b-form-group>

    <h5>추가 항목</h5>
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
      <b-form-input></b-form-input>
    </b-form-group>
  </b-container>
</template>

<script>
import config from '../../config/Config'

export default {
  props: ['createAgentData'],
  data () {
    return {
      exchange: [
        {id: '', name: ''}
      ],
      timeInterval: {
        selected: '',
        options: []
      }
    }
  },
  created () {
    this.timeInterval.options = config.getTimeIntervalList()
    this.timeInterval.selected = this.timeInterval.options[0]
  },
  watch: {
    strategyId (e) {
      let check = this.createAgentData.options.map((o) => {
        return o.must === 'false'
      })
      console.log('check', check)
    }
  },
  methods: {

  }
}
</script>

<style lang="css">
</style>
