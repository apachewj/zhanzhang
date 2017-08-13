+ function($) {
	"use strict";

	window.zhanzhang = window.zhanzhang || {};

	var baseUrl = 'http://localhost:8080';


	zhanzhang.config = {
		// baseUrl: '',
		loginUrl: baseUrl + '/service/zhuce.html',
		login: baseUrl + '/login',
		// regUrl: baseUrl + '/zhuce.html',
		// reg: baseUrl + '/doapp_signin_man',
		indexUrl: baseUrl + '/homepage.html',
		indexQueryListUrl: baseUrl + '',
		
		constant: {
			'0001': '服务器内部错误',
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

+ function($) {
	"use strict";

	window.zhanzhang = window.zhanzhang || {}; 

	zhanzhang.tpl = {
		indexListTpl: function(data) {
			return ['{@each data as item}',
				'<li><a  onclick="pageDetail(', "'${item.info_type}','${item.id}')", '" class="item-content">',
				'<div class="item-inner item-inner-sel">',
				'<div class="item-subtitle">',
				'<div class="pull-left">${item.start_l}-${item.end_l}</div>',
				'<div class="pull-right">',
				'$${item|itemIcon}',
				'</div></div>',
				'<div class="item-text text-content">',
				'<div class="text-status">',
				'<div class="pull-left">出发时间：<span>${item.start_time}</span>', '</div>',
				'<div class="pull-right"><span class="time" s-data="${item.start_time}"></span></div>',
				'</div>',
				'<div class="text-status">',
				'{@if item.info_type==1}',
				'<div class="pull-left button-danger">剩${item.people_n}座</div>',
				'{@/if}',
				'<div class="pull-right">发布时间：<span>${item.create_time}</span></div>',
				'</div></div></div></a></li>',
				'{@/each}'
			].join('');
		},

		
		
	};
	zhanzhang.tool = {
		ajax: function(url, data, context, type, delegate, error) {
			data.ajax = 'car';
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
                if (d.data && zhanzhang.config.constant['0002'] == d.data) {
                    $.toast(zhanzhang.config.constant['1004']);
                    window.self.location.href = zhanzhang.config.indexUrl;
                } else if (d.data && zhanzhang.config.constant['4008'] == d.data) {
                    window.self.location.href = zhanzhang.config.indexUrl;
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
	// zhanzhang.reg = {
	// 	data: function() {
	// 		var username = $("#user_name").val();
	// 		var pass = $("#password").val();
	// 		var passwordCheck = $("#passwordCheck").val();
	// 		if (!username) {
	// 			$("#user_name").focus();
	// 			$.toast(zhanzhang.config.constant['1001']);
	// 		} else if (!zhanzhang.tool.validation.isMobile(username)) {
	// 			$("#user_name").focus();
	// 			$.toast(zhanzhang.config.constant['4001']);
	// 		} else if (!pass) {
	// 			$("#password").focus();
	// 			$.toast(zhanzhang.config.constant['1002']);
	// 		} /*else if (!zhanzhang.tool.validation.isPassword(pass)) {
	// 			$("#password").focus();
	// 			$.toast(zhanzhang.config.constant['4002']);
	// 		} */
	// 		else if (passwordCheck !== pass) {
	// 			$("#passwordCheck").focus();
	// 			$.toast(zhanzhang.config.constant['4003']);
	// 		} else {
	// 			return {
	// 				"username": username,
	// 				"pass": pass,
	// 			}
	// 		}
	// 		return false;
	// 	},
	// 	submit: function() {
	// 		var data = zhanzhang.reg.data();
	// 		if (data) {
	// 			delete data.passwordCheck;
	// 			zhanzhang.reg.request(data);
	// 		}
	// 	},
	// 	request: function(data) {
	// 		zhanzhang.tool.ajax(zhanzhang.config.reg, data, null, 'post', function(d) {
	// 			if (d.data && zhanzhang.config.constant['0002'] == d.data) {
	// 				$.alert(zhanzhang.config.constant['2001'],function(){
	// 					window.self.location.href = zhanzhang.config.loginUrl;
	// 				}); 
	// 			} else if (d.data && zhanzhang.config.constant['0003'] == d.data) {
	// 				$.toast(zhanzhang.config.constant['2002']);
	// 			}
	// 		}, function(xhr, type) {
	// 			$.toast(zhanzhang.config.constant['0001']);
	// 		});
	// 	},
	// 	init: function() {
	// 		$("#btnRegs").click(function() {
	// 			zhanzhang.reg.submit();
	// 		});
	// 	}
	// };
	// zhanzhang.index = {
	// 	data: function() {
	// 		var data = {
	// 			"info_type": $("#info_type").val(),
	// 			'pageNum': 1,
	// 			'pageSize': 10
	// 		};
	// 		var selectVal = function(selectID, data, pro, type) {
	// 			var ret = '';
	// 			if ('city' == type) {
	// 				ret = $("#" + selectID).find('a').text();
	// 				if ('出发地' == ret || '目的地' == ret|| '城市' == ret || '' == ret) {
	// 					if ('start_l' == pro)
 //                        {
 //                            var myCity = new BMap.LocalCity();
 //                            myCity.get(function(result){
 //                                ret = result.name;
 //                                console.info(ret + '' + pro);
 //                            });
 //                        }
 //                        else
	// 					    ret = '';
	// 				}
	// 			} else {
	// 				ret = $("#" + selectID).val();
	// 			}
	// 			if (ret) {
	// 				data[pro] = ret;
	// 			}
	// 		};
	// 		selectVal('start_time', data, 'start_time');
	// 		selectVal('start_l', data, 'start_l', 'city');
	// 		selectVal('end_l', data, 'end_l', 'city');
	// 		return data;
	// 	},
	// 	query: function() {
	// 		$.showPreloader();
	// 		var data = zhanzhang.index.data();

	// 		if (debug) {
	// 			console.log("index:");
	// 			console.log(data);
	// 		};
	// 		zhanzhang.tool.ajax(zhanzhang.config.carListInfo, data, null, 'get', function(d) {
	// 			if (debug) {
	// 				console.log(d);
	// 			}
	// 			if (d.data && d.data.message && zhanzhang.config.constant['0003'] == d.data.message) {
	// 				$.alert(zhanzhang.config.constant['0012']);
	// 				$("#queryList").empty();
	// 			} else if (d.data && d.data.message && zhanzhang.config.constant['0002'] == d.data.message) {
	// 				var page = d.data.page;
	// 				var list = juicer(zhanzhang.tpl.indexListTpl(), {
	// 					'data': page.list
	// 				});
	// 				$("#queryList").html(list);
	// 			}
	// 			$.hidePreloader();
	// 			timer();
	// 		}, function(xhr, type) {
	// 			$.alert(zhanzhang.config.constant['0001']);
	// 			$.hidePreloader();
	// 		});
	// 	},
	// 	init: function() {
	// 		zhanzhang.index.query();
	// 	}
	// };

}(Zepto);





// function timer() {
// 	var vt=$('.time'); 
// 	$.each(vt, function(i, e) {
// 		 var sd=$(e).attr('s-data');
// 		 sd=$.trim(sd)
// 		 if (sd) {
// 		 	sd=sd.replace(/-/g, '\/');
// 		 	sdate= new Date(sd);
// 		 	if (debug) {
// 		 		// console.log(sdate);
// 		 	}
// 		 	var ts = sdate - (new Date());
// 		 	if (ts<0) {
// 				$(e).text(''); 
// 		 	}else{
// 		 		var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10),
// 		 			hh = parseInt(ts / 1000 / 60 / 60 % 24, 10),
// 		 			mm = parseInt(ts / 1000 / 60 % 60, 10),
// 		 			ss = parseInt(ts / 1000 % 60, 10); 
// 				hh = checkTime(hh);
// 				mm = checkTime(mm);
// 				ss = checkTime(ss);
// 				if(dd=='0'){
// 			    	dd='';
// 				}else if(dd){
// 					dd=dd+"天";
// 				}
// 				$(e).text(dd+" "+hh + ":" + mm +":"+ss); 
// 		 	}
			
// 		}; 
// 	});  
// } 
// function checkTime(i) {
// 	if (i < 10) {
// 		i = "0" + i;
// 	}
// 	return i;
// }
// function taxiRecord (){
// 	if (!currentTex_id) {
// 		$.alert('请登记为出租车！');
// 		return;
// 	} 
// 	zhanzhang.tool.ajax(zhanzhang.config.txtRecord, {txt_id:currentTex_id}, null, 'get', function(d) {
// 		if (debug) {
// 			console.log(d);
// 		}
// 		if (zhanzhang.config.constant['0003'] == d.data) {
// 			$.alert(zhanzhang.config.constant['0018']);
// 			$("#taxiRecordList").empty(); 
// 		} else if('parameter miss' == d.data){
// 			$("#taxiRecordList").empty(); 
// 		}else if (d) {
// 			var list = juicer(zhanzhang.tpl.taxiRecordListTpl(), d);
// 			$("#taxiRecordList").html(list);
// 		}
// 	}, function(xhr, type) {
// 		if (debug) {
// 			console.log(d);
// 		}
// 	});
// 	$.router.load("#taxiRecord");
// }

// var isUpdateLocation=false;
// var currentTex_id;

// var updateLocation=function(location_x,location_y){
// 	if (!isUpdateLocation) {
// 		return;
// 	}
// 	if (!currentTex_id || !location_x || !location_y) {
// 		return ;
// 	}
// 	var locationData={};
// 	locationData.tex_id= currentTex_id;
// 	locationData.location_x=location_x;
// 	locationData.location_y=location_y;
// 	zhanzhang.tool.ajax(zhanzhang.config.updateLocation, locationData, null, 'post', function(d) {
// 		if (debug) {
// 			console.log(d);
// 		};
// 	}, function(xhr, type) {
// 		$.toast(zhanzhang.config.constant['0001']);
// 		if (debug) {
// 			console.log(xhr);
// 		};
// 	});
// };

// var updateTexDev=function(){
// 	var type=isUpdateLocation?1:2;
// 	if (!currentTex_id || !type) {
// 		return ;
// 	}
// 	var TexDevData={};
// 	TexDevData.tex_id=currentTex_id;
// 	TexDevData.type=type;
// 	zhanzhang.tool.ajax(zhanzhang.config.updateTexDev, TexDevData, null, 'post', function(d) {
// 		if (debug) {
// 			console.log(d);
// 		};
// 		if (d.data && zhanzhang.config.constant['0002'] == d.data) { 

// 		} else if (d.data && 'info not exist' == d.data) { 

// 		}
// 	}, function(xhr, type) {
// 		if (debug) {
// 			console.log(xhr);
// 		};
// 		$.toast(zhanzhang.config.constant['0001']);
// 	});
// };
var indexquery=false; 