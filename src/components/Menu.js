import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import Style from '../styles/Style.scss';

const cx = classNames.bind(Style);

const Menu = () => {
    const active = {
        color    : '#f18448',
        fontSize : '16px'
    };

    return (
        <header>
            <nav className={cx('header-nav')}>
                <ul>
                    <li className={ cx('menu') }><NavLink exact to="/" activeStyle={ active }>WORK</NavLink></li>
                    <li className={ cx('menu') }><NavLink to="/about" activeStyle={ active }>ABOUT</NavLink></li>
                    { /* <li><NavLink to="/about/foo" activeStyle={activeStyle}>About Foo</NavLink></li> */ }
                    {/*<li><NavLink to="/posts" activeStyle={active}>포스트</NavLink></li>*/}
                </ul>
            </nav>
        </header>
    );
};

export default Menu;