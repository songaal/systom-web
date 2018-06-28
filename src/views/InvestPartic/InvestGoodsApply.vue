<template>
  <div class="wrapper">
    <b-row class="mb-4">
      <b-col class="text-center">
        <h2>투자 신청하기</h2>
        <!-- <div class="text-center">
          <div class="d-inline-block bg-info" style="width: 10px; height:10px; border-radius: 90px;"></div>
          <div class="d-inline-block bg-secondary" style="width: 10px; height:10px; border-radius: 90px;"></div>
        </div> -->
      </b-col>
    </b-row>

    <b-card>
      <b-row class="mb-4">
        <b-col>
          <h4>투자상품</h4>
        </b-col>
      </b-row>
      <div class="d-sm-down-none">
        <b-row>
          <b-col>
            <div class="table-responsive">
              <table class="table text-nowrap text-center">
                <tr>
                  <th class="text-left">상품이름</th>
                  <th>코인</th>
                  <th>예상수익률</th>
                  <th>기간</th>
                  <th>투자금액</th>
                </tr>
                <tr>
                  <td class="text-left">[0001호] 변동성돌파전략</td>
                  <td>ETH</td>
                  <td>11.5%</td>
                  <td>30 일</td>
                  <td>
                    <b-form-select v-model="price"
                                   :options="pirceList"
                                   class="mb-3"
                                   :select-size="1"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </b-col>
        </b-row>
      </div>

      <div class="d-md-none">
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">상품이름</b-col>
          <b-col class="text-left">변동성돌파전략</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">코인</b-col>
          <b-col class="text-left">ETH</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">예상수익률</b-col>
          <b-col class="text-left">11.5 %</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">기간</b-col>
          <b-col class="text-left">30 일</b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left text-nowrap">투자금액</b-col>
          <b-col class="text-left">
            <b-form-select v-model="price"
                           :options="pirceList"
                           class="mb-3"
                           :select-size="1"
            />
          </b-col>
        </b-row>
      </div>

      <hr />
      <b-row>
        <b-col class="text-left text-secondary">
          <h5>총 투자금액</h5>
        </b-col>
        <b-col class="text-right text-primary">
          <h5>{{price}}</h5>
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <b-row class="mb-4">
        <b-col>
          <h4>거래소키</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col col cols="12" xs="12" sm="12" md="6" class="mb-2">
          <b-row>
            <b-col col cols="6" xs="6">
              거래소
            </b-col>
            <b-col col cols="6" xs="6">
              Binance
            </b-col>
          </b-row>
        </b-col>

        <b-col col cols="12" xs="12" sm="12" md="6" class="mb-2">
          <b-row>
            <b-col col cols="6" xs="6">
              거래소키
            </b-col>
            <b-col col cols="6" xs="6">
              <b-form-select v-model="selected"
                             :options="options"
                             class="mb-3"
                             :select-size="1"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-link class="text-secondary" to="/account">거래소 키 등록하러 가기</b-link>
        </b-col>
      </b-row>
      <hr />

      <b-row>
        <b-col class="text-left text-secondary">
          <h5>선택한 거래소키</h5>
        </b-col>
        <b-col class="text-right text-primary">
          <h5>{{ selected }}</h5>
        </b-col>
      </b-row>
    </b-card>

    <b-row class="mb-5">
      <b-col class="text-center">
        <b-link class="d-sm-down-none btn btn-lg btn-primary w-50" to="/investGoods/1/terms">다음</b-link>
        <b-link class="d-md-none btn btn-lg btn-block btn-primary" to="/investGoods/1/terms">다음</b-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'InvestGoodsTerms',
  extends: '',
  components: {},
  props: [],
  data () {
    return {
      selected: null,
      options: [
        {value: null, text: '거래소키를 선택하세요.', disabled: true},
        {value: '바이낸스 투자용 키', text: '[Binance] 바이낸스 투자용 키'},
        {value: '비피넥스 투자용 키', text: '[Bifinex] 비피넥스 투자용 키'},
        {value: '훠비 투자용 키', text: '[Huobi] 훠비 투자용 키'}
      ],
      price: null,
      pirceList: []
    }
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate () {},
  created () {
    let pirceList = []
    pirceList.push({value: null, text: '투자금액을 선택하세요.', disabled: true})
    for (let i = 10; i < 1000; i += 10) {
      pirceList.push({value: (i + ' USDT'), text: (i + ' USDT')})
    }
    for (let i = 1.0; i < 10; i += 0.1) {
      pirceList.push({value: (i.toFixed(1) + 'K USDT'), text: (i.toFixed(1) + 'K USDT')})
    }
    this.pirceList = pirceList
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>
.wrapper {margin-top: 20px;}
</style>
