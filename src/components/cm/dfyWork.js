;(function($) { 'use strict';

var CATEGORY_KIND = '';
var FILTER_LIST_WRAP_HEIGHT;
var currentScrollTop;
var resizeAble = false;

var lang = (location.pathname.indexOf('seoul') > -1 || location.pathname.indexOf('ko') > -1) ? 'ko' : 'en';

var cookieName = 'testCookie' + (new Date().getTime());
	document.cookie = cookieName + '=cookieValue';
	var cookiesEnabled = document.cookie.indexOf(cookieName) != -1;
	var cookiesTrue = (cookiesEnabled) ? true : false;

var initProjectList = function() {
	var isWorkListPage = !!($('#document').hasClass('work-list'));
	var isWorkDetailPage = !isWorkListPage;

	// load
	D.FY.on('load', function() {
		var initKind = 'kind-1';
		var parameter = document.location.href.split('?list=')[1];
		var currentUrl = location.href.split('?')[0];

		if(parameter){
			if (parameter <= 12) {
				initKind = 'kind-'+parameter;
			}else {
				if (!$('html').hasClass('ie9')) {
					history.pushState({}, '', currentUrl);
				}else {
					location.assign(currentUrl);
				}
			}
		}else {
			if (location.href.split('?')[1] != undefined && location.href.split('?')[1].length >= 0) {
				if (!$('html').hasClass('ie9')) {
					history.pushState({}, '', currentUrl);
				}else {
					location.assign(currentUrl);
				}
			}
		}

		isWorkListPage && workListParameter(initKind);
		isWorkListPage && resizeProjectList(initKind);
		isWorkDetailPage && workDetailParameter(initKind);
		isWorkDetailPage && detailPageBg();
		isWorkDetailPage && creditsThumbGradient();
		isWorkDetailPage && workDetailSectionZIndex();
		isWorkDetailPage && TweenLite.to($('#o-background img'), 1, {scale:1 ,onUpdate: function () {
			D.FY._scroll();
		}});
		isWorkDetailPage && shareUrl();

		if (isWorkListPage && cookiesTrue && sessionStorage.getItem('cookiePage')) {
			sessionStorage.setItem('cookieScrollTop', sessionStorage.getItem('cookieSelectScrollTop'));	
			sessionStorage.removeItem('cookiePage');
		}

		if (cookiesTrue) {
			if(isWorkListPage && sessionStorage.getItem('cookieScrollTop')) {
				$('html, body').scrollTop(sessionStorage.getItem('cookieScrollTop')-100);
				sessionStorage.removeItem('cookieScrollTop');
			}else {
				var scrollView = (sessionStorage.getItem('scrollview')) ? sessionStorage.getItem('scrollview') : 0;
				$('html, body').scrollTop(scrollView);
			}
		}

		var showDelay = (isWorkListPage) ? 100 : 0;
		setTimeout(function () { $('body').addClass('show'); },showDelay);

		// url reload
		if (history.pushState && !$('html').hasClass('ie9')) {
			$(window).off('activepreview')
			.on('popstate.activepreview', function(e) {
				location.reload();
			});
		}

		resizeAble = true;
	});

	// resize
	D.FY.on('resize', function () {
		if (resizeAble) isWorkListPage && projectListPosition();
		isWorkListPage && resizeProjectListFilter();
		isWorkDetailPage && creditsHeight();
		isWorkDetailPage && workSlideHeight();
	});

	// scroll
	D.FY.on('scroll', function () {
		if (cookiesTrue) {
			if (isWorkListPage && $('body').hasClass('show')) {
				sessionStorage.setItem('scrollview', $(window).scrollTop());
			}else if(isWorkDetailPage) {
				sessionStorage.removeItem('scrollview');
			}
		}
	});

	// +18.04.23 불필요한 소스 제거.
	var $wrap = $('.projects .projects-list > .wrap'),
		$sections = $wrap.find('> section'),
		$projectShowreel = $('.projects-list-showreel');

	if ( workListData && workListData[lang].constructor === Array ) {
		isWorkListPage && workListThumnailCount(workListData[lang]);
		isWorkDetailPage && workDetailPageJumpData(workListData[lang]);
	}

	// 상세페이지 - 이미지 로드 후 정보 갱신
	$('.x-gallery').each(function() {
		$(this).find('img:first').on('smartLoad', function() {
			workSlideHeight();
		});
	});
	$('.x-credits .o-img>img').on('smartLoad', creditsHeight);

	// 이벤트 추가.
	$('.filter-all a').on('click', mobCategorySelect);
	$('.filter-list-wrap a').on('click', categorySelect);
	$(document).on('click','.projects-list .wrap a', function (e) {
		if (cookiesTrue) {
			sessionStorage.setItem('cookiePage', $(this).attr('href'));
			sessionStorage.setItem('cookieSelectScrollTop', $(this).offset().top);
			sessionStorage.removeItem('scrollview');
		}
	});
	$('.back-btn a').on('click', function () {
		if (cookiesTrue) sessionStorage.setItem('cookieScrollTop', sessionStorage.getItem('cookieSelectScrollTop'));
	});
	$(document).on('click','.page-jump-bottom a', function (e) {
		if (cookiesTrue) sessionStorage.setItem('cookieSelectScrollTop', 0);
	});
	$(document).on('click','.hamburger a', function (e) {
		if (cookiesTrue) {
			sessionStorage.setItem('cookieScrollTop',0);
			sessionStorage.setItem('scrollview',0);
		}
	});
};

/**
 * 카테고리 선택
 */
var categorySelect = function(e) {
	e.preventDefault();
	if (!$(this).hasClass('on')) {
		var kind = $(this).data('kind');
		if ( CATEGORY_KIND == kind ) return false;

		// reset
		$('.projects .projects-list > .wrap > section').removeClass('col-0 col-1 showed hello visible hide on').css('top',0);
		$('.projects .projects-list > .wrap > section').find('.o-img-wrap').removeClass('img-motion');
		$('.projects .projects-list > .wrap > section').find('.o-img').removeClass('hello');
		$('.projects .projects-list > .wrap > ul').removeClass('hello');
		vewportArray = [];
		resizeProjectList(kind);
		CATEGORY_KIND = kind;

		var currentUrl = location.href.split('?')[0];

		if (kind.split('kind-')[1] == 1) {
			if (!$('html').hasClass('ie9')) {
				history.pushState({}, '', currentUrl);
			}else {
				location.assign(currentUrl);
			}
		}else {
			if (!$('html').hasClass('ie9')) {
				history.pushState({}, '', currentUrl+'?list='+(kind.split('kind-')[1]));
			}else {
				location.assign(currentUrl+'?list='+(kind.split('kind-')[1]));
			}
		}

		workListParameter(CATEGORY_KIND);

		showProjectListFilter();

		D.FY.updateUI();
	}
}

var mobCategorySelect = function(e) {
	var modeV = $.richscript.viewport.mode.name;
	if (modeV == "V1" || modeV == "V2") showProjectListFilter();
	e.preventDefault();
}
/**
 * work list 파라미터 값 설정
 */
var workListParameter = function (kind) {
	var $fliterAll = $('.projects-list > .head > .filter .filter-all');

	$('.filter-list-wrap a').removeClass('on');
	$('.filter-list-wrap a[data-kind="'+kind+'"]').addClass('on');
	$fliterAll.find('u').text($('.filter-list-wrap li a.on').text());

	$('.pj-list .wrap a').each(function () {
		var href = $(this).attr('href');
		href = href.split('?')[0];

		if (kind.split('kind-')[1] == 1) {
			$(this).attr('href', href.split('?')[0])
		}else {
			$(this).attr('href', href+'?list='+(kind.split('kind-')[1]));
		}
	});
}
/**
 * work detail 파라미터 값 설정
 */
var workDetailParameter = function (kind) {
	var backHref = $('.back-btn a').attr('href');
	var bannerHref = $('.page-jump-bottom a').attr('href');
	backHref = backHref.split('?')[0];

	if (kind.split('kind-')[1] == 1) {
		$('.back-btn a').attr('href', backHref.split('?')[0])
		$('.page-jump-bottom a').attr('href', bannerHref.split('?')[0])
	}else {
		$('.back-btn a').attr('href', backHref+'?list='+(kind.split('kind-')[1]));
		$('.page-jump-bottom a').attr('href', bannerHref+'?list='+(kind.split('kind-')[1]));
	}
}

/**
 * 썸네일 및 목록 리스트 카운트 설정.
 * @kind{Array} - 프로젝트 리스트
 */
var workListThumnailCount = function(arr) {
	if ( arr == null || !arr.length ) return;

	var maxLens = workListData[lang].length;
	$('#wrap .wrap section p.no').each(function(i) {
		$(this).html(maxLens-i);
	});
	$('#wrap .wrap li p.no').each(function(i) {
		$(this).html(maxLens-i);
	});
}

/**
 * 상세페이지 - 프로젝트 카운트 설정 및 하단 Jump영역 정보 갱신.
 * @kind{Array} - 프로젝트 리스트
 */
var workDetailPageJumpData = function(arr) {
	if ( arr == null || !arr.length ) return;
	var thisPath = location.pathname.replace(location.pathname.split('/').pop(), '');
	var thisKind = (!location.href.split('?list=')[1]) ? 1 : location.href.split('?list=')[1];
	var arr2 = [];

	// 소팅된 카테고리에 속해있는 컨텐츠들로 다시 배열
	var thisKindIndex = arr.map(function(e) {
		if (e.list.indexOf('kind-'+thisKind) != -1) arr2.push(e);
		return e.list;
	}).indexOf('kind-'+thisKind);

	// 전체 컨텐츠 내에 index
	var totalThisPathIndex = arr.map(function(e) {
		return e.url;
	}).indexOf(thisPath);

	// 소팅된 카테고리내에 index
	var thisPathIndex = arr2.map(function(e) {
		return e.url;
	}).indexOf(thisPath);

	// 컨텐츠가 해당 카테고리에 안속해 있으면 all로 소팅
	if (thisPathIndex == -1) location.href = location.href.split('?')[0];

	if ( thisPathIndex > -1) {
		var maxLens = arr.length;

		// next Index
		thisPathIndex += 1;
		var oriIndex = totalThisPathIndex;

		if ( thisPathIndex == arr2.length ) thisPathIndex = 0;
		var data = arr2[thisPathIndex];
		var kvImage  = (lang == 'ko') ? data.url.split('/seoul')[1] + 'images/next_jump.jpg' : data.url + 'images/next_jump.jpg';
		var htmlArr  = [];
			data.cnt = (maxLens - oriIndex);

		// 상단KV 영역 INDEX
		$('.x-keyvisual .number p').html(data.cnt + '<sup>N.</sup>');

		if (arr2.length > 1) {
			htmlArr.push('<div class="page-jump-bottom type2">');
			htmlArr.push('	<a href="'+ data.url+'">');
			htmlArr.push('		<div class="page-jump-bottom-txt">');
			htmlArr.push('			<span>Next project</span>');
			htmlArr.push('			<p>'+ data.title +'<span class="x-stroke">'+data.company+'</span></p>');
			htmlArr.push('		</div>');
			htmlArr.push('		<div class="jump-mask"></div>');
			htmlArr.push('		<figure>');
			htmlArr.push('			<div class="o-img type-jump"><img src="/D.FY" data-src="//cdn.dfy.co.kr'+ kvImage +'" data-width="1920" data-height="1200" data-bgcolor="#000" alt=""></div>');
			htmlArr.push('		</figure>');
			htmlArr.push('	</a>');
			htmlArr.push('</div>');

			if ( !$('.page-jump-bottom').length ) {
				$('body').append( htmlArr.join('\r\n') );
				D.FY.updatePageJump();
			} else {
				$('.page-jump-bottom a').attr('href', data.url);
				$('.page-jump-bottom .page-jump-bottom-txt>p').html(data.title);
				$('.page-jump-bottom .o-img>img').attr('data-src', kvImage);
			}
		}
	}
	// 소팅된 카테고리내에 컨텐츠가 2개 미만 이면 jump navi 제거
	if (arr2.length <= 1) {
		$('#document').removeClass('jump-type');
	}
}

/**
 * 리스트 생성
 * @kind{String} - 카테고리 값
 */
var resizeProjectList = function(kind, forced) {
	if ( forced!==true && CATEGORY_KIND == kind ) return false;
	CATEGORY_KIND = kind;

	var $wrap = $('.projects .projects-list > .wrap'),
		$thumbSection = $wrap.find('> section'),
		kindLength = 0,
		currentIdx = 0,
		firstInfo;

	$wrap.find('> ul').remove();

	// kind length
	$thumbSection.each(function() {
		var kindList = $(this).data('kind').split(' '),
			featured = $(this).hasClass('featured');
		if ( kindList.indexOf(kind) > -1) {
			$(this).addClass('selected').find('a').attr('tabIndex', '');
			$(this).removeClass('hide');
			if (!featured) kindLength++;
		} else {
			$(this).removeClass('selected').find('a').attr('tabIndex', '-1');
			$(this).addClass('hide');
		}
	});

	// ul append
	$thumbSection.each(function() {
		var	$this = $(this),
			kindList = $this.data('kind').split(' '),
			featured = $this.hasClass('featured');

		var infoSrc = $this.find(' > a').attr('href'),
			infoNo = ($this.find('.no').length) ? $this.find('.no').text() : '-',
			infoText = $this.find('h3').html(),
			infoAlert = ($this.find('.alert.wait').length) ? '<p class="alert">Coming soon</p>' : '<p class="alert">'+$this.find('.alert').text()+'</p>';

		if (kindList.indexOf(kind) > -1 && !featured) {
			currentIdx++;

			if (currentIdx%2 == 0) {
				$(this).after(
					'<ul class="o-smart-area" data-point=".9" data-kind="'+kind+'">'+
						'<li>'+firstInfo+'</li>'+

						'<li>'+
							'<a href="'+infoSrc+'">'+
								'<p class="no">'+infoNo+'</p>'+
								'<h3>'+infoText+'</h3>'+
								infoAlert+
							'</a>'+
						'</li>'+
					'</ul>'
				);
			} else {
				if (currentIdx == kindLength) {
					$(this).after(
						'<ul class="o-smart-area" data-point=".9" data-kind="'+kind+'">'+
							'<li>'+
								'<a href="'+infoSrc+'">'+
									'<p class="no">'+infoNo+'</p>'+
									'<h3>'+infoText+'</h3>'+
									infoAlert+
								'</a>'+
							'</li>'+
						'</ul>'
					);
				} else {
					firstInfo = (
						'<a href="'+infoSrc+'">'+
							'<p class="no">'+infoNo+'</p>'+
							'<h3>'+infoText+'</h3>'+
							infoAlert+
						'</a>'
					)
				}
			}
		}
	});

	// thumbs position
	projectListPosition();
	D.FY.updateSmartObjects( $wrap.find('ul.o-smart-area') );
};

/**
 * 리스트 위치 지정
 * @kind{String} - 카테고리 값
 */
window.projectListPosition = function () {
	var $wrap = $('.projects .projects-list > .wrap'),
		cols = [0,0],
		cnt  = 0;

	var $thumbs = $wrap.find($.richscript.viewport.v>2 ? '> section.selected, > ul' : '> section');
	$thumbs.each(function(k) {
		var $this = $(this);

		var height     = $(this).outerHeight(),
			featured   = $(this).hasClass('featured'),
			index      = !featured ? ((cols[1]<cols[0]) ? 1 : 0) : (cols[1]>cols[0]) ? 1 : 0,
			top        = cols[index],
			thumbsKind = $(this).data('kind');

		var kindList = thumbsKind.split(' ');

		$(this).removeClass('col-0 col-1 hide visible');

		if (kindList.indexOf(CATEGORY_KIND) > -1) {
			if ($.richscript.viewport.v>1) {
				cols[index] += height;
				if (featured) {
					index = 0;
					cols[0] = cols[1] = top+height;
				}
			} else {
				index = cnt%2;
				if (!featured) {
					++cnt;
				}
			}
			$(this).addClass('tile visible col-'+index).css({top:top});
		}else {
			$(this).addClass('hide');
		}
	});

	if ($.richscript.viewport.v>1) {
		$wrap.css({height:Math.max(cols[0],cols[1])});
	}
};

/**
 * 카테고리 펼침 (모바일에서만 사용)
 */
var showProjectListFilter = function() {
	var $fliterListWrap = $('.projects-list > .head > .filter .filter-list-wrap');
	var $fliterAll = $('.projects-list > .head > .filter .filter-all');
	FILTER_LIST_WRAP_HEIGHT = $fliterListWrap.find('> ul').height();

	if (!$fliterListWrap.hasClass('on')) {
		$fliterAll.addClass('on');
		$fliterListWrap.animate({
			'opacity' : 1,
			'height' : FILTER_LIST_WRAP_HEIGHT
		},500, 'dfy', function () {
			$fliterListWrap.addClass('on');
		});
	}else {
		$fliterAll.removeClass('on');
		$fliterListWrap.animate({
			'opacity' : 0,
			'height' : 0
		},500, 'dfy', function () {
			$fliterListWrap.removeClass('on');
			D.FY.updateUI();
		});
	}
};

/**
 * 카테고리 높이 변경
 */
var resizeProjectListFilter = function () {
	var $fliterListWrap = $('.filter-list-wrap');
	FILTER_LIST_WRAP_HEIGHT = $fliterListWrap.find('> ul').height();
	if ($fliterListWrap.hasClass('on')) $fliterListWrap.css('height', FILTER_LIST_WRAP_HEIGHT);
}

/**
 * 상세페이지 - zIndex 지정
 */
var workDetailSectionZIndex = function () {
	var sectionLength = $('.projects-view > section.o-full').length;
	$('.projects-view > section.o-full').each(function (i) {
		$(this).css('zIndex', sectionLength-i);
	});
}

/**
 * 상세페이지 - gallery 높이 지정.
 */
var workSlideHeight = function () {
	$('.x-gallery.work-gallery').each(function () {
		var $this = $(this);
		if ($this.find('.media').length) $this.find('.flickity-viewport').css('height', $this.find('.media').height());
	});
}

/**
 * 상세페이지 - SNS Share
 */
var shareUrl = function (kind) {
	var shareurl = encodeURIComponent(location.href);

	$('.share a').each(function () {
		var kind = $(this).data('kind'),
			thisHref;
		if(kind == 'google') {
			thisHref = 'https://plus.google.com/share?url='+ shareurl;
		}else if(kind == 'twitter') {
			thisHref = 'https://twitter.com/intent/tweet?text='+ encodeURIComponent(document.title) +'&url='+ shareurl;
		}else if(kind == 'facebook') {
			thisHref = 'https://www.facebook.com/sharer/sharer.php?u='+ shareurl;
		}
		
		$(this).attr('href', thisHref);
		$(this).after('<button class="fake-btn '+'btn'+($(this).parent().index()+1)+'"><span>'+$(this).find('span').text()+'</span></button>');
		$(this).next('button.fake-btn').on('click', function () {
			$(this).prev()[0].click();
		});
	});
}
/**
 * 상세페이지 - document, section 배경 색상 지정
 */
var detailPageBg = function () {
	var bgColor = $('#document').data('bgcolor');
	$('#document').css('background-color', bgColor);

	$('.projects-view > section').each(function () { if ($(this).data('bgcolor')) $(this).css('background-color', $(this).data('bgcolor')); });
}
/**
 * 상세페이지 - Credits 마스크 색상 지정.
 */
var creditsThumbGradient = function () {
	var bgColor = $('#document').attr('style');
	bgColor = bgColor.split('(')[1];
	bgColor = bgColor.split(')')[0];
	$('.x-credits .gradient-bg').css('background', 'linear-gradient(to right, rgba('+bgColor+', 0.6), rgba('+bgColor+', 0))');
}

/**
 * 상세페이지 - Credits 높이 설저
 */
var creditsHeight = function() {
	var creditsTitleH   = $('.x-credits .wrap h3').height();
	var creditsTeamH    = $('.x-credits .wrap .team').height();
	var creditsimageH   = $('.x-credits .wrap figure').height();
	var creditsimageTop = $('.x-credits .wrap figure').css('top');

	if (creditsTitleH+creditsTeamH >= creditsimageH+parseInt(creditsimageTop,10)) {
		$('.x-credits .wrap').css('height', creditsTitleH+creditsTeamH);
	}else {
		$('.x-credits .wrap').css('height', creditsimageH+parseInt(creditsimageTop,10) );
	}
}

$(initProjectList);
})(jQuery);