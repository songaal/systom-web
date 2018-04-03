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
    <b-row class="my-1">
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
    </b-row>

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
        <b-form-input v-model="startMoney"
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
    <b-form-group v-for="(field, index) in optionFields"
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
export default {
  props: [
    'agentName',
    'strategyId',
    'selectedStrategyVersion',
    'strategyVersionList', 'strategyName', 'selectedExchange', 'exchangeList', 'currency', 'startMoney', 'key'],
  data () {
    return {
      agentName: '',
      strategyId: 'aaaa-bbbb-ccc-dddd',
      strategyName: '테스트 전략',
      selectedStrategyVersion: '1.0.1',
      strategyVersionList: ['1.0.1', '0.0.1', '0.1.5'],
      selectedExchange: 'bitfinex',
      exchangeList: ['poloniex', 'bittrex', 'bitfinex'],
      currency: 'btc',
      balance: 10000,
      key: '',
      secret: '',
      optionFields: [
        {label: 'sort', desc: '설명 이것저것 합니다.'},
        {label: 'long', desc: ''}
      ]
    }
  }
}
</script>

<style lang="css">
</style>
