<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group label="전략이름"
                      label-for="name"
                      :label-cols="2"
                      :horizontal="true"
        >
          <b-form-input id="name"
                        :value="name"
                        max-length="50"
          />
        </b-form-group>
      </b-col>
      <b-col>
        <button class="btn btn-primary">저장</button>
        <button class="btn btn-light" @click="showModal">옵션</button>
      </b-col>
    </b-row>

    <br />

    <b-row>
      <b-col>
        <codemirror :options="editorConfig"
                    v-model="code"
        />
      </b-col>
    </b-row>

    <!-- 옵션 모달 -->
    <b-modal ref="optionModal" title="추가항목" size="lg">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">키</th>
            <th scope="col">설명</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(option, index) in options">
            <td>
              <b-form-input v-model="options[index].key"
                            @keyup.native="addBlankOption"
                            max-length="30"
              />
            </td>
            <td>
              <b-form-input v-model="options[index].desc"
                            max-length="200"
              />
            </td>
            <td>
              <button type="button" class="close mt-2 mr-4">
                <span aria-hidden="true">&times;</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div slot="modal-footer">
        <button class="btn btn-ghost-dark" @click="hideModal">취소</button>
        <button class="btn btn-info" @click="hideModal">저장</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import Config from '../../Config'
import utils from '../../Utils'
import OptionModal from '../StrategyOption/Modal'

Vue.use(VueCodemirror)

export default {
  name: 'StrategyEditor',
  extends: '',
  components: {
    'option-modal': OptionModal
  },
  props: ['strategyDetail'],
  data () {
    return {
      name: '',
      code: '',
      options: []
    }
  },
  computed: {
    editorConfig: {
      get () {
        return {
          mode: 'text/x-python',
          styleActiveLine: true,
          lineWrapping: false,
          tabSize: 4,
          styleSelectedText: true,
          matchBrackets: true,
          showCursorWhenSelecting: true,
          lineNumbers: true,
          indentUnit: 4,
          undoDepth: 200
        }
      }
    }
  },
  watch: {
    strategyDetail () {
      this.code = this.strategyDetail.code
      this.name = this.strategyDetail.name
      this.options = JSON.parse(this.strategyDetail.options)
    },
    options () {
      this.addBlankOption()
    }
  },
  methods: {
    addBlankOption () {
      console.log('checking blank option')
      // 옵션이 없으면 빈 옵션 추가.
      let blankKeys = this.options.filter((o) => {
        if (o.key === '') {
          return true
        } else {
          return false
        }
      })
      console.log('blankKeys.length', blankKeys)
      if (blankKeys.length === 0) {
        this.options.push({ key: '', desc: '' })
      }
    },
    showModal () {
      this.$refs.optionModal.show()
    },
    hideModal () {
      this.$refs.optionModal.hide()
    },
    handleSaveStrategy () {
      // if (this.code === '') {
      //   this.$vueOnToast.pop('error', '실패', '알고리즘을 작성하세요.')
      //   return
      // }
      // if (this.name === '') {
      //   this.$vueOnToast.pop('error', '실패', '전략 이름을 입력하세요.')
      //   return
      // }
      // if (this.version === '') {
      //   this.$vueOnToast.pop('error', '실패', '전략 버전을 입력하세요.')
      //   return
      // }
      // let saveOptions = this.options.filter(o => { return o.key !== '' })
      // let body = {
      //   code: this.code,
      //   options: JSON.stringify(saveOptions),
      //   name: this.name,
      //   version: this.version
      // }
      // if (this.strategyId === '' || this.strategyId === undefined) {
      //   // 생성
      //   let url = Config.serverHost + '/' + Config.serverVer + '/strategy'
      //   this.axios.post(url, body, {headers: Config.defaultHeaders(), withCredentials: true}).then((result) => {
      //     this.strategyId = result.data.id
      //     this.$emit('saveStrategy', this.strategyId)
      //     this.$vueOnToast.pop('success', '성공', '저장 완료되었습니다.')
      //     this.$router.replace('/strategys/' + this.strategyId)
      //   }).catch((e) => {
      //     utils.httpFailNotify(e, this)
      //   })
      // } else {
      //   // 수정
      //   let url = Config.serverHost + '/' + Config.serverVer + '/strategy/' + this.strategyId
      //   this.axios.put(url, body, {headers: Config.defaultHeaders(), withCredentials: true}).then((result) => {
      //     this.$vueOnToast.pop('success', '성공', '수정 완료되었습니다.')
      //     this.$emit('saveStrategy', result.data.id)
      //   }).catch((e) => {
      //     utils.httpFailNotify(e, this)
      //   })
      // }
    },
    handleRemoveStrategy () {
      // if (this.strategyId === '') {
      //   this.$vueOnToast.pop('error', '실패', '저장 정보가 없습니다.')
      //   return
      // }
      // if (!confirm('삭제하시겠습니까?')) {
      //   return
      // }
      // let url = `${Config.serverHost}/Config.serverVer/strategys`
      // console.log(`[Request] Strategy Remove`, url)
      // this.axios.delete(url, Config.getAxiosDeleteOptions(strategyId)).then((result) => {
      //   console.log(`[Response] Strategy Remove`, result)
      //   this.$vueOnToast.pop('success', '성공', '삭제 완료되었습니다.')
      //   this.$router.push('/strategys')
      // }).catch((e) => {
      //   console.log(`[Response] Strategy Remove Error`, e)
      //   utils.httpFailNotify(e, this)
      // })
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestory () {},
  destory () {}
}
</script>

<style scoped>

</style>
