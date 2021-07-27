var goods_est_page = 1;
var goods_est_row_cnt = 20;
var goods_est_loading = false;
var goods_est_update = false;

var photo_est_page = 1;
var photo_est_row_cnt = 10;
var photo_est_loading = false;

var style_est_page = 1;
var style_est_row_cnt = 10;
var style_est_loading = false;

var blog_est_page = 1;
var blog_est_row_cnt = 20;
var blog_est_loading = false;

$(document).ready(function() {
	// 상품랭킹 롤링
	var startslide = $("#ranking_goods_pager li.activeSlide").index();
	
	$('#ranking_goods').cycle({
		fx : 'zoom', 
		speed : 'slow', 
		timeout: 5000,
		pager : '#ranking_goods_pager',
		after : Set_u_cat_cd,
		pause : true,
		startingSlide: startslide,
		pagerAnchorBuilder: function(idx) {
			return '#ranking_goods_pager li:eq('+idx+')';
		}
	});
	
	// 상품랭킹 width 제거 (화면이 늘어나면 옆으로 랭킹이 더 출력되기 위함)
	$("#ranking_goods").css("width", "");
	
	// 브랜드랭킹 롤링
	$('#ranking_brand').cycle({
		fx : 'zoom', 
		speed : 'slow', 
		timeout: 3000,
		pause : true,
		pager : '#ranking_brand_pager',		
		pagerAnchorBuilder: function(idx) {
			return '#ranking_brand_pager li:eq('+idx+')';
		}
	});
	
	$("#ranking_list").mouseover(function() {
		$("#ranking_goods").cycle('pause');
		$("#ranking_brand").cycle('pause');
	});
	
	$("#ranking_list").mouseout(function() {
		$("#ranking_goods").cycle('resume');
		$("#ranking_brand").cycle('resume');
	});
	
	$("#shop_sale").bxSlider({
		slideWidth: 400,
		minSlides: 2,
		maxSlides: 12,
		moveSlides: 1,
		nextSelector: '.sale_arrow_next',
		prevSelector: '.sale_arrow_prev',
		nextText:'>',
		prevText:'<'
	});
	
	$("#shop_sale_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");
	
	$("#shop_special").bxSlider({
		slideWidth: 400,
		minSlides: 2,
		maxSlides: 12,
		moveSlides: 1,
		nextSelector: '.special_arrow_next',
		prevSelector: '.special_arrow_prev',
		nextText:'>',
		prevText:'<'
	});
	
	$("#shop_special_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");
	
	$("#shop_release").bxSlider({
		slideWidth: 400,
		minSlides: 2,
		maxSlides: 12,
		moveSlides: 1,
		nextSelector: '.release_arrow_next',
		prevSelector: '.release_arrow_prev',
		nextText:'>',
		prevText:'<'
	});
	
	$("#shop_release_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");
	
	$("#shop_standing").bxSlider({
		slideWidth: 400,
		minSlides: 2,
		maxSlides: 12,
		moveSlides: 1,
		nextSelector: '.standing_arrow_next',
		prevSelector: '.standing_arrow_prev',
		nextText:'>',
		prevText:'<'
	});
	
	$("#shop_standing_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");
	
	/************************
		일반 상품평
	 ************************/

	// 일반 상품평 출력 스크롤 이벤트 처리
	$("#goods_estimate").scroll(function() {
		var scroll_per = $("#goods_estimate").scrollTop()/$("#goods_estimate").prop("scrollHeight") * 100;
		if(goods_est_loading && scroll_per > 60 && goods_est_page < 20) {
			goods_est_page++;
			GetEstimateList("goods", "N");
		}
	});

	$("#goods_estimate").mouseenter(function() {
		goods_est_loading = true;
	});

	$("#goods_estimate").mouseleave(function() {
		goods_est_loading = false;
	});
	
	/************************
	 *  포토 상품평 스크롤   * 
	************************/
	// 포토 상품평 출력 스크롤 이벤트 처리
	$("#photo_estimate").scroll(function() {
		var scroll_per = $("#photo_estimate").scrollTop()/$("#photo_estimate").prop("scrollHeight") * 100;
		if(photo_est_loading && scroll_per > 60 && photo_est_page < 20) {
			photo_est_page++;
			GetEstimateList("photo", "N");
		}
	});

	$("#photo_estimate").mouseenter(function() {
		photo_est_loading = true;
	});

	$("#photo_estimate").mouseleave(function() {
		photo_est_loading = false;;
	});
	
	/************************
	 *  스타일 상품평 스크롤 * 
	************************/
	// 스타일 상품평 출력 스크롤 이벤트 처리
	$("#style_estimate").scroll(function() {
		var scroll_per = $("#style_estimate").scrollTop()/$("#style_estimate").prop("scrollHeight") * 100;
		if(style_est_loading && scroll_per > 60 && style_est_page < 20){
			style_est_page++;
			GetEstimateList("style", "N");
		}
	});

	$("#style_estimate").mouseenter(function() {
		style_est_loading = true;
	});

	$("#style_estimate").mouseleave(function() {
		style_est_loading = false;
	});
	
	/************************
	 *  블로그 상품평 스크롤   * 
	************************/
	// 블로그 상품평 출력 스크롤 이벤트 처리
	$("#blog_estimate").scroll(function() {
		var scroll_per = $("#blog_estimate").scrollTop()/$("#blog_estimate").prop("scrollHeight") * 100;
		if(blog_est_loading && scroll_per > 60 && blog_est_page < 20){
			blog_est_page++;
			GetEstimateList("blog", "N");
		}
	});

	$("#blog_estimate").mouseenter(function() {
		blog_est_loading = true;
	});

	$("#blog_estimate").mouseleave(function() {
		blog_est_loading = false;
	});
	
	// 일반 상품평 갱신 (1분마다)
	//setInterval(function(){GetEstimateList('goods', 'Y')}, 60000);
	goods_est_update = setInterval(function(){GetEstimateList('goods', 'Y')}, 60000);
	
	//스페셜 탭 랜덤 노출
	var rand_special = Math.floor(Math.random() * 3) + 1;
	Change_Special_Tab(rand_special);
	
});

$(window).load(function() {
	/********* 셔 플 *********/
	// 쇼핑이슈 셔플
	RandomPrintShopping();
});

$(window).resize(function() {
	var tab_length = $("#shop_tab > a").length;
	for(var i=0; i<tab_length; i++) {
		if($("#shop_tab > a").eq(i).hasClass("active")) {
			var kind = $("#shop_tab > a").eq(i).attr("kind");
			var temp = $("#shop_" + kind + "_div").detach();
			$("#outerSlideArea").prepend(temp);
		}
	}
	
	$(".issue_box").css("display", "");
	$("#shop_sale_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");
	$("#shop_release_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");
	$("#shop_standing_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");
	$("#shop_special_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");

});

// 카테고리 번호 세팅
function Set_u_cat_cd() {
	var u_cat_cd = $("#ranking_goods_pager li.activeSlide").attr("u_cat_cd");
	$("input[name='u_cat_cd']").val(u_cat_cd);
	$("#ranking_goods > div").css("width", "");
}

// 랭킹 목록 탭 변경 
function RankingTab(type) {
	$("#ranking_tab > a").removeClass("active");	
	if(type == "P") {
		$("#ranking_tab > a").eq(0).addClass("active");
	} else {
		$("#ranking_tab > a").eq(1).addClass("active");
	}
}

// 랭킹 전체보기 링크 이동
function All_view() {
	var kind = $("#rank_kind").val();

	if(kind == "goods") {
		var u_cat_cd = $("input[name='u_cat_cd']").val();
		//전체 보기 링크 클릭 시, 선택된 카테고리가 전체 인 경우 처리.	

		if(u_cat_cd == 'sale') {
			u_cat_cd = "sale_goods=Y";
		}else if(u_cat_cd == 'new_product'){
			u_cat_cd = "new_product_yn=Y";
		} else {
			u_cat_cd = "u_cat_cd="+u_cat_cd;
		}
		location.href = "/app/contents/bestranking?" + u_cat_cd;
	} else if(kind == "brand") {
		location.href = "/app/usr/brand_rank";
	}
}

// 랭킹 탭 클릭(상품, 브랜드)
function Change_rank_kind(kind) { 
	$("#rank_kind").val(kind);
	
	$("#ranking_list > ul").removeClass("hidden");
	if(kind == "goods") {
		$("#ranking_list > ul").eq(0).removeClass("hidden");
		$("#ranking_list > ul").eq(1).addClass("hidden");
		$("#ranking_brand").css("display", "none");
		$("#ranking_goods").css("display", "block");
		$('#ranking_goods').cycle('resume');
		$('#ranking_brand').cycle('pause');
	} else {
		$("#ranking_list > ul").eq(1).removeClass("hidden");
		$("#ranking_list > ul").eq(0).addClass("hidden");
		$("#ranking_goods").css("display", "none");
		$("#ranking_brand").css("display", "block");
		$('#ranking_goods').cycle('pause');
		$('#ranking_brand').cycle('resume');
	}
}

// 스태프, 코디 탭 변경
function Change_Snap_Tab(kind) {
	$("#snap_tab > a").removeClass("active");
	if(kind == "staff") {
		$("#snap_tab > a").eq(0).addClass("active");
		$("#staff_area").show();
		$("#styles_area").hide();
		$("#snap_all_view").attr("href", "/app/staff/lists");
	} else if(kind == "styles") {
		$("#snap_tab > a").eq(1).addClass("active");
		$("#staff_area").hide();
		$("#styles_area").show();
		$("#snap_all_view").attr("href", "/app/styles/lists");
	}
}

// 쇼케이스, 스페셜 이슈, 단독상품 탭 변경
function Change_Special_Tab(kind) {
	$("#special_tab > a").removeClass("active");
	if(kind == "showcase" || kind == "1") {
		$("#special_tab > a").eq(0).addClass("active");
		$("#showcase_area").show();
		$("#special_issue_area").hide();
		$("#exclusive_area").hide();
		$("#special_all_view").attr("href", "/app/showcase/lists");
		$(".main_specialissue_area").attr("style", "height: 340px;");
	} else if(kind == "special_issue" || kind == "2") {
		$("#special_tab > a").eq(1).addClass("active");
		$("#showcase_area").hide();
		$("#special_issue_area").show();
		$("#exclusive_area").hide();
		$("#special_all_view").attr("href", "/app/specialissue/lists");
		$(".main_specialissue_area").attr("style", "height: 340px;");
	}else if(kind == "exclusive" || kind == "3"){
		$("#special_tab > a").eq(2).addClass("active");
		$("#showcase_area").hide();
		$("#special_issue_area").hide();
		$("#exclusive_area").show();
		$("#special_all_view").attr("href", "/app/exclusive/lists");
		$(".main_specialissue_area").attr("style", "max-height: 546px; height:auto; ");

	}
}

// 기획전 이미지 변경
function ChangePlanImage(obj, no, img) {
	var div_tag = $(obj).parents(".plan_area");
	var plan_link = div_tag.eq(0).children("div#plan_img");
	plan_link.children("a").attr("href", "/app/plan/views/"+no);
	plan_link.children("a").children("img").attr("src", img);
	div_tag.find("li.main_plan_tit").removeClass("active");
	$(obj).addClass("active");
}

// 상품평 얻기
var update_cnt = 0;
function GetEstimateList(type, update_yn) {
	
	// 동적 변수 선언
	eval("var est_page = " + type + "_est_page");
	eval("var est_row_cnt = " + type + "_est_row_cnt");
	
	var page = est_page;
	var row_cnt = est_row_cnt;
	
	var show_area = $("#" + type + "_estimate");

	var upd_sdt = ""
	var upd_edt = ""
	if(update_yn == "Y") {
		upd_sdt = $("#" + type + "_estimate input[name='main_est_upd_dt']").eq(0).val();
		eval("var est_loading = " + type + "_est_loading");
		if(est_loading == true || update_cnt > 0) {
			clearInterval(goods_est_update);
			goods_est_update = null;
			return;
		}
		update_cnt++;
	} else {
		var last_input = ($("#" + type + "_estimate input[name='main_est_upd_dt']").length) - 1;
		upd_edt = $("#" + type + "_estimate input[name='main_est_upd_dt']").eq(last_input).val();
	}
	
	eval(type + "_est_loading = false");
	$.ajax({
		type: "GET",
		url: "/app/main/main_estimate",
		data:  "type=" + type + "&upd_sdt=" + upd_sdt + "&upd_edt=" + upd_edt + "&display_cnt=" + row_cnt,
		success: function(msg) {
			if(update_yn == "Y") {
				if(msg != "") {
					$("#main_estimate_update_icon").slideDown("slow");
					show_area.prepend(msg);
					$("#main_estimate_update_icon").slideUp("slow");
				}
			} else {
				show_area.append(msg);
			}
		},
		complete : function(msg) {
			eval(type + "_est_loading = true");
		}
	});
}

function Change_Shop_Tab(kind) {
	$("#shop_tab > a").removeClass("active");
	$("#shop_tab").find("."+kind+"_btn").addClass("active");
	
	$("#shop_issue div.issue_box").hide();
	$("#shop_"+kind+"_div").show();
	$("#shop_issue div.btnBox").hide();
	$("#"+kind+"_pager").show();
}

function RandomPrintShopping() {
	var rand = Math.round(Math.random()*2);
	$("#shop_issue div.pager_arrow").hide();
	$("#shop_issue div.pager_arrow").eq(rand).show();
	
	$("#shop_tab a").removeClass("active");
	$("#shop_tab a").eq(rand).addClass("active");
	
	$("#shop_issue div.issue_box").hide();
	$("#shop_issue div.issue_box").eq(rand).show();
}

function RandomPrintSnap() {
	var rand = Math.round(Math.random() * 10);
	$("#snap_tab a").removeClass("active");
	$(".main_snap_list").hide();
	if(rand >= 0 && rand <= 6) {
		$("#snap_tab a").eq(0).addClass("active");
		$("#staff_area").show();
		$("#snap_all_view").attr("href", "/app/staff/lists")
	} else {
		$("#snap_tab a").eq(1).addClass("active");
		$("#styles_area").show();
		$("#snap_all_view").attr("href", "/app/styles/lists")
	}
}

// 블랙프라이데이 카운트 다운 (20161201 이후에는 삭제 예정)
function countDownBlackfridayTime(r) {
	r = parseInt(r,10) - 1; 
	day = Math.floor(r / (3600 * 24)); mod = r % (3600 * 24);
	hrs = Math.floor(mod / 3600); mod = mod % 3600; 
	min = Math.floor(mod / 60); 
	sec = mod % 60;
	day = (day > 9) ? day.toString() : '0' + day.toString();
	hrs = (hrs > 9) ? hrs.toString() : '0' + hrs.toString();
	min = (min > 9) ? min.toString() : '0' + min.toString();
	sec = (sec > 9) ? sec.toString() : '0' + sec.toString();
	$("#bf_day").text(day);
	$("#bf_hour").text(hrs);
	$("#bf_min").text(min);
	$("#bf_sec").text(sec);
	
	if(r > 0) {
		timer = setTimeout(function(){countDownBlackfridayTime(r);},1000);
	} else {
		return false;
	}
}