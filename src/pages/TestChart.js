import React, { Component } from 'react';
//import ReactDOM 			from 'react-dom';
//import * as d3 				from "d3";
//import * as ReactD3 		from 'react-d3-components';
import classNames 			from 'classnames/bind';
//import WorkContents			from 'components/WorkContents';
import Chart				from 'components/Chart';
import LineArrow			from 'components/LineArrow';
//import WorkList   			from 'components/WorkList';
//import Modal 	  			from 'components/Modal';

import Style 				from '../styles/Style.scss';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';

//import $                    from "jquery";

const cx = classNames.bind(Style);

class Works extends Component{
	constructor(props) {
	    super(props);

        this.state = {
        	getName : this.props.match.params.id,
        	show 	: false,
        };
	}

    componentDidMount(){
       
        //this.count();
        //console.log(this.state.getName);
	}	
	count = () =>{
		let cnt = 0;

	   /* tadd = () => {
	    	cnt++;
	    	console.log(`cnt : ${cnt}`);
	    }

	    return tadd;
	    */
	}

	render(){
	    
	    return(
			<div>

			</div>
		)
	}
}

export default Works;