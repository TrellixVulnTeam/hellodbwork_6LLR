/*
 ========================================
 G1 UI Guide | BABA SHOP
 ========================================
 @author         :  모니카
 @version        :   v0.15
 */

var check_mobile;
var check_keyup;
var keyup_Valid = true;

function initOrderSheet() {
    if ($('form.parsleyForm').size() < 1) {
        return;
    }
    var parsleyConfig = {
        errorsContainer: function (parsleyField) {
            var fieldSet = parsleyField.$element.closest(".psl-check");
            return fieldSet.find('.checkbox-errors');
        }
    };

    $('form.parsleyForm').parsley(parsleyConfig);
}

function overLayerPopup() {
    $(".overBox").on({
        mouseenter: function () {
            var $overlayer = $(this).find(".overLayer");
            $overlayer.show();
        }, mouseleave: function () {
            $(".overLayer").hide();
        }
    });
}

$(window).on("load", function () {

    initOrderSheet();

    //$(".order .check-all input[type='checkbox']").trigger("click");

    $(window).resize(function () {
        check_mobile = $("body").hasClass("mobile");

        if (check_mobile == false) {
            overLayerPopup();
        }
    });

});

function initCommon2() {
    $(".inputNoSpace").focusout(function () {
        var getText = $(this).val().replace(/\s/gi, '');
        $(this).val(getText);
    });

    $(".inputWrap .input-control").on({
        focusin: function () {
            $(this).parent().parent().find(".inputLayer").slideDown();
        }, focusout: function () {
            $(this).parent().parent().find(".inputLayer").slideUp();
        }
    });

    $(".input-control input").on({
        focusin: function () {
            $(this).parent().css("border-color", "#dbbca0");
        }, focusout: function () {
            $(this).parent().css("border-color", "#777");
        }
    });

    $(".select-control select").on({
        focusin: function () {
            $(this).css("border-color", "#dbbca0");
        }, focusout: function () {
            $(this).css("border-color", "#777");
        }
    });

    $("#newPassword").keyup(function () {
        check_keyup = $(this).val();
        var $find_inputLayer = $(this).parent().next(".inputLayer");

        var reg = /^(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^*]).{8,20}$/;
        var exreg = /[^0-9a-zA-Z~!@#$%^*]/;

        var result = reg.test(check_keyup) && !exreg.test(check_keyup);

        checkStringFormat(check_keyup);

        if (result == false || check_keyup.length < 8) {
            $find_inputLayer.find("span").removeClass("on");
            $find_inputLayer.find("span.red").addClass("on");
        } else {
            $find_inputLayer.find("span").removeClass("on");
            $find_inputLayer.find("span.green").addClass("on");
        }

    });
    
    //	2017-11-16	/	mass	/	비밀번호 check 기능 추가 
    //	albus까 빼먹은 기능에 keyup 기능 추가함
    $("#pwd").keyup(function () {
        check_keyup = $(this).val();
        var $find_inputLayer = $(this).parent().next(".inputLayer");

        var reg = /^(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^*]).{8,20}$/;
        var exreg = /[^0-9a-zA-Z~!@#$%^*]/;

        var result = reg.test(check_keyup) && !exreg.test(check_keyup);

        checkStringFormat(check_keyup);

        if (result == false || check_keyup.length < 8) {
            $find_inputLayer.find("span").removeClass("on");
            $find_inputLayer.find("span.red").addClass("on");
        } else {
            $find_inputLayer.find("span").removeClass("on");
            $find_inputLayer.find("span.green").addClass("on");
        }

    });    

	//2017-11-30 통합회원약관 추가로 인해 수정 - buzz
    $(".join-area .agree-area input").click(function () {
        var check_length = $(".agree-area input:checked").length;
        if (check_length >= 3) {
            $(".all-agree input[type='checkbox']").trigger("click");
        }
    });

    //textarea 바이트 계산
    var maxcount = 2000;
    var $count = $('.byteCheckNum', this);
    var $textareaByte = $(".byteChekTextbox");

    var updateByte = function () {
        var before = $count.text() * 1;
        var str_len = $textareaByte.val().length;
        var cbyte = 0;
        var li_len = 0;
        for (i = 0; i < str_len; i++) {
            var ls_one_char = $textareaByte.val().charAt(i);
            if (escape(ls_one_char).length > 4) {
                cbyte += 2;
            } else {
                cbyte++;
            }
            if (cbyte <= maxcount) {
                li_len = i + 1;
            }
        }

        if (parseInt(cbyte) > parseInt(maxcount)) {
            //alert('허용된 글자수가 초과되었습니다.');
            var str = $textareaByte.val();
            var str2 = $textareaByte.val().substr(0, li_len);
            $textareaByte.val(str2);
            var cbyte = 0;
            for (i = 0; i < $textareaByte.val().length; i++) {
                var ls_one_char = $textareaByte.val().charAt(i);
                if (escape(ls_one_char).length > 4) {
                    cbyte += 2;
                } else {
                    cbyte++;
                }
            }
        }
        $count.text(cbyte);
    };

    $textareaByte.bind('input keyup keydown paste change', function () {
        setTimeout(updateByte, 0)
    });

    var this_class = $(".content").hasClass("CS-inquiry");
  
    if (this_class == true) {
        updateByte();
    }
}
$(function () {
    initCommon2();
    return false;
});

function checkStringFormat(check_keyup) {
    var reg = /^(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^*]).{8,20}$/;
    var exreg = /[^0-9a-zA-Z~!@#$%^*]/;

    var result = !reg.test(check_keyup) && exreg.test(check_keyup);

    if (result == false) {
        keyup_Valid = false;
    } else {
        keyup_Valid = true;
    }

    return keyup_Valid;
}

function inputOnlyNum(event) {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    // keyID 9 : tab
    if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37
        || keyID == 39 || keyID === 9) {
        return;
    }
    else {
        return false;
    }
}

function noPressHan(obj) {
    if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39
        || event.keyCode == 46) {
        return;
    }
    obj.value = obj.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
}
$(function () {
    $(".page-nav .page-control > a").click(function () {
        $(".page-nav .page-control > a").removeClass("select");
        $(this).addClass("select");
        return false;
    });
    $(".CS-faq .tabBox ul li").click(function () {
        $(".CS-faq .tabBox ul li").removeClass("active");
        $(this).addClass("active");
        return false;
    });
});
function renderCSNotice() {
    var $cs_faq = $(".CS-container .CS .fold-control");
    $cs_faq.click(function () {
        var hasClass_on = $(this).parent().hasClass("on");

        $cs_faq.find(".line1").css({
            "text-overflow": "ellipsis",
            "overflow": "hidden",
            "white-space": "nowrap",
            "height": "18px"
        })
        if (hasClass_on == true) {
            $cs_faq.parent().removeClass("on");
            $(this).next().slideUp();
            $(this).find(".line1").css({
                "text-overflow": "ellipsis",
                "overflow": "hidden",
                "white-space": "nowrap",
                "height": "18px"
            });
        } else {
            $cs_faq.parent().removeClass("on");
            $cs_faq.next().slideUp();
            $(this).parent().addClass("on");
            $(this).next().slideDown();

            $(this).find(".line1").css({
                "text-overflow": "initial",
                "overflow": "visible",
                "white-space": "normal",
                "height": "auto"
            });
        }
    });
}

$(function () {
    //renderCSNotice();

});

var resizeW, latlng;
var getStoreName = ""
var windowW = $(window).width();
var store_id = "",
    $store_link = "";

sizeCheck();

var content_class = $(".content").hasClass("CS-store");
function viewMap(_this) {
    sizeCheck();

    $store_link = $(_this);
    if (resizeW <= 991) {
        renderLayer('storePopup', 400, 300);
        $("#storePopup .store-info").html($store_link.find("address").html());
        $("#storePopup .option-edit h2").html($store_link.find("p").html())

    }
    var hasClass_select = $store_link.parent().hasClass("select");
    if (hasClass_select == true) {
        $store_link.parent().removeClass("select");
    } else {
        $(".store-list li").removeClass("select");
        $store_link.parent().addClass("select");
    }
    mapInfo();
}

function sizeCheck() {
    resizeW = $(window).width();

    if (resizeW <= 991) {
        store_id = "stLocation_mo";
    } else {
        store_id = "stLocation_pc";
    }
}

//구글 맵 구현을 위한 정보
function mapInfo() {
    var getLat = $store_link.attr("data-lat");
    var getLng = $store_link.attr("data-lng");
    getStoreName = $store_link.find(">p strong").text();
    latlng = new google.maps.LatLng(getLat, getLng);
    setting_map();
}

//구글 맵 불러오기
function setting_map() {
    var mapOptions = { //구글 맵 옵션 설정
        zoom: 16, //기본 확대율
        center: latlng, // 지도 중앙 위치
        scrollwheel: false, //마우스 휠로 확대 축소 사용 여부
        mapTypeControl: false,
        draggable: false //맵 타입 컨트롤 사용 여부
    };
    var map = new google.maps.Map(document.getElementById(store_id), mapOptions); //구글 맵을 사용할 타겟

    var image = 'http://cheolguso.com/img/iconimg.png'; //마커 이미지 설정

    var marker = new google.maps.Marker({ //마커 설정
        map: map,
        position: latlng, //마커 위치
        title: getStoreName
    });
    google.maps.event.addDomListener(window, "resize", function () { //리사이즈에 따른 마커 위치
        var center = latlng;
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

}//function-end

//매장찾기
$(document).ready(function () {

    if (content_class == true) {
        latlng = new google.maps.LatLng(37.4868117, 126.9309197);
        google.maps.event.addDomListener(window, 'load', setting_map);
    }

    $(".store-list li a.btn-map").click(function () {
        viewMap(this);
    });

});//jQuery-end

// code and xcode
function getCodeName(group, code, pre) {
    if (!pre) {
        pre = "/utils/code/";
    }
    var url = pre + group + "/" + code;
    var codeName;
    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        async: false
    }).done(function (data) {
        codeName = data;
    });
    // console.log("codeName : " + codeName);
    return codeName;
}

function getXCodeName(alias, key) {
    var pre = "/utils/xcode/";
    return getCodeName(alias, key, pre);
}

function formatPhoneNumber(value, delimiter) {
    if (value && value.length >= 9) {
        var length = value.length;

        var _delimiter = "-";

        if (delimiter) {
            _delimiter = delimiter;
        }

        var disjoinNumbers = new Array();
        if (length == 9) {
            disjoinNumbers.push(value.substring(0, 2));
            disjoinNumbers.push(value.substring(2, 5));
            disjoinNumbers.push(value.substring(5));
        } else {
            if (value.indexOf("02") == 0) {
                disjoinNumbers.push(value.substring(0, 2));
                disjoinNumbers.push(value.substring(2, 6));
                disjoinNumbers.push(value.substring(6));
            } else {
                disjoinNumbers.push(value.substring(0, 3));
                disjoinNumbers.push(value.substring(3, length - 4));
                disjoinNumbers.push(value.substring(length - 4));
            }
        }
        return $.grep(disjoinNumbers, Boolean).join(_delimiter);
    }
    return value;
}

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}
