<template>
  <div id="market" class="wrapper">
    <b-row>
      <b-col>
        <h2>투자상품</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="8">
        모집마감일 다음날 오후 12시에 투자가 시작됩니다.
      </b-col>

      <!-- 관리자메뉴 -->
      <b-col cols="4" class="text-right">
        <button class="btn btn-primary" @click="() => {this.$root.$emit('bv::show::modal', 'newGoodsForm')}">상품등록</button>
        <b-modal id="newGoodsForm"
                 title="상품 등록하기"
                 size="lg"
                 class="text-left">
          <b-row class="mb-2">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsByStrategy">전략</label>
            </b-col>
            <b-col sm="9">
              <select id="newGoodsByStrategy" class="form-control">
                <option selected="selected">이동평균전략</option>
                <option>변동성돌파전략</option>
                <option>무료전략</option>
              </select>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsByVersion">버전</label>
            </b-col>
            <b-col sm="9">
              <select id="newGoodsByVersion" class="form-control">
                <option selected="selected">3:BTC전용</option>
                <option>2:버그수정버전</option>
                <option>1:신규배포</option>
              </select>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsByExchange">거래소</label>
            </b-col>
            <b-col sm="9">
              <select id="newGoodsByExchange" class="form-control">
                <option selected="selected">Binance</option>
                <option>Bithumb</option>
                <option>Bitfinex</option>
              </select>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsBySymbol">심볼</label>
            </b-col>
            <b-col sm="9">
              <select id="newGoodsBySymbol" class="form-control">
                <option selected="selected">ETH/BTC</option>
                <option>XRP/BTC</option>
                <option>ADA/BTC</option>
              </select>
            </b-col>
          </b-row>
          <hr />
          <b-row class="mb-3">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsBySymbol">모집금액</label>
            </b-col>
            <b-col sm="9">
              <div class="input-group">
                <input type="text" class="form-control">
                <div class="input-group-append">
                  <button class="btn btn-outline-primary dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false">USDT</button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">BTC</a>
                    <a class="dropdown-item" href="#">KRW</a>
                  </div>
                </div>
              </div>
              <!-- <b-input-group prepend="Username">
                <b-form-input></b-form-input>
                <b-dropdown text="USDT" variant="success" slot="append">
                  <b-dropdown-item>BTC</b-dropdown-item>
                  <b-dropdown-item>KRW</b-dropdown-item>
                </b-dropdown>
              </b-input-group> -->
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsBySymbol">모집시작일</label>
            </b-col>
            <b-col sm="9">
              <date-picker format="yyyy-MM-dd"
                           language="ko"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsBySymbol">모집종료일</label>
            </b-col>
            <b-col sm="9">
              <date-picker format="yyyy-MM-dd"
                           language="ko"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsBySymbol">투자시작일</label>
            </b-col>
            <b-col sm="9">
              <date-picker format="yyyy-MM-dd"
                           language="ko"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsBySymbol">투자종료일</label>
            </b-col>
            <b-col sm="9">
              <date-picker format="yyyy-MM-dd"
                           language="ko"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsBySymbol">백테스트 시작일</label>
            </b-col>
            <b-col sm="9">
              <date-picker format="yyyy-MM-dd"
                           language="ko"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsBySymbol">백테스트 종료일</label>
            </b-col>
            <b-col sm="9">
              <date-picker format="yyyy-MM-dd"
                           language="ko"
              />
            </b-col>
          </b-row>
          <hr />
          <b-row class="mb-3">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsBySymbol">제목</label>
            </b-col>
            <b-col sm="9">
              <input class="form-control"/>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="3" class="pt-2">
              <label for="newGoodsBySymbol">설명</label>
            </b-col>
            <b-col sm="9">
              <textarea class="form-control" rows="10"></textarea>
            </b-col>
          </b-row>

          <template slot="modal-footer">
            <b-button @click="(e) => {this.$root.$emit('bv::hide::modal', 'newGoodsForm')}">취소</b-button>
            <b-button variant="primary">확인</b-button>
          </template>
        </b-modal>


      </b-col>
      <!-- 관리자메뉴 끝 -->

    </b-row>

    <b-tabs slot="tabs" class="mt-4" nav-class="mb-2" content-class="d-none">
      <template slot="tabs">
        <b-nav-item href="#" active @click="()=>{}">바이낸스</b-nav-item>
        <b-nav-item href="#" disabled @click="()=>{}">후오비</b-nav-item>
        <b-nav-item href="#" disabled @click="()=>{}">빗썸</b-nav-item>
      </template>
    </b-tabs>

    <b-row>
      <b-col>
        <InvestGoodsList :strategies="registerStrategies"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TopInvestGoodsList from '../components/cards/TopInvestGoodsList'
import InvestGoodsList from '../components/cards/InvestGoodsList'
import datePicker from 'vuejs-datepicker'
import config from '../Config'
import utils from '../Utils'

export default {
  name: 'investGoods',
  extends: '',
  components: {
    TopInvestGoodsList,
    InvestGoodsList,
    datePicker
  },
  props: [],
  data () {
    return {
      registerStrategies: [],
      pageSize: 15
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

<style>
.wrapper {
  margin-top: 20px;
}
.market-text {
  font-size: 11pt;
  align: center;
  text-align: center;
}
.align-items-end {
  text-align: end;
}
.text-ellipsis {
  text-overflow: ellipsis;
  overflow-y: hidden;
  width: 100%;
  white-space: nowrap;
  padding: 0px;
}
.vdp-datepicker input {
  /* datepicker */
  padding: 5px;
  font-size: 100%;
  border: 1px solid #ccc;
  width: 100%
}
@media only screen and (max-width: 959px) {
  .hidden-sm-and-down {
      display: none!important;
  }
}

</style>
