import React 	  from 'react';
import classNames from 'classnames/bind';
import Intro 	  from 'components/Intro';
import WorkList   from 'components/WorkList';

import Style 	  from '../styles/Style.scss';
//import Animation  from '../styles/Animation.scss';

const cx = classNames.bind(Style);

// 함수형 컴포넌트
const Home = () => {

	return (
		<div className={cx('page','home-page')}>
		<div className={cx('main')}>
			<section className={cx('intro')}>
				<div className={cx('intro-content')}>
					<Intro />
				</div>
			</section>
			<section className={cx('work-list-wrap')}>
				<div className={cx('work-list')}>
					<WorkList />
				</div>
			</section>
		</div>
		</div>

	);
};

export default Home;