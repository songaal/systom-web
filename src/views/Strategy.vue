<template lang="html">
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col lg="6">
          <pythonEditor :code="code"/>
        </b-col>

        <b-col lg="6">
          <BackTestForm :chartData="chartData" />
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="6">
          <HistoryTable :items="lastTopHistory"
                        title="테스트 이력"
          />
        </b-col>
        <b-col lg="6">
          <HistoryTable :items="history"
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
  name: 'Agent',
  data () {
    return {
      code: '',
      chartData: [
        {
          label: 'Data One',
          data: [1, 2]
        }
      ],
      lastTopHistory: [
        {'버전': '1.5.1', '거래소': 'poloniex', '심볼': 'ETH/BTC', '수익': '+12%', '시작': '2018/03/01 03:25', '종료': '2018/03/30 03:25:00'},
        {'버전': '0.1.1', '거래소': 'poloniex', '심볼': 'ETH/USDT', '수익': '-12%', '시작': '2018/02/01 03:25', '종료': '2018/02/30 03:25:00'},
        {'버전': '0.0.1', '거래소': 'poloniex', '심볼': 'ETH/USDT', '수익': '-12%', '시작': '2018/01/01 03:25', '종료': '2018/01/30 03:25:00'}
      ],
      history: [
        { '주문': '매도', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': '0.05905971', '수익': '-5%', '심볼': 'ETH/BTC' },
        { '주문': '매수', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': '0.05905971', '수익': '-', '심볼': 'ETH/BTC' },
        { '주문': '매도', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': '0.05905971', '수익': '+1%', '심볼': 'ETH/BTC' },
        { '주문': '매수', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': '0.05905971', '수익': '-', '심볼': 'ETH/BTC' }
      ]
    }
  },
  components: {
    BackTestForm,
    pythonEditor,
    HistoryTable
  }

}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
</style>
