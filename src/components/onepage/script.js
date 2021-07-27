
function init_home(){

    /*=================================================
                  머문시간 조회
    =================================================*/
    time_count();

    /*=================================================
                  IE 판별
    =================================================*/
    var agent = navigator.userAgent.toLowerCase();

    if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
        $("#star-svg").addClass("d-none");
    }

    /*=================================================
                  모바일 float
    =================================================*/
    if(getGrid()=="xs"){
      $(window).scroll(function(){
      	var main_height	= $("#main").outerHeight();
      	var nav_height	= $("#main-gnb").outerHeight();

      	if($(document).scrollTop() > nav_height){
      		$("#main-gnb").addClass("float");
          $(".navbar-brand img").attr('src',"/img/logo.png");
      	} else {
      		$("#main-gnb").removeClass("float");
          $(".navbar-brand img").attr('src',"/img/logo.png");
      	}
      });
    }

    /*=================================================
                  공통
    =================================================*/
    $(".loading-layer").delay(100).fadeOut();

    var switch_layout   = true;
    var switch_develope = true;

    /*=================================================
                  구글 어널리틱스
    =================================================*/
    var section_stay_check;
    var section_stay_time	= 0;
    var section_stay = function(elem){
      clearInterval(section_stay_check);
      section_stay_time	= 0;

      var section_id	= elem[0].id;

      section_stay_check	= setInterval(function(){
        section_stay_time++;

        if(section_stay_time > 1){
          ga("send", "pageview", "/#"+section_id);

          clearInterval(section_stay_check);
          section_stay_time	= 0;
        }
      }, 1000);
    }

    /*=================================================
		01 - Fullpage
    =================================================*/
    if(getGrid()!=="xs"){
        $(document).ready(function() {
            $('#pagepiling').pagepiling({
                menu: [],
                direction: 'vertical',
                verticalCentered: true,
                sectionsColor: [],
                anchors: ['main', 'one', 'story', 'construct', 'marketing', 'process'],
                scrollingSpeed: 700,
                easing: 'swing',
                loopBottom: false,
                loopTop: false,
                css3: true,
                normalScrollElements: null,
                normalScrollElementTouchThreshold: 5,
                touchSensitivity: 5,
                keyboardScrolling: true,
                sectionSelector: '.section',
                animateAnchor: false,
                onLeave: function(index, nextIndex, direction){},
                afterLoad: function(anchorLink, index){
                    section_stay($("#"+anchorLink));
                    if(anchorLink !== 'main'){
                        $("#main-gnb").addClass("float");
                        $(".navbar-brand img").attr('src',"/img/logo.png");
                    }else{
                        $("#main-gnb").removeClass("float");
                        $(".navbar-brand img").attr('src',"/img/logo.png");
                    }

                    if(anchorLink == 'one' || anchorLink == 'story' || anchorLink == 'construct'){
                        $("#"+anchorLink).find(".stand-wrap").addClass("active");
                    }

                    if(anchorLink == 'process'){
                        $(".line-inner-wrap").addClass("active");

                        // Get a reference to the <path>
                        var path = document.querySelector('#star-path');

                        // Get length of path... ~577px in this case
                        var pathLength = path.getTotalLength();

                        // Make very long dashes (the length of the path itself)
                        path.style.strokeDasharray = pathLength + ' ' + pathLength;

                        // Offset the dashes so the it appears hidden entirely
                        path.style.strokeDashoffset = pathLength;

                        // Jake Archibald says so
                        // https://jakearchibald.com/2013/animated-line-drawing-svg/
                        path.getBoundingClientRect();

                        $(".process-wrap .concept-wrap .img-wrap").find("img").addClass("active");

                        $("#process").scroll(function(){
                            // Had to try three or four differnet methods here. Kind of a cross-browser nightmare.
                            var scrollPercentage = $("#process").scrollTop() / ($(".process-wrap").height() - $(window).height()+800);

                            // Length to offset the dashes
                            var drawLength = pathLength * scrollPercentage;

                            // Draw in reverse
                            path.style.strokeDashoffset = pathLength - drawLength;

                            // When complete, remove the dash array, otherwise shape isn't quite sharp
                            // Accounts for fuzzy math
                            if (scrollPercentage >= 0.99) {
                                path.style.strokeDasharray = "none";

                            } else {
                                path.style.strokeDasharray = pathLength + ' ' + pathLength;
                            }

                            var thei_layout     = $(".item-wrap.layout").offset().top;
                            var thei_develop    = $(".item-wrap.develope").offset().top;

                            if(thei_layout < 1000){
                                if(switch_layout){
                                    $(".process-wrap .layout-wrap img").addClass("active");
                                    switch_layout = false;
                                }
                            }

                            if(thei_develop < 1000){
                                if(switch_develope){
                                    switch_develope = false;

                                    /*****#####===== 노출항목 워드 =====#####*****/
                                    var words = [
                                        "JAVA CSS3 PYTHON ASP SITE MAP PHP WEBMOBILE Ajax C+ REPONSIVE WEB MOBILE WEBMOBILE HTML MARKETING PHOTO BROADCASTING"
                                    ]

                                    /*****#####===== 워드의 크기 조절 =====#####*****/
                                    function getWords(i) {
                                        return words[i]
                                                .replace(/[!\.,:;\?]/g, '')
                                                .split(' ')
                                                .map(function(d) {
                                                    return {text: d, size: 10 + Math.random() * 60};
                                                })
                                    }

                                    /*****#####===== 워드 뿌려주기 =====#####*****/
                                    function showNewWords(vis) {
                                        vis.update(getWords(0% words.length));
                                    }

                                    /*****#####===== 워드 가져오기 =====#####*****/
                                    var myWordCloud = wordCloud('.word-cloud');

                                    showNewWords(myWordCloud);
                                }
                            }
                        })
                    }
                },
                afterRender: function(){},
            });
        });
    }
    else
    {
        $(".stand-wrap").addClass("active");
        $(".process-wrap .concept-wrap .img-wrap").find("img").addClass("active");

        $(window).scroll(function(){
            var nhei            = $(window).scrollTop();
            var thei_layout     = $(".item-wrap.layout").offset().top;
            var thei_develop    = $(".item-wrap.develope").offset().top;
            if(thei_layout < nhei+1000){
                if(switch_layout){
                    $(".process-wrap .layout-wrap img").addClass("active");
                    switch_layout = false;
                }
            }

            if(thei_develop < nhei+1000){
                if(switch_develope){
                    /*****#####===== 노출항목 워드 =====#####*****/
                    var words = [
                        "JAVA CSS3 PYTHON ASP SITE MAP PHP WEBMOBILE Ajax C+ REPONSIVE WEB MOBILE WEBMOBILE HTML"
                    ]

                    /*****#####===== 워드의 크기 조절 =====#####*****/
                    function getWords(i) {
                        return words[i]
                                .replace(/[!\.,:;\?]/g, '')
                                .split(' ')
                                .map(function(d) {
                                    return {text: d, size: 10 + Math.random() * 60};
                                })
                    }

                    /*****#####===== 워드 뿌려주기 =====#####*****/
                    function showNewWords(vis) {
                        vis.update(getWords(0% words.length));
                    }

                    /*****#####===== 워드 가져오기 =====#####*****/
                    var myWordCloud = wordCloud('.word-cloud');

                    showNewWords(myWordCloud);
                    switch_develope = false;
                }
            }
        })
    }

     /*****#####===== 워드클라우드 =====#####*****/
     function wordCloud(selector) {
        var fill = d3.scale.category20();

        if(getGrid()=="xs"){
            var svg = d3.select(selector).append("svg")
                .attr("width", 300)
                .attr("height", 300)
                .append("g")
                .attr("transform", "translate(150,150)");
        }else if(getGrid()=="sm"){
            var svg = d3.select(selector).append("svg")
                .attr("width", 300)
                .attr("height", 300)
                .append("g")
                .attr("transform", "translate(150,150)");
        }else{
            var svg = d3.select(selector).append("svg")
                .attr("width", 400)
                .attr("height", 300)
                .append("g")
                .attr("transform", "translate(200,150)");
        }

        /*****#####===== 워드 그리기 (기본 설정) =====#####*****/
        function draw(words) {
            var cloud = svg.selectAll("g text")
                            .data(words, function(d) { return d.text; })

            cloud.enter()
                .append("text")
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr('font-size', 1)
                .text(function(d) { return d.text; });

            cloud
                .transition()
                    .duration(600)
                    .style("font-size", function(d) { return d.size + "px"; })
                    .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .style("fill-opacity", 1);

            cloud.exit()
                .transition()
                    .duration(200)
                    .style('fill-opacity', 1e-6)
                    .attr('font-size', 1)
                    .remove();
        }
        return {
            update: function(words) {
                // var height  = $(".process-wrap .word-cloud svg").height();
                // var width   = $(".process-wrap word-cloud svg").width();
                if(getGrid()=="xs"){
                  d3.layout.cloud().size([300, 300])
                      .words(words)
                      .padding(5)
                      .rotate(function() { return ~~(Math.random() * 2) * 90; })
                      .font("Impact")
                      .fontSize(function(d) { return d.size; })
                      .on("end", draw)
                      .start();
                }else if(getGrid()=="sm"){
                  d3.layout.cloud().size([300, 300])
                      .words(words)
                      .padding(5)
                      .rotate(function() { return ~~(Math.random() * 2) * 90; })
                      .font("Impact")
                      .fontSize(function(d) { return d.size; })
                      .on("end", draw)
                      .start();
                }else{
                  d3.layout.cloud().size([400, 300])
                      .words(words)
                      .padding(5)
                      .rotate(function() { return ~~(Math.random() * 2) * 90; })
                      .font("Impact")
                      .fontSize(function(d) { return d.size; })
                      .on("end", draw)
                      .start();
                }
            }
        }
    }

    /*****#####===== 마우스 따라 움직이는 이미지 =====#####*****/
    window.onload = function(){
      $('.circle').plaxify({"xRange":15,"yRange":15})
      $('.circle-shadow').plaxify({"xRange":10,"yRange":10})
      $.plax.enable({ "activityTarget": $('#main')})
    }


    /*****#####===== 장바구니 슬라이드 =====#####*****/
    $('.step-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 25000,
        arrows: false,
        fade: true,
        pauseOnHover: false,
        asNavFor: '.step-nav'
    });

    $('.step-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 25000,
        asNavFor: '.step-for',
        centerMode: false,
        pauseOnHover: false,
        focusOnSelect: true
    });

    /*=================================================
	           그래프
	=================================================*/
    /////#####===== 서비스 그래프 =====#####/////
    // $(".circle_progress").each(function(key,val){
    //     var id = $(val).attr("id");

    //     var circle = new ProgressBar.Circle("#"+id, {
    //         color: '#8cadff',
    //         strokeWidth: 5,
    //         trailWidth: 1,
    //         duration: 1500
    //     });

    //     circle.animate($(val).data("topersent")*0.01);
    // });

    /*****#####===== 숫자 카운트 =====#####*****/
    // $(".counter").each(function(){
    //     var $counter	= $(this);
    //     $counter.countTo({
    //         speed: 1500,
    //         refreshInterval: 10,
    //         decimals: $counter.data("decimals")?$counter.data("decimals"):0,
    //         onComplete: function(){
    //             $counter.addClass("animated");
    //         }
    //     });
    // });
}

/*=================================================
                머문시간 조회
=================================================*/
function time_count(){
    setInterval(function(){
        /*****#####===== 현제 시간 가져오기 =====#####*****/
        var minute  = moment().minute();
        var hour    = moment().hour();
        var second  = moment().second();
        var count   = 0;
        /*****#####===== 로컬 초기화 =====#####*****/
        if(hour == 24){
            localStorage.clear();
        }

        /*****#####===== 로컬스토리지 전송할 시간 오브젝트 =====#####*****/
        var obj     ={
            "hour"      : hour,
            "minute"    : minute,
            "second"    : second
        };


        /*****#####===== 로컬스토리지 존재 여부  =====#####*****/
        if( localStorage.getItem('tiem') === null ){
            obj = JSON.stringify(obj);
            localStorage.setItem('tiem', obj);
        }

        else {
            /*****#####===== 로컬스토리지 있을시 값 가지고 오기 =====#####*****/
            storage_obj = localStorage.getItem('tiem');
            storage_obj = JSON.parse(storage_obj);

            /*****#####===== 처음 방문 시간 - 현재 시간 =====#####*****/
            obj.hour    = (obj.hour)-(storage_obj.hour);

            /*****#####===== -값 방지 =====#####*****/
            if(obj.minute < storage_obj.minute){
                obj.minute  = (obj.minute+60)-(storage_obj.minute);
                obj.hour --;
            }else{
                obj.minute  = obj.minute-storage_obj.minute;
            }

            /*****#####===== -값 방지 =====#####*****/
            if(obj.second < storage_obj.second){
                obj.second  = (obj.second+60)-(storage_obj.second);
                obj.minute --;
            }else{
                obj.second  = obj.second-storage_obj.second;
            }
        }

        /*****#####===== 데이터 뿌리기 =====#####*****/
        $(".counting").text(obj.minute+":"+obj.second);
    },1000);
}






$(function(){
    /////#####===== contact =====#####/////
    $(document).on("click", ".open-slide-nav-btn", function(){
        $(this).toggleClass("active");
        $("#slide-nav").toggleClass("active");
    });

    $(document).on("click", ".open_btn", function(){
        var check   = $(".nav-board-wrap.contact-wrap").hasClass("open");
        var target  = $(this).data("target");

        $(".nav-board-wrap").removeClass("open");
        $(".open_btn").removeClass("active");

        $(".nav-board-wrap."+target).addClass("open");
        $(".open_btn[data-target='"+target+"']").addClass("active");

        if(target=="contact-wrap" && check===false){
            section_stay($("#contact"));
        }
    });

    $(document).on("click", ".open-slide-nav-btn.active", function(){
        $(".nav-board-wrap").removeClass("open");
        $(".open_btn").removeClass("active");
    });

    $(document).on("click", ".nav-board-wrap .arrow", function(){
        $(".open_btn").removeClass("active");
        $(".nav-board-wrap").removeClass("open");
    });

    $(document).on("click",".open_btn.active",function(){
        $(".open_btn").removeClass("active");
        $(".nav-board-wrap").removeClass("open");
    });

    $(document).on("click",".nav_contact_btn",function(){
        $(".open-slide-nav-btn").click();
        $(".open_btn[data-target='contact-wrap']").addClass("active");
        $(".contact-wrap.nav-board-wrap").addClass("open");

        section_stay($("#contact"));
    });

    $(document).on("click",".nav_qna_btn",function(){
        $(".open-slide-nav-btn").click();
        $(".open_btn[data-target='qna-wrap']").addClass("active");
        $(".qna-wrap.nav-board-wrap").addClass("open");
    });

    $(document).on("click",".nav_faq_btn",function(){
        $(".open-slide-nav-btn").click();
        $(".open_btn[data-target='faq-wrap']").addClass("active");
        $(".faq-wrap.nav-board-wrap").addClass("open");
    });

    /*=================================================
               컨텍 폼 전송
    =================================================*/
    $(".contact_btn").on("click",function(){
        var $form        = $("#"+($(this).data("form")||$(this).parents("form").attr("id")));

        checkFormValid($form, function(){
            ga("send", "event", "button", "send", "contact", "1000");
        });
    });

    /////#####===== 스크롤 이동  =====#####/////
    $(document).on('click',"a.page-scroll", function(event){
      if(getGrid()=="sm" || getGrid()=="xs"){
        var nav_height  = $("#main-gnb").outerHeight();
        var go_position = "";
        event.preventDefault();

        var $anchor     = $(this);

            go_postion  = $($anchor.attr('href')).offset().top;

        $('html, body').stop().animate({
            scrollTop: go_postion
        }, 1500, 'easeInOutExpo');
      }
    });

    /*=================================================
             임시 팝업
  =================================================*/
    $(document).on("click",".temp_btn",function(e){
        e.preventDefault();
        showAlert("준비중입니다.");

        return false;
    });

});
