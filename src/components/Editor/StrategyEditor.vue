<template>
  <div>
    <b-row>
      <b-col cols="8">
        <model-select :options="version.options"
                      v-model="version.selected"
                      placeholder="버전"
                      @input="changeVersion">
        </model-select>
      </b-col>
      <b-col cols="4">

        <b-dropdown v-if="this.strategyDetail.id !== null && this.isReadOnly === false"
                    split
                    @click="saveStrategy"
                    :variant="saveBtnColor"
                    >
          <template slot="button-content">
            저장
          </template>
          <b-dropdown-item @click="showReleasesModal"
          >배포</b-dropdown-item>
          <b-dropdown-item @click="removeStrategy">삭제</b-dropdown-item>
        </b-dropdown>

        <button v-if="this.strategyDetail.id === null && this.isReadOnly === false"
                class="btn btn-primary"
                @click="saveStrategy"
        >저장</button>

        <button v-if="this.strategyDetail.id !== null && this.isReadOnly === true"
                class="btn btn-danger"
                @click="removeStrategyVersion"
        >이 버전삭제</button>

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
            <th scope="col" v-if="isReadOnly === false"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(option, index) in options">
            <td>
              <b-form-input v-model="options[index].key"
                            @keyup.native="addBlankOption"
                            max-length="30"
                            :readOnly="isReadOnly"
                            v-if="isReadOnly === false"
              />
              <span  v-if="isReadOnly === true">
                {{options[index].key}}
              </span>
            </td>
            <td>
              <b-form-input v-model="options[index].desc"
                            max-length="200"
                            :readOnly="isReadOnly"
                            v-if="isReadOnly === false"
              />
              <span  v-if="isReadOnly === true">
                {{options[index].desc}}
              </span>
            </td>
            <td v-if="isReadOnly === false">
              <button type="button" class="close mt-2 mr-4" @click="removeOption(index)">
                <span aria-hidden="true">&times;</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div slot="modal-footer" v-if="isReadOnly === false">
        <button class="btn btn-ghost-dark" @click="hideModal">취소</button>
        <button class="btn btn-primary" @click="saveModal">저장</button>
      </div>
      <div slot="modal-footer" v-if="isReadOnly === true">
        <button class="btn btn-primary" @click="hideModal">닫기</button>
      </div>
    </b-modal>

    <!-- 배포 모달 -->
    <b-modal ref="releasesModal" title="배포진행" size="md">
      <b-form-input v-model="explanation"
                    placeholder="배포설명을 입력하세요."
                    maxlength="20"
      />
      <div slot="modal-footer">
        <button class="btn btn-ghost-dark" @click="() => {this.$refs.releasesModal.hide()}">취소</button>
        <button class="btn btn-primary" @click="deployReleases">확인</button>
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
import { ModelSelect } from 'vue-search-select'

Vue.use(VueCodemirror)

export default {
  name: 'StrategyEditor',
  extends: '',
  components: {
    'option-modal': OptionModal,
    ModelSelect
  },
  props: ['strategyDetail'],
  data () {
    return {
      isReadOnly: false,
      isChange: false,
      explanation: '',
      name: '',
      code: '',
      options: [],
      tmpSaveOptions: [],
      version: {
        options: [],
        selected: 'latest'
      }
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
          undoDepth: 200,
          readOnly: this.isReadOnly,
          pasteLinesPerSelection: this.isReadOnly
        }
      }
    },
    saveBtnColor () {
      return this.isChange ? 'primary' : 'secondary'
    }
  },
  watch: {
    strategyDetail () {
      this.code = this.strategyDetail.code
      this.name = this.strategyDetail.name
      this.tmpSaveOptions = JSON.parse(this.strategyDetail.options)
      this.getVersionList(this.strategyDetail.id)
      this.isChange = false
    },
    options () {
      this.addBlankOption()
      this.isChange = true
    },
    code () {
      this.isChange = true
    },
    '$route.params.version' () {
      if (this.$route.params.version === undefined) {
        this.version.selected = 'latest'
      } else {
        this.version.selected = this.$route.params.version
      }
    }
  },
  methods: {
    addBlankOption () {
      if (this.isReadOnly) {
        return
      }
      // 옵션이 없으면 빈 옵션 추가.
      let blankKeys = this.options.filter((o) => {
        if (o.key === '') {
          return true
        } else {
          return false
        }
      })
      if (blankKeys.length === 0) {
        this.options.push({key: '', desc: '', value: ''})
      }
    },
    showModal () {
      this.options = this.tmpSaveOptions.map((o) => { return o })
      this.$refs.optionModal.show()
    },
    hideModal () {
      this.$refs.optionModal.hide()
    },
    saveModal () {
      if (this.isReadOnly) {
        return
      }
      this.tmpSaveOptions = this.options.map((o) => { return o })
      this.saveStrategy()
      this.hideModal()
    },
    removeOption (index) {
      if (this.isReadOnly) {
        return
      }
      this.options.splice(index, 1)
    },
    saveStrategy () {
      if (this.isReadOnly) {
        return
      }
      if (this.isChange === false) {
        this.$vueOnToast.pop('warning', '실패', '변경사항이 없습니다.')
        return
      }
      if (this.code === '') {
        this.$vueOnToast.pop('error', '실패', '알고리즘을 작성하세요.')
        return
      }
      let saveOptions = this.tmpSaveOptions.filter((o) => {
        return o.key !== ''
      })
      let body = {
        code: this.code,
        options: JSON.stringify(saveOptions)
      }
      let url = `${Config.serverHost}/${Config.serverVer}/strategys/${this.strategyDetail.id}`
      this.axios.put(url, body, Config.getAxiosPutOptions()).then((result) => {
        this.$emit('updateStrategyDetail', result.data)
        this.isChange = false
        this.$vueOnToast.pop('success', '성공', '수정 완료하였습니다.')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    removeStrategy () {
      if (this.isReadOnly) {
        return
      }
      if (this.strategyDetail.id === null) {
        this.$vueOnToast.pop('error', '실패', '저장 정보가 없습니다.')
        return
      }
      if (!confirm('삭제하시겠습니까?')) {
        return
      }
      let url = `${Config.serverHost}/${Config.serverVer}/strategys/${this.strategyDetail.id}`
      this.axios.delete(url, Config.getAxiosDeleteOptions()).then((result) => {
        this.$vueOnToast.pop('success', '성공', '삭제 완료되었습니다.')
        this.$router.push('/strategys')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    showReleasesModal () {
      if (this.isChange) {
        this.$vueOnToast.pop('error', '실패', '저장 후 배포 진행하세요.')
        return
      }
      this.explanation = ''
      this.$refs.releasesModal.show()
    },
    getVersionList (strategyId) {
      this.version.options = [{value: 'latest', text: '작업본'}]
      let url = `${Config.serverHost}/${Config.serverVer}/strategys/${strategyId}/versions`
      this.axios.get(url, Config.getAxiosGetOptions()).then((result) => {
        result.data.forEach(v => {
          let releasesTime = utils.timestampToTime(v.createTime, 's', null)
          let value = String(v.version)
          let text = '버전 ' + v.version + ' : ' + v.explanation
          this.version.options.push({value: value, text: text, date: '', description: ''})
        })
        if (this.$route.params.version !== undefined) {
          this.version.selected = String(this.$route.params.version)
          this.isReadOnly = true
        }
        this.isChange = false
      }).catch((e) => {
        this.isChange = false
        console.log(`[Error] Request Strategy Version`, url, e)
        utils.httpFailNotify(e, this)
      })
    },
    deployReleases () {
      if (this.isReadOnly) {
        return
      }
      if (this.isChange) {
        this.$vueOnToast.pop('error', '실패', '저장 후 배포 진행하세요.')
        return
      }
      let body = {
        explanation: this.explanation
      }
      let serverAPI = `${Config.serverHost}/${Config.serverVer}`
      let path = `/strategys/${this.strategyDetail.id}/versions`
      this.axios.post(serverAPI + path, body, Config.getAxiosPostOptions()).then((result) => {
        this.$refs.releasesModal.hide()
        this.$vueOnToast.pop('success', '성공', '배포가 완료되었습니다.')
        this.$router.push(`${path}/${result.data.version}`)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    changeVersion (version) {
      if (this.$route.params.version === version) {
        this.$vueOnToast.pop('success', 'warning', '현재 버전과 동일합니다.')
        return
      }
      this.isReadOnly = false
      let path = `/strategys/${this.strategyDetail.id}`
      if (version !== 'latest') {
        path += `/versions/${version}`
        this.isReadOnly = true
      }
      this.$router.push(path)
      this.$vueOnToast.pop('success', '성공', '버전이 변경되었습니다.')
    },
    removeStrategyVersion () {
      if (this.strategyDetail.id === null) {
        this.$vueOnToast.pop('error', '실패', '저장 정보가 없습니다.')
        return
      }
      if (!confirm('삭제하시겠습니까?')) {
        return
      }
      let url = `${Config.serverHost}/${Config.serverVer}/strategys/${this.strategyDetail.id}/versions/${this.version.selected}`
      this.axios.delete(url, Config.getAxiosDeleteOptions()).then((result) => {
        this.$vueOnToast.pop('success', '성공', '삭제 완료되었습니다.')
        this.changeVersion('latest')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
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

<style>
.CodeMirror {
  height: auto;
  border: 1px solid #eee;
}
</style>
