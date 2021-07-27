import React, { Component } from 'react';
//import ReactDOM 			from 'react-dom';
import classNames 			from 'classnames/bind';
import * as d3 				from "d3";
import Style 				from '../styles/Style.scss';

const cx = classNames.bind(Style);

class LineArrow extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			percent   : 0,
			flag      : true
		};
	}

	componentDidMount(){
        window.addEventListener('scroll', this.onScroll);
	}

	componentWillUnmount(){
		//window.removeEventListener('scroll', this.onScroll.bind(this), false);
		window.removeEventListener('scroll', this.onScroll);
	}

	onScroll = (e) => {
		let scrollTop = null;
		
		if(scrollTop){
			scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
		}

		this.setState({ scrollTop });

		if(this.state.flag){
			this.drawArrow();
			this.setState({ flag : false })			
		}
		else{ return null; }

	};

	drawArrow = () => {
		const context = this.setContext();

		//this.setArrow(context);
		//this.setPath(context);
		this.setAni(context);
		this.setText(context);
		//this.setLine(context);
	}
	
	setContext = () => {
		let w = 120, h = 120;

		return d3.select(this.refs.label).append('svg')
			.attr('width', w)
			.attr('height', h)
			.attr('opacity', '0');
	}
	

	setAni = (context) => {
		return context
			.transition()
			.duration(1000)
    		.delay(1500)
    		.attr('opacity', '1');
	}

	setText = (context) => {
		return context.append('text')
			.text(function(d) {
				return '개발/퍼블리싱 참여율';
    		})
		    .attr('font-size', '11px')
	    	.attr('fill', '#e9eff4')
			.attr('x', 19)
			.attr('y', 115)
	    	.attr('class', 'percentLabel');
	    	//.attr('pointer-events', 'none');
	}

	setArrow = (context) => {
		return context.append("svg:defs").append("svg:marker")
		    .attr("id", "triangle")
		    .attr("refX", 8)
		    .attr("refY", 6)
		    .attr("markerWidth", 30)
		    .attr("markerHeight", 30)
		    .attr("markerUnits","userSpaceOnUse")
		    .attr("orient", "auto")
		    .append("path")
		    .attr("d", "M 0 0 12 6 0 12 3 6")
		    .style("fill", "#fff");
	}

	setPath = (context) => {
        return context.append("path")
          .attr("marker-end", "url(#triangle)")
          .attr("d", "M0 0 C 0 0, 0 0, 0 0 S 0 0, 70 20")
          .attr("stroke", "#fff")
          .attr("stroke-width", "1.5")
          .attr("fill", "transparent")
          .attr("class", "edges");
	}

	setLine = (context) => {
        return context.append("line")
            .attr("x1", 100)
            .attr("y1", 100)
            .attr("x2", 200)
            .attr("y2", 100)

            .attr("stroke-width", 1)
            .attr("stroke", "#fff")
            .attr("marker-end", "url(#triangle)");
	}

	render(){
			return(
				<div ref='label' className={cx('text-label')}></div>
			)
  	}	
}

export default LineArrow;
