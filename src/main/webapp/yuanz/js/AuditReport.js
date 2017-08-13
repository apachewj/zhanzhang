$(function () {
   var user_type= $.cookie()
    console.log(user_type)
    $(".datawapper").on("click","#demandShield",function(){

         var info_id=$(this).parents(".detail-li").attr("id")
         var type=$(this).parents(".detail-li").attr("type")
        $.post("/user/zhancheck/UserManager_Change",{type:type,info_id:info_id}).then(function(data){

            console.log(data)
            if(data.data=="SUCCESS"){
                alert("屏蔽成功")
            }
        })
    })
    //第一次 请求ajax  举报管理列表
    var page = 1;
    var type = 1;
    $.post('/user/zhancheck/Report_List', {type:type}).then(function (data) {
        console.log(data)
        for(var i=0;i<data.data.length;i++){
            if(data.data[i].content){
                data.data[i].content= data.data[i].content.split(",")
            }
        }

        for(var i=0;i<data.data.length;i++){
            if(data.data[i].img_path){
                data.data[i].img_path= data.data[i].img_path.split(",")
            }
        }
        for(var i=0;i<data.data.length;i++){
            if(data.data[i].imgs){
                data.data[i].imgs= data.data[i].imgs.split(",")
            }
        }
        var html = _.template($('#tpl1').html())
        $('.datawapper').html(html({list: data.data}))
    })
    //列表点击 ajax请求 渲染页面
    $(".tab_11111  li").on("click", function () {
        $(".readmonre").show()
        $(this).addClass("selected").siblings().removeClass("selected")
        $(".button_block .row .col-25 ").find("a").addClass("disabled")
        $("#spection").removeClass("disabled")
        type = $(this).attr("type");
        page = 1
      //  alert(1)
        $.post("/user/zhancheck/Report_List", {type: type}).then(function (data) {
            console.log(data)
            for(var i=0;i<data.data.length;i++){
                if(data.data[i].content){
                    data.data[i].content= data.data[i].content.split(",")
                }
            }

                for(var i=0;i<data.data.length;i++){
                    if(data.data[i].img_path){
                    data.data[i].img_path= data.data[i].img_path.split(",")
                    }
                }
            for(var i=0;i<data.data.length;i++){
                if(data.data[i].imgs){
                    data.data[i].imgs= data.data[i].imgs.split(",")
                }
            }
            console.log(data.data)



            var html = _.template($('#tpl1').html())
            if (data.data == 'ERROR') {
                data.data = []
            }
            $('.datawapper').html(html({list: data.data}))
        })
    })
    //分页
    $('.readmonre').click(function(){
        page++
        $.post('/user/zhancheck/Report_List', {type:type,pageNum:page}).then(function (data) {
            if(data.data=="ERROR"){
                $(".readmonre").hide()
            }
            var html = _.template($('#tpl1').html())
            console.log(data)
            $('.datawapper').append(html({list: data.data}))
        })
        return false;
    })
    // 搜索部分
    $("#icon-search").on("click", function () {
        var searchname = $("#search1").val()
        $.post("/user/zhancheck/Report_List", {searchname: searchname, type: type}).then(function (data) {
            console.log(data)
            var html = _.template($('#tpl1').html())
            if (data.data == 'ERROR') {
                data.data = []
            }
            $('.datawapper').html(html({list: data.data}))
        })
    })






    //举报管理删除

    $(".datawapper").on('click', '.delete_00001', function () {
        var id = $(this).attr("data-id")
        type = $(this).attr("type");
        var self=this
        $.post("/user/zhancheck/Report_Delete", {info_id: id, info_type: type}).success(function (data) {
            if(!confirm("请确认删除！")==true){
                return false
            }else{
                $(self).parents(".card").remove()
            }

        })
    })

    var page2 = 1;
    var type2 = 1;
    var status = 0
    //搜索
    $("#icon-search2").on("click", function () {
        var searchname = $("#search2").val()
        $.post("/user/zhancheck/Review_List", {searchname: searchname, type: type2}).then(function (data) {
            console.log(data)
            var html2 = _.template($('#tpl2').html())
            if (data.data == 'ERROR') {
                data.data = []
            }
            $('.AuditList_block').html(html2({list: data.data}))
        })
    })
    //分页2
    $('.readmonre2').click(function(){
        var status=0;
        $(".col-25").each(function(){
            if($(this).find('a').hasClass('disabled')){

            }else{
                console.log(this)
                 status= $(this).attr('status')
            }
        })

        console.log(status)
        page2++
        $.post('/user/zhancheck/Review_List', {status:status,type:type2,pageNum:page2}).then(function (data) {
            if(data.data=="ERROR"){
                $(".readmonre2").hide()
            }
            var html2 = _.template($("#tpl2").html())
            console.log(data)
            if(data.data=="ERROR"){
                data.data=[]
            }
            $(".AuditList_block").append(html2({list: data.data}))
        })
        return false;
    })


    //审核举报
    $("#shenhe").click(function () {
        $(".tab_11111").css("display", "none")
        $(".tab_22222").css("display", "-webkit-box")
        $("#tab2").show()
        $("#tab1").hide()
        $(this).addClass("active")
        $("#jubao").removeClass("active")
    })
    $("#jubao").click(function () {
        $(".tab_22222").css("display", "none")
        $(".tab_11111").css("display", "-webkit-box")
        $("#tab1").show()
        $("#tab2").hide()
        $(this).addClass("active")
        $("#shenhe").removeClass("active")
    })
    //审核 待审核 ....样式切换
    $(".col-25").on("click", function () {
        $(this).siblings(".col-25").children("a").addClass("disabled")
        $(this).find("a").removeClass("disabled")
        $(".readmonre2").show()
    })
    //审核 待审核 ....ajax请求
    $.post('/user/zhancheck/Review_List', {type:type2}).then(function (data) {
        console.log(data)
        var html2 = _.template($("#tpl2").html())
        $(".AuditList_block").html(html2({list: data.data}))
    })

    $(".tab_22222 li").on("click", function () {
        $(".readmonre").show()
        $(this).addClass("selected").siblings().removeClass("selected")
        $(".button_block .row .col-25 ").find("a").addClass("disabled")
        $("#spection").removeClass("disabled")
        type2 = $(this).attr("type")
        page2 = 1
        $.post("/user/zhancheck/Review_List", {type: type2}).then(function (data) {
            console.log(data)
            var html2 = _.template($("#tpl2").html())
            if (data.data == 'ERROR') {
                data.data = []
            }
            $(".AuditList_block").html(html2({list: data.data}))
        })
    })
    $(".col-25").on("click", function () {
        var status = $(this).attr("status")
        $.post("/user/zhancheck/Review_List",{type:type2,status:status}).then(function(data){
            console.log(data)
            var html2 = _.template($("#tpl2").html())
            if (data.data == 'ERROR') {
                data.data = []
            }
            $(".AuditList_block").html(html2({list: data.data}))
        })
    })

//筛选待审核可以点击转到审核详情页面
    $(".AuditList_block").on("click",".bbb",function(){
        var info_id=$(this).attr("data-id")
        var type3=$(this).attr("type")
        $.post("/user/zhancheck/Review_Detail",{type:type3,info_id:info_id}).then(function(data){
            console.log(data)
            if(type3=="22"){
                var html3 = _.template($("#love_shenfen").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()

                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).success(function(){
                        alert("审核通过")
                        console.log(data)
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).success(function(){
                        console.log(data)
                        alert("审核失败")
                        location.href="AuditReport.html"
                    })
                })
            }
            if(type3=="23"){
                var html3 = _.template($("#love_yiyuan").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).success(function(){
                        console.log(data)
                        alert("审核通过")
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).success(function(){
                        console.log(data)
                        alert("审核失败")
                        location.href="AuditReport.html"
                    })
                })
            }
            if(type3=="24"){
                var html3 = _.template($("#shiyedanwei2").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
                        console.log(data)
                        alert("审核通过")
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).then(function(){
                        console.log(data)
                        alert("审核失败")
                        location.href="AuditReport.html"
                    })
                })
            }
            if(type3=="21"){
                var html3 = _.template($("#hongshizi").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
                        console.log(data)
                        alert("审核通过")
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).then(function(){
                        console.log(data)
                        alert("审核失败")
                        location.href="AuditReport.html"
                    })
                })
            }
            if(type3=="1"){
                data.idimgs=data.idimgs.split(",")

                var html3 = _.template($("#zhaoduixiang").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
                        console.log(data)
                        alert("审核通过")
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).then(function(){
                        console.log(data)
                        alert("审核失败")
                        location.href="AuditReport.html"
                    })
                })
            }
            if(type3=="3"){
                var html3 = _.template($("#bendiqiye").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
                        console.log(data)
                        alert("审核通过")
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).then(function(){
                        console.log(data)
                        alert("审核失败")
                        location.href="AuditReport.html"
                    })
                })
            }
            if(type3=="4"){
                var html3 = _.template($("#shiyedanwei1").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
                        console.log(data)
                        alert("审核通过")
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).then(function(){
                        console.log(data)
                        alert("审核失败")
                        location.href="AuditReport.html"
                    })
                })
            }




        })


        //$.post("/user/zhancheck/Review_Detail",{type:type3,info_id:info_id}).then(function(data){
        //    console.log(data)
        //    var html3 = _.template($("#tpl3").html())
        //    $("#pageAuditContent").html(html3({list: data}))
        //    $("#pageAuditContent").show()
        //
        //    $(".button-danger").on("click",function(){
        //        $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
        //            location.href="AuditReport.html"
        //        })
        //
        //    })
        //    $(".button-success").on("click",function(){
        //        $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2})
        //            .then(function(){
        //                location.href="AuditReport.html"
        //            })
        //    })
        //
        //})
    })
    //点击其他跳转到详情页
    $(".AuditList_block").on("click",".eee",function(){
        var info_id=$(this).attr("data-id")
        var type3=$(this).attr("type")
        $.post("/user/zhancheck/Review_Detail",{type:type3,info_id:info_id}).then(function(data){
            console.log(data)
            if(type3=="21"){
                var html3 = _.template($("#love_shenfen").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $("#pageAuditContent").find("div.col-50").css("display","none")
            }
            if(type3=="22"){
                var html3 = _.template($("#love_yiyuan").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $("#pageAuditContent").find("div.col-50").css("display","none")
            }
            if(type3=="23"){
                var html3 = _.template($("#shiyedanwei2").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $("#pageAuditContent").find("div.col-50").css("display","none")
            }
            if(type3=="24"){
                var html3 = _.template($("#hongshizi").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $("#pageAuditContent").find("div.col-50").css("display","none")
            }
            if(type3=="1"){
                data.idimgs=data.idimgs.split(",")
                var html3 = _.template($("#zhaoduixiang").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $("#pageAuditContent").find("div.col-50").css("display","none")
            }
            if(type3=="3"){
                var html3 = _.template($("#bendiqiye").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $("#pageAuditContent").find("div.col-50").css("display","none")

            }
            if(type3=="4"){
                var html3 = _.template($("#shiyedanwei1").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $("#pageAuditContent").find("div.col-50").css("display","none")
            }




        })


        //$.post("/user/zhancheck/Review_Detail",{type:type3,info_id:info_id}).then(function(data){
        //    console.log(data)
        //    var html3 = _.template($("#tpl3").html())
        //    $("#pageAuditContent").html(html3({list: data}))
        //    $("#pageAuditContent").show()
        //
        //    $(".button-danger").on("click",function(){
        //        $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
        //            location.href="AuditReport.html"
        //        })
        //
        //    })
        //    $(".button-success").on("click",function(){
        //        $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2})
        //            .then(function(){
        //                location.href="AuditReport.html"
        //            })
        //    })
        //
        //})
    })
    $(".AuditList_block").on("click",".aaa,.ccc",function(){

        var info_id=$(this).attr("id")
        var type3=$(this).attr("type")
        $.post("/user/zhancheck/Review_Detail",{type:type3,info_id:info_id}).then(function(data){
            console.log(data)
            if(type3=="22"){
                var html3 = _.template($("#love_shenfen-1").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()

                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).then(function(){

                    })
                })
            }

            if(type3=="23"){
                var html3 = _.template($("#love_yiyuan-1").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).then(function(){

                    })
                })
            }
            if(type3=="24"){
                var html3 = _.template($("#shiyedanwei2-1").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).then(function(){

                    })
                })
            }
            if(type3=="21"){
                var html3 = _.template($("#hongshizi-1").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
                        location.href="AuditReport.html"
                    })
                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).then(function(){

                    })
                })
            }
            if(type3=="1"){
                data.idimgs=data.idimgs.split(",")
                var html3 = _.template($("#zhaoduixiang-1").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).then(function(){

                    })
                })
            }
            if(type3=="3"){
                var html3 = _.template($("#bendiqiye-1").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).then(function(){
                    })
                })
            }
            if(type3=="4"){
                var html3 = _.template($("#shiyedanwei1-1").html())
                $("#pageAuditContent").html(html3({list: data}))
                $("#pageAuditContent").show()
                $(".button-danger").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:1}).then(function(){
                        location.href="AuditReport.html"
                    })

                })
                $(".button-success").on("click",function(){
                    $.post("/user/zhancheck/Review_Pass",{type:type3,info_id:info_id,pass:2}).then(function(){

                    })
                })
            }
        })
    })
})



$("#pageAuditContent").on("click",".icon-left",function(){
    $.post('/user/zhancheck/Report_List', {type:1}).success(function (data) {
        console.log(data)
        for(var i=0;i<data.data.length;i++){
            if(data.data[i].content){
                data.data[i].content= data.data[i].content.split(",")
            }
        }

        for(var i=0;i<data.data.length;i++){
            if(data.data[i].img_path){
                data.data[i].img_path= data.data[i].img_path.split(",")
            }
        }
        for(var i=0;i<data.data.length;i++){
            if(data.data[i].imgs){
                data.data[i].imgs= data.data[i].imgs.split(",")
            }
        }
        var html = _.template($('#tpl1').html())
        $('.datawapper').html(html({list: data.data}))
        $("#pageAuditContent").hide()
        $("#pageIndex").show()
    })
})
