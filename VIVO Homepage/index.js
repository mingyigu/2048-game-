var flagAlloc = 1;

//鼠标滚动的时候
$(window).scroll(function(){
    var strollT = document.documentElement.scrollTop || document.body.scrollTop;
    //获得精选配件进行变化的高度
    var bacTop =  $("#allocItems").offset().top - $(window).height();
    var nav = $("#nav");
    //当导航栏的高度大于40时，吸顶
    if(strollT >= 40){
        
        nav.addClass("inTop");
    }
    else{
        nav.removeClass("inTop");
        console.log("OK");
    }

    if(strollT > bacTop + 200 && flagAlloc == 1){
        $("#c1-2r1-3").addClass("animated fadeInLeft show")
        $("#c2-3r1-2").addClass("animated fadeInRight show")
        $("#c2-3r2-3").addClass("animated fadeInDown show")
        $("#c3-5r1-2").addClass("animated fadeInUp show")
        $("#c1-3r3-4").addClass("animated fadeInLeft show")
        $("#c3-4r2-4").addClass("animated fadeInDown show")
        $("#c4-5r2-3").addClass("animated fadeInLeft show")
        $("#c4-5r3-4").addClass("animated fadeInRight show")
        
    }
    if(strollT >= 700){
        $("#toTop").addClass("show");
        $("#toTop").removeClass("fade");
    }
    else{
        $("#toTop").addClass("fade");
        $("#toTop").removeClass("show");
    }

    /*var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();*/
    
    
});

//页面加载完后
window.onload = function(){
    var toTop = $("#toTop");
    var timer = null;
    toTop.click(function() {
        flagAlloc = 0;
        $("#c1-2r1-3").removeClass("animated fadeInLeft show");
        $("#c2-3r1-2").removeClass("animated fadeInRight show");
        $("#c2-3r2-3").removeClass("animated fadeInDown show");
        $("#c3-5r1-2").removeClass("animated fadeInUp show");
        $("#c1-3r3-4").removeClass("animated fadeInLeft show");
        $("#c3-4r2-4").removeClass("animated fadeInDown show");
        $("#c4-5r2-3").removeClass("animated fadeInLeft show");
        $("#c4-5r3-4").removeClass("animated fadeInRight show");
        timer = setInterval(() => {
            var bacTop = $(window).scrollTop();
            var speed = bacTop / 5;
            $(window).scrollTop(bacTop - speed);
            if(bacTop == 0){
                clearInterval(timer);
            }
        }, 30);
        setTimeout(() => {
            flagAlloc = 1;
        }, 1500);
    });
    
}


