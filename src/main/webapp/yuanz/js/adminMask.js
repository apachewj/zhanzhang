/**
 * Created by li on 2016/8/1.
 */
$(function(){

    var user_type= $.cookie("type")
    if(!user_type){
        location.href="Login.html"
    }
    if(user_type==4){
        $("#zhanzhangSH").hide()
        var ad= $.cookie("ad")
        var master= $.cookie("master")
        var message= $.cookie("message")
        var money= $.cookie("money")
        var report= $.cookie("report")
        if(ad==0){
            $("#ifad").hide()
        }
        if(master==0){
            $("#adminSH").hide()
        }
        if(message==0){
            $("#ifmessage").hide()
        }
        if(money==0){
            $("#ifmoney").hide()
        }
        if(report==0){
            $("#ifreport").hide()
        }
        $('.bar-tab').show()
    }else{
        $('.bar-tab').show()
    }

})