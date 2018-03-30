<template lang="html">
    <b-card class="wrapper">
      <h5 slot="header"
          class="mb-0"
      >
      에이전트
     </h5>
      <table responsive
             class="table table-md">
        <thead>
          <tr>
            <th>이름</th>
            <th>에이전트 아이디</th>
            <th>전략 이름</th>
            <th>전략 아이디</th>
            <th>상태</th>
            <th>수익</th>
            <th>거래소</th>
            <th>시작 금액(통화)</th>
            <th>코인</th>
            <th>시간 지연</th>
            <th>실행</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>테스트 검증로봇</th>
            <td>
              <b-link to="agent">AAA-1234-bbbb-5555</b-link>
            </td>

            <th>테스트 알고리즘</th>
            <td>
              <b-link to="strategy">AAA-1234-bbbb-5555</b-link>
            </td>

            <td>Running</td>
            <td>0.01%</td>
            <td>Bittrex</td>
            <td>1000 (BTC)</td>
            <td>ETH</td>
            <td>5m</td>
            <td>
              <b-button id="stopBtn"
                        v-if="state == 'run'"
                        variant="warning"
                        @click="changeState"
              >
              정지
              </b-button>
              <b-button id="runBtn"
                        v-if="state == 'stop'"
                        variant="primary"
                        @click="changeState"
              >
              실행
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-card>
</template>

<script>
export default {
  data () {
    return {
      state: 'stop'
    }
  },
  methods: {
    changeState () {
      this.state = this.state === 'run' ? 'stop' : 'run'
    }
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
</style>
