/**
 * Created by angie on 16/8/3.
 */
window.homepage = window.homepage || {};
var baseUrl = 'http://localhost:8080';

var uploaddebug = true;
var test=false;



var debug = false;

+ function($) {
    "use strict";

    window.homepage = window.homepage || {};

    var baseUrl = 'http://localhost:8080';

 

    homepage.config = {
        baseUrl: '/web',
        loginUrl: baseUrl + '/service/zhuce.html',


        AdApply: baseUrl + '/user/ad/AdApply',





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
            '0014': '已显示到最后一页!',
            '0015': '已显示到最后一页!',
            '0019': '取消收藏成功！',
            '0020': '取消收藏失败！',
            '1001': '请输入手机号！',
            '1002': '请输入密码！',
            '1003': '用户名或密码错误！',
            '1004': '登录成功！',
            '2001': '注册成功！',
            '2002': '注册失败！',
            '3001': '请上传图片！',
            '3002': '请选择标题！',
            '3003': '请选择金额！',
            '3004': '请选择单位！',
            '3005': '请填写联系人！',
            '3006': '请填写手机号！',
            '3007': '请填写附言！',
            '3008': '请填写内容！',
            '3009': '请选择省！',
            '3010': '请选择市！',
            '3011': '请选择区！',



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

$(function () {
    'use strict';

    window.homepage = window.homepage || {};

    var validator = function(data, value) {
        try {
            var itemValids = data.valids;
            if (itemValids['require']) {
                if (itemValids['require']['is']) {
                    if (!value) {
                        $.alert(itemValids['require']['msg']);
                        if (debug) {
                            console.log(data.id + '--> ' + itemValids['require']['msg']);
                        }
                        return false;
                    }
                }
            }
            if (itemValids['grea02Decimal']) {
                if (itemValids['grea02Decimal']['is']) {
                    if (!homepage.tool.validation.grea02Decimal(value)) {
                        $.alert(itemValids['grea02Decimal']['msg']);
                        if (debug) {
                            console.log(data.id + '--> ' + itemValids['grea02Decimal']['msg']);
                        }
                        return false;
                    }
                }
            }
            if (itemValids['isMobile']) {
                if (itemValids['isMobile']['is']) {
                    if (!homepage.tool.validation.isMobile(value)) {
                        $.alert(itemValids['isMobile']['msg']);
                        if (debug) {
                            console.log(data.id + '--> ' + itemValids['isMobile']['msg']);
                        }
                        return false;
                    }
                }
            }
            if (itemValids['digits']) {
                if (itemValids['digits']['is']) {
                    if (!homepage.tool.validation.digits(value)) {
                        $.alert(itemValids['digits']['msg']);
                        if (debug) {
                            console.log(data.id + '--> ' + itemValids['digits']['msg']);
                        }
                        return false;
                    }
                }
            }
        } catch (e) {
            if (debug) {
                console.log(e);
            }
            $.alert('所填信息格式错误！');
            return false;
        }
        return true;
    };
    var validationToValue = function(arrData) {
        var data = {};
        for (var i = 0; i < arrData.length; i++) {
            var item = arrData[i];
            var value = '';
            if ('input' === item.eleType) {
                value = $("#" + item.id).val();
            } else if ('btnRound' === item.eleType) {
                var round = $("span[name='" + item.id + "'][check='true']");
                if (round.length!=0) {
                    if (round.length==2) {
                        value =3;
                    }else{
                        value = $(round).attr('data-pub');
                    }
                }else{
                    value = 4;
                }
            } else if ('img' === item.eleType) {
                var imgs = $("img[name='" + item.id + "']");
                console.info(imgs)
                $.each(imgs, function(i, e) {
                    if (value == '') {
                        value = $(e).attr('src');
                    } else {
                        value += "," + $(e).attr('src');
                    }
                });
            }
            if (!validator(item, value)) {
                return false;
            }
            data[item.pro] = $.trim(value);
        };
        return data;
    };






    var viewAdDetail = function(_m, data) {

        for (var key in data) {
            var el = $("#" + _m + key);
            var eleType = $(el).attr('eleType');
            var value = $.trim(data[key]);
            if (eleType === 'text' || !eleType) {
                $(el).html(value);
            }
            if (key === 'img') {
                var imgs = value.substring(0,value.length).split(',');
                var textvalue = $.trim(data['imgcontext']);
                var context = textvalue.substring(0,textvalue.length-1).split(',')
                console.info(context)

                if (imgs && imgs.length > 0 && imgs[0] != '') {
                    var list = $('#' + _m + key);

                    var html = [];
                    $.each(imgs, function(i, e) {


                        html.push('<img src="' + imgs[i]+ '" height="150px;width:100%"><p class="p_words">' +context[i]+'</p>')

                    });
                    if (html.length > 0) {
                        list.html(html.join(''));
                    }
                }
            }
        }
    };



    homepage.tool = {
        ajax: function(url, data, context, type, delegate, error) {
            // data.ajax = 'gongnengji';
            var setting = {
                data: data,
                type: type,
                dataType: 'json',
                url: url,
                cache: false,
                success: function(d) {
                    if (d && d.data && d.data == 'no login') {
                        // location.href = homepage.config.loginUrl;
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
                    navigator.geolocation.watchPosition(homepage.tool.currentPosition.updatePosition,
                        homepage.tool.currentPosition.error);
                } else {
                    $.toast("浏览器无法获取您的位置信息！");
                }
            }
        }
    };

    homepage.index = {

        AdDetail:function(id){
            var data = {
                info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            // $("#" + els.elid).val(id);
            // $.router.load("#pagedetails");

            // $.showPreloader();
            homepage.tool.ajax(homepage.config.AdApply, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);


                } else if (d) {
                    console.info(d)
                    viewAdDetail('AdDetail_', d);
                    // viewAdDetail('AdDetail_',d);

                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(homepage.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },



    };



    $(document).on("pageInit", function(e, pageId, $page) {

        var url = location.search; //获取url中"?"符后的字串
        var strs = url.substr(1);
        var id=strs.split("=")[1]

        if (pageId == "pageIndex" ) {

            if(id){
                homepage.index.AdDetail(id)
            }

        }

    });



    $.init();
});










