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
        <b-button @click="(e) => this.$root.$emit('bv::hide::modal', 'registerCardModal')">취소</b-button>
        <b-button variant="primary" @click="submit">추가</b-button>
      </template>
    </b-modal>

  </div>
</template>

<script>
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'RegisterCardModal',
  extends: '',
  components: {},
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
      if (this.card.cardNo.startsWith('4')) {
        this.card.type = 'VISA'
      } else if (this.card.cardNo.startsWith('51')) {
        this.card.type = 'MasterCard'
      } else if (this.card.cardNo.startsWith('34')) {
        this.card.type = 'AmericanExpress'
      } else if (this.card.cardNo.startsWith('6281')) {
        this.card.type = 'Maestro'
      } else {
        this.card.type = 'etc'
      }

      let url = `${config.serverHost}/${config.serverVer}/cards`
      this.axios.post(url, this.card, config.getAxiosPostOptions()).then((response) => {
        this.isProcess = false
        this.$emit('retrieveCardList')
        this.$root.$emit('bv::hide::modal', 'registerCardModal')
        this.$vueOnToast.pop('success', '성공', '카드가 추가되었습니다.')
      }).catch((e) => {
        this.isProcess = false
        utils.httpFailNotify(e, this)
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
