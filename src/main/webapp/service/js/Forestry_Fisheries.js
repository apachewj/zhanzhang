
window.agriculture = window.agriculture || {};
var baseUrl = 'http://localhost:8080';
var filedate=agriculture;
var uploaddebug = true;
var test=false;



var debug = false;

+ function($) {
    "use strict";

    window.agriculture = window.agriculture || {};

    var baseUrl = 'http://localhost:8080';


    agriculture.config = {
        baseUrl: '',
        loginUrl: baseUrl + '/service/zhuce.html',
        indexQueryListUrl: baseUrl + '',
         pubagriculture: baseUrl +'/user/agriculture/add_Agriculture',
         agricultureList: baseUrl + '/user/agriculture/Agriculture_List',
         agriculturedetail: baseUrl +  '/user/agriculture/Agriculture',
          pubagricultureUpdate: baseUrl +'/user/agriculture/change_Agriculture',
         
        uploadFile: baseUrl + '/uploadFile',
        uploadDefult: baseUrl + '/upload/home.png',
        storeinfo: baseUrl + '/user/store',
         isstore: baseUrl + '/user/showstore',
        reportinfo: baseUrl + '/user/report',
        isreport: baseUrl + '/user/showreport',
          click: baseUrl +'/click',
         userclick: baseUrl +'/user/click',
         findAd: baseUrl + '/findAd',
        
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
            '0014': '已显示到最后一页!',
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
            '3002': '请选择标题！',
            '3003': '请选择金额！',
            '3004': '请选择单位！',
            '3005': '请填写联系人！',
            '3006': '请填写手机号！',
            '3007': '请填写附言！',
            '3008': '请填写内容！',
            '3009': '请填写！',
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
            '5001': '请输入标题',
            '5002': '请输入金额',
            '5003': '请输入单位',
            '5004': '请输入详情',
            '5005': '请输入分类',
            '5006': '请输入流转类型',
            '5007': '请输入流转时长',
            '5008': '请输入流转时长单位',
            '5009': '请输入面积',
            '6000': '请输入面积的单位',
            '6001': '请输入市',
            '6002': '请输入区',
            '6003': '请输入流转类型',
            '6004': '举报成功!',

        }
    }
//当前点击链接是否使用路由功能的自定义过滤器,返回 false 表示不使用路由功能，返回 true 表示进入路由功能后续处理
    $.config = {
        routerFilter: function($link) {
            if ($link.is('.disable-router a')) {
                return false;
            }
            return true;
        }
    };
}(Zepto); 




var position = {
    latitudeP: 32.163306,
    longitudeP: 118.712513,
    accuracyP: 67.8021001352539
};

var debug = false;

$(function () {
  'use strict';

    window.agriculture = window.agriculture || {}; 

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
                 if (!agriculture.tool.validation.grea02Decimal(value)) {
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
                 if (!agriculture.tool.validation.isMobile(value)) {
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
                 if (!agriculture.tool.validation.digits(value)) {
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
         } else if('inputDate' === item.eleType){
             value = $("#" + item.id).val();
             if (value && $.trim(value)) {
                 value=$.trim(value)+" "+$("#" + item.id+"_h").val()+":"+$("#" + item.id+"_m").val()+":00";
             }
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
             var confs = $("span[name='" + item.id + "'][check='true']");
             $.each(confs, function(i, e) {
                 if (i == 0) {
                     value = $(e).attr('data-require');
                 } else {
                     value += "," + $(e).attr('data-require');
                 }
             });
             if (debug) {
                 console.log(value);
             }
         } else if ('tagsDanger' === item.eleType) {
             var confs = $("span[name='" + item.id + "'][check='true']");
             $.each(confs, function(i, e) {
                 if (i == 0) {
                     value = $(e).attr('data-tags');
                 } else {
                     value += "," + $(e).attr('data-tags');
                 }
             });
             if (debug) {
                 console.log(value);
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
             var videos = $("video[name='" + item.id + "']");
             $.each(videos, function(i, e) {
                 if (value == '') {
                     value = $(e).attr('src');
                 } else {
                     value += "," + $(e).attr('src');
                 }
             });
             if (debug) {
                 console.log(value);
             }
         } else if ('citys_th' === item.eleType) { 
             $.each($("span[name='" + item.id + "']"), function(i, e) {
                 if (i == 0) {
                     value = $(e).text();
                 } else {
                     value += "," + $(e).text();
                 }
             });
             if (debug) {
                 console.log(value);
             }
              // $("#" + item.id).val();
         } else if ('city' === item.eleType) {
             value = $("#" + item.id).find('a').text();
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
var viewInit = function(_m, data) {


      for (var key in data) {
        
         if(key == 'province_name'){

             var province=$.trim(data[key]);
            
         }else if(key == 'city_name'){

             var city=$.trim(data[key]);

         }else if(key == 'county_name'){
             var county=$.trim(data[key]);
     
         }

         if(key == 'requirements'){
             var el = $("#" + _m + 'requirement');
             var value = $.trim(data[key]);
             $(el).val(value);

          }
           if(key == 'type'){
             var el = $("#" + _m + 'liuzhuantype');
             var value = $.trim(data[key]);
             $(el).val(value);

          }
          if(key == 'tel'){
             var el = $("#" + _m + 'telephone');
             var value = $.trim(data[key]);
             $(el).val(value);

          }
          if(key == 'sheshi'){
                
                 var el = $("#" + _m + 'configure');
                 var name = $(this).attr('name');
                 var value = $.trim(data[key]);

              var confs = value.split(',');
                    if (confs && confs.length > 0 && confs[0] != '') {
                        $("span[name='" + _m + 'configure' + "'][check='true']")
                            .attr('check', false)
                            .removeClass('button-danger')
                            .addClass('button-disable');
                        $.each(confs, function(i, e) {
                            $("span[name='" + _m + 'configure' + "'][data-require='" + e + "']")
                                .attr('check', true)
                                .removeClass('button-disable')
                                .addClass('button-danger');
                        });
                    };

          }
          if(key == 'sex'){

             var value = $.trim(data[key]);

             if(value==1){
                      $("input[data-pub='1']").attr('checked',true);
                       $("input[data-pub='1']").attr('check',true);
                      

                    }else if(value==2){
                        $("input[data-pub='2']").attr('checked',true); 
                        $("input[data-pub='2']").attr('check',true); 
                       
                    }
          }else{

                 var el = $("#" + _m + key);
                 var eleType = $(el).attr('eleType');
                 var name = $(this).attr('name');
                 var value = $.trim(data[key]);
                 if (eleType === 'input' || !eleType) {
                     $(el).val(value);
                 }else if (eleType === 'img') {
                    var imgs = value.split(',');
                    if (imgs && imgs.length > 0 && imgs[0] != '') {
                        var list = document.getElementById(_m + 'imgs' + '_List');
                   
                        $.each(imgs, function(i, e) {
                            var ipot=e.lastIndexOf(".");
                            var type=fileType(e.substring(ipot+1)); 
                            if (type=='image') {
                                showImgs(list, "" + _m + 'imgs' , e);
                            } 
                        });
                    }
            }else if (eleType === 'btnRound') {
                $("span[name='" + _m + key + "']").attr('check', false).removeClass('button-fill'); 
                if (value=='3') {
                    $("span[name='" + _m + key + "'][data-pub='1']").attr('check', true)
                    .addClass('button-fill');
                    $("span[name='" + _m + key + "'][data-pub='2']").attr('check', true)
                    .addClass('button-fill');
                }else if(value=='1' || value=='2'){
                    $("span[name='" + _m + key + "'][data-pub='" + value + "']").attr('check', true)
                    .addClass('button-fill');
                }
            } else if (eleType === 'confDanger') {
                var confs = value.split(',');
                if (confs && confs.length > 0 && confs[0] != '') {
                    $("span[name='" + _m + key + "'][check='true']")
                        .attr('check', false)
                        .removeClass('button-danger')
                        .addClass('button-disable');
                    $.each(confs, function(i, e) {
                        $("span[name='" + _m + key + "'][data-conf='" + e + "']")
                            .attr('check', true)
                            .removeClass('button-disable')
                            .addClass('button-danger');
                    });
                };
            } else if (eleType === 'requireDanger') {
                    var confs = value.split(',');
                    if (confs && confs.length > 0 && confs[0] != '') {
                        $("span[name='" + _m + key + "'][check='true']")
                            .attr('check', false)
                            .removeClass('button-danger')
                            .addClass('button-disable');
                        $.each(confs, function(i, e) {
                            $("span[name='" + _m + key + "'][data-require='" + e + "']")
                                .attr('check', true)
                                .removeClass('button-disable')
                                .addClass('button-danger');
                        });
                    };
                } else if (eleType === 'tagsDanger') {
                var confs = value.split(',');
                if (confs && confs.length > 0 && confs[0] != '') {
                    $("span[name='" + _m + key + "'][check='true']")
                        .attr('check', false)
                        .removeClass('button-danger')
                        .addClass('button-disable');
                    $.each(confs, function(i, e) {
                        $("span[name='" + _m + key + "'][data-tags='" + e + "']")
                            .attr('check', true)
                            .removeClass('button-disable')
                            .addClass('button-danger');
                    });
                };
            } 

               

        }
     }
      if(province&&city&&county){
   
          _cityPosdataPub(province,city,county);
       }
       
    };
   
    var viewInfo = function(_m, data) {


         for (var key in data) {
             var el = $("#" + _m + key);
             var elf =  $("#" + _m + 'flok');
             var el1 = $("[name='" + _m + key + "']");
             var eleType = $(el).attr('eleType');
                var value = $.trim(data[key]);

             if(key==='price'){
                 var i=0;
                 if(value==="面议"){
                     $(elf).html('');
                 }
             }

             if (eleType === 'text' || !eleType) {
                 $(el).html(value);
                  $(el1).html(value);
             } else if (eleType === 'textype' || !eleType) {
                 
                 if (1==value) {
                    $(el).html();
                 }else if (2==value) {
                    $(el).html('≥');
                 }else if (3==value) {
                    $(el).html('≤');
                 }
             }  else if (eleType === 'img') {
                 var imgs = value.split(',');
 
                 if (imgs && imgs.length > 0 && imgs[0] != '') {
                     var list = $('#' + _m + key + '_List');
                     list.empty();
                     var html = [];
                     $.each(imgs, function(i, e) {
                         var ipot=e.lastIndexOf(".");
                         var type=fileType(e.substring(ipot+1)); 
                         if (type=='image') {
                             html.push('<div class="swiper-slide"><img src="' + e + '" alt="" style="width: 100%;height:8rem;" ></div>')
                         } 
                     });
                     if (html.length > 0) {
                         list.html(html.join(''));
                     }
                 }
             }
             else if (eleType === 'requireDanger') {
             
                var requires = value.split(',');
                var rqh=[];
                if (requires && requires.length > 0 && requires[0] != '') {
                for (var i = 0; i < requires.length; i++) {
                   
                    if (i%4==0) {
                        rqh.push('<div class="row">');
                    }
              
                    if(1==data.maintype){
                    rqh.push('<div class="col-25"><span name="carFindPeople_require" data-require="'+requires[i]+'"  class="button button-danger" >'+getRequire(requires[i])+'</span> </div>');
                    }else if(2==data.maintype && 1 == data.isneed||2==data.maintype && 2 == data.isneed){
                    rqh.push('<div class="col-25"><span name="carFindPeople_require" data-require="'+requires[i]+'"  class="button button-danger" >'+getjijuRequire(requires[i])+'</span> </div>');
                    }else {
                    rqh.push('<div class="col-25"><span name="carFindPeople_require" data-require="'+requires[i]+'"  class="button button-danger" >'+getyoushiRequire(requires[i])+'</span> </div>');
                    }
                    if(2 == data.isneed)
                    if ((i+1)%4==0) {
                        rqh.push('</div>');
                    }
                }
                $(el).html(rqh.join('')); 
              };
            } else if (eleType === 'telVew') {
                $(el).html(value);
                $("#" + _m + "telephone").attr('href', 'tel:' + value);
                $("#" + _m + "sms").attr('href', 'sms:' + value);
            }

         }
    };

    var viewAd = function(_m, data) {

        var html = [];
        var imgcontext = new Array();

        for (var key in data) {

            var value = $.trim(data[key].img);
            var types = $.trim(data[key].type);
            var id = $.trim(data[key].id);
            var title = $.trim(data[key].imgcontext);
            // imgcontext.push($.trim(data[key].imgcontext))


            if (data && data.length > 0 && data[0] != '') {
                var list = $('#' + _m + 'img' + '_List');

                var ipot=value.lastIndexOf(".");
                var type=fileType(value.substring(ipot+1));
                if (type=='image') {
                    if(types){
                        html.push('<div class="swiper-slide"><a class="external" href="../service/AdvertisementDetail.html?id='+id+'"><img src="' + value+ '" alt="" style="width: 100%" ></a><div class="text" data-swiper-parallax="-300" data-swiper-parallax-duration="600"><p>'+title+'</p></div></div>')
                    }else{
                        html.push('<div class="swiper-slide"><img src="' + value+ '" alt="" style="width: 100%" ><div class="text" data-swiper-parallax="-300" data-swiper-parallax-duration="600"><p>'+title+'</p></div></div>')
                    }

                }
            }

        }

        if (html.length > 0) {
            list.html(html.join(''));
        }
        // console.info(imgcontext)
        $.reinitSwiper("#pageIndex")

        var mySwiper = $('.swiper-container').swiper({
            slidesPerView:'auto',
            centeredSlides:true,
            paginationClickable:true,
            spaceBetween:10,
            autoplay:2000,
            loop: true,
            loopedSlides:10,
            autoplayDisableOnInteraction : false
        });

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
        }
    };  
    agriculture.tpl = {
        indexListTpl: function(data) {

           return ['{@each data as item}',

                                    '<li class="item-content" onclick="pageDetail(', "'${item.maintype}','${item.id}')", '" >',
                                    '{@if item.imgs}','<div class="item-media" ><img src="${item.imgs.split(",")[0]}"></div>',
                                    '{@else if !item.imgs}', '',
                                     '{@/if}',
                                      '<div class="item-inner">',
                                      '{@if item.title}','<div class="item-title-row" ><div class="item-title">${item.title}</div></div>',
                                      '{@else if !item.title}', '',
                                      '{@/if}',
                                        '<div class="item-title-row" >',
                                            '<div class="item-subtitle1">',
                                                 '<span>${item.province_name}&nbsp;${item.city_name}&nbsp;${item.county_name}</span>',
                                            '</div>',
                                            '<div class="item-after">',
                                                    '{@if item.pricetype==1}', '', 
                                                    '{@else if item.pricetype==2}', '≥',
                                                    '{@else if item.pricetype==3}', '≤',
                                                    '{@/if}',
                                                  '<span>','{@if item.price}','${item.price}','{@else if !item.price}', '0','{@/if}','</span><span>','{@if item.price=="面议"}','','{@else if item.price!="面议"}', '元','{@/if}','</span><span>','{@if item.priceunit}','/${item.priceunit}','{@else if !item.priceunit}', '','{@/if}','</span>',
                                            '</div>',
                                        '</div>',
                                        '<div class="item-title-row">',
                                            '<div class="item-subtitle2" onclick="showMap(', "'${item.location_x}','${item.location_y}','',1)", '">',
                                                 '<img class="d_pic" src="images/u13.png">',
                                            '</div>',
                                           '<div class="item-after color_after" >',
                                                 '<span>${item.create_time}</span>',
                                            '</div>',
                                        '</div>',
                                      '</div>',
                                    '</li>',
                           
                     '{@/each}'
             ].join('');
        },
        indexDemandListTpl: function(data) {

           return ['{@each data as item}',
                               
                                    '<li class="item-content"  onclick="pageDemandDetail(',"'${item.maintype}','${item.id}')", '">',
                                      '<div class="item-inner">',
                                        '{@if item.title}','<div class="item-title-row" ><div class="item-title">${item.title}</div></div>',
                                      '{@else if !item.title}', '',
                                      '{@/if}',
                                        '<div class="item-title-row" >',
                                            '<div class="item-subtitle1">',
                                                 '<span>${item.province_name}&nbsp;${item.city_name}&nbsp;${item.county_name}</span>',
                                            '</div>',
                                            '<div class="item-after">',
                                                    '{@if item.pricetype==1}', '', 
                                                    '{@else if item.pricetype==2}', '≥',
                                                    '{@else if item.pricetype==3}', '≤',
                                                    '{@/if}',
                                                  '<span>','{@if item.price}','${item.price}','{@else if !item.price}', '0','{@/if}','</span><span>','{@if item.price=="面议"}','','{@else if item.price!="面议"}', '元','{@/if}','</span><span>','{@if item.priceunit}','/${item.priceunit}','{@else if !item.priceunit}', '','{@/if}','</span>',
                                            '</div>',
                                        '</div>',
                                        '<div class="item-title-row">',
                                            '<div class="item-subtitle2" onclick="showMap(', "'${item.location_x}','${item.location_y}','',1)", '">',
                                              '<img class="d_pic" src="images/u13.png">',
                                            '</div>',
                                           '<div class="item-after color_after">',
                                                 '<span>${item.create_time}</span>',
                                            '</div>',
                                        '</div>',
                                      '</div>',
                                    '</li>',
                            
                     '{@/each}'
             ].join('');
        },


    };
    agriculture.tool = {
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
                        location.href = agriculture.config.loginUrl;
                        if($.device.os=="android"){
                            javascript:login.nologin();
                        }else if($.device.os=="ios"){
                            location.href = agriculture.config.loginUrl;
                        }
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
    };
  
    agriculture.index = {
        data: function() {
            var data = {};
                 var criterias = [
              
                {
                    el: 'isneed',
                    pro: 'isneed',
                    type: 'btnRound'
                }, {
                    el: 'searchname',
                    pro: 'searchname',
                    type: 'text'
                },{
                    el: 'maintype',
                    pro: 'maintype',
                    type: 'btnRound'
                }, {
                    el: 'select_province',
                    pro: 'province_id',
                    type: 'text'
                }, {
                    el: 'select_city',
                    pro: 'city_id',
                    type: 'text'
                }, {
                         el: 'select_area',
                         pro: 'county_id',
                         type: 'text'
                     },{
                    el: 'location_x',
                    pro: 'location_x',
                    type: 'text'
                }, {
                    el: 'location_y',
                    pro: 'location_y',
                    type: 'text'
                },{
                    el: 'btnwithclassify',
                    pro: 'type',
                    type: 'text'
                },{
                    el: 'locationorder',
                    pro: 'locationorder',
                    type: 'text'
                },{
                    el: 'timeorder',
                    pro: 'timeorder',
                    type: 'text'
                }
              
            ];

            
           selectVal(criterias, data);
          
           return data;
        },

        datax: function() {
            var data = {};
                 var criterias = [
              
                 {
                    el: 'select_city',
                    pro: 'city_id',
                    type: 'text'
                }, {
                     el: 'select_area',
                     pro: 'county_id',
                     type: 'text'
                 }
            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },
   
       query: function() {
            //$.showPreloader();
            
            var data = agriculture.index.data();
             
            if (debug) {
                console.log("index:");
                console.log(data);
            };

                var x = $('#location_x').val();
                var y = $('#location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }

            if (1 == data.isneed) {
               

            agriculture.tool.ajax(agriculture.config.agricultureList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && agriculture.config.constant['0003'] == d.data) {
                    
                    $("#queryDemandList").empty();
                    $("#queryDemandList").html(agriculture.config.constant['0012']); 
              
                } else if (d) {
                    
                    var list = juicer(agriculture.tpl.indexDemandListTpl(), d);
                    $("#queryDemandList").html(list);
                    $("#sell_pageNum").val(1);
                    $("#tab1 .infinite-scroll-preloader").html('');
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(agriculture.config.constant['0001']);
                $.hidePreloader();
            });
            }else if(2 == data.isneed){


               agriculture.tool.ajax(agriculture.config.agricultureList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && agriculture.config.constant['0003'] == d.data) {
                    $("#queryList").empty();
                    $("#queryList").html(agriculture.config.constant['0012']); 
                    
              
                } else if (d) {
                    var list = juicer(agriculture.tpl.indexListTpl(), d);
                    $("#queryList").html(list);
                    $("#rent_pageNum").val(1);
                    $("#tab2 .infinite-scroll-preloader").html('');
         
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(agriculture.config.constant['0001']);
                $.hidePreloader();
            });
            }
        },
         detail: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
          var elid;
          var page;
          var _field;
              if (!maintype || !id) {
                 return;
             }else if (1 == maintype) {
                 elid = 'SupplyLandMines_id';
                 page = 'pageSupplyLandMines_details';
                 _field = 'SupplyLandMines_';

             }else if (2 == maintype) {
                 elid = 'SupplyHireEquipment_id';
                 page = 'pageSupplyHireEquipment_details';
                 _field = 'SupplyHireEquipment_';

             }else if (3 == maintype) {
                 elid = 'SupplyForage_id';
                 page = 'pageSupplyForage_details';
                 _field = 'SupplyForage_';

             }else if (4 == maintype) {
                 elid = 'SupplyFryMedicine_id';
                 page = 'pageSupplyFryMedicine_details';
                 _field = 'SupplyFryMedicine_';

             }else if (5 == maintype) {
                 elid = 'SupplySidelineProducts_id';
                 page = 'pageSupplySidelineProducts_details';
                 _field = 'SupplySidelineProducts_';

             }else if (6 == maintype) {
                 elid = 'SupplyFreshSeafood_id';
                 page = 'pageSupplyFreshSeafood_details';
                 _field = 'SupplyFreshSeafood_';

             }
            $("#" + elid).val(id);
            console.log($("#" + elid).val());
                 if(test){
             location.href="../service/Forestry_Fisheries.html?id="+id+"&maintype="+maintype+"#" + page;
             }

            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInfo(_field, d);
                    historyWatch(id, 8);
                    dianji(13);
                    userclick(id, 8);
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
        Demanddetail: function(id,maintype,test) {
            var data = {
              info_id: id,
             
            };
            if (debug) {
                console.log(data);
            }
            var elid;
            var page;
            var _field;

              if (!maintype || !id) {
                 return;
             }else if (1 == maintype) {
                 elid = 'DemandLandMines_id';
                 page = 'pageDemandLandMines_details';
                 _field = 'DemandLandMines_';
             
             }else if (2 == maintype) {
                 elid = 'DemandHireEquipment_id';
                 page = 'pageDemandHireEquipment_details';
                 _field = 'DemandHireEquipment_';

             }else if (3 == maintype) {
                 elid = 'DemandForage_id';
                 page = 'pageDemandForage_details';
                 _field = 'DemandForage_';

             }else if (4 == maintype) {
                 elid = 'DemandFryMedicine_id';
                 page = 'pageDemandFryMedicine_details';
                 _field = 'DemandFryMedicine_';

             }else if (5 == maintype) {
                 elid = 'DemandSidelineProducts_id';
                 page = 'pageDemandSidelineProducts_details';
                 _field = 'DemandSidelineProducts_';

             }else if (6 == maintype) {
                 elid = 'DemandFreshSeafood_id';
                 page = 'pageDemandFreshSeafood_details';
                 _field = 'DemandFreshSeafood_';

             }
            $("#" + elid).val(id);
            // $.router.load("?id="+id+"&maintype="+maintype+"#" + page);
            // document.location.href="../service/Forestry_Fisheries.html?id="+id+"&maintype="+maintype+"#" + page;
              if(test){
             location.href="../service/Forestry_Fisheries.html?id="+id+"&maintype="+maintype+"#" + page;
            }
            // $.showPreloader();
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo(_field, d);
                    historyWatch(id, 8);
                    dianji(13);
                    userclick(id, 8);
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
        init:function(id) {

           
             
            var data = agriculture.index.datax(); 

            if (debug) {
                console.log(data);
            }
            data['location'] = id;

            agriculture.tool.ajax(agriculture.config.findAd, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                }
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    // viewInfo(_field, d.data);
                     viewAd('Agriculture_', d.data);
                 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

        }
    };

    agriculture.pubSupplyLandMines = {
     data: function() {
         var pubSupplyLandMinesdatas = [{
                id: 'pubSupplyLandMines_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubSupplyLandMines_classify',
             pro: 'classify',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5005']
                 }
             }
         },{
             id: 'pubSupplyLandMines_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'pubSupplyLandMines_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'select_city1',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6001']
                 }
             }
         },{
             id: 'select_area1',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6002']
                 }
             }
         },{
             id: 'pubSupplyLandMines_liuzhuantype',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5006']
                 }
             }
         },{
             id: 'pubSupplyLandMines_tradetimetype',
             pro: 'tradetimetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyLandMines_tradetime',
             pro: 'tradetime',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5007']
                 }
             }
         },{
             id: 'pubSupplyLandMines_tradetimeunit',
             pro: 'tradetimeunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5008']
                 }
             }
         },{
             id: 'pubSupplyLandMines_areatype',
             pro: 'areatype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyLandMines_area',
             pro: 'area',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5009']
                 }
             }
         },{
             id: 'pubSupplyLandMines_areaunit',
             pro: 'areaunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6000']
                 }
             }
         },{
             id: 'pubSupplyLandMines_pricetype',
             pro: 'pricetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyLandMines_price',
             pro: 'price',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyLandMines_priceunit',
             pro: 'priceunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyLandMines_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubSupplyLandMines_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
                id: 'pubSupplyLandMines_configure',
                pro: 'sheshi',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubSupplyLandMines_dipingzheng',
             pro: 'dipingzheng',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyLandMines_peitaojiju',
             pro: 'peitaojiju',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyLandMines_gaosu',
             pro: 'gaosu',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyLandMines_gangkou',
             pro: 'gangkou',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyLandMines_guodao',
             pro: 'guodao',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyLandMines_tielu',
             pro: 'tielu',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyLandMines_jichang',
             pro: 'jichang',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyLandMines_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['3005']
                 },
             }
          }, {
             id: 'pubSupplyLandMines_telephone',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': agriculture.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': agriculture.config.constant['4001']
                    }
             }
         }];
         return validationToValue(pubSupplyLandMinesdatas);
     }, 
     submit: function(status) {
         var data = agriculture.pubSupplyLandMines.data();
         if (debug) {
             console.log('pubSupplyLandMines validation ' + '--> ');
             console.log(data);
         }
         if (data) {
              var x = $('#pubSupplyLandMines_location_x').val();
                var y = $('#pubSupplyLandMines_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 2;
             data2['maintype'] = 1;


             agriculture.tool.ajax(agriculture.config.pubagriculture, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },
      edit: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInit('pubSupplyLandMines_', d);
                   
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

            update: function(status,id) {
             var data = agriculture.pubSupplyLandMines.data();
             if (debug) {
                 console.log('pubSupplyLandMines validation ' + '--> ');
                 console.log(data);
             }
             if (data) {
                    var x = $('#pubSupplyLandMines_location_x').val();
                    var y = $('#pubSupplyLandMines_location_y').val();
              
                 if (x && y) {
                     data.location_x = parseFloat(x).toFixed(6);

                     data.location_y = parseFloat(y).toFixed(6);
                  } else {
                     data.location_x = position.latitudeP;
                      data.location_y = position.longitudeP;
                 }
                   var data2 = {};
                    for (var key in data) {
                        data2[key] = data[key];
                }
                 data2['status'] = status;
                 data2['isneed'] = 2;
                 data2['maintype'] = 1;
                  data2['info_id'] = id;


             agriculture.tool.ajax(agriculture.config.pubagricultureUpdate, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                            $.router.back(); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },

     init: function() {
         // var id = $("#pubSupplyLandMines_id").val();
         // if (id) {
         //     agriculture.pubZPeopleService.eidt(id);
         // }
     }
    };

     agriculture.pubDemandLandMines = {
     data: function() {
         var pubDemandLandMinesdatas = [{
             id: 'pubDemandLandMines_classify',
             pro: 'classify',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandLandMines_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'pubDemandLandMines_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'select_city2',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6001']
                 }
             }
         },{
             id: 'select_area2',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6002']
                 }
             }
         },{
             id: 'pubDemandLandMines_liuzhuantype',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5006']
                 }
             }
         },{
             id: 'pubDemandLandMines_tradetimetype',
             pro: 'tradetimetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandLandMines_tradetime',
             pro: 'tradetime',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5007']
                 }
             }
         },{
             id: 'pubDemandLandMines_tradetimeunit',
             pro: 'tradetimeunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5008']
                 }
             }
         },{
             id: 'pubDemandLandMines_areatype',
             pro: 'areatype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandLandMines_area',
             pro: 'area',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5009']
                 }
             }
         },{
             id: 'pubDemandLandMines_areaunit',
             pro: 'areaunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6000']
                 }
             }
         },{
             id: 'pubDemandLandMines_pricetype',
             pro: 'pricetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandLandMines_price',
             pro: 'price',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandLandMines_priceunit',
             pro: 'priceunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandLandMines_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubDemandLandMines_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
                id: 'pubDemandLandMines_configure',
                pro: 'sheshi',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubDemandLandMines_dipingzheng',
             pro: 'dipingzheng',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandLandMines_peitaojiju',
             pro: 'peitaojiju',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandLandMines_gaosu',
             pro: 'gaosu',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandLandMines_gangkou',
             pro: 'gangkou',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandLandMines_guodao',
             pro: 'guodao',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandLandMines_tielu',
             pro: 'tielu',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandLandMines_jichang',
             pro: 'jichang',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandLandMines_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['3005']
                 },
             }
          }, {
             id: 'pubDemandLandMines_telephone',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': agriculture.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': agriculture.config.constant['4001']
                    }
             }
         }];
         return validationToValue(pubDemandLandMinesdatas);
     }, 
     submit: function(status) {
         var data = agriculture.pubDemandLandMines.data();
         if (debug) {
             console.log('pubDemandLandMines validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubDemandLandMines_location_x').val();
                var y = $('#pubDemandLandMines_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 1;
             data2['maintype'] = 1;


             agriculture.tool.ajax(agriculture.config.pubagriculture, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },

       edit: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInit('pubDemandLandMines_', d);
                   
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

            update: function(status,id) {
              var data = agriculture.pubDemandLandMines.data();
         if (debug) {
             console.log('pubDemandLandMines validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubDemandLandMines_location_x').val();
                var y = $('#pubDemandLandMines_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 1;
             data2['maintype'] = 1;
            data2['info_id'] = id;


             agriculture.tool.ajax(agriculture.config.pubagricultureUpdate, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                            $.router.back(); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
  },
     init: function() {
         // var id = $("#pubDemandLandMines_id").val();
         // if (id) {
         //     agriculture.pubZPeopleService.eidt(id);
         // }
     }
    };
    
   agriculture.pubSupplySidelineProducts = {
     data: function() {
         var pubSupplySidelineProductsdatas = [{
                id: 'pubSupplySidelineProducts_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: {
                    'require': {
                        'is': false,
                        'msg':''
                    }
                }
            },{
             id: 'pubSupplySidelineProducts_classify',
             pro: 'classify',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5005']
                 }
             }
         },{
             id: 'pubSupplySidelineProducts_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
             }
         }, {
             id: 'pubSupplySidelineProducts_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
             }
         }, {
             id: 'select_city3',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6001']
                 }
             }
         },{
             id: 'select_area3',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6002']
                 }
             }
         },{
             id: 'pubSupplySidelineProducts_jiaoyitype',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6003']
                 }
             }
         },{
             id: 'pubSupplySidelineProducts_pricetype',
             pro: 'pricetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplySidelineProducts_price',
             pro: 'price',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplySidelineProducts_priceunit',
             pro: 'priceunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplySidelineProducts_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubSupplySidelineProducts_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
                id: 'pubSupplySidelineProducts_configure',
                pro: 'merits',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubSupplySidelineProducts_startnumtype',
             pro: 'startnumtype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplySidelineProducts_startnum',
             pro: 'startnum',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplySidelineProducts_havenum',
             pro: 'havenum',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplySidelineProducts_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':agriculture.config.constant['3005']
                 },
             }
          }, {
             id: 'pubSupplySidelineProducts_telephone',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': agriculture.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': agriculture.config.constant['4001']
                    }
             }
         }];
         return validationToValue(pubSupplySidelineProductsdatas);
     },
     
     submit: function(status) {
         var data = agriculture.pubSupplySidelineProducts.data();
         if (debug) {
             console.log('pubSupplySidelineProducts validation ' + '--> ');
             console.log(data);
         }
         if (data) {
            var x = $('#pubSupplySidelineProducts_location_x').val();
                var y = $('#pubSupplySidelineProducts_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 2;
             data2['maintype'] = 5;


             agriculture.tool.ajax(agriculture.config.pubagriculture, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },

      edit: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInit('pubSupplySidelineProducts_', d);
                   
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

            update: function(status,id) {
               var data = agriculture.pubSupplySidelineProducts.data();
         if (debug) {
             console.log('pubSupplySidelineProducts validation ' + '--> ');
             console.log(data);
         }
         if (data) {
            var x = $('#pubSupplySidelineProducts_location_x').val();
                var y = $('#pubSupplySidelineProducts_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 2;
             data2['maintype'] = 5;
            data2['info_id'] = id;


             agriculture.tool.ajax(agriculture.config.pubagricultureUpdate, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                            $.router.back(); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },
     init: function() {
         // var id = $("#pubSupplySidelineProducts_id").val();
         // if (id) {
         //     agriculture.pubZPeopleService.eidt(id);
         // }
     }
    };

   agriculture.pubDemandSidelineProducts = {
     data: function() {
         var pubDemandSidelineProductsdatas = [{
             id: 'pubDemandSidelineProducts_classify',
             pro: 'classify',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5005']
                 }
             }
         },{
             id: 'pubDemandSidelineProducts_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'pubDemandSidelineProducts_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'select_city4',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6001']
                 }
             }
         },{
             id: 'select_area4',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6002']
                 }
             }
         },{
             id: 'pubDemandSidelineProducts_jiaoyitype',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6003']
                 }
             }
         },{
             id: 'pubDemandSidelineProducts_pricetype',
             pro: 'pricetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandSidelineProducts_price',
             pro: 'price',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandSidelineProducts_priceunit',
             pro: 'priceunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandSidelineProducts_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubDemandSidelineProducts_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
                id: 'pubDemandSidelineProducts_configure',
                pro: 'merits',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubDemandSidelineProducts_startnumtype',
             pro: 'startnumtype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandSidelineProducts_startnum',
             pro: 'startnum',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandSidelineProducts_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':agriculture.config.constant['3005']
                 },
             }
          }, {
             id: 'pubDemandSidelineProducts_telephone',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': agriculture.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': agriculture.config.constant['4001']
                    }
             }
         }];
         return validationToValue(pubDemandSidelineProductsdatas);
     },
     
     submit: function(status) {
         var data = agriculture.pubDemandSidelineProducts.data();
         if (debug) {
             console.log('pubDemandSidelineProducts validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubDemandSidelineProducts_location_x').val();
                var y = $('#pubDemandSidelineProducts_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 1;
             data2['maintype'] = 5;


             agriculture.tool.ajax(agriculture.config.pubagriculture, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },

     edit: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInit('pubDemandSidelineProducts_', d);
                   
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

            update: function(status,id) {
              var data = agriculture.pubDemandSidelineProducts.data();
         if (debug) {
             console.log('pubDemandSidelineProducts validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubDemandSidelineProducts_location_x').val();
                var y = $('#pubDemandSidelineProducts_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 1;
             data2['maintype'] = 5;

            data2['info_id'] = id;


             agriculture.tool.ajax(agriculture.config.pubagricultureUpdate, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                            $.router.back(); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },
     init: function() {
         // var id = $("#pubDemandSidelineProducts_id").val();
         // if (id) {
         //     agriculture.pubZPeopleService.eidt(id);
         // }
     }
    };
    
    agriculture.pubSupplyFryMedicine = {
     data: function() {
         var pubSupplyFryMedicinedatas = [{
                id: 'pubSupplyFryMedicine_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: {
                    'require': {
                        'is': false,
                        'msg':''
                    }
                }
            },{
             id: 'pubSupplyFryMedicine_classify',
             pro: 'classify',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5005']
                 }
             }
         },{
             id: 'pubSupplyFryMedicine_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'pubSupplyFryMedicine_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'select_city5',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6001']
                 }
             }
         },{
             id: 'select_area5',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6002']
                 }
             }
         },{
             id: 'pubSupplyFryMedicine_jiaoyitype',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6003']
                 }
             }
         },{
             id: 'pubSupplyFryMedicine_pricetype',
             pro: 'pricetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyFryMedicine_price',
             pro: 'price',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyFryMedicine_priceunit',
             pro: 'priceunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyFryMedicine_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubSupplyFryMedicine_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
                id: 'pubSupplyFryMedicine_configure',
                pro: 'merits',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubSupplyFryMedicine_startnumtype',
             pro: 'startnumtype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyFryMedicine_startnum',
             pro: 'startnum',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyFryMedicine_havenum',
             pro: 'havenum',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyFryMedicine_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':agriculture.config.constant['3005']
                 },
             }
          }, {
             id: 'pubSupplyFryMedicine_telephone',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': agriculture.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': agriculture.config.constant['4001']
                    }
             }
         }];
         return validationToValue(pubSupplyFryMedicinedatas);
     },
     
     submit: function(status) {
         var data = agriculture.pubSupplyFryMedicine.data();
         if (debug) {
             console.log('pubSupplyFryMedicine validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubSupplyFryMedicine_location_x').val();
              var y = $('#pubSupplyFryMedicine_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 2;
             data2['maintype'] = 4;


             agriculture.tool.ajax(agriculture.config.pubagriculture, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },

      edit: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInit('pubSupplyFryMedicine_', d);
                   
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

            update: function(status,id) {
              var data = agriculture.pubSupplyFryMedicine.data();
         if (debug) {
             console.log('pubSupplyFryMedicine validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubSupplyFryMedicine_location_x').val();
              var y = $('#pubSupplyFryMedicine_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 2;
             data2['maintype'] = 4;
            data2['info_id'] = id;


             agriculture.tool.ajax(agriculture.config.pubagricultureUpdate, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                            $.router.back(); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },
     init: function() {
         // var id = $("#pubSupplyFryMedicine_id").val();
         // if (id) {
         //     agriculture.pubZPeopleService.eidt(id);
         // }
     }
    };


    agriculture.pubDemandFryMedicine = {
     data: function() {
         var pubDemandFryMedicinedatas = [{
             id: 'pubDemandFryMedicine_classify',
             pro: 'classify',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5005']
                 }
             }
         },{
             id: 'pubDemandFryMedicine_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'pubDemandFryMedicine_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'select_city6',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6001']
                 }
             }
         },{
             id: 'select_area6',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6002']
                 }
             }
         },{
             id: 'pubDemandFryMedicine_jiaoyitype',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6003']
                 }
             }
         },{
             id: 'pubDemandFryMedicine_pricetype',
             pro: 'pricetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandFryMedicine_price',
             pro: 'price',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandFryMedicine_priceunit',
             pro: 'priceunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandFryMedicine_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubDemandFryMedicine_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
                id: 'pubDemandFryMedicine_configure',
                pro: 'merits',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubDemandFryMedicine_startnumtype',
             pro: 'startnumtype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandFryMedicine_startnum',
             pro: 'startnum',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandFryMedicine_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':agriculture.config.constant['3005']
                 },
             }
          }, {
             id: 'pubDemandFryMedicine_telephone',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': agriculture.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': agriculture.config.constant['4001']
                    }
             }
         }];
         return validationToValue(pubDemandFryMedicinedatas);
     },
     
     submit: function(status) {
         var data = agriculture.pubDemandFryMedicine.data();
         if (debug) {
             console.log('pubDemandFryMedicine validation ' + '--> ');
             console.log(data);
         }
         if (data) {
            var x = $('#pubDemandFryMedicine_location_x').val();
              var y = $('#pubDemandFryMedicine_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 1;
             data2['maintype'] = 4;


             agriculture.tool.ajax(agriculture.config.pubagriculture, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },
     
          edit: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInit('pubDemandFryMedicine_', d);
                   
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

            update: function(status,id) {
               var data = agriculture.pubDemandFryMedicine.data();
         if (debug) {
             console.log('pubDemandFryMedicine validation ' + '--> ');
             console.log(data);
         }
         if (data) {
            var x = $('#pubDemandFryMedicine_location_x').val();
              var y = $('#pubDemandFryMedicine_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 1;
             data2['maintype'] = 4;
            data2['info_id'] = id;


             agriculture.tool.ajax(agriculture.config.pubagricultureUpdate, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                            $.router.back(); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },

     init: function() {
         // var id = $("#pubDemandFryMedicine_id").val();
         // if (id) {
         //     agriculture.pubZPeopleService.eidt(id);
         // }
     }
    };
     
    agriculture.pubSupplyForage = {
     data: function() {
         var pubSupplyForagedatas = [{
                id: 'pubSupplyForage_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: {
                    'require': {
                        'is': false,
                        'msg':''
                    }
                }
            },{
             id: 'pubSupplyForage_classify',
             pro: 'classify',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5005']
                 }
             }
         },{
             id: 'pubSupplyForage_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'pubSupplyForage_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'select_city7',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6001']
                 }
             }
         },{
             id: 'select_area7',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6002']
                 }
             }
         },{
             id: 'pubSupplyForage_jiaoyitype',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6003']
                 }
             }
         },{
             id: 'pubSupplyForage_pricetype',
             pro: 'pricetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyForage_price',
             pro: 'price',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyForage_priceunit',
             pro: 'priceunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyForage_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubSupplyForage_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
                id: 'pubSupplyForage_configure',
                pro: 'merits',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubSupplyForage_startnumtype',
             pro: 'startnumtype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyForage_startnum',
             pro: 'startnum',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyForage_havenum',
             pro: 'havenum',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyForage_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':agriculture.config.constant['3005']
                 },
             }
          }, {
             id: 'pubSupplyForage_telephone',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': agriculture.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': agriculture.config.constant['4001']
                    }
             }
         }];
         return validationToValue(pubSupplyForagedatas);
     },
     
     submit: function(status) {
         var data = agriculture.pubSupplyForage.data();
         if (debug) {
             console.log('pubSupplyForage validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubSupplyForage_location_x').val();
              var y = $('#pubSupplyForage_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 2;
             data2['maintype'] = 3;


             agriculture.tool.ajax(agriculture.config.pubagriculture, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },

           edit: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInit('pubSupplyForage_', d);
                   
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

            update: function(status,id) {
                var data = agriculture.pubSupplyForage.data();
         if (debug) {
             console.log('pubSupplyForage validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubSupplyForage_location_x').val();
              var y = $('#pubSupplyForage_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 2;
             data2['maintype'] = 3;
            data2['info_id'] = id;


             agriculture.tool.ajax(agriculture.config.pubagricultureUpdate, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                            $.router.back(); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },
     init: function() {
         // var id = $("#pubSupplyForage_id").val();
         // if (id) {
         //     agriculture.pubZPeopleService.eidt(id);
         // }
     }
    };
    
    agriculture.pubDemandForage = {
     data: function() {
         var pubDemandForagedatas = [{
             id: 'pubDemandForage_classify',
             pro: 'classify',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5005']
                 }
             }
         },{
             id: 'pubDemandForage_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'pubDemandForage_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'select_city8',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6001']
                 }
             }
         },{
             id: 'select_area8',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6002']
                 }
             }
         },{
             id: 'pubDemandForage_jiaoyitype',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6003']
                 }
             }
         },{
             id: 'pubDemandForage_pricetype',
             pro: 'pricetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandForage_price',
             pro: 'price',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandForage_priceunit',
             pro: 'priceunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandForage_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubDemandForage_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
                id: 'pubDemandForage_configure',
                pro: 'merits',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubDemandForage_startnumtype',
             pro: 'startnumtype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandForage_startnum',
             pro: 'startnum',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandForage_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':agriculture.config.constant['3005']
                 },
             }
          }, {
             id: 'pubDemandForage_telephone',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': agriculture.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': agriculture.config.constant['4001']
                    }
             }
         }];
         return validationToValue(pubDemandForagedatas);
     },
     
     submit: function(status) {
         var data = agriculture.pubDemandForage.data();
         if (debug) {
             console.log('pubDemandForage validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubDemandForage_location_x').val();
              var y = $('#pubDemandForage_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 1;
             data2['maintype'] = 3;


             agriculture.tool.ajax(agriculture.config.pubagriculture, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },

                edit: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInit('pubDemandForage_', d);
                   
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

            update: function(status,id) {
                var data = agriculture.pubDemandForage.data();
         if (debug) {
             console.log('pubDemandForage validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubDemandForage_location_x').val();
              var y = $('#pubDemandForage_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 1;
             data2['maintype'] = 3;
            data2['info_id'] = id;


             agriculture.tool.ajax(agriculture.config.pubagricultureUpdate, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                            $.router.back(); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },
     init: function() {
         // var id = $("#pubDemandForage_id").val();
         // if (id) {
         //     agriculture.pubZPeopleService.eidt(id);
         // }
     }
    };

   agriculture.pubSupplyFreshSeafood = {
     data: function() {
         var pubSupplyFreshSeafooddatas = [{
                id: 'pubSupplyFreshSeafood_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: {
                    'require': {
                        'is': false,
                        'msg':''
                    }
                }
            },{
             id: 'pubSupplyFreshSeafood_classify',
             pro: 'classify',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5005']
                 }
             }
         },{
             id: 'pubSupplyFreshSeafood_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'pubSupplyFreshSeafood_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'select_city9',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6001']
                 }
             }
         },{
             id: 'select_area9',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6002']
                 }
             }
         },{
             id: 'pubSupplyFreshSeafood_jiaoyitype',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6003']
                 }
             }
         },{
             id: 'pubSupplyFreshSeafood_pricetype',
             pro: 'pricetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyFreshSeafood_price',
             pro: 'price',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyFreshSeafood_priceunit',
             pro: 'priceunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyFreshSeafood_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubSupplyFreshSeafood_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
                id: 'pubSupplyFreshSeafood_configure',
                pro: 'merits',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubSupplyFreshSeafood_startnumtype',
             pro: 'startnumtype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyFreshSeafood_startnum',
             pro: 'startnum',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyFreshSeafood_havenum',
             pro: 'havenum',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubSupplyFreshSeafood_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':agriculture.config.constant['3005']
                 },
             }
          }, {
             id: 'pubSupplyFreshSeafood_telephone',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': agriculture.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': agriculture.config.constant['4001']
                    }
             }
         }];
         return validationToValue(pubSupplyFreshSeafooddatas);
     },
     
     submit: function(status) {
         var data = agriculture.pubSupplyFreshSeafood.data();
         if (debug) {
             console.log('pubSupplyFreshSeafood validation ' + '--> ');
             console.log(data);
         }
         if (data) {
              var x = $('#pubSupplyFreshSeafood_location_x').val();
              var y = $('#pubSupplyFreshSeafood_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 2;
             data2['maintype'] = 6;


             agriculture.tool.ajax(agriculture.config.pubagriculture, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },

    edit: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInit('pubSupplyFreshSeafood_', d);
                   
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

            update: function(status,id) {
                var data = agriculture.pubSupplyFreshSeafood.data();
         if (debug) {
             console.log('pubSupplyFreshSeafood validation ' + '--> ');
             console.log(data);
         }
         if (data) {
              var x = $('#pubSupplyFreshSeafood_location_x').val();
              var y = $('#pubSupplyFreshSeafood_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 2;
             data2['maintype'] = 6;
            data2['info_id'] = id;


             agriculture.tool.ajax(agriculture.config.pubagricultureUpdate, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                            $.router.back(); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },
     init: function() {
         // var id = $("#pubSupplyFreshSeafood_id").val();
         // if (id) {
         //     agriculture.pubZPeopleService.eidt(id);
         // }
     }
    };
    
    agriculture.pubDemandFreshSeafood = {
     data: function() {
         var pubDemandFreshSeafooddatas = [{
             id: 'pubDemandFreshSeafood_classify',
             pro: 'classify',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5005']
                 }
             }
         },{
             id: 'pubDemandFreshSeafood_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'pubDemandFreshSeafood_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'select_city10',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':agriculture.config.constant['6001']
                 }
             }
         },{
             id: 'select_area10',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6002']
                 }
             }
         },{
             id: 'pubDemandFreshSeafood_jiaoyitype',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6003']
                 }
             }
         },{
             id: 'pubDemandFreshSeafood_pricetype',
             pro: 'pricetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandFreshSeafood_price',
             pro: 'price',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandFreshSeafood_priceunit',
             pro: 'priceunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandFreshSeafood_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubDemandFreshSeafood_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
                id: 'pubDemandFreshSeafood_configure',
                pro: 'merits',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubDemandFreshSeafood_startnumtype',
             pro: 'startnumtype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandFreshSeafood_startnum',
             pro: 'startnum',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
          },{
             id: 'pubDemandFreshSeafood_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':agriculture.config.constant['3005']
                 },
             }
          }, {
             id: 'pubDemandFreshSeafood_telephone',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': agriculture.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': agriculture.config.constant['4001']
                    }
             }
         }];
         return validationToValue(pubDemandFreshSeafooddatas);
     },
     
     submit: function(status) {
         var data = agriculture.pubDemandFreshSeafood.data();
         if (debug) {
             console.log('pubDemandFreshSeafood validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubDemandFreshSeafood_location_x').val();
              var y = $('#pubDemandFreshSeafood_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 1;
             data2['maintype'] = 6;


             agriculture.tool.ajax(agriculture.config.pubagriculture, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },

         edit: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInit('pubDemandFreshSeafood_', d);
                   
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

            update: function(status,id) {
                var data = agriculture.pubDemandFreshSeafood.data();
         if (debug) {
             console.log('pubDemandFreshSeafood validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubDemandFreshSeafood_location_x').val();
              var y = $('#pubDemandFreshSeafood_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 1;
             data2['maintype'] = 6;
            data2['info_id'] = id;


             agriculture.tool.ajax(agriculture.config.pubagricultureUpdate, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                            $.router.back(); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },
     init: function() {
         // var id = $("#pubDemandFreshSeafood_id").val();
         // if (id) {
         //     agriculture.pubZPeopleService.eidt(id);
         // }
     }
    };

    agriculture.pubSupplyHireEquipment = {
     data: function() {
         var pubSupplyHireEquipmentdatas = [{
                id: 'pubSupplyHireEquipment_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: {
                    'require': {
                        'is': false,
                        'msg':''
                    }
                }
            },{
             id: 'pubSupplyHireEquipment_classify',
             pro: 'classify',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5005']
                 }
             }
         },{
             id: 'pubSupplyHireEquipment_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'pubSupplyHireEquipment_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'select_city11',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6001']
                 }
             }
         },{
             id: 'select_area11',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6002']
                 }
             }
         },{
             id: 'pubSupplyHireEquipment_jiaoyitype',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6003']
                 }
             }
         },{
             id: 'pubSupplyHireEquipment_pricetype',
             pro: 'pricetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyHireEquipment_price',
             pro: 'price',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyHireEquipment_priceunit',
             pro: 'priceunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubSupplyHireEquipment_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubSupplyHireEquipment_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
                id: 'pubSupplyHireEquipment_configure',
                pro: 'merits',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubSupplyHireEquipment_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':agriculture.config.constant['3005']
                 },
             }
          }, {
             id: 'pubSupplyHireEquipment_telephone',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': agriculture.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': agriculture.config.constant['4001']
                    }
             }
         }];
         return validationToValue(pubSupplyHireEquipmentdatas);
     },
     
     submit: function(status) {
         var data = agriculture.pubSupplyHireEquipment.data();
         if (debug) {
             console.log('pubSupplyHireEquipment validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubSupplyHireEquipment_location_x').val();
              var y = $('#pubSupplyHireEquipment_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 2;
             data2['maintype'] = 2;


             agriculture.tool.ajax(agriculture.config.pubagriculture, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },

              edit: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInit('pubSupplyHireEquipment_', d);
                   
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

            update: function(status,id) {
                 var data = agriculture.pubSupplyHireEquipment.data();
         if (debug) {
             console.log('pubSupplyHireEquipment validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubSupplyHireEquipment_location_x').val();
              var y = $('#pubSupplyHireEquipment_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 2;
             data2['maintype'] = 2;
            data2['info_id'] = id;


             agriculture.tool.ajax(agriculture.config.pubagricultureUpdate, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                            $.router.back(); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },
     init: function() {
         // var id = $("#pubSupplyHireEquipment_id").val();
         // if (id) {
         //     agriculture.pubZPeopleService.eidt(id);
         // }
     }
    };
   
    agriculture.pubDemandHireEquipment = {
     data: function() {
         var pubDemandHireEquipmentdatas = [{
             id: 'pubDemandHireEquipment_classify',
             pro: 'classify',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['5005']
                 }
             }
         },{
             id: 'pubDemandHireEquipment_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'pubDemandHireEquipment_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                    'require': {
                        'is': true,
                        'msg': ''
                    }
             }
         }, {
             id: 'select_city12',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6001']
                 }
             }
         },{
             id: 'select_area12',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6002']
                 }
             }
         },{
             id: 'pubDemandHireEquipment_jiaoyitype',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': agriculture.config.constant['6003']
                 }
             }
         },{
             id: 'pubDemandHireEquipment_pricetype',
             pro: 'pricetype',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandHireEquipment_price',
             pro: 'price',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandHireEquipment_priceunit',
             pro: 'priceunit',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubDemandHireEquipment_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }, {
             id: 'pubDemandHireEquipment_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
             }
         },{
                id: 'pubDemandHireEquipment_configure',
                pro: 'merits',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
             id: 'pubDemandHireEquipment_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':agriculture.config.constant['3005']
                 },
             }
          }, {
             id: 'pubDemandHireEquipment_telephone',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': agriculture.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': agriculture.config.constant['4001']
                    }
             }
         }];
         return validationToValue(pubDemandHireEquipmentdatas);
     },
     
     submit: function(status) {
         var data = agriculture.pubDemandHireEquipment.data();
         if (debug) {
             console.log('pubDemandHireEquipment validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubDemandHireEquipment_location_x').val();
              var y = $('#pubDemandHireEquipment_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 1;
             data2['maintype'] = 2;


             agriculture.tool.ajax(agriculture.config.pubagriculture, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },

            edit: function(id,maintype,test) {
            var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            agriculture.tool.ajax(agriculture.config.agriculturedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
                    $.alert(agriculture.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                   
                    viewInit('pubDemandHireEquipment_', d);
                   
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

            update: function(status,id) {
                  var data = agriculture.pubDemandHireEquipment.data();
         if (debug) {
             console.log('pubDemandHireEquipment validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#pubDemandHireEquipment_location_x').val();
              var y = $('#pubDemandHireEquipment_location_y').val();
          
             if (x && y) {
                 data.location_x = parseFloat(x).toFixed(6);

                 data.location_y = parseFloat(y).toFixed(6);
              } else {
                 data.location_x = position.latitudeP;
                  data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['isneed'] = 1;
             data2['maintype'] = 2;
            data2['info_id'] = id;


             agriculture.tool.ajax(agriculture.config.pubagricultureUpdate, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && agriculture.config.constant['0002'] == d.data) { 
                     $.alert(agriculture.config.constant['0004'],function(){
                            $.router.back(); 
                     });
                 } else if (d.data) {
                     $.alert(agriculture.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(agriculture.config.constant['0001']);
             });
         }
     },
     init: function() {
         // var id = $("#pubDemandHireEquipment_id").val();
         // if (id) {
         //     agriculture.pubZPeopleService.eidt(id);
         // }
     }
    };
    $(document).on("pageInit", function(e, pageId, $page) {

         // var url = location.search; //获取url中"?"符后的字串
         //     var strs = url.substr(1);
         //      var id=strs.split("=")[1]
       //  function GetQueryString(name)
       //   {
       //  var reg = new RegExp("(^|&)"+name +"=([^&]*)(&|$)");
       //   var r = window.location.search.substr(1).match(reg);
       //   if(r!=null)return unescape(r[2]); return null;
       //}

         var id=GetQueryString("id");
         var maintype=GetQueryString("maintype");

          if (pageId == "pageIndex") {
                   //agriculture.index.init(13);
              agriculture.index.query();
              agriculture.index.init(13);

              $(function () {


              $("#btnQuery").click(function() {
                  agriculture.index.query();
              });

              $("#btnlocationorder").click(function() {
                  agriculture.index.query();
                  $("#btnwithclassify").val('');
                  $("#classify").text('按分类');
                  // $("#timeorder").val('');

              });
              $("#btntimeorder").click(function() {
                  agriculture.index.query();
                  // $("#locationorder").val('');

                  $("#btnwithclassify").val('');
                  $("#classify").text('按分类');
              });
              $("#supply_c").click(function() {
                  $("#supply_c").attr("check",true);
                  $("#demand_c").attr("check",false);
                  agriculture.index.query();
                  $.attachInfiniteScroll($('.infinite-scroll').eq(1))

              });
              $("#demand_c").click(function() {
                  $("#supply_c").attr("check",false);
                  $("#demand_c").attr("check",true);
                  agriculture.index.query();
                  $.attachInfiniteScroll($('.infinite-scroll').eq(0))
              });
              $("#LandMines_c").click(function() {
                  $("#LandMines_c").attr("check",true);
                  $("#HireEquipment_c").attr("check",false);
                  $("#Forage_c").attr("check",false);
                  $("#FryMedicine_c").attr("check",false);
                  $("#SidelineProducts_c").attr("check",false);
                  $("#FreshSeafood_c").attr("check",false);
                  agriculture.index.query();

                  $("#classify").attr("data-panel","#pageLandMines");
                  $("#btnwithclassify").val('');
                  $("#classify").text('按分类');

              });
              $("#HireEquipment_c").click(function() {
                  $("#LandMines_c").attr("check",false);
                  $("#HireEquipment_c").attr("check",true);
                  $("#Forage_c").attr("check",false);
                  $("#FryMedicine_c").attr("check",false);
                  $("#SidelineProducts_c").attr("check",false);
                  $("#FreshSeafood_c").attr("check",false);
                  agriculture.index.query();

                  $("#classify").attr("data-panel","#pageHireEquipment");
                  $("#btnwithclassify").val('');
                  $("#classify").text('按分类');


              });
              $("#Forage_c").click(function() {
                  $("#LandMines_c").attr("check",false);
                  $("#HireEquipment_c").attr("check",false);
                  $("#Forage_c").attr("check",true);
                  $("#FryMedicine_c").attr("check",false);
                  $("#SidelineProducts_c").attr("check",false);
                  $("#FreshSeafood_c").attr("check",false);
                  agriculture.index.query();

                  $("#classify").attr("data-panel","#pageForage");
                  $("#btnwithclassify").val('');
                  $("#classify").text('按分类');


              });
              $("#FryMedicine_c").click(function() {
                  $("#LandMines_c").attr("check",false);
                  $("#HireEquipment_c").attr("check",false);
                  $("#Forage_c").attr("check",false);
                  $("#FryMedicine_c").attr("check",true);
                  $("#SidelineProducts_c").attr("check",false);
                  $("#FreshSeafood_c").attr("check",false);
                  agriculture.index.query();

                  $("#classify").attr("data-panel","#pageFryMedicine");
                  $("#btnwithclassify").val('');
                  $("#classify").text('按分类');


              });
              $("#SidelineProducts_c").click(function() {
                  $("#LandMines_c").attr("check",false);
                  $("#HireEquipment_c").attr("check",false);
                  $("#Forage_c").attr("check",false);
                  $("#FryMedicine_c").attr("check",false);
                  $("#SidelineProducts_c").attr("check",true);
                  $("#FreshSeafood_c").attr("check",false);
                  agriculture.index.query();

                  $("#classify").attr("data-panel","#pageSidelineProducts");
                  $("#btnwithclassify").val('');
                  $("#classify").text('按分类');



              });
              $("#FreshSeafood_c").click(function() {
                  $("#LandMines_c").attr("check",false);
                  $("#HireEquipment_c").attr("check",false);
                  $("#Forage_c").attr("check",false);
                  $("#FryMedicine_c").attr("check",false);
                  $("#SidelineProducts_c").attr("check",false);
                  $("#FreshSeafood_c").attr("check",true);
                  agriculture.index.query();

                  $("#classify").attr("data-panel","#pageFreshSeafood");
                  $("#btnwithclassify").val('');
                  $("#classify").text('按分类');


              });
                  $(".maintype").each(function(){
                      $(this).click(function(){
                          $(".maintype").removeClass("active");
                          $(this).addClass("active");
                      })

                  });

                  $(".classify").each(function(){
                      $(this).click(function(){
                          $(".classify").removeClass("active");
                          $(this).addClass("active");
                      })

                  });
              });
               
        }else if(pageId == "pageSupplyLandMines_details"){
                      agriculture.index.detail(id,maintype); 
        }else if(pageId == "pageSupplyHireEquipment_details"){
                      agriculture.index.detail(id,maintype); 
        }else if(pageId == "pageSupplyForage_details"){
                      agriculture.index.detail(id,maintype); 
        }else if(pageId == "pageSupplyFryMedicine_details"){
                      agriculture.index.detail(id,maintype); 
        }else if(pageId == "pageSupplySidelineProducts_details"){
                      agriculture.index.detail(id,maintype); 
        }else if(pageId == "pageSupplyFreshSeafood_details"){
                      agriculture.index.detail(id,maintype); 
        }else if(pageId == "pageDemandLandMines_details"){
                     agriculture.index.Demanddetail(id,maintype); 
        }else if(pageId == "pageDemandHireEquipment_details"){
                    agriculture.index.Demanddetail(id,maintype); 
        }else if(pageId == "pageDemandForage_details"){
                     agriculture.index.Demanddetail(id,maintype); 
        }else if(pageId == "pageDemandFryMedicine_details"){
                     agriculture.index.Demanddetail(id,maintype); 
        }else if(pageId == "pageDemandSidelineProducts_details"){
                     agriculture.index.Demanddetail(id,maintype);  
        }else if(pageId == "pageDemandFreshSeafood_details"){
                     agriculture.index.Demanddetail(id,maintype);  
        }

        else if(pageId == "pageSupplyLandMines"){
              if(id){
                  agriculture.pubSupplyLandMines.edit(id);
              }
                    
        }else if(pageId == "pageSupplyHireEquipment"){
                      if(id){
                  agriculture.pubSupplyHireEquipment.edit(id);
              }
        }else if(pageId == "pageSupplyForage"){
                     if(id){
                  agriculture.pubSupplyForage.edit(id);
              }
        }else if(pageId == "pageSupplyFryMedicine"){
                    if(id){
                  agriculture.pubSupplyFryMedicine.edit(id);
              } 
        }else if(pageId == "pageSupplySidelineProducts"){
                     if(id){
                  agriculture.pubSupplySidelineProducts.edit(id);
              }  
        }else if(pageId == "pageSupplyFreshSeafood"){
                     if(id){
                  agriculture.pubSupplyFreshSeafood.edit(id);
              }
        }else if(pageId == "pageDemandLandMines"){
                     if(id){
                  agriculture.pubDemandLandMines.edit(id);
              } 
        }else if(pageId == "pageDemandHireEquipment"){
                     if(id){
                  agriculture.pubDemandHireEquipment.edit(id);
              }
        }else if(pageId == "pageDemandForage"){
                    if(id){
                  agriculture.pubDemandForage.edit(id);
              } 
        }else if(pageId == "pageDemandFryMedicine"){
                     if(id){
                  agriculture.pubDemandFryMedicine.edit(id);
              }
        }else if(pageId == "pageDemandSidelineProducts"){
                      if(id){
                  agriculture.pubDemandSidelineProducts.edit(id);
              }
        }else if(pageId == "pageDemandFreshSeafood"){
                     if(id){
                  agriculture.pubDemandFreshSeafood.edit(id);
              }
        }
    });
     $.init();


    $("#select_area").change(function(){
        agriculture.index.query();
        agriculture.index.init(13);
    })

    $(function() {
    //发布土地
     $("#btnPubDemandLandMines").click(function() {
         var id = $("#pubDemandLandMines_id").val();
          if(id){
             agriculture.pubDemandLandMines.update(1,id);
         }else{
             agriculture.pubDemandLandMines.submit(1); 
         }
    });
     $("#btnSaveDemandLandMines").click(function() {
         var id = $("#pubDemandLandMines_id").val();
            if(id){
             agriculture.pubDemandLandMines.update(2,id);
         }else{
             agriculture.pubDemandLandMines.submit(2); 
         }
    });
     $("#btnPubSupplyLandMines").click(function() {
         var id = $("#pubSupplyLandMines_id").val();
           if(id){
            agriculture.pubSupplyLandMines.update(1,id);
         }else{
           agriculture.pubSupplyLandMines.submit(1); 
         }
          
    });
     $("#btnSaveSupplyLandMines").click(function() {
         var id = $("#pubSupplyLandMines_id").val();
          if(id){
            agriculture.pubSupplyLandMines.update(2,id);
          }else{
           agriculture.pubSupplyLandMines.submit(2); 
          }
    });

     //发布农副品
     $("#btnPubSupplySidelineProducts").click(function() {
         var id = $("#pubSupplySidelineProducts_id").val();
         if(id){
            agriculture.pubSupplySidelineProducts.update(1,id);
          }else{
           agriculture.pubSupplySidelineProducts.submit(1);
          }
          
    });
     $("#btnSaveSupplySidelineProducts").click(function() {
         var id = $("#pubSupplySidelineProducts_id").val();
         if(id){
            agriculture.pubSupplySidelineProducts.update(2,id);
          }else{
           agriculture.pubSupplySidelineProducts.submit(2);
          }
    });
     $("#btnPubDemandSidelineProducts").click(function() {
         var id = $("#pubDemandSidelineProducts_id").val();
          if(id){
            agriculture.pubDemandSidelineProducts.update(1,id);
          }else{
           agriculture.pubDemandSidelineProducts.submit(1);
          }
     
    });
     $("#btnSaveDemandSidelineProducts").click(function() {
         var id = $("#pubDemandSidelineProducts_id").val();
          if(id){
            agriculture.pubDemandSidelineProducts.update(2,id);
          }else{
           agriculture.pubDemandSidelineProducts.submit(2);
          }
  
    });

     //发布医药
     $("#btnPubSupplyFryMedicine").click(function() {
         var id = $("#pubSupplyFryMedicine_id").val();
          if(id){
            agriculture.pubSupplyFryMedicine.update(1,id);
          }else{
           agriculture.pubSupplyFryMedicine.submit(1);
          }

    });
     $("#btnSaveSupplyFryMedicine").click(function() {
         var id = $("#pubSupplyFryMedicine_id").val();
          if(id){
            agriculture.pubSupplyFryMedicine.update(2,id);
          }else{
           agriculture.pubSupplyFryMedicine.submit(2);
          }

    });
     $("#btnPubDemandFryMedicine").click(function() {
         var id = $("#pubDemandFryMedicine_id").val();
          if(id){
            agriculture.pubDemandFryMedicine.update(1,id);
          }else{
           agriculture.pubDemandFryMedicine.submit(1);
          }
       
    });
     $("#btnSaveDemandFryMedicine").click(function() {
         var id = $("#pubDemandFryMedicine_id").val();
          if(id){
            agriculture.pubDemandFryMedicine.update(2,id);
          }else{
           agriculture.pubDemandFryMedicine.submit(2);
          }
       
    });

        //发布饲料草
     $("#btnPubSupplyForage").click(function() {
         var id = $("#pubSupplyForage_id").val();
          if(id){
            agriculture.pubSupplyForage.update(1,id);
          }else{
           agriculture.pubSupplyForage.submit(1);
          }

    });
     $("#btnSaveSupplyForage").click(function() {
         var id = $("#pubSupplyForage_id").val();
          if(id){
            agriculture.pubSupplyForage.update(2,id);
          }else{
           agriculture.pubSupplyForage.submit(2);
          }

    });
     $("#btnPubDemandForage").click(function() {
         var id = $("#pubDemandForage_id").val();
          if(id){
            agriculture.pubDemandForage.update(1,id);
          }else{
           agriculture.pubDemandForage.submit(1);
          }
      
    });
     $("#btnSaveDemandForage").click(function() {
         var id = $("#pubDemandForage_id").val();
          if(id){
            agriculture.pubDemandForage.update(2,id);
          }else{
           agriculture.pubDemandForage.submit(2);
          }

    });
    
       //发布水产生鲜
     $("#btnPubSupplyFreshSeafood").click(function() {
         var id = $("#pubSupplyFreshSeafood_id").val();
          if(id){
            agriculture.pubSupplyFreshSeafood.update(1,id);
          }else{
           agriculture.pubSupplyFreshSeafood.submit(1);
          }
       
    });
     $("#btnSaveSupplyFreshSeafood").click(function() {
         var id = $("#pubSupplyFreshSeafood_id").val();
          if(id){
            agriculture.pubSupplyFreshSeafood.update(2,id);
          }else{
           agriculture.pubSupplyFreshSeafood.submit(2);
          }
      
    });
     $("#btnPubDemandFreshSeafood").click(function() {
         var id = $("#pubDemandFreshSeafood_id").val();
          if(id){
            agriculture.pubDemandFreshSeafood.update(1,id);
          }else{
           agriculture.pubDemandFreshSeafood.submit(1);
          }
      
    });
     $("#btnSaveDemandFreshSeafood").click(function() {
         var id = $("#pubDemandFreshSeafood_id").val();
          if(id){
            agriculture.pubDemandFreshSeafood.update(2,id);
          }else{
           agriculture.pubDemandFreshSeafood.submit(2);
          }

    });
 
      //发布租购机具
     $("#btnPubSupplyHireEquipment").click(function() {
         var id = $("#pubSupplyHireEquipment_id").val();
          if(id){
            agriculture.pubSupplyHireEquipment.update(1,id);
          }else{
           agriculture.pubSupplyHireEquipment.submit(1);
          }
      
    });
     $("#btnSaveSupplyHireEquipment").click(function() {
         var id = $("#pubSupplyHireEquipment_id").val();
          if(id){
            agriculture.pubSupplyHireEquipment.update(2,id);
          }else{
           agriculture.pubSupplyHireEquipment.submit(2);
          }
 
    });
     $("#btnPubDemandHireEquipment").click(function() {
         var id = $("#pubDemandHireEquipment_id").val();
          if(id){
            agriculture.pubDemandHireEquipment.update(1,id);
          }else{
           agriculture.pubDemandHireEquipment.submit(1);
          }
        
    });
     $("#btnSaveDemandHireEquipment").click(function() {
         var id = $("#pubDemandHireEquipment_id").val();
          if(id){
            agriculture.pubDemanHireEquipment.update(2,id);
          }else{
            agriculture.pubDemanHireEquipment.submit(2);
          }

    });


    try{
            juicer.register('itemIcon', itemIcon); 
            juicer.register('pubItemIcon', pubItemIcon); 
        }catch (e) {
            console.log(e);
        }
});
  
});


 function dianji(info_type) {
   
    var data = {
        'info_type': info_type
    }
      agriculture.tool.ajax(agriculture.config.click, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
              if (d.data && agriculture.config.constant['0002'] == d.data) {
            
                    }  
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
}

  function userclick(info_id,info_type) {
    var data = {
        'info_id':info_id,
        'info_type': info_type
    }
      agriculture.tool.ajax(agriculture.config.userclick, data, null, 'post', function(d) {

        if (d.data && agriculture.config.constant['0002'] == d.data) { 
          // $('.n_num_1>span').html($('.n_num_1>span').html()*1+1);
          // $('.n_num>span').html($('.n_num>span').html()*1+1);
          }
            }, function(xhr, type) {
                $.toast(agriculture.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
}

function pageDetail(maintype,id) {
 // if (!maintype || !id) {
 //     return;
 // }else if (1 == maintype) {
 //     elid = 'SupplyLandMines_id';
 //     page = 'pageSupplyLandMines_details';
 //     _field = 'SupplyLandMines_';

 // }else if (2 == maintype) {
 //     elid = 'SupplyHireEquipment_id';
 //     page = 'pageSupplyHireEquipment_details';
 //     _field = 'SupplyHireEquipment_';

 // }else if (3 == maintype) {
 //     elid = 'SupplyForage_id';
 //     page = 'pageSupplyForage_details';
 //     _field = 'SupplyForage_';

 // }else if (4 == maintype) {
 //     elid = 'SupplyFryMedicine_id';
 //     page = 'pageSupplyFryMedicine_details';
 //     _field = 'SupplyFryMedicine_';

 // }else if (5 == maintype) {
 //     elid = 'SupplySidelineProducts_id';
 //     page = 'pageSupplySidelineProducts_details';
 //     _field = 'SupplySidelineProducts_';

 // }else if (6 == maintype) {
 //     elid = 'SupplyFreshSeafood_id';
 //     page = 'pageSupplyFreshSeafood_details';
 //     _field = 'SupplyFreshSeafood_';

 // }
 agriculture.index.detail(id,maintype,1);
}


function pageDemandDetail(maintype,id) {
 // if (!maintype || !id) {
 //     return;
 // }else if (1 == maintype) {
 //     elid = 'DemandLandMines_id';
 //     page = 'pageDemandLandMines_details';
 //     _field = 'DemandLandMines_';
 
 // }else if (2 == maintype) {
 //     elid = 'DemandHireEquipment_id';
 //     page = 'pageDemandHireEquipment_details';
 //     _field = 'DemandHireEquipment_';

 // }else if (3 == maintype) {
 //     elid = 'DemandForage_id';
 //     page = 'pageDemandForage_details';
 //     _field = 'DemandForage_';

 // }else if (4 == maintype) {
 //     elid = 'DemandFryMedicine_id';
 //     page = 'pageDemandFryMedicine_details';
 //     _field = 'DemandFryMedicine_';

 // }else if (5 == maintype) {
 //     elid = 'DemandSidelineProducts_id';
 //     page = 'pageDemandSidelineProducts_details';
 //     _field = 'DemandSidelineProducts_';

 // }else if (6 == maintype) {
 //     elid = 'DemandFreshSeafood_id';
 //     page = 'pageDemandFreshSeafood_details';
 //     _field = 'DemandFreshSeafood_';

 // }
 agriculture.index.Demanddetail(id,maintype,1);
}

function getRequire(type) {
  if (1 == type) {
        return '给水';
    } else if (2 == type) {
        return '排水';
    } else if (3 == type) {
        return '通电';
    } else if (4 == type) {
        return '通路';
    } else if (5 == type) {
        return '通讯';
    } else if (6 == type) {
        return '通燃气';
    } else if (7 == type) {
        return '通暖气';
    } else if (8 == type) {
        return '可扩租';
    }
}

function getyoushiRequire(type) {
   if (1 == type) {
        return '可送货';
    } else if (2 == type) {
        return '交通便利';
    } else if (3 == type) {
        return '免费装车';
    } else if (4 == type) {
        return '免费卸车';
    } else if (5 == type) {
        return '可预定';
    } else if (6 == type) {
        return '周边购买';
    } else if (7 == type) {
        return '送货上门';
    } 
}
function getjijuRequire(type) {
   if (1 == type) {
        return '全新';
    } else if (2 == type) {
        return '可运输';
    } else if (3 == type) {
        return '包邮  ';
    } else if (4 == type) {
        return '一口价';
    } else if (5 == type) {
        return '有发票';
    } else if (6 == type) {
        return '送货';
    } else if (7 == type) {
        return '无拆修';
    } else if (8 == type) {
        return '可保修';
    } 
}



function collectItem(e, info_id, info_type) {
   console.info($('#SupplyLandMines_id').val())
    var $star = $(e);
    var add;
    var remove;
    var data = {
        info_id: $('#' + info_id).val(),
        info_type: info_type
    };
    agriculture.tool.ajax(agriculture.config.storeinfo, data, null, 'post', function(d) {
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
        $.alert(agriculture.config.constant['0001']);
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
     agriculture.tool.ajax(agriculture.config.reportinfo, data, null, 'post', function(d) {
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
         $.alert(agriculture.config.constant['0001']);
     });
 }


function historyWatch(info_id, info_type,panduan) {
    var data = {
        'info_id': info_id,
        'info_type': info_type
    }
          agriculture.tool.ajax(agriculture.config.isreport, data, null, 'post', function(d) {

                 if (debug) {
                     console.log(d);
                 };
                 if (d && agriculture.config.constant['0003'] == d.data) {
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
                 $.toast(agriculture.config.constant['0001'], function() {
                     $.router.back();
                 });
                 $.hidePreloader();
             });


             agriculture.tool.ajax(agriculture.config.isstore, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && agriculture.config.constant['0003'] == d.data) {
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
                $.toast(agriculture.config.constant['0001'], function() {
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


// $(function () {
//   'use strict';
 // $(document).on("pageInit",'.page', function(e,id,page) {
      //多个标签页下的无限滚动
      var loading = false;

      $(document).on('infinite', function() {
        // 如果正在加载，则退出
          if (loading) return;
          // 设置flag
          loading = true;
          var tabIndex;

        if($(this).find('.infinite-scroll.active').attr('id') == "tab1"){
 
                  tabIndex = 0;
                loading = false;
                if (loading||$("#queryList li").length<10) {
                      console.info($("#queryList li").length)

                      return
               }


    
                 setTimeout(function() {

                    loading = false;

                    var pageNum = $("#sell_pageNum").val();
                     if (pageNum == 1) {
                         $('#tab1 .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');

                     }

                    $("#sell_pageNum").val(++pageNum);
                  
                    var param = agriculture.index.data();
                    param.pageNum = pageNum;
                    // param.PageSize = 10;
      
                    agriculture.tool.ajax(agriculture.config.agricultureList, param, null, 'post', function(d) {
                        if (debug) {
                            console.log(d);
                        };
                        if (d.totalPage > param.pageNum) {
                           
                             var list = juicer(agriculture.tpl.indexListTpl(), d);
                            $("#queryList").append(list);
 
                        } else if(d.totalPage == param.pageNum){
                            var list = juicer(agriculture.tpl.indexListTpl(), d);
                            $("#queryList").append(list);
                            $("#tab1 .infinite-scroll-preloader").empty();
                            $("#tab1 .infinite-scroll-preloader").html(agriculture.config.constant['0014']);

                            return
                        }


                    }, function(xhr, type) {
                        $.alert(agriculture.config.constant['0001']);
                        $("#tab1 .infinite-scroll-preloader").empty();
                    });
                    $.refreshScroller();
                }, 500);

        }
        if($(this).find('.infinite-scroll.active').attr('id') == "tab2"){

            tabIndex = 1;
            loading = false;
            if (loading||$("#queryNeedList li").length<10) {
                console.info($("#queryDemandList li").length)

                return
            }

            setTimeout(function() {

                loading = false;

                var pageNum = $("#rent_pageNum").val();

                if (pageNum == 1) {
                    $('#tab2 .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');


                }

                $("#rent_pageNum").val(++pageNum);

                var param = agriculture.index.data();
                param.pageNum = pageNum;
                // param.PageSize = 10;
                agriculture.tool.ajax(agriculture.config.agricultureList, param, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    };
                    if (d.totalPage > param.pageNum) {

                        var list = juicer(agriculture.tpl.indexDemandListTpl(), d);
                        $("#queryNeedList").append(list);
                    }
                    else if(d.totalPage == param.pageNum){
                        var list = juicer(agriculture.tpl.indexDemandListTpl(), d);
                        $("#queryNeedList").append(list);
                        $("#tab2 .infinite-scroll-preloader").empty();
                        $("#tab2 .infinite-scroll-preloader").html(agriculture.config.constant['0014']);
                        return
                    }

                }, function(xhr, type) {
                    $.alert(agriculture.config.constant['0001']);
                    $("#tab2 .infinite-scroll-preloader").empty();
                });
                $.refreshScroller();
            }, 500);
        }
});

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



 // });




