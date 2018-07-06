<template>
  <div>
    <b-dropdown text="더보기" class="m-md-2" variant="warning" right>
      <b-dropdown-item @click="showUpdateGoodsModal">편집하기</b-dropdown-item>
      <b-dropdown-item @click="removeGoods">삭제하기</b-dropdown-item>
    </b-dropdown>
    <UpdateGoodsModal :goods="tmpGoods" />
  </div>
</template>

<script>
import UpdateGoodsModal from '../modals/UpdateGoodsModal'
import config from '../../Config'
import utils from '../../Utils'

export default {
  name: 'name',
  extends: '',
  components: {
    UpdateGoodsModal
  },
  props: ['goods'],
  data () {
    return {
      tmpGoods: null
    }
  },
  computed: {},
  watch: {
    goods () {
      this.tmpGoods = Object.assign({}, this.goods)
    }
  },
  methods: {
    showUpdateGoodsModal () {
      this.$root.$emit('bv::show::modal', 'updateGoodsForm')
    },
    removeGoods () {
      if (!confirm('해당 상품을 삭제하시곘습니까?')) {
        return false
      }
      let url = `${config.serverHost}/${config.serverVer}/goods/${this.goods.id}`
      this.axios.delete(url, config.getAxiosDeleteOptions()).then((response) => {
        this.$vueOnToast.pop('success', '성공', '상품이 삭제되었습니다.')
        this.$router.replace('/investGoods')
      }).catch((e) => {
        let err = '삭제할 수 없습니다.'
        if (e.response.data.message === 'not empty') {
          err = '투자자가 있어 삭제할 수 없습니다.'
        }
        let message = {
          '400': {type: 'error', title: '실패', msg: err},
          '500': {type: 'error', title: '실패', msg: '삭제할 수 없습니다.'}
        }
        utils.httpFailNotify(e, this, message)
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

<style scoped>

</style>
