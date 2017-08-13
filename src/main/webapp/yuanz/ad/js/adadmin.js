/**
 * Created by li on 2016/7/19.
 */
$(function(){
//    样式

//    第一次渲染页面
    var page=1
    var type=0
    $.post("/user/ad/ownAdApplyList",{showtype:0,pageNum:page}).then(function(data){
        console.log(data)
        if(data.data=="ERROR"){
            data.data=[]
        }
        var html= _.template($("#adMessage").html())
        $(".list-block1 ul").html(html({list:data.data}))
    })

    $(".buttons-tab").on("click","a.button",function(){
        $(".buttons-tab").find(".active").removeClass("active");
        $(this).addClass("active")
        $("#ckgd").show()
        page=1
       type=$(this).attr("type")
        $.post("/user/ad/ownAdApplyList",{showtype:type}).then(function(data){
            if(data.data=="ERROR"){
                data.data=[]
                $("#ckgd").hide()
            }
            var html= _.template($("#adMessage").html())
            $(".list-block1 ul").html(html({list:data.data}))
        })
    })
//    点击编辑
    $("#pageIndex").on("click",".edit_org",function(e){
      //  console.log(data)
        e.stopPropagation();
        var id=$(this).parents("li").attr("data")
        console.log(id)
        location.href="ed.html?id="+id
    })
//    申请删除
    $("#pageIndex").on("click",".delete_blue",function(e){

        e.stopPropagation();
       // console.log(data)
        if(confirm("请确认删除")==true){
            var id=$(this).parents("li").attr("data")
            var self=this
            $.post("/user/ad/AdApplyDelete",{info_id:id}).then(function(data){
                console.log(data)
                $(self).parents("li").remove()
            })
        }
    })
//    分页
    $("#ckgd").click(function(){
        page++
        $.post("/user/ad/ownAdApplyList",{showtype:type,pageNum:page}).then(function(data){
            console.log(data)

            var html= _.template($("#adMessage").html())
            $(".list-block1 ul").append(html({list:data.data}))
            if(data.data=="ERROR"){
                data.data=[]
                $("#ckgd").hide()
            }
        })
        return false
    })
})
