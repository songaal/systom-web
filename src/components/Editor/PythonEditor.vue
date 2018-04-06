<template>
  <b-card>
    <b-row>
      <b-col md="6">
        <b-form-input v-model="name"
                      placeholder="전략 이름"
        />
      </b-col>
      <b-col md="4">
        <b-form-input v-model="version"
                      placeholder="전략 버전"
        />
      </b-col>
      <b-col md="2">
        <b-dropdown right
                    split
                    variant="primary"
                    text="저장"
                    @click="handleSaveStrategy"
        >
          <b-dropdown-item @click="handleRemoveStrategy">삭제</b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>
    <hr />
    <div>
      <b-tabs>
        <b-tab title="코드">
          <codemirror v-model="code"
                      :options="editorOption"
          />
        </b-tab>
        <b-tab title="설정">
          <inlineForm @handleStrategyOptions="handleStrategyOptions"
                      :initOptions="options"
          />
        </b-tab>
      </b-tabs>
    </div>
  </b-card>
</template>

<script>
import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import inlineForm from '../Form/Inline'
import axios from 'axios'
import config from '../../config/Config'
import utils from '../Utils'

Vue.use(VueCodemirror)

export default {
  data () {
    return {
      strategysId: '',
      name: '',
      version: '',
      options: [],
      timeInterval: '1m',
      code: 'def initialize(context):\n\n\ndef handle_data(context, data):\n\n\n'
    }
  },
  components: {
    inlineForm,
    VueCodemirror
  },
  created () {
    this.strategysId = this.$route.params.strategysId
    if (this.strategysId !== undefined) {
      axios.get(config.baseUrl + '/strategy/' + this.strategysId, {headers: config.defaultHeaders()}).then((result) => {
        this.strategysId = result.data.id
        this.name = result.data.name
        this.version = result.data.version
        this.code = result.data.code
        this.options = JSON.parse(result.data.options)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  methods: {
    handleStrategyOptions (timeInterval, options) {
      this.timeInterval = timeInterval
      let jsonOptions = []
      options.forEach(function (option, index) {
        if (option.label !== '' && option.value !== '' && option.desc !== '') {
          jsonOptions.push({'label': option.label, 'value': option.value, 'desc': option.desc})
        }
      })
      this.options = options
    },
    handleSaveStrategy () {
      if (this.code === '' || this.name === '' || this.version === '') {
        this.$vueOnToast.pop('error', '실패', '전략 데이터가 부족합니다.')
        return
      }
      let saveOptions = []
      this.options.forEach((o, i) => {
        if (this.options.length - 1 <= i) {
          return false
        }
        saveOptions.push({'label': o.label, 'value': o.value, 'desc': o.desc, 'must': 'false'})
      })
      // 필수옵션
      saveOptions.push({'label': '시간지연', 'value': this.timeInterval, 'desc': '지연 시간을 선택하세요.', 'must': 'true'})

      let body = {
        code: this.code,
        options: JSON.stringify(saveOptions),
        name: this.name,
        version: this.version
      }
      if (this.strategysId === '' || this.strategysId === undefined) {
        // 생성
        axios.post(config.baseUrl + '/strategy', body, {headers: config.defaultHeaders()}).then((result) => {
          this.strategysId = result.data.id
          this.$emit('saveStrategy', this.strategysId)
          this.$vueOnToast.pop('success', '성공', '저장 완료되었습니다.')
        }).catch((e) => {
          utils.httpFailNotify(e, this)
        })
      } else {
        // 수정
        axios.put(config.baseUrl + '/strategy/' + this.strategysId, body, {headers: config.defaultHeaders()}).then((result) => {
          this.$vueOnToast.pop('success', '성공', '수정 완료되었습니다.')
          this.$emit('saveStrategy', result.id)
        }).catch((e) => {
          utils.httpFailNotify(e, this)
        })
      }
    },
    handleRemoveStrategy () {
      if (this.strategysId === '') {
        this.$vueOnToast.pop('error', '실패', '저장 정보가 없습니다.')
        return
      }
      axios.delete(config.baseUrl + '/strategy', {data: this.strategysId, headers: config.defaultHeaders()}).then((result) => {
        this.$vueOnToast.pop('success', '성공', '삭제 완료되었습니다.')
        this.$router.push('/strategysList')
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
        lineWrapping: true,
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
.CodeMirror {
  border: 1px solid #eee;
  height: 500px;
}
</style>
