<template>
  <div>

    <div class="notice_00">
        <h1 class="notice_txt">다양한 사용방법은 <a href="https://blog.naver.com/systomio" target="_blank" class="f_weight f_navy">블로그</a>를 확인해주세요.</h1>
    </div>
    <div  class="sub01 sub">

        <div class="wrap">
            <h3>이용안내</h3>
        </div>

        <ul>
            <li class="use_list01 use_list clearfix">
               <div class="wrap">
                    <div class="num">1</div>
                    <p class="use_txt">
                        <span>투자상품에서</span>
                        <span class="br"><span class="f_weight f_yellow">선호하는 코인을 선택</span><span>합니다.</span> </span>
                    </p>
                </div>
            </li>
            <li class="use_list02 use_list">
              <div class="use_list02_inner">
               <div class="wrap">
                    <div class="num">2</div>
                    <p class="use_txt">
                        <span class="f_weight f_yellow">투자하기 버튼을</span> <span class="sub_br"><span class="f_weight f_yellow">클릭</span><span>합니다.</span></span>
                    </p>
                </div>
                </div>
            </li>
            <li class="use_list03 use_list clearfix">
               <div class="wrap">
                    <div class="num">3</div>
                    <p class="use_txt">
                        <span class="f_weight f_yellow">투자유형 선택</span>
                        <span class="br">모의투자는 실제투자금을 사용하지 않고,</span>
                        <span class="br">가상으로 매매하는 방법입니다.</span>
                        <span class="br">실제투자금으로 진행하려면 <span class="sub_br04">실전투자를 클릭합니다.</span></span>
                    </p>
                    <div class="box_wrap">
                        <span class="orange_box"><span class="br">실전투자는 SMS사용자 인증이 된 ‘<span class="f_weight">인증사용자</span>’만 사용가능하니</span>
                        <span class="br">계정설정 페이지에서 먼저 사용자인증을 받아야 합니다.</span></span>
                    </div>
                </div>
            </li>
            <li class="use_list04 use_list">
               <div class="wrap">
                    <div class="num">4</div>
                    <p class="use_txt">
                        <span class="f_weight f_yellow">투자금액 입력</span>
                        <span class="br">USD 달러기반으로   <span class="sub_br04">금액을 입력합니다.</span></span>
                        <span class="br">입력 금액은 <span class="sub_br04">거래소 잔고보다 적어야 합니다.</span> </span>
                        <span class="br">모두 입력했으면 다음으로 이동합니다.</span>
                    </p>
                </div>
            </li>
            <li class="use_list05 use_list clearfix">
               <div class="wrap">
                    <div class="num">5</div>
                    <p class="use_txt">
                        내용을 최종확인하고
                        <span class="br"><span class="f_weight f_navy ">'투자시작'</span><span>버튼을 눌러 완료합니다.</span>  </span>

                    </p>
                </div>
            </li>
        </ul>
        <div class="notice_01">
            <h1 class="notice_txt">더 다양한 사용방법은 <a href="https://blog.naver.com/systomio" target="_blank" class="f_weight f_navy">블로그</a>를 확인해주세요.</h1>
        </div>

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
