<template>
  <div>
    <b-dropdown text="동작" variant="outline-primary" right style="width: 62px; float:right;">
      <b-dropdown-item @click="closeInvest">투자종료하기</b-dropdown-item>
    </b-dropdown>

    <b-modal id="closeInvestGoods" no-fade>
      <template slot="modal-header">
        <h5>투자종료하기</h5>
        <button type="button" class="close"
                data-dismiss="modal" aria-label="Close"
                @click="(e) => {this.$root.$emit('bv::hide::modal', 'closeInvestGoods')}">
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
        <div>
          <b-row>
            <b-col col="2" class="text-center">
              <div class="text-success mt-5">
                <h1>+120%</h1>
              </div>
              <div>
                <h3>수익률</h3>
              </div>
            </b-col>
            <b-col col="10">
              <b-row class="mb-2">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  투자일자:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  <span>2018.06.01</span>
                   ~
                  <span>2018.09.31</span>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  투가기간:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  120일
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  초기가치:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  5,000 USDT
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  현재가치:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  15,000 USDT
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  수익금액:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  10,000 USDT
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  수수료:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  <strong>4,000 USDT</strong>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  최종수익:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  <strong class="text-success">6,000 USDT</strong>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>

        <hr class="bg-info"/>

        <div style="font-size: 1.1em">
          <b-row class="mb-2">
            <b-col cols="2" xs="2" sm="2" md="2" lg="2" class="text-nowrap">
              입금주소:
            </b-col>
            <b-col cols="10" xs="10" sm="10" md="10" lg="10" class="pr-1">
              <span style="line-hight:25px">
                <strong>14Hrh22WTjyjM8ao8x9s86rn3jCwRkAEXc</strong> <br />
              </span>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="2" xs="2" sm="2" md="2" lg="2" class="text-nowrap">
              수수료:
            </b-col>
            <b-col cols="10" xs="10" sm="10" md="10" lg="10" class="pr-1">
              <span style="line-hight:25px">
                <strong>4,000 USDT</strong>
              </span>
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="2" xs="2" sm="2" md="2" lg="2" class="text-nowrap">
              입금기한:
            </b-col>
            <b-col cols="10" xs="10" sm="10" md="10" lg="10" class="pr-1">
              <span style="line-hight:25px">
                투자종료후 24시간 이내 <br />
              </span>
            </b-col>
          </b-row>
        </div>
        <div>
          <b-row>
            <b-col class="text-center mb-0">
              <input type="checkbox" id="checkbox1"/>
              <label for="checkbox1">위 사항에 모두 동의합니다.</label>
            </b-col>
          </b-row>
        </div>
      <template slot="modal-footer">
        <b-button block variant="primary">위 사항을 확인하였으며 실전투자를 종료합니다.</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'InvestControlButton',
  extends: '',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    closeInvest () {
      this.$root.$emit('bv::show::modal', 'closeInvestGoods')
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>

<style scoped>
.div-center {
  text-align: center;
  display: inline-block;
}
</style>
