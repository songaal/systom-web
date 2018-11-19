<template>
  <div>

    <div class="sub02 sub">

        <div class="wrap clearfix">
            <h3>자주 묻는 질문</h3>
            <ul class="faq faq01">
                <li>
                    <h4>사용료가 얼마인가요?</h4>
                    <div class="faq_Q"><img src="/static/pub/images/faq.png" alt="Q"></div>
                    <p class="txt">시스텀의 서비스는 모두 무료로 제공되고 있습니다. 다만, 투자에 참가하여 수익발생시 성공보수 수수료를 부과하고 있습니다. 만약 회원들의 수익이 없으면 시스텀도 수수료를 받지 못합니다. 그러므로, 시스텀의 목표는 회원들이 반드시 수익을 얻을 수 있는 상품을 제공하는 것입니다. 성공보수 수수료는 아래 관련답변을 참고해주세요.</p>
                </li>
                <li>
                    <h4>성공보수 수수료는 얼마인가요?</h4>
                    <div class="faq_Q"><img src="/static/pub/images/faq.png" alt="Q"></div>
                    <p class="txt">수수료는 투자시작시점의 USD가치와 투자종료시점의 USD가치의 차이가 이익일때에만 책정하며, 손해일경우 수수료는 0원입니다. 수수료율은 기본 40% 이나, 할인정책이 있어 초대한 사람이 인증회원이 되면 1명당 1%의 수수료를 최대5명까지 할인하고 있습니다. 예를들어, 초대한 5명이 모두 인증회원이 된다면 최종 35%의 수수료율을 적용받습니다. 수수료는 투자가 시작할 때가 아닌 종료하는 날의 요율을 적용합니다. 계정설정 페이지에서 나의 수수료율을 확인할수 있습니다.</p>
                </li>
                <li>
                    <h4>투자의 시작과 종료는 언제 할 수 있나요?</h4>
                    <div class="faq_Q"><img src="/static/pub/images/faq.png" alt="Q"></div>
                    <p class="txt">투자의 시작과 종료는 24시간 언제든 가능하며, 시점은 투자자가 결정합니다.<br>투자시작하기 버튼을 누르면 투자가 즉시 시작되며,<br> 투자종료를 클릭하면 투자가 종료됩니다. </p>
                </li>
            </ul>
            <ul class="faq faq02">
                <li>
                    <h4>투자상품은 어떤 전략을 사용하나요?</h4>
                    <div class="faq_Q"><img src="/static/pub/images/faq.png" alt="Q"></div>
                    <p class="txt">알고리즘은 상품마다 다를수 있기때문에, 상품페이지에 설명한 내용을 읽어보는 것이 가장 좋습니다. 그리고 전략은 공개된 것이 있는 반면, 공개할수 없는 것도 있습니다. 하지만 투자자는 상품페이지에 나와있는 수익률과 손실률, 과거 거래 이력을 바탕으로 상품의 전략을 가늠해보고 자신의 투자성향과 맞는지 판단해 볼 수 있습니다.</p>
                </li>
                <li>
                    <h4>시스텀은 안전한가요?</h4>
                    <div class="faq_Q"><img src="/static/pub/images/faq.png" alt="Q"></div>
                    <p class="txt">네, 시스텀은 뛰어난 보안성을 제공하는 AWS 클라우드위에 서비스를 구축했습니다. 또한 모든 전략과 API Key가 SHA256 으로 암호화 되어있으며, 투자상품 프로세스는 Docker를 사용하여 서로 접근이 불가능하도록 격리되어 있습니다. 그러므로 외부에서 투자상품에 악의적으로 접근하기는 불가능합니다.</p>
                </li>
                <li>
                    <h4>최소로 투자할 수 있는 금액은 얼마인가요?</h4>
                    <div class="faq_Q"><img src="/static/pub/images/faq.png" alt="Q"></div>
                    <p class="txt">최소투자금액은 USD로 100달러이며, 한화로는 10만원입니다.<br> 그 이유는 거래소마다 주문할수 있는 최소 주문금액이 있으며, 평균적으로 약 2만원으로 정해져있습니다. 시스텀은 거래시 여러개로 분할하여 매매를 진행하기 때문에, 거래소 주문 실패를 막기위해 최소 투자금액을 100달러로 제한했습니다. </p>
                </li>
            </ul>
        </div>
    </div>
    <!--// section_01 -->
    <div class="notice_00">
      <h1 class="notice_txt">더 다양한 질문은 <a href="https://blog.naver.com/systomio" target="_blank" class="f_weight f_navy">블로그</a>를 확인해주세요.</h1>
    </div>
  </div>
</template>

<script>
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
import 'owl.carousel'

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
    $('.owl-carousel').owlCarousel({
      autoplay: true,
      loop: true,
      margin: 0,
      navigation: true,
      transitionStyle: 'fade',
      pagination: true,
      paginationNumbers: false,
      responsiveClass: true,
      responsive: {0: {items: 1}, 430: {items: 1}, 800: {items: 1}, 1600: {items: 1}}
    })
    let owl = $('.section_07 .owl-carousel')
    $('.section_07 .controls a.con_left').click(() => {
      owl.trigger('prev.owl.carousel')
    })
    $('.section_07 .controls a.con_right').click(() => {
      owl.trigger('next.owl.carousel')
    })
    let owl09 = $('.section_09 .owl-carousel')
    $('.section_09 .controls a.con_left').click(() => {
      owl09.trigger('prev.owl.carousel')
    })
    $('.section_09 .controls a.con_right').click(() => {
      owl09.trigger('next.owl.carousel')
    })
    $('.menu_icon').click(() => {
      $('.menu_icon').css({display: 'none'}, 300)
      $('.menu_icon02').css({display: 'block'}, 300)
      $('.all_menu').stop().animate({left: '0px'}, 300)
    })
    $('.menu_icon02').click(() => {
      $('.all_menu').stop().animate({left: '-100%'}, 300)
      $('.menu_icon').css({display: 'block'}, 300)
      $('.menu_icon02').css({display: 'none'}, 300)
    })
    // /*모바일 뷰 메뉴 노출시 마우스스크롤 방지*/
    $('.all_menu').on('scroll touchmove mousewheel', (event) => {
      event.preventDefault()
      event.stopPropagation()
      return false
    })
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>

<style>
.border {
  border: none !important;
  border-bottom: 2px solid #fff !important;
}
</style>
