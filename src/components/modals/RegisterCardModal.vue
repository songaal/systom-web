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
            <b-form-input v-model="card.cardNo" maxlength="16"></b-form-input>
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
      </div>
      <hr />
      <div>
        <h6>사용자정보</h6>
        <b-row class="mt-3">
          <b-col cols="4">
            <span>
              이름
            </span>
          </b-col>
          <b-col cols="8">
            <b-form-input v-model="card.name" maxlength="50"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="4">
            <span>
              주소
            </span>
          </b-col>
          <b-col cols="8">
            <b-form-input v-model="card.address" maxlength="200"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="4">
            <span>
              전화번호
            </span>
          </b-col>
          <b-col cols="8">
            <b-form-input v-model="card.phone" maxlength="15"></b-form-input>
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
      card: {
        type: null,
        cardNo: null,
        owner: null,
        month: '01',
        year: new Date().getFullYear(),
        birthDate: null,
        name: null,
        address: null,
        phone: null
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    openModal () {
      this.card = {
        type: null,
        cardNo: null,
        owner: null,
        month: '01',
        year: new Date().getFullYear(),
        birthDate: null,
        name: null,
        address: null,
        phone: null
      }
      this.$root.$emit('bv::show::modal', 'registerCardModal')
    },
    submit () {
      if (this.isProcess) {
        return false
      }
      this.isProcess = true
      if (this.card.cardNo === null || this.card.cardNo === '') {
        this.$vueOnToast.pop('error', '실패', '카드번호를 입력하세요.')
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
      if (this.card.name === null || this.card.name === '') {
        this.$vueOnToast.pop('error', '실패', '이름를 입력하세요.')
        this.isProcess = false
        return false
      }
      if (this.card.address === null || this.card.address === '') {
        this.$vueOnToast.pop('error', '실패', '주소를 입력하세요.')
        this.isProcess = false
        return false
      }
      if (this.card.phone === null || this.card.phone === '') {
        this.$vueOnToast.pop('error', '실패', '연락처를 입력하세요.')
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
