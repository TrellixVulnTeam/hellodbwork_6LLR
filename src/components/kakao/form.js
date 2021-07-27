'use strict';

var _Form = function(frm, opt) {
	this.$frm;
	this.set;
	this.data = {};
	opt = opt || {};
	
	this.mordenBrowser = (function() { // IE하위 버전체크 - false : IE9 이하
		if(navigator.userAgent.indexOf('MSIE 7') === -1 && navigator.userAgent.indexOf('MSIE 8') === -1 && navigator.userAgent.indexOf('MSIE 9') === -1) return true; // 모던브라우저
		return false; // IE9 이하
	})();
	
	if(!frm) throw new Error('#을 포함한 연결할 폼의 id를 입력하세요.');
	this.$frm = $(frm);
	if(!this.$frm.size()) throw new Error('연결할 폼이 없습니다.');
	
	// 폼 옵션 설정
	this.set = $.extend({
		placeholder : false
	}, opt);
	
	if(this.set.customAlert && typeof this.set.customAlert !== 'function') throw new Error('customAlert는 function입니다.');
	
	this.event();
};

_Form.prototype.event = function() {
	var $frm = this.$frm, data = this.data, set = this.set, _this = this;

	// 데이터 초기화
	$frm.find('input[name], select[name], textarea[name]').each(function() {
		var name = $(this).attr('name'), type = $(this).attr('type');
		if(name !== undefined && name !== '') data[name] = (type === 'checkbox') ? [] : undefined;
	});

	// 이벤트 바인딩
	$frm.on('change', 'input[type="hidden"]', function(e) { _this.update(e, _this); });
	$frm.on('keypress, blur', 'input[type="text"], input[type="password"], input[type="search"], input[type="number"], input[type="tel"], input[type="email"], textarea', function(e) { _this.update(e, _this); });
	$frm.on('click, blur', 'input[type="radio"], input[type="checkbox"]', function(e) { _this.update(e, _this); });
	$frm.on('change, blur', 'input[type="file"], select', function(e) { _this.update(e, _this); });


	$frm.off('submit').submit(function(e) { _this.submit(e, _this); });
	if(set['submitBtn']) $frm.find(set.submitBtn).click(function(e) { _this.submit(e, _this); });
	this.validater.init(this);
	
	/*
	 * // _Form 초기화
		F = new _Form('#frm', {
				customAlert : Alert,
				submitMethod : fn.submit,
				placeholderOption : {msg:'대한 가이드를 입력해주세요' , type : { useFinal : '에', noneFinal : '에' }}
		}); 이런식으로 쓰면됩니당.
		
		placeholderOption type은 조사입니다
		code.postPosition = {
			type1 : { useFinal : '이', noneFinal : '가' },
			type2 : { useFinal : '을', noneFinal : '를' },
			type3 : { useFinal : '은', noneFinal : '는' },
			type4 : { useFinal : '에', noneFinal : '에' }
		};
	 */
	if(set.placeholderOption) this.autoPlaceholder.init(this, set.placeholderOption);
	
	// IE하위에서 Placeholder 기능 적용
	if(set.placeholder === true && this.mordenBrowser === false) this.bindPlaceholder();
};

_Form.prototype.getData = function() {
	this.$frm.find('input[type="hidden"]').each(function() { $(this).change(); });
	this.$frm.find('input[type="text"], input[type="password"], input[type="search"], input[type="number"], input[type="tel"], input[type="email"], textarea, input[type="radio"], input[type="checkbox"], input[type="file"], select').each(function() { $(this).blur(); });
	return this.data;
};

_Form.prototype.setData = function(name, value) {
	var $input, tagName;
	$input = $('[name="'+name+'"]');
	tagName = $input[0].tagName;

	if(tagName === 'select') this.select(name, value);
	else if(tagName === 'textarea') this.textarea(name, value);
	else { // INPUT
		switch($input.attr('type')) {
			case 'checkbox' : $input.attr('data-f') === 'checkSwitch' ? this.checkSwitch(name, value) : this.checkbox(name, value); break;
			case 'radio' : this.radio(name, value); break;
			default : this.input(name, value);
		}
	}
};

_Form.prototype.input = function(name, value, opt) {
	var $frm = this.$frm, data = this.data;
	value = (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') ? value : '';
	$frm.find('input[name="'+name+'"]').val(value).blur();
	data[name] = value;
	this.setValidater(name, opt);
};

_Form.prototype.file = function(name, opt) {
	if(!opt || !(opt instanceof Object)) throw new Error('file은 value값을 넣지 않습니다. 두번째 파라미터에 옵션객체를 넣어주세요.');
	if(!opt['accept']) throw new Error('file은 accept옵션이 필수값입니다.');
	this.setValidater(name, opt);
	this.setFileAccept(name, opt);
};

_Form.prototype.checkbox = function(name, value, opt) {
	var i, $frm = this.$frm, data = this.data, $target;
	value = (value instanceof Array) ? value : (typeof value === 'string') ? value.split(',') : [];
	$frm.find('input:checkbox[name="'+name+'"]:checked').each(function() { $(this).click(); }); // 전부 해제
	for(i=0; i<value.length; i++) {
		$target = $frm.find('input:checkbox[name="'+name+'"][value="'+value[i].toString()+'"]');
		if($target.size() && !$target.prop('checked')) $target.click();
	}
	data[name] = value;
	this.setValidater(name, opt);
};

_Form.prototype.radio = function(name, value, opt) {
	var $frm = this.$frm, data = this.data, $target;
	value = (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') ? value : '';
	$target = $frm.find('input:radio[name="'+name+'"][value="'+value.toString()+'"]');
	if($target.size() && !$target.prop('checked')) $target.click();
	data[name] = value;
	this.setValidater(name, opt);
};

_Form.prototype.select = function(name, value, opt) {
	var $frm = this.$frm, data = this.data;
	value = (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') ? value : '';
	$frm.find('select[name="'+name+'"]>option[value="'+value+'"]').prop('selected', true).change();
	data[name] = value;
	this.setValidater(name, opt);
};

_Form.prototype.checkSwitch = function(name, value, opt) {
	var $frm = this.$frm, data = this.data;
	value = (value === 'true' || value === true);
	$frm.find('input:checkbox[name="'+name+'"]').prop('checked', value).attr('data-f', 'checkSwitch').change();

	data[name] = value;
	this.setValidater(name, opt);
};

_Form.prototype.textarea = function(name, value, opt) {
	var $frm = this.$frm, data = this.data;
	value = (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') ? value : '';
	$frm.find('textarea[name="'+name+'"]').val(value);
	data[name] = value;
	this.setValidater(name, opt);
};

_Form.prototype.setValidater = function(name, opt) {
	var $frm = this.$frm;
	if(opt instanceof Object) {
		$frm.find('input[name="'+name+'"], select[name="'+name+'"], textarea[name="'+name+'"]').each(function() {
			if(opt['title']) $(this).attr('title', opt.title);
			if(opt['valid']) $(this).attr('data-valid', opt.valid);
			// 소숫점 자리수 적용
			if(opt['valid'] && opt['valid'].indexOf('number-only') > -1 && Number(opt['decimalLength']) > 0) {
				$(this).attr('data-decimal-length', opt['decimalLength']);
			}
			if(opt['valid'] && opt['valid'].indexOf('blank') > -1) {
				$(this).prop('required', true);
			}
			if(opt['maxlength']) $(this).attr('maxlength', opt.maxlength);
			if(opt['nextTarget']) {
				if(!opt['valid'] || opt['valid'].indexOf('int-only') <= -1) throw new Error(name+' : nextTarget 옵션은 valid : int-only 설정이 필수입니다.');
				if(!opt['maxlength']) throw new Error(name+' : nextTarget 옵션은 maxlength 설정이 필수입니다.');
				$(this).attr('data-nextTarget', opt.nextTarget);
			}
		});
	}
};

_Form.prototype.setFileAccept = function(name, opt) {
	var $frm = this.$frm, i, j, acceptData, arrType, arrAcceptType = [];

    // accept attribute 정리
    acceptData = {
        audio : ['audio/*'],
        compress : ['.egg', 'application/zip'],
        document : [
			'.hwp',
			'text/plain',
			'application/rtf',
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/vnd.ms-powerpoint',
			'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
			'application/vnd.openxmlformats-officedocument.presentationml.presentation'
		],
        excel : ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        image : ['image/*'],
        movie : ['video/*'],
        pdf : ['application/pdf']
	};

	// 멀티옵션일 수 있기 때문에 옵션을 분리해서 배열화한다.
	arrType = opt['accept'].split(',');

	for(i=0; i<arrType.length; i++) {
		arrType[i] = arrType[i].trim();
		for(j in acceptData) {
			if(arrType[i] === j) arrAcceptType.push(acceptData[j].join());
		}
	}

	// 잘못된 옵션 처리
	if(!arrAcceptType.length) throw new Error('입력한 accept옵션 중 적용할 수 있는 옵션이 하나도 없습니다. 올바르게 입력하세요.\n예) audio, compress, document, excel, image, movie, pdf');
	else if(arrAcceptType.length !== arrType.length) throw new Error('입력한 accept옵션 '+arrType.length+'개 중 '+arrAcceptType.length+'개가 적용되었습니다. 올바르지 않은 옵션을 수정하세요.\n예) audio, compress, document, excel, image, movie, pdf');
	
	// input[type="file"]에 accept attribute적용
	$frm.find('input[type="file"][name="'+name+'"]').attr('accept', arrAcceptType.join());
};

_Form.prototype.update = function(e, _this) {
	var $frm = _this.$frm, data = _this.data;
	var type = $(e.target).attr('type'), name = $(e.target).attr('name'), t = [], value;
	if(!name) return false;
	switch(type) {
	case 'checkbox' :
		if($(e.target).attr('data-f') === 'checkSwitch') {
			data[name] = $(e.target).prop('checked');
		} else {
			$frm.find('input[name="'+name+'"]:checked').each(function() {
				t.push($(this).val());
			});
			data[name] = t;
		}
		break;
	case 'file' :
		data[name] = $frm.find('input[name="'+name+'"]')[0].files[0];
		break;
	case 'radio' :
		data[name] = $frm.find('input[name="'+name+'"]:checked').val();
		break;
	default :
		value = $(e.target).prop('disabled') ? '' : $(e.target).val();
		if(value === 'true' || value === 'false') value = (value === 'true'); // true나 false일 경우 Boolean으로 변경
		data[name] = value;
		break;
	}
};

_Form.prototype.submit = function(e, _this) {
	var set = this.set;
	e.preventDefault();
	if(_this.validater.errorCheck()) return false;
	set.submitMethod(e);
};

_Form.prototype.bindPlaceholder = function() {
	// IE하위버전에서 Placeholder 기능 적용
	var arrPlaceholder = new Array();
	$('input[placeholder]').each(function(index) { // 로딩시 초기화
		var value = $(this).val();
		var text = $(this).attr('placeholder');
		arrPlaceholder[index] = text;
		$(this).attr('data-index', index);
		if(!value) { // value가 없을 경우에 적용
			$(this).val(text).addClass('placeholder');
		}
	}).focus(function() { // 포커싱
		var index = $(this).attr('data-index');
		var value = $(this).val();
		if(value === arrPlaceholder[index]) {
			$(this).val('').removeClass('placeholder');
		}
	}).blur(function() { // 포커싱 아웃
		var index = $(this).attr('data-index');
		var value = $(this).val();
		if(value === '') {
			$(this).val(arrPlaceholder[index]).addClass('placeholder');
		}
	});
};

_Form.prototype.remove_ = function(d) { // name 앞에 _가 붙은 데이터를 삭제함
	var i;
	for(i in d) if(i.charAt(0) === '_') delete d[i];
	return d;
};

_Form.prototype.autoPlaceholder = (function() {
	var fn, $frm;

	fn = {
		init : function(_this, obj) {
			var title, pp, size, text, lastChar, noFinal;
			$frm = _this.$frm;
			noFinal = '가갸거겨고교구규그기개걔게계과괘궈궤괴귀긔까꺄꺼껴꼬꾜꾸뀨끄끼깨꺠께꼐꽈꽤꿔꿰꾀뀌끠나냐너녀노뇨누뉴느니내냬네녜놔놰눠눼뇌뉘늬다댜더뎌도됴두듀드디대댸데뎨돠돼둬뒈되뒤듸따땨떠뗘또뚀뚜뜌뜨띠때떄떼뗴똬뙈뚸뛔뙤뛰띄라랴러려로료루류르리래럐레례롸뢔뤄뤠뢰뤼릐마먀머며모묘무뮤므미매먜메몌뫄뫠뭐뭬뫼뮈믜바뱌버벼보뵤부뷰브비배뱨베볘봐봬붜붸뵈뷔븨빠뺘뻐뼈뽀뾰뿌쀼쁘삐빼뺴뻬뼤뽜뽸뿨쀄뾔쀠쁴사샤서셔소쇼수슈스시새섀세셰솨쇄숴쉐쇠쉬싀싸쌰써쎠쏘쑈쑤쓔쓰씨쌔썌쎄쎼쏴쐐쒀쒜쐬쒸씌아야어여오요우유으이애얘에예와왜워웨외위의자쟈저져조죠주쥬즈지재쟤제졔좌좨줘줴죄쥐즤짜쨔쩌쪄쪼쬬쭈쮸쯔찌째쨰쩨쪠쫘쫴쭤쮀쬐쮜쯰차챠처쳐초쵸추츄츠치채챼체쳬촤쵀춰췌최취츼카캬커켜코쿄쿠큐크키캐컈케켸콰쾌쿼퀘쾨퀴킈타탸터텨토툐투튜트티태턔테톄톼퇘퉈퉤퇴튀틔파퍄퍼펴포표푸퓨프피패퍠페폐퐈퐤풔풰푀퓌픠하햐허혀호효후휴흐히해햬헤혜화홰훠훼회휘희2459';

			$.each($frm.find('input[type=text],textarea'), function() {
				title = $(this).attr('title');
				lastChar = title.substring(title.length-1, title.length);
				pp = noFinal.indexOf(lastChar) === -1 ? obj.type.useFinal : obj.type.noneFinal;
				size = $(this).attr('size')?$(this).attr('size'):'';
				text = title+pp+' '+size+obj.msg;
				if(!$(this).attr('placeholder')) $(this).attr('placeholder', text);
			});
		}
	};

	return {
		init : fn.init
	};
})();

_Form.prototype.validater = (function() {
	var fn, code = {}, $frm, set, mordenBrowser;

	code.postPosition = {
		type1 : { useFinal : '이', noneFinal : '가' },
		type2 : { useFinal : '을', noneFinal : '를' },
		type3 : { useFinal : '은', noneFinal : '는' },
		type4 : { useFinal : '에', noneFinal : '에' }
	};

	code.msgGroup = {
		// 메세지
		plzInput : { msg : '입력하세요.', type : code.postPosition.type2 },
		plzSelect : { msg : '선택하세요.', type : code.postPosition.type2	},
		plzNumberOnly : { msg : '숫자만 입력하세요.', type : code.postPosition.type3 },
		plzCheck : { msg: '체크하세요.', type : code.postPosition.type2 }
	};

	code.keyCode = {
		// 자주 사용하는 키코드
		enter : 13, del : 46, home : 36, end : 35, backSpace : 8, leftCtrl : 17, tab : 9, shift : 16,
		a : 65, b : 66, c : 67, d : 68, e : 69, f : 70, g : 71, h : 72, i : 73, j : 74, k : 75, l : 76, m : 77,
		n : 78, o : 79, p : 80, q : 81, r : 82, s : 83, t : 84, u : 85, v : 86, w : 87, x : 88, y : 89, z : 90,
		zero : 48, one : 49, two : 50, three : 51, four : 52, five : 53, six : 54, seven : 55, eight : 56, nine : 57,
		dot : 190, keypadZero : 96, keypadOne : 97, keypadTwo : 98, keypadThree : 99, keypadFour : 100,
		keypadFive : 101, keypadSix : 102, keypadSeven : 103, keypadEight : 104, keypadNine : 105, keypadDot : 110,
		arrowLeft : 37, arrowTop : 38, arrowRight : 39, arrowBottom : 40
	};

	code.defaultEnableKeyCode = [
		// 키보드 제어를 해도 풀어놓을 키 저장배열
		code.keyCode.tab, code.keyCode.shift, code.keyCode.backSpace, code.keyCode.del, code.keyCode.home,
		code.keyCode.end, code.keyCode.arrowLeft, code.keyCode.arrowRight, code.keyCode.dot, code.keyCode.keypadDot
	];

	code.intEnableKeyCode = [
		// 정수입력 옵션일 경우해도 풀어놓을 키 저장배열
		code.keyCode.tab, code.keyCode.shift, code.keyCode.backSpace, code.keyCode.del,
		code.keyCode.home, code.keyCode.end, code.keyCode.arrowLeft, code.keyCode.arrowRight
	];

	fn = {
		init : function(_this) {
			$frm = _this.$frm, set = _this.set, mordenBrowser = _this.mordenBrowser;
			fn.bindPreSubmitEvent(); // 입력과정에 필요한 이벤트 바인딩
		},
		bindPreSubmitEvent : function() {
			// Submit하기 이전에 필요한 이벤트 바인딩
			fn.bindNumberOnly();
			fn.bindIntOnly();
		},
		bindNumberOnly : function() {
			// 키보드 사용시 숫자와 소수점만 입력
			$frm.on('keydown', 'input[data-valid~="number-only"]', function(e) {
				var isDot, isCheck, decimalSize, pattern, value, p = [], i, cursorPosition;
				isDot = e.which===code.keyCode.dot || e.which===code.keyCode.keypadDot;
				isCheck = fn.checkDefaultKeyCode(e.which);

				if(isDot && (this.value==='' || this.value.indexOf('.')>=0)) return false;
				if(isCheck) return true;
				if(!((e.which >= code.keyCode.zero && e.which <= code.keyCode.nine) || (e.which >= code.keyCode.keypadZero && e.which <= code.keyCode.keypadNine))) return false;

				// 숫자키가 맞으면 커서 위치에 넣어도 되는지 정규식 만들어서 판단
				decimalSize = Number($(this).attr('data-decimal-length')) || 1; // 기본값은 소숫점 1자리

				p.push('^\\d+(?:[.]');
				for(i=1; i<=decimalSize; i++) p.push('?[\\d]'); // 소숫점만큼 생성
				p.push(')?$');
				pattern = new RegExp(p.join(''));

				cursorPosition = this.selectionStart;
				value = (this.value.substring(0, cursorPosition) + e.key + this.value.substring(cursorPosition));
				return pattern.test(value);
			});
		},
		bindIntOnly : function() {
			// 키보드 사용시 정수만 입력
			$frm.on('keydown', 'input[data-valid~="int-only"]', function(e) {
				var pattern = /^[0-9]+$/, cursorPosition, value;
				if(fn.checkIntKeyCode(e.which)) return true;
				if(!((e.which >= code.keyCode.zero && e.which <= code.keyCode.nine) || (e.which >= code.keyCode.keypadZero && e.which <= code.keyCode.keypadNine))) return false;
				cursorPosition = this.selectionStart;
				value = (this.value.substring(0, cursorPosition) + e.key + this.value.substring(cursorPosition));
				return pattern.test(value);
			});
			
			// maxlength에 도달하면 다음 타겟으로 커서 이동
			$frm.on('keyup', 'input[data-nextTarget]', function(e) {
				var isCheck, nextTarget =$(this).attr('data-nextTarget');
				isCheck = fn.checkDefaultKeyCode(e.which);
				if(isCheck) return true;
				if(!nextTarget) throw new Error('nextTarget값이 설정되지 않았습니다.');
				if(this.value.length === Number($(this).attr('maxlength'))) $frm.find('input[name="'+nextTarget+'"]').focus();
			});
		},
		checkDefaultKeyCode : function(eventKey) {
			var i;
			// 기본키 검사
			for(i in code.defaultEnableKeyCode) if(eventKey === code.defaultEnableKeyCode[i]) return true;
			return false;
		},
		checkIntKeyCode : function(eventKey) {
			var i;
			// 정수입력키 검사
			for(i in code.intEnableKeyCode) if(eventKey === code.intEnableKeyCode[i]) return true;
			return false;
		},
		submitEvent : function() {
			// Submit 버튼 클릭 후 발생하는 이벤트
			var error = false;

			$frm.find('[data-valid]').each(function(index) {
				var valid, arrType, i;
				valid = $(this).attr('data-valid'),
				arrType = valid.replace(' ', '').split(',');

				for(i in arrType) {
					error = fn.checkValidation(this, arrType[i]);
					if(error) return false; // 에러가 있으면 중단하고 리턴
				}
			});

			return error;
		},
		checkValidation : function(_this, type) {
			var error = false, disabled, name;
			name = $(_this).attr('name');
			
			// disabled면 무시하기 위해 체크
			// 라디오나 체크박스일 경우는 disabled 다르게 체크
			if($(_this).attr('data-valid') === 'checked' && $frm.find('input[name="'+name+'"]').size() === $frm.find('input[name="'+name+'"]:disabled').size()) disabled = true;
			else disabled = $(_this).prop('disabled');

			if(disabled) return false;
			
			switch (type) {
				case 'blank' : error = fn.validBlank(_this); break;
				case 'number-only' : error = fn.validNumberOnly(_this); break;
				case 'int-only' : error = fn.validIntOnly(_this); break;
				case 'selected' : error = fn.validSelected(_this); break;
				case 'checked' : error = fn.validChecked(_this); break;
			}

			return error;
		},
		validBlank : function(_this) {
			// 입력했는지를 체크
			var error, value, placeholder, option, isDisabled = false;
			error = false;
			value = $.trim($(_this).val());
			placeholder = $(_this).attr('placeholder');

			if($(_this).prop('disabled') || ($(_this).closest('fieldset').size() && $(_this).closest('fieldset').prop('disabled'))) {
				isDisabled = true;
			}

			// 검사
			if(!isDisabled && (!value || (set.placeholder === true && mordenBrowser === false && placeholder !== '' && placeholder === value))) {
				option = {
					target : _this,
					obj : code.msgGroup.plzInput
				};
				fn.alertMsg(_this, option);
				error = true;
			}
			return error;
		},
		validNumberOnly : function(_this) {
			// 숫자와 소수점만 입력했는지를 체크
			var error, value, isNumberOnly, option;
			error = false;
			value = $(_this).val();
			isNumberOnly = (/[^\d.]/g).test(value); // 숫자와 소수점을 제외한 내용이 있는지 체크
			if(isNumberOnly) {
				option = {
					target : _this,
					obj : code.msgGroup.plzNumberOnly
				};
				fn.alertMsg(_this, option);
				error = true;
			}
			return error;
		},
		validIntOnly : function(_this) {
			// 정수만 입력했는지를 체크
			var error, value, isIntOnly, option;
			error = false;
			value = $(_this).val();
			isIntOnly = (/[^\d]/g).test(value); // 정수가 아닌 내용이 있는지 체크
			if(isIntOnly) {
				option = {
					target : _this,
					obj : code.msgGroup.plzNumberOnly
				};
				fn.alertMsg(_this, option);
				error = true;
			}
			return error;	
		},
		validSelected : function(_this) {
			// 셀렉트 선택 체크 확인
			var error, value, option, isDisabled = false;
			error = false;
			value = $(_this).val();

			if($(_this).prop('disabled') || ($(_this).closest('fieldset').size() && $(_this).closest('fieldset').prop('disabled'))) {
				isDisabled = true;
			}

			if(!isDisabled && !value) {
				option = {
					target : _this,
					obj : code.msgGroup.plzSelect
				};
				fn.alertMsg(_this, option);
				error = true;
			}
			return error;
		},
		validChecked : function(_this) {
			// 라디오&체크박스 체크 확인
			var error, name, option, isDisabled = false;
			error = false;
			name = $(_this).attr('name');

			if($(_this).prop('disabled') || ($(_this).closest('fieldset').size() && $(_this).closest('fieldset').prop('disabled'))) {
				isDisabled = true;
			}

			if(!isDisabled && !$frm.find('input[name="'+name+'"]:checked').size()) {
				option = {
					target : _this,
					obj : code.msgGroup.plzCheck
				};
				fn.alertMsg(_this, option);
				error = true;
			}
			return error;
		},
		alertMsg : function(_this, option) {
			// alert메시징
			var title, pp, size, text, lastChar, noFinal;
			noFinal = '가갸거겨고교구규그기개걔게계과괘궈궤괴귀긔까꺄꺼껴꼬꾜꾸뀨끄끼깨꺠께꼐꽈꽤꿔꿰꾀뀌끠나냐너녀노뇨누뉴느니내냬네녜놔놰눠눼뇌뉘늬다댜더뎌도됴두듀드디대댸데뎨돠돼둬뒈되뒤듸따땨떠뗘또뚀뚜뜌뜨띠때떄떼뗴똬뙈뚸뛔뙤뛰띄라랴러려로료루류르리래럐레례롸뢔뤄뤠뢰뤼릐마먀머며모묘무뮤므미매먜메몌뫄뫠뭐뭬뫼뮈믜바뱌버벼보뵤부뷰브비배뱨베볘봐봬붜붸뵈뷔븨빠뺘뻐뼈뽀뾰뿌쀼쁘삐빼뺴뻬뼤뽜뽸뿨쀄뾔쀠쁴사샤서셔소쇼수슈스시새섀세셰솨쇄숴쉐쇠쉬싀싸쌰써쎠쏘쑈쑤쓔쓰씨쌔썌쎄쎼쏴쐐쒀쒜쐬쒸씌아야어여오요우유으이애얘에예와왜워웨외위의자쟈저져조죠주쥬즈지재쟤제졔좌좨줘줴죄쥐즤짜쨔쩌쪄쪼쬬쭈쮸쯔찌째쨰쩨쪠쫘쫴쭤쮀쬐쮜쯰차챠처쳐초쵸추츄츠치채챼체쳬촤쵀춰췌최취츼카캬커켜코쿄쿠큐크키캐컈케켸콰쾌쿼퀘쾨퀴킈타탸터텨토툐투튜트티태턔테톄톼퇘퉈퉤퇴튀틔파퍄퍼펴포표푸퓨프피패퍠페폐퐈퐤풔풰푀퓌픠하햐허혀호효후휴흐히해햬헤혜화홰훠훼회휘희2459';				
			title = $(option.target).attr('title');
			lastChar = title.substring(title.length-1, title.length);
			pp = noFinal.indexOf(lastChar) === -1 ? option.obj.type.useFinal : option.obj.type.noneFinal;
			size = option.size?option.size:'';
			text = title+pp+' '+size+option.obj.msg;
			if(typeof set.customAlert !== 'function') {
				alert(text);
				$(_this).focus();
				fn.updateScrollTop();
			} else {
				set.customAlert(text, function() {
					$(_this).focus();
					fn.updateScrollTop();
				});
			}
		},
		updateScrollTop : function() {
			var scrollTop = $(window).scrollTop();
			$(window).scrollTop(scrollTop - 100 > 0 ? scrollTop - 100 : 0);
		}
	};
	
	return {
		init : fn.init,
		errorCheck : fn.submitEvent
	};
})();