import React, { Component } from 'react';
import ScrollAnimation      from 'react-animate-on-scroll';
import classNames           from 'classnames/bind';
import ReactTimeout         from 'react-timeout';
import Style                from '../styles/Style.scss';
import Aboutimgpng          from '../images/about_3.png';
import Itsmetwo             from '../images/its_me_2.png';
import $                    from 'jquery';

const cx = classNames.bind(Style);


class About extends Component{
    constructor(props){
        super(props);

        this.state = {
        	animate : false
        }
    }
    
    static defaultProps = {
    	email 	  : 'yoon.dbdb@gmail.com',
    	instagram : '#',
    	git		  : 'https://github.com/DBYOON'
    	//git		  : 'https://github.com/DB-Yoon'
    }

    componentDidMount(){
		$(function(){
			let rotate = function(circle, circleRotate){
		  		circle.css({
		  			'transform' : 'rotate(' + circleRotate + 'deg)'
		  		});
		 	}

			$(window).scroll(function(){
		  		rotate($(".about-circle-img"), ($(window).scrollTop() * 0.2));
			})
		});
    }

	render(){

		return(
			<div className={cx('page','about-page')}>
				<main>
					<div className={cx('about-circle-wrap')}>
						<ScrollAnimation className={cx('about-circle','rotateIn')} animateOnce={true} duration={2} animatePreScroll={true} initiallyVisible={true}>
							<img src={ Aboutimgpng } className={cx('about-circle-img')} alt="circle" />
						</ScrollAnimation>
					</div>
					<div className={cx('about-col')}>
						<div className={cx('about-col-profile')}>
							<ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={2} delay={400}>
								<h1>프론트-엔드 개발자</h1>
							</ScrollAnimation>
							<ScrollAnimation animateIn='fadeInUp' animateOnce={true} duration={2} delay={450}>
								<p>사용 프레임워크 및 언어(Junior) : React.js, PHP, Wordpress, CSS/SCSS, Bootstrap, JavaScript/jQuery/AJAX, Git, Slack</p>
								<p>경력 : 3년6개월</p>
								<p>취미 : 축구, 전시회 보며 차분해지기, 롱보드타며 바닥에 뒹굴기, 왓챠/넷플릭스 럽</p>
							</ScrollAnimation>
						</div>
					</div>
					<ScrollAnimation className={cx('about-its-me')} animateIn='fadeInUp' animateOnce={true} duration={2} delay={300}>
						<img src={ Itsmetwo } className={cx('about-profile-img')} alt="self" />
					</ScrollAnimation>
					<ScrollAnimation className={cx('about-col')} animateIn='fadeInUp' animateOnce={true} duration={2} delay={300}>
						<div className={cx('about-col-links')}>
							<a href={`mailto:${this.props.email}`}>
								<span>Email</span>
							</a>
							<a href={ this.props.instagram } target='_blank'>
								<span>Instagram</span>
							</a>
							<a href={ this.props.git } target='_blank'>
								<span>Git</span>
							</a>																							
						</div>
					</ScrollAnimation>
				</main>
			</div>

		);
	}
};

export default ReactTimeout(About);