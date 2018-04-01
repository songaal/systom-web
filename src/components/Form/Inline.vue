<template lang="html">
  <b-container fluid>
    <h5>필수항목</h5>
    <b-row class="my-1"
           v-for="(requiredField, index) in requiredFields"
           :key="requiredField.id"
    >
      <b-col xs="3" sm="3">
        <label>*{{ requiredField.label }}:</label>
      </b-col>

      <b-col xs="4" sm="4">
        <b-select
        ></b-select>
      </b-col>

    </b-row>
    <hr />
    <h5>추가항목</h5>
    <b-row class="my-1"
           v-for="(field, index) in fields"
           :key="field.id"
    >
      <b-col xs="3" sm="3">
        <div v-if="labelType == 'input'">
          <b-form-input :value="field.label"
                        @keydown.native="handleAppendEnv(index)"
                        placeholder="키"/>
        </div>

        <div v-if="labelType == 'label'">
          <label>{{ field.label }}:</label>
        </div>
      </b-col>

      <b-col xs="4" sm="4">
        <b-form-input :type="field.type"
                      :value="field.value"
                      :disabled="field.disabled"
                      placeholder="값"
        />
      </b-col>

      <b-col xs="4"  sm="4">
        <b-form-input :id="`desc-${field.id}`"
                      placeholder="설명"/>
      </b-col>

      <b-col xs="1" sm="1">
        <button type="button"
                class="close"
                v-if="index !== 0"
                @click="removeEnv(index)"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  props: ['requiredFields'],
  data () {
    return {
      labelType: 'input',
      fields: []
    }
  },
  created () {
    if (this.fields.length === 0) {
      this.fields.push({})
    }
  },
  methods: {
    handleAppendEnv (index) {
      if (this.fields.length - 1 === index) {
        this.fields.push({})
      }
    },
    removeEnv (index) {
      this.fields.splice(index, 1)
    }
  }
}
</script>
