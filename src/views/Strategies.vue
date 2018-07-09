<template lang="html">
  <div class="wrapper">
    <b-card>
      <h5 slot="header" class="mb-0">전략개발</h5>
      <CreateStrategyModalButton class="mb-3 pb-1"/>
      <StrategiesTable :strategies="strategies" />
    </b-card>
  </div>
</template>

<script>
import config from '../Config'
import utils from '../Utils'
import CreateStrategyModalButton from '../components/Buttons/CreateStrategyModalButton'
import StrategiesTable from '../components/Tables/StrategiesTable'

export default {
  data () {
    return {
      strategies: []
    }
  },
  components: {
    CreateStrategyModalButton,
    StrategiesTable
  },
  watch: {},
  methods: {},
  created () {
    let url = config.serverHost + '/' + config.serverVer + '/strategies'
    this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
      response.data.forEach(strategy => {
        let tempStrategy = strategy
        tempStrategy.createTime = utils.timestampToTime(tempStrategy.createTime)
        tempStrategy.updateTime = utils.timestampToTime(tempStrategy.updateTime) || '--'
        tempStrategy.lastDeployVersion = tempStrategy.lastDeployVersion || '작업본'
        this.strategies.push(tempStrategy)
      })
    }).catch((e) => {
      let message = {
        '400': {type: 'error', title: '실패', msg: '전략조회 요청이 잘못 되었습니다.'},
        '500': {type: 'error', title: '실패', msg: '전략 조회가 실패하였습니다.'}
      }
      utils.httpFailNotify(e, this, message)
    })
  },
  mounted () {}
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
</style>
