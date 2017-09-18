$("#footer").load("footer.html");
$("div.main div.col-md-12").on("mouseenter","img.picScale",function(){
    $(this).css("transform","scale(1.1,1.1)").css("transition","transform 1s linear");
    $("div.main div.col-md-12").css("overflow","hidden");
});
$("div.main div.col-md-12").on("mouseleave","img.picScale",function(){
    $(this).css("transform","scale(1,1)")
});

//分页部分
function selPro(num,size){
    $.ajax({
        type:"get",
        data:{num:num,size:size},
        url:"data/product_list.php",
        success:function(data){
            console.log(data);
            for(var i=0,str="";i<data.length;i++){
                str+=`
                     <div class="col-md-4">
                       <dl>
                           <dt class="text-center">
                               <img src="img/${data[i].pic}" style="max-width:85%">
                           </dt>
                           <dd>
                               <p class="intro">${data[i].pname}</p>
                               <p class="price">${data[i].price}</p>
                           </dd>
                       </dl>
                    </div>
                `;
            }
            $("div.product>div.row:first").html(str);
        }
    });
}
selPro(1,6);
$(function(){//阻止a元素的默认跳转,因为DOM元素还没有显示出来所以只能绑定在父元素上
    $("ul.list li").on("click","a",function(e){
        e.preventDefault();
        $(this).parent().addClass("active").siblings().removeClass("active");
        var num=$(this).html();
        selPro(num,6);
    });
});


//搜索
var input=document.querySelector("input.search");
input.onkeyup=function(){//onkeyup 事件会在键盘按键被松开时发生
    var kw=input.value;
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            var msg=xhr.responseText;
            console.log(msg);
            var obj=JSON.parse(msg);
            console.log(obj);
            var row=document.querySelector("div.product div.row:nth-child(3)");
            for(var i=0,str="";i<obj.length;i++){
                str+=`
                    <div class="col-md-4">
                           <dl>
                               <dt class="text-center">
                                   <img src="img/${obj[i].pic}" style="max-width:85%">
                               </dt>
                               <dd>
                                   <p class="intro">${obj[i].pname}</p>
                                   <p class="price">${obj[i].price}</p>
                               </dd>
                           </dl>
                    </div>
            `;
            }
            row.innerHTML=str;
        }
    };
    xhr.open("post","data/product_bykw.php",true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(`kw=${kw}`);
}










