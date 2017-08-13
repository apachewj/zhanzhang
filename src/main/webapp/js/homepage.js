window.homepage = window.homepage || {};
    var baseUrl = 'http://localhost:8080';

var filedate=homepage;

var uploaddebug = true;
var test=false;



var debug = false;

+ function($) {
    "use strict";

    window.homepage = window.homepage || {};

    var baseUrl = 'http://localhost:8080';

    var filedata = homepage;

    homepage.config = {
         baseUrl: '/web',
         loginUrl: baseUrl + '/service/zhuce.html',
  
         findAd: baseUrl + '/findAd',
         AllList: baseUrl + '/user/zhancheck/AllList',
         

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
 
    var viewAd = function(_m, data) {

          var html = [];
          var imgcontext = new Array();

         for (var key in data) {

             var value = $.trim(data[key].img);
             // var showtype = $.trim(data[key].showtype);
             var title = $.trim(data[key].imgcontext);
             // imgcontext.push($.trim(data[key].imgcontext))

            
                if (data && data.length > 0 && data[0] != '') {
                  var list = $('#' + _m + 'img' + '_List');

                  var ipot=value.lastIndexOf(".");
                  var type=fileType(value.substring(ipot+1)); 
                if (type=='image') {
                     html.push('<div class="swiper-slide"><img src="' + value+ '" alt="" style="width: 100%" ><div class="text" data-swiper-parallax="-300" data-swiper-parallax-duration="600"><p>'+title+'</p></div></div>')
            
                } 
             }
        
         }
      
       if (html.length > 0) {
                   list.html(html.join(''));
        }
        // console.info(imgcontext)

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

    homepage.tpl = {

             jingquListTpl: function(data) {

           return ['{@each data as item}',
                    '<li >',
            
                    '<a href="../service/tourism.html?id=${item.id}#pageScenicDetail" external class="item-link item-content">',
                      '{@if item.main_img}','<div class="item-media"><img src="${item.main_img.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                       '{@else if !item.main_img}', '',
                       '{@/if}',
                       '<div class="item-inner">',
                        '<div class="item-title-row">',
                          '<div class="item-title">${item.title}</div>',
                          '<div class="item-after ptimg" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img src="images/tong_btn_dwtz.png"/></div>',
                        '</div>',
                        
                        '<div class="item-text">${item.content}</div>',
                      '</div>',
                       '</a>',

                   '</li>',
       
                     '{@/each}'
             ].join('');
        },

         peiyouListTpl: function(data) {

           return ['{@each data as item}',
                    '<li><div class="fulei">',

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
                                    '<div class="you_status peiyou_status" >',
                                    '{@if item.user_status==1}', '空闲', 
                                    '{@else if item.user_status==2}', '忙碌',
                                     '{@/if}','</div>',
                                    '{@if item.car_c==1}', '<div class="addcar">车+导</div>', 
                                     '{@else if item.car_c==2}', ,
                                     '{@/if}',
                                  '</div>',
                               '</a>',
                                
                          '</div></li>',
                     '{@/each}'
             ].join('');
        },

        bianminfuwuListTpl: function(data) {

           return ['{@each data as item}',
                            '<li>',
                         
                                '<a href="../service/service.html?id=${item.id}#pagePeopleServiceDetail" external class="item-link item-content" >',
                              '{@if item.img_path}','<div class="item-media"><img src="${item.img_path.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                   '{@else if !item.img_path}', '',
                                   '{@/if}',
                                   '<div class="item-inner">',
                                    '<div class="item-title-row">',
                                               '<div class="item-text wei_title">${item.title}</div>',
                                      '<div class="item-after ptimg" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img src="images/tong_btn_dwtz.png"/></div>',
                                    '</div>',
                                    
                                      '<div class="n_num_1">',
                                        '<div><span>${item.money}元/${item.unit}</span></div>',
                                       '</div>',
                                    '<div class="item-title wei_text"><time>${item.create_time}</time></div>',
                                  '</div>',
                                   '</a>',
                                   
                              '</li>',
                     '{@/each}'
             ].join('');
        },

         bianminxuqiuListTpl: function(data) {

           return ['{@each data as item}',
                            '<li>',
                   
                                '<a href="../service/service.html?id=${item.id}#pagePeopleNeedDetail" external    class="item-link item-content">',
                              '{@if item.img_path}','<div class="item-media"><img src="${item.img_path.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                   '{@else if !item.img_path}', '',
                                   '{@/if}',
                                   '<div class="item-inner">',
                                    '<div class="item-title-row">',
                                               '<div class="item-text wei_title">${item.title}</div>',
                                      '<div class="item-after ptimg" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img src="images/tong_btn_dwtz.png"/></div>',
                                    '</div>',
                                    
                                      '<div class="n_num_1">',
                                        '<div><span>${item.money}元/${item.unit}</span></div>',
                                       '</div>',
                                    '<div class="item-title wei_text"><time>${item.create_time}</time></div>',
                                  '</div>',
                                   '</a>',
                                   
                              '</li>',
                     '{@/each}'
             ].join('');
        },

         zhenghuiListTpl: function(data) {

           return ['{@each data as item}',
                             '<li>',
                   
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
                           
                        '</li> ',
                     '{@/each}'
             ].join('');
        },
     

         zhaogongzuoListTpl: function(data) {

           return ['{@each data as item}',
                             '<li>',
     
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
                                            '<a href="../service/Marriage_Recruitment.html?id=${item.id}#pagePostJob" external>',
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

                            '</div>',
                            
                            '</li> ',
                     '{@/each}'
             ].join('');
        },
            zhaopingListTpl: function(data) {

           return ['{@each data as item}',
                             '<li>',

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
                              '</div>',  
                            
                            '</li> ',
                     '{@/each}'
             ].join('');
        },
           
              nonginyumuListTpl: function(data) {

           return ['{@each data as item}',
                          '<li>',
   
              '<a  class="item-link item-content list_supply" onclick="pagenonglinDetail(', "'${item.maintype}','${item.id}','${item.isneed}')", '">',
                '{@if item.imgs}','<div class="item-media"><img src="${item.imgs.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                   '{@else if !item.imgs}', '',
                   '{@/if}',
                   '<div class="item-inner">',
                     '<div class="item-title-row">',
                        '<div class="item-title">${item.title}</div>',
                     '</div>',
                         '<div class="item-title-row">',
                              '<div class="item-title item_fontstyle">${item.province_name}&nbsp;${item.city_name}&nbsp;${item.county_name}</div>',
                              '<div class="item-after item-after_price">',
                               '{@if item.pricetype==1}', '', 
                                '{@else if item.pricetype==2}', '≥',
                                '{@else if item.pricetype==3}', '≤',
                                '{@/if}',
                                '${item.price}元/${item.priceunit}',
                                '</div>',
                          '</div>',
                          '<div class="item-title-row">',
                              '<div class="position_icon"> ',
                                   '<img src="images/tong_btn_dwtz.png" onclick="showMap(', "'${item.location_x}','${item.location_y}','',1)", '">',
                              '</div>',
                              '<div class="item-after item_fontstyle ">2016-04-25 13:06</div>',
                          '</div>',
                '</div> ',
            '</a>',
                          '<div class="clear"></div>',
                
                            '</li> ',
                     '{@/each}'
             ].join('');
        },


        aixinListTpl: function(data) {

           return ['{@each data as item}',
                                  '<li>',
                                      '<input type="hidden" id="info_id" >',
                                        
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
                                    // '<div class="renzhen">',
                                    //    '<div class="row row3">',
                                    //     '<a href="#pageshenfen" class="xx">',
                                    //     '<div class="col-10 rem">',
                                    //     '<img src="images/xx1.png" />',
                                    //     '</div>',
                                    //     '<div class="col-45 yy" id="authentication" name="type" data-pub="2"> &nbsp;&nbsp;&nbsp;身份认证</div>',
                                       
                                        
                                    //     '</a>',
                                    //     '<a href="#pageyiyuan" class="xx">',
                                    //     '<div class="col-10 rem">',
                                    //     '<img src="images/xx2.png" />',
                                    //     '</div>',
                                    //     '<div class="col-45 yy" id="hospital" name="type" data-pub="3"> &nbsp;&nbsp;&nbsp;医院认证</div>',
                                       
                                        
                                    //     '</a>',
                                    //     '</div>',
                                    //    '<div class="row row3">',
                                    //     '<a href="#pagezhanghao" class="xx">',
                                    //     '<div class="col-10 rem">',
                                    //     '<img src="images/xx3.png" />',
                                    //    '</div>',
                                    //     '<div class="col-45 yy" id="bankcard" name="type" data-pub="4">银行卡认证</div>',
                                         
                                        
                                    //    '</a>',
                                    //    '<a class="xx" >',
                                    //     '<div class="col-10 rem">',
                                    //     '<img src="images/xx4.png" />',
                                    //      '</div>',
                                    //     '<div class="col-45 yy" id="redcross" name="type" data-pub="1">红十字认证 </div>',
                                        
                                       
                                    //    '</a>',
                                    //     '</div>',
                                    // '</div>',
                                      '<div class="ptimg1" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img src="images/tong_btn_dwtz.png"></div>',
                                           '<div class="pinglun1">',
                                                  '<dl>',
                                                    '<dt style="border:none"><div class="true1">筹款:</div><div class="true_num1">${item.money}元</div></dt>',
                                                    '<dt><div class="true1">已筹:</div><div class="true_num1">${item.have}元</div></dt>',
                                                    '<dt><div class="true1">支持:</div><div class="true_num1">${item.mans}人</div></dt>',
                                                    '<dt><div class="true1">剩余:</div><div class="true_num1">${item.leftday}天</div></dt>',
                                                      '<div class="clear"></div>',
                                                 '</dl>',
                                                  
                                          '</div>',
                                            '<div class="clear"></div>',
                                     
                                    '</li>',
                             '{@/each}'
                     ].join('');
                },

         bendiqiyeListTpl: function(data) {

           return ['{@each data as item}',
                           '<li class="type1">',
  
                                '<a href="../service/Local_enterprise.html?id=${item.id}#pageEnterpriseDetail" external class="item-link item-content">',
                                      '{@if item.main_img}','<div class="item-media"><img src="${item.main_img.split(",")[0]}" style="display:block;width: 4rem;border-radius: .2rem;height: 4rem;"></div>',
                                       '{@else if !item.main_img}', '',
                                       '{@/if}',
                                       '<div class="item-inner">',
                                        '<div class="item-title-row">',
                                          '<div class="item-title">${item.com_name}</div>',
                                          '<div class="item-after ptimg"  onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img src="images/tong_btn_dwtz.png"/></div>',
                                        '</div>',
                                        
                                        '<div class="item-text">${item.message}</div>',
                                      '</div>',
                                 '</a>',

                                  
                               '</li>',
                     
                     
                     '{@/each}'
             ].join('');
        },
        

        benditecanListTpl: function(data) {

            return ['{@each data as item}',

                    '<li><a href="http://localhost:8080/service/Speciality.html?id=${item.id}#pageSpecialityDetail" class="item-link item-content external" >',
                    '<div class="item-media"><img src="${item.img_path}" style="width: 4rem;height:4rem;"></div>',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                    '<div class="item-subtitle">${item.etitle}</div>',
                    '<div class="item-after pull-right">',
                    '</div>',
                    '<div class="item-text">${item.content}</div> ',
                    '</div>',
                    '</a>',
                    '<div class="delete" onclick="delPub(', "'${item.types}','${item.storeid}')", '">删&nbsp;除</div>',
                    '</li>',
                     '{@/each}'
             ].join('');
        },
        
         tongzhiListTpl: function(data) {

           return ['{@each data as item}',
                               '<li>',

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
                                    
                                  '</li>',
                     '{@/each}'
             ].join('');
        },
        baominListTpl: function(data) {

           return ['{@each data as item}',
                                    '<li>',

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
                                      
                                  '</li>',
                     '{@/each}'
             ].join('');
        },

        fanguiListTpl: function(data) {

           return ['{@each data as item}',
                               '<li><div class="fulei">',

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
                                       '{@if item.pass==0}','<div class="settled" >已解决</div>','{@else if !item.pass}', '<div class="settled" style="display:none">已解决</div>','{@/if}',
                                       '</a>',
                                         
                                  '</div></li>',
                     '{@/each}'
             ].join('');
        },

         qiuzhengListTpl: function(data) {

           return ['{@each data as item}',
                               '<li>',

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
                                    
                                  '</li>',
                     '{@/each}'
             ].join('');
        },
         zhengqiuListTpl: function(data) {

           return ['{@each data as item}',
                               '<li>',
    
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
                                     
                                  '</li>',
                     '{@/each}'
             ].join('');
        },


      
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
                        location.href = homepage.config.loginUrl;
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

            datax: function() {
            var data = {};
                 var criterias = [
              
               {
                    el: 'select_city',
                    pro: 'city_id',
                    type: 'text'
                }
            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },

   

       
        initfirst:function(id) {

           
             
            var data = homepage.index.datax(); 

            if (debug) {
                console.log(data);
            }
            data['location'] = id;

            homepage.tool.ajax(homepage.config.findAd, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                }
                if (d && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    // viewInfo(_field, d.data);
                     viewAd('Homepagefirst_', d.data);
                 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(homepage.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

        },
        initsecond:function(id) {

           
             
            var data = homepage.index.datax(); 

            if (debug) {
                console.log(data);
            }
            data['location'] = id;

            homepage.tool.ajax(homepage.config.findAd, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                }
                if (d && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    // viewInfo(_field, d.data);
                     viewAd('Homepagesecond_', d.data);
                 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(homepage.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

        },
   
       query: function(obj) {
            console.info(obj)
            $.showPreloader();
            var data = homepage.index.data();
            if(obj){
              data['types'] = obj;
            }
            if (debug) {
                console.log("index:");
                console.log(data);
            };
            
            
            if (0 == data.types) {
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);

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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                } else if (d) {
                    console.info(d)
                    var list = juicer(homepage.tpl.jingquListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#jingquList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
            
            }else if(1 == data.types){
            
              homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);

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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                } else if (d) {
                    console.info(d)
                    var list = juicer(homepage.tpl.jingquListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#jingquList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(2 == data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
              
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.peiyouListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#peiyouList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(3 == data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
              
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.bianminfuwuListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#bianminfuwuList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(4 == data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
              
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.bianminxuqiuListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#bianminxuqiuList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(5== data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
              
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.zhenghuiListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#zhenghuiList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(6== data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
         
                     
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.zhaogongzuoListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#zhaogongzuoList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(7== data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.zhaopingListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#zhaopingList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(8== data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.nonginyumuListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#nonginyumuList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(9 == data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
              
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.aixinListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#aixinList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(10== data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.bendiqiyeListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#bendiqiyeList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(11== data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.benditecanListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                    $("#benditecanList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(12== data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.tongzhiListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#tongzhiList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(13== data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.baominListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#baominList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(14== data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.fanguiListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#fanguiList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(15== data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.qiuzhengListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#qiuzhengList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }else if(16== data.types){
            
               homepage.tool.ajax(homepage.config.AllList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && homepage.config.constant['0003'] == d.data) {
                    $.alert(homepage.config.constant['0012']);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                } else if (d) {
                    
                    var list = juicer(homepage.tpl.zhengqiuListTpl(), d);
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
                    $("#benditecanList").empty();
                    $("#tongzhiList").empty();
                    $("#baominList").empty();
                    $("#fanguiList").empty();
                    $("#qiuzhengList").empty();
                    $("#zhengqiuList").empty();
                     $("#zhengqiuList").html(list);
                     
                }
                $.hidePreloader();
                // timer();
            }, function(xhr, type) {

                $.alert(homepage.config.constant['0001']);
                $.hidePreloader();
            });
           }
    },
    
  };


    // homepage.index = {
    //     datax: function() {
    //         var data = {};
    //              var criterias = [
              
    //            {
    //                 el: 'select_city',
    //                 pro: 'city_id',
    //                 type: 'text'
    //             }
    //         ];
    //        selectVal(criterias, data);
    //        console.info(data)
    //        return data;
    //     },

   

       
    //     initfirst:function(id) {

           
             
    //         var data = homepage.index.datax(); 

    //         if (debug) {
    //             console.log(data);
    //         }
    //         data['location'] = id;

    //         homepage.tool.ajax(homepage.config.findAd, data, null, 'post', function(d) {

    //             if (debug) {
    //                 console.log(d);
    //             }
    //             if (d && homepage.config.constant['0003'] == d.data) {
    //                 $.alert(homepage.config.constant['0003'], function() {
    //                     $.router.back();
    //                 });
    //             } else if (d) {
    //                 // viewInfo(_field, d.data);
    //                  viewAd('Homepagefirst_', d.data);
                 
    //             }
    //             $.hidePreloader();
    //         }, function(xhr, type) {
    //             $.toast(homepage.config.constant['0001'], function() {
    //                 $.router.back();
    //             });
    //             $.hidePreloader();
    //         });

    //     },
    //     initsecond:function(id) {

           
             
    //         var data = homepage.index.datax(); 

    //         if (debug) {
    //             console.log(data);
    //         }
    //         data['location'] = id;

    //         homepage.tool.ajax(homepage.config.findAd, data, null, 'post', function(d) {

    //             if (debug) {
    //                 console.log(d);
    //             }
    //             if (d && homepage.config.constant['0003'] == d.data) {
    //                 $.alert(homepage.config.constant['0003'], function() {
    //                     $.router.back();
    //                 });
    //             } else if (d) {
    //                 // viewInfo(_field, d.data);
    //                  viewAd('Homepagesecond_', d.data);
                 
    //             }
    //             $.hidePreloader();
    //         }, function(xhr, type) {
    //             $.toast(homepage.config.constant['0001'], function() {
    //                 $.router.back();
    //             });
    //             $.hidePreloader();
    //         });

    //     }
    // };
   

   






    $(document).on("pageInit", function(e, pageId, $page) {

            if (pageId == "pageIndex" ) {
                 
                   homepage.index.initfirst('01');
                   homepage.index.initsecond('02');
                 
            }
           
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



var indexquery=true; 



