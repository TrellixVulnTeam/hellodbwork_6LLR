function getCookie(name) {
    var nameOfCookie = name + "=";
    var x = 0;
    while (x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0)
            break;
    }
    return "";
}
// CMClog, 리포트2.0 로그분석코드의 weblog.js의 setCookie 함수명이 중복되어 pop_setCookie로 변경
function pop_setCookie(name, value, expirehours, domain)  {
	var today = new Date();
        
	// [#3710] 팝업관리 기능 개선 - '오늘하루그만보기' 기준 변경 검토
//        today.setTime(today.getTime() + (60*60*1000*expirehours));
	var endOfDayDate = new Date(today.getFullYear()
                               						,today.getMonth()
                               						,today.getDate()
                               						,23,59,59); 
        
	today.setTime(endOfDayDate.getTime());
        
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
	if (domain) {
		document.cookie += "domain=" + domain + ";";
	}
}

function pop_setCookie_24(name, value, expirehours, domain)  {
    var today = new Date();
    today.setTime(today.getTime() + (60*60*1000*expirehours));
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
    if (domain) {
        document.cookie += "domain=" + domain + ";";
    }
} 

function pop_close(layerId) {
   
    $("#"+layerId).hide();    
    
    var gLayerHide = true;
    $(".g-layer-sm .layer-sm").each(function() {
    	if( $(this).css("display") != "none" ) {
    		gLayerHide = false;
    	} 
    });
    
    if(gLayerHide){
    	$(".g-layer-sm").hide();
    }
}

//오늘 하루보지 않기 클릭 (신규 팝업 2017-01-07)
//pop_close_today 에서 명칭 변경
function pop_close_today_cookie(layerId) {
	
	pop_setCookie(layerId, "done" , 24);	
	pop_close(layerId);
	
}

/*$(window).on("load", function(){
	$(".checkbox input").off("change").on("change",function(e){
		if($(this).prop("checked")){
			var layerId = $(this).closest(".layer-sm").attr("id");
			pop_close(layerId);
		}
		
		
	});
})*/