var vewportArray = [];
;(function($) { 'use strict';

	var D = {};

	window.D = {};
	window.D.FY = D.FY = (function() {

		// Private Functions --> D.FY_privateFunction()
		var privateFunctions = {
			scroll: function(e) {
				if (e===undefined) {
					e = {deltaX: 0,deltaY: 0};
				}

				var data = this.scroll,
					prevTop = this.scroll.top,
					prevLeft = this.scroll.left,
					prevDirection = this.scroll.direction,
					prevDirectionChanged = this.scroll.directionChanged,
					top = this.scroll.top = $(window).scrollTop(),
					left = this.scroll.left = $(window).scrollLeft(),
					direction = '',
					directionChanged = false,

					viewportWidth = $(window).width(),
					viewportHeight = $(window).height(),
					viewportTop = top,
					viewportBottom = top+viewportHeight,
					viewportLeft = left,
					viewportRight = left+viewportLeft,

					deltaTop = top-prevTop,
					deltaLeft = left-prevLeft;

				if (prevTop>top) {
					direction = 'U';
				} else if (prevTop<top) {
					direction = 'D';
				}
				if (prevLeft>left) {
					direction += 'R';
				} else if (prevLeft<left) {
					direction += 'L';
				}
				directionChanged = (direction!==prevDirection) ? true : false;

				this.scroll.direction = direction;
				this.scroll.directionChanged = directionChanged;

				this.scroll.from.top = prevTop;
				this.scroll.from.left = prevLeft;
				this.scroll.from.direction = prevDirection;
				this.scroll.from.directionChanged = prevDirectionChanged;

				this.scroll.deltaTop = deltaTop;
				this.scroll.deltaLeft = deltaLeft;

				this.e.emit(this, 'scroll', {
					top: top,
					left: left,
					direction: direction,
					directionChanged: directionChanged,
					prevTop: prevTop,
					prevLeft: prevLeft,
					prevDirection: prevDirection,
					prevDirectionChanged: prevDirectionChanged,
					deltaTop: deltaTop,
					deltaLeft: deltaLeft,
					viewport: {
						width: viewportWidth,
						height: viewportHeight,
						top: viewportTop,
						bottom: viewportBottom,
						left: viewportLeft,
						right: viewportRight
					}
				});
			},

			// After Load
			load: function(e) {
				D.FY_scroll();
				this.e.emit(this, 'load', {e:e});
				if($(document).find('.page-jump-bottom').length){
					$('#document').addClass('jump-type');
				}
			},

			// After Resize
			resize: function(e) {
				D.FY_scroll();
				if (e===undefined) {
					var obj_e = {viewport: $.richscript.viewport.mode}
					$.extend(obj_e.viewport,  {width: $(window).width(), height: $(window).height()} );
				} else {
					var obj_e = {e: e};
				}
				this.e.emit(this, 'resize', obj_e);
			},

			// Resize Complete
			resizeComplete: function(e) {
				this.e.emit(this, 'resizeComplete', {e:e});
			}
		};

		for (var prop in privateFunctions) {
			if (typeof privateFunctions[prop] == 'function') {
				(function() {
					var func = privateFunctions[prop];
					D['FY_'+prop] = function() { return func.apply(D.FY, arguments); };
				})();
			}
		}

		var delayNum = 0;

		// Public Properties --> D.FY.publicFunction()
		return {
			count: {
				richscript: 0
			},

			scroll: {
				top: 0,
				left: 0,
				direction: '',
				directionChanged: false,
				from: {
					top: 0,
					left: 0,
					direction: '',
					directionChanged: false
				}
			},

			modules: [],

			e: new $.richscript.EventEmitter(),
			on: function(type, func, count) {
				this.e.bind(type, func, count);
				return this;
			},
			off: function(type, func, count) {
				this.e.unbind(type, func, count);
				return this;
			},
			updateSmartImage: function(image, forced) {
				var $image      = $(image||this),
					$wrap       = $image.closest('.o-img'),
					$oImgWrap   = $image.closest('.o-img-wrap'),
					$hello      = $image.closest('.o-hello'),
					$mask       = $image.prev(),
					hello       = $hello.get(0),
					key         = $image.data('key'),
					vewportMode = $.richscript.viewport.mode.v,
					isSmartObject = !!$image.closest('.o-smart-area').length,
					srcArr = (function() {
						var s5 = $image.data('src-v5') || $image.data('src'),
							s4 = $image.data('src-v4') || s5,
							s3 = $image.data('src-v3') || s4,
							s2 = $image.data('src-v2') || s3,
							s1 = $image.data('src-v1') || s2,
							arr = [null,s1,s2,s3,s4,s5];
						$image.data('srcArr', arr);
						return arr;
					})(),
					widthArr = (function() {
						var s5 = $image.data('width-v5') || $image.data('width'),
							s4 = $image.data('width-v4') || s5,
							s3 = $image.data('width-v3') || s4,
							s2 = $image.data('width-v2') || s3,
							s1 = $image.data('width-v1') || s2,
							arr = [0,s1,s2,s3,s4,s5];
						$image.data('naturalWidth', arr);
						return arr;
					})(),
					heightArr = (function() {
						var s5 = $image.data('height-v5') || $image.data('height'),
							s4 = $image.data('height-v4') || s5,
							s3 = $image.data('height-v3') || s4,
							s2 = $image.data('height-v2') || s3,
							s1 = $image.data('height-v1') || s2,
							arr = [0,s1,s2,s3,s4,s5];
						$image.data('naturalHeight', arr);
						return arr;
					})(),
					src = srcArr[vewportMode],
					naturalWidth  = widthArr[vewportMode],
					naturalHeight = heightArr[vewportMode],
					bgcolor = $image.data('bgcolor'),
					rate    = naturalHeight/naturalWidth,
					width   = Math.floor($image.width()),
					height  = Math.round(width*rate),
					loadEvent = $image.data('loadEvent'),
					loaded  = $image.data('loaded');

				if (key===undefined) {
					$image.data('key', (key = 'richscript_smart_image'+D.FY.count.richscript++));
					$image.closest('section')[(rate>1)?'addClass':'removeClass']('v');
				}

				$image.css({height:height});

				if (!loaded) {
					$wrap.css({backgroundColor:bgcolor});
					$mask.css({backgroundColor:bgcolor});
				}

				D.FY
				.off('scroll.'+key)
				.on('scroll.'+key, function(data) {
					if (!$image.length) {
						D.FY.off('.'+key);
						return;
					}
					if (width<1||height<1) {
						return;
					}

					var top = $image.offset().top,
						bottom = top + height,
						viewport  = data.viewport,
						loaded    = $image.data('loaded'),
						loadEvent = $image.data('loadEvent'),
						visible   = $image.data('visible'),
						prevY     = $wrap.data('y'),
						x = 0,
						y = 0,
						r = Math.max($image.data('depth') || 5, 2),
						readyPoint = 1000, //viewport.height
						helloPoint = 1;

					viewport.topReady = viewport.top-readyPoint;
					viewport.bottomReady = viewport.bottom+readyPoint;

					// load Point
					if (   (viewport.topReady<=top && top<=viewport.bottomReady)
						|| (viewport.topReady<=bottom && bottom<=viewport.bottomReady)
						|| (viewport.topReady>top && bottom>viewport.bottomReady) ) {

						if (loaded!==true && $wrap.is(':visible')) {
							$image.data('loaded', true);
							$image.off('.smart')
							.on('load.smart', function() {

								$(this).addClass('loaded');
								$wrap.addClass('loaded').css({backgroundColor:'transparent'});

								//이미지 로드 완료 후 스마트이미지 정보를 리셋한다.
								D.FY.updateSmartImage(this, true);

								$image.trigger('smartLoad.smart');
								$image.closest('.projects-view').addClass('on');
							}).attr({src: src}).trigger('beforeSmartLoad');
						}
					}

					// on Viewport
					if (   (viewport.top<=top && top<=viewport.bottom)
						|| (viewport.top<=bottom && bottom<=viewport.bottom)
						|| (viewport.top>top && bottom>viewport.bottom)
						|| forced===true) {

						if (forced!==true&&visible!==true) {
							$image.data('visible', true);
							if (!$image.hasClass('showed')) {
								$image.addClass('showed').trigger('visible');
								$image.closest('section').addClass('showed');
							}
							if($wrap.find('video').length) $wrap.find('video')[0].play();
						}

						if (hello) {
							if (visible==true&&(top-viewport.top)/viewport.height<=helloPoint) {
								var delayExposed;

								if (!$hello.hasClass('on')) {
									vewportArray.push(viewport.top);

									for (var i = 0; i < vewportArray.length; i++) {
										if (vewportArray[vewportArray.length-2] == viewport.top) {
											delayNum++;

											clearTimeout(delayExposed);
											delayExposed = setTimeout(function () {
												$hello.addClass('hello');
												$wrap.addClass('hello');
											},50*delayNum);
											// TweenLite.to($mask.find('svg'), .4, {opacity:.4, delay:(0.05*delayNum), onComplete: function () {
												// $wrap.addClass('hello');
											// 	D.FY._scroll();
											// }});
											break;
										}else {
											delayNum = 0;
											$hello.addClass('hello');
											$wrap.addClass('hello');
											// TweenLite.to($mask.find('svg'), .4, {opacity:.4, onComplete: function () {
											// 	$wrap.addClass('hello');
											// 	D.FY._scroll();
											// }});
											break;
										}
									}
								}
								$hello.addClass('on');
							}
						}

						if (forced===true) {
							forced = false;
						}
					}

					// off Viewport
					else {
						if (visible===true) {
							$image.data('visible', false).trigger('inVisible');
							if($wrap.find('video').length) $wrap.find('video')[0].pause();
						}
					}

				})
				.off('resize.'+key)
				.on('resize.'+key, function(e) {
					if ( srcArr && loaded===true ) {
						var datas = $image.data(),
							v = e.viewport.v,
							src    = srcArr[v],
							rate   = heightArr[v]/widthArr[v],
							height = Math.round(width*rate)
						if ( $image.attr('src') != src ) {
							$image.attr('src', src);
						}
					}
				});
			},
			updateSmartVideo: function(video, forced) {
				var $o        = $(video||this),
					$wrap     = $o.closest('.o-img'),
					$image    = $wrap.find('img'),
					key       = $o.data('key'),
					loaded    = $o.data('loaded'),
					modeV     = $.richscript.viewport.mode.v,
					isAndroid = $.browser.android,
					srcArr = (function() {
						var s5 = $o.data('src-v5') || $o.data('src'),
							s4 = $o.data('src-v4') || s5,
							s3 = $o.data('src-v3') || s4,
							s2 = $o.data('src-v2') || s3,
							s1 = $o.data('src-v1') || s2,
							arr = [null,s1,s2,s3,s4,s5];
						return arr;
					})(),
					src    = srcArr[modeV],

					videoAttr = $o.data('options') || 'autoplay loop playsinline muted',
					$video    = $o.find('video'),
					$sources  = $o.find('source'),
					oVideo;

				// 비디오 요소 생성.
				var createVideoObject = function() {

					var extArr = $o.data('ext').toLowerCase().replace(/\s/g, '').split(',');
					if ( !extArr.length ) return false;


					var $video = $('<video '+ videoAttr +'></video>');

					for (var i = extArr.length - 1; i >= 0; i--) {
						if (extArr[i] == 'mp4') {
							$('<source>', {src: src+'.mp4', type: 'video/mp4', prependTo: $video});
						} else if (extArr[i] == 'webm') {
							$('<source>', {src: src+'.webm', type: 'video/webm', appendTo: $video});
						} else if (extArr[i] == 'ogv' || extArr[i] == 'ogg') {
							$('<source>', {src: src+'.ogv', type: 'video/ogg', appendTo: $video});
						}
					}

					if ( $o.data('alt') != null ) {
						$('<p>').text($o.data('alt')).appendTo($video);
					}
					$video.data($o.data());
					$o.replaceWith($video);

					$video   = $wrap.find('video');
					$sources = $video.find('source');
					oVideo   = $video[0];

					if ( isAndroid ) {
						$(document).one('touchstart.videoPlay', function() {
							oVideo.play();
						});
					}
					$wrap.addClass('video');

					$video.on('loadeddata', function(e) {
						$video.data('loaded', true);
						$wrap.trigger('videoLoaded');
					}).trigger('load');

					D.FY
					.off('resize.'+key)
					.on('resize.'+key, function(e) {
						var modeV = e.viewport.v,
							thisSrc  = srcArr[modeV];

						if (src != thisSrc) {
							$sources.each(function() {
								var reSrc = $(this).attr('src').replace(src, thisSrc);
								$(this).attr('src', reSrc);
							});
							src = thisSrc;
							oVideo.load();
						}
					});
				}


				if (key===undefined) {
					$video.data('key', (key = 'richscript_smart_object'+D.FY.count.richscript++));
				}

				if ( !loaded ) {
					// 이미지 로드시 비디오 요소 생성.
					$image
						.off('beforeSmartLoad.'+key)
						.on('beforeSmartLoad.'+key, createVideoObject);
				}


			},
			updateSmartImages: function($images) {
				($images||$('.o-img > img')).each(function() {
					D.FY.updateSmartImage.bind(this)();
				});
				($images||$('.o-img > .video')).each(function() {
					D.FY.updateSmartVideo.bind(this)();
				});
				return this;
			},

			updateSmartObject: function(o, forced) {
				var $o = $(o||this),
					key = $o.data('key');
					// $o.addClass('hello');

				if (key===undefined) {
					$o.data('key', (key = 'richscript_smart_object'+D.FY.count.richscript++));
				}

				if ($o.hasClass('hello')) { return false; }

				var top = $o.offset().top,
					bottom = top + Math.max($o.outerHeight(), $o.height());

				D.FY
				.off('scroll.'+key)
				.on('scroll.'+key, function(data) {
						var viewport = data.viewport,
							loaded   = $o.data('loaded'),
							visible  = $o.data('visible'),
							readyPoint = 1000,
							helloPoint = $o.data('point') || .8;

					// on Viewport
					if (   (viewport.top<=top && top<=viewport.bottom)
						|| (viewport.top<=bottom && bottom<=viewport.bottom)
						|| (viewport.top>top && bottom>viewport.bottom)
						|| forced===true) {

						if (forced!==true&&visible!==true) {
							$o.data({visible: true}).trigger('visible');
						}
						if (visible == true && (top-viewport.top)/viewport.height<=helloPoint) {
							if (!$o.hasClass('hello')) {
								$o.addClass('hello').trigger('hello'); // section top moiton
								D.FY.off('scroll.'+key);
							}
						}
						forced = false;
					}

					// off Viewport
					else {
						if (visible === true) {
							$o.data({visible: false});
						}
					}

				});

				D.FY
				.off('resize.'+key)
				.on('resize.'+key, function(e) {
					top = $o.offset().top;
					bottom = top + Math.max($o.outerHeight(), $o.height());
				});
			},
			updateSmartObjectRtl: function(o, forced) {
				var $o = $(o||this),
					key = $o.data('key');

				if (key===undefined) {
					$o.data('key', (key = 'richscript_smart_object'+D.FY.count.richscript++));
				}

				if ($o.hasClass('hello')) { return false; }

				var top      = $o.offset().top,
					bottom   = top + Math.max($o.outerHeight(), $o.height());

				D.FY
				.off('scroll.'+key)
				.on('scroll.'+key, function(data) {
					var viewport = data.viewport,
						loaded   = $o.data('loaded'),
						visible  = $o.data('visible'),
						readyPoint = 1000,
						helloPoint = $o.data('point') || .8;

					// on Viewport
					if (   (viewport.top<=top && top<=viewport.bottom)
						|| (viewport.top<=bottom && bottom<=viewport.bottom)
						|| (viewport.top>top && bottom>viewport.bottom)
						|| forced===true) {

						if (forced!==true&&visible!==true) {
							$o.data({visible: true}).trigger('visible');
						}
						if (visible == true && (top-viewport.top)/viewport.height<=helloPoint) {
							if (!$o.hasClass('hello')) {
								$o.addClass('hello').trigger('hello'); // section top moiton
								D.FY.off('scroll.'+key);
							}
						}
						forced = false;
					}

					// off Viewport
					else {
						if (visible === true) {
							$o.data({visible: false});
						}
					}

				});

				D.FY
				.off('resize.'+key)
				.on('resize.'+key, function(e) {
					top      = $o.offset().top;
					bottom   = top + Math.max($o.outerHeight(), $o.height());
				});
			},
			updateSmartObjectLtr: function(o, forced) {
				var $o = $(o||this),
					key = $o.data('key');

				if (key===undefined) {
					$o.data('key', (key = 'richscript_smart_object'+D.FY.count.richscript++));
				}

				if ($o.hasClass('hello')) { return false; }

				var top      = $o.offset().top,
					bottom   = top + Math.max($o.outerHeight(), $o.height());

				D.FY
				.off('scroll.'+key)
				.on('scroll.'+key, function(data) {
					var viewport = data.viewport,
						loaded   = $o.data('loaded'),
						visible  = $o.data('visible'),
						readyPoint = 1000,
						helloPoint = $o.data('point') || .8;

					// on Viewport
					if (   (viewport.top<=top && top<=viewport.bottom)
						|| (viewport.top<=bottom && bottom<=viewport.bottom)
						|| (viewport.top>top && bottom>viewport.bottom)
						|| forced===true) {

						if (forced!==true&&visible!==true) {
							$o.data({visible: true}).trigger('visible');
						}
						if (visible == true && (top-viewport.top)/viewport.height<=helloPoint) {
							if (!$o.hasClass('hello')) {
								$o.addClass('hello').trigger('hello'); // section top moiton
								D.FY.off('scroll.'+key);
							}
						}
						forced = false;
					}

					// off Viewport
					else {
						if (visible === true) {
							$o.data({visible: false});
						}
					}

				});
				D.FY
				.off('resize.'+key)
				.on('resize.'+key, function(e) {
					top      = $o.offset().top;
					bottom   = top + Math.max($o.outerHeight(), $o.height());
				});
			},
			updateSmartObjects: function($o) {
				($o||$('.o-smart-area')).each(function() {
					D.FY.updateSmartObject.bind(this)();
				});
				($o||$('.o-smart-area-rtl')).each(function() {
					D.FY.updateSmartObjectRtl.bind(this)();
				});
				($o||$('.o-smart-area-ltr')).each(function() {
					D.FY.updateSmartObjectLtr.bind(this)();
				});
				return this;
			},
			module: function(css, fn) {
				this.modules.push({css:css,fn:fn});
				return this;
			},
			resetModules: function() {
				$.each(this.modules, function() {
					this.fn(this.css);
				});
				return this;
			},

			updatePageJump: function() {
				var $o = $('.page-jump-bottom');

				if ( !$o.get(0) ) {
					return this;
				}
				var $txt      = $o.find('.page-jump-bottom-txt'),
					$mask     = $o.find('.jump-mask'),
					$figure   = $o.find('figure'),
					$img      = $o.find('.type-jump'),
					$window   = $(window),
					$document = $('#document'),

					key = 'footerPageJump';

				D.FY
				.off('scroll.'+key)
				.on('scroll.'+key, function(data) {

					var isMobile       = $.browser.mobile || $('html').hasClass('V1'),
						top            = data.top,
						documentHeight = $document.height(),
						viewportHeight = data.viewport.height,

						moveTop = Math.round(Math.floor(top-documentHeight+viewportHeight)/5),
						percent = moveTop / $o.height(),

						opacity = 1,
						scale   = 1;

					if (top >= documentHeight - (viewportHeight + viewportHeight/3)) {
						$o.css('opacity',1);
						opacity = 1 - (percent*5),
						scale   = 1 + (percent/5);

						opacity = Math.max(opacity, 0.12);

						$img.css({marginTop: -moveTop/2});
						$txt.css({marginTop: -moveTop});
						$mask.css({opacity: opacity});

						$figure.css({
							'transform': 'scale('+scale+')',
							'-ms-transform': 'scale(\''+scale+'\')',
						})
					}else {
						$o.css('opacity',0);
					}
				});
			},

			updateUI: function() {
				vewportArray = [];

				D.FY.updateSmartImages();
				D.FY.updateSmartObjects();
				// D.FY.updateHangonElements();
				// D.FY.updateParallaxElements();

				setTimeout(function() {D.FY_resize();}, 0);
				setTimeout(function() {D.FY_scroll();}, 0);
			},

			_resize: function() {
				D.FY_resize();
			},
			_scroll: function() {
				D.FY_scroll();
			},

			setTitle: function() {
				var s = $('#wrap .h1').data('title') || $('#wrap .h1').html();
				$('header .title').html(s);
				return s;
			},

			setTopBtn: function() {
				$(document).on('click touchstart.top', 'a.btn-top', function() {
					$('html, body').animate({'scrollTop': 0}, {duration:850,  easing: 'easeInOutQuart'});
					return false;
				});
			},

			checkLanguage: function() {
				var userLang = navigator.language || navigator.userLanguage,
					htmlLang = document.getElementsByTagName('html')[0].getAttribute('lang'),
					thisLang = Cookie.Read('DFYLanguage'),
					setLang = (userLang.indexOf('ko')>-1) ? 'ko' : 'en';

				if( !thisLang ) {
					thisLang = setLang;
					Cookie.Create('DFYLanguage', setLang, 90);
					if (thisLang == 'ko') {
						//location.href = location.protocol + '//' + location.host + '/seoul/';
						location.replace(location.protocol + '//' + location.host + '/seoul/');
					}
				} else {
					if ( thisLang != htmlLang ) {
						//location.href = location.protocol + '//' + location.host + '/seoul/';
						location.replace(location.protocol + '//' + location.host + '/seoul/');
					}
				}
			},

			initialize: function() {

				// Off
				$(window).off('.dfy');
				this.off('.dfy');

				this.off('load');
				this.off('popstate');
				this.off('scroll');
				this.off('resize');
				this.off('resizeComplete');

				// Load
				$(window).on('load.dfy', function(e) {
					$('html').addClass('loaded');
					D.FY.updateUI();
					setTimeout(function() {D.FY_scroll();}, 100);
					setTimeout(function() {D.FY_load();}, 0);
				});

				// After Load
				this.on('load.dfy', function() {
					// Language set Cookie
					var htmlLang = $('html').attr('lang');
					Cookie.Create('DFYLanguage', htmlLang, 90);
				});

				// Popstate
				$(window).on('popstate.dfy', function(e) {

				});

				// Resize
				$(window).on('resize.dfy orientationchange.dfy', function(e) {
					clearTimeout(D.FY.___resizeTimer);
					D.FY.___resizeTimer = setTimeout(function() {
						D.FY_resizeComplete();
					}, 500);
					// D.FY.updateUI();
				});

				// After Resize
				this.on('resize.dfy', function() {

				});

				// Resize Complete
				this.on('resizeComplete.dfy', function() {
					D.FY.updateUI();
				});

				// Scroll
				$(window).on('scroll.dfy', function(e) {
					D.FY_scroll();
				});

				$.richscript.upgradeAccessibility('a,button,video,iframe', 'hover');
				$.richscript.upgradeFromAccessibility('input,select,textarea', 'f-focus');

				// Ready
				$(function() {
					setTimeout(function() {
						D.FY.setTitle();
						D.FY.setTopBtn();
						D.FY.updateUI();
						D.FY.resetModules();
						D.FY.updatePageJump();
					}, 1);
				});

				return this;
			}

		};
	})().initialize();
})(jQuery);




