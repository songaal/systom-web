<template>
  <div id="investment">
    <div class="animated fadeIn wrapper">

      <div>
        <b-card class="float-left mr-1" style="width: 33%">
          <b-row>
            <b-col class="text-left text-nowrap main-text">수익률</b-col>
            <b-col class="text-right text-primary text-nowrap main-text">50.0 %</b-col>
          </b-row>
          <hr/>
          <b-row>
            <b-col>
              <div class="float-left text-right text-nowrap sub-text">전략 1</div>
              <div class="float-right text-right text-nowrap sub-text">500,000 원</div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="float-left text-right text-nowrap sub-text">이용료</div>
              <div class="float-right text-right text-nowrap sub-text">250,000 원</div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="float-left text-right text-nowrap sub-text">거래수수료</div>
              <div class="float-right text-right text-nowrap sub-text">5,000 원</div>
            </b-col>
          </b-row>
        </b-card>

        <b-card class="float-left mr-1" style="width: 33%;">
          <b-row>
            <b-col class="text-left text-nowrap main-text">수익률</b-col>
            <b-col class="text-right text-primary text-nowrap main-text">50.0 %</b-col>
          </b-row>
          <hr/>
          <b-row>
            <b-col>
              <div class="float-left text-right text-nowrap sub-text">수익금</div>
              <div class="float-right text-right text-nowrap sub-text">500,000 원</div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="float-left text-right text-nowrap sub-text">이용료</div>
              <div class="float-right text-right text-nowrap sub-text">250,000 원</div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="float-left text-right text-nowrap sub-text">이용료</div>
              <div class="float-right text-right text-nowrap sub-text">250,000 원</div>
            </b-col>
          </b-row>
        </b-card>

        <b-card class="" style="width: 33%">
          <b-row>
            <b-col class="text-left text-nowrap main-text">수익률</b-col>
            <b-col class="text-right text-primary text-nowrap main-text">50.0 %</b-col>
          </b-row>
          <hr/>
          <b-row>
            <b-col>
              <div class="float-left text-right text-nowrap sub-text">수익금</div>
              <div class="float-right text-right text-nowrap sub-text">500,000 원</div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="float-left text-right text-nowrap sub-text">이용료</div>
              <div class="float-right text-right text-nowrap sub-text">250,000 원</div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="float-left text-right text-nowrap sub-text">이용료</div>
              <div class="float-right text-right text-nowrap sub-text">250,000 원</div>
            </b-col>
          </b-row>
        </b-card>
      </div>





      <b-card class="float-block">
        <h5 slot="header">최근 거래이력</h5>
        <div class="table-responsive">
          <table class="table table-hover text-nowrap">
            <thead>
              <tr>
                <th scope="col">전략명</th>
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
        </div>
      </b-card>
    </div>

  </div>
</template>

<script>

export default {
  name: 'investment',
  extends: '',
  components: {},
  props: [],
  data () {
    return {
      performanceData: {},
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
.main-text {
  color: #3C3C3C;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.3px;
}
.sub-text {
  color: #8A8A8A;
}
</style>
