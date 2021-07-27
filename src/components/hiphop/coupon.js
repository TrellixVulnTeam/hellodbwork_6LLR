/*
 이벤트 페이지 쿠폰 다운로드 
 *
*/
function hhpCoupon(coupon, data){
		var acp = document.getElementById(coupon);
		acp.addEventListener('click',function(){
			cp_ajax(data);
		});
}

function hhpCouponItem(couponId, it_id){
			cp_ajax_item(couponId, it_id);
}

function cp_ajax(data) {
		 var oReq = new XMLHttpRequest();
		 oReq.addEventListener("load", function() {
		 	 var rt = this.responseText;
			 if(rt == '로그인'){
				 alert('로그인 후 이용해주세요.');
				 var cURL = window.location.href;
				 cURL = cURL.replace("renewal1", "www");
				 location.href="http://www.hiphoper.com/maz/login.php?url="+encodeURI(cURL);
			 }else if(rt == '발급횟수초과'){
				 alert('발급횟수가 초과된 쿠폰입니다.');
			 }else if(rt == '존재하지않는쿠폰번호'){
				 alert('존재하지 않는 쿠폰 번호입니다.');
			 }else if(rt == '이미발급받은쿠폰'){
				 alert('1회만 발급 가능합니다.');
			 }else if(rt == '5회'){
				 alert('5회까지만 발급 가능합니다.');
			 }else if(rt == '다운기간'){
				 alert('쿠폰 다운로드 기간이 아닙니다.');
			 }else if(rt == '성공'){
				 alert('쿠폰을 다운로드하였습니다.');
			 }
		 });    
		 oReq.open("GET",  window.location.protocol + "//" + window.location.host + "/shop/hhp_getCoupon.php?co_id="+data);
		 oReq.send();
}

function cp_ajax_item(data, it_id) {
		 var oReq = new XMLHttpRequest();
		 oReq.addEventListener("load", function() {
		 	 var rt = this.responseText;
			 if(rt == '로그인'){
				 alert('로그인 후 이용해주세요.');
				 var cURL = window.location.href;
				 cURL = cURL.replace("renewal1", "www");
				 location.href="http://www.hiphoper.com/maz/login.php?url="+encodeURI(cURL);
			 }else if(rt == '발급횟수초과'){
				 alert('발급횟수가 초과된 쿠폰입니다.');
			 }else if(rt == '존재하지않는쿠폰번호'){
				 alert('존재하지 않는 쿠폰 번호입니다.');
			 }else if(rt == '이미발급받은쿠폰'){
				 alert('소유한 쿠폰 적용시 금액을 미리 확인합니다.');
			 }else if(rt == '다운기간'){
				 alert('쿠폰 다운로드 기간이 아닙니다.');
			 }else if(rt == '성공'){
				 alert('쿠폰을 다운로드하였습니다. \n소유한 쿠폰 적용시 금액을 미리 확인합니다.');
			 }
		 });    
		 oReq.open("GET",  window.location.protocol + "//" + window.location.host + "/shop/hhp_getCouponItem.php?co_id="+data+"&it_id="+it_id);
		 oReq.send();
}