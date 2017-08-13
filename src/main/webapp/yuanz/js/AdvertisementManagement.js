$(function(){
    var page=1;
    //广告图片点击到广告详情页
    $("#pageIndex").on("click",".card-cover",function() {
        $("#pageViewCustomer").show()
        var info_id=$(this).parents("div.card").attr("data")
        $.post("/user/ad/AdApply",{info_id:info_id}).then(function(data){
            console.log(data)
            data.imgcontext=data.imgcontext||""
            data.img=data.img||""
             data.img=data.img.split(',')
             data.imgcontext=data.imgcontext.split(',')
            console.log(data)
            var html= _.template($("#tpl4").html())
            $("#pageViewCustomer .content").html(html({list:data}))
        })
    })
    //样式切换
    $(".tab_title").on("click","li",function(){
        $(this).siblings(".selected").removeClass("selected")
        $(this).addClass("selected")
        location=$(this).find('a').attr("title")
        console.log(location)
          $.post("/user/ad/AdApplyList",{showtype:showtype,location:location}).then(function(data){
        console.log(data)
        if(data.data=="ERROR"){
            $("#adMore").hide()
            data.data=[]
        }
        var html= _.template($("#tpl").html())
        $("#tab1xx").html(html({list:data.data}))
         })
    })
    //点击查看用户
    $(".buttons-row_content").on("click",".button-link",function(){
        location.href="UserList.html"
    })
//    第一次请求Ajax
    var showtype=1
    var page=1
    var location=0
    $.post("/user/ad/AdApplyList",{showtype:showtype,location:location}).then(function(data){
        console.log(data)
        if(data.data=="ERROR"){
            $("#adMore").hide()
            data.data=[]
        }
        var html= _.template($("#tpl").html())
        $("#tab1xx").html(html({list:data.data}))
    })
//  审核推广切换
    $(".buttons-row_content").on("click","a",function(){
        $(".buttons-row_content a").removeClass("active")
        $(this).addClass("active")
        $("#adMore").show()
    })
//    渲染推广中页面
    $("#adTab1").click(function(){
        page=1
        $("#tab2xx").hide()
        $.post("/user/ad/AdApplyList",{showtype:1,location:location}).then(function(data){
            console.log(data)
            if(data.data=="ERROR"){
                $("#adMore").hide()
            data.data=[]
        }
            var html= _.template($("#tpl").html())
            $("#tab1xx").html(html({list:data.data}))
        })
        $("#tab1xx").show()
    })
//    审核页面渲染

    $("#adTab2").click(function(){
        page=1
        $("#tab1xx").hide()
        $.post("/user/ad/AdApplyList",{showtype:2,location:location}).then(function(data){
            console.log(data)
            if(data.data=="ERROR"){
                $("#adMore").hide()
            data.data=[]
        }
            var html= _.template($("#tpl2").html())
            $("#tab2xx").html(html({list:data.data}))
        })
        $("#tab2xx").show()
    })
//
    $("#pageIndex").on("click",".button_more",function(){
       // alert(1)
         $(this).parent().siblings(".adNone").toggle()
    })
//    渲染页面 通过and删除
    $("#tab2xx").on("click",".success",function(){
        var info_id=$(this).parents("div.card").attr("data")
        $.post("/user/ad/AdApplyPass",{info_id:info_id,pass:1}).then(function(data){
            console.log(data)
            if(data.data=="ERROR"){
                alert("审核失败")
                location.href="AdvertisementManagement.html"
            }else {
                alert("审核通过")
                location.href="AdvertisementManagement.html"
            }
        })
    })
    $("#tab2xx").on("click",".delete",function(){
        var info_id=$(this).parents("div.card").attr("data")
        $.post("/user/ad/AdApplyDelete",{info_id:info_id,pass:2}).then(function(data){
            console.log(data)
            if(data.data=="ERROR"){
                alert("删除失败")
                location.href="AdvertisementManagement.html"
            }else {
                alert("成功删除")
                location.href="AdvertisementManagement.html"
            }
        })

    })
//    审核中删除
    $("#tab1xx").on("click",".delete",function(){
        var info_id=$(this).parents("div.card").attr("data")
        $.post("/user/ad/AdApplyDelete",{info_id:info_id}).then(function(data){
            console.log(data)
            if(data.data=="ERROR"){
                alert("删除失败")
                location.href="AdvertisementManagement.html"
            }else {
                alert("成功删除")
                location.href="AdvertisementManagement.html"
            }
        })
    })
    //分页
    $("#adMore").click(function(){
        page++
        if($("#adTab1").hasClass("active")){
            $.post("/user/ad/AdApplyList",{showtype:1,location:location,pageNum:page}).then(function(data){
                console.log(data)
                if(data.data=="ERROR"){
                    data.data=[]
                    $("#adMore").hide()
                    return false
                }
                var html= _.template($("#tpl").html())
                $("#tab1xx").append(html({list:data.data}))

            })
        }else{
            $.post("/user/ad/AdApplyList",{showtype:2,location:location,pageNum:page}).then(function(data){
                console.log(data)
                if(data.data=="ERROR"){
                    data.data=[]
                    $("#adMore").hide()
                    return false
                }
                var html= _.template($("#tpl2").html())
                $("#tab2xx").append(html({list:data.data}))

            })
        }


    })

//    价位表
    $("#priceExcel").click(function(){
         $("#pagePriceList").show()
        $.post("/user/ad/AdList").then(function(data){
            console.log(data)
            var html= _.template($("#tpl3").html())
            $("#pagePriceList div.guanggao").html(html({list:data.data}))
        })
    })

//    修改价格
    $("#pagePriceList").on("click",".modify",function(){
        var money=$(this).parents("li").find("input").val()
        var type=$(this).parents("li").attr("type")
        var ad_id=$(this).parents("ul").attr("data-id")
        $.post("/user/ad/changeAd",{money:money,type:type,ad_id:ad_id}).then(function(data){
            console.log(data)
            if(data.data=="ERROR"){
                alert("修改失败")
            }else{
                alert("修改成功")
            }
        })
    })
    $("#pagePriceList").on("click",".icon",function(){
        location.href="AdvertisementManagement.html"
    })
})


$("#pagePriceList").on("click",".adDelete1",function(){
    var info_id=$(this).parents("ul").attr("data-id")
    var self=this
    $.post("/user/ad/AdDelete",{info_id:info_id}).success(function(){
         $(self).parents("ul").remove()
    })
});


$("#pagePriceList").on("click",".special_li_add",function(){
    $(".light").css("display","block");
    $(".fade").css("display","block");
});

$("#pagePriceList").on("click",".btn-cancel",function(){

    $(".light").css("display","none");
    $(".fade").css("display","none");

});
$("#pagePriceList").on("click",".btn-sure",function(){


    var type=2;
    var startday = $(this).parents("ul").find("#first_time").val();
    var endday = $(this).parents("ul").find("#second_time").val();
    var first=$(this).parents("ul").find(".diyiping").val();
    var second=$(this).parents("ul").find(".dierping").val();
    var third=$(this).parents("ul").find(".disanping").val();
    var fourth=$(this).parents("ul").find(".disiping").val();

    $.post("/user/ad/addAd",{type:type,first:first,second:second,third:third,fourth:fourth,startday:startday,endday:endday}).success(function(data){
        if(data.data=="SUCCESS"){
            $.post("/user/ad/AdList").then(function(data){
                console.log(data)
                var html= _.template($("#tpl3").html())
                $("#pagePriceList div.guanggao").html(html({list:data.data}))
            })
        }else{
            alert("添加失败")
        }

    });
    $(".light").css("display","none");
    $(".fade").css("display","none");
});

