<template>
  <b-card>
    <b-form-group label="알고리즘 이름" label-for="algoName">
      <b-input-group>
        <b-form-input id="algoName" type="text"></b-form-input>
        <b-button variant="primary">저장</b-button>
      </b-input-group>
    </b-form-group>
    <hr />
    <div class="border">
      <codemirror v-model="code" :options="cmOption"></codemirror>
    </div>
  </b-card>
</template>
<script>
import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

Vue.use(VueCodemirror)

export default {
  props: ['code'],
  data () {
    return {
      cmOption: {
        mode: 'Python',
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
