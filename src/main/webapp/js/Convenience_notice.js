window.notice = window.notice || {};
var baseUrl = 'http://localhost:8080';
var filedate=notice;
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
                url: notice.config.uploadFile,
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
                        var path=test?d.data.replace('/notice/',''):d.data; 
                        if (type=='image') {
                            showImgs(fileList, name, path);
                        } else if(type=='video'){
                            showVideos(fileList, name, path);
                        }
                        
                    } else {
                        if (uploaddebug) {
                            $.alert('上传成功 路径返回错误，<br/>用于测试默认图片！');
                            showImgs(fileList, name, notice.config.uploadDefult);
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
                    $.alert(notice.config.constant['0001']);
                    console.log(xhr);
                    if (uploaddebug) {
                        $.alert('上传失败 路径返回错误，<br/>用于测试默认图片！');
                        showImgs(fileList, name, notice.config.uploadDefult);
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

    window.notice = window.notice || {};

    var baseUrl = 'http://localhost:8080';


    notice.config = {
        baseUrl: '',
        loginUrl: baseUrl + '/zhuce.html',
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
            '0016': 'aleady did',
            '0017': 'already did',
            '0018': 'aleady get',
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
            //'5013': '请上传相关证明',
            '5014': 'aleady pass',
            '5015': 'not pass',
            '6004': '举报成功!'

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
        var list = $('#noticedetails_main_img_List');
       
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
        var list = $('#noticedetails_c_imgage');
        list.empty();
    
        if (html.length > 0) {
            list.html(html.join(''));
        }

       // var html = [];
       //  for(var i=0;i < data.content.length;i++ ) {
       //      html.push('<img src="' + data.content[i].img_path + '" alt="" style="width: 100%" >'+data.content[i].content+'')
       //  }
       //  var list = $('#noticedetails_c_imgage');
       //  list.empty();
       //  if (html.length > 0) {
       //      list.html(html.join(''));
            
       //  }
         var html = [];

        for(var i=0;i<data.length;i++ ) {
            
            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%" >')
             
        }
        var list = $('#confirmdetails_main_img_List');
       
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
        var list = $('#confirmdetails_c_imgage');
        list.empty();
    
        if (html.length > 0) {
            list.html(html.join(''));
        }


         var html = [];

        for(var i=0;i<data.length;i++ ) {
            
            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%" >')
             
        }
        var list = $('#seekdetails_main_img_List');
       
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
        var list = $('#seekdetails_c_imgage');
        list.empty();
    
        if (html.length > 0) {
            list.html(html.join(''));
        }

       
         var html = [];

        for(var i=0;i<data.length;i++ ) {
            
            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%" >')
             
        }
        var list = $('#feedbackdetails_main_img_List');
       
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
        var list = $('#feedbackdetails_c_imgage');
        list.empty();
    
        if (html.length > 0) {
            list.html(html.join(''));
        }

                 var html = [];

        for(var i=0;i<data.length;i++ ) {
            
            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%" >')
             
        }
        var list = $('#enrolldetails_main_img_List');
       
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
        var list = $('#enrolldetails_c_imgage');
        list.empty();
    
        if (html.length > 0) {
            list.html(html.join(''));
        }
        //链接
        // var html = [];

        // for (var i = 0; i < data.links.length; i++) {

        //     html.push('<li><a href="' + data.links[i].url + '">' + data.links[i].content + '</a></li>')

        // }
        // var list = $('#noticedetails_url');

        // list.empty();

        // if (html.length > 0) {
        //     list.html(html.join(''));
        // }

        // var html = [];
        // for (var i = 0; i < data.links.length; i++) {

        //     html.push('<li><a href="' + data.links[i].url + '">' + data.links[i].content + '</a></li>')

        // }
        // var list = $('#enrolldetails_url');

        // list.empty();

        // if (html.length > 0) {
        //     list.html(html.join(''));
        // }




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
         }
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
                    '<a href="#" class="item-link item-content" onclick="TongzhiDetail(', "'${item.id}')", '" >',
                    '{@if item.main_img}','<div class="item-media"><img src="${item.main_img}" style="width: 4rem;"></div>',
                    '{@else if !item.main_img}','',
                    '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                    '<div class="item-subtitle red"> ',
                    '<div class="n_num_1"><img src="images/bmtz_lll.png" width="17"/><span>${item.wartchs}</span></div></div>',
                    '<div class="item-subtitle">发布时间: <time>${item.create_time}</time>',
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
                    '<a href="#" class="item-link item-content" onclick="BaomingDetail(', "'${item.id}')", '" >',
                    '{@if item.main_img}','<div class="item-media"><img src="${item.main_img}" style="width: 4rem;"></div>',
                    '{@else if !item.main_img}','',
                    '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '<div class="item-after">',
                    '<div class="n_num"><img src="images/bmtz_lll.png" width="17"  /><span>${item.wartchs}</span></div>',
                    '</div>',
                    '</div>',
                    '<div class="item-subtitle redd">需<span>${item.nums}</span>人/已报<span>${item.haveman}</span>人</div>',
                    '<div class="item-subtitle">开始时间: <time>${item.b_starttime}</time>',
                    '</div>',
                    '<div class="item-subtitle">结束时间: <time>${item.b_endtime}</time>',
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
                    '<a href="#" class="item-link item-content" onclick="FankuiDetail(', "'${item.id}')", '" >',
                    '{@if item.main_img}','<div class="item-media"><img src="${item.main_img}" style="width: 4rem;"></div>',
                    '{@else if !item.main_img}','',
                    '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                    '<div class="item-subtitle red">',           
                    '<div class="n_num_1"><img src="images/bmtz_lll.png" width="17"  /><span>${item.wartchs}</span></div></div>',
                    '<div class="item-subtitle">发布时间: <time>${item.create_time}</time>',
                    '</div>',
                    '{@if item.pass}','<div class="settled">已解决</div>',
                    '{@else if !item.pass}','',
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
                    '<a href="#" class="item-link item-content" onclick="QiuzhengDetail(', "'${item.id}')", '" >',
                    '{@if item.main_img}','<div class="item-media"><img src="${item.main_img}" style="width: 4rem;"></div>',
                    '{@else if !item.main_img}','',
                    '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                    '<div class="item-subtitle red"> ',  
                    '<div class="n_num_1"><img src="images/bmtz_lll.png"  width="17"  /><span>${item.wartchs}</span></div></div>',
                    '<div class="item-subtitle">发布时间: <time>${item.create_time}</time>',
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
                    '<a href="#" class="item-link item-content" onclick="ZhengqiuDetail(', "'${item.id}')", '" >',
                    '{@if item.main_img}','<div class="item-media"><img src="${item.main_img}" style="width: 4rem;"></div>',
                    '{@else if !item.main_img}','',
                    '{@/if}',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                    '<div class="item-subtitle red">',      
                    '<div class="n_num_1"><img src="images/bmtz_lll.png" width="17"  /><span>${item.wartchs}</span></div></div>',
                    '<div class="item-subtitle">发布时间: <time>${item.create_time}</time>',
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
                    '<div>',
                    '<img src="${item.img}" />',
                    '</div>',
                    '<div>',
                    '<h1>${item.name}</h1>',
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
                        location.href = notice.config.loginUrl;
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
                        'msg': notice.config.constant['5013']
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
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg': ''
                 }
             }
      
         },{
             id: 'Tongzhi_url_content',
             pro: 'url_content',
             eleType: 'input',
             valids: {
                 'require': {
                    'is': false,
                     'msg':  ''
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

    
     init: function() {
         var id = $("#Tongzhi_id").val();
         // if (id) {
         //     notice.pubZPeopleService.eidt(id);
         // }
     }
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
             eleType: 'input',
             valids: {
                 'require': {
                     'is': false,
                     'msg':''
                 }
             }
      
         },{
             id: 'Baoming_url_content',
             pro: 'url_content',
             eleType: 'input',
             valids: {
                 'require': {
                    'is': false,
                     'msg': ''
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
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5005']
                 }
             }
         },{
             id: 'Baoming_b_endtime',
             pro: 'b_endtime',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5006']
                 }
             }
         },{
             id: 'Baoming_starttime',
             pro: 'starttime',
             eleType: 'input',
             valids: {
                 'require': {
                     'is': true,
                     'msg': notice.config.constant['5007']
                 }
             }
         },{
             id: 'Baoming_endtime',
             pro: 'endtime',
             eleType: 'input',
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
          var sc2=$('.sc-15').find('textarea').size();
               console.info(sc2);
                     for(var m=1;m<sc2+1;m++){
                     var s2=[
                          {
                     id: 'Baoming_c_image'+m,
                     pro: 'c_image',
                     eleType: 'txtCarImg',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'Baoming_c_context'+m,
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
                 pubBaomingdatas=pubBaomingdatas.concat(s2);
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

    
     init: function() {
         var id = $("#Baoming_id").val();
         // if (id) {
         //     notice.pubZPeopleService.eidt(id);
         // }
     }
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
        
         var sc2=$('.sc-14').find('textarea').size();
               console.info(sc2);
                     for(var m=1;m<sc2+1;m++){
                     var s2=[
                          {
                     id: 'Fankui_c_image'+m,
                     pro: 'c_image',
                     eleType: 'txtCarImg',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'Fankui_c_context'+m,
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
                 pubFankuidatas=pubFankuidatas.concat(s2);
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

    
     init: function() {
         var id = $("#Fankui_id").val();
         // if (id) {
         //     notice.pubZPeopleService.eidt(id);
         // }
     }
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

         var sc2=$('.sc-13').find('textarea').size();
               console.info(sc2);
                     for(var m=1;m<sc2+1;m++){
                     var s2=[
                          {
                     id: 'Qiuzheng_c_image'+m,
                     pro: 'c_image',
                     eleType: 'txtCarImg',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'Qiuzheng_c_context'+m,
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
                 pubQiuzhengdatas=pubQiuzhengdatas.concat(s2);
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

    
     init: function() {
         var id = $("#Qiuzheng_id").val();
         // if (id) {
         //     notice.pubZPeopleService.eidt(id);
         // }
     }
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
             var sc2=$('.sc-12').find('textarea').size();
               console.info(sc2);
                     for(var m=1;m<sc2+1;m++){
                     var s2=[
                          {
                     id: 'Zhengqiu_c_image'+m,
                     pro: 'c_image',
                     eleType: 'txtCarImg',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'Zhengqiu_c_context'+m,
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
                 pubZhengqiudatas=pubZhengqiudatas.concat(s2);
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

    
     init: function() {
         var id = $("#Zhengqiu_id").val();
         // if (id) {
         //     notice.pubZPeopleService.eidt(id);
         // }
     }
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
                 } else if (d.data && notice.config.constant['0016'] == d.data){
                     $.alert('您的报名已提交<br>请勿重复报名<br>等待发起人审核与您联系');
                 }else if (d.data && notice.config.constant['0018'] == d.data){
                     $.alert('报名已满');
                 }
             }, function(xhr, type) {
                 $.alert(notice.config.constant['0001']);
             });
         }
     },

    
     init: function() {
         var id = $("#applyming_id").val();
         // if (id) {
         //     notice.pubZPeopleService.eidt(id);
         // }
     }
    };


  //列表详情
    notice.index = {
        data: function() {
            var data = {};
                 var criterias = [
              
               {
                    el: 'notice_pageNum',
                    pro: 'pageNum',
                    type: 'text'
                }, {
                    el: 'notice_pageSize',
                    pro: 'PageSize',
                    type: 'text'
                }, {
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
       query: function(obj) {
            $.showPreloader();
            // $("#notice_pageNum").val(1);
            // $("#notice_ageSize").val(10);
            var data = notice.index.data();
              if(obj){
                data.city_id=obj;
             }
              
            if (debug) {
                console.log("index:");
                console.log(data);
            };
            // $('#pageIndex .infinite-scroll-preloader').empty();
            // $('#pageIndex .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
            if (1 == data.type) {
            notice.tool.ajax(notice.config.noticeList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && notice.config.constant['0003'] == d.data) {
                    $.alert(notice.config.constant['0012']);
                    $("#queryTongzhiList").empty();
                    $(' #pageIndex .infinite-scroll-preloader').html(notice.config.constant['0012']); 
                } else if (d) {
                    var list = juicer(notice.tpl.TongzhiListTpl(), d);
                    $("#queryTongzhiList").html(list);
                    $('#pageIndex .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                $(' #pageIndex .infinite-scroll-preloader').html(notice.config.constant['0001']);
                $.alert(notice.config.constant['0001']);
                $.hidePreloader();
            });
          } else if (2 == data.type) {
               notice.tool.ajax(notice.config.noticeList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && notice.config.constant['0003'] == d.data) {
                    $.alert(notice.config.constant['0012']);
                    $("#queryBaomingList").empty();
                    $(' #pageIndex .infinite-scroll-preloader').html(notice.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(notice.tpl.BaomingListTpl(), d);
                    $("#queryBaomingList").html(list);
                    $('#pageIndex .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                $(' #pageIndex .infinite-scroll-preloader').html(notice.config.constant['0001']);
                $.alert(notice.config.constant['0001']);
                $.hidePreloader();
            });
           }else if (3 == data.type) {
               notice.tool.ajax(notice.config.noticeList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && notice.config.constant['0003'] == d.data) {
                    $.alert(notice.config.constant['0012']);
                    $("#queryFankuiList").empty();
                    $(' #pageIndex .infinite-scroll-preloader').html(notice.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(notice.tpl.FankuiListTpl(), d);
                    $("#queryFankuiList").html(list);
                    $('#pageIndex .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                $(' #pageIndex .infinite-scroll-preloader').html(notice.config.constant['0001']);
                $.alert(notice.config.constant['0001']);
                $.hidePreloader();
            });
           }else if (4 == data.type) {
               notice.tool.ajax(notice.config.noticeList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && notice.config.constant['0003'] == d.data) {
                    $.alert(notice.config.constant['0012']);
                    $("#queryQiuzhengList").empty();
                    $(' #pageIndex .infinite-scroll-preloader').html(notice.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(notice.tpl.QiuzhengListTpl(), d);
                    $("#queryQiuzhengList").html(list);
                    $('#pageIndex .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                $(' #pageIndex .infinite-scroll-preloader').html(notice.config.constant['0001']);
                $.alert(notice.config.constant['0001']);
                $.hidePreloader();
            });
           }else if (5 == data.type) {
               notice.tool.ajax(notice.config.noticeList, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && notice.config.constant['0003'] == d.data) {
                    $.alert(notice.config.constant['0012']);
                    $("#queryZhengqiuList").empty();
                    $(' #pageIndex .infinite-scroll-preloader').html(notice.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(notice.tpl.ZhengqiuListTpl(), d);
                    $("#queryZhengqiuList").html(list);
                    $('#pageIndex .infinite-scroll-preloader').empty();
                }
                $.hidePreloader();
               
            }, function(xhr, type) {
                $(' #pageIndex .infinite-scroll-preloader').html(notice.config.constant['0001']);
                $.alert(notice.config.constant['0001']);
                $.hidePreloader();
            });
           }
        },
       Tongdetail: function(id, els) {
            var data = {
              info_id: id,
              type: 1
            };
            if (debug) {
                console.log(data);
            }
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
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
                    viewInfo(els._field, d);
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

       Baodetail: function(id, els) {
            var data = {
              info_id: id,
              type: 2
            };
            if (debug) {
                console.log(data);
            }
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
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
                    viewInfo(els._field, d);
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },


       Fandetail: function(id, els) {
            var data = {
              info_id: id,
              type: 3
            };
            if (debug) {
                console.log(data);
            }
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
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
                    viewInfo(els._field, d);
                    var xxxx = $.trim(d.id);
                    $("#guan_zhu").val(xxxx);
                               
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

       Qiudetail: function(id, els) {
            var data = {
              info_id: id,
              type: 4
            };
            if (debug) {
                console.log(data);
            }
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
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
                    viewInfo(els._field, d);
 
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
        Zhengdetail: function(id, els) {
            var data = {
              info_id: id,
              type: 5
            };
            if (debug) {
                console.log(data);
            }
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
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
                    viewInfo(els._field, d);
                    var mpid = $.trim(d.id);
                    $("#Donate_info_id").val(mpid);
                }
                $.hidePreloader();
            }, function(xhr, type) {
                $.toast(notice.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
    };

  //点赞

$("#queryQiuzhengList").on('click','.true',function(){
    var id=$(this).parents('.pinglun').attr('id')
    var self=this;
    var data = {
      info_id:id,
      type:1,
      apply:1
    };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {
     $(self).next('div').html($(self).next('div').html()*1+1);
           if (d.data && notice.config.constant['0002'] == d.data) { 
        $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
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
     $(self).next('div').html($(self).next('div').html()*1+1);
           if (d.data && notice.config.constant['0002'] == d.data) { 
     $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
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
     $(self).next('div').html($(self).next('div').html()*1+1);
           if (d.data && notice.config.constant['0002'] == d.data) { 
     $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
                     $.alert('已经点过,点击无效');
                 } 
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});

$("#queryZhengqiuList").on('click','.true_ping',function(){
    var id=$(this).parents('.zantong').attr('id')
    var self=this;
    var data = {
      info_id:id,
      type:2,
      apply:1
    };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {
     $(self).next('div').html($(self).next('div').html()*1+1);
           if (d.data && notice.config.constant['0002'] == d.data) { 
     $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
                     $.alert('已经点过,点击无效');
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
     $(self).next('div').html($(self).next('div').html()*1+1);
      if (d.data && notice.config.constant['0002'] == d.data) { 
     $.alert('评论成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
                     $.alert('已经点过,点击无效');
                 } 
    }, function(xhr, type) {
        $.toast(notice.config.constant['0001'], function() {
            $.router.back();
        });
        $.hidePreloader();
    });
});

//关注
$(document).on('click','.guanzhu',function(){
    var id=$("#guan_zhu").val();
    var self=this;
    var data = {
      info_id:id,
      type:3,
      apply:1 
  };
    notice.tool.ajax(notice.config.NoticePraise, data, null, 'post', function(d) {
     $(self).next('h4').html($(self).next('h4').html()*1+1);1
      if (d.data && notice.config.constant['0002'] == d.data) { 
     $.alert('关注成功');
     }else if (d.data && notice.config.constant['0017'] == d.data){
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
                    $.alert(notice.config.constant['0013']);
                    $("#querydonateList").empty();
                    $('#pagenoticedetails .infinite-scroll-preloader').html(notice.config.constant['0012']); 
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

    $(document).on("pageInit", function(e, pageId, $page) {
     if (pageId == "pageIndex") {
          notice.index.query();
    }else if(pageId == "pageseekdetails"){
        notice.donate.query();
    }
    });

    $(function() {

       $("#Tongzhi_fabu").click(function() {
        var id = $("#Tongzhi_id").val();
        notice.Tongzhi.submit(1);
        });
           
       $("#Tongzhi_save").click(function() {
        var id = $("#Tongzhi_id").val();
        notice.Tongzhi.submit(2);
        });

       $("#Baoming_fabu").click(function() {
        var id = $("#Baoming_id").val();
        notice.Baoming.submit(1);
        });
           
       $("#Baoming_save").click(function() {
        var id = $("#Baoming_id").val();
        notice.Baoming.submit(2);
        });

       $("#Fankui_fabu").click(function() {
        var id = $("#Fankui_id").val();
        notice.Fankui.submit(1);
        });
           
       $("#Fankui_save").click(function() {
        var id = $("#Fankui_id").val();
        notice.Fankui.submit(2);
        });

       $("#Qiuzheng_fabu").click(function() {
        var id = $("#Qiuzheng_id").val();
        notice.Qiuzheng.submit(1);
        });
           
       $("#Qiuzheng_save").click(function() {
        var id = $("#Qiuzheng_id").val();
        notice.Qiuzheng.submit(2);
        });

       $("#Zhengqiu_fabu").click(function() {
        var id = $("#Zhengqiu_id").val();
        notice.Zhengqiu.submit(1);
        });
           
       $("#Zhengqiu_save").click(function() {
        var id = $("#Zhengqiu_id").val();
        notice.Zhengqiu.submit(2);
        });

       
        $("#tongzhi_btn").click(function () {
        $("#tongzhi_btn").attr("check", true);
        $("#baoming_btn").attr("check", false);
        $("#fankui_btn").attr("check", false);
        $("#qiuzheng_btn").attr("check", false);
        $("#zhengqiu_btn").attr("check", false);
        notice.index.query();
        });
        
        $("#baoming_btn").click(function () {
        $("#baoming_btn").attr("check", true);
        $("#tongzhi_btn").attr("check", false);
        $("#fankui_btn").attr("check", false);
        $("#qiuzheng_btn").attr("check", false);
        $("#zhengqiu_btn").attr("check", false);
        notice.index.query();
        });

        $("#fankui_btn").click(function () {
        $("#fankui_btn").attr("check", true);
        $("#baoming_btn").attr("check", false);
        $("#tongzhi_btn").attr("check", false);
        $("#qiuzheng_btn").attr("check", false);
        $("#zhengqiu_btn").attr("check", false);
        notice.index.query();
        });

        $("#qiuzheng_btn").click(function () {
        $("#qiuzheng_btn").attr("check", true);
        $("#baoming_btn").attr("check", false);
        $("#fankui_btn").attr("check", false);
        $("#tongzhi_btn").attr("check", false);
        $("#zhengqiu_btn").attr("check", false);
        notice.index.query();
        });

        $("#zhengqiu_btn").click(function () {
        $("#zhengqiu_btn").attr("check", true);
        $("#baoming_btn").attr("check", false);
        $("#fankui_btn").attr("check", false);
        $("#qiuzheng_btn").attr("check", false);
        $("#tongzhi_btn").attr("check", false);
        notice.index.query();
        });

         $("#btnQuery").click(function () {
            notice.index.query();
        });

        $("#notice_locationorder1").click(function () {
        notice.index.query();
        });

        $("#notice_timeorder1").click(function () {
        notice.index.query();
        });

        $("#notice_wartchorder1").click(function () {
        notice.index.query();
        });

       $("#queding_btn").click(function () {
        notice.applyming.submit();
        });

        $("#shenhe_btn").click(function () {
        notice.zhengming.submit();
        });
        
});
    $.init();
}(Zepto);


function TongzhiDetail(id) {
 if (id) {
     elid = 'noticedetails_id';
     page = 'pagenoticedetails';
     _field = 'noticedetails_';
  } 

   notice.index.Tongdetail(id,{
        'elid': elid,
        'page': page,
        '_field': _field
    });
}

function BaomingDetail(id) {
 if (id) {
     elid = 'enrolldetails_id';
     page = 'pageenrolldetails';
     _field = 'enrolldetails_';
  } 

   notice.index.Baodetail(id,{
        'elid': elid,
        'page': page,
        '_field': _field
    });
}

function FankuiDetail(id) {
 if (id) {
       elid = 'feedbackdetails_id';
     page = 'pagefeedbackdetails';
     _field = 'feedbackdetails_';
  } 

   notice.index.Fandetail(id,{
        'elid': elid,
        'page': page,
        '_field': _field
    });
}


function QiuzhengDetail(id) {
 if (id) {
      elid = 'confirmdetails_id';
     page = 'pageconfirmdetails';
     _field = 'confirmdetails_';
  } 

   notice.index.Qiudetail(id,{
        'elid': elid,
        'page': page,
        '_field': _field
    });
}


function ZhengqiuDetail(id) {
 if (id) {
     elid = 'seekdetails_id';
     page = 'pageseekdetails';
     _field = 'seekdetails_';
  } 

   notice.index.Zhengdetail(id,{
        'elid': elid,
        'page': page,
        '_field': _field
    });
}



$(document).on('click','.true_ping', function () {
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
                onClick:function(id) {
                         var id=$(this).parents('.zantong').attr('id')
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

$(document).on('click','.false_ping', function () {
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
                onClick: function(id) {
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
        if (d.data && notice.config.constant['0002'] == d.data) {
            $.alert(notice.config.constant['0006']);
            add = 'start-fill';
            remove = 'start-line';
        } else if (d.data && notice.config.constant['0009'] == d.data) {
            add = 'start-fill';
            remove = 'start-line';
            $.alert(notice.config.constant['0007']);
        } else if (d.data) {
            add = 'start-line';
            remove = 'start-fill';
            $.alert(notice.config.constant['0008']);
        }
        collectIcon($star, add, remove);
    }, function(xhr, type) {
        add = 'start-line';
        remove = 'start-fill';
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
        if (d.data && notice.config.constant['0002'] == d.data) {
            $.alert(notice.config.constant['6004']);
            add = 'start-fill1';
            remove = 'start-line1';
        } else if (d.data && notice.config.constant['0009'] == d.data) {
            add = 'start-fill1';
            remove = 'start-line1';
            $.alert(notice.config.constant['0007']);
        } else if (d.data) {
            add = 'start-line1';
            remove = 'start-fill1';
            $.alert(notice.config.constant['0008']);
        }
        reportIcon($star, add, remove);
    }, function(xhr, type) {
        add = 'start-line1';
        remove = 'start-fill1';
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



var indexquery=true; 

