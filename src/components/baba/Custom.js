/*
    ========================================
    G1 UI Guide | BABATHE.COM (UZEN.net)
    ========================================
    @author         :  Tommy.Kim
    @version        :   v1.0.0
*/


/* 호출되는 함수 */
function setAllMenu() {
	$(".menu-all").fadeIn(600);
	holdWindow();
	$(".menu-all .layer-close").on("click", function(e){
		/*
		$(".menu-all").translate3d({
			y:parseInt(-100)+"%"
		});*/
		$(".menu-all").fadeOut(600);
		undoWindow();
	})
}

function updateWebHead() {
	if(!isScroll()) {
		$(".btn-top").stop().fadeOut("fast");
		$(".btn-mobile-top").stop().fadeOut("fast");
	} else {
		if($("body").hasClass("mobile")) {
			$(".btn-mobile-top").stop().fadeIn("fast");
		} else {
			$(".btn-top").stop().fadeIn("fast");
		}
	}
}

function renderLayer(_id, _wid, _top, callback) {
	var wid = (_wid?_wid:800);
	var top = (_top?_top:100);
	//$(".g-layer").show();
	$("#"+_id).parent().show();
	$("#"+_id).css({
		paddingTop: top,
		paddingBottom:top
	})
	$("#"+_id+" .body").css({
		width:wid
	})
	$("#"+_id).stop().fadeIn("fast");
	holdWindow();

	$("header .web, header .mobile").css({"transform":"initial"});

	$("#"+_id).find("a.btn-close:not([data-manual-close])").off("click").on("click", function(){
		if (typeof callback == "function") {
			callback();
		}
		$("#"+_id).stop().fadeOut("fast", function(){
			$(".g-layer").hide();
		});
		undoWindow();
	});
}

function renderFixLayer(_id,_wid,_top,_left) {
	var wid = (_wid?_wid:300);
	var top = (_top?_top:0);
	var left = (_left?_left:0);
	$("#"+_id).parent().show();
	$("#"+_id).css({
		top: top,
		left:left,
		width:wid
	})
	$("#"+_id).stop().fadeIn("fast");
	if(getIsMobile()) {
		$("#"+_id).css({
			top:"50%",
			marginTop: -($("#"+_id).height()/2)
		});
		if($("#"+_id).hasClass("type2")) {
			$("#"+_id).css({
				marginTop: 0,
				top:0
			});
			if($("#"+_id).prev().hasClass("layer-sm")) {
				//alert($("#"+_id).prev().outerHeight());
				$("#"+_id).css({
					"top":$("#"+_id).prev().outerHeight()+"px"
				})
			}
		}
	}
	$("header .web, header .mobile").css({"transform":"initial"});
	$("#"+_id).find("a.btn-close:not([data-manual-close])").off("click").on("click", function(){

		$(this).closest(".layer-sm").fadeOut("fast", function(){
			var c = 0;
			$(".layer-sm").each(function(n){
				if($(this).css("display") == "none") {
					c++;
					if($(".layer-sm").size() == c) {
						$(".g-layer-sm").hide();
						c = 0;
					}
				}
			})
		});
		//undoWindow();

	});



}

function renderLayerByLayerId(_layerid, _id, _wid, _top) {
	var wid = (_wid?_wid:800);
	var top = (_top?_top:100);
	$("#"+_layerid).show();
	$("#"+_id).css({
		paddingTop: top,
		paddingBottom:top
	})
	$("#"+_id+" .body").css({
		width:wid
	})
	$("#"+_id).stop().fadeIn("fast");
	holdWindow();
	$("#"+_id).find("a.btn-close:not([data-manual-close])").on("click", function(){
		$("#"+_id).fadeOut("fast", function(){
			$(".g-layer").hide();
		});
		undoWindow();
	});
}

function closeLayer(_id) {
	$("#"+_id).hide();
	$(".g-layer").hide();
	undoWindow();
}

function closeLayerAndDoSome(_id, _afterClose){
	closeLayer(_id);
	_afterClose();
}

function closeLayerByLayerId(_layerid, _id) {
	$("#"+_id).hide();
	$("#"+_layerid).hide();
	undoWindow();
}

function closeAllLayer() {
	$(",g-layer>.layer").hide();
	$(".g-layer").hide();
	undoWindow();
}

function updateMobileFilter() {
	if($(".list-control").size()>0 && $("body").hasClass("mobile")){
		$(".list-control").each(function(){
			var t = $(this).offset().top;
			if($(document).scrollTop() >= t) {
				if($(this).next().hasClass("flag-point")) {
					//
				} else {
					$(this).next().css({paddingTop:50+"px"});
					$(this).next().addClass("flag-point");
					$(this).css({
						position:"fixed",
						top:0+"px",
						left:0+"px",
						zIndex:4
					}).stop().animate({
						top:50+"px"
					},{
						duration:600,
						queue:false
					});
				}
			}
			if($(".flag-point").size()>0) {
				if($(this).next().offset().top-50 >= $(document).scrollTop()) {
					$(this).next().removeClass("flag-point");
					$(this).stop().css({
						position:"relative",
						top:0
					});
					$(this).next().css({paddingTop:0})
				}
			}
		});
	} else {
		$(".list-control").css({
			position:"relative",
			top:0
		});
		$(".list-control").next().removeClass("flag-point");
		$(".list-control").next().css({paddingTop:0})
	}
}

if($("#span_product_price_sale").size()<1) {
	$("#span_product_price_text").css({"text-decoration":"none"})
}

function setDepth2(obj) {
	$(".depth02").stop().fadeOut("fast");
	var obj =  obj.next();
	var hei = obj.outerHeight();

	$("header .web .middle .sub-board").show();
	$("header .web .middle .sub-board").stop().animate({
		height:hei+0
	},{
		duration:300,
		queue:false,
		complete:function(){
			obj.stop().fadeIn("fast");
		}
	})
}

function setWebPrdView(target, _id) {
	var pre;
	$(".prd-main .web .box").eq(target).find(".thumb li").each(function(n){
		if($(this).find("a").css("opacity") == 1) {
			pre=n
		}
	})
	$(".prd-main .web .box").eq(target).find(".thumb li a").stop().animate({
		opacity:0.3
	},{duration:"fast"});
	$(".prd-main .web .box").eq(target).find(".thumb li a").eq(_id).stop().animate({
		opacity:1
	},{duration:"fast"});

	var hei = $(".prd-main .web .box").eq(target).find(".normal li").eq(_id).outerHeight();
	$(".prd-main .web .box").eq(target).find(".normal").height(hei);
	$(".prd-main .web .box").eq(target).find(".normal li").eq(pre).css({zIndex:1}).hide();
	$(".prd-main .web .box").eq(target).find(".normal li").eq(_id).css({
		position:"absolute",
		width:"100%",
		top:0,
		zIndex:2
	}).stop().fadeIn(400, function(){
		$(".prd-main .web .box").eq(target).find(".normal li").eq(_id).css({postion:"relative"});
		//$(".prd-main .web .box").eq(target).find(".normal").height("auto");
	});
}

/* 초기화 함수 */
function initCommon() {
	$(".btn-top, .btn-mobile-top").on("click", function(e){
		$("html, body").stop().animate({
			scrollTop:0
		},{
			dutation:1000,
			queue:false
		});
	})

	// initTextAreaBytes();
	initTextAreaLength();

	$(window).on("resize", function(){
		updatePrdHei();
		//updatePrdInfo();
		updateChangeDevice();
	});
	updateChangeDevice();

	$(window).scroll(function(){
		updateWebHead();
		updateMobileFilter();
		//updatePosFilter();
	});
	updateWebHead();
	//updatePosFilter();
	updatePrdHei();

	//renderDatePicker();
	renderInputControl();

	//renderToggleSwitch();
	renderClause();

	$(window).on("orientationchange",function(){
		$(".prd-view .mobile .vertical-scroll .swiper-slide img").css({
			height:"inherit"
		})
	});


	/*
	document.body.style.height = (document.documentElement.clientHeight + 5) + 'px';
    window.scrollTo(0, 1);

    if(is_hangul_char($(".prd-title-area h2").text())) {$(".prd-title-area h2").css({"font-family":"Nanum_R"}) }
*/
}


function is_hangul_char(ch) {
	  c = ch.charCodeAt(0);
	  if( 0x1100<=c && c<=0x11FF ) return true;
	  if( 0x3130<=c && c<=0x318F ) return true;
	  if( 0xAC00<=c && c<=0xD7A3 ) return true;
	  return false;
	}

function updatePosFilter() {
	if($(".refine-tool").size()<1) return;
	var t = 210
	var d = $(document).scrollTop();
	console.log(parseInt(d-t))
	if(t<d) {
		$(".refine-tool").stop().animate({
			top:parseInt(d-t)+"px"
		},{
			duration:500,
			queue:false
		})
	} else {
		$(".refine-tool").stop().animate({
			top:0+"px"
		},{
			duration:200,
			queue:false
		})
	}
}

function renderToggleSwitch() {
	if($(".toggle-switch").size()<1) return;
	$(".toggle-switch").each(function(){
		$(this).find("a").on("click", function(e){
			if($(this).closest(".toggle-switch").attr("data-active")==="true") {
				$(this).find("i").removeClass("active");
				$(this).closest(".toggle-switch").attr("data-active", "false");
			} else {
				$(this).find("i").addClass("active");
				$(this).closest(".toggle-switch").attr("data-active", "true");
			}
		})
	})
}

function renderClause(){
	$(".about-product .clause h3").on("click", function(e){
			if($(this).closest(".clause").attr("data-active")==="true") {
				$(this).find("h3 i").addClass("ico-toggle-up");
				$(this).find("h3 i").removeClass("ico-toggle-down");
				$(this).closest(".clause").find(".expand").slideUp("fast");
				$(this).closest(".clause").attr("data-active", "false");
			} else {
				$(this).find("h3 i").addClass("ico-toggle-up");
				$(this).find("h3 i").removeClass("ico-toggle-down");
				$(this).closest(".clause").find(".expand").slideDown("fast");
				$(this).closest(".clause").attr("data-active", "true");
			}
	})
}
function renderInputControl() {
	$(".input-control>input").each(function(){
		if($(this).prop("disabled")) {
			$(this).closest(".input-control").addClass("disabled");
		}
	});
}
/*
function renderDatePicker() {
	if($(".datepicker").size()<1) return;
		$( ".datepicker" ).datepicker({
			todayHighlight: true,
			autoclose: true,
			language: 'kr',
			dateFormat :"yy.mm.dd",
			yearRange:'-10:+0',
			showOn: "both",
			buttonImage:"../../../kr/image/ico_calendar.png",
			buttonImageOnly: true,
			buttonText: "",
			beforeShow:function(date) {
	            $(".ui-datepicker-calendar")
			},
			onSelect:function(beforeShow, inst) {
				//
			}
		});
}
*/
var datepicker_defaults = {
	todayHighlight: true,
	autoclose: true,
	language: 'ko',
	dateFormat :"yy.mm.dd",
	yearRange:'-10:+10',
	showOn: "both",
	buttonImage:"/kr/image/ico_calendar.png",
	buttonImageOnly: true,
	buttonText: "",
};
var Period_Config = {
    start_config : function (start_dp,end_dp) {
        if(start_dp && end_dp){
            start_dp.datepicker(datepicker_defaults);
            if(end_dp.val()){
                start_dp.datepicker("option", "maxDate", end_dp.val());
            }
            start_dp.datepicker("option", "onClose", function ( selectedDate ) {
                end_dp.datepicker("option", "minDate", selectedDate );
            });
        }
        return start_dp;
    },
    end_config : function (start_dp,end_dp) {
        if(start_dp && end_dp){
            end_dp.datepicker(datepicker_defaults);
            if(start_dp.val()){
                end_dp.datepicker("option", "minDate", start_dp.val());
            }
            end_dp.datepicker("option", "onClose", function ( selectedDate ) {
                start_dp.datepicker( "option", "maxDate", selectedDate );
            });
        }
        return end_dp;
    }
}
function period_config(start_dp,end_dp) {
	if(start_dp && end_dp){
		if(end_dp.val()){
			start_dp.datepicker("option", "maxDate", end_dp.val());
		}
		start_dp.datepicker("option", "onClose", function ( selectedDate ) {
			end_dp.datepicker("option", "minDate", selectedDate );
		});

		if(start_dp.val()){
			end_dp.datepicker("option", "minDate", start_dp.val());
		}
		end_dp.datepicker("option", "onClose", function ( selectedDate ) {
			start_dp.datepicker( "option", "maxDate", selectedDate );
		});
	}
}

function renderParallax(length){
	var cx = 0;
	var cy = 0;
	var wid =0;
	var max = 0;
	var marginTop = 30;
	var obj_compare = new Array();
	for(var i=0; i<length; i++) {
		obj_compare[i]=0;
	}
	var length = length;
	var init_num = 0;

	$(".prd-list.parallax>.group").each(function(n){
		var min = 0;
		if(n < length) {
			min = n;
		} else {
			for(var i=0; i<length; i++) {
				if(i===0) {
					init_num = obj_compare[i];
				} else {
					if(init_num>obj_compare[i]) {
						init_num = obj_compare[i];
						min = i;
					}
				}
			}
		}

		cy = obj_compare[min];
		cx = Math.round(100/length*10)/10 * min;
		wid = 100/length;
		$(this).css({
			position : "absolute",
			top:cy+"px",
			left:cx+"%",
			width:wid+"%"
		});
		obj_compare[min] = marginTop + cy + $(this).outerHeight();
	});

	for(var i=0; i<length; i++) {
		if(i===0) {
			max = obj_compare[i];
		} else {
			if(max<obj_compare[i]) {
				max = obj_compare[i];
			}
		}
	}
	$(".prd-list.parallax").height(max+30);
}

$.fn.getHiddenDimensions = function (includeMargin) {
    var $item = this,
    props = { position: 'absolute', visibility: 'hidden', display: 'block' },
    dim = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 },
    $hiddenParents = $item.parents().andSelf().not(':visible'),
    includeMargin = (includeMargin == null) ? false : includeMargin;

    var oldProps = [];
    $hiddenParents.each(function () {
        var old = {};

        for (var name in props) {
            old[name] = this.style[name];
            this.style[name] = props[name];
        }

        oldProps.push(old);
    });

    dim.width = $item.width();
    dim.outerWidth = $item.outerWidth(includeMargin);
    dim.innerWidth = $item.innerWidth();
    dim.height = $item.height();
    dim.innerHeight = $item.innerHeight();
    dim.outerHeight = $item.outerHeight(includeMargin);

    $hiddenParents.each(function (i) {
        var old = oldProps[i];
        for (var name in props) {
            this.style[name] = old[name];
        }
    });

    return dim;
}

function initTextAreaBytes() {
	$("textarea").each(function(){
		var temp_value = "";
		$(this).on("keydown", function(){
			var byte = getByteLength($(this).val());
			if(byte > 1999) {
				$(this).closest(".write").find(".log .current").text(numberWithCommas(byte));
				$(this).val(temp_value);
			} else {
				$(this).closest(".write").find(".log .current").text(numberWithCommas(byte));
				temp_value = $(this).val();
			}
		});
	});
}

function initTextAreaLength() {
	$("textarea").each(function(){
		var temp_value = "";
		var _this = $(this);
		_this.on("keyup blur", function(){
			var length = getContentLength(_this.val());
			if(length > 1000) {
				_this.closest(".write").find(".log .current").text(numberWithCommas(length));
				_this.val(temp_value);
			} else {
				_this.closest(".write").find(".log .current").text(numberWithCommas(length));
				temp_value = _this.val();
			}
		});
	});
}

function initHeader() {
	if($("header").size()<1) return;
	$("header .web .depth01>li>a").on("click", function(e){
		if($(this).find("i").hasClass("menu")) {
			setAllMenu();
		}
	});
	$("header .web .depth01>li>a").on("mouseenter", function(e){
		if($(this).find("i").hasClass("menu")) {
			$(".depth02").stop().fadeOut("fast");
			$("header .web .middle .sub-board").stop().animate({
				height:0
			},{
				duration:300,
				queue:false,
				complete:function(){
					$("header .web .middle .sub-board").hide();
				}
			})
		} else {
			//var id = $(this).parent().index();
			if($(this).next().size()>0) setDepth2($(this));
			else $("header .web").trigger("mouseleave");
		}
	});
	$("header .web").on("mouseleave", function(e){
		$(".depth02").stop().fadeOut("fast");
		$("header .web .middle .sub-board").stop().animate({
			height:0
		},{
			duration:300,
			queue:false,
			complete:function(){
				$("header .web .middle .sub-board").hide();
			}
		})
	});

	$("header .mobile .left>a.btn-menu").on("click", function(e){
		$(".m-menu").css({height:$(window).height()+20}).stop().fadeIn("fast");
		$(".m-menu .board").css({
			"height":$(".m-menu .category").outerHeight(),
			"min-height":$(window).outerHeight()+60
		});
		holdWindow();
	});

	$(".m-menu .btn-close:not([data-manual-close])").on("click", function(e){
		$(".m-menu .depth02").hide();
		$(".m-menu .category>ul>li>a").show();

		$(".m-menu .board").css({
			"height":$(".m-menu .category").outerHeight(),
			"min-height":$(window).outerHeight()+60
		});
		$(".m-menu").hide();
		undoWindow();
	});

	$("header .web .btn-search").on("click", function(){
		renderSearch();
	});

	$("header .mobile .btn-search").on("click", function(){
		renderSearch();
	});

	$(".m-menu .category>ul>li>a").on("click",function(e){
		if($(this).next().size()>0) {
			renderDepth2($(this).next())
		}
	});

	$(".btn-back").on("click", function(e){
		$(".m-menu .depth02").hide();
		$(".m-menu .category>ul>li>a").show();
		$(".m-menu .board").css({
			"height":$(".m-menu .category").outerHeight(),
			"min-height":$(window).outerHeight()+60
		});
	})

	$("#search-word").renderTab();
}

function renderDepth2(obj) {
	var obj =obj;
	$(".m-menu .category>ul>li>a").hide();
	obj.fadeIn("fast");
	$(".m-menu .board").css({
		"height":obj.outerHeight()+60+1000,
		"min-height":$(window).outerHeight()+60
	});
}

function renderSearch() {
	$("header .web, header .mobile").css({"transform":"initial"});
	$(".search-block").stop().fadeIn("fast");
	//$(".search-block .input input").focus();
	$(".search-block .input input").on("focusin", function(){
		showAutoSearch();
	}).on("input", function(){
		if($(this).val()==="") {
			hideAutoSearch();
		}
	});
	$(".search-block a.btn-close:not([data-manual-close])").off("click").on("click", function(e){
		$(".search-block").fadeOut("fast", function(){
			$(".search-block .auto-search").hide();
			$(".search-block .input input").val("");
			$(".search-block .g-tab li a").eq(0).trigger("click");
			undoWindow();
		});
	});
	holdWindow();
	/*
	function initDisplayList() {
		if($(".prd-list.parallax").size()>0) {
			var count=0;
			var imgTotal = $(".prd-list.parallax .item img").size();
			$(".prd-list.parallax .item img").each(function(n){
		         var url = $(this).attr("src")+'?n='+Math.random()*1000;
		         $(this).attr("src",url);
		         $(this).load(function(){
		              if(++count == imgTotal){
		            	 //
		              }
		         });
		    });
		}
	}

	 */
}

function hideAutoSearch() {
	$(".search-block .auto-search").stop().fadeOut("fast");
	$(".search-block .result").show();
}

function showAutoSearch() {
	$(".search-block .auto-search").stop().fadeIn("fast");
	$(".search-block .result").hide();
}

/* 180423 수정 */
function initPrdList() {
	var winW = $(window).width();
	var container = $('.container');
	if($(".prd-list").size()>0) {
		$(".prd-list").each(function(){
			var _this= $(this);
			if(_this.hasClass("parallax")) return;
			// _this.find(".group").each(function(n){
			// 	if(n%2==0) {
			// 		$(this).before('<div class="enter-2-clearfix" />');
			// 	}
			// 	if(n%4==0) {
			// 		$(this).before('<div class="enter-4-clearfix" />');
			// 	}
			// 	if(!_this.hasClass("no-array")) {
			// 		if(n%5==0) {
			// 			$(this).before('<div class="enter-5-clearfix" />');
			// 		}
			// 	}
			// });
			if(winW<=991&&container.hasClass('bywool')){
				_this.find(".group").each(function(n){
					if(n%2==0) {
						$(this).before('<div class="enter-2-clearfix" />');
					}
					if(n%4==0) {
						$(this).before('<div class="enter-4-clearfix" />');
					}
					if(!_this.hasClass("no-array")) {
						if(n%5==0) {
							$(this).before('<div class="enter-5-clearfix" />');
						}
					}
				});
			} else if(winW>992&&container.hasClass('bywool')) {
				_this.find(".group").each(function(n){
					if(n%3==0) {
						$(this).before('<div class="enter-2-clearfix" />');
					}
				});
			}
			else {
				_this.find(".group").each(function(n){
					if(n%2==0) {
						$(this).before('<div class="enter-2-clearfix" />');
					}
					if(n%4==0) {
						$(this).before('<div class="enter-4-clearfix" />');
					}
					if(!_this.hasClass("no-array")) {
						if(n%5==0) {
							$(this).before('<div class="enter-5-clearfix" />');
						}
					}
				});
			}
			_this.find(".item").on("mouseenter", function(e){
				if(getIsMobile()) return;
				$(this).find(".image .over").stop().fadeIn("fast");
				$(this).find(".image .img-over").stop().fadeIn("fast");
			}).on("mouseleave", function(e){
				if(getIsMobile()) return;
				$(this).find(".image .over").stop().fadeOut("fast");
				$(this).find(".image .img-over").stop().fadeOut("fast");
			})
		});
	/*
		$('#changeArrayType').renderBtnOption({
			update:function(e){
				var id = e.index;
				var obj = e.obj.closest(".list-control").next();
				if(!obj.hasClass("no-array")){
					if(id==0) {
						//4
						obj.find(".enter-4-clearfix").show();
						obj.find(".enter-5-clearfix").hide();
						obj.find(".group").css({width:"25%"});
					} else {
						//5
						obj.find(".enter-4-clearfix").hide();
						obj.find(".enter-5-clearfix").show();
						obj.find(".group").css({width:"20%"});
					}
				};
			}
		});
	*/
		$('#changeArrayType2').renderBtnOption({
			update:function(e){
				var id = e.index;
				var obj = e.obj.closest(".list-control").next();
				if(!obj.hasClass("no-array")){
					if(id==0) {
						//4
						renderParallax(4);
					} else {
						//5
						renderParallax(5);
					}

				}
			}
		});
	}

	//리스트페이지 > 이벤트목록 배너
	/*
	if($("#list_banner01").size()>0) {
		var swiper = new Swiper('#list_banner01', {
			pagination: '#list_banner01 .swiper-pagination',
	        paginationClickable: true,
	        nextButton: '#list_banner01 .swiper-button-next',
	        prevButton: '#list_banner01 .swiper-button-prev',
	        loop: true
	    });
	}
	*/
	//리스트페이지 > 이벤트목록 배너
	if($("#looks_list").size()>0) {
		var swiper = new Swiper('#looks_list', {
			slidesPerView:4,
			spaceBetween:20,
	        allowSwipeToPrev: false,
            allowSwipeToNext: false,
            paginationHide:false,
            pagination: '#looks_list .swiper-pagination',
	        paginationClickable: true,
	        breakpoints: {
	        	991: {
            		slidesPerView:2,
            		spaceBetween:10,
            		allowSwipeToPrev: true,
            		allowSwipeToNext: true,
            		slidesOffsetBefore:0
            	}
	        }
	    });
	}
}
/* //180423 수정 */

/* 마이페이지 */
function initMypage() {
	//모바일 경우에만 실행

	$(".layout.mypage .menu dl").each(function(){
		if($(this).find("dd a").size()<1) {
			$(this).find("dt i").hide();
		} else {
			$(this).find("dt").off("click").on("click", function(e){
				if(!getIsMobile()) return;
				if($(this).closest("dl").hasClass("active")) {
					$(this).closest("dl").find("dd").stop().slideUp("fast");
					$(this).closest("dl").removeClass("active");
				} else {
					$(this).closest("dl").find("dd").stop().slideDown("fast");
					$(this).closest("dl").addClass("active");
				}
			})
		}
	});

	var mypage_wish = new Swiper('#mypage_wish', {
		slidesPerView:4,
		spaceBetween: 25,
		allowSwipeToPrev: false,
        allowSwipeToNext: false,
		lazyLoading: true
	});

	$(".period-control .type li a").on("click", function(e){
		if($(this).hasClass("active")) {
			//$(this).removeClass("active");
		} else {
			$(".period-control .type li a").removeClass("active");
			$(this).addClass("active");
		}
	});

	renderOrderCostInfo();

	renderInquiry();

	renderTypeCostInfo ();

}

function renderOrderCostInfo() {
	if($(".order-cost-info>.package>.list").size()==3) {
		$(".order-cost-info>.package>.list").css({
			"width":"33.3%"
		})
	}
}

function renderTypeCostInfo() {
	$(".type-cost-info .pull-left.cancel .head").off("click").on("click", function(e){
		var $content = $(this).next();
		if($content.hasClass("active")) {
			$content.slideUp("fast");
			$content.removeClass("active");
			$(this).find(".ico").removeClass("active");
		} else {
			$content.slideDown("fast");
			$content.addClass("active");
			$(this).find(".ico").addClass("active");
		}
	})
}

function renderInquiry() {
	$(".toggle-list .normal").off("click").on("click", function(e){
		if($(this).hasClass("active")) {
			$(this).find(".t02").addClass("ellipsis");
			$(this).next().stop().slideUp("fast");
			$(this).removeClass("active");
		} else {
			$(this).find(".t02").removeClass("ellipsis");
			$(this).next().stop().slideDown("fast");
			$(this).addClass("active");
		}
	})
}


function initPrdColorOption() {
	if($(".color-option").size()<1) return;
	$(".color-option>ul>li>a").on("click", function(e){
		var obj_id = $(".color-option").index($(this).closest(".color-option"));
		var id = $(this).parent().index();
		setChageColorOption(obj_id, id);
	})
}

function setChageColorOption(_i, _j) {
	var i=_i,j=_j;
	$(".color-option").eq(i).find(">ul>li>a").removeClass("select");
	$(".color-option").eq(i).find(">ul>li>a").eq(j).addClass("select");
}

function initSelect() {
	$(".select-control i.edge").remove();
	$(".select-control").prepend('<i class="edge" />')
}

function initCheckbox() {
	if($(".wish-list-board").size()>0) return;
	var isCheck = false;
	if ($(".checkbox").size() > 0) {
		$(".checkbox input").each(function() {
			$(this).closest(".checkbox").find("i").removeClass("active");
			if($(this).is(":checked")) {
				$(this).closest(".checkbox").find("i").addClass("active")
			};

			if($(this).closest("label").text()=="") {
				$(this).closest("label").append("&nbsp;");
			}
		});
		$(".checkbox").off("change").on("change",function(e){
			if(isCheck) return;
			isCheck = true;
			if($(this).find("i").hasClass("active")) {
				if ($(this).hasClass("disabled")) return;
				$(this).find("input").prop("checked", false);
				$(this).find("i").removeClass("active");
				var target =  $(this).find("input").attr("data-target");
				if(target != undefined && target != "") {
					$("input[data-link="+target+"]").closest(".checkbox").each(function(n){
						$(this).find("i").removeClass("active");
						$(this).find("input").prop("checked", false);
					})
				}
				var link = $(this).find("input").attr("data-link");
				if(link != undefined && link != "") {
					$("input[data-target='"+link+"']").closest(".checkbox").each(function(n){
						if($(this).find("i").hasClass("active")) {
							$(this).find("i").removeClass("active");
							$(this).find("input").prop("checked", false);
						}
					});
					$("input[data-link='"+link+"']").closest(".checkbox").each(function(n){
						$(this).find("i").removeClass("active");
						$(this).find("input").prop("checked", false);
					});
				}
			} else {
				if ($(this).hasClass("disabled")) return;
				$(this).find("input").prop("checked", true);
				$(this).find("i").addClass("active");
				var link = $(this).find("input").attr("data-link");
				if(link != undefined && link != "") {
					$("input[data-target='"+link+"']").closest(".checkbox").each(function(n){
						if(!$(this).find("i").hasClass("active")) {
							if(!$(this).find("input").prop("disabled")) {
								$(this).find("i").addClass("active");
								$(this).find("input").prop("checked", true);
							}
						}
					});
					$("input[data-link='"+link+"']").closest(".checkbox").each(function(n){
						if(!$(this).find("input").prop("disabled")) {
							$(this).find("i").addClass("active");
							$(this).find("input").prop("checked", true);
						}
					});
				}
			}
			setTimeout(function(){
				isCheck = false;
			},10)
		});
	}
}

function escapeJquerySelector(selectorExp) {
	return selectorExp.replace(/([\.\[\]])/g, '\\$1');
}

function initRadio() {
	if ($(".radio").size() > 0) {
		$(".radio input").each(function() {
			$(this).closest(".radio").find("i").removeClass("active");
			if($(this).is(":checked") || $(this).attr("checked") || $(this).prop("checked")) {
				$(this).closest(".radio").find("i").addClass("active")
			}
			if($(this).closest("label").text()=="") {
				$(this).closest("label").append("&nbsp;");
			}
		});
		$(".radio").off("change");
		$(".radio").on("change", function(){
			if($(this).find("i").hasClass("active")) {
				//
			} else {
				if ($(this).hasClass("disabled")) return;
				var name = $(this).find("input").attr("name");
				$(".radio input[name="+escapeJquerySelector(name)+"]").each(function(n){
					$(this).prop("checked", false);
					$(this).closest(".radio").find("i").removeClass("active");
				})
				$(this).find("input").prop("checked", true);
				$(this).find("i").addClass("active");
			}
		});
	}
}

function initNewArrival() {
	$(".newArrival-banner .box a").on("mouseenter", function(e){
		e.preventDefault();
		$(this).find(".over").fadeIn("fast");
		$(this).find(".over").on("click", function(e){
			location.href= "../003.product/product.html";
		})
	}).on("mouseleave", function(e){
		$(this).find(".over").fadeOut("fast");
	})
}

function updatePrdHei() {
	$(".vertical-scroll .swiper-container").css({
		height:$(window).height()-150
	});
}

function updatePrdInfo() {
	$(".prd-info-m .content").stop().animate({
		top:$(window).height()
	},{
		queue:false,
		duration:300,
		complete:function(){
			$(".prd-info-m").hide();
		}
	});

	$(".prd-option-m").css({
		"z-index":9
	});
	$(".prd-option-m .content").stop().animate({
		bottom:-$(".prd-option-m .content").height()
	},{
		queue:false,
		duration:300,
		complete:function(){
			$(".prd-option-m").hide();
		}
	});
	$(".prd-option-m .content").on("click", function(e){
		updatePrdInfo()
	})
	undoWindow();

}
/*
function initSpinner() {
	if($(".spinner").size()>0) {
		$(".spinner").each(function(n){
			var preNum;
			if($(this).hasClass("disable")){
				$(this).find("input").attr("disabled","disabled");
			}
			//$(this).find("input").val((isNaN(parseInt($(this).attr("data-min")))?1:parseInt($(this).attr("data-min"))));
			$(this).find("a").off("click").on("click", function(e){
				e.preventDefault();
				if($(this).closest(".spinner ").find(".input-layout").hasClass("disabled")) return;

				if($(this).parent().hasClass("disable")) return;
				var n,
					v = parseInt($(this).parent().find("input").val());
				if(isNaN(v)){
					n = 1
				} else {
					if($(this).hasClass("btn-increase")){
						var max = (isNaN(parseInt($(this).parent().attr("data-max")))?100:parseInt($(this).parent().attr("data-max")));
						n = v+1;
						if(n>max) {
							n = max;
						}
					} else {
						var min = (isNaN(parseInt($(this).parent().attr("data-min")))?1:parseInt($(this).parent().attr("data-min")));
						var max = (isNaN(parseInt($(this).parent().attr("data-max")))?100:parseInt($(this).parent().attr("data-max")));
						n = v-1;
						if(n>max){
							n=max;
						}
						if(n<min) {
							n=min;
						}
					}
				}
				$(this).parent().find("input").val(n);
			});

			$(this).find("input").on("focusout", function(e){
				var n,
				    v = parseInt($(this).closest(".spinner").find("input").val()),
				    max = (isNaN(parseInt($(this).closest(".spinner").attr("data-max")))?100:parseInt($(this).closest(".spinner").attr("data-max"))),
					min = (isNaN(parseInt($(this).closest(".spinner").attr("data-min")))?1:parseInt($(this).closest(".spinner").attr("data-min")));

				if(isNaN(v))
					v = preNum;

				if(v>=min && v <=max) {
					n = v;
				} else {
					n = preNum;
				}
				$(this).parent().find("input").val(n);
			}).on("focusin", function(e){
				preNum = parseInt($(this).parent().find("input").val());
			})
		})
	}
};
*/
function initScore() {
	if($(".score").size()<1) return;
	$(".score").each(function(){
		var _this = $(this);
		_this.find(".star").removeClass("active");
		var t = parseInt(_this.attr("data-value"));
		for(var i=0; i<t; i++) {
			_this.find(".star").eq(i).addClass("active");
		};
	});

	$(".score.set").each(function() {
		var _this = $(this);
		_this.find("li").on("click", function(e){
			e.preventDefault();
			var id = $(this).index();
			_this.find("li").removeClass("active");
			for(var i=0; i<=id; i++) {
				_this.find("li").eq(i).addClass("active");
			}
			_this.attr("data-value",id+1)
		});
	});
}

function showPrdBottom() {
	$(".bottom-viewer .prd-info").attr("data-status","open");
	$(".bottom-viewer .prd-info").stop().animate({
		bottom:12+"px"
	},{
		duration:"fast",
		queue:false,
		complete:function(){
			$(".bottom-viewer>.package").css({"border-top":"none"});
		}
	});
	$(".bottom-viewer .prd-info a.btn-close").off("click").on("click", function(e){
		hidePrdBottom();
	});
}

function hidePrdBottom() {
	$(".bottom-viewer .prd-info").stop().animate({
		bottom:-200+"px"
	},{
		duration:"fast",
		queue:false,
		complete:function(){
			$(".bottom-viewer .prd-info").attr("data-status","close");
			$(".bottom-viewer>.package").css({"border-top":"1px solid #333"});
		}
	});
}

function initPrdMain() {
	if($(".prd-main").size()<1) return;

	$(".prd-view .web .content").attr("data-index", 0);
	/*
	var total_size = $(".prd-view .web>.content>.box").size();
	$(".page-transper>a").on("click", function(){
		var id = parseInt($(".prd-view .web .content").attr("data-index"));
		if($(this).hasClass("btn-left")) {
			id--;
			if(id < 0) id = total_size - 1;
		} else {
			id++;
			if(id == total_size) id = 0;
		}
		$(".prd-view .web .content>.box").hide();
		$(".prd-view .web .content>.box").eq(id).stop().fadeIn("fast");
		$(".prd-view .web .content").attr("data-index", id);
	})
	*/

	$(".page-transper>a").on("mouseenter", function(e){
		var status = "";
		if($(this).hasClass("btn-left")) {status = "이전"} else {status = "다음"}
		var str = '<div class="tooltip">'+status+'</div>';
		$(this).append(str);
		$(".page-transper .tooltip").css({
			left:-10
		});
		$(this).find("i.ico").css({
			"background-position-y":-69
		});

		$(this).on("mouseleave", function(){
			$(this).find("i.ico").css({
				"background-position-y":-60
			})
			$(".page-transper .tooltip").remove();
		});

	});

	$(".prd-main .prd-view #product_detail_btn").on("click", function(e){
		holdWindow();
		$(".prd-main .pull-right").show();
		$(".prd-main .prd-info").stop().animate({
			top:0
		},{
			duration:300,
			queue:false
		})
	});
	/*$(".prd-main .prd-info .btn-close:not([data-manual-close])").on("click", function(e){
		$(".prd-main .prd-info").stop().animate({
			top:"100%"
		},{
			duration:300,
			queue:false,
			complete:function(){
				$(".prd-main .pull-right").hide();
				undoWindow();
			}
		})
	});
	$(".expand").on("click", function(e){
		$(".expand").stop().fadeOut(500);
		undoWindow();
	});
	*/
	$(".prd-tab-list>ul>li>a").on("click", function(e){
		e.preventDefault();
		if(!$(this).find(">i").hasClass("active")) {
			$(".prd-tab-list .expand-layer").stop().slideUp("fast");
			$(".prd-tab-list>ul>li>a>i").removeClass("active");
			$(this).find(">i").addClass("active");
			$(this).next().stop().slideDown("fast");
		} else {
			$(".prd-tab-list .expand-layer").stop().slideUp("fast");
			$(".prd-tab-list>ul>li>a>i").removeClass("active");
		}
	});

	var total_thumb = $(".prd-view .web .thumb li").size();
	var isQuickView = $(".quick-view").length;
	var thumbSize = 8;
	if(isQuickView > 0){
		thumbSize = 7;
	}

	if(total_thumb>thumbSize) {
		$("#quick_view .body").css({"min-height":830});
	}

	if(total_thumb>thumbSize) {
		$(" .prd-view .web div.thumb a.btn-thumb.down").show();

		var cId = 0;
		$(".prd-view .web div.thumb a.btn-thumb.up").on("click", function(e){
			e.preventDefault();
			var i = cId -1;
			if(i>=0) {
				moveThumb(i);
			}

		})
		$(".prd-view .web div.thumb a.btn-thumb.down").on("click", function(e){
			e.preventDefault();
			//alert("1")
			var i = cId + 1;
			if(i<=total_thumb-1) {
			//	alert(i)
				moveThumb(i);
			}
		})

	}

	function moveThumb(i){

		var o_ul_thumb = $(".thumb ul#thumb");
		var o_li = o_ul_thumb.find("> li");
		var target = -(i*o_li.outerHeight());
		o_ul_thumb.animate({
			top:target
		},{
			duration:200,
			queue:false,
			complete:function(){
				$(".prd-view .web div.thumb a.btn-thumb.up").show();
				$(".prd-view .web div.thumb a.btn-thumb.down").show();

				if(i ==0) {
					$(".prd-view .web div.thumb a.btn-thumb.up").hide();
				} else if(i == parseInt(total_thumb)-thumbSize) {
					$(".prd-view .web div.thumb a.btn-thumb.down").hide();
				}
				cId = i;
			}
		})
	}

	$(".prd-view .web .thumb li a").on("click", function(){
		var to = $(this).closest(".content").attr("data-index")
		var id = $(this).parent().index();
		setWebPrdView(to, id);
	});

	$(".shipping-return dl dt").on("click", function(e){
		if(!$("body").hasClass("mobile")) return;
		if($(this).find("i").hasClass("active")) {
			$(this).find("i").removeClass("active");
			$(this).next().stop().slideUp("fast");
		} else {
			$(this).find("i").addClass("active")
			$(this).next().stop().slideDown("fast");
		}
	});
	$("#suggest").renderTab({});
	$("#review").renderTab({});

	$(".ico-q").on("mouseenter", function(e){
		$(this).next().fadeIn("fast");
	}).on("mouseleave", function(e){
		$(this).next().fadeOut("fast");
	})
	/*
	$(".prd-view .mobile .vertical-scroll .swiper-slide").css({
		height:$(window).height()
	})*/
	var touchtime = 0
	$("#m_detail_main").on("click", function(e){
		if( parseInt(isIEVersion()) == 99 || parseInt(isIEVersion()) < 15 ) return;
		if(touchtime == 0) {
	        touchtime = new Date().getTime();
	    } else {
	        if(((new Date().getTime())-touchtime) <500) {
	            holdWindow();
	    		renderMobileExpand();
	            touchtime = 0;
	        } else {
	            touchtime = new Date().getTime();
	        }
	    }
	});
	/*$(".btn-benefit-sale").off("mouseenter").on("mouseenter", function(e){
		if(getIsMobile()) return;
		$(this).closest(".price").find(".coupon-benefit").show();
	}).off("mouseleave").on("mouseleave", function(e){
		if(getIsMobile()) return;
		$(this).closest(".price").find(".coupon-benefit").hide();
	});
	$(".btn-benefit-sale").off("click").on("click", function(e){
		if(!getIsMobile()) return;
		$(this).closest(".price").find(".coupon-benefit").show();

		$(".coupon-benefit .btn-coupon-close").off("click").on("click", function(e){
			e.preventDefault();
			$(".coupon-benefit").hide();
		})
	});*/
}

function renderMobileExpand() {
	var str  = '<div class="mobile-expand"><a href="#none" class="btn-close"><i class="ico close-menu-m02">&nbsp;</i></a><div id="inverted-contain"><div class="panzoom-parent">';
	str+='<img class="panzoom" src="'+$("#m_sub01 .swiper-slide img").eq($("#m_sub01").attr("data-active")?$("#m_sub01").attr("data-active"):0).attr("data-expand-img")+'" width="100%" >'
	str+='</div></div></div>';
	$("body").append(str);
	$('#inverted-contain').find('.panzoom').panzoom({
		startTransform: 'scale(1.0)',
		increment: 1,
		minScale: 1.1,
		contain: 'invert'
	}).panzoom("zoom", 1.1, { animate: true });
	$(".mobile-expand a.btn-close").on("click", function(){
		undoWindow();
		$(".mobile-expand").remove();
	})
}

function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var w1 = 70;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var w2 = 70;
    var r2 = x2 + w2;

    if (r1 < x2 || x1 > r2) return false;
    return true;
  }

function initLogin() {
	if( $('#form').size()<1) return;
	var parsleyConfig = {
	        errorsContainer: function(parsleyField) {
	            var fieldSet = parsleyField.$element.closest("li");
	            if (fieldSet.length > 0) {
	                return fieldSet.find('.checkbox-errors');
	            }
	            return parsleyField;
	        }
	};
	 $('#form').parsley(parsleyConfig)
}

function updateChangeDevice() {
	/*크롬 981 / IE 974*/
	if (window.matchMedia("(min-width: 992px)").matches  && boolFlag) {
		$("body").removeClass("mobile");
		boolFlag = false;
		updateToggle();
	} else if(window.matchMedia("(max-width: 991px)").matches  && !boolFlag) {
		$("body").addClass("mobile");
		boolFlag = true;
		updateToggle();
	} else if(boolFlag == undefined) {
		boolFlag = false;
		updateToggle();
	}
}

function updateToggle() {
	//화면전환시 공통
	$(".g-layer").hide();
	$(".g-layer .layer").hide();
	$(".search-block").hide();

	$(".g-layer-sm").hide();
	/* [#3786] 메인화면 - fixed 레이어팝업 display 버그 */
	//$(".layer-sm").hide();

	//undoWindow();
	if($("body").hasClass("mobile")) {
		renderParallax(2);
		/* [#3786] 메인화면 - fixed 레이어팝업 display 버그 */
		$(".layer-sm").css('top',  '30%');
		/*
		$("header .web").css('animation-play-state',  "paused");
		$("header .web").css('-webkit-animation-play-state',  "paused");
		$("header .web").css('-moz-animation-play-state', "paused");
		$("header .mobile").css('animation-play-state',  "paused");
		$("header .mobile").css('-webkit-animation-play-state',  "paused");
		$("header .mobile").css('-moz-animation-play-state', "paused");
		*/
		/*
		$("header .mobile").css({"display":"block"});
		 $("header .web").stop().translate3d({
			y:-100+"px"
		},1);
	    $("header .mobile").stop().translate3d({
			y:0+"px"
		},1)
		*/
		 $("header .web").css({
			 "-webkit-transform": "translate3d(0, -100px, 0)",
			    "-moz-transform":"translate3d(0, -100px, 0)",
			    "-ms-transform": "translate3d(0, -100px, 0)",
			    "-o-transform": "translate3d(0, -100px, 0)",
			    "transform": "translate3d(0, -100px, 0)"
		 });

		  $("header .mobile").css({
			  "-webkit-transform": "translate3d(0, 0, 0)",
			    "-moz-transform":"translate3d(0, 0, 0)",
			    "-ms-transform": "translate3d(0, 0, 0)",
			    "-o-transform": "translate3d(0, 0, 0)",
			    "transform": "translate3d(0, 0, 0)"
		 });






		console.log(1)

	} else {
		var i;
		$(".prd-list.parallax").prev().find(".btn-option li").each(function(n){
			if($(this).find("a").hasClass("active")) {i=n;}
		})
		if(i==0) renderParallax(4);
		else renderParallax(5);

		$("header .web").css({"display":"block"});
		/*
		$("header .mobile").stop().translate3d({
			y:-50+"px"
		},1);
		$("header .web").stop().translate3d({
			y:0+"px"
		},1);
		*/

		 $("header .mobile").css({
			 "-webkit-transform": "translate3d(0, -50px, 0)",
			    "-moz-transform":"translate3d(0, -50px, 0)",
			    "-ms-transform": "translate3d(0, -50px, 0)",
			    "-o-transform": "translate3d(0, -50px, 0)",
			    "transform": "translate3d(0, -50px, 0)"
		 })

		  $("header .web").css({
			  "-webkit-transform": "translate3d(0, 0, 0)",
			    "-moz-transform":"translate3d(0, 0, 0)",
			    "-ms-transform": "translate3d(0, 0, 0)",
			    "-o-transform": "translate3d(0, 0, 0)",
			    "transform": "translate3d(0, 0, 0)"
		 })
	}
	/* 상품상세 확대보기 관련 레이어 */
	$(".prd-main .expand").hide();
	$(".prd-main .expand ul li").hide();
	$(".prd-main .pull-left").css({zIndex:1});
	$(".prd-main .pull-right").css({zIndex:4});
	renderExhibition_();
	// updateMdChoice();
}

function setPrdInfo_M() {
	$(".prd-info-m").show();
	$(".prd-info-m .content").stop().animate({
		top:0
	},{
		queue:false,
		duration:300
	})
}

function setPrdOption_M() {
	$(".prd-option-m").show();
	$(".prd-option-m .content").stop().animate({
		bottom:0
	},{
		queue:false,
		duration:300,
		complete:function(){
			$(".prd-option-m").css({
				"z-index":10
			})
		}
	})
}

// function initExhibitionBanner() {
// 	if($(".exhibition-banner").size()<1) return;
// 	renderExhibition();
// 	$(".add-exhibition-group a.add").on("click", function(e){
// 		e.preventDefault();
// 		$(".exhibition-banner li").show();
// 		$(this).hide();
// 		$("add-exhibition-group").hide();
// 	});
// 	/*
// 	$(".exhibition-banner li a").on("mouseenter", function(e){
// 		$(this).find("img").translate3d({
// 			y:"-5%",
// 			x:"-5%"
// 		})
// 	});
// 	*/
// } /* 180307 수정 */
function initExhibitionBanner_() {
	if($(".exhibition-banner").size()<1) return;
	renderExhibition_();
	$(".add-exhibition-group a.add").on("click", function(e){
		e.preventDefault();
		$(".exhibition-banner .addGroup").show();
		$(this).hide();
		$("add-exhibition-group").hide();
	});
	/*
	$(".exhibition-banner li a").on("mouseenter", function(e){
		$(this).find("img").translate3d({
			y:"-5%",
			x:"-5%"
		})
	});
	*/
} /* 180307 수정 */
// function renderExhibition() {
// 	if($(window).width()<=981){
// 		updateExhibition_();
// 	} else {
// 		$(".exhibition-banner li").show();
// 		$(".exhibition-banner a.add").hide();
// 		$("add-exhibition-group").hide();
// 	};
// } /* 180307 수정 */
/* 180323 수정 */
function renderExhibition_() {
	if (window.matchMedia("(max-width: 991px)").matches) {
		updateExhibition_();
	} else {
		$(".exhibition-banner .addGroup").show();
		$(".exhibition-banner a.add").hide();
		$("add-exhibition-group").hide();
	};
}
/* //180323 수정 */
/* 180307 수정 */
// function updateExhibition() {
// 	var bool = $(".exhibition-banner").attr("data-status");
// 	if(!bool) {
// 		for(var i=3; i<6; i++) {
// 			$(".exhibition-banner li").eq(i).hide();
// 		}
// 		$(".exhibition-banner a.add").css({"display":"inline-block"});
// 		$("add-exhibition-group").show();
// 	}
// } /* 180307 수정 */
function updateExhibition_() {
	var bool = $(".exhibition-banner").attr("data-status");
	if(!bool) {
		$(".exhibition-banner .addGroup").hide();
		$(".exhibition-banner a.add").css({"display":"inline-block"});
		$("add-exhibition-group").show();
	}
} /* 180307 수정 */
/* 180312 추가 */


function removeEffectBestSeller(id) {
	$("#gallery_body .slick-track").each(function(n){
    		if(id != n) {
    			$(this).find(".sub-list>div").css({
					"opacity":"0",
					"animation-play-state":"paused",
					"-webkit-animation-play-state":"paused",
					"-moz-animation-play-state":"paused",
					"transform": "translate3d(0, 50px, 0)"
				})
    		}
    	})
    	$(".bestSeller-banner").attr("data-target-index",String(id));
}
/* 180322 1차 수정 */ /* 180402 수정 */ /* 180419 수정 */
function effectBestSeller(id) {
	var count = -1;
	var interval = setInterval(function(){
		if(count<3) {
			$("#gallery_body .slick-track > div").eq(id).find(".sub-list > div").eq(count++).translate3d({
        		y:"0px"
        		},800).stop().animate({
        			opacity:1
        		},{
        			duration:200,
        			queue:false
        		})
		} else {
			clearInterval(interval);
		}
	}, 100)
	console.log($("#gallery_body .slick-track > div").eq(id).find(".sub-list>div").eq(count++))
}
/* //180322 1차 수정 */ /* //180402 수정 */ /* //180419 수정 */
function initCS() {
	$("ul.store-list>li.clearfix").remove();
	$("ul.store-list>li").each(function(n){
		if(n!=0 && n%3==0) {
			$(this).before('<li class="clearfix" />')
		}
	})
};

function initEvent() {
	$(".list-event .package>.clearfix").remove();
	$(".list-event .group").each(function(n){
		if(n!=0 && n%3==0) {
			$(this).before('<div class="clearfix" style="float:none; clear:both; width:100%;" />')
		}
	})
}

var boolFlag;
var App = function() {
	"use strict";
	return {
		init : function() {
			initCommon();
			//initMainBanner();
			initExhibitionBanner_(); /* 180307 수정 */
			//initNewArrival();
			// initMdChoice('#js-load','8','.add-mdChoice-group')

			initHeader();

			initPrdList()

			//상세페이지
			initPrdMain();

			//spinner
			//initSpinner();

			initScore();

			initCheckbox();

			initRadio();

			initSelect();

			initLogin();

			initMypage();

			initCS();

			initEvent();
		}
	};
}();

$(window).on("load", function(){
	App.init();

});
/* 플러그인 */
var delay = 0;
$.fn.translate3d = function(translations, speed, easing, complete, delay) {
    var opt = $.speed(speed, easing, complete);
    opt.easing = opt.easing || 'ease';
    translations = $.extend({x: 0, y: 0, z: 0}, translations);
    return this.each(function() {
        var $this = $(this);
        $this.css({
            transitionDuration: opt.duration + 'ms',
            transitionTimingFunction: opt.easing,
            transform: 'translate3d(' + translations.x + ', ' + translations.y + ', ' + translations.z + ')',
            '-webkit-transform': 'translate3d(' + translations.x + ', ' + translations.y + ', ' + translations.z + ')'
        });
        setTimeout(function() {
            $this.css({
                transitionDuration: '0s',
                transitionTimingFunction: 'ease'
            });
            opt.complete();
        }, opt.duration + (delay || 0));
    });
}

//Btn option
$.fn.renderBtnOption = function(options) {
	options = $.extend({
		mouseover:null,
		mouseout:null,
		update:null,
		allClear:null
	}, options);
	var opts = {};
	var obj = {};
	opts = $.extend({}, options);
	var renderBtnOption = {
			init:function() {
				obj = $(this);
				this.active();
			},
			active:function(){
				obj.find("ul>li a").on("mouseenter", function(e){
					var index = parseInt($(this).closest("li").index());
					var alt = ($(this).find("span").attr("alt")?$(this).find("span").attr("alt"):"");
					var e = {
							obj:$(this).parent(),
							_this:$(this),
							index:index,
							alt:alt
					}
					if(opts.mouseout == null || opts.mouseout == "null")
						return
					opts.mouseover(e);
				});

				obj.find("ul>li a").on("mouseleave", function(e){
					var index = parseInt($(this).closest("li").index());
					var alt = ($(this).find("span").attr("alt")?$(this).find("span").attr("alt"):"");
					var e = {
							obj:$(this).parent(),
							_this:$(this),
							index:index,
							alt:alt
					}
					if(opts.mouseout == null || opts.mouseout == "null")
						return
					opts.mouseout(e);
				})

				obj.find("ul>li a").on("click", function(e){
					e.preventDefault();

					if($(this).closest(".prd-main").length || $(this).closest(".bottom-viewer").length) {

					} else {
						if($(this).hasClass("disabled") ) return;
					}

					var index = parseInt($(this).closest("li").index());
					var alt = ($(this).find("span").attr("alt")?$(this).find("span").attr("alt"):"");
					var e = {
							obj:obj,
							index:index,
							alt:alt,
							active:false
					}
					if(obj.hasClass("filter")) {
						if(obj.find("ul>li a").eq(index).hasClass("active")) {
							obj.find("ul>li a").eq(index).removeClass("active");
						} else {
							obj.find("ul>li a").eq(index).addClass("active");
							e.active = true;
						}
					} else {
						obj.find("ul>li a").removeClass("active");
						obj.find("ul>li a").eq(index).addClass("active");
						e.active = true;
					}
					opts.update(e);
				});
				obj.find(".name a.btn-clear").on("click", function(){
					opts.allClear(obj);
				})
			}
	}
	this.clear = function(){
		if (typeof obj.find === 'undefined' || !$.isFunction(obj.find)) return;
		obj.find("ul li a").removeClass("active");
	}
	return this.each(function(n) {
		$.fn.extend(this, renderBtnOption);
		this.init();
	});
};

$.fn.renderTab = function(options) {
	options = $.extend({
		update:null
	}, options);
	var opts = {};
	var obj = {};
	opts = $.extend({}, options);
	var renderTab = {
			init:function() {
				obj = $(this);
				this.active();
			},
			active:function(){
				obj.find("a").off("click").on("click", function(e){
					if($(this).closest(".g-tab").hasClass("dev")) return;
					e.preventDefault();
					var id = $(this).closest("li").index();
					var name = $(this).closest(".g-tab").attr("id");
					var e = {
							obj:obj,
							id:id,
							name:String("tab-"+name)
					}
					$(this).closest(".g-tab").find("a").removeClass("active");
					$(this).addClass("active");
					$('div[class*="tab-'+name+'"]').hide();
					$('div[class*="tab-'+name+'"]').eq(id).show();
					if(opts.update)
						opts.update(e);
				});

			}
	}
	return this.each(function(n) {
		$.fn.extend(this, renderTab);
		this.init();
	});
};

$.fn.renderCustomTab = function(options) {
	options = $.extend({
		update:null
	}, options);
	var opts = {};
	var obj = {};
	opts = $.extend({}, options);
	var renderTab = {
			init:function() {
				obj = $(this);
				this.active();
			},
			active:function(){
				obj.find("a").off("click").on("click", function(e){
					e.preventDefault();
					var id = $(this).closest("li").index();
					var name = $(this).closest("ul").attr("id");
					var e = {
							obj:obj,
							id:id,
							name:String("tab-"+name)
					}
					$(this).closest("ul").find("a").removeClass("active");
					$(this).addClass("active");
					if(opts.update)
						opts.update(e);
				});
			}
	}
	return this.each(function(n) {
		$.fn.extend(this, renderTab);
		this.init();
	});
};

function isScroll() {
	var st = $(document).scrollTop();
	if(100>=st) {
		return false;
	} else {
		return true;
	}
}

function undoWindow() {
	var top = -parseInt(($("body").css("top")));
	$("html, body").css({
		position:"relative",
		top:0
	});
	$("html, body").scrollTop((top));
	//updateChangeDevice();
	updateToggle();
}
function holdWindow() {
	var top = $(document).scrollTop();
	$("html, body").css({
		position:"fixed",
		top:-top
	});
}
/*
function holdWindow() {
	$("body").css({overflow:'hidden'}).on('touchmove', function(e){e.preventDefault()});
}
function undoWindow() {
	$("body").css({overflow:'inherit'}).on('touchmove');
}
*/

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getByteLength(s,b,i,c){
    for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
    return b;
}

function getContentLength(value) {
	var exp = /(\r\n|\r|\n)/g
	var matches = value.match(exp);
	var contentLength = value.length;
	if (matches != null) {
		contentLength += matches.length;
	}
	return contentLength;
}


function getIsMobile() {
	if($("body").hasClass("mobile")) {
		return true;
	} else {
		return false;
	}
}

function setLock(_bool) {
	var b;
	((_bool=="undefined" || _bool==undefined)? b = "true":b=_bool)
	if(b) {
		var str = '<div class="lock-screen" />';
		$("body").append(str)
	} else {
		$(".lock-screen").remove();
	}
}

function setBtnLock(_this, bool) {
	var $this = $(_this);
	var con = $this.parent();
	con.css({position:"relative"})
	$this.parent().append('<div class="btn-locker" />')
}

function setBtnunLock() {
	$(".btn-locker").remove();
}

function closeWindow() {
    var isiPad = navigator.userAgent.match(/iPad/i) != null;
    var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
    if (isiPad || isiPhone) {
       setTimeout("refresh()", 300 );
    } else {
       window.close();
    }
}

function urlCheck(domain,path){

	if((domain.charAt(domain.length - 1)) == "/" && (path.charAt(0) == "/")){
	path = path.substring(1);
	} else if(!(domain.charAt(domain.length - 1) == "/")){
	if(!(path.charAt(0) == "/")){
	path = "/" + path;
	}
	}

	return domain + path;
}



function isIEVersion() {
	var ie_vs = "7"; // ie버전 체크
	var mobile_vs = ""; // 모바일 체크
	var IEIndex = navigator.appVersion.indexOf("MSIE"); // MSIE를 찾고 인덱스를
	var IE8Over = navigator.userAgent.indexOf("Trident"); // MS IE 8이상 버전

	if (IEIndex > 0 || IE8Over > 0) {
		var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);
		if (trident != null) {
			switch (trident[1]) {
			case "7.0":
				ie_vs = "11";
				break;

			case "6.0":
				ie_vs = "10";
				break;

			case "5.0":
				ie_vs = "9";
				break;

			case "4.0":
				ie_vs = "8";
				break;

			default:
				ie_vs = "8";
				break;
			}
		}
		return ie_vs;

	} else if (IEIndex == -1 || IE8Over == -1) {
		mobile_vs = "99";
		var ua = window.navigator.userAgent.toLowerCase();
		if (/ipad/.test(ua))
			mobile_vs = "ipad";
		if (/iphone/.test(ua))
			mobile_vs = "iphone";
		if (/android/.test(ua))
			mobile_vs = "android";
		if (/opera/.test(ua))
			mobile_vs = "opera";
		if (/bada/.test(ua))
			mobile_vs = "bada";

		return mobile_vs;
	}
	// alert(mobile_vs);
	// alert("ie_vs = "+ie_vs); //ie_vs가 99일때는 크롬,사파리,파폭
}


window.matchMedia || (window.matchMedia = function() {
    "use strict";
    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);
    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;
        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';
        script.parentNode.insertBefore(style, script);
        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;
        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';
                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }
                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }
    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());

// String.prototype.xxxx 정의
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position){
		position = position || 0;
		return this.substr(position, searchString.length) === searchString;
	};
}

if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(searchString, position) {
		var subjectString = this.toString();
		if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
		  position = subjectString.length;
		}
		position -= searchString.length;
		var lastIndex = subjectString.indexOf(searchString, position);
		return lastIndex !== -1 && lastIndex === position;
	};
}






$(document).ready(function() {
	//disabledEventHandler();
});

function disabledEventHandler() {
	if (window.envProf == "prd") {

		$(document).on("contextmenu", function(e) {
			console.log("right mouse click disabled");
			return false;
		});

		$('img').on("contextmenu",function(e) {
			console.log("img is right mouse click disabled");
			return false;
		});

		$('img').on("selectstart",function(e) {
			console.log("img is right mouse click disabled");
			return false;
		});

		$(document)
			.on("keydown", function(e) {
				if (e.keyCode == 123) { //e.keyCode == 44 || 
					// PrtSc | F12
					console.log("keyDown - keyCode : " + e.keyCode);
					e.preventDefault();
					e.returnValue = false;
					return false;
				}
			});

		/*$(window)
			.on("keyup", function(e) {
				if (e.keyCode == 44) {
					// PrtSc
					console.log("keyUp - keyCode : " + e.keyCode);
					if (window.clipboardData) {
						window.clipboardData.clearData();
					}
					console.log("PrtSc is disabled");
					e.preventDefault();
					e.returnValue = false;
					return false;
				}
			});

		setInterval(function(){
			if (window.clipboardData) {
				window.clipboardData.clearData();
			}
		}, 600);*/
		//$("body").on("selectstart", function(e) { console.log("selection is disabled"); return false; });
		//$("body").on("dragstart", function(e) { console.log("drag is disabled"); return false; });
	}
}


//Task #5790 [FO] SEO 업그레이드 2018-09-20 : 상품명/이벤트명/카테고리명 특수문자 치환처리
function seoKeySpecialWordChange(seoKeyWord){
	var word = "";
	if(seoKeyWord != null){
		word = seoKeyWord.replace(/([\s-(){}+?*.$\^|,:#<!\\//])/g, '-').replace(/([%\[\]])/g, '');
	}
	return word;
}