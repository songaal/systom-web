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
          <div solt="header" class="mb-2">
            <b-button variant="primary" to="strategys">새 전략 생성</b-button>
          </div>
          <b-table :fields="strategysFields"
                   :items="strategysList"
                   responsive
                   hover
                   size="md"
          >
            <template slot="name" slot-scope="data">
              <b-link :to="`/strategys/${data.item.id}`">{{data.value}}</b-link>
            </template>
            <template slot="createTime" slot-scope="data">
              {{data.item.createTime}}
            </template>
            <template slot="action" slot-scope="data">
              <b-link variant="primary"
                      v-b-modal.createAgentForm
              >에이전트 실행</b-link>
            </template>
          </b-table>
        </b-tab>
        <!--
        <b-tab title="구매한 전략" >
          <div solt="header" class="mb-2">
            <b-button variant="primary">마켓</b-button>
          </div>
          <table class="table table-md">
            <thead>
              <tr>
                <th>이름</th>
                <th>아이디</th>
                <th>버전</th>
                <th>수익</th>
                <th>판매자</th>
                <th>실행</th>
              </tr>

            </thead>
            <tbody>
              <tr>
                <th scope="row">테스트 알고리즘</th>
                <td>
                  <b-link to="strategys/29">AAA-1234-bbbb-5555</b-link>
                </td>
                <td>1.0.1</td>
                <td>+1%</td>
                <td>testuser@test.com</td>
                <td>
                  <b-button variant="primary"
                            v-b-modal.createAgentForm
                  >
                  에이전트
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
      -->
      </b-tabs>
    </b-card>
    <div>

    <!-- Modal Component -->
    <b-modal id="createAgentForm"
             title="새로운 에이전트"
             size="lg"
    >
      <portfolioForm></portfolioForm>
    </b-modal>
  </div>
  </div>
</template>

<script>
import portfolioForm from '../components/Portfolio/form'
import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import config from '../config/Config'
import utils from '../components/Utils'

Vue.use(Router)

export default {
  data () {
    return {
      strategysFields: {
        name: {
          label: '이름',
          sortable: true,
          class: 'text-center'
        },
        version: {
          label: '버전',
          sortable: true,
          class: 'text-center'
        },
        revenue: {
          label: '수익',
          sortable: true,
          class: 'text-center'
        },
        createTime: {
          label: '생성날짜',
          sortable: true,
          class: 'text-center'
        },
        updateTime: {
          label: '수정날짜',
          sortable: true,
          class: 'text-center'
        },
        wrtier: {
          label: '작성자',
          sortable: true,
          class: 'text-center'
        },
        action: {
          label: '실행',
          sortable: false,
          class: 'text-center'
        }
      },
      strategysList: []
    }
  },
  methods: {
    handleOk (e) {
      e.preventDefault()
    }
  },
  components: {
    portfolioForm
  },
  created () {
    axios.get(config.baseUrl + '/strategys/me', {headers: config.defaultHeaders()}).then((result) => {
      this.strategysList = result.data
    }).catch((e) => {
      utils.httpFailNotify(e, this)
    })
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
</style>
