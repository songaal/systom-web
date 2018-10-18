<template>
  <div>
    <b-dropdown text="동작"
                variant="outline-primary"
                right
                style="width: 62px; float:right;"
                :disabled="isDisable">
      <b-dropdown-item @click="showCloseInvestModal">투자종료하기</b-dropdown-item>
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
            <b-col cols="4" class="text-center">
              <div class="text-success mt-5">
                <h1>{{commission.returnPct}}%</h1>
              </div>
              <div>
                <h3>수익률</h3>
              </div>
            </b-col>
            <b-col cols="8">
              <b-row class="mb-2">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  투자일자:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  <span>{{commission.startTime}}</span>
                   ~
                  <span>{{commission.endTime}}</span>
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  투가기간:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  {{commission.investDay}}일
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  초기가치:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  {{commission.initCash}} {{commission.cashUnit}}
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  현재가치:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  {{commission.entity}} {{commission.cashUnit}}
                </b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  수익금액:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  {{commission.returns}} {{commission.cashUnit}}
                </b-col>
              </b-row>
              <b-row class="mb-2" v-if="commission.paper === false">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  수수료:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  <strong>{{commission.commission}} {{commission.commUnit}}</strong>
                </b-col>
              </b-row>
              <b-row class="mb-2" v-if="commission.paper === false">
                <b-col cols="4" xs="3" sm="3" md="3" lg="3" class="text-nowrap">
                  최종수익:
                </b-col>
                <b-col cols="8" xs="9" sm="9" md="9" lg="9" class="pr-1">
                  <strong class="text-success">{{commission.totalReturns}} {{commission.cashUnit}}</strong>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>

        <hr class="bg-info"/>

        <div v-if="commission.paper === false">
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
                  <strong>{{commission.commission}} {{commission.commUnit}}</strong>
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
                <input type="checkbox" id="isOk" v-model="isOk"/>
                <label for="isOk">위 사항에 모두 동의합니다.</label>
              </b-col>
            </b-row>
          </div>
        </div>
        <div v-if="commission.paper === true">
          <div style="font-size: 1.1em">
            <b-row class="mb-2">
              <b-col cols="2" xs="2" sm="2" md="2" lg="2" class="text-nowrap">
                수수료:
              </b-col>
              <b-col cols="10" xs="10" sm="10" md="10" lg="10" class="pr-1">
                <span style="line-hight:25px">
                  모의투자는 수수료가 없습니다.
                </span>
              </b-col>
            </b-row>
          </div>
        </div>

      <template slot="modal-footer">
        <b-button :disabled="!isOk"
                  @click="CloseInvest"
                  block
                  variant="primary"
                  v-if="commission.paper === false">
          위 사항을 확인하였으며 실전투자를 종료합니다.
        </b-button>
        <b-button @click="CloseInvest"
                  block
                  variant="primary"
                  v-if="commission.paper === true">
          모의투자를 종료합니다.
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'InvestControlButton',
  extends: '',
  components: {},
  props: ['isDisable'],
  data () {
    return {
      isOk: false,
      investId: null,
      commission: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    showCloseInvestModal () {
      let url = `${config.serverHost}/${config.serverVer}/investGoods/${this.investId}/actions?action=CLOSE_CALCULATION`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        this.commission = response.data
        this.commission.startTime = this.humanReadDate(this.commission.createTime)
        this.commission.endTime = this.humanReadDate(this.commission.endTime)
        this.commission.investDay = utils.obtainingDateDays(this.commission.startTime.replace(/./g, ''), this.commission.endTime.replace(/./g, ''))
        this.commission.initCash = utils.comma(this.commission.initCash)
        this.commission.entity = utils.comma(this.commission.entity)
        this.$root.$emit('bv::show::modal', 'closeInvestGoods')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    CloseInvest () {
      if (!this.isOk && this.commission.paper === false) {
        return false
      }
      let url = `${config.serverHost}/${config.serverVer}/investGoods/${this.investId}/actions?action=CLOSE_INVEST`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        this.$root.$emit('bv::hide::modal', 'closeInvestGoods')
        this.$vueOnToast.pop('success', '성공', '투자를 종료하였습니다.')
        this.$emit('refreshInvestGoods', this.investId)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    humanReadDate (date) {
      date = new Date(date)
      return this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
    },
    formatDate (y, m, d) {
      return y + '.' + (m < 10 ? '0' + m : m) + '.' + (d < 10 ? '0' + d : d)
    }
  },
  beforeCreate () {},
  created () {
    this.investId = this.$route.params.investId
  },
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
