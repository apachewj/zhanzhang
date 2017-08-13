

$(function(){
    var page = 1;
    var type=0;
    var searchname=null
    //第一次的ajax请求
    if(location.search){
        searchname=location.search.substr(1).split('=')[1]
        if(searchname){
            searchname=decodeURI(searchname)
        }
    }
    $.post("/user/zhancheck/UserManager_List",{type:type,searchname:searchname}).then(function (data){
      console.log(data)
        page++
      var html = _.template($('#tpl1').html())
      $('.UserList_block>ul').html(html({list:data.data}))
    })
    //切换
    $(".col-33").on("click",function(){
        page=1
        $("#userMore").show()
        $(this).siblings(".col-33").children("a").addClass("disabled")
        $(this).find("a").removeClass("disabled")
        if($(this).find("a").attr("id")=="all"){
            $.post("/user/zhancheck/UserManager_List",{type:0}).then(function (data){
                console.log(data)
                var html = _.template($('#tpl1').html())
                $('.UserList_block>ul').html(html({list:data.data}))
            })
        }
        //商家部分
        if($(this).find("a").attr("id")=="shangjia"){
            $.post("/user/zhancheck/UserManager_List",{type:2}).then(function (data){
                console.log(data)
                var html = _.template($('#tpl1').html())
                $('.UserList_block>ul').html(html({list:data.data}))
            })
        }
        //普通用户
        if($(this).find("a").attr("id")=="putong"){
            $.post("/user/zhancheck/UserManager_List",{type:1}).then(function (data){
                console.log(data)
                var html = _.template($('#tpl1').html())
                $('.UserList_block>ul').html(html({list:data.data}))
            })
        }
    })
    //屏蔽
    //////////////////////////////////////////////////////////////////////////////
    $(".UserList_block").on("click",'.alert-text',function(){

        $("#pingbidays").show()
        $("#mask").show()

        var self=this;
        var info_id=$(self).parents(".detail-li").attr("id")
        $("#pingbi_infoid").val(info_id);

    })
    $(".sure_pingbi").on("click",function(){

        var days = $(".pingbi_day").val();
        var info_id = $("#pingbi_infoid").val();
        $.post("/user/zhancheck/UserManager_Change",{info_id:info_id,days:days}).then(function(data){
            console.log(data)
            if(data.data=="SUCCESS"){
               alert("屏蔽成功")
               $(self).parents(".detail-li").remove()
            }
        });

        $("#pingbidays").hide()
        $("#mask").hide()
    });

    $("#pingbidays").on("click",'.cancel_pingbi',function(){
        $("#pingbidays").hide()
        $("#mask").hide()
    })
///////////////////////////////////////////////////////////

    //删除
    $(".UserList_block").on("click",'.management_button',function(){
        var user_id=$(this).parents(".detail-li").attr("id")
        $.post("/user/zhancheck/storeList",{user_id:user_id}).then(function(data){
            console.log(data)
        })
        $(this).parents(".detail-li").find("#tanchuang").show()
        $("#mask").show()
    })
       $("#pageIndex").on("click",".management_button",function(){
           $("#tanchuang").show()
           var user_id=$(this).parents(".detail-li").attr("id")
           $.post("/user/zhancheck/storeList",{user_id:user_id}).then(function(data){
               console.log(data)
               var html = _.template($('#tpl2').html())
               $('#tanchuang>ul').html(html({list:data.data}))
           })
       })

    $("#tanchuang").on("click","a",function(){
        $("#tanchuang").hide()
        $("#mask").hide()
    })

//    分页
    $("#userMore").click(function(){
           page++
        if(!$("#all").hasClass("disabled")){

            $.post("/user/zhancheck/UserManager_List",{type:0,pageNum:page}).then(function (data){
                if(data.data=="ERROR"){
                    $("#userMore").hide()
                }
                console.log(data)
                var html = _.template($('#tpl1').html())
                $('.UserList_block>ul').append(html({list:data.data}))
            })
        }
        if(!$("#shangjia").hasClass("disabled")){

            $.post("/user/zhancheck/UserManager_List",{type:2,pageNum:page}).then(function (data){
                console.log(data)
                if(data.data=="ERROR"){
                    $("#userMore").hide()
                }
                var html = _.template($('#tpl1').html())
                $('.UserList_block>ul').append(html({list:data.data}))
            })
        }
        if(!$("#putong").hasClass("disabled")){

            $.post("/user/zhancheck/UserManager_List",{type:1,pageNum:page}).then(function (data){
                if(data.data=="ERROR"){
                    $("#userMore").hide()
                }
                console.log(data)
                var html = _.template($('#tpl1').html())
                $('.UserList_block>ul').append(html({list:data.data}))
            })
        }

    })
    //搜索

    $("#pageIndex").on("click",".icon-search",function () {
       var searchname=$("#search").val()
        var type=$(".col-33").find()
        $.post("/user/zhancheck/UserManager_List",{searchname:searchname,type:0}).success(function (data) {
            console.log(data)
            var html = _.template($('#tpl1').html())
            $('.UserList_block>ul').html(html({list:data.data}))
        })
    })
})


