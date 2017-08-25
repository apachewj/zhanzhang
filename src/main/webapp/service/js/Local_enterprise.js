    window.enterprise = window.enterprise || {};
    var baseUrl = 'http://localhost:8080';

    var filedate=enterprise;

    var uploaddebug = true;
    var test=false;




    var debug = false;

    // + function($) {
    //     "use strict";
    $(function () {
      'use strict';

        window.enterprise = window.enterprise || {};

        var baseUrl = 'http://localhost:8080';


        enterprise.config = {
            baseUrl: '',
            loginUrl: baseUrl + '/service/zhuce.html',
            indexQueryListUrl: baseUrl + '',
            pubMyenterprise: baseUrl + '/user/company/add_Com',
            enterpriselist: baseUrl + '/user/company/com_list',
            enterpriseDetail: baseUrl + '/user/company/com_detail',
            pubNews: baseUrl + '/user/company/add_Com_News',
            pubProduct: baseUrl + '/user/company/add_Com_Goods',
            pubTechnicalSupport: baseUrl + '/user/company/add_Com_Support',
            contact: baseUrl + '/user/company/add_Com_Contact',
            checkiscompany: baseUrl + '/user/company/iscompany',
            companydetailinfo: baseUrl + '/user/company/com_detail_info',
            enterprisexinwenDetail: baseUrl + '/user/company/news',
            enterprisechanpinDetail: baseUrl + '/user/company/goods',
            pubMyenterpriseUpdate: baseUrl + '/user/company/change_Com',
            pubNewsUpdate: baseUrl + '/user/company/change_Com_News',
            pubProductUpdate: baseUrl + '/user/company/change_Com_Goods',
            pubTechnicalSupportUpdate: baseUrl + '/user/company/add_Com_Support',
             click: baseUrl +'/click',
             userclick: baseUrl +'/user/click',
             findAd: baseUrl + '/findAd',




            uploadFile: baseUrl + '/uploadFile',
            reportinfo: baseUrl + '/user/report',
            storeinfo: baseUrl + '/user/store',
            isreport: baseUrl + '/user/showreport',
            isstore: baseUrl + '/user/showstore',



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
                '5002': '请输入内容',
                '5003': '请输入单位',
                '5004': '请输入详情',
                '5005': '请输入分类',
                '6001': '请输入省',
                '6002': '请输入市',
                '6003': '请输入区',
                '6004': '举报成功!',
                '7001': '请输入公司名称!',
                '7002': '请输入公司简介!',
                '7003': '请输入省!',
                '7004': '请输入市!',
                '7005': '请输入区!',
                '7006': '请选择法定节假日是否值班!',
                '7007': '请选择营业起始日!',
                '7008': '请选择营业结束日!',
                '7009': '请选择营业开始时间!',
                '7010': '请选择营业结束时间!',




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
    // }(Zepto);
    });



    var position = {
        latitudeP: 32163306,
        longitudeP: 118712513,
        accuracyP: 67.8021001352539
    };

    var debug = false;

    $(function () {
      'use strict';

        window.enterprise = window.enterprise || {};

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
                     if (!enterprise.tool.validation.grea02Decimal(value)) {
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
                     if (!enterprise.tool.validation.isMobile(value)) {
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
                     if (!enterprise.tool.validation.digits(value)) {
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
        var valu="";
        var valu1="";
        var valu2="";
        var valu3="";
        var valu4="";
        var valu5="";
        var valu6="";
        var valu7="";
        var valu8="";
        var valu9="";
        var validationToValue = function(arrData) {
         var data = {};
         for (var i = 0; i < arrData.length; i++) {
             var item = arrData[i];
             var value = '';
             if ('input' === item.eleType) {
                 value = $("#" + item.id).val();
             }
             else if('inputnikname' === item.eleType) {
                if($("#" + item.id).val()){
                valu = valu + "," +$("#" + item.id).val();
                 value=valu;
                     }
             } else if('inputtel' === item.eleType) {
                if($("#" + item.id).val()){
                valu1 = valu1 + "," +$("#" + item.id).val();
                 value=valu1;
             }
             }
             else if('inputstartday' === item.eleType) {
                if($("#" + item.id).val()){
                     valu2 = valu2 + "," +$("#" + item.id).val();
                     value=valu2;
                }


             } else if('inputendday' === item.eleType) {
                if($("#" + item.id).val()){
                    valu3 = valu3+ "," +$("#" + item.id).val();
                     value=valu3;
               }
             }
             else if('inputstarttime' === item.eleType) {
                if($("#" + item.id).val()){
                valu4 = valu4 + "," +$("#" + item.id).val();
                 value=valu4;
             }
             }
             else if('inputendtime' === item.eleType) {
                if($("#" + item.id).val()){
                valu5= valu5 + "," +$("#" + item.id).val();
                 value=valu5;
             }
             }else if('inputcontext' === item.eleType) {
                if($("#" + item.id).val()){
                valu6= valu6 + "," +$("#" + item.id).val();
                 value=valu6;
             }
             }else if ('txtCarImg'=== item.eleType) {
                if($("#" + item.id).find('img').attr("src")){
                      valu7=valu7 + "," + $("#" + item.id).find('img').attr("src");
                      value=valu7;
                }


             }else if('inputcontext1' === item.eleType) {
                if($("#" + item.id).val()){
                valu8= valu8 + "," +$("#" + item.id).val();
                 value=valu8;
             }
             }else if ('txtCarImg1'=== item.eleType) {
                 if($("#" + item.id).find('img').attr("src")){
                 valu9=valu9 + "," + $("#" + item.id).find('img').attr("src");
                 value=valu9;
             }

             }else if('inputDate' === item.eleType){
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

             if(key == 'province_name'){

                 var province=$.trim(data[key]);

             }else if(key == 'city_name'){

                 var city=$.trim(data[key]);

             }else if(key == 'county_name'){
                 var county=$.trim(data[key]);

             }else if(key == 'iswork'){
                 var iswork=$.trim(data[key]);
                 if(iswork==1){
                    $("input[name='sex'][data-pub='1']").attr('checked', true);
                    $("input[name='sex'][data-pub='1']").attr('check', true);
                    $("#holiday_input").show();

                    // $("#furlough1").attr("checked");
                    // $("#furlough1").attr("check",true);
                 }else{
                    $("input[name='sex'][data-pub='0']").attr('checked', true)
                    $("input[name='sex'][data-pub='0']").attr('check', true)
                    $("#holiday_input").hide();
                    $("#contact_holiworkstart").val('');
                    $("#contact_holiworkend").val('');


                 }



             }else if(key == 'main_info'){

                 for (var key in data.main_info) {

                     var value = $.trim(data.main_info[key].img_path);
                     var value2 = $.trim(data.main_info[key].content);
                     var c_image = value.split(',');
                     var c_context = value2.split(',');
                        if (c_image && c_image.length > 0 && c_image[0] != '') {

                             $.each(c_image, function(i, e) {
                                  if(i<c_image.length-1){
                                    var che=$("#" + _m +'c_context').text();

                                      if( _m == 'pubNews_' && !che){
                                            add2();

                                       }else if( _m == 'pubTechnicalSupport_' && !che){
                                           add3();
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

              }else if(key == 'work_info'){

                 for (var key in data.work_info) {

                     var value = $.trim(data.work_info[key].startday);
                     var value2 = $.trim(data.work_info[key].endday);
                     var value3 = $.trim(data.work_info[key].endtime);
                     var value4 = $.trim(data.work_info[key].starttime);
                     var startday = value.split(',');
                     var endday = value2.split(',');
                     var endtime = value3.split(',');
                     var starttime = value4.split(',');

                           if($("#" + _m +'startday').val()==''){
                                for(var i=1;i<startday.length;i++){
                                           add1();
                                     }
                            }
                        if (startday && startday.length > 0 && startday[0] != '') {

                             $.each(startday, function(i, e) {


                                 if(i==0){
                                             var el1=$("#" + _m +'startday');
                                             $(el1).val(e);

                                 }
                                  else{

                                             var el1=$("#" + _m +'startday'+i);
                                             $(el1).val(e);

                                 }
                             });
                          }
                          if (endday && endday.length > 0 && endday[0] != '') {

                             $.each(endday, function(i, e) {

                                 if(i==0){
                                             var el2=$("#" + _m +'endday');
                                             $(el2).val(e);
                                 }
                                  else{

                                           var el2=$("#" + _m +'endday'+i);
                                             $(el2).val(e);

                                 }
                             });
                         }
                          if (endtime && endtime.length > 0 && endtime[0] != '') {

                             $.each(endtime, function(i, e) {

                                 if(i==0){
                                             var el3=$("#" + _m +'endtime');
                                             $(el3).val(e);
                                 }
                                  else{

                                           var el3=$("#" + _m +'endtime'+i);
                                             $(el3).val(e);

                                 }
                             });
                         }
                          if (starttime && starttime.length > 0 && starttime[0] != '') {

                             $.each(starttime, function(i, e) {

                                 if(i==0){
                                             var el4=$("#" + _m +'starttime');
                                             $(el4).val(e);
                                 }
                                  else{

                                           var el4=$("#" + _m +'starttime'+i);
                                             $(el4).val(e);

                                 }
                             });
                         }


                    }

              }else if(key == 'link_info'){

                 for (var key in data.link_info) {

                     var valuee= $.trim(data.link_info[key].nikname);
                     var valueee = $.trim(data.link_info[key].tel);

                     var nikname = valuee.split(',');
                     var tel = valueee.split(',');
                             if($("#" + _m +'nikname').val()){
                                return
                              }else{
                                  for(i=1;i<nikname.length;i++){
                                           add();
                                     }
                              }
                           if (nikname && nikname.length > 0 && nikname[0] != '') {
                               $.each(nikname, function(i, e) {

                                 if(i==0){
                                             var el5=$("#" + _m +'nikname');
                                             $(el5).val(e);

                                 }
                                  else{

                                           var el5=$("#" + _m +'nikname'+i);
                                             $(el5).val(e);

                                 }
                             });
                          }
                          if (tel && tel.length > 0 && tel[0] != '') {

                             $.each(tel, function(i, e) {

                                 if(i==0){
                                             var el6=$("#" + _m +'tel');
                                             $(el6).val(e);
                                 }
                                  else{
                                           var el6=$("#" + _m +'tel'+i);
                                             $(el6).val(e);
                                 }
                             });
                         }
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
                        var list = document.getElementById(_m + key + '_List');
                        // $(list).empty();
                        $.each(imgs, function (i, e) {
                            var ipot = e.lastIndexOf(".");
                            var type = fileType(e.substring(ipot + 1));
                            if (type == 'image') {
                                showImgs(list, "" + _m + key, e);
                            }
                        });
                      }
                   }
                     else if (eleType === 'btnRound') {
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

         }
          if(province&&city&&county){

              _cityPosdataPub(province,city,county);
           }

        };


        var viewInfo = function(_m, data) {
            //处理轮播图
                var html = [];

                for(var i=0;i<data.length;i++ ) {

                    html.push('<div class="swiper-slide"><img src="' + data[i] + '" alt="" style="width: 100%;height:8rem;" ></div>');

                }
                var list = $('#enterpriseDetail_main_img_List');

                list.empty();


                if (html.length > 0) {
                    list.html(html.join(''));

                }




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
                                         html.push('<div class="swiper-slide swiper-slides"><img src="' + e + '" alt="" style="width: 100%;height:8rem;" ></div>');
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
                        for(var j=0;j<data.main_info[i].img_path.split(',').length;j++){

                        html.push('<img src="' + data.main_info[i].img_path.split(',')[j] + '" alt="" ><div class="contentstyles">' +data.main_info[i].content.split(',')[j]+'</div>')
                        }
                    }
                    var list = $('#EnterprisexinwenDetail_imgs');

                    var list1 = $('#EnterprisejishuDetail_imgs');


                    list.empty();
                    list1.empty();

                    if (html.length > 0) {
                        list.html(html.join(''));
                        list1.html(html.join(''));
                    }
         };

      var viewInfo2 = function(data) {

               // 处理一组称呼和电话号码

                   var html = [];

                for(var i=0;i<data.link_info.length;i++ ) {

                    for(var j=0;j<data.link_info[i].nikname.split(',').length;j++){
                     html.push('<div class="userphone_content" ><div>'+data.link_info[i].nikname.split(',')[j]+'</div><div>'+data.link_info[i].tel.split(',')[j]+'</div></div> <div class="userphone_content_right"><img src="images/mobl.png"></div><div class="clear"></div> ');
                    }

                }
                var list = $('#link_info_attr');

                list.empty();


                if (html.length > 0) {
                    list.html(html.join(''));

                }

                   var html = [];

                for(var i=0;i<data.work_info.length;i++ ) {
                    for(var j=0;j<data.work_info[i].startday.split(',').length;j++){

                  html.push('<li>'+data.work_info[i].startday.split(',')[j]+'至'+data.work_info[i].endday.split(',')[j]+'</li>'+
                    '<li>'+data.work_info[i].starttime.split(',')[j]+'—'+data.work_info[i].endtime.split(',')[j]+'</li>');
                     }
                }
                var list = $('#work_info_attr');

                list.empty();


                if (html.length > 0) {
                    list.html(html.join(''));

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

        enterprise.tpl = {
            indexListTpl: function(data) {

                return ['{@each data as item}',
                           '<div class="list-block media-list">',
                                      '<ul>',
                                         '<a href="../service/Local_enterprise.html?id=${item.id}#pageEnterpriseDetail" external>',
                                        '<li class="item-content">',
                                          '{@if item.main_img}','<div class="item-media mediastyle">','<img src="${item.main_img.split(",")[0] }">','</div>',
                                           '{@else if !item.main_img}', '',
                                           '{@/if}',
                                          '<div class="item-inner">',
                                            '<div class="item-title-row">',
                                              '<div class="item-title">${item.com_name}</div>',
                                              '<div class="item-after" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img class="d_pic" src="images/u13.png"></div>',
                                            '</div>',
                                            '<div class="item-subtitle">${item.message}</div>',
                                          '</div>',
                                        '</li>',
                                        '</a>',
                                      '</ul>',
                             '</div>',
                         '{@/each}'
                 ].join('');
            },
            xinwenListTpl: function(data) {

                return ['{@each data as item}',
                            '<div class="situation-box-item">',
                                      '<div>',
                                          '<a href="../service/Local_enterprise.html?id=${item.id}#pageNewsInformation" external>',
                                            '<h3>${item.title}</h3>',
                                            '<p>${item.content.split(",")[0]}</p>',
                                          '</a>',
                                      '</div>',
                                  '</div>',
                         '{@/each}'
                 ].join('');
            },

             chanpinListTpl: function(data) {

                return ['{@each data as item}',
                                    '<li>',
                                        '<a class="cont" href="../service/Local_enterprise.html?id=${item.goods_id}#pageProductDetail" external>',
                                            '<img src="${item.imgs.split(",")[0]}">',
                                            '<p>${item.title}</p>',
                                            '<span>${item.content}</span>',
                                         '</a>',
                                    '</li>',
                         '{@/each}'
                 ].join('');
            },

        };


        enterprise.tool = {
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
                            location.href = enterprise.config.loginUrl;
                            if($.device.os=="android"){
                                javascript:login.nologin();
                            }else if($.device.os=="ios"){
                                location.href = enterprise.config.loginUrl;
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

        enterprise.index = {
            data: function() {
                var data = {};
                     var criterias = [

                     {
                        el: 'list_param',
                        pro: 'name',
                        type: 'text'
                    }, {
                        el: 'list_pageNum',
                        pro: 'pageNum',
                        type: 'text'
                    }, {
                        el: 'list_pageSize',
                        pro: 'pageSize',
                        type: 'text'
                    }, {
                        el: 'select_city1',
                        pro: 'city_id',
                        type: 'text'
                    }, {
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
                    }, {
                             el: 'select_area1',
                             pro: 'county_id',
                             type: 'text'
                         }
                ];
               selectVal(criterias, data);
               console.info(data)
               return data;
            },


           query: function() {
                // $.showPreloader();
                $("#list_pageNum").val(1);
                $("#list_pageSize").val(10);
                var data = enterprise.index.data();
                if (debug) {
                    console.log("index:");
                    console.log(data);
                };



                // $('#pagelistContent .infinite-scroll-preloader').empty();
                // $('#pagelistContent .infinite-scroll-preloader').append('<div class="preloader"></div>');

                enterprise.tool.ajax(enterprise.config.enterpriselist, data, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && enterprise.config.constant['0003'] == d.data) {
                        // $.alert(enterprise.config.constant['0012']);
                        $("#queryList").empty();
                        $('#pagelistContent .infinite-scroll-preloader').html(enterprise.config.constant['0012']);
                    } else if (d) {

                        var list = juicer(enterprise.tpl.indexListTpl(), d);
                        $("#queryList").html(list);
                        $("#list_pageNum").val(1);
                        $('#pagelistContent .infinite-scroll-preloader').html("");
                    }
                    $.hidePreloader();

                }, function(xhr, type) {
                    // $(' #pagelistContent .infinite-scroll-preloader').html(enterprise.config.constant['0001']);
                    $.alert(enterprise.config.constant['0001']);
                    // $('.infinite-scroll-preloader').eq(0).hide();
                });
            },
             detail: function(id) {
                var data = {
                   com_id: id,

                };
                if (debug) {
                    console.log(data);
                }

                $("#EnterpriseDetail_id").val(id);

                // $.showPreloader();
                enterprise.tool.ajax(enterprise.config.enterpriseDetail, data, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    };
                    if (d && enterprise.config.constant['0003'] == d.data) {
                        $.alert(enterprise.config.constant['0004'], function() {
                            $.router.back();
                        });
                    } else if (d) {
                        viewInfo('EnterpriseDetail_', d);
                        viewInfo('EnterpriseDetail_', d.main_img.split(","));
                        historyWatch(id, 10);
                        dianji(15);
                        userclick(id, 10);
                        var mpid = $.trim(d.id);
                        var flag=$("#mpid").val();

                        if (!flag) {
                            $("#com_id").val(mpid);
                        }

                             showmore();

                        enterprise.MyenterpriseDetail.query(1);

                    }
                    $.hidePreloader();
                }, function(xhr, type) {
                    $.toast(enterprise.config.constant['0001'], function() {
                        $.router.back();
                    });
                    $.hidePreloader();
                });
            },

            checkiscompany: function(){
                if (debug) {
                    console.log("checkiscompany:");
                };
                var flag= $('#pindexf').val();
                if (flag!='index') {
                    return;
                };
                var checkH=$.trim($("#checkH").val());
                if (checkH) {
                    return;
                };
                enterprise.tool.ajax(enterprise.config.checkiscompany, {}, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }

                    if ( enterprise.config.constant['0003'] == d.data) {

                    }else if(d.dohave==1){

                         $.router.load('#pagePostChoose')
                        var mp = $.trim(d.com_name);
                        var flag=$("#mp").val();
                        if (!flag) {
                            $("#companyname").html(mp);
                        }
                    }else if(2==d.dohave){
                         $.router.load("#pagePubMyenterprise");

                    }
                }, function(xhr, type) {
                    if (debug) {
                        console.log(xhr);
                    }
                    location.href=enterprise.config.loginUrl;
                });
            },


            init:function(id) {

                var data = enterprise.index.datax();

                if (debug) {
                    console.log(data);
                }
                data['location'] = id;

                enterprise.tool.ajax(enterprise.config.findAd, data, null, 'post', function(d) {

                    if (debug) {
                        console.log(d);
                    }
                    if (d && enterprise.config.constant['0003'] == d.data) {
                        $.alert(enterprise.config.constant['0003'], function() {
                            $.router.back();
                        });
                    } else if (d) {
                        // viewInfo(_field, d.data);
                         viewAd('Enterprise_', d.data);

                    }
                    $.hidePreloader();
                }, function(xhr, type) {
                    $.toast(enterprise.config.constant['0001'], function() {
                        $.router.back();
                    });
                    $.hidePreloader();
                });

            }
        };



        enterprise.MyenterpriseDetail = {
            data: function() {
                var data = {};
                     var criterias = [

                    {
                        el: 'type',
                        pro: 'type',
                        type: 'btnRound'
                    },
                    {
                        el: 'com_id',
                        pro: 'com_id',
                        type: 'text'
                    }

                    // ,{
                    //     el: 'sell_pageNum',
                    //     pro: 'pageNum',
                    //     type: 'text'
                    // }, {
                    //     el: 'sell_pageSize',
                    //     pro: 'pageSize',
                    //     type: 'text'
                    // }
                ];
               selectVal(criterias, data);
               console.info(data)
               return data;
            },

           query: function(i) {
                // $.showPreloader();
                // $("#sell_pageNum").val(1);
                // $("#sell_pageSize").val(10);
                var data = enterprise.MyenterpriseDetail.data();
                if (debug) {
                    console.log("companydetail:");
                    console.log(data);
                };

                 if (!data.type) {
                     data.type=i;
                 }
                    if (1 == data.type) {
                        enterprise.tool.ajax(enterprise.config.companydetailinfo, data, null, 'post', function(d) {
                            if (debug) {
                                console.log(d);
                            }
                            if (d.data && enterprise.config.constant['0003'] == d.data) {
                                $("#queryxinwenList").html(enterprise.config.constant['0012']);

                                // $(' #tab1 .infinite-scroll-preloader').html(tourism.config.constant['0012']);
                            } else if (d) {

                                var list = juicer(enterprise.tpl.xinwenListTpl(), d);
                                $("#queryxinwenList").html(list);
                                // $(' #tab1 .infinite-scroll-preloader').empty();
                            }
                            $.hidePreloader();

                        }, function(xhr, type) {
                            // $(' #tab1 .infinite-scroll-preloader').html(tourism.config.constant['0001']);
                            $.alert(enterprise.config.constant['0001']);
                            // $('.infinite-scroll-preloader').eq(0).hide();
                        });
                      }else if(2 == data.type){
                             enterprise.tool.ajax(enterprise.config.companydetailinfo, data, null, 'post', function(d) {
                            if (debug) {
                                console.log(d);
                            }
                            if (d.data && enterprise.config.constant['0003'] == d.data) {
                                $("#querychanpinList").html(enterprise.config.constant['0012']);

                            } else if (d) {
                                // var page = d.data.page;
                                var list = juicer(enterprise.tpl.chanpinListTpl(), d);
                                $("#querychanpinList").html(list);
                                // $('#pageSellContent .infinite-scroll-preloader').empty();
                            }
                            $.hidePreloader();
                            // timer();
                        }, function(xhr, type) {
                            $.alert(enterprise.config.constant['0001']);
                            $.hidePreloader();
                        });
                        }else if(3 == data.type){
                            enterprise.tool.ajax(enterprise.config.companydetailinfo, data, null, 'post', function(d) {

                               if (debug) {
                                 console.log(d);
                                };
                                if (d.data && enterprise.config.constant['0003'] == d.data) {
                                $("#tab3").html(enterprise.config.constant['0012']);

                               }else if (d) {
                                    viewInfo1(d.data);
                                    if(d.user_id==user_id){
                                     $("#btnxiugaijishuzhichi").append('<nav class="bar bar-tab bar-style bar-jishu" ><a class="tab-item" href="#pagePubTechnicalSupport" ><span class="tab-label">修改技术支持</span> </a></nav>')
                                     }

                                }
                                $.hidePreloader();
                                }, function(xhr, type) {
                                $.toast(tourism.config.constant['0001'], function() {
                                    $.router.back();
                                });
                                $.hidePreloader();
                            });
                           }else if(4 == data.type){


                             enterprise.tool.ajax(enterprise.config.companydetailinfo, data, null, 'post', function(d) {

                               if (debug) {
                                 console.log(d);
                                };

                                if (d.data && enterprise.config.constant['0003'] == d.data) {
                                $("#tab4").html(enterprise.config.constant['0012']);
                                } else if (d) {
                                    var _field = 'EnterpriselianxiDetail_';
                                    viewInfo(_field,d.data);
                                    viewInfo2(d.data);
                                    if(d.user_id==user_id){
                                     $("#btnxiugailainxifangshi").append('<nav class="bar bar-tab bar-style bar-jishu" ><a class="tab-item" href="#pagePostContact" ><span class="tab-label">修改联系方式</span> </a></nav>')
                                     }

                                }
                                $.hidePreloader();
                                }, function(xhr, type) {
                                $.toast(enterprise.config.constant['0001'], function() {
                                    $.router.back();
                                });
                                $.hidePreloader();
                            });
                  }
              },
             xinwendetail: function(id) {
                var data = {
                   news_id: id,

                };
                if (debug) {
                    console.log(data);
                }
                $("#EnterprisexinwenDetail_id").val(id);

                // $.showPreloader();
                enterprise.tool.ajax(enterprise.config.enterprisexinwenDetail, data, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    };
                    if (d && enterprise.config.constant['0003'] == d.data) {
                        $.alert(enterprise.config.constant['0004'], function() {
                            $.router.back();
                        });
                    } else if (d) {
                        viewInfo('EnterprisexinwenDetail_', d);

                        viewInfo1(d);
                        historyWatch(id, 10);
                        dianji(15);
                        userclick(id, 10);
                        if(d.user_id==user_id){
                            $("#btnxiugaixinwen").append('<nav class="bar bar-tab bar-style" ><a class="tab-item" href="#pagePubNews" ><span class="tab-label">修改新闻资讯</span> </a></nav>')
                        }

                    }
                    $.hidePreloader();
                }, function(xhr, type) {
                    $.toast(enterprise.config.constant['0001'], function() {
                        $.router.back();
                    });
                    $.hidePreloader();
                });
            },
             chanpindetail: function(id) {
                var data = {
                   goods_id: id,

                };
                if (debug) {
                    console.log(data);
                }
                $("#EnterprisechanpinDetail_id").val(id);
                // $.router.load("#" + els.page);
                // $.showPreloader();
                enterprise.tool.ajax(enterprise.config.enterprisechanpinDetail, data, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    };
                    if (d && enterprise.config.constant['0003'] == d.data) {
                        $.alert(enterprise.config.constant['0004'], function() {
                            $.router.back();
                        });
                    } else if (d) {
                        viewInfo('EnterprisechanpinDetail_', d);
                        dianji(15);
                        userclick(id, 10);
                        if(d.user_id==user_id){
                            $("#btnxiugaichanpin").append('<nav class="bar bar-tab bar-style" ><a class="tab-item" href="#pagePubProduct" ><span class="tab-label">修改产品信息</span> </a></nav>')
                        }
                        // var mpid = $.trim(d.id);
                        //  $("#EnterprisechanpinDetail_id").val(mpid);

                    }
                    $.hidePreloader();
                }, function(xhr, type) {
                    $.toast(tourism.config.constant['0001'], function() {
                        $.router.back();
                    });
                    $.hidePreloader();
                });
            },

            init: function() {
                // tourism.index.query();
            }
        };




        //发布我的企业
        enterprise.pubMyenterprise = {
         data: function() {
             var pubMyenterprisedatas = [ {

                    id: 'pubMyEnterprise_main_img',
                    pro: 'main_img',
                    eleType: 'img',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
              },{
                 id: 'pubMyEnterprise_com_name',
                 pro: 'com_name',
                 eleType: 'input',
                 valids: {
                     'require': {
                         'is': true,
                         'msg': enterprise.config.constant['7001']
                     }
                 }
              },{
                     id: 'pubMyEnterprise_message',
                     pro: 'message',
                     eleType: 'input',
                     valids: {
                         'require': {
                             'is': true,
                             'msg':enterprise.config.constant['7002']
                         }
                     }
                 },{
                     id: 'pubMyEnterprise_id_img',
                     pro: 'id_img',
                     eleType: 'img',
                     valids: {
                         'require': {
                             'is': false,
                             'msg':''
                         }
                     }
                 },{
                     id: 'pubMyEnterprise_paper_img',
                     pro: 'paper_img',
                     eleType: 'img',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                 id: 'select_city',
                 pro: 'city_id',
                 eleType: 'input',
                 valids: {
                     'require': {
                         'is': true,
                         'msg': enterprise.config.constant['7003']
                     }
                 }
             },{
                 id: 'select_area',
                 pro: 'county_id',
                 eleType: 'input',
                 valids: {
                     'require': {
                         'is': true,
                         'msg': enterprise.config.constant['7004']
                     }
                 }
             },{
                 id: 'select_province',
                 pro: 'province_id',
                 eleType: 'input',
                 valids: {
                     'require': {
                         'is': true,
                         'msg': enterprise.config.constant['7005']
                     }
                 }
            },{
                 id: 'pubMyEnterprise_location_x',
                 pro: 'location_x',
                 eleType: 'input',
                 valids: {
                     'require': {
                         'is': true,
                         'msg': ''
                     }
                 }
            },{
                 id: 'pubMyEnterprise_location_y',
                 pro: 'location_y',
                 eleType: 'input',
                 valids: {
                     'require': {
                         'is': true,
                         'msg': ''
                     }
                 }
            }];

             return validationToValue(pubMyenterprisedatas);
         },
         submit: function(status) {
             var data = enterprise.pubMyenterprise.data();
             if (debug) {
                 console.log('pubMyEnterprise validation ' + '--> ');
                 console.log(data);
             }
             if (data) {

                   var data2 = {};
                    for (var key in data) {

                        data2[key] = data[key];
                    }
                 data2['status'] = status;

                 enterprise.tool.ajax(enterprise.config.pubMyenterprise, data2, null, 'post', function(d) {
                     if (debug) {
                         console.log(d);
                     }

                     if (d.data && enterprise.config.constant['0002'] == d.data) {
                         $.alert(enterprise.config.constant['0004'],function(){
                              $.router.load("#pagePostChoose");
                         });
                     } else if (d.data) {
                         $.alert(enterprise.config.constant['0005']);
                     }
                 }, function(xhr, type) {
                     $.alert(enterprise.config.constant['0001']);
                 });
             }
         },

          eidt: function(id) {

                var data = {
                    com_id: id,
                };

                enterprise.tool.ajax(enterprise.config.enterpriseDetail, data, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d && enterprise.config.constant['0003'] == d) {
                         $.alert(enterprise.config.constant['0003'], function() {
                            $.router.back();
                        });
                    } else if (d) {
                        console.log(d)

                        viewInit('pubMyEnterprise_', d);

                    }
                }, function(xhr, type) {
                    $.toast(enterprise.config.constant['0001']);
                });
            },
            update: function(status,id) {

                 var data = enterprise.pubMyenterprise.data();

                     if (debug) {
                         console.log('pubMyEnterprise validation ' + '--> ');
                         console.log(data);
                     }
               if (data) {

                   var data2 = {};
                    for (var key in data) {

                        data2[key] = data[key];
                    }
                 data2['status'] = status;
                 data2['com_id'] = id;

                 enterprise.tool.ajax(enterprise.config.pubMyenterpriseUpdate, data2, null, 'post', function(d) {
                     if (debug) {
                         console.log(d);
                     }

                     if (d.data && enterprise.config.constant['0002'] == d.data) {
                         $.alert(enterprise.config.constant['0004'],function(){
                              $.router.back();
                         });
                     } else if (d.data) {
                         $.alert(enterprise.config.constant['0005']);
                     }
                 }, function(xhr, type) {
                     $.alert(enterprise.config.constant['0001']);
                 });
             }
            },


         init: function() {
             var id = $("#pubMyenterprise_id").val();
             // if (id) {
             //     enterprise.pubZPeopleService.eidt(id);
             // }
         }
        };

       //发布我的新闻
        enterprise.pubNews = {
         data: function() {
             var pubNewsdatas = [ {
                      id: 'pubNews_title',
                          pro: 'title',
                         eleType: 'input',
                         valids: {
                             'require': {
                                 'is': true,
                                 'msg': enterprise.config.constant['5001']
                                 }
                             }
                      },{
                         id: 'pubNews_c_image',
                         pro: 'c_image',
                         eleType: 'txtCarImg',
                         valids: {
                             'require': {
                                 'is': true,
                                 'msg': enterprise.config.constant['3001']
                             }
                         }
                     },{
                         id: 'pubNews_c_context',
                         pro: 'c_context',
                         eleType: 'inputcontext',
                         valids: {
                             'require': {
                                 'is': true,
                                 'msg': enterprise.config.constant['3008']
                             }
                         }
                     }];
                         var sc2=$('.sc-12').find('textarea').size();
                   console.info(sc2);
                         for(var m=1;m<sc2+1;m++){
                         var s2=[
                              {
                         id: 'pubNews_c_image'+m,
                         pro: 'c_image',
                         eleType: 'txtCarImg',
                         valids: {
                             'require': {
                                 'is': true,
                                 'msg': enterprise.config.constant['3001']
                             }
                         }
                     },{
                         id: 'pubNews_c_context'+m,
                         pro: 'c_context',
                         eleType: 'inputcontext',
                         valids: {
                             'require': {
                                 'is': true,
                                 'msg': enterprise.config.constant['3008']
                             }
                         }
                     }
                 ];
                     pubNewsdatas=pubNewsdatas.concat(s2);
                }

            console.info(pubNewsdatas)

             return validationToValue(pubNewsdatas);
         },
         submit: function() {
             var data = enterprise.pubNews.data();
             if (debug) {
                 console.log('pubNews validation ' + '--> ');
                 console.log(data);
             }
             if (data) {

                   var data2 = {};
                    for (var key in data) {
                        // if(key == "main_img"){
                        // data2[key] = data[key];
                        // }else{
                        // data2[key] = data[key];}
                        data2[key] = data[key];
                    }
                    data2['c_image'] = data2['c_image'].substring(1);
                    data2['c_context'] = data2['c_context'].substring(1);


                 enterprise.tool.ajax(enterprise.config.pubNews, data2, null, 'post', function(d) {
                     if (debug) {
                         console.log(d);
                     }

                     if (d.data && enterprise.config.constant['0002'] == d.data) {
                         $.alert(enterprise.config.constant['0004'],function(){
                              $.router.load("#pagePostChoose");
                         });
                     } else if (d.data) {
                         $.alert(enterprise.config.constant['0005']);
                     }
                 }, function(xhr, type) {
                     $.alert(enterprise.config.constant['0001']);
                 });
             }
         },


          eidt: function(id) {

                var data = {
                   news_id: id,

                };
                if (debug) {
                    console.log(data);
                }
                $("#EnterprisexinwenDetail_id").val(id);

                // $.showPreloader();
                enterprise.tool.ajax(enterprise.config.enterprisexinwenDetail, data, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    };
                    if (d && enterprise.config.constant['0003'] == d.data) {
                        console.info(d)
                        // $.alert(enterprise.config.constant['0004'], function() {
                        //     $.router.back();
                        // });
                    } else if (d) {
                        viewInit('pubNews_', d);


                    }
                    $.hidePreloader();
                }, function(xhr, type) {
                    $.toast(enterprise.config.constant['0001'], function() {
                        $.router.back();
                    });
                    $.hidePreloader();
                });
            },


            update: function(id) {

                 var data = enterprise.pubNews.data();
             if (debug) {
                 console.log('pubNews validation ' + '--> ');
                 console.log(data);
             }
             if (data) {

                   var data2 = {};
                    for (var key in data) {
                        // if(key == "main_img"){
                        // data2[key] = data[key];
                        // }else{
                        // data2[key] = data[key];}
                        data2[key] = data[key];
                    }
                    data2['c_image'] = data2['c_image'].substring(1);
                    data2['c_context'] = data2['c_context'].substring(1);
                    data2['news_id'] = id;

                 enterprise.tool.ajax(enterprise.config.pubNewsUpdate, data2, null, 'post', function(d) {
                     if (debug) {
                         console.log(d);
                     }

                     if (d.data && enterprise.config.constant['0002'] == d.data) {
                         $.alert(enterprise.config.constant['0004'],function(){
                              $.router.back();
                         });
                     } else if (d.data) {
                         $.alert(enterprise.config.constant['0005']);
                     }
                 }, function(xhr, type) {
                     $.alert(enterprise.config.constant['0001']);
                 });
             }
         },

         init: function() {
             var id = $("#pubNews_id").val();
             // if (id) {
             //     enterprise.pubZPeopleService.eidt(id);
             // }
         }
        };




     //发布技术支持
        enterprise.pubTechnicalSupport = {
         data: function() {
             var pubTechnicalSupportdatas = [ {
                                 id: 'pubTechnicalSupport_c_image',
                                 pro: 'c_image',
                                 eleType: 'txtCarImg1',
                                 valids: {
                                     'require': {
                                         'is': true,
                                         'msg': enterprise.config.constant['3001']
                                     }
                                 }
                             },{
                                 id: 'pubTechnicalSupport_c_context',
                                 pro: 'c_context',
                                 eleType: 'inputcontext1',
                                 valids: {
                                     'require': {
                                         'is': true,
                                         'msg': enterprise.config.constant['3008']
                                     }
                                 }

                             }];
                              var sc3=$('.sc-13').find('textarea').size();
                   console.info(sc3);
                         for(var n=1;n<sc3+1;n++){
                         var s3=[
                              {
                         id: 'pubTechnicalSupport_c_image'+n,
                         pro: 'c_image',
                         eleType: 'txtCarImg1',
                         valids: {
                             'require': {
                                 'is': true,
                                 'msg': enterprise.config.constant['3001']
                             }
                         }
                     },{
                         id: 'pubTechnicalSupport_c_context'+n,
                         pro: 'c_context',
                         eleType: 'inputcontext1',
                         valids: {
                             'require': {
                                 'is': true,
                                 'msg': enterprise.config.constant['3008']
                             }
                         }
                     }
                 ];
                     pubTechnicalSupportdatas=pubTechnicalSupportdatas.concat(s3);
                }

            console.info(pubTechnicalSupportdatas)


             return validationToValue(pubTechnicalSupportdatas);
         },
         submit: function() {
             var data = enterprise.pubTechnicalSupport.data();
             if (debug) {
                 console.log('pubTechnicalSupport validation ' + '--> ');
                 console.log(data);
             }
             if (data) {

                   var data2 = {};
                    for (var key in data) {
                        // if(key == "main_img"){
                        // data2[key] = data[key];
                        // }else{
                        // data2[key] = data[key];}
                        data2[key] = data[key];
                    }
                    data2['c_image'] = data2['c_image'].substring(1);
                    data2['c_context'] = data2['c_context'].substring(1);

                 enterprise.tool.ajax(enterprise.config.pubTechnicalSupport, data2, null, 'post', function(d) {
                     if (debug) {
                         console.log(d);
                     }

                     if (d.data && enterprise.config.constant['0002'] == d.data) {
                         $.alert(enterprise.config.constant['0004'],function(){
                              $.router.load("#pagePostChoose");
                         });
                     } else if (d.data) {
                         $.alert(enterprise.config.constant['0005']);
                     }
                 }, function(xhr, type) {
                     $.alert(enterprise.config.constant['0001']);
                 });
             }
         },


         eidt: function(id) {

                 var data = enterprise.MyenterpriseDetail.data();

                if (debug) {
                    console.log(data);
                }
                enterprise.tool.ajax(enterprise.config.companydetailinfo, data, null, 'post', function(d) {

                   if (debug) {
                     console.log(d);
                    };
                    if (d.data && enterprise.config.constant['0003'] == d.data) {
                    $.alert(enterprise.config.constant['0012']);

                   }else if (d) {
                        viewInit('pubTechnicalSupport_',d.data);

                    }
                    $.hidePreloader();
                    }, function(xhr, type) {
                    $.toast(tourism.config.constant['0001'], function() {
                        $.router.back();
                    });
                    $.hidePreloader();
                });
            },


            update: function(id) {

           var data = enterprise.pubTechnicalSupport.data();
             if (debug) {
                 console.log('pubTechnicalSupport validation ' + '--> ');
                 console.log(data);
             }
             if (data) {

                   var data2 = {};
                    for (var key in data) {
                        // if(key == "main_img"){
                        // data2[key] = data[key];
                        // }else{
                        // data2[key] = data[key];}
                        data2[key] = data[key];
                    }
                    data2['c_image'] = data2['c_image'].substring(1);
                    data2['c_context'] = data2['c_context'].substring(1);

                 enterprise.tool.ajax(enterprise.config.pubTechnicalSupport, data2, null, 'post', function(d) {
                     if (debug) {
                         console.log(d);
                     }

                     if (d.data && enterprise.config.constant['0002'] == d.data) {
                         $.alert(enterprise.config.constant['0004'],function(){
                              $.router.back();
                         });
                     } else if (d.data) {
                         $.alert(enterprise.config.constant['0005']);
                     }
                 }, function(xhr, type) {
                     $.alert(enterprise.config.constant['0001']);
                 });
             }
         },


         init: function() {
             var id = $("#pubTechnicalSupport_id").val();
             // if (id) {
             //     enterprise.pubZPeopleService.eidt(id);
             // }
         }
        };




        //发布我的产品
        enterprise.pubProduct = {
         data: function() {
             var pubProductdatas = [ {

                    id: 'pubProduct_imgs',
                    pro: 'imgs',
                    eleType: 'img',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }

              },{
                  id: 'pubProduct_title',
                         pro: 'title',
                         eleType: 'input',
                         valids: {
                             'require': {
                                 'is': true,
                                 'msg': enterprise.config.constant['5001']
                     }
                 }
             },{
                 id: 'pubProduct_etitle',
                         pro: 'etitle',
                         eleType: 'input',
                         valids: {
                             'require': {
                                 'is': false,
                                 'msg': ''
                     }
                 }

             },{
                 id: 'pubProduct_content',
                         pro: 'content',
                         eleType: 'input',
                         valids: {
                             'require': {
                                 'is': true,
                                 'msg': enterprise.config.constant['5002']
                     }
                 }

             }];

             return validationToValue(pubProductdatas);
         },
         submit: function() {
             var data = enterprise.pubProduct.data();
             if (debug) {
                 console.log('pubProduct validation ' + '--> ');
                 console.log(data);
             }
             if (data) {

                   var data2 = {};
                    for (var key in data) {
                        // if(key == "main_img"){
                        // data2[key] = data[key];
                        // }else{
                        // data2[key] = data[key];}
                        data2[key] = data[key];
                    }


                 enterprise.tool.ajax(enterprise.config.pubProduct, data2, null, 'post', function(d) {
                     if (debug) {
                         console.log(d);
                     }

                     if (d.data && enterprise.config.constant['0002'] == d.data) {
                         $.alert(enterprise.config.constant['0004'],function(){
                              $.router.load("#pagePostChoose");
                         });
                     } else if (d.data) {
                         $.alert(enterprise.config.constant['0005']);
                     }
                 }, function(xhr, type) {
                     $.alert(enterprise.config.constant['0001']);
                 });
             }
         },

               eidt: function(id) {

               var data = {
                   goods_id: id,

                };
                if (debug) {
                    console.log(data);
                }
                // $("#pubProduct_id").val(id);
                // $.router.load("#" + els.page);
                // $.showPreloader();
                enterprise.tool.ajax(enterprise.config.enterprisechanpinDetail, data, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    };
                    if (d && enterprise.config.constant['0003'] == d.data) {
                        $.alert(enterprise.config.constant['0004'], function() {
                            $.router.back();
                        });
                    } else if (d) {
                        viewInit('pubProduct_', d);

                    }
                    $.hidePreloader();
                }, function(xhr, type) {
                    $.toast(tourism.config.constant['0001'], function() {
                        $.router.back();
                    });
                    $.hidePreloader();
                });
            },
            update: function(status,id) {

                 var data = enterprise.pubProduct.data();
             if (debug) {
                 console.log('pubProduct validation ' + '--> ');
                 console.log(data);
             }
             if (data) {

                   var data2 = {};
                    for (var key in data) {
                        // if(key == "main_img"){
                        // data2[key] = data[key];
                        // }else{
                        // data2[key] = data[key];}
                        data2[key] = data[key];
                    }
                   data2['goods_id'] = id;

                 enterprise.tool.ajax(enterprise.config.pubProductUpdate, data2, null, 'post', function(d) {
                     if (debug) {
                         console.log(d);
                     }

                     if (d.data && enterprise.config.constant['0002'] == d.data) {
                         $.alert(enterprise.config.constant['0004'],function(){
                              $.router.back();
                         });
                     } else if (d.data) {
                         $.alert(enterprise.config.constant['0005']);
                     }
                 }, function(xhr, type) {
                     $.alert(enterprise.config.constant['0001']);
                 });
             }
            },


         init: function() {
             var id = $("pubProduct_id").val();
             // if (id) {
             //     enterprise.pubZPeopleService.eidt(id);
             // }
         }
        };


    // 发布联系方式
    enterprise.contact = {
         data: function() {
             var pubMyenterprisedatas = [

             {

                    id: 'contact_nikname',
                    pro: 'nikname',
                    eleType: 'inputnikname',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
              },{
                 id: 'contact_tel',
                 pro: 'tel',
                 eleType: 'inputtel',
                 valids: {
                     'require': {
                         'is': false,
                         'msg': ''
                     },
                      'isMobile': {
                        'is': false,
                        'msg':''
                    }
                 }
              },{
                     id: 'contact_email',
                     pro: 'email',
                     eleType: 'input',
                     valids: {
                         'require': {
                             'is': false,
                             'msg':''
                         }
                     }
                 },{
                     id: 'contact_address',
                     pro: 'address',
                     eleType: 'input',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'contact_startday',
                     pro: 'startday',
                     eleType: 'inputstartday',
                     valids: {
                         'require': {
                             'is': true,
                             'msg': enterprise.config.constant['7007']
                         }
                     }
                 },{
                     id: 'contact_endday',
                     pro: 'endday',
                     eleType: 'inputendday',
                     valids: {
                         'require': {
                             'is': true,
                             'msg': enterprise.config.constant['7008']
                         }
                     }
                 },{
                     id: 'contact_starttime',
                     pro: 'starttime',
                     eleType: 'inputstarttime',
                     valids: {
                         'require': {
                             'is': true,
                             'msg': enterprise.config.constant['7009']
                         }
                     }
                 },{
                     id: 'contact_endtime',
                     pro: 'endtime',
                     eleType: 'inputendtime',
                     valids: {
                         'require': {
                             'is': true,
                             'msg': enterprise.config.constant['7010']
                         }
                     }
                 },{
                     id: 'contact_holiworkstart',
                     pro: 'holiworkstart',
                     eleType: 'input',
                     valids: {
                         'require': {
                             'is': false,
                             'msg':''
                         }
                     }
                 },{
                     id: 'contact_holiworkend',
                     pro: 'holiworkend',
                     eleType: 'input',
                     valids: {
                         'require': {
                             'is': false,
                             'msg':''
                         }
                     }
                 },{
                     id: 'sex',
                     pro: 'iswork',
                     eleType: 'radio',
                     valids: {
                         'require': {
                             'is': true,
                             'msg': enterprise.config.constant['7006']
                         }
                     }
                 }];

                       var sc=$('.sc-1').find('input').size();
                   console.info(sc);
                         for(var j=1;j<sc+1;j++){
                         var s=[
                              {

                            id: 'contact_nikname'+j,
                            pro: 'nikname',
                            eleType: 'inputnikname',
                            valids: {
                                'require': {
                                    'is': false,
                                    'msg': ''
                                }
                            }
                      },{
                         id: 'contact_tel'+j,
                         pro: 'tel',
                         eleType: 'inputtel',
                         valids: {
                             'require': {
                                 'is': false,
                                 'msg': ''
                             },
                              'isMobile': {
                                'is': false,
                                'msg': ''
                            }
                         }
                      }
                 ];
                     pubMyenterprisedatas=pubMyenterprisedatas.concat(s);
                }
                     var sc1=$('.sc-11').find('select').size();
                   console.info(sc1);
                         for(var k=1;k<sc1+1;k++){
                         var s1=[
                              {
                     id: 'contact_starttime'+k,
                     pro: 'starttime',
                     eleType: 'inputstarttime',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': enterprise.config.constant['6002']
                         }
                     }
                 },{
                     id: 'contact_endtime'+k,
                     pro: 'endtime',
                     eleType: 'inputendtime',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': enterprise.config.constant['6002']
                         }
                     }
                 },{
                     id: 'contact_startday'+k,
                     pro: 'startday',
                     eleType: 'inputstartday',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': enterprise.config.constant['6002']
                         }
                     }
                 },{
                     id: 'contact_endday'+k,
                     pro: 'endday',
                     eleType: 'inputendday',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': enterprise.config.constant['6002']
                         }
                     }
                 }
                 ];

              pubMyenterprisedatas=pubMyenterprisedatas.concat(s1);
             }
               // pubMyenterprisedatas=pubMyenterprisedatas.concat(s);
                // console.info(pubMyenterprisedatas)
                return validationToValue(pubMyenterprisedatas);

             // return validationToValue(pubMyenterprisedatas);
         },
         submit: function() {
             var data = enterprise.contact.data();
             if (debug) {
                 console.log('contact validation ' + '--> ');
                 console.log(data);
             }

             console.log(data);
             if (data) {

                   var data2 = {};
                    for (var key in data) {
                        // if(key == "main_img"){
                        // data2[key] = data[key];
                        // }else{
                        // data2[key] = data[key];}
                        data2[key] = data[key];
                    }
                    data2['nikname'] = data2['nikname'].substring(1);
                    data2['tel'] = data2['tel'].substring(1);
                    data2['starttime'] = data2['starttime'].substring(1);
                    data2['endtime'] = data2['endtime'].substring(1);
                    data2['startday'] = data2['startday'].substring(1);
                    data2['endday'] = data2['endday'].substring(1);

                    if(data2['iswork']==0){
                        data2['holiworkstart']=null;
                        data2['holiworkend']=null;

                    }

                 enterprise.tool.ajax(enterprise.config.contact, data2, null, 'post', function(d) {
                     if (debug) {
                         console.log(d);
                     }

                     if (d.data && enterprise.config.constant['0002'] == d.data) {
                         $.alert(enterprise.config.constant['0004'],function(){
                              $.router.load("#pagePostChoose");
                         });
                     } else if (d.data) {
                         $.alert(enterprise.config.constant['0005']);
                     }
                 }, function(xhr, type) {
                     $.alert(enterprise.config.constant['0001']);
                 });
             }
         },


         eidt: function(id) {

                 var data = enterprise.MyenterpriseDetail.data();


                enterprise.tool.ajax(enterprise.config.companydetailinfo, data, null, 'post', function(d) {

                   if (debug) {
                     console.log(d);
                    };

                    if (d.data && enterprise.config.constant['0003'] == d.data) {
                    $.alert(enterprise.config.constant['0012']);
                    } else if (d) {


                        viewInit('contact_',d.data);


                    }
                    $.hidePreloader();
                    }, function(xhr, type) {
                    $.toast(enterprise.config.constant['0001'], function() {
                        $.router.back();
                    });
                    $.hidePreloader();
                });
            },


            update: function(id) {

            var data = enterprise.contact.data();
             if (debug) {
                 console.log('contact validation ' + '--> ');
                 console.log(data);
             }
             if (data) {

                   var data2 = {};
                    for (var key in data) {

                        data2[key] = data[key];
                    }
                    data2['nikname'] = data2['nikname'].substring(1);
                    data2['tel'] = data2['tel'].substring(1);
                    data2['starttime'] = data2['starttime'].substring(1);
                    data2['endtime'] = data2['endtime'].substring(1);
                    data2['startday'] = data2['startday'].substring(1);
                    data2['endday'] = data2['endday'].substring(1);

                 enterprise.tool.ajax(enterprise.config.contact, data2, null, 'post', function(d) {
                     if (debug) {
                         console.log(d);
                     }

                     if (d.data && enterprise.config.constant['0002'] == d.data) {
                         $.alert(enterprise.config.constant['0004'],function(){
                              $.router.back();
                         });
                     } else if (d.data) {
                         $.alert(enterprise.config.constant['0005']);
                     }
                 }, function(xhr, type) {
                     $.alert(enterprise.config.constant['0001']);
                 });
             }
         },


         init: function() {

         }
        };



        $(document).on("pageInit", function(e, pageId, $page) {

             var url = location.search; //获取url中"?"符后的字串
                 var strs = url.substr(1);
                  var id=strs.split("=")[1]

         if (pageId == "pageIndex") {
                        enterprise.index.init(15);
                        $("#user_id").val(user_id)
                    enterprise.index.query();

        }else if (pageId == "pagePubMyenterprise") {



                if(id){
                    enterprise.pubMyenterprise.eidt(id);
                }

         }else if (pageId == "pagePostContact") {

                if(id){
                    enterprise.contact.eidt(id);
                }

         }else if (pageId == "pagePubNews") {

                if(id){
                      enterprise.pubNews.eidt(id);
                }

         }else if (pageId == "pagePubProduct") {

                if(id){
                    enterprise.pubProduct.eidt(id);
                }

         }else if (pageId == "pagePubTechnicalSupport") {

                if(id){
                     enterprise.pubTechnicalSupport.eidt(id);
                }

         }
         else if (pageId == "pageEnterpriseDetail") {
                      //cookie中的数据都是以分号加空格区分开

                enterprise.index.detail(id);

         }
         else if (pageId == "pageNewsInformation") {
                enterprise.MyenterpriseDetail.xinwendetail(id);
         }
         else if (pageId == "pageProductDetail") {
                enterprise.MyenterpriseDetail.chanpindetail(id);
         }

        });





        $(function() {

         $("#btnPubMyEnterprise").click(function() {
             var id = $("#pubMyEnterprise_id").val();
             // alert(id)
            if (id) {
                    enterprise.pubMyenterprise.update(1,id);
            } else {
                 enterprise.pubMyenterprise.submit(1);
            }

        });

        $("#btnSaveMyEnterprise").click(function() {
                var id = $("#pubMyEnterprise_id").val();
                 if (id) {
                    enterprise.pubMyenterprise.update(2,id);
                } else {
                     enterprise.pubMyenterprise.submit(2);
                }

         });
        $("#btnPubNews").click(function() {
             var id = $("#EnterprisexinwenDetail_id").val();

              if (id) {
                     enterprise.pubNews.update(id);
                } else {
                      enterprise.pubNews.submit();
                }

        });
        $("#btnPubProduct").click(function() {

            var id = $("#pubProduct_id").val();
             if (id) {
                     enterprise.pubProduct.update(1,id);
                } else {
                      enterprise.pubProduct.submit(1);
                }

         });
        $("#btnSaveProduct").click(function() {
            var id = $("#pubProduct_id").val();
           if (id) {
                     enterprise.pubProduct.update(2,id);
                } else {
                      enterprise.pubProduct.submit(2);
                }
         });
        $("#btnPubTechnicalSupport").click(function() {
            var id = $("#pubTechnicalSupport_id").val();
            if (id) {
                     enterprise.pubTechnicalSupport.update(id);
                } else {
                      enterprise.pubTechnicalSupport.submit();
                }

         });
         $("#btncontactfabu").click(function() {
         var id = $("#contact_id").val();
         if (id) {
                     enterprise.contact.update(id);
                } else {
                      enterprise.contact.submit();
                }

        });
        $("#btnQuery").click(function() {
                enterprise.index.query();
         });
        $("#postpanduan").click(function() {
                enterprise.index.checkiscompany();
         });

        $("#furlough1").click(function() {
                $("#furlough1").attr("check",true);
                $("#furlough").attr("check",false);
                $("#holiday_input").show();

            });
        $("#furlough").click(function() {
                $("#furlough1").attr("check",false);
                $("#furlough").attr("check",true);
                $("#holiday_input").hide();
            });
          $("#xinwen_c").click(function() {
                $("#xinwen_c").attr("check",true);
                $("#chanpin_c").attr("check",false);
                $("#jishu_c").attr("check",false);
                $("#lianxi_c").attr("check",false);
                enterprise.MyenterpriseDetail.query();
            });
        $("#chanpin_c").click(function() {
                 $("#xinwen_c").attr("check",false);
                $("#chanpin_c").attr("check",true);
                $("#jishu_c").attr("check",false);
                $("#lianxi_c").attr("check",false);
                enterprise.MyenterpriseDetail.query();
            });
        $("#jishu_c").click(function() {
                $("#xinwen_c").attr("check",false);
                $("#chanpin_c").attr("check",false);
                $("#jishu_c").attr("check",true);
                $("#lianxi_c").attr("check",false);
                enterprise.MyenterpriseDetail.query();
            });
        $("#lianxi_c").click(function() {
                $("#xinwen_c").attr("check",false);
                $("#chanpin_c").attr("check",false);
                $("#jishu_c").attr("check",false);
                $("#lianxi_c").attr("check",true);
                enterprise.MyenterpriseDetail.query();
            });
        // $("#shouccang").click(function() {
        //         enterprise.myCollection.query();
        //     });
        //  $("#service_c").click(function() {
        //         $("#service_c").attr("check",true);
        //         $("#need_c").attr("check",false);
        //         enterprise.index.query();
        //     });
        // $("#need_c").click(function() {
        //         $("#service_c").attr("check",false);
        //         $("#need_c").attr("check",true);
        //         enterprise.index.query();
        //     });
        try{
                juicer.register('itemIcon', itemIcon);
                juicer.register('pubItemIcon', pubItemIcon);
            }catch (e) {
                console.log(e);
            }
    });
        $.init();
    });





    // function pagexiugailainxi(id) {

    //      var id = $("#"+id).val();

    //        location.href="../service/Local_enterprise.html?id="+id+"#pagePostContact"

    // }

    // function pagechanpinDetail(id) {
    //  if (id) {
    //       elid = 'EnterprisechanpinDetail_id';
    //      page = 'pageProductDetail';
    //      _field = 'EnterprisechanpinDetail_';
    //  }
    //  enterprise.MyenterpriseDetail.chanpindetail(id, {
    //      'elid': elid,
    //      'page': page,
    //      '_field': _field
    //  });
    // }



        var loading = false;


        $(document).on('infinite', function() {
            if (loading||$("#queryList li").length<10) {
                 return
            }

            loading = true;

              setTimeout(function() {
                loading = false;
                  var pageNum = $("#list_pageNum").val();

                if (pageNum==1) {
                    $('#pagelistContent .infinite-scroll-preloader').append('<div>正在加载更多的数据...</div>');
                }
                $("#list_pageNum").val(++pageNum);
                var param = enterprise.index.data();
                param.pageNum = pageNum;
                // param.PageSize = 10;
                enterprise.tool.ajax(enterprise.config.enterpriselist, param, null, 'post', function(d) {
                    if (debug) {
                        console.log(d);
                    };
                    if (d.data && enterprise.config.constant['0003'] == d.data) {
                           $('.infinite-scroll-preloader  .preloader').remove();
                           $('#pagelistContent .infinite-scroll-preloader').html(enterprise.config.constant['0014']);
                      return;
                    } else if (d) {
                        var list = juicer(enterprise.tpl.indexListTpl(), d);
                        $("#queryList").append(list);
                    }
                }, function(xhr, type) {
                    $.alert(enterprise.config.constant['0001']);
                });
                $.refreshScroller();
            }, 500);
        });



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

     function dianji(info_type) {

        var data = {
            'info_type': info_type
        }
          enterprise.tool.ajax(enterprise.config.click, data, null, 'post', function(d) {

                    if (debug) {
                        console.log(d);
                    };
                  if (d.data && enterprise.config.constant['0002'] == d.data) {

                        }
                }, function(xhr, type) {
                    $.toast(enterprise.config.constant['0001'], function() {
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
          enterprise.tool.ajax(enterprise.config.userclick, data, null, 'post', function(d) {

            if (d.data && enterprise.config.constant['0002'] == d.data) {
              // $('.n_num_1>span').html($('.n_num_1>span').html()*1+1);
              // $('.n_num>span').html($('.n_num>span').html()*1+1);
              }
                }, function(xhr, type) {
                    $.toast(enterprise.config.constant['0001'], function() {
                        $.router.back();
                    });
                    $.hidePreloader();
                });
    }


    function collectItem(e, info_id, info_type) {
        var $star = $(e);
        var add;
        var remove;
        var data = {
            info_id: $('#' + info_id).val(),
            info_type: info_type
        };
        enterprise.tool.ajax(enterprise.config.storeinfo, data, null, 'post', function(d) {
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
            $.alert(enterprise.config.constant['0001']);
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

        enterprise.tool.ajax(enterprise.config.reportinfo, data, null, 'post', function(d) {
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
            $.alert(enterprise.config.constant['0001']);
        });



    }


    function historyWatch(info_id, info_type,panduan) {
        var data = {
            'info_id': info_id,
            'info_type': info_type
        }
          enterprise.tool.ajax(enterprise.config.isreport, data, null, 'post', function(d) {

                    if (debug) {
                        console.log(d);
                    };
                    if (d && enterprise.config.constant['0003'] == d.data) {
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
                    $.toast(enterprise.config.constant['0001'], function() {
                        $.router.back();
                    });
                    $.hidePreloader();
                });


                 enterprise.tool.ajax(enterprise.config.isstore, data, null, 'post', function(d) {

                    if (debug) {
                        console.log(d);
                    };
                    if (d && enterprise.config.constant['0003'] == d.data) {
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
                    $.toast(enterprise.config.constant['0001'], function() {
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


     function showmore(){

        var box = document.getElementById("EnterpriseDetail_message");
        var text = box.innerHTML;

        var newBox = document.createElement("div");

        var btn = document.createElement("div");

        newBox.innerHTML = text.substring(0,100);
        btn.innerHTML = "查看更多";
        btn.onclick = function(){
        if (btn.innerHTML == "查看更多"){
        btn.innerHTML = "收起";
        newBox.innerHTML = text;
        }else{
        btn.innerHTML = "查看更多";
        newBox.innerHTML = text.substring(0,100);
        }
        }
        box.innerHTML = "";

        box.appendChild(newBox);
        box.appendChild(btn);
         box.lastChild.className="button button-fill button-success block_more col-50";
    }



    var indexquery=true;


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


$("#select_area1").change(function(){
    enterprise.index.init(15);
    enterprise.index.query();
})


