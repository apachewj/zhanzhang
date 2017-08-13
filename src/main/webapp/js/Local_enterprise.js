window.enterprise = window.enterprise || {};
    var baseUrl = 'http://localhost:8080';

var filedate=enterprise;

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
                url: enterprise.config.uploadFile,
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
                        var path=test?d.data.replace('/enterprise/',''):d.data; 
                        if (type=='image') {
                            showImgs(fileList, name, path);
                        } else if(type=='video'){
                            showVideos(fileList, name, path);
                        }
                        
                    } else {
                        if (uploaddebug) {
                            $.alert('上传成功 路径返回错误，<br/>用于测试默认图片！');
                            showImgs(fileList, name, enterprise.config.uploadDefult);
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
                    $.alert(enterprise.config.constant['0001']);
                    console.log(xhr);
                    if (uploaddebug) {
                        $.alert('上传失败 路径返回错误，<br/>用于测试默认图片！');
                        showImgs(fileList, name, enterprise.config.uploadDefult);
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
        img.src = "http://101.200.205.126:8080" + src; 
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

    window.enterprise = window.enterprise || {};

    var baseUrl = 'http://localhost:8080';


    enterprise.config = {
        baseUrl: '',
        loginUrl: baseUrl + '/zhuce.html',
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
        

        // ScenicList: baseUrl + '/user/travel/travel_list',
        // scenicDetail: baseUrl + '/user/travel/scenic',
        uploadFile: baseUrl + '/uploadFile',
        reportinfo: baseUrl + '/user/report',
        storeinfo: baseUrl + '/user/store',
        

        
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
            '6001': '请输入省',
            '6002': '请输入市',
            '6003': '请输入区',
            '6004': '举报成功!',
            // '3001': '请上传导游图片！',
            // '3002': '请填写导游说明！',
            // '3003': '请填写姓名！',
            // '3004': '请填写年龄！',
            // '3005': '请选择性别！',
            // '3006': '请填写价格！',
            // '3007': '请填写电话！',
            // '3008': '请填写小时数！',
            // '3009': '请选择配置！',
            // '3010': '请填写添加地址名！',
            // '3011': '请上传景点图片！',
            // '3012': '请填写景点说明！',
            // '3013': '请填写汽车图片！',
            // '3014': '请填写汽车说明！',
            // '3015': '请填写车品牌！',
            // '3016': '请填写车型！',
            // '3017': '请填写车价格!',
            // '3018': '请填写车小时数!',
            // '3019': '请填写附言!',
            // '3020': '请选择省!',
            // '3021': '请选择市!',
            // '3022': '请选择区！',
            // '3023': '请选择是否提供车辆！',




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

+ function($) {
    "use strict";

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
            valu = valu + "," +$("#" + item.id).val();
             value=valu;   
         } else if('inputtel' === item.eleType) {
            valu1 = valu1 + "," +$("#" + item.id).val();
             value=valu1;
         }  
         else if('inputstartday' === item.eleType) {
            valu2 = valu2 + "," +$("#" + item.id).val();
             value=valu2;

         } else if('inputendday' === item.eleType) {
            valu3 = valu3+ "," +$("#" + item.id).val();
             value=valu3;
         }
         else if('inputstarttime' === item.eleType) {
            valu4 = valu4 + "," +$("#" + item.id).val();
             value=valu4;
         } 
         else if('inputendtime' === item.eleType) {
            valu5= valu5 + "," +$("#" + item.id).val();
             value=valu5;
         }else if('inputcontext' === item.eleType) {
            valu6= valu6 + "," +$("#" + item.id).val();
             value=valu6;
         }else if ('txtCarImg'=== item.eleType) {
             valu7=valu7 + "," + $("#" + item.id).find('img').attr("src");
             value=valu7;

         }else if('inputcontext1' === item.eleType) {
            valu8= valu8 + "," +$("#" + item.id).val();
             value=valu8;
         }else if ('txtCarImg1'=== item.eleType) {
             valu9=valu9 + "," + $("#" + item.id).find('img').attr("src");
             value=valu9;

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
    var viewInfo = function(_m, data) {
        //处理轮播图
            var html = [];

            for(var i=0;i<data.length;i++ ) {
                
                html.push('<div class="swiper-slide"><img src="' + data[i] + '" alt="" style="width: 100%" ></div>');
                 
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
                                     html.push('<div class="swiper-slide"><img src="' + e + '" alt="" style="width: 100%" ></div>');
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
                 
                    html.push('<img src="' + data.main_info[i].img_path.split(',')[j] + '" alt="" style="width: 100%;height:10rem;margin:.5rem .2rem;" >'+data.main_info[i].content.split(',')[j]+'')
                    } 
                }
                var list = $('#enterprisexinwenDetail_imgs');
                var list1 = $('#enterprisejishuDetail_imgs');

               
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
                 html.push('<div class="userphone_content" ><div>'+data.link_info[i].nikname.split(',')[j]+'</div><div>'+data.link_info[i].tel.split(',')[j]+'</div></div> <div class="userphone_content_right"><img src="images/mobl.png"></div></br> ');                   
                }
                 
            }
            var list = $('#link_info_attr');
           
            list.empty();
        
          
            if (html.length > 0) {
                list.html(html.join(''));
          
            }

               var html = [];

            for(var i=0;i<data.work_info.length;i++ ) {
                // for(var j=0;data.work_info[i].startday.split(',').length;j++){
            
              html.push('<li>'+data.work_info[i].startday.split(',')[j]+'至'+data.work_info[i].endday.split(',')[j]+'</li>'+
                '<li>'+data.work_info[i].starttime.split(',')[j]+'—'+data.work_info[i].endtime.split(',')[j]+'</li>');
                 // }
            }
            var list = $('#work_info_attr');
           
            list.empty();
        
          
            if (html.length > 0) {
                list.html(html.join(''));
          
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
                       '<div class="list-block media-list" onclick="pageDetail(', "'${item.id}')", '">',
                                  '<ul>',
                                    '<li class="item-content">',
                                       '<div class="item-media">',
                                         '<img src="${item.main_img.split(",")[0] }" >',
                                       '</div>',
                                      '<div class="item-inner">',
                                        '<div class="item-title-row">',
                                          '<div class="item-title">${item.com_name}</div>',
                                          '<div class="item-after"><img src="images/tong_btn_dwtz.png"></div>',
                                        '</div>',
                                        '<div class="item-subtitle">${item.message}</div>',
                                      '</div>',
                                    '</li>',
                                  '</ul>',
                         '</div>',
                     '{@/each}'
             ].join('');
        },
        xinwenListTpl: function(data) {

            return ['{@each data as item}',
                        '<div class="situation-box-item" onclick="pagexinwenDetail(', "'${item.id}')", '">',
                                  '<div>',
                                      '<a>',
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
                                '<li onclick="pagechanpinDetail(', "'${item.goods_id}')", '">',
                                    '<a class="cont">',
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
                    type: 'input'
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
   
       query: function(obj) {
            // $.showPreloader();
            // $("#list_pageNum").val(1);
            // $("#list_pageSize").val(10);
            var data = enterprise.index.data();
            if (debug) {
                console.log("index:");
                console.log(data);
            };

            if(obj){
                data.city_id=obj;
             }

            // $('#pagelistContent .infinite-scroll-preloader').empty();
            // $('#pagelistContent .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
           
            enterprise.tool.ajax(enterprise.config.enterpriselist, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && enterprise.config.constant['0003'] == d.data) {
                    // $.alert(enterprise.config.constant['0012']);
                    $("#queryList").empty();
                    // $(' #pagelistContent .infinite-scroll-preloader').html(enterprise.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(enterprise.tpl.indexListTpl(), d);
                    $("#queryList").html(list);
                    // $(' #pagelistContent .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                // $(' #pagelistContent .infinite-scroll-preloader').html(enterprise.config.constant['0001']);
                $.alert(enterprise.config.constant['0001']);
                // $('.infinite-scroll-preloader').eq(0).hide();
            });   
        },
         detail: function(id, els) {
            var data = {
               com_id: id,
               
            };
            if (debug) {
                console.log(data);
            }
            $("#" + els.elid).val(id);

            $.router.load("#" + els.page );
    
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
                    viewInfo(els._field, d);
                    viewInfo(els._field, d.main_img.split(","));
                    var mpid = $.trim(d.id);
                    var flag=$("#mpid").val(); 
                    
                    if (!flag) {
                        $("#com_id").val(mpid);
                    }
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
                console.info(d)
                if ( enterprise.config.constant['0003'] == d.data) {
                    
                }else if(d.dohave==1){
                    
                     $.router.load("#pagePostChoose"); 
                    // var mp = $.trim(d.dohave);
                    // var flag=$("#mp").val(); 
                    // if (!flag) {
                    //     $("#companyname").html(mp);
                    // }
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
   
         
        init: function() {
            enterprise.index.query();
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
                            $.alert(enterprise.config.constant['0012']);
                            $("#queryxinwenList").empty();
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
                            $.alert(enterprise.config.constant['0012']);
                            $("#querychanpinList").empty();
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
                            $.alert(enterprise.config.constant['0012']);
        
                           }else if (d) {
                                viewInfo1(d.data);
                      
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
                            $.alert(enterprise.config.constant['0012']);
                            } else if (d) {
                                var _field = 'enterpriselianxiDetail_';
                                viewInfo(_field,d.data);
                                viewInfo2(d.data);
                      
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
         xinwendetail: function(id, els) {
            var data = {
               news_id: id,
             
            };
            if (debug) {
                console.log(data);
            }
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
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
                    viewInfo(els._field, d);
                    viewInfo1(d);
                 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(enterprise.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
         chanpindetail: function(id, els) {
            var data = {
               goods_id: id,
             
            };
            if (debug) {
                console.log(data);
            }
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
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
                    viewInfo(els._field, d);
                    var mpid = $.trim(d.id);
                     $("#enterprisechanpinDetail_id").val(mpid);
          
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
       
                id: 'pubMyenterprise_main_img',
                pro: 'main_img',
                eleType: 'img',
                valids: { 
                    'require': { 
                        'is': false,
                        'msg': '' 
                    } 
                }
          },{
             id: 'pubMyenterprise_com_name',
             pro: 'com_name',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': enterprise.config.constant['5001']
                 }
             }
          },{
                 id: 'pubMyenterprise_message',
                 pro: 'message',
                 eleType: 'input',
                 valids: {
                     'require': {
                         'is': true,
                         'msg':''
                     }
                 }
             },{
                 id: 'pubMyenterprise_id_img',
                 pro: 'id_img',
                 eleType: 'img',
                 valids: {
                     'require': {
                         'is': true,
                         'msg': enterprise.config.constant['6002']
                     }
                 }
             },{
                 id: 'pubMyenterprise_paper_img',
                 pro: 'paper_img',
                 eleType: 'img',
                 valids: {
                     'require': {
                         'is': true,
                         'msg': enterprise.config.constant['6002']
                     }
                 }
             },{
             id: 'select_city',
             pro: 'city_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': enterprise.config.constant['6002']
                 }
             }
         },{
             id: 'select_area',
             pro: 'county_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': enterprise.config.constant['6001']
                 }
             }
         },{
             id: 'select_province',
             pro: 'province_id',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': enterprise.config.constant['6003']
                 }
             }
        }];
         
         return validationToValue(pubMyenterprisedatas);
     },
     submit: function(status) {
         var data = enterprise.pubMyenterprise.data();
         if (debug) {
             console.log('pubMyenterprise validation ' + '--> ');
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
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'pubNews_c_context',
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
                     id: 'pubNews_c_image'+m,
                     pro: 'c_image',
                     eleType: 'txtCarImg',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'pubNews_c_context'+m,
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
                                     'is': false,
                                     'msg': ''
                                 }
                             }
                         },{
                             id: 'pubTechnicalSupport_c_context',
                             pro: 'c_context',
                             eleType: 'inputcontext1',
                             valids: {
                                 'require': {
                                     'is': false,
                                     'msg': ''
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
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'pubTechnicalSupport_c_context'+n,
                     pro: 'c_context',
                     eleType: 'inputcontext1',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
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
                             'is': true,
                             'msg': enterprise.config.constant['5001']
                 }
             }
           
         },{
             id: 'pubProduct_content',
                     pro: 'content',
                     eleType: 'input',
                     valids: {
                         'require': {
                             'is': true,
                             'msg': enterprise.config.constant['5001']
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
                     'msg': enterprise.config.constant['5001']
                 },
                  'isMobile': {
                    'is': false,
                    'msg': enterprise.config.constant['4001']
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
                         'msg': enterprise.config.constant['6002']
                     }
                 }
             },{
                 id: 'contact_starttime',
                 pro: 'starttime',
                 eleType: 'inputstarttime',
                 valids: {
                     'require': {
                         'is': false,
                         'msg': enterprise.config.constant['6002']
                     }
                 }
             },{
                 id: 'contact_endtime',
                 pro: 'endtime',
                 eleType: 'inputendtime',
                 valids: {
                     'require': {
                         'is': false,
                         'msg': enterprise.config.constant['6002']
                     }
                 }
             },{
                 id: 'contact_startday',
                 pro: 'startday',
                 eleType: 'inputstartday',
                 valids: {
                     'require': {
                         'is': false,
                         'msg': enterprise.config.constant['6002']
                     }
                 }
             },{
                 id: 'contact_endday',
                 pro: 'endday',
                 eleType: 'inputendday',
                 valids: {
                     'require': {
                         'is': false,
                         'msg': enterprise.config.constant['6002']
                     }
                 }
             },{
                 id: 'contact_holiworkstart',
                 pro: 'holiworkstart',
                 eleType: 'input',
                 valids: {
                     'require': {
                         'is': false,
                         'msg': enterprise.config.constant['6002']
                     }
                 }
             },{
                 id: 'contact_holiworkend',
                 pro: 'holiworkend',
                 eleType: 'input',
                 valids: {
                     'require': {
                         'is': false,
                         'msg': enterprise.config.constant['6002']
                     }
                 }
             },{
                 id: 'sex',
                 pro: 'iswork',
                 eleType: 'radio',
                 valids: {
                     'require': {
                         'is': false,
                         'msg': enterprise.config.constant['6002']
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
                             'msg': enterprise.config.constant['5001']
                         },
                          'isMobile': {
                            'is': false,
                            'msg': enterprise.config.constant['4001']
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

    
     init: function() {
         // var id = $("#pubMyenterprise_id").val();
         // // if (id) {
         // //     enterprise.pubZPeopleService.eidt(id);
         // // }
     }
    };
   

    
    $(document).on("pageInit", function(e, pageId, $page) {
     if (pageId == "pageIndex") {
          enterprise.index.query();
        
    }else if (pageId == "pageMyCollection") {
            enterprise.myCollection.init();
        } 
    });


    $(function() {
     $("#btnPubMyenterprise").click(function() {
         var id = $("#pubMyenterprise_id").val();
          enterprise.pubMyenterprise.submit(1);
    });
    $("#btnSaveMyenterprise").click(function() {
            var id = $("#pubMyenterprise_id").val();
            enterprise.pubMyenterprise.submit(2);
     });
    $("#btnPubNews").click(function() {
         var id = $("#pubNews_id").val();
          enterprise.pubNews.submit();
    });
    $("#btnPubProduct").click(function() {
        var id = $("#pubProduct_id").val();
        enterprise.pubProduct.submit(1);
     });
    $("#btnSaveProduct").click(function() {
        var id = $("#pubProduct_id").val();
        enterprise.pubProduct.submit(2);
     });
    $("#btnPubTechnicalSupport").click(function() {
        var id = $("#pubTechnicalSupport_id").val();
        enterprise.pubTechnicalSupport.submit();
     });
     $("#btncontactfabu").click(function() {
     var id = $("#contact_id").val();
      enterprise.contact.submit();
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
}(Zepto);





function pageDetail(id) {
 if (id) {
      elid = 'enterpriseDetail_id';
     page = 'pageEnterpriseDetail';
     _field = 'enterpriseDetail_';
 }
 enterprise.index.detail(id, {
     'elid': elid,
     'page': page,
     '_field': _field
 });
}

function pagexinwenDetail(id) {
 if (id) {
      elid = 'enterprisexinwenDetail_id';
     page = 'pageNewsInformation';
     _field = 'enterprisexinwenDetail_';
 }
 enterprise.MyenterpriseDetail.xinwendetail(id, {
     'elid': elid,
     'page': page,
     '_field': _field
 });
}

function pagechanpinDetail(id) {
 if (id) {
      elid = 'enterprisechanpinDetail_id';
     page = 'pageProductDetail';
     _field = 'enterprisechanpinDetail_';
 }
 enterprise.MyenterpriseDetail.chanpindetail(id, {
     'elid': elid,
     'page': page,
     '_field': _field
 });
}

// + function($) {
//     "use strict";

//     var loading = false;
//     $(document).on('infinite', '#pageIndex .infinite-scroll-bottom', function() {
//         if (loading||$("#queryList div").length<10) {
//              return
//         }
        
//         loading = true;
//         setTimeout(function() {
//             loading = false;
//             var pageNum = $("#list_pageNum").val();
//             if (pageNum==1) {
//                 $('#pagelistContent .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
//             }
//             $("#list_pageNum").val(++pageNum);
//             var param = enterprise.index.data();
//             // param.pageNum = pageNum;
//             // param.PageSize = 10;
//             enterprise.tool.ajax(enterprise.config.enterpriselist, param, null, 'post', function(d) {
//                 if (debug) {
//                     console.log(d);
//                 };
//                 if (d.data && enterprise.config.constant['0003'] == d.data) {
//                     $.alert(enterprise.config.constant['0014']);
//                 } else if (d) {
//                     var list = juicer(enterprise.tpl.indexListTpl(), d);
//                     $("#queryList").append(list);
//                 }
//             }, function(xhr, type) {
//                 $.alert(enterprise.config.constant['0001']);
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
        if (d.data && enterprise.config.constant['0002'] == d.data) {
            $.alert(enterprise.config.constant['0006']);
            add = 'scstart-fill';
            remove = 'scstart-line';
        } else if (d.data && enterprise.config.constant['0009'] == d.data) {
            add = 'scstart-fill';
            remove = 'scstart-line';
            $.alert(enterprise.config.constant['0007']);
        } else if (d.data) {
            add = 'scstart-line';
            remove = 'scstart-fill';
            $.alert(enterprise.config.constant['0008']);
        }
        collectIcon($star, add, remove);
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
        if (d.data && enterprise.config.constant['0002'] == d.data) {
            $.alert(enterprise.config.constant['6004']);
            add = 'jbstart-fill';
            remove = 'start-line';
        } else if (d.data && enterprise.config.constant['0009'] == d.data) {
            add = 'jbstart-fill';
            remove = 'jbstart-line';
            $.alert(enterprise.config.constant['0007']);
        } else if (d.data) {
            add = 'jbstart-line';
            remove = 'jbstart-fill';
            $.alert(enterprise.config.constant['0008']);
        }
        reportIcon($star, add, remove);
    }, function(xhr, type) {
        add = 'jbstart-line';
        remove = 'jbstart-fill';
        reportIcon($star, add, remove);
        $.alert(enterprise.config.constant['0001']);
    });
}



function collectIcon($star, add, remove) {
    $star.removeClass(remove).addClass(add);
}

function reportIcon($star, add, remove) {
    $star.removeClass(remove).addClass(add);
}



var indexquery=true; 









