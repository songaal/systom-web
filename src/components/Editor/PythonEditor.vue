<template>
  <b-card>
    <b-row>
      <b-col md="6">
        <b-form-input v-model="strategyName"
                      placeholder="전략 이름"
        />
      </b-col>
      <b-col md="4">
        <b-form-input v-model="strategyVersion"
                      placeholder="전략 버전"
        />
      </b-col>
      <b-col md="2">
        <b-dropdown right
                    split
                    variant="primary"
                    text="저장"
        >
          <b-dropdown-item>삭제</b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>
    <hr />
    <div>
      <b-tabs>
        <b-tab title="코드">
          <codemirror v-model="code"
                      :options="cmOption"
          />
        </b-tab>
        <b-tab title="설정">
          <inlineForm v-model="fields"
                      :requiredFields="requiredFields"
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

Vue.use(VueCodemirror)

export default {
  props: ['code', 'strategyName', 'fields', 'requiredFields'],
  data () {
    return {
      cmOption: {
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
  },
  components: {
    inlineForm
  }
}
</script>
<style>
.CodeMirror {
  border: 1px solid #eee;
  height: 500px;
}
</style>
