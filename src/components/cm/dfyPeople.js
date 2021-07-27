;(function($){ 'use strict';
function Shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

var DFY_Members = function() {
	var $wrap,
		$members,
		$categorys,
		$categoryText,
		// arrCate = [],
		arrList = [],
		nowCategory = '';

	var _init = function() {
		_asset();
		_addEvent();

		_showList();
	}
	var _asset = function() {
		var $this, cates;

		$wrap      = $('.people-list-wrap>ul');
		$members   = $wrap.find('li');
		$categorys = $('.filter-list-wrap a');
		$categoryText = $('.filter-all u');

		$categorys.each(function() {
			var type = $(this).data('peopleType');
			// arrCate.push(type);
			arrList[type] = [];
		});

		$members.each(function() {
			$this = $(this).detach();
			cates = $this.data('people').split(' ');
			arrList['all'].push( $this );
			for(var i=0; i<cates.length; i++) {
				arrList[cates[i]].push( $this );
			}
		});

		var tempArr=[];
		$.each(arrList['leadership'], function(i) {
			tempArr[$(this).data('count')] = this;
		});
		arrList['leadership'] = tempArr;
	}
	var _addEvent = function() {
		$categorys.on('click.members', function(e) {
			var cate = $(this).data('peopleType');
			_showList(cate);
			return false;
		});
	}

	var _showList = function(type) {
		var cate = type || 'all';
		if (cate == nowCategory) return false;
		nowCategory = cate;

		// remove && empty
		$wrap.find('>li').removeClass('hello');
		$wrap.empty();

		// make Members
		if (cate == 'all') {
			$wrap.append( Shuffle(arrList[cate]) );
		} else {
			// $.each(, function() {
				$wrap.append(arrList[cate]);
			// });
		}

		D.FY.updateUI();

		// select category
		// $categoryText.text(this.innerText);
		// $categorys.removeClass('on').filter('["data-people-type="'+cate+']');
		$(window).trigger('resize');
	}

	_init();
}

var peopleList = function(){
	var $peopleWrap = $('.people-list'),
		$peopleTab      = $peopleWrap.find('.filter-list-wrap'),
		$peopleListWrap = $peopleWrap.find('.people-list-wrap'),
		$peopleTabList  = $peopleTab.find('li'),
		$peopleList     = $peopleListWrap.find('li'),
		$oImages        = $peopleList.find('o-img'),
		peopleListLen   = $peopleList.length,
		peopleAllrandomArr = [],
		peopleAllArr  = [],
		peoplePlaArr  = [],
		peopleDesArr  = [],
		peopleDevArr  = [],
		peopleMarArr  = [],
		peopleManaArr = [],
		peopleLedArr  = []
	;

	for (var i = 0; i < $peopleList.length; i++) {
		peopleAllArr[i] = $peopleList[i];
		peopleAllrandomArr[i] = $peopleList[i];
		$peopleList.attr('data-point', '.9');
	}

	$peopleList.each(function(i){
		var listData = $peopleList.eq(i).attr('data-i',i).attr('data-people');
		if ( listData.indexOf('planning') != -1 ) peoplePlaArr.push(i);
		if ( listData.indexOf('design') != -1 ) peopleDesArr.push(i);
		if ( listData.indexOf('development') != -1 ) peopleDevArr.push(i);
		if ( listData.indexOf('marketing') != -1 ) peopleMarArr.push(i);
		if ( listData.indexOf('manager') != -1 ) peopleManaArr.push(i);
		if ( listData.indexOf('leadership') != -1 )peopleLedArr.push(i);
 	});
	var allLen  = peopleAllArr.length,
		plaLen  = peoplePlaArr.length,
		desLen  = peopleDesArr.length,
		devLen  = peopleDevArr.length,
		marLen  = peopleMarArr.length,
		manaLen = peopleManaArr.length,
		ledLen  = peopleLedArr.length
	;

	for (var a=0,tArr=[],cnt;a<peopleLedArr.length;a++) {
		cnt = $(peopleAllArr[peopleLedArr[a]]).data('count');
		tArr[cnt-1] = peopleLedArr[a];
	}
	peopleLedArr = tArr;

	//leader count change
	// peopleLedArr.splice(peopleLedArr.indexOf(72),1);
	// peopleLedArr.push(72);
	// peopleLedArr.splice(peopleLedArr.indexOf(1),1);
	// peopleLedArr.push(1);
	// peopleLedArr.splice(peopleLedArr.indexOf(30),1);
	// peopleLedArr.push(30);

	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}

	$peopleTab.find('a').on('click',function(e) {
		e.preventDefault();
		if(!$(this).hasClass('on')){
			var dataType = $(this).attr('data-people-type');
			$peopleList.removeClass('hello').remove();
			switch(dataType) {
				case "planning" :
					listCount(plaLen,peoplePlaArr);
				break;
				case "design" :
					listCount(desLen,peopleDesArr);
				break;
				case "development" :
					listCount(devLen,peopleDevArr);
				break;
				case "marketing" :
					listCount(marLen,peopleMarArr);
				break;
				case "manager" :
					listCount(manaLen,peopleManaArr);
				break;
				case "leadership" :
					listCount(ledLen,peopleLedArr);
				break;
				default :
					$peopleListWrap.find('ul').append( shuffle(peopleAllrandomArr) );
			}

			$peopleTabList.find('a').removeClass('on').filter(this).addClass('on');
			// reset
			D.FY.updateUI();
			var txt = $(this).text();
			$('.filter-all u').text(txt);
			if($('.filter-list-wrap').hasClass('on'))$('.filter-all a').trigger('click');
			$(window).trigger('resize');
		}
	})
	function listCount(len, arrType){
		for(var j=0;j<len;j++){
			$peopleListWrap.find('ul').append( peopleAllArr[ arrType[j] ] );
		}
	}

	// mobile fliter
	var _fliterListWrapHeight;
	var openProjectListFilter = function() {
		var $fliterListWrap = $('.projects-list > .head > .filter .filter-list-wrap');
		var $fliterAll = $('.projects-list > .head > .filter .filter-all');
		_fliterListWrapHeight = $fliterListWrap.find('> ul').height();

		if (!$fliterListWrap.hasClass('on')) {
			$fliterAll.addClass('on');
			$fliterListWrap.animate({
				'opacity' : 1,
				'height' : _fliterListWrapHeight
			},500, 'dfy', function () {
				$fliterListWrap.addClass('on');
				$('.people-list-wrap ul li .o-img').addClass('loaded');
			});
		}else {
			$fliterAll.removeClass('on');
			$fliterListWrap.animate({
				'opacity' : 0,
				'height' : 0
			},500, 'dfy', function () {
				$fliterListWrap.removeClass('on');
			});
		}
	};
	var resizeProjectListFilter = function () {
		var $fliterListWrap = $('.filter-list-wrap');
		_fliterListWrapHeight = $fliterListWrap.find('> ul').height();
		if ($fliterListWrap.hasClass('on')) $fliterListWrap.css('height', _fliterListWrapHeight);
	}
	$('.filter-all a').on('click', function(e) {
		e.preventDefault();
		if($.richscript.viewport.mode.name =="V1" || $.richscript.viewport.mode.name =="V2") {
			openProjectListFilter();
		}
	});
	$peopleWrap.find('.hello').removeClass('hello')
	$peopleList.remove();
}

$(function() {
	var componentToHex = function(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	var compoenmtRgbColor = function() {
		for( var i=0, s=''; i<3; i++) {
			s += componentToHex( Math.floor(Math.random() * 255) );
		}
		return '#'+s;
	}

	// DFY_Members();
	peopleList();
	$('.filter-list-wrap li a').first().trigger('click');

	$(document).on('touchstart', function() {
		$('.p-video-wrap video')[0].play();
	});


})

})(jQuery);