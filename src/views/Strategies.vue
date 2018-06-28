<template lang="html">
  <div class="wrapper">
    <b-card>
      <h5 slot="header" class="mb-0">
        전략개발
      </h5>

      <div class="mb-3">
        <CreateStrategyModal />
        <RecuitModal />
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

    </b-card>
  </div>
</template>

<script>
import Vue from 'vue'
import config from '../Config'
import utils from '../Utils'
import { ModelSelect } from 'vue-search-select'
import CreateStrategyModal from '../components/modals/CreateStrategyModal'
import RecuitModal from '../components/modals/RecruitModal'

export default {
  data () {
    return {
      strategyFields: {
        name: {label: '이름', sortable: true, class: 'text-center'},
        lastVersion: {label: '최신버전', sortable: true, class: 'text-center'},
        sellVersion: {label: '판매버전', sortable: true, class: 'text-center'},
        createTime: {label: '생성시간', sortable: true, class: 'text-center'},
        userId: {label: '작성자', sortable: true, class: 'text-center'}
      },
      strategyList: [],
      createStrategyFrame: {
        name: null
      },
      selectedStrategy: {
        id: null,
        name: null,
        lastVersion: null,
        sellVersion: null
      }
    }
  },
  components: {
    ModelSelect,
    CreateStrategyModal,
    RecuitModal
  },
  watch: {
    tabIndex () {
      this.retrieveStrategies()
    }
  },
  methods: {
    changeSelectStrategy (id, name, lastVersion, sellVersion) {
      this.selectedStrategy.id = id
      this.selectedStrategy.name = name
      this.selectedStrategy.lastVersion = lastVersion || null
      this.selectedStrategy.sellVersion = sellVersion || null
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
    }
  },
  created () {},
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
