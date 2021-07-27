import React, { Component } from 'react';
import classNames from 'classnames/bind';
import Style from '../styles/Style.scss';

const cx = classNames.bind(Style);

const NotFound = () => {

	return (
		<div className={cx('page','404-page')}>
			404
		</div>

	);
};

export default NotFound;