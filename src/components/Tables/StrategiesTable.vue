<template>
  <div class="table-responsive">
    <b-table :fields="strategyFields"
             :items="strategies"
             cols="12"
             :showEmpty="true"
             emptyText="전략이 없습니다."
             class="text-nowrap"
    >
      <template slot="name" slot-scope="data">
        <b-link :to="`/strategies/${data.item.id}`"
                class="text-nowrap"
        >{{data.value}}</b-link>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'StrategiesTable',
  extends: '',
  components: {},
  props: ['strategies'],
  data () {
    return {
      strategyFields: {
        name: {label: '이름', sortable: true, class: 'text-center'},
        lastDeployVersion: {label: '최신버전', sortable: true, class: 'text-center'},
        updateTime: {label: '수정시간', sortable: true, class: 'text-center'},
        createTime: {label: '생성시간', sortable: true, class: 'text-center'}
      }
    }
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
table th,
table td {
  white-space: nowrap;
}
</style>
