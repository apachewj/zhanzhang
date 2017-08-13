window.publish = window.publish || {};
var baseUrl = 'http://localhost:8080';
var filedate=publish;
var uploaddebug = true;
var test=false;


var debug = false;

+ function($) {
    "use strict";

    window.publish = window.publish || {};

    var baseUrl = 'http://localhost:8080';


    publish.config = {
        baseUrl: '',
        loginUrl: baseUrl + '/service/zhuce.html',
        uploadFile: baseUrl + '/uploadFile',
        reportinfo: baseUrl + '/user/report',
        storeinfo: baseUrl + '/user/store',
        crowdIsPass:baseUrl + '/user/crowd/CrowdIsPass',
        addCrowdHongshizi:baseUrl + '/user/crowd/addCrowdHongshizi',
        addCrowdYiyuan:baseUrl + '/user/crowd/addCrowdYiyuan',
        addZhanghao:baseUrl + '/user/crowd/addZhanghao',
        addShenfen:baseUrl + '/user/crowd/addShenfen',        
        MyList:baseUrl + '/user/My_List',
        deletePubList:baseUrl + '/user/MyDelete',
        reflashPubList:baseUrl + '/user/MyReflash',
        DonateList:baseUrl + '/user/crowd/CrowdDonate',
        peopleserviceDetail: baseUrl + '/user/people_service_detail',
        pagepeopleserviceDetail: baseUrl + '/service.html#pagePeopleServiceDetail',
        passNoticeBaomingList:baseUrl + '/user/notice/passNoticeBaomingList',
        DoPassNoticeBaoming:baseUrl + '/user/notice/DoPassNoticeBaoming',
        setUserStatus:baseUrl + '/user/travel/setUserStatus',
        setFankui:baseUrl + '/user/notice/setFankui',
        
        
        
        
        

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
            '0013': '刷新成功!',
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
            '5001': '请输入身份证号!',
            '5002': '请输入真实姓名!',
            '5003': '请输入持卡人!',
            '5004': '请输入卡号!',
            '5005': '请选择银行!',

           
            '8003': '请填写爱心!',
            '8004': '却少id!',




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

    window.publish = window.publish || {}; 

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
                 if (!publish.tool.validation.grea02Decimal(value)) {
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
                 if (!publish.tool.validation.isMobile(value)) {
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
                 if (!publish.tool.validation.digits(value)) {
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
             } 
         }

         

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
                    var round = $("div[name='" + els[i].el + "'][check='true']");
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

    publish.tpl = {

             jingquListTpl: function(data) {

           return ['{@each data as item}',
                    '<li >',
                    '<div class="left_tit">','{@if item.types==1}', '景区-景区',  '{@/if}','</div>',
                    '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                    '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                    '{@/if}',
                    '<div class="clear"></div>',
                    '<a href="../service/tourism.html?id=${item.id}#pageScenicDetail" external class="item-link item-content">',
                      '{@if item.main_img}','<div class="item-media"><img src="${item.main_img.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                       '{@else if !item.main_img}', '',
                       '{@/if}',
                       '<div class="item-inner">',
                        '<div class="item-title-row">',
                          '<div class="item-title">${item.title}</div>',
                          '<div class="item-after ptimg" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img class="d_pic" src="images/u13.png"></div>',
                        '</div>',
                        
                        '<div class="item-text">${item.content.split(",")[0]}</div>',
                      '</div>',
                       '</a>',

                        '<div class="caozuo">',
                        '<dl>',
                        '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                        '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                        '<a href="../service/tourism.html?id=${item.id}#pagepubScenic" external><dt><div class="fair" >编辑</div></dt></a>',
                        '</dl> ',
                        '</div>',
                        '<div class="clear"></div>',
                   '</li>',
       
                     '{@/each}'
             ].join('');
        },

         peiyouListTpl: function(data) {

           return ['{@each data as item}',
                    '<li><div class="fulei">',
                           '<div class="left_tit">','{@if item.types==2}', '景区-陪游',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                        '<div class="clear"></div>',
                            '<a href="../service/tourism.html?id=${item.id}#pageyoudetailes" external class="item-link item-content">',
                              '{@if item.img_path}','<div class="item-media"><img src="${item.img_path.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                   '{@else if !item.img_path}', '',
                                   '{@/if}',
                               '<div class="item-inner">',
                                 '<div class="tab2_content">',
                                       '<div>',
                                      '<div class="col-20">${item.username}</div>',
                                      '<div class="col-20">',
                                      '{@if item.sex==1}', '男', 
                                     '{@else if item.sex==2}', '女',
                                    '{@/if}',
                                      '</div>',
                                      '<div class="col-20">${item.age}岁</div>',
                                    '</div>',
                                         '<div>',
                                      '<div class="col-60">${item.price}/天</div>',
                                      '<div class="col-60">${item.hours}小时</div>',
                                    
                                    '</div>',
                                    '<span>${item.message}</span>  ',
                                    '</div>',
                                    '<div class=" peiyou_status" >',
                                    '{@if item.user_status==1}', '<div class="you_status">空闲</div>', 
                                    '{@else if item.user_status==2}', '<div class="you_status2">忙碌</div>',
                                     '{@/if}','</div>',
                                    '{@if item.car_c==1}', '<div class="addcar">车+导</div>', 
                                     '{@else if item.car_c==2}', ,
                                     '{@/if}',
                                  '</div>',
                               '</a>',
                                '<div class="caozuo_bm">',
                                '<dl>',
                                '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                '<a href="../service/tourism.html?id=${item.id}#pagePostDemand" external><dt><div class="fair">编辑</div></dt></a>',
                                '<dt><div class="people_num">',
                                 '<div class=" item-input" onclick="setUserStatus(', "'${item.id}',this)", '">',
                                '<label class="label-switch pull-right">',
                                  '{@if item.user_status==1}', '<input type="checkbox"  name="laidianwo" class="peiyoucheckbox">',
                                    '<div class="checkbox"></div>', 
                                    '{@else if item.user_status==2}', '<input type="checkbox"  checked="true" name="laidianwo" class="peiyoucheckbox">',
                                    '<div class="checkbox"></div>',
                                     '{@/if}','</div>',
                                   
                                '</label>',
                                '</div>',
                                '</div></dt>',
                                '</dl> ',
                                '</div>',
                                '<div class="clear"></div>',
                          '</div></li>',
                     '{@/each}'
             ].join('');
        },

        bianminfuwuListTpl: function(data) {

           return ['{@each data as item}',
                            '<li>',
                           '<div class="left_tit">','{@if item.types==3}', '便民服务',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                               '<div class="clear"></div>',
                                '<a href="../service/service.html?id=${item.id}#pagePeopleServiceDetail" external class="item-link item-content" >',
                              '{@if item.img_path}','<div class="item-media"><img src="${item.img_path.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                   '{@else if !item.img_path}', '',
                                   '{@/if}',
                                   '<div class="item-inner">',
                                    '<div class="item-title-row">',
                                               '<div class="item-text wei_title">${item.title}</div>',
                                      '<div class="item-after ptimg" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img class="d_pic" src="images/u13.png"></div>',
                                    '</div>',
                                    
                                      '<div class="n_num_1">',
                                        '<div><span>','{@if item.money}','${item.money}元','{@else if !item.money}', '面议','{@/if}','</span><span>','{@if item.unit}','/${item.unit}','{@else if !item.unit}', '','{@/if}','</span></div>',
                                       '</div>',
                                    '<div class="item-title wei_text"><time>${item.create_time}</time></div>',
                                  '</div>',
                                   '</a>',
                                    '<div class="caozuo">',
                                    '<dl>',
                                    '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                    '<dt><div class="false " onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                    '<a href="../service/service.html?id=${item.id}#pagePubZPeopleService" class="orange" external><dt><div class="fair " >编辑</a></div></dt></a>',
                                    '</dl> ',
                                    '</div>',
                                    '<div class="clear"></div>',
                              '</li>',
                     '{@/each}'
             ].join('');
        },

         bianminxuqiuListTpl: function(data) {

           return ['{@each data as item}',
                            '<li>',
                           '<div class="left_tit">','{@if item.types==4}', '便民需求',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                               '<div class="clear"></div>',
                                '<a href="../service/service.html?id=${item.id}#pagePeopleNeedDetail" external    class="item-link item-content">',
                              '{@if item.img_path}','<div class="item-media"><img src="${item.img_path.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                   '{@else if !item.img_path}', '',
                                   '{@/if}',
                                   '<div class="item-inner">',
                                    '<div class="item-title-row">',
                                               '<div class="item-text wei_title">${item.title}</div>',
                                      '<div class="item-after ptimg" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img class="d_pic" src="images/u13.png"></div>',
                                    '</div>',
                                    
                                      '<div class="n_num_1">',
                                        '<div><span>','{@if item.money}','${item.money}元','{@else if !item.money}', '面议','{@/if}','</span><span>','{@if item.unit}','/${item.unit}','{@else if !item.unit}', '','{@/if}','</span></div>',
                                       '</div>',
                                    '<div class="item-title wei_text"><time>${item.create_time}</time></div>',
                                  '</div>',
                                   '</a>',
                                    '<div class="caozuo">',
                                    '<dl>',
                                    '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                    '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                    '<a href="../service/service.html?id=${item.id}#pagePubZPeopleNeed" external><dt><div class="fair">编辑</div></dt></a>',
                                    '</dl> ',
                                    '</div>',
                                    '<div class="clear"></div>',
                              '</li>',
                     '{@/each}'
             ].join('');
        },

         zhenghuiListTpl: function(data) {

           return ['{@each data as item}',
                             '<li>',
                      '<div class="sct-bd1">',
                        '<div class="left_tit">','{@if item.types==5}', '征婚',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                               '<div class="clear"></div>',
                      '</div> ',
               '<div class="sct-bd">',
                   '<div class="situation-box-item situation-box-objecitem " >',
                   '{@if item.imgs}',  '<a class="click-point"   href="../service/Marriage_Recruitment.html?id=${item.id}#pageObjectIntroduction" external>',
                    '<img class="round_pic" src="${item.imgs.split(",")[0] }" />',
                    '{@if item.sex==1}', '<div class="sex_pic"><img src="images/zdx_img_xb_ns.png" /></div>', 
                    '{@else if item.sex==2}', '<div class="sex_pic"><img src="images/zdx_img_xb_nx.png" /></div>',
                    '{@/if}',
                    '</a>',
                    '{@else if !item.imgs}', '',
                    '{@/if}',    
                              '<div class="ituation-box-item_content">',
                                  '<a  href="../service/Marriage_Recruitment.html?id=${item.id}#pageObjectIntroduction" external>',
                                      '<h5>${item.nickname}', 
                                             '{@if item.idcard}', '<img src="images/zdx_img_sfz.png">', 
                                            '{@else if !item.idcard}', '',
                                            '{@/if}',
                                            '{@if item.tel}', '<img src="images/zdx_img_sj.png">', 
                                            '{@else if !item.tel}', '',
                                            '{@/if}',
                                            '<img src="images/zdx_img_wz.png">',
                                             '{@if item.distance}', '${item.distance}km', 
                                            '{@else if !item.distance}', '',
                                            '{@/if}',
                                            
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
                                           '<img  src="images/zdx_btn_fxx.png" >',
                                   '</div>  ',
                              '</div>',
                          '</div>',
                          '</div>',
                               '<div class="clear"></div>',
                                 '<div class="caozuo">',
                                    '<dl>',
                                    '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                    '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                    '<a href="../service/Marriage_Recruitment.html?id=${item.id}#pagepubScenic" external><dt><div class="fair">编辑</div></dt></a>',
                                    '</dl> ',
                                    '</div>',
                                    '<div class="clear"></div>',
                        '</li> ',
                     '{@/each}'
             ].join('');
        },
     

         zhaogongzuoListTpl: function(data) {

           return ['{@each data as item}',
                             '<li>',
                      '<div class="sct-bd1">',
                        '<div class="left_tit">','{@if item.types==6}', '找工作',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                               '<div class="clear"></div>',
                      '</div> ',
                    '<div class="sct-bd">',
                         '{@if item.img}',
                                 '<div class="situation-box-item " >',
                                      '<a class="click-point" href="../service/Marriage_Recruitment.html?id=${item.id}#pagePostJobDetail" external>', 
                                            '<img src="${item.img.split(",")[0] }" style="display: inline-block;">',
                                      '</a>',
                                      '<div class="ituation-box-item_content">',
                                          '<a href="../service/Marriage_Recruitment.html?id=${item.id}#pagePostJobDetail" external>',
                                              '<h5>${item.title}</h5>',
                                              '<div class="linestyle">',
                                                   '<em>${item.income}</em>',
                                                   '<strong>${item.degrees}</strong>',
                                              '</div>',
                                              '<span>${item.county_name}</span>',
                                          '</a>',
                                      '</div>',
                                '</div>',
                            '{@else if !item.imgs}', '',
                                    '<div class="situation-box-item situation-box-itemstyle" >',
                                        '<div >',
                                            '<a href="../service/Marriage_Recruitment.html?id=${item.id}#pagePostJobDetail" external>',
                                                '<h5>${item.title}',
                                                    '<time>${item.createtime}</time>',
                                                '</h5>',
                                                '<div class="linestyle">',
                                                     '<span>${item.county_name}</span>',
                                                     '<em>${item.income}</em>',
                                                     '<strong>${item.degrees}</strong>',
                                                '</div>',
                                            '</a>',
                                        '</div>',
                                    '</div>',
                            '{@/if}',
                                '<div class="clear"></div>',
                              '<div class="caozuo">',
                                    '<dl>',
                                    '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                    '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                    '<a href="../service/Marriage_Recruitment.html?id=${item.id}#pagePostJob" external><dt><div class="fair">编辑</div></dt></a>',
                                    '</dl> ',
                                    '</div>',
                                    '<div class="clear"></div>',       
                            '</li> ',
                     '{@/each}'
             ].join('');
        },
            zhaopingListTpl: function(data) {

           return ['{@each data as item}',
                             '<li>',
                      '<div class="sct-bd1">',
                        '<div class="left_tit">','{@if item.types==7}', '招聘',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                               '<div class="clear"></div>',
                      '</div> ',
                      '<div class="sct-bd">',
                                '<div class="situation-box-item situation-box-itemstyle" >',
                                        '<div onclick="pagejobDetail(', "'${item.id}')", '">',
                                            '<a href="../service/Marriage_Recruitment.html?id=${item.id}#pagePostJobDetail"  external >',
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
                                    '</div>',
                            
                                '<div class="clear"></div>',
                              '<div class="caozuo">',
                                    '<dl>',
                                    '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                    '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                    '<a href="../service/Marriage_Recruitment.html?id=${item.id}#pagePostRecruit" external><dt><div class="fair">编辑</div></dt></a>',
                                    '</dl> ',
                                    '</div>',
                                    '<div class="clear"></div>',       
                            '</li> ',
                     '{@/each}'
             ].join('');
        },
           
              nonginyumuListTpl: function(data) {

           return ['{@each data as item}',
                          '<li>',
                           '<div class="left_tit">','{@if item.types==8}', '农林渔牧',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                               '<div class="clear"></div>',
              '<a  class="item-link item-content list_supply" onclick="pagenonglinDetail(', "'${item.maintype}','${item.id}','${item.isneed}')", '">',
                '{@if item.imgs}','<div class="item-media"><img src="${item.imgs.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                   '{@else if !item.imgs}', '',
                   '{@/if}',
                   '<div class="item-inner">',
                     '<div class="item-title-row">',
                     '{@if item.title}','<div class="item-title">${item.title}</div>',
                    '{@else if !item.title}', '',
                    '{@/if}',
                        
                     '</div>',
                         '<div class="item-title-row">',
                              '<div class="item-title item_fontstyle">${item.province_name}&nbsp;${item.city_name}&nbsp;${item.county_name}</div>',
                              '<div class="item-after item-after_price">',
                               '{@if item.pricetype==1}', '', 
                                '{@else if item.pricetype==2}', '≥',
                                '{@else if item.pricetype==3}', '≤',
                                '{@/if}',
                                '{@if item.price=="面议"}','面议','{@else}', '${item.price}元','{@/if}','{@if item.priceunit}','/${item.priceunit}','{@else if !item.priceunit}', '','{@/if}',
                                '</div>',
                          '</div>',
                          '<div class="item-title-row">',
                              '<div class="position_icon"> ',
                                   '<img class="d_pic" src="images/u13.png" onclick="showMap(', "'${item.location_x}','${item.location_y}','',1)", '">',
                              '</div>',
                              '<div class="item-after item_fontstyle ">2016-04-25 13:06</div>',
                          '</div>',
                '</div> ',
            '</a>',
                          '<div class="clear"></div>',
                              '<div class="caozuo">',
                                    '<dl>',
                                    '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                    '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                    '<dt onclick="pagenonglinPub(', "'${item.maintype}','${item.id}','${item.isneed}')", '")"><div class="fair">编辑</div></dt>',
                                    '</dl> ',
                                    '</div>',
                                    '<div class="clear"></div>',       
                            '</li> ',
                     '{@/each}'
             ].join('');
        },


        aixinListTpl: function(data) {

           return ['{@each data as item}',
                                  '<li>',
                                      '<input type="hidden" id="info_id" >',
                                        '<div class="left_tit">','{@if item.types==9}', '爱心众筹-','{@if item.leftday > 0}','进行中','{@else if item.leftday <= 0}', '已结束','{@/if}',  '{@/if}','</div>',
                                                    '<div class="right_btn2"><a onclick="juankuanDetail(', "'${item.id}')", '" style="color:#fff;">查看</a></div>',
                                                    '<div class="clear"></div>',
                                                  '<a href="../service/love.html?id=${item.id}#pagelovedetails" external class="item-link item-content" >',
                                                    '{@if item.img_path}','<div class="item-media"><img src="${item.img_path.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                                   '{@else if !item.img_path}', '',
                                                   '{@/if}',
                                                    '<div class="item-inner">',
                                                      '<div class="item-title-row">',
                                                        '<div class="item-title">${item.title}</div>',
                                                      '</div>',
                                                      '<div class="item-text">${item.content.split(",")[0]}</div>',
                                                    '</div>',

                                                  '</a>',
                                    '<div class="renzhen">',
                                       '<div class="row row3">',
                                        '<a  class="xx">',
                                        '<div class="col-10 rem">',
                                        '<img src="images/xx1.png" />',
                                        '</div>',
                                        '<div class="col-45 yy" onclick="pagepanduanye(', "'${item.id}','2')", '" id="authentication" name="type" data-pub="2"> &nbsp;&nbsp;&nbsp;身份认证</div>',
                                       
                                        
                                        '</a>',
                                        '<a  class="xx">',
                                        '<div class="col-10 rem">',
                                        '<img src="images/xx2.png" />',
                                        '</div>',
                                        '<div class="col-45 yy" onclick="pagepanduanye(', "'${item.id}','3')", '" id="hospital" name="type" data-pub="3"> &nbsp;&nbsp;&nbsp;医院认证</div>',
                                       
                                        
                                        '</a>',
                                        '</div>',
                                       '<div class="row row3">',
                                        '<a  class="xx">',
                                        '<div class="col-10 rem">',
                                        '<img src="images/xx3.png" />',
                                       '</div>',
                                        '<div class="col-45 yy" onclick="pagepanduanye(', "'${item.id}','4')", '" id="bankcard" name="type" data-pub="4">银行卡认证</div>',
                                         
                                        
                                       '</a>',
                                       '<a  class="xx" >',
                                        '<div class="col-10 rem">',
                                        '<img src="images/xx4.png" />',
                                         '</div>',
                                        '<div class="col-45 yy" onclick="pagepanduanye(', "'${item.id}','1')", '" id="redcross" name="type" data-pub="1">红十字认证 </div>',
                                        
                                       
                                       '</a>',
                                        '</div>',
                                    '</div>',
                                      '<div class="ptimg1" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img class="d_pic" src="images/u13.png"></div>',
                                           '<div class="pinglun1">',
                                                  '<dl>',
                                                    '<dt style="border:none"><div class="true1">筹款:</div><div class="true_num1">','{@if item.money}','${item.money}','{@else if !item.money}', '0','{@/if}','元</div></dt>',
                                                    '<dt><div class="true1">已筹:</div><div class="true_num1">','{@if item.have}','${item.have}','{@else if !item.have}', '0','{@/if}','元</div></dt>',
                                                   
                                                    '<dt><div class="true1">支持:</div><div class="true_num1">','{@if item.mans}','${item.mans}','{@else if !item.mans}', '0','{@/if}','人</div></dt>',
                                                    '<dt><div class="true1">剩余:</div><div class="true_num1">',
                                                    '{@if item.leftday > 0}','${item.leftday}',
                                                    '{@else if item.leftday <= 0}', '0',
                                                   '{@/if}',
                                                    '天</div></dt>',
                                                      '<div class="clear"></div>',
                                                 '</dl>',
                                                  
                                          '</div>',
                                            '<div class="clear"></div>',
                                             '<div class="caozuo">',
                                                '<dl>',
                                                '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                                '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                                '<a href="../service/love.html?id=${item.id}#pagefabu" external><div class="fair" ><dt>编辑</div></dt></a>',
                                                '</dl> ',
                                                '</div>',
                                                '<div class="clear"></div>',    
                                    '</li>',
                             '{@/each}'
                     ].join('');
                },

         bendiqiyeListTpl: function(data) {

           return ['{@each data as item}',
                           '<li class="type1">',
                                '<div class="left_tit">','{@if item.types==10}', '本地企业',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                '<div class="clear"></div>',
                                '<a href="../service/Local_enterprise.html?id=${item.id}#pageEnterpriseDetail" external class="item-link item-content">',
                                      '{@if item.main_img}','<div class="item-media"><img src="${item.main_img.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                       '{@else if !item.main_img}', '',
                                       '{@/if}',
                                       '<div class="item-inner">',
                                        '<div class="item-title-row">',
                                          '<div class="item-title">${item.com_name}</div>',
                                          '<div class="item-after ptimg"  onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img class="d_pic" src="images/u13.png"></div>',
                                        '</div>',
                                        
                                        '<div class="item-text">${item.message}</div>',
                                      '</div>',
                                 '</a>',

                                    '<div class="caozuo">',
                                    '<dl>',
                                    '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                    '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                    '<a href="../service/Local_enterprise.html?id=${item.id}#pagePubMyenterprise" external><dt><div class="fair">编辑</div></dt></a>',
                                    '</dl> ',
                                    '</div>',
                                    '<div class="clear"></div>',
                               '</li>',
                     
                     
                     '{@/each}'
             ].join('');
        },
        
         juanzengrecordListTpl: function(data) {

           return ['{@each data as item}',
                        
                          '<div class="card-content">',
                            '<div class="list-block media-list">',
                              '<ul>',
                                '<li class="item-content">',
                                  '{@if item.img}','<div class="item-media"><img src="${item.img.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                  '{@else if !item.img}', '',
                                  '{@/if}',
                                  '<div class="item-inner">',
                                    '<div class="item-title-row">',
                                         
                                          '{@if item.username}','<div class="item-title">${item.username}</div>',
                                          '{@else if !item.username}','<div class="item-title">匿名</div>',
                                          '{@/if}',
                                         
                                      '<div class="item-after" >捐款金额:<span class="juanzengnum">¥${item.money}</span></div>',
                                    '</div>',
                                    '{@if item.tel}','<div class="item-subtitle">联系方式：${item.tel}</div>',
                                    '{@else if !item.tel}','',
                                    '{@/if}',
                                    '{@if item.address}','<div class="item-subtitle">联系地址：${item.address}</div>',
                                    '{@else if !item.address}','',
                                    '{@/if}',
                                    '{@if !item.address  && !item.tel && item.content}','<div class="item-subtitle">留言：${item.content}</div>',
                                    '{@else if !item.address  && !item.tel && !item.content}','',
                                    '{@/if}',
                                  '</div>',
                                '</li>',
                              '</ul>',
                            '</div>',
                          '</div>',                       
                        '{@if item.address || item.tel && item.content}',
                               '<div class="card-footer">',
                                     '<span>留言：${item.content}</span> ',
                                '</div>',
                        '{@else if  !item.content}','',
                         '{@/if}', 
                     '{@/each}'
             ].join('');
        },
         tongzhiListTpl: function(data) {

           return ['{@each data as item}',
                               '<li>',
                                '<div class="left_tit">','{@if item.types==12}', '通知',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                '<div class="clear"></div>',
                                    '<a href="../service/Convenience_notice.html?id=${item.id}#pagenoticedetails" external class="item-link item-content">',
                                      '{@if item.main_img}','<div class="item-media"><img src="${item.main_img.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                       '{@else if !item.main_img}', '',
                                       '{@/if}',
                                       '<div class="item-inner">',
                                        '<div class="item-title-row">',
                                          '<div class="item-text wei_title">${item.title}</div>',
                                        '</div>',
                                          '<div class="n_num_1"><img src="images/bmtz_lll.png" width="17"><span>', '{@if item.wartchs}','${item.wartchs}','{@else if !item.wartchs}', '0','{@/if}', '</span></div>',
                                        '<div class="item-title wei_text">发布时间: <time>${item.create_time}</time></div>',
                                      '</div>',
                                       '</a>',
                                         '<div class="caozuo">',
                                    '<dl>',
                                    '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                    '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                    '<a href="../service/Convenience_notice.html?id=${item.id}#pagePostnotice" external><dt><div class="fair">编辑</div></dt></a>',
                                    '</dl> ',
                                    '</div>',
                                        '<div class="clear"></div>',
                                  '</li>',
                     '{@/each}'
             ].join('');
        },
        baominListTpl: function(data) {

           return ['{@each data as item}',
                                    '<li>',
                                '<div class="left_tit">','{@if item.types==13}', '报名',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                '<div class="clear"></div>',
                                    '<a href="../service/Convenience_notice.html?id=${item.id}#pageenrolldetails" external class="item-link item-content">',
                                      '{@if item.main_img}','<div class="item-media"><img src="${item.main_img.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                       '{@else if !item.main_img}', '',
                                       '{@/if}',
                                       '<div class="item-inner">',
                                        '<div class="item-title-row">',
                                          '<div class="item-text wei_title">${item.title}</div>',
                                        '</div>',
                                       '<div class="n_num_1">',
                                            '<div>需报<span>', '{@if item.nums}','${item.nums}','{@else if !item.nums}', '0','{@/if}', '</span>人/已报<span>', '{@if item.havenum}','${item.havenum}','{@else if !item.havenum}', '0','{@/if}', '</span>人</div>',
                                          '<img src="images/bmtz_lll.png" width="17"><span>', '{@if item.wartchs}','${item.wartchs}','{@else if !item.wartchs}', '0','{@/if}', '</span></div>',
                                        '<div class="item-title wei_text">开始时间: <time>${item.starttime}</time></div>',
                                        '<div class="item-title wei_text">结束时间: <time>${item.endtime}</time></div>',
                                      '</div>',
                                       '</a>',
                                        '<div class="caozuo_bm">',
                                        '<dl>',
                                        '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                        '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                        '<a href="../service/Convenience_notice.html?id=${item.id}#pagePostenroll" external><dt><div class="fair">编辑</div></dt></a>',
                                        '<dt><div class="people_num" onclick="openWindow(', "'${item.id}')", '">报名人数', '{@if item.havenum}','${item.havenum}/${item.nums}','{@else if !item.havenum}', '0/${item.nums}','{@/if}','</div></dt>',
                                        '</dl> ',
                                        '</div>',
                                        '<div class="clear"></div>',
                                  '</li>',
                     '{@/each}'
             ].join('');
        },

        fanguiListTpl: function(data) {

           return ['{@each data as item}',
                               '<li><div class="fulei">',
                                '<div class="left_tit">','{@if item.types==14}', '反馈',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                '<div class="clear"></div>',
                                    '<a href="../service/Convenience_notice.html?id=${item.id}#pagefeedbackdetails" external class="item-link item-content">',
                                      '{@if item.main_img}','<div class="item-media"><img src="${item.main_img.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                       '{@else if !item.main_img}', '',
                                       '{@/if}',
                                       '<div class="item-inner">',
                                        '<div class="item-title-row">',
                                          '<div class="item-text wei_title">${item.title}</div>',
                                        '</div>',
                                          '<div class="n_num_1"><img src="images/bmtz_lll.png" width="17"><span>', '{@if item.wartchs}','${item.wartchs}','{@else if !item.wartchs}', '0','{@/if}', '</span></div>',
                                        '<div class="item-title wei_text">发布时间: <time>${item.create_time}</time></div>',
                                      '</div>',
                                       '{@if item.pass==1}','<div class="settled" >已解决</div>','{@else if item.pass==0}', '<div class="settled" style="display:none">已解决</div>','{@/if}',
                                       '</a>',
                                          '<div class="caozuo_bm">',
                                        '<dl>',
                                        '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                        '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                        '<a href="../service/Convenience_notice.html?id=${item.id}#pagePostfeedback" external><dt><div class="fair">编辑</div></dt></a>',
                                        '<dt onclick="setFankui(', "'${item.id}',this)", '"><div class="people_num setsolved" >设为已解决</div></dt>',
                                        '</dl> ',
                                        '</div>', 
                                    
                                    '<div class="clear"></div>',
                                  '</div></li>',
                     '{@/each}'
             ].join('');
        },

         qiuzhengListTpl: function(data) {

           return ['{@each data as item}',
                               '<li>',
                                '<div class="left_tit">','{@if item.types==15}', '求证',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                '<div class="clear"></div>',
                                    '<a href="../service/Convenience_notice.html?id=${item.id}#pageconfirmdetails" external class="item-link item-content">',
                                      '{@if item.main_img}','<div class="item-media"><img src="${item.main_img.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                       '{@else if !item.main_img}', '',
                                       '{@/if}',
                                       '<div class="item-inner">',
                                        '<div class="item-title-row">',
                                          '<div class="item-text wei_title">${item.title}</div>',
                                        '</div>',
                                          '<div class="n_num_1"><img src="images/bmtz_lll.png" width="17"><span>', '{@if item.wartchs}','${item.wartchs}','{@else if !item.wartchs}', '0','{@/if}', '</span></div>',
                                        '<div class="item-title wei_text">发布时间: <time>${item.create_time}</time></div>',
                                      '</div>',
                                       '</a>',
                                       '<div class="pinglun">',
                                            '<dl>',
                                            '<dt style="border:none"><div class="true">真的</div><div class="true_num">', '{@if item.truenum}','${item.truenum}','{@else if !item.truenum}', '0','{@/if}', '</div></dt>',
                                            '<dt><div class="false">假的</div><div class="false_num">', '{@if item.falsenum}','${item.falsenum}','{@else if !item.falsenum}', '0','{@/if}', '</div></dt>',
                                            '<dt><div class="fair">不好说</div><div class="fair_num">', '{@if item.notsurenum}','${item.notsurenum}','{@else if !item.notsurenum}', '0','{@/if}', '</div></dt>',
                                            '</dl> ',
                                         '</div>',   
                                         '<div class="clear"></div>', 
                                    '<div class="caozuo">',
                                    '<dl>',
                                    '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                    '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                    '<a href="../service/Convenience_notice.html?id=${item.id}#pagePostconfirm" external><dt><div class="fair">编辑</div></dt></a>',
                                    '</dl> ',
                                    '</div>',
                                    '<div class="clear"></div>',
                                  '</li>',
                     '{@/each}'
             ].join('');
        },
         zhengqiuListTpl: function(data) {

           return ['{@each data as item}',
                               '<li>',
                                '<div class="left_tit">','{@if item.types==16}', '征求',  '{@/if}','</div>',
                                '{@if item.status==1}', '<div class="right_btn1">已发布</div>', 
                                '{@else if item.status==2}', '<div class="right_btn">草稿</div>',
                                '{@/if}',
                                '<div class="clear"></div>',
                                    '<a href="../service/Convenience_notice.html?id=${item.id}#pageseekdetails" external class="item-link item-content">',
                                      '{@if item.main_img}','<div class="item-media"><img src="${item.main_img.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                       '{@else if !item.main_img}', '',
                                       '{@/if}',
                                       '<div class="item-inner">',
                                        '<div class="item-title-row">',
                                          '<div class="item-text wei_title">${item.title}</div>',
                                        '</div>',
                                          '<div class="n_num_1"><img src="images/bmtz_lll.png" width="17"><span>', '{@if item.wartchs}','${item.wartchs}','{@else if !item.wartchs}', '0','{@/if}', '</span></div>',
                                        '<div class="item-title wei_text">发布时间: <time>${item.create_time}</time></div>',
                                      '</div>',
                                       '</a>',
                                       '<div class="zantong">',
                                                  '<dl>',
                                                    '<dt style="border:none"><div class="true">赞同</div><div class="true_num">', '{@if item.truenum}','${item.truenum}','{@else if !item.truenum}', '0','{@/if}', '</div></dt>',
                                                    '<dt><div class="false">不赞同</div><div class="false_num">', '{@if item.falsenum}','${item.falsenum}','{@else if !item.falsenum}', '0','{@/if}', '</div></dt>',
                                                 '</dl> ',
                                          '</div>',
                                         '<div class="clear"></div>', 
                                    '<div class="caozuo">',
                                    '<dl>',
                                    '<dt style="border:none"><div class="true" onclick="delPub(', "'${item.types}','${item.id}')", '">删除</div></dt>',
                                    '<dt><div class="false" onclick="reflashPub(', "'${item.types}','${item.id}')", '">刷新</div></dt>',
                                    '<a href="../service/Convenience_notice.html?id=${item.id}#pagePostseek" external><dt><div class="fair">编辑</div></dt></a>',
                                    '</dl> ',
                                    '</div>',
                                    '<div class="clear"></div>',
                                  '</li>',
                     '{@/each}'
             ].join('');
        },


         baominliebiaoListTpl: function(data) {

           return ['{@each data as item}',
                            '{@if item.pass==0}',
                            '<li >',
                            '<a href="#" class="item-link item-content">',
                            '<div class="item-inner">',
                            '<div class="item-title-row">',
                            '<div class="item-title">称呼：${item.name}</div>',
                            '</div>',
                            '<div class="item-title ">性别：','{@if item.sex==1}','男','{@else if item.sex==2}', '女','{@/if}','</div>',
                            '<div class="item-title">电话：${item.tel}</div>',
                            '<div class="item-title">留言：','{@if item.content!=null}','${item.content}','{@else if !item.content}', '无','{@/if}','</div>',
                            '<div class="item-text right grey" id="alreadyagree" style="display:none">已同意</div>',
                            '<div class="item-text right grey" id="alreadydisagree" style="display:none">已拒绝</div>',
                            '</div>',
                            '</a>',
                            '<div class="zantong" >',
                            '<dl>',
                            '<dt style="border:none" onclick="agree(', "'${item.id}')", '"  id="agreebaoming"><div class="orange">同意</div></dt>',
                            '<dt onclick="disagree(', "'${item.id}')", '" id="disagreebaoming"><div class="orange">拒绝</div></dt>',
                            '<dt style="border:none"><div class="orange dian"><img src="images/dianhua.png" />电话联系</div></dt>',
                            '<div class="clear"></div>',
                            '</dl> ',
                            '</div>',
                            '<div class="clear"></div>',
                            '</li>',
                            '{@else if item.pass==1}',
                            '<li >',
                            '<a href="#" class="item-link item-content">',
                            '<div class="item-inner">',
                            '<div class="item-title-row">',
                            '<div class="item-title">称呼：${item.name}</div>',
                            '<div class="item-text right grey">已同意</div>',
                            '</div>',
                            '<div class="item-title ">性别：','{@if item.sex==1}','男','{@else if item.sex==2}', '女','{@/if}','</div>',
                            '<div class="item-title">电话：${item.tel}</div>',
                            '<div class="item-title">留言：',
                            '{@if item.content!=null}','${item.content}','{@else if !item.content}', '无','{@/if}',
                            '</div>',
                            '</div>',
                            '</a>',
                            '<div class="zantong" >',
                            '<dl>',
                       
                            '<dt style="border:none"><div class="orange dian" ><img src="images/dianhua.png" />电话联系</div></dt>',
                            '<div class="clear"></div>',
                            '</dl>',
                            '</div>',
                            '<div class="clear"></div>',
                            '</li>',
                            '{@else if item.pass==2}',
                            '<li >',
                            '<a href="#" class="item-link item-content">',
                            '<div class="item-inner">',
                            '<div class="item-title-row">',
                            '<div class="item-title">称呼：${item.name}</div>',
                            '<div class="item-text right grey">已拒绝</div>',
                            '</div>',
                            '<div class="item-title ">性别：','{@if item.sex==1}','男','{@else if item.sex==2}', '女','{@/if}','</div>',
                            '<div class="item-title">电话： ${item.tel}</div>',
                            '<div class="item-title">留言：','{@if item.content!=null}','${item.content}','{@else if !item.content}', '无','{@/if}','</div>',
                            '</div>',
                            '</a>',
                            '<div class="zantong" >',
                            '<dl>',
                           
                            '<dt style="border:none"><div class="orange dian"><img src="images/dianhua.png" />电话联系</div></dt>',
                            '<div class="clear"></div>',
                            '</dl> ',
                            '</div>',
                            '<div class="clear"></div>',
                            '</li>',
                            '{@/if}',
                     '{@/each}'
             ].join('');
        },
 };

    publish.tool = {
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
                        if($.device.os=="android"){
                            javascript:login.nologin();
                        }else if($.device.os=="ios"){
                            location.href = publish.config.loginUrl;
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
                    navigator.geolocation.watchPosition(publish.tool.currentPosition.updatePosition,
                        publish.tool.currentPosition.error);
                } else {
                    $.toast("浏览器无法获取您的位置信息！");
                }
            }
        }
    };
  

   publish.index = {
        data: function() {
            var data = {};
                 var criterias = [
              
                {
                    el: 'type',
                    pro: 'types',
                    type: 'text'
                }
              
            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },
   
       query: function() {
          
            
            var data = publish.index.data();
            
            if (debug) {
                console.log("index:");
                console.log(data);
            };
            
              var pageNum = $("#rent_pageNum").val(1);
             $('.mobanlist .infinite-scroll-preloader').html('');
             $('.mobanlist .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
            // if (0 == data.types) {
            //    publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
            //     if (debug) {
            //         console.log(d);
            //     }
            //     if (d.data && publish.config.constant['0003'] == d.data) {
            //         $.alert(publish.config.constant['0012']);

            //         $("#jingquList").empty();
            //         $("#peiyouList").empty();
            //         $("#bianminfuwuList").empty();
            //         $("#bianminxuqiuList").empty();
            //         $("#zhenghuiList").empty();
            //         $("#zhaogongzuoList").empty();
            //         $("#zhaopingList").empty();
            //         $("#nonginyumuList").empty();
            //         $("#aixinList").empty();
            //         $("#bendiqiyeList").empty();
            //         $("#tongzhiList").empty();
            //         $("#fanguiList").empty();
            //         $("#qiuzhengList").empty();
            //         $("#zhengqiuList").empty();
            //     } else if (d) {
            //         console.info(d)
            //         var list = juicer(publish.tpl.jingquListTpl(), d);
            //         $("#jingquList").empty();
            //         $("#peiyouList").empty();
            //         $("#bianminfuwuList").empty();
            //         $("#bianminxuqiuList").empty();
            //         $("#zhenghuiList").empty();
            //         $("#zhaogongzuoList").empty();
            //         $("#zhaopingList").empty();
            //         $("#nonginyumuList").empty();
            //         $("#aixinList").empty();
            //         $("#bendiqiyeList").empty();
            //         $("#tongzhiList").empty();
            //         $("#fanguiList").empty();
            //         $("#qiuzhengList").empty();
            //         $("#zhengqiuList").empty();
            //         $("#jingquList").html(list);
                     
            //     }
            //     $.hidePreloader();
            //     // timer();
            // }, function(xhr, type) {

            //     $.alert(publish.config.constant['0001']);
            //     $.hidePreloader();
            // });
            
            // }else 
            if(1 == data.types){
            
              publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);

                    $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
                } else if (d) {
                    console.info(d)
                    var list = juicer(publish.tpl.jingquListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#jingquList").html(list);
                   
                    if($("#jingquList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(2 == data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
              
                } else if (d) {
                    
                    var list = juicer(publish.tpl.peiyouListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#peiyouList").html(list);
                     if($("#peiyouList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(3 == data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
              
                } else if (d) {
                    
                    var list = juicer(publish.tpl.bianminfuwuListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#bianminfuwuList").html(list);
                     if($("#bianminfuwuList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(4 == data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
              
                } else if (d) {
                    
                    var list = juicer(publish.tpl.bianminxuqiuListTpl(), d);
                    $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#bianminxuqiuList").html(list);
                    if($("#bianminxuqiuList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(5== data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
              
                } else if (d) {
                    
                    var list = juicer(publish.tpl.zhenghuiListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#zhenghuiList").html(list);
                    if($("#zhenghuiList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(6== data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
         
                     
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
                } else if (d) {
                    
                    var list = juicer(publish.tpl.zhaogongzuoListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#zhaogongzuoList").html(list);
                    if($("#zhaogongzuoList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(7== data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
                } else if (d) {
                    
                    var list = juicer(publish.tpl.zhaopingListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#zhaopingList").html(list);
                    if($("#zhaopingList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(8== data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
                } else if (d) {
                    
                    var list = juicer(publish.tpl.nonginyumuListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#nonginyumuList").html(list);
                     if($("#nonginyumuList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(9 == data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
              
                } else if (d) {
                    
                    var list = juicer(publish.tpl.aixinListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#aixinList").html(list);
                      if($("#aixinList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(10== data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
                } else if (d) {
                    
                    var list = juicer(publish.tpl.bendiqiyeListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#bendiqiyeList").html(list);
                    if($("#bendiqiyeList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    } 
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(12== data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                    $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
                } else if (d) {
                    
                    var list = juicer(publish.tpl.tongzhiListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#tongzhiList").html(list);
                       if($("#tongzhiList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(13== data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                    $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
                } else if (d) {
                    
                    var list = juicer(publish.tpl.baominListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#baominList").html(list);
                     if($("#baominList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(14== data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                    $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
                } else if (d) {
                    
                    var list = juicer(publish.tpl.fanguiListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#fanguiList").html(list);
                      if($("#fanguiList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(15== data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                    $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
                } else if (d) {
                    
                    var list = juicer(publish.tpl.qiuzhengListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#qiuzhengList").html(list);
                      if($("#qiuzhengList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(16== data.types){
            
               publish.tool.ajax(publish.config.MyList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                    $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $('.mobanlist .infinite-scroll-preloader').empty(); 
                     return;
                } else if (d) {
                    
                    var list = juicer(publish.tpl.zhengqiuListTpl(), d);
                     $("#jingquList").empty();
                    $("#peiyouList").empty();
                    $("#bianminfuwuList").empty();
                    $("#bianminxuqiuList").empty();
                    $("#zhenghuiList").empty();
                    $("#zhaogongzuoList").empty();
                    $("#zhaopingList").empty();
                    $("#nonginyumuList").empty();
                    $("#aixinList").empty();
                    $("#bendiqiyeList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#zhengqiuList").html(list);
                     if($("#zhengqiuList li").length<10){
                          $('.mobanlist .infinite-scroll-preloader').empty(); 
                          return;
                    }
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(publish.config.constant['0001']);
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
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
            // $.showPreloader();
           publish.tool.ajax(publish.config.DonateList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                    $("#juanzengrecordList").empty();
  
                } else if (d) {
                    var list = juicer(publish.tpl.juanzengrecordListTpl(), d);
            
                     $("#juanzengrecordList").html(list);
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(publish.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
      
  };



     publish.crowdIsPass = {

        // data: function() {
        //     var data = {};
        //          var criterias = [
              
        //         {
        //             el: 'type',
        //             pro: 'type',
        //             type: 'btnRound'
        //         },{
        //             el: 'info_id',
        //             pro: 'info_id',
        //             type: 'text'
        //         }
        //       ];
        //    selectVal(criterias, data);
        //    console.info(data)
        //    return data;
        // },
         
       query: function(id,type) {
           
            var data = {
              info_id: id,
              type:type
            };
            if (debug) {
                console.log("index:");
                
            };

              
          if (1 == data.type) {
            publish.tool.ajax(publish.config.crowdIsPass, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                     $.router.load("#pagehongshizi"); 
                    
                    
                } else if (d) {
                    if (0==d.pass) {
                            $.router.load("#redcrossBeingAudited"); 
                    }else if (1==d.pass) {
                        $.router.load("#redcrossAlreadyPass"); 
                    }else if (2==d.pass) {
                        $.router.load("#redcrossfailedpass"); 
                    }
                 
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
            }else if(2 == data.type){
                 publish.tool.ajax(publish.config.crowdIsPass, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.router.load("#pageshenfen"); 
                    
                    
                } else if (d) {
                 
                        
                   if (0==d.pass) {
                            $.router.load("#authenticationBeingAudited"); 
                    }else if (1==d.pass) {
                        $.router.load("#authenticationAlreadyPass"); 
                    }else if (2==d.pass) {
                        $.router.load("#authenticationfailedpass"); 
                    }
                 
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(3 == data.type){
                 publish.tool.ajax(publish.config.crowdIsPass, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                     $.router.load("#pageyiyuan"); 
                    
                    
                } else if (d) {
                    if (0==d.pass) {
                            $.router.load("#hospitalBeingAudited"); 
                    }else if (1==d.pass) {
                        $.router.load("#hospitalAlreadyPass"); 
                    }else if (2==d.pass) {
                        $.router.load("#hospitalfailedpass"); 
                    }
                 
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(4 == data.type){
                 publish.tool.ajax(publish.config.crowdIsPass, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.router.load("#pagezhanghao"); 
                    
                    
                } else if (d) {
            
                       
                if (0==d.pass) {
                            $.router.load("#bankcardBeingAudited"); 
                    }else if (1==d.pass) {
                        $.router.load("#bankcardAlreadyPass"); 
                    }else if (2==d.pass) {
                        $.router.load("#bankcardfailedpass"); 
                    }
                 
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           }
        },

        init: function() {
            publish.crowdIsPass.query();
        }
    };


    //发布红十字会
   publish.addCrowdHongshizi = {
        data: function() {
            var addCrowdHongshizidatas = [
            {
                id: 'addCrowdHongshizi_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['3001']
                    } 
                }
            },{
                id: 'addCrowdHongshizi_id',
                pro: 'crowd_id',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['8004']
                    } 
                }
            },{
                id: 'addCrowdHongshizi_link_name',
                pro: 'link_name',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['5002']
                    } 
                }
            },{
                id: 'addCrowdHongshizi_link_tel',
                pro: 'link_tel',
                eleType: 'input',
                valids: { 
                    'require': {
                        'is': true,
                        'msg': publish.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': publish.config.constant['4001']
                    } 
                }
            }];
           
            return validationToValue(addCrowdHongshizidatas);

        },

        submit: function() {

            var data= publish.addCrowdHongshizi.data();
           
            if (debug) {
                console.log('addCrowdHongshizi validation ' + '--> ');
                console.log(data);
            }
            if (data) {
        
                

                publish.tool.ajax(publish.config.addCrowdHongshizi, data, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && publish.config.constant['0002'] == d.data) { 
                        $.alert(publish.config.constant['0004'],function(){
                             $.router.load("#pageIndex"); 
                        });
                    } else if (d.data) {
                        $.alert(publish.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(publish.config.constant['0001']);
                });
            }
        },

        init: function() {
            var id = $("#addCrowdHongshizi_id").val();
            // if (id) {
            //     publish.pubCarFindPeople.eidt(id);
            // }
        }
    };

       //发布身份
   publish.addShenfen = {
        data: function() {
            var addShenfendatas = [
            {
                id: 'addShenfen_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['3001']
                    } 
                }
            },{
                id: 'addShenfen_idnumber',
                pro: 'idnumber',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['5001']
                    } 
                }
            },{
                id: 'addShenfen_truename',
                pro: 'truename',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['5002']
                    } 
                }
            },{
                id: 'addShenfen_id',
                pro: 'crowd_id',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['8004']
                    } 
                }
            }];
           
            return validationToValue(addShenfendatas);

        },

        submit: function() {

            var data= publish.addShenfen.data();
            console.info(data)

            if (debug) {
                console.log('addShenfen validation ' + '--> ');
                console.log(data);
            }
            if (data) {
        

                publish.tool.ajax(publish.config.addShenfen, data, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && publish.config.constant['0002'] == d.data) { 
                        $.alert(publish.config.constant['0004'],function(){
                             $.router.load("#pageIndex"); 
                        });
                    } else if (d.data) {
                        $.alert(publish.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(publish.config.constant['0001']);
                });
            }
        },

        init: function() {
            var id = $("#addShenfen_id").val();
            // if (id) {
            //     publish.pubCarFindPeople.eidt(id);
            // }
        }
    };

        //发布医院认证
   publish.addCrowdYiyuan = {
        data: function() {
            var addCrowdYiyuandatas = [
            {
                id: 'addCrowdYiyuan_imgs',
                pro: 'imgs',
                eleType: 'img',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['3001']
                    } 
                }
            },{
                id: 'addCrowdYiyuan_id',
                pro: 'crowd_id',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['8004']
                    } 
                }
            }];
           
            return validationToValue(addCrowdYiyuandatas);

        },

        submit: function() {

            var data= publish.addCrowdYiyuan.data();
           
            if (debug) {
                console.log('addCrowdYiyuan validation ' + '--> ');
                console.log(data);
            }
            if (data) {
        
          

                publish.tool.ajax(publish.config.addCrowdYiyuan, data, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && publish.config.constant['0002'] == d.data) { 
                        $.alert(publish.config.constant['0004'],function(){
                             $.router.load("#pageIndex"); 
                        });
                    } else if (d.data) {
                        $.alert(publish.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(publish.config.constant['0001']);
                });
            }
        },

        init: function() {
            var id = $("#addCrowdYiyuan_id").val();
            // if (id) {
            //     publish.pubCarFindPeople.eidt(id);
            // }
        }
    };

     //发布账号
   publish.addZhanghao = {
        data: function() {
            var addZhanghaodatas = [
            {
                id: 'addZhanghao_owner',
                pro: 'owner',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['5003']
                    } 
                }
            },{
                id: 'addZhanghao_cardnum',
                pro: 'cardnum',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['5004']
                    } 
                }
            },{
                id: 'addZhanghao_bank',
                pro: 'bank',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['5005']
                    } 
                }
            },{
                id: 'addZhanghao_bindtel',
                pro: 'bindtel',
                eleType: 'input',
                valids: { 
                    'require': {
                        'is': true,
                        'msg': publish.config.constant['3006']
                    },
                    'isMobile': {
                        'is': true,  
                        'msg': publish.config.constant['4001']
                    } 
                }
            },{
                id: 'addZhanghao_id',
                pro: 'crowd_id',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': publish.config.constant['8004']
                    } 
                }
            }];
           
            return validationToValue(addZhanghaodatas);

        },

        submit: function() {

            var data= publish.addZhanghao.data();
            console.info(data)

            if (debug) {
                console.log('addZhanghao validation ' + '--> ');
                console.log(data);
            }
            if (data) {
        
              

                publish.tool.ajax(publish.config.addZhanghao, data, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && publish.config.constant['0002'] == d.data) { 
                        $.alert(publish.config.constant['0004'],function(){
                             $.router.load("#pageIndex"); 
                        });
                    } else if (d.data) {
                        $.alert(publish.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(publish.config.constant['0001']);
                });
            }
        },

        init: function() {
            var id = $("#addZhanghao_id").val();
            // if (id) {
            //     publish.pubCarFindPeople.eidt(id);
            // }
        }
    };
      
       publish.passNoticeBaomingList = {
    
         
         query: function(id) {
       
           var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            // $("#" + els.elid).val(id);
            // $.router.load("#" + els.page);
    
            publish.tool.ajax(publish.config.passNoticeBaomingList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0003'] == d.data) {
                    $.alert(publish.config.constant['0012']);
                    
                    
                } else if (d) {
                     var list = juicer(publish.tpl.baominliebiaoListTpl(), d);
            
                     $("#baominliebiaoList").html(list);
                 
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           
        },
        
         agree: function(id) {
       
           var data = {
              info_id: id,
            };

            data['pass']=1;

            publish.tool.ajax(publish.config.DoPassNoticeBaoming, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0002'] == d.data) {
                      $("#agreebaoming").hide()
                      $("#disagreebaoming").hide() 
                      $("#alreadyagree").show() 
                } else if (d) {

                 
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           
        },
         disagree: function(id) {
       
           var data = {
              info_id: id,
            };

            data['pass']=2;

            publish.tool.ajax(publish.config.DoPassNoticeBaoming, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0002'] == d.data) {
                      $("#agreebaoming").hide()
                      $("#disagreebaoming").hide() 
                      $("#alreadydisagree").show() 
                } else if (d) {

                 
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           
        },
  
        init: function() {
          
        }
    };


       publish.setUserStatus = {
    
         
         query: function(id) {
       
           var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
    
            publish.tool.ajax(publish.config.setUserStatus, data, null, 'post', function(d) {
                console.info(d)
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0002'] == d.data) {
   
                } else if (d) {
                     $.alert("未切换成功!");
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           
        },
        

    };

        publish.setFankui = {
    
         
         query: function(id,text) {
       
           var data = {
              info_id: id,
            };
            if (debug) {
                console.log(data);
            }
    
            publish.tool.ajax(publish.config.setFankui, data, null, 'post', function(d) {
                console.info(d)
                if (debug) {
                    console.log(d);
                }
                if (d.data && publish.config.constant['0002'] == d.data) {
  
                } else if (d) {
                     
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(publish.config.constant['0001']);
                $.hidePreloader();
            });
           
        },
        

    };

       
    


    $(document).on("pageInit", function(e, pageId, $page) {
     
     if (pageId == "pageIndex") {
         
          // publish.crowdIsPass.query();

         var id = GetQueryString("id");
         if(id){
             $(".tab_title ul li").each(function(){
                 if($(this).find("a").attr("title")==id){
                     $(this).addClass("selected").siblings().removeClass("selected");
                 }
             })
             document.getElementById('type').value=id;
             publish.index.query();
         }else{
             $("#type").val(1)
             publish.index.query();
         }

         $(".tab_title ul li").click(function() {
           $(this).addClass("selected").siblings().removeClass("selected");
           var title = $(this).children("a").attr("title");
           document.getElementById('type').value=title;
       
           publish.index.query();
          

     });
    }else if (pageId == "pageFindJob") {

          // publish.recruitlist.query1();
     }
   
    });

    $(function() {
     
    $("#btnaddCrowdHongshizi").click(function() {
           publish.addCrowdHongshizi.submit();
        });
    $("#btnaddShenfen").click(function() {
           publish.addShenfen.submit();
        });
    $("#btnaddCrowdYiyuan").click(function() {
           publish.addCrowdYiyuan.submit();
        });
    $("#btnaddZhanghao").click(function() {
           publish.addZhanghao.submit();
        });
    // $("#authentication").click(function() {
    //         $("#authentication").attr("check",true);
    //         $("#hospital").attr("check",false);
    //         $("#bankcard").attr("check",false);
    //         $("#redcross").attr("check",false);
    //         publish.crowdIsPass.query();
    //     });
    // $("#hospital").click(function() {
    //         $("#authentication").attr("check",false);
    //         $("#hospital").attr("check",true);
    //         $("#bankcard").attr("check",false);
    //         $("#redcross").attr("check",false);
    //         publish.crowdIsPass.query();
    //     });
    // $("#bankcard").click(function() {
    //         $("#authentication").attr("check",false);
    //         $("#hospital").attr("check",false);
    //         $("#bankcard").attr("check",true);
    //         $("#redcross").attr("check",false);
    //         publish.crowdIsPass.query();
    //     });
    // $("#redcross").click(function() {
    //         $("#authentication").attr("check",false);
    //         $("#hospital").attr("check",false);
    //         $("#bankcard").attr("check",false);
    //         $("#redcross").attr("check",true);
    //         publish.crowdIsPass.query();
    //     });
    


});
    $.init();
 });




function pagenonglinPub(maintype,id,isneed){

     if(isneed==2){


         if (isneed==2&&1 == maintype) {
            
                 page = 'pageSupplyLandMines';
              

             }else if (isneed==2&&2 == maintype) {
              
                 page = 'pageSupplyHireEquipment';
            

             }else if (isneed==2&&3 == maintype) {
           
                 page = 'pageSupplyForage';
        

             }else if (isneed==2&&4 == maintype) {
        
                 page = 'pageSupplyFryMedicine';
         

             }else if (isneed==2&&5 == maintype) {
        
                 page = 'pageSupplySidelineProducts';
            

             }else if (isneed==2&&6 == maintype) {
       
                 page = 'pageSupplyFreshSeafood';


             }

     
   }else if(isneed==1){
       
           if (isneed==1&&1 == maintype) {
                
                 page = 'pageDemandLandMines';
             
             
             }else if (isneed==1&&2 == maintype) {
               
                 page = 'pageDemandHireEquipment';
           

             }else if (isneed==1&&3 == maintype) {
             
                 page = 'pageDemandForage';
     

             }else if (isneed==1&&4 == maintype) {

                 page = 'pageDemandFryMedicine';
            

             }else if (isneed==1&&5 == maintype) {
              
                 page = 'pageDemandSidelineProducts';
        

             }else if (isneed==1&&6 == maintype) {
      
                 page = 'pageDemandFreshSeafood';
         

             }
   
       }

       location.href="../service/Forestry_Fisheries.html?id="+id+"&maintype="+maintype+"#" + page;   

}


function pagenonglinDetail(maintype,id,isneed) {

    if(isneed==2){


         if (isneed==2&&1 == maintype) {
            
                 page = 'pageSupplyLandMines_details';
              

             }else if (isneed==2&&2 == maintype) {
              
                 page = 'pageSupplyHireEquipment_details';
            

             }else if (isneed==2&&3 == maintype) {
           
                 page = 'pageSupplyForage_details';
        

             }else if (isneed==2&&4 == maintype) {
        
                 page = 'pageSupplyFryMedicine_details';
         

             }else if (isneed==2&&5 == maintype) {
        
                 page = 'pageSupplySidelineProducts_details';
            

             }else if (isneed==2&&6 == maintype) {
       
                 page = 'pageSupplyFreshSeafood_details';


             }

     
   }else if(isneed==1){
       
           if (isneed==1&&1 == maintype) {
                
                 page = 'pageDemandLandMines_details';
             
             
             }else if (isneed==1&&2 == maintype) {
               
                 page = 'pageDemandHireEquipment_details';
           

             }else if (isneed==1&&3 == maintype) {
             
                 page = 'pageDemandForage_details';
     

             }else if (isneed==1&&4 == maintype) {

                 page = 'pageDemandFryMedicine_details';
            

             }else if (isneed==1&&5 == maintype) {
              
                 page = 'pageDemandSidelineProducts_details';
        

             }else if (isneed==1&&6 == maintype) {
      
                 page = 'pageDemandFreshSeafood_details';
         

             }
   
       }

       location.href="../service/Forestry_Fisheries.html?id="+id+"&maintype="+maintype+"#" + page;   
}
// function bianminfuwuupdate(id){
//         if (id) {
//                 //设置或添加cookie
//                  var str = "id"+ "=" + escape(id);
//                 if(1 > 0){
//                     var date = new Date();
//                     var ms = 1*3600*1000;
//                     date.setTime(date.getTime() + ms);
//                     str += "; expires=" + date.toGMTString();
//                 }
//                 document.cookie = str;
                
//                 location.href = "../service.html#pagePubZPeopleService";

//              }   
// }
function openWindow(id){

       publish.passNoticeBaomingList.query(id); 
       $(".light").css("display","block");
       $(".fade").css("display","block");  

}

function closeWindow(){
   $(".light").css("display","none");
   $(".fade").css("display","none");
}

function agree(id){

       publish.passNoticeBaomingList.agree(id); 
}

function disagree(id){

       publish.passNoticeBaomingList.disagree(id); 
}

function  setUserStatus(id,e){
     var $star = $(e);
      

     if($star.parents(".fulei").find(".peiyoucheckbox").is(":checked")){ 
         $("input[name='laidianwo']").attr('check', true);
         $star.parents(".fulei").find(".peiyou_status").text("空闲").removeClass('you_status2').addClass('you_status');
       }else{
        $("input[name='laidianwo']").attr('check', false);
         $star.parents(".fulei").find(".peiyou_status").text("忙碌").removeClass('you_status').addClass('you_status2');


       }
      publish.setUserStatus.query(id);   
     
}

function setFankui(id,e){
    
   var $star = $(e);


       
 $star.parents(".fulei").find(".settled").css("display","block");

  publish.setFankui.query(id);   



}       

            



function juankuanDetail(id) {
 if (id) {
      elid = 'juankuanDetaile_id';
     page = 'pagejuankuanjilu';
     _field = 'juankuanDetaile_';
 }
 publish.index.detail(id, {
     'elid': elid,
     'page': page,
     '_field': _field
 });
}

function pagepanduanye(id,type) {
 if (type==1) {
     $("#addCrowdHongshizi_id").val(id)

 }else if(type==2){
     $("#addShenfen_id").val(id)
 }else if(type==3){
     $("#addCrowdYiyuan_id").val(id)
 }else if(type==4){
     $("#addZhanghao_id").val(id)
 }
  publish.crowdIsPass.query(id, type)
}


function delPub(types, id) {
    $.confirm('您确定要删除该信息吗?', function() {
        var data = {
            id: id,
            types: types
        };
        publish.tool.ajax(publish.config.deletePubList, data, null, 'post', function(d) {
            
            if (debug) {
                console.log(d.data);
            };
            if (d.data && publish.config.constant['0002'] == d.data) {
                $.alert(publish.config.constant['0010'], function() {
                  
                    publish.index.query(types);
                });
            } else if (d.data) {
                $.alert(publish.config.constant['0011']);
            }
        }, function(xhr, type) {
            $.alert(publish.config.constant['0001']);
        });
    });
}
function reflashPub(types, id) {
         


        var data = {
            id: id,
            types: types
        };


        publish.tool.ajax(publish.config.reflashPubList, data, null, 'post', function(d) {
            if (debug) {
                console.log(d.data);
            };
            if (d.data && publish.config.constant['0002'] == d.data) {
                $.alert(publish.config.constant['0013'], function() {

                     // var list = juicer(publish.tpl.bianminfuwuListTpl(), d.data);
                     // $star.parents(".fulei").parent().html(list);

                });
            } 
        }, function(xhr, type) {
            $.alert(publish.config.constant['0001']);
        });
    
}


    
    var loading = false;
    $(document).on('infinite', function() {
        // if (loading||$(".mobanlist li").length<10) {
        //     $('.mobanlist .infinite-scroll-preloader').empty(); 
        //      return
        // }
       var pageNum = $("#rent_pageNum").val();
        loading = true;
        setTimeout(function() {
            loading = false;
               if (loading) {
             return
        }
            // if (pageNum==1) {
            //     $('.mobanlist .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
            // }
            $("#rent_pageNum").val(++pageNum);
            var param = publish.index.data();
            param.pageNum = pageNum;
            param.PageSize = 10;
            publish.tool.ajax(publish.config.MyList, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d.data && publish.config.constant['0003'] == d.data) {
                   
                    $('.mobanlist .infinite-scroll-preloader').html('已显示到最后一页!');
                    return
                } else if (d['data'][0].types) {
                    console.info(d['data'][0].types )
                    if(d['data'][0].types==1){
                        var list = juicer(publish.tpl.jingquListTpl(), d);
                        $("#jingquList").append(list);
                    }else if(d['data'][0].types==2){
                        var list = juicer(publish.tpl.peiyouListTpl(), d);
                        $("#peiyouList").append(list);
                    }else if(d['data'][0].types==3){
                        var list = juicer(publish.tpl.bianminfuwuListTpl(), d);
                        $("#bianminfuwuList").append(list);
                    }else if(d['data'][0].types==4){
                        var list = juicer(publish.tpl.bianminxuqiuListTpl(), d);
                        $("#bianminxuqiuList").append(list);
                    }else if(d['data'][0].types==5){
                        var list = juicer(publish.tpl.zhenghuiListTpl(), d);
                        $("#zhenghuiList").append(list);
                    }else if(d['data'][0].types==6){
                        var list = juicer(publish.tpl.zhaogongzuoListTpl(), d);
                        $("#zhaogongzuoList").append(list);
                    }else if(d['data'][0].types==7){
                        var list = juicer(publish.tpl.zhaopingListTpl(), d);
                        $("#zhaopingList").append(list);
                    }else if(d['data'][0].types==8){
                        var list = juicer(publish.tpl.nonginyumuListTpl(), d);
                        $("#nonginyumuList").append(list);
                    }else if(d['data'][0].types==9){
                        var list = juicer(publish.tpl.aixinListTpl(), d);
                        $("#aixinList").append(list);
                    }else if(d['data'][0].types==10){
                        var list = juicer(publish.tpl.bendiqiyeListTpl(), d);
                        $("#bendiqiyeList").append(list);
                    }else if(d['data'][0].types==12){
                        var list = juicer(publish.tpl.tongzhiListTpl(), d);
                        $("#tongzhiList").append(list);
                    }else if(d['data'][0].types==13){
                        var list = juicer(publish.tpl.baominListTpl(), d);
                        $("#baominList").append(list);
                    }else if(d['data'][0].types==14){
                        var list = juicer(publish.tpl.fanguiListTpl(), d);
                        $("#fanguiList").append(list);
                    }else if(d['data'][0].types==15){
                        var list = juicer(publish.tpl.qiuzhengListTpl(), d);
                        $("#qiuzhengList").append(list);
                    }else if(d['data'][0].types==16){
                        var list = juicer(publish.tpl.zhengqiuListTpl(), d);
                        $("#zhengqiuList").append(list);
                    }
                    
                }
            }, function(xhr, type) {
                $.alert(publish.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
    });




   
      



// + function($) {
//     "use strict";

//     var loading = false;
//     $(document).on('infinite', '#pageFindObject .infinite-scroll-bottom', function() {
//         if (loading||$("#querymarryList li").length<10) {
//              return
//         }
        
//         loading = true;
//         setTimeout(function() {
//             loading = false;
//             var pageNum = $("#sell_pageNum").val();
//             if (pageNum==1) {
//                 $('#pageSellContent .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
//             }
//             $("#sell_pageNum").val(++pageNum);
//             var param = publish.index.data();
//             param.pageNum = pageNum;
//             param.PageSize = 10;
//             publish.tool.ajax(publish.cist, param, null, 'post', function(d) {
//                 if (debug) {
//                     console.log(d);
//                 };
//                 if (d.data && publish.config.constant['0003'] == d.data) {
//                     $.alert(publish.config.constant['0014']);
//                 } else if (d) {
//                     var list = juicer(publish.tpl.indexListTpl(), d);
//                     $("#querymarryList").append(list);
//                 }
//             }, function(xhr, type) {
//                 $.alert(publish.config.constant['0001']);
//             });
//             $.refreshScroller();
//         }, 500);
//     });

// }(Zepto);




// var itemIcon=function (item){
//  var icon=getRequires(item.info_type,item.require);
//  icon+=getPriceType(item.info_type,item.price_type);
//  icon+=getSex(item.sex);
//  return icon;   
// }

// var pubItemIcon=function(item){
//  var icon='';
//  icon+='<span class="icon pos-r rup-icon" onclick="rupPublish('+item.type+','+item.id+')"></span>';
//  icon+='<a class="icon icon-share pos-share alert-text" style="margin-right: 0.2rem;"></a>';
//  icon+=getPriceType(item.type,item.price_type); 
//  return icon;
// }


// function collectItem(e, info_id, info_type) {
//     var $star = $(e);
//     var add;
//     var remove;
//     var data = {
//         info_id: $('#' + info_id).val(),
//         info_type: info_type
//     };
//     publish.tool.ajax(publish.config.storeinfo, data, null, 'post', function(d) {
//         if (debug) {
//             console.log(d.data);
//         }
//         if (d.data && publish.config.constant['0002'] == d.data) {
//             $.alert(publish.config.constant['0006']);
//             add = 'scstart-fill';
//             remove = 'scstart-line';
//         } else if (d.data && publish.config.constant['0009'] == d.data) {
//             add = 'scstart-fill';
//             remove = 'scstart-line';
//             $.alert(publish.config.constant['0007']);
//         } else if (d.data) {
//             add = 'scstart-line';
//             remove = 'scstart-fill';
//             $.alert(publish.config.constant['0008']);
//         }
//         collectIcon($star, add, remove);
//     }, function(xhr, type) {
//         add = 'scstart-line';
//         remove = 'scstart-fill';
//         collectIcon($star, add, remove);
//         $.alert(publish.config.constant['0001']);
//     });
// }


// function reportItem(e, info_id, info_type) {
//     var $star = $(e);
//     var add;
//     var remove;
//     var data = {
//         info_id: $('#' + info_id).val(),
//         info_type: info_type
//     };
//     publish.tool.ajax(publish.config.reportinfo, data, null, 'post', function(d) {
//         if (debug) {
//             console.log(d.data);
//         }
//         if (d.data && publish.config.constant['0002'] == d.data) {
//             $.alert(publish.config.constant['6004']);
//             add = 'jbstart-fill';
//             remove = 'start-line';
//         } else if (d.data && publish.config.constant['0009'] == d.data) {
//             add = 'jbstart-fill';
//             remove = 'jbstart-line';
//             $.alert(publish.config.constant['0007']);
//         } else if (d.data) {
//             add = 'jbstart-line';
//             remove = 'jbstart-fill';
//             $.alert(publish.config.constant['0008']);
//         }
//         reportIcon($star, add, remove);
//     }, function(xhr, type) {
//         add = 'jbstart-line';
//         remove = 'jbstart-fill';
//         reportIcon($star, add, remove);
//         $.alert(publish.config.constant['0001']);
//     });
// }



// function collectIcon($star, add, remove) {
//     $star.removeClass(remove).addClass(add);
// }

// function reportIcon($star, add, remove) {
//     $star.removeClass(remove).addClass(add);
// }



var indexquery=true;




function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(decodeURI(r[2]));
    return null;
}












