<template>
  <div id="investment">
    <div class="animated fadeIn wrapper">

        <b-row>
          <b-col col cols="12" xs="12" sm="12" md="4" lg="4">
            <b-card>
              <b-row>
                <b-col class="text-left text-nowrap main-text" style="width:100px;">수익률</b-col>
                <b-col class="text-right text-primary text-nowrap main-text" style="width:100px;">3.0 %</b-col>
              </b-row>
              <hr/>
              <b-row>
                <b-col class="text-left text-nowrap sub-text">이동평균전략</b-col>
                <b-col class="text-right text-nowrap sub-text">1.0 %</b-col>
              </b-row>
              <b-row>
                <b-col class="text-left text-nowrap sub-text">복합기술분석잔략</b-col>
                <b-col class="text-right text-nowrap sub-text">1.0 %</b-col>
              </b-row>
              <b-row>
                <b-col class="text-left text-nowrap sub-text">테스트전략</b-col>
                <b-col class="text-right text-nowrap sub-text">1.0 %</b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col col cols="12" xs="12" sm="12" md="4" lg="4">
            <b-card>
              <b-row>
                <b-col class="text-left text-nowrap main-text" style="width:100px;">총 자산</b-col>
                <b-col class="text-right text-primary text-nowrap main-text" style="width:100px;">1K USDT</b-col>
              </b-row>
              <hr/>
              <b-row>
                <b-col class="text-left text-nowrap sub-text">BTC</b-col>
                <b-col class="text-right text-nowrap sub-text">1.00030001</b-col>
              </b-row>
              <b-row>
                <b-col class="text-left text-nowrap sub-text">ETH</b-col>
                <b-col class="text-right text-nowrap sub-text">23.0</b-col>
              </b-row>
              <b-row>
                <b-col class="text-left text-nowrap sub-text">XRP</b-col>
                <b-col class="text-right text-nowrap sub-text">5.00500321</b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col col cols="12" xs="12" sm="12" md="4" lg="4">
            <b-card>
              <b-row>
                <b-col class="text-left text-nowrap main-text" style="width:100px;">출금 가능</b-col>
                <b-col class="text-right text-primary text-nowrap main-text" style="width:100px;">500 USDT</b-col>
              </b-row>
              <hr/>
              <b-row>
                <b-col class="text-left text-nowrap sub-text">BTC</b-col>
                <b-col class="text-right text-nowrap sub-text">0.00000001</b-col>
              </b-row>
              <b-row>
                <b-col class="text-left text-nowrap sub-text">ETH</b-col>
                <b-col class="text-right text-nowrap sub-text">1.00000000</b-col>
              </b-row>
              <b-row>
                <b-col class="text-left text-nowrap sub-text">XRP</b-col>
                <b-col class="text-right text-nowrap sub-text">0.50000000</b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>

        <b-card>
          <b-row>
            <b-col class="text-left text-nowrap main-text mb-3" style="width:100px;">나의 투자 상품</b-col>
          </b-row>

          <b-row>
            <b-col>
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
                      <th>이동평균전략</th>
                      <td>2018-05-01 23:11</td>
                      <td class="text-success">매도</td>
                      <td>BTC/USDT</td>
                      <td>8340.0</td>
                      <td>1</td>
                      <td>8340.0</td>
                      <td>골드 크로스</td>
                    </tr>
                    <tr>
                      <th>복합기술분석전략</th>
                      <td>2018-05-01 23:11</td>
                      <td class="text-danger">매수</td>
                      <td>BTC/USDT</td>
                      <td>8340.0</td>
                      <td>1</td>
                      <td>8340.0</td>
                      <td>가중치 5 > 3</td>
                    </tr>
                    <tr>
                      <th>테스트전략</th>
                      <td>2018-05-01 23:11</td>
                      <td class="text-success">매도</td>
                      <td>BTC/USDT</td>
                      <td>8340.0</td>
                      <td>1</td>
                      <td>8340.0</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-col>
          </b-row>
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
