<template lang="html">
  <div class="wrapper">
    <b-card>
      <h5 slot="header"
          class="mb-0"
      >
      전략개발
      </h5>
      <b-tabs v-if="showCreateStrategyTab === true"
              v-model="tabIndex">
        <b-tab title="내가 만든 전략">
          <div solt="header" class="mb-3">

            <b-button variant="primary"
                    @click="() => {this.$root.$emit('bv::show::modal', 'createStrategyForm')}">
              새 전략 생성
            </b-button>

            <b-dropdown split
                        @click="registerMarketModal"
                        variant="outline-primary"
                        class="ml-2"
            >
              <template slot="button-content">
                판매하기
              </template>
              <b-dropdown-item @click="stopSellingStrategy">
                현재 판매 중지
              </b-dropdown-item>
            </b-dropdown>

            <b-button variant="outline-primary"
                      class="ml-2"
                      @click="createAgentModal"
                      >
              에이전트 생성
            </b-button>

          </div>
          <div>
            <b-table :fields="strategyFields"
                     :items="strategyList"
                     hover
                     cols="12"
                     :showEmpty="true"
                     emptyText="전략이 없습니다."
            >
              <template slot="name" slot-scope="data">
                <input type="radio"
                       :value="data.item.id"
                       :data-version="data.item.version"
                       :data-name="data.value"
                       class="mr-2"
                       name="strategy"
                       :checked="selectedStrategy.id === data.item.id"
                       @change="changeSelectStrategy(data.item.id, data.value, data.item.lastVersion, data.item.sellVersion)"
                />
                <b-link :to="`/strategies/${data.item.id}`" class="text-nowrap">{{data.value}}</b-link>
              </template>
              <template slot="lastVersion" slot-scope="data">
                <span v-if="data.value === null"> -- </span>
                <span v-if="data.value !== null">{{data.value}}</span>
              </template>
              <template slot="sellVersion" slot-scope="data">
                <span v-if="data.value === null"> -- </span>
                <span v-if="data.value !== null">{{data.value}}</span>
              </template>
            </b-table>
          </div>
        </b-tab>
        <b-tab title="투자중인 전략">
          <div solt="header" class="mb-3">

            <b-button variant="outline-primary"
                      class="ml-2"
                      @click="createAgentModal"
                      >
              에이전트 생성
            </b-button>

            <b-button variant="outline-primary"
                      class="ml-2"
                      >
              삭제
            </b-button>

          </div>
          <div>
            <b-table :fields="orderStrategyFields"
                     :items="orderStrategyList"
                     hover
                     cols="12"
                     :showEmpty="true"
                     emptyText="전략이 없습니다."
            >
              <template slot="name" slot-scope="data">
                <input type="radio"
                       :value="data.item.id"
                       :data-version="data.item.version"
                       :data-name="data.value"
                       class="mr-2"
                       name="orderStrategy"
                       :checked="selectedOrderStrategy.id === data.item.id"
                       @change="changeOrderSelectStrategy(data.item.id, data.value, data.item.version, data.item.sellVersion)"
                />
                <b-link :to="`/strategies/${data.item.id}/versions/${data.item.version}`" class="text-nowrap">{{data.value}}</b-link>
              </template>
              <template slot="version" slot-scope="data">
                <span v-if="data.value === null"> -- </span>
                <span v-if="data.value !== null">{{data.value}}</span>
              </template>
              <template slot="sellVersion" slot-scope="data">
                <span v-if="data.value === null"> -- </span>
                <span v-if="data.value !== null">{{data.value}}</span>
              </template>
            </b-table>
          </div>
        </b-tab>
      </b-tabs>
      <!--  -->


      <div  v-if="showCreateStrategyTab === false">
        <div solt="header" class="mb-3">

          <b-button variant="primary"
                    class="ml-2"
                    @click="createAgentModal"
                    >
            에이전트 생성
          </b-button>

          <b-button variant="outline-primary"
                    class="ml-2"
                    >
            삭제
          </b-button>

        </div>
        <div>
          <b-table :fields="orderStrategyFields"
                   :items="orderStrategyList"
                   hover
                   cols="12"
                   :showEmpty="true"
                   emptyText="전략이 없습니다."
          >
            <template slot="name" slot-scope="data">
              <input type="radio"
                     :value="data.item.id"
                     :data-version="data.item.version"
                     :data-name="data.value"
                     class="mr-2"
                     name="orderStrategy"
                     :checked="selectedOrderStrategy.id === data.item.id"
                     @change="changeOrderSelectStrategy(data.item.id, data.value, data.item.version, data.item.sellVersion)"
              />
              <b-link :to="`/strategies/${data.item.id}/versions/${data.item.version}`" class="text-nowrap">{{data.value}}</b-link>
            </template>
            <template slot="version" slot-scope="data">
              <span v-if="data.value === null"> -- </span>
              <span v-if="data.value !== null">{{data.value}}</span>
            </template>
            <template slot="sellVersion" slot-scope="data">
              <span v-if="data.value === null"> -- </span>
              <span v-if="data.value !== null">{{data.value}}</span>
            </template>
          </b-table>
        </div>
      </div>
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
        <button class="btn btn-secondary"
                @click="() => {this.$root.$emit('bv::hide::modal', 'createAgentForm')}"
        >취소</button>
        <button class="btn btn-primary"
                @click="eventCreateAgent"
        >확인</button>
      </div>
    </b-modal>


    <!-- 전략 생성 -->
    <b-modal id="createStrategyForm"
             title="새 전략 생성"
    >
      <b-form>
        <b-input id="newStrategyName"
                 v-model="createStrategyFrame.name"
                 placeholder="전략이름"
                 max-length="20"
                 min-length="5"/>
      </b-form>
      <div slot="modal-footer">
        <button class="btn btn-secondary"
                @click="() => {this.$root.$emit('bv::hide::modal', 'createStrategyForm')}"
        >취소</button>
        <button class="btn btn-primary"
                @click="saveNewStrategyFrame"
        >확인</button>
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
          {{selectedStrategy.name}}
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
      <!-- <b-row class="my-1">
        <b-col md="3">
          <label for="baseCurrency" class="text-nowrap">가격(월 기준):</label>
        </b-col>
        <b-col md="9">
          <b-form-input size="md"
                        type="number"
                        v-model="sellStrategy.price"
          />
        </b-col>
      </b-row> -->
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
        <button class="btn btn-secondary"
                @click="() => {this.$root.$emit('bv::hide::modal', 'uploadMarketForm')}"
        >취소</button>
        <button class="btn btn-primary"
                @click="registerSellStrategy"
        >판매</button>
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
      tabIndex: null,
      showCreateStrategyTab: null,
      strategyFields: {
        name: {label: '이름', sortable: true, class: 'text-center'},
        lastVersion: {label: '최신버전', sortable: true, class: 'text-center'},
        sellVersion: {label: '판매버전', sortable: true, class: 'text-center'},
        createTime: {label: '생성시간', sortable: true, class: 'text-center'},
        userId: {label: '작성자', sortable: true, class: 'text-center'}
      },
      orderStrategyFields: {
        name: {label: '이름', sortable: true, class: 'text-center'},
        version: {label: '구매버전', sortable: true, class: 'text-center'},
        sellVersion: {label: '판매버전', sortable: true, class: 'text-center'},
        orderTime: {label: '구매시간', sortable: true, class: 'text-center'},
        userId: {label: '작성자', sortable: true, class: 'text-center'}
        // price: {label: '가격', sortable: true, class: 'text-center'}
      },
      orderStrategyList: [],
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
      selectedStrategy: {
        id: null,
        name: null,
        lastVersion: null,
        sellVersion: null
      },
      selectedOrderStrategy: {
        id: null,
        name: null,
        lastVersion: null,
        sellVersion: null
      },
      strategyVersionList: [],
      sellStrategy: {
        id: null,
        version: null,
        // price: null,
        description: null
      },
      registerStrategies: []
    }
  },
  components: {
    portfolioForm,
    ModelSelect
  },
  watch: {
    tabIndex () {
      this.retrieveStrategies()
    }
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
    changeSelectStrategy (id, name, lastVersion, sellVersion) {
      this.selectedStrategy.id = id
      this.selectedStrategy.name = name
      this.selectedStrategy.lastVersion = lastVersion || null
      this.selectedStrategy.sellVersion = sellVersion || null
    },
    changeOrderSelectStrategy (id, name, version, sellVersion) {
      this.selectedOrderStrategy.id = id
      this.selectedOrderStrategy.name = name
      this.selectedOrderStrategy.lastVersion = version || null
      this.selectedOrderStrategy.sellVersion = sellVersion || null
    },
    selectStrategyDeployVersions (strategyId) {
      this.strategyVersionList = []
      let url = `${config.serverHost}/${config.serverVer}/strategies/${strategyId}/versions`
      this.axios.get(url, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        let isFirst = true
        let tmpList = result.data.map((v, i) => {
          let isSell = v.isSell === 'private' || v.isSell === 'stop'
          if (isFirst && isSell) {
            isFirst = false
            this.sellStrategy.version = v.version
          }
          return {text: v.version, value: v.version, isSell: !isSell}
        })
        tmpList = tmpList.filter(o => {
          return o.isSell === false
        })
        this.strategyVersionList = tmpList
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    registerMarketModal () {
      this.sellStrategy.version = null
      // this.sellStrategy.price = null
      this.sellStrategy.description = null
      this.sellStrategy.id = this.selectedStrategy.id
      this.selectStrategyDeployVersions(this.selectedStrategy.id)
      this.$root.$emit('bv::show::modal', 'uploadMarketForm')
    },
    registerSellStrategy () {
      if (this.sellStrategy.id === null || this.sellStrategy.id === '') {
        this.$vueOnToast.pop('warning', '실패', '전략을 선택하세요.')
        return
      }
      if (this.sellStrategy.version === null || this.sellStrategy.version === '') {
        this.$vueOnToast.pop('warning', '실패', '버전을 선택하세요.')
        return
      }
      // if (this.sellStrategy.price === null || this.sellStrategy.price === '') {
      //   this.$vueOnToast.pop('warning', '실패', '가격을 입력하세요.')
      //   return
      // }
      if (this.sellStrategy.description === null || this.sellStrategy.description === '') {
        this.$vueOnToast.pop('warning', '실패', '설명을 입력하세요.')
        return
      }
      if (this.sellStrategy.description.length >= 150) {
        this.$vueOnToast.pop('warning', '실패', '설명은 최대 150자까지 입력할 수 있습니다.')
        return
      }
      let url = `${config.serverHost}/${config.serverVer}/marketplace/register`
      this.axios.put(url, this.sellStrategy, config.getAxiosPutOptions()).then((result) => {
        this.$root.$emit('bv::hide::modal', 'uploadMarketForm')
        this.$vueOnToast.pop('success', '성공', '마켓에 등록 되었습니다.')
        this.retrieveStrategies()
      }).catch((e) => {
        console.log('e', e)
        utils.httpFailNotify(e, this)
      })
    },
    stopSellingStrategy () {
      if (this.selectedStrategy.sellVersion === undefined || this.selectedStrategy.sellVersion === null) {
        this.$vueOnToast.pop('warning', '실패', '판매 중인 전략이 아닙니다.')
        return false
      }
      if (!confirm(`${this.selectedStrategy.name}:${this.selectedStrategy.sellVersion} 판매를 중지 하시겠습니까?`)) {
        return false
      }
      let body = {
        id: this.selectedStrategy.id
      }
      let url = `${config.serverHost}/${config.serverVer}/marketplace/stopSelling`
      this.axios.put(url, body, config.getAxiosPutOptions()).then((result) => {
        this.retrieveStrategies()
        if (result.status === 200) {
          this.$vueOnToast.pop('success', '성공', '판매가 중지 되었습니다.')
        }
        console.log('result', result)
      }).catch((e) => {
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
    createAgentModal (strategyId, strategyName, strategyVersion, options) {
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
    },
    retrieveStrategies () {
      let url = config.serverHost + '/' + config.serverVer + '/strategies'
      this.axios.get(url, config.getAxiosGetOptions()).then((result) => {
        this.strategyList = []
        this.orderStrategyList = []
        let strategyList = result.data.strategyList
        let orderStrategyList = result.data.orderStrategyList
        if (orderStrategyList !== null && orderStrategyList.length > 0) {
          orderStrategyList.forEach(v => {
            v.orderTime = utils.timestampToTime(v.orderTime)
            this.orderStrategyList.push(v)
          })
          if (this.selectedOrderStrategy.id === null) {
            this.selectedOrderStrategy = {
              name: this.orderStrategyList[0].name,
              id: this.orderStrategyList[0].id,
              version: this.orderStrategyList[0].version,
              sellVersion: this.orderStrategyList[0].sellVerion
            }
          }
        }

        if (strategyList !== null && strategyList.length > 0) {
          strategyList.forEach(v => {
            v.createTime = utils.timestampToTime(v.createTime)
            v.updateTime = utils.timestampToTime(v.updateTime)
            this.strategyList.push(v)
          })
          if (this.selectedStrategy.id === null) {
            this.selectedStrategy = {
              name: this.strategyList[0].name,
              id: this.strategyList[0].id,
              lastVersion: this.strategyList[0].lastVerion,
              sellVersion: this.strategyList[0].sellVerion
            }
          }
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    retrieveOrderStrategy () {
      let url = config.serverHost + '/auth'
      this.axios.get(url, config.getAxiosGetOptions()).then((result) => {
        if (result.data.isManager === 'true') {
          this.showCreateStrategyTab = true
          this.retrieveStrategies()
        } else {
          this.showCreateStrategyTab = false
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  created () {
    this.retrieveStrategies()
  },
  mounted () {}
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
.descbox {
  height: 39px;
  overflow-y: auto;
}
table th,
table td {
  white-space: nowrap;
}
</style>
