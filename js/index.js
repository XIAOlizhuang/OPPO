jQuery.fn.carousel = function(){
    var interval = 3000;    //每隔多久轮换一张
    var duration = 500;     //每次轮换动画的持续时间
    var $imgList = this.children('img'); //所有的img组成的类数组对象
    var $liList = this.find('li'); //所有的li组成的类数组对象
    var cur = 0;  //当前显示的广告的序号
    var next = 1; //下次即将要显示的广告的序号


    //开启一个定时器，每隔interval时长启动一次轮换
    setInterval(function(){
        lunHuan()
    }, interval);

    //为每个li添加事件监听，单击后直接显示指定的广告
    $liList.click(function(){
        //cur 0    next 1       点击4后
        //cur 0    next 4
        var i = $liList.index(this);//点击的li在所有li中的序号
        next = i;
        //点击后立即开始广告轮换
        lunHuan();
    });

    //进行广告轮换
    function lunHuan(){
        //让第next个li圆饼添加.active，其兄弟删除.active
        $liList.eq(next).addClass('active').siblings('.active').removeClass('active');
        //让当前显示的广告启动动画向左滑动，滑出去后，删除.active
        $imgList.eq(cur).animate({left:'-100%'},duration,function(){
            $(this).removeClass('active');//动画执行完了 要做的处理
        })
        //让即将要显示的下一张广告添加.active，出现在最右侧，开始动画慢慢向左滑动
        $imgList.eq(next).addClass('active').css('left','100%').animate({left: '0'},duration);
        //修改cur和next变量的值,第cur张移走后next张移入
        cur = next;  //<=0     <=1
        next++;
        //cur=0 next=1 显示第一张图
        //cur=1 next=2 显示第二张图
        //cur=2 next=3 显示第三张图
        //当next等于3时,就是next等于图片个数的时候，让next从0开始
        if(next>=$imgList.length){
            next = 0;
        }
    }
}
//slider的高度等于图片高度
var height=$("#slider img")[0].height;
//console.log(height);
$("#slider").height(height);
//加载完成
$(function(){
    var bodyWidth=$(window).width();
    console.log(bodyWidth);
    if(992<bodyWidth){
        //console.log(bodyWidth);
        $("#slider img")[0].setAttribute("src","img/banner1-lg.jpg");
        $("#slider img")[1].setAttribute("src","img/banner2-lg.jpg");
        $("#slider img")[2].setAttribute("src","img/banner3-lg.jpg");
        $("#slider img")[3].setAttribute("src","img/banner4-lg.jpg");
    }
    else{
        console.log(bodyWidth);
        $("#slider img")[0].setAttribute("src","img/banner1-sm.jpg");
        $("#slider img")[1].setAttribute("src","img/banner2-sm.jpg");
        $("#slider img")[2].setAttribute("src","img/banner3-sm.jpg");
        $("#slider img")[3].setAttribute("src","img/banner4-sm.jpg");
    }
    $("#slider img").load(function(){
        //var w = $(this).width();
        var h = this.height;
        //console.log(h);
        $("#slider").height(h);
    });
})
//屏幕变化
window.onresize = function(){
    var bodyWidth=$(window).width();
    //console.log(bodyWidth);
    if(992<bodyWidth){
        //console.log(bodyWidth);
        $("#slider img")[0].setAttribute("src","img/banner1-lg.jpg");
        $("#slider img")[1].setAttribute("src","img/banner2-lg.jpg");
        $("#slider img")[2].setAttribute("src","img/banner3-lg.jpg");
        $("#slider img")[3].setAttribute("src","img/banner4-lg.jpg");
    }
    else if(768<bodyWidth<=991){
        $("#slider img")[0].setAttribute("src","img/banner1-md.jpg");
        $("#slider img")[1].setAttribute("src","img/banner2-md.jpg");
        $("#slider img")[2].setAttribute("src","img/banner3-md.jpg");
        $("#slider img")[3].setAttribute("src","img/banner4-md.jpg");
    }
    else{
        console.log(bodyWidth);
        $("#slider img")[0].setAttribute("src","img/banner1-sm.jpg");
        $("#slider img")[1].setAttribute("src","img/banner2-sm.jpg");
        $("#slider img")[2].setAttribute("src","img/banner3-sm.jpg");
        $("#slider img")[3].setAttribute("src","img/banner4-sm.jpg");
    }
    $("#slider img").load(function(){
        //var w = $(this).width();
        var h = this.height;
        //console.log(h);
        $("#slider").height(h);
    });
    //var height=$("#slider img")[0].height;
    //console.log(height);
    //$("#slider").height(h);
}
$("#slider").carousel();

// $(window).resize(function () {          //当浏览器大小变化时
//     console.log($(window).width());          //浏览器时下窗口可视区域高度
//     console.log($(document).width());        //浏览器时下窗口文档的高度
//     console.log($(document.body).width());   //浏览器时下窗口文档body的高度
//     console.log($(document.body).outerWidth(true)); //浏览器时下窗口文档body的总高度 包括border padding margin
// });


//引入尾部
$("#footer").load("footer.html");

//欢迎某某某登录
$(function(){
   if(sessionStorage["uname"]){
       var u=sessionStorage["uname"];
       console.log(u);
       var str=`<div>欢迎${u}回来!</div>`;
       $("div.upper").html(str);
   }
});

