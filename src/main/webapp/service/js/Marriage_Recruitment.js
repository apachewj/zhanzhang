window.marriage = window.marriage || {};
var baseUrl = 'http://localhost:8080';
var filedate=marriage;
var uploaddebug = true;
var test=false;

var debug = false;



+ function($) {
    "use strict";

    window.marriage = window.marriage || {};

    var baseUrl = 'http://localhost:8080';


    marriage.config = {
        baseUrl: '',
        loginUrl: baseUrl + '/service/zhuce.html',
        pubScenic: baseUrl + '/user/marry/add_Marry',
        uploadFile: baseUrl + '/uploadFile',
        MarryList: baseUrl + '/user/marry/Marry_List',
        marriageDetail:baseUrl + '/user/marry/Marry',
        pubJob:baseUrl + '/user/marry/add_Findwork',
        jobList: baseUrl + '/user/marry/Findwork_List',
        jobDetail:baseUrl + '/user/marry/Findwork',
        pubRecruit:baseUrl + '/user/marry/add_Findworker',
        recruitList: baseUrl + '/user/marry/Findworker_List',
        recruitDetail:baseUrl + '/user/marry/Findworker',
        reportinfo: baseUrl + '/user/report',
        storeinfo: baseUrl + '/user/store',
        isreport: baseUrl + '/user/showreport',
        isstore: baseUrl + '/user/showstore',
        pubJobUpdate:baseUrl + '/user/marry/change_Findwork',
        pubRecruitUpdate:baseUrl + '/user/marry/change_Findworker',
        pubScenicUpdate:baseUrl + '/user/marry/change_Marry',
         click: baseUrl +'/click',
         userclick: baseUrl +'/user/click',
         findAd: baseUrl + '/findAd',
         identify:baseUrl + '/doapp_identify',
        
        
        
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
            '5001': '请输入昵称',
            '5002': '请输入省',
            '5003': '请输入市',
            '5004': '请输入区',
            '5005': '请选择性别',
            '5006': '请填写真实姓名',
            '5007': '请填写出生地',
            '5008': '请填写居住地',
            '5009': '请填写身份证号',
            '5010': '请上传身份证照',
            '5011': '请填写手机号',
            '5012': '请填写验证码',
            '6001': '请输入省',
            '6002': '请输入市',
            '6003': '请输入区',
            '6004': '举报成功!',
            '7000':'1001',
            '7001':'1010',
            '7002':'1003',
            '7003':'1023',
            '7004':'1024',
            '7005':'1002',
            '7006':'1025',
            '7007':'1026',
            '7008':'1002',

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
            '8001': '请填写公司名称！',
            '8002': '请填写行业！',
            '8003': '请填写验证码！',




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

    window.marriage = window.marriage || {}; 

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
                 if (!marriage.tool.validation.grea02Decimal(value)) {
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
                 if (!marriage.tool.validation.isMobile(value)) {
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
                 if (!marriage.tool.validation.digits(value)) {
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
     var valu="";
     var valu1="";
     var valu2="";
     var imgvalu="";
     for (var i = 0; i < arrData.length; i++) {
         var item = arrData[i];
         var value = '';
         if ('input' === item.eleType) {
             value = $("#" + item.id).val();
         }else if ('inputsel' === item.eleType) {
             value = $("#" + item.id).val().split(",")[0];
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
         }else if ('radio' === item.eleType) {
             var round = $("input[name='" + item.id + "'][check='true']");
                     value = $(round).attr('data-pub');
         } else if ('confDanger' === item.eleType) {
                var confs = $("span[name='" + item.id + "'][check='true']");
                $.each(confs, function(i, e) {
                    if (i == 0) {
                        value = $(e).attr('data-conf');
                    } else {
                        value += "," + $(e).attr('data-conf');
                    }
                });
                if (debug) {
                    console.log(value);
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
         }  else if ('img' === item.eleType) {
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
         } else if ('txtCarImg'=== item.eleType) {
               if ($("#" + item.id).find('img').attr("src")){
                imgvalu=imgvalu + ","+$("#" + item.id).find('img').attr("src");
               value=imgvalu;
            }
           }
 
         else if ('inputsel1'=== item.eleType) {
  
             valu = valu + "," +$("#" + item.id).val().split(",")[0];
             value=valu;
         }else if ('inputsel2'=== item.eleType) {
          
                     valu1 = valu1 + "," +$("#" + item.id).val().split(",")[0];
                     value=valu1;
    
         }else if ('inputsel3'=== item.eleType) {
            
                     valu2 = valu2 + "," +$("#" + item.id).val().split(",")[0];
                     value=valu2;
     
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
          if(key == 'choice'){
               var el = $("#" + _m + 'configure');
               
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
          
          if(key == 'img'){
            // var el = $("#" + _m + key);

                 var value = $.trim(data[key]);
             var imgs = value.split(',');
                if (imgs && imgs.length > 0 && imgs[0] != '') {
                    var list = document.getElementById(_m + 'img' + '_List');
               
                    $.each(imgs, function(i, e) {
                        var ipot=e.lastIndexOf(".");
                        var type=fileType(e.substring(ipot+1)); 
                        if (type=='image') {
                            showImgs(list, "" + _m + 'img' , e);
                        } 
                    });
                }

          }
          if(key == 'imgs'){
            // var el = $("#" + _m + key);

                 var value = $.trim(data[key]);

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

            if(value){
            $('.wone').attr('src',imgs[0]);
           }else{
             $('.wone').attr('src','images/u17.png');
            }
           
          }

           if(key == 'backimg'){
             var value = $.trim(data[key]);
            if(value){
            $('.wola').attr('src',value);
           }else{
             $('.wola').attr('src','images/u190.jpg');
            }


          }

                   if(key == 'idimgs'){
                 var value = $.trim(data.idimgs);
                 var idimgs = value.split(',');
                 
                 var html=[];
                
                    if (idimgs && idimgs.length > 0 && idimgs[0] != '') {
                                                
                    $.each(idimgs, function(i, e) {
                     var ipot=e.lastIndexOf(".");
                     var type=fileType(e.substring(ipot+1)); 
               
                   html.push('<img src="' + e + '" style="width: 50%;height:4rem;" />')
             
                         });
       
                
                     }
                     var list = $('.qq');
                   
       
                    list.empty();
                 
                    if (html.length > 0) {
                        list.html(html.join(''));
                        
                    }
        
          
             
  
          }

          if(key == 'diqu'){

                 var region_p_default='';
                 var region_c_default = '';
                 var region_d_default ='';
            
                  var k=0;
                       
                 region_p_default= $.trim(data.diqu[k].province_id);
                 region_c_default = $.trim(data.diqu[k].city_id);
                 region_d_default = $.trim(data.diqu[k].county_id);

                if(region_p_default&&region_c_default&&region_d_default){
                   region_initx("select_province2","select_city2","select_area2",region_p_default,region_c_default,region_d_default);
                 }

                  var j = 5;
                for(i=1;i<data.diqu.length;i++){

                        region_p_default= $.trim(data.diqu[i].province_id);
                         region_c_default = $.trim(data.diqu[i].city_id);
                         region_d_default = $.trim(data.diqu[i].county_id);
                         
                           j++;
                           var html='<li class="detail-li ">'; 
                           html+='<a class="item-content ">';
                           html+='<div class="item-inner ">';
                           html+='<div class="item-text quyu-select"> ';
                           html+='<div class="row xianshi-row">';
                           html+='<div class="col-33 sc-1">';                                                                        
                           html+='<select  name="province"  id="select_province'+ j +'" eleType="input"></select> </div> ';
                           html+='<div class="col-33">';
                           html+='<select   name="city"  id="select_city'+ j +'" eleType="input"></select> </div>';
                           html+='<div class="col-33">';
                           html+='<select   name="street"  id="select_area'+ j +'" eleType="input"></select></div> ';
                           html+='</div></div></div></a></li>';                   
                          $("#thisquyu").append(html);

                         if(region_p_default&&region_c_default&&region_d_default){
                             region_initx("select_province"+j,"select_city"+j,"select_area"+j,region_p_default,region_c_default,region_d_default);
                      }
                }             
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
                 }

            else if (eleType === 'btnRound') {
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
             

         var html = [];

            for(var i=0;i<data.diqu.length;i++ ) {
                 html.push('<div class="row" style="font-size: .65rem"><div class="col-33" style="width: 30%;">'+data.diqu[i].province_name+'</div><div class="col-33" style="width: 28%;"><div class="equip-content">'+data.diqu[i].city_name+'</div> </div><div class="col-33" style="width: 28%;"><div class="equip-content" >'+data.diqu[i].county_name+'</div></div></div>');
  
            }
            var list = $('#quyushuzu');
        
            list.empty();
           
          
            if (html.length > 0) {
                list.html(html.join(''));
             }

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
             }else if (eleType === 'requireDanger') {
                var requires = value.split(',');
                var rqh=[];
                for (var i = 0; i < requires.length; i++) {
                    if (i%4==0) {
                        rqh.push('<div class="row">');
                    }
                    if (requires[i]=='') {
                        rqh.push('');
                    }else{
                      rqh.push('<div class="col-25"><span name="carFindPeople_require" data-require="'+requires[i]+'"  class="button button-danger" >'+getoptionRequire(requires[i])+'</span> </div>');  
                    }
                    if ((i+1)%4==0) {
                        rqh.push('</div>');
                    }
                }
                $(el).html(rqh.join('')); 
             }else if (eleType === 'sex' || !eleType) {
                 
                 if (1==value) {
                    $(el).html('男');
                 }else if (2==value) {
                    $(el).html('女');
                 }else if (3==value) {
                    $(el).html('保密');
                 }
             }
             else if (eleType === 'telVew') {
                $(el).html(value);
                $("#" + _m + "showtel").attr('href', 'tel:' + value);
                
            }
             else if (eleType === 'isimg' || !eleType) {
                 
                 if (value) {
                    $(el).html('<img class="col-100" src="'+data.img.split(',')[0]+'" / >');
                 }else if (!value) {
                    $(el).html('');
                 }
             }
              else if (eleType === 'showcontact' || !eleType) {
                 var html = [];
                 if (1==value) {
                     $(el).html('<img class="contact" src="images/tong_btn_d_xslx.png">');
                 }else if (0==value) {
                    $(el).html('');
                 }
             } else if (eleType === 'showtelephone' || !eleType) {
                 var html = [];
                 if (1==value) {
                    $(el).html('<img class="contact" src="images/tong_btn_d_dh.png">')
                 }else if (0==value) {
                    $(el).html('');
                 }
             }

         }

         

    };
   
           var viewInfo2 = function(_m, data) {
              
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
                                     html.push('<div class="swiper-slide"><img src="' + e + '" alt="" style="width: 100%" ></div>');
                                 } 
                             });
                             if (html.length > 0) {
                                 list.html(html.join(''));
                             }
                         }

                     }else if (eleType === 'requireDanger') {
                        var requires = value.split(',');
                        var rqh=[];
                        for (var i = 0; i < requires.length; i++) {
                            if (i%4==0) {
                                rqh.push('<div class="row">');
                            }
                            if (requires[i]=='') {
                                rqh.push('');
                            }else{
                              rqh.push('<div class="col-25"><span name="carFindPeople_require" data-require="'+requires[i]+'"  class="button button-danger" >'+getoptionRequire(requires[i])+'</span> </div>');  
                            }
                            if ((i+1)%4==0) {
                                rqh.push('</div>');
                            }
                        }
                        $(el).html(rqh.join('')); 
                     }else if (eleType === 'sex' || !eleType) {
                         
                         if (1==value) {
                            $(el).html('男');
                         }else if (2==value) {
                            $(el).html('女');
                         }else if (3==value) {
                            $(el).html('保密');
                         }
                     }else if (eleType === 'telVew') {
                      $(el).html(value);
                     $("#" + _m + "showtel").attr('href', 'tel:' + value);
                
                     } else if (eleType === 'showcontact' || !eleType) {
                         var html = [];
                         if (1==value) {
                             $(el).html('<img class="contact" src="images/tong_btn_d_xslx.png">');
                         }else if (0==value) {
                            $(el).html('');
                         }
                     } else if (eleType === 'showtelephone' || !eleType) {
                         var html = [];
                         if (1==value) {
                            $(el).html('<img class="contact" src="images/tong_btn_d_dh.png">')
                         }else if (0==value) {
                            $(el).html('');
                         }
                     } 
                 }
         }
    var viewInfo3 = function(_m, data) {

       
         for (var key in data) {
             var el = $("#" + _m + key);
             var eleType = $(el).attr('eleType');
             var value = $.trim(data[key]);
   
             if (eleType === 'input' || !eleType) {
                 $(el).html(value);
             } 

             if (key === 'imgs') {
                 
                  var imgs = value.split(',');
                if (imgs && imgs.length > 0 && imgs[0] != '') {
                    var list = $('#' + _m + key + '_List');
                    list.empty();
                    var html = [];
                    $.each(imgs, function (i, e) {
                        var ipot = e.lastIndexOf(".");
                        var type = fileType(e.substring(ipot + 1));
                        if (type == 'image') {
                            html.push('<img src="' + e + '" alt="" style="width:3.5rem;height:3.5rem;border-radius:50%;margin:0 0 0 .6rem">')
                        } 
                    });

                            var list = $('#MarriageDetail_show_img_List');
       
                              list.html(html.join(''));
                   
                }
  
             }
             else if (key === 'age') {
                if(value){
                $('#MarriageDetail_age').html(value +'岁');
                }else{
                $('#MarriageDetail_age').html('');
                }

             }else if (key === 'high') {
                if(value){
                $('#MarriageDetail_high').html(value +'cm');
                }else{
                $('#MarriageDetail_high').html('');
                }

             }else if (key === 'weight') {
                if(value){
                $('#MarriageDetail_weight').html(value +'kg');
                }else{
                $('#MarriageDetail_weight').html('');
                }

             }else if (key === 'idcard') {
                if(value){
                $('#MarriageDetail_xx').show();
                }else{
                $('#MarriageDetail_xx').hide();
                }

             }else if (key === 'tel') {
                if(value){
                $('#MarriageDetail_yy').show();
                }else{
                $('#MarriageDetail_yy').hide();
                }

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
                         } else if(type=='video'){ 
                             html.push('<div class="swiper-slide"><video src="'+e+'" width="100%" controls="controls"></video></div>')
                         } 
                     });
                     if (html.length > 0) {
                         list.html(html.join(''));
                     }
                 }
             } 
         }
         if($('#MarriageDetail_sex').html() == 1 ){
            $('#MarriageDetail_sex').html("男");
          }else if($('#MarriageDetail_sex').html() == 2){
          $('#MarriageDetail_sex').html("女");
         };

         if($('#MarriageDetail_house').html()==1){
          $('#MarriageDetail_house').html("已购");
          }else if($('#MarriageDetail_house').html()==2){
          $('#MarriageDetail_house').html("未购");
         };

         if($('#MarriageDetail_car').html()==1){
          $('#MarriageDetail_car').html("已购");
          }else if($('#MarriageDetail_car').html()==2){
          $('#MarriageDetail_car').html("未购");
         };

         if($('#MarriageDetail_smoke').html()==1){
          $('#MarriageDetail_smoke').html("经常");
          }else if($('#MarriageDetail_smoke').html()==2){
          $('#MarriageDetail_smoke').html("偶尔");
      }else if($('#MarriageDetail_smoke').html()==3){
          $('#MarriageDetail_smoke').html("不抽");
         };

          if($('#MarriageDetail_drink').html()==1){
          $('#MarriageDetail_drink').html("经常");
          }else if($('#MarriageDetail_drink').html()==2){
          $('#MarriageDetail_drink').html("偶尔");
          }else if($('#MarriageDetail_drink').html()==3){
          $('#MarriageDetail_drink').html("不抽");
         };

          if($('#MarriageDetail_ismarried').html()==1){
          $('#MarriageDetail_ismarried').html("未婚");
          }else if($('#MarriageDetail_ismarried').html()==2){
          $('#MarriageDetail_ismarried').html("已婚");
          }else if($('#MarriageDetail_ismarried').html()==3){
          $('#MarriageDetail_ismarried').html("离婚");
          }else if($('#MarriageDetail_ismarried').html()==0){
          $('#MarriageDetail_ismarried').html(" ");
         };

    };

    var viewInfo4= function(_m, data) {
         for (var key in data) {
             var el = $("#" + _m + key);
             var eleType = $(el).attr('eleType');
             var value = $.trim(data[key]);
   
             if (key === 'imgs') {
                 
                  var imgs = value.split(',');
                if (imgs && imgs.length > 0 && imgs[0] != '') {
                    var list = $('#' + _m + key + '_List');
                    list.empty();
                    var html = [];
                    $.each(imgs, function (i, e) {
                        var ipot = e.lastIndexOf(".");
                        var type = fileType(e.substring(ipot + 1));
                        if (type == 'image') {
                            html.push('<img src="' + e + '" alt="" style="width:3.6rem;height:3.6rem;border-radius:50%;margin:0 0 0 1.7rem">')
                            
                        } 
                    });
        
                     var list = $('#MarriageDetail_show_img_List1');
                
                      list.html(html[0]);
                   
                }
  
             }
         }

 }


     var viewInfo5= function(_m, data) {
          var html = [];
        if (data) {
            html.push('<img src="' + data + '" alt="" style=" height: 8rem;width: 100%;">'); 
        }else{
            html.push('<img src="images/u190.jpg" alt="" style=" height: 8rem;width: 100%;">'); 
        }
        
            var list2 = $('#MarriageDetail_show_img_List2');
        
            list2.empty();
           
          
            if (html.length > 0) {
                list2.html(html.join(''));
            
            }
 }


    
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
                }if (els[i].type == 'textsel') {
                    var ret = $("#" + els[i].el).val().split(",")[0];
                    if ('0' != ret) {
                        data[els[i].pro] = ret;
                    }
                }
                if (els[i].type == 'btnRound') {
                    var round = $("input[name='" + els[i].el + "'][check='true']");
              
                 
                            data[els[i].pro] = round.attr('data-pub');
                       
                
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

    marriage.tpl = {
         indexListTpl: function(data) {

            return ['{@each data as item}',
                    '<div class="situation-box1">',
                    '<div class="situation-box-item situation-box-objecitem " >',
                     '{@if item.imgs}',  '<a class="click-point"  href="../service/Marriage_Recruitment.html?id=${item.id}#pageObjectIntroduction">',
                    '<img class="round_pic" src="${item.imgs.split(",")[0] }" />',
                    '{@if item.sex==1}', '<div class="sex_pic"><img src="images/zdx_img_xb_ns.png" /></div>', 
                    '{@else if item.sex==2}', '<div class="sex_pic"><img src="images/zdx_img_xb_nx.png" /></div>',
                    '{@/if}',
                    '</a>',
                    '{@else if !item.imgs}', '',
                    '{@/if}',
                   
                    '<div class="ituation-box-item_content">',
                    '<a class="click-point"  href="../service/Marriage_Recruitment.html?id=${item.id}#pageObjectIntroduction">',
                    '<h5>${item.nickname}', 
                    '{@if item.idcard}', '<img src="images/zdx_img_sfz.png">', 
                    '{@else if !item.idcard}', '',
                    '{@/if}',
                    '{@if item.tel}', '<img src="images/zdx_img_sj.png">', 
                    '{@else if !item.tel}', '',
                    '{@/if}',
                    
                    '<img src="images/zdx_img_wz.png">',
                    '${item.distance}km',
                    '</h5>',
                    '<div class="linestyle_content">',
                    '{@if item.age}','<em>${item.age}岁</em>', 
                    '{@else if !item.age}', '',
                    '{@/if}',
                    '{@if item.high}','<em>${item.high}cm</em>', 
                    '{@else if !item.high}', '',
                    '{@/if}',
                    '{@if item.degrees}','<em>${item.degrees}</em>',
                    '{@else if !item.degrees}', '',
                    '{@/if}',
                    '{@if item.income}','<em>${item.income}元</em>',
                    '{@else if !item.income}', '',
                    '{@/if}',
                    '</div>',
                     '{@if item.sign}','<span>${item.sign}</span>',
                    '{@else if !item.sign}', '',
                    '{@/if}',
                    '</a>',
                    '<div class="row picture_row">',
                    '<img  src="images/zdx_btn_fxx.png">',
                    '</div></div></div></div>',
                    '{@/each}'
             ].join('');
        },

             indexjobListTpl: function(data) {
                  return ['{@each data as item}',

                           '{@if item.img}',
                                  
                                 '<li class="styleli"><div class="situation-box-item">',
                                      '<a class="click-point"  href="../service/Marriage_Recruitment.html?id=${item.id}#pagePostJobDetail">', 
                                            '<img src="${item.img.split(",")[0] }" style="display: inline-block;">',
                                      '</a>',
                                      '<div class="situation-box-item_content">',
                                          '<a href="../service/Marriage_Recruitment.html?id=${item.id}#pagePostJobDetail">',
                                              '<h5>${item.title}</h5>',
                                               '<div class="linestyle linsty1">',
                                                       '<span>${item.county_name}</span>',
                                                       '<em>${item.income}</em>',
                                                       '<strong>${item.degrees}</strong>',
                                                  '</div>  ',
                                          '</a>',
                                      '</div>',
                                '</div></li>',

                            '{@else if !item.imgs}', '',
                                    '<li class="styleli"><div class="situation-box-item situation-box-itemstyle" >',
                                        '<div>',
                                             '<a href="../service/Marriage_Recruitment.html?id=${item.id}#pagePostJobDetail">',
                                                '<h5>${item.title}',
                                                    '<time>${item.createtime}</time>',
                                                '</h5>',
                                                '<div class="linestyle linsty1">',
                                                     '<span>${item.county_name}</span>',
                                                     '<em>${item.income}</em>',
                                                     '<strong>${item.degrees}</strong>',
                                                '</div>',
                                            '</a>',
                                        '</div>',
                                    '</div></li>',
                            '{@/if}',
                           
                     '{@/each}'
             ].join('');
         },

             indexrecruitListTpl: function(data) {
                  return ['{@each data as item}',
                           '<li class="styleli"><div class="situation-box-item situation-box-itemstyle" >',
                                '<div>',
                                    '<a href="../service/Marriage_Recruitment.html?id=${item.id}#pagePostRecruitDetail">',
                                         '<h5>${item.title}',
                                             '<time>${item.createtime}</time>',
                                         '</h5>',           
                                        '<div class="linestyle">',
                                             '<span>${item.county_name}</span>',
                                             '<em>${item.income}</em>',
                                             '<strong>${item.nums}</strong>',
                                        '</div>',
                                    '</a>',
                                '</div>',
                            '</div></li>',
                     '{@/each}'
             ].join('');
                        
             
        },
   };

    marriage.tool = {
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
                        location.href = marriage.config.loginUrl;
                        if($.device.os=="android"){
                            javascript:login.nologin();
                        }else if($.device.os=="ios"){
                            location.href = marriage.config.loginUrl;
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
                    navigator.geolocation.watchPosition(marriage.tool.currentPosition.updatePosition,
                        marriage.tool.currentPosition.error);
                } else {
                    $.toast("浏览器无法获取您的位置信息！");
                }
            }
        }
    };
  
    marriage.index = {
        data: function() {
            var data = {};
                 var criterias = [
              
                {
                    el: 'marriage_sex',
                    pro: 'sex',
                    type: 'btnRound'
                },
                {
                    el: 'marriage_startage',
                    pro: 'startage',
                    type: 'text'
                }, {
                    el: 'marriage_endage',
                    pro: 'endage',
                    type: 'text'
                }, {
                    el: 'marriage_starthigh',
                    pro: 'starthigh',
                    type: 'text'
                }, {
                    el: 'marriage_endhigh',
                    pro: 'endhigh',
                    type: 'text'
                }, {
                    el: 'marriage_startincome',
                    pro: 'startincome',
                    type: 'text'
                }, {
                    el: 'marriage_endincome',
                    pro: 'endincome',
                    type: 'text'
                }, {
                    el: 'marriage_degrees',
                    pro: 'degrees',
                    type: 'text'
                }, {
                    el: 'sell_pageNum',
                    pro: 'pageNum',
                    type: 'text'
                }, {
                    el: 'sell_pageSize',
                    pro: 'pageSize',
                    type: 'text'
                }, {
                    el: 'marriage_location_x',
                    pro: 'location_x',
                    type: 'text'
                },{
                    el: 'marriage_location_y',
                    pro: 'location_y',
                    type: 'text'
                },{
                    el: 'select_city3',
                    pro: 'city_id',
                    type: 'textsel'
                }, {
                    el: 'select_area3',
                    pro: 'county_id',
                    type: 'textsel'
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
                    el: 'searchall',
                    pro: 'searchname',
                    type: 'text'
                },
                {
                    el: 'location_x',
                    pro: 'location_x',
                    type: 'text'
                },
                 {
                    el: 'location_y',
                    pro: 'location_y',
                    type: 'text'
                }

            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },
       query: function() {
            // $.showPreloader();
            $("#sell_pageNum").val(1);
            $("#sell_pageSize").val(10);
            var data = marriage.index.data();
            if (debug) {
                console.log("index:");
                console.log(data);
            };
            $('#pageSellContent .infinite-scroll-preloader').empty();
            $(' #pageSellContent .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
            marriage.tool.ajax(marriage.config.MarryList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0012']);
                    $("#querymarryList").empty();
                    $(' #pageSellContent .infinite-scroll-preloader').html(marriage.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(marriage.tpl.indexListTpl(), d);
                    $("#querymarryList").html(list);
                    $('#pageSellContent .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                $(' #pageSellContent .infinite-scroll-preloader').html(marriage.config.constant['0001']);
                $.alert(marriage.config.constant['0001']);
                $.hidePreloader();
            });
          
        },
         query1: function() {
     
            var data = marriage.index.datax();
            if (debug) {
                console.log("index:");
            };

            if (data) {
             var x = $('#location_x').val();
             var y = $('#location_y').val();
             if (x && y) {
                 data.location_x = parseInt(Number(x).toFixed(6) * Math.pow(10, 6));
                 data.location_y = parseInt(Number(y).toFixed(6) * Math.pow(10, 6));
             } else {
                 data.location_x = position.latitudeP;
                 data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
            marriage.tool.ajax(marriage.config.MarryList, data2, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    //$.alert(marriage.config.constant['0012']);
                    $("#indexlistobject").empty();
                    
                } else if (d) {
                    $("#indexlist").empty();
                    var list = juicer(marriage.tpl.indexListTpl(), d);
                    $("#indexlistobject").html(list);
             
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
         
                $.alert(marriage.config.constant['0001']);
                $.hidePreloader();
            });
          }
        },
         detail: function(id, els) {
            var data = {
               info_id: id,
             
            };


            if (debug) {
                console.log(data);
            }
            $("#MarriageDetail_id").val(id);
  
            // $.showPreloader();
            marriage.tool.ajax(marriage.config.marriageDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo3('MarriageDetail_', d);
                    viewInfo4('MarriageDetail_', d);
                    viewInfo5('MarriageDetail_', d.backimg);
                    historyWatch(id, 5);
                    dianji(9);
                    userclick(id, 5);

                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(marriage.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
         
        init: function() {
            marriage.index.query();
        }
    };
    
    marriage.joblist = {
        data: function() {
            var data = {};
                 var criterias = [
            
                {
                    el: 'select_city4',
                    pro: 'city_id',
                    type: 'textsel'
                }, {
                    el: 'select_area4',
                    pro: 'county_id',
                    type: 'textsel'
                }, {
                    el: 'choice',
                    pro: 'choice',
                    type: 'checkbox'
                }, {
                    el: 'degrees',
                    pro: 'degrees',
                    type: 'text'
                }, {
                    el: 'trade',
                    pro: 'trade',
                    type: 'text'
                },{
                     el: 'search_content',
                     pro: 'searchname',
                     type: 'text'
                  }

            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },
        //datax: function() {
        //    var data = {};
        //         var criterias = [
        //        {
        //            el: 'search_content',
        //            pro: 'searchname',
        //            type: 'text'
        //        }
        //
        //    ];
        //   selectVal(criterias, data);
        //   console.info(data)
        //   return data;
        //},
        jobdata: function() {
            var data = {};
                 var criterias = [
                {
                    el: 'searchall',
                    pro: 'searchname',
                    type: 'text'
                },{
                    el: 'select_cit',
                    pro: 'city_id',
                    type: 'text'
               },{
                     el: 'select_are',
                     pro: 'county_id',
                     type: 'text'
                 }

            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },
       query: function() {
             $.showPreloader();
           
           var data = marriage.joblist.data(); 

            if (debug) {
                console.log("index:");
                console.log(data);
            };
            
            marriage.tool.ajax(marriage.config.jobList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {

                    $("#findjoblist").empty();
                    $("#tab2 .infinite-scroll-preloader").empty();
                    $("#tab2 .infinite-scroll-preloader").html(marriage.config.constant['0012']);
                   
                } else if (d) {
                    
                    var list = juicer(marriage.tpl.indexjobListTpl(), d);
                    $("#findjoblist").html(list);
                    $("#rent_pageNum").val(1);
                    $("#tab2 .infinite-scroll-preloader").html('');
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(marriage.config.constant['0001']);
                
            });
          
        },
        //query1: function() {
        //    var data = '';
        //
        //    marriage.tool.ajax(marriage.config.jobList, data, null, 'post', function(d) {
        //        if (debug) {
        //            console.log(d);
        //        }
        //        if (d.data && marriage.config.constant['0003'] == d.data) {
        //            $.alert(marriage.config.constant['0012']);
        //            $("#findjoblist").empty();
        //
        //        } else if (d) {
        //
        //            var list = juicer(marriage.tpl.indexjobListTpl(), d);
        //            $("#findjoblist").html(list);
        //
        //        }
        //        $.hidePreloader();
        //
        //    }, function(xhr, type) {
        //
        //        $.alert(marriage.config.constant['0001']);
        //
        //    });
        //
        // },

          query2: function() {
              $.showPreloader();
            var data =marriage.joblist.jobdata();

            console.info(data)
            marriage.tool.ajax(marriage.config.jobList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $('#pagejoblistContent .infinite-scroll-preloader .preloader').html(marriage.config.constant['0012']);
                    $("#indexlist").empty();
                    $('#pagejoblistContent .infinite-scroll-preloader .preloader').hide();

                } else if (d) {

                    var list = juicer(marriage.tpl.indexjobListTpl(), d);
                    $("#indexlist").html(list);
                    $("#list_pageNum").val(1);
                    $('#pagejoblistContent .infinite-scroll-preloader').html("");


                }
                $.hidePreloader();

            }, function(xhr, type) {

                $.alert(marriage.config.constant['0001']);

            });

         },
        //query3: function() {
        //
        //       var data = marriage.joblist.datax();
        //
        //    marriage.tool.ajax(marriage.config.jobList, data, null, 'post', function(d) {
        //        if (debug) {
        //            console.log(d);
        //        }
        //        if (d.data && marriage.config.constant['0003'] == d.data) {
        //
        //
        //            $.alert(marriage.config.constant['0012']);
        //            $("#findjoblist").empty();
        //
        //
        //        } else if (d) {
        //            $("#findjoblist").empty();
        //            $("#bothlist1").empty();
        //            var list = juicer(marriage.tpl.indexjobListTpl(), d);
        //             $("#bothlist2").html(list);
        //
        //        }
        //        $.hidePreloader();
        //
        //    }, function(xhr, type) {
        //
        //        $.alert(marriage.config.constant['0001']);
        //
        //    });
        //
        // },
             query4: function() {
                 $.showPreloader();
            var data = marriage.joblist.jobdata(); 
            
            marriage.tool.ajax(marriage.config.jobList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {

                    $("#indexlistjob").empty();
                     $("#indexlist").empty();
                   
                } else if (d) {
                    $("#indexlist").empty();
                    var list = juicer(marriage.tpl.indexjobListTpl(), d);

                    $("#indexlistjob").html(list);
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(marriage.config.constant['0001']);
                
            });
          
         },
         detail: function(id, els) {
            var data = {
               info_id: id,
             
            };
            if (debug) {
                console.log(data);
            }


            $("#JobDetail_id").val(id);
     
            // $.showPreloader();
            marriage.tool.ajax(marriage.config.jobDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo('JobDetail_', d);
                     historyWatch(id, 6);
                     dianji(9);
                     userclick(id, 6);
                    var mpid = $.trim(d.id);
                     $("#JobDetail_id").val(mpid);
                    

                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(marriage.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
     
          init:function(id) {

           
             
             var data =marriage.joblist.jobdata(); 

            if (debug) {
                console.log(data);
            }
            data['location'] = id;

            marriage.tool.ajax(marriage.config.findAd, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                }
                if (d && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    // viewInfo(_field, d.data);
                     viewAd('Marriage_', d.data);
                 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(marriage.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

        }
    };
   

   marriage.recruitlist = {
        data: function() {
            var data = {};
                 var criterias = [
              
                {
                    el: 'select_city5',
                    pro: 'city_id',
                    type: 'textsel'
                }, {
                    el: 'select_area5',
                    pro: 'county_id',
                    type: 'textsel'
                }, {
                    el: 'choice1',
                    pro: 'choice1',
                    type: 'checkbox'
                }, {
                    el: 'income',
                    pro: 'income',
                    type: 'text'
                }, {
                    el: 'trade1',
                    pro: 'trade',
                    type: 'text'
                }, {
                     el: 'search_content',
                     pro: 'searchname',
                     type: 'text'
                     }

            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },
   
        //datax: function() {
        //    var data = {};
        //         var criterias = [
        //        {
        //            el: 'search_content',
        //            pro: 'searchname',
        //            type: 'text'
        //        }
        //
        //    ];
        //   selectVal(criterias, data);
        //   console.info(data)
        //   return data;
        //},

       recruitdata: function() {
            var data = {};
                 var criterias = [
                {
                    el: 'searchall',
                    pro: 'searchname',
                    type: 'text'
                }

            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },

       query: function() {
           $.showPreloader();
           var data = marriage.recruitlist.data(); 

            if (debug) {
                console.log("index:");
                console.log(data);
            };
            marriage.tool.ajax(marriage.config.recruitList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {

                    $("#findrecruitlist").empty();
                    $("#tab1 .infinite-scroll-preloader").empty();
                    $("#tab1 .infinite-scroll-preloader").html(marriage.config.constant['0012']);
                } else if (d) {
                    
                    var list = juicer(marriage.tpl.indexrecruitListTpl(), d);
                    $("#findrecruitlist").html(list);
                    $("#sell_pageNum").val(1);
                    $("#tab1 .infinite-scroll-preloader").html('');
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(marriage.config.constant['0001']);
                
            });
          
        },
        //query1: function() {
        //    var data = marriage.recruitlist.data();
        //    marriage.tool.ajax(marriage.config.recruitList, data, null, 'post', function(d) {
        //        if (debug) {
        //            console.log(d);
        //        }
        //        if (d.data && marriage.config.constant['0003'] == d.data) {
        //            $.alert(marriage.config.constant['0012']);
        //            $("#findrecruitlist").empty();
        //
        //        } else if (d) {
        //
        //            var list = juicer(marriage.tpl.indexrecruitListTpl(), d);
        //            $("#findrecruitlist").html(list);
        //
        //        }
        //        $.hidePreloader();
        //    }, function(xhr, type) {
        //        $.alert(marriage.config.constant['0001']);
        //
        //    });
        // },
        //query2: function() {
        //   var data = marriage.recruitlist.datax();
        //
        //    marriage.tool.ajax(marriage.config.recruitList, data, null, 'post', function(d) {
        //        if (debug) {
        //            console.log(d);
        //        }
        //        if (d.data && marriage.config.constant['0003'] == d.data) {
        //
        //            $.alert(marriage.config.constant['0012']);
        //            $("#findrecruitlist").empty();
        //
        //
        //        } else if (d) {
        //            $("#findrecruitlist").empty();
        //            $("#bothlist2").empty();
        //            var list = juicer(marriage.tpl.indexrecruitListTpl(), d);
        //
        //            $("#bothlist1").html(list);
        //
        //        }
        //        $.hidePreloader();
        //
        //    }, function(xhr, type) {
        //
        //        $.alert(marriage.config.constant['0001']);
        //
        //    });
        //
        // },
        query3: function() {
            $.showPreloader();
            var data = marriage.recruitlist.recruitdata(); 
            
            marriage.tool.ajax(marriage.config.recruitList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {

                     $("#indexlistzhaopin").empty();
                      $("#indexlist").empty();

                   
                } else if (d) {
                    $("#indexlist").empty();
                    
                    var list = juicer(marriage.tpl.indexrecruitListTpl(), d);
                    
                    $("#indexlistzhaopin").html(list);
      
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(marriage.config.constant['0001']);
                
            });
          
         },

         detail: function(id, els) {
            var data = {
               info_id: id,
             
            };
            if (debug) {
                console.log(data);
            }

            $("#RecruitDetail_id").val(id);
        
            marriage.tool.ajax(marriage.config.recruitDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo2('RecruitDetail_', d);
                    historyWatch(id, 7);
                    dianji(9);
                    userclick(id, 7);
                    var mpid = $.trim(d.id);
                     $("#RecruitDetail_id").val(mpid);

                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(marriage.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
        
         
        init: function() {
            // marriage.index.query();
        }
    };

   
    //发布对象
   marriage.pubScenic = {
     data: function() {
         var pubScenicdatas = [{
                id: 'pubScenic_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
                id: 'pubScenic_backimg',
                pro: 'backimg',
                eleType: 'img',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
             id: 'pubScenic_nickname',
             pro: 'nickname',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': marriage.config.constant['5001']
                 }
             }
         },{
             id: 'pubScenic_hunyingguan',
             pro: 'hunyingguan',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg':''
                 }
             }
         },{
             id: 'select_city',
             pro: 'city_id',
             eleType: 'inputsel',
             valids: {
                 'require': {
                     'is': true,
                     'msg': marriage.config.constant['5003']
                 }
             }
         },{
             id: 'select_area',
             pro: 'county_id',
             eleType: 'inputsel',
             valids: {
                 'require': {
                     'is': true,
                     'msg': marriage.config.constant['5004']
                 }
             }
         },{
             id: 'select_province',
             pro: 'province_id',
             eleType: 'inputsel',
             valids: {
                 'require': {
                     'is': true,
                     'msg': marriage.config.constant['5002']
                 }
             }
        },{
             id: 'pubScenic_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
      
         },{
             id: 'sex',
             pro: 'sex',
             eleType: 'radio',
             valids: {
                 'require': {
                    'is': true,
                     'msg': marriage.config.constant['5005']
                 }
             }
         },{
             id: 'pubScenic_age',
             pro: 'age',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
           
         },{
             id: 'pubScenic_high',
             pro: 'high',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_weight',
             pro: 'weight',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_degrees',
             pro: 'degrees',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_faith',
             pro: 'faith',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_job',
             pro: 'job',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_position',
             pro: 'position',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_ismarried',
             pro: 'ismarried',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_address',
             pro: 'address',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }

         },{
             id: 'pubScenic_income',
             pro: 'income',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_car',
             pro: 'car',
             eleType: 'confDanger',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_house',
             pro: 'house',
             eleType: 'confDanger',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_smoke',
             pro: 'smoke',
             eleType: 'confDanger',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_drink',
             pro: 'drink',
             eleType: 'confDanger',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_hoppy',
             pro: 'hoppy',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_requirement',
             pro: 'requirement',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_sign',
             pro: 'sign',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_truename',
             pro: 'truename',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_birthaddress',
             pro: 'birthaddress',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg':''
                 }
             }
         },{
             id: 'pubScenic_stayaddress',
             pro: 'stayaddress',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'pubScenic_idcard',
             pro: 'idcard',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'id_front',
             pro: 'idimgs',
             eleType: 'txtCarImg',
             valids: {
                 'require': {
                     'is': false,
                     'msg':''
                 }
             }
         },{
             id: 'id_back',
             pro: 'idimgs',
             eleType: 'txtCarImg',
             valids: {
                 'require': {
                     'is': false,
                     'msg':''
                 }
             }
         },
         {
             id: 'pubScenic_tel',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },
                 'isMobile': {
                        'is': true,
                        'msg': marriage.config.constant['4001']
                    }
             }
         },{
             id: 'pubScenic_code',
             pro: 'code',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg':  marriage.config.constant['8003']
                 }
             }
         }
         ];
         return validationToValue(pubScenicdatas);
     },
      submit: function(status,type,backimg) {
         var data = marriage.pubScenic.data();
         if (debug) {
             console.log('pubScenic validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#location_x').val();
             var y = $('#location_y').val();
             if (x && y) {
                 data.location_x = parseInt(Number(x).toFixed(6) * Math.pow(10, 6));
                 data.location_y = parseInt(Number(y).toFixed(6) * Math.pow(10, 6));
             } else {
                 data.location_x = position.latitudeP;
                 data.location_y = position.longitudeP;
             }
               var data2 = {};
                for (var key in data) {
                
                    data2[key] = data[key];
                }
             data2['status'] = status;
             data2['type'] = type;
             data2['idimgs'] = data2['idimgs'].substring(1);
             $('.filesss123').each(function () {
             backimg = $(this).attr('src') 
             })
             data2['backimg'] = backimg;
             marriage.tool.ajax(marriage.config.pubScenic, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 } 
                 if (d.data && marriage.config.constant['0002'] == d.data) {
                     if (status == 1 && type==1) {
                        $.alert(marriage.config.constant['0004'],function(){
                             $.router.load("#pageFindObject"); 
                        });

                     }else if(status == 2 && type==2){
                          $(".tanchuang").show();
                          $(".queding").click(function () {     
                          $(".tanchuang").hide();
                            $.router.load("#pageFindObject"); 
                          });
                      
                     }
                    }else if (d.data && marriage.config.constant['7008'] == d.data) {
                    $.toast('验证码不正确');
                }else if (d.data && marriage.config.constant['7006'] == d.data) {
                    $.toast('验证码失效');
                }else if (d.data && marriage.config.constant['7007'] == d.data) {
                    $.toast('验证码错误');
                }
             }, function(xhr, type) {
                 $.alert(marriage.config.constant['0001']);
             });
         }
     },


       edit: function(id) {
            var data = {
               info_id: id,
             
            };


            if (debug) {
                console.log(data);
            }
            $("#pubScenic_id").val(id);
  
            // $.showPreloader();
            marriage.tool.ajax(marriage.config.marriageDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInit('pubScenic_', d);
             
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(marriage.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

          update: function(status,type,id,backimg) {

         var data = marriage.pubScenic.data();
         if (debug) {
             console.log('pubScenic validation ' + '--> ');
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
             data2['type'] = type;
              data2['marry_id'] = id;
             data2['idimgs'] = data2['idimgs'].substring(1);
             $('.filesss123').each(function () {
             backimg = $(this).attr('src') 
             })
             data2['backimg'] = backimg;
             
             marriage.tool.ajax(marriage.config.pubScenicUpdate, data2, null, 'post', function(d) {

                 if (debug) {
                     console.log(d);
                 } 
                 
                 if (d.data && marriage.config.constant['0002'] == d.data) {
                     if (status == 1 && type==1) {
                        $.alert(marriage.config.constant['0004'],function(){
                            $.router.back(); 
                        });

                     }else if(status == 2 && type==2){
                     $.alert(marriage.config.constant['0004'],function(){
                            $.router.back(); 
                        });
                     }
                    }else if (d.data && marriage.config.constant['7008'] == d.data) {
                    $.toast('验证码不正确');
                }else if (d.data && marriage.config.constant['7006'] == d.data) {
                    $.toast('验证码失效');
                }else if (d.data && marriage.config.constant['7007'] == d.data) {
                    $.toast('验证码错误');
                }
             }, function(xhr, type) {
                 $.alert(marriage.config.constant['0001']);
             });
         }
     },

    };


    //发布工作
   marriage.pubJob = {
        data: function() {
            var pubJobdatas = [
            {
                id: 'pubJob_img',
                pro: 'img',
                eleType: 'img',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': ''
                    } 
                }
            },{
                id: 'pubJob_title',
                pro: 'title',
                eleType: 'input',   
                valids: {
                    'require': {
                        'is':true,
                        'msg': marriage.config.constant['3002']
                    }
                }
            },{
                id: 'pubJob_name',
                pro: 'name',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubJob_age',
                pro: 'age',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }, {
                id: 'pubJob_sex',
                pro: 'sex',
                eleType: 'radio',
                valids: {
                    'require': {
                        'is': false,
                        'msg':marriage.config.constant['5005']
                    }
                }
            }, {
             id: 'select_province2',
             pro: 'province_id',
             eleType: 'inputsel1',
             valids: {
                 'require': {
                     'is': true,
                     'msg': ''
                 }
             }
            }, {
             id: 'select_city2',
             pro: 'city_id',
             eleType: 'inputsel2',
             valids: {
                 'require': {
                     'is': true,
                     'msg': ''
                 }
             }
            },{
             id: 'select_area2',
             pro: 'county_id',
             eleType: 'inputsel3',
             valids: {
                 'require': {
                     'is': true,
                     'msg': ''
                 }
             }
            },
             {
                id: 'pubJob_worktime',
                pro: 'worktime',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubJob_degrees',
                pro: 'degrees',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubJob_trade',
                pro: 'trade',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':true,
                        'msg': ''
                    }
                }
            },{
                id: 'pubJob_job',
                pro: 'job',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubJob_income',
                pro: 'income',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubJob_introduce',
                pro: 'introduce',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubJob_configure',
                pro: 'choice',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg':''
                    }
                }
            },{
             id: 'pubJob_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': marriage.config.constant['3005']
                 },
             }
            }, {
             id: 'pubJob_tel',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': marriage.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': marriage.config.constant['4001']
                    }
             }
            },{
                id: 'pubJob_showtel',
                pro: 'showtel',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubJob_showcontact',
                pro: 'showcontact',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }];
            var sc=$('.sc-1').find('select').size();
            console.info(sc);
                    for(var j=6;j<sc+6;j++){
                     var s=[
                         {
                     id: 'select_province'+j,
                     pro: 'province_id',
                     eleType: 'inputsel1',
                     valids: {
                         'require': {
                             'is': true,
                             'msg': ''
                         }
                     }
                   }, {
                     id: 'select_city'+j,
                     pro: 'city_id',
                     eleType: 'inputsel2',
                     valids: {
                         'require': {
                             'is': true,
                             'msg': ''
                         }
                     }
                  },{
                     id: 'select_area'+j,
                     pro: 'county_id',
                     eleType: 'inputsel3',
                     valids: {
                         'require': {
                             'is': true,
                             'msg': ''
                         }
                     }
                   }
             ];
              pubJobdatas=pubJobdatas.concat(s);
            }
            return validationToValue(pubJobdatas);
        },

        submit: function(status) {
             

            var data= marriage.pubJob.data();

            if (debug) {
                console.log('pubJob validation ' + '--> ');
                console.log(data);
            }
            if (data) {
        
                     var data2 = {};
                for (var key in data) {
                    
                    data2[key] = data[key];
                }

                data2['status'] = status;

                data2['province_id'] = data2['province_id'].substring(1);
                data2['city_id'] = data2['city_id'].substring(1);
                data2['county_id'] = data2['county_id'].substring(1);
     
               
            
                marriage.tool.ajax(marriage.config.pubJob, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && marriage.config.constant['0002'] == d.data) { 
                        $.alert(marriage.config.constant['0004'],function(){
                             $.router.load("#pagePostChoose"); 
                        });
                    } else if (d.data) {
                        $.alert(marriage.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(marriage.config.constant['0001']);
                });
            }
        },

        edit: function(id) {
            var data = {
               info_id: id,
             
            };
            if (debug) {
                console.log(data);
            }


            $("#pubJob_id").val(id);
     
            // $.showPreloader();
            marriage.tool.ajax(marriage.config.jobDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInit('pubJob_', d);
                   
                     // var mpid = $.trim(d.id);
                     // $("#pubJob_id").val(mpid);
                    

                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(marriage.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

         update: function(status,id) {
             

            var data= marriage.pubJob.data();

            if (debug) {
                console.log('pubJob validation ' + '--> ');
                console.log(data);
            }
            if (data) {
        
                     var data2 = {};
                for (var key in data) {
                    
                    data2[key] = data[key];
                }

                data2['status'] = status;

                data2['province_id'] = data2['province_id'].substring(1);
                data2['city_id'] = data2['city_id'].substring(1);
                data2['county_id'] = data2['county_id'].substring(1);
                data2['findwork_id'] = id;
     
               
            
                marriage.tool.ajax(marriage.config.pubJobUpdate, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && marriage.config.constant['0002'] == d.data) { 
                        $.alert(marriage.config.constant['0004'],function(){
                             $.router.back(); 
                        });
                    } else if (d.data) {
                        $.alert(marriage.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(marriage.config.constant['0001']);
                });
            }
        },

        init: function() {
            var id = $("#pubJob_id").val();
            // if (id) {
            //     marriage.pubCarFindPeople.eidt(id);
            // }
        }
    };

    
   //发布招聘
   marriage.pubRecruit = {
        data: function() {
            var pubRecruitdatas = [
           {
                id: 'pubRecruit_title',
                pro: 'title',
                eleType: 'input',   
                valids: {
                    'require': {
                        'is':true,
                        'msg': ''
                    }
                }
            },{
                id: 'pubRecruit_age',
                pro: 'age',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg':''
                    }
                }
            }, 
            {
                id: 'pubRecruit_sex',
                pro: 'sex',
                eleType: 'radio',
                valids: {
                    'require': {
                        'is': false,
                        'msg':marriage.config.constant['5005']
                    }
                }
            }, 
            {
             id: 'select_province1',
             pro: 'province_id',
             eleType: 'inputsel',
             valids: {
                 'require': {
                     'is': true,
                     'msg': ''
                 }
             }
         }, {
             id: 'select_city1',
             pro: 'city_id',
             eleType: 'inputsel',
             valids: {
                 'require': {
                     'is': true,
                     'msg': ''
                 }
             }
          },{
             id: 'select_area1',
             pro: 'county_id',
             eleType: 'inputsel',
             valids: {
                 'require': {
                     'is': true,
                     'msg': marriage.config.constant['3002']
                 }
             }
          },{
                id: 'pubRecruit_nums',
                pro: 'nums',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubRecruit_income',
                pro: 'income',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubRecruit_restday',
                pro: 'restday',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubRecruit_worktime',
                pro: 'worktime',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubRecruit_degrees',
                pro: 'degrees',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubRecruit_remarks',
                pro: 'remarks',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubRecruit_companyname',
                pro: 'companyname',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':true,
                        'msg': marriage.config.constant['8001']
                    }
                }
            },{
                id: 'pubRecruit_trade',
                pro: 'trade',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':true,
                        'msg': marriage.config.constant['8002']
                    }
                }
            },{
                id: 'pubRecruit_introduce',
                pro: 'introduce',
                eleType: 'input',
                valids: {
                    'require': {
                        'is':false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubRecruit_configure',
                pro: 'choice',
                eleType: 'requireDanger',
                valids: {
                    'require': {
                        'is': false,
                        'msg':''
                    }
                }
            },{
                id: 'pubRecruit_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: {
                    'require': {
                        'is': false,
                        'msg': marriage.config.constant['3001']
                    }
                }
            },{
             id: 'pubRecruit_linkman',
             pro: 'linkman',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': marriage.config.constant['3005']
                 },
             }
          }, {
             id: 'pubRecruit_tel',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                        'is': true,
                        'msg': marriage.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': marriage.config.constant['4001']
                    }
             }
         },{
                id: 'pubRecruit_showtel',
                pro: 'showtel',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            },{
                id: 'pubRecruit_showcontact',
                pro: 'showcontact',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }];
            return validationToValue(pubRecruitdatas);
        },
        submit: function(status) {
            var data = marriage.pubRecruit.data();
        
            if (debug) {
                console.log('pubRecruit validation ' + '--> ');
                console.log(data);
            }
            if (data) {
        
                     var data2 = {};
                for (var key in data) {
                    
                    data2[key] = data[key];
                }
                data2['status'] = status;
            
     
            
                marriage.tool.ajax(marriage.config.pubRecruit, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && marriage.config.constant['0002'] == d.data) { 
                        $.alert(marriage.config.constant['0004'],function(){
                             $.router.load("#pagePostChoose"); 
                        });
                    } else if (d.data) {
                        $.alert(marriage.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(marriage.config.constant['0001']);
                });
            }
        },
           
    
         edit: function(id) {
            var data = {
               info_id: id,
             
            };
            if (debug) {
                console.log(data);
            }

            $("#pubRecruit_id").val(id);
        
            marriage.tool.ajax(marriage.config.recruitDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInit('pubRecruit_', d);
                    var mpid = $.trim(d.id);
                     $("#pubRecruit_id").val(mpid);

                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(marriage.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

         update: function(status,id) {
            var data = marriage.pubRecruit.data();
        
            if (debug) {
                console.log('pubRecruit validation ' + '--> ');
                console.log(data);
            }
            if (data) {
        
                     var data2 = {};
                for (var key in data) {
                    
                    data2[key] = data[key];
                }
                data2['status'] = status;
                data2['findworker_id'] = id;
            
     
            
                marriage.tool.ajax(marriage.config.pubRecruitUpdate, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && marriage.config.constant['0002'] == d.data) { 
                        $.alert(marriage.config.constant['0004'],function(){
                             $.router.back(); 
                        });
                    } else if (d.data) {
                        $.alert(marriage.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(marriage.config.constant['0001']);
                });
            }
        },

        init: function() {
            var id = $("#pubRecruit_id").val();
            // if (id) {
            //     marriage.pubCarFindPeople.eidt(id);
            // }
        }
    };
   

    
    $(document).on("pageInit", function(e, pageId, $page) {


          var url = location.search; //获取url中"?"符后的字串
             var strs = url.substr(1);
              var id=strs.split("=")[1]


     if (pageId == "pageIndex") {

            //marriage.joblist.init(9);
         marriage.joblist.query2();
         marriage.joblist.init(9);
             
    }
    else if (pageId == "pagePostChoose") {

 
     }else if (pageId == "pageFindJob") {
             $(function(){
                 $("#qiuzhi").click(function() {
           var id = $("#FindJob_id").val();
             $("#search_job").show();
             $("#search_recruit").hide();
           marriage.joblist.query();
        });
         $("#zhaopin").click(function() {
         var id = $("#FindJob_id").val();
             $("#search_job").hide();
             $("#search_recruit").show();
          marriage.recruitlist.query();
       });
          });
         $("#search_recruit").show();
          marriage.recruitlist.query();

     } else if (pageId == "pageFindObject") {
        $(function(){
// 找对象－筛选弹窗
$(".quxiao").click(function () {
document.getElementById("form3").reset();
     $(".shaixuan_select").hide();
      $(".shaixuan_list").hide();
});
$(".confirm").click(function () {
     $(".shaixuankuang").hide();

});
$(".confirm1").click(function () {
     $(".shaixuan_select").hide();

});
$(".qingkong1").click(function () {
       $(".xuanzecontent .row .col-25").empty();
      $(".qingkong1").hide();
      $(".shaixuan_list").hide();
      document.getElementById("form3").reset();

});

$(".xuanzecontent").bind('DOMNodeInserted', function(e) {
   $(".qingkong1").show();
   $(".shaixuankuang").show();
   $(".shaixuan_list").show();
});
        $("#btnQuery").click(function() {
            marriage.index.query();
        });

        });

          marriage.index.query();
     } 
     else if (pageId == "pagePostJobDetail") {

         marriage.joblist.detail(id)
     } 
     else if (pageId == "pagePostRecruitDetail") {

          marriage.recruitlist.detail(id)
     } 
     else if (pageId == "pageObjectIntroduction") {

          marriage.index.detail(id)
     }else if (pageId == "pagePostJob") {
       if(id){
          marriage.pubJob.edit(id)
        }
     } else if (pageId == "pagePostRecruit") {
       if(id){
          marriage.pubRecruit.edit(id)
        }
     } 
     else if (pageId == "pagepubScenic") {
       if(id){
          marriage.pubScenic.edit(id)
        }
     } 
   
   
    });

    $("#select_are").change(function(){
        marriage.joblist.query2();
        marriage.joblist.init(9);
    })
    
    $(function() {
     
    $("#yescar").click(function() {
            $("#yescar").attr("check",true);
            $("#nocar").attr("check",false);
            $("#nocar").removeClass('button-danger');
            $("#nocar").addClass('button-disabled');
            $("#yescar").addClass('button-danger')
            $("#yescar").removeClass('button-disabled');
        });
    $("#nocar").click(function() {
            $("#yescar").attr("check",false);
            $("#nocar").attr("check",true);
            $("#nocar").removeClass('button-disabled');
            $("#nocar").addClass('button-danger');
            $("#yescar").addClass('button-disabled');
            $("#yescar").removeClass('button-danger');
        });
    $("#yeshouse").click(function() {
            $("#yeshouse").attr("check",true);
            $("#nohouse").attr("check",false);
            $("#nohouse").removeClass('button-danger');
            $("#nohouse").addClass('button-disabled');
            $("#yeshouse").addClass('button-danger')
            $("#yeshouse").removeClass('button-disabled');
        });
    $("#nohouse").click(function() {
            $("#yeshouse").attr("check",false);
            $("#nohouse").attr("check",true);
            $("#nohouse").removeClass('button-disabled');
            $("#nohouse").addClass('button-danger');
            $("#yeshouse").addClass('button-disabled');
            $("#yeshouse").removeClass('button-danger');
        });

   $("#smoke_jin").click(function() {
            $("#smoke_ou").attr("check",false);
            $("#smoke_bu").attr("check",false);
            $("#smoke_jin").attr("check",true);
            $("#smoke_jin").removeClass('button-disabled');
            $("#smoke_jin").addClass('button-danger');
            $("#smoke_ou").addClass('button-disabled');
            $("#smoke_ou").removeClass('button-danger');
            $("#smoke_bu").addClass('button-disabled');
            $("#smoke_bu").removeClass('button-danger');
        });

     $("#smoke_ou").click(function() {
            $("#smoke_ou").attr("check",true);
            $("#smoke_bu").attr("check",false);
            $("#smoke_jin").attr("check",false);
            $("#smoke_jin").removeClass('button-danger');
            $("#smoke_jin").addClass('button-disabled');
            $("#smoke_ou").addClass('button-danger');
            $("#smoke_ou").removeClass('button-disabled');
            $("#smoke_bu").addClass('button-disabled');
            $("#smoke_bu").removeClass('button-danger');
        });
        $("#smoke_bu").click(function() {
            $("#smoke_ou").attr("check",false);
            $("#smoke_bu").attr("check",true);
            $("#smoke_jin").attr("check",false);
            $("#smoke_jin").removeClass('button-danger');
            $("#smoke_jin").addClass('button-disabled');
            $("#smoke_ou").addClass('button-disabled');
            $("#smoke_ou").removeClass('button-danger');
            $("#smoke_bu").addClass('button-danger');
            $("#smoke_bu").removeClass('button-disabled');
        });    

   $("#drink_jin").click(function() {
            $("#drink_ou").attr("check",false);
            $("#drink_bu").attr("check",false);
            $("#drink_jin").attr("check",true);
            $("#drink_jin").removeClass('button-disabled');
            $("#drink_jin").addClass('button-danger');
            $("#drink_ou").addClass('button-disabled');
            $("#drink_ou").removeClass('button-danger');
            $("#drink_bu").addClass('button-disabled');
            $("#drink_bu").removeClass('button-danger');
        });

     $("#drink_ou").click(function() {
            $("#drink_ou").attr("check",true);
            $("#drink_bu").attr("check",false);
            $("#drink_jin").attr("check",false);
            $("#drink_jin").removeClass('button-danger');
            $("#drink_jin").addClass('button-disabled');
            $("#drink_ou").addClass('button-danger');
            $("#drink_ou").removeClass('button-disabled');
            $("#drink_bu").addClass('button-disabled');
            $("#drink_bu").removeClass('button-danger');
        });
        $("#drink_bu").click(function() {
            $("#drink_ou").attr("check",false);
            $("#drink_bu").attr("check",true);
            $("#drink_jin").attr("check",false);
            $("#drink_jin").removeClass('button-danger');
            $("#drink_jin").addClass('button-disabled');
            $("#drink_ou").addClass('button-disabled');
            $("#drink_ou").removeClass('button-danger');
            $("#drink_bu").addClass('button-danger');
            $("#drink_bu").removeClass('button-disabled');
        }); 

         $("#bad_man").click(function() {
            $("#bad_man").attr("check",true);
            $("#good_woman").attr("check",false);
        });
         $("#good_woman").click(function() {
            $("#bad_man").attr("check",false);
            $("#good_woman").attr("check",true);
        
        });


       $("#marriage_sex1").click(function() {
            $("#marriage_sex1").attr("check",true);
            $("#marriage_sex2").attr("check",false);
            $("#marriage_sex3").attr("check",false);
        });
   $("#marriage_sex2").click(function() {
            $("#marriage_sex2").attr("check",true);
            $("#marriage_sex1").attr("check",false);
            $("#marriage_sex3").attr("check",false);
        });

      $("#marriage_sex3").click(function() {
            $("#marriage_sex3").attr("check",true);
            $("#marriage_sex1").attr("check",false);
            $("#marriage_sex2").attr("check",false);
        });

        $("#m_renzheng").click(function() {
         var id = $("#pubScenic_id").val();
        // if(id){
        //       marriage.pubScenic.edit(id)
        //   }
            $.router.load("#pageAuthenticationInformation"); 
       });
       $("#m_fabu").click(function() {
        var id = $("#pubScenic_id").val();
        if(id){
         marriage.pubScenic.update(1,1,id);
        }else{
         marriage.pubScenic.submit(1,1);
        }

      });
      $("#m_fabu_ren").click(function() {
        var id = $("#pubScenic_id").val();
        if(id){
           marriage.pubScenic.update(2,2,id);
        }else{
          marriage.pubScenic.submit(2,2);
        }
         
      });

        $("#nan_sex").click(function() {
        $("#nan_sex").attr("check",true);
        $("#nv_sex").attr("check",false);
        $("#bao_sex").attr("check",false); 
        });

        $("#nv_sex").click(function() {
        $("#nan_sex").attr("check",false);
        $("#nv_sex").attr("check",true);
        $("#bao_sex").attr("check",false);
        });

        $("#bao_sex").click(function() {
        $("#nan_sex").attr("check",false);
        $("#bao_sex").attr("check",true);
        $("#nv_sex").attr("check",false);
        });



         $("#btnPubJob").click(function() {
         var id = $("#pubJob_id").val();

         if(id){
                marriage.pubJob.update(1,id);
         }else{
            marriage.pubJob.submit(1);
         }
          
       });
         $("#btnSaveJob").click(function() {
         var id = $("#pubJob_id").val();
          if(id){
                marriage.pubJob.update(2,id);
         }else{
            marriage.pubJob.submit(2);
         }
       });
         $("#btnPubRecruit").click(function() {
         var id = $("#pubRecruit_id").val();
         if(id){
              marriage.pubRecruit.update(1,id);
         }else{
               marriage.pubRecruit.submit(1);
         }
          
       });
         $("#btnSaveRecruit").click(function() {
         var id = $("#pubRecruit_id").val();
              if(id){
                  marriage.pubRecruit.update(2,id);
             }else{
                   marriage.pubRecruit.submit(2);
             }
       });

         $("#man").click(function() {
            $("#man").attr("check",true);
            $("#women").attr("check",false);
            $("#unknown").attr("check",false);
        });
          $("#women").click(function() {
            $("#man").attr("check",false);
            $("#women").attr("check",true);
            $("#unknown").attr("check",false);
        });
           $("#unknown").click(function() {
            $("#man").attr("check",false);
            $("#women").attr("check",false);
            $("#unknown").attr("check",true);
        });
           $("#man1").click(function() {
            $("#man1").attr("check",true);
            $("#women1").attr("check",false);
            $("#unknown1").attr("check",false);
        });
          $("#women1").click(function() {
            $("#man1").attr("check",false);
            $("#women1").attr("check",true);
            $("#unknown1").attr("check",false);
        });
           $("#unknown1").click(function() {
            $("#man1").attr("check",false);
            $("#women1").attr("check",false);
            $("#unknown1").attr("check",true);
        });
        
         $("#search_job").click(function() {
         var id = $("#FindJob_id").val();
             marriage.joblist.query();
          //
          //marriage.joblist.query3();
          //marriage.recruitlist.query2();
         });
        $("#search_recruit").click(function() {
            var id = $("#FindJob_id").val();
            marriage.recruitlist.query();

        });
         $("#searchX").click(function() {
             $('#pagejoblistContent .infinite-scroll-preloader').html("");
             $("#list_pageNum").val(1)
              marriage.joblist.query4();
              marriage.recruitlist.query3();
              marriage.index.query1();
         });

         $("#sure").click(function() {
         var id = $("#FindJob_id").val();
          marriage.joblist.query();
         });
         $("#surerecruit").click(function() {
         var id = $("#FindJob_id").val();
          marriage.recruitlist.query();
         });


});
    $.init();
});


// function pageDetail(id) {
//  if (id) {
//       elid = 'MarriageDetail_id';
//      page = 'pageObjectIntroduction';
//      _field = 'MarriageDetail_';
//  }
//  marriage.index.detail(id, {
//      'elid': elid,
//      'page': page,
//      '_field': _field
//  });
// }


// function pagejobDetail(id) {
//  if (id) {
//       elid = 'JobDetail_id';
//      page = 'pagePostJobDetail';
//      _field = 'JobDetail_';
//  }
//  marriage.joblist.detail(id, {
//      'elid': elid,
//      'page': page,
//      '_field': _field
//  });
// }
// function pagerecruitDetail(id) {
//  if (id) {
//       elid = 'RecruitDetail_id';
//      page = 'pagePostRecruitDetail';
//      _field = 'RecruitDetail_';
//  }
//  marriage.recruitlist.detail(id, {
//      'elid': elid,
//      'page': page,
//      '_field': _field
//  });
// }
 function dianji(info_type) {
   
    var data = {
        'info_type': info_type
    }
      marriage.tool.ajax(marriage.config.click, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
              if (d.data && marriage.config.constant['0002'] == d.data) {
            
                    }  
            }, function(xhr, type) {
                $.toast(marriage.config.constant['0001'], function() {
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
      marriage.tool.ajax(marriage.config.userclick, data, null, 'post', function(d) {

        if (d.data && marriage.config.constant['0002'] == d.data) { 
          // $('.n_num_1>span').html($('.n_num_1>span').html()*1+1);
          // $('.n_num>span').html($('.n_num>span').html()*1+1);
          }
            }, function(xhr, type) {
                $.toast(marriage.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
}




   
    var loading = false;

    $(document).on('infinite', function() {
        if (loading||$("#indexlist li").length<10) {
             return
        }
        
        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#list_pageNum").val();
            if (pageNum==1) {
                $('#pagejoblistContent .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
            }
            $("#list_pageNum").val(++pageNum);
            var param = marriage.joblist.data();
            param.pageNum = pageNum;
            param.PageSize = 10;
            marriage.tool.ajax(marriage.config.jobList, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $('#pagejoblistContent .infinite-scroll-preloader .preloader').hide();
                    $('#pagejoblistContent .infinite-scroll-preloader').html(marriage.config.constant['0014']);
                } else if (d) {
                    var list = juicer(marriage.tpl.indexjobListTpl(), d);
                    $("#indexlist").append(list);
                }
            }, function(xhr, type) {
                $.alert(marriage.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
    });



   
    var loading = false;
    var pageNum = $("#marry_pageNum").val();
    $(document).on('infinite', function() {
        if (loading||$("#querymarryList div").length<10) {
             return
        }
        
        loading = true;
        setTimeout(function() {
            loading = false;
            
            if (pageNum==1) {
                $('#pagemarryContent .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
            }
            $("#marry_pageNum").val(++pageNum);
            var param = marriage.index.data();
            param.pageNum = pageNum;
            param.PageSize = 10;
            marriage.tool.ajax(marriage.config.MarryList, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $('#pagemarryContent .infinite-scroll-preloader .preloader').hide();
                    $('#pagemarryContent .infinite-scroll-preloader').html(marriage.config.constant['0014']);
                } else if (d) {
                    var list = juicer(marriage.tpl.indexListTpl(), d);
                    $("#querymarryList").append(list);
                }
            }, function(xhr, type) {
                $.alert(marriage.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
    });




+ function($) {
    "use strict";

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
                 if (loading||$("#findrecruitlist li").length<10) {
                      
                  return
               }
               

                 setTimeout(function() {

                    loading = false;


                    var pageNum = $("#sell_pageNum").val();
                     if (pageNum == 1) {
                         $('#tab1 .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
                     }

                    $("#sell_pageNum").val(++pageNum);
                  
                    var param = marriage.recruitlist.data();
                    param.pageNum = pageNum;
                    param.PageSize = 10;
      
                    marriage.tool.ajax(marriage.config.recruitList, param, null, 'post', function(d) {
                        if (debug) {
                            console.log(d);
                        };
                        if (d.totalPage > param.pageNum) {
                           
                             var list = juicer(marriage.tpl.indexrecruitListTpl(), d);
                            $("#findrecruitlist").append(list);
 
                        }
                        else if(d.totalPage == param.pageNum){
                            var list = juicer(marriage.tpl.indexrecruitListTpl(), d);
                             $("#findrecruitlist").append(list);
                             $("#tab1 .infinite-scroll-preloader .preloader").empty();
                             $("#tab1 .infinite-scroll-preloader").html(marriage.config.constant['0014']);
                            return
                      }

                    }, function(xhr, type) {
                        $.alert(marriage.config.constant['0001']);
                        $("#tab1 .infinite-scroll-preloader").empty();
                    });
                    $.refreshScroller();
                }, 1000);
        }


        if($(this).find('.infinite-scroll.active').attr('id') == "tab2"){
             tabIndex = 1;
               loading = false;
               if (loading||$("#findjoblist li ").length<10) {
                      
                  return
             }
          
               setTimeout(function() {
              
                 loading = false;

                var pageNum = $("#rent_pageNum").val();

                   if (pageNum == 1) {
                       $('#tab1 .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
                   }

                $("#rent_pageNum").val(++pageNum);

                var param = marriage.joblist.data();
                 param.pageNum = pageNum;
                 param.PageSize = 10;
                marriage.tool.ajax(marriage.config.jobList, param, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    };
                    if (d.totalPage > param.pageNum) {
                       
                         var list = juicer(marriage.tpl.indexjobListTpl(), d);
                        $("#findjoblist").append(list);  
                    }
                    else if(d.totalPage == param.pageNum){
                        var list = juicer(marriage.tpl.indexjobListTpl(), d);
                        $("#findjoblist").append(list);
                        $("#tab2 .infinite-scroll-preloader .preloader").empty();
                        $("#tab2 .infinite-scroll-preloader").html(marriage.config.constant['0014']);

                          return
                    }
                }, function(xhr, type) {
                    $.alert(marriage.config.constant['0001']);
                    $("#tab2 .infinite-scroll-preloader").empty();
                });
                $.refreshScroller();
            }, 1000);
        }

      });
}(Zepto);




var itemIcon=function (item){
 var icon=getRequires(item.info_type,item.require);
 icon+=getPriceType(item.info_type,item.price_type);
 icon+=getSex(item.sex);
 return icon;   
}

var pubItemIcon=function(item){
 var icon='';
 icon+='<span class="icon pos-r rup-icon" onclick="rupPublish('+item.type+','+item.id+')"></span>';
 icon+='<a class="icon icon-share pos-share alert-text" style="margin-right: 0.2rem;"></a>';
 icon+=getPriceType(item.type,item.price_type); 
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
    marriage.tool.ajax(marriage.config.storeinfo, data, null, 'post', function(d) {
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
        $.alert(marriage.config.constant['0001']);
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

    marriage.tool.ajax(marriage.config.reportinfo, data, null, 'post', function(d) {
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
        $.alert(marriage.config.constant['0001']);
    });



}


function historyWatch(info_id, info_type,panduan) {
    var data = {
        'info_id': info_id,
        'info_type': info_type
    }
      marriage.tool.ajax(marriage.config.isreport, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && marriage.config.constant['0003'] == d.data) {
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
                $.toast(marriage.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });


             marriage.tool.ajax(marriage.config.isstore, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && marriage.config.constant['0003'] == d.data) {
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
                $.toast(marriage.config.constant['0001'], function() {
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


function getoptionRequire(type) {
    if (1 == type) {
        return '需全职';
    } else if (2 == type) {
        return '可兼职';
    } else if (3 == type) {
        return '需夜班';
    } else if (4 == type) {
        return '有正常班';
    } else if (5 == type) {
        return '有补贴';
    }else if (6 == type) {
        return '有年终奖';
    } else if (7 == type) {
        return '有提成';
    } else if (8 == type) {
        return '可报路费';
    } else if (9== type) {
        return '包住';
    }else if (10== type) {
        return '包吃';
    }else if (11 == type) {
        return '需出差';
    } else if (12 == type) {
        return '可残疾人';
    } else if (13 == type) {
        return '三险一金';
    } else if (14 == type) {
        return '五险一金';
    } 
}

var indexquery=true; 


/*获取验证码*/
var isPhone = 1;
function getCode(e){
    checkPhone(); //验证手机号码
    if(isPhone){
        resetCode(); //倒计时
    }else{
        $('#pubScenic_tel').focus();
    }
}

//验证手机号码
function checkPhone(){

    var phone = $('#pubScenic_tel').val();
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
    var telephone = $("#pubScenic_tel").val();
     var data = {
        telephone:telephone,
        type:80
        };

    marriage.tool.ajax(marriage.config.identify, data, null, 'post', function(d) {
        if (d.data && marriage.config.constant['0002'] == d.data) {
               $.toast("已发送")
            }else if(d.data && marriage.config.constant['7001'] == d.data){
                 $.toast("短信类型不存在")
            }else if(d.data && marriage.config.constant['7000'] == d.data){
                  $.toast("参数不全")
            }else if(d.data && marriage.config.constant['7002'] == d.data){
                  $.toast("半小时内已经连续获取三次，请稍后再试")
            }else if(d.data && marriage.config.constant['7003'] == d.data){
                  $.toast("一分钟内已经发送过，不能频繁发送")
            }else if(d.data && marriage.config.constant['7004'] == d.data){
                  $.toast("该手机号已经注册过")
            }else if(d.data && marriage.config.constant['7005'] == d.data){
                  $.toast("手机格式有误")
            }
         
    }, function(xhr, type) {
        $.toast(marriage.config.constant['0001'], function() {
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
    },1000);
}


    $(".fileElem-photo1").click(function () {

        $("#chooseFile").click()
    })


    function doUpload(self) {
        // alert(1)
        var formData = new FormData();
        formData.append('up_file', self.files[0])
            $.ajax({
            url: '/uploadFile',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
      
            success:function (data) {
            console.log(data)
           if (data.data != "ERROR") {
                $(self).attr('data', data.data)
                $(self).parents('.bao_img').find('#pubScenic_backimg').html('<div class="title1"><img class="filesss123" src="' + data.data + '" /></div>')

            }

        }
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


 
