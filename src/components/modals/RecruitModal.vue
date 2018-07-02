<template>
  <div class="d-inline-block">
    <b-dropdown split
                variant="outline-primary"
                class="ml-2"
    >
      <template slot="button-content">
        모집 생성
      </template>
      <b-dropdown-item >
        모집 중지
      </b-dropdown-item>
    </b-dropdown>

    <b-modal id="uploadMarketForm"
             title="판매하기"
    >
      <b-row class="my-1">
        <b-col md="3">
          <label for="strategyName" class="text-nowrap">이름:</label>
        </b-col>
        <b-col md="9">
          {{selectedStrategy.name}}
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col md="3">
          <label for="strategyName" class="text-nowrap">버전:</label>
        </b-col>
        <b-col md="9">
          <model-select :options="strategyVersionList"
                        v-model="sellStrategy.version"
                        placeholder="버전을 선택하세요.">
          </model-select>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col md="3">
          <label for="baseCurrency" class="text-nowrap">소개:</label>
        </b-col>
        <b-col md="9">
          <b-form-textarea size="md"
                           class="descbox"
                           v-model="sellStrategy.description"
          />
        </b-col>
      </b-row>


      <div slot="modal-footer">
        <button class="btn btn-secondary"
                @click="() => {this.$root.$emit('bv::hide::modal', 'uploadMarketForm')}"
        >취소</button>
        <button class="btn btn-primary"
                @click="registerSellStrategy"
        >판매</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'RecuitModal',
  extends: '',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
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
