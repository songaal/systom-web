/*메인슬라이드*/
$(document).ready(function() {
 
$(".owl-carousel").owlCarousel({
    autoplay:true,
    loop:true,
    margin:0,
    navigation:true,
    transitionStyle : "fade",
    pagination : true,
    paginationNumbers: false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        430:{
            items:1
        },
        800:{
            items:1
        },
        1600:{
            items:1
        }
    }
    
    });
    
     var owl = $('.section_07 .owl-carousel'); 
        $('.section_07 .controls a.con_left').click(function() {
        owl.trigger('prev.owl.carousel');                                    
    });
    
    $('.section_07 .controls a.con_right').click(function() {
        owl.trigger('next.owl.carousel');   
    });
    
    var owl_09 = $('.section_09 .owl-carousel'); 
        $('.section_09 .controls a.con_left').click(function() {
        owl_09.trigger('prev.owl.carousel');                                    
    });
    
    $('.section_09 .controls a.con_right').click(function() {
        owl_09.trigger('next.owl.carousel');   
    });
});


  $(document).ready(function(){	      
      /*모바일 메뉴 토글 버튼*/
    $('.menu_icon').click(function() {        
        $(".menu_icon").css({display : "none"}, 300); 
        $(".menu_icon02").css({display : "block"}, 300); 
        $(".all_menu").stop().animate({left : "0px"}, 300); 
    });
    $('.menu_icon02').click(function() {
        $(".all_menu").stop().animate({left : "-100%"}, 300); 
        $(".menu_icon").css({display : "block"}, 300); 
        $(".menu_icon02").css({display : "none"}, 300); 
    });
      
        /*모바일 뷰 메뉴 노출시 마우스스크롤 방지*/
	$('.all_menu').on('scroll touchmove mousewheel', function(event) {
		  event.preventDefault();
		  event.stopPropagation();
		  return false;
		});
      });