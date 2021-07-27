import React, { Component }          from 'react';
//import ReactTimeout                  from 'react-timeout';
import { Route, Switch }             from 'react-router-dom';
//import axios from 'axios';
import classNames                    from 'classnames/bind';
import { Home, About, Posts, Works, TestChart, NotFound, Slider } from 'pages';
import Menu                          from 'components/Menu';
//import Footer                        from 'components/Footer';

import Style                         from '../styles/Style.scss';
//import Animation                     from '../styles/Animation.scss';

import { library }                   from '@fortawesome/fontawesome-svg-core'
//import { FontAwesomeIcon }           from '@fortawesome/react-fontawesome'
import { faLink, faAngleUp }         from '@fortawesome/free-solid-svg-icons'
import Loading                       from '../images/loading.gif';
import $                             from "jquery";

library.add(faLink, faAngleUp);


const cx = classNames.bind(Style);

class App extends Component{
    componentDidMount(){
      // 외부 라이브러리 연동: D3, masonry, etc
      // 컴포넌트에서 필요한 데이터 요청: Ajax, GraphQL, etc
      // DOM 에 관련된 작업: 스크롤 설정, 크기 읽어오기 등    
        
        //$(window).load(function(){
            //$('#load').hide();
        //});

    }
    
    componentDidUpdate() {
        window.scrollTo(0,0);
    }

    componentWillUnmount() {
      // 이벤트, setTimeout, 외부 라이브러리 인스턴스 제거
    }

    render() {
        //const isBlue = true; {/* props에 따른 스타일 적용 가능 */}

        return(
            /* <div className={cx('container', { 'blue': isBlue } )}> */
            <div className={ cx('container') }>
                {/*
                <div id="load" className={cx('load')}>
                    <img src={ Loading } alt="loading" />
                </div>
                */}
                <Menu />
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Switch>               
                    <Route path="/Works/:id" component={Works} />                
                    <Route path="/Works" component={Works} />
                </Switch>
                <Route path="/posts" component={Posts} />
                {/*<Route path="/testchart" component={TestChart} />*/}
                {/*<Route path="/s-slider" component={Slider} />*/}
            </div>
        );
    }
}

export default App;