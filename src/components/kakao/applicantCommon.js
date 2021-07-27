'use strict';

var Common = (function() {
	return {};
})();

/********************************************************************************************
formSubmit은 Get파라미터를 숨기기 위해 Post로 이동하기 위한 기능
********************************************************************************************/
Common.formSubmit = (function(href, data, target) {
	var i, t = [], $frm;

	if(!href) throw new Error('Form Action 경로를 입력하세요.');
	if(!data || data.constructor !== Object) throw new Error('Key Value 형태의 데이터를 입력하세요.');

	// 이미 있으면 삭제 후 재생성
	$frm = $('#koalaLocationFrm');
	if($frm.size()) $frm.remove();

	t.push('<form id="koalaLocationFrm" action="'+href+'" method="post" '+(target ? 'target="'+target+'"' : '')+'>');
	for(i in data) {
        if($.isArray(data[i])) t.push('<input type="hidden" name="'+i+'" value="'+data[i].join(',')+'" />');
		else t.push('<input type="hidden" name="'+i+'" value="'+data[i]+'" />');
    }
	t.push('</form>');

	$('body').append(t.join(''));
	$('#koalaLocationFrm').submit();
});

/********************************************************************************************
브라우저 디텍팅
********************************************************************************************/
Common.detact = (function() {
	var s, match;
	s = navigator.userAgent.toLowerCase();
	match = (/(webkit)[ \/](\w.]+)/).exec(s) || (/(opera)(?:.*version)?[ \/](\w.]+)/).exec(s) || (/(msie) ([\w.]+)/).exec(s) || !(/compatible/).test(s) && (/(mozilla)(?:.*? rv:([\w.]+))?/).exec(s) || [];

	return {
		name: match[1] || '',
		version: match[2] || '0'
	};
})();

/********************************************************************************************
브라우저 디텍팅
********************************************************************************************/
Common.legacyBrowser = (function() {
	var t = [], interval;
	
	t.push('<div id="wrapLegacy">');
	t.push('	<div class="header">');
	t.push('		<h1><strong>IE9 이하</strong> <span>사용에 따른 접속 제한</span></h1>');
	t.push('		<p>본 채용솔루션은 아래와 같은 이유로 인터넷 익스플로러 9 이하에서 서비스를 제공하고 있지 않습니다.</p>');
	t.push('	</div>');
	t.push('	<div class="wrapContent">');
	t.push('		<div class="content">');
	t.push('			<h2>보안취약성의 문제</h2>');
	t.push('			<p>IE8은 2014년, IE9는 2016년 1월부터 MS사에서 업데이트 지원을 중단했습니다.<br/>이에 보안취약점에 대한 패치 또한 제공하고 있지 않습니다.<br/>따라서 지원자의 다양한 개인정보를 취급하는 채용솔루션의 특성상 적합하지 않습니다.</p>');
	t.push('		</div>');
	t.push('		<div class="content">');
	t.push('			<h2>IE8, IE9의 느린속도</h2>');
	t.push('			<p>파이어폭스나 사파리, IE의 상위버전에 비해 IE8, IE9는 8배 정도 느립니다.<br/>크롬에 비교하면 17배 정도 느립니다.</p>');
	t.push('		</div>');
	t.push('		<div class="content">');
	t.push('			<h2>안정성의 문제</h2>');
	t.push('			<p>IE8은 타 브라우저에 비해 40배 넘는 메모리를 사용하고 있습니다.<br/>그래서 이력서 작성 중 예상치 못한 오류를 빈번하게 겪을 수 있습니다.</p>');
	t.push('		</div>');
	t.push('	</div>');
	t.push('	<div class="wrapSolution">');
	t.push('		<h2><span>따라서, </span><strong>해결방법</strong><span>은</span></h2>');
	t.push('		<p>최신 버전의 웹브라우저를 사용합니다.<br/>그 중 크롬을 가장 추천합니다.<br/>혹은 IE의 버전을 업그레이드합니다.<br/>IE10부터 사용가능하며 IE11을 가장 추천합니다.</p>');
	t.push('		<div class="wrapLink clearfix">');
	t.push('			<a href="https://www.google.com/chrome/browser/desktop/index.html" class="chrome" title="구글 크롬 브라우저" target="_blank">Google Chrome</a>');
	t.push('			<a href="https://support.microsoft.com/ko-kr/help/17621/internet-explorer-downloads" class="ie11" title ="윈도우 익스플로러 11" target="_blank">Internet Explorer 11</a>');
	t.push('		</div>');
	t.push('	</div>');
	t.push('</div>');

	// IE9이하면 동작
	if(Common.detact.name === 'msie' && Number(Common.detact.version) < 10) {
		interval = setInterval(function() {
			if(document.getElementsByTagName('body').length) { // body태그가 생성되면 바로 업데이트
				clearInterval(interval);
				document.getElementsByTagName('body')[0].innerHTML = t.join('');
				document.getElementsByTagName('title')[0].innerHTML = 'IE9 이하 사용에 따른 접속 제한 안내문';
			}
		}, 1);
	}
})();

/********************************************************************************************
 Ajax 로딩이미지 띄우기
 ********************************************************************************************/
Common.loading = (function() {
	var fn, count=0, maxLength=0, imgUrl;

	imgUrl = (document.resources || '/resources') + '/mrs2/images/ajaxLoading.gif';

	fn = {
		show : function() {
			var height = $(window).height();
			maxLength++;

			// 이미 로딩되어 있으면 취소
			if($('#ajaxLoading').size() > 0) return false;
			$('body').append('<div id="ajaxLoading" style="line-height:'+height+'px"><img src="'+imgUrl+'" alt="Loading" /></div>');
		},
		hide : function() { // Ajax를 무조건 닫을 때 사용하는 함수
			$('div#ajaxLoading').remove();
			maxLength = 0;
			count = 0;
		},
		countHide : function() { // Ajax를 여러개 돌릴 때 사용하는 함수
			if(++count >= maxLength) fn.hide();
		}
	};

	return {
		show : fn.show,
		hide : fn.hide,
		countHide : fn.countHide
	};
})();

/**********************************************************************************************
  Ajax 에러시 메시지 리턴
**********************************************************************************************/
Common.ajaxOnfail = (function(x, e) {
	var statusCode = x.status;
	switch(statusCode) {
	case 901 :
		Alert(x.responseText, function() {
			location.href = '/cus/login';
		});		
		break;
	case 999 :
		Alert(x.responseText);
		break;
	default :
		Alert('처리중 오류가 발생하였습니다. 관리자에게 문의하시기 바랍니다.');
	}
});


/********************************************************************************************
 레이어팝업 시스템 (하단 주석은 실행 예)
 ********************************************************************************************/
//var modalOpt = {
//	title : '모달',
//	width : '700',
//	scroll : true,
//	btnTitle : '저장',
//	btnEvent : function() {
//		Alert('잘했어~1');
//		return false;
//	},
//	callback : function() {
//
//	},
//	content : '컨텐츠를 넣어주세요.'
//}
//
//	Modal(modalOpt);
// height를 안넣으면 자동 조절

Common.modal = (function() {
    var opt = {},
        fnSetOption, // 옵션설정
        fnOpen, // 열기
        fnClose, // 닫기
        fnEvent, // 기본이벤트부여
        fnValidUnit, // 옵션 단위검사
        fnLayout, // 레이아웃 수치 계산
        fnCreate; // 팝업생성

    var Modal; //현재 켜져있는 모달 저장(버튼 여러번 누를경우 방지)

    fnSetOption = function(option) { // 옵션설정
        $.extend(opt, {
            title : '제목을 입력하세요',
            width : '800',
            height : '',
            scroll : false,
            openAnimation : true,
            closeAnimation : true,
            btnTitle : '저장',
            btnEvent : function() { alert('이벤트를 연결하세요'); return false; },
            cancelTitle : '취소',
            cancelEvent : function() { return true; },
            cachingEvent : function() {
				// 비움
            },
            callback : function() {
				// 비움
            },
            content : '컨텐츠를 입력하세요',
            validater : false,
            _Form : undefined,
            enabledCancel : true,
            enabledForm : true,
            enabledConfirm : true,
            enabledCaching : false,
            enabledSecondBtn : false,
            enabledSecondBtnConfirm : true,
            enabledCancelConfirm : false,
            secondBtnTitle : '두번째버튼',
            secondBtnEvent : function() { alert('이벤트를 연결하세요'); return false; },
            confirmMsg : '',
            secondBtnConfirmMsg : '',
            cancelConfirmMsg : '',
            bottomArea : false,
            bottomHeight : '75',
            bottomContent : '컨텐츠를 입력하세요.',
            addBtn : [], // id, title, cls 세개가 필요함
            submitDisabled : false,
            secondBtnDisabled : false
        }, option);

        opt.width = opt.width+''; // 스트링으로 변환
        opt.height = opt.height+''; // 스트링으로 변환

        return fnValidUnit('width') && fnValidUnit('height');
    };

    fnOpen = function() { // 열기
        var focusing = function() { $('#modal').attr('tabindex', -1).focus(); };
        var animationOpt = {
            always : focusing
        };

        opt.callback();
        $('body').css({overflowY:'hidden'});

        if(opt.openAnimation) setTimeout(function() {
            animationOpt.duration = 'fast';
            $('#modal').fadeIn(animationOpt);
        }, 200);
        else $('#modal').show(animationOpt);
    };

    fnClose = function() { // 닫기
        if(opt.closeAnimation) {
            $('#modal').fadeOut('fast');
            setTimeout(function() {
                if(!$('#modalGrid').size()) $('body').css({overflowY:'auto'});
                opt.enabledForm ? $('#modalFrm').remove() : $('#modal').remove();
            }, 200);
        } else {
            $('#modal').remove();
            if(!$('#modalGrid').size()) $('body').css({overflowY:'auto'});
            opt.enabledForm ? $('#modalFrm').remove() : $('#modal').remove();
        }
    };

    fnEvent = function() { // 기본 이벤트 바인딩
        var k, _form;

        if(opt.validater) { // jquery.midas.validater 설정
            $('#modalFrm').validater({
                submitBtn : '#modal button[data-button="modalSubmit"]',
                submitMethod : function() {
                    var msg = opt.confirmMsg ? opt.confirmMsg : opt.btnTitle+'하시겠습니까?';
                    var Confirm = window['Confirm'] || null;
                    if(opt.enabledConfirm) {
                        if(Confirm) Confirm(msg, function() { if(opt.btnEvent()) fnClose(); });
                        else if(confirm(msg)) if(opt.btnEvent()) fnClose();
                    } else {
                        if(opt.btnEvent()) fnClose();
                    }
                }
            });
        } else if(opt._Form) { // _Form.js 설정
            if(opt._Form.constructor !== Object) throw new Error('_Form 옵션은 객체형태의 변수를 넘겨주세요.');

            _form = new _Form('#modalFrm', {
                submitBtn : '#modal button[data-button="modalSubmit"]',
                submitMethod : function() {
                    var msg = opt.confirmMsg ? opt.confirmMsg : opt.btnTitle+'하시겠습니까?';
                    var Confirm = window['Confirm'] || null;
                    if(opt.enabledConfirm) {
                        if(Confirm) Confirm(msg, function() { if(opt.btnEvent()) fnClose(); });
                        else if(confirm(msg)) if(opt.btnEvent()) fnClose();
                    } else {
                        if(opt.btnEvent()) fnClose();
                    }
                }
            });

            // 외부 변수에 _Form 연결
            for(k in _form) opt._Form[k] = _form[k];
        } else if(opt.enabledCaching) {
            $('#modal button[data-button="modalCaching"]').click(function() {
                opt.cachingEvent();
                fnClose();
            });
        } else { // 기본
            $('#modal button[data-button="modalSubmit"]').click(function() {
                var msg = opt.confirmMsg ? opt.confirmMsg : opt.btnTitle+'하시겠습니까?';
                var Confirm = window['Confirm'] || null;
                if(opt.enabledConfirm) {
                    if(Confirm) Confirm(msg, function() { if(opt.btnEvent()) fnClose(); });
                    else if(confirm(msg)) if(opt.btnEvent()) fnClose();
                } else {
                    if(opt.btnEvent()) fnClose();
                }
            });
        }

        $('#modal button[data-button="modalSecondBtn"]').click(function() {
            var msg = opt.secondBtnConfirmMsg ? opt.secondBtnConfirmMsg : opt.secondBtnTitle+'하시겠습니까?';
            var Confirm = window['Confirm'] || null;
            if(opt.enabledSecondBtnConfirm) {
                if(Confirm) Confirm(msg, function() { if(opt.secondBtnEvent()) fnClose(); });
                else if(confirm(msg)) if(opt.secondBtnEvent()) fnClose();
            } else {
                if(opt.secondBtnEvent()) fnClose();
            }
        });

        $('#modal button[data-button="modalCancel"]').click(function() {
            var msg = opt.cancelConfirmMsg ? opt.cancelConfirmMsg : opt.cancelTitle+'하시겠습니까?';
            var Confirm = window['Confirm'] || null;
            if(opt.enabledCancelConfirm) {
                if(Confirm) Confirm(msg, function() { if(opt.cancelEvent()) fnClose(); });
                else if(confirm(msg)) if(opt.cancelEvent()) fnClose();
            } else {
                if(opt.cancelEvent()) fnClose();
            }
        });

        $('#modal button[data-button="modalClose"]').click(fnClose);

        $(document).keydown(function(e) {
            if(e.keyCode===27) fnClose(); // ESC
        });
    };

    fnValidUnit = function(unit) { // 단위누락시 자동변환
        if(!opt[unit].match('px') && !opt[unit].match('%')) {
            if(Number(opt[unit]) > 0) opt[unit] = opt[unit]+'px';
            else if(Number(opt[unit]) === 0) return true;
            else throw new Error('유효한 '+unit+'를 입력하세요.');
        }
        return true;
    };

    fnLayout = function() { // 레이아웃 수치 계산
        var style, marginTop;
        marginTop = (($(window).height() - opt.height.replace('px', '').replace('%', '')) / 2)+'px';
        style = (opt.width ? 'width:'+opt.width+';' : '')+''+((!opt.scroll&&opt.height)? 'margin-top:'+marginTop+';' : '')+(opt.height? 'height:'+opt.height : '');
        return style;
    };

    fnCreate = function() {
        var t = [], s = fnLayout(), i, d;

        if(opt.enabledForm) t.push('<form id="modalFrm">'); // form이 반드시 여기 있어야 modal-scroll이 동작함
        t.push('<article id="modal" class="modal-bg '+(opt.scroll ? 'modal-scroll-outer' : 'modal-scroll-inner')+'">');
        t.push('	<div class="modal" style="'+s+'">');
        t.push('		<h1 class="h1">'+opt.title+'<button type="button" data-button="modalClose" class="btn-close-modal"></button></h1>');
        t.push('			<div class="modal-body" '+(opt.bottomArea ? 'style="height:calc(100% - 148px - '+opt.bottomHeight+'px)"' : '')+'>'+opt.content+'</div>');
        if(opt.enabledCaching) { // 0일 동안 보지 않기
            t.push('		<div class="caching-set">');
            t.push('			<label class="styled-select"><select id="cachingPeriod"><option value="1">1</option><option value="7">7</option><option value="30">30</option></select></label>');
            t.push('			일 동안 보이지 않기');
            t.push('			<button type="button" class="btn btn-last" style="margin-left:20px;" data-button="modalCaching">닫기</button>');
            t.push('		</div>');
        } else {
            t.push('		<div id="modalBtnSet" class="btn-set">');
            if(opt.bottomArea) t.push('<div id="modalBottom" style="padding:0 20px;height:'+opt.bottomHeight+'px;text-align:left">'+opt.bottomContent+'</div>');
            t.push('			<button type="button" class="btn btn-big" data-button="modalSubmit" '+(opt.submitDisabled ? 'disabled' : '')+'>'+opt.btnTitle+'</button>');
            if(opt.enabledSecondBtn) t.push('<button type="button" class="btn btn-big btn-add" data-button="modalSecondBtn" '+(opt.secondBtnDisabled ? 'disabled' : '')+'>'+opt.secondBtnTitle+'</button>');
            if(opt.enabledCancel) t.push('<button type="button" class="btn btn-big btn-ng" data-button="modalCancel">'+opt.cancelTitle+'</button>');
            if(opt.addBtn.length) {
                t.push('<div style="position:absolute;top:0px;left:30px;">');
                for(i=0; i<opt.addBtn.length; i++) {
                    d = opt.addBtn[i];
                    t.push('<button type="'+(d.type ? d.type : 'button')+'" class="btn btn-near '+d.cls+'" id="'+d.id+'" data-button="'+d.id+'">'+d.title+'</button>');
                }
                t.push('</div>');
            }
        }
        t.push('		</div>');
        t.push('	</div>');
        t.push('</article>');
        if(opt.enabledForm) t.push('</form>');
        $('body').append(t.join(''));
    };

    return function(option) {
        if($('#modal').size()) return Modal;

        if(fnSetOption(option)) { // 옵션에 문제가 없으면 모달생성
            fnCreate();
            fnEvent();
            fnOpen();
        }

        Modal = {
            set : opt,
            close : fnClose,
            open : fnOpen
        };
        return Modal;
    };
})();