/**
 * Created by angie on 16/8/5.
 */
window.center = window.center || {};
var baseUrl = 'http://localhost:8080';

var filedate=center;

var uploaddebug = true;
var test=false;


var debug = false;

+ function($) {
    "use strict";

    window.center = window.center || {};

    var baseUrl = 'http://localhost:8080';

    var filedata = center;

    center.config = {
        baseUrl: '/web',
        uploadFile: baseUrl + '/uploadFile',
        loginUrl: baseUrl + '/service/zhuce.html',
        PwChange: baseUrl + '/user/PwChange',
        userinfo: baseUrl + '/user/up_userinfo',
        useradrinfo: baseUrl + '/user/up_useradrinfo',
        addCards: baseUrl + '/user/addCards',
        identify: baseUrl + '/doapp_identify',
        cardsList: baseUrl + '/user/cardsList',
        chanCardsDefault: baseUrl + '/user/chanCardsDefault',
        doRecharge: baseUrl + '/doRecharge',
        logout: baseUrl + '/logout',

        deleteCards:baseUrl + '/user/deleteCards',
        gerenziliao:baseUrl + '/user/userinfo',
        userMoney:baseUrl + '/userMoney',
        backOrder:baseUrl + '/backOrder',
        getCodeOrder:baseUrl + '/getCodeOrder',
        moneyOut:baseUrl + '/user/moneyOut',





        constant: {
            '0001': '服务器内部错误',
            '0002': 'SUCCESS',
            '0003': 'ERROR',
            '0004': '修改成功！',
            '0005': '保存失败！',
            '0006': '保存成功！',
            '0007': '收藏失败，已经收藏！',
            '0008': '修改失败!',
            '0009': 'already stored',
            '0010': '删除成功！',
            '0011': '删除失败！',
            '0012': '没有符合条件信息!',
            '0014': '已显示到最后一页!',
            '0015': '已显示到最后一页!',
            '0019': '取消收藏成功！',
            '0020': '取消收藏失败！',
            '1001': '请输入旧密码！',
            '1002': '请输入新密码！',
            '1003': '用户名或密码错误！',
            '1004': '登录成功！',
            '1005': '请再次输入新密码！',
            '2001': '注册成功！',
            '2002': '注册失败！',
            '3001': '请填写收货人！',
            '3002': '请填写手机号！',
            '3003': '请填写详细地址！',
            '3004': '请填写邮政编码！',
            '3005': '请选择头像！',
            '3006': '请填写昵称！',
            '3007': '请选择性别！',
            '3008': '请选择市！',
            '3009': '请选择区！',
            '3010': '请选择省！',
            '3011': '请选择账号类型！',
            '3012': '请填写银行卡卡号！',
            '3013': '请选择开户银行！',
            '3014': '请填写开户人姓名！',
            '3015': '请填写支行名称！',
            '3016': '请填写手机号！',
            '3017': '请填写验证码！',
            '3018': '请选择银行卡类别！',
            '4001': '手机号格式错误！',
            '4002': '密码必须包含数字、字母和特殊字符，且长度6~20！',
            '4003': '两次密码不一致！',
            '4004': '新旧密码相同！',
            '5000':'1001',
            '5001':'1010',
            '5002':'1003',
            '5003':'1023',
            '5004':'1024',
            '5005':'1002',
            '5006':'1025',
            '5007':'1026',
            '8001':'请输入收款金额!',
            '8002':'请输入收款人!',
            '8003':'请留言!',
            '8004':'请输入收款金额!',
            '8005':'请输入支付类型!',
            '8006':'请输入支付方式!',
            '8007':'请输入付款人!',
            '8008':'请输入充值金额!',
            '8009':'缺少支付类型!',
            '8010':'请先设置默认银行卡！',
            '8011':'余额不足！',
            '8012':'转出成功！',
            '8013':'请输入转出金额！',



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




var position = {
    latitudeP: 31.093204,
    longitudeP: 119.0812012,
    accuracyP: 67.8021001352539
};

var debug = false;

$(function () {
    'use strict';

    window.center = window.center || {};

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
                    if (!center.tool.validation.grea02Decimal(value)) {
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
                    if (!center.tool.validation.isMobile(value)) {
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
                    if (!center.tool.validation.digits(value)) {
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
            }  else if ('text' === item.eleType) {
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
            } else if ('requireDanger' === item.eleType) {
                var confs = $("a[name='" + item.id + "'][check='true']");
                $.each(confs, function (i, e) {
                    if (i == 0) {
                        value = $(e).attr('data-require');
                    } else {
                        value += "," + $(e).attr('data-require');
                    }
                });
                if (debug) {
                    console.log(value);
                }
            } else if ('radio' === item.eleType) {
                var round = $("input[name='" + item.id + "'][check='true']");
                value = $(round).attr('data-pub');
            }else if ('img' === item.eleType) {
                var imgs = $("img[name='" + item.id + "']");
                console.info(imgs)
                $.each(imgs, function(i, e) {
                    if (value == '') {
                        value = $(e).attr('src');
                    } else {
                        value += "," + $(e).attr('src');
                    }
                });
            }else if ('txtCarImg'=== item.eleType) {
                value=$("#" + item.id).find('img').attr("src");
            }
            if (!validator(item, value)) {
                return false;
            }
            data[item.pro] = $.trim(value);
        };
        return data;
    };

    var selectVal = function(els, data) {
        for (var i = 0; i < els.length; i++) {
            if (els[i].type == 'city') {
                var ret = $("#" + els[i].el).find('a').text();
                if ("城市" != ret) {
                    data[els[i].pro] = encodeURI(ret);
                }
            }
            if (els[i].type == 'text') {
                var ret = $("#" + els[i].el).val();
                if ('0' != ret) {
                    data[els[i].pro] = ret;
                }
            }if (els[i].type == 'textsel') {
                var ret = $("#" + els[i].el).val().split(",")[0];
                if ('0' != ret) {
                    data[els[i].pro] = ret;
                }
            }
            if (els[i].type == 'btnRound') {
                var round = $("a[name='" + els[i].el + "'][check='true']");
                if (round.length!=0) {
                    if (round.length==2) {
                        data[els[i].pro] =3;
                    }else{
                        data[els[i].pro] = round.attr('data-pub');
                    }
                }else{
                    data[els[i].pro] = 0;
                }
            }
            if (els[i].type == 'range') {
                var ret = $("#" + els[i].el).val();
                if ('0' != ret) {
                    var range = ret.split("-");
                    data[els[i].pro + '_small'] = range[0];
                    data[els[i].pro + '_big'] = range[1];
                }
            }
            if (els[i].type === 'checkbox') {
                var choice = "";
                $("input[name='" + els[i].el+ "']:checked").each(function() {
                    choice += $(this).val() + ",";
                });
                data[els[i].pro]=choice;
                if (debug) {
                    console.log(value);
                }
            }
        }
    };


    var viewInfo = function(_m, data) {

        var html = [];
        if(!data.img){
            html.push('<div><img src="images/melbourne.jpg"  style="width:3.5rem;height:3.5rem;"></div>');
        }else{
            html.push('<div><img src="' + data.img + '"  style="width:3.5rem;height:3.5rem;"></div>');
        }
        var list = $('#xxx_show_img_List');

        list.empty();

        if (html.length > 0) {
            list.html(html.join(''));

        }

        //

        for (var key in data) {
            var el = $("#" + _m + key);
            var eleType = $(el).attr('eleType');
            var value = $.trim(data[key]);

            if (eleType === 'input' || !eleType) {
                $(el).html(value);
            }else if (eleType === 'text' || !eleType) {
                $(el).html(value);
            }
            else if (eleType === 'img') {
                var imgs = value.split(',');
                if (imgs && imgs.length > 0 && imgs[0] != '') {
                    var list = $('#' + _m + key + '_List');
                    list.empty();
                    var html = [];
                    $.each(imgs, function(i, e) {
                        var ipot=e.lastIndexOf(".");
                        var type=fileType(e.substring(ipot+1));
                        if (type=='image') {
                            html.push('<img src="' + e + '" alt="" style="width: 100%" >')
                        }
                    });
                    if (html.length > 0) {
                        list.html(html.join(''));
                    }
                }
            }
            if (!$("#xxx_nickname").html()) {
                $("#xxx_nickname").html("昵称");
            }

        }





    };


    var viewInit = function(_m, data) {


        for (var key in data) {

            if(key == 'province_name'){

                var province=$.trim(data[key]);

            }else if(key == 'city_name'){

                var city=$.trim(data[key]);

            }else if(key == 'county_name'){
                var county=$.trim(data[key]);

            }

            if(key == 'img'){
                var value = $.trim(data[key]);

                var list = document.getElementById(_m + 'img');

                var ipot=value.lastIndexOf(".");
                var type=fileType(value.substring(ipot+1));
                if (type=='image') {
                    showImgs(list, "" + _m + 'img',value);
                }



            }
            if(key == 'sex'){

                var value = $.trim(data[key]);
                if (value==1) {

                    $("#nan").attr('checked', true);
                    $("#nan").attr('check', true);

                }else if(value==2){
                    $("#nv").attr('checked', true);
                    $("#nv").attr('check', true);

                }
            }else{

                var el = $("#" + _m + key);
                var eleType = $(el).attr('eleType');
                var name = $(this).attr('name');
                var value = $.trim(data[key]);
                if (eleType === 'input' || !eleType) {
                    $(el).val(value);
                }



            }
        }
        if(province&&city&&district){

            _cityPosdataPub(province,city,county);
        }

    };

    var viewInit1 = function(_m, data) {
        for (var key in data) {
            var el = $("#" + _m + key);
            var eleType = $(el).attr('eleType');
            var name = $(this).attr('name');
            var value = $.trim(data[key]);
            if (eleType === 'input' || !eleType) {
                $(el).val(value);
            }
        }
    };
    center.tpl = {
        indexListTpl: function(data) {

            return ['{@each data as item}',
                '<ul class="setting_card"  >',

                '<li class="detail-li open-vertical-modal">',
                '<div class="item-content">',
                '<div class="item-inner">',
                '<div class="item-text item-text_remark">',
                '<div class="row">',
                '<div class="col-50">${item.bank}</div> ',
                '</div>',
                '<div class="row" >',
                '<div class="col-33">${item.cardstatus}</div>',
                '<div class="col-50">${item.card_id}</div> ',
                '</div>',
                '</div>',
                '</div>',
                '{@if item.isdefault==1}','<div class="default_pic"><img src="images/grzx_yhk_mr.png"></div>',
                '{@else if item.isdefault==0}','<div class="default_pic"></div>',
                '{@/if}',

                '</div>',
                '</li>',

                '<div class="moren"  id="${item.id}" style="display:none">',

                '<p class="quxiao_btn1 she_mo" >设为默认卡<p>',
                '<p class="queding_btn1" onclick="delTe(', "'${item.id}')", '">删除<p></div>',

                '<div  class="black_overlay fade1" ></div> ',
                '</ul>',
                '{@/each}'
            ].join('');
        },



    };
    center.tool = {
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
                        location.href = center.config.loginUrl;
                        if($.device.os=="android"){
                            javascript:login.nologin();
                        }else if($.device.os=="ios"){
                            location.href = center.config.loginUrl;
                        }
                        //

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
                    navigator.geolocation.watchPosition(center.tool.currentPosition.updatePosition,
                        center.tool.currentPosition.error);
                } else {
                    $.toast("浏览器无法获取您的位置信息！");
                }
            }
        }
    };

//修改密码
    center.reg = {
        data: function() {
            var oldpassword = $("#oldpassword").val();
            var password = $("#password").val();
            var passwordCheck = $("#passwordCheck").val();

            if (!oldpassword) {
                $("#oldpassword").focus();
                $.toast(center.config.constant['1001']);
            } else if (!password) {
                $("#password").focus();
                $.toast(center.config.constant['1002']);
            }else if (!passwordCheck) {
                $("#passwordCheck").focus();
                $.toast(center.config.constant['1005']);
            }
            else if (passwordCheck !== password) {
                $("#passwordCheck").focus();
                $.toast(center.config.constant['4003']);
            }else if (oldpassword === password) {
                $("#password").focus();
                $.toast(center.config.constant['4004']);
            } else {
                return {
                    "oldpassword": oldpassword,
                    "password":password,

                }
            }
            return false;
        },
        submit: function() {
            var data = center.reg.data();
            if (data) {
                delete data.passwordCheck;
                center.reg.request(data);
            }
        },
        request: function(data) {
            center.tool.ajax(center.config.PwChange, data, null, 'post', function(d) {
                    if (d.data && center.config.constant['0002'] == d.data) {
                        $.alert(center.config.constant['0006']);
                    }else if (d.data && center.config.constant['0003'] == d.data) {
                        $.alert(center.config.constant['0008']);
                    }
                }, function(xhr, type) {
                    $.toast(center.config.constant['0001']);
                }
            );
        },
        init: function() {
            $("#btnRegs").click(function() {
                center.reg.submit();
            });
        }
    };

//修改添加收货地址
    center.dizhi = {
        data: function() {
            var dizhidatas = [{
                id: 'dizhi_getname',
                pro: 'getname',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3001']
                    }
                }
            },{
                id: 'dizhi_gettel',
                pro: 'gettel',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3002']
                    },
                    'isMobile': {
                        'is': true,
                        'msg': center.config.constant['4001']
                    }
                }
            }, {
                id: 'dizhi_getadr',
                pro: 'getadr',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3003']
                    },
                }
            }, {
                id: 'dizhi_getzipcode',
                pro: 'getzipcode',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3004']
                    },
                }
            }];
            return validationToValue(dizhidatas);
        },
        submit: function() {
            var data = center.dizhi.data();
            if (debug) {
                console.log('dizhi validation ' + '--> ');
                console.log(data);
            }
            if (data) {

                var data2 = {};
                for (var key in data) {
                    data2[key] = data[key]
                }

                center.tool.ajax(center.config.useradrinfo, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && center.config.constant['0002'] == d.data) {
                        $.alert(center.config.constant['0004'],function(){
                            $.router.load("#pageModifyPersonalDetails");


                        });
                    } else if (d.data) {
                        $.alert(center.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(center.config.constant['0001']);
                });
            }
        },
        eidt: function() {
            var data = {

            };

            center.tool.ajax(center.config.gerenziliao, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && center.config.constant['0003'] == d) {
                    $.alert(center.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    console.log(d)
                    viewInit1('dizhi_', d);

                }
            }, function(xhr, type) {
                $.toast(center.config.constant['0001']);
            });
        },

        update: function() {
            var data = center.dizhi.data();
            if (data) {

                var data2 = {};
                for (var key in data) {
                    data2[key] = data[key]
                }


                if (debug) {
                    console.log('dizhi update validation ' + '--> ');
                    console.log(data2);
                }
                center.tool.ajax(center.config.useradrinfo, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d.data);
                    };
                    if (d.data && center.config.constant['0002'] == d.data) {
                        $.alert(center.config.constant['0004'],function(){
                            $.router.back();
                        });
                    } else if (d.data) {
                        $.alert(center.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(center.config.constant['0001']);
                });
            }
        },

    };


//修改添加个人资料
    center.geren = {
        data: function() {
            var gerendatas = [{
                id: 'geren_img',
                pro: 'img',
                eleType: 'txtCarImg',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3005']
                    }
                }
            },{
                id: 'geren_nickname',
                pro: 'nickname',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3006']
                    }
                }
            }, {
                id: 'geren_sex',
                pro: 'sex',
                eleType: 'radio',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3007']
                    },
                }
            },{
                id: 'select_city',
                pro: 'city_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3008']
                    },

                }
            }, {
                id: 'select_area',
                pro: 'county_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3009']
                    },
                }
            }];
            return validationToValue(gerendatas);
        },
        submit: function() {
            var data = center.geren.data();
            if (debug) {
                console.log('geren validation ' + '--> ');
                console.log(data);
            }
            if (data) {

                var data2 = {};
                for (var key in data) {
                    data2[key] = data[key]
                }

                center.tool.ajax(center.config.userinfo, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && center.config.constant['0002'] == d.data) {
                        $.alert(center.config.constant['0006'],function(){
                            $.router.load("#pageIndex");
                        });
                    } else if (d.data) {
                        $.alert(center.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(center.config.constant['0001']);
                });
            }
        },

        eidt: function() {
            var data = {

            };

            center.tool.ajax(center.config.gerenziliao, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && center.config.constant['0003'] == d) {
                    $.alert(center.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    console.log(d)
                    viewInit('geren_', d);

                }
            }, function(xhr, type) {
                $.toast(center.config.constant['0001']);
            });
        },

        update: function() {
            var data = center.geren.data();
            if (data) {

                var data2 = {};
                for (var key in data) {
                    data2[key] = data[key]
                }


                if (debug) {
                    console.log('geren update validation ' + '--> ');
                    console.log(data2);
                }
                center.tool.ajax(center.config.userinfo, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d.data);
                    };
                    if (d.data && center.config.constant['0002'] == d.data) {
                        $.alert(center.config.constant['0004'],function(){
                            $.router.back();
                        });
                    } else if (d.data) {
                        $.alert(center.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(center.config.constant['0001']);
                });
            }
        },
    };


//个人资料
    center.gerenziliao = {
        query: function() {
            var data = {
            }
            center.tool.ajax(center.config.gerenziliao, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d) {
                    viewInfo('xxx_',d);
                    console.log(d)
                    // $("#getmoneypeople").html(d.nickname);
                    $("#user_name").val(d.nickname);
                    $("#user_id").val(d.id);
                }
            }, function(xhr, type) {
                $.alert(center.config.constant['0001']);

            });
        },
    }

//添加银行卡
    center.yinghangka = {
        data: function() {
            var yinghangkadatas = [{
                id: 'yinghangka_cardtype',
                pro: 'cardtype',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3011']
                    }
                }
            },{
                id: 'yinghangka_card_id',
                pro: 'card_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3012']
                    }
                }
            }, {
                id: 'yinghangka_bank',
                pro: 'bank',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3013']
                    },
                }
            },{
                id: 'yinghangka_ownername',
                pro: 'ownername',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3014']
                    },

                }
            }, {
                id: 'select_province1',
                pro: 'province_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3010']
                    },
                }
            }, {
                id: 'select_city1',
                pro: 'city_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3008']
                    },
                }
            }, {
                id: 'select_area1',
                pro: 'county_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3009']
                    },
                }
            },{
                id: 'yinghangka_bankname',
                pro: 'bankname',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3015']
                    },
                }
            }, {
                id: 'yinghangka_tel',
                pro: 'tel',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3016']
                    },
                    'isMobile': {
                        'is': true,
                        'msg': center.config.constant['4001']
                    }
                }
            }, {
                id: 'yinghangka_code',
                pro: 'code',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3017']
                    },
                }
            }, {
                id: 'yinghangka_cardstatus',
                pro: 'cardstatus',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['3018']
                    },
                }
            }];
            return validationToValue(yinghangkadatas);
        },
        submit: function() {
            var data = center.yinghangka.data();
            if (debug) {
                console.log('yinghangka validation ' + '--> ');
                console.log(data);
            }
            if (data) {

                var data2 = {};
                for (var key in data) {
                    data2[key] = data[key]
                }

                center.tool.ajax(center.config.addCards, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && center.config.constant['0002'] == d.data) {
                        $.alert(center.config.constant['0006'],function(){
                            $.router.load("#pageMyBankCard");
                        });
                    }else if (d.data && center.config.constant['5005'] == d.data) {
                        $.alert('验证码不正确');
                    }else if (d.data && center.config.constant['5006'] == d.data) {
                        $.alert('验证码失效');
                    }else if (d.data && center.config.constant['5007'] == d.data) {
                        $.alert('验证码错误');
                    }else if (d.data && center.config.constant['0003'] == d.data) {
                        $.alert('保存失败');
                    } else if (d.data) {
                        $.alert(center.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(center.config.constant['0001']);
                });
            }
        },

    };


    center.doRecharge= {
        data: function() {
            var doRechargedatas = [{
                id: 'getmoneypeople',
                pro: 'inid',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': center.config.constant['8002']
                    }
                }
            },{
                id: 'user_id',
                pro: 'outid',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['8007']
                    }
                }
            },{
                id: 'paytitle',
                pro: 'body',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['8003']
                    }
                }
            },{
                id: 'paymoneynum',
                pro: 'money',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': center.config.constant['8004']
                    }
                }
            },{
                id: 'rechargeaddtype',
                pro: 'app_type',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg':center.config.constant['8006']
                    }
                }
            },{
                id: 'info_id',
                pro: 'info_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg':''
                    }
                }
            },{
                id: 'type',
                pro: 'type',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg':center.config.constant['8009']
                    }
                }
            },{
                id: 'order_id',
                pro: 'order_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg':''
                    }
                }
            }];
            return validationToValue(doRechargedatas);
        },
        submit: function() {
            var data = center.doRecharge.data();
            if (debug) {
                console.log('doRecharge validation ' + '--> ');
                console.log(data);
            }
            if (data) {
              if(!data['type']){
                     data['type']=2;
              }

                 //data['inid']=4;
                 //data['outid']=1;
                 //data['money']='0.01';
                 //
                 //data['body']='55';
                 //data['info_id']=5;


                center.tool.ajax(center.config.doRecharge, data, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && center.config.constant['0003'] == d.data) {
                          //$(".status_block").show();
                    }else if(d){
                        //location.href= d.data;
                        $("input[name=show_url]").val(d.show_url);
                        $("input[name=out_trade_no]").val(d.out_trade_no);
                        $("input[name=body]").val(d.body);
                        $("input[name=sign]").val(d.sign);
                        $("input[name=subject]").val(d.subject);
                        $("input[name=total_fee]").val(d.total_fee);
                        $("input[name=sign_type]").val(d.sign_type);
                        $("input[name=payment_type]").val(d.payment_type);
                        $("input[name=partner]").val(d.partner);
                        $("input[name=service]").val(d.service);
                        $("input[name=_input_charset]").val(d._input_charset);
                        $("input[name=return_url]").val(d.return_url);
                        $("input[name=notify_url]").val(d.notify_url);
                        $("input[name=seller_id]").val(d.seller_id);
                        var out_trade_no= $.trim(d.out_trade_no)
                        $("#out_trade_no_shoukuan").val(out_trade_no);

                        console.info(d)
                        // document.getElementById("alipaysubmit").submit();
                        document.forms['alipaysubmit'].submit();

                        //location.href= "../service/Center.html?data=" + d.data + "#pageGetreturnurl"
                    }
                }, function(xhr, type) {

                    //console.info(d.responseText.substring(0,d.responseText.length));
                    //$(d.responseText.substring(0,d.responseText.length)).appendTo($("#geturlpage"));
                    //$.alert(center.config.constant['0001']);
                });
            }
        },

    };







    center.userMoney= {

        detail: function() {

            if (debug) {
                console.log('userMoney validation ' + '--> ');
                console.log(data);
            }


            center.tool.ajax(center.config.userMoney, null, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d) {

                    if(d.totalmoney == null){
                        $("#totalmoney").text(0);
                        $("#sctotalmoney").text(0);

                    }else if(d.totalmoney){
                        $("#totalmoney").text(d.totalmoney);
                        $("#sctotalmoney").text(d.totalmoney);
                    }

                    if(d.money == null){
                        $("#leftmoney").text(0);
                        $("#leftmoneypay").text(0);

                    }else if(d.money){
                        $("#leftmoney").text(d.money);
                        $("#leftmoneypay").text(d.money);
                    }



                }
            }, function(xhr, type) {
                $.alert(center.config.constant['0001']);
            });

        },

    };





//银行卡列表
    center.index = {
        data: function() {
            var data = {};
            var criterias = [

                {
                    el: 'center_pageNum',
                    pro: 'pageNum',
                    type: 'text'
                }, {
                    el: 'center_pageSize',
                    pro: 'PageSize',
                    type: 'text'
                }
            ];
            selectVal(criterias, data);
            console.info(data)
            return data;
        },
        query: function() {

            $("#center_pageNum").val(1);
            $("#center_pageSize").val(10);
            var data = center.index.data();
            // data.pageNum = 1;
            // data.pageSize = 10;

            if (debug) {
                console.log("index:");
                console.log(data);
            };
            $('#pageMyBankCard .infinite-scroll-preloader').empty();
            $('#pageMyBankCard .infinite-scroll-preloader').append('<div class="preloader"></div>');
            center.tool.ajax(center.config.cardsList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && center.config.constant['0003'] == d.data) {
                    $.alert(center.config.constant['0012']);
                    $("#cardlist").empty();
                    $(' #pageMyBankCard .infinite-scroll-preloader').html(center.config.constant['0012']);
                } else if (d) {

                    var list = juicer(center.tpl.indexListTpl(), d);

                    $("#cardlist").html(list);
                    $('#pageMyBankCard .infinite-scroll-preloader').empty();
                    for(var i=0; i<d.data.length;i++){
                           if(d['data'][i].isdefault==1){
                               $("#defaultbankcard").text(d['data'][i].bank);
                               $("#banknum").text(d['data'][i].card_id.substr(d['data'][i].card_id.length-4));
                           }
                    }



                }
                $.hidePreloader();

            }, function(xhr, type) {

                $(' #pageMyBankCard .infinite-scroll-preloader').html(center.config.constant['0001']);
                $.alert(center.config.constant['0001']);
                $.hidePreloader();
            });

        },


    }



//注销
    $(document).on('click','#tuichu',function(){
        var data={};
        center.tool.ajax(center.config.logout, data, null, 'post', function(d) {
                if (d.data && center.config.constant['0002'] == d.data) {

                    location.href = "../service/zhuce.html";
                    javascript:login.out()

                }
            }, function(xhr, type) {
                $.toast(center.config.constant['0001']);
            }
        );
    });

//设置默认
    $('#cardlist').on('click','.setting_card',function(){
        $(this).find(".fade1").css("display","block");
        $(this).find(".moren").css("display","block");
    });

    $('#cardlist').on('click','.she_mo',function(){
        var id=$(this).parents('.moren').attr('id');
        var self=this;

        var data={
            card_id:id
        }
        center.tool.ajax(center.config.chanCardsDefault, data, null, 'post', function(d) {
                if (d.data && center.config.constant['0002'] == d.data) {

                    center.index.query();
                }
            }, function(xhr, type) {
                $.toast(center.config.constant['0001']);
            }
        );
        $(".moren").css("display","none");
        $(".fade1").css("display","none");
    });

    $(function(){

        $(document).on("pageInit", function(e, pageId, $page) {



            if (pageId == "pageMyBankCard") {

                center.index.query();

            }else if(pageId == "pageIndex")
            {
                center.gerenziliao.query();
            }else if (pageId == "pageModifyPersonalDetails") {
                center.geren.eidt();

            }else if (pageId == "pageModifyReceiptAddress") {
                center.dizhi.eidt();

            }else if (pageId == "pageSettlementCenter") {

                var user_id = GetQueryString("user_id");
                var user_name = GetQueryString("user_name");

                $("#user_id").val(user_id);
                $("#user_name").val(user_name);

                center.userMoney.detail();


            }else if (pageId == "pageCollectionQRcode") {

                var money= GetQueryString("money");
                var body = GetQueryString("body");
                var peopleid = GetQueryString("peopleid");
                var people = GetQueryString("people");
                var order_id = GetQueryString("order_id");

                var qrcode = new QRCode(document.getElementById("qrcode"), {

                    width: 150,

                    height: 150,

                });

                qrcode.makeCode(+money+'&'+body+'&'+people+'&'+peopleid+'&'+order_id);

                $("#showmoney").text(money)

                  var testtime = true;


                setInterval(function(){

                    if(testtime){
                    var data = {
                        order_id:order_id,
                        pay_type:2

                    };

                    center.tool.ajax(center.config.backOrder, data, null, 'post', function(d) {
                        if (d.data == '支付成功') {
                            $('.status_block_finished').show();
                            testtime=false;
                        }

                    }, function(xhr, type) {
                        $.toast(center.config.constant['0001'], function() {
                            $.router.back();
                        });

                     });
                    }
                  },5000);


            } else if (pageId == "pagePayment") {
                center.userMoney.detail();
                var zhifumoney= GetQueryString("moneyss");
                var zhifuliuyan = GetQueryString("title");
                var shoukuanrenid = GetQueryString("renid");
                var shoukuanren = GetQueryString("ren");
                var info_id = GetQueryString("info_id");
                var type = GetQueryString("type");
                var order_id = GetQueryString("order_id");
                //var message = GetQueryString("message");


                $("#getmoneypeople").text(shoukuanren);
                $("#getmoneypeople").val(shoukuanrenid);



                $("#paymoneynum").text(zhifumoney);
                $("#paymoneynum").val(zhifumoney);

                $("#paytitle").text(zhifuliuyan);
                $("#paytitle").val(zhifuliuyan);

                $("#info_id").val(info_id);
                $("#type").val(type);
                $("#order_id").val(order_id);

                //if(message){
                //    $(".list-block_Receivables").hide();
                //     $(".status_block_failed").show();
                //     $(".cancel_row").show();
                //
                //}

            }else if (pageId == "pageBalance") {

                center.userMoney.detail();

            }else if (pageId == "pageRecharge") {

                var successmoney= GetQueryString("money");
                $("#finishpaymoney").text(successmoney);

            }else if (pageId == "pageReceivables") {

                var successmoney= GetQueryString("money");
                $("#finishpaymoney").text(successmoney);

            }

        });
        $.init();


        $(function(){
            $("#xiu_btn").click(function() {

                var id = $("#dizhi_id").val();

                if (id) {
                    center.dizhi.update(id);
                } else {
                    center.dizhi.submit();
                }
            });


            $("#save_card").click(function() {

                var id = $("#yinghangka_id").val();
                center.yinghangka.submit();
            });

            $(document).on('click','.zhifubao',function() {
                var addtype=$(this).attr('data-require');
                $("#rechargeaddtype").val(addtype);
                center.doRecharge.submit();


                var zhifusuccmoney = $("#paymoneynum").val();
                $("#finishpaymoney").text(zhifusuccmoney);

            });
            $(document).on('click','.weixin',function() {
                var addtype=$(this).attr('data-require');
                $("#rechargeaddtype").val(addtype);
                center.doRecharge.submit();
                var weixinsuccmoney = $("#paymoneynum").val();

                location.href = "http://localhost:8080/service/Center.html?&money="+weixinsuccmoney+"#pageRecharge"
            });
            $(document).on('click','.yue',function() {
                var addtype=$(this).attr('data-require');
                $("#rechargeaddtype").val(addtype);

                center.doRecharge.submit();
                var yuesuccmoney = $("#paymoneynum").val();
                location.href = "http://localhost:8080/service/Center.html?&money="+yuesuccmoney+"#pageRecharge"
            });

            $(document).on('click','.cz_zhifubao',function() {
                var addtype=$(this).attr('data-require');
                var money=$("#cz_money").val();
                if(money) {
                    center.doRecharge2.submit(addtype);
                }else if(!money){
                    $.alert(center.config.constant['8008']);
                }
            });
            $(document).on('click','.cz_weixin',function() {
                var addtype=$(this).attr('data-require');
                var money=$("#cz_money").val();

                if(money) {
                    center.doRecharge2.submit(addtype);
                }else if(!money){
                    $.alert(center.config.constant['8008']);
                }

            });

            $("#nan").click(function(){
                $("#nan").attr("check", true);
                $("#nv").attr("check", false);

            });

            $("#nv").click(function(){
                $("#nan").attr("check", false);
                $("#nv").attr("check", true);

            });

        });

    });

});
var indexquery=true;



function closeWindow(){
    $(".queding").css("display","none");
    $(".fade").css("display","none");
}

function closeWindow1(){
    $(".queding_baocun").css("display","none");
    $(".fade").css("display","none");
}

// $("#cardlist").on('click','.fade1',function(){
//    $(this).parents(".setting_card").find(".moren").css("display","none");
//    $(this).parents(".setting_card").find(".fade1").css("display","none");
// });

$(document).on('click','#zhuxiao_btn',function(){
    $(".fade").css("display","block");
    $(".queding").css("display","block");
});


$(document).on('click','.confirm-ok',function(){
    $(".fade").css("display","block");
    $(".queding_baocun").css("display","block");
});

$(document).on('click','#confirm_bao',function(){
    var id = $("#geren_id").val();

    if (id) {
        center.geren.update(id);
    } else {
        center.geren.submit();
    }

    $(".queding_baocun").css("display","none");
    $(".fade").css("display","none");
});




function delTe(id) {
    $.confirm('您确定要删除该银行卡吗?', function() {

        var data = {
            card_id:id
        };
        center.tool.ajax(center.config.deleteCards, data, null, 'post', function(d) {
            if (debug) {
                console.log(d.data);
            };
            if (d.data && center.config.constant['0002'] == d.data) {
                $.alert(center.config.constant['0010'], function() {
                    center.index.query();
                });
            } else if (d.data) {
                $.alert(center.config.constant['0011']);
            }
        }, function(xhr, type) {
            $.alert(center.config.constant['0001']);
        });
    });
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(decodeURI(r[2]));
    return null;
}


function getCookie(name){
    //cookie中的数据都是以分号加空格区分开
    var arr = document.cookie.split("; ");
    for(var i=0; i<arr.length; i++){
        if(arr[i].split("=")[0] == name){
            return arr[i].split("=")[1];
        }
    }
    //未找到对应的cookie则返回空字符串
    return '';
}


var user_id=getCookie('user_id');
$("#user_id").val(user_id);



/*获取验证码*/
var isPhone = 1;
function getCode(e){
    checkPhone(); //验证手机号码
    if(isPhone){
        resetCode(); //倒计时
    }else{
        $('#yinghangka_tel').focus();
    }
}

//验证手机号码
function checkPhone(){

    var phone = $('#yinghangka_tel').val();
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
    $('#huo_btn').hide();
    $('#J_second').html('60');
    $('#J_resetCode').show();
    var second = 60;
    var timer = null;
    var telephone = $("#yinghangka_tel").val();
        var data = {
            telephone:telephone,
            type:60
        };

        center.tool.ajax(center.config.identify, data, null, 'post', function(d) {
            if (d.data && center.config.constant['0002'] == d.data) {
                // $.alert("已发送")
            }else if(d.data && center.config.constant['5000'] == d.data){
                $.alert("短信类型不存在")
            }else if(d.data && center.config.constant['5001'] == d.data){
                $.alert("参数不全")
            }else if(d.data && center.config.constant['5002'] == d.data){
                $.alert("半小时内已经连续获取三次，请稍后再试")
            }else if(d.data && center.config.constant['5003'] == d.data){
                $.alert("一分钟内已经发送过，不能频繁发送")
            }else if(d.data && center.config.constant['5004'] == d.data){
                $.alert("该手机号已经注册过")
            }else if(d.data && center.config.constant['5005'] == d.data){
                $.alert("手机格式有误")
            }

        }, function(xhr, type) {
            $.toast(center.config.constant['0001'], function() {
                $.router.back();
            });

        });
    timer = setInterval(function(){
        second -= 1;
        if(second >0 ){
            $('#J_second').html(second);
        }else{
            clearInterval(timer);
            $('#huo_btn').show();
            $('#J_resetCode').hide();
        }
    },3000);
}


//function zhifubao(){
//
//    document.forms['alipaysubmit'].submit();
//    //var f = document.getElementsByTagName("form")[0];
//    //var money=$("#WIDtotal_fee").val();
//    //
//    //f.action=f.action+"&"+"money="+money;
//    //
//    //location.href=f.action;
//}


center.doRecharge2= {

    submit: function(addtype) {
        var money=$("#cz_money").val();
        var body='充值';
        var user_id=getCookie('user_id');
        //var inid = user_id;
        var outid = user_id;

        var data = {
            money:money,
            body:body,
            //inid:inid,
            outid:outid,
            type:1,
            app_type:addtype,
        };


        center.tool.ajax(center.config.doRecharge, data, null, 'post', function(d) {
            if (debug) {
                console.log(d);
            }
            if (d.data && center.config.constant['0003'] == d.data) {
                //$(".status_block").show();
            }else if(d){
                //location.href= d.data;
                $("input[name=show_url]").val(d.show_url);
                $("input[name=out_trade_no]").val(d.out_trade_no);
                $("input[name=body]").val(d.body);
                $("input[name=sign]").val(d.sign);
                $("input[name=subject]").val(d.subject);
                $("input[name=total_fee]").val(d.total_fee);
                $("input[name=sign_type]").val(d.sign_type);
                $("input[name=payment_type]").val(d.payment_type);
                $("input[name=partner]").val(d.partner);
                $("input[name=service]").val(d.service);
                $("input[name=_input_charset]").val(d._input_charset);
                $("input[name=return_url]").val(d.return_url);
                $("input[name=notify_url]").val(d.notify_url);
                $("input[name=seller_id]").val(d.seller_id);
                var out_trade_no= $.trim(d.out_trade_no)
                $("#out_trade_no_shoukuan").val(out_trade_no);
                console.info(d)

                document.forms['alipaysubmit'].submit();

            }
        }, function(xhr, type) {
            $.alert(center.config.constant['0001']);
        });
    },

};

function qrcontent() {
    var people = document.getElementById("user_name").value;
    var peopleid = document.getElementById("user_id").value;
    var money = document.getElementById("getmoney").value;
    var body = document.getElementById("beizhu").value;
    var order_id;

    var data = {
        body:'付款',
        inid:peopleid,
        app_type:2,
        money:money
    };

    center.tool.ajax(center.config.getCodeOrder, data, null, 'post', function(d) {
        if (d.data && center.config.constant['0003'] == d.data) {

        }else{
            order_id = d.data;
            location.href = "../service/Center.html?&money=" + money + "&body=" + body + "&people=" + people + "&peopleid=" + peopleid + "&order_id=" + order_id + "#pageCollectionQRcode";
        }

    }, function(xhr, type) {
        $.toast(center.config.constant['0001'], function() {
            $.router.back();
        });

    });


}


$("#pageBalanceTransfer").on("click", ".moneyoutSure", function () {

    var money = document.getElementById("moneyout").value;
    if(!money){
        $.toast(center.config.constant['8013']);
        return;
    }
    var data = {
        money:money
    };

    center.tool.ajax(center.config.moneyOut, data, null, 'post', function(d) {
        if (d.data && center.config.constant['8010'] == d.data) {
            $.alert(center.config.constant['8010']);
        }else if(d.data && center.config.constant['8011'] == d.data){
            $.alert(center.config.constant['8011']);
        }else if(d.data && center.config.constant['0002'] == d.data){
            $.alert(center.config.constant['8012']);
        }

    }, function(xhr, type) {
        $.toast(center.config.constant['0001'], function() {
            $.router.back();
        });

    });


})