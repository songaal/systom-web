<template>
  <div id="market" class="wrapper">
    <b-row>
      <b-col>
        <b-card header="최고수익 전략">
          <b-row>
            <b-col md="6" lg="4">
              <strategyCard></strategyCard>
            </b-col>
            <b-col md="6" lg="4">
              <strategyCard></strategyCard>
            </b-col>
            <b-col md="6" lg="4">
              <strategyCard></strategyCard>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card header="판매중인 전략">
          <b-row>
            <b-col md="6" lg="4">
              <strategyCard></strategyCard>
            </b-col>
            <b-col md="6" lg="4">
              <strategyCard></strategyCard>
            </b-col>
            <b-col md="6" lg="4">
              <strategyCard></strategyCard>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import strategyCard from '../components/cards/StrategyCard'

export default {
  name: 'MarketPlace',
  extends: '',
  components: {
    strategyCard
  },
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
.wrapper {
  margin-top: 20px;
}
</style>
