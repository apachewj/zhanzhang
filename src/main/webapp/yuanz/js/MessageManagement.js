
$(function() {
    $(".datawapper").on("click", "#demandShield", function () {
        var info_id = $(this).parents(".detail-li").attr("id")
        var type = $(this).parents(".detail-li").attr("type")
        $.post("/user/zhancheck/UserManager_Change", {type: type, info_id: info_id}).then(function (data) {
            console.log(data)
            if (data.data == "SUCCESS") {
                alert("屏蔽成功")
            }
        })
    })

    //举报管理删除

    $(".datawapper").on('click', '.delete_001', function () {
        var id = $(this).attr("data-id")
        type = $(this).attr("type");
        var self = this
        $.post("/user/zhancheck/Report_Delete", {info_id: id, info_type: type}).success(function (data) {
            if (!confirm("请确认删除！") == true) {
                return false
            } else {
                $(self).parents(".card").remove()
            }
        })
    })

//    导航央视切换
    $('#pageIndex .content').on("click", "li", function () {
        $("#pageIndex .content").find(".selected").removeClass("selected")
        $(this).addClass("selected")
    })
//    第一次请求Ajax
    var page = 1
    var type = 1
    $.post("/user/zhancheck/AllList", {types: type}).then(function (data) {
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
        console.log(data)
        var html = _.template($('#tpl1').html())
        $('.datawapper').html(html({list: data.data}))
    })
    //列表点击 ajax请求 渲染页面
    $(".tab_title ul li").on("click", function () {
        $(".readmonre").show()
        $("#spection").removeClass("disabled")
        type = $(this).attr("type");
        page = 1
        $.post("/user/zhancheck/AllList", {types: type}).then(function (data) {
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
            console.log(data)

            var html = _.template($('#tpl1').html())
            if (data.data == 'ERROR') {
                data.data = []
            }
            $('.datawapper').html(html({list: data.data}))
        })
    })
//    讯息管理删除
    $(".datawapper").on('click', '.delete_00001', function () {
        var id = $(this).attr("data-id")
        type = $(this).attr("type");
        var self = this
        $.post("/user/zhancheck/Report_Delete", {info_id: id, info_type: type}).then(function (data) {
            if (!confirm("请确认删除！") == true) {
                return false
            } else {
                $(self).parents(".card").remove()
            }
        })
    })

    // 搜索
    $("#icon-search").on("click", function () {
        var searchname = $("#search1").val()

        $.post("/user/zhancheck/AllList", {searchname: searchname, types: type}).then(function (data) {
            console.log(data)
            var html = _.template($('#tpl1').html())
            if (data.data == 'ERROR') {
                data.data = []
            }
            $('.datawapper').html(html({list: data.data}))
        })
    })

    //分页1
    $('.readmonre').click(function () {
        page++
        $.post('/user/zhancheck/AllList', {types: type, pageNum: page}).then(function (data) {
            console.log(data)
            var html = _.template($('#tpl1').html())
            if (data.data == "ERROR") {
                $(".readmonre").hide()
            }
            $('.datawapper').append(html({list: data.data}))
        })
        return false;
    })

//=======
//    本地特产


    $("#localSpecilty").on("click", function () {
        //判断站长权限
        //$(".sjld").append("<br><span class='tip1' style='color: red'>提示：请选择到您要操作的县(区)！！！</span>")
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

            $.post("/user/local/Local", {county_id: county}).then(function(data){
                if(data.data=="ERROR"){
                    //var province= $.cookie("province")
                    //var city= $.cookie("city")
                    //var county= $.cookie("county")
                    //$("#select_province2").attr({disabled:true,value:province})
                    //region_init("select_province2","select_city2","select_area2",province,city);
                    //$("#select_city2").attr({disabled:true,value:city})
                    //region_init("select_province2","select_city2","select_area2",province,city,county);
                    //$("#select_area2").attr({disabled:true,value:county})


                }else{

                    $(".myadd_localintroduction").hide();
                    var info1=setInterval(autoImg,1500);

                    var html = _.template($("#bendiInfo").html())
                    $("#pageLocalSpeciality").find("div.content1").html(html({list: data}))


                    //渲染本地特产
                    window.local_id=data.id
                    console.log(local_id)
                    $.post("/user/local/ProductList", {local_id: local_id}).then(function (data) {
                        console.log(data)
                        if (data.data == "ERROR") {
                            data.data = [];
                        }
                        for (var i = 0; i < data.data.length; i++) {
                            if (data.data[i].img_path) {
                                data.data[i].img_path = data.data[i].img_path.split(",")
                            }
                        }
                        var html = _.template($("#bendiSpec").html())
                        $("#pageLocalSpeciality").find("div.content2").html(html({list: data.data}))
                    })
                }
            })


        }
        var county_id = $("#select_area1").val()

        //渲染本地信息和特产
        $("#select_area1").change(function(){
            $("#pageLocalSpeciality").show()
            var user_type=$.cookie("user_type")//获取站长级别
            if(user_type==1){
                var value= $.cookie("province")
                $("#select_province2").attr({disabled:true,value:value})
                region_init("select_province2","select_city2","select_area2",province);
            }
            if(user_type==2){
                var province= $.cookie("province")
                var city= $.cookie("city")
                $("#select_province2").attr({disabled:true,value:province})
                region_init("select_province2","select_city2","select_area2",province,city);
                $("#select_city2").attr({disabled:true,value:city})


            }
            if(user_type==3){
                var province= $.cookie("province")
                var city= $.cookie("city")
                var county= $.cookie("county")
                $("#select_province2").attr({disabled:true,value:province})
                region_init("select_province2","select_city2","select_area2",province,city);
                $("#select_city2").attr({disabled:true,value:city})
                region_init("select_province2","select_city2","select_area2",province,city,county);
                $("#select_area2").attr({disabled:true,value:county})
            }
            var county_id = $("#select_area1").val()
            var province_id = $("#select_province1").val()
            var city_id = $("#select_city1").val()
            $.post("/user/local/Local", {county_id: county_id}).then(function (data) {
                console.log(data)
                if(data.data=="ERROR"){
                    $(".myadd_localintroduction").show();
                    $("#pageLocalSpeciality").find("div.content1").html("");
                    $("#pageLocalSpeciality").find("div.content2").html("");
                    return false
                }else{
                $(".myadd_localintroduction").hide();
                var html = _.template($("#bendiInfo").html())
                $("#pageLocalSpeciality").find("div.content1").html(html({list: data}))
                }
                //渲染本地特产
                window.local_id=data.id
                console.log(local_id)
                $.post("/user/local/ProductList", {local_id: local_id}).then(function (data) {
                    console.log(data)
                    if (data.data == "ERROR") {
                        data.data = [];
                    }
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].img_path) {
                            data.data[i].img_path = data.data[i].img_path.split(",")
                        }
                    }
                    var info1=setInterval(autoImg,1500);
                    var html = _.template($("#bendiSpec").html())
                    $("#pageLocalSpeciality").find("div.content2").html(html({list: data.data}))
                })
            })
            $(".tip1").hide()
        })

        $("#pageLocalSpeciality").show()
        $(".tip1").empty()

        //删除产品
        $("#pageLocalSpeciality").on("click", ".deleteimg", function () {
            var info_id = $(this).parents("li").attr("class")
            console.log("info_id:" + info_id)
            var self = this
            $.post("/user/local/ProductDelete", {info_id: info_id}).then(function (data) {
                console.log(data)
                if (data.data == "SUCCESS") {
                    $(self).parents("li").remove()
                    alert("删除成功")
                    var local_id = $.cookie("#select_area1").val()
                    var county_id=$(this)
                    //渲染本地信息
                    $.post("/user/local/Local", {county_id: county_id}).then(function (data) {
                        console.log(data)
                        if(data.data=="ERROR"){
                            $("#pageLocalIntroduction").show()
                            return false
                        }
                        var html = _.template($("#bendiInfo").html())
                        $("#pageLocalSpeciality").find("div.content1").html(html({list: data}))

                        //渲染本地特产
                        window.local_id=data.id
                        console.log(local_id)
                        $.post("/user/local/ProductList", {local_id: local_id}).then(function (data) {
                            console.log(data)
                            if (data.data == "ERROR") {
                                data.data = [];
                            }
                            for (var i = 0; i < data.data.length; i++) {
                                if (data.data[i].img_path) {
                                    data.data[i].img_path = data.data[i].img_path.split(",")
                                }
                            }
                            var html = _.template($("#bendiSpec").html())
                            $("#pageLocalSpeciality").find("div.content2").html(html({list: data.data}))
                        })
                    })

                } else {
                    alert("删除失败")
                }
            })
        })
        //删除本地介绍  未做


        //          添加本地产品
        $("#pageLocalSpeciality").on("click", "#publish", function () {
            $("#pageSpecialityAdd").show()
        })
        //上传图片1
        function doUpload1() {
            var chooseImg = $("#chooseFile1").val()
            var strExtension = chooseImg.substr(chooseImg.lastIndexOf('.') + 1);
            if (strExtension != 'jpg' && strExtension != 'gif'
                && strExtension != 'png' && strExtension != 'bmp') {
                alert("请选择图片文件");
                return false;
            }
            var formData1 = new FormData($("#uploadForm1")[0]);
            return $.ajax({
                url: '/uploadFile',
                type: 'POST',
                data: formData1,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
            });
        }

//点击发送
        $("#pageSpecialityAdd").on("click", ".button-success", function () {
            var title = $("#pageSpecialityAdd").find(".title1").val()
            var etitle = $("#pageSpecialityAdd").find(".etitle").val()
            // var c_context = $("#pageSpecialityAdd").find("textarea").val()
            var img = ''
            var imgcontext = '';
            $('.filesss').each(function () {
                img += $(this).attr('data') + ","
            })
            $('.tianjiatupian ').each(function () {
                imgcontext += $(this).val() + ","
            })
            if (title == "") {
                alert("请输入标题")
                return false
            } else if (etitle == "") {
                alert("请输入副标题")
                return false
            } else if (imgcontext == ",") {
                alert("请输入介绍")
                return false
            } else if (img == "undefined,") {
                alert("请选择图片")
                return false
            }
            $.post("/user/local/addProduct", {
                title: title,
                etitle: etitle,
                c_context: imgcontext,
                c_image: img,
                local_id: local_id
            }).then(function (data) {
                console.log(data)
                if (data.data == "SUCCESS") {
                    alert("添加成功")
                    $.post("/user/local/ProductList", {local_id: local_id}).then(function (data) {
                        console.log(data)
                        if (data.data == "ERROR") {
                            data.data = [];
                        }

                        for (var i = 0; i < data.data.length; i++) {
                            if (data.data[i].img_path) {
                                data.data[i].img_path = data.data[i].img_path.split(",")
                            }
                        }
                        var html = _.template($("#bendiSpec").html())
                        $("#pageLocalSpeciality").find("div.content2").html(html({list: data.data}))
                    })
                    $("#pageLocalSpeciality").show()
                    $("#pageSpecialityAdd").hide()
                } else {
                    alert("添加失败")
                }
            })
        })

//点击取消
        $("#pageSpecialityAdd").on("click", ".button-danger", function () {
            location.href = "MessageManagement.html"
        })

    })


//点击编辑
    $(".content1").on('click', '#exxx', function () {
        // alert(1)
        $(".myadd_localintroduction").show();
        $("#pageLocalSpeciality").find("div.content1").html("");
        $("#pageLocalSpeciality").find("div.content2").html("");

        //var user_type=$.cookie("user_type")//获取站长级别
        //if(user_type==1){
        //    var province= $.cookie("province")
        //    $("#select_province2").attr({disabled:true,value:province})
        //    region_init("select_province2","select_city2","select_area2",province);
        //
        //
        //}
        //if(user_type==2){
        //    var province= $.cookie("province")
        //    var city= $.cookie("city")
        //    $("#select_province2").attr({disabled:true,value:province})
        //    region_init("select_province2","select_city2","select_area2",province,city);
        //    $("#select_city2").attr({disabled:true,value:city})
        //    $(".sec").trigger("click")
        //
        //}
        //if(user_type==3){
        //    var province= $.cookie("province")
        //    var city= $.cookie("city")
        //    var county= $.cookie("county")
        //    $("#select_province2").attr({disabled:true,value:province})
        //    region_init("select_province2","select_city2","select_area2",province,city);
        //    $("#select_city2").attr({disabled:true,value:city})
        //    region_init("select_province2","select_city2","select_area2",province,city,county);
        //    $("#select_area2").attr({disabled:true,value:county})
        //}
    })
    //上传图片2
    $(".fileElem-photo").click(function () {
        $("#chooseFile2").click()
    })
    //function doUpload2() {
    //    var chooseImg = $("#chooseFile2").val()
    //    var strExtension = chooseImg.substr(chooseImg.lastIndexOf('.') + 1);
    //    if (strExtension != 'jpg' && strExtension != 'gif'
    //        && strExtension != 'png' && strExtension != 'bmp') {
    //        alert("请选择图片文件");
    //        return false;
    //    }
    //    var formData1 = new FormData($("#uploadForm2")[0]);
    //    return $.ajax({
    //        url: '/uploadFile',
    //        type: 'POST',
    //        data: formData1,
    //        async: false,
    //        cache: false,
    //        contentType: false,
    //        processData: false,
    //    });
    //}


})
//点击发送  发布本地信息
$("#pageLocalSpeciality").on("click", ".button-success", function () {
    var user_type=$.cookie("user_type")//获取站长级别
    if(user_type==1){
        var province= $.cookie("province")
        $("#select_province1").attr({disabled:true,value:province})
        var city= $("#select_city1").val()
        var county= $("#select_area1").val()
        var imgs = ''
        var name = $("#shuryAdress").val()
        var introduce = $("#pageLocalIntroduction").find("textarea").val()
        console.log(county+"1")
        $('.filesss123').each(function () {
            imgs += $(this).attr('src') + ","
        })
        if(name==""){
            alert("情填写地名")
            return false
        }
        if(introduce==""){
            alert("情填写地名")
            return false
        }
        if(imgs==""){
            alert("请选择图片")
            return false
        }
        if(county==""){
            alert("请选择地区")
            return false
        }

        $.post("/user/local/addLocal", {
            city_id: city,
            name: name,
            introduce: introduce,
            imgs: imgs,
            province_id: province,
            county_id: county
        }).then(function (data) {
            console.log(data)
            if (data.data == "SUCCESS") {
                alert("发布成功")
                location.href = "MessageManagement.html"
            } else {
                alert("发布失败")
            }
        })
    }else if(user_type==2){

        var province= $.cookie("province")
        var city= $.cookie("city")
        $("#select_province1").attr({disabled:true,value:province})
        $("#select_city1").attr({disabled:true,value:city})
        //$(".sec").trigger("click")
        var county= $("#select_area1").val()
        console.log(county)

        var imgs = ''
        var name = $("#shuryAdress").val()
        var introduce = $("#pageLocalIntroduction").find("textarea").val()
        $('.filesss123').each(function () {
            imgs += $(this).attr('src') + ","
        })
        if(name==""){
            alert("情填写地名")
            return false
        }
        if(introduce==""){
            alert("情填写地名")
            return false
        }
        if(imgs==""){
            alert("请选择图片")
            return false
        }
        if(county==""){
            alert("请选择地区")
            return false
        }
        $.post("/user/local/addLocal", {
            city_id: city,
            name: name,
            introduce: introduce,
            imgs: imgs,
            province_id: province,
            county_id: county
        }).success(function (data) {
            console.log(data)
            if (data.data == "SUCCESS") {
                alert("发布成功")
                location.href = "MessageManagement.html"
            }
        })
    } else if(user_type==3) {
        var province= $.cookie("province")
        var city= $.cookie("city")
        var county= $.cookie("county")
        $("#select_province1").attr({disabled:true,value:province})
        $("#select_city1").attr({disabled:true,value:city})
        $("#select_area1").attr({disabled:true,value:county})
        var imgs = ''
        var name = $("#shuryAdress").val()
        var introduce = $("#pageLocalIntroduction").find("textarea").val()
        $('.filesss123').each(function () {
            imgs += $(this).attr('src') + ","
        })
        if(name==""){
            alert("情填写地名")
            return false
        }
        if(introduce==""){
            alert("情填写地名")
            return false
        }
        if(imgs==""){
            alert("请选择图片")
            return false
        }
        if(county==""){
            alert("请选择地区")
            return false
        }
        $.post("/user/local/addLocal", {
            city_id: city,
            name: name,
            introduce: introduce,
            imgs: imgs,
            province_id: province,
            county_id: county
        }).then(function (data) {
            console.log(data)
            if (data.data == "SUCCESS") {
                alert("发布成功")
                location.href = "MessageManagement.html"
            } else {
                alert("发布失败")
            }
        })
    }else{
        var province= $.cookie("province")
        var province=$("#select_province1").val()
        var city= $("#select_city1").val()
        var county= $("#select_area1").val()
        var imgs = ''
        var name = $("#shuryAdress").val()
        var introduce = $("#pageLocalIntroduction").find("textarea").val()
        console.log(county+"1")
        $('.filesss123').each(function () {
            imgs += $(this).attr('src') + ","
        })
        if(name==""){
            alert("情填写地名")
            return false
        }
        if(introduce==""){
            alert("情填写地名")
            return false
        }
        if(imgs==""){
            alert("请选择图片")
            return false
        }
        if(county==""){
            alert("请选择地区")
            return false
        }

        $.post("/user/local/addLocal", {
            city_id: city,
            name: name,
            introduce: introduce,
            imgs: imgs,
            province_id: province,
            county_id: county
        }).then(function (data) {
            console.log(data)
            if (data.data == "SUCCESS") {
                alert("发布成功")
                location.href = "MessageManagement.html"
            } else {
                alert("发布失败")
            }
        })
    }


    $("body").on("click", ".icon-left", function () {
        location.href = "MessageManagement.html"
    })



    //删除



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
                $(self).parents('.inp-cert').append('<img style="position: absolute;width: 88px;height:90px;left: 11px;border-radius: 5px;">')
                $(self).parents('.inp-cert').append('<a href="#"  class="bgImgDelete"><img src="../images/tuichu.png"style="width: 15px;float: position: absolute;left: 82px;"></a>')
                $(self).parents('.inp-cert').find('img')[0].src = window.URL.createObjectURL(self.files[0]);
            }

        });
    }

    $("#pageSpecialityAdd").on("click", ".bgImgDelete", function () {
        $(this).parents("div.col-33").find("img").remove()
        $(this).parents("div.col-33").find("a").remove()
    })



    function doUpload1(self) {
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
                $(self).parents('.item-inner').append('<div style="float:left"><img class="filesss123" style="position: relative;width: 88px;height:90px;left: 11px;border-radius: 5px;margin-top: 10px;float: left" src="' + data.data + '"><a href="#"  class="bgImgDelete1"><img src="../images/tuichu.png"style="width: 15px;position: relative;right: 5px;top: 4px"></a></div>')

            }

        });
    }

    $("#pageLocalIntroduction").on("click", ".bgImgDelete1", function () {
        $(this).parent().remove()
    })



//点击取消 发布本地信息
$("#pageLocalSpeciality").on("click",".quxiao",function(){
    location.href = "MessageManagement.html"
})

//  点击关联
$("#pageLocalSpeciality").on("click", ".button-link", function () {

    $("#pageApplyAdd").show();
    var page = 1
    $.post("/user/local/ProductShowCheckList", {pageNum: page}).then(function (data) {
        console.log(data)
        for( var i=0;i<data.data.length;i++){
            if(data.data[i].content){
                data.data[i].content=data.data[i].content.split(",")
            }
        }
        for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].img_path) {
                data.data[i].img_path = data.data[i].img_path.split(",")
            }
        }
        var html = _.template($("#applyAdd").html())
        $("#pageApplyAdd").find("div.shenqinglist_content").html(html({list: data.data}))
    })
})
//审核情况
$("#pageApplyAdd").on("click", ".tongyibutton", function () {
    var info_id = $(this).parents("div.Speciality").attr("type")
    $.post("/user/local/ProductShowPass", {info_id: info_id, pass: 1}).then(function (data) {
        console.log(data)
        if (data.data == "SUCCESS") {
            alert("审核通过")
            $.post("/user/local/ProductShowCheckList", {pageNum: page}).then(function (data) {
                console.log(data)
                var html = _.template($("#applyAdd").html())
                $("#pageApplyAdd").find("div.shenqinglist_content").html(html({list: data.data}))
            })
        } else {
            alert("审核失败")
        }
    })
})
$("#pageApplyAdd").on("click", ".jujuebutton", function () {
    var info_id = $(this).parents("div.Speciality").attr("type")
    $.post("/user/local/ProductShowPass", {info_id: info_id, pass: 2}).then(function (data) {
        console.log(data)
        if (data.data == "SUCCESS") {
            alert("已拒绝审核")
            $.post("/user/local/ProductShowCheckList", {pageNum: page}).then(function (data) {
                var html = _.template($("#applyAdd").html())
                $("#pageApplyAdd").find("div.shenqinglist_content").html(html({list: data.data}))
            })
        }
    })
})
//删除
$("#pageApplyAdd").on("click", ".shancubutton", function () {
    var info_id = $(this).parents("div.Speciality").attr("type")
    $.post("/user/local/ProductShowDelete", {info_id: info_id}).then(function (data) {
        console.log(data)
        if (data.data == "SUCCESS") {
            if (confirm("请确认删除") == true) {
             
                $(this).parents("div.Speciality").remove()
                $.post("/user/local/ProductShowCheckList", {pageNum: page}).then(function (data) {
                    var html = _.template($("#applyAdd").html())
                    $("#pageApplyAdd").find("div.shenqinglist_content").html(html({list: data.data}))
                })
            }
        }
    })
})



$('#additem').click(function () {
    var str = '<div class="item-input textarea-row itemss">'
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
        + ' </a>'
        + ' </div>'
    $('.itemss:last').after(str)
    $("#www").addClass("addDelete")
})


$("#pageSpecialityAdd").on("click", ".addDelete", function () {
    if (!confirm("请确认删除！") == true) {
        return false
    } else {
        $(this).parents("div.itemss").remove()
    }
    return false
})

//返回上一步

//$("#pageLocalIntroduction").on("click",".pull-left",function(){
//
//    var user_type=$.cookie("user_type")//获取站长级别
//    if(user_type==1){
//        var value= $.cookie("province")
//        $("#select_province2").attr({disabled:true,value:value})
//        region_init("select_province2","select_city2","select_area2",province);
//    }
//    if(user_type==2){
//        var province= $.cookie("province")
//        var city= $.cookie("city")
//        $("#select_province2").attr({disabled:true,value:province})
//        region_init("select_province2","select_city2","select_area2",province,city);
//        $("#select_city2").attr({disabled:true,value:city})
//    }
//    if(user_type==3){
//        var province= $.cookie("province")
//        var city= $.cookie("city")
//        var county= $.cookie("county")
//        $("#select_province2").attr({disabled:true,value:province})
//        region_init("select_province2","select_city2","select_area2",province,city);
//        $("#select_city2").attr({disabled:true,value:city})
//        region_init("select_province2","select_city2","select_area2",province,city,county);
//        $("#select_area2").attr({disabled:true,value:county})
//    }
//    var county_id = $("#select_area1").val()
//    var province_id = $("#select_province1").val()
//    var city_id = $("#select_city1").val()
//    $.post("/user/local/Local", {county_id: county_id}).then(function (data) {
//        console.log(data)
//        if(data.data=="ERROR"){
//            $("#pageLocalIntroduction").show()
//            return false
//        }
//        var html = _.template($("#bendiInfo").html())
//        $("#pageLocalSpeciality").find("div.content1").html(html({list: data}))
//
//        //渲染本地特产
//        window.local_id=data.id
//        console.log(local_id)
//        $.post("/user/local/ProductList", {local_id: local_id}).then(function (data) {
//            console.log(data)
//            if (data.data == "ERROR") {
//                data.data = [];
//            }
//            for (var i = 0; i < data.data.length; i++) {
//                if (data.data[i].img_path) {
//                    data.data[i].img_path = data.data[i].img_path.split(",")
//                }
//            }
//            var html = _.template($("#bendiSpec").html())
//            $("#pageLocalSpeciality").find("div.content2").html(html({list: data.data}))
//        })
//    })
//    $("#pageLocalIntroduction").hide()
//    $("#pageLocalSpeciality").show()
//    $(".tip1").hide()
//})



$("#pageApplyAdd").on("click",".pull-left",function(){

    var user_type=$.cookie("user_type")//获取站长级别
    if(user_type==1){
        var value= $.cookie("province")
        $("#select_province2").attr({disabled:true,value:value})
        region_init("select_province2","select_city2","select_area2",province);
    }
    if(user_type==2){
        var province= $.cookie("province")
        var city= $.cookie("city")
        $("#select_province2").attr({disabled:true,value:province})
        region_init("select_province2","select_city2","select_area2",province,city);
        $("#select_city2").attr({disabled:true,value:city})
    }
    if(user_type==3){
        var province= $.cookie("province")
        var city= $.cookie("city")
        var county= $.cookie("county")
        $("#select_province2").attr({disabled:true,value:province})
        region_init("select_province2","select_city2","select_area2",province,city);
        $("#select_city2").attr({disabled:true,value:city})
        region_init("select_province2","select_city2","select_area2",province,city,county);
        $("#select_area2").attr({disabled:true,value:county})
    }
    var county_id = $("#select_area1").val()
    var province_id = $("#select_province1").val()
    var city_id = $("#select_city1").val()
    $.post("/user/local/Local", {county_id: county_id}).then(function (data) {
        console.log(data)
        if(data.data=="ERROR"){
            $("#pageLocalIntroduction").show()
            return false
        }

        var html = _.template($("#bendiInfo").html())
        $("#pageLocalSpeciality").find("div.content1").html(html({list: data}))


        //渲染本地特产
        window.local_id=data.id
        console.log(local_id)
        $.post("/user/local/ProductList", {local_id: local_id}).then(function (data) {
            console.log(data)
            if (data.data == "ERROR") {
                data.data = [];
            }
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].img_path) {
                    data.data[i].img_path = data.data[i].img_path.split(",")
                }
            }
            var html = _.template($("#bendiSpec").html())
            $("#pageLocalSpeciality").find("div.content2").html(html({list: data.data}))
        })
    })
    $("#pageApplyAdd").hide()
    $("#pageLocalSpeciality").show()
    $(".tip1").hide()
})



$("#pageSpecialityAdd").on("click",".pull-left",function(){

    var user_type=$.cookie("user_type")//获取站长级别
    if(user_type==1){
        var value= $.cookie("province")
        $("#select_province2").attr({disabled:true,value:value})
        region_init("select_province2","select_city2","select_area2",province);
    }
    if(user_type==2){
        var province= $.cookie("province")
        var city= $.cookie("city")
        $("#select_province2").attr({disabled:true,value:province})
        region_init("select_province2","select_city2","select_area2",province,city);
        $("#select_city2").attr({disabled:true,value:city})
    }
    if(user_type==3){
        var province= $.cookie("province")
        var city= $.cookie("city")
        var county= $.cookie("county")
        $("#select_province2").attr({disabled:true,value:province})
        region_init("select_province2","select_city2","select_area2",province,city);
        $("#select_city2").attr({disabled:true,value:city})
        region_init("select_province2","select_city2","select_area2",province,city,county);
        $("#select_area2").attr({disabled:true,value:county})
    }
    var county_id = $("#select_area1").val()
    var province_id = $("#select_province1").val()
    var city_id = $("#select_city1").val()
    $.post("/user/local/Local", {county_id: county_id}).then(function (data) {
        console.log(data)
        if(data.data=="ERROR"){
            $("#pageLocalIntroduction").show()
            return false
        }
        var html = _.template($("#bendiInfo").html())
        $("#pageLocalSpeciality").find("div.content1").html(html({list: data}))

        //渲染本地特产
        window.local_id=data.id
        console.log(local_id)
        $.post("/user/local/ProductList", {local_id: local_id}).then(function (data) {
            console.log(data)
            if (data.data == "ERROR") {
                data.data = [];
            }
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].img_path) {
                    data.data[i].img_path = data.data[i].img_path.split(",")
                }
            }
            var html = _.template($("#bendiSpec").html())
            $("#pageLocalSpeciality").find("div.content2").html(html({list: data.data}))
        })
    })
    $("#pageSpecialityAdd").hide()
    $("#pageLocalSpeciality").show()
    $(".tip1").hide()
})

function autoImg(){
    var ulDom=$(".swiper-wrapper");
    var leftNum=parseInt(ulDom.css("left"));
    ulDom.animate({left:leftNum-320+"px"},500,function(){
        var li=ulDom.children()[0];
        li.remove();
        ulDom.append(li);
        ulDom.css("left","0px");
    });
}


