+ function($) {
	"use strict";

	window.zhanzhang = window.zhanzhang || {};

	var baseUrl = 'http://localhost:8080';
    var urlProtocl = window.document.location.protocol;
    var urlHostname = window.document.location.hostname;
    var urlPort = window.document.location.port;
    if (urlPort=='80') {
        baseUrl = urlProtocl + '//' + urlHostname;
    } else {
        baseUrl = urlProtocl + '//' + urlHostname + ':'+urlPort;
    }

	zhanzhang.config = {
		// baseUrl: '',
		loginUrl: baseUrl + '/service/zhuce.html',
		login: baseUrl + '/login',
		reg:baseUrl + '/sigin',
		wang:baseUrl + '/PwSet',
		identify:baseUrl + '/doapp_identify',
		indexUrl: baseUrl + '/service/homepage.html',
		
		constant: {
			'0001': '服务器维护中',
			'0002': 'SUCCESS',
			'0003': 'ERROR',
			'0004': '提交成功！',
			'0005': '提交失败！',
			'0006': '收藏成功！',
			'0007': '收藏失败，已经收藏！',
			'0008': '收藏失败!',
			'0009': 'already stored',
			'0010': '删除成功！',
			'0011': '删除失败！',
			'0012': '没有符合条件信息!',
			'0013': '附近没有出租车!',
			'0014': '您已登记为出租车!',
			'0015': '已显示到最后一页!',
			'0016': '打车成功!',
			'0017': '打车失败!',
			'0018': '没有出租车记录',
			'0019': '取消收藏成功！',
			'0020': '取消收藏失败！',
			'1001': '请输入手机号！',
			'1002': '请输入密码！',
			'1003': '用户名或密码错误！',
			'1004': '登录成功！',
			'1005': '注册成功',
			'1006': '修改成功！',
			'2001': '注册成功！',
			'2002': '注册失败！',
			'3001': '请上传图片！',
			'3002': '请选择起点！',
			'3003': '请选择终点！',
			'3004': '请选择出发时间！',
			'3005': '请填写联系人！',
			'3006': '请填写手机号！',
			'3007': '请填写附言！',
			'3008': '请填写人数！',
			'3009': '请填写费用！',
			'3010': '请选择要求！',
			'3011': '请选择途径城市！',
			'3012': '请填写驾龄！',
			'3013': '请填写重量！',
			'3014': '请填写物品名！',
			'3015': '请填写体积！',
			'3016': '请填写车主姓名！',
			'3017': '请填写身份证号!',
			'3018': '请填写车牌号!',
			'3019': '请上传身份证正面!',
			'3020': '请上传身份证背面!',
			'3021': '请上传行驶证!',
			'3022': '请选择状态！',
			'4000': '格式错误！',
			'4001': '手机号格式错误！',
			'4002': '密码必须包含数字、字母和特殊字符，且长度6~20！',
			'4003': '两次密码不一致！',
			'4004': '格式为数字！',
			'4005': '格式为整数！',
			'4006': '格式为数值！',
			'4007': '格式为数值,最多保留两位小数！',
			'4008': 'aleady login',
			'5000':'1001',
			'5001':'1010',
			'5002':'1003',
			'5003':'1023',
			'5004':'1024',
			'5005':'1002',
			'5006':'1025',
			'5007':'1026',
		
		}
	}
//当前点击链接是否使用路由功能的自定义过滤器,返回 false 表示不使用路由功能，返回 true 表示进入路由功能后续处理
	$.config = {

		routerFilter: function($link) {
			 // 某个区域的 a 链接不想使用路由功能
			if ($link.is('.disable-router a')) {
				return false;
			}
			return true;
		}
	};
}(Zepto);



var debug = false;

$(function($) {
	"use strict";

	window.zhanzhang = window.zhanzhang || {}; 


	zhanzhang.tool = {
		ajax: function(url, data, context, type, delegate, error) {
			// data.ajax = 'car';
			var setting = {
				data: data,
				type: type,
				dataType: 'json',
				url: url,
				cache: false,
				success: function(d) {
					if (d && d.data && d.data == 'no login') {
						location.href = zhanzhang.config.loginUrl;
					} else {
						delegate(d);
					}
				},
				error: function(xhr, type) {
					error(xhr, type);
				}
			};
			if (context) {
				setting.context = context;
			}
			$.ajax(setting);
		},
		validation: {
			isMobile: function(data) {
				if (!data || data === '') {
					return true;
				}
				return /^\d{11}$/.test(data);
			},
			isPassword: function(data) {
				if (!data || data === '') {
					return true;
				}
				return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,20}$/.test(data);
			},
			digits: function(data) {
				if (!data || data === '') {
					return true;
				}
				return /^\d+$/.test(data);
			},
			integer: function(data) {
				if (!data || data === '') {
					return true;
				}
				return /^(?:-?(?:0|[1-9][0-9]*))$/.test(data);
			},
			numeric: function(data) {
				if (!data || data === '') {
					return true;
				}
				return !isNaN(parseFloat(data)) && isFinite(data);
			},
			grea02Decimal: function(data) {
				if (!data || data === '') {
					return true;
				}
				return /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(data);
			}
		},
		currentPosition: {
			error: function(error) {
				switch (error.code) {
					case 0:
						$.toast("尝试获取您的位置信息时发生错误！");
						break;
					case 1:
						$.toast("用户拒绝了获取位置信息请求！");
						break;
					case 2:
						$.toast("浏览器无法获取您的位置信息！");
						break;
					case 3:
						$.toast("获取您位置信息超时！");
						break;
				}
			},
			updatePosition: function(position) {
				position.latitudeP = position.coords.latitude, /*纬度*/
					position.longitudeP = position.coords.longitude, /*经度*/
					position.accuracyP = position.coords.accuracy; /*准确度*/
			},
			getPosition: function() {
				if (navigator.geolocation) {
					navigator.geolocation.watchPosition(zhanzhang.tool.currentPosition.updatePosition,
						zhanzhang.tool.currentPosition.error);
				} else {
					$.toast("浏览器无法获取您的位置信息！");
				}
			}
		}
	};
	zhanzhang.login = {
        data: function() {
            var username = $("#username").val();
            var pass = $("#password").val();
            if (!username) {
                $("#username").focus();
                $.toast(zhanzhang.config.constant['1001']);
            } else if (!pass) {
                $("#password").focus();
                $.toast(zhanzhang.config.constant['1002']);
            } else {
                return {
                    'username': username,
                    'password': pass
                };
            }
            return false;
        },
        submit: function() {
            var data = zhanzhang.login.data();
            if (data) {
                zhanzhang.login.request(data);
            }
        },
            request: function(data) {
            zhanzhang.tool.ajax(zhanzhang.config.login, data, null, 'post', function(d) {
				var username = $("#username").val();
                if (d.data && zhanzhang.config.constant['0002'] == d.data) {
                    $.toast(zhanzhang.config.constant['1004']);

					var username = $("#username").val();
                    window.self.location.href ="../service/homepage.html?username="+username+"";
                } else if (d.data && zhanzhang.config.constant['4008'] == d.data) {
					var username = $("#username").val();
                    window.self.location.href = "../service/homepage.html?username="+username+"";
                }else if (d.data && zhanzhang.config.constant['0003'] == d.data) {
                    $.toast(zhanzhang.config.constant['1003']);
                }
            }, function(xhr, type) {
                $.toast(zhanzhang.config.constant['0001']);
            });
        },
        init: function() {
            $("#btnLogin").click(function() {
                zhanzhang.login.submit();
            });
        }
    };

    	zhanzhang.reg = {
		data: function() {
			var username = $("#username_zhu").val();
			var pass = $("#password_zhu").val();
			var passwordCheck = $("#passwordCheck").val();
			var yanzhengma = $("#yanzhengma").val();
			if (!username) {
				$("#username_zhu").focus();
				$.toast(zhanzhang.config.constant['1001']);
			} else if (!zhanzhang.tool.validation.isMobile(username)) {
				$("#username_zhu").focus();
				$.toast(zhanzhang.config.constant['4001']);
			} else if (!pass) {
				$("#password_zhu").focus();
				$.toast(zhanzhang.config.constant['1002']);
			} /*else if (!zhanzhang.tool.validation.isPassword(pass)) {
				$("#password").focus();
				$.toast(zhanzhang.config.constant['4002']);
			} */
			else if (passwordCheck !== pass) {
				$("#passwordCheck").focus();
				$.toast(zhanzhang.config.constant['4003']);
			} else {
				return {
					"tel": username,
					"password": pass,
					"code":yanzhengma
				}
			}
			return false;
		},
		submit: function() {
			var data = zhanzhang.reg.data();
			if (data) {
				delete data.passwordCheck;
				zhanzhang.reg.request(data);
			}
		},
		request: function(data) {
			zhanzhang.tool.ajax(zhanzhang.config.reg, data, null, 'post', function(d) {
				if (d.data && zhanzhang.config.constant['0002'] == d.data) {
					$.alert(zhanzhang.config.constant['2001'],function(){
						window.self.location.href = zhanzhang.config.loginUrl;
					}); 
				} else if (d.data && zhanzhang.config.constant['5005'] == d.data) {
					$.toast('验证码不正确');
				}else if (d.data && zhanzhang.config.constant['5006'] == d.data) {
					$.toast('验证码失效');
				}else if (d.data && zhanzhang.config.constant['5007'] == d.data) {
					$.toast('验证码错误');
				}
			}, function(xhr, type) {
				$.toast(zhanzhang.config.constant['0001']);
			});
		},
		init: function() {
			$("#btnRegs").click(function() {
				zhanzhang.reg.submit();
			});
		}
	};






    	zhanzhang.wang = {
		data: function() {
			var username = $("#username_wang").val();
			var pass = $("#password_wang").val();
			var passwordCheck = $("#passwordCheck_wang").val();
			var yanzhengma = $("#yanzhengma_wang").val();
			if (!username) {
				$("#username_wang").focus();
				$.toast(zhanzhang.config.constant['1001']);
			} else if (!zhanzhang.tool.validation.isMobile(username)) {
				$("#username_wang").focus();
				$.toast(zhanzhang.config.constant['4001']);
			} else if (!pass) {
				$("#username_wang").focus();
				$.toast(zhanzhang.config.constant['1002']);
			} /*else if (!zhanzhang.tool.validation.isPassword(pass)) {
				$("#password").focus();
				$.toast(zhanzhang.config.constant['4002']);
			} */
			else if (passwordCheck !== pass) {
				$("#passwordCheck_wang").focus();
				$.toast(zhanzhang.config.constant['4003']);
			} else {
				return {
					"tel": username,
					"password": pass,
					"code":yanzhengma
				}
			}
			return false;
		},
		submit: function() {
			var data = zhanzhang.wang.data();
			if (data) {
				delete data.passwordCheck;
				zhanzhang.wang.request(data);
			}
		},
		request: function(data) {
			zhanzhang.tool.ajax(zhanzhang.config.wang, data, null, 'post', function(d) {
				if (d.data && zhanzhang.config.constant['0002'] == d.data) {
					$.alert(zhanzhang.config.constant['1006'],function(){
						window.self.location.href = zhanzhang.config.loginUrl;
					}); 
				} else if (d.data && zhanzhang.config.constant['5005'] == d.data) {
					$.toast('验证码不正确');
				}else if (d.data && zhanzhang.config.constant['5006'] == d.data) {
					$.toast('验证码失效');
				}else if (d.data && zhanzhang.config.constant['5007'] == d.data) {
					$.toast('验证码错误');
				}else if (d.data && zhanzhang.config.constant['0003'] == d.data) {
					$.toast('修改失败');
				}
			}, function(xhr, type) {
				$.toast(zhanzhang.config.constant['0001']);
			});
		},
		init: function() {
			$("#wangji_deng").click(function() {
				zhanzhang.wang.submit();
			});
		}
	};

 });



/*获取验证码*/
var isPhone = 1;
function getCode(e){
    checkPhone(); //验证手机号码
    if(isPhone){
        resetCode(); //倒计时
    }else{
        $('#username_wang').focus();
    }
}

//验证手机号码
function checkPhone(){

    var phone = $('#username_wang').val();
    var pattern = /^1[0-9]{10}$/;
    isPhone = 1;
    if(phone == '') {
        $.toast('请输入手机号码');
        isPhone = 0;
        return;
    }
    if(!pattern.test(phone)){
        $.toast('请输入正确的手机号码');
        isPhone = 0;
        return;
    }
}


//倒计时
function resetCode(){
    $('#huo_btn_wang').hide();
    $('#J_second').html('60');
    $('#J_resetCode').show();
    var second = 60;
    var timer = null;
    var telephone = $("#username_wang").val();
         var data = {
        telephone:telephone,
        type:20
        };

    zhanzhang.tool.ajax(zhanzhang.config.identify, data, null, 'post', function(d) {
        if (d.data && zhanzhang.config.constant['0002'] == d.data) {
               $.toast("已发送")
            }else if(d.data && zhanzhang.config.constant['5001'] == d.data){
            	 $.toast("短信类型不存在")
            }else if(d.data && zhanzhang.config.constant['5000'] == d.data){
            	  $.toast("参数不全")
            }else if(d.data && zhanzhang.config.constant['5002'] == d.data){
            	  $.toast("半小时内已经连续获取三次，请稍后再试")
            }else if(d.data && zhanzhang.config.constant['5003'] == d.data){
                  $.toast("一分钟内已经发送过，不能频繁发送")
            }else if(d.data && zhanzhang.config.constant['5004'] == d.data){
                  $.toast("该手机号已经注册过")
            }else if(d.data && zhanzhang.config.constant['5005'] == d.data){
                  $.toast("手机格式有误")
            }
         
    }, function(xhr, type) {
        $.toast(zhanzhang.config.constant['0001'], function() {
            $.router.back();
        });

    });
    timer = setInterval(function(){
        second -= 1;
        if(second >0 ){
            $('#J_second').html(second);
        }else{
            clearInterval(timer);
            $('#huo_btn_wang').show();
            $('#J_resetCode').hide();
        }
    },1000);
}




/*获取验证码*/
var isPhone = 1;
function getCode1(e){
    checkPhone1(); //验证手机号码
    if(isPhone){
        resetCode1(); //倒计时
    }else{
        $('#username_zhu').focus();
    }
}

//验证手机号码
function checkPhone1(){

    var phone = $('#username_zhu').val();
    var pattern = /^1[0-9]{10}$/;
    isPhone = 1;
    if(phone == '') {
        $.toast('请输入手机号码');
        isPhone = 0;
        return;
    }
    if(!pattern.test(phone)){
        $.toast('请输入正确的手机号码');
        isPhone = 0;
        return;
    }
}


//倒计时
function resetCode1(){
    $('#huo_btn').hide();
    $('#J_second1').html('60');
    $('#J_resetCode1').show();
    var second = 60;
    var timer = null;
    var telephone = $("#username_zhu").val();
     var data = {
        telephone:telephone,
        type:10
        };

    zhanzhang.tool.ajax(zhanzhang.config.identify, data, null, 'post', function(d) {
        if (d.data && zhanzhang.config.constant['0002'] == d.data) {
               $.toast("已发送")
            }else if(d.data && zhanzhang.config.constant['5000'] == d.data){
            	 $.toast("短信类型不存在")
            }else if(d.data && zhanzhang.config.constant['5001'] == d.data){
            	  $.toast("参数不全")
            }else if(d.data && zhanzhang.config.constant['5002'] == d.data){
            	  $.toast("半小时内已经连续获取三次，请稍后再试")
            }else if(d.data && zhanzhang.config.constant['5003'] == d.data){
                  $.toast("一分钟内已经发送过，不能频繁发送")
            }else if(d.data && zhanzhang.config.constant['5004'] == d.data){
                  $.toast("该手机号已经注册过")
            }else if(d.data && zhanzhang.config.constant['5005'] == d.data){
                  $.toast("手机格式有误")
            }
         
    }, function(xhr, type) {
        $.toast(zhanzhang.config.constant['0001'], function() {
            $.router.back();
        });

    });
    timer = setInterval(function(){
        second -= 1;
        if(second >0 ){
            $('#J_second1').html(second);
        }else{
            clearInterval(timer);
            $('#huo_btn').show();
            $('#J_resetCode1').hide();
        }
    },1000);
}


$(function () {

$(document).on("pageInit", function(e, pageId, $page) {
    // console.info("addadada");
  });
$.init()

});


  $(document).on('click','.open-services', function () {
  $.popup('.popup-services');
});


var indexquery=false; 