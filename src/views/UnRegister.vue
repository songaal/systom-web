<template lang="html">
  <div class="wrapper">
    <b-row>
      <b-col class="text-center">
        <h1 slot="header" class="mb-0">시스텀을 사용해주셔서 감사했습니다.</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center mt-3">
        <p>이렇게 떠나신다니 많이 아쉽습니다. 혹시라도 시간이 되신다면, 저희가 어떻게 시스텀서비스를 향상 시킬수 있을지 말씀해주세요. 모든 사람들에게 도움이 될것 입니다. 감사합니다. :)</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-3">
        <b-form-textarea style="height: 200px;"></b-form-textarea>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center mt-3">
        <button class="btn btn-danger btn-lg" @click="unRegister">탈퇴합니다.</button>
        <button class="btn btn-secondary btn-lg" @click="back">뒤로가기</button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import config from '../Config'
import utils from '../Utils'

export default {
  components: {},
  data () {
    return ({})
  },
  created () {},
  methods: {
    back () {
      history.back()
    },
    unRegister (el) {
      el.target.disabled = true
      let url = config.serverHost + '/auth/unRegister'
      this.axios.delete(url, {}, config.getAxiosDeleteOptions()).then((response) => {
        console.log(response)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
</style>
