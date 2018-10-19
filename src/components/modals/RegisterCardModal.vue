<template>
  <div>
    <b-button variant="outline-primary"
              @click="openModal">
      카드추가
    </b-button>
    <b-modal id="registerCardModal" no-fade>
      <template slot="modal-header">
        <h5>카드추가</h5>
      </template>
      <div>
        <b-row>
          <b-col cols="4">
            <span>신용카드번호</span>
          </b-col>
          <b-col cols="8">
            <b-row class="ml-0 mr-0">
              <b-col cols="3" xs="3" class="pl-0 pr-0">
                <b-form-input v-model="cardNo1"
                              maxlength="4"
                              @keyup.native="nextNum(2)"
                              ref="cardNo1"/>
              </b-col>
              <b-col cols="3" xs="3" class="pl-0 pr-0">
                <b-form-input v-model="cardNo2"
                              maxlength="4"
                              @keyup.native="nextNum(3)"
                              ref="cardNo2"/>
              </b-col>
              <b-col cols="3" xs="3" class="pl-0 pr-0">
                <b-form-input v-model="cardNo3"
                              maxlength="4"
                              @keyup.native="nextNum(4)"
                              ref="cardNo3"/>
              </b-col>
              <b-col cols="3" xs="3" class="pl-0 pr-0">
                <b-form-input v-model="cardNo4"
                              maxlength="4"
                              ref="cardNo4"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="4">
            <span>소유자이름</span>
          </b-col>
          <b-col cols="8">
            <b-form-input v-model="card.owner" maxlength="50"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="4">
            <span>유효기간</span>
          </b-col>
          <b-col cols="4" class="pr-0">
            <b-form-select v-model="card.month">
              <option v-for="month in 12"
                      :key="month.id"
                      :value="month < 10 ? '0' + month : month">
                {{month < 10 ? '0' + month : month}}
              </option>
            </b-form-select>
          </b-col>
          <b-col cols="4" class="pl-0">
            <b-form-select v-model="card.year">
              <option v-for="index in 15"
                      :key="index.id"
                      :value="config.startYear + index">
                {{config.startYear + index}}
              </option>
            </b-form-select>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="4">
            <span>
              생년월일6자리<br />
              (사업자등록번호)
            </span>
          </b-col>
          <b-col cols="8">
            <b-form-input v-model="card.birthDate" maxlength="6"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="4">
            <span>
              비밀번호 앞2자리
            </span>
          </b-col>
          <b-col cols="8">
            <b-form-input v-model="card.password2" maxlength="2"></b-form-input>
          </b-col>
        </b-row>
      </div>
      <template slot="modal-footer">
        <b-button v-if="isProcess === false"
                  @click="(e) => this.$root.$emit('bv::hide::modal', 'registerCardModal')">취소</b-button>
        <b-button variant="primary" v-if="isProcess === false"
                  @click="submit">추가</b-button>
        <b-button-spinner  v-if="isProcess === true" size="large"></b-button-spinner>
      </template>
    </b-modal>

  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'
import Spinner from 'vue-simple-spinner'

export default {
  name: 'RegisterCardModal',
  extends: '',
  components: {
    'b-button-spinner': Spinner
  },
  props: [],
  data () {
    return {
      isProcess: false,
      config: {
        startYear: new Date().getFullYear() - 1
      },
      cardNo1: null,
      cardNo2: null,
      cardNo3: null,
      cardNo4: null,
      card: {
        type: null,
        cardNo: null,
        owner: null,
        month: '01',
        year: new Date().getFullYear(),
        birthDate: null,
        password2: null
      }
    }
  },
  computed: {},
  watch: {
    'card.owner' () {
      if (typeof this.card.owner === 'string') {
        this.card.owner = this.card.owner.replace(/\s\s/gi, ' ').toUpperCase()
      }
    }
  },
  methods: {
    openModal () {
      this.cardNo1 = null
      this.cardNo2 = null
      this.cardNo3 = null
      this.cardNo4 = null
      this.card = {
        type: null,
        cardNo: null,
        owner: null,
        month: '01',
        year: new Date().getFullYear(),
        birthDate: null,
        password2: null
      }
      this.$root.$emit('bv::show::modal', 'registerCardModal')
      setTimeout(() => {
        this.$refs.cardNo1.$el.focus()
      }, 100)
    },
    submit () {
      if (this.isProcess) {
        return false
      }
      console.log('this.card', this.card)
      this.isProcess = true
      this.card.cardNo = this.cardNo1 + this.cardNo2 + this.cardNo3 + this.cardNo4
      if (this.card.cardNo === null || this.card.cardNo === '') {
        this.$vueOnToast.pop('error', '실패', '카드번호를 입력하세요.')
        this.isProcess = false
        return false
      } else if (!/^[0-9-]+$/.test(this.card.cardNo)) {
        this.$vueOnToast.pop('error', '실패', '카드번호는 숫자만 가능합니다.')
        this.isProcess = false
        return false
      }
      if (this.card.owner === null || this.card.owner === '') {
        this.$vueOnToast.pop('error', '실패', '소유자이름 입력하세요.')
        this.isProcess = false
        return false
      }
      if (this.card.birthDate === null || this.card.birthDate === '') {
        this.$vueOnToast.pop('error', '실패', '생년월일을 입력하세요.')
        this.isProcess = false
        return false
      }
      if (this.card.password2 === null || this.card.password2 === '') {
        this.$vueOnToast.pop('error', '실패', '비밀번호 앞2자리를 입력하세요.')
        this.isProcess = false
        return false
      }
      let cardNo1 = this.card.cardNo.substring(0, 1)
      let cardNo2 = this.card.cardNo.substring(0, 2)
      let cardNo3 = this.card.cardNo.substring(0, 3)
      let cardNo4 = this.card.cardNo.substring(0, 4)
      let cardNo5 = this.card.cardNo.substring(0, 5)
      let cardNo6 = this.card.cardNo.substring(0, 6)
      // 비자카드
      if (cardNo1 === '4') {
        this.card.type = 'VISA'
      }
      // 마에스트로,씨러스, 아메리칸 엑스프레스, 마스터카드, 다이너스 클럽(현대카드), 디스커버 카드
      if (cardNo2 === '34' || cardNo2 === '35') {
        this.card.type = 'AmericanExpress'
      } else if (cardNo2 === '50' || (Number(cardNo2) >= 56 && Number(cardNo2) <= 59)) {
        this.card.type = 'Maestro'
      } else if ((Number(cardNo2) >= 51 && Number(cardNo2) <= 55)) {
        this.card.type = 'MasterCard'
      } else if (cardNo2 === '36' || (Number(cardNo2) >= 38 && Number(cardNo2) <= 39)) {
        this.card.type = 'Diners'
      } else if (cardNo2 === '60' || cardNo2 === '61' || cardNo2 === '64' || cardNo2 === '65') {
        this.card.type = 'JCBCard'
      }
      let url = `${config.serverHost}/${config.serverVer}/cards`
      this.axios.post(url, this.card, config.getAxiosPostOptions()).then((response) => {
        this.isProcess = false
        this.$emit('retrieveCardList')
        this.$root.$emit('bv::hide::modal', 'registerCardModal')
        this.$vueOnToast.pop('success', '성공', '카드가 추가되었습니다.')
      }).catch((e) => {
        this.isProcess = false
        let message = {
          '500': {type: 'error', title: '실패', msg: e.response.data.message}
        }
        utils.httpFailNotify(e, this, message)
      })
    },
    nextNum (cardNo) {
      if (typeof this[`cardNo${cardNo - 1}`] === 'string') {
        let len = this[`cardNo${cardNo - 1}`].length
        if (len === 4) {
          this.$refs[`cardNo${cardNo}`].$el.focus()
        }
      }
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

</style>
