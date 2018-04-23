<template>
  <b-card>
    <b-row>
      <b-col md="10">
        <b-form-input v-model="name"
                      placeholder="전략 이름"
        />
      </b-col>
      <!-- <b-col md="4">
        <b-form-input v-model="version"
                      placeholder="전략 버전"
        />
      </b-col> -->
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
        <b-tab title="설정"
               class="default-height">
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
  height: 498px;
}
.default-height {
  min-height: 530px
}
</style>
