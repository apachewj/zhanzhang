$(function(){
    //广告图片点击到广告详情页
        var info_id=location.search.substr(1).split("=")[1]
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