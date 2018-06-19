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
             <b-col sm="3">
               아이디 :
             </b-col>
             <b-col sm="9">
               {{userInfo.userId}}
             </b-col>
           </b-row>
           <b-row class="mb-2">
             <b-col sm="3">
               이메일 :
             </b-col>
             <b-col sm="9">
               {{userInfo.email}}
             </b-col>
           </b-row>
           <b-row class="mb-2">
             <b-col sm="3">
               텔레그램 아이디 :
             </b-col>
             <b-col sm="9">
               12345678
               <a href="#" class="ml-1 text-primary text-underline"><u>수정</u></a>
             </b-col>
           </b-row>
           <b-row class="mb-2">
             <b-col sm="3">
               보유코인 :
             </b-col>
             <b-col sm="9">
               0
               <a href="#" class="ml-1 text-primary text-underline"><u>충전</u></a>
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

    <!-- <b-card>
      <h5 slot="header"
          class="mb-0"
      >
      마지막 로그인
      </h5>
      <b-table :fields="lastLoginFields"
              :items="lastTimeList"
              hover
      >
      </b-table>
    </b-card> -->

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
                     v-model="options.termCheckbox"
                     id="acceptedCheckbox"
              >약관동의 <label class="form-check-label" for="acceptedCheckbox">약관동의</label>
            </div>
            <!-- <b-form-checkbox v-model="options.termCheckbox"
                             value="accepted"
                             unchecked-value="not_accepted"
            > 약관동의
            </b-form-checkbox> -->
            <b-link @click="termCheck">
              [거래약관보기]
            </b-link>
          </b-col>
        </b-row>

      </b-container>
      <template slot="modal-footer">
        <b-button @click="(e) => {this.$root.$emit('bv::hide::modal', 'createExchangeKeyModal')}">취소</b-button>
        <b-button variant="primary" @click="create">확인</b-button>
      </template>
    </b-modal>

    <b-modal id="termsModal"
             title="약관동의"
             class="layer-top"
             @cancel="termOk"
    >
    <div>
      여기는 약과 내용입니다.<br/>
      여기는 약과 내용입니다.<br/>
      여기는 약과 내용입니다.<br/>
      여기는 약과 내용입니다.<br/>
      여기는 약과 내용입니다.<br/>
      여기는 약과 내용입니다.<br/>
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
        createTime: '2018-01-01'
      },
      exchangeKeyFields: {
        name: { label: '키 이름', class: 'text-center' },
        exchangeName: { label: '거래소', class: 'text-center' },
        apiKey: { label: 'API KEY', class: 'text-center' },
        action: { label: ' ', class: 'text-center' }
      },
      exchangeKeyList: [],
      lastLoginFields: {
        loginTime: { label: '로그인 시간', class: 'text-center' },
        ip: { label: 'IP 주소', class: 'text-center' },
        geo: { label: '위치', class: 'text-center' }
      },
      lastTimeList: [
        {loginTime: '2018-01-01 01:23:55', ip: '192.168.0.1', geo: '서울'},
        {loginTime: '2018-02-11 01:23:55', ip: '192.168.0.2', geo: '부천'},
        {loginTime: '2018-03-21 01:23:55', ip: '192.168.0.3', geo: '인천'},
        {loginTime: '2018-04-4 01:23:55', ip: '192.168.0.4', geo: '부산'}
      ],
      createExchangeKey: {
        exchangeName: '',
        name: '',
        apiKey: '',
        secretKey: ''
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
  },
  methods: {
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
    create () {
      if (this.options.termCheckbox !== 'accepted') {
        this.$vueOnToast.pop('warning', '실패', '약관에 동의 하세요.')
        return
      }
      if (this.createExchangeKey.name === '') {
        this.$vueOnToast.pop('warning', '실패', '이름을 입력하세요.')
        return
      }
      if (this.createExchangeKey.exchangeKey === '') {
        this.$vueOnToast.pop('warning', '실패', '거래소 api key 입력하세요.')
        return
      }
      if (this.createExchangeKey.secretKey === '') {
        this.$vueOnToast.pop('warning', '실패', '거래소 secret key 입력하세요.')
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
