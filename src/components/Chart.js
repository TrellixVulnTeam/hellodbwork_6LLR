import React, { Component } from "react";
import ReactDOM 			from "react-dom";
import classNames 			from "classnames/bind";
import * as d3 				from "d3";
import Style 				from "../styles/Style.scss";

import $                    from "jquery";

const cx = classNames.bind(Style);

class Chart extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			percent   : 0,
			flag      : true,
			error 	  : null,
			errorInfo : null,
			hasError  : false 
		};

		//this.onScroll = this.onScroll.bind(this);
	}

	/*static defaultProps ={
		samsungCsr   : 0.2,
		brandedWorks : 0,
		iforuTheme   : 0,
		platum 		 : 0,
		cia 		 : 0,
		kbread 		 : 0,
		slowfood 	 : 0,
		walnuts 	 : 0
	}*/

	propTypes: {
		id 				: PropTypes.string,
		text 			: PropTypes.string,
		height 			: PropTypes.number,
		width 			: PropTypes.number,
		innerRadius 	: PropTypes.number,
		outerRadius 	: PropTypes.number,
		backgroundColor : PropTypes.string,
		foregroundColor : PropTypes.string,
		getProject 		: PropTypes.string,
		percentComplete : PropTypes.number
	}

	componentDidMount(){	
        window.addEventListener("scroll", this.onScroll);
	}

	componentWillUnmount(){
		//window.removeEventListener('scroll', this.onScroll.bind(this), false);
		window.removeEventListener("scroll", this.onScroll);
	}

	componentDidUpdate(){
		//this.redrawArc();
		//ReactDOM.findDOMNode(this).scrollTop = 0;
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		// return false 하면 업데이트를 안함
		// return this.props.checked !== nextProps.checked
 		//let el = ReactDOM.findDOMNode(this.refs.arc).getBoundingClientRect().top;

		//(el < 0)
		return true;
	}
	componentDidCatch(error, info){
		// Display fallback UI
		//this.setState({ hasError : true });
		// You can also log the error to an error reporting service
		//logErrorToMyService(error, errorInfo);
	}

	onScroll = (e) => {
		let scrollTop = null;
		//let el = ReactDOM.findDOMNode(this.refs.arc).clientHeight;
		//let el = ReactDOM.findDOMNode(this.refs.arc).getBoundingClientRect().top;

		// 스크롤 할때마다 state에 scroll한 만큼 scrollTop 값 증가하므로 이를 업데이트해줌, 
		//따라서 스크롤 시점에 따라 특정액션을 추후에 state를 활용하여 구현 가능
		if(scrollTop){
			scrollTop = ("scroll", e.srcElement.scrollingElement.scrollTop);
		}

		this.setState({ scrollTop });

		if(this.state.flag){
		//if(scrollTop > el && this.state.flag){
			this.percentSet();
			this.drawArc();
			this.setState({ flag : false })			
		}

	};

	drawArc = () => {
		const percentData = this.state.percent,
			  context 	  = this.setContext(percentData);

		if(this.state.flag){
			this.setBackground(context);
			this.setForeground(context);
			this.updatePercent(context);
			this.setState({ flag : false })

			if(!this.state.flag){
				const settext = this.setText(context, percentData);

				return this.setAni(settext);						
			}
			else return null;
		}
		else return null;

	}

	redrawArc = () => {
		const context = d3.select(`#${this.props.id}`);
		
		console.log(`context: ${context}`);

		context.remove();
		
		this.drawArc();
	}

	percentSet = () => {
		let workPercent = this.props.getProject;

		if(workPercent === "samsung-csr"){
			this.setState({ percent : 0.1 });
		}
		else if(workPercent === "branded-works"){
			this.setState({ percent : 1 });
		}
		else if(workPercent === "iforu-theme"){
			this.setState({ percent : 1 });
		}
		else if(workPercent === "platum"){
			this.setState({ percent : 1 });
		}
		else if(workPercent === "skplanet"){
			this.setState({ percent : 1 });
		}
		else if(workPercent === "kbread"){
			this.setState({ percent : 1 });
		}
		else if(workPercent === "slowfood"){
			this.setState({ percent : 1 });
		}
		else if(workPercent === "walnuts"){
			this.setState({ percent : 1 });
		}
		else if(workPercent === "event-work"){
			this.setState({ percent : 1 });
		}
	}

	updatePercent = (context) => {
		let tau = Math.PI * 2; // 타우 6.28 파이의 2배

		return this.setForeground(context).transition()
			.duration(this.props.duration)
			.call(this.arcTween, tau * this.state.percent, this.arc());
	}

	arcTween = (transition, newAngle, arc) => {
		
		transition.attrTween('d', (d) => {
			const interpolate = d3.interpolate(d.endAngle, newAngle);
			const newArc = d;

			return (t) => {
				newArc.endAngle = interpolate(t);
				
				return arc(newArc);
			};
		});
	}

	setContext = (data) => {
		const { height, width, id, getProject, text } = this.props;

		return d3.select(this.refs.arc).append('svg')
			.attr('height', height)
			.attr('width', width)
			.attr('id', id)
			.attr('getProject', getProject)
			.attr('text', text)
			.append('g')
			.attr('transform', `translate(${height / 2}, ${width / 2})`);
			/*.on('mouseover', function(){
					this.setBackground				
       			d3.select(this).append('text')
         			.text(function(d){
         				const percentOutput = (percentData * 100) + '%';

         				return percentOutput;
         			})
    			.attr('dx', -10)
    			.attr('dy', -28)         			
			    .attr('font-size', '30px')
		    	.attr('fill', '#fff')
		    	.attr('class', 'percentLabel')
		    	.attr('pointer-events', 'none')
         	})
         	.on('mouseout', function(){
         		 d3.selectAll(".percentLabel").remove()
         	});*/

	}

	setAni = (context) => {
		return context
			.transition()
			.duration(1000)
    		.delay(1000)
    		.attr('opacity', '1');
	}

	setText = (context, data) => {
		const percentData = data;

		return context.append('text')
			.text(function(d) {
				const percentOutput = (percentData * 100) + '%';

				return percentOutput;
    		})
			.attr('opacity', '0')
			.attr('dx', -5)
			.attr('dy', -33)         			
		    .attr('font-size', '28px')
	    	.attr('fill', '#e9eff4')
	    	.attr('class', 'percentLabel');
	    	//.attr('pointer-events', 'none');
	}

	setBackground = (context) => {
		let tau = Math.PI * 2; // 타우 6.28 파이의 2배
		
		return context.append('path')
			.datum({ endAngle:tau })
			.style('fill', this.props.backgroundColor)
			.attr('d', this.arc());
	}
	
	setForeground = (context) => {
		return context.append('path')
			/*.datum({ endAngle: this.tau * this.props.percentComplete })
			.style('fill', this.props.foregroundColor)
			.attr('d', this.arc());*/
		    .datum({ 
		    	endAngle: 0 
		    }) // <- (instead of tau * our percentage)
		    .style('fill', this.props.foregroundColor)
		    .attr('d', this.arc());			
	}
	
	arc = () => {
		return d3.arc()
			.innerRadius(this.props.innerRadius)
			.outerRadius(this.props.outerRadius)
			.startAngle(0)
	}

	render(){
			return( <div id='arc' ref="arc" className={cx('arc')}></div> )
  	}
}
export default Chart;