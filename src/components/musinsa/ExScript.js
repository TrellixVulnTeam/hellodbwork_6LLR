//무신사 스토어용 스크립트
var exScriptResult = 0;
var exScriptBaseURI = "https://www.musinsa.com";
var exScriptReading = false;

//JS 동적 로딩
var exScriptAddBrand = function(brand) {
	/*
	if(!confirm("좋아요 설정 시 신제품 발매, 세일소식 등을 문자와 이메일, 무신사 알림을 통해 알려드립니다. 등록하시겠습니까?")) return ;
	*/
	if(exScriptReading) return;
	exScriptReading = true;
	$.ajax({
        url: exScriptBaseURI + '/query.php?version='+Math.random()+'&mode=favoriteBrandInsert&brand='+brand,
        crossDomain: true,
        dataType: "script",
        success: function () {
			exScriptReading = false;
            exScriptAddBrandComplete();
        }
    });
}

var exScriptAddBrandComplete = function(){
	switch(exScriptResult) {
		default:
			alert("서버가 응답하지 않습니다");
		break;
		case 1:
			/*
			alert("좋아요 브랜드로 설정되었습니다");
			*/
			$(".ui-bp-addBrand-btn").addClass("on");
		break;
		case -1:
			alert("로그인 후에 이용하실 수 있습니다");
			window.location = exScriptBaseURI+"/?mod=login&referer="+escape(encodeURIComponent(window.location));
		break;
		case -2:
			alert("해당 브랜드가 존재하지 않습니다");
		break;
		case -3:
			alert("이미 좋아요 설정한 브랜드입니다. 해제는 마이페이지 > 회원정보변경 에서 가능합니다");
		break;
		case -5:
			alert("좋아요 브랜드는 100개까지 추가하실 수 있습니다.");
		break;
	}
}


var exScriptDelBrand = function(brand) {
	/*
	if(!confirm("해당 브랜드의 신제품, 세일 정보 소식을 받아보실 수 없습니다. 좋아요 설정을 해제하시겠습니까?")) return ;
	*/
	if(exScriptReading) return;
	exScriptReading = true;
	$.ajax({
        url: exScriptBaseURI + '/query.php?version='+Math.random()+'&mode=favoriteBrandDelete&brand='+brand,
        crossDomain: true,
        dataType: "script",
        success: function () {
			exScriptReading = false;
            exScriptDelBrandComplete();
        }
    });
}

var exScriptDelBrandComplete = function(){
	switch(exScriptResult) {
		default:
			alert("서버가 응답하지 않습니다");
		break;
		case 1:
			/*
			alert("좋아요 브랜드에서 삭제되었습니다");
			*/
			$(".ui-bp-addBrand-btn").removeClass("on");
		break;
		case -1:
			alert("로그인 후에 이용하실 수 있습니다");
			window.location = exScriptBaseURI+"/?mod=login&referer="+escape(encodeURIComponent(window.location));
		break;
		case -2:
			alert("해당 브랜드가 존재하지 않습니다");
		break;
		case -3:
			alert("좋아요 브랜드가 아니거나 이미 삭제되었습니다.");
		break;
	}
}

$(function() {
	$(document).on("click",".ui-bp-addBrand-btn",function() {
		var _br = $(this).attr("brand");
		if($(this).hasClass("on")) {
			exScriptDelBrand(_br);
		}else {
			exScriptAddBrand(_br);
		}
	});
});