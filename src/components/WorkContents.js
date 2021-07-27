import React                     from 'react';
//import { Switch }              from 'react-router-dom';
//import ReactTimeout            from 'react-timeout';
import Slider                    from 'react-slick';
import classNames                from 'classnames/bind';


//import styled                    from 'styled-components';
import Style                     from '../styles/Style.scss';

import Ipad                      from '../images/ipad_2.png';
import Iphone                    from '../images/iphone_1.png';
import Mac                       from '../images/macbook.png';
import PlatumIpadimg             from '../images/platum_ipad_img_2.png';
import PlatumImg_1               from '../images/platum_mobile_img_1.PNG';
import PlatumImg_2               from '../images/platum_mobile_img_2.png';
import PlatumImg_3               from '../images/platum_mobile_img_3.png';
import PlatumImg_4               from '../images/platum_mobile_img_4.png';
import SlowfoodIpadimg           from '../images/slowfood_ipad_img_1.png';
import SlowfoodImg_1             from '../images/slowfood_mobile_img_1.png';
import SlowfoodImg_2             from '../images/slowfood_mobile_img_2.png';
import CiaMacimg_1               from '../images/cia_mac_img_1.png';
import CiaMacimg_2               from '../images/cia_mac_img_2.png';
import ScsrIpadimg               from '../images/scsr_ipad_img_1.png';
import ScsrImg_1                 from '../images/scsr_mobile_img_1.png';
//import ScsrImg_2                 from '../images/scsr_mobile_img_2.png';
import ScsrImg_3                 from '../images/scsr_mobile_img_3.png';
import ScsrImg_4                 from '../images/scsr_mobile_img_4.png';
import ScsrImg_5                 from '../images/scsr_mobile_img_5.png';
import BrandedMacimg_1           from '../images/branded_mac_img_1.png';
import BrandedMacimg_2           from '../images/branded_mac_img_2.png';
import BrandedMacimg_3           from '../images/branded_mac_img_3.png';
import BrandedMacimg_4           from '../images/branded_mac_img_4.png';
import BrandedMacimg_5           from '../images/branded_mac_img_5.png';
//import IforuIpadimg_1            from '../images/iforu_ipad_img_1.png';
import IforuIpadimg_2            from '../images/iforu_ipad_img_2.png';
import IforuImg_1                from '../images/iforu_mobile_img_1.png';
import IforuImg_2                from '../images/iforu_mobile_img_2.png';
import IforuImg_3                from '../images/iforu_mobile_img_3.png';
import IforuImg_4                from '../images/iforu_mobile_img_4.png';
import KbreadIpadimg             from '../images/kbread_ipad_img_1.png';
import KbreadImg_1               from '../images/kbread_mobile_img_1.png';
import KbreadImg_2               from '../images/kbread_mobile_img_2.png';
import KbreadImg_3               from '../images/kbread_mobile_img_3.png';
import KbreadImg_4               from '../images/kbread_mobile_img_4.png';
import GoodrichIpadimg           from '../images/goodrich_ipad_img_1.png';
import GoodrichImg_1             from '../images/goodrich_mobile_img_1.png';
import GoodrichImg_2             from '../images/goodrich_mobile_img_2.png';
import GoodrichImg_3             from '../images/goodrich_mobile_img_3.png';
import GoodrichImg_4             from '../images/goodrich_mobile_img_4.png';

import WalnutsMacimg             from '../images/walnuts_mac_img_1.png';

import HiphoperGif               from '../images/hiphoper_mobile_img_1.gif';
import HiphoperImg               from '../images/hiphoper_mobile_img_1.png';
import SamsungEventImg_1         from '../images/samsung_event_2.png';
import SamsungEventImg_2         from '../images/samsung_event_3.png';

//import $                         from "jquery";

//window.$ = window.jQuery = jQuery;

const cx = classNames.bind(Style);

const settings = {
    dots           : false,
    infinite       : true,
    speed          : 400,
    slidesToShow   : 1,
    slidesToScroll : 1,
    autoplay       : true,
    autoplaySpeed  : 2000,
    cssEase        : "linear",
    className      : cx('slick-slider-custom-css'),
    arrows         : false
};

const WorkContents = ({ param, screen, index }) => {
    const imgStyle = {
        width : '87.5%'
    };

    return(
        <div className={cx('work-screen', param)}>
            {(() => {
                if(screen === 'mac'){
                    if(param === 'skplanet'){
                        return(
                            <div>
                                <img className={cx('mac-base')} src={ Mac } alt='Mac default' />
                                <Slider {...settings}>
                                    <div>
                                        <img className={cx('mac-work-view')} src={ CiaMacimg_1 } alt='CIA' />
                                    </div>
                                    <div>
                                        <img className={cx('mac-work-view')} src={ CiaMacimg_2 } alt='CIA' />
                                    </div>
                                </Slider>
                            </div>
                        )
                    }
                    else if(param === 'branded-works'){
                        return(
                            <div>
                                <img className={cx('mac-base')} src={ Mac } alt='Mac default' />
                                <Slider {...settings}>
                                    <div>
                                        <img className={cx('mac-work-view')} src={ BrandedMacimg_1 } alt='브랜디드웍스' />
                                    </div>
                                    <div>
                                        <img className={cx('mac-work-view')} src={ BrandedMacimg_2 } alt='브랜디드웍스' />
                                    </div>
                                    <div>
                                        <img className={cx('mac-work-view')} src={ BrandedMacimg_3 } alt='브랜디드웍스' />
                                    </div>
                                    <div>
                                        <img className={cx('mac-work-view')} src={ BrandedMacimg_4 } alt='브랜디드웍스' />
                                    </div>
                                    <div>
                                        <img className={cx('mac-work-view')} src={ BrandedMacimg_5 } alt='브랜디드웍스' />
                                    </div>                                    
                                </Slider>
                            </div>
                        )                        
                    }
                    else if(param === 'walnuts'){
                        return(
                            <div>
                                <img className={cx('mac-base')} src={ Mac } alt='Mac default' />
                                <Slider {...settings}>
                                    <div>
                                        <img className={cx('mac-work-view')} src={ WalnutsMacimg } alt='캘리포니아호두협회' />
                                    </div>
                                </Slider>
                            </div>
                        )
                    }                    
                }
                if(screen === 'ipad'){
                    if(param === 'platum'){
                        return(
                            <div>
                                <img className={cx('ipad-base')} src={ Ipad } alt="Ipad default" />
                                <img className={cx('work-view')} src={ PlatumIpadimg } alt="플래텀" />                        
                            </div>
                        )
                    }
                    else if(param === 'slowfood'){
                        return(
                            <div>
                                <img className={cx('ipad-base')} src={ Ipad } alt="Ipad default" />
                                <img className={cx('work-view')} src={ SlowfoodIpadimg } alt="슬로푸드" />                        
                            </div>                            
                        )
                    }
                    else if(param === 'samsung-csr'){
                        return(
                            <div>
                                <img className={cx('ipad-base')} src={ Ipad } alt="Ipad default" />
                                <img className={cx('work-view')} src={ ScsrIpadimg } alt="삼성전자 사회공헌" />                        
                            </div>                            
                        )
                    }
                    else if(param === 'iforu-theme'){
                        return(
                            <div>
                                <img className={cx('ipad-base')} src={ Ipad } alt="Ipad default" />
                                <img className={cx('work-view')} src={ IforuIpadimg_2 } alt="아이포유 테마" />                        
                            </div>                            
                        )
                    }
                    else if(param === 'kbread'){
                        return(
                            <div>
                                <img className={cx('ipad-base')} src={ Ipad } alt="Ipad default" />
                                <img className={cx('work-view')} src={ KbreadIpadimg } alt="김영모과자점" />                        
                            </div>                            
                        )
                    }
                    else if(param === 'goodrich'){
                        return(
                            <div>
                                <img className={cx('ipad-base')} src={ Ipad } alt="Ipad default" />
                                <img className={cx('work-view')} src={ GoodrichIpadimg } alt="굿리치" />                        
                            </div>                            
                        )
                    }
                }
                else if(screen === 'iphoneLeft'){
                    if(param === 'platum'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ PlatumImg_1 } alt="Iphone default" />
                                </div>
                            )
                        }
                        else if(index === '2'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ PlatumImg_2 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }
                    else if(param === 'slowfood'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ SlowfoodImg_1 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }
                    else if(param === 'samsung-csr'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ ScsrImg_5 } alt="Iphone default" />
                                </div>
                            )
                        }
                        else if(index === '2'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ ScsrImg_1 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }
                    else if(param === 'iforu-theme'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ IforuImg_1 } alt="Iphone default" />
                                </div>
                            )
                        }
                        else if(index === '2'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ IforuImg_2 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }
                    else if(param === 'kbread'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ KbreadImg_1 } alt="Iphone default" />
                                </div>
                            )
                        }
                        else if(index === '2'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ KbreadImg_2 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }
                    else if(param === 'goodrich'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ GoodrichImg_1 } alt="Iphone default" />
                                </div>
                            )
                        }
                        else if(index === '2'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ GoodrichImg_2 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }
                    else if(param === 'event-work'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <div className={cx('work-view-over-hidden')}>
                                        <img className={cx('work-view')} src={ HiphoperGif } alt="Iphone default" />
                                    </div>
                                </div>
                            )
                        }
                        else if(index === '2'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                        <img className={cx('work-view')} src={ HiphoperImg } alt="Iphone default" />
                                </div>
                            )
                        }
                    }                    
                }
                else if(screen === 'iphoneRight'){
                    if(param === 'platum'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ PlatumImg_3 } alt="Iphone default" />
                                </div>
                            )
                        }
                        else if(index === '2'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ PlatumImg_4 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }
                    else if(param === 'slowfood'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ SlowfoodImg_2 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }
                    else if(param === 'samsung-csr'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ ScsrImg_3 } alt="Iphone default" />
                                </div>
                            )
                        }
                        else if(index === '2'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ ScsrImg_4 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }
                    else if(param === 'iforu-theme'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ IforuImg_3 } alt="Iphone default" />
                                </div>
                            )
                        }
                        else if(index === '2'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ IforuImg_4 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }
                    else if(param === 'kbread'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ KbreadImg_3 } alt="Iphone default" />
                                </div>
                            )
                        }
                        else if(index === '2'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ KbreadImg_4 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }
                    else if(param === 'goodrich'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ GoodrichImg_3 } alt="Iphone default" />
                                </div>
                            )
                        }
                        else if(index === '2'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ GoodrichImg_4 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }
                    else if(param === 'event-work'){
                        if(index === '1'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ SamsungEventImg_1 } alt="Iphone default" />
                                </div>
                            )
                        }
                        else if(index === '2'){
                            return(
                                <div>
                                    <img className={cx('iphone-base')} src={ Iphone } alt="Iphone default" />
                                    <img className={cx('work-view')} src={ SamsungEventImg_2 } alt="Iphone default" />
                                </div>
                            )
                        }
                    }                                    
                }                
            })()}                
        </div>
    );
};

export default WorkContents;