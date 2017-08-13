window.love = window.love || {};
var baseUrl = 'http://localhost:8080';

var filedate=love;

var uploaddebug = true;
var test=false;

var debug = false;

+ function($) {
    "use strict";

    window.love = window.love || {};

    var baseUrl = 'http://localhost:8080';


    love.config = {
        // baseUrl: '',
        loginUrl: baseUrl + '/service/zhuce.html',
        uploadFile: baseUrl + '/uploadFile',
        pubLove: baseUrl + '/user/crowd/addCrowd',
        CrowdList: baseUrl + '/user/crowd/CrowdList',
        loveDetail: baseUrl + '/user/crowd/Crowd',
        addDonate: baseUrl + '/addDonate',
        storeinfo: baseUrl + '/user/store',
        reportinfo: baseUrl + '/user/report',
        CrowdDonate : baseUrl + '/user/crowd/CrowdDonate',
        Reply: baseUrl + '/user/crowd/CrowdReply',
        isreport: baseUrl + '/user/showreport',
        isstore: baseUrl + '/user/showstore',
        changeCrowd: baseUrl + '/user/crowd/change_Crowd',
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
            '5002': '请输入省',
            '5003': '请输入市',
            '5004': '请输入区',
            '5005': '请输入金额',
            '5006': '请选择结束时间',
            '5007': '请填写手机号',
            '5008': '请选择类型',
            '5009': '请输入联系人',
            '6004': '举报成功!',

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
    "use strict";

    window.love = window.love || {}; 

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
                 if (!love.tool.validation.grea02Decimal(value)) {
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
                 if (!love.tool.validation.isMobile(value)) {
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
                 if (!love.tool.validation.digits(value)) {
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
     var valu6="";
     var valu7="";
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
         }else if('inputDate' === item.eleType){
                value = $("#" + item.id).val();
                if (value && $.trim(value)) {
                    value=$.trim(value)+" "+$("#" + item.id+"_h").val()+":"+$("#" + item.id+"_m").val()+":00";
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
         }else if ('txtCarImg1'=== item.eleType) {
                value=$("#" + item.id).find('img').attr("src");
            }else if('inputcontext' === item.eleType) {
            valu6= valu6 + "," +$("#" + item.id).val();
             value=valu6;
         }else if ('txtCarImg'=== item.eleType) {
              if ($("#" + item.id).find('img').attr("src")){
             valu7=valu7 + "," + $("#" + item.id).find('img').attr("src");
             value=valu7;
             }
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
      for(var i=0;i < data.content.length;i++ ) {
            for(var j=0;j<data.content[i].img_path.split(',').length;j++){
            if (data.content[i].img_path.split(',')[j]) {
            html.push('<img src="' + data.content[i].img_path.split(',')[j] + '" style="width: 100%;height:8rem;" />'+data.content[i].content.split(',')[j]+'')
            }else{
           html.push('')
            }
            } 
        }
        var list = $('#loveDetail_c_imgage');
       
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

                   if (key == 'showincontent') {
           
       console.log(value)
       
         if(value==0){
              var html = [];

        for(var i=0;i<data.length;i++ ) {

            
            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%;"  >')
             
        }
        var list = $('#loveDetail_main_img_List');
       
        list.empty();
    
        if (html.length > 0) {
            list.html(html.join(''));
        }
   
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
                             html.push('<img src="' + e + '" alt="" style="width: 100%;" >')
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
             }
          
              else if (eleType === 'showcontact' || !eleType) {
               
                 if (1==value) {
                    $(el).html('<img class="contact" src="images/tong_btn_d_xslx.png">');
                 }else if (0==value) {
                    $(el).html('');
                 }
             } else if (eleType === 'showtelephone' || !eleType) {
               
                 if (1==value) {
                    $(el).html('<img class="contact" src="images/tong_btn_d_dh.png">')
                 }else if (0==value) {
                    $(el).html('');
                 }
             }

             // else if (eleType === 'zhaojuan' || !eleType) {
                
                
             //     if ($("#user_idd1").val()!=$("#user_id_id1").val()) {
             //        $(el).html('<span class="bm_btn">捐&nbsp;&nbsp;赠</span>')
             //     }else if ($("#user_idd1").val()==$("#user_id_id1").val()) {
             //        $(el).html('');
             //     }
             // } 







             else if (eleType === 'hongshizi' || !eleType) {
                 var html = [];
                 if (value) {
                    $(el).html('<div class="col-10 rem"><img src="images/xx4.png" /></div>'+
                                '<span class="colr">红十字认证</span>'
                             );
                 }else if (!value) {
                    $(el).html('');
                 }
             } else if (eleType === 'shenfen' || !eleType) {
                 var html = [];
                 if (value) {
                    $(el).html('<div class="col-10 rem"><img src="images/xx1.png" /></div>'+
                                '<span class="colr" >身份认证</span>'
                               );
                 }else if (!value) {
                    $(el).html('');
                 }
             } else if (eleType === 'zhanghao' || !eleType) {
                 var html = [];
                 if (value) {
                    $(el).html('<div class="col-10 rem"><img src="images/xx3.png" /></div>'+
            '<span class="colr"> 银行卡认证 <br/><span style="font-size:.5rem;">（与志愿者一致）</span></span>'
            );
                 }else if (!value) {
                    $(el).html('');
                 }
             } else if (eleType === 'yiyuan' || !eleType) {
                 var html = [];
                 if (value) {
                    $(el).html('<div class="col-10 rem"><img src="images/xx2.png" /></div>'+
                               '<span class="colr">医院认证</span>'
                              );
                 }else if (!value) {
                    $(el).html('');
                 }
             }else if (eleType === 'telVew') {
                $(el).html(value);
                $("#" + _m + "showtel").attr('href', 'tel:' + value);
                $("#" + _m + "sms").attr('href', 'sms:' + value);
            }else if (eleType === 'riqi') {
                $(el).html(value.substring(0,10));
            }else if (eleType === 'leftday') {
                
                if (value<0) {
                    $(el).html(0);
                 }else{
                    $(el).html(value);
                 }
            }else if (eleType === 'leftday1') {
                
                if (value<=0) {
                    $(el).html(0);
                 }else{
                    $(el).html(value);
                 }
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
     
         }else if(key == 'main_img'){
            

                 var value = $.trim(data[key]);
               
                 var list = document.getElementById(_m + 'main_img');
                
                     var ipot=value.lastIndexOf(".");
                     var type=fileType(value.substring(ipot+1)); 
                     if (type=='image') {
                         showImgs(list, "" + _m + 'main_img', value);
                     } 
                    

         }
         if(key == 'content'){

             for (var key in data.content) {

                 var value = $.trim(data.content[key].img_path);
                 var value2 = $.trim(data.content[key].content);
                 var c_image = value.split(',');
                 var c_context = value2.split(',');
                    if (c_image && c_image.length > 0 && c_image[0] != '') {
                         
                         $.each(c_image, function(i, e) {
                              if(i<c_image.length-1){
                                var che=$("#" + _m +'c_context').text();

                                  if( _m == 'love_' && !che){
                                        add2();
                                  
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
         if(key=='showincontent'){
                 var value = $.trim(data[key]);
                 if(value==1){
                     $("input[name='add_type']").attr('checked', true);
                     $("input[name='add_type']").attr('check', true)
                 }
          }
                if(key=='showcontact'){
                 var value = $.trim(data[key]);
                 if(value==1){
                     $("input[id='love_showcontact']").attr('checked', true);
                 
                 }
          }
                if(key=='showtel'){
                 var value = $.trim(data[key]);
                 if(value==1){
                     $("input[id='love_showtel']").attr('checked', true);
                   
                 }
          }

          
          
        
         var el = $("#" + _m + key);
         var eleType = $(el).attr('eleType');
         var name = $(this).attr('name');
         var value = $.trim(data[key]);
         if (eleType === 'input' || !eleType) {
             $(el).val(value);
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
         }else if('inputDate' === eleType){
                value=value.replace(/-/g, '\/');
                var sdate= new Date(value);
                var showValue=sdate.getFullYear()+"-"+checkTime(sdate.getMonth()+1)+"-"+checkTime(sdate.getDate()); 
                $(el).val(showValue);
                $("#" + _m + key+"_h").val(checkTime(sdate.getHours()));
                $("#" + _m + key+"_m").val(checkTime(sdate.getMinutes()));
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
         }else if (eleType === 'radio') {
             
             if (value=='1') {
                 $("input[name='" + _m + key + "']").attr('checked', true)
              
             }else if(value=='0'){
                  $("input[name='" + _m + key + "']").attr('checked', false)
                 
             }
         }
     }

                             if(province&&city&&district){
   
          _cityPosdataPub(province,city,county);
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
        $(function(){
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

    love.tpl = {
         indexListTpl: function(data) {

            return ['{@each data as item}',
                    '<li>',
                    '<a href="../service/love.html?id=${item.id}#pagelovedetails" class="item-link item-content banji" external>',
                    '{@if item.img_path}', '<div class="item-media"><img src="${item.img_path.split(",")[0]}" style="width: 4rem;height: 4rem;border-radius:4px"></div>', 
                    '{@else if !item.img_path}', '',
                    '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                    '<div class="item-text">${item.content.split(",")[0]}</div>',
                    '</div>',
                    '</a>',
                    '<div class="ptimg" onclick="showMap(',"'${item.location_x}','${item.location_y}')", '" ><img class="d_pic" src="images/u13.png"></div>',
                    '<div class="pinglun">',
                    '<dl>',
                    '<dt style="border:none"><div class="true">筹款:</div><div class="true_num">${item.money}元</div></dt>',
                    '{@if item.have==null}', '<dt><div class="true">已筹:</div><div class="true_num">0元</div></dt>', 
                    '{@else if item.have!=null}', '<dt><div class="true">已筹:</div><div class="true_num">${item.have}元</div></dt>',
                    '{@/if}',
                    '{@if item.mans==null}', '<dt><div class="true">支持:</div><div class="true_num">0人</div></dt>',
                    '{@else if item.mans!=null}',  '<dt><div class="true">支持:</div><div class="true_num">${item.mans}人</div></dt>',
                    '{@/if}',
                    '{@if item.leftday<0}',  '<dt><div class="true">剩余:</div><div class="true_num">0天</div></dt>',
                    '{@else}',  '<dt><div class="true">剩余:</div><div class="true_num">${item.leftday}天</div></dt>',
                    '{@/if}',
                    '</dl>',
                    '<div class="clear"></div>',
                    '</div>',
                    '</li>',
                    '{@/each}'
             ].join('');
        },

         donateListTpl: function(data) {

            return ['{@each data as item}',
                    '<li class="type1">',
                    '<a href="">',
                    '{@if item.img}',      '<div>',
                    '<img src="${item.img}" />',
                    '</div>',
                    '{@else}',  '<div>',
                    '<img src="images/melbourne.jpg" />',
                    '</div>',
                    '{@/if}',
                    '<div>',
                    '{@if item.name}', '<h1>${item.name}</h1>',
                    '{@else}', '昵称',
                    '{@/if}',
                    '<span class="red"> ¥${item.money}</span>',
                    '<p>${item.content}</p>',
                    '{@if $("#user_idd").val()==$("#user_id_id").val()}', '<div class="settled1" >回复</div>',
                    '{@else if $("#user_idd").val()!=$("#user_id_id").val()}', '',
                    '{@/if}',
                    '</div>',
                    '{@each item.reply as it2}',
                    '<div class="huifu_detailes1">',
                    '<div class="huifu_detailes2">',
                    '<img class="huifu_detailes3" />',
                    '</div>',
                    '<div>',
                    '{@if it2.name}',  '<h1 class="huifu_detailes4">${it2.name}</h1>',
                    '{@else}', '昵称',
                    '{@/if}',
                    '<p class="huifu_detailes5">${it2.content}</p>',
                    '</div>',
                    '</div>',
                    '<div class="clear"></div>',
                    '{@/each}',
                    '</a>',          
                    '<div class="queding" style="display:none">',
                    '<div class="right" onclick="closeWindow()"><img src="images/tuichu.png" /></div>',
                    '<textarea class="neirong" ></textarea>',
                    '<p class="queding_btn" id="${item.id}">确定<p>',
                    '</div>',
                    '</li>',
                    '{@/each}'
             ].join('');
        },


   };



    love.tool = {
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
                        //location.href = love.config.loginUrl;
                        if($.device.os=="android"){
                            javascript:login.nologin();
                        }else if($.device.os=="ios"){
                            location.href = love.config.loginUrl;
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
                    navigator.geolocation.watchPosition(love.tool.currentPosition.updatePosition,
                        love.tool.currentPosition.error);
                } else {
                    $.toast("浏览器无法获取您的位置信息！");
                }
            }
        }
    };
  

    //发布爱心
   love.pubLove = {
     data: function() {
         var pubScenicdatas = [{
                id: 'love_showincontent',
                pro: 'showincontent',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
                id: 'love_main_img',
                pro: 'main_img',
                eleType: 'txtCarImg1',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
             id: 'love_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': love.config.constant['5001']
                 }
             }
         },{
             id: 'select_province',
             pro: 'province_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':love.config.constant['5002']
                 }
             }
         },{
             id: 'select_city',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': love.config.constant['5003']
                 }
             }
         },{
             id: 'select_area',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': love.config.constant['5004']
                 }
             }
         },{
             id: 'love_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
        },{
             id: 'love_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'love_money',
             pro: 'money',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': love.config.constant['5005']
                 }
             }
      
         },{
             id: 'love_endtime',
             pro: 'endtime',
             eleType: 'inputDate',
             valids: {
                 'require': {
                    'is': true,
                     'msg': love.config.constant['5006']
                 }
             }
         },{
             id: 'love_name',
             pro: 'name',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': love.config.constant['5009']
                 }
             }
           
         },{
             id: 'love_tel',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': love.config.constant['5007']
                 },
                  'isMobile': {
                    'is': true,
                    'msg': love.config.constant['4001']
                }
             }
         },{
             id: 'love_type',
             pro: 'type',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': love.config.constant['5008']
                 }
             }
         },{
             id: 'love_showtel',
             pro: 'showtel',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'love_showcontact',
             pro: 'showcontact',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'love_c_image',
             pro: 'c_image',
             eleType: 'txtCarImg',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'love_c_context',
             pro: 'c_context',
             eleType: 'inputcontext',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }];

              var sc2=$('.sc-12').find('textarea').size();
               console.info(sc2);
                     for(var m=1;m<sc2+1;m++){
                     var s2=[
                          {
                     id: 'love_c_image'+m,
                     pro: 'c_image',
                     eleType: 'txtCarImg',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'love_c_context'+m,
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
                   
        console.info(pubScenicdatas)

         return validationToValue(pubScenicdatas);
     },
      submit: function(status) {
         var data = love.pubLove.data();
         if (debug) {
             console.log('pubLove validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             // var x = $('#love_location_x').val();
             // var y = $('#love_location_y').val();
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
           
             love.tool.ajax(love.config.pubLove, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && love.config.constant['0002'] == d.data) { 
                     $.alert(love.config.constant['0004'],function(){
                          $.router.load("#pageIndex"); 
                     });
                 } else if (d.data) {
                     $.alert(love.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(love.config.constant['0001']);
             });
         }
     },

      eidt: function(id) {
            
            var data = {

                info_id: id,

            };

            love.tool.ajax(love.config.loveDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && love.config.constant['0003'] == d) {
                     $.alert(love.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    console.log(d)
                    viewInit('love_', d);
                    
                }
            }, function(xhr, type) {
                $.toast(love.config.constant['0001']);
            });
        },


        update: function(status,id) {

            var data = love.pubLove.data();
            if (data) {
                var x = $('#love_location_x').val();
                var y = $('#love_location_y').val();
                if (x && y) {
                    data.location_x = x * Math.pow(10, 6);
                    data.location_y = y * Math.pow(10, 6);
                } else {
                    data.location_x = position.latitudeP;
                    data.location_y = position.longitudeP;
                }
                var data2 = {};
                for (var key in data) {
                    data2[key] = data[key];
                }
               data2['status'] = status;
               data2['crowd_id'] = id;
               data2['c_image'] = data2['c_image'].substring(1);
               data2['c_context'] = data2['c_context'].substring(1);
                if (debug) {
                    console.log('pubLove update validation ' + '--> ');
                    console.log(data2);
                }
                love.tool.ajax(love.config.changeCrowd, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d.data);
                    };
                    if (d.data && love.config.constant['0002'] == d.data) {
                        $.alert(love.config.constant['0004'],function(){
                            $.router.back();
                        });
                    } else if (d.data) {
                        $.alert(love.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(love.config.constant['0001']);
                });
            }
        },

    
     // init: function() {
     //     var id = $("#pubLove_id").val();
     //     if (id) {
     //         love.pubZPeopleService.eidt(id);
     //     }
     // }
    };


 love.juankuan = {
     data: function() {
         var pubScenicdatas = [{
                id: 'juan_content',
                pro: 'content',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
             id: 'juan_money',
             pro: 'money',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': love.config.constant['5005']
                 }
             }
         },{
             id: 'juan_name',
             pro: 'name',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'juan_tel',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 },    
                 'isMobile': {
                    'is': true,
                    'msg': love.config.constant['4001']
                }
             }
         },{
             id: 'juan_address',
             pro: 'address',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
          }
    },{
             id: 'juan_crowd_id',
             pro: 'crowd_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
          }
    }];
       return validationToValue(pubScenicdatas);
     },
      submit: function() {
       
         var data = love.juankuan.data();
         if (debug) {
             console.log('juankuan validation ' + '--> ');
             console.log(data);
         }

             love.tool.ajax(love.config.addDonate, data, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && love.config.constant['0002'] == d.data) { 
                     $.alert(love.config.constant['0004'],function(){
                          $.router.load("#pageIndex"); 
                     });
                 } else if (d.data) {
                     $.alert(love.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(love.config.constant['0001']);
             });
         
     },

     init: function() {
           }
    };

    love.index = {
        data: function() {
            var data = {};
                 var criterias = [
              
               {
                    el: 'love_pageNum',
                    pro: 'pageNum',
                    type: 'text'
                }, {
                    el: 'love_pageSize',
                    pro: 'pageSize',
                    type: 'text'
                }, {
                    el: 'love_searchname',
                    pro: 'searchname',
                    type: 'text'
                },{
                    el: 'love_type_1',
                    pro: 'type',
                    type: 'text'
                },{
                    el: 'love_order',
                    pro: 'order',
                    type: 'text'
                },{
                    el: 'select_city1',
                    pro: 'city_id',
                    type: 'text'
                },{
                    el: 'select_area1',
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
                    el: 'select_city1',
                    pro: 'city_id',
                    type: 'text'
                }
            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },
       query: function() {
            // $.showPreloader('正在定位中');
            $("#love_pageNum").val(1);
            $("#love_pageSize").val(10);
            var data = love.index.data();
            data.pageNum = 1;
            data.pageSize = 10;
         
            if (debug) {
                console.log("index:");
                console.log(data);
            };
            $('#pagechange .infinite-scroll-preloader').empty();
            $('#pagechange .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
            love.tool.ajax(love.config.CrowdList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && love.config.constant['0003'] == d.data) {
                    //$.alert(love.config.constant['0012']);
                    $("#queryloveList").empty();
                    $(' #pagechange .infinite-scroll-preloader').html(love.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(love.tpl.indexListTpl(), d);

                    $("#queryloveList").html(list);
                    $('#pagechange .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
               
            }, function(xhr, type) {

                $(' #pagechange .infinite-scroll-preloader').html(love.config.constant['0001']);
                $.alert(love.config.constant['0001']);
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
             $("#loveDetail_id").val(id);
             $.showPreloader();
            love.tool.ajax(love.config.loveDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && love.config.constant['0003'] == d.data) {
                    $.alert(love.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    dianji();

                    viewInfo('loveDetail_', d);
                    var mpid = $.trim(d.id);
                    var mp = $.trim(d.id);
                    var user = $.trim(d.user_id);
                    $("#Donate_info_id").val(mpid);
                    $("#juan_crowd_id").val(mp);
                    $("#user_id_id").val(user);
                    $("#user_id_id1").val(user);
                    var user_id=getCookie('user_id');
                    $("#user_idd").val(user_id);
                    $("#user_idd1").val(user_id);
                    var xx=$("#user_idd").val();
                    var yy=$("#user_id_id").val();
                    if (xx!=yy) {
                        $("#routerjuanzen").show();
                    }else if(xx==yy){
                        $("#routerjuanzen").hide();
                    };
                    console.log(xx,yy);
                    var name = $.trim(d.name);
                    $("#user_name_name").val(name);
                    historyWatch(id, 9);
                    userclick(id, 9);
                   
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(love.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

       init:function(id) {             
            var data = love.index.datax(); 

            if (debug) {
                console.log(data);
            }
            data['location'] = id;

            love.tool.ajax(love.config.findAd, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                }
                if (d && love.config.constant['0003'] == d.data) {
                    $.alert(love.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    // viewInfo(_field, d.data);
                     viewAd('Love_', d.data);
                 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(love.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

        }

    }


    love.donate = {
        data: function() {
            var data = {};
                 var criterias = [
              
               {
                    el: 'Donate_pageNum',
                    pro: 'pageNum',
                    type: 'text'
                }, {
                    el: 'Donate_pageSize',
                    pro: 'pageSize',
                    type: 'text'
                }, {
                    el: 'Donate_info_id',
                    pro: 'info_id',
                    type: 'text'
                }
            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },  
       query: function() {
            //$.showPreloader();
            $("#Donate_pageNum").val(1);
            $("#Donate_ageSize").val(10);
                var data = love.donate.data();
            if (debug) {
                console.log("donate:");
                console.log(data);
            };
            $('#pagelovedetails .infinite-scroll-preloader').empty();
            $(' #pagelovedetails .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
            love.tool.ajax(love.config.CrowdDonate, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && love.config.constant['0003'] == d.data) {
                  
                    $("#querydonateList").empty();
                    $('#pagelovedetails .infinite-scroll-preloader').html(love.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(love.tpl.donateListTpl(), d);
              
                    $("#querydonateList").html(list);
                    $('#pageIndex .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                $(' #pageIndex .infinite-scroll-preloader').html(love.config.constant['0001']);
                $.alert(love.config.constant['0001']);
                $.hidePreloader();
            });
          
        },
    }



    $(document).on("pageInit", function(e, pageId, $page) {
                // $.showPreloader('正在定位中')
                // setTimeout(function () {
                // }, 2000);
                var url = location.search; //获取url中"?"符后的字串
                var strs = url.substr(1);
                var id=strs.split("=")[1];





        if (pageId == "pageIndex") {
         
          love.index.query();
          love.index.init(14);
                  
    
           }else if(pageId == "pagelovedetails"){
            love.index.detail(id); 
           }
          else if (pageId == "pagefabu") {
                if (id) {
                    love.pubLove.eidt(id);
                } 
            } else if(pageId == "pagejuanzen"){
               var info_id = GetQueryString1("id");
               $("#juankuang_id").val(info_id)
            }

    });
 $.init();
    $(function() {

       $("#love_fabu").click(function() {
        var id = $("#love_id").val();
        if (id) {
        love.pubLove.update(1,id);
        }else{
         love.pubLove.submit(1);
         }
        });
           
      $("#love_save").click(function() {
        var id = $("#love_id").val();
        if (id) {
        love.pubLove.update(2,id);
        }else{
        love.pubLove.submit(2);
        }
        });

        $("#btn_search").click(function() {
         love.index.query();
         });


        $("#btntimeorder").click(function() {
        // if($('.guanzhu')){           
        //  $(".guanzhu").addClass('guanzhu1');
        //   }else if($('.guanzhu1')){
        //  $(".guanzhu1").addClass('guanzhu');
        //  }
         love.index.query();
        });


       $("#btn_zhifuw").click(function() {
        love.juankuan.submit();
        });

       $("#juankuanjilu").click(function() {

           love.donate.query();

        });


        

    
});

});




$(function () {
    "use strict";
 
    var loading = false;
    $(document).on('infinite',function() {

        if (loading || $("#queryloveList li").length < 10) {
            return
        }
        

        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#love_pageNum").val();
            if (pageNum == 1) {
                $('#pagechange .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
            }
            $("#love_pageNum").val(++pageNum);
            var param = love.index.data();
            param.pageNum = pageNum;
            param.pageSize = 10;
            love.tool.ajax(love.config.CrowdList, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && d.data && love.config.constant['0003'] == d.data) {
                    $("#pagechange .infinite-scroll-preloader").html(love.config.constant['0014']);
                } else if (d) {
                    var list = juicer(love.tpl.indexListTpl(), d);
                    $("#queryloveList").append(list);
                 
                }
            }, function(xhr, type) {
                $.alert(love.config.constant['0001']);
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
    love.tool.ajax(love.config.storeinfo, data, null, 'post', function (d) {
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
    },function(xhr, type) {
        add = 'scstart-line';
            remove = 'scstart-fill';
        collectIcon($star, add, remove);
        $.alert(love.config.constant['0001']);
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
    love.tool.ajax(love.config.reportinfo, data, null, 'post', function(d) {
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
        $.alert(love.config.constant['0001']);
    });
}


function collectIcon($star, add, remove) {
    $star.removeClass(remove).addClass(add);
}
function reportIcon($star, add, remove) {
    $star.removeClass(remove).addClass(add);
}

function historyWatch(info_id, info_type,panduan) {
    var data = {
        'info_id': info_id,
        'info_type': info_type
    }
      love.tool.ajax(love.config.isreport, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && love.config.constant['0003'] == d.data) {
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
                $.toast(love.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });


             love.tool.ajax(love.config.isstore, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && love.config.constant['0003'] == d.data) {
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
                $.toast(love.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

}


var indexquery=true; 


//回复
$("#querydonateList").on('click','.queding_btn',function(){
     var id = $(this).attr('id');
     var content=$(this).parents('.queding').find(".neirong").val();
    if(!content){
       $.alert("请填写内容");
       return
    }
     
     var data = {
        content:content,
        donate_id:id
        };

    love.tool.ajax(love.config.Reply, data, null, 'post', function(d) {
        if (d.data && love.config.constant['0002'] == d.data) {
            love.donate.query(); 
            }
    }, function(xhr, type) {
        $.toast(love.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
  $(".queding").hide();   
  $(".fade").css("display","none");   
 });




$("#querydonateList").on('click','.settled1',function(){

     $(this).parents('.type1').find(".queding").show();
     $(".fade").css("display","block");       
});

function closeWindow(){
   $(".queding").css("display","none");
   $(".fade").css("display","none");
}

   //获取cookie  
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
   


function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function removeAddLable(lable){
    var $close = $(lable);
    $close.parent().remove();
}

  function dianji(info_type) {
    var data = {
        'info_type': 14
    }
      love.tool.ajax(love.config.click, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
              if (d.data && love.config.constant['0002'] == d.data) {
            
                    }  
            }, function(xhr, type) {
                $.toast(love.config.constant['0001'], function() {
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
      love.tool.ajax(love.config.userclick, data, null, 'post', function(d) {

        if (d.data && love.config.constant['0002'] == d.data) {
          }
            }, function(xhr, type) {
                $.toast(love.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

}


function GetQueryString1(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(decodeURI(r[2]));
    return null;
}


function zhifubaozhifu(){
    var moneyss = $("#juan_money").val();
    var title = $("#juan_content").val();
    var renid = $("#user_id_id").val();
    var ren = $("#user_name_name").val();
    var info_id = $("#juankuang_id").val();


    location.href = "../service/Center.html?&moneyss=" + moneyss + "&title=" + title + "&ren=" + ren + "&renid=" + renid + "&info_id=" + info_id + "#pagePayment";
}




 $("#select_area1").change(function(){
    love.index.query();
    love.index.init(14);
})
      