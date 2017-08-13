window.love = window.love || {};
var baseUrl = 'http://localhost:8080';

var filedate=love;

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
                url: love.config.uploadFile,
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
                        var path=test?d.data.replace('/love/',''):d.data; 
                        if (type=='image') {
                            showImgs(fileList, name, path);
                        } else if(type=='video'){
                            showVideos(fileList, name, path);
                        }
                        
                    } else {
                        if (uploaddebug) {
                            $.alert('上传成功 路径返回错误，<br/>用于测试默认图片！');
                            showImgs(fileList, name, love.config.uploadDefult);
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
                    $.alert(love.config.constant['0001']);
                    console.log(xhr);
                    if (uploaddebug) {
                        $.alert('上传失败 路径返回错误，<br/>用于测试默认图片！');
                        showImgs(fileList, name, love.config.uploadDefult);
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
        img.src = "http://localhost:8080" + src;
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
          $('#love_location_x').val(xw);
          $('#love_location_y').val(yj); 
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

    window.love = window.love || {};

    var baseUrl = 'http://localhost:8080';


    love.config = {
        // baseUrl: '',
        loginUrl: baseUrl + '/zhuce.html',
        uploadFile: baseUrl + '/uploadFile',
        pubLove: baseUrl + '/user/crowd/addCrowd',
        CrowdList: baseUrl + '/user/crowd/CrowdList',
        loveDetail: baseUrl + '/user/crowd/Crowd',
        addDonate: baseUrl + '/user/crowd/addDonate',
        storeinfo: baseUrl + '/user/store',
        reportinfo: baseUrl + '/user/report',
        CrowdDonate : baseUrl + '/user/crowd/CrowdDonate',
        Reply: baseUrl + '/user/crowd/CrowdReply',
        isreport: baseUrl + '/user/showreport',
        
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
    latitudeP: 32163306,
    longitudeP: 118712513,
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
             valu7=valu7 + "," + $("#" + item.id).find('img').attr("src");
             value=valu7;

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

        for(var i=0;i<data.length;i++ ) {
            
            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%" >')
             
        }
        var list = $('#loveDetail_main_img_List');
       
        list.empty();
    
        if (html.length > 0) {
            list.html(html.join(''));
        }
   


      var html = [];

      for(var i=0;i < data.content.length;i++ ) {
            for(var j=0;j<data.content[i].img_path.split(',').length;j++){
         
            html.push('<img src="' + data.content[i].img_path.split(',')[j] + '" alt="" style="width: 100%" >'+data.content[i].content.split(',')[j]+'')
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
             } else if (eleType === 'hongshizi' || !eleType) {
                 var html = [];
                 if (value) {
                    $(el).html('<div class="col-10 rem"><img src="images/xx4.png" /></div>'+
                                '<div class="col-33">红十字认证</div>');
                 }else if (!value) {
                    $(el).html('');
                 }
             } else if (eleType === 'shenfen' || !eleType) {
                 var html = [];
                 if (value) {
                    $(el).html('<div class="col-10 rem"><img src="images/xx1.png" /></div>'+
                                '<div class="col-33" >身份认证</div>');
                 }else if (!value) {
                    $(el).html('');
                 }
             } else if (eleType === 'zhanghao' || !eleType) {
                 var html = [];
                 if (value) {
                    $(el).html('<div class="col-10 rem"><img src="images/xx3.png" /></div>'+
            '<div class="col-33"> 银行卡认证 <br/><span style="font-size:.5rem;">（与志愿者一致）</span></div>');
                 }else if (!value) {
                    $(el).html('');
                 }
             } else if (eleType === 'yiyuan' || !eleType) {
                 var html = [];
                 if (value) {
                    $(el).html('<div class="col-10 rem"><img src="images/xx2.png" /></div>'+
                               '<div class="col-33">医院认证</div>');
                 }else if (!value) {
                    $(el).html('');
                 }
             }else if (eleType === 'telVew') {
                $(el).html(value);
                $("#" + _m + "showtel").attr('href', 'tel:' + value);
                $("#" + _m + "sms").attr('href', 'sms:' + value);
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
                    '<a href="./love.html?id=${item.id}#pagelovedetails" class="item-link item-content banji" >',
                    '{@if item.img_path}', '<div class="item-media"><img src="${item.main_img}" style="width: 4rem;border-radius:4px"></div>', 
                    '{@else if !item.img_path}', '',
                    '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                    '<div class="item-text">${item.content.split(",")[0]}</div>',
                    '</div>',
                    '</a>',
                    '<div class="ptimg" onclick="showMap(',"'${item.location_x}','${item.location_y}')", '"><img src="images/tong_btn_dwtz.png"></div>',
                    '<div class="pinglun">',
                    '<dl>',
                    '<dt style="border:none"><div class="true">筹款:</div><div class="true_num">${item.money}元</div></dt>',
                    '<dt><div class="true">已筹:</div><div class="true_num">${item.have}元</div></dt>',
                    '<dt><div class="true">支持:</div><div class="true_num">${item.mans}人</div></dt>',
                    '<dt><div class="true">剩余:</div><div class="true_num">${item.leftday}天</div></dt>',
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
                    '<div>',
                    '<img src="${item.img}" />',
                    '</div>',
                    '<div>',
                    '<h1>${item.username}</h1>',
                    '<span class="red"> ¥${item.money}</span>',
                    '<p>${item.content}</p>',
                    '{@if item.user_id!==<%=Session["user_id"] %>}','<div class="settled1"  >回复</div>',
                    '{@else if item.user_id ===<%=Session["user_id"] %>}','',
                    '{@/if}',
                    '</div>',
                    '{@each item.reply as it2}',
                    '<div class="huifu_detailes1">',
                    '<div class="huifu_detailes2">',
                    '<img class="huifu_detailes3" src="${it2.img}" />',
                    '</div>',
                    '<div>',
                    '<h1 class="huifu_detailes4">${it2.name}</h1>',
                    '<p class="huifu_detailes5">${it2.content}</p>',
                    '</div>',
                    '</div>',
                    '<div class="clear"></div>',
                    '{@/each}',
                    '</a>',          
                    '<div class="queding" style="display:none"><textarea class="neirong" value="swqd"></textarea>',
                    '<p class="queding_btn" onclick="huifu(', "'${item.id}')", '">确定<p>',
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
                        location.href = love.config.loginUrl;
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
             eleType: 'input',
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
             var x = $('#love_location_x').val();
             var y = $('#love_location_y').val();
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

    
     init: function() {
         var id = $("#pubLove_id").val();
         // if (id) {
         //     love.pubZPeopleService.eidt(id);
         // }
     }
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
       query: function(obj) {
            //$.showPreloader();
            $("#love_pageNum").val(1);
            $("#love_pageSize").val(10);
            var data = love.index.data();
            data.pageNum = 1;
            data.pageSize = 10;
            if(obj){
                data.city_id=obj;
             }
            console.log(obj);
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
                    $.alert(love.config.constant['0012']);
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
                    viewInfo('loveDetail_', d);
                    var mpid = $.trim(d.id);
                    var mp = $.trim(d.id);
                    $("#Donate_info_id").val(mpid);
                    $("#juan_crowd_id").val(mp);
                    
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(love.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
    
     huifu:function(id) {
     var content=$(".neirong").val();
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
},
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
                    $.alert(love.config.constant['0012']);
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
                var url = location.search; //获取url中"?"符后的字串
                var strs = url.substr(1);
                var id=strs.split("=")[1];
     if (pageId == "pageIndex") {
          love.index.query();
    }else if(pageId == "pagelovedetails"){
            love.index.detail(id); 
            }

    });
 $.init();
    $(function() {

       $("#love_fabu").click(function() {
        var id = $("#love_id").val();
        love.pubLove.submit(1);
        });
           
      $("#love_save").click(function() {
        var id = $("#love_id").val();
        love.pubLove.submit(2);
        });

        $("#btn_search").click(function() {
         love.index.query();
         });


        $("#btntimeorder").click(function() {
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


// function loveDetail(id) {
//  if (id) {
//       elid = 'loveDetail_id';
//      page = 'pagelovedetails';
//      _field = 'loveDetail_';
//  }
//  love.index.detail(id, {
//      'elid': elid,
//      'page': page,
//      '_field': _field
//  });
// }

$(function () {
    "use strict";

    var loading = false;
    $(document).on('infinite', '#pageIndex .infinite-scroll-bottom', function() {
        if (loading || $("#queryloveList li").length < 10) {
            return
        }
        loading = true;
        setTimeout(function() {
            loading = false;
            var pageNum = $("#love_pageNum").val();
            if (pageNum == 1) {
                $('#pagechange .infinite-scroll-preloader').append('<div class="preloader"></div>');
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
                    $.alert(love.config.constant['0015']);
                } else if (d) {
                    var list = juicer(love.tpl.indexListTpl(), {
                        "data": d
                    });
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
 function huifu(id) {
    if (id) {
     }
 love.index.huifu(id, {});
   }

$("#querydonateList").on('click','.settled1',function(){

     $(this).parents('.type1').find(".queding").show();
});


Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  


      function creElm (o, t, a) {
          var b = document.createElement(t || "div");
          for (var p in o) {
              p == "style" ? (b[p].cssText = o[p]) : (b[p] = o[p]);
          }
          return (a || document.body).insertBefore(b, (a || document.body).firstChild);
      }
      $CKE = {
          choose: function(o) {
              parselist();
              clearTimeout(inputTimer);
              inputTimer = setTimeout(function() {
                          var s = o.value.replace(/^\s+|\s+$/, ''),
                                  frag = d.createDocumentFragment();
                          for (var p in texts) {
                              eval("var f = /" + (s || '.') + "/ig.test(p)");
                              !!texts[p].cloneNode && (f && frag.appendChild(texts[p].cloneNode(true)));
                          }
                          list.innerHTML = '';
                          list.appendChild(frag);
                      },
                      100)
          },
          open: function(A){
              var head = document.getElementsByTagName("head")[0] || document.documentElement;
              creElm({
                  src: A,
                  charset: "utf-8"
              }, "script", head);
          }
      };
      function jiathis_sendto(a) {
          try{var conf=jiathis_config||{};}catch(e){var conf={};};
          var ec = encodeURIComponent,
                  U = window.location.href,
                  T = $('#project_title').html(),
                  S = $('#project_summary').html(),
                  I = parseInt(1626433),
                  J = parseInt(0),
                  P = "",
                  A = 'http://www.jiathis.com/send/',
                  B = 'send.php',
                  C = '?webid='+a+'&url='+ec(U || document.location)+'&title='+ec(T || document.title)+(I?'&uid='+I:'')+(J?'&jtss=1':'')+(S?'&summary='+S:'')+(P?'&pic='+P:'');
          if (a == 'copy' || a == 'fav' || a == 'print') {
              $CKE.open(A+B+C);
              if(a == 'copy'){
                  jiathis_copyUrl();
              } else if(a == 'fav'){
                  jiathis_addBookmark();
              } else {
                  window.print();
              }
          } else {
              window.open(A+C, '');
          }
          return false;
      }
      function jiathis_copyUrl() {
          try{var conf=jiathis_config||{};}catch(e){var conf={};};
          var a = conf.url || this.location.href;
          var b = conf.title || document.title;
          var c = b + " " + a;
          var userAgent = navigator.userAgent.toLowerCase();
          var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
          var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
          if(is_ie) {
              clipboardData.setData('Text', c);
              alert("复制成功,请粘贴到你的QQ/MSN上推荐给你的好友！");
          } else if(prompt('你使用的是非IE核心浏览器，请按下 Ctrl+C 复制代码到剪贴板', c)) {
              alert('复制成功,请粘贴到你的QQ/MSN上推荐给你的好友！');
          } else {
              alert('目前只支持IE，请复制地址栏URL,推荐给你的QQ/MSN好友！');
          }
      }

