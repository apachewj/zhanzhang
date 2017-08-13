//function showList(id){
//    if ($('#'+id).hasClass('showList')){
//        $('#'+id).removeClass('showList').addClass('hideList');
//       $('#'+id).find('.icon').removeClass('icon-right').addClass('icon-down');
//    }else if($('#'+id).hasClass('hideList')){
//        $('#'+id).removeClass('hideList').addClass('showList');
//
//        $('#'+id).find('.icon').removeClass('icon-down').addClass('icon-right');
//    }
//
//}
$(function(){

      page=1
    //点击区域站长显示区域站长列表页 ajax请求
    $("#areaMaster").click(function(){
        $.post("/user/manager/MasterList",{type:0}).then(function(data){
             console.log(data)

            if (data.data == 'ERROR') {
                data.data = []
            }
            //判断站长权限
            var user_type=$.cookie("user_type")//获取站长级别
            if(user_type==1){
                var value= $.cookie("province")
                $("#select_province1").attr({disabled:true,value:value})
                region_init("select_province1","select_city1","select_area1",province);

            }
            if(user_type==2){
                var province= $.cookie("province")
                var city= $.cookie("city")
                $("#select_province1").attr({disabled:true,value:province})
                region_init("select_province1","select_city1","select_area1",province,city);
                $("#select_city1").attr({disabled:true,value:city})
                $(".sec").trigger("click")
                $("#pageWebmasterList").on("click",".fir",function(){
                    $(".sec").trigger("click")
                    alert("没有权限")
                    return false;
                })
            }
            if(user_type==3){
                var province= $.cookie("province")
                var city= $.cookie("city")
                var county= $.cookie("county")
                $("#select_province1").attr({disabled:true,value:province})
                region_init("select_province1","select_city1","select_area1",province,city);
                $("#select_city1").attr({disabled:true,value:city})
                region_init("select_province1","select_city1","select_area1",province,city,county);
                $("#select_area1").attr({disabled:true,value:county})
                $("#pageWebmasterList").on("click",".fir",function(){
                    alert("没有权限")
                    $(".thr ").trigger("click")
                    return false;
                })
                $("#pageWebmasterList").on("click",".sec",function(){
                    alert("没有权限")
                    $(".thr ").trigger("click")
                    return false;
                })
            }
            var html1= _.template($("#zzList").html())
            $("#pageWebmasterList ul").html(html1({list: data.data}))
            $("#pageWebmasterList").show()

        })
    })
    //根据区域筛选显示
    $(".col-33").on("click", function () {
        $(this).siblings(".col-33").children("a").addClass("disabled")
        $(this).find("a").removeClass("disabled")
    })
    //显示省级
    $("#pageWebmasterList").on("click",".fir",function(){
        $(".readmorelist").show()
         page=1;
        var p=$('#select_province1').val()
        $.post("/user/manager/MasterList",{type:1,province_id:p}).then(function(data){
            console.log(data)
            if(data.data=='ERROR'){
                data.data=[];
            }

            var html1= _.template($("#zzList").html())
            $("#pageWebmasterList ul").html(html1({list: data.data}))
        })
    })
    //显示市级
    $("#pageWebmasterList").on("click",".sec",function(){
         page=1;
        $(".readmorelist").show()
        var p=$('#select_province1').val()
        var c=$('#select_city1').val()
        var t=$('#select_area1').val()
        $.post("/user/manager/MasterList",{type:2,province_id:p,city_id:c}).then(function(data){
           if(data.data=='ERROR'){
               data.data=[];
           }
            var html1= _.template($("#zzList").html())
            $("#pageWebmasterList ul").html(html1({list: data.data}))
        })
    })
    //显示区级
    $("#pageWebmasterList").on("click",".thr",function(){
        $(".readmorelist").show()
         page=1;
        var p=$('#select_province1').val()
        var c=$('#select_city1').val()
        var t=$('#select_area1').val()
        $.post("/user/manager/MasterList",{type:3,province_id:p,city_id:c,county_id:t}).then(function(data){
            console.log(data)
            if(data.data=='ERROR'){
                data.data=[];
            }
            var html1= _.template($("#zzList").html())
            $("#pageWebmasterList ul").html(html1({list: data.data}))
        })
    })






    //点击添加 显示生成站长页
    $("#pageWebmasterListAdd").click(function(){
        $("#pageGenerationMaster").show()
        $("#pageWebmasterList").hide()
    })
var strimg=''; var strimg2=''
    //上传身份证图片
    $("#imgupload1").click(function(){
        $("#chooseFile1").click()
    })

    function doUpload1() {
        var chooseImg=$("#chooseFile1").val()
        var docObj=$("#chooseFile1")
        var strExtension = chooseImg.substr(chooseImg.lastIndexOf('.') + 1);
        if (strExtension != 'jpg' && strExtension != 'gif'
            && strExtension != 'png' && strExtension != 'bmp') {
            alert("请选择身份证图片文件");
            return false;
        }
        var formData1 = new FormData($( "#uploadForm1" )[0]);
       return $.ajax({
            url: '/uploadFile' ,
            type: 'POST',
            data: formData1,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                console.log(returndata);
                $obj = $('<div class="delete"><img style="display: block;margin: 5px auto;width:150px "/><a href="#" class="imgDelete"></a></div>')
                $(docObj).parent().after($obj);
                var imgObjPreview = $obj.find('img').attr('src', returndata.data);
                //error: function (returndata) {
                //    console.log(returndata);
                //}
            }
        });
    }
    $('#chooseFile1').change(function(){
        doUpload1()
    })

//上传签约照图片
    $("#imgupload2").click(function(){
        $("#chooseFile2").click()
    })

    //$("#imgupload2").change(function(){
    //    doUpload2().then(function(data){
    //        if(data.data!="ERROR") {
    //            strimg2 += data.data+","
    //        }
    //    });
    //})
    function doUpload2() {
        var chooseImg=$("#chooseFile2").val()
        var docObj=$("#chooseFile2")
        var strExtension = chooseImg.substr(chooseImg.lastIndexOf('.') + 1);
        if (strExtension != 'jpg' && strExtension != 'gif'
            && strExtension != 'png' && strExtension != 'bmp') {
            alert("请选择签约照图片文件");
            return false
        }
        var formData2 = new FormData($( "#uploadForm2" )[0]);
       return $.ajax({
            url: '/uploadFile' ,
            type: 'POST',
            data: formData2,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
           success: function (returndata) {
               console.log(returndata);
               $obj = $('<div class="delete"><img style="display: block;margin: 5px auto;width:150px "/><a href="#" class="imgDelete"></a></div>')
               $(docObj).parent().after($obj);
               var imgObjPreview = $obj.find('img').attr('src', returndata.data);
               //error: function (returndata) {
               //    console.log(returndata);
               //}
           }
            //error: function (returndata) {
            //    console.log(returndata);
            //}
        });
    }
    $("#chooseFile2").change(function(){
        doUpload2()
    })
    var id_city=null;
    var id_area=null;
    $('#select_city').change(function(){
        id_city=$('#select_city').val()
    })
    $('#select_area').change(function(){
        id_city=$('#select_area').val()
    })
    //点击确定生成 传数据 返回站长列表页
    $("#MasterProduction").click(function(){
            var province_id=$('#select_province').val()
        console.log(province_id)
            var city_id=$("#select_city").val()
            var county_id=$("#select_area").val()
            var name=$("#MasterName").val()
            var idcard=$("#idcard").val()
            var tel=$("#tel").val()
            var strimg=''
            $("#loadsfz").find("img").each(function(){
                strimg+=$(this).attr("src")+','
            })
        var strimg2=''
           $("#lodaqyz").find("img").each(function(){
               strimg2+=$(this).attr("src")+","
           })
            if(province_id==0){
                alert("请选择站长区域")
                return false
            }
            if(name==""){
                alert("请输入站长名称")
                return false
            }
        if(!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idcard))){
            alert("身份证号码有误，请重填");
            return false;
        }
        if(!(/^1[3|4|5|7|8]\d{9}$/.test(tel))){
            alert("手机号码有误，请重填");
            return false;
        }
            $.post("/user/manager/addMaster",{id_imgs:strimg,sign_imgs:strimg2,province_id:province_id,city_id:city_id,county_id:county_id,name:name,idcard:idcard,tel:tel}).then(function(data){
                console.log(data)
                if(data.data=="ERROR"){
                    alert("添加失败")
                }
                else{
                    alert("添加成功")
                        $.post("/user/manager/MasterList",{type:0}).then(function(data){
                            console.log(data)
                            if (data.data == 'ERROR') {
                                data.data = []
                            }
                            var html1= _.template($("#zzList").html())
                            $("#pageWebmasterList ul").html(html1({list: data.data}))
                            $("#pageWebmasterList").show()
                        })

                }

            })


    })
    //查看站长信息
    $("#pageWebmasterList").on("click",".col-15",function(){

        var info_id=$(this).parents("li").attr("id")
        $.post("/user/manager/Master",{info_id:info_id}).then(function(data){
            console.log(data)
            if(data.id_imgs){
                data.id_imgs=data.id_imgs.split(',')
            }
            if(data.sign_imgs){
                data.sign_imgs=data.sign_imgs.split(',')
            }

            var html= _.template($("#msatInfo").html())
            $("#pageWebmasterInformation .content").html(html({list:data}))
            $("#pageWebmasterInformation").show()
        })
    })
//    删除站长
    $("#pageWebmasterInformation").on("click",".delete",function(){
        var info_id=$("#pageWebmasterInformation").find("div.mar-list").attr("id")
        $.when( $.post("/user/manager/MasterDelete",{info_id:info_id}).then(function(data){
            console.log(data)
            //location.href="SettingManagement.html"
        }).done( $.post("/user/manager/MasterList",{type:0}).then(function(data){
            console.log(data)
            var html1= _.template($("#zzList").html())
            $("#pageWebmasterList ul").html(html1({list: data.data}))
            $("#pageWebmasterList").show()
            $("#pageWebmasterInformation").hide()
        })))

    })



//点击显示本站管理员列表页面
    $("#admin").click(function(){
        $.post("/user/manager/ManagerList").then(function(data){
            console.log(data)
            if(data.data=="ERROR"){
                data.data=[];
            }
            var html1= _.template($("#glyList").html())
            $("#pageListAdministrator ul").html(html1({list: data.data}))
            $("#pageListAdministrator").show()
        })
    })
    //点击显示添加管理员页面
    $("#adminAdd").click(function(){
        $("#pageAddListAdministrator").show()
        $("#pageListAdministrator").hide()
    })
    //点击下一步 ajax请求 并跳转到管理员权限页面
    $("#adminNext").click(function(){
        var name=$("#adminName").val()
        var tel=$("#adminTel").val()
        //判断电话号码$
     if(!(/^1[3|4|5|7|8]\d{9}$/.test(tel))){
         alert("手机号码有误，请重填");
         return false;
     }
        if(name==""){
            alert("请输入站长名称")
            return false
        }
        $.post("/user/manager/addManager",{name:name,tel:tel}).then(function(data){
            console.log(data,"************")
            if(data.data=="ERROR"){
                alert("无权限添加管理员")
                return false
            }
            if(data.data=="used tel"){
                alert("该号码已注册")
                return false
            }

            window.qjmaster_id=data.id
            $("#pageAddListAdministrator").hide()
            $("#pagePermissionAssignment").show()
        })

    })


    //判断取值（0或者1）
    $(".detail-li").on("click","div.checkbox",function(){
        if(!$(this).hasClass('disable')){
            $(this).addClass('disable')
        }else{
            $(this).removeClass('disable')
        }
       // console.log(num)
    })

    //
    $('#hide111').click(function(){
        $('.hidelist_row').toggle()
        if($('#SelectDiv').height()==30){
            $('#SelectDiv').height(120)
        }else{
            $('#SelectDiv').height(30)
        }
    })

// 点击完成

    $("#competenceOK").click(function(){
        console.log(qjmaster_id)

        if(!$(".funds1").hasClass("disable")){
            var money=0
        }else {
            var money=1
        }
        if(!$(".funds2").hasClass("disable")){
            var ad=0
        }else {
            var ad=1
        }
        if(!$(".funds3").hasClass("disable")){
            var report=0
        }else {
            var report=1
        }
        if(!$(".funds4").hasClass("disable")){
            var message=0
        }else {
            var message=1
        }
        if(!$(".funds5").hasClass("disable")){
            var master=0
        }else {
            var master=1
        }
        var master_id=qjmaster_id
        console.log(money+"--"+ad+"--"+report+"--"+message+"--"+master)
        $.post("/user/manager/addManagerPower",{money:money,ad:ad,report:report,message:message,master:master,manager_id:master_id}).then(function(data){
            console.log(data)
            if(data.data=="ERROR"){
                alert("添加失败")
                return false;
            }
            if(data.data=="SUCCESS"){
                alert("添加成功")
                $.post("/user/manager/ManagerList").success(function(data){
                    console.log(data)
                    if(data.data=="ERROR"){
                        data.data=[];
                    }
                    var html1= _.template($("#glyList").html())
                    $("#pageListAdministrator ul").html(html1({list: data.data}))
                    $("#pageListAdministrator").show()
                    $("#pagePermissionAssignment").hide()

                })
                return false
            }
            alert("系统错误")
        })
    })
//   点击删除管理员
    $("#pageListAdministrator").on("click",".detail-li",function(){
        var user_id = $.cookie("user_id")
        var info_id=$(this).attr("type")
        if(user_id != info_id){
            $(this).find(".xxxxx").show()
            $(".deleteZZ").show()
        }

    })
    $("#pageListAdministrator").on("click",".adminDel_1",function(){
        if(!confirm("确认删除")){
            $(".deleteZZ").hide()
            return false
        }

        var info_id=$(this).parents("li.detail-li").attr("type")
        $.post("/user/manager/ManagerDelete",{info_id:info_id}).then(function(data){

                console.log(data)
            $.post("/user/manager/ManagerList").then(function(data){
                console.log(data)
                $(".deleteZZ").hide()
                var html1= _.template($("#glyList").html())
                $("#pageListAdministrator ul").html(html1({list: data.data}))
                $("#pageListAdministrator").show()
            })
        })

    })


})
//删除图片
$("#pageGenerationMaster").on("click",".imgDelete",function(){
    $(this).parent().remove()
})
//function setImagePreview(avalue,id) {
//    //input
//    var docObj = document.getElementById(id);
////img
//    $obj=$('<div class="delete"><img style="display: block;margin: 5px auto"/><a href="#" class="imgDelete"></a></div>')
//    $(docObj).parent().after($obj);
//    var imgObjPreview =$obj.find('img')[0];
//    //div
//    var divs = document.getElementById("localImag");
//    if (docObj.files && docObj.files[0]) {
//        //火狐下，直接设img属性
//        imgObjPreview.style.display = 'block';
//        imgObjPreview.style.width = '150px';
//        //imgObjPreview.style.height = '50px';
//        //imgObjPreview.src = docObj.files[0].getAsDataURL();
//        //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
//        imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
//    } else {
//        //IE下，使用滤镜
//        docObj.select();
//        var imgSrc = document.selection.createRange().text;
//        var localImagId = document.getElementById("localImag");
//        //必须设置初始大小
//        localImagId.style.width = "150px";
//
//        //图片异常的捕捉，防止用户修改后缀来伪造图片
//        try {
//            localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
//            localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
//        } catch (e) {
//            alert("您上传的图片格式不正确，请重新选择!");
//            return false;
//        }
//        imgObjPreview.style.display = 'none';
//        document.selection.empty();
//    }
//    return true;
//}
//})
$("#pageListAdministrator").on("click",".adminDel_2",function(){
    //comfirm("确认删除？")
    $.post("/user/manager/ManagerList").then(function(data){
        console.log(data)
        $(".deleteZZ").hide()
        var html1= _.template($("#glyList").html())
        $("#pageListAdministrator ul").html(html1({list: data.data}))
        $("#pageListAdministrator").show()
    })
})

//var indeximgs=0
//function setImagePreview(avalue,id,id2) {
//    //input
//    indeximgs++
//    var docObj = document.getElementById(id);
////img
//    $(docObj).parent().after("<img id='imglist"+indeximgs+"' style='width:150px;display: block;margin:10px auto' '>")
//    var imgObjPreview = document.getElementById("imglist"+indeximgs);
//    //div
//    var divs = document.getElementById("localImag");
//    if (docObj.files && docObj.files[0]) {
//        //火狐下，直接设img属性
//        //imgObjPreview.style.height = '50px';
//        //imgObjPreview.src = docObj.files[0].getAsDataURL();
//        //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
//        imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
//    } else {
//        //IE下，使用滤镜
//        docObj.select();
//        var imgSrc = document.selection.createRange().text;
//        var localImagId = document.getElementById("localImag");
//        //必须设置初始大小
//        localImagId.style.width = "150px";
//
//        //图片异常的捕捉，防止用户修改后缀来伪造图片
//        try {
//            localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
//            localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
//        } catch(e) {
//            alert("您上传的图片格式不正确，请重新选择!");
//            return false;
//        }
//        imgObjPreview.style.display = 'none';
//        document.selection.empty();
//    }
//    return true;
//}

$('#dosearch').click(function() {
     page=1;
    var str = $('#search').val()
    var p = $('#select_province1').val()
    console.log(p)
    var c = $('#select_city1').val()
    var t = $('#select_area1').val()
    $.post("/user/manager/MasterList", {
        type: 0,
        province_id: p,
        city_id: c,
        county_id: t,
        searchname: str
    }).then(function (data) {
        console.log(data)
        if (data.data == 'ERROR') {
            data.data = [];
        }
        var html1 = _.template($("#zzList").html())
        $("#pageWebmasterList ul").html(html1({list: data.data}))
        $("#pageWebmasterList").show()
    })




})

$(function(){

$('.readmorelist').click(function(){
        //显示省级
        if(!$('.fir').hasClass('disabled')){
             page++;
                    var p=$('#select_province1').val()
                    $.post("/user/manager/MasterList",{type:1,province_id:p,pageNum:page}).then(function(data){
                        console.log(data)
                        if(data.data=='ERROR'){
                            data.data=[];
                            $(".readmorelist").hide()
                        }
                        var html1= _.template($("#zzList").html())
                        $("#pageWebmasterList ul").append(html1({list: data.data}))
                    })
            return false;
            
        }
       
    //显示市级
    if(!$('.sec').hasClass('disabled')){
         page++;
        var p=$('#select_province1').val()
        var c=$('#select_city1').val()
        var t=$('#select_area1').val()
        $.post("/user/manager/MasterList",{type:2,province_id:p,city_id:c,pageNum:page}).then(function(data){
           if(data.data=='ERROR'){
               data.data=[];
               $(".readmorelist").hide()
           }
            var html1= _.template($("#zzList").html())
            $("#pageWebmasterList ul").append(html1({list: data.data}))
        })
        return false
    }
    //显示区级
    if(!$('.thx').hasClass('disabled')){
         page++;
        var p=$('#select_province1').val()
        var c=$('#select_city1').val()
        var t=$('#select_area1').val()
        $.post("/user/manager/MasterList",{type:3,province_id:p,city_id:c,county_id:t,pageNum:page}).then(function(data){
            console.log(data)
            if(data.data=='ERROR'){
                data.data=[];
                $(".readmorelist").hide()
            }
            var html1= _.template($("#zzList").html())
            $("#pageWebmasterList ul").append(html1({list: data.data}))
        })
        return false;
    }
    return false;

})

$('.idchooose').click(function(){
   var data= $('.zhanzhangid:checked')
        if(data.length<1){
            alert("请选择站长")
            return false;
        }
        var str="?id="
        $(data).each(function(){
            str+=this.value+","
        })
        str+="&name="
        $(data).each(function(){
            str+=$(this).attr('data')+","
        })
         console.log(str);
         location.href="infofabu.html"+(str);
         return false;
})
        return false;
})

$("#setExit").click(function(){
    $.post("/logout").then(function(data){
        console.log(data)
        if(data.data=="SUCCESS"){
            alert("成功退出")
            location.href='Login.html'
        }
    })
})


$("#pageAddListAdministrator").on("click",".pull-left",function(){

    $.post("/user/manager/ManagerList").then(function(data){
        console.log(data)
        if(data.data=="ERROR"){
            data.data=[];
        }
        var html1= _.template($("#glyList").html())
        $("#pageListAdministrator ul").html(html1({list: data.data}))
        $("#pageListAdministrator").show()
        $("#pageAddListAdministrator").hide()
    })
})

$("#pagePermissionAssignment").on("click",".pull-left",function(){
    $("#pagePermissionAssignment").hide()

    $("#pageAddListAdministrator").show()
})

$("#pageGenerationMaster").on("click",".pull-left",function(){
    $.post("/user/manager/MasterList",{type:0}).then(function(data){
        console.log(data)

        if (data.data == 'ERROR') {
            data.data = []
        }
        //判断站长权限
        var user_type=$.cookie("user_type")//获取站长级别
        if(user_type==1){
            var value= $.cookie("province")
            $("#select_province1").attr({disabled:true,value:value})
            region_init("select_province1","select_city1","select_area1",province);

        }
        if(user_type==2){
            var province= $.cookie("province")
            var city= $.cookie("city")
            $("#select_province1").attr({disabled:true,value:province})
            region_init("select_province1","select_city1","select_area1",province,city);
            $("#select_city1").attr({disabled:true,value:city})
            $(".sec").trigger("click")
            $("#pageWebmasterList").on("click",".fir",function(){
                $(".sec").trigger("click")
                alert("没有权限")
                return false;
            })
        }
        if(user_type==3){
            var province= $.cookie("province")
            var city= $.cookie("city")
            var county= $.cookie("county")
            $("#select_province1").attr({disabled:true,value:province})
            region_init("select_province1","select_city1","select_area1",province,city);
            $("#select_city1").attr({disabled:true,value:city})
            region_init("select_province1","select_city1","select_area1",province,city,county);
            $("#select_area1").attr({disabled:true,value:county})
            $("#pageWebmasterList").on("click",".fir",function(){
                alert("没有权限")
                $(".thr ").trigger("click")
                return false;
            })
            $("#pageWebmasterList").on("click",".sec",function(){
                alert("没有权限")
                $(".thr ").trigger("click")
                return false;
            })
        }
        var html1= _.template($("#zzList").html())
        $("#pageWebmasterList ul").html(html1({list: data.data}))
        $("#pageGenerationMaster").hide()
        $("#pageWebmasterList").show()

    })
})