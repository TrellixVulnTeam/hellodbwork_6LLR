import React, { Component } from 'react';
import ReactTimeout from 'react-timeout';
import classNames from 'classnames/bind';

//import styled from 'styled-components';
import Style from '../styles/Style.scss';
//import Animation from '../styles/Animation.scss';

const cx = classNames.bind(Style);

class Intro extends Component{
    constructor(props) {
        super(props);

        this.state = {
            animate : false
        };
    }
    
    componentDidMount(){
        //console.log('componentDidMount : 컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행되는 메소드입니다. 이 안에서 다른 JavaScript 프레임워크를 연동하거나, setTimeout, setInterval 및 AJAX 처리 등을 넣습니다.')
        
        const ANIMATION_TIMEOUT = 500;

        setTimeout(() => {
            this.setState({ 
                animate:true 
            });
        }, ANIMATION_TIMEOUT );

    }

    render(){
        const leftSlide     = this.state.animate ? 'slideInLeft' : null;
        const rightSlide    = this.state.animate ? 'slideInRight' : null;
        const leftSlideCss  = {
            transform  : this.state.animate ? 'translateX(32%)' : 0,
            transition : this.state.animate ? '1s' : 0
        };
        const rightSlideCss = {
            transform  : this.state.animate ? 'translateX(-32%)' : 0,
            transition : this.state.animate ? '1s' : 0
        };

        return (
            <div>
                <div className={ cx('intro-content-text') }>
                    <span className={ cx({ leftSlide }) } style={ leftSlideCss }>React.JS & SCSS</span>
                </div>
                <div className={ cx('intro-content-text') }>
                    <span className={ cx({ rightSlide }) } style={ rightSlideCss }>PHP & Wordpress</span>
                </div>
                <div className={ cx('intro-content-text') }>
                    <span className={ cx({ leftSlide }) } style={ leftSlideCss }>Responsive Web</span>
                </div>
                <div className={ cx('intro-content-text') }>
                    <span className={ cx({ rightSlide }) } style={ rightSlideCss }>Web Accessibility</span>
                </div>
                <div className={ cx('intro-content-text') }>
                    <span className={ cx({ leftSlide }) } style={ leftSlideCss }>Front-end Developer</span>
                </div>                
            </div>
        );
    }
}

export default ReactTimeout(Intro);