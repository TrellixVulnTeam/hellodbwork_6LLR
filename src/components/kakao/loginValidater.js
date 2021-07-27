'use strict';

/**********************************************************************************
* LoginValidater 2016.12.06 김민종
*  - MIDAS IT의 로그인 관련 밸리데이션 함수를 갖고 있는 파일
*  - return 형식의 함수를 지원
*  - 지원함수
*    id			: 아이디 양식에 맞는지 확인 (a-z, 0-9, 4자부터 25자)
*    password	: 비밀번호 (1. 10자리 이상 16자리 이하, 2.특수문자/영어/숫자 중 2가지 이상 조합, 3. 인접키 4자리 이상 연속되는지 확인)
*    rePassword : 비밀번호와 같은지 확인
*    phone		: 전화번호 -가 없는 숫자로 이루어져있는지 확인
*    email		: 이메일 양식에 맞는지 확인
**********************************************************************************/

var LoginValidater = (function() {
	var fn;
	
	fn = {
		id : function(value) {
			var regExp, obj = {};
			regExp = /^[a-z0-9_]{4,25}$/;

			obj.type = 'id'; // 콘솔에서 확인할 수 있게 타입을 명시

			if(value === '' || regExp.test(value)) obj.valid = true;
			else {
				obj.valid = false;
				obj.msg = '아이디를 소문자와 숫자를 포함한 4자~25자로 작성하세요.';
			}

			return obj;
		},
		// 함수 하나에 메세지가 여러 개일 경우 errorCode를 제공함.
		// 기본 제공 에러 메세지가 마음에 들지 않으면 errorCode로 분기해서 메세지를 작성할 것
		// errorCode 종류 
		// 	0 : 8자리 이상 16자리 이하가 아닐 경우
		//  1 : 공백이 존재할 경우
		//	2 : 10자리 이상이면서 특수문자, 영어, 숫자 중 2가지 이상 조합하지 않았을 경우
		//	3 : 3자리 이상 키보드에 인접한 문자일 경우
		//	4 : 3자리 이상 인접한 숫자일 경우
		//	5 : 3자리 이상 인접한 문자일 경우
		//	6 : 3자리 이상 동일한 값(숫자,문자,특수문자 등)이 연속될 경우
		//  7 : 8자리 이상이면서 특수문자, 영어, 숫자 중 3가지 이상 조합하지 않았을 경우
		password : (function() {
			var keyboard, serialNum, serialChar;
			var hasSameChar;
			var tNum, tEng, tEngUpper, tEngLower, tSpe, t, tR, i;
			keyboard = '`12 90-= ~!@#$%^&*()_+ /*- qwertyuiop[] asdfghjkl;\' zxcvbnm,./ QWERTYUIOP{} ASDFGHJKL:" ZXCVBNM<>?';
			serialNum = '01234567890', serialChar = 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			hasSameChar = (function() { // 같은 값이 연속되어 있는지 찾는 함수
				var i, slen, j, t;
				return function(value, sameCharLength) {
					i=value.length-sameCharLength+1;
					while(i--) {
						t=value[i], slen=i+sameCharLength;
						for(j=i+1; j<slen; j++) if(value[j]===t) continue; else break;
						if(j===slen) return true;
					}
					return false;
				};
			})();
			return function(value) { // value는 항상 string이 들어와야 함
				// 결과 초기화
				var obj = {
					type : 'password', // 콘솔에서 확인할 수 있게 타입을 명시
					valid : true
					//errorCode : null,
					//msg : null
				};

				// 아무것도 입력하지 않으면 그냥 넘김
				if(value === '') return obj;

				if(value.length < 8 || value.length > 16) {
					obj.valid = false;
					obj.errorCode = 0;
					obj.msg = '비밀번호를 8자리 이상 16자리 이하로 작성하세요.';
					return obj;
				}

				if(value.search(/₩s/) !== -1) {
					obj.valid = false;
					obj.errorCode = 1;
					obj.msg = '비밀번호를 공백없이 작성하세요.';
					return obj;
				}

				if(value.search(/[\s=\-&<>\'\"\|\?\/]/) !== -1) {
					obj.valid = false;
					obj.msg = '공백, -, &, <, >, \', ", |, ?, /는 사용할 수 없습니다.';
					return obj;
				}

				tNum = value.search(/[0-9]/g) +1;
				tEng = value.search(/[a-z]/gi) +1;
				tSpe = value.search(/[^a-z0-9]/gi) +1;
				tEngLower = value.search(/[a-z]/g) +1;
				tEngUpper = value.search(/[A-Z]/g) +1;

				if(value.length >= 8 && value.length <= 9) {
					if(!((tNum && tSpe && tEngLower) || (tNum && tSpe && tEngUpper) || (tNum && tEngLower && tEngUpper) || (tSpe && tEngLower && tEngUpper))) {
						obj.valid = false;
						obj.errorCode = 7;
						obj.msg = '8자리 이상 9자리 이하 비밀번호는 특수문자, 숫자, 영어 대문자, 영어 소문자 중 3가지 이상을 조합해서 작성하세요.';
						return obj;
					}
				} else {
					if((!tNum && !tEng) || (!tEng && !tSpe) || (!tSpe && !tNum)) {
						obj.valid = false;
						obj.errorCode = 2;
						obj.msg = '10자리 이상 16자리 미만의 비밀번호는 특수문자, 영어, 숫자 중 2가지 이상을 조합해서 작성하세요.';
						return obj;
					}
				}

				for (i=0; i<value.length-2; i++) {
					t=value.substr(i, 3), tR=t.split('').reverse().join(''); // t는 이번에 검사할 3글자, tR은 역순
					if(~keyboard.indexOf(t) || ~keyboard.indexOf(tR)) {
						obj.valid = false;
						obj.errorCode = 3; // 3자리 연속된 키보드 인접문자
						obj.msg = '3자리 이상 연속된 키보드 인접 문자는 비밀번호로 적합하지 않습니다.';
						return obj;
					}
					if(~serialNum.indexOf(t) || ~serialNum.indexOf(tR)) {
						obj.valid = false;
						obj.errorCode = 4; // 3자리 연속된 숫자
						obj.msg = '3자리 이상 연속된 숫자는 비밀번호로 적합하지 않습니다.';
						return obj;
					}
					if(~serialChar.indexOf(t) || ~serialChar.indexOf(tR)) {
						obj.valid = false;
						obj.errorCode = 5; // 3자리 연속된 문자
						obj.msg = '3자리 이상 연속된 문자는 비밀번호로 적합하지 않습니다.';
						return obj;
					}
				}
				if(hasSameChar(value, 3)) {
					obj.valid = false;
					obj.errorCode = 6; // 3자리 이상 동일한 값(숫자,문자,특수문자 등)이 연속될 경우
					obj.msg = '3자리 이상 동일한 숫자 또는 문자는 비밀번호로 적합하지 않습니다.';
					return obj;
				}
				return obj;
			};
		})(),
		rePassword : function(value, password) {
			var obj = {};
			obj.type = 'rePassword'; // 콘솔에서 확인할 수 있게 타입을 명시
			if(value === '' || password === '' || value === password) obj.valid = true;
			else {
				obj.valid = false;
				obj.msg = '비밀번호가 일치하지 않습니다.';
			}

			return obj;
		},
		newPassword : function(value, password) {
			var obj = {};
			obj.type = 'newPassword'; // 콘솔에서 확인할 수 있게 타입을 명시
			if(value === '' || password === '' || value !== password) obj.valid = true;
			else {
				obj.valid = false;
				obj.msg = '기존 비밀번호와 새 비밀번호가 같습니다.';
			}

			return obj;
		},
		phone : function(value) {
			var regExp, obj = {}; 
			regExp = /^[0-9]+$/;
			
			obj.type = 'phone'; // 콘솔에서 확인할 수 있게 타입을 명시

			if(value === '' || regExp.test(value)) obj.valid = true;
			else {
				obj.valid = false;
				obj.msg = '숫자만 입력하세요.';
			}
			
			return obj;
		},
		email : function(value) {
			var regExp, obj = {};
			regExp = /^[-_.0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[-_0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
			
			obj.type = 'email'; // 콘솔에서 확인할 수 있게 타입을 명시
			
			if(value === '' || regExp.test(value)) obj.valid = true;
			else {
				obj.valid = false;
				obj.msg = '이메일 양식에 맞추어 작성하세요.'; 
			}
			
			return obj;
		},
		name : function(value) {
            var regExp, obj = {};
            regExp = (/[~!@\#$%<>^&*\()\-=+_\’]/gi);

            obj.type = 'name'; // 콘솔에서 확인할 수 있게 타입을 명시

            if(value === '' || !regExp.test(value)) obj.valid = true;
            else {
                obj.valid = false;
                obj.msg = '이름에는 특수문자가 포함될 수 없습니다.';
            }

            return obj;
		}
	};
	
	return {
		id : fn.id,
		password : fn.password,
		rePassword : fn.rePassword,
		newPassword : fn.newPassword,
		phone : fn.phone,		
		email : fn.email,
		name : fn.name
	};
})();