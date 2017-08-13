window.tourism = window.tourism || {};
var baseUrl = 'http://localhost:8080';

var filedate=tourism;

var uploaddebug = true;
var test = false;
function removeAddLable(lable) {
    var $close = $(lable);
    $close.parent().remove();
}

function showList(id) {
    if ($('#' + id).hasClass('showList')) {
        $('#' + id).removeClass('showList').addClass('hideList');
        $('#' + id).find('.icon').removeClass('icon-right').addClass('icon-down');
    } else if ($('#' + id).hasClass('hideList')) {
        $('#' + id).removeClass('hideList').addClass('showList');

        $('#' + id).find('.icon').removeClass('icon-down').addClass('icon-right');
    }
}


var debug = false;

$(function () {
    "use strict";

    window.tourism = window.tourism || {};

    var baseUrl = 'http://localhost:8080';


    tourism.config = {
        baseUrl: '',
        loginUrl: baseUrl + '/service/zhuce.html',
        pubScenic: baseUrl + '/user/travel/add_Scenic',
        pubCarFindPeople: baseUrl + '/user/travel/add_guide',
        travellist: baseUrl + '/user/travel/travel_list',
        tourismdaoDetail: baseUrl + '/user/travel/guide',
        ScenicList: baseUrl + '/user/travel/travel_list',
        scenicDetail: baseUrl + '/user/travel/scenic',
        uploadFile: baseUrl + '/uploadFile',
        storeinfo: baseUrl + '/user/store',
        reportinfo: baseUrl + '/user/report',
        isreport: baseUrl + '/user/showreport',
        isstore: baseUrl + '/user/showstore',
        changescenic: baseUrl + '/user/travel/change_Scenic',
        changeguide: baseUrl + '/user/travel/change_guide',
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
            '3019': '请上传首张图!',
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
            '5017': '请添加链接',
            '5018': '请添加链接',
            '6001': '请输入省',
            '6002': '请输入市',
            '6003': '请输入区',
            '6004': '举报成功!',
            '7001': '请上传导游图片！',
            '7002': '请填写导游说明！',
            '7003': '请填写姓名！',
            '7004': '请填写年龄！',
            '7005': '请选择性别！',
            '7006': '请填写价格！',
            '7007': '请填写电话！',
            '7008': '请填写小时数！',
            '7009': '请选择配置！',
            '7010': '请填写添加地址名！',
            '7011': '请上传景点图片！',
            '7012': '请填写景点说明！',
            '7013': '请填写汽车图片！',
            '7014': '请填写汽车说明！',
            '7015': '请填写车品牌！',
            '7016': '请填写车型！',
            '7017': '请填写车价格!',
            '7018': '请填写车小时数!',
            '7019': '请填写附言!',
            '7020': '请选择省!',
            '7021': '请选择市!',
            '7022': '请选择区！',
            '7023': '请选择是否提供车辆！',


        }
    }
//当前点击链接是否使用路由功能的自定义过滤器,返回 false 表示不使用路由功能，返回 true 表示进入路由功能后续处理
    $.config = {

        routerFilter: function ($link) {
            // 某个区域的 a 链接不想使用路由功能
            if ($link.is('.disable-router a')) {
                return false;
            }
            return true;
        }
    };
});


var position = {
    latitudeP: 31.093204,
    longitudeP: 119.0812012,
    accuracyP: 67.8021001352539
};

var debug = false;

$(function () {

    "use strict";

    window.tourism = window.tourism || {};
    var validator = function (data, value) {
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
                    if (!tourism.tool.validation.grea02Decimal(value)) {
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
                    if (!tourism.tool.validation.isMobile(value)) {
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
                    if (!tourism.tool.validation.digits(value)) {
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
    var validationToValue = function (arrData) {
        var data = {};
        var valu6="";
        var valu7="";
        var valu8="";
        var valu9="";
        var valu10="";
        var valu11="";
        var valu12="";
        var valu13="";
    
        for (var i = 0; i < arrData.length; i++) {
            var item = arrData[i];
            var value = '';
            if ('input' === item.eleType) {
                value = $("#" + item.id).val();
            } else if ('inputDate' === item.eleType) {
                value = $("#" + item.id).val();
                if (value && $.trim(value)) {
                    value = $.trim(value) + " " + $("#" + item.id + "_h").val() + ":" + $("#" + item.id + "_m").val() + ":00";
                }
            } else if ('btnRound' === item.eleType) {
                var round = $("span[name='" + item.id + "'][check='true']");
                if (round.length != 0) {
                    if (round.length == 2) {
                        value = 3;
                    } else {
                        value = $(round).attr('data-pub');
                    }
                } else {
                    value = 4;
                }
            } else if ('requireDanger' === item.eleType) {
                var confs = $("span[name='" + item.id + "'][check='true']");
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
            } else if ('tagsDanger' === item.eleType) {
                var confs = $("span[name='" + item.id + "'][check='true']");
                $.each(confs, function (i, e) {
                    if (i == 0) {
                        value = $(e).attr('data-tags');
                    } else {
                        value += "," + $(e).attr('data-tags');
                    }
                });
                if (debug) {
                    console.log(value);
                }
            } else if ('places' === item.eleType) {
                // var places = $("span[name='" + item.id + "']");
             valu13= valu13 + "," +$("#" + item.id).val();
             value=valu13;

              
            }else if ('img' === item.eleType) {
                var imgs = $("img[name='" + item.id + "']");
                $.each(imgs, function (i, e) {
                    if (value == '') {
                        value = $(e).attr('src');
                    } else {
                        value += "," + $(e).attr('src');
                    }
                });
                var videos = $("video[name='" + item.id + "']");
                $.each(videos, function (i, e) {
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
                $.each($("span[name='" + item.id + "']"), function (i, e) {
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
            } else if ('txtCarImg'=== item.eleType) {
                value=$("#" + item.id).find('img').attr("src");
            }else if('inputcontext' === item.eleType) {
            valu6= valu6 + "," +$("#" + item.id).val();
             value=valu6;
         }else if ('txtCarImg1'=== item.eleType) {
              if ($("#" + item.id).find('img').attr("src")){
               valu7=valu7 + "," + $("#" + item.id).find('img').attr("src");
              value=valu7;
              }

         }else if ('txtCarImg2'=== item.eleType) {
                 if ($("#" + item.id).find('img').attr("src")){
             valu10=valu10 + "," + $("#" + item.id).find('img').attr("src");
             value=valu10;
            
               }
         }else if ('txtCarImg3'=== item.eleType) {
            if ($("#" + item.id).find('img').attr("src")){
             valu11=valu11 + "," + $("#" + item.id).find('img').attr("src");
             value=valu11;
                  }

         }else if ('txtCarImg4'=== item.eleType) {
            
             if ($("#" + item.id).find('img').attr("src")){
                 valu12=valu12 + "," + $("#" + item.id).find('img').attr("src");
                 value=valu12;
               }

         }else if('inputcontext3' === item.eleType) {
            valu8= valu8 + "," +$("#" + item.id).val();
             value=valu8;

         }else if('inputcontext2' === item.eleType) {
            valu9= valu9 + "," +$("#" + item.id).val();
             value=valu9;
         }else if('grounpurl' === item.eleType) {
           $.each($("p[name='" + item.id + "']"), function (i, e) {
                    if (i == 0) {
                        value = $(e).text();
                    } else {
                        value += "," + $(e).text();
                    }
                });
       
         }else if('grounpurl1' === item.eleType) {
           $.each($("span[name='" + item.id + "']"), function (i, e) {
                    if (i == 0) {
                        value = $(e).text();
                    } else {
                        value += "," + $(e).text();
                    }
                });
       
         }
            if (!validator(item, value)) {
                return false;
            }
            data[item.pro] = $.trim(value);
        }
        ;
        return data;
    };
    var viewInit = function (_m, data) {
        for (var key in data) {
            var el = $("#" + _m + key);
            var eleType = $(el).attr('eleType');
            var value = $.trim(data[key]);
         if(key == 'province_name'){

             var province=$.trim(data[key]);
            
         }else if(key == 'city_name'){

             var city=$.trim(data[key]);

         }else if(key == 'county_name'){
             var county=$.trim(data[key]);
     
         }else if(key == 'main_img'){
            

                 var value = $.trim(data[key]);
               
                 var list = document.getElementById(_m + 'main_img');
                
                     var ipot=value.lastIndexOf(".");
                     var type=fileType(value.substring(ipot+1)); 
                     if (type=='image') {
                         showImgs(list, "" + _m + 'main_img', value);
                     } 
                    

         }else if(key == 'contexts'){

             for (var key in data.contexts) {

                 var value = $.trim(data.contexts[key].img_path);
                 var value2 = $.trim(data.contexts[key].content);
                 var c_image = value.split(',');
                 var c_context = value2.split(',');
                    if (c_image && c_image.length > 0 && c_image[0] != '') {
                         
                         $.each(c_image, function(i, e) {
                              if(i<c_image.length-1){
                                var che=$("#" + _m +'c_context').text();

                                  if( _m == 'pubScenic_' && !che){
                                        add1();
                                  
                                   }
            
                              }
                             var ipot=e.lastIndexOf(".");
                             var type=fileType(e.substring(ipot+1)); 
                             if(i==0){
                                   var list = document.getElementById(_m + 'c_image');
                                 if (type=='image') {
                                     showImgs(list, "" + _m + 'c_image', e);
                                   
                                 } 
                             }
                             else{
                                var lists = document.getElementById(_m + 'c_image'+i);
                               if (type=='image') {
                                   
                                     showImgs(lists, "" + _m + 'c_image'+i, e);
                                    
                                 }  
                             }

                         });
                     }
                        if (c_context && c_context.length > 0 && c_context[0] != '') {
                         var list = document.getElementById(_m + 'c_context');
                         $.each(c_context, function(i, e) {
                                
                             if(i==0){
                                         var el=$("#" + _m +'c_context');
                                         $(el).html(e);
                             }
                             else{
                                 
                                       var el=$("#" + _m +'c_context'+i);
                                         $(el).html(e);
                                     
                             }
                         });
                     }
                }
  
          }

          if(key == 'links'){

           

                 var value = $.trim(data.links[0].url);
                 var value2 = $.trim(data.links[0].content);
                 var c_url = value.split(',');
                 var c_url_content = value2.split(',');
                  var str='';
                    if (c_url && c_url.length > 0 && c_url[0] != '') {
                        

                        
                         $.each(c_url, function(i, e) {


                         str='<div><p name="pubScenic_c_url">'+e+'</p><p name="pubScenic_url_content">'+c_url_content[i]+'</p><img onclick="removeAddLable(this)"" src="images/lianjie_img.png" /></div>';
                           $('.comment1').append(str);
              
                         });
                     }
             
  
          }
          if(key=='show_status'){
                 var value = $.trim(data[key]);
                 if(value==1){
                     $("input[name='add_type']").attr('checked', true);
                     $("input[name='add_type']").attr('check', true)
                 }
          }
          if(key=='car_c'){
                 var value = $.trim(data[key]);
                 if(value==1){
                     $("#you_car_c").attr('checked', true);
                    $(".weizhixuanze").show();
                 }else if(value==2){
                     $("#you_car_c").attr('checked', false);
                    $(".weizhixuanze").hide();
                 }


          }

            if(key == 'guide_info'){



                 var value = $.trim(data.guide_info[0].img_path);
                 var value2 = $.trim(data.guide_info[0].content);
                 var c_image = value.split(',');
                 var c_context = value2.split(',');
                    if (c_image && c_image.length > 0 && c_image[0] != '') {
                         
                         $.each(c_image, function(i, e) {
                              if(i<c_image.length-1){
                                var che=$("#tu_wen_c_context").text();

                                  if( !che){
                                        add2();
                                  
                                   }
            
                              }
                             var ipot=e.lastIndexOf(".");
                             var type=fileType(e.substring(ipot+1)); 
                             if(i==0){
                                   var list = document.getElementById('tu_wen_c_image');
                                 if (type=='image') {
                                     showImgs(list, "" + 'tu_wen_' + 'c_image', e);
                                   
                                 } 
                             }
                             else{
                                var lists = document.getElementById('tu_wen_c_image'+i);
                               if (type=='image') {
                                   
                                     showImgs(lists, "" +'tu_wen_'+ 'c_image'+i, e);
                                    
                                 }  
                             }

                         });
                     }
                        if (c_context && c_context.length > 0 && c_context[0] != '') {
                         var list = document.getElementById(_m + 'c_context');
                         $.each(c_context, function(i, e) {
                                
                             if(i==0){
                                         var el=$("#" + 'tu_wen_' +'c_context');
                                         $(el).html(e);
                             }
                             else{
                                 
                                       var el=$("#tu_wen_c_context"+i);
                                         $(el).html(e);
                                     
                             }
                         });
                     }
               

          }

        if(key == 'place_info'){

            

                 var value = $.trim(data.place_info[0].img_path);
                 var value2 = $.trim(data.place_info[0].content);
                 var c_image = value.split(',');
                 var c_context = value2.split(',');
                    if (c_image && c_image.length > 0 && c_image[0] != '') {
                         
                         $.each(c_image, function(i, e) {
                              if(i<c_image.length-1){
                                var che=$("#jing_img_"+'c_context').text();

                                  if(!che){
                                        add3();
                                  
                                   }
                  
                              }
                             var ipot=e.lastIndexOf(".");
                             var type=fileType(e.substring(ipot+1)); 
                             if(i==0){
                                   var list = document.getElementById('jing_img_' + 'c_image');
                                 if (type=='image') {
                                     showImgs(list, "" + 'jing_img_' + 'c_image', e);
                                   
                                 } 
                             }
                             else{
                                var lists = document.getElementById('jing_img_' + 'c_image'+i);
                               if (type=='image') {
                                   
                                     showImgs(lists, "" + 'jing_img_' + 'c_image'+i, e);
                                    
                                 }  
                             }

                         });
                     }
                        if (c_context && c_context.length > 0 && c_context[0] != '') {
                         var list = document.getElementById('you_place_context');
                         $.each(c_context, function(i, e) {
                                
                             if(i==0){
                                         var el=$("#you_place_context");
                                         $(el).html(e);
                             }
                             else{
                                 
                                       var el=$("#you_place_context"+i);
                                         $(el).html(e);
                                     
                             }
                         });
                     }
               

          }

         if(key == 'car_info'){

             for (var key in data.car_info) {

                 var value = $.trim(data.car_info[key].img_path);
                 var value2 = $.trim(data.car_info[key].content);
                 var c_image = value.split(',');
                 var c_context = value2.split(',');
                    if (c_image && c_image.length > 0 && c_image[0] != '') {
                         
                         $.each(c_image, function(i, e) {
                              if(i<c_image.length-1){
                                var che=$("#car_img_" + 'c_context').text();

                                  if(!che){
                                        add4();
                                  
                                   }
               
                              }
                             var ipot=e.lastIndexOf(".");
                             var type=fileType(e.substring(ipot+1)); 
                             if(i==0){
                                   var list = document.getElementById('car_img_'+ 'c_image');
                                 if (type=='image') {
                                     showImgs(list, "" + 'car_img_' + 'c_image', e);
                                   
                                 } 
                             }
                             else{
                                var lists = document.getElementById('car_img_'+ 'c_image'+i);
                               if (type=='image') {
                                   
                                     showImgs(lists, "" + 'car_img_'+ 'c_image'+i, e);
                                    
                                 }  
                             }

                         });
                     }
                        if (c_context && c_context.length > 0 && c_context[0] != '') {
                         var list = document.getElementById('you_car_context');
                         $.each(c_context, function(i, e) {
                                
                             if(i==0){
                                         var el=$("#you_car_context");
                                         $(el).html(e);
                             }
                             else{
                                 
                                       var el=$("#you_car_context"+i);
                                         $(el).html(e);
                                     
                             }
                         });
                     }
                }

          }


           if (eleType === 'input' || !eleType) {
                $(el).val(value);
            } else if (eleType === 'input' || !eleType) {
                $(el).html(value);
            } else if (eleType === 'text' || !eleType) {
                $(el).val(value);
            }else if (eleType === 'text' || !eleType) {
                $(el).html(value);
            }else if (eleType === 'img') {
                var imgs = value.split(',');
                if (imgs && imgs.length > 0 && imgs[0] != '') {
                    var list = document.getElementById(_m + key + '_List');
                    $(list).empty();
                    $.each(imgs, function (i, e) {
                        var ipot = e.lastIndexOf(".");
                        var type = fileType(e.substring(ipot + 1));
                        if (type == 'image') {
                            showImgs(list, "" + _m + key, e);
                        } else if (type == 'video') {
                            showVideos(list, "" + _m + key, e);
                        }
                    });
                }
            } else if (eleType === 'requireDanger') {
                var confs = value.split(',');
                if (confs && confs.length > 0 && confs[0] != '') {
                    $("span[name='" + _m + key + "'][check='true']")
                        .attr('check', false)
                        .removeClass('button-danger')
                        .addClass('button-disable');
                    $.each(confs, function (i, e) {
                        $("span[name='" + _m + key + "'][data-require='" + e + "']")
                            .attr('check', true)
                            .removeClass('button-disable')
                            .addClass('button-danger');
                    });
                }
                ;
            } else if (eleType === 'city') {
                $(el).find('a').text(value);
            } else if ('citys_th' === eleType) {
                var pId = (_m + key).split('_')[0] + '_cityDiv';
                $('#' + pId).empty();
                if (value) {
                    var citys = value.split(',');
                    for (var i = 0; i < citys.length; i++) {
                        createDuringCity(pId, citys[i]);
                    }
                }

            } else if (eleType === 'btnRound') {
                $("input[name='" + _m + key + "']").attr('check', false).removeClass('button-fill');
                if (value == '3') {
                    $("span[name='" + _m + key + "'][data-pub='1']").attr('check', true)
                        .addClass('button-fill');
                    $("span[name='" + _m + key + "'][data-pub='2']").attr('check', true)
                        .addClass('button-fill');
                } else if (value == '1' || value == '2') {
                    $("span[name='" + _m + key + "'][data-pub='" + value + "']").attr('check', true)
                        .addClass('button-fill');
                }
            }
        }

          if(province&&city&&district){
   
          _cityPosdataPub(province,city,county);
       }
    };


    var viewInfo = function (_m, data) {
        //景区详情





        var html = [];
    
        for (var i = 0; i < data.links.length; i++) {
        for(var j=0;j<data.links[i].url.split(',').length;j++){
            if (data.links[i].url.split(',')[j]) {
            html.push('<li><a href="' + data.links[i].url.split(',')[j] + '">' + data.links[i].content.split(',')[j] + '</a></li>')
        }else{
            html.push('')
        }
        }
        }
    
        var list = $('#ScenicDetail_url');

        list.empty();


        if (html.length&&html) {
            list.html(html.join(''));
        }
       

        for (var key in data) {
            var el = $("#" + _m + key);
            var eleType = $(el).attr('eleType');
            var value = $.trim(data[key]);

            if (eleType === 'input' || !eleType) {
                $(el).html(value);
            } 


     if (key == 'show_status') {
           
       console.log(value)
       
         if(value==2){
        var html = [];

        for (var i = 0; i < data.length; i++) {

            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%;"  >')

        }
        var list = $('#ScenicDetail_main_img_List');

        list.empty();

        if (html.length&&html) {
            list.html(html.join(''));
        }else{
             list.html('');
        }

     }
  }
        else if (key == 'contexts') {
       
        var html = [];
        var value1 = $.trim(data.contexts);
       
        for(var i=0;i < data.contexts.length;i++ ) {
        for(var j=0;j<data.contexts[i].img_path.split(',').length;j++){
        if(data.contexts[i].img_path.split(',')[j]){
         html.push('<img src="' + data.contexts[i].img_path.split(',')[j] + '" alt="" style="width: 100%;height:8rem;" >'+data.contexts[i].content.split(',')[j]+'')
        }else{
         html.push('')   
        }
        } 
        }
        console.log(html);
        var list = $('#ScenicDetail_c_imgage');

        list.empty();

        if (html.length>0) {
            list.html(html.join(''));
        }
        
     }
            else if (eleType === 'img') {
                var imgs = value.split(',');
                if (imgs && imgs.length > 0 && imgs[0] != '') {
                    var list = $('#' + _m + key + '_List');
                    list.empty();
                    var html = [];
                    $.each(imgs, function (i, e) {
                        var ipot = e.lastIndexOf(".");
                        var type = fileType(e.substring(ipot + 1));
                        if (type == 'image') {
                            html.push('<img src="' + e + '" alt="" style="width: 100%" >')
                        } else if (type == 'video') {
                            html.push('<div class="swiper-slide"><video src="' + e + '" width="100%" controls="controls"></video></div>')
                        }
                    });
                    if (html.length > 0) {
                        list.html(html.join(''));
                    }
                }
            }
        }
    };
    var viewInfo1 = function (_m, data) {
        //陪游详情
        console.info(data)

        var html = [];
        var html2 = [];


        for(var i=0;i < data.guide_info.length;i++ ) {
          for(var j=0;j<data.guide_info[i].img_path.split(',').length;j++){
            if(data.guide_info[i].img_path&&data.guide_info[i].img_path.split(',').length){
          html.push('<img src="' + data.guide_info[i].img_path.split(',')[j] + '" alt="" style="width: 100%;height:8rem;" >')
           }else{html.push('<img src="images/big.jpg" alt="" style="width: 100%;height:8rem;" >')}
          html2.push(data.guide_info[i].content.split(',')[0])
        } 
        }
        var list = $('#pageyoudetailes_c_image_List');
        var list2 = $('#pageyoudetailes_content');
        list.empty();
        list2.empty();
        if (html.length > 0) {
            list.html(html.join(''));
            list2.html(html2.join(''));
            $("#dao_ju_tu").show();
            $("#dao_cang_tu").show();
            $("#dao_ju").hide();
            $("#dao_cang").hide();
        } else {
            $("#dao_ju_tu").hide();
            $("#dao_cang_tu").hide();
            $(".swiper-container").hide()
            $("#dao_ju").show();
            $("#dao_cang").show();


        };

    


        var html = [];
        var html2 = [];
        for (var i = 0; i < data.place_info.length; i++) {

            html.push('<div class="swiper-slide"><img src="' + data.place_info[i].img_path + '" alt="" style="width: 100%;height:8rem;" ></div>')
            html2.push(data.place_info[i].content)
        }
        var list = $('');
        var list2 = $('');
        list.empty();
        list2.empty();
        if (html.length > 0) {
            list.html(html.join(''));
            list2.html(html2.join(''));
        }


        for (var key in data) {
            var el = $("#" + _m + key);
            var el1 = $("[name='" + _m + key + "']");
            var eleType = $(el).attr('eleType');
            var value = $.trim(data[key]);
            if (eleType === 'text' || !eleType) {
                $(el1).html(value);
            }
            if (eleType === 'input' || !eleType) {
                $(el).html(value);


            }
            if (key === 'places') {
                 
                var requires = value.split(',');
                var rqh = [];
                for (var i = 0; i < requires.length; i++) {
                    if (i % 3 == 0) {
                        rqh.push('<div class="row">');
                    }
                    rqh.push('<div class="col-33"><span class="button bu button-danger">' + requires[i] +'</span></div>');
                    if ((i + 1) % 3 == 0) {
                        rqh.push('</div>');
                    }

                    var list = $('#pageyoudetailes_place_s');
                }
                if(value){
                     $(list).html(rqh.join(''));
                 }else{
                    $(list).html('');
                 }
               
  
             } 
             else if (key === 'car_price') {
                if(value>0){
               $('#pageyoudetailes_car_price').text(value +'元/天');
                }else{
               $('#pageyoudetailes_car_price').text('');
                }

             }
             else if (key === 'car_hours') {
                if(value){
               $('#pageyoudetailes_car_hours').text(value +'小时');
                }else{
               $('#pageyoudetailes_car_hours').text('');
                }

             }
             else if (eleType === 'img') {
                var imgs = value.split(',');
                if (imgs && imgs.length > 0 && imgs[0] != '') {
                    var list = $('#' + _m + key + '_List');
                    list.empty();
                    var html = [];
                    $.each(imgs, function (i, e) {
                        var ipot = e.lastIndexOf(".");
                        var type = fileType(e.substring(ipot + 1));
                        if (type == 'image') {
                            html.push('<img src="' + e + '" alt="" style="width: 100%" >')
                        } else if (type == 'video') {
                            html.push('<div class="swiper-slide"><video src="' + e + '" width="100%" controls="controls"></video></div>')
                        }
                    });
                    if (html.length > 0) {
                        list.html(html.join(''));
                    }
                }
            } else if (eleType === 'requireDanger') {
                var requires = value.split(',');
                var rqh = [];
                for (var i = 0; i < requires.length; i++) {
                    if (i % 4 == 0) {
                        rqh.push('<div class="row">');
                    }
                    rqh.push('<div class="col-25"><span name="pageyoudetailes_configure" data-require="' + requires[i] + '"  class="button button-danger" >' + getRequire(requires[i]) + '</span> </div>');
                    if ((i + 1) % 4 == 0) {
                        rqh.push('</div>');
                    }
                }
                $(el).html(rqh.join(''));
            }

            else if (eleType === 'telVew') {
                $(el).html(value);
                $("#" + _m + "tel").attr('href', 'tel:' + value);
                $("#" + _m + "sms").attr('href', 'sms:' + value);
            }

        }
        if ($('#pageyoudetailes_sex').html() == 1) {
            $('#pageyoudetailes_sex').html("男");
        } else if ($('#pageyoudetailes_sex').html() == 2) {
            $('#pageyoudetailes_sex').html("女");
        }
        ;
        if ($('#pageyoudetailes_user_status').html() == 1) {
            $('#pageyoudetailes_user_status').html("空闲");
            $('#pageyoudetailes_user_status').css('background','#7c84eb');
        } else if ($('#pageyoudetailes_user_status').html() == 2) {
            $('#pageyoudetailes_user_status').html("忙碌");
            $('#pageyoudetailes_user_status').css('background','#d0712d');
        }
        ;
   

    };


      //
      //    $(function() {
      //  var mySwiper = $('.swiper-container').swiper({
      //      autoplay: 5000,
      //      // mode: 'horizontal',
      //      // pagination: '.swiper-pagination',
      //      // loop: true,
      //      // observer: true,//修改swiper自己或子元素时，自动初始化swiper
      //      // observeParents: true//修改swiper的父元素时，自动初始化swiper
      //  });
      //});
    var viewAd = function(_m, data) {

        var html = [];
        var imgcontext = new Array();

        for (var key in data) {

            var value = $.trim(data[key].img);
            var types = $.trim(data[key].type);
             var id = $.trim(data[key].id);
            var title = $.trim(data[key].imgcontext);
            
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

        $.reinitSwiper("#pageIndex");
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

    var selectVal = function (els, data) {
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
                if (round.length != 0) {
                    if (round.length == 2) {
                        data[els[i].pro] = 3;
                    } else {
                        data[els[i].pro] = round.attr('data-pub');
                    }
                } else {
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
        }
    };

    tourism.tpl = {
        indexListTpl: function (data) {

            return ['{@each data as item}',
                '<li class="situation-box" >',
                '<div class="situation-box-item" >',
                '<a href="../service/tourism.html?id=${item.id}#pageScenicDetail" class="click-point" external>',
                '{@if item.main_img}', '<img class="mediastyle" src="${item.main_img}" style="display: inline-block;"/>',
                '{@else if !item.main_img}','',
                '{@/if}',
                '<div class="tab_content">',
                '<h3>${item.title}</h3>',
                '<span>${item.content.split(",")[0]}</span>',
                '</div>',
                '</a>',
                '<div class="ptimg" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img class="d_pic" src="images/u13.png"/></div>',
                '</div>',
                '</li>',
                '{@/each}'
            ].join('');
        },

        indexyouListTpl: function (data) {
            return ['{@each data as item}',
                '<li class="situation-box"> ',
                '<div class="situation-box-item">',
                '<a href="../service/tourism.html?id=${item.id}#pageyoudetailes" class="click-point" external>',
                '{@if item.img_path}',  '<img  class="mediastyle" id="tttu" src="${item.img_path.split(",")[0]}" />',
                '{@else if !item.img_path}','',
                '{@/if}',
                '<div class="tab2_content"><div>',
                '<div class="col-20">${item.username}</div>',
                '<div class="col-20">',
                '{@if item.sex==1}', '男',
                '{@else if item.sex==2}', '女',
                '{@/if}', '</div>',
                '<div class="col-20">${item.age}岁</div>',
                '</div>',
                '<div>',
                '<div class="col-60">${item.price}/天</div>',
                '<div class="col-60">${item.hours}小时</div>',
                '</div>',
                '<span>${item.content.split(",")[0]}</span>',
                '</div>',
                '{@if item.user_status==1}', '<div class="you_status"> 空闲</div>',
                '{@else if item.user_status==2}', '<div class="you_status2">忙碌</div>',
                '{@/if}',
                '{@if item.car_c==1}', '<div class="addcar">车+导</div>',
                '{@else if item.car_c==2}', ,
                '{@/if}',
                '</a></div></li>',
                '{@/each}'
            ].join('');

        },
    };

    tourism.tool = {
        ajax: function (url, data, context, type, delegate, error) {
            // data.ajax = 'gongnengji';
            var setting = {
                data: data,
                type: type,
                dataType: 'json',
                url: url,
                cache: false,
                success: function (d) {
                    if (d && d.data && d.data == 'no login') {
                        //location.href = tourism.config.loginUrl;
                        if($.device.os=="android"){
                            javascript:login.nologin();
                        }else if($.device.os=="ios"){
                            location.href = tourism.config.loginUrl;
                        }
                    } else {
                        delegate(d);
                    }
                },
                error: function (xhr, type) {
                    error(xhr, type);
                }
            };
            if (context) {
                setting.context = context;
            }
            $.ajax(setting);
        },
        validation: {
            isMobile: function (data) {
                if (!data || data === '') {
                    return true;
                }
                return /^\d{11}$/.test(data);
            },
            isPassword: function (data) {
                if (!data || data === '') {
                    return true;
                }
                return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,20}$/.test(data);
            },
            digits: function (data) {
                if (!data || data === '') {
                    return true;
                }
                return /^\d+$/.test(data);
            },
            integer: function (data) {
                if (!data || data === '') {
                    return true;
                }
                return /^(?:-?(?:0|[1-9][0-9]*))$/.test(data);
            },
            numeric: function (data) {
                if (!data || data === '') {
                    return true;
                }
                return !isNaN(parseFloat(data)) && isFinite(data);
            },
            grea02Decimal: function (data) {
                if (!data || data === '') {
                    return true;
                }
                return /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(data);
            }
        },
        currentPosition: {
            error: function (error) {
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
            updatePosition: function (position) {
                position.latitudeP = position.coords.latitude, /*纬度*/
                    position.longitudeP = position.coords.longitude, /*经度*/
                    position.accuracyP = position.coords.accuracy;
                /*准确度*/
            },
            getPosition: function () {
                if (navigator.geolocation) {
                    navigator.geolocation.watchPosition(tourism.tool.currentPosition.updatePosition,
                        tourism.tool.currentPosition.error);
                } else {
                    $.toast("浏览器无法获取您的位置信息！");
                }
            }
        }
    };

    tourism.index = {
        data: function () {
            var data = {};
            var criterias = [

                {
                    el: 'type',
                    pro: 'type',
                    type: 'btnRound'
                }, {
                    el: 'sell_param',
                    pro: 'params',
                    type: 'text'
                }, {
                    el: 'rent_pageNum',
                    pro: 'pageNum',
                    type: 'text'
                }, {
                    el: 'rent_pageSize',
                    pro: 'pageSize',
                    type: 'text'
                }, {
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

          datax: function() {
            var data = {};
                 var criterias = [
              
                 {
                    el: 'select_city2',
                    pro: 'city_id',
                    type: 'text'
                },{
                    el: 'select_area2',
                    pro: 'county_id',
                    type: 'text'
                }
            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },

        query: function () {
            // $.showPreloader();
            var data = tourism.index.data();
      
            if (debug) {
                console.log("index:");
                console.log(data);
            };
           
            if (1 == data.type) {
            data.pageNum=1;
            data.PageSize = 10;
            $("#pageRentContent .infinite-scroll-preloader").empty();
            $("#pageRentContent .infinite-scroll-preloader").append('<div class="preloader"></div>');
            tourism.tool.ajax(tourism.config.ScenicList, data, null, 'post', function (d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && tourism.config.constant['0003'] == d.data) {
                        $.alert(tourism.config.constant['0012']);
                        $("#queryList").empty();
                        $('#pageRentContent .infinite-scroll-preloader').html(tourism.config.constant['0012']);
                    } else if (d) {

                        var list = juicer(tourism.tpl.indexListTpl(), d);
                        $("#queryList").html(list);
                        $("#rent_pageNum").val(1);
                        $("#tab1 .infinite-scroll-preloader").html('');
                 
             

                    if ($("#queryList li").length<10) { 
                         $("#tab1 .infinite-scroll-preloader").empty(); 
                          return
                   }
              
                        $('#pageRentContent .infinite-scroll-preloader').empty();
                    }
                    $.hidePreloader();

                }, function (xhr, type) {
                    $('#pageRentContent .infinite-scroll-preloader').html(tourism.config.constant['0001']);
                    $.alert(tourism.config.constant['0001']);
                   
                });
            } else if (2 == data.type) {
                data.pageNum=1;
                data.PageSize = 10;
                $("#pageSellContent .infinite-scroll-preloader").empty();
                $("#pageSellContent .infinite-scroll-preloader").append('<div class="preloader"></div>'); 
                tourism.tool.ajax(tourism.config.travellist, data, null, 'post', function (d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && tourism.config.constant['0003'] == d.data) {
                        $.alert(tourism.config.constant['0012']);
                        $("#queryNeedList").empty();
                        $('#pageSellContent .infinite-scroll-preloader').html(tourism.config.constant['0012']);
                    } else if (d) {
                        // var page = d.data.page;
                        var list = juicer(tourism.tpl.indexyouListTpl(), d);
                        $("#queryNeedList").html(list);
                         $("#sell_pageNum").val(1);
                      $("#tab2 .infinite-scroll-preloader").html('');

                     if ($("#queryNeedList li").length<10) {
                       $("#tab2 .infinite-scroll-preloader").empty();
                                  return
                     }
                
                        $('#pageSellContent .infinite-scroll-preloader').empty();
                    }
                    $.hidePreloader();
                    // timer();
                }, function (xhr, type) {
                    $("#pageSellContent .infinite-scroll-preloader").html(tourism.config.constant['0001']);
                    $.hidePreloader();
                });
            }
        },
        detail: function (id) {
            var data = {
                info_id: id,

            };
            if (debug) {
                console.log(data);
            }
            $("#ScenicDetail_id").val(id);
            // $.showPreloader();
            tourism.tool.ajax(tourism.config.scenicDetail, data, null, 'post', function (d) {
                if (debug) {
                    console.log(d);
                }
                ;
                if (d && tourism.config.constant['0003'] == d.data) {
                    $.alert(tourism.config.constant['0004'], function () {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo('ScenicDetail_', d);
                    historyWatch(id, 1);
                    dianji();
                    userclick(id,1)
                    // var checkH=$.trim($("#checkH").val());
                    // if (checkH) {
                    //     historyWatch(id, type);
                    // };
                }
                $.hidePreloader();
            }, function (xhr, type) {
                $.toast(tourism.config.constant['0001'], function () {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
        youdetail: function (id) {
            var data = {
                info_id: id,

            };
            if (debug) {
                console.log(data);
            }
            $("#pageyoudetailes_id").val(id);
             // $.showPreloader();
            tourism.tool.ajax(tourism.config.tourismdaoDetail, data, null, 'post', function (d) {
                if (debug) {
                    console.log(d);
                }
                ;
                if (d && tourism.config.constant['0003'] == d.data) {
                    $.alert(tourism.config.constant['0004'], function () {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo1('pageyoudetailes_', d);
                    historyWatch(id, 2);
                    dianji();
                    userclick(id,2)
                }
                $.hidePreloader();
            }, function (xhr, type) {
                $.toast(tourism.config.constant['0001'], function () {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

        init:function(id) {

           
             
            var data = tourism.index.datax(); 

            if (debug) {
                console.log(data);
            }
            data['location'] = id;

            tourism.tool.ajax(tourism.config.findAd, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                }
                if (d && tourism.config.constant['0003'] == d.data) {
                    $.alert(tourism.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    // viewInfo(_field, d.data);
                     viewAd('Tourism_', d.data);
                 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(tourism.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

        }
    };


    //发布景区
    tourism.pubScenic = {
        data: function () {
            var pubScenicdatas = [{

                id: 'pubScenic_main_img',
                pro: 'main_img',
                eleType: 'txtCarImg',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }, {
                id: 'pubScenic_title',
                pro: 'title',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': tourism.config.constant['5001']
                    }
                }
            }, {
                id: 'pubScenic_show_status',
                pro: 'show_status',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }, {
                id: 'select_city',
                pro: 'city_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': tourism.config.constant['6002']
                    }
                }
            }, {
                id: 'select_area',
                pro: 'county_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': tourism.config.constant['6001']
                    }
                }
            }, {
                id: 'select_province',
                pro: 'province_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': tourism.config.constant['6003']
                    }
                }
            }, {
                id: 'pubScenic_location_x',
                pro: 'location_x',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }, {
                id: 'pubScenic_location_y',
                pro: 'location_y',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }

            }, {
                id: 'pubScenic_c_image',
                pro: 'c_image',
                eleType: 'txtCarImg4',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }, {
                id: 'pubScenic_c_context',
                pro: 'c_context',
                eleType: 'inputcontext',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }

            }, {
                id: 'pubScenic_c_url',
                pro: 'c_url',
                eleType: 'grounpurl',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }, {
                id: 'pubScenic_url_content',
                pro: 'url_content',
                eleType: 'grounpurl',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }
            ];

            var sc2=$('.sc-10').find('textarea').size();
               console.info(sc2);
                     for(var m=1;m<sc2+1;m++){
                     var s2=[
                          {
                     id: 'pubScenic_c_image'+m,
                     pro: 'c_image',
                     eleType: 'txtCarImg4',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'pubScenic_c_context'+m,
                     pro: 'c_context',
                     eleType: 'inputcontext',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 }
             ];
                 pubScenicdatas=pubScenicdatas.concat(s2);
            }
            return validationToValue(pubScenicdatas);
        },
        submit: function (status) {
            var data = tourism.pubScenic.data();
            if (debug) {
                console.log('pubScenic validation ' + '--> ');
                console.log(data);
            }
            if (data) {
                // var x = $('#pubScenic_location_x').val();
                // var y = $('#pubScenic_location_y').val();
                // if (x && y) {
                //     data.location_x = parseInt(Number(x).toFixed(6) * Math.pow(10, 6));
                //     data.location_y = parseInt(Number(y).toFixed(6) * Math.pow(10, 6));
                // } else {
                //     data.location_x = position.latitudeP;
                //     data.location_y = position.longitudeP;
                // }
                var data2 = {};
                for (var key in data) {
      
                    data2[key] = data[key];
        
                }
                data2['status'] = status;
                data2['c_image'] = data2['c_image'].substring(1);
                data2['c_context'] = data2['c_context'].substring(1);

                tourism.tool.ajax(tourism.config.pubScenic, data2, null, 'post', function (d) {
                    if (debug) {
                        console.log(d);
                    }

                    if (d.data && tourism.config.constant['0002'] == d.data) {
                        $.alert(tourism.config.constant['0004'], function () {
                            $.router.load("#pagePostChoose");
                        });
                    } else if (d.data) {
                        $.alert(tourism.config.constant['0005']);
                    }
                }, function (xhr, type) {
                    $.alert(tourism.config.constant['0001']);
                });
            }
        },

        eidt: function(id) {
            
            var data = {

                info_id: id,

            };

            tourism.tool.ajax(tourism.config.scenicDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && tourism.config.constant['0003'] == d) {
                     $.alert(tourism.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    console.log(d)
                    viewInit('pubScenic_', d);
                    
                }
            }, function(xhr, type) {
                $.toast(tourism.config.constant['0001']);
            });
        },

        update: function(status,id) {

            var data = tourism.pubScenic.data();
            if (data) {
                // var x = $('#pubScenic_location_x').val();
                // var y = $('#pubScenic_location_y').val();
                // if (x && y) {
                //     data.location_x = x * Math.pow(10, 6);
                //     data.location_y = y * Math.pow(10, 6);
                // } else {
                //     data.location_x = position.latitudeP;
                //     data.location_y = position.longitudeP;
                // }
                var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
               data2['status'] = status;
               data2['scenic_id'] = id;
               data2['c_image'] = data2['c_image'].substring(1);
               data2['c_context'] = data2['c_context'].substring(1);
                if (debug) {
                    console.log('pubScenic update validation ' + '--> ');
                    console.log(data2);
                }
                tourism.tool.ajax(tourism.config.changescenic, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d.data);
                    };
                    if (d.data && tourism.config.constant['0002'] == d.data) {
                        $.alert(tourism.config.constant['0004'],function(){
                            $.router.back();
                        });
                    } else if (d.data) {
                        $.alert(tourism.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(tourism.config.constant['0001']);
                });
            }
        },

        // init: function () {
        //     var id = $("#pubScenic_id").val();
        //     if (id) {
        //     tourism.pubZPeopleService.eidt(id);
        //     }
        // }
    };


    //发布陪游
    tourism.pubCarFindPeople = {
        data: function () {
            var pubCarFindPeopledatas = [
                {
                    id: 'tu_wen_c_image',
                    pro: 'c_image',
                    eleType: 'txtCarImg1',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'tu_wen_c_context',
                    pro: 'c_context',
                    eleType: 'inputcontext',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_username',
                    pro: 'username',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7003']
                        }
                    }
                }, {
                    id: 'you_age',
                    pro: 'age',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7004']
                        }
                    }
                }, {
                    id: 'you_sex',
                    pro: 'sex',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7005']
                        }
                    }
                }, {
                    id: 'you_price',
                    pro: 'price',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7006']
                        }
                    }
                }, {
                    id: 'you_telephone',
                    pro: 'telephone',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7007']
                        },
                        'isMobile': {
                            'is': true,
                            'msg': tourism.config.constant['4001']
                        }
                    }
                }, {
                    id: 'you_hours',
                    pro: 'hours',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7008']
                        }
                    }
                }, {
                    id: 'you_configure',
                    pro: 'configure',
                    eleType: 'requireDanger',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7009']
                        }
                    }
                }, {
                    id: 'you_citys_th',
                    pro: 'place',
                    eleType: 'grounpurl1',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': tourism.config.constant['7010']
                        }
                    }
                }, {
                    id: 'jing_img_c_image',
                    pro: 'place_img',
                    eleType: 'txtCarImg2',
                    valids: {
                        'require': {
                            'is': false,
                            'msg':''
                        }
                    }
                }, {
                    id: 'you_place_context',
                    pro: 'place_context',
                    eleType: 'inputcontext2',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'car_img_c_image',
                    pro: 'car_img',
                    eleType: 'txtCarImg3',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_car_context',
                    pro: 'car_context',
                    eleType: 'inputcontext3',
                    valids: {
                        'require': {
                            'is': false,
                            'msg':''
                        }
                    }
                }, {
                    id: 'you_car_brand',
                    pro: 'brand',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_car_cate',
                    pro: 'category',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_car_price',
                    pro: 'car_price',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_car_hours',
                    pro: 'car_hours',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg':''
                        }
                    }
                }, {
                    id: 'you_message',
                    pro: 'message',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'select_province3',
                    pro: 'province_id',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7020']
                        }
                    }
                }, {
                    id: 'select_city3',
                    pro: 'city_id',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7021']
                        }
                    }
                }, {
                    id: 'select_area3',
                    pro: 'county_id',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7022']
                        }
                    }
                }, {
                    id: 'you_location_x',
                    pro: 'location_x',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_location_y',
                    pro: 'location_y',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_car_c',
                    pro: 'car_c',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7023']
                        }
                    }
                }]; 

            var sc3=$('.sc-11').find('textarea').size();
               console.info(sc3);
                     for(var x=1;x<sc3+1;x++){
                     var s3=[
                          {

                     id: 'tu_wen_c_image'+x,
                     pro: 'c_image',
                     eleType: 'txtCarImg1',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'tu_wen_c_context'+x,
                     pro: 'c_context',
                     eleType: 'inputcontext',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 }
             ];
                 pubCarFindPeopledatas=pubCarFindPeopledatas.concat(s3);
            }

            var sc4=$('.sc-12').find('textarea').size();
               console.info(sc4);
                     for(var y=1;y<sc4+1;y++){
                     var s4=[
                          {
                     id: 'jing_img_c_image'+y,
                     pro: 'place_img',
                     eleType: 'txtCarImg2',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'you_place_context'+y,
                     pro: 'place_context',
                     eleType: 'inputcontext2',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 }
             ];
                 pubCarFindPeopledatas=pubCarFindPeopledatas.concat(s4);
            }

              var sc5=$('.sc-13').find('textarea').size();
               console.info(sc5);
                     for(var z=1;z<sc5+1;z++){
                     var s5=[
                          {
                     id: 'car_img_c_image'+z,
                     pro: 'car_img',
                     eleType: 'txtCarImg3',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'you_car_context'+z,
                     pro: 'car_context',
                     eleType: 'inputcontext3',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 }
             ];
                 pubCarFindPeopledatas=pubCarFindPeopledatas.concat(s5);
            }

            return validationToValue(pubCarFindPeopledatas);
        },
        submit: function (status) {
            var data = tourism.pubCarFindPeople.data();
            if (debug) {
                console.log('pubCarFindPeople validation ' + '--> ');
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

                    data2[key] = data[key];
                }
                data2['status'] = status;
                data2['c_image'] = data2['c_image'].substring(1);
                data2['c_context'] = data2['c_context'].substring(1);
                data2['place_img'] = data2['place_img'].substring(1);
                data2['place_context'] = data2['place_context'].substring(1);
                data2['car_img'] = data2['car_img'].substring(1);
                data2['car_context'] = data2['car_context'].substring(1);
                
               
                tourism.tool.ajax(tourism.config.pubCarFindPeople, data2, null, 'post', function (d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && tourism.config.constant['0002'] == d.data) {
                        $.alert(tourism.config.constant['0004'], function () {
                            $.router.load("#pagePostChoose");
                        });
                    } else if (d.data) {
                        $.alert(tourism.config.constant['0005']);
                    }
                }, function (xhr, type) {
                    $.alert(tourism.config.constant['0001']);
                });
            }
        },

      eidt: function(id) {
            
            var data = {

                info_id: id,

            };

            tourism.tool.ajax(tourism.config.tourismdaoDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && tourism.config.constant['0003'] == d) {
                     $.alert(tourism.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    console.log(d)
                    viewInit('you_', d);
                    
                }
            }, function(xhr, type) {
                $.toast(tourism.config.constant['0001']);
            });
        },

        update: function(status,id) {

            var data = tourism.pubCarFindPeople.data();
            if (data) {
                // var x = $('#you_location_x').val();
                // var y = $('#you_location_y').val();
                // if (x && y) {
                //     data.location_x = x * Math.pow(10, 6);
                //     data.location_y = y * Math.pow(10, 6);
                // } else {
                //     data.location_x = position.latitudeP;
                //     data.location_y = position.longitudeP;
                // }
                var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
               data2['status'] = status;
               data2['guide_id'] = id;
               data2['c_image'] = data2['c_image'].substring(1);
               data2['c_context'] = data2['c_context'].substring(1);
                if (debug) {
                    console.log('pubCarFindPeople update validation ' + '--> ');
                    console.log(data2);
                }
                tourism.tool.ajax(tourism.config.changeguide, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d.data);
                    };
                    if (d.data && tourism.config.constant['0002'] == d.data) {
                        $.alert(tourism.config.constant['0004'],function(){
                            $.router.back();
                        });
                    } else if (d.data) {
                        // $.alert(tourism.config.constant['0005']);

                    }
                }, function(xhr, type) {
                    $.alert(tourism.config.constant['0001']);
                });
            }
        },

        // init: function () {
        //     var id = $("#pubCarFindPeople_id").val();
        //     if (id) {
        //         tourism.pubCarFindPeople.eidt(id);
        //     }
        // }
    };
  
    $(document).on("pageInit", function(e, pageId, $page) {
              // $.showPreloader('正在定位中')
              //   setTimeout(function () {
              //   }, 2000);
                var url = location.search; //获取url中"?"符后的字串
                var strs = url.substr(1);
                var id=strs.split("=")[1];
             

        if (pageId == "pageIndex") {
            tourism.index.query();
            tourism.index.init(18);
       $(function () {
        $("#btnQuery").click(function () {
            tourism.index.query();
        });

        $("#service_c").click(function () {
            $("#service_c").attr("check", true);
            $("#need_c").attr("check", false);
             var pageNum = $("#rent_pageNum").val(1);
            // $.attachInfiniteScroll($('.infinite-scroll').eq(1))
            tourism.index.query();
        });
        $("#need_c").click(function () {
            $("#service_c").attr("check", false);
            $("#need_c").attr("check", true);
            var pageNum = $("#sell_pageNum").val(1);
            // $.attachInfiniteScroll($('.infinite-scroll').eq(0))
            tourism.index.query();
        });
        });      
        } else if(pageId == "pageScenicDetail"){
            tourism.index.detail(id); 
        }else if(pageId == "pageyoudetailes"){
            tourism.index.youdetail(id); 
        }else if (pageId == "pagepubScenic") {
              if (id) {
            tourism.pubScenic.eidt(id);
            } 
        }else if (pageId == "pagePostDemand") {
              if (id) {
            tourism.pubCarFindPeople.eidt(id);
            } 
        }
    });
$.init();

    $(function () {

        $("#btnPubScenic").click(function () {
          var id = $("#pubScenic_id").val();
         if (id) {
            tourism.pubScenic.update(1,id);
         }else{
            tourism.pubScenic.submit(1);
          }
        });
        $("#btnSaveScenic").click(function () {
            var id = $("#pubScenic_id").val();
         if (id) {
            tourism.pubScenic.update(3,id);
         }else{
            tourism.pubScenic.submit(3);
            }
        });
        $("#btnyousave").click(function () {
            var id = $("#you_id").val();
        if (id) {
            tourism.pubCarFindPeople.update(3,id);
         }else{
            tourism.pubCarFindPeople.submit(3);
          }
        });
        $("#btnyoufabu").click(function () {
            var id = $("#you_id").val();
         if (id) {
            tourism.pubCarFindPeople.update(1,id);
         }else{
            tourism.pubCarFindPeople.submit(1);
          }
        });
  

    });

});





 $(function(){
        "use strict";
    var tabIndex;
    var loading = false;
    $(document).on('infinite',function() {

      if($(this).find('.infinite-scroll.active').attr('id') == "tab1"){
         tabIndex = 0;
     
        if (loading || $("#queryList li").length < 10) {
            return
        }
        
        
        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#rent_pageNum").val();
            if (pageNum == 1) {
                $('#pageRentContent .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
            }
            $("#rent_pageNum").val(++pageNum);
             var param = tourism.index.data();
            param.pageNum = pageNum;
            param.pageSize = 10;
            tourism.tool.ajax(tourism.config.travellist, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };

                                    if (d.totalPage > param.pageNum) {
                           
                             var list = juicer(tourism.tpl.indexListTpl(), d);
                            $("#queryList").append(list);
 
                        }
                        else if(d.totalPage == param.pageNum){
                            var list = juicer(tourism.tpl.indexListTpl(), d);
                            $("#queryList").append(list);
                            $("#tab1 .infinite-scroll-preloader").empty();
                            $("#tab1 .infinite-scroll-preloader").html(tourism.config.constant['0014']);
                           // $.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
                           return
                      }
            }, function(xhr, type) {
                $.alert(tourism.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);

}

   if($(this).find('.infinite-scroll.active').attr('id') == "tab2"){
      tabIndex = 1;

        if (loading || $("#queryNeedList li").length < 10) {
            return
        }
        

        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#sell_pageNum").val();
            if (pageNum == 1) {
                $('#pageSellContent .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
            }
            $("#sell_pageNum").val(++pageNum);
           var param = tourism.index.data();
            param.pageNum = pageNum;
            param.pageSize = 10;
            tourism.tool.ajax(tourism.config.travellist, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
 
                        if (d.totalPage > param.pageNum) {
                           
                             var list = juicer(tourism.tpl.indexyouListTpl(), d);
                            $("#queryNeedList").append(list);
 
                        }
                        else if(d.totalPage == param.pageNum){
                            var list = juicer(tourism.tpl.indexyouListTpl(), d);
                            $("#queryNeedList").append(list);
                            $("#tab2 .infinite-scroll-preloader").empty();
                            $("#tab2 .infinite-scroll-preloader").html(tourism.config.constant['0014']);
                           // $.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
                           return
                      }
            }, function(xhr, type) {
                $.alert(tourism.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
      } 
    });
  });


var itemIcon = function (item) {
    var icon = getRequires(item.info_type, item.require);
    icon += getPriceType(item.info_type, item.price_type);
    icon += getSex(item.sex);
    return icon;
}

var pubItemIcon = function (item) {
    var icon = '';
    icon += '<span class="icon pos-r rup-icon" onclick="rupPublish(' + item.type + ',' + item.id + ')"></span>';
    icon += '<a class="icon icon-share pos-share alert-text" style="margin-right: 0.2rem;"></a>';
    icon += getPriceType(item.type, item.price_type);
    return icon;
}


function collectItem(e, info_id, info_type) {
    var $star = $(e);
    var add;
    var remove;
    var data = {
        info_id: $('#' + info_id).val(),
        info_type: info_type
    };
    tourism.tool.ajax(tourism.config.storeinfo, data, null, 'post', function (d) {
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
        $.alert(tourism.config.constant['0001']);
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
    tourism.tool.ajax(tourism.config.reportinfo, data, null, 'post', function (d) {
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
    },function(xhr, type) {
        add = 'jbstart-line';
        remove = 'jbstart-fill';
        reportIcon($star, add, remove);
        $.alert(tourism.config.constant['0001']);
    });
}

function historyWatch(info_id, info_type,panduan) {
    var data = {
        'info_id': info_id,
        'info_type': info_type
    }
      tourism.tool.ajax(tourism.config.isreport, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && tourism.config.constant['0003'] == d.data) {
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
                $.toast(tourism.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });


             tourism.tool.ajax(tourism.config.isstore, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && tourism.config.constant['0003'] == d.data) {
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
                $.toast(tourism.config.constant['0001'], function() {
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


var indexquery = true;


function getRequire(type) {
    if (1 == type) {
        return '需出门票';
    } else if (2 == type) {
        return '过路停车费';
    } else if (3 == type) {
        return '需提供早餐';
    } else if (4 == type) {
        return '需提供中餐';
    } else if (5 == type) {
        return '需提供晚餐';
    } else if (6 == type) {
        return '车内禁吸烟';
    } else if (7 == type) {
        return '禁止醉酒';
    } else if (8 == type) {
        return '无强制消耗';
    }
}


$(document).on('click','.diming', function () {
   $(".queding").css("display","block");
   $(".fade").css("display","block");
});

function closeWindow(){
   $(".queding").css("display","none");
   $(".fade").css("display","none");
}

$(document).on('click','.queding_btn',function(){
    var content=$('.neirong').val();
    if (!content) {
       $.alert("地名不能为空！");
        return false;
    };
    $('.comment').append("<span name='you_citys_th'>"+content+"<img src='images/tuichu.png' onclick='removeAddLable(this)'/>"+"</span>")
   $('.neirong').val('')
   $(".queding").css("display","none");
   $(".fade").css("display","none");
});


function removeAddLable(lable){
    var $close = $(lable);
    $close.parent().remove();
}


$(document).on('click','.addlianjie', function () {
   
   $(".lianjie_bianji").css("display","block");
   $(".fade").css("display","block");
});


$(document).on('click','.queding_btn1',function(){
    var neirong_dizhi=$('.neirong_dizhi').val();
    var neirong_mingcheng=$('.neirong_mingcheng').val();
    if (!neirong_dizhi) {
       $.alert("链接地址不能为空！");
        return false;
    };
    if (!neirong_mingcheng){
       $.alert("链接名称不能为空！");
        return false;
    };
   $('.comment1').append("<div><p name='pubScenic_c_url'>"+neirong_dizhi+"</p><p name='pubScenic_url_content'>"+neirong_mingcheng+"</p><img onclick='removeAddLable(this)' src='images/lianjie_img.png' /></div>")
   $('.neirong_dizhi').val('');
   $('.neirong_mingcheng').val('');
   $(".lianjie_bianji").css("display","none");
   $(".fade").css("display","none");
});

function closeWindow1(){
   $(".lianjie_bianji").css("display","none");
   $(".fade").css("display","none");
}




function dianji(info_type) {
  
    var data = {
        'info_type': 18
    }
      tourism.tool.ajax(tourism.config.click, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
              if (d.data && tourism.config.constant['0002'] == d.data) {
            
                    }  
            }, function(xhr, type) {
                $.toast(tourism.config.constant['0001'], function() {
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
      tourism.tool.ajax(tourism.config.userclick, data, null, 'post', function(d) {

        if (d.data && tourism.config.constant['0002'] == d.data) { 
          }
            }, function(xhr, type) {
                $.toast(tourism.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
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

$("#select_area2").change(function(){
  tourism.index.query();
  tourism.index.init(18);
})