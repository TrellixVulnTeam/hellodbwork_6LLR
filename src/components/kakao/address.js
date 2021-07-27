'use strict';

/* IE9 까지 지원 필요 */
// publish/addressTest.html
var MidasAddress = {};

MidasAddress.API = function(param, callback) {
    var xhr, xdr, response, textQuery = '', key;

    param['keyword'] = param['keyword'] || '';
    param['currentPage'] = param['currentPage'] || 1;
    param['countPerPage'] = param['countPerPage'] || 100;
    param['confmKey'] = 'U01TX0FVVEgyMDE4MDgwMTE3NTEwMTEwODA0NTE=';
    param['resultType'] = 'json';

    for(key in param) {
        textQuery += key + '=' + encodeURIComponent(param[key]) + '&';
    }

    if(window.XDomainRequest) { //IE 9 대응
        xdr = new XDomainRequest();

        xdr.onload = function(e) {
            if (xdr.responseText) {
                response = JSON.parse(xdr.responseText).results || {};
            }
            callback(response); //동기 호출이 안되어서 callback 방식으로 해결
        };

        xdr.open('GET', location.protocol + '//www.juso.go.kr/addrlink/addrLinkApi.do?'+textQuery);
        xdr.send();
    } else {
        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            var data;
            if (xhr.readyState === xhr.DONE) { // 요청이 완료되면
                data = JSON.parse(xhr.responseText).results || {};
                if (xhr.status === 200 || xhr.status === 201) {
                    response = data;
                }
                callback(response);
            }
        };

        xhr.open('GET', location.protocol + '//www.juso.go.kr/addrlink/addrLinkApi.do?'+textQuery, false);
        xhr.send();
    }
};

MidasAddress.addressPicker = (function() {
    var options;
    var formControl = {};
    var eventFormSubmitted, eventLinkClicked, filterReservedWord, init;

    eventFormSubmitted = function(e) {
        var keyword;
        e.preventDefault();

        formControl['beforeSearch']();

        keyword = filterReservedWord(formControl['controls'].querySelector('[data-address-input]').value);
        formControl['controls'].querySelector('[data-address-input]').value = keyword;

        MidasAddress.API({
            keyword : keyword,
            currentPage : 1,
            countPerPage : 100
        }, function(data) {
            var t = [];

            if(data.common.errorCode !== '0') { //오류 발생시
                t.push('<div class="error">'+data.common.errorMessage+'</div>');
            } else {
                if(data.juso.length === 0) {
                     t.push('<div class="error">검색 결과가 없습니다.</div>');
                } else {
                    data.juso.forEach(function(obj) {
                        t.push('<div class="midas-address-result">' +
                            '       <div class="code5">' + obj.zipNo + '</div>' +
                            '       <div class="address">' +
                            '           <a class="selector">' +
                            '               <span class="address_info">' + obj.roadAddrPart1 + '</span>' +
                            '               <span class="extra_info">' + obj.roadAddrPart2 + '</span></a>' +
                            '           </a>' +
                            '           <span class="old-address" style="display:none">' + obj.jibunAddr + '</span>' +
                            '       </div>' +
                            '   </div>');
                    });
                }
            }
            formControl['resultDiv'].innerHTML = t.join('');

            formControl['afterSearch']();
        });
    };

    eventLinkClicked = function(e) {
        var target;
        for (target=e.target; target && !target.isEqualNode(this); target=target.parentNode) { // $.closest
            if(target.className.indexOf('midas-address-result') >= 0) {
                formControl['insertAddress'].value = target.querySelector('.address_info').innerText;
                formControl['insertPostcode5'].value = target.querySelector('.code5').innerText;

                if(formControl['insertDetails']) {
                    formControl['insertDetails'].focus();
                }
                break;
            }
        }
    };

    filterReservedWord = function(string) {
        // 특정문자열(sql예약어의 앞뒤공백포함) 제거 - SQL 예약어는 도로명주소 API에서 IP차단 시킴
		var regExp = /[|%|=|>|<|]|OR|SELECT|INSERT|DELETE|UPDATE|CREATE|DROP|EXEC|UNION|FETCH|DECLARE|TRUNCATE/g;
		return string.replace(regExp, '');
    }

    init = function() {
        var controlInput, controlButton;
        formControl['resultDiv'] = document.querySelector(options['resultDiv']); //검색 결과가 나오는 div
        formControl['controls'] = document.querySelector(options['controls']); //form 역할을 하는 div (form태그로 하지 않는 이유는 form태그 안에서 이 라이브러리를 이용 할 수 도있기 때문이다. 그래서 enter키 입력과 submit 버튼 클릭이벤트를 따로 설정해줘야 함)

        if(!formControl['resultDiv']) throw new Error('');

        formControl['insertAddress'] = document.querySelector(options['insertAddress']) || {}; //resultDiv에서 선택시 주소가 나오는 div
        formControl['insertDetails'] = document.querySelector(options['insertDetails']) || {}; //resultDiv에서 선택시 상세 주소가 나오는 div
        formControl['insertPostcode5'] = document.querySelector(options['insertPostcode5']) || {}; //resultDiv에서 선택시 우편번호가 나오는 div
        formControl['beforeSearch'] = options['beforeSearch'] || function() { /* eslint 회피 */ }; //검색 전 동작할 함수
        formControl['afterSearch'] = options['afterSearch'] || function() { /* eslint 회피 */ }; //검색 후 동작할 함수

        formControl['controls'].className = formControl['controls'].className + ' ' + 'midas-address-form';
        formControl['resultDiv'].className = formControl['resultDiv'].className + ' ' + 'midas-address-resultdiv';

        controlInput = document.createElement('input');
        controlInput.setAttribute('type', 'text');
        controlInput.setAttribute('maxlength', '40');
        controlInput.setAttribute('data-address-input', '');
        controlInput.addEventListener('keydown', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                controlButton.click();
            }
        });

        controlButton = document.createElement('button');
        controlButton.innerText = options['textSearchButton'] || '검색';
        controlButton.setAttribute('type', 'submit');
        controlButton.addEventListener('click', eventFormSubmitted);

        formControl['controls'].appendChild(controlInput);
        formControl['controls'].appendChild(controlButton);

        formControl['resultDiv'].addEventListener('click', eventLinkClicked);
    };

    return function(opt) {
        options = opt;

        function isMacOS() {
            var platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
            if (macosPlatforms.indexOf(platform) !== -1) {
                return true;
            }
            return false;
        }

        if(isMacOS()) {
            // https://www.juso.go.kr/help/DevCenterQABoardDetail.do?mgtSn=35791&currentPage=1&searchType=subject&keyword=mac
            // MAC 인증서 문제 임시 해결
            $(opt.resultDiv).postcodify({ //도로명주소 서버 점검시 임시로 사용할 예정으로 주석 달아놓았음
                insertAddress : opt.insertAddress,
                insertDetails : opt.insertDetails,
                insertPostcode5 : opt.insertPostcode5,
                controls : opt.controls,
                beforeSearch: opt.beforeSearch
            });
        } else {
            init();
        }
    };
})();

