/**
 * Created by li on 2016/7/18.
 */
$("#pagebianji").on("click",".addXXX",function(){
    $(this).parents("div.zhanshi").remove()
})
function doUpload2(self) {
    // alert(1)
    var formData1 = new FormData();
    formData1.append('up_file', self.files[0])
    return $.ajax({
        url: '/uploadFile',
        type: 'POST',
        data: formData1,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
    }).then(function (data) {
        console.log(data)
        if (data.data != "ERROR") {
            $(self).attr('data', data.data)
            $(self).parents('.inp-cert').find('img').remove()
            $(self).parents('.inp-cert').append('<img style="position: absolute;width: 4rem;left: 11px;top: 0;height:4rem;border-radius: 5px;">')
            $(self).parents('.inp-cert').append('<a href="#" class="adDelete0"></a> ')
            $(self).parents('.inp-cert').find('img')[0].src = window.URL.createObjectURL(self.files[0]);
        }

    });
}
function doUpload(self){
    // alert(1)
    var formData1 = new FormData();
    formData1.append('up_file', self.files[0])
    return $.ajax({
        url: '/uploadFile',
        type: 'POST',
        data: formData1,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
    }).then(function (data) {
        console.log(data)
        if (data.data != "ERROR") {
            var html= _.template($("#tpl2").html())
            $("#addTemplate").append(html({list:data}))
        }

    });
}
$(function () {
//    点击 下一步
    $("#pageadpush").on("click", ".fabuNext", function () {
          var id=location.search
            id=id.substring(1)
            id=id.split("=")
            id=id[1]
        var province_id = $("#select_province").val()
        var city_id = $("#select_city").val()
        var county_id = $("#select_area").val()
        var showtype = $('.ping .on').attr("data")
        var days = []
        if (province_id == "") {
            alert("请选择省")
            return false
        }
        if (city_id == "") {
            alert("请选择市")
            return false
        }
        if (county_id == "") {
            alert("请选择区")
            return false
        }
        if (days == []) {
            alert("请选择日期")
            return false
        }
        $('.isok').each(function () {
            days.push($('#ag').val() + "-" + $(this).html());
        })
        console.log(days)
        var money=parseFloat($("#fabuMoney").text())
        $.ajax({
              type:"post",
            url:"/user/ad/changeAdApplyDays",
            data:{
            province_id:province_id,
            city_id:city_id,
            county_id:county_id,
            showtype:showtype,
                money:money,
            AdApply_id:id,
            days:days}
            , 'traditional': true
        }).then(function (data) {
            console.log(data)
            if (data.data == "ERROR") {
                alert("添加失败")
                return false
            } else {

                $.post("/user/ad/AdImgs").then(function(data){
                    console.log(data)
                    if(data.data!="ERROR"){
                           var html= _.template($("#tpl").html())
                         $("#addTemplate").html(html({list:data.data}))
                        
                    }
                     $("#pagebianji").show()
                     $("#page_comein").click()
                 
                })
              //显示广告发布页面
            }
            AdApply_id = data.AdApply_id//全局变量 申请ID
        })
    })


    $("#pagebianji").on("click", ".button-nav", function () {
        location.href = "adadmin.html"
    })
//    直接进入
    $("#page_comein").click(function () {
        $("#enterDetail").hide()
        $("#ad_content").show()
        $("#directEnter").show()
        $.post("/user/ad/AdImgs").then(function(data){
            console.log(data)
            var html= _.template($("#tpl").html())
            $("#addTemplate").html(html({list:data.data}))
        })
        //    点击支付
    });
    //判断选择 与 取消
    $("#pagebianji").on("click",".judge",function(){
          $(".selected222").removeClass("selected222")
           $(".zhanshi").each(function(){
            $(this).find('.judge ').eq(0).addClass("selectShow").siblings("div.judge").removeClass("selectShow").addClass("selectHide")
           })
        if($(this).hasClass("selectShow")){
            $(this).parents(".zhanshi").addClass("selected222")
            $(this).removeClass("selectShow").addClass("selectHide")
            $(this).siblings("div.judge").removeClass("selectHide").addClass("selectShow")
        }else {
            $(this).parents(".zhanshi").removeClass("selected222")
            $(this).removeClass("selectHide").addClass("selectShow")
            $(this).siblings("div.judge").removeClass("selectShow").addClass("selectHide")
        }
    })
    //    进入详情
    $("#page_details").click(function () {
       $("#enterDetail").show()
        $("#ad_content").hide()
        $("#directEnter").hide()
    });
    $("#pagebianji").on("click", ".button-success", function () {
        var store_id = 12
        var location = local
        var AdApply_id2 = AdApply_id
        console.log(AdApply_id)
        var type = $('.inp-text1:checked').val()
        var img = ''
        var imgcontext = ''
        var status = 2;
        $('.filesss').each(function () {
            if(!$(this).attr('data')){
                return
            }
            img += $(this).attr('data') + ","
        })
        $('.tianjiatupian ').each(function () {
            if(!$(this).val()){
                return
            }
            imgcontext += $(this).val() + ","
        })
        $.post('/user/ad/addAdApply', {
            store_id: store_id,
            location: location,
            AdApply_id: AdApply_id2,
            type: type,
            img: img,
            imgcontext: imgcontext,
            status: status
        }, function (data) {
            console.log(data)
        })

    })

    //上传图片


    $('#additem').click(function () {
        var str = '<li class="detail-li  item ">'
            + '<div class="row">'
            + ' <div class="col-33">'
            + ' <div id="pubScenic_c_image"  class="inp-cert">'
            + '<div class="cert-upload"></div>'
            + '<input type="file" class="cert-upload fileInp-opacity filesss"  multiple accept="image/*"  value="" onchange="doUpload2(this)">'
            + ' </div>'
            + '</div>'
            + ' <div class="col-50">'
            + ' <textarea id="pubScenic_c_context" eleType="input"  class="inp-text tianjiatupian col-100" placeholder="请添加图片说明"></textarea>'
            + ' </div>'
            + ' </div>'
            + ' <a href="" class="addDelete">'
            + '</a>'
            + ' </li>'
        $('#add').append(str)
        $("#www").addClass("addDelete")
    })
    //点击支付
    $("#pagebianji").on("click",".button-success",function(){
        var type = $('.inp-text1:checked').val()
        if(type==1){
            var store_id = 12
            var location = local
            var AdApply_id2 = AdApply_id
            var img = [];
            var status = 2;
            var img=$('.selected222').find('img').attr('src')
            $.post('/user/ad/changeAdApply', {
                store_id: store_id,
                location: location,
                AdApply_id: AdApply_id2,
                type: 1,
                img: img,
                status: 2
            }, function (data) {
                console.log(data)
                if(data.data=="ERROR"){
                    alert("支付失败")
                }else {
                    location.href="adadmin.html"
                }
            })
        }else {
            var store_id = 12
            var location = local
            var AdApply_id2 = AdApply_id
            console.log(AdApply_id)
            var title=$("#textareaTitle").val()
            var c_img = ''
            var img=$('.imglod').attr('data');
            var imgcontext=$(".textlod").val()
            var c_context = ''
            var status = 2;
            $('.filesss').each(function () {
                if(!$(this).attr('data')){
                    return
                }
                c_img += $('.filesss').attr('data') + ","
            })
            $('.tianjiatupian ').each(function () {
                if(!$(this).val()){
                    return
                }
                c_context += $(this).val() + ","
            })
            if(title==""){
                alert("请填写标题")
                return false
            }
            if(c_img==""){
                alert("请选择图片")
                return false
            }
            if(imgcontext==""){
                alert("请填写图片说明1")
                return false
            }
            if(c_context==""){
                alert("请填写图片说明2")
                return false
            }
            $.post('/user/ad/changeAdApply', {
                store_id: store_id,
                location: location,
                AdApply_id: AdApply_id2,
                type: 2,
                img:img,
                imgcontext:imgcontext,
                c_image:  c_img.substring(0,c_img.length-1),
                title:title,
                c_context: c_context.substring(0,c_context.length-1),
                status: 2
            }, function (data) {
                console.log(data)
                if(data.data=="ERROR"){
                    alert("支付失败")
                }else {
                    location.href="adadmin.html"
                }
            })
        }
    })
    //点击保存
    $("#pagebianji").on("click",".button-danger",function(){



            var type = $('.inp-text1:checked').val()
            if(type==1){
                var store_id = 12
                var location = local
                var AdApply_id2 = AdApply_id
                var img = [];
                var status = 3;
                var img=$('.selected222').find('img').attr('src')
                $.post('/user/ad/changeAdApply', {
                    store_id: store_id,
                    location: location,
                    AdApply_id: AdApply_id2,
                    type: 1,
                    img: img,
                    status: 3
                }, function (data) {
                    console.log(data)
                    if(data.data=="ERROR"){
                        alert("保存失败")
                    }else {
                        location.href="adadmin.html"
                    }
                })
        }else{
                var store_id = 12
                var location = local
                var AdApply_id2 = AdApply_id
                console.log(AdApply_id)
                var title=$("#textareaTitle").val()
                var c_img = ''
                var img=$('.imglod').attr('data');
                var imgcontext=$(".textlod").val()
                var c_context = ''
                var status = 3;
                $('.filesss').each(function () {
                    if(!$(this).attr('data')){
                        return
                    }
                    c_img += $(this).attr('data') + ","
                })
                $('.tianjiatupian ').each(function () {
                    if(!$(this).val()){
                        return
                    }
                    c_context += $(this).val() + ","
                })
                if(title==""){
                    alert("请填写标题")
                    return false
                }
                if(c_img==""){
                    alert("请选择图片")
                    return false
                }
                if(imgcontext==""){
                    alert("请填写图片说明1")
                    return false
                }
                console.log(c_context)
                if(c_context==""){
                    alert("请填写图片说明2")
                    return false
                }

                $.post('/user/ad/changeAdApply', {
                    store_id: store_id,
                    location: location,
                    AdApply_id: AdApply_id2,
                    type: 2,
                    img:img,
                    imgcontext:imgcontext,
                    c_image:  c_img.substring(0,c_img.length-1),
                    title:title,
                    c_context: c_context.substring(0,c_context.length-1),
                    status: 3
                }, function (data) {
                    console.log(data)
                    if(data.data=="ERROR"){
                        alert("保存失败")
                    }else {
                        location.href="adadmin.html"
                    }
                })
        }

})
    //点击管理 跳转广告管理页面
    $("#pageadmanage").on("click", ".button-link", function () {
        location.href = "adadmin.html"
    })
    $('#directEnter').click(function(){
        $('#imgla').click();
    })
//    删除
    $("#pagebianji").on("click",".addDelete",function(){
        $(this).parents("li.item").remove()
        return false
    })
})


$("#pagebianji").on("click",".adDelete0",function () {
    $(this).parents("div.inp-cert").find("img,a").remove()
})





$("#pageadpush").on("click",".pull-left",function(){
    $("#pageadpush").hide()
    $("#pageadmanage").show()
})

$("#pagebianji").on("click",".pull-left",function(){

    $("#pagebianji").hide()
    $("#pageadpush").show()
})