<template lang="html">
  <b-container fluid>

    <b-row class="my-1">
      <b-col sm="2">
        <label for="strategyName">에이전트 이름:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input size="md"
                      v-model="agentName"
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
        <b-form-input v-model="strategyName"
                      size="md"
                      type="text"
                      readonly
        />
      </b-col>
    </b-row>



    <b-row class="my-1">
      <b-col sm="2">
        <label for="exchange">거래소:</label>
      </b-col>
      <b-col sm="10">
        <b-form-select v-model="selectedExchange"
                       :options="exchangeList"
                       size="md"
        />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label for="baseCurrency">통화:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input v-model="currency"
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
        <b-form-input v-model="capitalBase"
                      size="md"
                      type="text"
        />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label for="key">거래소 키:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input id="key"
                      size="md"
                      type="text"
                      v-model="key"
                      placeholder="exchange key"
        />
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label for="secret">거래소 비밀키:</label>
      </b-col>
      <b-col sm="10">
        <b-form-input id="secret"
                      size="md"
                      type="text"
                      v-model="secret"
                      placeholder="exchange secret"
        />
      </b-col>
    </b-row>

    <hr v-if="optionFields.length > 0"/>
    <h5>필수 항목</h5>
    <b-form-group v-for="(field, index) in optionFields"
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
    <h5 class="optionTitle">추가 항목</h5>
    <b-form-group v-for="(field, index) in optionFields"
                  v-if="field.must == 'false'"
                  :key="field.key"
                  :label-cols="2"
                  breakpoint="sm"
                  :description="field.desc"
                  :label="field.label"
                  horizontal
                  label-for="inputHorizontal">
      <b-form-input></b-form-input>
    </b-form-group>
  </b-container>
</template>

<script>
import config from '../../config/Config'
export default {
  props: ['strategyName', 'strategyId', 'strategyVersion', 'optionFields'],
  data () {
    return {
      agentName: '',
      selectedStrategyVersion: '1.0',
      selectedExchange: '',
      exchangeList: config.agentExchanges,
      currency: '',
      balance: 0,
      key: '',
      secret: '',
      capitalBase: 0,
      timeInterval: {
        selected: '',
        options: []
      }
    }
  },
  created () {
    this.timeInterval.options = config.getTimeIntervalList()
    console.log(this.timeInterval.options[0])
    this.timeInterval.selected = this.timeInterval.options[0]
  },
  mounted () {
    this.$el.querySelector('.optionTitle').classList.add('d-none')
  }
}
</script>

<style lang="css">
</style>
