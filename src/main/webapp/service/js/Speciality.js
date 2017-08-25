window.speciality = window.speciality || {};
var baseUrl = 'http://localhost:8080';
var filedate=speciality;
var uploaddebug = true;
var test=false;

var debug = false;

+ function($) {
    "use strict";

    window.speciality = window.speciality || {};

    var baseUrl = 'http://localhost:8080';


    speciality.config = {
        baseUrl: '',
        loginUrl: baseUrl + '/service/zhuce.html',
        addProductShow: baseUrl + '/user/local/addProductShow',
        localmessageDetail: baseUrl + '/user/local/Local',
        companydetailinfo: baseUrl + '/user/local/ProductList',
        Productdetail: baseUrl + '/user/local/Product',
        Productdown: baseUrl + '/user/local/ProductShowList',
        Myproductapply: baseUrl + '/user/local/ownProductShowList',
        storeinfo: baseUrl + '/user/store',
        Deletemessage: baseUrl + '/user/local/ProductShowDelete',
        isstore: baseUrl + '/user/showstore',
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



var mpid=0;
var mp=0;
var mpp=0;
var position = {
    latitudeP: 32.163306,
    longitudeP: 118.712513,
    accuracyP: 67.8021001352539
};

var debug = false;

$(function () {
    "use strict";

    window.speciality = window.speciality || {}; 

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
                 if (!speciality.tool.validation.grea02Decimal(value)) {
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
                 if (!speciality.tool.validation.isMobile(value)) {
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
                 if (!speciality.tool.validation.digits(value)) {
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
         }else if ('radio' === item.eleType) {
             var round = $("input[name='" + item.id + "'][check='true']");
         
                     value = $(round).attr('data-pub');
     
          
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
         var el = $("#" + _m + key);
         var eleType = $(el).attr('eleType');
         var value = $.trim(data[key]);
         if (eleType === 'input' || !eleType) {
             $(el).val(value);
         } else if (eleType === 'img') {
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

    var viewInfo2 = function(_m,data) {
        

       //  var html = [];
       //  html.push('<div class="swiper-slide"><img src="' + data.imgs + '" alt="" style="width: 100%;height:8rem;" ></div>')
             
       // console.log(data.imgs)
       //  var list = $('#localmessageDetail_main_img_List');
       
       //  list.empty();
       //  list.html(html.join(''));


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
                            html.push('<img src="' + e + '" alt="" style="width: 100%";>')
                        } 
                    });

                            var list = $('#localmessageDetail_main_img_List');
       
                              list.html(html.join(''));
                   
                }
  
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
    var viewInfo1 = function(data) {
   
           // 处理一组图片内容 
       
               var html = [];

                    for(var i=0;i < data.main_info.length;i++ ) {
                        for(var j=0;j<data.main_info[i].img_path.split(',').length-1;j++){

                            html.push('<img src="' + data.main_info[i].img_path.split(',')[j] + '" alt="" style="width:100%;height: 8rem;"><div class="contentstyles">' +data.main_info[i].content.split(',')[j]+'</div>')
                        }
                    }

                var list = $('#EnterprisexinwenDetail_imgs');
                list.empty();
               
            
                if (html.length > 0) {
                    list.html(html.join(''));
                    
                }

   
     };
    var viewInfo = function(_m, data) {
            
       //处理列表数据
         for (var key in data) {
             var el = $("#" + _m + key);
              var el1 = $("[name='" + _m + key + "']");
             var eleType = $(el).attr('eleType');
             var value = $.trim(data[key]);
             if (eleType === 'input' || !eleType) {
                 $(el).html(value);
                 $(el1).html(value);
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
            if (els[i].type == 'input') {
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

    speciality.tpl = {
        indexListTpl: function(data) {

            return ['{@each data as item}',

                    '<li><a href="#" class="item-link item-content" >',                    
                    '<div class="item-media"><img src="${item.img_path.split(",")[0]}" style="width: 4rem;height:4rem;"></div>',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                    '<div class="item-subtitle">${item.etitle}</div>',
                    '<div class="item-after pull-right">',
                    '</div>',
                    '<div class="item-text1">${item.content.split(",")[0]}</div> ',
                    '</div>',
                    '</a><div class="ab_top">',
                    '<input type="checkbox" name="choice" id="${item.id}" class="banji"/>',
                    '</div></li>',
                     '{@/each}'
             ].join('');
        },

       indexListTpll: function(data) {

            return ['{@each data as item}',
                    '<li>',
                    '<div class="row status_row ouye" >',
                    '<div class="col-75">${item.createtime}',
                    '</div>',
                    '{@if item.pass==1}', '<div class="col-20 putting">投放中</div>', 
                    '{@else if item.pass==2}', '<div class="col-20 audit refuse">拒绝</div>',
                    '{@else if item.pass==0}',  '<div class="col-20 audit">审核中</div>',
                    '{@/if}',
                    '</div>',
                    '<a href="#" class="item-link item-content">',
                    '<div class="item-media"><img src="${item.img_path.split(",")[0]}" style="width: 4rem;height:4rem;"></div>',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div></div>',
                    '<div class="item-subtitle">${item.etitle}</div>',
                    '<div class="item-after pull-right">',
                    '<span class="button button-danger confirm-ok" onclick="delTe(', "'${item.info_id}')", '">删除</span></div>',
                    '<div class="item-text">${item.content.split(",")[0]}</div></div></a></li>',
                 
                     '{@/each}'
             ].join('');
        },

       xinwenListTpl: function(data) {

            return ['{@each data as item}',
                        '<li>',
                            '<a href="../service/Speciality.html?id=${item.id}#pageSpecialityDetail" class="cont" external>',
                                '<img src="${item.img_path.split(",")[0]}" style="height:6rem;">',
                                '<p>${item.title}</p>', 
                                '<span>${item.etitle}</span>', 
                             '</a>',
                        '</li>',
                     '{@/each}'
             ].join('');
        },

      downListTpl: function(data) {

            return ['{@each data as item}',
                           '<li>',
                            '<a href="../service/Speciality.html?id=${item.id}#pageSpecialityDetail" class="cont" external>',
                                '<img src="${item.img_path.split(",")[0]}" style="height:6rem;">',
                                '<p>${item.title}</p>', 
                                '<span>${item.etitle}</span>', 
                             '</a>',
                        '</li>',
                     '{@/each}'
             ].join('');
        },

    
    };


    speciality.tool = {
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
                        location.href = speciality.config.loginUrl;
                        if($.device.os=="android"){
                            javascript:login.nologin();
                        }else if($.device.os=="ios"){
                            location.href = speciality.config.loginUrl;
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
       
        }
    };

    speciality.localmessage = {
        data: function() {
            var data = {};
                 var criteriasz = [

                     {
                         el: 'select_province',
                         pro: 'province_id',
                         type: 'text'
                     },{
                    el: 'select_area',
                    pro: 'county_id',
                    type: 'text'
                        },{
                            el: 'select_city',
                            pro: 'city_id',
                            type: 'text'
                        },
                    ];
           selectVal(criteriasz, data);
           console.info(data)
           return data;
        },
   

         detail: function(els,mpid) {
          var data = speciality.localmessage.data();  
            if (debug) {
                console.log(data);
            }
            // $('#localmessageDetail_id').val(id);
            speciality.tool.ajax(speciality.config.localmessageDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && speciality.config.constant['0003'] == d.data) {
                    $("#querychanpinList").html(speciality.config.constant['0012']);

                } else if (d) {
                    viewInfo2('localmessageDetail_',d);
                    mpid = $.trim(d.id);
                console.log(mpid);
                    speciality.MyEnterpriseDetail.query(mpid);
                    speciality.shenqingadd.query(mpid);
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(speciality.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

        },
             
                init: function() {
              //speciality.localmessage.detail();
        }
    };

//产品列表总
    speciality.MyEnterpriseDetail = {
        data: function() {
            var data = {};
                 var criteriasy = [
                {
                    el: 'searchname',
                    pro: 'searchname',
                    type: 'text'
                },
                {
                    el: 'local_id',
                    pro: 'local_id',
                    type: 'text'
                },
                {
                    el: 'product_pageNum',
                    pro: 'pageNum',
                    type: 'text'
                }, {
                    el: 'product_pageSize',
                    pro: 'pageSize',
                    type: 'text'
                }
            ];
         
           selectVal(criteriasy, data);
           // console.info(data)
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
       query: function(mpid) {
            // $.showPreloader();
            $("#product_pageNum").val(1);
            $("#product_pageSize").val(10);

               document.getElementById("local_id").value = mpid;


           

           var data = speciality.MyEnterpriseDetail.data();
          console.log(data);
            if (debug) {
                console.log(data);

            };
            data.pageNum = 1;
            data.pageSize = 10;
            $('#productpage .infinite-scroll-preloader').empty();
            $('#productpage .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
              
         speciality.tool.ajax(speciality.config.companydetailinfo, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && speciality.config.constant['0003'] == d.data) {
                    // $.alert(speciality.config.constant['0012']);
                    $("#querychanpinList").empty();
                    $('#productpage .infinite-scroll-preloader').html(speciality.config.constant['0012']); 
                } else if (d) {
             
                    var list = juicer(speciality.tpl.xinwenListTpl(), d);
                    $("#querychanpinList").html(list);
                 
                     $('#productpage .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
            });

          },

    detail: function(id, els,mp) {
            var data = {
               info_id: id,
               
            };
            if (debug) {
                console.log(data);
            }
            $("#pageSpecialityDetail_id").val(id);
            // $.showPreloader();
            speciality.tool.ajax(speciality.config.Productdetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && speciality.config.constant['0003'] == d.data) {
                    $.alert(speciality.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo('pageSpecialityDetail_', d);
                    viewInfo1(d);
                    mp = $.trim(d.id);
                    var mms = $.trim(d.local_id);
                    $("#product_id_qu").val(mp);
                    $("#pageSpecialityDetail_local_id").val(mms);


                    speciality.adddownping.query(mp);
                    dianji();
                    userclick(id,11)

                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(speciality.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
        
        init:function(id) {

           
             
            var data = speciality.MyEnterpriseDetail.datax(); 

            if (debug) {
                console.log(data);
            }
            data['location'] = id;

            speciality.tool.ajax(speciality.config.findAd, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                }
                if (d && speciality.config.constant['0003'] == d.data) {
                    $.alert(speciality.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    // viewInfo(_field, d.data);
                     viewAd('Speciality_', d.data);
                 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(speciality.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

        }
     };

//产品详情页下方产品
     speciality.adddownping = {
        data: function() {
            var data = {};
                 var criteriasx = [
        
                {
                    el: 'product_id_huo',
                    pro: 'product_id',
                    type: 'text'
                },{
                    el: 'xia_pageNum',
                    pro: 'pageNum',
                    type: 'text'
                }, {
                    el: 'xia_pageSize',
                    pro: 'pageSize',
                    type: 'text'
                }
            ];
           selectVal(criteriasx, data);
           console.info(data)
           return data;
        },
   
       query: function(mp) {
            // $.showPreloader();
            $("#xia_pageNum").val(1);
            $("#xia_pageSize").val(10);
            document.getElementById("product_id_huo").value = mp;
            var data = speciality.adddownping.data();
            console.log(mp);
            if (debug) {
                //console.log("companydetail:");
                console.log(data);
            };
            data.pageNum = 1;
            data.pageSize = 10;
            $('#xiapage .infinite-scroll-preloader').empty();
            $(' #xiapage .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
              
         speciality.tool.ajax(speciality.config.Productdown, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && speciality.config.constant['0003'] == d.data) {
                    //$.alert(speciality.config.constant['0012']);
                    $("#addList").empty();
                    $(' #xiapage .infinite-scroll-preloader').html(speciality.config.constant['0012']);
                } else if (d) {
                    
                    var list = juicer(speciality.tpl.downListTpl(), d);
                    $("#addList").html(list);
                    $(' #xiapage .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
            });

          },

    detail: function(id, els) {
            var data = {
               info_id: id,
            };
            if (debug) {
                console.log(data);
            }
            $("#pageSpecialityDetail_id").val(id);
            // $.showPreloader();
            speciality.tool.ajax(speciality.config.Productdetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && speciality.config.constant['0003'] == d.data) {
                    $.alert(speciality.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo('pageSpecialityDetail_', d);
                    viewInfo1(d);
                    dianji();
                    userclick(id,11)
                    
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(speciality.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
                init: function() {
            //speciality.localmessage.detail();
        }
     };
                   
//申请添加产品显示
    speciality.shenqingadd = {
        data: function() {
            var data = {};
                 var criterias = [
        
                {
                    el: 'local_id',
                    pro: 'local_id',
                    type: 'text'
                },{
                    el: 'add_pageNum',
                    pro: 'pageNum',
                    type: 'text'
                },{
                    el: 'add_PageSize',
                    pro: 'PageSize',
                    type: 'text'
                }
                
               
            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },
   
       query: function(mpid) {
            // $.showPreloader();
            $("#add_pageNum").val(1);
            $("#add_PageSize").val(10);

             document.getElementById("local_id").value = mpid;
             console.log(mpid)
           var data = speciality.shenqingadd.data();


            if (debug) {
                //console.log("companydetail:");
                console.log(data);
            };
            data.pageNum = 1;
            data.pageSize = 10;
            $('#addpage .infinite-scroll-preloader').empty();
            $('#addpage .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
          speciality.tool.ajax(speciality.config.companydetailinfo, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && speciality.config.constant['0003'] == d.data) {
                    //$.alert(speciality.config.constant['0012']);
                    $("#applyaddList").empty();
                    $(' #addpage .infinite-scroll-preloader').html(speciality.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(speciality.tpl.indexListTpl(), d);
                    $("#applyaddList").html(list);
                    
                   
                    $(' #addpage .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
            });

          },

     };               

  
   
//我的产品申请 
speciality.myshenqing = {
        data: function() {
            var data = {};
                 var criteriass = [
   
                 {
                    el: 'myshen_pageNum',
                    pro: 'pageNum',
                    type: 'text'
                },{
                    el: 'myshen_PageSize',
                    pro: 'PageSize',
                    type: 'text'
                }
  
            ];
           selectVal(criteriass, data);
           console.info(data)
           return data;
        },
   
       query: function() {
            // $.showPreloader();
            $("#myshen_pageNum").val(1);
            $("#myshen_PageSize").val(10);
            var data = speciality.myshenqing.data();

            if (debug) {
                //console.log("companydetail:");
                console.log(data);
            };
             data.pageNum = 1;
            data.pageSize = 10;
            $('#myshenpage .infinite-scroll-preloader').empty();
            $('#myshenpage .infinite-scroll-preloader').append('<div class="preloader"></div>');
          speciality.tool.ajax(speciality.config.Myproductapply, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && speciality.config.constant['0003'] == d.data) {
                    //$.alert(speciality.config.constant['0012']);
                    $("#myapplyaddList").empty();
                     $(' #myshenpage .infinite-scroll-preloader').html(speciality.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(speciality.tpl.indexListTpll(), d);
                    $("#myapplyaddList").html(list);
                    $(' #myshenpage .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
            });

          },

     };               

//申请添加点击完成
   $("#finish").click(function() {
    if($(".banji:checked").length<1){
        $.alert('请选择要添加的产品');
        return false
    }
    
    var product_id=$("#product_id_qu").val();
   
    var ids='';
    $(".banji:checked").each(function(){
        ids+=$(this).attr('id')+','
    })

    var data = {
        ids:ids,
        product_id:product_id
        };
    speciality.tool.ajax(speciality.config.addProductShow, data, null, 'post', function(d) {

    }, function(xhr, type) {
        $.toast(speciality.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });

     $("#queding").show();
     $(".black_overlay").show();
})

    $(document).on("pageInit", function(e, pageId, $page){
              // $.showPreloader('正在定位中')
              //   setTimeout(function () {
              //   }, 2000);
                var url = location.search; //获取url中"?"符后的字串
                var strs = url.substr(1);
                var id=strs.split("=")[1];

       if(pageId == "pageIndex"){
             speciality.MyEnterpriseDetail.init(17);
           speciality.localmessage.detail(mpid);
  
        }else if(pageId == "pageDisplayManagement"){ 
          speciality.myshenqing.query();
       }else if(pageId == "pageSpecialityDetail"){ 
          speciality.MyEnterpriseDetail.detail(id);
       }
  
    });


$(function() {
    $("#search_chang").click(function() {
         var id = $("#Findchang_id").val();
         speciality.localmessage.detail(mpid);
         });


    $("#queding_btn").click(function() {
      $.router.load("#pageDisplayManagement"); 
        $("#queding").hide();
        $(".black_overlay").hide();
        });

   $("#apply").click(function() {
      $.router.load("#pageDisplayManagement");  
      
       });

   $("#fabutuchang").click(function() {
      $.router.load("#pageApplicationAdd");
       var maid = $("#pageSpecialityDetail_local_id").val();
       speciality.shenqingadd.query(maid);
       });


});
  $.init();

});




$(function () {
    "use strict";
 
    var loading = false;
    $(document).on('infinite',function() {

        if (loading || $("#querychanpinList li").length < 10) {
            return
        }
        

        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#product_pageNum").val();
            if (pageNum == 1) {
                $('#productpage  .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
            }
            $("#product_pageNum").val(++pageNum);
            var param = speciality.MyEnterpriseDetail.data();
            param.pageNum = pageNum;
            param.pageSize = 10;
            speciality.tool.ajax(speciality.config.companydetailinfo, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && d.data && speciality.config.constant['0003'] == d.data) {
                    $("#productpage  .infinite-scroll-preloader").html(speciality.config.constant['0014']);
                } else if (d) {
                    var list = juicer(speciality.tpl.xinwenListTpl(), d);
                    $("#querychanpinList").append(list);
                 
                }
            }, function(xhr, type) {
                $.alert(speciality.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
    });
});

$(function () {
    "use strict";
 
    var loading = false;
    $(document).on('infinite',function() {

        if (loading || $("#addList li").length < 10) {
            return
        }
        

        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#xia_pageNum").val();
            if (pageNum == 1) {
                $('#xiapage .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
            }
            $("#xia_pageNum").val(++pageNum);
            var param =speciality.adddownping.data(); 
            param.pageNum = pageNum;
            param.pageSize = 10;
            speciality.tool.ajax(speciality.config.Productdown, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && d.data && speciality.config.constant['0003'] == d.data) {
                    $("#xiapage .infinite-scroll-preloader").html(speciality.config.constant['0014']);
                } else if (d) {
                    var list = juicer(speciality.tpl.downListTpl(), d);
                    $("#addList").append(list);
                 
                }
            }, function(xhr, type) {
                $.alert(speciality.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
    });
});



$(function () {
    "use strict";
 
    var loading = false;
    $(document).on('infinite',function() {

        if (loading || $("#myapplyaddList li").length < 10) {
            return
        }
        

        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#myshen_pageNum").val();
            if (pageNum == 1) {
                $('#myshenpage .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
            }
            $("#myshen_pageNum").val(++pageNum);
            var param = speciality.myshenqing.data(); 
            param.pageNum = pageNum;
            param.pageSize = 10;
            speciality.tool.ajax(speciality.config.Myproductapply, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && d.data && speciality.config.constant['0003'] == d.data) {
                    $("#myshenpage .infinite-scroll-preloader").html(speciality.config.constant['0014']);
                } else if (d) {
                    var list = juicer(speciality.tpl.indexListTpll(), d);
                    $("#myapplyaddList").append(list);
                 
                }
            }, function(xhr, type) {
                $.alert(speciality.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
    });
});


$(function () {
    "use strict";
 
    var loading = false;
    $(document).on('infinite',function() {

        if (loading || $("#applyaddList li").length < 10) {
            return
        }
        

        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#add_pageNum").val();
            if (pageNum == 1) {
                $('#addpage .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
            }
            $("#add_pageNum").val(++pageNum);
            var param = speciality.shenqingadd.data(); 
            param.pageNum = pageNum;
            param.pageSize = 10;
            speciality.tool.ajax(speciality.config.companydetailinfo, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && d.data && speciality.config.constant['0003'] == d.data) {
                    $("#addpage .infinite-scroll-preloader").html(speciality.config.constant['0014']);
                } else if (d) {
                    var list = juicer(speciality.tpl.indexListTpl(), d);
                    $("#applyaddList").append(list);
                 
                }
            }, function(xhr, type) {
                $.alert(speciality.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
    });
});


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
    speciality.tool.ajax(speciality.config.storeinfo, data, null, 'post', function(d) {
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
        $.alert(speciality.config.constant['0001']);
    });
}


function collectIcon($star, add, remove) {
    $star.removeClass(remove).addClass(add);
}

function historyWatch(info_id, info_type,panduan) {
    var data = {
        'info_id': info_id,
        'info_type': info_type
    }

             speciality.tool.ajax(speciality.config.isstore, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && speciality.config.constant['0003'] == d.data) {
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
                $.toast(speciality.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

}
var indexquery=true; 


function delTe(info_id) {
    $.confirm('您确定要删除该信息吗?', function() {
       
        var data = {
            info_id:info_id,
        };
        speciality.tool.ajax(speciality.config.Deletemessage, data, null, 'post', function(d) {
            if (debug) {
                console.log(d.data);
            };
            if (d.data && speciality.config.constant['0002'] == d.data) {
                $.alert(speciality.config.constant['0010'], function() {
                    speciality.myshenqing.query();
                });
            } else if (d.data) {
                $.alert(speciality.config.constant['0011']);
            }
        }, function(xhr, type) {
            $.alert(speciality.config.constant['0001']);
        });
    });
}
    
  function dianji(info_type) {
    console.log("sdwe")
    var data = {
        'info_type': 17
    }
      speciality.tool.ajax(speciality.config.click, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
              if (d.data && speciality.config.constant['0002'] == d.data) {
            
                    }  
            }, function(xhr, type) {
                $.toast(speciality.config.constant['0001'], function() {
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
      speciality.tool.ajax(speciality.config.userclick, data, null, 'post', function(d) {

        if (d.data && speciality.config.constant['0002'] == d.data) {
          }
            }, function(xhr, type) {
                $.toast(speciality.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
}


// $(function(){
//   var $category=$(".content-padded p").text().substr(0,6);
//   $category.hide();
//   var $toggleBtn=$('.look_more');
//   $toggleBtn.click(function(){
//     if($category.is(":visible")){
//       $category.hide();
//       $(this).text("展开全部");
//     }else{
//       $category.show();
//     }
//     return false;

//   })
// })
function zhan_kai(){
    $('#localmessageDetail_main_img_List').css('display','block');
    $('#localmessageDetail_name').css('display','block');
    $('.look_more').css('display','none');
    $('.look_more1').css('display','block');
}
function zhan_kai1(){
$('#localmessageDetail_main_img_List').css('display','none');
$('#localmessageDetail_name').css('display','none');
 $('.look_more').css('display','block');
$('.look_more1').css('display','none');
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

$("#select_area").change(function(){
speciality.MyEnterpriseDetail.init(17);
speciality.localmessage.detail(mpid);
})