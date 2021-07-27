;(function($){ 'use strict';
$(function() {
	var scrollTop    = $.richscript.scrollTop();
	var $body        = $('body');
	var $hamburger   = $('.o-hamburger');
	var $nav         = $('header nav');
	var $alphabet    = $('header .alphabet');
	var $gnbBox      = $('.gnb-box');
	var touchDevice  = ('ontouchstart' in window || navigator.maxTouchPoints);
	var pointerenter = touchDevice ? 'touchstart' : 'mouseenter';
	var pointerleave = touchDevice ? 'touchend' : 'mouseleave';
	var openNonFocus = '#wrap *, #footer *';

	var transitionEnd = (function(el) {
		var transEndEventNames = {
			transition        : 'transitionend',
			WebkitTransition  : 'webkitTransitionEnd',
			MozTransition     : 'transitionend',
			OTransition       : 'oTransitionEnd otransitionend',
			msTransition      : 'MSTransitionEnd'
		}
		for (var name in transEndEventNames) {
			if (el.style[name] !== undefined) {
				return transEndEventNames[name];
			}
		}
		return false;
	})(document.body);

	var nonFocus = function() {
		if ( ! $body.hasClass('gnb-open') ) {
			$nav.find('a').attr('tabindex', '-1');
			$(openNonFocus).attr('tabindex', '');
		} else {
			$(openNonFocus).attr('tabindex', '-1');
			$nav.find('a').attr('tabindex', '');
		}
	}
	nonFocus();

	var gnbTween = null;
	var lnbTween = null;
	var _setDocTop;
	var prevH = window.innerHeight;
	var nowH;
	var selectedFunc = function() {
		var toggleClass = 'selected';
		var $gnbNavItem = $('nav .gnb a');
		var $lnbNav = $('nav .lnb');
		var leftMove = (!touchDevice) ? '-10%' : '-20%';
		function innerHeightCheck() {
			nowH = window.innerHeight;
			if(prevH != nowH) {
				prevH = nowH;
			}
			// if($('html').hasClass('open-complete')){
			// 	$(document).off('touchmove.hambergerCheck');
			// }
			if(! $('#wrap .contents').hasClass('showcase')){
				$('body').css('position', 'fixed');
				$('html').css('height', nowH);
			}

			$.browser.mobile && $('html, body').scrollTop(_setDocTop);
		}
		if($(this).hasClass(toggleClass)) {
			if (gnbTween) {
				TweenMax.killTweensOf( $gnbNavItem );
				lnbTween.kill();
				TweenMax.set($gnbNavItem, {left: leftMove, opacity: 0});
				TweenLite.set($lnbNav, {opacity: 0});
			}
			$(this).removeClass(toggleClass);
			$body.removeClass('gnb-open');
			$('html').removeClass('open-complete');
			$('html, body').removeAttr('style');
			$.richscript.unlockScroll();
		//	$(document).off('.hambergerCheck');
			$('html, body').scrollTop(_setDocTop);
		} else {
			_setDocTop = $(document).scrollTop();
			$.richscript.lockScroll();
			if($('html').hasClass('ios')){
				innerHeightCheck();
			}
			// $(document).on('scroll.hambergerCheck touchmove.hambergerCheck', function(e) {
			// 	e.preventDefault();
			// 	return false;
			// });
			$(this).addClass(toggleClass);
			$body.addClass('gnb-open');
			$nav.off('.closeEnd');

			lnbTween = TweenLite.fromTo($lnbNav, .55, {x: leftMove, opacity: 0}, {x: '0%', opacity: 1, delay: .85});
			setTimeout(function(){
				gnbTween = TweenMax.staggerFromTo($gnbNavItem, .55, {left: leftMove, opacity: 0}, {left: '0', opacity: 1}, 0.14,function(){
					innerHeightCheck();
					$('html').addClass('open-complete');
					//$(document).off('touchstart.hambergerCheck touchend.hambergerCheck');
				});
			},150);
			if($('html').hasClass('gnb-open')){
				$(document).on('resize', function() {
					innerHeightCheck();
				});
			}
		}

		nonFocus();
		if (touchDevice&&$(this).hasClass(toggleClass)) {
			$(this).removeClass('hover');
		}
	};

	var endFlag = false;
	$hamburger
	.on('click', function(e) {
		e.preventDefault();
		if($('html').hasClass('showcaseMoving')) return false;
		var o = this;
		var selected = $hamburger.hasClass('selected');
		if(endFlag)
			return false;
			endFlag = true;

			if (!touchDevice) {
				selectedFunc.apply(o);
			} else {
				if (!selected) {
					$hamburger.addClass('hover');

					setTimeout(function() {
						selectedFunc.apply(o);
						o = null;
					}, 200);
				} else {
					selectedFunc.apply(o);
				}
			}
		if ( transitionEnd === false ) {
			setTimeout(function() {
				endFlag = false;
			},300);
		} else {
			$gnbBox
				.off('.gnbOpen')
				.on(transitionEnd + '.gnbOpen', function(){
					endFlag = false;
				});
		}
	}).on(pointerenter, function(e) {
		$hamburger.addClass('hover');
		$body.addClass('gnb-over');
	})
	.on(pointerleave, function(e) {
		$hamburger.removeClass('hover');
		$body.removeClass('gnb-over');
	});

	// 언어변경.
	$('ul.lnb > li.language a').on('click', function() {
		Cookie.Create('DFYLanguage', $(this).data('lang'), 90);
	});

	// GNB MENUS
	// var $menusAnchor = $('.gnb>a', 'header');
	// $menusAnchor.on('click', function() {
	// 	var href = this.getAttribute('href');
	// 	var callback = function() {
	// 		selectedFunc.apply($hamburger[0]);
	// 		$hamburger.trigger('mouseenter');
	// 		$(window).off('scroll.hamburger')
	// 		.one('scroll.hamburger', function() {
	// 			$hamburger.trigger('mouseleave');
	// 		});
	// 	}
	// 	D.FY._changePage(href, callback);
	// 	return false;
	// });
	//
	// SKIPNAVIGATOR
	$('.skip-navigator a').on('click', function() {
		$($(this).attr('href')).attr('tabindex', '0').focus();
		return false;
	});
});

})(jQuery);
