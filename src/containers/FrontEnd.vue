<template>
  <div>
    <link href="/static/pub/css/default.css" rel="stylesheet"/>
    <link href="/static/pub/css/layout.css" rel="stylesheet"/>
    <link href="/static/pub/css/content.css" rel="stylesheet"/>

    <!-- header -->
    <div id="header">
      <div class="wrap clearfix">
       <!-- logo -->
      <div class="logo f_left">
          <h1>
            <a href="/"><img src="/static/pub/images/logo.png" class="lg"></a>
            <a href="/"><img src="/static/pub/images/m_logo.png" class="md"></a>
           </h1>
      </div>
       <!-- // logo -->

       <!-- main_menu -->
      <div class="nav f_left">
        <ul>
          <li ref="docs">
            <a href="/docs">이용안내</a>
          </li>
          <li ref="faq">
            <a href="/faq">FAQ</a>
          </li>
        </ul>
      </div>
        <!-- // main_menu -->

        <!-- 상단 우측 utility -->
        <div class="util f_right">
          <ul class="login_off">
              <li><a href="/investment">로그인</a></li>
          </ul>
        </div>
        <!-- // 상단 우측 utility -->
    </div>

    <!-- mobile_menu -->
    <div class="mobile_nav">
      <ul class="menu_icon">
        <li class="li_01"></li>
        <li class="li_02"></li>
        <li class="li_03"></li>
      </ul>
      <ul class="menu_icon02">
        <li class="li_01"></li>
        <li class="li_02"></li>
        <li class="li_03"></li>
      </ul>
    </div>
    <!--// mobile_menu -->
    <!-- all_menu -->
    <div class="all_menu">
      <ul class="all_menu_wrap">
        <li><a href="/docs">이용안내</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/investment">로그인</a></li>
      </ul>
    </div>
    <!--// all_menu -->
    </div>
    <!--// header -->

    <router-view/>

    <!-- footer -->
    <div id="footer">
        <div class="wrap">
            <div><img src="/static/pub/images/footer_logo.png" alt=""></div>
            <div class="address">
                <p><a href="mailto:hello@systom.io">hello@systom.io</a></p>
                <p>(주)지앤클라우드 <span class="d_none">|</span>
                    <span class="add"><span>서울특별시 서초구 신반포로45길 18, 501호 </span></span></p>
                <p><span class="tel">문의: 02-508-1151&nbsp;&nbsp;&nbsp;</span>사업자등록번호: 220-88-03822 &nbsp;&nbsp;&nbsp; 대표자: 송상욱</p>
                <p><span  class="copy">SYSTOM © 2018 </span></p>
            </div>
            <div class="md">
              <ul>
                  <li><a href="/static/terms.html" target="_blank">이용약관</a></li>
                  <li><a href="/static/privacy.html" target="_blank">개인정보취급방침</a></li>
              </ul>
            </div>
        </div>
    </div>
    <!--// footer -->
  </div>
</template>

<script>

export default {
  name: 'name',
  extends: '',
  components: {},
  props: [],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    if (location.pathname.indexOf('/docs') === 0) {
      this.$refs.docs.classList.add('active')
    } else if (location.pathname.indexOf('/faq') === 0) {
      this.$refs.faq.classList.add('active')
    }
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>

<style>
</style>
