'use strict';

var D = (function() {
	var Param = (function() {
		var i, t, param = {}, arrParam = location.search.replace('?', '').split('&');
		if(location.search) for(i in arrParam) t = arrParam[i].split('='), param[t[0]] = t[1].match(',') ? t[1].split(',') : t[1];

		param.fn = {
			linear : function() {
				var i, p = '?';
				for(i in Param) if(i !== 'fn') p = p+(p !== '?' ? '&' : '')+i+'='+Param[i];
				return p;
			},
			array : function(code) {
				Param[code] = typeof Param[code] === 'string' ? [Param[code]] : Param[code];
			}
		};

		return param;
	})();

	var Cookie = (function() {
		var cookie = {}, init;

		init = function() {
			var i, arrCookie = document.cookie.split(';'), arrTemp;
			for(i=0; i<arrCookie.length; i++) {
				if(arrCookie[i].indexOf('=') > -1) {
					arrTemp = arrCookie[i].replace(' ', '').split('=');
					cookie[arrTemp[0]] = arrTemp[1];
				}
			}
		};

		cookie.fn = {
			set : function(k, v) {
				if(!k || !v) throw new Error('k,v 형태로 입력하세요.');
				document.cookie = k+'='+v;
				init();
			},
			setUpdate : function(k, v) {
				var i, temp;
				if(!k || !v) throw new Error('k,v 형태로 입력하세요.');
				if(!cookie[k]) document.cookie = k+'='+v;
				else {
					temp = cookie[k].split(',');
					for(i=0; i<temp.length; i++) if(temp[i] === v) return false;
					document.cookie = k+'='+cookie[k]+','+v;
				}

				init();
			},
			getArray : function(k) {
				return cookie[k] ? cookie[k].split(',') : [];
			}
		};

		init();

		return cookie;
	})();

	var Bool = function(d) {
		if(typeof d === 'boolean') return d;
		return (d === 'true');
	};

	var	Comma = function(d) {
		if(typeof d === 'number') d = ''+d;
		if(!d) return '-';
		return d.replace(/(\d)(?=(\d\d\d)+$)/g, '$1,'); // 천단위 콤마찍고 리턴
	};
	var UnComma = function(d) {
		return d.replace(/(,)/g, ''); // 천단위 콤마없애고 리턴
	};

	var Zero = function(d) {
		if(typeof d !== 'string' && typeof d !== 'number')throw new Error('zero : string/number 형태의 값만 유효합니다.');
		if(typeof d === 'string') d = Number(d);
		return d > 9 ? d : '0'+d;
	};

	var convertStrDateToObjDate = function(strdate) {
		var d, t, time
		if(!strdate || typeof strdate !== 'string') return new Date(strdate);

		d = strdate.split(' ')[0] ? strdate.split(' ')[0].split(/\D/) : {};
		t = strdate.split(' ')[1] ? strdate.split(' ')[1].split(':') : {};
		time = new Date(d[0] || '', d[1] - 1, d[2] || '', t[0] || '', t[1] || '', t[2] || '');

		return time;
	};

	var DateTime = function(date, format) {
		var time, transformDate;

		if(!date) return '';
		if(date instanceof Date) date = date.getTime(); // new Date()로 넣을 경우 time을 추출해서 작동함
		if(!format) format = 'yyyy.MM.dd';

		transformDate = function(d, f) {
			var weekName = ['일', '월', '화', '수', '목', '금', '토'];
			if (!d.valueOf()) return '';

			return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
				switch ($1) {
					case 'yyyy' : return d.getFullYear();
					case 'yy' : return Zero(d.getFullYear() % 100);
					case 'MM' : return Zero(d.getMonth() + 1);
					case 'dd' : return Zero(d.getDate());
					case 'E' : return weekName[d.getDay()];
					case 'HH' : return Zero(d.getHours());
                    case 'hh' : return Zero(d.getHours() % 12 ? d.getHours() % 12 : 12);
					case 'mm' : return Zero(d.getMinutes());
					case 'ss' : return Zero(d.getSeconds());
					case 'a/p' : return d.getHours() < 12 ? '오전' : '오후';
					default : return $1;
				}
			});
		};

		if(typeof date === 'string') {
			time = convertStrDateToObjDate(date);
        } else if(typeof date === 'number') {
			time = new Date(date);
		} else {
			time = new Date(0);
			time.setFullYear(date.year+1900);
			time.setMonth(date.month); // java는 month가 1부터 시작
			time.setDate(date.date);
			time.setHours(date.hours);
			time.setMinutes(date.minutes);
			time.setSeconds(date.seconds);
		}

		return transformDate(time, format);
	};

    var DateTimeDiff = function(diff) {
        // 날짜 차이 알아 내기 (2년 3개월)
        var oneDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
        var oneMonth = oneDay * 30;// 월 만듬
		var tmp = 0, msg = '';

        if(!diff) return '';

		if(diff/oneMonth>=1) {
			tmp = parseInt(diff/oneMonth);
			if(tmp>12) {
				msg+= (parseInt(tmp/12)+ '년');
				tmp = tmp % 12 -1;
			}

			if(msg!=='') { msg += ' '; }
            if(tmp>=1) msg += (tmp + '개월');
		}

		return msg;
    };

	var Json = (function(d) {
		return JSON.stringify(d);
	});

	var JsonRQ = (function(d) {
		return {_jsonrq : JSON.stringify(d)};
	});

	var Blank = (function(data) {
		return data ? data : '-';
	});

	var UpdateInputName = (function(name, index, depth) {
        var head, i;
		for(i=1; i<depth; i++) name = name.replace('[', '{').replace(']', '}');
        head = name.slice(0, Number(name.search(/[\[]/)) + 1);
        for(i=1; i<depth; i++) head = head.replace('{', '[').replace('}', ']');
        return head+index+(name.slice(Number(name.search(/[\]]/))));
	});

	var Age =(function(birthday) {
		var diff, yearsDiff;
		var today = new Date();
        var oneDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
        var oneMonth = oneDay * 30;// 월 만듬
		var oneYear = oneMonth * 12; //년

        // 날짜 차이 알아 내기 (2년 3개월)
		birthday = new Date(birthday);
		diff = today.getTime() - birthday.getTime();
        yearsDiff = today.getFullYear() - birthday.getFullYear();

		if(!birthday) return '';
        if(diff>0) yearsDiff--;

        return '만 '+parseInt(yearsDiff)+'세('+(parseInt(diff/oneYear)+1)+')';
    });

	// 배열을 특정 코드의 오브젝트로 만들어줌
	var ArrayToObject = function(code, arr) {
		var i, obj = {}, d;

		if(!arr) return null;

		for(i=0; i<arr.length; i++) {
			d = arr[i];
			obj[d[code]] = d;
		}

		return obj;
	};

	// 데이터가 존재하지않으면 ''을 리턴
	var Exists = function(data) {
		return (data && data !== 'undefined' && data !== undefined && data !== null && data !== 'null')? data : '';
	};

	// 파일 밸리데이터
	var FileValid = function(file, data) {
		var size, obj = {}, isAllowSize = false, sizeType = '', isSizeValid = true;

		obj = {
			valid : true,
			type : null,
			msg : ''
		};

		if(!file || file instanceof Object === false) throw new Error('첫번째 파라미터에 검사할 파일객체를 입력하세요.');
		if(!data || data instanceof Object === false) throw new Error('두번째 파라미터에 검사옵션객체를 입력하세요.');

		// 파일용량체크
		if(!data.size) throw new Error('검사할 첨부파일의 허용용량을 입력하세요. : size');

		// 10m, 10M 등 메가 표현식
		if(/^[0-9]*M$/i.test(data.size)) {
			sizeType = 'M';
			isAllowSize = true;
		}

		// 500kb, 500KB 등 킬로바이트 표현식
		if(/^\d{1,3}KB$/i.test(data.size)) {
			sizeType = 'KB';
			isAllowSize = true;
		}

		if(!isAllowSize) throw new Error('메가(10M)나 킬로바이트(500KB)로 허용용량을 입력하세요.');

		size = Number(data.size.replace(sizeType, ''));

		switch(sizeType) {
		case 'M' : if(size * 1024 * 1024 < file.size) isSizeValid = false; break;
		case 'KB' : if(size * 1024 < file.size) isSizeValid = false; break;
		}

		if(!isSizeValid) {
			obj.valid = false;
			obj.type = 'size';
			obj.msg = '파일 첨부용량은 '+size+sizeType+'를 초과할 수 없습니다.';
			return obj;
		}

		return obj;
	};

	// 브라우저 디텍팅
	var Detect = (function() {
		var s, match, isMobile;
		s = navigator.userAgent.toLowerCase();
		match = (/(webkit)[ \/](\w.]+)/).exec(s) || (/(opera)(?:.*version)?[ \/](\w.]+)/).exec(s) || (/(msie) ([\w.]+)/).exec(s) || !(/compatible/).test(s) && (/(mozilla)(?:.*? rv:([\w.]+))?/).exec(s) || [];
		if(navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) { match[1] = 'msie'; match[2] = '11'; }

		isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i).test(s);

		return {
			name: match[1] || '',
			version: match[2] || '0',
			isMobile : isMobile
		};
	})();

	//한글 조사
	var PostPosition = function(value, TYPE) {
		var enumpostPosition, noFinal, lastChar, pp;

		TYPE = String(TYPE);
		enumpostPosition = {
            1 : { useFinal : '이', noneFinal : '가' },
            2 : { useFinal : '을', noneFinal : '를' },
            3 : { useFinal : '은', noneFinal : '는' },
            4 : { useFinal : '에', noneFinal : '에' }
        };

		if(Object.keys(enumpostPosition).indexOf(TYPE) === -1) {
            throw new Error('TYPE 은 1,2,3,4 중 하나로 입력해주세요.');
		}

		if(!value) return '';

		noFinal = '가갸거겨고교구규그기개걔게계과괘궈궤괴귀긔까꺄꺼껴꼬꾜꾸뀨끄끼깨꺠께꼐꽈꽤꿔꿰꾀뀌끠나냐너녀노뇨누뉴느니내냬네녜놔놰눠눼뇌뉘늬다댜더뎌도됴두듀드디대댸데뎨돠돼둬뒈되뒤듸따땨떠뗘또뚀뚜뜌뜨띠때떄떼뗴똬뙈뚸뛔뙤뛰띄라랴러려로료루류르리래럐레례롸뢔뤄뤠뢰뤼릐마먀머며모묘무뮤므미매먜메몌뫄뫠뭐뭬뫼뮈믜바뱌버벼보뵤부뷰브비배뱨베볘봐봬붜붸뵈뷔븨빠뺘뻐뼈뽀뾰뿌쀼쁘삐빼뺴뻬뼤뽜뽸뿨쀄뾔쀠쁴사샤서셔소쇼수슈스시새섀세셰솨쇄숴쉐쇠쉬싀싸쌰써쎠쏘쑈쑤쓔쓰씨쌔썌쎄쎼쏴쐐쒀쒜쐬쒸씌아야어여오요우유으이애얘에예와왜워웨외위의자쟈저져조죠주쥬즈지재쟤제졔좌좨줘줴죄쥐즤짜쨔쩌쪄쪼쬬쭈쮸쯔찌째쨰쩨쪠쫘쫴쭤쮀쬐쮜쯰차챠처쳐초쵸추츄츠치채챼체쳬촤쵀춰췌최취츼카캬커켜코쿄쿠큐크키캐컈케켸콰쾌쿼퀘쾨퀴킈타탸터텨토툐투튜트티태턔테톄톼퇘퉈퉤퇴튀틔파퍄퍼펴포표푸퓨프피패퍠페폐퐈퐤풔풰푀퓌픠하햐허혀호효후휴흐히해햬헤혜화홰훠훼회휘희2459';
        lastChar = value.substring(value.length-1, value.length);
        pp = noFinal.indexOf(lastChar) === -1 ? enumpostPosition[TYPE].useFinal : enumpostPosition[TYPE].noneFinal;

		return pp;
	};

	//입력값이 태그로 인식되는것을 방지
	var HTMLText = function(text) {
		text = text || '';

		text = text.replace(/</g, '〈');
		text = text.replace(/>/g, '〉');

        return text;
	};

	// MRS2CodeDefinition에서 _로 공백처리되는 텍스트를 띄어쓰기로 변환하기 위해 만들었음
	var UnderbarToSapce = function(text) {
		text = text || '';

		text = text.replace(/_/g, ' ');

		return text;
	};

	//한글로 -년 -개월 표시
	var mmyyinKorean = function(data) {
		return (data / 12 >= 1 ? Math.floor(data / 12) + '년 ' : '') + (data % 12 > 0 ? '' + data% 12 + '개월' : data === 0 ? '0개월' : '');
	};

	var FillWithZero = function(num, len) {
		if(!len) throw new Error('0으로 채워진 후 전체 길이를 입력하세요');
		return (Array(len).join('0') + num).slice(-len);
	};

	var remainExistValue = function(obj) {
		var key;
		for(key in obj) {
			if(obj[key] === undefined) delete obj[key];
		}
	};

	var getTextareaRealLength = function(text) {
		// 브라우저 내장 validation에서 maxlength를 인식할때 \n이 들어갔을경우
		// 실제 길이(string의 length)와 브라우저가 측정한 길이가 달라서 맞춰주기 위한 함수
		//IE , Firefox validation에서 \n을 2글자로 인식하는것 같다
		var tmp, currentLength;
		tmp = text.match(/\n/g);
		currentLength =
			(D.detect.name === 'mozilla') ? text.length :
			tmp && tmp.length > 0 ? (tmp.length * 2) + (text.length - tmp.length) : text.length;
		return currentLength;
	};
	
	var numberSign = function(number) { //숫자앞에 부호 붙이기
		if(number > 0) return '+' + number;
		else return number;
	}

	return {
		param : Param,
		cookie : Cookie,
		json : Json,
		jsonrq : JsonRQ,
		bool : Bool,
		date : DateTime,
		dateStrToObj : convertStrDateToObjDate,
		dateDiff : DateTimeDiff,
		comma : Comma,
		unComma : UnComma,
		blank : Blank,
		updateInputName : UpdateInputName,
		age : Age,
		arrToObj : ArrayToObject,
		exist : Exists,
		fileValid : FileValid,
		detect : Detect,
		postPosition : PostPosition,
		htmlText : HTMLText,
		underbarToSpace : UnderbarToSapce,
        MMYYinKOR : mmyyinKorean,
		zero : FillWithZero,
		obj : remainExistValue,
		realLength : getTextareaRealLength,
		number : numberSign
	};
})();