window.speciality = window.speciality || {};
var baseUrl = 'http://localhost:8080';
var filedate=speciality;
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
                url: speciality.config.uploadFile,
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
                        var path=test?d.data.replace('/speciality/',''):d.data; 
                        if (type=='image') {
                            showImgs(fileList, name, path);
                        } else if(type=='video'){
                            showVideos(fileList, name, path);
                        }
                        
                    } else {
                        if (uploaddebug) {
                            $.alert('上传成功 路径返回错误，<br/>用于测试默认图片！');
                            showImgs(fileList, name, speciality.config.uploadDefult);
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
                    $.alert(speciality.config.constant['0001']);
                    console.log(xhr);
                    if (uploaddebug) {
                        $.alert('上传失败 路径返回错误，<br/>用于测试默认图片！');
                        showImgs(fileList, name, speciality.config.uploadDefult);
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

    window.speciality = window.speciality || {};

    var baseUrl = 'http://localhost:8080';


    speciality.config = {
        baseUrl: '',
        loginUrl: baseUrl + '/zhuce.html',
        addProductShow: baseUrl + '/user/local/addProductShow',
        localmessageDetail: baseUrl + '/user/local/Local',
        companydetailinfo: baseUrl + '/user/local/ProductList',
        Productdetail: baseUrl + '/user/local/Product',
        Productdown: baseUrl + '/user/local/ProductShowList',
        Myproductapply: baseUrl + '/user/local/ownProductShowList',
        storeinfo: baseUrl + '/user/store',
        Deletemessage: baseUrl + '/user/local/ProductShowDelete',
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
    latitudeP: 32163306,
    longitudeP: 118712513,
    accuracyP: 67.8021001352539
};

var debug = false;

+ function($) {
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
   
             var html = [];

            for(var i=0;i<data.length;i++ ) {
                
                html.push('<div class="swiper-slide"><img src="' + data[i] + '" alt="" style="width: 100%" ></div>');
                 
            }
            var list = $('#localmessageDetail_main_img_List');
      
            list.empty();
        
            if (html.length > 0) {
            list.html(html.join(''));
              
            }

             var html = [];
             html.push(data);
            var list1 = $('#localmessageDetail_name');
            list1.empty();
            list1.html(html.join(''));

            var html = [];
             html.push(data);
            var list2 = $('#localmessageDetail_introduce');
            list2.empty();
            list2.html(html.join(''));

        
     };
    var viewInfo1 = function(data) {
   
           // 处理一组图片内容 
       
               var html = [];

                for(var i=0;i < data.main_info.length;i++ ) {
                    
                    html.push('<img src="' + data.main_info[i].img_path + '" alt="" style="width: 100%" >'+data.main_info[i].content+'')
                     
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
                    '<div class="item-media"><img src="${item.img_path}" style="width: 4rem;"></div>',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div>',
                    '</div>',
                    '<div class="item-subtitle">${item.etitle}</div>',
                    '<div class="item-after pull-right">',
                    '</div>',
                    '<div class="item-text">${item.content}</div> ',
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
                    '<div class="row status_row">',
                    '<div class="col-75">${item.createtime}',
                    '</div>',
                    '{@if item.pass==1}', '<div class="col-20 putting">投放中</div>', 
                    '{@else if item.pass==2}', '<div class="col-20 audit refuse">拒绝</div>',
                    '{@else if item.pass==0}',  '<div class="col-20 audit">审核中</div>',
                    '{@/if}',
                    '</div>',
                    '<a href="#" class="item-link item-content">',
                    '<div class="item-media"><img src="${item.img_path}" style="width: 4rem;"></div>',
                    '<div class="item-inner">',
                    '<div class="item-title-row">',
                    '<div class="item-title">${item.title}</div></div>',
                    '<div class="item-subtitle">${item.etitle}</div>',
                    '<div class="item-after pull-right">',
                    '<span class="button button-danger confirm-ok" onclick="delTe(', "'${item.id}')", '">删除</span></div>',
                    '<div class="item-text">${item.content}</div></div></a></li>',
                 
                     '{@/each}'
             ].join('');
        },

       xinwenListTpl: function(data) {

            return ['{@each data as item}',
                        '<li onclick="pagexinwenDetail(', "'${item.id}')", '">',
                            '<a class="cont">',
                                '<img src="${item.img_path.split(",")[0]}">',
                                '<p>${item.title}</p>', 
                                '<span>${item.etitle}</span>', 
                             '</a>',
                        '</li>',
                     '{@/each}'
             ].join('');
        },

      downListTpl: function(data) {

            return ['{@each data as item}',
                           '<li onclick="pagexinwenDetail(', "'${item.id}')", '">',
                            '<a class="cont">',
                                '<img src="${item.img_path.split(",")[0]}">',
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
   

         detail: function(els,mpid,obj) {
          var data = speciality.localmessage.data();
   if(obj){
                data.city_id=obj;
             }
           
            if (debug) {
                console.log(data);
            }
        
           
            speciality.tool.ajax(speciality.config.localmessageDetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && speciality.config.constant['0003'] == d.data) {
                    $.alert(speciality.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo2(els._field,d.imgs.split(","));
                    viewInfo2(els._field,d.name);
                    viewInfo2(els._field,d.introduce);
                    mpid = $.trim(d.id);
                    speciality.MyEnterpriseDetail.query(mpid);

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
                }
               // ,{
               //      el: 'sell_pageNum',
               //      pro: 'pageNum',
               //      type: 'text'
               //  }, {
               //      el: 'sell_pageSize',
               //      pro: 'pageSize',
               //      type: 'text'
               //  }
            ];
         
           selectVal(criteriasy, data);
           // console.info(data)
           return data;

        },
       
       query: function(mpid) {
            // $.showPreloader();
            // $("#sell_pageNum").val(1);
            // $("#sell_pageSize").val(10);
           document.getElementById("local_id").value = mpid;
           var data = speciality.MyEnterpriseDetail.data();
         
          // console.info(data)
          console.log(data);
            if (debug) {
                console.log(data);

            };
            // $('#tab1 .infinite-scroll-preloader').empty();
            // $(' #tab1 .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
              
         speciality.tool.ajax(speciality.config.companydetailinfo, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && speciality.config.constant['0003'] == d.data) {
                    $.alert(speciality.config.constant['0012']);
                    $("#querychanpinList").empty();
                    // $(' #tab1 .infinite-scroll-preloader').html(tourism.config.constant['0012']); 
                } else if (d) {
             
                    var list = juicer(speciality.tpl.xinwenListTpl(), d);
                    $("#querychanpinList").html(list);
                 
                    // $(' #tab1 .infinite-scroll-preloader').empty();
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
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
            $.showPreloader();
            speciality.tool.ajax(speciality.config.Productdetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && speciality.config.constant['0003'] == d.data) {
                    $.alert(speciality.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo(els._field, d);
                    viewInfo1(d);
                    mp = $.trim(d.id);
                    speciality.adddownping.query(mp);

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

//产品详情页下方产品
     speciality.adddownping = {
        data: function() {
            var data = {};
                 var criteriasx = [
        
                {
                    el: 'product_id_huo',
                    pro: 'product_id',
                    type: 'text'
                },
      
               // ,{
               //      el: 'sell_pageNum',
               //      pro: 'pageNum',
               //      type: 'text'
               //  }, {
               //      el: 'sell_pageSize',
               //      pro: 'pageSize',
               //      type: 'text'
               //  }
            ];
           selectVal(criteriasx, data);
           console.info(data)
           return data;
        },
   
       query: function(mp) {
            // $.showPreloader();
            // $("#sell_pageNum").val(1);
            // $("#sell_pageSize").val(10);
            document.getElementById("product_id_huo").value = mp;
            var data = speciality.adddownping.data();
            if (debug) {
                //console.log("companydetail:");
                console.log(data);
            };
            // $('#tab1 .infinite-scroll-preloader').empty();
            // $(' #tab1 .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
              
         speciality.tool.ajax(speciality.config.Productdown, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && speciality.config.constant['0003'] == d.data) {
                    $.alert(speciality.config.constant['0012']);
                    $("#addList").empty();
                    // $(' #tab1 .infinite-scroll-preloader').html(tourism.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(speciality.tpl.downListTpl(), d);
                    $("#addList").html(list);
                    // $(' #tab1 .infinite-scroll-preloader').empty();
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
            $("#" + els.elid).val(id);
            $.router.load("#" + els.page);
            $.showPreloader();
            speciality.tool.ajax(speciality.config.Productdetail, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                };
                if (d && speciality.config.constant['0003'] == d.data) {
                    $.alert(speciality.config.constant['0004'], function() {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo(els._field, d);
                    viewInfo1(d);
                    
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
                },
                //  {
                //     el: 'pageNum',
                //     pro: 'pageNum',
                //     type: 'text'
                // },{
                //     el: 'PageSize',
                //     pro: 'PageSize',
                //     type: 'text'
                // },
                
               
            ];
           selectVal(criterias, data);
           console.info(data)
           return data;
        },
   
       query: function() {
            // $.showPreloader();
            // $("#sell_pageNum").val(1);
            // $("#sell_pageSize").val(10);
            var data = speciality.shenqingadd.data();
            

            if (debug) {
                //console.log("companydetail:");
                console.log(data);
            };
            // $('#tab1 .infinite-scroll-preloader').empty();
            // $(' #tab1 .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
          speciality.tool.ajax(speciality.config.companydetailinfo, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && speciality.config.constant['0003'] == d.data) {
                    $.alert(speciality.config.constant['0012']);
                    $("#applyaddList").empty();
                    // $(' #tab1 .infinite-scroll-preloader').html(tourism.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(speciality.tpl.indexListTpl(), d);
                    $("#applyaddList").html(list);
                    
                   
                    // $(' #tab1 .infinite-scroll-preloader').empty();
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
   
                //  {
                //     el: 'pageNum',
                //     pro: 'pageNum',
                //     type: 'text'
                // },{
                //     el: 'PageSize',
                //     pro: 'PageSize',
                //     type: 'text'
                // },
  
            ];
           selectVal(criteriass, data);
           console.info(data)
           return data;
        },
   
       query: function() {
            // $.showPreloader();
            // $("#sell_pageNum").val(1);
            // $("#sell_pageSize").val(10);
            var data = speciality.myshenqing.data();

            if (debug) {
                //console.log("companydetail:");
                console.log(data);
            };
            // $('#tab1 .infinite-scroll-preloader').empty();
            // $(' #tab1 .infinite-scroll-preloader').append('<div class="preloader"></div>'); 
          speciality.tool.ajax(speciality.config.Myproductapply, data, null, 'post', function(d) {
                if (debug) {
                    console.log(d);
                }
                if (d.data && speciality.config.constant['0003'] == d.data) {
                    $.alert(speciality.config.constant['0012']);
                    $("#myapplyaddList").empty();
                    // $(' #tab1 .infinite-scroll-preloader').html(tourism.config.constant['0012']); 
                } else if (d) {
                    
                    var list = juicer(speciality.tpl.indexListTpll(), d);
                    $("#myapplyaddList").html(list);
                    // $(' #tab1 .infinite-scroll-preloader').empty();
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
    var product_id=''
    $(".banji").each(function(){
    product_id = $(this).attr('id')+','
    })

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
     $(".modal-overlay").show();
})

    $(document).on("pageInit", function(e, pageId, $page){
    if(pageId == "pageIndex"){
           
           speciality.localmessage.detail(mpid);
  
        }else if(pageId == "pageDisplayManagement"){ 
          speciality.myshenqing.query();
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
        $(".modal-overlay").hide();
        });

   $("#apply").click(function() {
      $.router.load("#pageApplicationAdd");  
      speciality.shenqingadd.query();
       });

});


    $.init();
}(Zepto);

function pagexinwenDetail(id) {
 if (id) {
      elid = 'pageSpecialityDetail_id';
      page = 'pageSpecialityDetail';
     _field = 'pageSpecialityDetail_';
 }
 speciality.MyEnterpriseDetail.detail(id, {
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
//             var param = speciality.index.data();
//             // param.pageNum = pageNum;
//             // param.PageSize = 10;
//             speciality.tool.ajax(speciality.config.specialitylist, param, null, 'post', function(d) {
//                 if (debug) {
//                     console.log(d);
//                 };
//                 if (d.data && speciality.config.constant['0003'] == d.data) {
//                     $.alert(speciality.config.constant['0014']);
//                 } else if (d) {
//                     var list = juicer(speciality.tpl.indexListTpl(), d);
//                     $("#queryList").append(list);
//                 }
//             }, function(xhr, type) {
//                 $.alert(speciality.config.constant['0001']);
//             });
//             $.refreshScroller();
//         }, 500);
//     });

// }(Zepto);


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
        if (d.data && speciality.config.constant['0002'] == d.data) {
            $.alert(speciality.config.constant['0006']);
            add = 'start-fill';
            remove = 'start-line';
        } else if (d.data && speciality.config.constant['0009'] == d.data) {
            add = 'start-fill';
            remove = 'start-line';
            $.alert(speciality.config.constant['0007']);
        } else if (d.data) {
            add = 'start-line';
            remove = 'start-fill';
            $.alert(speciality.config.constant['0008']);
        }
        collectIcon($star, add, remove);
    }, function(xhr, type) {
        add = 'start-line';
        remove = 'start-fill';
        collectIcon($star, add, remove);
        $.alert(speciality.config.constant['0001']);
    });
}


function collectIcon($star, add, remove) {
    $star.removeClass(remove).addClass(add);
}


var indexquery=true; 


function delTe(id) {
    $.confirm('您确定要删除该信息吗?', function() {
        var data = {
            info_id:id,
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

