<template>
  <div>
    <b-modal title="추가항목" size="lg">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">키</th>
            <th scope="col">설명</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(option, index) in options"
              :key="option.id"
          >
            <td>
              <b-form-input v-model="option.key"></b-form-input>
            </td>
            <td>
              <b-form-input v-model="option.desc"></b-form-input>
            </td>
            <td>
              <button class="close mt-2 mr-4">
                <span aria-hidden="true">&times;</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div slot="modal-footer">
        <button class="btn btn-ghost-dark">취소</button>
        <button class="btn btn-primary">저장</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'StrategyOptionModal',
  extends: '',
  components: {},
  props: ['options'],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    blankField () {
      let size = Number(this.options.length)
      if (size === 0 || (size - 1) === index) {
        this.options.push({key: '', desc: '', value: ''})
      }
    },
    handleSave () {
      // this.$emit('save', this.options)
    },
    removeOption (index) {
      this.options.splice(index, 1)
      this.handleSave()
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>

</style>
