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
            <b-button variant="primary" to="strategy">새로운 전략</b-button>
          </div>
          <table responsive class="table table-md">
            <thead>
              <tr>
                <th>이름</th>
                <th>아이디</th>
                <th>버전</th>
                <th>수익</th>
                <th>실행</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">테스트 알고리즘</th>
                <td>
                  <b-link to="strategy">AAA-1234-bbbb-5555</b-link>
                </td>
                <td>1.0.1</td>
                <td>+1%</td>
                <td>
                  <b-button variant="primary"
                            v-b-modal.createAgentForm
                  >
                  에이전트
                  </b-button>
                </td>
              </tr>
              <tr>
                <th scope="row">평균이동 알고리즘</th>
                <td>
                  <b-link to="strategy">BBB-1234-bbbb-5555</b-link>
                </td>
                <td>3.2.1</td>
                <td>+23%</td>
                <td>
                  <b-button variant="primary"
                            v-b-modal.createAgentForm
                  >
                  에이전트
                  </b-button>
                </td>
              </tr>
              <tr>
                <th scope="row">개발중</th>
                <td>
                  <b-link to="strategy">AAA-1234-bbbb-33335</b-link>
                </td>
                <td>0.2.1</td>
                <td>-55%</td>
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
                  <b-link to="strategy">AAA-1234-bbbb-5555</b-link>
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

Vue.use(Router)

export default {
  data () {
    return {
    }
  },
  methods: {
    handleOk (e) {
      e.preventDefault()
    }
  },
  components: {
    portfolioForm
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
</style>
