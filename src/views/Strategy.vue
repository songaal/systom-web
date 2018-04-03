<template lang="html">
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col lg="6">
          <pythonEditor :code="code"
                        :requiredFields="requiredFields"
          />
        </b-col>

        <b-col lg="6">
          <BackTestForm :chartData="chartData"
                        :chartOption="chartOption"
                        :exchangeOptions="exchangeOptions"
                        :startMoney="startMoney"
                        :currency="currency"
                        :start="start"
                        :end="end"
          />
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
      chartOption: 'poloniex',
      exchangeOptions: ['poloniex', 'bittrex', 'bitfinex'],
      startMoney: '',
      currency: 'currency',
      start: 'start',
      end: 'end',
      lastTopHistory: [
        {'버전': '1.5.1', '거래소': 'poloniex', '심볼': 'ETH/BTC', '수익': '+12%', '시작': '2018/03/01', '종료': '2018/03/30'},
        {'버전': '0.1.1', '거래소': 'poloniex', '심볼': 'ETH/USDT', '수익': '-12%', '시작': '2018/02/01', '종료': '2018/02/30'},
        {'버전': '0.0.1', '거래소': 'poloniex', '심볼': 'ETH/USDT', '수익': '-12%', '시작': '2018/01/01', '종료': '2018/01/30'}
      ],
      history: [
        { '주문': '매도', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': '0.05905971', '수익': '-5%', '심볼': 'ETH/BTC' },
        { '주문': '매수', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': '0.05905971', '수익': '-', '심볼': 'ETH/BTC' },
        { '주문': '매도', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': '0.05905971', '수익': '+1%', '심볼': 'ETH/BTC' },
        { '주문': '매수', '시간': '2018/01/01 03:25:00', '주문타입': 'Market', '거래 가격': '0.05905971', '수익': '-', '심볼': 'ETH/BTC' }
      ],
      chartData: {
        labels: ['2018/09/01 11:01', '2018/09/01 11:02', '2018/09/01 11:03', '2018/09/01 11:03', '2018/09/01 11:04', '2018/09/01 11:05', '2018/09/01 11:05'],
        datasets: [
          {
            label: 'price',
            borderColor: '#115533',
            fill: false,
            data: [55, 56, 45, 77, 33, 22, 400]
          },
          {
            label: 'sma',
            borderColor: '#111111',
            fill: false,
            data: [10, 29, 30, 50, 59, 81, 40]
          },
          {
            label: 'lma',
            borderColor: '#eeaabb',
            fill: false,
            data: [140, 239, 310, 440, 39, 80, 40]
          },
          {
            label: 'sell',
            backgroundColor: '#f44242',
            type: 'bubble',
            data: [
              {x: '2018/09/01 11:01', y: 55, r: 10},
              {x: '2018/09/01 11:03', y: 45, r: 10},
              {x: '2018/09/01 11:05', y: 77, r: 10}
            ]
          }
        ]
      },
      requiredFields: [
        {label: '시간 지연', desc: '* 필수항목 (전략 호출 지연 시간)', value: ['1m', '5m', '15m', '1h', '1h', '4h', '1d']}
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
