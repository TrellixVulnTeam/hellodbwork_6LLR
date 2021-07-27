import React, { Component } from 'react';
//import ReactDOM 			from 'react-dom';
import classNames 			from 'classnames/bind';

import Style 				from '../styles/Style.scss';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';

import $                    from "jquery";

const cx = classNames.bind(Style);

class Slider extends Component{
	constructor(props) {
	    super(props);

        this.state = {
        	getName : this.props.match.params.id,
        	show 	: false
        };
	}

    componentDidMount(){
    	this.slide();
		
		/*var obj = [11, 22, 33];
		for(var v of obj){
			console.log(v);

		}*/
		this.fnIECheck();

		//this.outer();

		outer();

		function outer(){
			var text = '출력';

			console.log(text);

			return function inner(){
				console.log('inner : ' + text);
			}
		}
		

		trim('안녕하세요,,a@s$dasdasdas');

		function trim(s){
		    var t = "";
		    var from_pos = 0,
		    	to_pos 	 = 0;

		    for (var i=0; i<s.length; i++)
		    {
		        if(s.charAt(i) == ' '){
		            continue;
		        }
		        else
		        {
		            from_pos = i;

		            console.log(from_pos);

		            break;
		        }
		    }

		    for (var i=s.length; i>=0; i--)
		    {
		        if (s.charAt(i-1) == ' '){
		            continue;
		        }
		        else
		        {
		            to_pos = i;
		            console.log(to_pos);

		            break;
		        }
		    }

		    t = s.substring(from_pos, to_pos);
		    //				alert(from_pos + ',' + to_pos + ',' + t+'.');
		    return console.log(t);
		}

		/*var name = "David Kwon";      // 전역 변수를 선언
		
		function showName(){
		  var name = "Yunhak Kwon";   // 지역 변수를 선언
		  if(true) {
		    var name = "권윤학";
		    console.log(name);
		  }
		  console.log(name);
		}
		showName();

		console.log(name);*/

	}

	//IE 여부 및 버전 체크
	fnIECheck = () => {
		var isIE 	= false;
		var version = null;
		var ua 		= navigator.userAgent;

		if ( ua.match(/MSIE/) || ua.match(/Trident/) ) {
			isIE = true;
			version = ua.match(/(MSIE\s|rv:)([\d\.]+)/)[2];

			console.log(`ua: ${ua}`);
			console.debug(`version: ${version}`);
		}else{
			console.log(`ua: ${ua}`);
		}
	
		//return {isIE : isIE, version : version};
	}

	slide = () => {
		let w 		 = 0,
			curNum 	 = 0,
			auto 	 = null,
			dotIndex = 0,
			slideLen = 0,
			$dotLi   = $('.Style__slide-dot--2U0fX > li'),
			$panel   = $('.Style__slide-panel--15Y1q'),
			$panelLi = $('.Style__slide-panel--15Y1q').children('li');

		//this.init(w, curNum, slideLen, $dotLi);

		let init = () => {
			w        = $('.Style__slide--2bh_i').width();
			curNum   = $('.Style__slide-dot--2U0fX > li.Style__on--S2XRf').index();
			slideLen = $dotLi.length;

			console.log('curNum : ' + curNum + 'slideLen : ' + slideLen);
		}
		
		let slideFun = () => {
			$dotLi.click(function(){
				curNum = $(this).index();
				console.log('curNum1 : ' + curNum);
				
				slideMove();
			});
			$('.Style__next--21LGY').click(function(){
				nextChkPlay();
			});
			$('.Style__prev--1zhkm').click(function(){
				prevChkPlay();
			});

			autoPlay();

			autoPlayStop();

			autoRePlay();
			
			browserResize();
		}
		
		let autoPlay = () => {
			/*auto = setInterval(() => {
				nextChkPlay();
			}, 3000);*/

			const slideTimeout = 3000;
			
			auto = setTimeout(() => {
				autoPlay();
				nextChkPlay();
			}, slideTimeout);			
		};

		let autoPlayStop = () => {
			/*$(document).on('mouseenter', '.Style__next--21LGY', function(){
				clearInterval(auto);
			});*/
			$panelLi.mouseenter(() => {
				//clearInterval(auto);
				clearTimeout(auto);
			});
		};

		let autoRePlay = () => {
			$panelLi.mouseleave(() => {
				auto = setInterval(() => {
					nextChkPlay();
				}, 3000);
			})
		}

		let prevChkPlay = () => {
			if(curNum === 0){
				curNum = slideLen - 1;
				console.log('prev_if : ' + curNum);	
			}else{
				curNum--;
				console.log('prev_else : ' + curNum);	
			}

			slideMove();
		};		

		let nextChkPlay = () => {
				console.log('curNum : ' + curNum);
			if(curNum === slideLen - 1){
				curNum = 0;
				console.log('next_if : ' + curNum);
			}else{
				curNum++;
				console.log('next_else : ' + curNum);
			}
			slideMove();
			console.log('play');
		};

		let slideMove = () => {
			$panel.stop().animate({
				'margin-left' : -w * curNum
			});
			console.log(w + ' / ' + curNum);

			$dotLi.removeClass('Style__on--S2XRf');
			$dotLi.eq(curNum).addClass('Style__on--S2XRf');
		};
		
		let browserResize = () => {
			$(window).resize(() => {
				init();
				$panel.css({
					'margin-left' : -w * curNum
				});
			});
			console.log('resize');
		}

		init();
		slideFun();
	}

	/*init = (w, curNum, slideLen, $dotLi) => {
		w = $('.slide').width();
		curNum = $('.slide-dot>li.on').index();
		slideLen = $dotLi.length;

		console.log(slideLen);
	}*/

	/*slideFun = () => {
		$dotLi.click(function(){
			curNum = $(this).index();

			this.slideMove();
		});
	}*/

	render(){	    
	    return(
			<div>
				<main>
					<section>
						<div className={cx('slide',{
							on : false	
						})}>
							<ul className={cx('slide-panel')}>
								<li>슬라이드1</li>
								<li>슬라이드2</li>
								<li>슬라이드3</li>
								<li>슬라이드4</li>								
							</ul>
							<ul className={cx('slide-dot')}>
								<li className={cx('on')}>Dot1</li>
								<li>Dot2</li>
								<li>Dot3</li>
								<li>Dot4</li>								
							</ul>
							<div>
								<button className={cx('prev')}>이전</button>
								<button className={cx('next')}>이후</button>
							</div>
						</div>
					</section>
				</main>
			</div>
		)
	}
}

export default Slider;