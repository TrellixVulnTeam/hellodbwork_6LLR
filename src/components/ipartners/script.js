
	$(function(){
		

		$("#aa").hide();
		$("input[name=rnew]").click(function() {
			var radioValue = $(this).val();
			if(radioValue == '2'){
				$("#aa").show();
			}else {
				$("#aa").hide();
			}
		});

		$("input:radio[name=bumun]").click(function() {
			var rValue = $(this).val();
			if(rValue == '1'){
				$("#tmp").text("기획자 입사지원");
			} else if(rValue == '2'){
				$("#tmp").text("온라인 마케터 입사지원");
			} else if(rValue == '3'){
				$("#tmp").text("컨설턴트/영업 입사지원");
			} else if(rValue == '4'){
				$("#tmp").text("디자이너 입사지원");
			} else if(rValue == '5'){
				$("#tmp").text("퍼블리셔/스크립터 입사지원");
			} else if(rValue == '6'){
				$("#tmp").text("개발자 입사지원");
			} 
		});

		//$('form.jqtransform').jqTransform();

	});

	function Recruit_Chk(){
		var f = document.RecruitFrm;

		var count_answer = 0;
		var count_answer1 = 0;
		var count_answer2 = 0;

		for(var j=0;j<f.bumun.length;j++) { 
			if (f.bumun[j].checked == true) {
			count_answer += 1;
			}
		}
		if(count_answer == 0) { 
			alert("지원부문을 선택해 주세요");
			return;          
		}

		for(var z=0;z<f.cGbn.length; z++) { 
			if (f.cGbn[z].checked == true) {
			count_answer2 += 1;
			}
		}
		if(count_answer2 == 0) { 
			alert("구분을 선택해 주세요");
			return;          
		}	

		if(f.r_name.value == ""){
			alert("이름을 입력해 주십시오.");
			f.r_name.focus();
			return;
		}

		for(var k=0;k<f.rnew.length; k++) { 
			if (f.rnew[k].checked == true) {
			count_answer1 += 1;
			}
		}

		if(count_answer1 == 0) { 
			alert("경력여부를 선택해 주세요");
			return;          
		} else {
			if(f.rnew[1].checked == true){
				if(f.ryear.value == ""){
					alert("경력 년도를 입력해 주십시오.");
					f.ryear.focus();
					return;
				}
				if (!isNumeric(f.ryear.value)) {
					alert('숫자만 사용가능 합니다.');
					f.year.focus();
					return;
				}
				if(f.rmonth.value == ""){
					alert("경력 월을 입력해 주십시오.");
					f.month.focus();
					return;
				} 
				if (!isNumeric(f.rmonth.value)) {
					alert('숫자만 사용가능 합니다.');
					f.rmonth.focus();
					return;
				}
			}
		}
	      
	      if(f.salary.value == ""){
			alert("희망연봉을 입력해 주십시오.");
			f.salary.focus();
			return;
		}  

		if(f.email1.value == "" || f.email2.value == ""){
			alert("이메일을 입력해 주십시오.");
			f.email1.focus();
			return;
		}

		f.email.value = f.email1.value+"@"+f.email2.value;
		if (email_chk(f.email.value) == false) {
			alert('올바른 E-mail 주소가 아닙니다.');
			f.email.focus();
			return;
		}	

		if(f.mobile1.value == "" || f.mobile2.value == "" || f.mobile3.value == ""){
			alert("핸드폰번호를 입력해 주십시오.");
			f.mobile1.focus();
			return;
		}
		
		if (!isNumeric(f.mobile1.value)) {
			alert('숫자만 사용가능 합니다.');
			f.mobile1.focus();
			return;
		}
		if (!isNumeric(f.mobile2.value)) {
			alert('숫자만 사용가능 합니다.');
			f.mobile2.focus();
			return;
		}
		if (!isNumeric(f.mobile3.value)) {
			alert('숫자만 사용가능 합니다.');
			f.mobile3.focus();
			return;
		}
			
		if(f.filename2.value == ""){
			alert("입사지원서를 등록해 주십시오.");
			return;
		}

		if (f.filename2.value != ""){
			//filesize("upload");
			if (limitAttach(document.RecruitFrm, document.RecruitFrm.filename2.value)==false) {
				alert("죄송합니다.\n\n업로드가 지원되는 파일형식은 " + (extArray.join("  ")) + " 입니다." + "\n\n파일형식을 확인해보시기 바랍니다.");
				return;
			}
	  	}
	   
		if (f.filename3.value != ""){
			//filesize("attachments");
			/*if (limitAttach(document.RecruitFrm, document.RecruitFrm.filename3.value)==false) {
				alert("죄송합니다.\n\n업로드가 지원되는 파일형식은 " + (extArray.join("  ")) + " 입니다." + "\n\n파일형식을 확인해보시기 바랍니다.");
				return;
			}*/
		}

		document.RecruitFrm.action = "recruit_proc.asp"
		document.RecruitFrm.submit();   
	}
	
	function filesize(val) {
		var size = 0;
		var browser=navigator.appName;

		if (browser=="Microsoft Internet Explorer") {
			var oas = new ActiveXObject("Scripting.FileSystemObject");
			var filepath = document.getElementById(val).value;
			var e = oas.getFile(filepath);
		 	size = e.size;
		} else {
			var node = document.getElementById(val);
			size = node.files[0].size;
		}	

		var mSize = 0;
		var msg = "";
		if (val = "upload"){
			mSize = 3145728;
			msg = "3";
		} else {
			mSize = 10485760;
			msg = "10";
		}
		 
		if(size > mSize) {
			alert("첨부 파일은 최대 크기는 "+msg+"Mb를 넘길 수 없습니다.");
		}
	}

	extArray = new Array(".pdf", ".zip", ".doc", ".ppt", ".pptx", ".docx", ".dot", ".dotx");
	
	function limitAttach(form, file) {
		allowSubmit = false;
		if (!file) return;
		while (file.indexOf("\\") != -1)
			file = file.slice(file.indexOf("\\") + 1);
			ext = file.slice(file.indexOf(".")).toLowerCase();
		for (var i = 0; i < extArray.length; i++) {
			if (extArray[i] == ext)	{
				allowSubmit = true; break;
			}
		}
		return allowSubmit;
	}
	
	function isNumeric(obj) {
		var str = obj;
		for(var i=0; i < str.length; i++) {
			if (!('0' <= str.charAt(i) && str.charAt(i) <= '9')) {
				return false;
			}
		}
		return true;
	}
	
	function email_chk(str) {
		var t = str;
		var ValidFlag = false;
		var atCount = 0;
		var SpecialFlag;
		var atLoop;
		var atChr;
		var BadFlag;
		var tAry1;
		var UserName;
		var DomainName;

		if ( t.length > 0 && t.indexOf("@") > 0 && t.indexOf(".") > 0 ) {
			atCount = 0;
			SpecialFlag = false;

			for( atLoop=1; atLoop<=t.length; atLoop++ ) {
				atChr = t.substring( atLoop, atLoop+1 );
				if ( atChr == "@" ) atCount = atCount + 1;
				if ( (atChr >= 32) && (atChr <= 44) ) SpecialFlag = true;
				if ( (atChr == 47) || (atChr == 96) || (atChr >= 123) ) SpecialFlag = true;
				if ( (atChr >= 58) && (atChr <= 63) ) SpecialFlag = true;
				if ( (atChr >= 91) && (atChr <= 94) ) SpecialFlag = true;
		      }

			if ( ( atCount == 1 ) && (SpecialFlag == false ) ) {
				BadFlag = false;
				tAry1 = t.split("@");
				UserName = tAry1[0];
				DomainName = tAry1[1];
				if ( (UserName.length <= 0 ) || (DomainName.length <= 0 ) ) BadFlag = true;
				if ( DomainName.substring( 1, 2 ) == "." ) BadFlag = true;
				if ( DomainName.substring( DomainName.length-1, DomainName.length) == "." ) BadFlag = true;
				ValidFlag = true;
			}
		}
		
		if ( BadFlag == true ) ValidFlag = false
			return ValidFlag;
	}	

	function emailSelect(val){
		if(val=="직접입력"){
			document.RecruitFrm.email2.value = "";	
			document.RecruitFrm.email2.readOnly = false;
			document.RecruitFrm.email2.focus();
		} else{
			document.RecruitFrm.email2.value = "";	
			document.RecruitFrm.email2.readOnly = true;
			document.RecruitFrm.email2.value = val;	
		}
	}
