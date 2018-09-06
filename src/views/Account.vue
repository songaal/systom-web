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
             <b-col cols="3" xs="2" sm="3" md="3" lg="3" class="text-nowrap">
               아이디 :
             </b-col>
             <b-col cols="9" xs="10" sm="9" md="9" lg="9" class="text-nowrap">
               {{userInfo.userId}}
             </b-col>
           </b-row>
           <b-row class="mb-2">
             <b-col cols="3" xs="2" sm="3" md="3" lg="3" class="text-nowrap">
               이메일 :
             </b-col>
             <b-col cols="9" xs="10" sm="9" md="9" lg="9" class="text-nowrap">
               {{userInfo.email}}
             </b-col>
           </b-row>
           <b-row class="mb-2">
             <b-col cols="3" xs="2" sm="3" md="3" lg="3" class="text-nowrap">
               텔레그램 :
             </b-col>
             <b-col cols="9" xs="10" sm="9" md="9" lg="9" class="text-nowrap">
               {{telegramId}}
               <a href="#"
                  :class="{'ml-1': telegramId !== null, 'text-primary': true, 'text-underline': true}"
                  @click="telegramIdUpdateShowModal">
                 <u>{{telegramId === null ? '등록': '수정'}}</u>
               </a>
             </b-col>
           </b-row>
           <b-row class="mb-2">
             <b-col cols="3" xs="2" sm="3" md="3" lg="3" class="text-nowrap">
               비밀번호 :
             </b-col>
             <b-col cols="9" xs="10" sm="9" md="9" lg="9" class="text-nowrap">
               <ChangePasswordModal></ChangePasswordModal>
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
            <div class="table-responsive">
              <b-table :fields="exchangeKeyFields"
                       :items="exchangeKeyList"
                       :showEmpty="true"
                       emptyText="거래소키가 없습니다."
                       class="text-nowrap"
              >
              <template slot="apiKey" slot-scope="data">
                <span>{{data.value.substring(0, 10)}}***</span>
              </template>
                <template slot="action" slot-scope="data">
                  <a href="#"
                     class="text-danger"
                     @click="deleteExchangeKey(data.item.id)"
                  ><i class="fa fa-trash"></i></a>
                  <!-- <b-button variant="danger" @click="deleteExchangeKey(data.item.id)">삭제</b-button> -->
                </template>
              </b-table>
            </div>
         </b-card>
       </b-col>
     </b-row>

     <b-row>
       <b-col size="lg" md="6">
         <b-card>
            <h5 slot="header"
               class="mb-0">
              초대관리
            </h5>
            <div solt="header" class="mb-3">
              <b-row>
                <b-col>
                  <b-button variant="outline-primary"
                            :disabled="!isInvitation"
                            @click="createInvitation">
                    초대코드생성
                  </b-button>
                </b-col>
                <b-col>
                  <div class="mt-2 text-right text-danger">* 초대는 5명까지만 가능합니다.</div>
                </b-col>
              </b-row>
            </div>
            <div class="table-responsive">
              <table class="table text-nowrap">
                <tr>
                  <th class="text-center">초대코드</th>
                  <th class="text-center">링크확인</th>
                  <th class="text-center">가입아이디</th>
                </tr>
                <tr v-if="invitationsNoDataText !== null">
                  <td colspan="3" class="text-center">
                    {{invitationsNoDataText}}
                  </td>
                </tr>
                <tr v-for="(invitation, index) in invitations">
                  <td class="text-center">
                    <a href="#" class="p-0" @click="clipboard(invitation.link)">{{invitation.refCode}}</a>
                  </td>
                  <td class="text-center">
                    <button @click="showRefLinkModal(invitation.link)"
                            class="btn btn-link btn-sm">링크확인</button>

                  </td>
                  <td class="text-center">
                    {{invitation.refUserId}}
                  </td>
                </tr>
              </table>
            </div>
         </b-card>
       </b-col>
     </b-row>

     <b-modal id="refLinkModal"
              no-fade
              title="링크확인">
       <b-row>
         <b-col class="text-center">
           <canvas ref="refLinkQRCode"></canvas>
         </b-col>
       </b-row>
       <b-row>
         <b-col class="mb-3 text-center">
           <span>
             {{invitationLink}}
           </span>
         </b-col>
       </b-row>
       <template slot="modal-footer">
         <b-button @click="hideRefLinkModal">확인</b-button>
       </template>
     </b-modal>

    <b-modal id="telegramIdUpdateModal"
             title="텔레그램 아이디 등록"
             size="md"
             no-fade
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
             no-fade
    >
      <b-container fluid>
        <b-row>
          <b-col sm="3" class="mt-2">
            <label>거래소:</label>
          </b-col>
          <b-col sm="9">
            <b-form-select v-model="createExchangeKey.exchange"
                           :options="this.options.exchangeList"/>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col sm="3" class="mt-2">
            <label>API KEY:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="createExchangeKey.apiKey"/>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col sm="3" class="mt-1">
            <label class="d-md-none">SECRET KEY:</label>
            <label class="mb-0 line-hight-15 d-sm-down-none">SECRET KEY:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="createExchangeKey.secretKey"/>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col sm="3" class="mt-2">
            <label>별칭:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="createExchangeKey.name"/>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col class="text-infomation-warning text-danger">
            * 등록한 API KEY는 암호화폐 매도와 매수용도로만 사용됩니다.<br/>
            * 거래소에서 API KEY 생성시 자산출금 권한을 해제하시기 바랍니다.<br/>
            * API KEY와 SECRET KEY 관리에 유의하시기 바라며, 고객의 관리소홀로 인한 손실에 대해 회사는 책임지지 않습니다.
          </b-col>
        </b-row>

      </b-container>
      <template slot="modal-footer">
        <b-button v-if="!isProcess" @click="(e) => {this.$root.$emit('bv::hide::modal', 'createExchangeKeyModal')}">취소</b-button>
        <b-button v-if="!isProcess" variant="primary" @click="newExchangeKey">유효성 테스트 및 저장</b-button>
        <b-button-spinner v-if="isProcess" class="pr-5 mr-1"></b-button-spinner>
      </template>
    </b-modal>
  </div>
</template>

<script>
import config from '../Config'
import utils from '../Utils'
import ChangePasswordModal from '../components/modals/ChangePasswordModal'
import ccxt from 'ccxt'
import Spinner from 'vue-simple-spinner'
var QRCode = require('qrcode')

export default {
  components: {
    ChangePasswordModal,
    'b-button-spinner': Spinner
  },
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
        name: { label: '별칭', class: 'text-center' },
        exchange: { label: '거래소', class: 'text-center' },
        apiKey: { label: 'API KEY', class: 'text-center' },
        action: { label: ' ', class: 'text-center' }
      },
      exchangeKeyList: [],
      createExchangeKey: {
        exchange: null,
        name: null,
        apiKey: null,
        secretKey: null
      },
      options: {
        exchangeList: [],
        termCheckbox: null
      },
      isProcess: false,
      invitations: [],
      isInvitation: false,
      invitationsNoDataText: null,
      invitationLink: null
    })
  },
  created () {
    this.selectInvitations()
    let url = config.serverHost + '/auth'
    this.axios.get(url, {withCredentials: true}).then((result) => {
      this.userInfo.userId = result.data.username
      this.userInfo.email = result.data.email
    }).catch((e) => {
      utils.httpFailNotify(e, this)
    })
    this.options.exchangeList = config.liveExchanges.filter((o) => {
      return o.disable === true
    }).map(o => {
      return {value: o.en, text: o.ko}
    })
    this.createExchangeKey.exchange = this.options.exchangeList[0].value
    this.selectExchangeKey()
    url = config.serverHost + '/auth/telegram'
    this.axios.get(url, {withCredentials: true}).then((result) => {
      if (result.data[0] !== undefined && result.data[0].serviceUser !== undefined) {
        this.telegramId = result.data[0].serviceUser
      }
    }).catch((e) => {
      utils.httpFailNotify(e, this)
    })
  },
  methods: {
    createInvitation () {
      let url = config.serverHost + '/invitations'
      this.axios.post(url, {}, config.getAxiosPostOptions()).then((response) => {
        console.log('response', response)
        this.selectInvitations()
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    clipboard (link) {
      let t = document.createElement('textarea')
      document.body.appendChild(t)
      t.value = link
      t.select()
      let a = document.execCommand('copy')
      document.body.removeChild(t)
      this.$vueOnToast.pop('info', '완료', '클립보드에 복사하였습니다.')
    },
    showQRCode (link) {
      var canvas = this.$refs['refLinkQRCode']
      QRCode.toCanvas(canvas, link, { width: 200 })
    },
    showRefLinkModal (link) {
      this.invitationLink = link
      this.showQRCode(link)
      this.$root.$emit('bv::show::modal', 'refLinkModal')
    },
    hideRefLinkModal (index) {
      this.$root.$emit('bv::hide::modal', 'refLinkModal')
    },
    selectInvitations () {
      this.invitations = []
      this.invitationsNoDataText = null
      let url = config.serverHost + '/invitations'
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        let invitations = response.data.invitations
        if (invitations.length === 0) {
          this.isInvitation = true
          this.invitationsNoDataText = '조회 정보가 없습니다.'
          return false
        }
        invitations.forEach(o => {
          this.invitations.push({
            refCode: o.refCode,
            link: 'https://www.systom.io/invitation?ref=' + o.refCode,
            refUserId: o.refUserId
          })
        })
        if (invitations.length < response.data.maxInvitationSize) {
          this.isInvitation = true
        } else {
          this.isInvitation = false
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
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
      this.axios.put(config.serverHost + '/auth/telegram', {telegramServiceUser: this.newTelegramId}, config.getAxiosPutOptions()).then((result) => {
        this.$vueOnToast.pop('success', '성공', '저장이 완료 되었습니다.')
        this.telegramId = this.newTelegramId
        this.$root.$emit('bv::hide::modal', 'telegramIdUpdateModal')
        this.selectExchangeKey()
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    showModal () {
      this.createExchangeKey = {
        exchange: this.options.exchangeList[0].value, name: '', apiKey: '', secretKey: ''
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
      this.axios.get(config.serverHost + '/auth/exchangeKey', {withCredentials: true}).then((result) => {
        this.exchangeKeyList = result.data
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    deleteExchangeKey (id) {
      if (!confirm('삭제하시겠습니까?')) {
        return
      }
      this.axios.delete(config.serverHost + '/auth/exchangeKey/' + id, {withCredentials: true}).then((result) => {
        this.selectExchangeKey()
        this.$vueOnToast.pop('success', '성공', '삭제 되었습니다.')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    newExchangeKey () {
      if (this.isProcess) {
        return false
      }
      this.isProcess = true
      if (this.createExchangeKey.apiKey === null || this.createExchangeKey.apiKey === '') {
        this.$vueOnToast.pop('warning', '실패', '거래소 API KEY 입력하세요.')
        this.isProcess = false
        return false
      }
      if (this.createExchangeKey.secretKey === null || this.createExchangeKey.secretKey === '') {
        this.$vueOnToast.pop('warning', '실패', '거래소 SECRET KEY 입력하세요.')
        this.isProcess = false
        return false
      }
      if (this.createExchangeKey.name === null || this.createExchangeKey.name === '') {
        this.$vueOnToast.pop('warning', '실패', '별칭을 입력하세요.')
        this.isProcess = false
        return false
      }
      let exchangeName = this.createExchangeKey.exchange
      let apiKey = this.createExchangeKey.apiKey
      let secretKey = this.createExchangeKey.secretKey
      this.validationKey(exchangeName, apiKey, secretKey).then((isValid) => {
        if (isValid) {
          this.axios.post(config.serverHost + '/auth/exchangeKey', this.createExchangeKey, {withCredentials: true}).then((result) => {
            this.isProcess = false
            this.$vueOnToast.pop('success', '성공', '저장이 완료 되었습니다.')
            this.$root.$emit('bv::hide::modal', 'createExchangeKeyModal')
            this.selectExchangeKey()
          }).catch((e) => {
            this.isProcess = false
            utils.httpFailNotify(e, this)
          })
        } else {
          this.isProcess = false
          this.$vueOnToast.pop('error', '실패', 'API Key/Secret Key가 잘못되었습니다.')
        }
      })
    },
    validationKey: async (exchangeName, apiKey, secretKey) => {
      console.log(exchangeName)
      try {
        var exchange = new ccxt[exchangeName.toLowerCase()]({
          'proxy': 'https://cors-anywhere.herokuapp.com/',
          'apiKey': apiKey,
          'secret': secretKey
        })
        let balance = await exchange.fetchBalance()
        return (typeof balance === 'object')
      } catch (e) {
        console.log('잘못된 거래소키:', e)
        return false
      }
    }
  }
}
</script>

<style lang="css">
.wrapper {margin-top: 20px;}
.layer-top {z-index: 9999}
.line-hight-15 {
  line-height: 15px
}
.text-infomation-warning {
  font-size: 0.9em;
}
.div-center {
  text-align: center;
  display: inline-block;
}
</style>
