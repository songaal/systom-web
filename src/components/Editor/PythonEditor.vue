<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group
          label="전략이름"
          label-for="strategyName"
          :label-cols="2"
          :horizontal="true">
          <b-form-input id="strategyName"/>
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
        <codemirror v-model="code"
                    :options="editorOption"
        />
      </b-col>
    </b-row>

    <!-- 옵션 모달 -->
    <b-modal ref="myModalRef" title="추가항목" size="lg">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">키</th>
            <th scope="col">설명</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b-form-input value="가격"></b-form-input></td>
            <td>
              <b-form-input value="가격이 동일하면 판매"></b-form-input>
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
import inlineForm from '../Form/Inline'
import config from '../../config/Config'
import utils from '../Utils'

Vue.use(VueCodemirror)

export default {
  props: ['strategy'],
  data () {
    return {
      strategyId: '',
      name: '',
      version: '1.0',
      options: [],
      code: 'def initialize(context):\n\tpass\n\n\ndef handle_data(context, data):\n\tpass\n\n\ndef analyze(context, perf):\n\tpass\n\n\n'
    }
  },
  components: {
    inlineForm,
    VueCodemirror
  },
  watch: {
    strategy () {
      this.strategyId = this.strategy.strategyId
      this.name = this.strategy.name
      this.version = this.strategy.version
      this.options = this.strategy.options
    }
  },
  methods: {
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    handleStrategyOptions (optionFields) {
      this.options = optionFields
    },
    handleSaveStrategy () {
      if (this.code === '') {
        this.$vueOnToast.pop('error', '실패', '알고리즘을 작성하세요.')
        return
      }
      if (this.name === '') {
        this.$vueOnToast.pop('error', '실패', '전략 이름을 입력하세요.')
        return
      }
      if (this.version === '') {
        this.$vueOnToast.pop('error', '실패', '전략 버전을 입력하세요.')
        return
      }
      let saveOptions = this.options.filter(o => { return o.key !== '' })
      let body = {
        code: this.code,
        options: JSON.stringify(saveOptions),
        name: this.name,
        version: this.version
      }
      if (this.strategyId === '' || this.strategyId === undefined) {
        // 생성
        let url = config.serverHost + '/' + config.serverVer + '/strategy'
        this.axios.post(url, body, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
          this.strategyId = result.data.id
          this.$emit('saveStrategy', this.strategyId)
          this.$vueOnToast.pop('success', '성공', '저장 완료되었습니다.')
          this.$router.replace('/strategys/' + this.strategyId)
        }).catch((e) => {
          utils.httpFailNotify(e, this)
        })
      } else {
        // 수정
        let url = config.serverHost + '/' + config.serverVer + '/strategy/' + this.strategyId
        this.axios.put(url, body, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
          this.$vueOnToast.pop('success', '성공', '수정 완료되었습니다.')
          this.$emit('saveStrategy', result.data.id)
        }).catch((e) => {
          utils.httpFailNotify(e, this)
        })
      }
    },
    handleRemoveStrategy () {
      if (this.strategyId === '') {
        this.$vueOnToast.pop('error', '실패', '저장 정보가 없습니다.')
        return
      }
      if (!confirm('삭제하시겠습니까?')) {
        return
      }
      let url = config.serverHost + '/' + config.serverVer + '/strategy'
      this.axios.delete(url, {data: this.strategyId, headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        this.$vueOnToast.pop('success', '성공', '삭제 완료되었습니다.')
        this.$router.push('/strategys')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  computed: {
    editorOption () {
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
}
</script>
<style>
/* .CodeMirror {
  border: 1px solid #eee;
  height: 498px;
}
.default-height {
  min-height: 530px
} */
</style>
