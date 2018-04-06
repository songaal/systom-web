<template lang="html">
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col lg="6">
          <pythonEditor @saveStrategy="saveStrategy"/>
        </b-col>

        <b-col lg="6">
          <BackTestForm :coinData="coinData"
                        :strategysId="strategysId"
          />
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="6">
          <HistoryTable :items="lastTopHistory"
                        fieldType="lastTopHistoryFields"
                        title="테스트 이력"
          />
        </b-col>
        <b-col lg="6">
          <HistoryTable :items="backtestHistory"
                        fieldType="backtestHistoryFields"
                        title="거래 이력"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import BackTestForm from '../components/BackTest/BackTestForm'
import pythonEditor from '../components/Editor/PythonEditor'
import HistoryTable from '../components/SimulationHistory/HistoryTable'

export default {
  name: 'Strategys',
  data () {
    return {
      strategyId: '',
      lastTopHistory: [
        // {version: '1.5.1', exchange: 'poloniex', symbol: 'ETH_BTC', revenue: '+12%', startTime: '2018/03/01', endTime: '2018/03/30'}
      ],
      backtestHistory: [
        // {action: '매도', orderTime: '2018/01/01 03:25:00', orderType: 'Market', price: '0.05905971', revenue: '-5%', symbol: 'ETH_BTC', description: 'corss MA5 MA50'}
      ],
      coinData: {
        labels: [],
        datasets: [
          {
            label: 'price',
            borderColor: '#115533',
            backgroundColor: '#115533',
            fill: false,
            data: []
          }
        ]
      },
      tmpSeq: 1
    }
  },
  components: {
    BackTestForm,
    pythonEditor,
    HistoryTable
  },
  methods: {
    saveStrategy (strategyId) {
      this.strategyId = strategyId
      console.log('save', this.strategyId)
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  created () {
    this.strategysId = this.$route.params.strategysId
    // setInterval(() => {
    //   this.tmpSeq += 1
    //   let a = '2018/09/0'.concat(this.tmpSeq)
    //   this.coinData.labels.push(a)
    //   this.coinData.datasets[0].data.push(this.getRandomInt())
    // }, 5000)
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
</style>
