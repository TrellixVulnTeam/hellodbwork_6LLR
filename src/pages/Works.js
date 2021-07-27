import React, { Component } from "react";
import classNames           from "classnames/bind";
import WorkContents         from "components/WorkContents";
import Chart                from "components/Chart";
import LineArrow            from "components/LineArrow";
import Style                from "../styles/Style.scss";
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";

import $                    from "jquery";

const cx = classNames.bind(Style);

class Works extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
        	getName : this.props.match.params.id,
        	show 	: false
        };

        //this.urlGet = this.urlGet.bind(this);
	}
    static defaultProps = {
    	goodrich 		  : `리치앤코 블로그입니다. 워드프레스 테마 커스터마이징 퍼블리싱하였으며, 개발/퍼블리싱 참여율(기여도)은 30%입니다.`,
    	samsungCsr 		  : `삼성전자 사회공헌 사이트입니다. 외주 개발사에서 구축 완료한 사이트 퍼블리싱 유지보수하였으며, 개발/퍼블리싱 참여율(기여도)은 10%입니다.`,
    	brandedWorks 	  : `브랜디드웍스는 콘텐츠 피드를 모바일 Push를 통해 받아볼 수 있는 애플리케이션이며,
    						 모바일 애플리케이션과 백오피스로 구성되어 있습니다.
    						 Back-End 개발자와 협업하여 백오피스 Front 개발하였고, Front 개발/퍼블리싱 참여율(기여도)은 100%입니다.`,
    	iforuTheme 		  : `자체적으로 개발한 워드프레스(PHP) 아이포유 테마입니다. 포트폴리오 영역을 중점으로 개발하였고,
    						 현재 아이포유웍스 사이트에 적용되어 있습니다. 개발/퍼블리싱 참여도(기여도)은 100%입니다.`,
    	platum     		  : `미디어사이트로써 페이지 이동 시 발생하는 사용자 이탈을 줄이기 위해 메인페이지에
    						 무제한으로 기사를 노출. 워드프레스(PHP)로 커스터마이징 개발 및 퍼블리싱하였고, 개발/퍼블리싱 참여도(기여도)은 100%입니다.`,
    	cia 	   		  : `SKplanet 사내 정보 공유를 위한 마이크로 사이트입니다.
    						 워드프레스(PHP)로 커스터마이징 개발 및 퍼블리싱하였고, 클라이언트 니즈에 맞게 검색 플러그인 커스터마이징하였습니다.
    						 개발/퍼블리싱 참여도(기여도)은 100%입니다.`,
    	kbread 			  : `김영모과자점 쇼핑몰입니다. 워드프레스(PHP)로 커스터마이징 개발 및 퍼블리싱 했으며, 
    						 우커머스 플러그인을 활용한 결제, 쿠폰, 배송조회등 쇼핑몰에 필요한 기능을 적용하였습니다.
    					 	 개발/퍼블리싱 참여도(기여도)은 100%입니다.`,
    	slowfood   		  : '디자인하우스에서 주최하는 2015 슬로푸드페스티벌 사이트입니다. 워드프레스(PHP)로 커스터마이징 개발 및 퍼블리싱하였고, 개발/퍼블리싱 참여율(기여도)은 100%입니다.',
    	walnuts 		  : `캘리포니아호두협회 사이트입니다. 워드프레스(PHP)로 커스터마이징 개발 및 퍼블리싱하였고, 개발/퍼블리싱 참여도(기여도)은 100%입니다.
    						 (유지보수 기간 만료 후 클라이언트 내부적으로 사이트 이슈 발생)`,
    	event 			  : `힙합퍼 매일 크리스마스 랜덤 쿠폰 선물 이벤트, 힙합퍼 룰렛 이벤트, 삼성카드 페이스북 행복초대석 이벤트 페이지입니다.`,
    	platumLink     	  : 'https://platum.kr/',
    	slowfoodLink      : 'http://www.slowfoodfestival.org',
    	ciaLink			  : '',
    	samsungCsrLink	  : 'http://csr.samsung.com',
    	brandedWorksLink  : 'https://branded.works/',
    	iforuThemeLink    : 'http://i4u.works/',
    	kbreadLink    	  : 'http://k-bread.com/',
    	goodrichLink	  : 'http://goodrichstory.com/',
    	walnutsLink		  : 'http://walnuts.co.kr/',
    	eventLink 		  : '#'



    }
    componentDidMount(){
        //console.log('componentDidMount : 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행되는 메소드입니다. 이 안에서 다른 JavaScript 프레임워크를 연동하거나, setTimeout, setInterval 및 AJAX 처리 등을 넣습니다.');
        //window.scrollTo(0,0);
        var $url   		   = window.location.pathname,
        	urlPathnameDel = 'event-work',
        	urlArr 		   = $url.split('/');

		var metaDel = document.getElementById("workMeta");

        this.metaDelFn(metaDel, urlArr, urlPathnameDel);

		$(function(){
			
		});


	}	
    componentDidUpdate() {
        //window.scrollTo(0,0);
    }
	componentWillUnmount(){
    	//window.scrollTo(0,0);
	}    

	metaDelFn = (md, ua, udt) => {
		'use strict';
	    
	    if(!("remove" in Element.prototype)){
	        Element.prototype["remove"] = function (){
	          if(this.parentNode){
	            this.parentNode.removeChild(this);
	          }
	        };
	    }

		$.each(ua, function(k, v){
			if(v == udt){ md.remove(); }
		});
	}

  	handleClick = (e) => {
	    e.preventDefault();
    	alert('error');
	};
	showModal = (e) => {
		e.preventDefault();
	    this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	workTitleFn = (param) => {
		'use strict';

		switch(param){
			case 'platum': return(
				<h1 className={cx('work-title')}>플래텀</h1>
			);
			
			case 'slowfood': return(
				<h1 className={cx('work-title')}>슬로푸드 페스티벌</h1>
			);
			
			case 'skplanet': return(
				<h1 className={cx('work-title')}>SKplanet CIA</h1>
			);
			
			case 'samsung-csr': return(
				<h1 className={cx('work-title')}>삼성전자 사회공헌</h1>
			);
			
			case 'branded-works': return(
				<h1 className={cx('work-title')}>브랜디드웍스</h1>
			);						                			
			
			case 'iforu-theme': return(
				<h1 className={cx('work-title')}>아이포유 테마</h1>
			);						                			
			
			case 'kbread': return(
				<h1 className={cx('work-title')}>김영모과자점</h1>
			);
			
			case 'goodrich': return(
				<h1 className={cx('work-title')}>리치앤코</h1>
			);						                			

			case 'walnuts': return(
				<h1 className={cx('work-title')}>캘리포니아호두협회</h1>
			);						                			

			case 'event-work' : return(
				<h1 className={cx('work-title')}>이벤트 페이지</h1>
			);

			default:
				return null
		}
	}

	workExpFn = (param) => {
		'use strict';

		switch(param){
			case 'platum': return(
				<p> { this.props.platum } </p>
			);
			
			case 'slowfood': return(
				<p> { this.props.slowfood } </p>
			);
			
			case 'skplanet': return(
				<p> { this.props.cia } </p>
			);
			
			case 'samsung-csr': return(
				<p> { this.props.samsungCsr } </p>
			);
			
			case 'branded-works': return(
				<p> { this.props.brandedWorks } </p>
			);						                			
			
			case 'iforu-theme': return(
				<p> { this.props.iforuTheme } </p>
			);						                			
			
			case 'kbread': return(
				<p> { this.props.kbread } </p>
			);
			
			case 'goodrich': return(
				<p> { this.props.goodrich } </p>
			);						                			

			case 'walnuts': return(
				<p> { this.props.walnuts } </p>
			);						                			
			
			case 'event-work': return(
				<p> { this.props.event } </p>
			);

			default:
				return null
		}
	}

	workLinkFn = (param) => {
		'use strict';

		switch(param){
			case 'platum': return(
				<a href={ this.props.platumLink } target='_blank'>
					<FontAwesomeIcon icon={['fas', 'link']} size='2x' />
				</a>
			);
			
			case 'slowfood': return(
			<div>
				<a href={ this.props.slowfoodLink } target='_blank'>
					<FontAwesomeIcon icon={['fas', 'link']} size='2x' />
				</a>
			</div>
			);
			
			case 'skplanet': return(
				<a href={ this.props.ciaLink } target='_blank'>
					<FontAwesomeIcon icon={['fas', 'link']} size='2x' />
				</a>
			);
			
			case 'samsung-csr': return(
				<a href={ this.props.samsungCsrLink } target='_blank'>
					<FontAwesomeIcon icon={['fas', 'link']} size='2x' />
				</a>
			);
			
			case 'branded-works': return(
				<a href={ this.props.brandedWorksLink } target='_blank'>
					<FontAwesomeIcon icon={['fas', 'link']} size='2x' />
				</a>
			);						                			
			
			case 'iforu-theme': return(
				<a href={ this.props.iforuThemeLink } target='_blank'>
					<FontAwesomeIcon icon={['fas', 'link']} size='2x' />
				</a>
			);						                			
			
			case 'kbread': return(
				<a href={ this.props.kbreadLink } target='_blank'>
					<FontAwesomeIcon icon={['fas', 'link']} size='2x' />
				</a>
			);
			
			case 'goodrich': return(
				<a href={ this.props.goodrichLink } target='_blank'>
					<FontAwesomeIcon icon={['fas', 'link']} size='2x' />
				</a>
			);						                			

			case 'walnuts': return(
				<a href={ this.props.walnutsLink } target='_blank'>
					<FontAwesomeIcon icon={['fas', 'link']} size='2x' />
				</a>
			);		

			case 'event-work': return(
				<a href={ this.props.eventLink } target='_blank'>
					<FontAwesomeIcon icon={['fas', 'link']} size='2x' />
				</a>
			);				                			

			default:
				return null
		}
	}

	render(){
		const getPram 	= this.props.match.params.id;
		const marginTop = {
			marginTop : '50%'
		}
	    
	    return(
			<div className={cx('page', 'work-page', `page-${getPram}`)}>
				<div className={cx('main')}>
	                <div className={cx('work-wrap')}>
	                	<article>
	                		<section className={cx('work-fixed-wrap')}>
	                			<div className={cx('work-fixed')}>
	                				{ this.workTitleFn(getPram) }
									{/* <p className={cx('work-title')}>{ getPram }</p> */}
	                				<div className={cx('work-info')}>
	                					<div className={cx('work-exp')}>
	                						<label>프로젝트</label>
	                						{ this.workExpFn(getPram) }
	                					</div>
	                					<div className={cx('work-link')}>
	                						{ this.workLinkFn(getPram) }
											<Chart
												height={120}
												width={120}
												innerRadius={30}
												outerRadius={50}
												id="work-percent"
												backgroundColor="#396ab2"
												foregroundColor="#f18448"
												duration={2000}
												getProject={ getPram }
												ref='workChart'
												text='abc'
											/>	                						
	                					</div>
	                					<div className={cx('work-percent-line')}>
	                						<LineArrow />
	                					</div>	                					
	                				</div>
	                			</div>
	                		</section>
	                		<section className={cx('work-content')}>
	                			<div className={cx('work-content-wrap')}>
	                				<section className={cx('work-img-center')}>
	                					<div className={cx('work-fluid')}>
	                						<div className={cx('work-outer')}>
	                							<div className={cx('work-inner')}>
	                								{
	                									(getPram === 'skplanet') || (getPram === 'branded-works') || (getPram === 'walnuts')
		                									? (<WorkContents param={ getPram } screen='mac' />)
		                									: (<WorkContents param={ getPram } screen='ipad' />)
	                								}
	                								{
	                									(getPram === 'skplanet') || (getPram === 'branded-works') || (getPram === 'walnuts')
		                									? (
				                								<div className={cx('work-meta', 'slider-meta')}>
					                								<FontAwesomeIcon icon={['fas', 'angle-up']} pull="left" size='2x' fixedWidth />
					                								<label>Project Slider</label>
				                								</div>		                										
		                									)
		                									: (
		                										<div className={cx('work-meta')} id="workMeta">
		                											<FontAwesomeIcon icon={['fas', 'angle-up']} pull="left" size='2x' fixedWidth />
		                											<label>Project Home</label>
	                											</div>
	                										)
	                								}
	                							</div>
	                						</div>
	                					</div>
	                				</section>	                			
	                				<section className={cx('work-img-left', `${getPram}-img-left`)}>
	                					<div className={cx('work-fluid')}>
	                						<div className={cx('work-outer')}>
	                							<div className={cx('work-inner')}>
													<WorkContents param={ getPram } screen='iphoneLeft' index='1' />
	                								{
	                									(getPram === 'skplanet') || (getPram === 'branded-works') || (getPram === 'walnuts')
		                									? '' : 
		                									(
				                								<div className={cx('work-meta')}>
				                									<FontAwesomeIcon icon={['fas', 'angle-up']} pull="left" size='2x' fixedWidth />
					                								<label>Project Mobile Home</label>
				                								</div>
	                										)
	                								}
	                							</div>
	                						</div>
	                						<div className={cx('work-outer')}>
	                							<div className={cx('work-inner')} style={ marginTop }>
	                								<WorkContents param={ getPram } screen='iphoneLeft' index='2' />
	                								{
	                									(getPram === 'skplanet') || (getPram === 'branded-works') 
	                									|| (getPram === 'walnuts') || (getPram === 'slowfood')
		                									? ''
		                									: (
				                								<div className={cx('work-meta')}>
				                									<FontAwesomeIcon icon={['fas', 'angle-up']} pull="left" size='2x' fixedWidth />
					                								<label>Project Mobile Page</label>
				                								</div>
	                										)
	                								}
	                							</div>
	                						</div>
	                					</div>
	                				</section>
	                				<section className={cx('work-img-right', `${getPram}-img-right`)}>
	                					<div className={cx('work-fluid')}>
		                						<div className={cx('work-outer')}>
		                							<div className={cx('work-inner')}>
		                								<WorkContents param={ getPram } screen='iphoneRight' index='1' />
		                								{
		                									(getPram === 'skplanet') || (getPram === 'branded-works') || (getPram === 'walnuts')
			                									? ''
			                									: (
					                								<div className={cx('work-meta')}>
					                									<FontAwesomeIcon icon={['fas', 'angle-up']} pull="left" size='2x' fixedWidth />
						                								<label>Project Mobile Page</label>
					                								</div>
		                										)
		                								}		                								
		                							</div>
		                						</div>
		                						<div className={cx('work-outer')}>
		                							<div className={cx('work-inner')} style={ marginTop }>
		                								<WorkContents param={ getPram } screen='iphoneRight' index='2' />
		                								{
		                									(getPram === 'skplanet') || (getPram === 'branded-works') 
		                									|| (getPram === 'walnuts') || (getPram === 'slowfood')
			                									? ''
			                									: (
					                								<div className={cx('work-meta')}>
					                									<FontAwesomeIcon icon={['fas', 'angle-up']} pull="left" size='2x' fixedWidth />
						                								<label>Project Mobile Page</label>
					                								</div>
		                										)
		                								}		                								
		                							</div>
		                						</div>
		                				</div>
	                				</section>	                				
	                			</div>
	                		</section>
	                	</article>
	                </div>
	            	{/*<WorkList />*/}
				</div>
			</div>
	    );
	}
}

export default Works;