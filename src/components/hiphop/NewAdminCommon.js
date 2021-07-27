var setDatepicker = function(fromObj,toObj){
		var dateFormat = "yy-mm-dd",
			from = $(fromObj).datepicker({
				changeMonth:true,
				changeYear:true,
				numberOfMonths:1,
				dateFormat:"yy-mm-dd",
				altFormat: "yy-mm-dd",
				showOn:"button",
				buttonImage:"../img/btn_datepicker.png",
				buttonImageOnly:true,
				buttonText:"시작 날짜 선택",
				currentText:'오늘',
				showButtonPanel:true
			}).on( "change", function() {
				to.datepicker( "option", "minDate", getDate( this ) );
			}),
			to = $(toObj).datepicker({
				changeMonth:true,
				changeYear:true,
				numberOfMonths:1,
				dateFormat:"yy-mm-dd",
				altFormat: "yy-mm-dd",
				showOn:"button",
				buttonImage:"../img/btn_datepicker.png",
				buttonImageOnly:true,
				buttonText:"종료 날짜 선택",
				currentText:'오늘',
				showButtonPanel:true
			}).on( "change", function() {
				from.datepicker( "option", "maxDate", getDate( this ) );
			}),
			btnFrom = $(fromObj).closest('.input_datas').find('.btn_showcal.from'),
			btnTo = $(toObj).closest('.input_datas').find('.btn_showcal.to');
		btnFrom.on('click',function(e){
			$(this).prev('.ui-datepicker-trigger').trigger('click');
		});
		btnTo.on('click',function(e){
			$(this).prev('.ui-datepicker-trigger').trigger('click');
		});
		function getDate( element ) {
			var date;
			try {
				date = $.datepicker.parseDate( dateFormat, element.value );
			} catch( error ) {
				date = null;
			}
			return date;
		}
	},
	setDatepickerSingle = function(obj){
		$(obj).datepicker({
			changeMonth:true,
			changeYear:true,
			numberOfMonths:1,
			dateFormat:"yy-mm-dd",
			altFormat: "yy-mm-dd",
			showOn:"button",
			buttonImage:"../img/btn_datepicker.png",
			buttonImageOnly:true,
			buttonText:"날짜 선택",
			currentText:'오늘',
			showButtonPanel:true
		});
		var btn = $(obj).closest('.input_datas').find('.btn_showcal');
		btn.on('click',function(e){
			$(this).prev('.ui-datepicker-trigger').trigger('click');
		});
	},
	countdownFn = function(obj,value){
		$(obj).countdown(value, function(event) {
			$(this).val(event.strftime('%D 일 %H시간 %M분 %S초'));
		});
	},
	setDateTimepicker = function(fromObj,toObj,fromTime,toTime){
		var dateFormat = "yy-mm-dd",
			stepMinute = 5,
			from = $(fromObj).datetimepicker({
				changeMonth:true,
				changeYear:true,
				numberOfMonths:1,
				dateFormat:dateFormat,
				altFormat:dateFormat,
				showOn:"button",
				buttonImage:"../img/btn_datepicker.png",
				buttonImageOnly:true,
				buttonText:"시작 날짜 선택",
				currentText:'지금',
				closeText:'닫기',
				timeText:'시간',
				hourText:'시',
				minuteText:'분',
				showButtonPanel:true,
				altField:fromTime,
				controlType:'select',
				oneLine:true,
				stepMinute:stepMinute,
				timeFormat:'hh:mm tt',
				onClose:function(e){
					var date = $(this).val().split('-'),
						time = $(fromTime).val().split(':'),
						y = date[0],
						m = date[1]-1,
						d = date[2],
						h = time[0],
						M = time[1],
						minDate = new Date(y, m, d),
						minTime = h+':'+M;
					to.datetimepicker( "option", "minDate", minDate );
					to.datetimepicker( "option", "minTime", minTime );
					if( $('input[data-type=countdown]')[0] ){
						var a = M.indexOf('pm')>0?h*1+12:h*1,
							finalDate = y+'/'+date[1]+'/'+d+' '+a+':'+(M.split(' ')[0]*1)+':'+'00';
						countdownFn('input[data-type=countdown]',finalDate);
					}
				}
			}),
			to = $(toObj).datetimepicker({
				changeMonth:true,
				changeYear:true,
				numberOfMonths:1,
				dateFormat:dateFormat,
				altFormat:dateFormat,
				showOn:"button",
				buttonImage:"../img/btn_datepicker.png",
				buttonImageOnly:true,
				buttonText:"종료 날짜 선택",
				currentText:'지금',
				closeText:'닫기',
				timeText:'시간',
				hourText:'시',
				minuteText:'분',
				showButtonPanel:true,
				altField:toTime,
				controlType:'select',
				oneLine:true,
				stepMinute:stepMinute,
				timeFormat:'hh:mm tt',
				onClose:function(e){
					var date = $(this).val().split('-'),
						time = $(toTime).val().split(':'),
						y = date[0],
						m = date[1],
						d = date[2],
						h = time[0],
						M = time[1],
						maxDate = new Date(y, m, d),
						maxTime = h+':'+M;
					from.datetimepicker( "option", "maxDate", maxDate );
					from.datetimepicker( "option", "maxTime", maxTime );
				}
			}),
			btnFrom = $(fromObj).closest('.input_datas').find('.btn_showcal.from'),
			btnTo = $(toObj).closest('.input_datas').find('.btn_showcal.to');
		btnFrom.on('click',function(e){
			$(this).closest('.input_datas').find('.ui-datepicker-trigger').trigger('click');
		});
		btnTo.on('click',function(e){
			$(this).closest('.input_datas').find('.ui-datepicker-trigger').trigger('click');
		});
	},
	showLayer = function(tar,re){
		var $this = $(tar);
		$this.removeClass('hide').find('.btn_close').focus();
		if($(re).is('button') || $(re).is('a')){
			$this.data('return',$(re));
		}
	},
	hideLayer = function(tar){
		var $this = $(tar);
		$this.addClass('hide');
		if(!!$this.data('return')){
			$($this.data('return')).focus();
		}
	},
	showTableOption = function(tar){
		showLayer(tar);
		var t = $(tar).closest('.wrap_table'),
			a = t.offset().top+t.height(),
			b = $(tar).offset().top+$(tar).height();
		if(a < b){
			var c = a-b-10;
			$(tar).css('top',c);
		}
	},
	hideTableOption = function(tar){
		hideLayer(tar);
		$(tar).removeAttr('style');
	},
	inputFileFn = function(obj){
		var $tar = obj.closest('.input_section'),
			input = $tar.find('.txt_path'),
			preview = $tar.find('.preview');
		input.val(obj[0].files[0].name);
		if(!$tar.next('.input_section')[0]){
			$tar.find('button.hide').removeClass('hide');
		}
		if(obj[0].files[0].type.indexOf('image') >= 0){
			var reader = new FileReader();
			reader.readAsDataURL(obj[0].files[0]);
			reader.onload = function(e) {
				var img = e.target.result,
					setClick = function(){
						preview.removeAttr('disabled').on('click',function(e){
							var newTab = window.open();
							newTab.document.body.innerHTML = '<img src="'+img+'" alt="썸네일 이미지 미리보기" />'
						})
					};
				//data-limit
				preview.find('img').removeClass('hide').attr('src',img);
				setClick();
				/*if( obj.is('[data-limit]') ){
					var w = obj.attr('data-limit').split(',')[0]*1,
						h = obj.attr('data-limit').split(',')[1]*1,
						nw = preview.find('img')[0].naturalWidth,
						nh = preview.find('img')[0].naturalHeight;
					if(w!=nw || h!=nh){
						alert('권장사이즈(가로:'+w+'px / 세로:'+h+'px)를 확인해주세요.');
						inputFileResetFn(obj);
					}
				}*/
			};
		}else{
			$tar.find('button.preview').addClass('hide');
		}
	},
	inputFileResetFn = function(obj){
		var tar = obj.closest('.input_section');
		tar.find('input[type="file"]').val("");
		tar.find('.txt_path').val("");
		if(tar.find('button[data-type="fileview"]').length>0){
			tar.find('.btn_del').addClass('hide');
		}else{
			tar.find('.preview').attr('disabled',true).find('img').attr('src',"").addClass('hide');
		}
	},
	autolineFn = function(obj){
		obj.height(1).height(obj[0].scrollHeight-20);
	},
	negoPieFn = function(obj,callback){
		if(!$(obj)[0].checkValidity() || $(obj)[0].value === ''){
			$(obj)[0].reportValidity();
		}else{
			callback();
		}
	},
	discountRate = function(obj){
		var tar = $('#inputSalePie'),
			v = obj.value,
			v2 = 0;
		if(v > 0 && v <= 30){
			v2 = 27
		}else if(v > 30 && v <= 50){
			v2 = 25
		}else if(v > 51){
			v2 = 18
		}
		tar.val(v2);
	},
	brandAdd = function(obj){
		hideLayer('#brandSearch',obj);
		showLayer('#brandSearch',obj);
		var $this = $(obj);
		$('#brandSearch').css({
			left:$this.closest('.input_brands').position().left+209,
			top:$this.closest('.input_brands').position().top+40
		});	
	},
	addCommas = function(x){
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	removeCommas = function(x){
		if(!x || x.length == 0) return "";
		else return x.split(",").join("");
	},
	couponSet = function(val){
		var $this = $('select[data-type="couponChange"]');
		$this.val(val).prop('selected',true).trigger('change');

	}
	couponChange = function(val,type){
		var $this = $('select[data-type="couponChange"]'),
			tar = $this.closest('tbody');
		tar.find('.only').addClass('hide').end().find('.'+val).removeClass('hide');
	},
	addCodeFn = function(obj){
		var $this = obj.closest('button'),
			source = $this.attr('data-source'),
			target = $this.attr('data-target'),
			wrap = $this.attr('data-wrap'),
			addCode = window[source],
			$wrap = $this.closest('[data-addwrap="'+wrap+'"]').length>0?$this.closest('[data-addwrap="'+wrap+'"]'):$('[data-addwrap="'+wrap+'"]'),
			//$tar = $this.closest('[data-addtarget="'+target+'"]');
			$tar = $wrap.find('[data-addtarget="'+target+'"]').last();
		$wrap.find('button[data-type="add"]').each(function(e){
			if($(this).attr('data-source') == source){
				$(this).addClass('hide');
			}
		});
		$(addCode).attr('data-addtarget',target).find('[disabled]').removeAttr('disabled').end()
		.find('.btn_add').each(function(e){
			if(!$(this).is('[data-source]')){
				$(this).attr({
					'data-source':source,
					'data-target':target,
					'data-wrap':wrap
				}).next('.btn_del').attr({
					'data-target':target,
					'data-wrap':wrap
				});
				if($this.attr('data-callback')){
					$(this).attr({
						'data-callback':$this.attr('data-callback')
					})
				}
			}
		}).end()
		.find('.preview').attr('disabled','disabled').end()
		/*.find('input[type=file]').each(function(e){
			var t = $wrap.find('[data-addtarget='+target+']').eq(0).find('input[type=file]');
			if(t.is('[data-limit]')){
				$(this).attr('data-limit',t.attr('data-limit'))
			}
		}).end()*/
		.insertAfter($tar);
		if($this.attr('data-callback')){
			var cb = $this.attr('data-callback');
			window[cb].call($tar.next()[0]);
		}

	},
	removeCodeFn = function(obj){
		var $this = obj,
			target = $this.attr('data-target'),
			wrap = $this.attr('data-wrap'),
			$wrap = $this.closest('[data-addwrap="'+wrap+'"]').length>0?$this.closest('[data-addwrap="'+wrap+'"]'):$('[data-addwrap="'+wrap+'"]'),
			//$tar = $this.closest('[data-addtarget="'+target+'"]');
			$tar = $wrap.find('[data-addtarget="'+target+'"]').last();
		if( $this.is('[data-deltype=checkbox]') ){//체크박스 체크
			if($tar.find('.input_check').hasClass('hide')){
				$tar.remove();
			}else{
				var a = 0;
				$wrap.find('input[type=checkbox]').each(function(i,el){
					if($(el).is(':checked')){
						if( $wrap.find('[data-addtarget="'+target+'"]').length==1 ){
							alert('최소 하나의 연락망은 있어야 합니다.');
						}else{
							$(el).closest('[data-addtarget="'+target+'"]').remove();
							a++
						}
					}
				});
				if(a==0){
					alert('삭제 하실 항목을 하나 이상 선택하세요.')
				}
			}
		}else{
			$tar.remove();
		}
		var length = $wrap.find('[data-addtarget="'+target+'"]').length;
		$wrap.find('[data-addtarget="'+target+'"]').eq(length-1).find('.btn_add[data-target="'+target+'"]').removeClass('hide');
		if($this.attr('data-callback')){
			var cb = $this.attr('data-callback');
			window[cb].call($tar.next()[0]);
		}
	};
$(document).ready(function(){
	$.datepicker.setDefaults( $.datepicker.regional["ko"]);
	if($('[data-type="countdown"]')[0] && $('[data-type="countdown"]').is('[data-value]')){
		countdownFn('[data-type="countdown"]',$('[data-type="countdown"]').attr('data-value'))
	}
	$(window).on({
		change:function(e){
			var $this = $(e.target);
			if( $this.is('input[type=file]') && $this.closest('span').hasClass('input_file') ){
				inputFileFn($this);
			}
			if( $this.is('input[type=checkbox]') && $this.closest('.input_check').next('span').hasClass('input_select') ){
				var tar = $this.closest('.input_check').next('.input_select');
				if( $this.is(':checked') ){
					tar.removeClass('disabled').find('select').attr('disabled',false);
				}else{
					tar.addClass('disabled').find('select').attr('disabled',true);
					tar.find('select')[0].selectedIndex = 0;
				}
			}
			if( $this.is('select') && $this.is('[data-type="couponChange"]') ){
				couponChange($this.val(),'1')
			}
			if( $this.is('input[type=text]') && $this.is('[data-type="colorPicker"]') ){
				$('div[data-type="barPreview"]').css('background-color',$this.val());
			}
			if( $this.is('input[type=radio]') ){
				if( $this.closest('.flex_type12').is('[data-addwrap="brandWrap"]') ){
					var wrap = $this.closest('.flex_type12');
						tar = $this.closest('.input_section');
					if( $this.closest('.input_radio').index()==1 ){
						wrap.find('.input_brands').each(function(i,el){
							$(el).find('input[type=radio]').removeAttr('disabled').closest('.input_radio').removeClass('disabled');
							if(i != wrap.find('.input_brands').index($this.closest('.input_brands'))){
								$(el).find('input[type=radio]').each(function(i,el) {
									if(i == 0){
										$(el).prop('checked',false);
									}else{
										$(el).prop('checked',true);
									}
								});
							}else{
								$(el).find('input[type=radio]').eq(1).prop('disabled',true).closest('.input_radio').addClass('disabled');;
							}
						})
					}
				}
				if( $this.is('[data-type="changePreview"]') ){
					$('div[data-type="barPreview"]').css('color',$this.val());
				}
				if( $this.is('[data-type="checkTr"]') ){
					var tar = $this.closest('tr').find('td');
					if($this.val()==1){
						tar.find('input,button').prop('disabled',false);
					}else{
						tar.find('input,button').prop('disabled',true);
					}
				}
			}
		},
		click:function(e){
			var $this = $(e.target);
			if( $this.closest('button').is('[data-type="add"]') ){//코드 추가 버튼
				addCodeFn($this);			
			}
			if( $this.closest('button').is('[data-type="del"]') ){//코드 삭제 버튼
				removeCodeFn($this);
			}
			if( $this.closest('button').is('[data-type="filereset"]') ){//섬네일 파일 삭제
				inputFileResetFn($this);
			}
			if( $this.closest('button').is('[data-type="tableinput"]') ){//테이블 인풋 수정
				var t = $this.text();
				if(t=='수정'){
					$this.text('확인').closest('tr').find('.input_check').addClass('hide').end().find('input[type!=checkbox]').prop('readonly',false).eq(0).focus()
				}
				if(t=='확인'){
					var c = 0,
						l = $this.closest('tr').find('input[type!=checkbox]').length;
					$this.closest('tr').find('input[type!=checkbox]').prop('required',true).each(function(i,el){
						if(!$(el)[0].checkValidity() || $(el)[0].value === ''){
							$(el)[0].reportValidity();
						}else{
							c++
						}
						if(c == l){
							$this.text('수정').closest('tr').find('input[type!=checkbox]').prop('readonly',true).end().find('.input_check').removeClass('hide');
						}
					})
				}
			}
		},
		keyup:function(e){
			var $this = $(e.target);
			if($this.is('textarea[data-type="autoheight"]')){
				autolineFn($this)
			}
			if($this.is('input[type=text][data-type=unit]')){
				$this.val($this.val().replace(/[^0-9]/g,""));
			}
			if( $this.is('input[type=text][data-type="changePreview"]') ){
				$('div[data-type="barPreview"]').text($this.val());
			}
		},
		keydown:function(e){
			var $this = $(e.target);
			if($this.is('textarea[data-type="autoheight"]')){
				autolineFn($this)
			}
		},
		focus:function(e){
			var $this = $(e.target);
			if($this.is('input[type=text][data-type=unit]')){
				var x = $this.val();
				x = removeCommas(x);
				$this.val(x);
			}
		},
		focusin:function(e){
			var $this = $(e.target);
			if( $this.is('input[type=password]') && $this.is('[data-type=changePassType]') ){
				$this.attr('type','text')
			}
		},
		focusout:function(e){
			var $this = $(e.target);
			if( $this.is('input[type=text]') && $this.is('[data-type=changePassType]') ){
				$this.attr('type','password')
			}
			if($this.is('input[type=text][data-type=unit]')){
				var x = $this.val();
				if(x && x.length > 0) {
					if(!$.isNumeric(x)) {
						x = x.replace(/[^0-9]/g,"");
					}
					x = addCommas(x);
					$this.val(x);
				}
			}
		}
	})
});





















