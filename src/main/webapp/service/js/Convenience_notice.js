window.notice = window.notice || {};
var baseUrl = 'http://localhost:8080';

var urlProtocl = window.document.location.protocol;
var urlHostname = window.document.location.hostname;
var urlPort = window.document.location.port;
if (urlPort=="80") {
    baseUrl = urlProtocl + "//" + urlHostname;
} else {
    baseUrl = urlProtocl + "//" + urlHostname + ":"+urlPort;
}
var filedate=notice;
var uploaddebug = true;
var test=false;

var debug = false;

+ function($) {
    "use strict";

    window.notice = window.notice || {};

    var baseUrl = 'http://localhost:8080';
    var urlProtocl = window.document.location.protocol;
    var urlHostname = window.document.location.hostname;
    var urlPort = window.document.location.port;
    if (urlPort=='80') {
        baseUrl = urlProtocl + '//' + urlHostname;
    } else {
        baseUrl = urlProtocl + '//' + urlHostname + ':'+urlPort;
    }
    console.log(baseUrl);
    notice.config = {
        baseUrl: '',
        loginUrl: baseUrl + '/service/zhuce.html',
        uploadFile: baseUrl + '/uploadFile',
        storeinfo: baseUrl + '/user/store',
        reportinfo: baseUrl + '/user/report',
        addNoticeTongzhi: baseUrl + '/user/notice/addNoticeTongzhi',
        addNoticeBaoming: baseUrl + '/user/notice/addNoticeBaoming',
        addNoticeFankui: baseUrl + '/user/notice/addNoticeFankui',
        addNoticeQiuzheng: baseUrl + '/user/notice/addNoticeQiuzheng',
        addNoticeZhengqiu: baseUrl + '/user/notice/addNoticeZhengqiu',
        noticeList: baseUrl + '/user/notice/noticeList',
        noticedetail: baseUrl + '/user/notice/Notice',
        doNoticeBaoming: baseUrl + '/user/notice/doNoticeBaoming',
        NoticePraise: baseUrl + '/user/notice/NoticePraise',
        addNoticePinglun: baseUrl + '/user/notice/addNoticePinglun',
        NoticePinglun: baseUrl + '/user/notice/NoticePinglun',
        upPaperImg: baseUrl + '/user/notice/upPaperImg',
        checkPaper: baseUrl + '/user/notice/checkPaper',
        addNoticeReply: baseUrl + '/user/notice/addNoticeReply',
        isreport: baseUrl + '/user/showreport',
        isstore: baseUrl + '/user/showstore',
        changeNoticeTongzhi: baseUrl + '/user/notice/changeNoticeTongzhi',
        changeNoticeBaoming: baseUrl + '/user/notice/changeNoticeBaoming',
        changeNoticeFankui: baseUrl + '/user/notice/changeNoticeFankui',
        changeNoticeQiuzheng: baseUrl +'/user/notice/changeNoticeQiuzheng',
        changeNoticeZhengqiu: baseUrl + '/user/notice/changeNoticeZhengqiu',
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
            '0013': '暂无评论信息!',
            '0014': '已显示到最后一页!',
            '0015': '已显示到最后一页!',
            '0016': 'already did',
            '0017': 'already did',
            '0018': 'already get',
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
            '5005': '请输入报名开始时间',
            '5006': '请输入报名结束时间',
            '5007': '开始时间',
            '5008': '结束时间',
            '5009': '请输入总人数',
            '5010': '请输入姓名',
            '5011': '请选择性别',
            '5012': '请输入年龄',
            '5013': '请输入电话',
            '5016': '请上传相关证明',
            '5014': 'aleady pass',
            '5015': 'not pass',
            '5017': '请添加链接',
            '5018': '请添加链接',
            '6004': '举报成功!',
            '6005': '请填写验证码!',
            '7000':'1001',
            '7001':'1010',
            '7002':'1003',
            '7003':'1023',
            '7004':'1024',
            '7005':'1002',
            '7006':'1025',
            '7007':'1026',
             '7008':'1002',
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

    window.notice = window.notice || {}; 

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
                 if (!notice.tool.validation.grea02Decimal(value)) {
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
                 if (!notice.tool.validation.isMobile(value)) {
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
                 if (!notice.tool.validation.digits(value)) {
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
                    value=$.trim(value);
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
         } else if('grounpurl' === item.eleType) {
           $.each($("p[name='" + item.id + "']"), function (i, e) {
                    if (i == 0) {
                        value = $(e).text();
                    } else {
                        value += "," + $(e).text();
                    }
                });
       
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

                                  if( _m == 'Baoming_' && !che){
                                        add5();
                                  
                                   }else if( _m == 'Fankui_' && !che){
                                        add4();
                                   }else if( _m == 'Zhengqiu_' && !che){
                                        add2();
                                   }else if( _m == 'Qiuzheng_' && !che){
                                        add3();
                                   }else if( _m == 'Tongzhi_' && !che){
                                        add6();
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
         if(key == 'url'){

           

                 var value = $.trim(data.url[0].url);
                 var value2 = $.trim(data.url[0].content);
                 var c_url = value.split(',');
                 var c_url_content = value2.split(',');
                  var str='';
                    if (c_url && c_url.length > 0 && c_url[0] != '') {
                        

                        
                         $.each(c_url, function(i, e) {


                         str='<div><p name="Tongzhi_c_url">'+e+'</p><p name="Tongzhi_url_content">'+c_url_content[i]+'</p><img onclick="removeAddLable(this)"" src="images/lianjie_img.png" /></div>';
                           $('.comment1').append(str);
              
                         });
                                    $.each(c_url, function(i, e) {


                         str='<div><p name="Baoming_c_url">'+e+'</p><p name="Baoming_url_content">'+c_url_content[i]+'</p><img onclick="removeAddLable(this)"" src="images/lianjie_img.png" /></div>';
                           $('.comment').append(str);
              
                         });
                     }
             
  
          }
          if(key=='showincontent'){
                 var value = $.trim(data[key]);
                 if(value==1){
                     $("input[name='add_type']").attr('checked', true);
                     $("input[name='add_type']").attr('check', true)
                 }
          }

          if(key=='shownickname'){
                 var value = $.trim(data[key]);
                 if(value==1){
                     $("input[name='check_box']").attr('checked', true);
                     $("input[name='check_box']").attr('check', true)
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



    var viewInfo = function(_m, data) {

 




      var html = [];

      for(var i=0;i < data.content.length;i++ ) {
            for(var j=0;j<data.content[i].img_path.split(',').length;j++){
                if (data.content[i].img_path.split(',')[j]) {
             html.push('<img src="' + data.content[i].img_path.split(',')[j] + '" alt="" style="width: 100%;height:8rem;" >'+data.content[i].content.split(',')[j]+'')
            }else{
             html.push('')
            }
            } 
        }
        var list = $('#noticedetails_c_imgage');
        list.empty();
    
        if (html.length > 0) {
            list.html(html.join(''));
        }

        

   
   


      var html = [];

      for(var i=0;i < data.content.length;i++ ) {
            for(var j=0;j<data.content[i].img_path.split(',').length;j++){
                if (data.content[i].img_path.split(',')[j]) {
             html.push('<img src="' + data.content[i].img_path.split(',')[j] + '" alt="" style="width: 100%;height:8rem;" >'+data.content[i].content.split(',')[j]+'')
            }else{
             html.push('')
            }
            } 
        }
        var list = $('#confirmdetails_c_imgage');
        list.empty();
    
        if (html.length > 0) {
            list.html(html.join(''));
        }


   


      var html = [];

      for(var i=0;i < data.content.length;i++ ) {
            for(var j=0;j<data.content[i].img_path.split(',').length;j++){
                if (data.content[i].img_path.split(',')[j]) {
             html.push('<img src="' + data.content[i].img_path.split(',')[j] + '" alt="" style="width: 100%;height:8rem;" >'+data.content[i].content.split(',')[j]+'')
            }else{
             html.push('')
            }
            } 
        }
        var list = $('#seekdetails_c_imgage');
        list.empty();
    
        if (html.length > 0) {
            list.html(html.join(''));
        }

       

   


      var html = [];

      for(var i=0;i < data.content.length;i++ ) {
            for(var j=0;j<data.content[i].img_path.split(',').length;j++){
                if (data.content[i].img_path.split(',')[j]) {
             html.push('<img src="' + data.content[i].img_path.split(',')[j] + '" alt="" style="width: 100%;height:8rem;" >'+data.content[i].content.split(',')[j]+'')
            }else{
            html.push('')  
            }
            } 
        }
        var list = $('#feedbackdetails_c_imgage');
        list.empty();
    
        if (html.length > 0) {
            list.html(html.join(''));
        }


   


      var html = [];

      for(var i=0;i < data.content.length;i++ ) {
            for(var j=0;j<data.content[i].img_path.split(',').length;j++){
                if (data.content[i].img_path.split(',')[j]) {
             html.push('<img src="' + data.content[i].img_path.split(',')[j] + '" alt="" style="width: 100%;height:8rem;" >'+data.content[i].content.split(',')[j]+'')
            }else{
             html.push('')    
            }
           } 
        }
        var list = $('#enrolldetails_c_imgage');
        list.empty();
    
        if (html.length > 0) {
            list.html(html.join(''));
        }





         for (var key in data) {
             var el = $("#" + _m + key);
             var eleType = $(el).attr('eleType');
             var value = $.trim(data[key]);
           //链接

      if (key == 'showincontent') {
           
       console.log(value)
       
         if(value==0){
        var html = [];
        for (var i = 0; i < data.length; i++) {
            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%;"  >');
        }
       

        var list = $('#noticedetails_main_img_List');

        list.empty();

        if (html.length&&html) {
            list.html(html.join(''));
        }



         var html = [];
       for(var i=0;i<data.length;i++ ) {
            
            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%;height:8rem;" >')
             
        }
        var list = $('#confirmdetails_main_img_List');
       
        list.empty();
    
        if (html.length&&html) {
            list.html(html.join(''));
        }else{
             list.html('');
        }


                 var html = [];

        for(var i=0;i<data.length;i++ ) {
            
            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%;height:8rem;" >')
             
        }
        var list = $('#seekdetails_main_img_List');
       
        list.empty();
    
        if (html.length&&html) {
            list.html(html.join(''));
        }else{
             list.html('');
        }

                 var html = [];

        for(var i=0;i<data.length;i++ ) {
            
            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%;height:8rem;" >')
             
        }
        var list = $('#feedbackdetails_main_img_List');
       
        list.empty();
    
        if (html.length&&html) {
            list.html(html.join(''));
        }else{
             list.html('');
        }


         var html = [];

        for(var i=0;i<data.length;i++ ) {
            
            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%;height:8rem;" >')
             
        }
        var list = $('#enrolldetails_main_img_List');
       
        list.empty();
    
        if (html.length&&html) {
            list.html(html.join(''));
        }else{
             list.html('');
        }

     }
   }
       if (key == 'url') {
        var html = [];
         for (var i = 0; i < data.url.length; i++) {
        for(var j=0;j<data.url[i].url.split(',').length;j++){
            if (data.url[i].url.split(',')[j]) {
            html.push('<li><a href="' + data.url[i].url.split(',')[j] + '">' + data.url[i].content.split(',')[j] + '</a></li>')
           }else{
            html.push('')
           }
           }
        }
        
        var list = $('#noticedetails_url');

        list.empty();

        if (html.length > 0) {
            list.html(html.join(''));
        }

        var html = [];
        for (var i = 0; i < data.url.length; i++) {
        for(var j=0;j<data.url[i].url.split(',').length;j++){
            if (data.url[i].url.split(',')[j]) {
            html.push('<li><a href="' + data.url[i].url.split(',')[j] + '">' + data.url[i].content.split(',')[j] + '</a></li>')
        }else{
            html.push('')
        }
        }
        }
        var list = $('#enrolldetails_url');

        list.empty();

        if (html.length > 0) {
            list.html(html.join(''));
        }
     }else  if (eleType === 'input' || !eleType) {
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
             }
             else if (eleType === 'isimg' || !eleType) {
                 
                 if (value) {
                    $(el).html('<img class="col-100" src="'+data.img.split(',')[0]+'" / >');
                 }else if (!value) {
                    $(el).html('');
                 }
             }else if (eleType === 'num') {
                
                if (!value) {
                    $(el).html(0);
                 }else{
                    $(el).html(value);
                 }
            }else if (eleType === 'riqi') {
                $(el).html(value.substring(0,10));
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


 notice.tpl = {
         TongzhiListTpl: function(data) {

            return ['{@each data as item}',
                    '<li>',
                    '<a href="../service/Convenience_notice.html?id=${item.id}#pagenoticedetails" class="item-link item-content" external>',
                    '{@if item.main_img}','<div class="item-media"><img class="mediastyle" src="${item.main_img}" style="width: 4rem;"></div>',
                    '{@else if !item.main_img}','',
                    '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                    '{@if !item.wartchs}','<div class="item-subtitle red"><div class="n_num_1"><img src="images/bmtz_lll.png" width="17"/>&nbsp;<span>0</span></div></div>',
                    '{@else}','<div class="item-subtitle red"><div class="n_num_1"><img src="images/bmtz_lll.png" width="17"/>&nbsp;<span>${item.wartchs}</span></div></div>',
                    '{@/if}',
                    '<div class="item-subtitle">发布时间: <time>${item.create_time.substring(0,13)}时</time>',
                    '</div>',
                    '</div>',
                    '</a>',
                    '</li>',
                    '{@/each}'
             ].join('');
        },

         BaomingListTpl: function(data) {

            return ['{@each data as item}',
                    '<li>',
                    '<a href="../service/Convenience_notice.html?id=${item.id}#pageenrolldetails" class="item-link item-content"  external>',
                    '{@if item.main_img}','<div class="item-media"><img class="mediastyle" src="${item.main_img}" style="width: 4rem;"></div>',
                    '{@else if !item.main_img}','',
                    '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '<div class="item-after">',
                    '{@if !item.wartchs}','<div class="n_num"><img src="images/bmtz_lll.png" width="17"  />&nbsp;<span>0</span></div>',
                    '{@else}','<div class="n_num"><img src="images/bmtz_lll.png" width="17"  />&nbsp;<span>${item.wartchs}</span></div>',
                    '{@/if}',
                    '</div>',
                    '</div>',
                    '<div class="item-subtitle redd">需<span>${item.nums}</span>人/已报<span>${item.haveman}</span>人</div>',
                    '<div class="item-subtitle">开始时间: <time>${item.b_starttime.substring(0,13)}时</time>',
                    '</div>',
                    '<div class="item-subtitle">结束时间: <time>${item.b_endtime.substring(0,13)}时</time>',
                    '</div>',
                    '</div>',
                    '</a>',
                    '</li>',
                    '{@/each}'
             ].join('');
        },


         FankuiListTpl: function(data) {

            return ['{@each data as item}',
                    '<li>',
                    '<a href="../service/Convenience_notice.html?id=${item.id}#pagefeedbackdetails" class="item-link item-content"  external>',
                    '{@if item.main_img}','<div class="item-media"><img class="mediastyle" src="${item.main_img}" style="width: 4rem;"></div>',
                    '{@else if !item.main_img}','',
                    '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                    '{@if !item.wartchs}','<div class="item-subtitle red"><div class="n_num_1"><img src="images/bmtz_lll.png" width="17"  />&nbsp;<span>0</span></div></div>',
                    '{@else}','<div class="item-subtitle red"><div class="n_num_1"><img src="images/bmtz_lll.png" width="17"  />&nbsp;<span>${item.wartchs}</span></div></div>',
                    '{@/if}',
                    
                    '<div class="item-subtitle">发布时间: <time>${item.create_time.substring(0,13)}时</time>',
                    '</div>',
                    '{@if item.pass==1}','<div class="settled">已解决</div>',
                    '{@else if item.pass==0}','',
                    '{@/if}',
                    '</div>',
                    '</a>',
                    '</li>',
                    '{@/each}'
             ].join('');
        },

        QiuzhengListTpl: function(data) {

            return ['{@each data as item}',
                    '<li>',
                    '<a href="../service/Convenience_notice.html?id=${item.id}#pageconfirmdetails" class="item-link item-content"  external>',
                    '{@if item.main_img}','<div class="item-media"><img class="mediastyle" src="${item.main_img}" style="width: 4rem;"></div>',
                    '{@else if !item.main_img}','',
                    '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                      '{@if !item.wartchs}','<div class="item-subtitle red"><div class="n_num_1"><img src="images/bmtz_lll.png" width="17"  />&nbsp;<span>0</span></div></div>',
                    '{@else}','<div class="item-subtitle red"><div class="n_num_1"><img src="images/bmtz_lll.png" width="17"  />&nbsp;<span>${item.wartchs}</span></div></div>',
                    '{@/if}',
                    '<div class="item-subtitle">发布时间: <time>${item.create_time.substring(0,13)}时</time>',
                    '</div>',
                    '</div>',
                    '</a>',
                    '<div class="pinglun" id="${item.id}">',
                    '<dl>',
                    '<dt style="border:none"><div class="true" >真的</div><div class="true_num">${item.truenum}</div></dt>',
                    '<dt><div class="false">假的</div><div class="false_num">${item.falsenum}</div></dt>',
                    '<dt><div class="fair">不好说</div><div class="fair_num">${item.notsurenum}</div></dt>',
                    '<div class="clear"></div>',
                    '</dl> ',

                    '</div>',
                    '<div class="clear"></div>',
                    '</li>',
                    '{@/each}'
             ].join('');
        },


        ZhengqiuListTpl: function(data) {

            return ['{@each data as item}',
                    '<li>',
                    '<a href="../service/Convenience_notice.html?id=${item.id}#pageseekdetails" class="item-link item-content"  external>',
                    '{@if item.main_img}','<div class="item-media"><img class="mediastyle" src="${item.main_img}" style="width: 4rem;"></div>',
                    '{@else if !item.main_img}','',
                    '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                     '{@if !item.wartchs}','<div class="item-subtitle red"><div class="n_num_1"><img src="images/bmtz_lll.png" width="17"  />&nbsp;<span>0</span></div></div>',
                    '{@else}','<div class="item-subtitle red"><div class="n_num_1"><img src="images/bmtz_lll.png" width="17"  />&nbsp;<span>${item.wartchs}</span></div></div>',
                    '{@/if}',
                    '<div class="item-subtitle">发布时间: <time>${item.create_time.substring(0,13)}时</time>',
                    '</div>',
                    '</div>',
                    '</a>',
                    '<div class="zantong" id="${item.id}">',
                    '<dl>',
                    '<dt style="border:none"><div class="true_ping">赞同</div><div class="true_num">${item.truenum}</div></dt>',
                    '<dt><div class="false_ping">不赞同</div><div class="false_num">${item.falsenum}</div></dt>',
                    '<div class="clear"></div>',
                    '</dl> ',
                    '</div>',
                    '<div class="clear"></div>',
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
                    '<p>${item.content}</p>',
                    '{@if $("#user_idd").val()==$("#user_id_id").val()}', '<div class="settled1" >回复</div>',
                    '{@else if $("#user_idd").val()!=$("#user_id_id").val()}', '',
                    '{@/if}',
                    '</div>',
                    '<div class="clear"></div>',
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

    notice.tool = {
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
                        //location.href = notice.config.loginUrl;
                        if($.device.os=="android"){
                            javascript:login.nologin();
                        }else if($.device.os=="ios"){
                            location.href = notice.config.loginUrl;
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
                    navigator.geolocation.watchPosition(notice.tool.currentPosition.updatePosition,
                        notice.tool.currentPosition.error);
                } else {
                    $.toast("浏览器无法获取您的位置信息！");
                }
            }
        }
    };


  //事业单位验证
$(document).on('click','.pass_fabu', function () {
    var data = null;
            notice.tool.ajax(notice.config.checkPaper, data, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && notice.config.constant['5014'] == d.data) { 
                     $.alert('审核通过，可发布',function(){
                          $.router.load("#pagePostnotice"); 
                     });
                 } else if (d.data && notice.config.constant['5015'] == d.data) {
                         $.alert('请完成审核',function(){
                          $.router.load("#pagePostnoticeshen");
                     });
                 }else if (d.data) {
                     $.alert(notice.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(notice.config.constant['0001']);
             });
});
  //事业单位证明
  notice.zhengming = {
     data: function() {
         var pubzhengmingdatas = [{
                id: 'zhengming_main_img',
                pro: 'main_img',
                eleType: 'img',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': notice.config.constant['5016']
                    } 
                }
          }];
          return validationToValue(pubzhengmingdatas);
     },
      submit: function() {
         var data = notice.zhengming.data();
         if (debug) {
             console.log('zhengming validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#zhengming_location_x').val();
             var y = $('#zhengming_location_y').val();
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
          notice.tool.ajax(notice.config.upPaperImg, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && notice.config.constant['0002'] == d.data) { 
                     $.alert('上传成功，待审核',function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(notice.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(notice.config.constant['0001']);
             });
         }
     },
  };

  //发布便民通知
    notice.Tongzhi = {
     data: function() {
         var pubTongzhidatas = [{
                id: 'Tongzhi_showincontent',
                pro: 'showincontent',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
                id: 'Tongzhi_main_img',
                pro: 'main_img',
                eleType: 'txtCarImg1',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
             id: 'Tongzhi_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5001']
                 }
             }
         },{
             id: 'select_province1',
             pro: 'province_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':notice.config.constant['5002']
                 }
             }
         },{
             id: 'select_city1',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5003']
                 }
             }
         },{
             id: 'select_area1',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5004']
                 }
             }
         },{
             id: 'Tongzhi_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
        },{
             id: 'Tongzhi_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Tongzhi_c_url',
             pro: 'c_url',
             eleType: 'grounpurl',
             valids: {
                 'require': {
                     'is': false,
                     'msg':''
                 }
             }
      
         },{
             id: 'Tongzhi_url_content',
             pro: 'url_content',
             eleType: 'grounpurl',
             valids: {
                 'require': {
                    'is': false,
                     'msg':''
                 }
             }
         },{
             id: 'Tongzhi_c_image',
             pro: 'c_image',
             eleType: 'txtCarImg',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Tongzhi_c_context',
             pro: 'c_context',
             eleType: 'inputcontext',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }];
          var sc2=$('.sc-16').find('textarea').size();
               console.info(sc2);
                     for(var m=1;m<sc2+1;m++){
                     var s2=[
                          {
                     id: 'Tongzhi_c_image'+m,
                     pro: 'c_image',
                     eleType: 'txtCarImg',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'Tongzhi_c_context'+m,
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
                 pubTongzhidatas=pubTongzhidatas.concat(s2);
            }

         return validationToValue(pubTongzhidatas);
     },
      submit: function(status) {
         var data = notice.Tongzhi.data();
         if (debug) {
             console.log('Tongzhi validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#Tongzhi_location_x').val();
             var y = $('#Tongzhi_location_y').val();
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
             data2['c_image'] = data2['c_image'].substring(1);
             data2['c_context'] = data2['c_context'].substring(1);
           
             notice.tool.ajax(notice.config.addNoticeTongzhi, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && notice.config.constant['0002'] == d.data) { 
                     $.alert('提示:请对您发布信息的真实负责且不代表我平台观点,在反馈事项解决后您有义务对此消息进行操作.',function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(notice.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(notice.config.constant['0001']);
             });
         }
     },

      eidt: function(id) {
            
            var data = {
                
                info_id: id,
                type:1

            };

            notice.tool.ajax(notice.config.noticedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && notice.config.constant['0003'] == d) {
                     $.alert(notice.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    console.log(d)
                    viewInit('Tongzhi_', d);
                    
                }
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001']);
            });
        },


        update: function(status,id) {

            var data = notice.Tongzhi.data();
            if (data) {
                var x = $('#Tongzhi_location_x').val();
                var y = $('#Tongzhi_location_y').val();
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
               data2['info_id'] = id;
               data2['c_image'] = data2['c_image'].substring(1);
               data2['c_context'] = data2['c_context'].substring(1);
                if (debug) {
                    console.log('Tongzhi update validation ' + '--> ');
                    console.log(data2);
                }
                notice.tool.ajax(notice.config.changeNoticeTongzhi, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d.data);
                    };
                    if (d.data && notice.config.constant['0002'] == d.data) {
                        $.alert(notice.config.constant['0004'],function(){
                            $.router.back();
                        });
                    } else if (d.data) {
                        $.alert(notice.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(notice.config.constant['0001']);
                });
            }
        },

    
     // init: function() {
     //     var id = $("#Tongzhi_id").val();
     //     if (id) {
     //         notice.pubZPeopleService.eidt(id);
     //     }
     // }
    };

  //发布便民报名
      notice.Baoming = {
     data: function() {
         var pubBaomingdatas = [{
                id: 'Baoming_showincontent',
                pro: 'showincontent',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
                id: 'Baoming_main_img',
                pro: 'main_img',
                eleType: 'txtCarImg1',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
             id: 'Baoming_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5001']
                 }
             }
         },{
             id: 'select_province2',
             pro: 'province_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':notice.config.constant['5002']
                 }
             }
         },{
             id: 'select_city2',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5003']
                 }
             }
         },{
             id: 'select_area2',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5004']
                 }
             }
         },{
             id: 'Baoming_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
        },{
             id: 'Baoming_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },
         {
             id: 'Baoming_c_url',
             pro: 'c_url',
             eleType: 'grounpurl',
             valids: {
                 'require': {
                     'is':false,
                     'msg':''
                 }
             }
      
         },{
             id: 'Baoming_url_content',
             pro: 'url_content',
             eleType: 'grounpurl',
             valids: {
                 'require': {
                    'is':false,
                     'msg':''
                 }
             }
         },{
             id: 'Baoming_c_image',
             pro: 'c_image',
             eleType: 'txtCarImg',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Baoming_c_context',
             pro: 'c_context',
             eleType: 'inputcontext',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'bmfei',
             pro: 'getbaoming',
             eleType: 'radio',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'jinfei',
             pro: 'getjingfei',
             eleType: 'radio',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Baoming_baomingfei',
             pro: 'baomingfei',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Baoming_jingfei',
             pro: 'jingfei',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Baoming_b_starttime',
             pro: 'b_starttime',
             eleType: 'inputDate',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5005']
                 }
             }
         },{
             id: 'Baoming_b_endtime',
             pro: 'b_endtime',
             eleType: 'inputDate',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5006']
                 }
             }
         },{
             id: 'Baoming_starttime',
             pro: 'starttime',
             eleType: 'inputDate',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5007']
                 }
             }
         },{
             id: 'Baoming_endtime',
             pro: 'endtime',
             eleType: 'inputDate',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5008']
                 }
             }
         },{
             id: 'sex',
             pro: 'issex',
             eleType: 'radio',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Baoming_nums',
             pro: 'nums',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg':notice.config.constant['5009']
                 }
             }
         },{
             id: 'Baoming_mannums',
             pro: 'mannums',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Baoming_womannums',
             pro: 'womannums',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }];
          var sc3=$('.sc-15').find('textarea').size();
               console.info(sc3);
                     for(var n=1;n<sc3+1;n++){
                     var s3=[
                          {
                     id: 'Baoming_c_image'+n,
                     pro: 'c_image',
                     eleType: 'txtCarImg',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'Baoming_c_context'+n,
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
                 pubBaomingdatas=pubBaomingdatas.concat(s3);
            }

         return validationToValue(pubBaomingdatas);
     },
      submit: function(status) {
         var data = notice.Baoming.data();
         if (debug) {
             console.log('Baoming validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#Baoming_location_x').val();
             var y = $('#Baoming_location_y').val();
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
             data2['c_image'] = data2['c_image'].substring(1);
             data2['c_context'] = data2['c_context'].substring(1);
           
             notice.tool.ajax(notice.config.addNoticeBaoming, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && notice.config.constant['0002'] == d.data) { 
                    $.alert('提示:请对您发布信息的真实负责且不代表我平台观点,在反馈事项解决后您有义务对此消息进行操作.',function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(notice.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(notice.config.constant['0001']);
             });
         }
     },
      eidt: function(id) {
            
            var data = {
                
                info_id: id,
                type:2

            };

            notice.tool.ajax(notice.config.noticedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && notice.config.constant['0003'] == d) {
                     $.alert(notice.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    console.log(d)
                    viewInit('Baoming_', d);
                    
                }
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001']);
            });
        },


        update: function(status,id) {

            var data = notice.Baoming.data();
            if (data) {
                var x = $('#Baoming_location_x').val();
                var y = $('#Baoming_location_y').val();
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
               data2['info_id'] = id;
               data2['c_image'] = data2['c_image'].substring(1);
               data2['c_context'] = data2['c_context'].substring(1);
                if (debug) {
                    console.log('Baoming update validation ' + '--> ');
                    console.log(data2);
                }
                notice.tool.ajax(notice.config.changeNoticeBaoming, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d.data);
                    };
                    if (d.data && notice.config.constant['0002'] == d.data) {
                        $.alert(notice.config.constant['0004'],function(){
                            $.router.back();
                        });
                    } else if (d.data) {
                        $.alert(notice.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(notice.config.constant['0001']);
                });
            }
        },
    
     // init: function() {
     //     var id = $("#Baoming_id").val();
     //     if (id) {
     //         notice.pubZPeopleService.eidt(id);
     //     }
     // }
    };


  //发布便民反馈
    notice.Fankui = {
     data: function() {
         var pubFankuidatas = [{
                id: 'Fankui_showincontent',
                pro: 'showincontent',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
                id: 'Fankui_shownickname',
                pro: 'shownickname',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
                id: 'Fankui_main_img',
                pro: 'main_img',
                eleType: 'txtCarImg1',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
             id: 'Fankui_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5001']
                 }
             }
         },{
             id: 'select_province3',
             pro: 'province_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':notice.config.constant['5002']
                 }
             }
         },{
             id: 'select_city3',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5003']
                 }
             }
         },{
             id: 'select_area3',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5004']
                 }
             }
         },{
             id: 'Fankui_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
        },{
             id: 'Fankui_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Fankui_c_image',
             pro: 'c_image',
             eleType: 'txtCarImg',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Fankui_c_context',
             pro: 'c_context',
             eleType: 'inputcontext',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }];
        
         var sc4=$('.sc-14').find('textarea').size();
               console.info(sc4);
                     for(var x=1;x<sc4+1;x++){
                     var s4=[
                          {
                     id: 'Fankui_c_image'+x,
                     pro: 'c_image',
                     eleType: 'txtCarImg',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'Fankui_c_context'+x,
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
                 pubFankuidatas=pubFankuidatas.concat(s4);
            }

         return validationToValue(pubFankuidatas);
     },
      submit: function(status) {
         var data = notice.Fankui.data();
         if (debug) {
             console.log('Fankui validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#Fankui_location_x').val();
             var y = $('#Fankui_location_y').val();
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
             data2['c_image'] = data2['c_image'].substring(1);
             data2['c_context'] = data2['c_context'].substring(1);
           
             notice.tool.ajax(notice.config.addNoticeFankui, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && notice.config.constant['0002'] == d.data) { 
                   $.alert('提示:请对您发布信息的真实负责且不代表我平台观点,在反馈事项解决后您有义务对此消息进行操作.',function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(notice.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(notice.config.constant['0001']);
             });
         }
     },

          eidt: function(id) {
            
            var data = {
                
                info_id: id,
                type:3

            };

            notice.tool.ajax(notice.config.noticedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && notice.config.constant['0003'] == d) {
                     $.alert(notice.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    console.log(d)
                    viewInit('Fankui_', d);
                    
                }
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001']);
            });
        },


        update: function(status,id) {

            var data = notice.Fankui.data();
            if (data) {
                var x = $('#Fankui_location_x').val();
                var y = $('#Fankui_location_y').val();
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
               data2['info_id'] = id;
               data2['c_image'] = data2['c_image'].substring(1);
               data2['c_context'] = data2['c_context'].substring(1);
                if (debug) {
                    console.log('Fankui update validation ' + '--> ');
                    console.log(data2);
                }
                notice.tool.ajax(notice.config.changeNoticeFankui, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d.data);
                    };
                    if (d.data && notice.config.constant['0002'] == d.data) {
                        $.alert(notice.config.constant['0004'],function(){
                            $.router.back();
                        });
                    } else if (d.data) {
                        $.alert(notice.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(notice.config.constant['0001']);
                });
            }
        },
     // init: function() {
     //     var id = $("#Fankui_id").val();
     //     if (id) {
     //         notice.pubZPeopleService.eidt(id);
     //     }
     // }
    };

  //发布便民求证
    notice.Qiuzheng = {
     data: function() {
         var pubQiuzhengdatas = [{
                id: 'Qiuzheng_showincontent',
                pro: 'showincontent',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
                id: 'Qiuzheng_main_img',
                pro: 'main_img',
                eleType: 'txtCarImg1',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
             id: 'Qiuzheng_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5001']
                 }
             }
         },{
             id: 'select_province4',
             pro: 'province_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':notice.config.constant['5002']
                 }
             }
         },{
             id: 'select_city4',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5003']
                 }
             }
         },{
             id: 'select_area4',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5004']
                 }
             }
         },{
             id: 'Qiuzheng_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
        },{
             id: 'Qiuzheng_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Qiuzheng_c_image',
             pro: 'c_image',
             eleType: 'txtCarImg',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Qiuzheng_c_context',
             pro: 'c_context',
             eleType: 'inputcontext',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }];

         var sc5=$('.sc-13').find('textarea').size();
               console.info(sc5);
                     for(var y=1;y<sc5+1;y++){
                     var s5=[
                          {
                     id: 'Qiuzheng_c_image'+y,
                     pro: 'c_image',
                     eleType: 'txtCarImg',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'Qiuzheng_c_context'+y,
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
                 pubQiuzhengdatas=pubQiuzhengdatas.concat(s5);
            }

         return validationToValue(pubQiuzhengdatas);
     },
      submit: function(status) {
         var data = notice.Qiuzheng.data();
         if (debug) {
             console.log('Qiuzheng validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#Qiuzheng_location_x').val();
             var y = $('#Qiuzheng_location_y').val();
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
             data2['c_image'] = data2['c_image'].substring(1);
             data2['c_context'] = data2['c_context'].substring(1);
           
             notice.tool.ajax(notice.config.addNoticeQiuzheng, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && notice.config.constant['0002'] == d.data) { 
                     $.alert('提示:请对您发布信息的真实负责且不代表我平台观点,在反馈事项解决后您有义务对此消息进行操作.',function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(notice.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(notice.config.constant['0001']);
             });
         }
     },


          eidt: function(id) {
            
            var data = {
                
                info_id: id,
                type:4

            };

            notice.tool.ajax(notice.config.noticedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && notice.config.constant['0003'] == d) {
                     $.alert(notice.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    console.log(d)
                    viewInit('Qiuzheng_', d);
                    
                }
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001']);
            });
        },


        update: function(status,id) {

           var data = notice.Qiuzheng.data();
            if (data) {
                var x = $('#Qiuzheng_location_x').val();
                var y = $('#Qiuzheng_location_y').val();
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
               data2['info_id'] = id;
               data2['c_image'] = data2['c_image'].substring(1);
               data2['c_context'] = data2['c_context'].substring(1);
                if (debug) {
                    console.log('Qiuzheng update validation ' + '--> ');
                    console.log(data2);
                }
                notice.tool.ajax(notice.config.changeNoticeQiuzheng, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d.data);
                    };
                    if (d.data && notice.config.constant['0002'] == d.data) {
                        $.alert(notice.config.constant['0004'],function(){
                            $.router.back();
                        });
                    } else if (d.data) {
                        $.alert(notice.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(notice.config.constant['0001']);
                });
            }
        },

     // init: function() {
     //     var id = $("#Qiuzheng_id").val();
     //     if (id) {
     //         notice.pubZPeopleService.eidt(id);
     //     }
     // }
    };
  //发布便民征求
      notice.Zhengqiu = {
     data: function() {
         var pubZhengqiudatas = [{
                id: 'Zhengqiu_showincontent',
                pro: 'showincontent',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
                id: 'Zhengqiu_main_img',
                pro: 'main_img',
                eleType: 'txtCarImg1',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
             id: 'Zhengqiu_title',
             pro: 'title',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5001']
                 }
             }
         },{
             id: 'select_province5',
             pro: 'province_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg':notice.config.constant['5002']
                 }
             }
         },{
             id: 'select_city5',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5003']
                 }
             }
         },{
             id: 'select_area5',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5004']
                 }
             }
         },{
             id: 'Zhengqiu_location_x',
             pro: 'location_x',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
        },{
             id: 'Zhengqiu_location_y',
             pro: 'location_y',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg':'' 
                 }
             }
         },{
             id: 'Zhengqiu_c_image',
             pro: 'c_image',
             eleType: 'txtCarImg',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'Zhengqiu_c_context',
             pro: 'c_context',
             eleType: 'inputcontext',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         }];
             var sc6=$('.sc-12').find('textarea').size();
               console.info(sc6);
                     for(var z=1;z<sc6+1;z++){
                     var s6=[
                          {
                     id: 'Zhengqiu_c_image'+z,
                     pro: 'c_image',
                     eleType: 'txtCarImg',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'Zhengqiu_c_context'+z,
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
                 pubZhengqiudatas=pubZhengqiudatas.concat(s6);
            }

         return validationToValue(pubZhengqiudatas);
     },
      submit: function(status) {
         var data = notice.Zhengqiu.data();
         if (debug) {
             console.log('Zhengqiu validation ' + '--> ');
             console.log(data);
         }
         if (data) {
             var x = $('#Zhengqiu_location_x').val();
             var y = $('#Zhengqiu_location_y').val();
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
             data2['c_image'] = data2['c_image'].substring(1);
             data2['c_context'] = data2['c_context'].substring(1);
           
             notice.tool.ajax(notice.config.addNoticeZhengqiu, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && notice.config.constant['0002'] == d.data) { 
                     $.alert('提示:请对您发布信息的真实负责且不代表我平台观点,在反馈事项解决后您有义务对此消息进行操作.',function(){
                          $.router.load("#pagePostChoose"); 
                     });
                 } else if (d.data) {
                     $.alert(notice.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(notice.config.constant['0001']);
             });
         }
     },

              eidt: function(id) {
            
            var data = {
                
                info_id: id,
                type:5

            };

            notice.tool.ajax(notice.config.noticedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && notice.config.constant['0003'] == d) {
                     $.alert(notice.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    console.log(d)
                    viewInit('Zhengqiu_', d);
                    
                }
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001']);
            });
        },


        update: function(status,id) {

            var data = notice.Zhengqiu.data();
            if (data) {
                var x = $('#Zhengqiu_location_x').val();
                var y = $('#Zhengqiu_location_y').val();
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
               data2['info_id'] = id;
               data2['c_image'] = data2['c_image'].substring(1);
               data2['c_context'] = data2['c_context'].substring(1);
                if (debug) {
                    console.log('Zhengqiu update validation ' + '--> ');
                    console.log(data2);
                }
                notice.tool.ajax(notice.config.changeNoticeZhengqiu, data2, null, 'post', function(d) {
                    if (debug) {
                        console.log(d.data);
                    };
                    if (d.data && notice.config.constant['0002'] == d.data) {
                        $.alert(notice.config.constant['0004'],function(){
                            $.router.back();
                        });
                    } else if (d.data) {
                        $.alert(notice.config.constant['0005']);
                    }
                }, function(xhr, type) {
                    $.alert(notice.config.constant['0001']);
                });
            }
        },
     // init: function() {
     //     var id = $("#Zhengqiu_id").val();
     //     if (id) {
     //         notice.pubZPeopleService.eidt(id);
     //     }
     // }
    };

  //申请参加报名
   notice.applyming = {
     data: function() {
         var pubapplymingdatas = [{
                id: 'applyming_name',
                pro: 'name',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': true,
                        'msg': notice.config.constant['5010']
                    } 
                }
          },{
                id: 'applyming_info_id',
                pro: 'info_id',
                eleType: 'input',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
             id: 'applyming_content',
             pro: 'content',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
         },{
             id: 'applyming_sex',
             pro: 'sex',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5011']
                 }
             }
         },{
             id: 'applyming_age',
             pro: 'age',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5012']
                 }
             }
         },{
             id: 'applyming_tel',
             pro: 'tel',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5013']
                 },
                  'isMobile': {
                    'is': true,
                    'msg': notice.config.constant['4001']
                }
             }
         
         },{
             id: 'applyming_code',
             pro: 'code',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['6005']
                 }
             }
         
         }];
         return validationToValue(pubapplymingdatas);
     },
      submit: function() {
         var data = notice.applyming.data();
         if (debug) {
             console.log('applyming validation ' + '--> ');
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
             notice.tool.ajax(notice.config.doNoticeBaoming, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 }
                 if (d.data && notice.config.constant['0002'] == d.data) { 
                     $.alert('报名成功',function(){
                          $.router.load("#pageenrolldetails"); 
                     });
                 } else if (d.data && notice.config.constant['0017'] == d.data){
                     $.alert('您的报名已提交<br>请勿重复报名<br>等待发起人审核与您联系');
                 }else if (d.data && notice.config.constant['0018'] == d.data){
                     $.alert('报名已满');
                 }
             }, function(xhr, type) {
                 $.alert(notice.config.constant['0001']);
             });
         }
     },

    
     // init: function() {
     //     var id = $("#applyming_id").val();
     //     if (id) {
     //         notice.pubZPeopleService.eidt(id);
     //     }
     // }
    };


  //列表详情
    notice.index = {
        data: function() {
            var data = {};
                 var criterias = [
               {
                    el: 'notice_searchname',
                    pro: 'searchname',
                    type: 'text'
                },{
                    el: 'notice_type',
                    pro: 'type',
                    type: 'btnRound'
                },{
                    el: 'notice_location_x',
                    pro: 'location_x',
                    type: 'text'
                },{
                    el: 'notice_location_y',
                    pro: 'location_y',
                    type: 'text'
                },{
                    el: 'select_city',
                    pro: 'city_id',
                    type: 'text'
                },{
                    el: 'select_area',
                    pro: 'county_id',
                    type: 'text'
                },{
                    el: 'notice_locationorder',
                    pro: 'locationorder',
                    type: 'text'
                },{
                    el: 'notice_timeorder',
                    pro: 'timeorder',
                    type: 'text'
                },{
                    el: 'notice_wartchorder',
                    pro: 'wartchorder',
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
       query: function(obj) {
        
    
            var data = notice.index.data();
              if(obj){
                data.city_id=obj;
             }
              
            if (debug) {
                console.log("index:");
                console.log(data);
            };
         
            if (1 == data.type) {
            data.pageNum=1;
            data.PageSize = 10;
            $("#fenTongzhi .infinite-scroll-preloader").empty();
            $("#fenTongzhi .infinite-scroll-preloader").append('<div class="preloader"></div>');
            notice.tool.ajax(notice.config.noticeList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && notice.config.constant['0003'] == d.data) {
                  
                    $("#queryTongzhiList").empty();
                    $(' #fenTongzhi .infinite-scroll-preloader').html(notice.config.constant['0012']); 
                } else if (d) {
                    var list = juicer(notice.tpl.TongzhiListTpl(), d);
                    $("#queryTongzhiList").html(list);
                    $("#Tongzhi_pageNum").val(1);
                    $("#tab1 .infinite-scroll-preloader").html('');
                    if ($("#queryTongzhiList li").length<10) { 
                         $("#tab1 .infinite-scroll-preloader").empty(); 
                          return
                   }
                    $('#fenTongzhi .infinite-scroll-preloader').empty();
                }
               
               
            }, function(xhr, type) {
                $(' #fenTongzhi .infinite-scroll-preloader').html(notice.config.constant['0001']);
                $.alert(notice.config.constant['0001']);
                $.hidePreloader();
            });
          } else if (2 == data.type) {
                data.pageNum=1;
                data.PageSize = 10;
                $("#fenBaoming .infinite-scroll-preloader").empty();
                $("#fenBaoming .infinite-scroll-preloader").append('<div class="preloader"></div>'); 
               notice.tool.ajax(notice.config.noticeList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && notice.config.constant['0003'] == d.data) {
                   
                    $("#queryBaomingList").empty();
                    $(' #fenBaoming .infinite-scroll-preloader').html(notice.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(notice.tpl.BaomingListTpl(), d);
                    $("#queryBaomingList").html(list);
                    $("#Baoming_pageNum").val(1);
                    $("#tab2 .infinite-scroll-preloader").html('');
                    if ($("#queryBaomingList li").length<10) { 
                         $("#tab2 .infinite-scroll-preloader").empty(); 
                          return
                   }
                    $('#fenBaoming .infinite-scroll-preloader').empty();
                }
                
               
            }, function(xhr, type) {
                $(' #fenBaoming .infinite-scroll-preloader').html(notice.config.constant['0001']);
                $.alert(notice.config.constant['0001']);
                $.hidePreloader();
            });
           }else if (3 == data.type) {
                data.pageNum=1;
                data.PageSize = 10;
                $("#fenFankui .infinite-scroll-preloader").empty();
                $("#fenFankui .infinite-scroll-preloader").append('<div class="preloader"></div>'); 
               notice.tool.ajax(notice.config.noticeList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && notice.config.constant['0003'] == d.data) {
               
                    $("#queryFankuiList").empty();
                    $(' #fenFankui .infinite-scroll-preloader').html(notice.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(notice.tpl.FankuiListTpl(), d);
                    $("#queryFankuiList").html(list);
                    $("#Fankui_pageNum").val(1);
                    $("#tab3 .infinite-scroll-preloader").html('');
                    if ($("#queryFankuiList li").length<10) { 
                         $("#tab3 .infinite-scroll-preloader").empty(); 
                          return
                   }
                    $('#fenFankui .infinite-scroll-preloader').empty();
                }
                
               
            }, function(xhr, type) {
                $(' #fenFankui .infinite-scroll-preloader').html(notice.config.constant['0001']);
                $.alert(notice.config.constant['0001']);
                $.hidePreloader();
            });
           }else if (4 == data.type) {
                data.pageNum=1;
                data.PageSize = 10;
                $("#fenQiuzheng .infinite-scroll-preloader").empty();
                $("#fenQiuzheng .infinite-scroll-preloader").append('<div class="preloader"></div>'); 
               notice.tool.ajax(notice.config.noticeList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && notice.config.constant['0003'] == d.data) {
                    
                    $("#queryQiuzhengList").empty();
                    $(' #fenQiuzheng .infinite-scroll-preloader').html(notice.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(notice.tpl.QiuzhengListTpl(), d);
                    $("#queryQiuzhengList").html(list);
                    $("#Qiuzheng_pageNum").val(1);
                    $("#tab4 .infinite-scroll-preloader").html('');
                    if ($("#queryQiuzhengList li").length<10) { 
                         $("#tab4 .infinite-scroll-preloader").empty(); 
                          return
                   }
                    $('#fenQiuzheng .infinite-scroll-preloader').empty();
                }
              
               
            }, function(xhr, type) {
                $(' #fenQiuzheng .infinite-scroll-preloader').html(notice.config.constant['0001']);
                $.alert(notice.config.constant['0001']);
                $.hidePreloader();
            });
           }else if (5 == data.type) {
               data.pageNum=1;
                data.PageSize = 10;
                $("#fenZhengqiu .infinite-scroll-preloader").empty();
                $("#fenZhengqiu .infinite-scroll-preloader").append('<div class="preloader"></div>'); 
               notice.tool.ajax(notice.config.noticeList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && notice.config.constant['0003'] == d.data) {
                   
                    $("#queryZhengqiuList").empty();
                    $(' #fenZhengqiu .infinite-scroll-preloader').html(notice.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(notice.tpl.ZhengqiuListTpl(), d);
                    $("#queryZhengqiuList").html(list);
                    $("#Zhengqiu_pageNum").val(1);
                    $("#tab5 .infinite-scroll-preloader").html('');
                    if ($("#queryZhengqiuList li").length<10) { 
                         $("#tab5 .infinite-scroll-preloader").empty(); 
                          return
                   }
                    $('#fenZhengqiu .infinite-scroll-preloader').empty();
                }
             
               
            }, function(xhr, type) {
                $(' #fenZhengqiu .infinite-scroll-preloader').html(notice.config.constant['0001']);
                $.alert(notice.config.constant['0001']);
                $.hidePreloader();
            });
           }
        },
       Tongdetail: function(id) {
            var data = {
              info_id: id,
              type: 1
            };
            if (debug) {
                console.log(data);
            }
            $("#noticedetails_id").val(id);
            $.showPreloader();
            notice.tool.ajax(notice.config.noticedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && notice.config.constant['0003'] == d.data) {
                    $.alert(notice.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo('noticedetails_', d);      
                    historyWatch(id, 12);
                    userclick(id, 12);
                    dianji();
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

       Baodetail: function(id) {
            var data = {
              info_id: id,
              type: 2
            };
            if (debug) {
                console.log(data);
            }
            $("#enrolldetails_id").val(id);
            $.showPreloader();
            notice.tool.ajax(notice.config.noticedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && notice.config.constant['0003'] == d.data) {
                    $.alert(notice.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    dianji();
                    viewInfo('enrolldetails_', d);
                    var mppp = $.trim(d.id);
                    var  baomingfei= $.trim(d.baomingfei);
                    var  jingfei= $.trim(d.jingfei);
                    $("#applyming_info_id").val(mppp);
                    $("#enrolldetails_baomingfei").val(baomingfei);
                    // console.log( $("#enrolldetails_baomingfei").val())
                    $("#enrolldetails_jingfei").val(jingfei);
                    if ($('#enrolldetails_getbaoming').html() == 0){
                    $('#enrolldetails_getbaoming').html("不收取报名费");
                    }else if($('#enrolldetails_getbaoming').html() == 1){
                    $('#enrolldetails_getbaoming').html(+$("#enrolldetails_baomingfei").val() +"元");
                    }
                    if ($('#enrolldetails_getjingfei').html() == 0){
                    $('#enrolldetails_getjingfei').html("不收取活动经费");
                    }else if($('#enrolldetails_getjingfei').html() == 1){
                    $('#enrolldetails_getjingfei').html(+$("#enrolldetails_jingfei").val() +"元");
                    }

                    historyWatch(id, 13);
                    userclick(id, 13);
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },


       Fandetail: function(id) {
            var data = {
              info_id: id,
              type: 3
            };
            if (debug) {
                console.log(data);
            }
            $("#feedbackdetails_id").val(id);
            $.showPreloader();
            notice.tool.ajax(notice.config.noticedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && notice.config.constant['0003'] == d.data) {
                    $.alert(notice.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo('feedbackdetails_', d);
                    var xxxx = $.trim(d.id);
                    $("#guan_zhu").val(xxxx);
                    historyWatch(id, 14);   
                    userclick(id, 14);  
                    dianji();
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

       Qiudetail: function(id) {
            var data = {
              info_id: id,
              type: 4
            };
            if (debug) {
                console.log(data);
            }
            $("#confirmdetails_id").val(id);
            $.showPreloader();
            notice.tool.ajax(notice.config.noticedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && notice.config.constant['0003'] == d.data) {
                    $.alert(notice.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo('confirmdetails_', d);
                    var hhhh = $.trim(d.id);
                    $("#detail_pinglun_id").val(hhhh);
                    historyWatch(id, 15);
                    userclick(id, 15);
                    dianji();
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
        Zhengdetail: function(id) {
            var data = {
              info_id: id,
              type: 5
            };
            if (debug) {
                console.log(data);
            }
            $("#seekdetails_id").val(id);
            $.showPreloader();
            notice.tool.ajax(notice.config.noticedetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && notice.config.constant['0003'] == d.data) {
                    $.alert(notice.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo('seekdetails_', d);
                    var mpid = $.trim(d.id);
                    var user = $.trim(d.user_id);
                    $("#Donate_info_id").val(mpid);
                    $("#user_id_id").val(user);
                     var user_id=getCookie('user_id');
                    $("#user_idd").val(user_id);
                     historyWatch(id, 16);
                     userclick(id, 16);
                     notice.donate.query(mpid); 
                     dianji(); 
                     var xx=$("#user_id_id").val();
                     var yy=$("#user_idd").val();
                     console.log(xx,yy)
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
       init:function(id) {

           
             
            var data = notice.index.datax(); 

            if (debug) {
                console.log(data);
            }
            data['location'] = id;

            notice.tool.ajax(notice.config.findAd, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                }
                if (d && notice.config.constant['0003'] == d.data) {
                    $.alert(notice.config.constant['0003'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    // viewInfo(_field, d.data);
                     viewAd('Convenience_', d.data);
                 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

        }
    };

  //求证点赞

$("#queryQiuzhengList").on('click','.true',function(){
    var id=$(this).parents('.pinglun').attr('id')
    var self=this;
    var data = {
      info_id:id,
      type:1,
      apply:1
    };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {
     
           if (d.data && notice.config.constant['0002'] == d.data) { 
            $(self).next('div').html($(self).next('div').html()*1+1);
        $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
        $(self).next('div').html($(self).next('div').html()*1);
                     $.alert('已经点过,点击无效');

                 }
          
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});


$("#detail_pinglun").on('click','.true',function(){
    var id=$("#detail_pinglun_id").val();
    console.log(id);
    var self=this;
    var data = {
      info_id:id,
      type:1,
      apply:1
    };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {
    
        if (d.data && notice.config.constant['0002'] == d.data) { 
             $(self).next('div').html($(self).next('div').html()*1+1);
        $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
         $(self).next('div').html($(self).next('div').html()*1);
                     $.alert('已经点过,点击无效');

                 }
          
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});

$("#queryQiuzhengList").on('click','.false',function(){
    var id=$(this).parents('.pinglun').attr('id')
    var self=this;
    var data = {
      info_id:id,
      type:1,
      apply:2
    };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {
   
           if (d.data && notice.config.constant['0002'] == d.data) { 
              $(self).next('div').html($(self).next('div').html()*1+1);
     $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
          $(self).next('div').html($(self).next('div').html()*1);
                     $.alert('已经点过,点击无效');
                 } 
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});

$("#detail_pinglun").on('click','.false',function(){
    var id=$("#detail_pinglun_id").val();
    var self=this;
    var data = {
      info_id:id,
      type:1,
      apply:2
    };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {

           if (d.data && notice.config.constant['0002'] == d.data) { 
                 $(self).next('div').html($(self).next('div').html()*1+1);
     $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
             $(self).next('div').html($(self).next('div').html()*1);
                     $.alert('已经点过,点击无效');
                 } 
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});

$("#queryQiuzhengList").on('click','.fair',function(){
    var id=$(this).parents('.pinglun').attr('id')
    var self=this;
    var data = {
      info_id:id,
      type:1,
      apply:3
    };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {
 
           if (d.data && notice.config.constant['0002'] == d.data) {
               $(self).next('div').html($(self).next('div').html()*1+1); 
     $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
            $(self).next('div').html($(self).next('div').html()*1);
                     $.alert('已经点过,点击无效');
                 } 
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});

$("#detail_pinglun").on('click','.fair',function(){
    var id=$("#detail_pinglun_id").val();
    var self=this;
    var data = {
      info_id:id,
      type:1,
      apply:3
    };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {
     
           if (d.data && notice.config.constant['0002'] == d.data) { 
            $(self).next('div').html($(self).next('div').html()*1+1);
     $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
        $(self).next('div').html($(self).next('div').html()*1);
                     $.alert('已经点过,点击无效');
                 } 
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});


//征求评论
$("#queryZhengqiuList").on('click','.true_ping',function(){

    var id=$(this).parents('.zantong').attr('id')
    var self=this;
    var data = {
      info_id:id,
      type:2,
      apply:1
    };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {

        if (d.data && notice.config.constant['0002'] == d.data) { 
        $(self).next('div').html($(self).next('div').html()*1+1);
     $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
           $(self).next('div').html($(self).next('div').html()*1);
                     $.alert('已经点过,点击无效');
                 } 
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});

$("#detail_zantong").on('click','.true_ping_1',function(){
    var id=$('#Donate_info_id').val();
    var self=this;
    var data = {
      info_id:id,
      type:2,
      apply:1
    };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {
    
           if (d.data && notice.config.constant['0002'] == d.data) { 
             $(self).next('div').html($(self).next('div').html()*1+1);
     // $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
         $(self).next('div').html($(self).next('div').html()*1);
                     // $.alert('已经点过,点击无效');
                 } 
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});



$("#queryZhengqiuList").on('click','.false_ping',function(){
    var id=$(this).parents('.zantong').attr('id')
    var self=this;
    var data = {
      info_id:id,
      type:2,
      apply:2
    };

    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {
    
      if (d.data && notice.config.constant['0002'] == d.data) { 
         $(self).next('div').html($(self).next('div').html()*1+1);
     $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
         $(self).next('div').html($(self).next('div').html()*1);
                     $.alert('已经点过,点击无效');
                 } 
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});



$("#detail_zantong").on('click','.false_ping_1',function(){
    var id=$('#Donate_info_id').val();
    var self=this;
    var data = {
      info_id:id,
      type:2,
      apply:2
    };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {
    
           if (d.data && notice.config.constant['0002'] == d.data) { 
             $(self).next('div').html($(self).next('div').html()*1+1);
     // $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
         $(self).next('div').html($(self).next('div').html()*1);
                     // $.alert('已经点过,点击无效');
                 } 
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});

//关注
$(".guanzhu_text").on('click','.guanzhu',function(){
    var id=$("#guan_zhu").val();
    var self=this;
    var data = {
      info_id:id,
      type:3,
      apply:1 
  };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {
  
      if (d.data && notice.config.constant['0002'] == d.data) { 
           $(self).next('h4').html($(self).next('h4').html()*1+1);
     $.alert('关注成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
           $(self).next('h4').html($(self).next('h4').html()*1);
                     $.alert('已经关注,点击无效');
                 } 
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});


//评论回复列表
    notice.donate = {
        data: function() {
            var data = {};
                 var criterias = [
              
               {
                    el: 'Donate_info_id',
                    pro: 'info_id',
                    type: 'text'
                },{
                    el: 'Donate_type',
                    pro: 'type',
                    type: 'text'
                }

            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },  
       query: function() {
            $.showPreloader();
   
                var data = notice.donate.data();
            if (debug) {
                console.log("donate:");
                console.log(data);
            };
           
            notice.tool.ajax(notice.config.NoticePinglun, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && notice.config.constant['0003'] == d.data) {
                    // $.alert(notice.config.constant['0013']);
                    $("#querydonateList").empty();

                    // $('#pageseekdetails .huifu_detailes').html(notice.config.constant['0013']); 
                } else if (d) {
                    
                    var list = juicer(notice.tpl.donateListTpl(), d);
              
                    $("#querydonateList").html(list);
                    $('#pageIndex .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                $(' #pageIndex .infinite-scroll-preloader').html(notice.config.constant['0001']);
                $.alert(notice.config.constant['0001']);
                $.hidePreloader();
            });
          
        },
    }



//回复评论
$("#querydonateList").on('click','.queding_btn',function(){
     var id = $(this).attr('id');
     var content=$(this).parents('.queding').find(".neirong").val();
    if(!content){
       $.alert("请填写内容");
       return
    }
     var data = {
        content:content,
        info_id:id
        };

    notice.tool.ajax(notice.config.addNoticeReply, data, null, 'post', function(d) {
        if (d.data && notice.config.constant['0002'] == d.data) {
            notice.donate.query(); 
            }
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
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




    $(document).on("pageInit", function(e, pageId, $page) {
    
           var url = location.search; //获取url中"?"符后的字串
             var strs = url.substr(1);
              var id=strs.split("=")[1]

     if (pageId == "pageIndex") {
          notice.index.query();
      
        notice.index.init(11);
        $(function(){

              $(".sort ul li").click(function(){
    $(this).addClass("selected2").siblings().removeClass("selected2");
    $(this).css({backgroundImage:"url(images/xuanzhong.png)"})
    $(this).siblings().css({backgroundImage:"url(images/paixu.png)"});
  })
        $("#tongzhi_btn").click(function () {
        $("#tongzhi_btn").attr("check", true);
        $("#baoming_btn").attr("check", false);
        $("#fankui_btn").attr("check", false);
        $("#qiuzheng_btn").attr("check", false);
        $("#zhengqiu_btn").attr("check", false);
      var pageNum = $("#tongzhi_pageNum").val(1);
     // $.attachInfiniteScroll($('.infinite-scroll').eq(1))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(2))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(3))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(4))
        notice.index.query();
        });
        
        $("#baoming_btn").click(function () {
        $("#baoming_btn").attr("check", true);
        $("#tongzhi_btn").attr("check", false);
        $("#fankui_btn").attr("check", false);
        $("#qiuzheng_btn").attr("check", false);
        $("#zhengqiu_btn").attr("check", false);
    var pageNum = $("#Baoming_pageNum").val(1);
     // $.attachInfiniteScroll($('.infinite-scroll').eq(0))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(2))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(3))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(4))
        notice.index.query();
        });

        $("#fankui_btn").click(function () {
        $("#fankui_btn").attr("check", true);
        $("#baoming_btn").attr("check", false);
        $("#tongzhi_btn").attr("check", false);
        $("#qiuzheng_btn").attr("check", false);
        $("#zhengqiu_btn").attr("check", false);
              var pageNum = $("#Fankui_pageNum").val(1);
     // $.attachInfiniteScroll($('.infinite-scroll').eq(0))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(1))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(3))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(4))
        notice.index.query();
        });

        $("#qiuzheng_btn").click(function () {
        $("#qiuzheng_btn").attr("check", true);
        $("#baoming_btn").attr("check", false);
        $("#fankui_btn").attr("check", false);
        $("#tongzhi_btn").attr("check", false);
        $("#zhengqiu_btn").attr("check", false);
              var pageNum = $("#Qiuzheng_pageNum").val(1);
     // $.attachInfiniteScroll($('.infinite-scroll').eq(1))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(2))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(0))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(4))
        notice.index.query();
        });

        $("#zhengqiu_btn").click(function () {
        $("#zhengqiu_btn").attr("check", true);
        $("#baoming_btn").attr("check", false);
        $("#fankui_btn").attr("check", false);
        $("#qiuzheng_btn").attr("check", false);
        $("#tongzhi_btn").attr("check", false);
              var pageNum = $("#Zhengqiu_pageNum").val(1);
     // $.attachInfiniteScroll($('.infinite-scroll').eq(1))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(2))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(3))
     // $.attachInfiniteScroll($('.infinite-scroll').eq(0))
        notice.index.query();
        });

         $("#btnQuery").click(function () {
            notice.index.query();
        });

        // $("#notice_locationorder1").click(function () {
        // notice.index.query();
        // });

        $("#notice_timeorder1").click(function () {
        notice.index.query();
        });

        $("#notice_wartchorder1").click(function () {
        notice.index.query();
        });
        });
        
    }else if(pageId == "pageseekdetails"){

        notice.index.Zhengdetail(id);
         
    }else if(pageId == "pagenoticedetails"){
        notice.index.Tongdetail(id); 
   }else if(pageId == "pageenrolldetails"){
        notice.index.Baodetail(id); 
   }else if(pageId == "pagefeedbackdetails"){
        notice.index.Fandetail(id); 
   }else if(pageId == "pageconfirmdetails"){
        notice.index.Qiudetail(id); 
   }else if (pageId == "pagePostnotice") {
        if (id) {
           notice.Tongzhi.eidt(id);
        } 
    }else if (pageId == "pagePostenroll") {
        if (id) {
           notice.Baoming.eidt(id);
        } 
    }else if (pageId == "pagePostfeedback") {
        if (id) {
           notice.Fankui.eidt(id);
        } 
    }else if (pageId == "pagePostseek") {
        if (id) {
           notice.Zhengqiu.eidt(id);
        } 
    }else if (pageId == "pagePostconfirm") {
        if (id) {
           notice.Qiuzheng.eidt(id);
        } 
    }
    

 });
 $.init();
    $(function() {

       $("#Tongzhi_fabu").click(function() {
        var id = $("#Tongzhi_id").val();
        if (id) {
        notice.Tongzhi.update(1,id);
        }else{
        notice.Tongzhi.submit(1);
        }
        });
           
       $("#Tongzhi_save").click(function() {
        var id = $("#Tongzhi_id").val();
        if (id) {
        notice.Tongzhi.update(2,id);
        }else{
        notice.Tongzhi.submit(2);
        }
        });

       $("#Baoming_fabu").click(function() {
        var id = $("#Baoming_id").val();
        if (id) {
        notice.Baoming.update(1,id);
        }else{
        notice.Baoming.submit(1);
        }
        });
           
       $("#Baoming_save").click(function() {
        var id = $("#Baoming_id").val();
        if (id) {
        notice.Baoming.update(2,id);
        }else{
        notice.Baoming.submit(2);
         }
        });

       $("#Fankui_fabu").click(function() {
        var id = $("#Fankui_id").val();
        if (id) {
        notice.Fankui.update(1,id);
        }else{
        notice.Fankui.submit(1);
         }
        });
           
       $("#Fankui_save").click(function() {
        var id = $("#Fankui_id").val();
         if (id) {
        notice.Fankui.update(2,id);
        }else{
        notice.Fankui.submit(2);
        }
        });

       $("#Qiuzheng_fabu").click(function() {
        var id = $("#Qiuzheng_id").val();
        if (id) {
        notice.Qiuzheng.update(1,id);
        }else{
        notice.Qiuzheng.submit(1);
        }
        });
           
       $("#Qiuzheng_save").click(function() {
        var id = $("#Qiuzheng_id").val();
        if (id) {
        notice.Qiuzheng.update(2,id);
        }else{
        notice.Qiuzheng.submit(2);
        }
        });

       $("#Zhengqiu_fabu").click(function() {
        var id = $("#Zhengqiu_id").val();
        if (id) {
        notice.Zhengqiu.update(1,id);
        }else{
        notice.Zhengqiu.submit(1);
        }
        });
           
       $("#Zhengqiu_save").click(function() {
        var id = $("#Zhengqiu_id").val();
        if (id) {
        notice.Zhengqiu.update(2,id);
        }else{
        notice.Zhengqiu.submit(2);
        }
        });

       


       $("#queding_btnn").click(function () {
        notice.applyming.submit();
        });

        $("#shenhe_btn").click(function () {
        notice.zhengming.submit();
        });
        
});
   
});





$("#detail_zantong").on('click','.true_ping_1', function () {
          var modal = $.modal({
      afterText: '<div class="share-wrap">'+
                 '<div  class="row">'+
                  '<div class="share-text">评论</div>'+
                  '</div>'+
                  '<div  class="row">'+
                  '<textarea cols="30" rows="5" class="pinglun_content" eleType="input" placeholder="不写表示忽略">'+
                  '</textarea>'+
                  '</div>'+
                  '</div>',
        buttons: [
            {
                text: '确定',
                onClick:function() {
                        var id=$("#Donate_info_id").val();
                        
                        var content=$(".pinglun_content").val();
                        var data = {
                        info_id:id,
                        type:5,
                        content:content
                        };
                        notice.tool.ajax(notice.config.addNoticePinglun, data, null, 'post', function(d) {
                         notice.donate.query();
                        }, function(xhr, type) {
                        $.toast(notice.config.constant['0001'], function() {
                        $.router.back();
                        });
                        $.hidePreloader();
                        });
                     
                 }
            }
        ]
    });
});

$("#detail_zantong").on('click','.false_ping_1', function () {
      var modal = $.modal({
      afterText: '<div class="share-wrap">'+
                 '<div  class="row">'+
                  '<div class="share-text">评论</div>'+
                  '</div>'+
                  '<div  class="row">'+
                  '<textarea cols="30" rows="5"  class="pinglun_content" eleType="input" placeholder="不写表示忽略">'+
                  '</textarea>'+
                  '</div>'+
                  '</div>',
        buttons: [
            {
                text: '确定',
                onClick: function() {
                    var id=$("#Donate_info_id").val();
                    var content=$(".pinglun_content").val();
                    // console.log(id,content)
                    var data = {
                    info_id:id,
                    type:5,
                    content:content
                    };
                    notice.tool.ajax(notice.config.addNoticePinglun, data, null, 'post', function(d) {
                        notice.donate.query();
                    }, function(xhr, type) {
                    $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                    });
                    $.hidePreloader();
                    });
                     
                 }
            }
        ]
    });
});


//举报收藏
function collectItem(e, info_id, info_type) {
    var $star = $(e);
    var add;
    var remove;
    var data = {
        info_id: $('#' + info_id).val(),
        info_type: info_type
    };
    notice.tool.ajax(notice.config.storeinfo, data, null, 'post', function(d) {
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
        $.alert(notice.config.constant['0001']);
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
    notice.tool.ajax(notice.config.reportinfo, data, null, 'post', function(d) {
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
    },  function(xhr, type) {
        add = 'jbstart-line';
        remove = 'jbstart-fill';
        reportIcon($star, add, remove);
        $.alert(notice.config.constant['0001']);
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
      notice.tool.ajax(notice.config.isreport, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && notice.config.constant['0003'] == d.data) {
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
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });


             notice.tool.ajax(notice.config.isstore, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && notice.config.constant['0003'] == d.data) {
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
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });

}

var indexquery=true; 

function closeWindow(){
   $(".queding").css("display","none");
   $(".fade").css("display","none");
}

function closeWindow1(){
   $(".lianjie_bianji").css("display","none");
   $(".fade").css("display","none");
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


$(document).on('click','.addlianjie', function () {
   
   $(".lianjie_bianji").css("display","block");
   $(".fade").css("display","block");
});

$(document).on('click','.addlianjie1', function () {
   
   $(".lianjie_bianji1").css("display","block");
   $(".fade").css("display","block");
});

$(document).on('click','.queding_btn_finish',function(){
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
   $('.comment').append("<div><p name='Baoming_c_url'>"+neirong_dizhi+"</p>"+"<p name='Baoming_url_content'>"+neirong_mingcheng+"</p><img onclick='removeAddLable(this)' src='images/lianjie_img.png' /></div>")
   $('.neirong_dizhi').val('');
   $('.neirong_mingcheng').val('');
   $(".lianjie_bianji").css("display","none");
   $(".fade").css("display","none");
});

$(document).on('click','.queding_btn_finish1',function(){
    var neirong_dizhi=$('.neirong_dizhi1').val();
    var neirong_mingcheng=$('.neirong_mingcheng1').val();
    if (!neirong_dizhi) {
       $.alert("链接地址不能为空！");
        return false;
    };
    if (!neirong_mingcheng){
       $.alert("链接名称不能为空！");
        return false;
    };
   $('.comment1').append("<div><p name='Tongzhi_c_url'>"+neirong_dizhi+"</p>"+"<p name='Tongzhi_url_content'>"+neirong_mingcheng+"</p><img onclick='removeAddLable(this)' src='images/lianjie_img.png' /></div>")
   $('.neirong_dizhi1').val('');
   $('.neirong_mingcheng1').val('');
   $(".lianjie_bianji1").css("display","none");
   $(".fade").css("display","none");
});

  function dianji(info_type) {
   
    var data = {
        'info_type': 11
    }
      notice.tool.ajax(notice.config.click, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
              if (d.data && notice.config.constant['0002'] == d.data) {
            
                    }  
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
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
      notice.tool.ajax(notice.config.userclick, data, null, 'post', function(d) {

        if (d.data && notice.config.constant['0002'] == d.data) { 
          $('.n_num_1>span').html($('.n_num_1>span').html()*1+1);
          $('.n_num>span').html($('.n_num>span').html()*1+1);
          }
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
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


/*获取验证码*/
var isPhone = 1;
function getCode(e){
    checkPhone(); //验证手机号码
    if(isPhone){
        resetCode(); //倒计时
    }else{
        $('#applyming_tel').focus();
    }
}

//验证手机号码
function checkPhone(){

    var phone = $('#applyming_tel').val();
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
    var telephone = $("#applyming_tel").val();
     var data = {
        telephone:telephone,
        type:70
        };

    notice.tool.ajax(notice.config.identify, data, null, 'post', function(d) {
        if (d.data && notice.config.constant['0002'] == d.data) {
               $.toast("已发送")
            }else if(d.data && notice.config.constant['7001'] == d.data){
                 $.toast("短信类型不存在")
            }else if(d.data && notice.config.constant['7000'] == d.data){
                  $.toast("参数不全")
            }else if(d.data && notice.config.constant['7002'] == d.data){
                  $.toast("半小时内已经连续获取三次，请稍后再试")
            }else if(d.data && notice.config.constant['7003'] == d.data){
                  $.toast("一分钟内已经发送过，不能频繁发送")
            }else if(d.data && notice.config.constant['7004'] == d.data){
                  $.toast("该手机号已经注册过")
            }else if(d.data && notice.config.constant['7005'] == d.data){
                  $.toast("手机格式有误")
            }
         
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
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



//通知换页
$(function () {
    "use strict";
    var tabIndex;
    var loading = false;
    $(document).on('infinite',function() {
      if($(this).find('.infinite-scroll.active').attr('id') == "tab1"){
         tabIndex = 0;
        if (loading || $("#queryTongzhiList li").length < 10) {
            return
        }
        

        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#Tongzhi_pageNum").val();
            if (pageNum == 1) {
                $('#fenTongzhi .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
            }
            $("#Tongzhi_pageNum").val(++pageNum);
             var param = notice.index.data();
            param.pageNum = pageNum;
            param.pageSize = 10;
            notice.tool.ajax(notice.config.noticeList, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };

                if (d.totalPage > param.pageNum) {
                   
                     var list = juicer(notice.tpl.TongzhiListTpl(), d);
                    $("#queryTongzhiList").append(list);

                }
                else if(d.totalPage == param.pageNum){
                    var list = juicer(notice.tpl.TongzhiListTpl(), d);
                    $("#queryTongzhiList").append(list);
                    $("#tab1 .infinite-scroll-preloader").empty();
                    $("#tab1 .infinite-scroll-preloader").html(notice.config.constant['0014']);
                   // $.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
                   return
              }
                // if (d && d.data && notice.config.constant['0003'] == d.data) {
                //     // $.alert(notice.config.constant['0015']);
                // } else if (d) {
                //     var list = juicer(notice.tpl.TongzhiListTpl(), d);
                //     $("#queryTongzhiList").append(list);
                 
                // }
            }, function(xhr, type) {
                $.alert(notice.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
}


//报名换页

 

    if($(this).find('.infinite-scroll.active').attr('id') == "tab2"){
      tabIndex = 1;
        if (loading || $("#queryBaomingList li").length < 10) {
            return
        }
        

        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#Baoming_pageNum").val();
            if (pageNum == 1) {
                $('#fenBaoming .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
            }
            $("#Baoming_pageNum").val(++pageNum);
           var param = notice.index.data();
            param.pageNum = pageNum;
            param.pageSize = 10;
            notice.tool.ajax(notice.config.noticeList, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d.totalPage > param.pageNum) {
                   
                     var list = juicer(notice.tpl.BaomingListTpl(), d);
                    $("#queryBaomingList").append(list);

                }
                else if(d.totalPage == param.pageNum){
                    var list = juicer(notice.tpl.BaomingListTpl(), d);
                    $("#queryBaomingList").append(list);
                    $("#tab2 .infinite-scroll-preloader").empty();
                    $("#tab2 .infinite-scroll-preloader").html(notice.config.constant['0014']);
                   // $.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
                   return
              }
                // if (d && d.data && notice.config.constant['0003'] == d.data) {
                //     // $.alert(notice.config.constant['0015']);
                // } else if (d) {
                //     var list = juicer(notice.tpl.BaomingListTpl(), d);
                //     $("#queryBaomingList").append(list);
                 
                // }
            }, function(xhr, type) {
                $.alert(notice.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
   }


//反馈换页

    if($(this).find('.infinite-scroll.active').attr('id') == "tab3"){
      tabIndex = 2;

        if (loading || $("#queryFankuiList li").length < 10) {
            return
        }
        

        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#Fankui_pageNum").val();
            if (pageNum == 1) {
                $('#fenFankui .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
            }
            $("#Fankui_pageNum").val(++pageNum);
           var param = notice.index.data();
            param.pageNum = pageNum;
            param.pageSize = 10;
            notice.tool.ajax(notice.config.noticeList, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d.totalPage > param.pageNum) {
                   
                     var list = juicer(notice.tpl.FankuiListTpl(), d);
                    $("#queryFankuiList").append(list);

                }
                else if(d.totalPage == param.pageNum){
                    var list = juicer(notice.tpl.FankuiListTpl(), d);
                    $("#queryFankuiList").append(list);
                    $("#tab3 .infinite-scroll-preloader").empty();
                    $("#tab3 .infinite-scroll-preloader").html(notice.config.constant['0014']);
                   // $.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
                   return
              }
                // if (d && d.data && notice.config.constant['0003'] == d.data) {
                //     // $.alert(notice.config.constant['0015']);
                // } else if (d) {
                //     var list = juicer(notice.tpl.FankuiListTpl(), d);
                //     $("#queryFankuiList").append(list);
                 
                // }
            }, function(xhr, type) {
                $.alert(notice.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);

}
//求证换页


    if($(this).find('.infinite-scroll.active').attr('id') == "tab4"){
      tabIndex = 3;

        if (loading || $("#queryQiuzhengList li").length < 10) {
            return
        }
        

        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#Qiuzheng_pageNum").val();
            if (pageNum == 1) {
                $('#fenQiuzheng .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
            }
            $("#Qiuzheng_pageNum").val(++pageNum);
           var param = notice.index.data();
            param.pageNum = pageNum;
            param.pageSize = 10;
            notice.tool.ajax(notice.config.noticeList, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
              if (d.totalPage > param.pageNum) {
                   
                     var list = juicer(notice.tpl.QiuzhengListTpl(), d);
                    $("#queryQiuzhengList").append(list);

                }
                else if(d.totalPage == param.pageNum){
                    var list = juicer(notice.tpl.QiuzhengListTpl(), d);
                    $("#queryQiuzhengList").append(list);
                    $("#tab4 .infinite-scroll-preloader").empty();
                    $("#tab4 .infinite-scroll-preloader").html(notice.config.constant['0014']);
                   // $.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
                   return
              }
                // if (d && d.data && notice.config.constant['0003'] == d.data) {
                //     // $.alert(notice.config.constant['0015']);
                // } else if (d) {
                //     var list = juicer(notice.tpl.QiuzhengListTpl(), d);
                //     $("#queryQiuzhengList").append(list);
                 
                // }
            }, function(xhr, type) {
                $.alert(notice.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
 }


//征求换页


        if($(this).find('.infinite-scroll.active').attr('id') == "tab5"){
      tabIndex = 4;
        if (loading || $("#queryZhengqiuList li").length < 10) {
            return
        }
        

        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#Zhengqiu_pageNum").val();
            if (pageNum == 1) {
                $('#fenZhengqiu .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
            }
            $("#Zhengqiu_pageNum").val(++pageNum);
           var param = notice.index.data();
            param.pageNum = pageNum;
            param.pageSize = 10;
            notice.tool.ajax(notice.config.noticeList, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };

                if (d.totalPage > param.pageNum) {
                   
                     var list = juicer(notice.tpl.ZhengqiuListTpl(), d);
                    $("#queryZhengqiuList").append(list);

                }
                else if(d.totalPage == param.pageNum){
                    var list = juicer(notice.tpl.ZhengqiuListTpl(), d);
                    $("#queryZhengqiuList").append(list);
                    $("#tab5 .infinite-scroll-preloader").empty();
                    $("#tab5 .infinite-scroll-preloader").html(notice.config.constant['0014']);
                   // $.detachInfiniteScroll($('.infinite-scroll').eq(tabIndex));
                   return
              }
                // if (d && d.data && notice.config.constant['0003'] == d.data) {
                //     // $.alert(notice.config.constant['0015']);
                // } else if (d) {
                //     var list = juicer(notice.tpl.ZhengqiuListTpl(), d);
                //     $("#queryZhengqiuList").append(list);
                 
                // }
            }, function(xhr, type) {
                $.alert(notice.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
   }
});
});


 $("#select_area").change(function(){
  notice.index.query();
  notice.index.init(11);
})
    