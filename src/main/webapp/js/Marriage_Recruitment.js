window.marriage = window.marriage || {};
var baseUrl = 'http://localhost:8080';

var uploaddebug = true;
var test=false;

function transCityID(cityDiv){
  $('#popup').attr('forData',$(cityDiv).attr('id'));
}
function cityLink(country){
    var $countryLink = $(country);
    var city = $countryLink.parent().attr('city');
    $countryLink.addClass('close-popup');
    var forData = $('#popup').attr('forData');
    var select_city ;
    if($countryLink.html() == '其他'){
        select_city = city;
    }else{
        select_city = city+"."+$countryLink.html();
    }
    if( forData === 'pubCarFindPeople_cityDiv' || forData ===  'pubCarFindGoods_cityDiv'){
        setDuringCity(forData,select_city);
    }else{
        $('#'+forData).find('a').html(select_city);
        $('#'+forData).find('span').html($countryLink.html());
    }
}
function clearCity(){
    var forData = $('#popup').attr('forData');
    $('#'+forData).find('a').html('城市');
    $('#'+forData).find('span').html('城市');
}
function setDuringCity(id,city){
    var flag = false;
    $('#'+id+' .city .col-25').each(function(){
        if ($(this).find('span').html() == city){
            flag = true;
            return false;
        }
    });
    if (flag){
        return;
    }
    createDuringCity(id,city);
}
function createDuringCity(id,city){
    var str='';
    var $city_div =  $('#'+id);
    var name = id.split('_')[0] + '_citys_th';
    var rows = $('#'+id+' .row.city');
    var lastRow = $('#'+id+' .row.city:last-child');
    if (rows.length == 0 || lastRow.find('.col-25').length == 4){
        str='<div class="row city"><div class="col-25"><span name="'+name+'" class="button button-danger button-fill">'+city+'</span><div class="close-div" onclick="removeAddLable(this)"></div></div></div>';
        $('#'+id).append(str);
    }else{
        str='<div class="col-25"><span name="'+name+'"  class="button button-danger button-fill">'+city+'</span><div class="close-div" onclick="removeAddLable(this)"></div></div>';
        lastRow.append(str);
    }
}
function provLink(prov) {
    var province = $(prov).html();
    var $province = $(".list-group-title[data=" + province + "]");
    if ($province.length != 0) {
        $('#popup').scrollTop($province.offset().top - 30);
    }
}
$('#findCityBtn').click(function(){
    var city = $('#cityKeyWord').val();
    var $city = $(".cityLi[city=" + city + "]");
    if ($city.length != 0) {
        $('#popup').scrollTop($city.offset().top - 30);
    }
});
function removeAddLable(lable){
    var $close = $(lable);
    $close.parent().remove();
}



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
                url: marriage.config.uploadFile,
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
                        var path=test?d.data.replace('/marriage/',''):d.data; 
                        if (type=='image') {
                            showImgs(fileList, name, path);
                        } else if(type=='video'){
                            showVideos(fileList, name, path);
                        }
                        
                    } else {
                        if (uploaddebug) {
                            $.alert('上传成功 路径返回错误，<br/>用于测试默认图片！');
                            showImgs(fileList, name, marriage.config.uploadDefult);
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
                    $.alert(marriage.config.constant['0001']);
                    console.log(xhr);
                    if (uploaddebug) {
                        $.alert('上传失败 路径返回错误，<br/>用于测试默认图片！');
                        showImgs(fileList, name, marriage.config.uploadDefult);
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


function showVideos(fileList, name, src) {
    var video = document.createElement("video");
    if (window.URL) { 
        video.src = src;
        video.onload = function(e) {
            window.URL.revokeObjectURL(this.src);
        }
        video.setAttribute("name", name);
        video.setAttribute("width", "100%");
        video.setAttribute("height", "150");
        video.setAttribute("controls", "controls");
        var imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "img-div");
        imgDiv.appendChild(video);
        var closeDiv = document.createElement("div")
        closeDiv.setAttribute("class", "close-div")
        imgDiv.appendChild(closeDiv);
        fileList.appendChild(imgDiv);
    } else if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(src);
        reader.onload = function(e) { 
            video.src = src;
            video.setAttribute("name", name);
            video.setAttribute("width", "100%");
            video.setAttribute("height", "150");
            video.setAttribute("controls", "controls");
            var imgDiv = document.createElement("div");
            imgDiv.setAttribute("class", "img-div");
            imgDiv.appendChild(video);
            var closeDiv = document.createElement("div")
            closeDiv.setAttribute("class", "close-div");
            imgDiv.appendChild(closeDiv);
            fileList.appendChild(imgDiv);
        }
    } else { 
        document.selection.empty(); 
        video.src = src;
        video.setAttribute("name", name);
        video.setAttribute("width", "100%");
        video.setAttribute("height", "150");
        video.setAttribute("controls", "controls");
        var imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "img-div");
        imgDiv.appendChild(video);
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
  
function goPageList(id){
    $.router.load("#"+id);


 

}
function back(info_id){
    $("#"+info_id).val('');
    $.router.back();
    // $.router.load("#"+info_id);
}



$(document).on('click','.fileElem-photo,.fileElem-photo1', function () { 
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


function getMyPosition(){
    var pt = new BMap.Point(); 
    var geolocation = new BMap.Geolocation();
    var geoc = new BMap.Geocoder();
    geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      pt = r.point; 
      console.info(pt);
      geoc.getLocation(pt, function(rs){
          var addComp = rs.addressComponents; 
          var xw = parseFloat(pt.lat).toFixed(6);
          var yj = parseFloat(pt.lng).toFixed(6);
          $('#location_x').val(xw);
          $('#location_y').val(yj); 
      });

    }
    else {
      $.alert('failed'+this.getStatus());
    }
    },{enableHighAccuracy: true});
}




var debug = false;

+ function($) {
    "use strict";

    window.marriage = window.marriage || {};

    var baseUrl = 'http://localhost:8080';


    marriage.config = {
        baseUrl: '',
        loginUrl: baseUrl + '/zhuce.html',
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
            '8001': '请填写公司名称！',
            '8002': '请填写行业！',




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
         }else if ('txtCarImg'=== item.eleType) {
            var imgs = $("img[name='" + item.input_name + "']");
            for(var i = 0;i < imgs.length;i++)
            {
                var ob = imgs[i];
                value = value + ob.attr("src") + ",";
            }
         }else if ('inputsel1'=== item.eleType) {
  
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

              var html = [];

            for(var i=0;i<data.length;i++ ) {
                
                html.push('<img src="' + data[i] + '" alt="" style="width:20%;border-radius:50%;margin:0 5px">');
                 
            }
            var list = $('#MarriageDetail_show_img_List');
        
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
             }else if (eleType === 'img') {
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

              var html = [];

       
               
                html.push('<img src="' + data + '" alt="" style="width:20%;border-radius:50%;margin:0 5px">');
        
            var list1 = $('#MarriageDetail_show_img_List1');
        
            list1.empty();
           
          
            if (html.length > 0) {
                list1.html(html.join(''));
            
            }
 }

  
  


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

    marriage.tpl = {
         indexListTpl: function(data) {

            return ['{@each data as item}',
                    '<div class="situation-box">',
                    '<div class="situation-box-item situation-box-objecitem " >',
                     '{@if item.imgs}',  '<a class="click-point"  onclick="pageDetail(', "'${item.id}')",'">',
                    '<img class="round_pic" src="${item.imgs.split(",")[0] }" />',
                    '{@if item.sex==1}', '<div class="sex_pic"><img src="images/zdx_img_xb_ns.png" /></div>', 
                    '{@else if item.sex==2}', '<div class="sex_pic"><img src="images/zdx_img_xb_nx.png" /></div>',
                    '{@/if}',
                    '</a>',
                    '{@else if !item.imgs}', '',
                    '{@/if}',
                   
                    '<div class="ituation-box-item_content">',
                    '<a onclick="pageDetail(', "'${item.id}')",'">',
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
                                 '<div class="situation-box-item " onclick="pagejobDetail(', "'${item.id}')", '">',
                                      '<a class="click-point" >', 
                                            '<img src="${item.img.split(",")[0] }" style="display: inline-block;">',
                                      '</a>',
                                      '<div class="situation-box-item_content">',
                                          '<a href="#">',
                                              '<h5>${item.title}</h5>',
                                               '<div class="linestyle linsty1">',
                                                       '<span>${item.county_name}</span>',
                                                       '<em>${item.income}</em>',
                                                       '<strong>${item.degrees}</strong>',
                                                  '</div>  ',
                                          '</a>',
                                      '</div>',
                                '</div>',
                            '{@else if !item.imgs}', '',
                                    '<div class="situation-box-item situation-box-itemstyle" >',
                                        '<div onclick="pagejobDetail(', "'${item.id}')", '">',
                                            '<a href="#" >',
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
                                    '</div>',
                            '{@/if}',
                           
                     '{@/each}'
             ].join('');
         },

             indexrecruitListTpl: function(data) {
                  return ['{@each data as item}',
                           '<div class="situation-box-item situation-box-itemstyle" onclick="pagerecruitDetail(', "'${item.id}')", '">',
                                '<div>',
                                    '<a>',
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
                    $.alert(marriage.config.constant['0012']);
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
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
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
                    viewInfo3(els._field, d);
                    viewInfo3(els._field, d.imgs.split(","));
                    viewInfo4(els._field, d.imgs.split(",")[0]);
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
                    el: 'search_content',
                    pro: 'searchname',
                    type: 'text'
                }

            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },
        jobdata: function() {
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
            // $.showPreloader();
           
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
                    $.alert(marriage.config.constant['0012']);
                    $("#findjoblist").empty();
                   
                } else if (d) {
                    
                    var list = juicer(marriage.tpl.indexjobListTpl(), d);
                    $("#findjoblist").html(list);
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(marriage.config.constant['0001']);
                
            });
          
        },
        query1: function() {
            var data = ''; 
            
            marriage.tool.ajax(marriage.config.jobList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0012']);
                    $("#findjoblist").empty();
                   
                } else if (d) {
                    
                    var list = juicer(marriage.tpl.indexjobListTpl(), d);
                    $("#findjoblist").html(list);
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(marriage.config.constant['0001']);
                
            });
          
         },

          query2: function(obj) {
            var data =marriage.joblist.data(); 
             if(obj){
                data.city_id=obj;
             }
              
            
            marriage.tool.ajax(marriage.config.jobList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0012']);
                    $("#indexlist").empty();
                   
                } else if (d) {
                    
                    var list = juicer(marriage.tpl.indexjobListTpl(), d);
                    $("#indexlist").html(list);
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(marriage.config.constant['0001']);
                
            });
          
         },
        query3: function() {
             
               var data = marriage.joblist.datax(); 
            
            marriage.tool.ajax(marriage.config.jobList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0012']);
                    
                   
                } else if (d) {
                    $("#findjoblist").empty();
                    $("#bothlist1").empty();
                    var list = juicer(marriage.tpl.indexjobListTpl(), d);
                     $("#bothlist2").html(list);
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(marriage.config.constant['0001']);
                
            });
          
         },
             query4: function() {
            var data = marriage.joblist.jobdata(); 
            
            marriage.tool.ajax(marriage.config.jobList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0012']);
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
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
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
                    viewInfo(els._field, d);
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
     
        init: function() {
            // marriage.index.query();
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
                    el: 'search_content',
                    pro: 'searchname',
                    type: 'text'
                }

            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },

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
                    $.alert(marriage.config.constant['0012']);
                    $("#findrecruitlist").empty();
                   
                } else if (d) {
                    
                    var list = juicer(marriage.tpl.indexrecruitListTpl(), d);
                    $("#findrecruitlist").html(list);
                    
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(marriage.config.constant['0001']);
                
            });
          
        },
        query1: function() {
            var data = '';   
            marriage.tool.ajax(marriage.config.recruitList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0012']);
                    $("#findrecruitlist").empty();
                   
                } else if (d) {
                    
                    var list = juicer(marriage.tpl.indexrecruitListTpl(), d);
                    $("#findrecruitlist").html(list);
                    
                }
                $.hidePreloader(); 
            }, function(xhr, type) {   
                $.alert(marriage.config.constant['0001']);
                
            });
         },
        query2: function() {
           var data = marriage.recruitlist.datax(); 
            
            marriage.tool.ajax(marriage.config.recruitList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0012']);
          

                   
                } else if (d) {
                    $("#findrecruitlist").empty();
                    $("#bothlist2").empty();
                    var list = juicer(marriage.tpl.indexrecruitListTpl(), d);
                    
                    $("#bothlist1").html(list);
      
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                
                $.alert(marriage.config.constant['0001']);
                
            });
          
         },
        query3: function() {
            var data = marriage.recruitlist.recruitdata(); 
            
            marriage.tool.ajax(marriage.config.recruitList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0012']);
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
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
            // $.showPreloader();
            marriage.tool.ajax(marriage.config.recruitDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo2(els._field, d);
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
             eleType: 'img',
             valids: {
                 'require': {
                     'is': false,
                     'msg':''
                 }
             }
         },{
             id: 'id_back',
             pro: 'idimgs',
             eleType: 'img',
             valids: {
                 'require': {
                     'is': false,
                     'msg':''
                 }
             }
         },{
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
         }
         ];
         return validationToValue(pubScenicdatas);
     },
      submit: function(status,type) {
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
             marriage.tool.ajax(marriage.config.pubScenic, data2, null, 'post', function(d) {
                 if (debug) {
                     console.log(d);
                 } 

                 if (d.data && marriage.config.constant['0002'] == d.data) {
                     if (status == 1 && type==1) {
                        $.alert(marriage.config.constant['0004'],function(){
                             $.router.load("#pageFindObject"); 
                        });
                     }else if(status == 1 && type==2){
                          $(".tanchuang").show();
                          $(".queding").click(function () {     
                          $(".tanchuang").hide();
                            $.router.load("#pageFindObject"); 
                          });
                      
                     }else if(status==2){
                     
                             $.router.load("#pageAuthenticationInformation"); 
                      
                     }
                    }else if (d.data) {
                     $.alert(marriage.config.constant['0005']);
                 }
             }, function(xhr, type) {
                 $.alert(marriage.config.constant['0001']);
             });
         }
     },

    
     init: function() {
         var id = $("#pubScenic_id").val();
         // if (id) {
         //     marriage.pubZPeopleService.eidt(id);
         // }
     }
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

        init: function() {
            var id = $("#pubRecruit_id").val();
            // if (id) {
            //     marriage.pubCarFindPeople.eidt(id);
            // }
        }
    };
   

    
    $(document).on("pageInit", function(e, pageId, $page) {
     
     if (pageId == "pageIndex") {
          marriage.joblist.query2();
    }else if (pageId == "pageFindJob") {

          marriage.recruitlist.query1();
     } else if (pageId == "pageFindObject") {

          marriage.index.query();
     } 
    
   
    });

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
        $("#m_renzheng").click(function() {
         var id = $("#pubScenic_id").val();
        marriage.pubScenic.submit(2);
       });
       $("#m_fabu").click(function() {
        var id = $("#pubScenic_id").val();
        marriage.pubScenic.submit(1,1);
      });
      $("#m_fabu_ren").click(function() {
        var id = $("#pubScenic_id").val();
        marriage.pubScenic.submit(1,2);
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

        $("#btnQuery").click(function() {
            marriage.index.query();
        });



         $("#btnPubJob").click(function() {
         var id = $("#pubJob_id").val();
          marriage.pubJob.submit(1);
       });
         $("#btnSaveJob").click(function() {
         var id = $("#pubJob_id").val();
          marriage.pubJob.submit(2);
       });
         $("#btnPubRecruit").click(function() {
         var id = $("#pubRecruit_id").val();
          marriage.pubRecruit.submit(1);
       });
         $("#btnSaveRecruit").click(function() {
         var id = $("#pubRecruit_id").val();
          marriage.pubRecruit.submit(2);
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
          marriage.joblist.query3();
          marriage.recruitlist.query2();
         });
         $("#searchX").click(function() {
         
          marriage.joblist.query4();
          marriage.recruitlist.query3();
          marriage.index.query1();
         });
         $("#qiuzhi").click(function() {
         var id = $("#FindJob_id").val();
          marriage.joblist.query1();
       });
         $("#zhaopin").click(function() {
         var id = $("#FindJob_id").val();
          marriage.recruitlist.query1();
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
}(Zepto);


function pageDetail(id) {
 if (id) {
      elid = 'MarriageDetail_id';
     page = 'pageObjectIntroduction';
     _field = 'MarriageDetail_';
 }
 marriage.index.detail(id, {
     'elid': elid,
     'page': page,
     '_field': _field
 });
}


function pagejobDetail(id) {
 if (id) {
      elid = 'JobDetail_id';
     page = 'pagePostJobDetail';
     _field = 'JobDetail_';
 }
 marriage.joblist.detail(id, {
     'elid': elid,
     'page': page,
     '_field': _field
 });
}
function pagerecruitDetail(id) {
 if (id) {
      elid = 'RecruitDetail_id';
     page = 'pagePostRecruitDetail';
     _field = 'RecruitDetail_';
 }
 marriage.recruitlist.detail(id, {
     'elid': elid,
     'page': page,
     '_field': _field
 });
}

+ function($) {
    "use strict";

    var loading = false;
    $(document).on('infinite', '#pageIndex .infinite-scroll-bottom', function() {
        if (loading||$("#queryList div").length<10) {
             return
        }
        
        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#rent_pageNum").val();
            if (pageNum==1) {
                $('#pageRentContent .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
            }
            $("#rent_pageNum").val(++pageNum);
            var param = marriage.index.data();
            // param.pageNum = pageNum;
            // param.PageSize = 10;
            marriage.tool.ajax(marriage.config.travellist, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0014']);
                } else if (d) {
                    var list = juicer(marriage.tpl.indexListTpl(), d);
                    $("#queryList").append(list);
                }
            }, function(xhr, type) {
                $.alert(marriage.config.constant['0001']);
            });
            $.refreshScroller();
        }, 500);
    });

}(Zepto);


+ function($) {
    "use strict";

    var loading = false;
    $(document).on('infinite', '#pageFindObject .infinite-scroll-bottom', function() {
        if (loading||$("#querymarryList li").length<10) {
             return
        }
        
        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#sell_pageNum").val();
            if (pageNum==1) {
                $('#pageSellContent .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
            }
            $("#sell_pageNum").val(++pageNum);
            var param = marriage.index.data();
            param.pageNum = pageNum;
            param.PageSize = 10;
            marriage.tool.ajax(marriage.config.MarryList, param, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d.data && marriage.config.constant['0003'] == d.data) {
                    $.alert(marriage.config.constant['0014']);
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
        if (d.data && marriage.config.constant['0002'] == d.data) {
            $.alert(marriage.config.constant['0006']);
            add = 'scstart-fill';
            remove = 'scstart-line';
        } else if (d.data && marriage.config.constant['0009'] == d.data) {
            add = 'scstart-fill';
            remove = 'scstart-line';
            $.alert(marriage.config.constant['0007']);
        } else if (d.data) {
            add = 'scstart-line';
            remove = 'scstart-fill';
            $.alert(marriage.config.constant['0008']);
        }
        collectIcon($star, add, remove);
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
        if (d.data && marriage.config.constant['0002'] == d.data) {
            $.alert(marriage.config.constant['6004']);
            add = 'jbstart-fill';
            remove = 'start-line';
        } else if (d.data && marriage.config.constant['0009'] == d.data) {
            add = 'jbstart-fill';
            remove = 'jbstart-line';
            $.alert(marriage.config.constant['0007']);
        } else if (d.data) {
            add = 'jbstart-line';
            remove = 'jbstart-fill';
            $.alert(marriage.config.constant['0008']);
        }
        reportIcon($star, add, remove);
    }, function(xhr, type) {
        add = 'jbstart-line';
        remove = 'jbstart-fill';
        reportIcon($star, add, remove);
        $.alert(marriage.config.constant['0001']);
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
        return '可全职';
    } else if (2 == type) {
        return '可兼职';
    } else if (3 == type) {
        return '可夜班';
    } else if (4 == type) {
        return '需正常班';
    } else if (5 == type) {
        return '需补贴';
    }else if (6 == type) {
        return '需年终奖';
    } else if (7 == type) {
        return '需提成';
    } else if (8 == type) {
        return '需报路费';
    } else if (9== type) {
        return '需包住';
    }else if (10== type) {
        return '需包餐';
    }else if (11 == type) {
        return '可出差';
    } else if (12 == type) {
        return '残疾人';
    } else if (13 == type) {
        return '三险一金';
    } else if (14 == type) {
        return '五险一金';
    } 
}

var indexquery=true; 
















