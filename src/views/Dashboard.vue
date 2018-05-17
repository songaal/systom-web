<template>
  <div class="animated fadeIn wrapper">

    <div class="row">
      <div class="col-sm-6 col-lg-2">
        <div class="card">
          <div class="card-body p-3 d-flex align-items-center">
            <div class="bg-dark p-3 font-xl mr-3 text-white">BTC</div>
            <div>
            <div class="text-value-sm text-success">$8995.45 <i class="fa fa-arrow-up text-success"></i></div>
              <div class="text-primary font-weight-bold ">1.35 btc</div>
                <div class="text-muted small font-weight-bold ">USDT / Binance</div>
              </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-2">
        <div class="card">
          <div class="card-body p-3 d-flex align-items-center">
            <div class="bg-dark p-3 font-xl mr-3 text-white">ETH</div>
            <div>
            <div class="text-value-sm text-success">$0.002 <i class="fa fa-arrow-up text-success"></i></div>
              <div class="text-primary font-weight-bold ">1.35 eth</div>
                <div class="text-muted small font-weight-bold ">BTC / Binance</div>
              </div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-lg-2">
        <div class="card">
          <div class="card-body p-3 d-flex align-items-center">
            <div class="bg-dark p-3 font-xl mr-3 text-white">XRP</div>
            <div>
            <div class="text-value-sm text-success">$0.0000074 <i class="fa fa-arrow-up text-success"></i></div>
              <div class="text-primary font-weight-bold ">0.00004 xrp</div>
                <div class="text-muted small font-weight-bold ">BTC / Binance</div>
              </div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-lg-2">
        <div class="card">
          <div class="card-body p-3 d-flex align-items-center">
            <div class="bg-dark p-3 font-xl mr-3 text-white">BNB</div>
            <div>
            <div class="text-value-sm text-success">$0.55 <i class="fa fa-arrow-up text-success"></i></div>
              <div class="text-primary font-weight-bold ">20.0 bnb</div>
                <div class="text-muted small font-weight-bold ">krw / Okcoin</div>
              </div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-lg-2">
        <div class="card">
          <div class="card-body p-3 d-flex align-items-center">
            <div class="bg-dark p-3 font-xl mr-3 text-white">BNB</div>
            <div>
            <div class="text-value-sm text-success">$0.55 <i class="fa fa-arrow-up text-success"></i></div>
              <div class="text-primary font-weight-bold ">20.0 bnb</div>
                <div class="text-muted small font-weight-bold ">krw / Okcoin</div>
              </div>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-lg-2">
        <div class="card">
          <div class="card-body p-3 d-flex align-items-center">
            <div class="bg-dark p-3 font-xl mr-3 text-white">BNB</div>
            <div>
            <div class="text-value-sm text-success">$0.55 <i class="fa fa-arrow-up text-success"></i></div>
              <div class="text-primary font-weight-bold ">20.0 bnb</div>
                <div class="text-muted small font-weight-bold ">krw / Okcoin</div>
              </div>
          </div>
        </div>
      </div>


    </div>


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
          <h5 slot="header">최근 거래이력</h5>
          <!-- <HistoryTable></HistoryTable> -->
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">에이전트명</th>
                <th scope="col">시간</th>
                <th scope="col">주문</th>
                <th scope="col">심볼</th>
                <th scope="col">거래가격</th>
                <th scope="col">수량</th>
                <th scope="col">합계</th>
                <th scope="col">거래발생 이유</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">테스트 에이전트2</th>
                <td>2018-05-01 23:11</td>
                <td style="color:blue;">매도</td>
                <td>BTC/USDT</td>
                <td>8340.0</td>
                <td>1</td>
                <td>8340.0</td>
                <td>평균이동 전략</td>
              </tr>
              <tr>
                <th scope="row">테스트 에이전트3</th>
                <td>2018-05-01 23:11</td>
                <td style="color:blue;">매도</td>
                <td>BTC/USDT</td>
                <td>8340.0</td>
                <td>1</td>
                <td>8340.0</td>
                <td>평균이동 전략</td>
              </tr>
              <tr>
                <th scope="row">테스트 에이전트4</th>
                <td>2018-05-01 23:11</td>
                <td style="color:blue;">매도</td>
                <td>BTC/USDT</td>
                <td>8340.0</td>
                <td>1</td>
                <td>8340.0</td>
                <td>평균이동 전략</td>
              </tr>
              <tr>
                <th scope="row">테스트 에이전트5</th>
                <td>2018-05-01 23:11</td>
                <td style="color:blue;">매도</td>
                <td>BTC/USDT</td>
                <td>8340.0</td>
                <td>1</td>
                <td>8340.0</td>
                <td>평균이동 전략</td>
              </tr>
            </tbody>
          </table>
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
      slide: 0,
      sliding: null,
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
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

<style>
.wrapper{margin-top:20px;}
</style>
