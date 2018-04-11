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
      console.log('Options', this.initOptions)
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
        let timeInterval = ''
        switch (this.selectedTimeInterval) {
          case '1T': timeInterval = '1분'
            break
          case '3T': timeInterval = '3분'
            break
          case '5T': timeInterval = '5분'
            break
          case '15T': timeInterval = '15분'
            break
          case '30T': timeInterval = '30분'
            break
          case '1H': timeInterval = '1시'
            break
          case '2H': timeInterval = '2시'
            break
          case '3H': timeInterval = '3시'
            break
          case '4H': timeInterval = '4시'
            break
          case '6H': timeInterval = '6시'
            break
          case '12H': timeInterval = '12시'
            break
          case '1D': timeInterval = '1일'
            break
          default: timeInterval = '1분'
        }
        return timeInterval
      },
      set (newValue) {
        switch (newValue) {
          case '1분': this.selectedTimeInterval = '1T'
            break
          case '3분': this.selectedTimeInterval = '3T'
            break
          case '5분': this.selectedTimeInterval = '5T'
            break
          case '15분': this.selectedTimeInterval = '15T'
            break
          case '30분': this.selectedTimeInterval = '30T'
            break
          case '1시': this.selectedTimeInterval = '1H'
            break
          case '2시': this.selectedTimeInterval = '2H'
            break
          case '3시': this.selectedTimeInterval = '3H'
            break
          case '4시': this.selectedTimeInterval = '4H'
            break
          case '6시': this.selectedTimeInterval = '6H'
            break
          case '12시': this.selectedTimeInterval = '12H'
            break
          case '1일': this.selectedTimeInterval = '1일'
            break
        }
        this.handleStrategyOptions()
      }
    },
    requiredFields () {
      return [
        {label: '데이터 시간간격', value: ['1분', '3분', '5분', '15분', '30분', '1시', '2시', '3시', '4시', '6시', '12시', '1일'], desc: ''}
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
  }
}
</script>
