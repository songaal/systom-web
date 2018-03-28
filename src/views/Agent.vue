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
        <b-col lg="12">
          <HistoryTable />
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
      chartData: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          },
          {
            label: 'Data Tow',
            backgroundColor: '#f87979',
            data: [11, 12, 13, 14, 15, 16, 17, 18, 19, 110]
          }
        ]
      }
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
