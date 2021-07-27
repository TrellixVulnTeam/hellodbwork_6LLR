$( document ).ready(function() {
    'use strict';
    var agent = navigator.userAgent.toLowerCase(),
        name = navigator.appName,
        browser;
    if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
        browser = 'ie';
        $("body").addClass("msie");
        if(name === 'Microsoft Internet Explorer') {
            agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
            browser += parseInt(agent[1]);
        } else {
            if(agent.indexOf('trident') > -1) {
                browser += 11;
            } else if(agent.indexOf('edge/') > -1) {
                browser = 'edge';
            }
        }
    } else if(agent.indexOf('safari') > -1) {
        if(agent.indexOf('opr') > -1) {
            browser = 'opera';
        } else if(agent.indexOf('chrome') > -1) {
            browser = 'chrome';
        } else {
            browser = 'safari';
        }
    } else if(agent.indexOf('firefox') > -1) {
        browser = 'firefox';
    }
    document.getElementsByTagName('html')[0].className = browser;
});

/* default */
var $winW = $(window).width();
var $winH = $(window).height();
var scrollTop = $(window).scrollTop();
var _headerTop = $('.w_header').innerHeight();
var _headerHeight = $('#header').innerHeight();
var _footerHeight = $('#footer').innerHeight();
var _mheaderHeight = $('.m_header').innerHeight();
var _fixHeaderY = _headerTop;
var isFix = false;
if (scrollTop > _fixHeaderY + 100) {
	isFix = true;
	$("#wrap").addClass('fixed');
}
var filter = "win16|win32|win64|mac|macintel";
$( document ).ready(function() {
	$('select').selectric();//selectric
	if($("map").length > 0 ) {
		$('img[usemap]').rwdImageMaps(); //모바일 이미지 리사이징 rwdImageMaps.min.js 연동
	};
	if ( navigator.platform  ) {
		if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
			$('body').addClass('m_layer');//모바일
			if ($("div").is(".fix_mmBox")){
				$("#container").css("padding-bottom","75px")
			}
		} else {
			$('body').addClass('w_layer');//웹	
		}
	};
	var content_min_wh = $winH - _headerHeight - _footerHeight;
	var content_min_mh = $winH - _footerHeight;
	if($winW > 1024 ){
		$("#container").css("min-height",content_min_wh);
	}
	if($winW <= 1024 ){
		//$("#container").css("min-height",content_min_mh);
	}
	
	if($winW > 1024) {
		$('head').append('<link rel="stylesheet" href="'+ GLOBAL_CSS_URL +'es_hover.css" type="text/css" />');
	}
});

/* fixedHeader */
$(window).scroll(function(){
	scrollTop = $(window).scrollTop();
	if ( scrollTop > _fixHeaderY + 50  ) {
		if(!isFix){
			$("#wrap").addClass('fixed');
			isFix = true;
		}
	} else {
		if(isFix){
			$("#wrap").removeClass('fixed');
			isFix = false;
		}
	}
});

/* header ui */
$(function(){
	//웹 메뉴
	$(".btn_lang").on("click",function(){
		$(this).toggleClass("on");
		if ($(this).hasClass('on')) {
			$(".lang_select").show()
		} else{
			$(".lang_select").hide()
		}
	});
	$(".menu a").on("mouseenter",function(){
		$(this).parents(".menu").addClass("on");
		if($(this).parent(".menu").find('div').hasClass("detph2")){
			$('.nav_box').show();
		}
	});
	$(".menu").on("mouseleave",function(){
		$(this).removeClass("on");
		$('.nav_box').css('display','none');
	});
	//모바일 메뉴
	var $rmenu = $('nav#menu-lnb');
  $rmenu.mmenu({
		classes         : 'mm-fullscreen', //풀화면
		iconPanels : true,
		slidingSubmenus: false,
		hooks: {
	      "openPanel:start": function( $panel ) {
	         console.log( "This panel is now opening: #" + $panel.attr( "id" ) );
	      },
	      "openPanel:finish": function( $panel ) {
	         console.log( "This panel is now opening: #" + $panel.attr( "id" ) );
	      }
	   }
  });
  var API = $("nav#menu-lnb").data( "mmenu" );
  $(".nav_close").click(function() {
    API.close();
  });
  $(".mm-list li.depth1 a").click(function() {
    $(this).toggleClass("act");
    if ($(this).hasClass("act")) {
			$(this).parent(".depth1").find(".m_depth2").stop().slideDown('fast');
		} else{
			$(this).parent(".depth1").find(".m_depth2").stop().slideUp('fast');
		}
  });
});

//모달레이어팝업
function lock_touch(e){
    e.preventDefault();
}
function modalPopup(target){
	
	rember_sc = $(window).scrollTop();
	$('.modal-content').css("marginTop", 0);
	var $modalContent = $(target).find($('.modal-content'));
	$(target).css({'overflow': 'auto'}).show().addClass('open');
	$(target).focus();
	var $modalContentH = $(target).find($('.modal-content')).outerHeight();
	var $conPos = ($winH / 2) - ($modalContentH / 2);
	if($("body").hasClass("m_layer")){
		$('#wrap').css({'overflow' : 'hidden','height' : $winH});
	} else{
		$('html').css({'overflow' : 'hidden','height' : $winH});
	}
	
	if( $winH > $modalContentH ){
		$modalContent.css({marginTop: $conPos});
	} else {
		$modalContent.css({marginTop: 0});
	}
	$("<div class='overlay'></div>").appendTo('#wrap');
	return false;
};

//모달레이어팝업닫기
function modalPopupClose(target){
    //document.removeEventListener('touchmove', lock_touch);
	if (document.removeEventListener) {
		document.removeEventListener('touchmove', lock_touch);
	}
	else {
		document.detachEvent('touchmove', lock_touch);
	}
	$(target).find($('.modal-content')).css('margin-top',0);
	$(target).hide().removeClass('open');
	$(".overlay").remove();
	if($("body").hasClass("m_layer")){
		$('#wrap').css({'overflow' : 'auto','height' : 'auto'});
	} else{
		$('html').css({'overflow' : 'auto','height' : 'auto'});
	}
	
	$('html, body').scrollTop(rember_sc);
};

//mCustomScrollbar S
function mCScroll(){
	$(window).on("load",function(){
		if ($('body').hasClass('w_layer')) {
			$("body").find(".mCSc , .selectric-scroll").mCustomScrollbar({
				mouseWheelPixels: 150, //스크롤 속도
				advanced:{
					updateOnBrowserResize:true,
					updateOnContentResize:true,
					zIndexBoost:false,
					onDragStart:function() {
						// to avoid any conflicts in drag animations
						container.mCustomScrollbar("stop");
					},
					callbacks:{
		        whileScrolling:function(){
		          $(this).parents(".selectric-wrapper").addClass("selectric-open")
		        }
	    	  },
				}
			})
		} else{
			$(".mCSc").css("overflow-y","auto")
		}
	})
};mCScroll();
function mCScroll_x(){
	$(window).on("load",function(){
		if ($('body').hasClass('w_layer')) {
	  $(".mCSb_x").mCustomScrollbar({
	      axis:"x",
	      advanced:{
	      	updateOnBrowserResize:true,
					updateOnContentResize:true,
					zIndexBoost:true,
					autoExpandHorizontalScroll:true,
						onDragStart:function() {
						// to avoid any conflicts in drag animations
						container.mCustomScrollbar("stop");
					},
	      }
      });
		} else{
			$(".mCSb_x").css("overflow-x","auto")
		}
	});
};mCScroll_x();
//mCustomScrollbar E

/* btn_top */
$(window).scroll(function(){
	if ($("div").hasClass("btn_top")) {
		var srlTop  = $(this).scrollTop();
		var btn_offset = $(".btn_top").offset().top;
		var srl_wh = $(window).height();
		if( srlTop > 800 ){
				$(".btn_top ul").css("display","block");
				if ($winW > 1024) {
					if ($(".fix_scrollWeb").css('bottom') == '0px') {
						$(".btn_top ul").addClass("fixbar")
					} else{
						$(".btn_top ul").removeClass("fixbar")
					}
				} else{
					if ($("div").hasClass("fix_Bottom")) {
						$(".btn_top ul").addClass("fixbar")
					}
				}
			}else{
				$(".btn_top ul").hide();
		}
		if ((srlTop + srl_wh) >= btn_offset) {
			$(".btn_top").addClass("stop");
		} else{
			$(".btn_top").removeClass("stop");
		}
	}
});
$(document).ready(function() {
	var speed = 200; // 스크롤속도
	$(".es_top").on("click touch",function(){
	    $('body, html').stop().animate({scrollTop:0}, speed);
	});
});

// 달력
function date_sch() {
	$(document).ready(function() {
		$('.month li a').bind('click',function ()  {
			event.preventDefault();
			$('.month').find('li').removeClass('act');
			$(this).parents("li").addClass('act');
		});
		if ($('body').hasClass("w_layer")){ //PC 달력
			$( "#start_day, #finish_day" ).datepicker({
				dateFormat: 'yy.mm.dd ',
				prevText: '이전 달',
				nextText: '다음 달',
				monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
				monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
				//dayNames: ['일','월','화','수','목','금','토'],
				//dayNamesShort: ['일','월','화','수','목','금','토'],
				//dayNamesMin: ['일','월','화','수','목','금','토'],
				showMonthAfterYear: true,
				changeMonth: true,
				changeYear: true
			});
		}else{ //모바일 달력
			$(".day_sch").find("input").prop('type', 'date');
		};
	});
}date_sch();

//상세센터 상품 SLIDER S
	function shop_mainSL(){
		$('.shop_pdCenter > ul').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			draggable: false,
			dots: true,
			arrows: false,
			autoplay: true,
			adaptiveHeight: true,
		});
	}shop_mainSL();
//상세센터 상품 SLIDER E
//상품상세 우측 color chip UI S
	function shop_chipSL(){
		var $winW = $(window).width();
		var lis = $(".chip_box li dl dd");
		if($winW <= 640 ){
		  for(var i = 0; i < lis.length; i+=12) {
		    lis.slice(i, i+12).wrapAll("<div class='list_mh'></div>");
		  }
		} else{
			for(var i = 0; i < lis.length; i+=18) {
		    lis.slice(i, i+18).wrapAll("<div class='list_mh'></div>");
		  }
		}
		$('.chip_box > ul dl').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			draggable: true,
			dots: false,
			arrows: true,
			autoplay: false,
			prevArrow :".chip_prev",
	 		nextArrow :".chip_next",
	 		responsive: [
				{
					breakpoint: 1024,
					settings: "unslick"
				}
			]
		});
	}shop_chipSL();

	function mt_btn(){
		$(".chip_opbox li button").bind('click', function () {
			$(this).toggleClass("on");
			if ($(this).hasClass("on")) {
				if ($(".chip_opbox li button").is('.on')) {
					$(".chip_opbox li button").removeClass("on");
					$(this).addClass('on');
				};
				$(this).addClass('on');
			} else {
				$(this).removeClass('on');
			};
		});
		$(".btn_Cmore").bind('click', function () {
				$(".pd_m").stop().fadeTo( "fast", 0 ).slideUp('fast');
				$(".shop_topArea").addClass("view");
				$('.chip_opbox > ul dl').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: false,
					draggable: true,
					dots: false,
					arrows: true,
					autoplay: false,
					prevArrow :".chip_prev",
			 		nextArrow :".chip_next",
				});
		});
		$(".btn_Cmore_close").bind('click', function () {
				$(".pd_m").stop().fadeTo( "slow", 1 ).slideDown('fast');
				$(".shop_topArea").removeClass("view");
				$('.chip_opbox > ul dl').slick('unslick');
		});
		if ($(".mt_btn button").prop("disabled") == true){ //품절일때
			var btn_dis = $(".mt_btn").find('button:disabled');
			$(btn_dis).parents("dl").addClass("dis");
		};
		$(".mt_btn button").click(function(){
			if($(this).parents(".mt_select").find(".mt_list").is(":visible")){
				$(this).parents(".mt_select").find(".mt_list").hide();
				$(this).parents(".mt_select").removeClass("act");
			} else{
				$(".mt_select").removeClass("act");
				$(".mt_select").find(".mt_list").hide();
				$(this).parents(".mt_select").find(".mt_list").show();
				$(this).parents(".mt_select").addClass("act")
			}
		});
		$(".mt_list button").on('click',function(){
			var this_box = $(this).parents(".mt_select");
			var select_color = $(this).find('span').css('background');
			var select_text = $(this).text();
			var	isMt_select = $(this).parents(".mt_select");
			$(this).addClass("select");
			if($(this).addClass("select")) {
				if ($(this).parents(".pd_select").hasClass("noFix")) {
					isMt_select.find(".mt_list").hide();
					this_box.removeClass("act");
				} else{
					this_box.find(".mt_btn button").html("<span></span><p></p>");
					var select_view = this_box.find(".mt_btn button").find("span");
					var select_button = this_box.find(".mt_btn button").find("p");
					select_view.css('background',select_color);
					select_button.text(select_text);
					isMt_select.find(".mt_list").hide();
					this_box.removeClass("act");
				}
			}
		});
	}mt_btn();
//상품상세 우측 color chip UI E
//pd_ggImg 상품상세
function ggImg_UI(){
	var pd_ggImg_ea = $(".pd_ggImg li").length;
	if (pd_ggImg_ea <= 1) { //하나일때만
		$(".pd_ggImg li").removeClass().addClass("only_one")
	}

}ggImg_UI();

//상품상세 Web 하단 fix UI S
function sW_listBox(){
	/* fixedHeader */
	if ($("div").is(".fix_scrollWeb")) {
		$(window).scroll(function(){
			var fix_web = $("#shop_topLayer").height();
			if ( scrollTop > fix_web + 50 ) {
				$(".fix_scrollWeb").stop().animate({bottom:'0'},100);
				$("#footer").css("padding-bottom","135px")
				$(".btn_top button").addClass("fixbar")
			} else {
				$(".fix_scrollWeb").stop().animate({bottom:'-120px'},100)
				$(".sW_listBox").removeClass("view");
				$(".btn_sWList").removeClass("on");
				$(".btn_top button").removeClass("fixbar")
			}
		});
	}
	$(".btn_sWList").bind('click', function () {
		$(this).toggleClass("on");
		if ($(this).hasClass("on")) {
			$('.sW_listBox').addClass('view');
		} else {
			$('.sW_listBox').removeClass('view');
		};
	});

	if ($("div").is(".fix_scrollWeb.es_sW2")) {
		$(window).scroll(function(){
			var fix_web = $("#shop_topLayer").height();
			if ( scrollTop > fix_web + 50 ) {
				$(".fix_scrollWeb.es_sW2").stop().animate({bottom:'100px'},100);
				$("#footer").css("padding-bottom","135px")
				$(".btn_top button").addClass("fixbar")
			} else {
				$(".fix_scrollWeb").stop().animate({bottom:'-120px'},100)
				$(".sW_listBox").removeClass("view");
				$(".btn_sWList").removeClass("on");
				$(".btn_top button").removeClass("fixbar")
			}
		});
	}
}sW_listBox();
//상품상세 Web 하단 fix UI E

//fx_buy 상세 모바일 하단 UI S
	$(".fx_buy").on('click',function(){
		$(".fix_mmBox").addClass("open")
	});
	$(".mmClose button").on('click',function(){
		$(".fix_mmBox").removeClass("open")
	});
//fx_buy 상세 모바일 하단 UI E

//상세 옵션선택 팝업 UI S
	/*optSetPopup.js로 옮기면서 주석처리
	 * function op_tab() {
		$('.optab_slBox > ul').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			draggable: true,
			dots: true,
			arrows: false,
			autoplay: true,
		});
		var $winW = $(window).width();
		var lis = $(".opstep_sl li dl dd");
		if($winW <= 640 ){
			$(".op_tabArea").removeClass("vis_hide").addClass("vis_show"); //모바일일때 web ui 리셋
			$(".op_Cbtn a").bind('click', function () {
				$(".op_changeLayer").removeClass("act");
				$(this).parents('dl').addClass("act");
			});
		  for(var i = 0; i < lis.length; i+=12) {
		    lis.slice(i, i+12).wrapAll("<div class='list_mh'></div>");
		  }
		} else{
			$('.op_tab > li > a').bind('click focusin',function (){});
				$('.op_tab > li').each(function(i){this.i=i}).click(function(){
				var idx = $(this).index();
				$(".op_tab li").removeClass('act');
				$(".op_tabArea").removeClass("vis_show").addClass("vis_hide");
				$(".op_tabArea:eq("+idx+")").removeClass("vis_hide").addClass("vis_show");
				$(this).addClass('act');
			});
			for(var i = 0; i < lis.length; i+=18) {
		    lis.slice(i, i+18).wrapAll("<div class='list_mh'></div>");
		  }
		}
		$('.opstep_sl > ul dl').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			draggable: true,
			dots: false,
			arrows: true,
			autoplay: false,
			prevArrow :".chipOp_prev",
	 		nextArrow :".chipOp_next",
	 		responsive: [
				{
					breakpoint: 768,
				}
			]
		});
	}op_tab();

	function modal_op(){ //옵션선택 팝업 오픈
		modalPopup('.modal_Opstep');
		$('.optab_slBox > ul').slick('destroy'); //상품 sl destroy
		$('.opstep_sl > ul dl').slick('destroy'); //칼라칩 sl destroy
		op_tab(); //칼라칩 sl ui 재구성
	}

	function modal_opClose(){ //옵션선택 팝업 닫기
		$('.optab_slBox > ul').slick('destroy'); //상품 sl destroy
		$('.opstep_sl > ul dl').slick('destroy'); //칼라칩 sl destroy
		modalPopupClose('.modal_Opstep');return false;
	}*/
//상세 옵션선택 팝업 UI E

function filter_click() { //리스트 필터
	$(".filter_btn").click(function() {
		$(this).toggleClass('act');
	  if($(this).hasClass("act")){
			$('.filter_area').stop().slideDown();
			$(".filter_btn").find('button').text("필터숨기기");
			if($winW <= 768 ){
				$(".chk_state").show();
			}
		}else{
			$(".filter_btn").find('button').text("필터");
		  $('.filter_area').stop().slideUp();
		  if($winW <= 768 ){
				$(".chk_state").hide();
			}
		}
	});
	if($winW <= 768 ){
  	$(".radio_area dt").click(function() {
			$(this).toggleClass("off");
		  if($(this).hasClass("off")){
		  	$(this).parent("dl").find("dd").stop().slideUp();
			}else{
				$(this).parent("dl").find("dd").stop().slideDown();
			}
		});
	}
};filter_click();

function btn_dep() { //리스트 2dep
	$(".btn_dep").click(function() {
		$(".btn_dep").toggleClass('act');
	  if($(this).hasClass("act")){
			$(".select_dep ul").stop().slideDown("fast");
		} else{
			$(".select_dep ul").stop().slideUp("fast");
		}
	});
	$(".select_dep ul").find("a").click(function() {
		var check_this = $(this).text();
		var	ctg_tit = $(".btn_dep");
		$(".select_dep ul li").removeClass("on");
		$(this).parent("li").addClass("on");
	  if($(this).parent("li").hasClass("on")){
			$(".select_dep ul").stop().slideUp("fast");
			$(".btn_dep").removeClass('act');
			ctg_tit.text(check_this);
		}
	});
};btn_dep();

// 리뷰 masonry(640 해상도 이하는 사용 안됨)
function review_list(){ 
	if($winW >= 640){
		$(function(){
			$(".review_list").masonry({
			  itemSelector: ".review_box",
			  percentPosition: true,
			});
		});
	} else{

	}
};review_list();

function motb_cover(){ //상품 상세 및 MOTB UI
	$(".today_Title button").bind('click', function () {
		var this_box = $(this).parents(".motb_cover");
		var motb_off = this_box.offset();
		this_box.addClass("open");
		$(this_box).find(".today_Title").hide();
		$(this_box).find(".today_open").fadeIn();
		$(this_box).find(".recom_item_area").fadeIn();
		$('body, html').animate({scrollTop:motb_off.top - 100 + "px"}, 300);
	});
	$(".cover_close").bind('click', function () {
		var this_box = $(this).parents(".motb_cover");
		var motb_off = this_box.offset();
		this_box.removeClass("open");
		$(this_box).find(".today_open").hide();
		$(this_box).find(".today_Title").fadeIn();
		$(this_box).find(".recom_item_area").fadeOut();
		$('body, html').animate({scrollTop:motb_off.top - 150 + "px"}, 300);
	});
};motb_cover();

function infoView_dl(){ //상품상세 정보
	$(".infoView").bind('click', function () {
		var this_aco = $(this).parents("li");
			this_aco.toggleClass("on");
			if (this_aco.hasClass("on")) {
				if (this_aco.is('.on')) {
					$(".shop_information > ul > li").removeClass("on");
					this_aco.addClass('on');
				};
				this_aco.addClass('on');
			} else {
				this_aco.removeClass('on');
			};
		});
};infoView_dl();



//html 경우만 작동 하는 퍼블리셔용 js 개발에서 해당 기능 가져가시면 하단에 넣어주세요 퍼블은 화면 UI 동작에 필요합니다
if (!!~location.href.indexOf('.html')) {
	//테마에 대한 폰트 및 스타일 변경
	$(".jh_thema button").on('click',function(){
		 var this_color = $(this).attr('class');
		 $("#shop_topLayer").removeClass();
		 $("#shop_topLayer").addClass(this_color);
		 if ($("#shop_topLayer").is('.tmH_black, .tmH_navy, .tmH_chocolate, .tmH_burgundy, .tmH_wine')){
		 	 $("#shop_topLayer").addClass("ft_w")
		 }
	});

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// $(document).ready(function() {
// 	 $("input[type='checkbox']").jgeeseInput();
//     $("input[type='radio']").jgeeseInput();
//   });

//리스트 페이지 헤더3depth
// function mhead_select() {
// 	if($winH <= 1024 ){
// 		if($(".m_header").find("div").hasClass("m_header_move")){
// 			$(".m_header").addClass("add_sel")
// 		};
// 		$(".slt_tit").bind('click',function ()  {
// 			$(this).toggleClass("on");
// 			if ($(".slt_tit").hasClass("on")) {
// 				$(".list_move").stop().slideDown();
// 				$("<div class='mt_over'></div>").appendTo('#wrap');
// 				$("#content").bind('touchmove', lock_touch);
// 			} else{
// 				$(".list_move").stop().slideUp();
// 				$(".mt_over").remove();
// 				$("#content").unbind('touchmove', lock_touch);
// 			}
// 		});
// 	} else{
// 		$(".m_header").removeClass("add_sel")
// 	}
// };mhead_select()

//모바일 리사이즈
// function m_hdResize() {
// $( document ).ready(function() {
// 	 resizeEventCall();
// 	 if ($(".topBanner").css('display') !== 'none') {
// 	 	if($winH <= 1024 ){
// 	 		$("#content").css("padding-Top", _headerHeight + "px");
// 	 	}else{
// 	 		$("#content").css("padding-Top", "0");
// 	 	}
// 	 }else{
// 		 if($winH <= 1024 ){
// 	 		$("#content").css("padding-Top", _headerHeight + "px");
// 	 	}else{
// 		 	$("#content").css("padding-Top", "0");
// 	 	}
// 	 }
// });
// }m_hdResize();



// /* 메인 슬라이드 */
// function main_visual_sl() {
// 	/* main_visual slide */
// 	$('.main_visual').find('.slider').slick({
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		infinite: false,
// 		draggable: false,
// 		dots: false,
// 		prevArrow :".mv_prev",
// 		nextArrow :".mv_next",
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: {
// 					arrows: false,
// 					draggable: true,
// 					infinite: true,
// 					dots: true,
// 					arrows: false,
// 				}
// 			}
// 		]
// 	});

// 	$('.main_visual .slider').on("setPosition", function (){
// 		if($winW < 1024){
// 			$(".main_visual .slide").each(function(index){
// 				var moUrl = $(this).attr('data-src-mo');
// 				$(this).css('background', 'url('+moUrl+') no-repeat center');
// 			})
// 		} else {
// 			$(".main_visual .slide").each(function(index){
// 				var webUrl = $(this).attr('data-src-w');
// 				$(this).css('background', 'url('+webUrl+') no-repeat center');
// 			})
// 		}
// 	});
// };main_visual_sl();

// /* trendingNow slide */
// function trendingNow_sl() {
// 	$('.trendingNow').find('.product_list > ul').slick({
// 		slidesToShow: 4,
// 		slidesToScroll: 4,
// 		infinite: false,
// 		draggable: false,
// 		dots: false,
// 		arrows: true,
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: "unslick"
// 			}
// 		]
// 	});
// };trendingNow_sl()
// function weeklyBrand_sl() {
// 	$('.weeklyBrand').find('.product_list > ul').slick({
// 		slidesToShow: 4,
// 		slidesToScroll: 4,
// 		infinite: false,
// 		draggable: false,
// 		dots: false,
// 		arrows: true,
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: "unslick"
// 			}
// 		]
// 	});
// };weeklyBrand_sl()
// /* tab_sLsW 슬라이드 */
// function tab_sLsW() {
// 	resizeEventCall();
// 	$('.tab_sLsW').find('.slider').slick({
// 		slidesToShow: 7,
// 		slidesToScroll: 7,
// 		infinite: false,
// 		draggable: false,
// 		dots: false,
// 		arrows: true,
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: "unslick"
// 			}
// 		]
// 	});
// 	$('.tab_sLsW li a').bind('click',function ()  {
// 		event.preventDefault();
// 		$('.tab_sLsW').find('li').removeClass('act');
// 		$(this).parents("li").addClass('act');
// 	});
// };
// tab_sLsW();

// /* yMAL_SL 제품 슬라이드 */
// function yMAL_SL() {
// 	/* main_visual slide */
// 	$('.yMAL').find('.product_list > ul').slick({
// 		slidesToShow: 4,
// 		slidesToScroll: 4,
// 		infinite: false,
// 		draggable: true,
// 		dots: false,
// 		arrows: true,
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: "unslick"
// 			}
// 		]
// 	});
// };
// yMAL_SL();

// /* bestBSL 제품 슬라이드 */
// function bestBSL() {
// 	/* main_visual slide */
// 	$('.bestB').find('.slider').slick({
// 		slidesToShow: 3,
// 		slidesToScroll: 3,
// 		infinite: false,
// 		draggable: false,
// 		dots: false,
// 		arrows: false,
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: {
// 					slidesToShow: 1,
// 					slidesToScroll: 1,
// 					infinite: false,
// 					draggable: true,
// 					dots: true,
// 					arrows: false,
// 				}
// 			}
// 		]
// 	});
// };
// bestBSL();

// /* nav_side_banner 슬라이드 */
// function navbannerSl() {
// 	/* main_visual slide */
// 	$('.nav_side_banner').find('.slider').slick({
// 		infinite: true,
// 		draggable: true,
// 		dots: false,
// 		arrows: false,
// 		autoplay: true,
//   		autoplaySpeed: 2000,
// 	});
// };
// navbannerSl();


// /* quick shop */
// function quick_shop() {
// 	modalPopup('.modal_shop');
// 	$('.qs_img').slick({
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		arrows: false,
// 		fade: true,
// 		asNavFor: '.qs_nav',
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: {
// 					slidesToShow: 1,
// 					slidesToScroll: 1,
// 					infinite: false,
// 					draggable: true,
// 					dots: true,
// 					arrows: false,
// 				}
// 			}
// 		]
// 	});
// 	$('.qs_nav').slick({
// 		arrows: true,
// 		slidesToShow: 4,
// 		slidesToScroll: 1,
// 		asNavFor: '.qs_img',
// 		dots: false,
// 		centerMode: false,
// 		focusOnSelect: true,
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: "unslick"
// 			}
// 		]
// 	});
// 	if ($("ul").hasClass("qs_nav")) {
// 			$(".quick_info").css("min-height","400px")
// 		}
// }

// function see_more() {
// 	var totalResult = 0;
// 	var color_ul_w = $('.color_area > ul').width();
// 	var color_li_e = $('.color_area > ul li');
// 	color_li_e.each(function(){
// 		totalResult = totalResult + $(this).width();
// 		if (color_ul_w < totalResult) {
// 			$(".see_more").show();
// 			$(".quick_info .color_area").css("padding-bottom","25px")
// 		} else{
// 			$(".see_more").hide();
// 			$(".quick_info .color_area").css("padding-bottom","0");
// 			$(".detail_info .quick_info .color_area ul").css("height","auto")
// 		};
// 	 });
// 	$(".see_more").bind('click',function ()  {
// 	event.preventDefault();
// 	$(this).toggleClass("on");
// 			if ($(".see_more").hasClass("on")) {
// 				$(this).parents().find(".color_area > ul").addClass("show");
// 			} else{
// 				$(this).parents().find(".color_area > ul").removeClass("show");
// 			}
// 		});
// };see_more();

// /* btn_filter */
// function btn_filter() {
// 	$(".btn_filter").bind('click',function ()  {
// 		event.preventDefault();
// 		$(this).toggleClass("on");
// 		if ($(".btn_filter").hasClass("on")) {
// 			$(".filter_ul ").show()
// 		} else{
// 			$(".filter_ul ").hide()
// 		}
// 	});
// };
// btn_filter();

// /* m_line */
// function m_line() {
// $(".m_line").bind('click',function ()  {
// 	event.preventDefault();
// 	$(this).toggleClass("on");
// 		if ($(".m_line").hasClass("on")) {
// 			$(".product_list ").addClass("m_tran")
// 		} else{
// 			$(".product_list ").removeClass("m_tran")
// 		}
// 	});
// };
// m_line();

// /* header 장바구니 w용 */
// function head_smlbag() {
// $(".head_smlbag").bind('click',function ()  {
// 	event.preventDefault();
// 	$(this).toggleClass("on");
// 		if ($(".head_smlbag").hasClass("on")) {
// 			$(".smlBag ").show();
// 		} else{
// 			$(".smlBag ").hide();
// 		}
// 	});
// };
// head_smlbag();

// /* header 검색 w용 */
// function head_sch() {
// 	$(".head_sch").bind('click',function ()  {
// 		$(".nav_inner ").addClass("leaveNot");//헤더 서치시 nav 마우스 hover 방지
// 		$(".w_sch_area ").stop().slideDown();
// 	});
// 	$(".w_sch_area .sch_close").bind('click',function ()  {
// 		$(".nav_inner ").removeClass("leaveNot");
// 		$(".w_sch_area ").stop().slideUp('fast');
// 	});
// 	$(".m_ico_sch").bind('click',function ()  {
// 		$(".m_sch_area ").show()
// 	});
// 	$(".m_sch_area .sch_close").bind('click',function ()  {
// 		$(".m_sch_area ").hide();
// 	});
// };
// head_sch();

// /* m_line */
// function m_ft() {
// 	$(".m_ft").bind('click',function ()  {
// 		event.preventDefault();
// 		$(".m_ft_pop ").show();
// 	});
// 	$(".m_filter_close").bind('click',function ()  {
// 		event.preventDefault();
// 		$(".m_ft_pop ").hide();
// 	});
// 	$(".btn_same").bind('click',function ()  {
// 		event.preventDefault();
// 		$(this).toggleClass("on");
// 		if ($(this).hasClass("on")) {
// 			$(this).parents("dl").find("dd").slideDown();
// 		}else{
// 			$(this).parents("dl").find("dd").slideUp();
// 		}
// 	})
// };
// m_ft();

// //상세 w:tab m:aco
// $('.detail_tab dl dt').click(function() {
// 	resizeEventCall();
// 	if($winH >= 1024 ){
// 		if($(this).hasClass('act') != true){
// 			$('.detail_tab dl dt').removeClass('act');
// 			$('.detail_tab dl dd').hide();
// 			$(this).addClass('act');
// 			$(this).next('dd').show();
// 		}
// 	}
// 	if($winH < 1024 ){
// 		$('.detail_tab dl dt').removeClass('act');
// 		if($(this).hasClass('opened') == true){
// 			$(this).next('dd').slideUp();
// 			$(this).removeClass('opened');
// 		}else{
// 			$(this).next('dd').slideDown();
// 			$(this).addClass('opened');
// 		}
// 	}
// });

// //제품 상세 addtobag 픽스
// function fix_addBag() {
// 	resizeEventCall();
// 	$(window).scroll(function(){
// 		if($winH < 1024 ){
// 			var scrollTop = $(window).scrollTop();
// 			var $detail_h = $(".pd_detail").height();
// 			var $m_fix_bottom = $(".detail_info_bottom").height();
// 			var $footer_h = $("#footer").offset().top;
// 			if ( scrollTop > $detail_h - $m_fix_bottom ) {
// 				if ( $winH + scrollTop >=  $footer_h ) {
// 					$(".scr_fix").removeClass("fixed_m").addClass("fixed_h");
// 					$("#content").css({
// 						position : 'relative',
// 						paddingBottom : '66px'
// 					});
// 					// $(".scr_fix").css({
// 					// 	position : 'absolute',
// 					// 	bottom : '0',
// 					// 	width : '100%'
// 					// });
// 					// $(".scr_fix").find("button").css({
// 					// 	position : 'absolute',
// 					// 	bottom : '0',
// 					// 	top: 'inherit'
// 					// });
// 				} else{
// 					$(".scr_fix").removeClass("fixed_h").addClass("fixed_m")
// 				}
// 			} else{
// 				$(".scr_fix").removeClass("fixed_m").removeClass("fixed_h");
// 				// $(".scr_fix").find("button").css({
// 				// 	position : 'absolute',
// 				// 	bottom : 'inherit',
// 				// 	top: '0'
// 				// })
// 			};
// 		} else{
// 			$(".scr_fix").removeClass("fixed_m").removeClass("fixed_h");
// 			// $(".scr_fix").find("button").css({
// 			// 	position : 'absolute',
// 			// 	bottom : 'inherit',
// 			// 	top: '0'
// 			// })
// 		}
// 	});
// 	$("#itemInfo").find(".tiT").bind('click',function ()  {
// 		$("#itemInfo").toggleClass("on");
// 		if ($("#itemInfo").hasClass("on")) {
// 			$("#itemInfo").find("table").show();
// 		}else{
// 			$("#itemInfo").find("table").hide();
// 		}
// 	});
// };fix_addBag()

// /*function fix_btn() {
// 	if($winH < 1024 ){
// 		if($("button").hasClass("btn_checkOut")){
// 			$("#wrap").css("padding-bottom","50px")
// 		};
// 	} else{
// 		$("#wrap").css("padding-bottom","0")
// 	}
// };fix_btn()*/
// $( window ).on( 'load resize' ,function() {
// 		var w= $(window).width();
// 		if (w >= 1024) {
// 			$(".btn_checkOut_fix").hide();
// 		}
// 		else {
// 			showHideFixButton();
// 		}
// 	});
// function showHideFixButton() {
// 	if ($("button").hasClass("btn_checkOut")) {
// 		$(window).scroll(function(){
// 			var wh = $(window).height();
// 			var st = $(window).scrollTop();
// 			var t = $(".btn_checkOut").offset().top;
// 			if (wh + st >= t) {
// 				$(".btn_checkOut_fix").hide();
// 			}
// 			else {
// 				$(".btn_checkOut_fix").show();
// 			}
// 		})
// 	}
// }


// // 사용리뷰 별점
// $(function() {
// 	$('.review_total').find('ul li a').unbind("click").click(function(){
// 		event.preventDefault();
// 		if($(this).hasClass("active")){
// 			$('.review_total').find('ul li a').removeClass('active');
// 		}else{
// 			$('.review_total').find('ul li a').removeClass('active');
// 			$(this).addClass('active');
// 		}
// 		return false;
// 	});
// });

// // sample_chk
// function sample_chk(){
// 	$('.samples_inner').children('.list_box').find('ul li a').unbind("click").click(function(){
// 		event.preventDefault();
// 		if($(this).hasClass("act")){
// 			$('.samples_inner').children('.list_box').find('ul li a').removeClass('act');
// 		}else{
// 			$('.samples_inner').children('.list_box').find('ul li a').removeClass('act');
// 			$(this).addClass('act');
// 		}
// 		return false;
// 	});
// };sample_chk()



// function faq_vw(){
// $(".faq_result li a").bind('click',function ()  {
// 		$(this).parents("li").toggleClass("on");
// 		if ($(this).parents("li").hasClass("on")) {
// 			$(this).next(".ans_li").show();
// 		}else{
// 			$(this).next(".ans_li").hide();
// 		}
// 	})
// $('.fa_name li a').bind('click',function ()  {
// 	$('.fa_name').find('li').removeClass('act');
// 	$(this).parents("li").addClass('act');
// });
// };faq_vw()

// $(function() {
// 	$( "#slider-range" ).slider({
// 		range: true,
// 		// min: defaultOption.min,
// 		// max: defaultOption.max,
// 		// values: [ defaultOption.min, defaultOption.max ],
// 		slide: function( event, ui ) {
// 		// $('#sliderValue').val(ui.value);
// 		 	     $( "#amount_high" ).val("$" + ui.values[ 0 ]);
//               		$( "#amount_low" ).val("$" + ui.values[ 1 ]);
// 			},
// 			create: function(event, ui) {
//                      $("#slider-range span").eq(0).append( "<div class='m'><input id='amount_high' value='' disabled='disabled' /></div>")
//                      $("#slider-range span").eq(1).append( "<div class='h'><input id='amount_low' value='' disabled='disabled' /></div>")
// 		}
// 	});
// 	$( "#m_slider-range" ).slider({
// 		range: true,
// 		min: 0,
// 		max: 500,
// 		values: [ 0, 500 ],
// 		slide: function( event, ui ) {
// 		// $('#sliderValue').val(ui.value);
// 		 	     $( "#amount_m_high" ).val("$" + ui.values[ 0 ]);
//               		$( "#amount_m_low" ).val("$" + ui.values[ 1 ]);
// 			},
// 			create: function(event, ui) {
//                      $("#m_slider-range span").eq(0).append( "<div class='m'><input id='amount_m_high' value='' disabled='disabled' /></div>")
//                      $("#m_slider-range span").eq(1).append( "<div class='h'><input id='amount_m_low' value='' disabled='disabled' /></div>")
// 		}
// 	});
//   } );

// $( function() {
// 	$( "#start_day, #finish_day" ).datepicker({
// 		dateFormat: 'M dd, yy',
// 		prevText: '이전 달',
// 		nextText: '다음 달',
// 		monthNames: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
// 		monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
// 		// dayNames: ['일','월','화','수','목','금','토'],
// 		// dayNamesShort: ['일','월','화','수','목','금','토'],
// 		// dayNamesMin: ['일','월','화','수','목','금','토'],
// 		showMonthAfterYear: true,
// 		changeMonth: true,
// 		changeYear: true
// 	});
// 	$('.month li a').bind('click',function ()  {
// 		event.preventDefault();
// 		$('.month').find('li').removeClass('act');
// 		$(this).parents("li").addClass('act');
// 	});
// });




// function visual_sl() {
// 	$('.visual_sl').find('.slider').slick({
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		infinite: true,
// 		draggable: false,
// 		dots: false,
// 		prevArrow :".mv_prev",
// 		nextArrow :".mv_next",
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: {
// 					arrows: false,
// 					draggable: true,
// 					infinite: true,
// 					dots: true,
// 					arrows: false,
// 				}
// 			}
// 		]
// 	});
// };visual_sl()

// function br_item() {
// 	/* main_visual slide */
// 	$('.br_item').find('.product_list > ul').slick({
// 		slidesToShow: 2,
// 		slidesToScroll: 2,
// 		infinite: false,
// 		draggable: true,
// 		dots: false,
// 		arrows: true,
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: "unslick"
// 			}
// 		]
// 	});
// };br_item();


// function bR_sl() {
// 	/* main_visual slide */
// 	$('.bR_sl').slick({
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		infinite: false,
// 		draggable: false,
// 		dots: false,
// 		arrows: true,
// 	});
// };bR_sl();

// //nav bg안사라지게
// function bg_leave() {
// 	$(".depth_bg").bind('mouseenter focusin',function(event){
// 		$(this).css("display","block");

// 	}).bind('mouseleave focusout',function(event){
// 		$(this).css("display","none");
// 	});
// 	$("#nav").bind('mouseenter focusin',function(event){
// 		$('input').blur();
// 	})
// };bg_leave()




// /*  about_ap_sl */
// function about_ap_sl() {
// 	$('.about_sl').find('.slider').slick({
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		infinite: false,
// 		draggable: false,
// 		dots: false,
// 		prevArrow :".mv_prev",
// 		nextArrow :".mv_next",
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: {
// 					arrows: false,
// 					draggable: true,
// 					infinite: true,
// 					dots: true,
// 					arrows: false,
// 				}
// 			}
// 		]
// 	});

// 	$('.about_sl .slider').on("setPosition", function (){
// 		if($winW < 1024){
// 			$(".about_sl .slide").each(function(index){
// 				var moUrl = $(this).attr('data-src-mo');
// 				$(this).css('background', 'url('+moUrl+') no-repeat center');
// 			})
// 		} else {
// 			$(".about_sl .slide").each(function(index){
// 				var webUrl = $(this).attr('data-src-w');
// 				$(this).css('background', 'url('+webUrl+') no-repeat center');
// 			})
// 		}
// 	});
// };about_ap_sl();

// function about_layer() {

// 	if($("section").hasClass("aboutinfo")){
// 		$("#footer").css("margin-top","0")
// 	}
// };about_layer()


// function btn_Dcode() {
// 	resizeEventCall();
// 	if ($(".btn_Dcode").css('display') !== 'none') {
// 	 	if($winH <= 1024 ){
// 	 		$(".pay_wH").css("padding-bottom","35px")
// 	 	}
// 	 }
// }btn_Dcode();

