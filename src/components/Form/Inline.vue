<template lang="html">
  <b-container fluid>
    <h5>필수항목</h5>
    <b-row class="my-1">
      <b-col class="text-center"
             xs="3" sm="3">
        <label>키</label>
      </b-col>
      <b-col class="text-center"
             xs="4" sm="4">
        <label>값</label>
      </b-col>
      <b-col class="text-center"
             xs="4" sm="4">
        <label>설명</label>
      </b-col>
    </b-row>
    <b-row class="my-1"
           v-for="(requiredField, index) in requiredFields"
           :key="requiredField.id"
    >
      <b-col xs="3" sm="3">
        <b-form-input :value="requiredField.label"
                      class="bg-white"
                      disabled/>
      </b-col>

      <b-col xs="4" sm="4">
        <b-select :options="requiredField.value"
                  v-model="eventTimeInterval"
        />
      </b-col>

      <b-col xs="4" sm="4">
        <b-form-input :value="requiredField.desc"
                      class="bg-white"
                      disabled
        />
      </b-col>
    </b-row>
    <hr />
    <h5>추가항목</h5>
    <b-row class="my-1">
      <b-col class="text-center"
             xs="3" sm="3">
        <label>키</label>
      </b-col>
      <b-col class="text-center"
             xs="4" sm="4">
        <label>값</label>
      </b-col>
      <b-col class="text-center"
             xs="4" sm="4">
        <label>설명</label>
      </b-col>
    </b-row>
    <b-row class="my-1"
           v-for="(field, index) in optionFields"
           :key="field.id"
    >
      <b-col xs="3" sm="3">
        <div v-if="labelType == 'input'">
          <b-form-input :value="field.label"
                        v-model="field.label"
                        @keydown.native="handleAddOption(index)"
          />
        </div>

        <div v-if="labelType == 'label'">
          <label>{{ field.label }}:</label>
        </div>
      </b-col>

      <b-col xs="4" sm="4">
        <b-form-input :type="field.type"
                      :value="field.value"
                      v-model="field.value"
                      :disabled="field.disabled"
                      @keydown.native="handleStrategyOptions"
        />
      </b-col>

      <b-col xs="4"  sm="4">
        <b-form-input :value="field.desc"
                      v-model="field.desc"
                      @keydown.native="handleStrategyOptions"
        />
      </b-col>

      <b-col xs="1" sm="1">
        <button type="button"
                class="close"
                v-if="index !== 0"
                @click="handleRemoveOption(index)"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import config from '../../config/Config'

export default {
  props: ['initOptions'],
  data () {
    return {
      selectedTimeInterval: '1T',
      selectedCoin: '',
      labelType: 'input',
      optionFields: [],
      requiredFields: [
        {label: '데이터 시간간격', value: [], desc: ''}
      ]
    }
  },
  created () {
    this.requiredFields = [{label: '데이터 시간간격', value: [], desc: ''}]
    this.requiredFields[0].value = config.getTimeIntervalList()
    if (this.optionFields.length === 0) {
      this.optionFields.push({})
    }
    let optionWatch = setInterval(() => {
      if (this.initOptions.length > 0) {
        this.optionFields = this.initOptions.filter((o) => {
          return o.must === 'false'
        })
        this.optionFields.push({})
        let tmpRequiredField = this.initOptions.filter((o) => {
          return o.must === 'true'
        })
        this.selectedTimeInterval = tmpRequiredField[0].value
        if (tmpRequiredField.length > 0) {
          clearInterval(optionWatch)
        }
      }
    }, 1000)
  },
  mounted () {
    if (this.initOptions.length > 0) {
      this.optionFields = this.initOptions.filter((o) => {
        return o.must === 'false'
      })
      this.optionFields.push({})
      let tmpRequiredField = this.initOptions.filter((o) => {
        return o.must === 'true'
      })
      this.selectedTimeInterval = tmpRequiredField[0].value
    }
  },
  computed: {
    eventTimeInterval: {
      get () {
        return config.formatEnToKoTimeInterval(this.selectedTimeInterval)
      },
      set (newValue) {
        let interval = config.formatKoToEnTimeInterval(newValue)
        this.selectedTimeInterval = interval
        this.handleStrategyOptions()
      }
    }
  },
  methods: {
    handleAddOption (index) {
      this.handleStrategyOptions()
      if (this.optionFields.length - 1 === index) {
        this.optionFields.push({})
      }
    },
    handleRemoveOption (index) {
      this.optionFields.splice(index, 1)
      this.handleStrategyOptions()
    },
    handleStrategyOptions () {
      this.$emit('handleStrategyOptions', this.selectedTimeInterval, this.optionFields)
    }
  }
}
</script>
