<template lang="html">
  <b-container fluid>

    <h5>필수항목</h5>
    <b-row class="my-1">
      <b-col class="text-center"
             md="5">
        <label>키</label>
      </b-col>
      <b-col class="text-center"
             md="6">
        <label>설명</label>
      </b-col>
    </b-row>
    <b-row class="my-1 options"
    >
      <b-col md="5">
        <b-form-input value="데이터 시간간격"
                      disabled
        />
      </b-col>

      <b-col md="6">
        <b-form-input disabled
        />
      </b-col>
    </b-row>

    <b-row class="my-1 options"
    >
      <b-col md="5">
        <b-form-input value="코인"
                      disabled
        />
      </b-col>

      <b-col md="6">
        <b-form-input disabled
        />
      </b-col>
    </b-row>

    <hr />

    <h5>추가항목</h5>
    <b-row class="my-1">
      <b-col class="text-center"
             md="5">
        <label>키</label>
      </b-col>
      <b-col class="text-center"
             md="6">
        <label>설명</label>
      </b-col>
    </b-row>
    <b-row class="my-1 options"
           v-for="(field, index) in optionFields"
           :key="field.id"
    >
      <b-col md="5">
        <b-form-input @change="updateOption(index)"
                      @keyup.native="blankField(index)"
                      v-model="field.key"
        />
      </b-col>

      <b-col md="6">
        <b-form-input @change="updateOption(index)"
                      v-model="field.desc"
        />
      </b-col>

      <b-col md="1">
        <button type="button"
                class="close"
                v-if="index !== 0"
                @click="removeOption(index)"
        ><span aria-hidden="true">&times;</span>
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
      optionFields: []
    }
  },
  watch: {
    initOptions () {
      this.optionFields = this.initOptions
    }
  },
  created () {
    this.blankField()
  },
  methods: {
    blankField (index) {
      let size = Number(this.optionFields.length)
      if (size === 0 || (size - 1) === index) {
        this.optionFields.push({key: '', desc: '', must: 'false'})
      }
    },
    updateOption () {
      this.$emit('handleStrategyOptions', this.optionFields)
    },
    removeOption (index) {
      this.optionFields.splice(index, 1)
      this.updateOption()
    }
  }
}
</script>
