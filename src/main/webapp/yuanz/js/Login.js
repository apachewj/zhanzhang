$(function(){
    $('#hu_complete1').click(function(){
        var tel=$('#tel').val();
        var password=$('#password').val();
        if(tel==""){
            alert("请输入手机号")
            return false;
        }
        if(password==""){
            alert("请输入密码")
            return false;
        }
        $.post('/masterLogin',{tel:tel,password:password}).then(function(data){
            console.log(data)
            if(data.data=='ERROR'){
                alert('登录失败')
            }else{
                alert("登陆成功")
                $.post("/masterLogin",{tel:tel,password:password})
                location.href="WebmasterHomepage.html"
            }
        })

    })
})

/*获取验证码*/
var isPhone = 1;
function getCode(e){
    checkPhone(); //验证手机号码
    if(isPhone){
        resetCode(); //倒计时
    }else{
        $('#telephone').focus();
    }
}

//验证手机号码
function checkPhone(){

    var phone = $('#telephone').val();
    var pattern = /^1[0-9]{10}$/;
    isPhone = 1;
    if(phone == '') {
        alert('请输入手机号码');
        isPhone = 0;
        return;
    }
    if(!pattern.test(phone)){
        alert('请输入正确的手机号码');
        isPhone = 0;
        return;
    }
}

//倒计时
function resetCode(){
    $('#ps30').hide();
    $('#J_resetCode').show();
    $('#J_second').html('60');
    
    var second = 60;
    var timer = null;
      var telephone=$("#telephone").val()

    $.post("/doapp_identify",{telephone:telephone,type:40}).then(function(data){
            console.log(data)
            if(data=="1002"){
                alert("手机格式不正确")
            }
            if(data=="1010"){
                alert("短信类型不存在")
            }
            if(data=="1003"){
                alert("半小时内已经连续获取三次，请稍后再是")
            }
            if(data=="1001"){
                alert("参数不全")
            }
            if(data=="1023"){
                alert("一分钟内已经发送过，不能频繁发送")
            }
            if (data=="1024"){
                alert("该手机号已经注册过")
            }
        })
        timer = setInterval(function(){
        second -= 1;
        if(second >0 ){
            $('#J_second').html(second);
        }else{
            clearInterval(timer);
            $('#ps30').show();
            $('#J_resetCode').hide();
        }
    },1000);
  
}

$(function(){
    $("#zhu_complete").click(function(){
        var telephone=$("#telephone").val()
        var code=$("#code").val()
        var p_1=$("#password_1").val()
        var p_2=$("#password_2").val()
        if (!telephone) {
            alert('请填写电话号码')
          return false;
        }
            if (!code) {
            alert('请填写验证码')
          return false;
        }
            if (!p_1) {
            alert('请填写新密码')
          return false;
        }
            if (!p_2) {
            alert('请再次填写新密码')
          return false;
        }
            if(p_1!=p_2){
                alert("俩次输入的密码不一致！")
                return false;
            }
        $.post("/MasterPwSet",{tel:telephone,code:code,password:p_1}).then(function(data){
            if(data.data=='ERROR'){
                alert('修改失败')
            }else{
                alert('修改成功')
                location.href="login.html"
            }
        })
    })

})


