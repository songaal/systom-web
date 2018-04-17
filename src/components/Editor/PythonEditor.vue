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
import axios from 'axios'
import config from '../../config/Config'
import utils from '../Utils'

Vue.use(VueCodemirror)

export default {
  data () {
    return {
      strategyId: '',
      name: '',
      version: '1.0',
      options: [],
      timeInterval: '1T',
      code: 'def initialize(context):\n\tpass\n\n\ndef handle_data(context, data):\n\tpass\n\n\ndef analyze(context, perf):\n\tpass\n\n\n'
    }
  },
  components: {
    inlineForm,
    VueCodemirror
  },
  created () {
    this.strategyId = this.$route.params.strategyId
    if (this.strategyId !== undefined) {
      let url = config.serverHost + '/' + config.serverVer + '/strategy/' + this.strategyId
      axios.get(url, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
        this.strategyId = result.data.id
        this.name = result.data.name
        this.version = result.data.version
        this.code = result.data.code
        this.options = JSON.parse(result.data.options).filter((o) => {
          return o.must !== 'disable'
        })
        for (var key in this.options) {
          if (this.options[key].key === 'timeInterval') {
            let interval = this.options[key].value.length === 2 ? this.options[key].value.substring(0, 1) : this.options[key].value.substring(0, 2)
            let intervalUnit = this.options[key].value.length === 2 ? this.options[key].value.substring(1, 2) : this.options[key].value.substring(2, 3)
            this.$emit('setInterval', interval, intervalUnit)
          }
        }
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    } else {
      this.$emit('setInterval', '1', 'T')
    }
  },
  methods: {
    handleStrategyOptions (timeInterval, options) {
      this.timeInterval = timeInterval
      let jsonOptions = []
      options.forEach(function (option, index) {
        if (option.label !== '' && option.value !== '' && option.desc !== '') {
          jsonOptions.push({'label': option.label, 'key': option.label, 'value': option.value, 'desc': option.desc})
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
        saveOptions.push({'label': o.label, 'key': o.label, 'value': o.value, 'desc': o.desc, 'must': 'false'})
      })
      // 필수옵션
      let interval = this.timeInterval.length === 2 ? this.timeInterval.substring(0, 1) : this.timeInterval.substring(0, 2)
      let intervalUnit = this.timeInterval.length === 2 ? this.timeInterval.substring(1, 2) : this.timeInterval.substring(2, 3)
      saveOptions.push({'label': '', 'key': 'interval', 'value': interval, 'desc': '', 'must': 'disable'})
      saveOptions.push({'label': '', 'key': 'interval_unit', 'value': intervalUnit.toUpperCase(), 'desc': '', 'must': 'disable'})
      saveOptions.push({'label': '데이터 시간간격', 'key': 'timeInterval', 'value': this.timeInterval, 'desc': '', 'must': 'true'})
      this.$emit('setInterval', interval, intervalUnit)
      let body = {
        code: this.code,
        options: JSON.stringify(saveOptions),
        name: this.name,
        version: this.version
      }
      if (this.strategyId === '' || this.strategyId === undefined) {
        // 생성
        let url = config.serverHost + '/' + config.serverVer + '/strategy'
        axios.post(url, body, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
          this.strategyId = result.data.id
          this.$emit('saveStrategy', this.strategyId)
          this.$vueOnToast.pop('success', '성공', '저장 완료되었습니다.')
        }).catch((e) => {
          utils.httpFailNotify(e, this)
        })
      } else {
        // 수정
        let url = config.serverHost + '/' + config.serverVer + '/strategy/' + this.strategyId
        axios.put(url, body, {headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
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
      axios.delete(url, {data: this.strategyId, headers: config.defaultHeaders(), withCredentials: true}).then((result) => {
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
