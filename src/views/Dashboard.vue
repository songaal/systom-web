<template>
  <div class="animated fadeIn wrapper">
    <b-row>
      <b-col sm="6" lg="3">
        <SummaryRevenueCard
          variant="bg-primary"
          revenue="50"
          :options="revenueConfig"
          :datasets="revenueDatasets_1"
        />
      </b-col>

      <b-col sm="6" lg="3">
        <SummaryRevenueCard
          variant="bg-info"
          revenue="-20"
          :options="revenueConfig"
          :datasets="revenueDatasets_2"
        />
      </b-col>

      <b-col sm="6" lg="3">
        <SummaryRevenueCard
          variant="bg-warning"
          revenue="-5"
          :options="revenueConfig"
          :datasets="revenueDatasets_3"
        />
      </b-col>

      <b-col sm="6" lg="3">
        <SummaryRevenueCard
          variant="bg-danger"
          revenue="40"
          :options="revenueConfig"
          :datasets="revenueDatasets_4"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <h5 slot="header">성과지표</h5>
          <PerformanceIndex></PerformanceIndex>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <h5 slot="header">상태</h5>
          <b-row>

            <b-col>
              <div class="callout callout-success">
                <small class="text-muted">실행</small>
                <br>
                <strong class="h4">12</strong>
              </div>
            </b-col>

            <b-col>
              <div class="callout callout-danger">
                <small class="text-muted">에러</small>
                <br>
                <strong class="h4">12</strong>
              </div>
            </b-col>

            <b-col>
              <div class="callout callout-primary">
                <small class="text-muted">전략</small>
                <br>
                <strong class="h4">12</strong>
              </div>
            </b-col>

            <b-col>
              <div class="callout callout-primary">
                <small class="text-muted">에이전트</small>
                <br>
                <strong class="h4">12</strong>
              </div>
            </b-col>

          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card>
          <h5 slot="header">거래이력</h5>
          <HistoryTable></HistoryTable>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import SummaryRevenueCard from '../components/cards/SummaryRevenueCard'
import PerformanceIndex from '../components/Performance/index'
import HistoryTable from '../components/SimulationHistory/HistoryTable'

export default {
  name: 'dashboard',
  components: {
    SummaryRevenueCard,
    PerformanceIndex,
    HistoryTable
  },
  data () {
    return {
      revenueConfig: {
        height: '70',
        labels: ['2018-01-01', '2018-01-02', '2018-01-03', '2018-01-04', '2018-01-05', '2018-01-06', '2018-01-07', '2018-01-08']
      },
      revenueDatasets_1: [{
        label: '테스트 에이전트',
        backgroundColor: '#20a8d8',
        fill: false,
        borderColor: 'rgba(255,255,255,.55)',
        data: [65, 59, 84, 84, 51, 55, 40, 100]
      }],
      revenueDatasets_2: [{
        label: '이동편균 에이전트',
        backgroundColor: '#63c2de',
        fill: false,
        borderColor: 'rgba(255,255,255,.55)',
        data: [65, 59, 84, 84, 51, 55, 40, 20]
      }],
      revenueDatasets_3: [{
        label: '에이전트',
        backgroundColor: 'rgba(255,255,255,.2)',
        fill: false,
        borderColor: 'rgba(255,255,255,.55)',
        data: [65, 59, 84, 84, 51, 55, 40, 50]
      }],
      revenueDatasets_4: [{
        label: '테스트5 에이전트',
        backgroundColor: 'rgba(255,255,255,.1)',
        fill: false,
        borderColor: 'rgba(255,255,255,.55)',
        data: [65, 59, 84, 84, 51, 55, 40, 80]
      }]
    }
  }
}
</script>

<style>
.wrapper{margin-top:20px;}
</style>
