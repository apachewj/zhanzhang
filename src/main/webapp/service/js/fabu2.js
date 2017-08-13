/**
 * Created by li on 2016/7/18.
 */
$("#pagebianji").on("click",".addXXX",function(){
    $(this).parents("div.zhanshi").remove()
})
function doUpload2(self) {
       // alert(1)
    var formData1 = new FormData();
    formData1.append('up_file',self.files[0])
    return $.ajax({
        url: '/uploadFile',
        type: 'POST',
        data: formData1,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
    }).then(function(data){
        console.log(data)
        if(data.data!="ERROR"){
            $(self).attr('data',data.data)
        }

    });
}
$(function(){
//    点击 下一步
    $("#pageadpush").on("click",".fabuNext",function(){
        var id=location.search
            id=id.substring(1)
            id=id.split("=")
            id=id[1]
            console.log(id);
        var province_id=$("#select_province").val()
        var city_id=$("#select_city").val()
        var county_id=$("#select_area").val()
        var showtype=$('.ping .on').attr("data")
        var days=[]
        if(province_id==""){
            alert("请选择省")
            return false
        }
        if(city_id==""){
            alert("请选择市")
            return false
        }
        if(county_id==""){
            alert("请选择区（县）")
            return false
        }
        if(days==[]){
            alert("请选择日期")
            return false
        }
        $('.isok').each(function(){
            days.push($('#ag').val()+"-"+$(this).html());
        })
        console.log(days)
        $.ajax({
            type:"post",
            url:"/user/ad/changeAdApplyDays",
            data:{
            province_id:province_id,
            city_id:city_id,
            county_id:county_id,
            showtype:showtype,
            AdApply_id:id,
            days:days
            }
        ,'traditional':true}).then(function(data){
            console.log(data)
            if(data.data=="ERROR"){
                alert("添加失败")
                return false
            }else{
                $("#pagebianji").show()//显示广告发布页面
            }
            AdApply_id=data.AdApply_id//全局变量 申请ID
        })
    })


    $("#pagebianji").on("click",".button-nav",function(){
        location.href="adadmin.html"
    })
//    直接进入
    $("#page_details").click(function(){
        $("#ad_content").hide();
        $("#tit_content").show();
        $("#zheng_content").show();
        $(".shangchuan").show();
        //    点击支付

    });
    $("#pagebianji").on("click","#zhifubtn",function(){

        alert(1)
        var store_id=12
        var location=local
        var AdApply_id2=AdApply_id
        console.log(AdApply_id)
        var type=$('.inp-text1:checked').val()
        var img=''
        var imgcontext=''
        var status=2;
        $('.filesss').each(function(){
            img+=$(this).attr('data')+","
        })
        $('.tianjiatupian ').each(function(){
            imgcontext+=$(this).val()+","
        })
        $.post('/user/ad/addAdApply',{store_id:store_id,location:location,AdApply_id:AdApply_id2,type:type,img:img,imgcontext:imgcontext,status:status},function(data){
             console.log(data)
        })

    })
//    进入详情
        $("#page_comein").click(function(){
            $("#ad_content").show();
            $("#tit_content").hide();
            $("#zheng_content").hide();
        });
    //上传图片


$('#additem').click(function(){
    var str='<li class="detail-li  item ">'
        +'<div class="row">'
        +' <div class="col-33">'
        +' <div id="pubScenic_c_image"  class="inp-cert">'
        +'<div class="cert-upload"></div>'
        +'<input type="file" class="cert-upload fileInp-opacity filesss"  multiple accept="image/*"  value="" onchange="doUpload2(this)">'
        +' </div>'
        +'</div>'
        +' <div class="col-50">'
        +' <textarea id="pubScenic_c_context" eleType="input"  class="inp-text tianjiatupian col-100" placeholder="请添加图片说明"></textarea>'
        +' </div>'
        +' </div>'
        +' </li>'
    $('.item:last').after(str)
})

    //点击管理 跳转广告管理页面
    $("#pageadmanage").on("click",".button-link",function(){
        location.href="adadmin.html"
    })

})
