window.zhanzhang = window.zhanzhang || {};
    var baseUrl = 'http://localhost:8080';

var filedate=zhanzhang;

var uploaddebug = true;
var test=false;





function handleFiles(obj, fileList, name) { 
    startpro=0;
    nots=0;
    $.closeModal($('.modal')); 
    var files = obj.files, 
        formData = new FormData();
        for (var i = 0; i < files.length; i++) {
        
            formData.append("up_file", files[i]);
            var ipot=files[i].name.lastIndexOf(".");
            var type=fileType(files[i].name.substring(ipot+1)); 
            $.ajax({
                type: "POST",
                url: zhanzhang.config.uploadFile,
                data: formData,
                processData: false,
                contentType: false,
                xhr: function() {
                    var xhr = $.ajaxSettings.xhr();
                    if ('onprogress' in xhr.upload) { 
                        $.showPreloader('上传中...');
                        nots++;
                    }
                    if (onprogress && xhr.upload) {
                        xhr.upload.addEventListener("progress", onprogress, false);
                        return xhr;
                    }
                },
                success: function(d) {
                    console.log(d); 
                    if (d.data == 'ERROR') {
                        $.alert('图片上传失败！');
                    } else if (d.data == 'parameter miss') {
                        $.alert('图片上传失败！');
                    } else if (d.data) {
                        var path=test?d.data.replace('/zhanzhang/',''):d.data; 
                        if (type=='image') {
                            showImgs(fileList, name, path);
                        } else if(type=='video'){
                            showVideos(fileList, name, path);
                        }
                        
                    } else {
                        if (uploaddebug) {
                            $.alert('上传成功 路径返回错误，<br/>用于测试默认图片！');
                            showImgs(fileList, name, zhanzhang.config.uploadDefult);
                        };
                    }
                    if (nots==1) {
                        $.hidePreloader();
                    }
                },
                error: function(xhr, type) {
                    if (nots==1) {
                        $.hidePreloader();
                    }
                    $.alert(zhanzhang.config.constant['0001']);
                    console.log(xhr);
                    if (uploaddebug) {
                        $.alert('上传失败 路径返回错误，<br/>用于测试默认图片！');
                        showImgs(fileList, name, zhanzhang.config.uploadDefult);
                    }
                }
            });
        };
}
var startpro=0;
var nots=0;
function onprogress(evt) { 
    var loaded = evt.loaded;
    var tot = evt.total;
    var per = Math.floor(100 * loaded / tot);
    if (startpro==0) {
        $.showPreloader('上传中...');
        startpro++;
    }
    if (loaded==tot) {
       $.hidePreloader();
    } 
}

function showImgs(fileList, name, src) {
    var img = new Image();
    if (window.URL) {
        img.src = "http://localhost:8080" + src;
        img.onload = function(e) {
            window.URL.revokeObjectURL(this.src);
        }
        img.setAttribute("name", name);
        var imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "img-div");
        imgDiv.appendChild(img);
        var closeDiv = document.createElement("div")
        closeDiv.setAttribute("class", "close-div")
        imgDiv.appendChild(closeDiv);
        fileList.appendChild(imgDiv);
    } else if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(src);
        reader.onload = function(e) {
            img.src = src;
            img.setAttribute("name", name);
            var imgDiv = document.createElement("div");
            imgDiv.setAttribute("class", "img-div");
            imgDiv.appendChild(img);
            var closeDiv = document.createElement("div")
            closeDiv.setAttribute("class", "close-div");
            imgDiv.appendChild(closeDiv);
            fileList.appendChild(imgDiv);
        }
    } else {
        obj.select();
        obj.blur();
        document.selection.empty();
        img.src = src;
        img.setAttribute("name", name);
        var imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "img-div");
        imgDiv.appendChild(img);
        var closeDiv = document.createElement("div")
        closeDiv.setAttribute("class", "close-div")
        imgDiv.appendChild(closeDiv);
        fileList.appendChild(imgDiv);
    }
    $('.close-div').click(function() {
        var $close = $(this);
        $close.parent().remove();
    });
    if (nots==1) {
        $.hidePreloader();
    }
}


function fileType(type){
    type=type||'';
    type=type.toLowerCase();
    var videoType='flv,3gp,mpeg,avi,mp4,mov,wmv,rmvb,';
    var imgType="jpg,jpeg,png,gif,bmp,";
    if (videoType.indexOf(type+',')>=0) {
        return 'video';
    }
    if (imgType.indexOf(type+',')>=0) {
        return 'image';
    }
    return '';
}

// 分享
$(document).on('click','.icon-share', function () {
    var modal = $.modal({
        afterText: '<div class="share-wrap">'+
                    '<div  class="row">'+
                        '<div class="col-33" onclick="jiathis_mh5.sendTo(\'cqq\');">'+
                            '<img src="images/share/qq.png"  style="display:block">' +
                            '<div class="share-text">QQ好友</div>'+
                        '</div>'+
                        '<div class="col-33" onclick="jiathis_sendto(\'weixin\');">'+
                            '<img src="images/share/weixin.png"  style="display:block">' +
                            '<div class="share-text">微信好友</div>'+
                        '</div>'+
                        '<div class="col-33" onclick="jiathis_sendto(\'xiaoyou\');">'+
                            '<img src="images/share/friend-circle.png"  style="display:block">' +
                            '<div class="share-text">朋友网</div>'+
                        '</div>'+
                    '</div>'+
                    '<div  class="row">'+
                        '<div class="col-33" onclick="jiathis_mh5.sendTo(\'tsina\');">'+
                            '<img src="images/share/weibo.png"  style="display:block">' +
                            '<div class="share-text">新浪微博</div>'+
                        '</div>'+
                        '<div class="col-33" onclick="jiathis_sendto(\'copy\');">'+
                            '<img src="images/share/copy-link.png"  style="display:block">' +
                            '<div class="share-text">复制链接</div>'+
                        '</div>'+
                    '</div>'+
                    '</div>',
        buttons: [
            {
                text: '取消'
            }
        ]
    });
});
var sildeObj = function(t, cIndex) {
    var c = t.data('count');
    var marginleft = Math.abs(parseFloat(t.css('margin-left')));
    this.toleft = function() {
            c = c == undefined ? 1 : parseInt(c) + 1;
            if (marginleft != 0) {
                this.result();
            };
        },
        this.toright = function() {
            c = c == undefined ? 0 : c;
            if ((cIndex + c) % 3 == 0 && cIndex != t.find('li').length) {
                c += -1;
                this.result();
            }

        },
        this.result = function() {
            t.css('margin-left', c * 2.1 + 'rem');
            t.data('count', c);
        }
}
var slide = function(dom, param, cIndex) {
    var obj = new sildeObj(dom, cIndex);
    param == 'left' ? obj.toleft() : obj.toright();
};
$('.close-div').click(function() {
    var $close = $(this);
    $close.addClass('hide');
    $close.siblings('img').remove();
});



//页面跳转方法
function goPageList(id){
    $.router.load("#"+id);
}
function back(info_id){
    $("#"+info_id).val('');
    $.router.back();
}
$(document).on('click','.fileElem-photo', function () { 
    var imgList = $(this).attr('imgList');
    var pubImg = $(this).attr('pubImg');
    var modal = $.modal({
        afterText: '<div class="files-wrap">'+
                    '<div  class="row">'+
                        '<div class="col-33">'+
                            '<img src="images/icon/camera.png"  style="display:block">' +
                            '<div class="share-text">相机</div>'+
                            '<input type="file" class="fileInp fileInp-opacity" accept="image/*;capture=camera"   onchange="handleFiles(this,document.getElementById(\''+imgList+'\'),\''+pubImg+'\')" value="">'+
                        '</div>'+
                        '<div class="col-33">'+
                            '<img src="images/icon/camera.png"  style="display:block">' +
                            '<div class="share-text">摄像机</div>'+
                            '<input type="file"  class="fileInp fileInp-opacity" multiple accept="video/*;capture=camcorder"  onchange="handleFiles(this,document.getElementById(\''+imgList+'\'),\''+pubImg+'\')" value="">'+
                        '</div>'+
                        '<div class="col-33">'+
                            '<img src="images/icon/picture.png"  style="display:block">' +
                            '<div class="share-text">相册</div>'+
                            '<input type="file"  class="fileInp fileInp-opacity" multiple accept="image/*" onchange="handleFiles(this,document.getElementById(\''+imgList+'\'),\''+pubImg+'\')" value="">'+
                        '</div>'+
                    '</div>'+
                    '</div>',
        buttons: [
            {
                text: '取消'
            }
        ]
    });
}) 






var debug = false;

+ function($) {
    "use strict";

    window.zhanzhang = window.zhanzhang || {};

    var baseUrl = 'http://localhost:8080';

    var filedata = zhanzhang;

    zhanzhang.config = {
         baseUrl: '/web',
         loginUrl: baseUrl + '/service/zhuce.html',
         indexQueryListUrl: baseUrl + '',
         pubZPeopleService: baseUrl + '/user/save_people_service',
         peopleserviceDetail: baseUrl + '/user/people_service_detail',
         pubZPeopleNeed: baseUrl + '/user/save_people_need',
         peopleneedDetail: baseUrl + '/user/people_need_detail',
         peopleNeedList: baseUrl + '/user/people_need_list',
         uploadFile: baseUrl + '/uploadFile',
         uploadDefult: baseUrl + '/upload/home.png',
         reportinfo: baseUrl + '/user/report',
         isreport: baseUrl + '/user/showreport',
         storeinfo: baseUrl + '/user/store',
         isstore: baseUrl + '/user/showstore',
         pubZPeopleServiceUpdate: baseUrl + '/user/upload_people_service',
         pubZPeopleNeedUpdate: baseUrl + '/user/upload_people_need',

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
            '3022': '请选择我的位置！',
            '4000': '格式错误！',
            '4001': '手机号格式错误！',
            '4002': '密码必须包含数字、字母和特殊字符，且长度6~20！',
            '4003': '两次密码不一致！',
            '4004': '格式为数字！',
            '4005': '格式为整数！',
            '4006': '格式为数值！',
            '4007': '格式为数值,最多保留两位小数！',
            '5006': '举报成功！',
            '5007': '举报失败，已经举报！',
            '5008': '举报失败!',
            '5009': 'already reported',


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
    latitudeP: 32163306,
    longitudeP: 118712513,
    accuracyP: 67.8021001352539
};

var debug = false;

$(function () {
  'use strict';

    window.zhanzhang = window.zhanzhang || {}; 

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
                 if (!zhanzhang.tool.validation.grea02Decimal(value)) {
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
                 if (!zhanzhang.tool.validation.isMobile(value)) {
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
                 if (!zhanzhang.tool.validation.digits(value)) {
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
    var viewInit = function(_m, data) {
        var html = [];

        for(var i=0;i<data.contexts.length;i++ ) {
            
            html.push('<div class="img-div"><img src="' + data.contexts[i].img_path + '" name="pubZPeopleService_imgs"><div class="close-div"></div></div>')
             
        }
        var list = $('#pubZPeopleService_imgs_List');
        var list2= $('#pubZPeopleNeed_imgs_List');
        list.empty();
        list2.empty();
        if (html.length > 0) {
            list.html(html.join(''));
            list2.html(html.join(''));
        }

     for (var key in data) {

         if(key === 'province_id'){
             var province=$.trim(data[key]);
             $("#select_province1").val(province);
         }else if(key === 'city_id'){
             var city=$.trim(data[key]);
             $("#select_city1").val(city);
         }else if(key === 'county_id'){
             var county=$.trim(data[key]);
             $("#select_area1").val(county);
         }
        
         var el = $("#" + _m + key);
         var eleType = $(el).attr('eleType');
         var name = $(this).attr('name');
         var value = $.trim(data[key]);
         if (eleType === 'input' || !eleType) {
             $(el).val(value);
         }else if (name=== 'province') {
             $(this).text(value);
         }else if (name=== 'city') {
             $(this).text(value);
         } else if (name=== 'street') {
             $(this).text(value);
         }else if (eleType === 'img') {
             var imgs = value.split(',');
             if (imgs && imgs.length > 0 && imgs[0] != '') {
                 var list = document.getElementById(_m + key + '_List');
                 $(list).empty();
                 $.each(imgs, function(i, e) {
                     var ipot=e.lastIndexOf(".");
                     var type=fileType(e.substring(ipot+1)); 
                     if (type=='image') {
                         showImgs(list, "" + _m + key, e);
                     } else if(type=='video'){
                         showVideos(list, "" + _m + key, e);
                     }
                 });
             }
         } else if(eleType === 'city'){
             $(el).find('a').text(value);
         } else if ('citys_th' === eleType) {
             var pId = (_m + key).split('_')[0]+'_cityDiv';
             $('#'+pId).empty();
             if (value) {
                 var citys=value.split(',');
                 for (var i = 0; i < citys.length; i++) {
                      createDuringCity(pId,citys[i]);
                 } 
             }     
         } else if (eleType === 'btnRound') {
             $("input[name='" + _m + key + "']").attr('check', false).removeClass('button-fill');
             if (value=='3') {
                 $("span[name='" + _m + key + "'][data-pub='1']").attr('check', true)
                 .addClass('button-fill');
                 $("span[name='" + _m + key + "'][data-pub='2']").attr('check', true)
                 .addClass('button-fill');
             }else if(value=='1' || value=='2'){
                 $("span[name='" + _m + key + "'][data-pub='" + value + "']").attr('check', true)
                 .addClass('button-fill');
             }
         }
     }
    };

// var viewInit1 = function(_m, data) {
//      var html = [];

//         for(var i=0;i<data.contexts.length;i++ ) {
            
//             html.push('<div class="img-div"><img src="' + data.contexts[i].img_path + '" name="pubZPeopleService_imgs"><div class="close-div"></div></div>')
             
//         }
//         var list = $('#pubZPeopleService_imgs_List');
//         var list2= $('#pubZPeopleNeed_imgs_List');
//         list.empty();
//         list2.empty();
//         if (html.length > 0) {
//             list.html(html.join(''));
//             list2.html(html.join(''));
//         }
// };
    var viewInfo = function(_m, data) {
          var html = [];

        for(var i=0;i<data.contexts.length;i++ ) {
            
            html.push('<div class="swiper-slide"><img src="' + data.contexts[i].img_path + '" alt="" style="width: 100%" ></div>')
             
        }
        var list = $('#peopleServiceDetail_show_img_List');
        var list2= $('#peopleNeedDetail_show_img_List');
        list.empty();
        list2.empty();
        if (html.length > 0) {
            list.html(html.join(''));
            list2.html(html.join(''));
        }
         for (var key in data) {
             var el = $("#" + _m + key);
             var eleType = $(el).attr('eleType');
             var value = $.trim(data[key]);
             if (eleType === 'input' || !eleType) {
                 $(el).html(value);
             } else if (eleType === 'telVew') {
                $(el).html(value);
                $("#" + _m + "tel").attr('href', 'tel:' + value);
                $("#" + _m + "sms").attr('href', 'sms:' + value);
            }
         }
    };
    var selectVal = function(els, data) {
        for (var i = 0; i < els.length; i++) {
            
            if (els[i].type == 'text') {
                var ret = $("#" + els[i].el).val();
                if ('0' != ret) {
                    data[els[i].pro] = ret;
                }
            }
            if (els[i].type == 'btnRound') {
                var round = $("a[name='" + els[i].el + "'][check='true']");
                if (round.length!=0) {
                    data[els[i].pro] = round.attr('data-pub');
                    // if (round.length==2) {
                    //     // data[els[i].pro] =3;
                    // }else{
                        
                    // }
                }else{
                    data[els[i].pro] = 0;
                }  
            }
        }
    };  
    zhanzhang.tpl = {
        indexListTpl: function(data) {

           return ['{@each data as item}',
                 
                '<li >',
                '<a href="../service/service.html?id=${item.id}#pagePeopleServiceDetail" class="item-content" external>',
                '{@if item.img}','<div class="item-media mediastyle"><img src="${item.img.split(",")[0]}"></div>',
                '{@else if !item.img}', '',
                '{@/if}',
                '<div class="item-inner">',
                '<div class="item-title-row">',
                '<div class="item-title" >${item.title}</div>',
                '<div class="item-after mymapstyle" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img src="images/tong_btn_dwtz.png"></div>',
                '</div>',
                '<div class="item-subtitle1" >',
                '<span>','{@if item.money}','${item.money}','{@else if !item.money}', '0','{@/if}','元</span><span>','{@if item.unit}','/${item.unit}','{@else if !item.unit}', '','{@/if}','</span>',
                '</div>',
                '<div class="item-subtitle2">${item.create_time}</div>',
                '</div>',
                '</a>',
                '</li>',
  
                
              
                     '{@/each}'
             ].join('');
        },
        indexNeedListTpl: function(data) {

           return ['{@each data as item}',

                    '<li>',
                    '<a href="../service/service.html?id=${item.id}#pagePeopleNeedDetail" class="item-content" external>',
                    '{@if item.img}','<div class="item-media mediastyle"><img src="${item.img.split(",")[0]}"></div>',
                   '{@else if !item.img}', '',
                   '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '<div class="item-after mymapstyle" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img src="images/tong_btn_dwtz.png"></div>',
                    '</div>',
                    '<div class="item-subtitle1">',
                    '<span>','{@if item.money}','${item.money}','{@else if !item.money}', '0','{@/if}','元</span><span>','{@if item.unit}','/${item.unit}','{@else if !item.unit}', '','{@/if}','</span>',
                    '</div>',
                    '<div class="item-subtitle2" >${item.create_time}</div>',
                    '</div>',
                    '</a>',
                    '</li>',

                     '{@/each}'
             ].join('');
        },

    };
    zhanzhang.tool = {
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
  
    zhanzhang.index = {
        data: function() {
            var data = {};
                 var criterias = [
              
                {
                    el: 'types',
                    pro: 'types',
                    type: 'btnRound'
                },
                {
                    el: 'sell_house_type',
                    pro: 'type',
                    type: 'text'
                }, {
                    el: 'sell_param',
                    pro: 'searchname',
                    type: 'text'
                },  {
                    el: 'select_city2',
                    pro: 'city_id',
                    type: 'text'
                }, {
                    el: 'select_area2',
                    pro: 'county_id',
                    type: 'text'
                }
            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },
   
       query: function(obj) {
            // $.showPreloader();
            
            var data = zhanzhang.index.data();     

             if(obj){
                data.city_id=obj;
             }
              
            if (debug) {
                console.log("index:");
                console.log(data);
            };
            
            if (0 == data.types) {

                data.pageNum=1;
                data.PageSize = 10;

                $("#tab1 .infinite-scroll-preloader").empty();
                $("#tab1 .infinite-scroll-preloader").append('<div class="preloader"></div>'); 
            zhanzhang.tool.ajax(zhanzhang.config.peopleNeedList, data, null, 'get', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && zhanzhang.config.constant['0003'] == d.data) {
                    $("#queryList").empty(); 
                    $("#tab1 .infinite-scroll-preloader").html(zhanzhang.config.constant['0012']); 
                    // $.alert(zhanzhang.config.constant['0012']);
                  
                    
                } else if (d) {
                    
                    var list = juicer(zhanzhang.tpl.indexListTpl(), d);
                    $("#queryList").html(list);
                    $("#tab1 .infinite-scroll-preloader").empty();
          
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {
      
                $("#tab1.infinite-scroll-preloader").html(zhanzhang.config.constant['0001']);
                $.hidePreloader();
            });
            }else if(1 == data.types){
                data.pageNum=1;
                data.PageSize = 10;
                $("#tab2 .infinite-scroll-preloader").empty();
                $("#tab2 .infinite-scroll-preloader").append('<div class="preloader"></div>'); 
                zhanzhang.tool.ajax(zhanzhang.config.peopleNeedList, data, null, 'get', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && zhanzhang.config.constant['0003'] == d.data) {
                    $("#queryNeedList").empty();
                    $("#tab2 .infinite-scroll-preloader").html(zhanzhang.config.constant['0012']); 
               
                } else if (d) {
                    // var page = d.data.page;
                    var list = juicer(zhanzhang.tpl.indexNeedListTpl(), d);
                    $("#queryNeedList").html(list);
                    $("#tab2 .infinite-scroll-preloader").empty();
                 
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {
                $("#tab2.infinite-scroll-preloader").html(zhanzhang.config.constant['0001']);
                $.hidePreloader();
            });
            }
        },
         detail: function(id) {

            var data = {
               id: id,
             
            };
            if (debug) {
                console.log(data);
            }
            $("#peopleServiceDetail_id").val(id)

            zhanzhang.tool.ajax(zhanzhang.config.peopleserviceDetail, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && zhanzhang.config.constant['0003'] == d.data) {
                    $.alert(zhanzhang.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    // viewInfo(_field, d.data);
                    viewInfo('peopleServiceDetail_', d);
                     historyWatch(id, 3);
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(zhanzhang.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });


        },
    
         Needdetail: function(id) {
            var data = {
                id: id,
            };
            if (debug) {
                console.log(data);
            }
           $("#peopleNeedDetail_id").val(id)
            zhanzhang.tool.ajax(zhanzhang.config.peopleneedDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && zhanzhang.config.constant['0003'] == d.data) {
                     $.alert(zhanzhang.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo('peopleNeedDetail_', d);
                    historyWatch(id, 4);

                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(zhanzhang.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
        // init: function() {
        //     zhanzhang.index.query();
        // }
    };
   

   
    zhanzhang.pubZPeopleService = {
     data: function() {
         var pubZPeopleServicedatas = [{
                id: 'pubZPeopleService_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubZPeopleService_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': zhanzhang.config.constant['3002']
                 }
             }
         }, {
             id: 'pubZPeopleService_money',
             pro: 'money',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
             id: 'pubZPeopleService_unit',
             pro: 'unit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
             id: 'pubZPeopleService_type',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubZPeopleService_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubZPeopleService_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': zhanzhang.config.constant['3005']
                 },
             }
         }, {
             id: 'pubZPeopleService_telephone',
             pro: 'telephone',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': zhanzhang.config.constant['3006']
                    },
                 'isMobile': {
                        'is': true,
                        'msg': zhanzhang.config.constant['4001']
                    }

             }
         }, {
             id: 'select_city1',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': zhanzhang.config.constant['3010']
                    },

             }
         }, {
             id: 'select_area1',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': zhanzhang.config.constant['3011']
                    },
             }
         },{
             id: 'pubZPeopleService_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': zhanzhang.config.constant['3022']
                    }
             }
         }, {
             id: 'pubZPeopleService_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': zhanzhang.config.constant['3022']
                    }
             }
         }];
         return validationToValue(pubZPeopleServicedatas);
     },
     submit: function(status) {
         var data = zhanzhang.pubZPeopleService.data();
         if (debug) {
             console.log('pubZPeopleService validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             // var x = $('#location_x').val();
             // var y = $('#location_y').val();
             // if (x && y) {
             //     data.location_x = parseInt(Number(x).toFixed(6) * Math.pow(10, 6));
             //     data.location_y = parseInt(Number(y).toFixed(6) * Math.pow(10, 6));
             // } else {
             //     data.location_x = position.latitudeP;
             //     data.location_y = position.longitudeP;
             // }
               var data2 = {};
                for (var key in data) {
                    if(key == "imgs"){
                    data2[key] = data[key];
                    }else{
                    data2['ZPeopleService.' + key] = data[key];}
                }
             data2['ZPeopleService.status'] = status;

             zhanzhang.tool.ajax(zhanzhang.config.pubZPeopleService, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && zhanzhang.config.constant['0002'] == d.data) { 
                     $.alert(zhanzhang.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                      

                     });
                 } else if (d.data) {
                     $.alert(zhanzhang.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(zhanzhang.config.constant['0001']);
             });
         }
     },

       eidt: function(id) {
            
            var data = {
                id: id,
            };

            zhanzhang.tool.ajax(zhanzhang.config.peopleserviceDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && zhanzhang.config.constant['0003'] == d) {
                     $.alert(zhanzhang.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    console.log(d)
                   
                    viewInit('pubZPeopleService_', d);
                    
                }
            }, function(xhr, type) {
                $.toast(zhanzhang.config.constant['0001']);
            });
        },
        update: function(status,id) {

            var data = zhanzhang.pubZPeopleService.data();
            if (data) {
                var x = $('#location_x').val();
                var y = $('#location_y').val();
                if (x && y) {
                    data.location_x = x * Math.pow(10, 6);
                    data.location_y = y * Math.pow(10, 6);
                } else {
                    data.location_x = position.latitudeP;
                    data.location_y = position.longitudeP;
                }
               var data2 = {};
                for (var key in data) {
                    if(key == "imgs"){
                    data2[key] = data[key];
                    }else{
                    data2['ZPeopleService.' + key] = data[key];}
                }
               data2['ZPeopleService.status'] = status;
               data2['ZPeopleService.id'] = id;
                if (debug) {
                    console.log('pubZPeopleService update validation ' + '--> ');
                    console.log(data2);
                }
                zhanzhang.tool.ajax(zhanzhang.config.pubZPeopleServiceUpdate, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d.data);
                    };
                    if (d.data && zhanzhang.config.constant['0002'] == d.data) {
                        $.alert(zhanzhang.config.constant['0004'],function(){
                            $.router.back();
                        });
                    } else if (d.data) {
                        $.alert(zhanzhang.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(zhanzhang.config.constant['0001']);
                });
            }
        },

    
     // init: function() {
     //     // var id = $("#pubZPeopleService_id").val();
     //     // if (id) {
     //     //     zhanzhang.pubZPeopleService.eidt(id);
     //     // }
     // }
    };



    zhanzhang.pubZPeopleNeed = {
     data: function() {
         var pubZPeopleNeeddatas = [{
                id: 'pubZPeopleNeed_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubZPeopleNeed_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': zhanzhang.config.constant['3002']
                 }
             }
         }, {
             id: 'pubZPeopleNeed_money',
             pro: 'money',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
             id: 'pubZPeopleNeed_unit',
             pro: 'unit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
             id: 'pubZPeopleNeed_type',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubZPeopleNeed_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubZPeopleNeed_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': zhanzhang.config.constant['3005']
                 },
             }
         }, {
             id: 'pubZPeopleNeed_telephone',
             pro: 'telephone',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': zhanzhang.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,
                        'msg': zhanzhang.config.constant['4001']
                    }
             }
         }, {
             id: 'select_city3',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': zhanzhang.config.constant['3010']
                    },

             }
         }, {
             id: 'select_area3',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': zhanzhang.config.constant['3011']
                    },

             }
         },{
             id: 'pubZPeopleNeed_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': zhanzhang.config.constant['3022']
                    }
             }
         }, {
             id: 'pubZPeopleNeed_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': zhanzhang.config.constant['3022']
                    }
             }
         }];
         return validationToValue(pubZPeopleNeeddatas);
     },
     submit: function(status) {
         var data = zhanzhang.pubZPeopleNeed.data();
         if (debug) {
             console.log('pubZPeopleNeed validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             // var x = $('#location_x').val();
             // var y = $('#location_y').val();
             // if (x && y) {
             //     data.location_x = parseInt(Number(x).toFixed(6) * Math.pow(10, 6));
             //     data.location_y = parseInt(Number(y).toFixed(6) * Math.pow(10, 6));
             // } else {
             //     data.location_x = position.latitudeP;
             //     data.location_y = position.longitudeP;
             // }
               var data2 = {};
                for (var key in data) {
                    if(key == "imgs"){
                    data2[key] = data[key];
                    }else{
                    data2['ZPeopleNeed.' + key] = data[key];}
                }
             data2['ZPeopleNeed.status'] = status;

             zhanzhang.tool.ajax(zhanzhang.config.pubZPeopleNeed, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && zhanzhang.config.constant['0002'] == d.data) { 
                     $.alert(zhanzhang.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(zhanzhang.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(zhanzhang.config.constant['0001']);
             });
         }
     },
    
       eidt: function(id) {
            
            var data = {

                id: id,

            };

            zhanzhang.tool.ajax(zhanzhang.config.peopleneedDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && zhanzhang.config.constant['0003'] == d) {
                     $.alert(zhanzhang.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    console.log(d)
                    // viewInit1('pubZPeopleService_', d);
                    viewInit('pubZPeopleService_', d);
                    
                }
            }, function(xhr, type) {
                $.toast(zhanzhang.config.constant['0001']);
            });
        },
        update: function(status,id) {

            var data = zhanzhang.pubZPeopleNeed.data();
            if (data) {
                var x = $('#location_x').val();
                var y = $('#location_y').val();
                if (x && y) {
                    data.location_x = x * Math.pow(10, 6);
                    data.location_y = y * Math.pow(10, 6);
                } else {
                    data.location_x = position.latitudeP;
                    data.location_y = position.longitudeP;
                }
               var data2 = {};
                for (var key in data) {
                    if(key == "imgs"){
                    data2[key] = data[key];
                    }else{
                    data2['ZPeopleNeed.' + key] = data[key];}
                }
               data2['ZPeopleNeed.status'] = status;
               data2['ZPeopleNeed.id'] = id;
                if (debug) {
                    console.log('pubZPeopleNeed update validation ' + '--> ');
                    console.log(data2);
                }
                zhanzhang.tool.ajax(zhanzhang.config.pubZPeopleNeedUpdate, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d.data);
                    };
                    if (d.data && zhanzhang.config.constant['0002'] == d.data) {
                        $.alert(zhanzhang.config.constant['0004'],function(){
                            $.router.back();
                        });
                    } else if (d.data) {
                        $.alert(zhanzhang.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(zhanzhang.config.constant['0001']);
                });
            }
        },
    
     // init: function() {
     //     var id = $("#pubZPeopleNeed_id").val();
     //     if (id) {
     //         zhanzhang.pubZPeopleNeed.eidt(id);
     //     }
     // }
    };
    



    $(document).on("pageInit", function(e, pageId, $page) {
                      
            var url = location.search; //获取url中"?"符后的字串
             var strs = url.substr(1);
              var id=strs.split("=")[1]


         /*var arr = document.cookie.split("; ");  
            for(var i=0; i<arr.length; i++){  
                if(arr[i].split("=")[0] == "id"){  
                   var id= arr[i].split("=")[1];  
                }
            }*/
   
                    console.log(id)
            if (pageId == "pageIndex") {
                 // if(!id){
                 //   zhanzhang.index.init();
                 // }
            }
            else if (pageId == "pagePostChoose") {
               document.cookie = "id"+"=;expires="+(new Date(0)).toGMTString();
            }
            else if(pageId == "pagePeopleServiceDetail"){
                  zhanzhang.index.detail(id); 
            }
            else if(pageId == "pagePeopleNeedDetail"){
                 zhanzhang.index.Needdetail(id); 
            }else if (pageId == "pagePubZPeopleService") {
                if (id) {
                    zhanzhang.pubZPeopleService.eidt(id);
                } 
            }else if (pageId == "pagePubZPeopleNeed") {
                if (id) {
                    zhanzhang.pubZPeopleNeed.eidt(id);
                } 
            }


 });
 $.init();


    $(function() {
     $("#btnPubZPeopleService").click(function() {
         var id = $("#pubZPeopleService_id").val();
          
        if (id) {
                zhanzhang.pubZPeopleService.update(1,id);
        } else {
             zhanzhang.pubZPeopleService.submit(1);
        }

    });
    $("#btnSaveZPeopleService").click(function() {
           var id = $("#pubZPeopleService_id").val();
          
           if (id) {
                zhanzhang.pubZPeopleService.update(2,id);
        } else {
             zhanzhang.pubZPeopleService.submit(2);
        }
     });
    $("#btnPubZPeopleNeed").click(function() {

         var id = $("#pubZPeopleNeed_id").val();

         if (id) {
                zhanzhang.pubZPeopleNeed.update(1,id);
        } else {
              zhanzhang.pubZPeopleNeed.submit(1);
        }
          
    });
    $("#btnSaveZPeopleNeed").click(function() {
            var id = $("#pubZPeopleNeed_id").val();

             if (id) {
                zhanzhang.pubZPeopleNeed.update(2,id);
            } else {
               zhanzhang.pubZPeopleNeed.submit(2);
            }
            

     });
    $("#btnQuery").click(function() {
            zhanzhang.index.query();
        });
     $("#service_c").click(function() {
            $("#service_c").attr("check",true);
            $("#need_c").attr("check",false);
            zhanzhang.index.query();
        });
    $("#need_c").click(function() {
            $("#service_c").attr("check",false);
            $("#need_c").attr("check",true);
            zhanzhang.index.query();
        });
    // try{
    //         juicer.register('itemIcon', itemIcon); 
    //         juicer.register('pubItemIcon', pubItemIcon); 
    //     }catch (e) {
    //         console.log(e);
    //     }
  });
  
});



      var loading = false;

      $(document).on('infinite', function() {
        // 如果正在加载，则退出
        if (loading) return;
        // 设置flag

        // var tabIndex = 0;

        if($(this).find('.infinite-scroll.active').attr('id') == "tab1"){
          
                  // tabIndex = 0;
                if (loading||$("#queryList li").length<10) {
                      console.info($("#queryList li").length)
                 return
            }

                 setTimeout(function() {

                    loading = true;

                    var pageNum = $("#sell_pageNum").val();


                    if (pageNum==1) {

                        $("#tab1 .infinite-scroll-preloader").append('<div class="preloader"></div>'); 
  
                    }

                    $("#sell_pageNum").val(++pageNum);
                  
                    var param = zhanzhang.index.data();
                    param.pageNum = pageNum;
                    param.PageSize = 10;
                     console.info(param)
                    zhanzhang.tool.ajax(zhanzhang.config.peopleNeedList, param, null, 'get', function(d) {
                        if (debug) {
                            console.log(d);
                        };
                        if (d.data && zhanzhang.config.constant['0003'] == d.data) {
                            $.alert(zhanzhang.config.constant['0014']);
                            $("#tab1 .infinite-scroll-preloader").empty();
                        } else if (d) {
                            var list = juicer(zhanzhang.tpl.indexListTpl(), d);
                            $("#queryList").append(list);
                            $("#tab1 .infinite-scroll-preloader").empty();
                        }
                    }, function(xhr, type) {
                        $.alert(zhanzhang.config.constant['0001']);
                        $("#tab1 .infinite-scroll-preloader").empty();
                    });
                    $.refreshScroller();
                }, 500);
        }


        if($(this).find('.infinite-scroll.active').attr('id') == "tab2"){
             // tabIndex = 1;

              if (loading||$("#queryNeedList li").length<10) {
                      console.info($("#queryNeedList li").length)
                 return
            }

               setTimeout(function() {
            
         
              
                loading = true;
                var pageNum = $("#rent_pageNum").val();

                if (pageNum==1) {
                    $('#tab2 .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
                }
                $("#rent_pageNum").val(++pageNum);

                var param = zhanzhang.index.data();
                 param.pageNum = pageNum;
                 param.PageSize = 10;
                zhanzhang.tool.ajax(zhanzhang.config.peopleNeedList, param, null, 'get', function(d) {
                    if (debug) {
                        console.log(d);
                    };
                    if (d.data && zhanzhang.config.constant['0003'] == d.data) {

                        $.alert(zhanzhang.config.constant['0014']);
                        $("#tab2 .infinite-scroll-preloader").empty();
                    } else if (d) {
                        var list = juicer(zhanzhang.tpl.indexNeedListTpl(), d);
                        $("#queryNeedList").append(list);
                        $("#tab2 .infinite-scroll-preloader").empty();
                    }
                }, function(xhr, type) {
                    $.alert(zhanzhang.config.constant['0001']);
                    $("#tab2 .infinite-scroll-preloader").empty();
                });
                $.refreshScroller();
            }, 500);
        }

        // lastIndex = $('.list-container').eq(tabIndex).find('li').length;
        // 模拟1s的加载过程

      });



function collectItem(e, info_id, info_type) {
    var $star = $(e);
    var add;
    var remove;
    var data = {
        info_id: $('#' + info_id).val(),
        info_type: info_type
    };
    zhanzhang.tool.ajax(zhanzhang.config.storeinfo, data, null, 'post', function(d) {
        if (debug) {
            console.log(d.data);
        }
        if (d) {
                    if (d.store==1) {
                        $.alert('收藏成功!');
                       $(".scdiv").removeClass('scstart-line').addClass('scstart-fill');
                    }else if(d.store==2){
                        $.alert('取消收藏!');
                        $(".scdiv").removeClass('scstart-fill').addClass('scstart-line');
                    }
                }

    }, function(xhr, type) {
        add = 'scstart-line';
            remove = 'scstart-fill';
        collectIcon($star, add, remove);
        $.alert(zhanzhang.config.constant['0001']);
    });
}


function reportItem(e, info_id, info_type) {
    var $star = $(e);
    var add;
    var remove;
    var data = {
        info_id: $('#' + info_id).val(),
        info_type: info_type
    };

    zhanzhang.tool.ajax(zhanzhang.config.reportinfo, data, null, 'post', function(d) {
        if (debug) {
            console.log(d.data);
        }
         if (d) {

        if (d.report==1) {
            $.alert('举报成功!');
          $(".jubaodiv").removeClass('jbstart-line').addClass('jbstart-fill');
        }else if(d.report==2){
            $.alert('取消举报!');
          $(".jubaodiv").removeClass('jbstart-fill').addClass('jbstart-line');
        }
        }
   
    }, function(xhr, type) {
        add = 'jbstart-line';
        remove = 'jbstart-fill';
        reportIcon($star, add, remove);
        $.alert(zhanzhang.config.constant['0001']);
    });



}


function historyWatch(info_id, info_type,panduan) {
    var data = {
        'info_id': info_id,
        'info_type': info_type
    }
      zhanzhang.tool.ajax(zhanzhang.config.isreport, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && zhanzhang.config.constant['0003'] == d.data) {
                    console.log(d);
                } else if (d) {

                    if (d.report==1) {
                      $(".jubaodiv").removeClass('jbstart-line').addClass('jbstart-fill');
                    }else if(d.report==2){
                      $(".jubaodiv").removeClass('jbstart-fill').addClass('jbstart-line');
                    }
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(zhanzhang.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });


             zhanzhang.tool.ajax(zhanzhang.config.isstore, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && zhanzhang.config.constant['0003'] == d.data) {
                    console.log(d);
                } else if (d) {
                    if (d.store==1) {
                       $(".scdiv").removeClass('scstart-line').addClass('scstart-fill');
                    }else if(d.store==2){
                        $(".scdiv").removeClass('scstart-fill').addClass('scstart-line');
                    }
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(zhanzhang.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

}


function collectIcon($star, add, remove) {
    $star.removeClass(remove).addClass(add);
}

function reportIcon($star, add, remove) {
    $star.removeClass(remove).addClass(add);
}



var indexquery=true; 


