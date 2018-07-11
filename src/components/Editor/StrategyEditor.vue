<template>
  <div>
    <b-row>
      <b-col cols="8">
        <ModelSelect :options="deployVersion.options"
                      v-model="deployVersion.selected"
                      placeholder="버전"
                      @input="changeVersion">
        </ModelSelect>
      </b-col>
      <b-col cols="4">

        <b-dropdown v-if="this.strategy !== null && this.isReadOnly === false"
                    split
                    @click="saveStrategy"
                    :variant="saveBtnColor"
                    >
          <template slot="button-content">
            저장
          </template>
          <b-dropdown-item @click="showReleasesModal"
          >배포</b-dropdown-item>
          <b-dropdown-item @click="removeStrategy">전략 삭제</b-dropdown-item>
        </b-dropdown>

        <button v-if="this.strategy === null && this.isReadOnly === false"
                class="btn btn-primary"
                @click="saveStrategy"
        >저장</button>

        <button v-if="this.strategy !== null && this.isReadOnly === true"
                class="btn btn-danger"
                @click="removeStrategyVersion"
        >이 버전삭제</button>
      </b-col>
    </b-row>

    <br />

    <b-row>
      <b-col>
        <codemirror :options="editorConfig"
                    v-model="strategy.code"
        />
      </b-col>
    </b-row>

    <!-- 배포 모달 -->
    <b-modal ref="releasesModal" title="배포진행" size="md">
      <b-form-input v-model="deploy.description"
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
import config from '../../Config'
import utils from '../../Utils'
import { ModelSelect } from 'vue-search-select'

Vue.use(VueCodemirror, {
  baseUrl: '/static/'
})

export default {
  name: 'StrategyEditor',
  extends: '',
  components: {
    ModelSelect
  },
  props: [],
  data () {
    return {
      tmpStrategyCode: null,
      strategy: {
        code: config.defaultStrategyCode
      },
      deployVersion: {
        selected: null,
        options: []
      },
      isReadOnly: false,
      isChange: false,
      deploy: {
        description: null
      }
    }
  },
  computed: {
    editorConfig () {
      return {
        mode: 'text/x-python',
        styleActiveLine: true,
        lineWrapping: false,
        tabSize: 4,
        styleSelectedText: true,
        matchBrackets: true,
        showCursorWhenSelecting: !this.isReadOnly,
        lineNumbers: true,
        indentUnit: 4,
        undoDepth: 200,
        viewportMargin: Infinity,
        readOnly: this.isReadOnly,
        pasteLinesPerSelection: this.isReadOnly
      }
    },
    saveBtnColor () {
      return this.isChange ? 'primary' : 'secondary'
    },
    getStrategy () {
      return this.$store.state.strategy
    }
  },
  watch: {
    getStrategy () {
      this.strategy = this.$store.state.strategy
      if (this.strategy.code !== undefined || this.strategy.code !== null) {
        this.tmpStrategyCode = String(this.strategy.code)
      } else {
        this.tmpStrategyCode = config.defaultStrategyCode
      }
      this.selectedDeployVersion()
      this.getDeployVersions(this.strategy.id)
    },
    'strategy.code' () {
      if (this.strategy.code === null) {
        this.strategy.code = config.defaultStrategyCode
      } else if (this.strategy.code !== this.tmpStrategyCode) {
        this.isChange = true
      } else {
        this.isChange = false
      }
    }
  },
  methods: {
    selectedDeployVersion () {
      if (this.$route.params.version !== undefined) {
        this.deployVersion.selected = this.$route.params.version
        this.isReadOnly = true
      } else {
        this.deployVersion.selected = 'latest'
        this.isReadOnly = false
      }
    },
    getDeployVersions (strategyId) {
      this.deployVersion.options = [{value: 'latest', text: '작업본'}]
      let url = `${config.serverHost}/${config.serverVer}/strategies/${strategyId}/versions`
      this.axios.get(url, config.getAxiosGetOptions()).then((response) => {
        response.data.forEach(strategy => {
          this.deployVersion.options.push({
            value: String(strategy.version),
            text: ('버전 ' + strategy.version + ': ' + strategy.description)
          })
        })
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    saveStrategy () {
      if (this.isReadOnly) {
        this.$vueOnToast.pop('danger', '실패', '읽기모드 입니다.')
        return
      }
      if (!this.isChange) {
        this.$vueOnToast.pop('warning', '실패', '변경사항이 없습니다.')
        return
      }
      if (this.strategy.code === null || this.strategy.code === '') {
        this.$vueOnToast.pop('error', '실패', '알고리즘을 작성하세요.')
        return
      }
      let updateStrategy = {
        code: this.strategy.code
      }
      let url = `${config.serverHost}/${config.serverVer}/strategies/${this.strategy.id}`
      this.axios.put(url, updateStrategy, config.getAxiosPutOptions()).then((response) => {
        console.log('response', response)
        this.$store.state.strategy = response.data
        this.isChange = false
        this.$vueOnToast.pop('success', '성공', '수정 완료하였습니다.')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    showReleasesModal () {
      if (this.isChange) {
        this.$vueOnToast.pop('warning', '실패', '저장 후 배포 진행하세요.')
        return
      }
      this.deploy.description = null
      this.$refs.releasesModal.show()
    },
    deployReleases () {
      if (this.isReadOnly) {
        this.$vueOnToast.pop('error', '실패', '읽기모드 입니다.')
        return
      }
      if (this.isChange) {
        this.$vueOnToast.pop('error', '실패', '저장 후 배포 진행하세요.')
        return
      }
      if (this.deploy.description === null || this.deploy.description === '') {
        this.$vueOnToast.pop('error', '실패', '배포 설명을 입력하세요.')
        return
      }
      let body = {
        description: this.deploy.description
      }
      let url = `${config.serverHost}/${config.serverVer}/strategies/${this.strategy.id}/versions`
      this.axios.post(url, body, config.getAxiosPostOptions()).then((response) => {
        this.$refs.releasesModal.hide()
        this.$vueOnToast.pop('success', '성공', '배포가 완료되었습니다.')
        this.$router.push(`/strategies/${this.strategy.id}/versions/${response.data[0].version}`)
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    changeVersion (version) {
      if (this.$route.params.version === undefined && version === 'latest') {
        this.$vueOnToast.pop('success', '변경 사항 없음', '현재 버전과 동일합니다.')
        return
      } else if (this.$route.params.version === version) {
        this.$vueOnToast.pop('success', '변경 사항 없음', '현재 버전과 동일합니다.')
        return
      }
      let path = `/strategies/${this.strategy.id}`
      if (version !== 'latest') {
        path += `/versions/${version}`
      }
      this.$router.push(path)
      this.$vueOnToast.pop('success', '성공', '버전이 변경되었습니다.')
    },
    removeStrategyVersion () {
      if (this.strategy.id === null) {
        this.$vueOnToast.pop('error', '실패', '저장 정보가 없습니다.')
        return
      }
      if (this.strategy.version === undefined || this.strategy.version === null) {
        this.$vueOnToast.pop('error', '실패', '삭제할 수 없는 버전입니다.')
        return
      }
      if (!confirm('삭제하시겠습니까?')) {
        return
      }
      let url = `${config.serverHost}/${config.serverVer}/strategies/${this.strategy.id}/versions/${this.deployVersion.selected}`
      this.axios.delete(url, config.getAxiosDeleteOptions()).then((result) => {
        this.$vueOnToast.pop('success', '성공', '버전이 삭제 완료되었습니다.')
        this.changeVersion('latest')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    },
    removeStrategy () {
      if (this.isReadOnly) {
        this.$vueOnToast.pop('error', '실패', '읽기모드 입니다.')
        return
      }
      if (this.strategy.id === null) {
        this.$vueOnToast.pop('error', '실패', '저장 정보가 없습니다.')
        return
      }
      if (!confirm('모든 버전을 삭제하시겠습니까?')) {
        return
      }
      let url = `${config.serverHost}/${config.serverVer}/strategies/${this.strategy.id}`
      this.axios.delete(url, config.getAxiosDeleteOptions()).then((result) => {
        this.$vueOnToast.pop('success', '성공', '삭제 완료되었습니다.')
        this.$router.push('/strategies')
      }).catch((e) => {
        utils.httpFailNotify(e, this)
      })
    }
  },
  beforeCreate () {},
  created () {
    this.selectedDeployVersion()
  },
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
