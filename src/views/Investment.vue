<template>
  <div class="animated fadeIn wrapper">
    <b-row>
      <b-col col cols="12" xs="12" sm="12" md="4" lg="4">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text font-weight-bold">김준우</b-col>
            <b-col class="text-right text-nowrap sub-text">
              <b-link to="/account">정보수정</b-link>
            </b-col>
          </b-row>
          <b-row class="mt-1 mb-1">
            <b-col class="text-left text-nowrap sub-text">jwkim@gncloud.kr</b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="4" lg="4">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text wp-136">이번달 수익률</b-col>
            <b-col class="text-right text-success text-nowrap main-text">3.0 %</b-col>
          </b-row>
          <hr/>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">지난달 수익률</b-col>
            <b-col class="text-right text-nowrap sub-text">23.5 %</b-col>
          </b-row>
        </b-card>
      </b-col>

      <b-col col cols="12" xs="12" sm="12" md="4" lg="4">
        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text wp-136">투자금액</b-col>
            <b-col class="text-right text-success text-nowrap main-text">10.8K</b-col>
          </b-row>
          <hr/>
          <b-row>
            <b-col class="text-left text-nowrap sub-text">누적 투자금액</b-col>
            <b-col class="text-right text-nowrap sub-text">105.5K</b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col col xs="12" sm="12" md="6" lg="6" cols="12">
        <BarChart wideType="half" name="monthRevenue" title="월별 수익률" type="pct" :dataProvider="monthRevenue"></BarChart>
      </b-col>
      <b-col col xs="12" sm="12" md="6" lg="6" cols="12">
        <BarChart wideType="half" name="monthInvest" title="월별 투자금액" type="price" :dataProvider="monthInvest"></BarChart>
      </b-col>
    </b-row>

    <b-card>
      <b-row>
        <b-col class="text-left text-nowrap main-text mb-3" >나의 투자 상품</b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-tabs>
            <b-tab title="진행">
              <div class="table-responsive">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">전략명</th>
                      <th>수익률</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th><b-link to="/investDetail">복합기술분석전략</b-link></th>
                      <td>11.5%</td>
                      <td class="text-info">진행</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab><!-- 진행 탭 끝-->
            <b-tab title="대기">
              <div class="table-responsive">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">전략명</th>
                      <th>수익률</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th><b-link to="#">이동평균전략</b-link></th>
                      <td>0%</td>
                      <td>
                        <span class="text-warning">대기</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab><!-- 대기 탭 끝-->

            <b-tab title="종료">
              <div class="table-responsive">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">전략명</th>
                      <th>수익률</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th><b-link to="#">테스트전략</b-link></th>
                      <td>3%</td>
                      <td class="text-success">완료</td>
                    </tr>
                    <tr>
                      <th><b-link to="#">에러난전략</b-link></th>
                      <td>5%</td>
                      <td class="text-danger">실패</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab> <!-- 종료 탭 끝 -->
            <b-tab title="전체">
              <div class="table-responsive">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">전략명</th>
                      <th>수익</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th><b-link to="/investDetail">복합기술분석전략</b-link></th>
                      <td>11.5%</td>
                      <td class="text-info">진행</td>
                    </tr>
                    <tr>
                      <th><b-link to="#">이동평균전략</b-link></th>
                      <td>0%</td>
                      <td>
                        <span class="text-warning">대기</span>
                      </td>
                    </tr>
                    <tr>
                      <th><b-link to="#">테스트전략</b-link></th>
                      <td>60 / 60</td>
                      <td class="text-success">종료</td>
                    </tr>
                    <tr>
                      <th><b-link to="#">에러난전략</b-link></th>
                      <td>30 / 60</td>
                      <td class="text-danger">종료</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab><!-- 종료 -->
          </b-tabs>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import BarChart from '../components/Charts/BarChart'

export default {
  name: 'investment',
  extends: '',
  components: {
    BarChart
  },
  props: [],
  data () {
    return {
      monthInvest: [{
        date: '01',
        price: '0'
      }, {
        date: '02',
        price: '200'
      }, {
        date: '03',
        price: '0'
      }, {
        date: '04',
        price: '1000'
      }, {
        date: '05',
        price: '500'
      }, {
        date: '06',
        price: '700'
      }, {
        date: '07',
        price: 0
      }, {
        date: '08',
        price: 0
      }, {
        date: '09',
        price: 0
      }, {
        date: '10',
        price: 0
      }, {
        date: '11',
        price: 0
      }, {
        date: '12',
        price: 0
      }],
      monthRevenue: [{
        date: '01',
        pct: 0
      }, {
        date: '02',
        pct: 10
      }, {
        date: '03',
        pct: 0
      }, {
        date: '04',
        pct: 30
      }, {
        date: '05',
        pct: 24
      }, {
        date: '06',
        pct: 3
      }, {
        date: '07',
        pct: 0
      }, {
        date: '08',
        pct: 0
      }, {
        date: '09',
        pct: 0
      }, {
        date: '10',
        pct: 0
      }, {
        date: '11',
        pct: 0
      }, {
        date: '12',
        pct: 0
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
.wp-136 {
  min-width: 136px;
}
</style>
