<template lang="html">
  <div class="wrapper">
    <b-card>
      <h5 slot="header"
          class="mb-0"
      >
      전략
      </h5>
      <b-tabs>
        <b-tab title="내가 만든 전략" active>
          <div solt="header" class="mb-3">
            <button class="btn btn-primary"
                    @click="() => {this.$root.$emit('bv::show::modal', 'createStrategyForm')}"
            >새 전략 생성</button>
            <button class="ml-2 btn btn-outline-primary"
                    @click="registerMarketModal"
            >판매하기</button>
          </div>
          <div class="table-responsive">
            <b-table :fields="strategyFields"
                     :items="strategyList"
                     hover
                     col="12"
                     size="md"
            >
              <template slot="name" slot-scope="data">
                <b-link :to="`/strategies/${data.item.id}`" class="text-nowrap">{{data.value}}</b-link>
              </template>
              <template slot="action" slot-scope="data">
                <b-link variant="primary"
                        class="text-nowrap"
                        @click="showModal(data.item.id, data.item.name, data.item.version, data.item.options)"
                >에이전트 생성</b-link>
              </template>
            </b-table>
          </div>
        </b-tab>
        <b-tab title="구매한 전략">
          구매한 전략
        </b-tab>
      </b-tabs>
    </b-card>
    <div>
    <!-- Modal Component -->
    <!-- 에이전트 등록 -->
    <b-modal id="createAgentForm"
             title="새로운 에이전트"
             size="lg"
    >
      <portfolioForm :createAgentData="createAgentData"
                     :strategyId="createAgentData.strategyId"
      />
      <div slot="modal-footer">
        <button class="btn btn-secondary" @click="() => {this.$root.$emit('bv::hide::modal', 'createAgentForm')}">취소</button>
        <button class="btn btn-primary" @click="eventCreateAgent">확인</button>
      </div>
    </b-modal>


    <!-- 전략 생성 -->
    <b-modal id="createStrategyForm"
             title="새 전략 생성"
    >
      <b-form>
        <b-input id="newStrategyName" v-model="createStrategyFrame.name" placeholder="전략이름" max-length="20" min-length="5"/>
      </b-form>
      <div slot="modal-footer">
        <button class="btn btn-secondary" @click="() => {this.$root.$emit('bv::hide::modal', 'createStrategyForm')}">취소</button>
        <button class="btn btn-primary" @click="saveNewStrategyFrame">확인</button>
      </div>
    </b-modal>


    <!-- 마켓등록 -->
    <b-modal id="uploadMarketForm"
             title="판매하기"
    >
      <b-row class="my-1">
        <b-col md="3">
          <label for="strategyName" class="text-nowrap">이름:</label>
        </b-col>
        <b-col md="9">
          <model-select :options="strategyNameList"
                        v-model="sellStrategy.id"
                        @input="selectStrategyDeployVersions"
                        placeholder="전략이름을 선택하세요.">
          </model-select>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col md="3">
          <label for="strategyName" class="text-nowrap">버전:</label>
        </b-col>
        <b-col md="9">
          <model-select :options="strategyVersionList"
                        v-model="sellStrategy.version"
                        placeholder="버전을 선택하세요.">
          </model-select>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col md="3">
          <label for="baseCurrency" class="text-nowrap">가격:</label>
        </b-col>
        <b-col md="9">
          <b-form-input size="md"
                        type="number"
                        v-model="sellStrategy.price"
          />
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col md="3">
          <label for="baseCurrency" class="text-nowrap">소개:</label>
        </b-col>
        <b-col md="9">
          <b-form-textarea size="md"
                           class="descbox"
                           v-model="sellStrategy.description"
          />
        </b-col>
      </b-row>


      <div slot="modal-footer">
        <button class="btn btn-secondary" @click="() => {this.$root.$emit('bv::hide::modal', 'uploadMarketForm')}">취소</button>
        <button class="btn btn-primary" @click="sellStrategyModel">판매</button>
      </div>
    </b-modal>

  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import config from '../Config'
import utils from '../Utils'
import portfolioForm from '../components/Portfolio/form'
import { ModelSelect } from 'vue-search-select'

export default {
  data () {
    return {
      strategyFields: {
        name: {label: '이름', sortable: true, class: 'text-center'},
        createTime: {label: '생성날짜', sortable: true, class: 'text-center'},
        updateTime: {label: '수정날짜', sortable: true, class: 'text-center'},
        writer: {label: '작성자', sortable: true, class: 'text-center'},
        action: {label: '실행', sortable: false, class: 'text-center'}
      },
      strategyList: [],
      createStrategyFrame: {
        name: null
      },
      createAgentData: {
        name: '',
        exchangeKeyId: '',
        baseCurrency: '',
        capitalBase: '',
        strategyId: '',
        strategyName: '',
        strategyVersion: '',
        options: []
      },
      strategyNameList: [],
      strategyVersionList: [],
      sellStrategy: {
        id: null,
        version: null,
        price: null,
        description: null
      }
    }
  },
  components: {
    portfolioForm,
    ModelSelect
  },
  methods: {
    saveNewStrategyFrame () {
      let newStrategyName = this.createStrategyFrame.name
      // 앞뒤 공백제거 /(^\s*|\s*$)/
      if (newStrategyName === null || newStrategyName.replace(/(^\s*|\s*$)/gi, '') === '') {
        this.$vueOnToast.pop('warning', '실패', '전략 이름을 입력하세요.')
        return
      }
      let body = {
        name: this.createStrategyFrame.name,
        code: config.defaultStrategyCode,
        options: '[]'
      }
      let url = `${config.serverHost}/${config.serverVer}/strategies`
      this.axios.post(url, body, config.getAxiosPostOptions()).then((result) => {
        this.$router.replace('/strategies/' + result.data.id)
        this.$vueOnToast.pop('success', '성공', '생성 완료되었습니다.')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    selectStrategyDeployVersions (strategyId) {
      this.strategyVersionList = []
      let url = `${config.serverHost}/${config.serverVer}/strategies/${strategyId}/versions`
      this.axios.get(url, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        this.strategyVersionList = result.data.map((v, i) => {
          if (i === 0) {
            this.sellStrategy.version = v.version
          }
          return {text: v.version, value: v.version}
        })
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    registerMarketModal () {
      this.sellStrategy.id = null
      this.sellStrategy.version = null
      this.sellStrategy.price = null
      this.sellStrategy.description = null
      this.$root.$emit('bv::show::modal', 'uploadMarketForm')
    },
    sellStrategyModel () {
      if (this.sellStrategy.id === null || this.sellStrategy.id === '') {
        this.$vueOnToast.pop('warning', '실패', '전략을 선택하세요.')
        return
      }
      if (this.sellStrategy.version === null || this.sellStrategy.version === '') {
        this.$vueOnToast.pop('warning', '실패', '버전을 선택하세요.')
        return
      }
      if (this.sellStrategy.price === null || this.sellStrategy.price === '') {
        this.$vueOnToast.pop('warning', '실패', '가격을 입력하세요.')
        return
      }
      if (this.sellStrategy.description === null || this.sellStrategy.description === '') {
        this.$vueOnToast.pop('warning', '실패', '설명을 입력하세요.')
        return
      }
      if (this.sellStrategy.description.length >= 150) {
        this.$vueOnToast.pop('warning', '실패', '설명은 최대 150자까지 입력할 수 있습니다.')
        return
      }
      let url = `${config.serverHost}/${config.serverVer}/marketplace/register`
      console.log('url', url)
      this.axios.put(url, this.sellStrategy, config.getAxiosPutOptions()).then((result) => {
        this.$root.$emit('bv::hide::modal', 'uploadMarketForm')
        this.$vueOnToast.pop('success', '성공', '마켓에 등록 되었습니다.')
      }).catch((e) => {
        console.log('e', e)
        utils.httpFailNotify(e, this)
      })
    },
    eventCreateAgent (e) {
      e.preventDefault()
      if (this.createAgentData.name === '') {
        this.$vueOnToast.pop('warning', '실패', '에이전트 이름을 입력하세요.')
        return
      }
      if (this.createAgentData.exchangeKeyId === '') {
        this.$vueOnToast.pop('warning', '실패', '거래소키를 선택하세요.')
        return
      }
      if (this.createAgentData.capitalBase === '') {
        this.$vueOnToast.pop('warning', '실패', '기본 잔액을 입력하세요.')
        return
      }
      if (!/\d+/.test(this.createAgentData.capitalBase)) {
        this.$vueOnToast.pop('warning', '실패', '기본 잔액은 숫자로 입력하세요.')
        return
      }
      if (this.createAgentData.baseCurrency === '') {
        this.$vueOnToast.pop('warning', '실패', '통화를 선택하세요.')
        return
      }
      if (!/\S+/.test(this.createAgentData.baseCurrency)) {
        this.$vueOnToast.pop('warning', '실패', '통화는 문자만 입력가능합니다.')
        return
      }

      let check = this.createAgentData.options.filter((o) => {
        if (o.value === '' && (o.must === 'false' || o.must === 'true')) {
          return true
        } else {
          return false
        }
      })
      if (check.length !== 0) {
        this.$vueOnToast.pop('warning', '실패', '옵션을 입력하세요.')
        return
      }
      let options = this.createAgentData.options.filter((o) => {
        if (o.must === 'true' || o.must === 'false') {
          return true
        } else {
          return false
        }
      })
      let body = {
        strategyId: Number(this.createAgentData.strategyId),
        strategyVersion: this.createAgentData.strategyVersion,
        baseCurrency: this.createAgentData.baseCurrency,
        capitalBase: Number(this.createAgentData.capitalBase),
        name: this.createAgentData.name,
        exchangeKeyId: Number(this.createAgentData.exchangeKeyId),
        options: JSON.stringify(options)
      }
      console.log('요청 데이터: ', body)
      let url = config.serverHost + '/' + config.serverVer + '/agents'
      this.axios.post(url, body, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        if (result.status === 200) {
          this.$root.$emit('bv::hide::modal', 'createAgentForm')
          this.$vueOnToast.pop('info', '성공', '에이전트 생성 되었습니다.')
          this.$router.push('/agents/' + result.data.id)
        } else {
          this.$vueOnToast.pop('warning', '실패', '에이전트 생성 실패하였습니다.')
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    showModal (strategyId, strategyName, strategyVersion, options) {
      this.createAgentData = { name: '', exchangeKeyId: '', baseCurrency: '', capitalBase: '', strategyId: '', strategyVersion: '', strategyName: '', options: [] }
      this.createAgentData.strategyId = strategyId
      this.createAgentData.strategyName = strategyName
      this.createAgentData.strategyVersion = strategyVersion
      let tmpOptions = JSON.parse(options)
      tmpOptions = tmpOptions.map((o, i) => {
        o.value = ''
        return o
      })
      this.createAgentData.options = tmpOptions
      this.$root.$emit('bv::show::modal', 'createAgentForm')
    }
  },
  created () {
    this.strategyNameList = []
    let url = config.serverHost + '/' + config.serverVer + '/strategies/me'
    this.axios.get(url, config.getAxiosGetOptions()).then((result) => {
      this.strategyNameList = result.data.map((v) => {
        v.createTime = utils.timestampToTime(v.createTime, 's')
        v.updateTime = v.updateTime === null ? '-' : utils.timestampToTime(v.updateTime, 's')
        v.writer = v.userId === null ? '-' : v.userId
        return {text: v.name, value: v.id}
      })
      this.strategyList = result.data
    }).catch((e) => {
      utils.httpFailNotify(e, this)
    })
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
.descbox {
  height: 150px;
  overflow-y: auto;
}
</style>
