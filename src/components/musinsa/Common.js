String.prototype.URLEncode = function URLEncode() {

	var s0, i, s, u, str;
	s0 = ""; // encoded str
	str = this; // src
	for (i = 0; i < str.length; i++) { // scan the source
		s = str.charAt(i);
		u = str.charCodeAt(i); // get unicode of the char
		if (s == " "){s0 += "+";} // SP should be converted to "+"
		else {
			if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f
			|| ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a))
			|| ((u >= 0x61) && (u <= 0x7a))) { // check for escape
				s0 = s0 + s; // don't escape
			} else { // escape
				if ((u >= 0x0) && (u <= 0x7f)){ // single byte format
					s = "0"+u.toString(16);
					s0 += "%"+ s.substr(s.length-2);
				} else if (u > 0x1fffff){ // quaternary byte format (extended)
					s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
					s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
					s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				} else if (u > 0x7ff) { // triple byte format
					s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
					s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				} else { // double byte format
					s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				}
			}
		}
	}
	return s0;
};

/*
	Funcion : addfavorites
	즐겨찾기 추가 함수

	Parameters:

	See Also:

*/
function addfavorites(title, url)
{
	if (window.sidebar) {									// firefox
		window.sidebar.addPanel(title, url, "");
	} else if( document.all ) {								// ie
		window.external.AddFavorite(url, title);
	} else if(window.opera && window.print) {			// opera
		var elem = document.createElement('a');
		elem.setAttribute('href', url);
		elem.setAttribute('title', title);
		elem.setAttribute('rel', 'sidebar');
		elem.click();
	}else if (navigator.appName=="Netscape") {		//safari
		alert("확인을 클릭하신 후 주소창에서 <Ctrl-D>를 누르시면 즐겨찾기에 등록됩니다.");
	}
}

/*
	Funcion : layerView
	레이어 박스 출력

	Parameters:
		obj		- 객체
		id		- 출력할 layer id명
		top 	- layer top 위치
		left	- layer left 위치

	See Also:
		<layerHidden>
*/
function layerView(obj, id) {
	var div_id = "order_delivery_pop";
	var data = $("#" + id).html();

	$("#" + div_id).html(data);

	$("#" + div_id).jqm();
	$("#" + div_id).jqmShow();

	return false;
}

/*
	Funcion : layerHidden
	레이어 박스 닫기

	Parameters:
		id		- 닫을 layer id명

	See Also:
		<layerHidden>
*/
function layerHidden(id) {
	var div_id = "order_delivery_pop";

	$("#" + id).hide();
	$("#" + div_id).jqmHide();
}

/*
	Funcion : layerRemove
	레이어 박스 제거

	Parameters:
		id		- 제거할 layer id명

	See Also:
		<layerHidden>
*/
function layerRemove(id) {

	$("#" + id).remove();
}

/*
	Funcion : mouseOver
	mouseover 시 변환된 이미지 리턴

	Parameters:
		obj	- 이미지 변환할 객체

	See Also:
		<mouseOut>, <reverseSrc>
*/
function mouseOver(obj) {

	obj.src = reverseSrc(obj.src, true);
	return obj.src;
}

/*
	Funcion : mouseOut
	mouseout 시 변환된 이미지 리턴

	Parameters:
		obj	- 이미지 변환할 객체

	See Also:
		<layerHidden>, <reverseSrc>
*/
function mouseOut(obj) {

	obj.src = reverseSrc(obj.src, false);
	return obj.src;
}

/*
	Funcion : reverseSrc
	이미지 변환

	Parameters:
		src		- 변환 시킬 이미지 소스
		flag	- 변환 여부

	See Also:
		<mouseOver>, <mouseOut>
*/
function reverseSrc(src, flag) {

	var url = src;
	var tmp_arr = url.split("/");
	var file_name = tmp_arr[tmp_arr.length-1];
	var set_name = null;
	if ( flag )
	{
		re = /(_on\.)/gi;
		if ( re.test(file_name) )
		{
			set_name = file_name;
		}
		else
		{
			set_name = file_name.replace(/\_off/i, "_on");
		}
	}
	else
	{
		set_name = file_name.replace(/\_on/i, "_off");
	}
	return url.replace(file_name, set_name);
}

/*
	Funcion : onMouseOverCategory
	마우스 오버 시 카테고리 출력

	Parameters:
		oMenu	- 카테고리 객체
		category_id - 출력할 카테고리 레이어의 id

	See Also:

*/
function onMouseOverCategory(oMenu, category_id) {

	var osub = document.getElementById(category_id);

//	osub.innerHTML = "";
	osub.style.display = "block";
}

/*
	Funcion : onMouseOutCategory
	카테고리 숨김

	Parameters:
		category_id - 숨길 카테고리 레이어의 id

	See Also:

*/
function onMouseOutCategory(category_id) {
	document.getElementById(category_id).style.display = "none";
}

/*
	Funcion : onMouseOverCategory
	마우스 오버 시 하위 카테고리 출력

	Parameters:
		oMenu		- 카테고리 객체
		category_id - 출력할 카테고리 레이어의 id
		oTable 		- 상위 카테고리가 있는 영역
		top 		- 상위 카테고리의 top
	See Also:

*/
function onMouseOverCategory2(oMenu, oTable, category_id, top) {

	var osub = document.getElementById(category_id);
	var otb = document.getElementById(oTable);

	osub.style.top =  (27*top) - 10;
	osub.style.left =  140;
	osub.style.display = "block";
}

/*
	Funcion : allView
	전체보기

	Parameters:
		classid - 추가적으로 나타낼 레이어 박스 class명

	See Also:
		<layerHidden>
*/
function allView(classid) {

	var ff = document.getElementById("view");
	if ( ff.allview.value == "N" || ff.allview.value == "" ) {
		ff.allview.value = "Y"
		$("." + classid).show();
	}
	else {
		ff.allview.value = "N"
		$("." + classid).hide();
	}
}

/*
	Funcion : send
	상품 리스트 정렬 함수

	Parameters:
		sort		- 정렬할 조건

	See Also:

*/
function send(sort) {

	var ff = document.f1;
	ff.sort.value = sort;
	ff.page.value = 1;

	var brand = ff.brand.value;
	var list_kind = ff.list_kind.value;
	var display_cnt = ff.display_cnt.value;
	var free_dlv = ff.free_dlv.value;
	var sale_goods = ff.sale_goods.value;
    var u_cat_cd = ff.u_cat_cd.value;


	ff.method = "get";
	ff.action = ff.action + "?brand=" + brand + "&list_kind=" + list_kind + "&sort=" + sort + "&display_cnt=" + display_cnt + "&free_dlv=" + free_dlv + "&sale_goods=" + sale_goods +"&u_cat_cd" + u_cat_cd ;

	ff.submit();
}

/*
	Funcion : opacity
	투명도를 조절하는 함수

	Parameters:
		s	- 투명도를 적용할 영역
		val - 투명도 값

	See Also:

*/
function opacity(s, val) {

	if ( navigator.appName.indexOf("Explorer") != -1 ) {
		s.style.filter="Alpha(opacity=" + val + ")";
	} else {
		s.style.opacity= val/100;
	}
}

/*
	Funcion : listSwatch
	상품 리스트 변환 함수

	Parameters:
		d_cat_cd		- 전시 카테고리 코드
		list_kind		- 리스트 종류
		pint_area		- 리스트 출력 영역
		sort			- 리스트 정렬 조건
		display_cnt		- 리스트 상품 출력 수
		brand			- 브랜드
	See Also:

*/
function listSwitch(form, list_kind) {

	form.list_kind.value = list_kind;

	for ( var i = 0 ; i < $(".goods_list_kind img[name='list_img']").length ; i++ )
	{
		var src = $(".goods_list_kind img[name='list_img']:eq(" + i + ")").attr("src");
		$(".goods_list_kind img[name='list_img']:eq(" + i + ")").attr("src", mouseOutImage(src));
	}

	if (list_kind == 'detail')
	{
		src = $(".goods_list_kind img[name='list_img']:eq(0)").attr("src");
		$(".goods_list_kind img[name='list_img']:eq(0)").attr("src", mouseOverImage(src));
	}
	else if (list_kind == 'small')
	{
		src = $(".goods_list_kind img[name='list_img']:eq(1)").attr("src");
		$(".goods_list_kind img[name='list_img']:eq(1)").attr("src", mouseOverImage(src));
	}
	else if (list_kind == 'big')
	{
		src = $(".goods_list_kind img[name='list_img']:eq(2)").attr("src");
		$(".goods_list_kind img[name='list_img']:eq(2)").attr("src", mouseOverImage(src));
	}

	var service_url = "/app/util/listSwitch";
	var param = formData2QueryString(form);

	$.ajax({
		type: "POST",
		url: service_url,
		data : param,
		success: function(msg)
		{
			document.getElementById('goods_list').innerHTML = msg;
		}
	});
	return false;
}

/*
	Funcion : listSwitchPage
	상품 리스트 페이지 변환 함수

	Parameters:
		d_cat_cd		- 전시 카테고리 코드
		pint_area		- 리스트 출력 영역
		sort			- 리스트 정렬 조건
		display_cnt		- 리스트 상품 출력 수
		brand			- 브랜드
	See Also:

*/
function listSwitchPage(form, page) {

	var list_kind = form.list_kind.value;
	form.page.value = page;

	var param = decodeURI(formData2QueryString(form));

	var url = form.action + "?" + param;

	document.location.href = url;
}

/*
	Funcion : mouseOverImage
	이미지 변환(이미지 파일명 끝에 _ov 붙임)

	Parameters:
		src		- 변환 시킬 이미지 소스

	See Also:
		<mouseOverImage>, <imageView>
*/
function mouseOverImage(src) {

	return src.replace(/_off\.gif/, '_on.gif');
}

/*
	Funcion : mouseOutImage
	이미지 변환(이미지 파일명 끝에 _on 제거)

	Parameters:
		src		- 변환 시킬 이미지 소스

	See Also:
		<mouseOverImage>, <imageView>
*/
function mouseOutImage(src) {

	return src.replace(/_on\.gif/, '_off.gif');
}

/*
	Funcion : viewSize
	사이즈 보기

	Parameters:
		obj			- 해당상품 객체
		goods_no	- 해당상품 번호
		goods_sub	- 해당상품 하위번호

	See Also:
	<getUnixTime>
*/
function viewSize(obj, goods_no, goods_sub) {

	$("div.size_view").empty();

	$.ajax({
		type: "GET",
		url: "/app/svc/optionList/" + goods_no + "/" + goods_sub + "?" + getUnixTime(),
		success: function(msg){
			$(obj).append(msg);
		}
	});

	$(obj).hover(
		function(){},
		function()
		{
			$("div.size_view").empty();
		}
	);
	return;
}

/*
	Funcion : viewOption
	옵션 보기

	Parameters:
		div_id			- 옵션 출력 영역 id
		goods_no	- 해당상품 번호
		goods_sub	- 해당상품 하위번호

	See Also:
	<getUnixTime>
*/
function viewOption(div_id, goods_no, goods_sub) {
	if($("#" + div_id).css("display") == "none"){
		$.ajax({
			type: "GET",
			url: "/app/svc/optionList/" + goods_no + "/" + goods_sub + "?" + getUnixTime(),
			success: function(msg){
				$("#" + div_id).html(msg);
			}
		});
	}
}

/*
	Funcion : viewOption
	옵션 보기

	Parameters:
		div_id			- 옵션 출력 영역 id
		goods_no	- 해당상품 번호
		goods_sub	- 해당상품 하위번호

	See Also:
	<getUnixTime>
*/
function viewOption2(div_id, goods_no, goods_sub) {
	$.ajax({
		type: "GET",
		url: "/app/svc/optionList/" + goods_no + "/" + goods_sub + "?" + getUnixTime(),
		success: function(msg){
			$("#" + div_id).html(msg);
		}
	});
	if($("#" + div_id).css('display') == 'block'){
		$("#" + div_id).css('display','none');
		$("#" + div_id).siblings('.option_btn').children().text('OPTION ▼');
	}
	else{
		$("#" + div_id).css('display','block');
		$("#" + div_id).siblings('.option_btn').children().text('OPTION ▲');
	}
}

/*
	Funcion : viewMemberPrice
	회원가격 보기

	Parameters:
		obj			- 해당상품 객체
		price		- 해당상품 판매가격

	See Also:
	<getUnixTime>
*/
function viewMemberPrice(obj, price, limited_dc, goods_point, coupon_price) {

	$("div.member_price").remove();
	if(limited_dc == ""){
		limited_dc = "N";
	}
	$.ajax({
		type: "GET",
		url: "/app/svc/member_price/" + price + "/" + limited_dc + "/" + goods_point + "/" + coupon_price + "?" + getUnixTime(),
		success: function(msg){
			$(obj).append(msg);
		}
	});

	$(obj).hover(
		function(){},
		function()
		{
			$("div.member_price").remove();
		}
	);
	return;
}

/*
	Funcion : viewMemberPrice2
	회원가격 보기

	Parameters:
		obj			- 해당상품 객체
		price		- 해당상품 판매가격

	See Also:
	<getUnixTime>
*/
function viewMemberPrice2(div_id, goods_no, goods_sub)
{
	if($("#" + div_id + "> ul > li").length == 1) {
		$.ajax({
			type: "GET",
			url: "/app/svc/member_price_new/" + goods_no + "/" + goods_sub + "?type=detail" + "&" + getUnixTime(),
			success: function(msg){
				$("#" + div_id).append(msg);
			}
		});
	}
	$("#" + div_id).toggle();
}


/*
	Funcion : getUnixTime
	현재 시간 데이터 얻기

	Parameters:

	See Also:
*/
function getUnixTime() {

	var d = new Date();
	return d.getTime();
}

/*
	Funcion : loginChk
	로그인 여부 확인

	Parameters:

	See Also:
*/
function loginChk() {

	var result = "0";

	$.ajax({
		type: "GET",
		async: false,
		url: "/app/member/login_check",
		success: function(msg){
			eval("var json = " + msg);
			result = json.result;
		}
	});

	if ( result == "1")
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*
	Funcion : gdscroll
	scroll 위치 이동(위, 아래)

	Parameters:
		gap - 이동 픽셀 ( + : 위, - : 아래 )

	See Also:
*/
function gdscroll(gap)
{
	var gdscroll = document.getElementById('gdscroll');
	gdscroll.scrollTop += gap;
}

/*
	Funcion : shoppingScroll
	쇼핑카트 페이징
	Parameters:

	See Also:
*/

function shoppingScroll(id, gap, page_id, page, page_limit){

	var shoppingscroll = document.getElementById(id);
	shoppingscroll.scrollTop += gap;

	$page_id = $("#" + page_id);
	$page = parseInt($page_id.html());

	if($page == page_limit){
	}else{
		$page += page;
		$page_id.html($page);
	}
}

/*
	Funcion : couponDown
	쿠폰 다운

	Parameters:
		url 		- 현재 url
		goods_no 	- 상품번호
		goods_sub	- 상품 하위번호

	See Also:
*/
function couponDown(url, goods_no, goods_sub) {

	var div_id = "coupon_down_pop";
	var http_host = location.host;

	var target_url = encodeURIComponent("http://" + http_host + url);
	var service_url = "/app/contents/coupon_down/" + goods_no + "/" + goods_sub;

	if ( !loginChk() )
	{
		alert("다시 로그인하여 주십시오.");
		document.location.href = "/app/member/login?target_url=" + target_url;
		return false;
	}

	if ( $("#" + div_id).length == 0 )
	{
		$("<div id='" + div_id + "'></div>").appendTo("body");
	}

	$.ajax({
		type: "GET",
		url: service_url,
		success: function(msg){
			$("#" + div_id).html(msg);

			// 레이어 위치 처리
			var top = Math.max(0, (($(window).height() - $("#coupon_down_l").outerHeight()) / 2) + $(window).scrollTop()) + "px";
			$("#coupon_down_l").css("top", top);

			// 레이어 위치 처리
			var top = Math.max(0, (($(window).height() - $("#down_ok").outerHeight()) / 2) + $(window).scrollTop()) + "px";
			$("#down_ok").css("top", top);
		}
	});

	$("#" + div_id).jqm();
	//$("#" + div_id).jqm({modal:true});
	$("#" + div_id).jqmShow();

	return false;

}

/*
	Funcion : viewBaesongInfo
	배송정보 레이어 출력

	Parameters:
		obj 	- 해당객체
		div_id	- 배송정보 레이어 박스 id명

	See Also:
*/
function viewBaesongInfo(obj, div_id, top, left) {

	var offset = $(obj).offset();
	$("#" + div_id).css("top",offset.top + top);
	$("#" + div_id).css("left",offset.left - left);
	$("#" + div_id).show();

	return false;
}

/*
	Funcion : viewCard_interest
	무이자 할부 안내 레이어 박스 출력

	Parameters:
		obj 	- 해당객체
		div_id	- 배송정보 레이어 박스 id명

	See Also:
*/
function viewCard_interest(obj, div_id, top, left) {

	var offset = $(obj).offset();
	$("#" + div_id).css("top",offset.top + top);
	$("#" + div_id).css("left",offset.left - left);
	$("#" + div_id).show();

	return false;
}
/*
	Funcion : login_popup
	로그인 팝업 창 생성 함수

	Parameters:

	See Also:
*/
function login_popup(width, height) {

	openWindow('/app/member/login_pop', 'login_pop', 'resizable=yes,scrollbars=yes', width, height, true);
}

/*
	Funcion : openerLocation
	부모창  Location 함수

	Parameters:
		url - 이동경로
	See Also:
*/

function openerLocation(url) {

	opener.document.location.href = url;
	self.close();
}

/*
	Funcion : viewContent
	상세 내용 및 답변 보기

	Parameters:
		id1 - 상세 내용 id
		id2 - 답변 내용 id
		id3 - 덧글 내용 id

	See Also:
*/
function viewContent(id1, id2, id3)
{
	if ( document.getElementById(id1) != null )
	{
		document.getElementById(id1).style.display = ( document.getElementById(id1).style.display == "none" ) ? "":"none";
	}
	if ( document.getElementById(id2) != null )
	{
		document.getElementById(id2).style.display = ( document.getElementById(id2).style.display == "none" ) ? "":"none";
	}

	if ( document.getElementById(id3) != null )
	{
		document.getElementById(id3).style.display = ( document.getElementById(id3).style.display == "none" ) ? "":"none";
	}
}

function viewContent2(id1, class1, class2)
{
	if ( document.getElementById(id1) != null )
	{
		document.getElementById(id1).style.display = ( document.getElementById(id1).style.display == "none" ) ? "":"none";
	}

	if(class1 != ""){
		if(class1 != "" && $("." + class1).css("display") == "none") {
			$("." + class1).show();
		} else {
			$("." + class1).hide();
		}
	}

	if(class2 != ""){
		if($("." + class2).css("display") == "none") {
			$("." + class2).show();
		} else {
			$("." + class2).hide();
		}
	}
}


function viewList(class1, class2)
{
	if(class1 != ""){
		$("." + class1).hide();
	}

	if(class2 != ""){
		if(class2 != "" && $("." + class1).css("display") == "none") {
			$("." + class2).show();
		} else {
			$("." + class2).hide();
		}
	}
}

/*
	Funcion : onlynumber
	숫자만 입력 가능

	Parameters:

	See Also:
*/
function onlynumber() {

	if ( window.event == null ) return;

	var e = event.keyCode;

	if (e>=48 && e<=57) return;
	if (e>=96 && e<=105) return;
	if ( e==8 || e==9 || e==13 || e==37 || e==39) return; // tab, back, ←,→
	event.returnValue = false;
}

/*
	Funcion : checkQty
	구매수량 체크

	Parameters:
		loc - 구매수량 입력폼

	See Also:
*/
function checkQty(loc) {
	if(loc.value == "" || loc.value == 0){
		loc.value = "1";
		loc.focus();
		loc.select();
		return false;
	}

	if(/[^0123456789]/g.test(loc.value)) {
		loc.value = "1";
		loc.focus();
		loc.select();
		return false;
	}
}

/*
	Funcion : popup_zipcode
	우편번호 검색 팝업 창 생성

	Parameters:
		control_name1 - 우편번호
		control_name2 - 시, 도
		control_name3 - 구, 군
		control_name4 - 동

	See Also:
*/
/*
function popup_zipcode(control_name1, control_name2, control_name3, control_name4, width, height) {

	openWindow("/app/util/find_zip_post/?name1=" + control_name1 + "&name2=" + control_name2 + "&name3=" + control_name3 + "&name4=" + control_name4, 'find_zip', 'resizable=yes,scrollbars=yes', width, height, true);
}
*/
/*
	Funcion : popup_new_zipcode
	신규우편번호 검색 팝업 창 생성

	Parameters:
		control_name1 - 우편번호
		control_name2 - 시, 도
		control_name3 - 구, 군
		control_name4 - 동
		control_name5 - 신규우편번호

	See Also:
*/
function popup_new_zipcode(control_name1,control_name3, control_name4, width, height) {

	openWindow("/app/util/find_new_zip_post/?name1=" + control_name1 + "&name3=" + control_name3 + "&name4=" + control_name4, 'find_zip', 'resizable=yes,scrollbars=yes', width, height, true);
}

function popup_coupon(coupon_no) {

	var coupon_no= coupon_no;
	openWindow("/app/contents/coupon_products?coupon_no=" + coupon_no, 'coupon', 'resizable=yes,scrollbars=yes', 970, 735, true);
	//close();
}

function popup_partner(type)
{
	if( type == "partner")
	{
		var win = window.open("/app/company/partner", "partner", "width=662, height=600");
		win.focus();
	}
	else if (type == "recruit")
	{
		var win = window.open("/app/company/recruit", "recruit", "width=662, height=635");
		win.focus();
	}
		//close();
}

/*
	Funcion : inputDomain
	이메일 뒷부분 처리 함수

	Parameters:
		email_tail	- 항목에 있는 이메일 뒷부분
		email_etc	- 이메일 뒷부분 직접 입력

	See Also:
*/
function inputDomain(email_tail, email_etc) {

	var selected_domain = $("select[name='" + email_tail + "']:eq(0)").val();
	var input_domain = $("input[name='" + email_etc + "']:eq(0)");

	if ( selected_domain == "etc" )
	{
		$(input_domain).css( {display:""} );
		$(input_domain).focus();
	}
	else
	{
		$(input_domain).css( {display:"none"} );
	}
}

/*
	Funcion : more_list
	리스트 더보기 함수

	Parameters:
		cat_cd	- 카테고리 코드
		kind	- 페이지 종류

	See Also:
*/
function more_list(cat_cd, kind)
{
	// 기본기능 구현,,, 추후 임팩트 작업
	if (kind =="newArrival") {
		var target_url = "/app/contents/new_goods_more/00" + cat_cd;
	} else if (kind =="onSale") {
		var target_url = "/app/contents/OnSaleMore/00200" + cat_cd;
	}


	if($("#more_list" + cat_cd).css('display') == "none")
	{
		$.ajax({
			type: "GET",
			url: target_url,
			success: function(msg){
				if (msg != "") {
				$("#more_list" + cat_cd).show();
				$("#more_list" + cat_cd).html(msg);
				$("#more" + cat_cd).attr('src',"/media/img/contents/new/view_out.gif");
				}
			}
		});
	}
	else
	{
		$("#more_list" + cat_cd).hide();
		$("#more" + cat_cd).attr('src',"/media/img/contents/new/view_plus.gif");
	}
}

// 화면에서 팝업 또는 레이어의 값으로 나눠서 위치를 반환
function getWidthPosition(w){
	var x = ((document.documentElement.clientWidth - w) / 2) + document.documentElement.scrollLeft;
	return x;
}

// 화면에서 팝업 또는 레이어의 값으로 나눠서 위치를 반환
function getHeightPosition(h){
    var y = ((document.documentElement.clientHeight - h) / 2) + document.documentElement.scrollTop;
	return y;
}

function LoginCheckUrl(url) {
	if ( !loginChk() ) {
		if ( confirm("회원전용입니다.\n\n로그인 하시겠습니까?") ) {
			document.location.href = 'https://www.musinsa.com/?mod=login';
		} else {
			return false;
		}
	} else {
		document.location = url;
	}
}

function goCategory(d_cat_cd){
	if(d_cat_cd !=""){
		document.location = "/app/category/lists/" + d_cat_cd;
	} else{
		alert("카테고리를 선택해 주세요.");
		return false;
	}
}

// 메뉴 플래시에 대한 함수
function BtnClickChkEvent(mode){

	//오픈 모드
	if(mode == "open"){
		document.getElementById('flashArea').style.position = "";
	} else {
		document.getElementById('flashArea').style.position = "relative";
	}
}

function order_cancel_cmd()
{
	ff = document.lf1;

	var ord_no = ff.ord_no.value;
	var cancel_reason = ff.cancel_reason.value;

	if( ff.cancel_reason.selectedIndex == 0  )
	{
		alert('주문취소 사유를 선택해 주세요.');
		ff.cancel_reason.focus();
		return false;
	}
	/*
	if( ff.cancel_content.value == ""  )
	{
		alert('주문취소 내용를 입력하지 않으셨습니다.');
		ff.cancel_content.focus();
		return false;
	}
	*/
	if(!confirm("주문 취소를 하시겠습니까?")){
		return false;
	}

	$.ajax({
		type: "POST",
		url: "/app/mypage/order_cancel_cmd?ord_no=" + ord_no + "&cancel_reason=" + cancel_reason,
		success: function(msg){
			if(msg == 1){
				alert("주문이 정상적으로 취소 되었습니다.");
				opener.location = "/app/mypage/order_view/?ord_no=" + ord_no;
				self.close();
			} else {
				alert("[주문 취소 실패] 관리자에게 문의하시기 바랍니다.");
			}
		}
	});
}

function checkTime()
{
	// 1. 시간 체크(클라이언트 vs 서버)
	$.ajax({
		type: "POST"
		, async: false
		, url: "/app/svc/get_sever_unix_time"
		, success: function(msg) {
			var server_time = msg;
			var now = new Date();
			var now_unix = now.getTime();
			var client_time = Math.floor(now_unix / 1000);
			if ( Math.abs(server_time - client_time) > 500 ) {
				alert('고객님 컴퓨터의 시간이 정확하지 않습니다.\n시간을 조정하신 후 이용해 주시기 바랍니다.');
			}
		}
	});
}

/* 남은 시간 카운터 */
function calcDDay(goods_no,goods_sub,diff_time){
	var day, hour, min, sec, mod = "";

	// 남은 일수
	day = Math.floor(diff_time/(3600*24));
	mod = diff_time % (24*3600);

	if(document.getElementById("diff_day_" + goods_no + "_" + goods_sub)){
		document.getElementById("diff_day_" + goods_no + "_" + goods_sub).innerHTML = day;
	}

	// 남은 시간
	hour = Math.floor(mod/3600);
	mod = diff_time % 3600;

	if(document.getElementById("diff_hour_" + goods_no + "_" + goods_sub)){
		document.getElementById("diff_hour_" + goods_no + "_" + goods_sub).innerHTML = hour;
	}

	// 남은 분
	min = Math.floor(mod/60);

	if(document.getElementById("diff_min_" + goods_no + "_" + goods_sub)){
		document.getElementById("diff_min_" + goods_no + "_" + goods_sub).innerHTML = min;
	}

	// 남은 초
	sec = mod % 60;

	if(document.getElementById("diff_second_" + goods_no + "_" + goods_sub)){
		document.getElementById("diff_second_" + goods_no + "_" + goods_sub).innerHTML = sec;
	}
}

function get_recent_update_news_data(objid, type, last_no, db_nm, notice_yn){
	var page_index = document.getElementById(objid).getAttribute('page_index');

	if(page_index <= 20){
		$.ajax({
			type: "POST",
			url: "/app/svc/GetNewsList",
			data: 'page=' + page_index + '&type=' + type + '&last_no=' + last_no + '&db_nm=' + db_nm + '&notice_yn=' + notice_yn,
			success: function(msg){
				if(msg){
					var _ret = msg.split('<!--AJAX SPLIT-->');
					document.getElementById(objid).innerHTML += _ret[0];
					page_index++;
					document.getElementById(objid).setAttribute('page_index',page_index);
					//if(_ret[0]<1) document.getElementById(objid+'_more').style.display = 'none';
					//else document.getElementById(objid+'_more').style.display = '';
					//페이스북 좋아요 버튼
					//span 의 노드를 구함
					var _tmp_nodes = document.getElementById(objid).getElementsByTagName('span');
					for(var i=0;i<_tmp_nodes.length;i++){
						//좋아요 버튼을 감싼 span 이면서(sns값이 fb) 이미 렌더하지 않았다면(snsdo 값이 done 이 아닌것들만) 렌더후  snsdo 를 done 으로 셋팅 = 중복방지
						if(_tmp_nodes[i].getAttribute('sns')=='fb' && _tmp_nodes[i].getAttribute('snsdo')!='done') {
							FB.XFBML.parse( _tmp_nodes[i]);
							_tmp_nodes[i].setAttribute('snsdo','done');
						}
					}
				}
			}
		});
	}
}

function get_recent_board_req_data(objid, type, last_no, db_nm, notice_yn){
	var page_index = document.getElementById(objid).getAttribute('page_index');

	if(page_index <= 20){
		$.ajax({
			type: "POST",
			url: "/app/svc/get_recent_board",
			data: 'page=' + page_index + '&type=' + type + '&last_no=' + last_no + '&db_nm=' + db_nm + '&notice_yn=' + notice_yn,
			success: function(msg){
				if(msg){
					var _ret = msg.split('<!--AJAX SPLIT-->');
					document.getElementById(objid).innerHTML += _ret[0];
					page_index++;
					document.getElementById(objid).setAttribute('page_index',page_index);
					//if(_ret[0]<1) document.getElementById(objid+'_more').style.display = 'none';
					//else document.getElementById(objid+'_more').style.display = '';
					//페이스북 좋아요 버튼
					//span 의 노드를 구함
					var _tmp_nodes = document.getElementById(objid).getElementsByTagName('span');
					for(var i=0;i<_tmp_nodes.length;i++){
						//좋아요 버튼을 감싼 span 이면서(sns값이 fb) 이미 렌더하지 않았다면(snsdo 값이 done 이 아닌것들만) 렌더후  snsdo 를 done 으로 셋팅 = 중복방지
						if(_tmp_nodes[i].getAttribute('sns')=='fb' && _tmp_nodes[i].getAttribute('snsdo')!='done') {
							FB.XFBML.parse( _tmp_nodes[i]);
							_tmp_nodes[i].setAttribute('snsdo','done');
						}
					}
				}
			}
		});
	}
}

// 쿠키 만들기
function setCookie(key, value, expire) {
	var cookieDate = new Date();
	cookieDate.setDate(cookieDate.getDate() + parseInt(expire));
	document.cookie = key + "=" + escape(value) + "; expires=" + cookieDate.toGMTString() + "; path=/";
}

// 쿠키 값 얻기
function getCookie(key) {
	var cookie = document.cookie;
	var first = cookie.indexOf(key+"=");
	if (first>=0) {
		var str = cookie.substring(first,cookie.length);
		var last = str.indexOf(";");
		if (last<0) {
			last = str.length;
		}
		str = str.substring(0,last).split("=");
		return unescape(str[1]);
	} else {
		return null;
	}
}

// 쿠키 지우기
function delCookie(cookieName) {
	var expireDate = new Date();
	//어제 날짜를 쿠키 소멸 날짜로 설정한다.
	expireDate.setDate( expireDate.getDate() - 1 );
	document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
}

// 성별 구분 설정
function setSexKind(kind)
{
	var url = location.href;
	var host = location.host;

	if(kind == 2) {
		if(host.indexOf("wusinsa") != "-1") {
			url = url.replace("wusinsa.musinsa.com", "store.musinsa.com");
		}
	} else if(kind == 4) {
		if(host.indexOf("wusinsa") == "-1") {
			url = url.replace("store.musinsa.com", "wusinsa.musinsa.com");
		}
	} else if(kind == 8) {
		if(host.indexOf("wusinsa") != "-1") {
			url = url.replace("wusinsa.musinsa.com", "store.musinsa.com");
		}
	} else if(kind == 16) {
		if(host.indexOf("wusinsa") != "-1") {
			url = url.replace("wusinsa.musinsa.com", "store.musinsa.com");
		}
	} else {
		if(host.indexOf("wusinsa") != "-1") {
			url = url.replace("wusinsa.musinsa.com", "store.musinsa.com");
		}
	}

	document.location.href = url;
}

function countDownComingSoon(goods_no, r)
{

	r = parseInt(r,10) - 1;
	day = Math.floor(r / (3600 * 24)); mod = r % (3600 * 24);
	hrs = Math.floor(mod / 3600); mod = mod % 3600;
	min = Math.floor(mod / 60);
	sec = mod % 60;
	hrs = (day * 24) + hrs;
	hrs = (hrs > 9) ? hrs.toString() : '0' + hrs.toString();
	min = (min > 9) ? min.toString() : '0' + min.toString();
	sec = (sec > 9) ? sec.toString() : '0' + sec.toString();
	$('#count'+goods_no).text(hrs + ':' + min + ':' + sec);

	if(r > 0) {
		setTimeout(function(){countDownComingSoon(goods_no, r);},1000);
	} else {

	}
}

function getGoodsList(form, obj, value, page)
{
	if(obj == form.a_cat_cd) {
		var a_obj = form.assistant_cat_cd;
		if(a_obj){
			var a_cat_cd = "";
			if(a_obj.length){
				for(var i=0; i<a_obj.length; i++){
					if(a_obj[i].checked){
						a_cat_cd += (a_cat_cd == "") ? a_obj[i].value : "," + a_obj[i].value;
					}
				}
			} else {
				if(a_obj.checked){
					a_cat_cd = a_obj.value;
				}
			}
			obj.value = a_cat_cd;
		}
	} else  if ( obj == form.color && form.color.value != "") {
		form.color.value = CheckValue(form.color.value, value);
	} else if ( obj == form.tag ) {
		if(form.tag.value != "" && form.tag.value == value) {
			obj.value = "";
		} else {
			obj.value = value;
		}
	} else {
		obj.value = value;
		if(obj == form.list_kind) {
			setCookie("list_kind", value);
		}
		if (obj == form.sale_goods) {
			if(form.chk_sale.checked) {
				obj.value = value;
			} else {
				obj.value = "N";
			}
		} else if ( obj == form.ex_soldout ) {
			if(form.chk_soldout.checked) {
				obj.value = value;
			} else {
				obj.value = "N";
			}
		} else if ( obj == form.new_product_yn ) {
			if(form.chk_new_product_yn.checked) {
				obj.value = value;
			} else {
				obj.value = "N";

			}
		} else if ( obj == form.sale_dt_yn ) {
			if(form.chk_timesale.checked) {
				obj.value = value;
				form.sale_yn.value = value;
			} else {
				obj.value = "";
				form.sale_yn.value = "";
			}
		} else if (obj == form.exclusive_yn) {
			if(form.chk_exclusive.checked) {
				obj.value = value;
			} else {
				obj.value = "";
			}
        } else if (obj == form.brand_favorite_yn) {
			if(form.brand_favorite.checked) {
				obj.value = value;
			} else {
				obj.value = "";
			}
        } else if (obj == form.goods_favorite_yn) {
			if(form.goods_favorite.checked) {
				obj.value = value;
			} else {
				obj.value = "";
			}
        }
	}

	// 페이지 초기화
	if(page && page == "Y"){
		form.page.value = 1;
	}

	form.submit();
}
/*
 * 멀티선택에 대한 처리
*/
function CheckValue(codes, code)
{
	var acodes = codes.split(",");

	if ($.inArray(code, acodes) < 0) {
		acodes.push(code);
	}else if ($.inArray(code, acodes) >= 0) {
		acodes.splice( $.inArray( code, acodes ), 1 );
	}
	return acodes.join(',');
}

function getParam(sname)
{
	var params = location.search.substr(location.search.indexOf("?")+1);
	var sval = "";
	params = params.split("&");
	// split param and value into individual pieces
	for (var i=0; i<params.length; i++)
	{
		temp = params[i].split("=");
		if ( [temp[0]] == sname ) { sval = temp[1]; }
	}
	return sval;
}

/*
	Function: formData2QueryString

	Parameters:
		docForm - Form Object

	Returns:
		String

*/
function formData2QueryString(docForm) {

	var strSubmitContent = '';
	var formElem;
	var strLastElemName = '';

	var debug = document.getElementById("debug");

	for (i = 0; i < docForm.elements.length; i++) {

		formElem = docForm.elements[i];
		switch (formElem.type) {
			// Text fields, hidden form elements
			case 'text':
			case 'hidden':
			case 'password':
			case 'textarea':
			case 'select-one':
				strSubmitContent += formElem.name + '=' + urlEncode(formElem.value) + '&'
				break;
			case 'select-multiple':
				var cnt = 0;
				var str = "";
				for(var j=0; j < formElem.length; j++){

					if(formElem.options[j].selected){
						if(cnt > 0){
							str += ",";
						}
						str += formElem.options[j].value;
						cnt++;
					}

				}
				strSubmitContent += formElem.name + '=' + urlEncode(str) + '&'
				break;
			// Radio buttons
			case 'radio':
				if (formElem.checked) {
					strSubmitContent += formElem.name + '=' + urlEncode(formElem.value) + '&'
				}
				break;

			// Checkboxes
			case 'checkbox':
				if (formElem.checked) {
				// Continuing multiple, same-name checkboxes
					if (formElem.name == strLastElemName) {
						// Strip of end ampersand if there is one
						if (strSubmitContent.lastIndexOf('&') == strSubmitContent.length-1) {
							strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
						}
						// previous checkboxes are unchecked
						if (strSubmitContent.lastIndexOf('=') == strSubmitContent.length-1) {
							strSubmitContent += urlEncode(formElem.value);
						}
						// previous checkboxes are checked
						else{
							strSubmitContent += ',' + urlEncode(formElem.value);
						}
					}
					else {
						strSubmitContent += formElem.name + '=' + urlEncode(formElem.value);
					}
					strSubmitContent += '&';
				}else{
					// First checkbox is unckeced
					if (formElem.name != strLastElemName) {
						strSubmitContent += formElem.name + '=&';
					}
				}
				break;
		}
		strLastElemName = formElem.name;
	}

	// Remove trailing separator
	strSubmitContent = strSubmitContent.substr(0, strSubmitContent.length - 1);
	return strSubmitContent;
}

function shuffleChild(id) {
	var parent = $("#" + id);
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
}

function CountQuickMenuTimeSale(diff_time, goods_no, goods_sub) {
	var RemainTime = diff_time - 1;
	if(RemainTime >= 0) {
		calcDDay(goods_no, goods_sub, RemainTime);
		setTimeout(function(){
			CountQuickMenuTimeSale(RemainTime, goods_no, goods_sub);
		}, 1000);
	}
}


/************************************
 *		레이아웃 관련 스크립트		*
 ************************************/
// 기본 상단 보기
function showDefaultTop() {

	// 숏 상단 session 제거.
	$.ajax({
		type: "POST",
		url: "/app/util/del_session_short_top",
		success: function(msg) {}
	});

	// 상단 변경
	$("#short_top").hide();
	$("#default_top").show();

	// 좌메뉴 버튼 & top 버튼 보기
	$("#left_menu_btn").show();
	$("#left_top_btn").show();

	// 좌메뉴 열기
	openLeftMenu();
}

function showShortTopSpecial() {
	// 상단 변경
	$("#short_top_special").hide();
	$("#default_top").show();

	// 좌메뉴 버튼 & top 버튼 보기
	$("#left_menu_btn").show();
	$("#left_top_btn").show();

	setCookie('special_top_open_yn', 'Y');

	if(getCookie("musinsa_banner_close") != "1"){
		$('.extend_banner').show();
	}

	// 헤더 열릴때 페이지별 추가로 작업해야 할 부분 있을때
	if( typeof afterShortTopShow == "function" )  {
		afterShortTopShow();
	}
}

// 좌메뉴 토글
function toggleLeftMenu() {
	if($(".left_area").css("display") == "none") {
		openLeftMenu();
	} else {
		closeLeftMenu();
	}
}

// 좌메뉴 열기
function openLeftMenu() {
	var left_area_obj = $(".left_area");
	var left_menu_btn_obj = $("#left_menu_btn");
	var left_top_btn_obj = $("#left_top_btn");
	var right_area_obj = $(".right_area");
	var left_share_btn_obj = $("#left_share_btn");
	var left_like_btn_obj = $("#left_like_btn");

	left_area_obj.show();
	left_menu_btn_obj.css("left", "270px");
	left_top_btn_obj.css("left", "270px");
	right_area_obj.css({"left":"270px", "min-width":"1229px"});
	left_share_btn_obj.css("left", "270px");
	left_like_btn_obj.css("left", "270px");
	$(".main_plan_notice li.plan_view3").addClass("plan_view3_left");
	$(".main_plan_notice li.plan_view3").removeClass("plan_view3");

	// 브랜드 리스트 컨텐츠 갯수에 의해서 베스트랭킹 상품 리스트 미디어쿼리 변경
	var org_bestranking_list_cnt = $('#bestranking_list_cnt').attr('org_cnt');
	var bestranking_list_cnt = $('#bestranking_list_cnt').attr('cnt');
	if(org_bestranking_list_cnt < 10) {
		$('#bestranking_list_cnt').removeClass('goods_small_media' + bestranking_list_cnt);
		bestranking_list_cnt = parseInt($('#bestranking_list_cnt').attr('cnt')) - 1;
		$('#bestranking_list_cnt').addClass('goods_small_media' + bestranking_list_cnt).attr('cnt',bestranking_list_cnt);
	}

	// 지울 미디어 쿼리
	$("#add_buy_goods > ul").removeClass('goods_suggest_media4');
	// 추가할 미디어 쿼리
	$("#add_buy_goods > ul").addClass('goods_suggest_media3');

	// 여닫기 쿠키 변경
	if(getCookie("left_menu_open_yn")){
		delCookie("left_menu_open_yn");
	}
	setCookie("left_menu_open_yn", "Y", 1);


	$("#shop_sale_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");
	$("#shop_release_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");
	$("#shop_standing_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");

	if($("#add_buy_goods").length > 0) {
		addBuyGoodsSlider.reloadSlider();
	}

	$("#page_mypage_wish .snap-article-list").removeClass("goods_320_media5");
	$("#page_mypage_wish .snap-article-list").addClass("goods_320_media4");

	$("#page_mypage_brand .snap-article-list").removeClass("goods_270_media6");
	$("#page_mypage_brand .snap-article-list").addClass("goods_270_media5");
}

// 좌메뉴 닫기
function closeLeftMenu() {
	var left_area_obj = $(".left_area");
	var left_menu_btn_obj = $("#left_menu_btn");
	var left_top_btn_obj = $("#left_top_btn");
	var right_area_obj = $(".right_area");
	var left_share_btn_obj = $("#left_share_btn");
	var left_like_btn_obj = $("#left_like_btn");

	left_area_obj.hide();
	left_menu_btn_obj.css("left", "0px");
	left_top_btn_obj.css("left", "-1px");
	right_area_obj.css({"left":"0px","min-width":"1500px"});
	left_share_btn_obj.css("left", "-1px");
	left_like_btn_obj.css("left", "-1px");
	$(".main_plan_notice li.plan_view3_left").addClass("plan_view3");
	$(".main_plan_notice li.plan_view3_left").removeClass("plan_view3_left");

	// 브랜드 리스트 컨텐츠 갯수에 의해서 베스트랭킹 상품 리스트 미디어쿼리 변경
	var org_bestranking_list_cnt = $('#bestranking_list_cnt').attr('org_cnt');
	var bestranking_list_cnt = $('#bestranking_list_cnt').attr('cnt');
	if(org_bestranking_list_cnt < 10) {
		$('#bestranking_list_cnt').removeClass('goods_small_media' + bestranking_list_cnt);
		bestranking_list_cnt = parseInt($('#bestranking_list_cnt').attr('cnt')) + 1;
		$('#bestranking_list_cnt').addClass('goods_small_media' + bestranking_list_cnt).attr('cnt',bestranking_list_cnt);
	}

	// 지울 미디어 쿼리
	$("#add_buy_goods > ul").removeClass('goods_suggest_media3');
	// 추가할 미디어 쿼리
	$("#add_buy_goods > ul").addClass('goods_suggest_media4');

	// 여닫기 쿠키 변경
	if(getCookie("left_menu_open_yn")){
		delCookie("left_menu_open_yn");
	}
	setCookie("left_menu_open_yn", "N", 1);

	$("#shop_sale_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");
	$("#shop_release_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");
	$("#shop_standing_div").width(parseInt(($("#shop_issue").width()-187)/400)*400 + "px");

	if($("#add_buy_goods").length > 0) {
		addBuyGoodsSlider.reloadSlider();
	}

	$("#page_mypage_wish .snap-article-list").removeClass("goods_320_media4");
	$("#page_mypage_wish .snap-article-list").addClass("goods_320_media5");

	$("#page_mypage_brand .snap-article-list").removeClass("goods_270_media5");
	$("#page_mypage_brand .snap-article-list").addClass("goods_270_media6");
}

// 스토어 좌측하단 랭킹탭 상품
function getLeftRankingList(ul_id, page, item_cnt, u_cat_cd) {
	var show_area = $("#"+ul_id);
	var ranking_cnt = 5; // 슬라이드 페이지 수

	if(u_cat_cd != ""){ ranking_cnt = 3 }

	var sell_ranking_num = parseInt(ul_id.replace("sell_ranking","")); // sell_ranking div 번호

	if(show_area.html() == "") {
		show_area.addClass("loading");
		$.ajax({
			type: "POST",
			data: "page="+page+"&rowcnt="+item_cnt+"&u_cat_cd="+u_cat_cd,
			url: '/app/svc/get_rank_goods',
			success: function(msg) {
				eval("var json = " + msg);
				var contents = "";
				if(json.length > 0) {
					for(var j = 0; j < ranking_cnt; j++){
						var input_area = $("#sell_ranking"+(sell_ranking_num+j));
						contents = "";
						for (var k = 0; k < 6; k++){
							var i = (j * 6) + k;

							var brand_nm = checkTextLength(json[i].brand_nm,3);
							contents += '<li class="li_box">';
							contents += '<div class="li_inner">';
							contents += '<div class="list_img">';
							contents += '<a href="/app/product/detail/' + json[i].goods_no+'/' + json[i].goods_sub + '">';
							contents += '<span class="';
							if(json[i].rank < 4){
								contents += 'icon_event';
							}else{
								contents += 'icon_best';
							}
							contents += '">' + json[i].rank + '</span>';
							if(json[i].coupon_price > 0){
								contents += '<span class="slide_rank_coupon">쿠폰</span>';
							}
							contents += '<img src=\"//image.musinsa.com/images/goods_img/' + json[i].reg_dm + '/' + json[i].goods_no + '/' + json[i].goods_no + '_' + json[i].img_idx + '_70.' + json[i].img_ext ;
							contents += '" alt="' + json[i].brand_nm + '(' + json[i].brand_nm_eng + ') ' + json[i].goods_nm + '">';
							contents += '<span class="vertical_standard"></span>';
							contents += '</a>';
							contents += '</div>';
							contents += '<div class="article_info">';
							contents += '<p class="item_title">';
							contents += '<a href=\"/app/brand/goods_list/' +  json[i].brand + '">' + brand_nm + '</a>';
							if(json[i].variation > 0) {
								contents += "<span class=\"icon-rank rank-up\"></span>";
							} else if(json[i].variation < 0) {
								contents += "<span class=\"icon-rank rank-down\"></span>";
							} else {
								contents += "<span class=\"icon-rank rank-stay\"></span>";
							}
							contents += '</p>';
							contents += '<p class="list_info"><a href="/app/product/detail/' + json[i].goods_no+'/' + json[i].goods_sub + '">' + json[i].goods_nm + '</a></p>';
							contents += '<p class="price">' + Comma(json[i].price) + '원</p>';
							contents += '</div>';
							contents += '</div>';
							contents += '</li>';
						}
						show_area.removeClass("loading");
						input_area.html(contents);
					}
				} else {
					show_area.removeClass("loading");
					show_area.html(contents);
				}
			}
		});
	}
}
// 스토어 좌측하단 랭킹탭 브랜드
function getLeftBrandRankingList(ul_id, page, item_cnt) {
	var show_area = $("#"+ul_id);

	if(show_area.html() == "") {
		show_area.addClass("loading");

		$.ajax({
			type: "POST",
			data: "page="+page+"&item_cnt="+item_cnt,
			url: '/app/svc/get_botton_brand_ranking',
			success: function(msg) {
				eval("var json = " + msg);
				var contents = "";
				if(json.length > 0) {
					for(var j = 0; j < 3; j++){
						var input_area = $("#brand_ranking"+(j+1));
						contents = "";

						for(var k = 0; k < 9; k++){
							var i = (j * 9) + k;

							var brand_nm = checkTextLength(json[i].brand_nm,3);
							contents += '<li class="li_box">';
							contents += '<div class="li_inner">';
							contents += '<div class="list_img">';
							contents += '<a href="/app/brand/goods_list/' + json[i].brand + '" class="brandLogo">';
							contents += '<span class="';
							if(json[i].idx < 4){
								contents += 'icon_event';
							}else{
								contents += 'icon_best';
							}
							contents += '">' + json[i].idx + '</span>';
							contents += '<img src="//image.musinsa.com/mfile_s01/_brand/free_medium/' + json[i].brand + '.png?20181109" onError="this.src=\'//image.musinsa.com/mfile_s01/_brand/free_medium/empty_brand.gif\'" alt="" />';
							contents += '<span class="vertical_standard"></span>';
							contents += '</a>';
							contents += '</div>';
							contents += '<div class="article_info">';
							contents += '<p class="item_title">';
							contents += '<a href=\"/app/brand/goods_list/' +  json[i].brand + '">' + brand_nm + '</a>';
							if(json[i].variation > 0) {
								contents += "<span class=\"icon-rank rank-up\"></span>";
							} else if(json[i].variation < 0) {
								contents += "<span class=\"icon-rank rank-down\"></span>";
							} else {
								contents += "<span class=\"icon-rank rank-stay\"></span>";
							}
							contents += '</p>';
							contents += '</div>';
							contents += '</div>';
							contents += '</li>';
						}
						show_area.removeClass("loading");
						input_area.html(contents);
					}
				} else {
					show_area.removeClass("loading");
					show_area.html(contents);
				}
			}
		});
	}
}

// 스토어 좌측하단 신상품탭 신상품
function getLeftNewsList(ul_id, page, item_cnt) {
	var show_area = $("#"+ul_id);

	if(show_area.html() == "") {
		show_area.addClass("loading");

		$.ajax({
			type: "POST",
			data: "page="+page+"&item_cnt="+item_cnt,
			url: '/app/svc/get_botton_new_arrival',
			success: function(msg) {
				eval("var json = " + msg);
				var contents = "";
				if(json.length > 0) {
					for(var j = 0; j < 5; j++){
						var input_area = $("#new_arrivals"+(j+1));
						contents = "";

						for(var k = 0; k < 4; k++){
							var i = (j * 4) + k;

							contents += '<li class="li_box li_column">';
							contents += '<div class="li_inner">';
							contents += '<div class="article_info">';
							contents += '<p class="list_info">';
							contents += '<a class="text-title" href="/app/news/views/?idx='+json[i].idx+'">';
							contents += json[i].subject.substring(0,24);
							if(json[i].subject.length > 24){
								contents += '...';
							}

							if(json[i].comment_cnt > 0){
								if (json[i].comment_day.day > -3 && json[i].comment_day.day < 0){
									contents += ' <span class="replyCnt list_comment new">';
								} else {
									contents += ' <span class="replyCnt list_comment">';
								}
								if (json[i].reply_cnt > 0){
									var total_comment_cnt=parseInt(json[i].comment_cnt)+parseInt(json[i].reply_cnt);
									contents += total_comment_cnt;
								} else {
									contents += json[i].comment_cnt;
								}
								contents += "</span>"
							}
							contents += '</a>';
							contents += '</p>';
							contents += '<ul class="box_date_view">';
							if(json[i].past_time.day > 0){
								contents += '<li>' + json[i].past_time.day + '일 전</li>';
							} else if (json[i].past_time.hour > 0){
								contents += '<li>' + json[i].past_time.hour + '시간 전</li>';
							} else if(json[i].past_time.min > 29) {
								contents += '<li>' + json[i].past_time.min + '분 전</li>';
							} else {
								contents += '<li>방금 전</li>';
							}
							contents += '<li class="link-text">' + json[i].brand_list[0].brand_nm + '</li>';
							contents += '</ul>';
							contents += '</div>';
							contents += '<div class="list_img">';
							contents += '<a class="text-title" href="/app/news/views/?idx='+json[i].idx+'">';
							contents += '<img src="//image.musinsa.com/images/goods_img/'+json[i].goods[0].reg_dm+'/'+json[i].goods[0].goods_no+'/'+json[i].goods[0].goods_no+'_'+json[i].goods[0].img_idx+'_60.'+json[i].goods[0].img_ext+'" alt="" />';
							contents += '<span class="vertical_standard"></span>';
							contents += '</a>';
							contents += '</div>';
							contents += '</div>';
							contents += '</li>';
						}
						show_area.removeClass("loading");
						input_area.html(contents);
					}
				} else {
					show_area.removeClass("loading");
					show_area.html(contents);
				}
			}
		});
	}
}

// 스토어 좌측하단 신상품탭 세일
function getLeftSaleNewsList(ul_id, page, item_cnt) {
	var show_area = $("#"+ul_id);

	if(show_area.html() == "") {
		show_area.addClass("loading");

		$.ajax({
			type: "POST",
			data: "page="+page+"&item_cnt="+item_cnt,
			url: '/app/svc/get_botton_sale',
			success: function(msg) {
				eval("var json = " + msg);
				var contents = "";
				if(json.length > 0) {
                    for(var j = 0; j < 2; j++) {
                        var input_area = $("#sale_new_arrivals"+(j+1));
                        contents = "";

                        for(var k = 0; k < 4; k++){
                            var i = (j * 4) + k;
                            contents += '<li class="li_box li_column">';
                            contents += '<div class="li_inner">';
                            contents += '<div class="article_info">';
                            contents += '<p class="list_info">';
                            contents += '<a class="text-title" href="/app/news/views/?idx=' + json[i].idx + '">';
                            contents += json[i].subject.substring(0, 24);
                            if (json[i].subject.length > 24) {
                                contents += '...';
                            }

                            if (json[i].comment_cnt > 0) {
                                if (json[i].comment_day.day > -3 && json[i].comment_day.day < 0) {
                                    contents += ' <span class="replyCnt list_comment new">';
                                } else {
                                    contents += ' <span class="replyCnt list_comment">';
                                }
                                if (json[i].reply_cnt > 0) {
                                    var total_comment_cnt = parseInt(json[i].comment_cnt) + parseInt(json[i].reply_cnt);
                                    contents += total_comment_cnt;
                                } else {
                                    contents += json[i].comment_cnt;
                                }
                                contents += "</span>"
                            }
                            contents += '</a>';
                            contents += '</p>';
                            contents += '<ul class="box_date_view">';
                            if (json[i].past_time.day > 0) {
                                contents += '<li>' + json[i].past_time.day + '일 전</li>';
                            } else if (json[i].past_time.hour > 0) {
                                contents += '<li>' + json[i].past_time.hour + '시간전</li>';
                            } else if (json[i].past_time.min > 29) {
                                contents += '<li>' + json[i].past_time.min + '분 전</li>';
                            } else {
                                contents += '<li>방금전</li>';
                            }
                            contents += '<li class="link-text">' + json[i].brand_list[0].brand_nm + '</li>';
                            contents += '</ul>';
                            contents += '</div>';
                            contents += '<div class="list_img">';
                            contents += '<a class="text-title" href="/app/news/views/?idx=' + json[i].idx + '">';
                            contents += '<img src="//image.musinsa.com/images/goods_img/' + json[i].goods[0].reg_dm + '/' + json[i].goods[0].goods_no + '/' + json[i].goods[0].goods_no + '_' + json[i].goods[0].img_idx + '_60.' + json[i].goods[0].img_ext + '" alt="" />';
                            contents += '<span class="vertical_standard"></span>';
                            contents += '</a>';
                            contents += '</div>';
                            contents += '</div>';
                            contents += '</li>';
                        }
                        show_area.removeClass("loading");
                        input_area.html(contents);
                    }
				} else {
					show_area.removeClass("loading");
					show_area.html(contents);
				}
			}
		});
	}
}

// 스토어 좌측하단 신상품탭 이벤트
function getLeftEventNewsList(ul_id, page, item_cnt) {
	var show_area = $("#"+ul_id);

	if(show_area.html() == "") {
		show_area.addClass("loading");

		$.ajax({
			type: "POST",
			data: "page="+page+"&item_cnt="+item_cnt,
			url: '/app/svc/get_botton_event',
			success: function(msg) {
				eval("var json = " + msg);
				var contents = "";
				if(json.length > 0) {
                    for(var j = 0; j < 2; j++) {
                        var input_area = $("#event_new_arrivals"+(j+1));
                        contents = "";

                        for(var k = 0; k < 4; k++){
                            var i = (j * 4) + k;
                            contents += '<li class="li_box li_column">';
                            contents += '<div class="li_inner">';
                            contents += '<div class="article_info">';
                            contents += '<p class="list_info">';
                            contents += '<a class="text-title" href="/app/news/views/?idx=' + json[i].idx + '">';
                            contents += json[i].subject.substring(0, 24);
                            if (json[i].subject.length > 24) {
                                contents += '...';
                            }

                            if (json[i].comment_cnt > 0) {
                                if (json[i].comment_day.day > -3 && json[i].comment_day.day < 0) {
                                    contents += ' <span class="replyCnt list_comment new">';
                                } else {
                                    contents += ' <span class="replyCnt list_comment">';
                                }
                                if (json[i].reply_cnt > 0) {
                                    var total_comment_cnt = parseInt(json[i].comment_cnt) + parseInt(json[i].reply_cnt);
                                    contents += total_comment_cnt;
                                } else {
                                    contents += json[i].comment_cnt;
                                }
                                contents += "</span>"
                            }
                            contents += '</a>';
                            contents += '</p>';
                            contents += '<ul class="box_date_view">';
                            if (json[i].past_time.day > 0) {
                                contents += '<li>' + json[i].past_time.day + '일 전</li>';
                            } else if (json[i].past_time.hour > 0) {
                                contents += '<li>' + json[i].past_time.hour + '시간전</li>';
                            } else if (json[i].past_time.min > 29) {
                                contents += '<li>' + json[i].past_time.min + '분 전</li>';
                            } else {
                                contents += '<li>방금전</li>';
                            }
                            contents += '<li class="link-text">' + json[i].brand_list[0].brand_nm + '</li>';
                            contents += '</ul>';
                            contents += '</div>';
                            contents += '<div class="list_img">';
                            contents += '<a class="text-title" href="/app/news/views/?idx=' + json[i].idx + '">';
                            contents += '<img src="//image.musinsa.com/images/goods_img/' + json[i].goods[0].reg_dm + '/' + json[i].goods[0].goods_no + '/' + json[i].goods[0].goods_no + '_' + json[i].goods[0].img_idx + '_60.' + json[i].goods[0].img_ext + '" alt="" />';
                            contents += '<span class="vertical_standard"></span>';
                            contents += '</a>';
                            contents += '</div>';
                            contents += '</div>';
                            contents += '</li>';
                        }
                        show_area.removeClass("loading");
                        input_area.html(contents);
                    }
				} else {
					show_area.removeClass("loading");
					show_area.html(contents);
				}
			}
		});
	}
}
// 스토어 좌측하단 세일탭 타임세일
function getLeftTimeSaleList(ul_id,page,item_cnt) {
	var show_area = $("#"+ul_id);

	if(show_area.html() == "") {
		show_area.addClass("loading");

		$.ajax({
			type: "POST",
			data: "page="+page+"&item_cnt="+item_cnt,
			url: '/app/svc/get_botton_time_sale',
			success: function(msg) {
				eval("var json = " + msg);
				var contents = "";
				if(json.length > 0) {

					for(var j = 0; j < 4; j++){
						var input_area = $("#time_sale"+(j+1));
						contents = "";

						for(var k = 0; k < 3; k++){
							var i = (j * 3) + k;

							contents += '<li class="li_box li_column">';
							contents += '<div class="li_inner">';
							contents += '<div class="list_img">';
							contents += '<a href="/app/product/detail/' + json[i].goods_no + '/' + json[i].goods_sub + '">';
							contents += '<span class="icon_sale">' + json[i].rate + '%</span>';
							contents += '<img src="//image.musinsa.com/images/goods_img/' + json[i].reg_dm + '/' + json[i].goods_no + '/' + json[i].goods_no + '_'+json[i].img_idx+'_100.'+json[i].img_ext+'" alt="' + json[i].brand_nm + '(' + json[i].brand_nm_eng + ') ' + json[i].goods_nm + '">'; //이미지
							contents += '<span class="vertical_standard"></span>';
							contents += '</a>';
							contents += '</div>';
							contents += '<div class="article_info">';
							contents += '<p class="item_title">';
							contents += '<a href=\"/app/brand/goods_list/' +  json[i].brand + '">' + json[i].brand_nm + '</a>';
							contents += '</p>';
							contents += '<p class="list_info">';
							contents += '<a href="/app/product/detail/' + json[i].goods_no + '/' + json[i].goods_sub + '">' + json[i].goods_nm + '</a>';
							contents += '</p>';
							contents += '<p class="price">';
							contents += '<del class="box_origin_price">' + Comma(json[i].normal_price) + '원</del>';
							contents += '<span class="txt_price">' + Comma(json[i].price) + '원</span>';
							contents += '</p>';
							contents += '<p class="limit-date"><span class="g-time-prd-list" id="bottom_sale_day_' + json[i].goods_no + '"></span><em>일</em><span class="g-time-prd-list" id="bottom_sale_time_' + json[i].goods_no + '"></span></p>';
							contents += '</div>';
							contents += "<script type=\"text/javascript\">countDownLeftTimeSale('" + json[i].goods_no + "','" + json[i].time_diffs.diff_time + "')</script>";
							contents += '</div>';
							contents += '</li>';
						}
						show_area.removeClass("loading");
						input_area.html(contents);
					}
					show_area.removeClass("loading");
					show_area.html(contents);
				} else {
					show_area.removeClass("loading");
					show_area.html(contents);
				}
			}
		});
	}
}

// 스토어 좌측하단 세일탭 클리어런스
function getLeftClearanceList(ul_id,page,item_cnt) {
	var show_area = $("#"+ul_id);

	if(show_area.html() == "") {
		show_area.addClass("loading");

		$.ajax({
			type: "POST",
			data: "page="+page+"&week=Y&item_cnt="+item_cnt,
			url: '/app/svc/get_botton_clearance',
			success: function(msg) {
				eval("var json = " + msg);
				var contents = "";
				if(json.length > 0) {
					for(var j = 0; j < 4; j++){
						var input_area = $("#clearance_sale"+(j+1));
						contents = "";

						for(var k = 0; k < 6; k++){
							var i = (j * 6) + k;

							contents += '<li class="li_box">';
							contents += '<div class="li_inner">';
							contents += '<div class="list_img">';
							contents += '<a href="/app/product/detail/' + json[i].goods_no + '/' + json[i].goods_sub + '">';
							contents += '<span class="icon_sale">' + json[i].rate + '%</span>';
							contents += '<img src="//image.musinsa.com/images/goods_img/' + json[i].reg_dm + '/' + json[i].goods_no + '/' + json[i].goods_no + '_'+json[i].img_idx+'_70.'+json[i].img_ext+'" alt="' + json[i].brand_nm + '(' + json[i].brand_nm_eng + ') ' + json[i].goods_nm + '">';
							contents += '<span class="vertical_standard"></span>';
							contents += '</a>';
							contents += '</div>';
							contents += '<div class="article_info">';
							contents += '<p class="item_title">';
							contents += '<a href=\"/app/brand/goods_list/' +  json[i].brand + '">' + json[i].brand_nm + '</a>';
							contents += '</p>';
							contents += '<p class="list_info">';
							contents += '<a href="/app/product/detail/' + json[i].goods_no + '/' + json[i].goods_sub + '">' + json[i].goods_nm + '</a>';
							contents += '</p>';
							contents += '<p class="price">' + Comma(json[i].price) + '원</p>';
							contents += '</div>';
							contents += '</div>';
							contents += '</div>';
							contents += '</li>';

						}
						show_area.removeClass("loading");
						input_area.html(contents);
					}
				} else {
					show_area.removeClass("loading");
					show_area.html(contents);
				}
			}
		});
	}
}

// 스토어 좌측하단 단독탭
function getLeftExclusiveList(ul_id,page,item_cnt) {
	var show_area = $("#"+ul_id);

	if(show_area.html() == "") {
		show_area.addClass("loading");

		$.ajax({
			type: "POST",
			data: "page="+page+"&item_cnt="+item_cnt+"&sort=pop",
			url: '/app/svc/get_botton_exclusive',
			success: function(msg) {
				eval("var json = " + msg);
				var contents = "";
				if(json.length > 0) {
					for(var j = 0; j < 6; j++){
						var input_area = $("#exclusive_"+(j+1));
						contents = "";

						for(var k = 0; k < 6; k++){
							var i = (j * 6) + k;

							var brand_nm = checkTextLength(json[i].brand_nm,4);
							contents += '<li class="li_box">';
							contents += '<div class="li_inner">';
							contents += '<div class="list_img">';
							contents += '<a href="/app/product/detail/' + json[i].goods_no + '/' + json[i].goods_sub + '">';

							if(json[i].exclusive_type == "L") {
								contents += '<span class="icon_l">한정</span>';
							} else if(json[i].exclusive_type == "M") {
								contents += '<span class="icon_m">단독</span>';
							} else if(json[i].exclusive_type == "O") {
								contents += '<span class="icon_o">단독</span>';
							}

							contents += '<img src="//image.musinsa.com/images/goods_img/' + json[i].reg_dm + '/' + json[i].goods_no + '/' + json[i].goods_no + '_'+json[i].img_idx+'_70.'+json[i].img_ext+'" alt="' + json[i].brand_nm + '(' + json[i].brand_nm_eng + ') ' + json[i].goods_nm + '">';
							contents += '<span class="vertical_standard"></span>';
							contents += '</a>';
							contents += '</div>';
							contents += '<div class="article_info">';
							contents += '<p class="item_title">';
							contents += '<a href=\"/app/brand/goods_list/' +  json[i].brand + '">' + brand_nm + '</a>';
							contents += '</p>';
							contents += '<p class="list_info">';
							contents += '<a href="/app/product/detail/' + json[i].goods_no + '/' + json[i].goods_sub + '">' + json[i].goods_nm + '</a>';
							contents += '</p>';
							contents += '<p class="price">' + Comma(json[i].price) + '원</p>';
							contents += '</div>';
							contents += '</div>';
							contents += '</div>';
							contents += '</li>';
						}
						show_area.removeClass("loading");
						input_area.html(contents);
					}
				} else {
					show_area.removeClass("loading");
					show_area.html(contents);
				}
			}
		});
	}
}

/********************************
 *	상단 장바구니 관련 스크립트	*
 ********************************/
$(document).ready(function() {
	var cart_setTime = "";
	$("#cart").mouseenter(function () {
		$("#cart").addClass("activityInfo activity_cart");
		$("#cart").removeClass("cart_list");
		$(".activity_cart_box").show();
		cart_setTime = setTimeout("getSlideCart('N');", 500);
	});

	$("#cart").mouseleave(function() {
		$(".activity_cart_box").hide();
		$("#cart").removeClass("activityInfo activity_cart");
		$("#cart").addClass("cart_list");
		clearTimeout(cart_setTime);
	});
});


/**
 *장바구니 레이어 데이터 출력
 * @param string direct 데이터 바로 갱신 여부
 */
function getSlideCart(direct) {
	if(direct == "Y") {
		is_loading = true;
	} else {
		is_loading = ($("#mini_cart > li").length == "0") ? true : false ;
	}

	if(is_loading) {
		$.ajax({
			type: "POST",
			url: "/app/order/slide_cart",
			success: function(msg) {
				$("#mini_cart").html(msg);
				$("#cart_list_cycle").cycle({
					fx : 'none',
					speed : 500,
					timeout: 0,
					next : '#cart_list_next',
					prev : '#cart_list_prev'
				});
			}
		});
	}
}

// 최근 본 상품 얻기 (정렬순으로 얻을때 사용)
function getViewedGoodsList(opt_kind_cd) {
	if(opt_kind_cd != "") {
		var div_id = opt_kind_cd + "_viewed_list";
		var menu_id = opt_kind_cd + "_viewed_menu";
	} else {
		var div_id = "viewed_list";
		var menu_id = "viewed_menu";
	}

	if(opt_kind_cd != "" && $("#" + div_id).html() == undefined) {
		$.ajax({
			type: "GET",
			url: "/app/svc/get_viewed_goods_list",
			data: "opt_kind_cd=" + opt_kind_cd,
			success: function(msg) {
				eval("var json = " + msg);
				$("<div id='" + div_id + "' style='height: 415px; overflow:hidden'></div>").appendTo("#viewed_area");
				var data = "";
				data += "<ul class=\"top_view_product2\">";
				for(var i=0; i<json.length; i++) {
					if(i > 0 && i % 8 == 0) {
						data += "</ul>";
						data += "<ul class=\"top_view_product2 column\">";
					}
					data += "<li class=\"top_viewed_list hover_box\" goods_no=\"" + json[i].goods_no + "\">";
					data += "<div class=\"view_50 view_70\">";
					data += "<a href=\"#\" class=\"view_close\" onclick=\"deleteViewedList('" + json[i].goods_no + "', '" + json[i].goods_sub + "'); return false;\"><img src=\"/skin/musinsa/images/btn_quickcart_delete.gif\" alt=\"x\" /></a>";
					data += "<a href=\"/app/product/detail/" + json[i].goods_no + "/" + json[i].goods_sub + "\"><img src=\"//image.musinsa.com/images/goods_img/" + json[i].reg_dm + "/" + json[i].goods_no + "/" + json[i].goods_no + "_" + json[i].img_idx + "_70." + json[i].img_ext + "\" alt=\"" + json[i].brand_nm + " " + json[i].goods_nm + "\" /><span class=\"vertical_standard\"></span></a>";
					data += "</div>";
					data += "<dl class=\"view_70_info\">";
					data += "<dt class=\"tit_brand\">[" + json[i].brand_nm + "]</dt>";
					if(json[i].goods_nm.length > 20) {
						data += "<dd class=\"view_70_desc\">" + json[i].goods_nm.substr(0, 20) + "...</dd>";
					} else {
						data += "<dd class=\"view_70_desc\">" + json[i].goods_nm + "</dd>";
					}
					if(json[i].normal_price > json[i].price) {
						data += "<dd><span class=\"txt_price_origin\"> " + Comma(json[i].normal_price) + "원</span> <span class=\"txt_price_sale\">" + Comma(json[i].price) + "원</span></dd>";
					} else {
						data += "<dd><span class=\"txt_price_sale\">" + Comma(json[i].price) + "원</span></dd>";
					}
					data += "</dl>";
					data += "</li>";
				}
				if(data != "") {
					data += "</ul>";
					$("#" + div_id).html(data);
				}
			},
			complete: function() {
				//영역 처리
				$("#viewed_area > div").hide();
				$("#" + div_id).show();
			}
		});
	} else {
		//영역 처리
		$("#viewed_area > div").hide();
		$("#" + div_id).show();
	}

	//메뉴 처리
	$("#viewed_area li").removeClass("active");
	$("#" + menu_id).removeClass("active");
	$("#" + menu_id).addClass("active");
}

// 최근 본 상품 삭제
function deleteViewedList(goods_no, goods_sub) {
	$.ajax({
		url: "/app/svc/del_viewed_list/" + goods_no + "/" + goods_sub,
		success: function(msg) {
			if(msg == "1") {
				$("li").attr("goods_no", function(i, val) {
					if(val == goods_no) {
						if($(this).parent().next().html() != undefined) {
							$(this).parent().append($(this).parent().next().children("li").eq(0));
							if($(this).parent().next().children("li").length == 0) {
								$(this).parent().next().remove();
							}
						}
						$(this).remove();
					}
				});
			}
		}
	});
}

// 장바구니 삭제
function deleteCartList(cart_no) {
	$.ajax({
		url: "/app/svc/delete_cart/" + cart_no,
		success: function(msg) {
			$("li").attr("cart_no", function(i, val) {
				if(val == cart_no) {
					if($(this).parent().next().html() != undefined) {
						$(this).parent().append($(this).parent().next().children("li").eq(0));
						if($(this).parent().next().children("li").length == 0) {
							$(this).parent().next().remove();
							$(this).parent().parent().cycle('stop');
						}
					}
					$(this).remove();
					var cart_total = Number($(".cart-count").html());
					$(".cart-count").html(cart_total-1);
					// 퀵메뉴 장바구니 카운트 제어
					if($(".quick-cart-count").html() == "" || $(".quick-cart-count").html() == "0"){
						$(".quick-cart-count").css('display','none');
					}else{
						$(".quick-cart-count").css('display','block');
					}
				}
			});
		}
	});
}

// 최근 본 브랜드 삭제
function deleteViewedBrandList(brand) {
	var viewd_id = "viewed_brand_" + brand;

	$.ajax({
		url: "/app/svc/del_viewed_brand_list/" + brand,
		success: function(msg) {
			if(msg == "1") {
				$("#" + viewd_id).remove();
			}
		}
	});
}

// 장바구니, 최근 본 상품 레이어 변경.
function changeCartLayer(kind) {
	$("#kind_area > span").removeClass("active");
	$("#cart_layer").hide();
	$("#viewed_goods_layer").hide();
	if(kind == "cart") {
		$("#kind_area > span").eq(0).addClass("active");
		$("#cart_layer").show();
	} else if(kind == "viewed_goods") {
		$("#kind_area > span").eq(1).addClass("active");
		$("#viewed_goods_layer").show();
	}

}

// 로그인 페이지 이동
function goLogin() {
	document.location.href = 'https://www.musinsa.com/?mod=login&referer=' + encodeURIComponent(window.location.href);
}


/****************************
 *	연관브랜드 관련 스크립트	*
 ****************************/
$(document).ready(function(){
	$(".more_ico").click(function() {
		if($(this).hasClass("brandLayerOpen")) {	// 열린 상태
			setMoreBrandList($(this).attr("id"), $(this).attr("show_cnt"));
			$(this).removeClass('brandLayerOpen');
			$(this).find("img").css("margin-top", "0");
		} else {	// 닫힌 상태
			$(this).parents("dl.list_division_brand").find("li.brand_list").removeClass("hided");
			$(this).addClass('brandLayerOpen');
			$(this).find("img").css("margin-top", "-20px");
		}
	});

	$(".brandNameOff").hover(
		function() {
			$(this).hide();
			$(this).next(".brandNameOn").show();
		},
		function() {
		}
	);
	$(".brandNameOn").hover(
		function() {
		},
		function() {
			$(this).hide();
			$(this).prev(".brandNameOff").show();
		}
	);
});

function getBrandByCategory(cat_type, d_cat_cd, sex, sort, cat_cnt, select_brand) {
	if(sort == "name") {
		$(".division_article_cell").removeClass("select");
		$(".division_article_cell2").addClass("select");
	} else {
		$(".division_article_cell").addClass("select");
		$(".division_article_cell2").removeClass("select");
	}

	if(cat_cnt > 0) {
		$.ajax({
			type: "POST",
			url: "/app/svc/get_brand_by_category",
			data: "cat_type=" + cat_type + "&d_cat_cd=" + d_cat_cd + "&sex=" + sex + "&sort=" + sort + "&select_brand=" + select_brand,
			success: function(msg) {
				eval("var json = " + msg);
				var data = "";
				if(json.all.length > 0) {
					for(var i=0; i<json.all.length; i++) {
						var class_select = "";
						if(json.all[i].selected == 1) {
							class_select = " selected";
						}
						data += "<li class=\"brand_list" + class_select + "\">";
						data += "<a href=\"#\" onClick=\"searchMultiBrand('" + json.all[i].brand + "', 'add'); return false;\">";
						data += "<span class=\"brand_name brandNameOff\">" + json.all[i].brand_nm + "</span>";
						data += "<span class=\"brand_name brandNameOn\" style=\"display:none\">" + json.all[i].brand_nm_eng + "</span>";
						data += "<span class=\"txt_product_count\">(" + Comma(json.all[i].cnt) + ")</span>";
						data += "</a>";
						if(json.all[i].sale_cnt > 0) {
							data += "&nbsp;<span class=\"txt_sale_division\">SALE</span>";
						}
						if(json.all[i].new_cnt > 0) {
							data += "&nbsp;<span class=\"txt_new_division\">NEW</span>";
						}
						if(json.all[i].selected == 1) {
							data += "<a href=\"#\" onClick=\"searchMultiBrand('" + json.all[i].brand + "', 'del'); return false;\" ><span class=\"delete-btn-red\">X</span></a>";
						}
						data += "</li>";
					}
				} else {
					data = "<li class=\"division_brand_empty\">브랜드가 없습니다.</li>";
				}

				$("#brand_list_area").html(data);
				SearchBrandByCategory();
			}
		});
	}
}


function SearchBrandByCategory() {
	var q = $("#search_brand_input").val();

	if(q != "") {
		$("#interest_brand_list").hide();
		$("#best_brand_list").hide();
	} else {
		$("#interest_brand_list").show();
		$("#best_brand_list").show();
	}

	q = q.toUpperCase();
	ql = q.substr(q.length-1,1);
	if((ql >= 'ㄱ' && ql <= 'ㅎ') || (ql >= 'ㅏ' && ql <= 'ㅣ')) {
		return;
	}

	var brands = $("ul#brand_list_area li");

	for(var i=0; i<brands.length; i++) {
		var brand = $(brands[i]).children("a");
		var brand_txt = $(brand).children("span.brand_name").text();
		brand_txt.toUpperCase();
		if(brand_txt.indexOf(q) >= 0){
			$(brands[i]).addClass("brand_list");
			$(brands[i]).removeClass("hided");
		} else {
			$(brands[i]).removeClass("brand_list");
			$(brands[i]).addClass("hided");
		}
	}

	if(!$("#more_ico_all").hasClass("brandLayerOpen")) {
		setMoreBrandList("more_ico_all", 21);
	}
}

function setMoreBrandList(more_id, show_cnt) {
	$("#" + more_id).find("img").css("margin-top", "0");
	$("#" + more_id).removeClass("brandLayerOpen");

	var active_brands = $("#" + more_id).parents("dl.list_division_brand").find("li.brand_list");

	for(var i=0; i<active_brands.length; i++) {
		if(i < show_cnt) {
			$(active_brands[i]).removeClass("hided");
		} else {
			$(active_brands[i]).addClass("hided");
		}
	}
}

function write_size(size_type) {
	if(!loginChk()) {
		alert("로그인하여 주십시오.");
	} else {
		if(confirm("최근 구매 내역 중 실측을 고르시겠습니까?\n취소를 선택시 마이사이즈메뉴로 이동됩니다.")) {
			size_order_list(size_type);
		} else {
			window.open('/app/mypage/mysize/' + size_type , 'size');
		}
	}
}

function size_order_list(size_type) {
	var div_id = "pop_order_size";

	$.ajax({
		type: "POST",
		url: "/app/mypage/size_order_list/" + size_type,
		success: function(msg) {
			$("#" + div_id).html(msg);

			var top = Math.max(0, (($(window).height() - $("#" + div_id).outerHeight()) / 2) + $(window).scrollTop()) + "px";
			$("#" + div_id).css("top", top);

			$("#" + div_id).show();

			$("#" + div_id).jqm();
			$("#" + div_id).jqmShow();
		}
	});
}

function set_size_info(size_type) {
	var obj = $("input[name=sel_product]");
	var idx = "";
	var contents = "";
	var mypage_yn = $("input[name=mypage_yn]").val();

	for(var i=0; i<obj.length; i++) {
		if(obj.eq(i).is(":checked")) {
			idx = i;
			break;
		}
	}

	if(idx != "0" && idx == "") {
		alert("적용 할 상품을 선택해 주세요");
		return false;
	}

	if(mypage_yn == "Y") {
		for(var j=0; j< $("input[name=size_"+ idx + "]").length; j++) {
			var size = $("input[name=size_"+ idx + "]").eq(j).val();
			size = (size == "") ? 0 : $("input[name=size_"+ idx + "]").eq(j).val();
			$("input[name=size_val]").eq(j).val(parseInt(size));
		}
	} else {
		contents = "<th>MY</th>";
		for(var i=0; i < $("input[name=size_"+ idx + "]").length; i++) {
			contents += "<td class=\"mysize_val\">" + $("input[name=size_"+ idx + "]").eq(i).val() + "</td>"
		}

		$("#mysize").html(contents).promise().done(function() {
			$("#save_mysize").show();
		});
	}

	var div_id = "pop_order_size";
	$("#" + div_id).hide();
	$("#" + div_id).jqmHide();
}

function save_size(size_type) {
	var size_info = "";		// 타입별 사이즈 정보(타입번호|아이템|사이즈)
	var size_val = $(".mysize_val");
	var item_val = $(".item_val");

	if(size_type != "") {
		for(var i=0; i<size_val.length; i++) {
			size_info += size_type + "|" + trim(item_val.eq(i).text()) + "|" + trim(size_val.eq(i).text()) + "\n";
		}
	}

	var param = "size_info=" + size_info + "&type_no=" + size_type;
	$.ajax({
		type: "POST",
		url: "/app/mypage/save_size",
		data: param,
		success: function(msg) {
			if(msg == "1") {
				alert("사이즈가 정상적으로 저장되었습니다.");
				$("#save_mysize").hide();
			} else if(msg == "-1") {
				alert("로그인 후 사용할 수 있습니다.");
			} else {
				alert("사이즈 저장 시 문제가 발생했습니다.\n관리자에게 문의해 주시기 바랍니다.");
			}
		}
	});
}

function showPopNotice(div_id, idx, popup_type) {
	if(document.getElementById(div_id)) {
		if(popup_type == "B" || popup_type == "C") {
			var img_src = $("#pop_contents" + idx + " img").attr("src");

			if(img_src != undefined) {
				var imgObj = new Image();
				imgObj.src = img_src;

				imgObj.onload = function() {
					var pop_width = imgObj.width + 24;
					if(pop_width > 24){
						$("#" + div_id).width(pop_width);
					}
				}
			}
		}

		cookiedata = document.cookie;
		if(cookiedata.indexOf(div_id + "=done") < 0) {
			document.getElementById(div_id).style.display = "";
		}
	}
}

function closePopNotice(div_id, cookie_yn) {
	if(cookie_yn == "Y") {
		setCookie( div_id, "done" , 1 );  //팝업1 쿠키 생성
	}

	document.getElementById(div_id).style.display = "none";
}

var click_flag = true;

function toggleFavoriteBrand(brand, obj){
	var musinsa_domain = window.location.hostname;

	if(musinsa_domain.substr(0,2) == "ls" || musinsa_domain.substr(0,2) == "lm" || musinsa_domain.substr(0,2) == "ds" || musinsa_domain.substr(0,2) == "dm") {
		var query_url = "//dwww.musinsa.com/query.php";
	} else {
		var query_url = "//www.musinsa.com/query.php";
	}

	if($(obj).hasClass("brandSave")) {
		// 공통 좌측 영역의 좋아요 아이콘을 클릭한 경우
		if($(obj).hasClass("saved")) {
			var query_mode = "favoriteBrandDelete";
		} else {
			var query_mode = "favoriteBrandInsert";
		}
	} else if($(obj).attr("id") == "interest_Y"){
		// 브랜드 상단 내비게이션의 좋아요 취소 아이콘을 클릭한 경우
		var query_mode = "favoriteBrandDelete";
	} else if($(obj).attr("id") == "interest_N") {
		// 브랜드 상단 내비게이션의 좋아요 아이콘을 클릭한 경우
		var query_mode = "favoriteBrandInsert";
	} else {
		// 마이페이지 - 브랜드 페이지에서 좋아요 아이콘을 클릭한 경우
		if($(obj).parent().hasClass("active")){
			var query_mode = "favoriteBrandDelete";
		} else {
			var query_mode = "favoriteBrandInsert";
		}
	}

	if(click_flag) {
		click_flag = false;

		$.ajax({
			type: "GET",
			url: query_url,
			data: "mode=" + query_mode + "&local=2&brand=" + brand + "&callback=mohallo",
			dataType: "jsonp",
			jsonpCallback : "mohallo",
			success: function(data){
				if ( data.cd == '1' ) {
					if($(obj).hasClass("brandSave")) {
						// 공통 좌측 영역의 좋아요 아이콘을 클릭한 경우
						if(query_mode == "favoriteBrandInsert") {
							$(obj).addClass("saved");
							if($(".box-btn-leftbottom").length > 0) {
								if($('input:hidden[name=like_brand_code]').length > 0){
									if($('input:hidden[name=like_brand_code]').val() == brand){
										$(".box-btn-leftbottom > .btn-like-left").addClass("active");
										$("#interest_Y").show();
										$("#interest_N").hide();
										$(".text_interest_off").removeClass("text_interest_off").addClass("text_interest_on");
										var like_cnt = parseInt(unComma($('.icon_interest .text_interest_on').text())) + 1;
										$('.icon_interest .text_interest_on').text(Comma(like_cnt) + " 좋아요");
									}
								}

							}
						} else {
							$(obj).removeClass("saved");
							if($(".box-btn-leftbottom").length > 0) {
								if($('input:hidden[name=like_brand_code]').length > 0){
									if($('input:hidden[name=like_brand_code]').val() == brand){
										$(".box-btn-leftbottom > .btn-like-left").removeClass("active");
										$("#interest_Y").hide();
										$("#interest_N").show();
										$(".text_interest_on").removeClass("text_interest_on").addClass("text_interest_off");
										var like_cnt = parseInt(unComma($('.icon_interest .text_interest_off').text())) - 1;
										$('.icon_interest .text_interest_off').text(Comma(like_cnt) + " 좋아요");
									}
								}
							}
						}
					} else if($(obj).attr("id") == "interest_Y" || $(obj).attr("id") == "interest_N") {
						// 브랜드 상단 내비게이션의 좋아요 아이콘을 클릭한 경우
						if(query_mode == "favoriteBrandInsert") {
							$("#interest_Y").show();
							$("#interest_N").hide();
							$(".text_interest_off").removeClass("text_interest_off").addClass("text_interest_on");
							if($(".box-btn-leftbottom").length > 0) {
								$(".box-btn-leftbottom > .btn-like-left").addClass("active");
							}
							var like_cnt = parseInt(unComma($(obj).parent().find("span").text())) + 1;
							if($(obj).hasClass("like-event-num")){
								$(obj).parent().find("span").text(Comma(like_cnt) + "");
								$(obj).parent().find("span").css("color","#f33");
							} else {
								$(obj).parent().find("span").text(Comma(like_cnt) + " 좋아요");
							}
							if($("#selectBrand .brandSave").length > 0 && $("#selectBrand .brandSave").hasClass('saved') == false){
								$("#selectBrand .brandSave").addClass('saved');
							}
						} else {
							$("#interest_Y").hide();
							$("#interest_N").show();
							$(".text_interest_on").removeClass("text_interest_on").addClass("text_interest_off");
							if($(".box-btn-leftbottom").length > 0) {
								$(".box-btn-leftbottom > .btn-like-left").removeClass("active");
							}
							var like_cnt = parseInt(unComma($(obj).parent().find("span").text())) - 1;
							if($(obj).hasClass("like-event-num")){
								$(obj).parent().find("span").text(Comma(like_cnt) + "");
								$(obj).parent().find("span").css("color","");
							} else {
								$(obj).parent().find("span").text(Comma(like_cnt) + " 좋아요");
							}

							if($("#selectBrand .brandSave").length > 0 && $("#selectBrand .brandSave").hasClass('saved') == true){
								$("#selectBrand .brandSave").removeClass('saved');
							}
						}
					} else {
						// 마이페이지 - 브랜드 페이지에서 좋아요 아이콘을 클릭한 경우
						if(query_mode == "favoriteBrandInsert") {
							$(obj).parent().addClass("active");
							if($(".box-btn-leftbottom").length > 0) {
								$(".box-btn-leftbottom > .btn-like-left").addClass("active");
							}
							var like_txt = $(obj).text();
							if(like_txt.indexOf("만") <= 0) {
								var like_cnt = parseInt(unComma($(obj).text())) + 1;
								$(obj).html(Comma(like_cnt) + "<span class=\"vertical_standard\"></span>");
							}
						} else {
							$(obj).parent().removeClass("active");
							if($(".box-btn-leftbottom").length > 0) {
								$(".box-btn-leftbottom > .btn-like-left").removeClass("active");
							}
							var like_txt = $(obj).text();
							if(like_txt.indexOf("만") <= 0) {
								var like_cnt = parseInt(unComma($(obj).text())) - 1;
								$(obj).html(Comma(like_cnt) + "<span class=\"vertical_standard\"></span>");
							}
						}
					}
				} else if ( data.cd == '-1' ) {
					// 로그인이 아닐 경우
					document.location.href = 'https://www.musinsa.com/?mod=login&referer=' + encodeURIComponent(window.location.href);
					return false;
				} else if ( data.cd == '-2' ) {
					// 브랜드 정보가 없을 경우
					alert("브랜드 정보가 없습니다.");
				} else if ( data.cd == '-3' ) {
					// 좋아요 추가 시 좋아요 데이터가 이미 있거나 좋아요 삭제 시 좋아요 데이터가 없는 경우
					if(query_mode == "favoriteBrandInsert") {
						alert("이미 좋아요 추가된 브랜드입니다.");
					} else {
						alert("좋아요 추가되지 않은 브랜드입니다.");
					}
				}

				click_flag = true;
			},
			error : function(e) {
				alert("브랜드 좋아요에 실패했습니다.");
				click_flag = true;
			}
		});
	}
}

// share layer
function showSharePop() {
	var div_id = "layer_share";

	var top = Math.max(0, (($(window).height() - $("#" + div_id).outerHeight()) / 2) + $(window).scrollTop()) + "px";
	$("#" + div_id).css("top", top);

	$("#" + div_id).jqm();
	$("#" + div_id).jqmShow();
}

function closeSharePop() {
	var div_id = "layer_share";
	$("#" + div_id).hide();
	$("#" + div_id).jqmHide();
}

function shareOnSns(sns,sbj,url)
{
	var snsset = new Array();

	snsset['t'] = 'https://twitter.com/intent/tweet?text=' + sbj + '&url=' + encodeURIComponent(url);
	snsset['f'] = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(url) + '&t=' + sbj;
	window.open(snsset[sns]);
}

function searchMultiPrice(price, cmd) {

	var prices = document.f1.price.value;

	// 입력과 클릭 검색 구분 위해서, input에 입력받은 값은 비워준다.
	if( document.f1.price1.value != "" || document.f1.price2.value != "") {
		document.f1.price1.value = "";
		document.f1.price2.value = "";
		document.f1.price.value = "";
		prices = "";
	}

	var a_price = prices.split(",");

	if(cmd == "add") {

		if(prices.indexOf(price) == "-1") {	// 이미 선택된 브랜드가 아닐 경우만 추가
			prices += (prices == "") ? price : "," + price;
		}
	} else if(cmd == "del") {
		prices = "";
		for(var i=0; i<a_price.length; i++) {
			if(a_price[i] != price) {
				prices += (prices == "") ? a_price[i] : "," + a_price[i];
			}
		}
	}

	getGoodsList(document.f1, document.f1.price, prices, 'Y');
}

function relocationScroll(str_obj) {
	var scroll_top = parseInt($(str_obj).offset().top) -10;
	$( 'html, body' ).stop().animate( { scrollTop : scroll_top }, 500 );
}

function checkTextLength(text,limit){
	if(text.length > limit){
		text = text.substr(0,limit)+"...";
	}
	return text;
}

// 단독, 스텐다드 탭 컨트롤
function contentsTab(obj, id) {
	$(".contents_tab > li").removeClass('active');
	$(obj).addClass('active');
	$(".contents_tab_area").removeClass('active');
	$("#" + id +"_area").addClass('active');
}
