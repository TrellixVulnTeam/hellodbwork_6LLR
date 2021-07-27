import React, { Component }      from 'react';
import classNames                from 'classnames/bind';

import Style                     from '../styles/Style.scss';

const cx = classNames.bind(Style);

const Modal = ({ handleClose, show, children }) => {
 
	const showHideClassName = show ? "modal display-block" : "modal display-none";

	return (
	    <div className={cx(showHideClassname)}>
	      <section className={cx('modal-main')}>
	        {children}
	        <button onClick={handleClose}>close</button>
	      </section>
	    </div>
	  );
	};

export default Modal;