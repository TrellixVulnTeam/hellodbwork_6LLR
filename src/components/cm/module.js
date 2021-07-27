;(function($) { 'use strict';

D.FY.module('.x-stroke2', function(selector) {
	var Class = function(element) {
		this.initialize(element);
	};
	$.extend(true, Class.prototype, {
		draw: function(e) {

			var sizeWidth  = Math.floor(this.$span.width());
			var sizeHeight = Math.floor(this.$span.height());

			this.canvas.width = sizeWidth * window.canvasRatio;
			this.canvas.height = sizeHeight * window.canvasRatio;
			this.canvas.style.width = (window.canvasRatio>1)?sizeWidth+'px':'';
			this.canvas.style.height = (window.canvasRatio>1)?sizeHeight+'px':'';
			this.ctx.scale(window.canvasRatio, window.canvasRatio);

			this.canvas.style.letterSpacing = 1;//this.$element.css('letterSpacing');

			this.ctx.font = this.$element.css('fontSize')+' '+this.$element.css('fontFamily');
			this.ctx.textBaseline = 'top';
			this.ctx.lineWidth = parseInt(this.$element.css('webkitTextStrokeWidth')) || parseInt(this.$element.css('borderTopWidth'), 10) || 2; //defult Width 2;
			this.ctx.strokeStyle = this.$element.css('webkitTextStrokeColor') || this.$element.css('color');
			this.ctx.strokeText(this.elemText, 0, 0);

			if (this.bgColor) {
				this.ctx.fillStyle = this.bgColor;
			}else {
				this.ctx.fillStyle = 'transparent';
			}

			this.ctx.fillText(this.elemText, 0, 0);
			this.$element.addClass('on');
		},
		initialize: function(element) {
			var o = this.o = $.richscript.o(this);
			this.element = element;
			this.$element = $(element);
			this.elemText = this.$element.text();

			this.$span = this.$element.wrapInner('<span></span>');
			this.$canvas = $('<canvas></canvas>').appendTo(element);
			this.canvas = this.$canvas[0];
			this.ctx = this.canvas.getContext('2d');
			this.bgColor = this.$element.attr('data-fill');

			// Add Event
			$.richscript.on('viewport-change', function(e) {
				$.richscript[o].draw(e);
			});
			// start
			this.draw();
		}
	});
	if ( !('webkitTextStroke' in document.body.style) ) {
		$('html').addClass('no-webkitTextStroke');
		$(selector).each(function() {
			this.CanvasStorke = new Class(this);
			$(this).data('CanvasStorke', this.CanvasStorke);
		});
	}
});

// Gallery
D.FY.module('.x-gallery', function(selector) {
	$(selector).each(function() {
		var $this = $(this),
			$target = $this.find('.x-gallery-target'),
			dots = $this.data('dots') || '',
			count = $this.data('count') || '',
			aboutType = $this.data('about-type') || '',
			videoType = $this.data('video-type') || '',
			options = {
				"pageDots": false,
				"wrapAround":true,
				"autoPlay":5000,
				"prevNextButtons":false
				}
			;
		if (count) {
			if(aboutType){
				options = {
					"pageDots": false,
					"prevNextButtons":true
				}
			}else{
				options = {
					"pageDots": false,
					"wrapAround":true,
					"autoPlay":5000,
					"prevNextButtons":true
				}
			}
		}

		var makePageNum = function(pageTextType) {
			var flkty = $target.data('flickity'),
				selectDotClassName = 'current-dots',
				$paging = $('<div class="paging"></div>'),
				pagingList = [];
			$target.after($paging);
			if ( flkty === 'undefined' ) return false;

			$(flkty.cells).each(function(i) {
				var	tClass   = (pageTextType == 'alphabet') ? 'dot-alp' : 'dot-num',
					pageText = (pageTextType == 'alphabet') ? $target.find('.carousel-cell').eq(i).data('a') : i+1;
				pagingList.push('<a href="#" class="'+tClass+'" aria-label="Page to '+(i+1)+'">');
				pagingList.push('\t<span>'+pageText+'</span>');
				pagingList.push('</a>');
			});
			$paging.html( pagingList.join('\r\n') );
			$paging.find('a').eq(0).addClass(selectDotClassName);
			flkty.on('cellSelect', function() {
				$paging.find('a').removeClass(selectDotClassName).eq(flkty.selectedIndex).addClass(selectDotClassName);
			});
			$paging.find('a').on('click', function() {
				var index = $(this).index();
				flkty.select(index);
				return false;
			})
		}
		var videoPlay = function(){
			$target.find('video').each(function(){
				$(this)[0].pause();
				$(this)[0].play();
			})
		}
		var countCheck = function () {
			var
			flkty = $target.data('flickity'),
			$carouselCell = $target.find('.carousel-cell'),
			_carouselCellW = $carouselCell.width(),
			_carouselCellLength = $carouselCell.length,
			$currentBox = $target.next().find('.current'),
			totalNum,
			// zeroLeng = (String(_carouselCellLength).length == 1) ? '0' : '';
			totalNum = /*zeroLeng +*/ String(_carouselCellLength);
			if ( flkty === 'undefined' ) return false;
			$currentBox.append('<ul></ul>');
			for(var i = 0 ; i < _carouselCellLength ; i++){
				$currentBox.find('ul').append('<li>'+ (i+1) +'</li>')
			}
			$target.next().find('.total > span').text(totalNum);

			var $box = $target.find('.carousel-cell .image');
			// get transform property
			var docStyle = document.documentElement.style;
			var transformProp = typeof docStyle.transform == 'string' ?
			'transform' : 'WebkitTransform';
			// get Flickity instance
			//
			if ( $('html').hasClass('ie9') ) {
				transformProp = 'msTransform';
			}

			$target.on( 'scroll.flickity', function() {
				flkty.slides.forEach( function( slide, i ) {
					var img = $box[i];
					var x = ( slide.target + flkty.x ) * -1/4;
					img.style[ transformProp ] = 'translate(' + x  + 'px, 0)';
				});
			});


			flkty.on('cellSelect', function( ) {
				var _numH = $currentBox.find('ul li').height();
				$currentBox.find('ul').stop().animate({'margin-top':-(flkty.selectedIndex*_numH)},600,'dfy');
				$target.next().find('.total > span').text(totalNum);
			});
			$.richscript.on('viewport-change',function(e){
				var _numH = $currentBox.find('ul li').height();
				$currentBox.find('ul').css({'margin-top':-(flkty.selectedIndex*_numH)});
			})
		}

		$target.flickity(options);
		switch(dots) {
			case 'num': makePageNum(); break;
			case 'a'  : makePageNum('alphabet'); break;
		}

		if (count) countCheck();
		if (videoType) videoPlay();
		touchMoveLock($this);
	});
});


window.isYTLoad = false;
var ytPlayer = null;
D.FY.module('.yt-player',function(selector) {
	var $ytPlayer = $(selector);
	var $btnPlay = $ytPlayer.closest('.yt').find('a.btn-play');
	var playerState = null;
	var isImg = true;

	var ytInit = function() {
	    $ytPlayer.css('opacity','0');
		$btnPlay.addClass('disabled').on('click.disabled', function(e) {
			e.preventDefault();
		});
	    $ytPlayer.each(function() {
	    	if ( !$(this).data('ytPlayer') ) {
		    	var $o = $('<div></div>').appendTo( this );
		    	var code = $(this).data('code');
		    	var control = ($(this).hasClass('control')) ? '1' : '0';

		    	this.ytPlayer = new YT.Player($o[0], {
						height: '100%',
						width: '100%',
						videoId: code,
						playerVars: {
							autoplay: '0',
							controls: control,
							showinfo: '0',
							rel: "0",
							loop: "1",
							playlist: code,
							modestbranding: 0,
							playsinline: 0,
							disablekb: 1
						},
						events: {
							'onReady': onPlayerReady, // youtube 로드될 때
							'onStateChange': onPlayerStateChange // youtube 상태가 바뀔 때마다
						}
				});
		    	this.playerState = this.ytPlayer;
		    	$(this).data('ytPlayer', this.ytPlayer);
		    	isYTLoad = 1;
	    	}

		    if (!$(this).closest('.media').find('.o-img img').data('src')) {
		    	$(this).closest('.media').find('.o-img').css('opacity', 0);
		    	$(this).closest('.media').prepend('<span class="youtube-bg" />');
		    	$(this).parents('.media').find('.youtube-bg').css('backgroundImage','url('+'http://img.youtube.com/vi/'+code+'/maxresdefault.jpg'+')');
		    }
	    });
	}

	if ( $ytPlayer.length ) {
		;(function() {
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		})();

		window.onYouTubePlayerAPIReady = ytInit;

	}

	$('.yt .o-img img').on('load', function(){
		$(this).closest('.yt').find('.yt-player').removeAttr('style');
	});

	function onPlayerStateChange(event){
		playerState = event.data == YT.PlayerState.ENDED ? 'end' :
		        event.data == YT.PlayerState.PLAYING ? 'playing' :
		        event.data == YT.PlayerState.PAUSED ? 'pause' :
		        event.data == YT.PlayerState.BUFFERING ? 'buffering' :
		        event.data == YT.PlayerState.CUED ? 'play completed' :
		        event.data == -1 ? 'not start' : 'exception';

		var ytPlayer = event.target;
		var $target = $(event.target.a);

		if (playerState == 'playing'
			&& $target.data('yt-ready') === false) {
		// 	// if(!$.browser.mobile)
		// 	ytPlayer.pauseVideo();
			$target.parent().animate({opacity: 1},300);
			$target.data('yt-ready',true);
		}

	}

	function onPlaystart(event) {
		var $this = $(this);
		var $wrapper = $this.closest('.yt');
		var $o = $wrapper.find('.yt-player');
		var ytPlayer = $o.data('ytPlayer');
		var allYtplayer = $ytPlayer.data('ytPlayer');

		if ( ytPlayer != null) {

			$this.toggleClass('play');

			if( !$this.hasClass('play') ){ //stop
				ytPlayer.pauseVideo();
				$this.removeClass('hide');
				$wrapper.removeClass('show');

			} else { //play
				ytPlayer.unMute();
				ytPlayer.playVideo();

				$this.addClass('hide');

				$wrapper.find('.o-img img').stop().animate({opacity: 0,},300, function() {
					$(this).css({zIndex:-1});
				});
				$wrapper.addClass('show');

				// video가 디폴트일때
				if($wrapper.find('video').length) {
					$wrapper.find('video').stop().animate({opacity: 0,},300, function() {
						$(this).css({zIndex:-1});
					});
				}
			}

			if( $wrapper.hasClass('txt-wh') ) {
				$wrapper.find('h2').addClass('wh');
				$wrapper.find('figcaption').addClass('wh');
			}
		} else {
			ytInit();
		}
		event.preventDefault();
	}

	function onPlayerReady(event){
		var ytPlayer = event.target;
		var $target = $(event.target.a);

		$btnPlay.removeClass('disabled')
			.off('click.ytDisabled')
			.on('click.ytDisabled', onPlaystart);

		$target.data('yt-ready',false);
		// ytPlayer.mute();
		// ytPlayer.playVideo();
	}
	window.isYTLoad && ytInit();
	$(document).on('click', '.o-hamburger', function(e){
		e.preventDefault();

		if( playerState == 'playing' ){
			$ytPlayer.data('ytPlayer').pauseVideo();
			$btnPlay.removeClass('hide play');
		}
	})
})


})(jQuery);



D.FY.module('.vimeo',function(selector) {
	var $btn = $('.vimeo .btn-play');
	$btn.on('click', function(e){
		e.preventDefault();
		playVimeo( $(this) );

	});
	function playVimeo(el){
		var $this = el
		var $vimeoWrap = $this.closest(selector);
		var $vimeo = $vimeoWrap.find('iframe');
		var vimeoId = $vimeo.data('src');
		var src = 'http://player.vimeo.com/video/'+vimeoId+'?color=ffe300?title=0&portrait=0&byline=0&autoplay=1&background=1';

		$vimeo.attr('src', src);
		$vimeoWrap.find('.o-img img').stop().animate({opacity: 0,},300, function() {
			$(this).css({zIndex:-1});
		});
		$this.stop().animate({'opacity':0}, 300, function () {
			$this.css('display', 'none');
		});
	}
});






