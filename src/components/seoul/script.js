<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, user-scalable=no"></meta>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />	<title>
		Payments	</title>
	<script type="text/javascript" src="https://d3ulhu45f99mlj.cloudfront.net/js/json3.min.js"></script>
	<script type="text/javascript" src="https://d3ulhu45f99mlj.cloudfront.net/js/jquery-1.10.2.min.js"></script></head>
<body>
	<div id="container">
		<div id="header">
		</div>
		<div id="content">

			
			<style type="text/css">
#naver-progress {display: none;}

#naver-progress .overlay {
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
}

#naver-progress .message-box {
	position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -80px;
  margin-top: -50px;
  text-align: center;
}

#naver-progress .message-box .inner {
	padding: 20px;
	background-color: #e9ecef;
}

#naver-progress .message-box .loading {
  display: block;
  width: 32px;
  height: 8px;
  background: url("/img/naverpay_sdk_square_x1.gif") no-repeat 0 0;
  margin: 26px 44px;
}
</style>

<script type="text/javascript">
(function(window) {
	var document = window.document;

	function _response(action, data, source, origin) {
		var msg = {
			action : action,
			data : data
		};
		var obj = JSON.stringify(msg); //받는 쪽에서 parse하므로 string이라도 stringify해서 넘김

		source.postMessage(obj, '*');
	}

	function on_message(e) {
		var obj = {},
			action = null,
			data = null,
			request_id = null;
		var source = e.source;
		var origin = e.origin;

		try {
			obj = JSON.parse(e.data);
			action = obj.action;
			data = obj.data || {};
			request_id = data.request_id;
			origin = obj.origin || origin;
		} catch(e) {}

		if ( action == 'payment' ) {
			var custom_data = JSON.stringify(data.custom_data);

			//IE opener 유실 문제를 통제하기가 어려워서 PC버전에서는 SDK방식의 팝업모드를 지원하지 않는다.

			$.ajax({
				type : 'POST',
				url : data.naverV2 ? '/npay/prepare.json' : '/naver_payments/prepare.json',
				dataType : 'json',
				data : {
					channel : 'pc',
					provider : 'naverpay',
					pay_method : data.pay_method, //service DB에는 원본 
					escrow : data.escrow,
					amount : data.amount,
					vat : data.vat,
					tax_free : data.tax_free,
					name : data.name,
					merchant_uid : data.merchant_uid,
					user_code : 'imp70025368',
					tier_code : data.tier_code,
					request_id : request_id,
					pg_id : 'seoulstore',
					buyer_name : data.buyer_name,
					buyer_email : data.buyer_email,
					buyer_tel : data.buyer_tel,
					buyer_addr : data.buyer_addr,
					buyer_postcode : data.buyer_postcode,
					customer_uid : data.customer_uid,
					origin : origin,
					m_redirect_url : data.m_redirect_url,
					custom_data : custom_data,
					notice_url : data.notice_url,
					_extra : {
						popupMode : !!data.naverPopupMode && !data.naverV2,
						layerMode : !!data.naverV2,
						naverProducts : data.naverProducts,
						cultureBenefit : data.naverCultureBenefit,
						useCfm : data.naverUseCfm,
						origin : origin
					}
				},
				error : function(xhr, status, err) {
					return _response('', {
						success:false, 
						request_id:request_id, 
						error_code:'HTTP_ERROR:' + xhr.status, 
						error_msg:'결제 시작을 위해 서버와 통신하는 중 에러가 발생하였습니다'
					}, source, origin);
				}
			}).done(function(rsp) {
				if ( rsp.code == 0 ) {
					if ( data.naverV2 ) {
						//productName은 40자 crop 되지 않도록 원본 그대로 전달
						var proxyData = {
							impUid : rsp.data.impUid,
							mode : rsp.data.sandbox ? "development" : "production",
							clientId : rsp.data.clientId,
							payType : data.customer_uid ? "recurrent" : "normal",
							openType : "layer",
							productName : data.name,
							totalPayAmount : rsp.data.totalPayAmount,
							taxScopeAmount : rsp.data.taxScopeAmount,
							taxExScopeAmount : rsp.data.taxExScopeAmount,
							returnUrl : rsp.data.returnUrl,
							productCount : rsp.data.productCount,
							productItems : rsp.data.productItems,
							extraDeduction : rsp.data.extraDeduction,
							useCfmYmdt : rsp.data.useCfmYmdt,
							requestId : request_id
						};

						_response('naverpay.modal.v2', proxyData, source, origin);
					} else {
						if ( !data.naverPopupMode && !data.m_redirect_url ) {
							return _response('', {
								success:false, 
								request_id:request_id, 
								error_code:"MISSINGPARAM",
								error_msg:"naverPopupMode : true가 아닌 경우에는 m_redirect_url이 필요합니다."
							}, source, origin);
						}

						var proxyData = {
							impUid : rsp.data.impUid,
							payUrl : rsp.data.payUrl,
							popupMode : data.naverPopupMode
						};

						_response('naverpay.modal', proxyData, source, origin);
					}
				} else {
					_response('', {
						success:false, 
						request_id:request_id, 
						error_code:rsp.data.error_code, 
						error_msg:rsp.data.error_msg
					}, source, origin);
				}
			});
		} else if ( action === 'communicate' && data ) {
			if ( data.result === 'check.closing' ) { //popup 닫기가 감지된 경우. 서버체크 필요
				location.href = '/naver_payments/closing/' + data.imp_uid + '/' + request_id;//최초 request의 request_id가 postMessage로 전달됨
			} else if ( data.result === 'request.approve' ) {
				$("#naver-progress").show();

				var params = [
							["resultCode", encodeURIComponent(data.authData.resultCode)].join("="),
							["resultMessage", encodeURIComponent(data.authData.resultMessage)].join("="),
							["reserveId", encodeURIComponent(data.authData.reserveId)].join("="),
							["paymentId", encodeURIComponent(data.authData.paymentId)].join("=")
						],
						sep = data.return_url.indexOf("?") ? "&":"?";

				location.href = data.return_url + sep + params.join("&");
			}
		}
	}

	if (window.addEventListener) {  // all browsers except IE before version 9
		window.addEventListener ("message", on_message, false);
	} else {
		if (window.attachEvent) {   // IE before version 9
			window.attachEvent("onmessage", on_message);
		}
	}
}).call({}, window);
</script>

<div id="naver-progress">
	<div class="overlay"></div>
	<div class="message-box">
		<div class="inner">
			<div class="loading"></div>
		</div>
	</div>
</div>		</div>
		<div id="footer">
		</div>
	</div>
</body>
</html>
