<template lang="html">
  <div class="wrapper">
    <b-row class="my-1">
      <b-col size="lg" md="6">
        <b-card>
          <h5 slot="header"
              class="mb-0"
          >
          계정설정
         </h5>
         <b-container fluid>
           <b-row class="mb-2">
             <b-col sm="3" class="text-nowrap">
               아이디 :
             </b-col>
             <b-col sm="9" class="text-nowrap">
               {{userInfo.userId}}
             </b-col>
           </b-row>
           <b-row class="mb-2">
             <b-col sm="3" class="text-nowrap">
               이메일 :
             </b-col>
             <b-col sm="9" class="text-nowrap">
               {{userInfo.email}}
             </b-col>
           </b-row>
           <b-row class="mb-2">
             <b-col sm="3" class="text-nowrap">
               텔레그램 :
             </b-col>
             <b-col sm="9" class="text-nowrap">
               {{telegramId}}
               <a href="#"
                  class="ml-1 text-primary text-underline"
                  @click="telegramIdUpdateShowModal">
                 <u>{{telegramId === null ? '등록': '수정'}}</u>
               </a>
             </b-col>
           </b-row>
         </b-container>
         </b-card>
       </b-col>

       <b-col size="lg" md="6">
         <b-card>
            <h5 slot="header"
               class="mb-0"
            >
            거래소 키
            </h5>
            <div solt="header" class="mb-3">
              <b-button variant="outline-primary" @click="showModal">키 등록</b-button>
            </div>

            <b-table :fields="exchangeKeyFields"
                     :items="exchangeKeyList"
                     hover
                     :showEmpty="true"
                     emptyText="거래소키가 없습니다."
            >
              <template slot="action" slot-scope="data">
                <a href=""
                   class="text-danger"
                   @click="deleteExchangeKey(data.item.id)"
                ><i class="fa fa-trash"></i></a>
                <!-- <b-button variant="danger" @click="deleteExchangeKey(data.item.id)">삭제</b-button> -->
              </template>
           </b-table>
         </b-card>
       </b-col>
     </b-row>

    <b-modal id="telegramIdUpdateModal"
             title="텔레그램 아이디 등록"
             size="md"
    >
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="3">
            <label>텔레그램:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="newTelegramId" maxlength="10"/>
          </b-col>
        </b-row>
      </b-container>
      <template slot="modal-footer">
        <b-button @click="(e) => {this.$root.$emit('bv::hide::modal', 'telegramIdUpdateModal')}">취소</b-button>
        <b-button variant="primary" @click="updateTelegramId">확인</b-button>
      </template>
    </b-modal>


    <b-modal id="createExchangeKeyModal"
             title="거래소키 추가"
             size="md"
    >
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="3">
            <label>이름:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="createExchangeKey.name"/>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label>거래소:</label>
          </b-col>
          <b-col sm="9">
            <b-form-select v-model="createExchangeKey.exchangeName"
                           :options="this.options.exchangeNameList"/>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label>API KEY:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="createExchangeKey.apiKey"/>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label>SECRET KEY:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="createExchangeKey.secretKey"/>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="3">
          </b-col>
          <b-col sm="9">
            <div class="form-check form-check-inline">
              <input class="form-check-input"
                     type="checkbox"
                     id="acceptedCheckbox"
                     v-model="isAcceptedCheck"
              ><label class="form-check-label" for="acceptedCheckbox">약관동의</label>
              <b-link @click="termCheck" class="ml-3">
                [거래약관보기]
              </b-link>
            </div>
          </b-col>
        </b-row>

      </b-container>
      <template slot="modal-footer">
        <b-button @click="(e) => {this.$root.$emit('bv::hide::modal', 'createExchangeKeyModal')}">취소</b-button>
        <b-button variant="primary" @click="newExchangeKey">확인</b-button>
      </template>
    </b-modal>

    <b-modal id="termsModal"
             title="약관동의"
             class="layer-top"
             @cancel="termOk"
    >
    <div style="overflow-y:auto height:300px;">
      여기는 약관 내용입니다.<br/>
      여기는 약관 내용입니다.<br/>
      여기는 약관 내용입니다.<br/>
      여기는 약관 내용입니다.<br/>
      여기는 약관 내용입니다.<br/>
      여기는 약관 내용입니다.<br/>
      여기는 약관 내용입니다.<br/>
      여기는 약관 내용입니다.<br/>
      여기는 약관 내용입니다.<br/>
      여기는 약관 내용입니다.<br/>
    </div>
    <template slot="modal-footer">
      <b-col><b-button block @click="termOk">닫기</b-button></b-col>
    </template>
    </b-modal>
  </div>
</template>

<script>
import Config from '../Config'
import Utils from '../Utils'

export default {
  data () {
    return ({
      userInfo: {
        userId: '',
        email: '-',
        password: '',
        createTime: ''
      },
      telegramId: null,
      newTelegramId: null,
      exchangeKeyFields: {
        name: { label: '키 이름', class: 'text-center' },
        exchangeName: { label: '거래소', class: 'text-center' },
        apiKey: { label: 'API KEY', class: 'text-center' },
        action: { label: ' ', class: 'text-center' }
      },
      isAcceptedCheck: false,
      exchangeKeyList: [],
      createExchangeKey: {
        exchangeName: null,
        name: null,
        apiKey: null,
        secretKey: null
      },
      options: {
        exchangeNameList: [],
        termCheckbox: null
      }
    })
  },
  created () {
    let url = Config.serverHost + '/auth'
    this.axios.get(url, {withCredentials: true}).then((result) => {
      this.userInfo.userId = result.data.username
      this.userInfo.email = result.data.email
    }).catch((e) => {
      Utils.httpFailNotify(e, this)
    })
    this.options.exchangeNameList = Config.agentExchanges
    this.createExchangeKey.exchangeName = Config.agentExchanges[0]
    this.selectExchangeKey()
    url = Config.serverHost + '/auth/telegram'
    this.axios.get(url, {withCredentials: true}).then((result) => {
      if (result.data[0] !== undefined && result.data[0].serviceUser !== undefined) {
        this.telegramId = result.data[0].serviceUser
      }
    }).catch((e) => {
      Utils.httpFailNotify(e, this)
    })
  },
  methods: {
    telegramIdUpdateShowModal () {
      this.newTelegramId = this.telegramId
      this.$root.$emit('bv::show::modal', 'telegramIdUpdateModal')
    },
    updateTelegramId () {
      if (this.newTelegramId === null || this.newTelegramId === '') {
        this.$vueOnToast.pop('warning', '실패', '텔레그램 아이디를 입력하세요.')
        return
      } else if (/[^0-9]/gi.test(this.newTelegramId)) {
        this.$vueOnToast.pop('warning', '실패', '텔레그램 아이디가 잘못되었습니다.')
        return
      }
      this.axios.put(Config.serverHost + '/auth/telegram', {telegramServiceUser: this.newTelegramId}, Config.getAxiosPutOptions()).then((result) => {
        this.$vueOnToast.pop('info', '성공', '저장이 완료 되었습니다.')
        this.telegramId = this.newTelegramId
        this.$root.$emit('bv::hide::modal', 'telegramIdUpdateModal')
        this.selectExchangeKey()
      }).catch((e) => {
        Utils.httpFailNotify(e, this)
      })
    },
    showModal () {
      this.createExchangeKey = {
        exchangeName: this.options.exchangeNameList[0], name: '', apiKey: '', secretKey: ''
      }
      this.$root.$emit('bv::show::modal', 'createExchangeKeyModal')
    },
    termCheck () {
      this.$root.$emit('bv::show::modal', 'termsModal')
    },
    termOk () {
      this.$root.$emit('bv::show::modal', 'createExchangeKeyModal')
    },
    selectExchangeKey () {
      this.axios.get(Config.serverHost + '/auth/exchangeKey', {withCredentials: true}).then((result) => {
        this.exchangeKeyList = result.data
      }).catch((e) => {
        Utils.httpFailNotify(e, this)
      })
    },
    deleteExchangeKey (id) {
      if (!confirm('삭제하시겠습니까?')) {
        return
      }
      this.axios.delete(Config.serverHost + '/auth/exchangeKey/' + id, {withCredentials: true}).then((result) => {
        this.selectExchangeKey()
        this.$vueOnToast.pop('info', '성공', '삭제 되었습니다.')
      }).catch((e) => {
        Utils.httpFailNotify(e, this)
      })
    },
    newExchangeKey () {
      if (this.createExchangeKey.name === null || this.createExchangeKey.name === '') {
        this.$vueOnToast.pop('warning', '실패', '이름을 입력하세요.')
        return
      }
      if (this.createExchangeKey.exchangeKey === null || this.createExchangeKey.exchangeKey === '') {
        this.$vueOnToast.pop('warning', '실패', '거래소 api key 입력하세요.')
        return
      }
      if (this.createExchangeKey.secretKey === null || this.createExchangeKey.secretKey === '') {
        this.$vueOnToast.pop('warning', '실패', '거래소 secret key 입력하세요.')
        return
      }
      if (this.isAcceptedCheck !== true) {
        this.$vueOnToast.pop('warning', '실패', '약관에 동의 하세요.')
        return
      }
      this.axios.post(Config.serverHost + '/auth/exchangeKey', this.createExchangeKey, {withCredentials: true}).then((result) => {
        this.$vueOnToast.pop('info', '성공', '저장이 완료 되었습니다.')
        this.$root.$emit('bv::hide::modal', 'createExchangeKeyModal')
        this.selectExchangeKey()
      }).catch((e) => {
        Utils.httpFailNotify(e, this)
      })
    }
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
.layer-top {z-index: 9999}
</style>
