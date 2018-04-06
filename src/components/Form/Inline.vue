<template lang="html">
  <b-container fluid>
    <h5>필수항목</h5>
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
    <b-row class="my-1"
           v-for="(field, index) in optionFields"
           :key="field.id"
    >
      <b-col xs="3" sm="3">
        <div v-if="labelType == 'input'">
          <b-form-input :value="field.label"
                        v-model="field.label"
                        @keydown.native="handleAddOption(index)"
                        placeholder="키"/>
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
                      placeholder="값"
        />
      </b-col>

      <b-col xs="4"  sm="4">
        <b-form-input placeholder="설명"
                      :value="field.desc"
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

export default {
  props: ['initOptions'],
  data () {
    return {
      selectedTimeInterval: '',
      labelType: 'input',
      optionFields: []
    }
  },
  created () {
    if (this.optionFields.length === 0) {
      this.optionFields.push({})
    }
    setTimeout(() => {
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
    }, 1000)
  },
  computed: {
    eventTimeInterval: {
      get () {
        return this.selectedTimeInterval === '' ? '5T' : this.selectedTimeInterval
      },
      set (newValue) {
        this.selectedTimeInterval = newValue
        this.handleStrategyOptions()
      }
    },
    requiredFields () {
      return [
        {label: '시간 지연', value: ['1T', '5T', '15T', '1H', '1H', '4H'], desc: '지연 시간을 선택하세요.'}
      ]
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
