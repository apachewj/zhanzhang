window.tourism = window.tourism || {};
var baseUrl = 'http://localhost:8080';

var filedate=tourism;

var uploaddebug = true;
var test = false;


function transCityID(cityDiv) {
    $('#popup').attr('forData', $(cityDiv).attr('id'));
}

function cityLink(country) {
    var $countryLink = $(country);
    var city = $countryLink.parent().attr('city');
    $countryLink.addClass('close-popup');
    var forData = $('#popup').attr('forData');
    var select_city;
    if ($countryLink.html() == '其他') {
        select_city = city;
    } else {
        select_city = city + "." + $countryLink.html();
    }
    if (forData === 'pubCarFindPeople_cityDiv' || forData === 'pubCarFindGoods_cityDiv') {
        setDuringCity(forData, select_city);
    } else {
        $('#' + forData).find('a').html(select_city);
        $('#' + forData).find('span').html($countryLink.html());
    }
}

function clearCity() {
    var forData = $('#popup').attr('forData');
    $('#' + forData).find('a').html('城市');
    $('#' + forData).find('span').html('城市');
}

function setDuringCity(id, city) {
    var flag = false;
    $('#' + id + ' .city .col-25').each(function () {
        if ($(this).find('span').html() == city) {
            flag = true;
            return false;
        }
    });
    if (flag) {
        return;
    }
    createDuringCity(id, city);
}
function createDuringCity(id, city) {
    var str = '';
    var $city_div = $('#' + id);
    var name = id.split('_')[0] + '_citys_th';
    var rows = $('#' + id + ' .row.city');
    var lastRow = $('#' + id + ' .row.city:last-child');
    if (rows.length == 0 || lastRow.find('.col-25').length == 4) {
        str = '<div class="row city"><div class="col-25"><span name="' + name + '" class="button button-danger button-fill">' + city + '</span><div class="close-div" onclick="removeAddLable(this)"></div></div></div>';
        $('#' + id).append(str);
    } else {
        str = '<div class="col-25"><span name="' + name + '"  class="button button-danger button-fill">' + city + '</span><div class="close-div" onclick="removeAddLable(this)"></div></div>';
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
$('#findCityBtn').click(function () {
    var city = $('#cityKeyWord').val();
    var $city = $(".cityLi[city=" + city + "]");
    if ($city.length != 0) {
        $('#popup').scrollTop($city.offset().top - 30);
    }
});
function removeAddLable(lable) {
    var $close = $(lable);
    $close.parent().remove();
}

function showList(id) {
    if ($('#' + id).hasClass('showList')) {
        $('#' + id).removeClass('showList').addClass('hideList');
        $('#' + id).find('.icon').removeClass('icon-right').addClass('icon-down');
    } else if ($('#' + id).hasClass('hideList')) {
        $('#' + id).removeClass('hideList').addClass('showList');

        $('#' + id).find('.icon').removeClass('icon-down').addClass('icon-right');
    }
}

function handleFiles(obj, fileList, name) {
    startpro = 0;
    nots = 0;
    $.closeModal($('.modal'));
    var files = obj.files,
        formData = new FormData();
    for (var i = 0; i < files.length; i++) {

        formData.append("up_file", files[i]);
        var ipot = files[i].name.lastIndexOf(".");
        var type = fileType(files[i].name.substring(ipot + 1));
        $.ajax({
            type: "POST",
            url: tourism.config.uploadFile,
            data: formData,
            processData: false,
            contentType: false,
            xhr: function () {
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
            success: function (d) {
                console.log(d);
                if (d.data == 'ERROR') {
                    $.alert('图片上传失败！');
                } else if (d.data == 'parameter miss') {
                    $.alert('图片上传失败！');
                } else if (d.data) {
                    var path = test ? d.data.replace('/tourism/', '') : d.data;
                    if (type == 'image') {
                        showImgs(fileList, name, path);
                    } else if (type == 'video') {
                        showVideos(fileList, name, path);
                    }

                } else {
                    if (uploaddebug) {
                        $.alert('上传成功 路径返回错误，<br/>用于测试默认图片！');
                        showImgs(fileList, name, tourism.config.uploadDefult);
                    }
                    ;
                }
                if (nots == 1) {
                    $.hidePreloader();
                }
            },
            error: function (xhr, type) {
                if (nots == 1) {
                    $.hidePreloader();
                }
                $.alert(tourism.config.constant['0001']);
                console.log(xhr);
                if (uploaddebug) {
                    $.alert('上传失败 路径返回错误，<br/>用于测试默认图片！');
                    showImgs(fileList, name, tourism.config.uploadDefult);
                }
            }
        });
    }
    ;
}
var startpro = 0;
var nots = 0;
function onprogress(evt) {
    var loaded = evt.loaded;
    var tot = evt.total;
    var per = Math.floor(100 * loaded / tot);
    if (startpro == 0) {
        $.showPreloader('上传中...');
        startpro++;
    }
    if (loaded == tot) {
        $.hidePreloader();
    }
}

function showImgs(fileList, name, src) {
    var img = new Image();
    if (window.URL) {
        img.src = "http://localhost:8080" + src;
        img.onload = function (e) {
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
        reader.onload = function (e) {
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
    $('.close-div').click(function () {
        var $close = $(this);
        $close.parent().remove();
    });
    if (nots == 1) {
        $.hidePreloader();
    }
}


function showVideos(fileList, name, src) {
    var video = document.createElement("video");
    if (window.URL) {
        video.src = src;
        video.onload = function (e) {
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
        reader.onload = function (e) {
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
    $('.close-div').click(function () {
        var $close = $(this);
        $close.parent().remove();
    });
    if (nots == 1) {
        $.hidePreloader();
    }
}

function fileType(type) {
    type = type || '';
    type = type.toLowerCase();
    var videoType = 'flv,3gp,mpeg,avi,mp4,mov,wmv,rmvb,';
    var imgType = "jpg,jpeg,png,gif,bmp,";
    if (videoType.indexOf(type + ',') >= 0) {
        return 'video';
    }
    if (imgType.indexOf(type + ',') >= 0) {
        return 'image';
    }
    return '';
}

// 分享
$(document).on('click', '.icon-share', function () {
    var modal = $.modal({
        afterText: '<div class="share-wrap">' +
        '<div  class="row">' +
        '<div class="col-33" onclick="jiathis_mh5.sendTo(\'cqq\');">' +
        '<img src="images/share/qq.png"  style="display:block">' +
        '<div class="share-text">QQ好友</div>' +
        '</div>' +
        '<div class="col-33" onclick="jiathis_sendto(\'weixin\');">' +
        '<img src="images/share/weixin.png"  style="display:block">' +
        '<div class="share-text">微信好友</div>' +
        '</div>' +
        '<div class="col-33" onclick="jiathis_sendto(\'xiaoyou\');">' +
        '<img src="images/share/friend-circle.png"  style="display:block">' +
        '<div class="share-text">朋友网</div>' +
        '</div>' +
        '</div>' +
        '<div  class="row">' +
        '<div class="col-33" onclick="jiathis_mh5.sendTo(\'tsina\');">' +
        '<img src="images/share/weibo.png"  style="display:block">' +
        '<div class="share-text">新浪微博</div>' +
        '</div>' +
        '<div class="col-33" onclick="jiathis_sendto(\'copy\');">' +
        '<img src="images/share/copy-link.png"  style="display:block">' +
        '<div class="share-text">复制链接</div>' +
        '</div>' +
        '</div>' +
        '</div>',
        buttons: [
            {
                text: '取消'
            }
        ]
    });
});
var sildeObj = function (t, cIndex) {
    var c = t.data('count');
    var marginleft = Math.abs(parseFloat(t.css('margin-left')));
    this.toleft = function () {
        c = c == undefined ? 1 : parseInt(c) + 1;
        if (marginleft != 0) {
            this.result();
        }
        ;
    },
        this.toright = function () {
            c = c == undefined ? 0 : c;
            if ((cIndex + c) % 3 == 0 && cIndex != t.find('li').length) {
                c += -1;
                this.result();
            }

        },
        this.result = function () {
            t.css('margin-left', c * 2.1 + 'rem');
            t.data('count', c);
        }
}
var slide = function (dom, param, cIndex) {
    var obj = new sildeObj(dom, cIndex);
    param == 'left' ? obj.toleft() : obj.toright();
};
$('.close-div').click(function () {
    var $close = $(this);
    $close.addClass('hide');
    $close.siblings('img').remove();
});


//页面跳转方法
function goPageList(id) {
    $.router.load("#" + id);
}
function back(info_id) {
    $("#" + info_id).val('');
    $.router.back();
}
$(document).on('click', '.fileElem-photo', function () {
    var imgList = $(this).attr('imgList');
    var pubImg = $(this).attr('pubImg');
    var modal = $.modal({
        afterText: '<div class="files-wrap">' +
        '<div  class="row">' +
        '<div class="col-33">' +
        '<img src="images/icon/camera.png"  style="display:block">' +
        '<div class="share-text">相机</div>' +
        '<input type="file" class="fileInp fileInp-opacity" accept="image/*;capture=camera"   onchange="handleFiles(this,document.getElementById(\'' + imgList + '\'),\'' + pubImg + '\')" value="">' +
        '</div>' +
        '<div class="col-33">' +
        '<img src="images/icon/camera.png"  style="display:block">' +
        '<div class="share-text">摄像机</div>' +
        '<input type="file"  class="fileInp fileInp-opacity" multiple accept="video/*;capture=camcorder"  onchange="handleFiles(this,document.getElementById(\'' + imgList + '\'),\'' + pubImg + '\')" value="">' +
        '</div>' +
        '<div class="col-33">' +
        '<img src="images/icon/picture.png"  style="display:block">' +
        '<div class="share-text">相册</div>' +
        '<input type="file"  class="fileInp fileInp-opacity" multiple accept="image/*" onchange="handleFiles(this,document.getElementById(\'' + imgList + '\'),\'' + pubImg + '\')" value="">' +
        '</div>' +
        '</div>' +
        '</div>',
        buttons: [
            {
                text: '取消'
            }
        ]
    });
})


function getMyPosition() {
    var pt = new BMap.Point();
    var geolocation = new BMap.Geolocation();
    var geoc = new BMap.Geocoder();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            pt = r.point;
            console.info(pt);
            geoc.getLocation(pt, function (rs) {
                var addComp = rs.addressComponents;
                var xw = parseFloat(pt.lat).toFixed(6);
                var yj = parseFloat(pt.lng).toFixed(6);
                $('#location_x').val(xw);
                $('#location_y').val(yj);
            });

        }
        else {
            $.alert('failed' + this.getStatus());
        }
    }, {enableHighAccuracy: true});
}


var debug = false;

+function ($) {
    "use strict";

    window.tourism = window.tourism || {};

    var baseUrl = 'http://localhost:8080';


    tourism.config = {
        baseUrl: '',
        loginUrl: baseUrl + '/service/zhuce.html',
        pubScenic: baseUrl + '/user/travel/add_Scenic',
        pubCarFindPeople: baseUrl + '/user/travel/add_guide',
        travellist: baseUrl + '/user/travel/travel_list',
        tourismdaoDetail: baseUrl + '/user/travel/guide',
        ScenicList: baseUrl + '/user/travel/travel_list',
        scenicDetail: baseUrl + '/user/travel/scenic',
        uploadFile: baseUrl + '/uploadFile',
        storeinfo: baseUrl + '/user/store',
        reportinfo: baseUrl + '/user/report',
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
            '5002': '请输入金额',
            '5003': '请输入单位',
            '5004': '请输入详情',
            '5005': '请输入分类',
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


        }
    }
//当前点击链接是否使用路由功能的自定义过滤器,返回 false 表示不使用路由功能，返回 true 表示进入路由功能后续处理
    $.config = {

        routerFilter: function ($link) {
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

    window.tourism = window.tourism || {};
    var validator = function (data, value) {
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
                    if (!tourism.tool.validation.grea02Decimal(value)) {
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
                    if (!tourism.tool.validation.isMobile(value)) {
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
                    if (!tourism.tool.validation.digits(value)) {
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
    var validationToValue = function (arrData) {
        var data = {};
        var valu6="";
        var valu7="";
        var valu8="";
        var valu9="";
        for (var i = 0; i < arrData.length; i++) {
            var item = arrData[i];
            var value = '';
            if ('input' === item.eleType) {
                value = $("#" + item.id).val();
            } else if ('inputDate' === item.eleType) {
                value = $("#" + item.id).val();
                if (value && $.trim(value)) {
                    value = $.trim(value) + " " + $("#" + item.id + "_h").val() + ":" + $("#" + item.id + "_m").val() + ":00";
                }
            } else if ('btnRound' === item.eleType) {
                var round = $("span[name='" + item.id + "'][check='true']");
                if (round.length != 0) {
                    if (round.length == 2) {
                        value = 3;
                    } else {
                        value = $(round).attr('data-pub');
                    }
                } else {
                    value = 4;
                }
            } else if ('requireDanger' === item.eleType) {
                var confs = $("span[name='" + item.id + "'][check='true']");
                $.each(confs, function (i, e) {
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
                $.each(confs, function (i, e) {
                    if (i == 0) {
                        value = $(e).attr('data-tags');
                    } else {
                        value += "," + $(e).attr('data-tags');
                    }
                });
                if (debug) {
                    console.log(value);
                }
            } else if ('places' === item.eleType) {
                //var places = $("span[name='" + item.id + "']");
          
               value += "," +  $("#" + item.id).val();

              
            }else if ('img' === item.eleType) {
                var imgs = $("img[name='" + item.id + "']");
                $.each(imgs, function (i, e) {
                    if (value == '') {
                        value = $(e).attr('src');
                    } else {
                        value += "," + $(e).attr('src');
                    }
                });
                var videos = $("video[name='" + item.id + "']");
                $.each(videos, function (i, e) {
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
                $.each($("span[name='" + item.id + "']"), function (i, e) {
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
            } else if ('txtCarImg'=== item.eleType) {
                value=$("#" + item.id).find('img').attr("src");
            }else if('inputcontext' === item.eleType) {
            valu6= valu6 + "," +$("#" + item.id).val();
             value=valu6;
         }else if ('txtCarImg1'=== item.eleType) {
             valu7=valu7 + "," + $("#" + item.id).find('img').attr("src");
             value=valu7;

         }else if('inputcontext1' === item.eleType) {
            valu8= valu8 + "," +$("#" + item.id).val();
             value=valu8;
         }else if('inputcontext2' === item.eleType) {
            valu9= valu9 + "," +$("#" + item.id).val();
             value=valu9;
         }
            if (!validator(item, value)) {
                return false;
            }
            data[item.pro] = $.trim(value);
        }
        ;
        return data;
    };
    var viewInit = function (_m, data) {
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
                    $.each(imgs, function (i, e) {
                        var ipot = e.lastIndexOf(".");
                        var type = fileType(e.substring(ipot + 1));
                        if (type == 'image') {
                            showImgs(list, "" + _m + key, e);
                        } else if (type == 'video') {
                            showVideos(list, "" + _m + key, e);
                        }
                    });
                }
            } else if (eleType === 'requireDanger') {
                var confs = value.split(',');
                if (confs && confs.length > 0 && confs[0] != '') {
                    $("span[name='" + _m + key + "'][check='true']")
                        .attr('check', false)
                        .removeClass('button-danger')
                        .addClass('button-disable');
                    $.each(confs, function (i, e) {
                        $("span[name='" + _m + key + "'][data-require='" + e + "']")
                            .attr('check', true)
                            .removeClass('button-disable')
                            .addClass('button-danger');
                    });
                }
                ;
            } else if (eleType === 'tagsDanger') {
                var confs = value.split(',');
                if (confs && confs.length > 0 && confs[0] != '') {
                    $("span[name='" + _m + key + "'][check='true']")
                        .attr('check', false)
                        .removeClass('button-danger')
                        .addClass('button-disable');
                    $.each(confs, function (i, e) {
                        $("span[name='" + _m + key + "'][data-tags='" + e + "']")
                            .attr('check', true)
                            .removeClass('button-disable')
                            .addClass('button-danger');
                    });
                }
                ;
            } else if (eleType === 'city') {
                $(el).find('a').text(value);
            } else if ('citys_th' === eleType) {
                var pId = (_m + key).split('_')[0] + '_cityDiv';
                $('#' + pId).empty();
                if (value) {
                    var citys = value.split(',');
                    for (var i = 0; i < citys.length; i++) {
                        createDuringCity(pId, citys[i]);
                    }
                }

            } else if (eleType === 'btnRound') {
                $("input[name='" + _m + key + "']").attr('check', false).removeClass('button-fill');
                if (value == '3') {
                    $("span[name='" + _m + key + "'][data-pub='1']").attr('check', true)
                        .addClass('button-fill');
                    $("span[name='" + _m + key + "'][data-pub='2']").attr('check', true)
                        .addClass('button-fill');
                } else if (value == '1' || value == '2') {
                    $("span[name='" + _m + key + "'][data-pub='" + value + "']").attr('check', true)
                        .addClass('button-fill');
                }
            }
        }
    };


    var viewInfo = function (_m, data) {
        //景区详情
        var html = [];

        for (var i = 0; i < data.length; i++) {

            html.push('<img src="' + data.main_img + '" alt="" style="width: 100%" >')

        }
        var list = $('#ScenicDetail_main_img_List');

        list.empty();

        if (html.length > 0) {
            list.html(html.join(''));
        }


        var html = [];
        for(var i=0;i < data.contexts.length;i++ ) {
        for(var j=0;j<data.contexts[i].img_path.split(',').length;j++){

        html.push('<img src="' + data.contexts[i].img_path.split(',')[j] + '" alt="" style="width: 100%" >'+data.contexts[i].content.split(',')[j]+'')
        } 
        }
        var list = $('#ScenicDetail_c_imgage');

        list.empty();

        if (html.length > 0) {
            list.html(html.join(''));
        }


        var html = [];

        for (var i = 0; i < data.links.length; i++) {

            html.push('<li><a href="' + data.links[i].url + '">' + data.links[i].content + '</a></li>')

        }
        var list = $('#ScenicDetail_url');

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
            } else if (eleType === 'img') {
                var imgs = value.split(',');
                if (imgs && imgs.length > 0 && imgs[0] != '') {
                    var list = $('#' + _m + key + '_List');
                    list.empty();
                    var html = [];
                    $.each(imgs, function (i, e) {
                        var ipot = e.lastIndexOf(".");
                        var type = fileType(e.substring(ipot + 1));
                        if (type == 'image') {
                            html.push('<img src="' + e + '" alt="" style="width: 100%" >')
                        } else if (type == 'video') {
                            html.push('<div class="swiper-slide"><video src="' + e + '" width="100%" controls="controls"></video></div>')
                        }
                    });
                    if (html.length > 0) {
                        list.html(html.join(''));
                    }
                }
            }
        }
    };
    var viewInfo1 = function (_m, data) {
        //陪游详情

        var html = [];
        var html2 = [];


        for(var i=0;i < data.guide_info.length;i++ ) {
          for(var j=0;j<data.guide_info[i].img_path.split(',').length;j++){
          html.push('<img src="' + data.guide_info[i].img_path.split(',')[j] + '" alt="" style="width: 100%" >')
          html2.push(data.guide_info[i].content.split(',')[0])
        } 
        }
        var list = $('#pageyoudetailes_c_image_List');
        var list2 = $('#pageyoudetailes_content');
        list.empty();
        list2.empty();
        if (html.length > 0) {
            list.html(html.join(''));
            list2.html(html2.join(''));
            $("#dao_ju_tu").show();
            $("#dao_cang_tu").show();
            $("#dao_ju").hide();
            $("#dao_cang").hide();
        } else {
            $("#dao_ju_tu").hide();
            $("#dao_cang_tu").hide();
            $(".swiper-container").hide()
            $("#dao_ju").show();
            $("#dao_cang").show();


        }
        ;

        var html = [];
        var html2 = [];
        for (var i = 0; i < data.place_info.length; i++) {

            html.push('<div class="swiper-slide"><img src="' + data.place_info[i].img_path + '" alt="" style="width: 100%" ></div>')
            html2.push(data.place_info[i].content)
        }
        var list = $('');
        var list2 = $('');
        list.empty();
        list2.empty();
        if (html.length > 0) {
            list.html(html.join(''));
            list2.html(html2.join(''));
        }


        for (var key in data) {
            var el = $("#" + _m + key);
            var el1 = $("[name='" + _m + key + "']");
            var eleType = $(el).attr('eleType');
            var value = $.trim(data[key]);
            if (eleType === 'text' || !eleType) {
                $(el1).html(value);
            }
            if (eleType === 'input' || !eleType) {
                $(el).html(value);


            } else if (eleType === 'img') {
                var imgs = value.split(',');
                if (imgs && imgs.length > 0 && imgs[0] != '') {
                    var list = $('#' + _m + key + '_List');
                    list.empty();
                    var html = [];
                    $.each(imgs, function (i, e) {
                        var ipot = e.lastIndexOf(".");
                        var type = fileType(e.substring(ipot + 1));
                        if (type == 'image') {
                            html.push('<img src="' + e + '" alt="" style="width: 100%" >')
                        } else if (type == 'video') {
                            html.push('<div class="swiper-slide"><video src="' + e + '" width="100%" controls="controls"></video></div>')
                        }
                    });
                    if (html.length > 0) {
                        list.html(html.join(''));
                    }
                }
            } else if (eleType === 'requireDanger') {
                var requires = value.split(',');
                var rqh = [];
                for (var i = 0; i < requires.length; i++) {
                    if (i % 4 == 0) {
                        rqh.push('<div class="row">');
                    }
                    rqh.push('<div class="col-25"><span name="carFindPeople_require" data-require="' + requires[i] + '"  class="button button-danger" >' + getRequire(requires[i]) + '</span> </div>');
                    if ((i + 1) % 4 == 0) {
                        rqh.push('</div>');
                    }
                }
                $(el).html(rqh.join(''));
            }else if (eleType === 'telVew') {
                $(el).html(value);
                $("#" + _m + "tel").attr('href', 'tel:' + value);
                $("#" + _m + "sms").attr('href', 'sms:' + value);
            }

        }
        if ($('#pageyoudetailes_sex').html() == 1) {
            $('#pageyoudetailes_sex').html("男");
        } else if ($('#pageyoudetailes_sex').html() == 2) {
            $('#pageyoudetailes_sex').html("女");
        }
        ;
        if ($('#pageyoudetailes_user_status').html() == 1) {
            $('#pageyoudetailes_user_status').html("空闲");
        } else if ($('#pageyoudetailes_user_status').html() == 2) {
            $('#pageyoudetailes_user_status').html("忙碌");
        }
        ;
        if ($("#you_car_c").val() == 1) {
            $(".car_message").show();
        } else if ($("#you_car_c").val() == 2) {
            $(".car_message").hide();
        }
        ;
        //  if(data.guide_info.length<0){
        //    $("#dao_ju_tu").hide();
        //    $("#dao_cang_tu").hide();
        //    $(".swiper-container").hide()
        //    $("#dao_ju").show();
        //    $("#dao_cang").show();

        //  }else{

        // };
    };

    var selectVal = function (els, data) {
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
                if (round.length != 0) {
                    if (round.length == 2) {
                        data[els[i].pro] = 3;
                    } else {
                        data[els[i].pro] = round.attr('data-pub');
                    }
                } else {
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

    tourism.tpl = {
        indexListTpl: function (data) {

            return ['{@each data as item}',
                '<li class="situation-box" >',
                '<div class="situation-box-item" >',
                '<a href="./tourism.html?id=${item.id}#pageScenicDetail" class="click-point">',
                '{@if item.main_img}', '<img src="${item.main_img}" style="display: inline-block;"/>',
                '{@else if !item.main_img}','',
                '{@/if}',
                '<div class="tab_content">',
                '<h3>${item.title}</h3>',
                '<span>${item.content.split(",")[0]}</span>',
                '</div>',
                '</a>',
                '<div class="ptimg" onclick="showMap(', "'${item.location_x}','${item.location_y}')", '"><img src="images/tong_btn_dwtz.png"/></div>',
                '</div>',
                '</li>',
                '{@/each}'
            ].join('');
        },

        indexyouListTpl: function (data) {
            return ['{@each data as item}',
                '<li class="situation-box"> ',
                '<div class="situation-box-item">',
                '<a href="./tourism.html?id=${item.id}#pageyoudetailes" class="click-point" >',
                '{@if item.img_path}',  '<img  id="tttu" src="${item.img_path.split(",")[0]}" />',
                '{@else if !item.img_path}','',
                '{@/if}',
                '<div class="tab2_content"><div>',
                '<div class="col-20">${item.username}</div>',
                '<div class="col-20">',
                '{@if item.sex==1}', '男',
                '{@else if item.sex==2}', '女',
                '{@/if}', '</div>',
                '<div class="col-20">${item.age}岁</div>',
                '</div>',
                '<div>',
                '<div class="col-60">${item.price}/天</div>',
                '<div class="col-60">${item.hours}小时</div>',
                '</div>',
                '<span>${item.content.split(",")[0]}</span>',
                '</div>',
                '{@if item.user_status==1}', '<div class="you_status"> 空闲</div>',
                '{@else if item.user_status==2}', '<div class="you_status1">忙碌</div>',
                '{@/if}',
                '{@if item.car_c==1}', '<div class="addcar">车+导</div>',
                '{@else if item.car_c==2}', ,
                '{@/if}',
                '</a></div></li>',
                '{@/each}'
            ].join('');

        },
    };

    tourism.tool = {
        ajax: function (url, data, context, type, delegate, error) {
            // data.ajax = 'gongnengji';
            var setting = {
                data: data,
                type: type,
                dataType: 'json',
                url: url,
                cache: false,
                success: function (d) {
                    if (d && d.data && d.data == 'no login') {
                        location.href = tourism.config.loginUrl;
                    } else {
                        delegate(d);
                    }
                },
                error: function (xhr, type) {
                    error(xhr, type);
                }
            };
            if (context) {
                setting.context = context;
            }
            $.ajax(setting);
        },
        validation: {
            isMobile: function (data) {
                if (!data || data === '') {
                    return true;
                }
                return /^\d{11}$/.test(data);
            },
            isPassword: function (data) {
                if (!data || data === '') {
                    return true;
                }
                return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,20}$/.test(data);
            },
            digits: function (data) {
                if (!data || data === '') {
                    return true;
                }
                return /^\d+$/.test(data);
            },
            integer: function (data) {
                if (!data || data === '') {
                    return true;
                }
                return /^(?:-?(?:0|[1-9][0-9]*))$/.test(data);
            },
            numeric: function (data) {
                if (!data || data === '') {
                    return true;
                }
                return !isNaN(parseFloat(data)) && isFinite(data);
            },
            grea02Decimal: function (data) {
                if (!data || data === '') {
                    return true;
                }
                return /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(data);
            }
        },
        currentPosition: {
            error: function (error) {
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
            updatePosition: function (position) {
                position.latitudeP = position.coords.latitude, /*纬度*/
                    position.longitudeP = position.coords.longitude, /*经度*/
                    position.accuracyP = position.coords.accuracy;
                /*准确度*/
            },
            getPosition: function () {
                if (navigator.geolocation) {
                    navigator.geolocation.watchPosition(tourism.tool.currentPosition.updatePosition,
                        tourism.tool.currentPosition.error);
                } else {
                    $.toast("浏览器无法获取您的位置信息！");
                }
            }
        }
    };

    tourism.index = {
        data: function () {
            var data = {};
            var criterias = [

                {
                    el: 'type',
                    pro: 'type',
                    type: 'btnRound'
                }, {
                    el: 'sell_param',
                    pro: 'params',
                    type: 'text'
                }, {
                    el: 'rent_pageNum',
                    pro: 'pageNum',
                    type: 'text'
                }, {
                    el: 'rent_pageSize',
                    pro: 'pageSize',
                    type: 'text'
                }, {
                    el: 'select_city2',
                    pro: 'city_id',
                    type: 'text'
                }, {
                    el: 'select_area2',
                    pro: 'county_id',
                    type: 'text'
                }
            ];
            selectVal(criterias, data);
            console.info(data)
            return data;
        },

        query: function (obj) {
            // $.showPreloader();
            var data = tourism.index.data();
            if (obj) {
                data.city_id = obj;

            }
            if (debug) {
                console.log("index:");
                console.log(data);
            };
           
            if (1 == data.type) {
            data.pageNum=1;
            data.PageSize = 10;
            $("#tab1 .infinite-scroll-preloader").empty();
            $("#tab1 .infinite-scroll-preloader").append('<div class="preloader"></div>');
            tourism.tool.ajax(tourism.config.ScenicList, data, null, 'post', function (d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && tourism.config.constant['0003'] == d.data) {
                        $.alert(tourism.config.constant['0012']);
                        $("#queryList").empty();
                        $('#tab1 .infinite-scroll-preloader').html(tourism.config.constant['0012']);
                    } else if (d) {

                        var list = juicer(tourism.tpl.indexListTpl(), d);
                        $("#queryList").html(list);
                        $('#tab1 .infinite-scroll-preloader').empty();
                    }
                    $.hidePreloader();

                }, function (xhr, type) {
                    $(' #tab1 .infinite-scroll-preloader').html(tourism.config.constant['0001']);
                    $.alert(tourism.config.constant['0001']);
                    // $('.infinite-scroll-preloader').eq(0).hide();
                });
            } else if (2 == data.type) {
                data.pageNum=1;
                data.PageSize = 10;
                $("#tab2 .infinite-scroll-preloader").empty();
                $("#tab2 .infinite-scroll-preloader").append('<div class="preloader"></div>'); 
                tourism.tool.ajax(tourism.config.travellist, data, null, 'post', function (d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && tourism.config.constant['0003'] == d.data) {
                        $.alert(tourism.config.constant['0012']);
                        $("#queryNeedList").empty();
                        $('#tab2 .infinite-scroll-preloader').html(tourism.config.constant['0012']);
                    } else if (d) {
                        // var page = d.data.page;
                        var list = juicer(tourism.tpl.indexyouListTpl(), d);
                        $("#queryNeedList").html(list);
                        $('#tab2 .infinite-scroll-preloader').empty();
                    }
                    $.hidePreloader();
                    // timer();
                }, function (xhr, type) {
                    $("#tab2.infinite-scroll-preloader").html(tourism.config.constant['0001']);
                    $.hidePreloader();
                });
            }
        },
        detail: function (id) {
            var data = {
                info_id: id,

            };
            if (debug) {
                console.log(data);
            }
            $("#ScenicDetail_id").val(id);
            // $.showPreloader();
            tourism.tool.ajax(tourism.config.scenicDetail, data, null, 'post', function (d) {
                if (debug) {
                    console.log(d);
                }
                ;
                if (d && tourism.config.constant['0003'] == d.data) {
                    $.alert(tourism.config.constant['0004'], function () {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo('ScenicDetail_', d);

                    // var checkH=$.trim($("#checkH").val());
                    // if (checkH) {
                    //     historyWatch(id, type);
                    // };
                }
                $.hidePreloader();
            }, function (xhr, type) {
                $.toast(tourism.config.constant['0001'], function () {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },
        youdetail: function (id) {
            var data = {
                info_id: id,

            };
            if (debug) {
                console.log(data);
            }
            $("#pageyoudetailes_id").val(id);
             // $.showPreloader();
            tourism.tool.ajax(tourism.config.tourismdaoDetail, data, null, 'post', function (d) {
                if (debug) {
                    console.log(d);
                }
                ;
                if (d && tourism.config.constant['0003'] == d.data) {
                    $.alert(tourism.config.constant['0004'], function () {
                        $.router.back();
                    });
                } else if (d) {
                    viewInfo1('pageyoudetailes_', d);

                }
                $.hidePreloader();
            }, function (xhr, type) {
                $.toast(tourism.config.constant['0001'], function () {
                    $.router.back();
                });
                $.hidePreloader();
            });
        },

        init: function () {
            tourism.index.query();
        }
    };


    //发布景区
    tourism.pubScenic = {
        data: function () {
            var pubScenicdatas = [{

                id: 'pubScenic_main_img',
                pro: 'main_img',
                eleType: 'txtCarImg',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }, {
                id: 'pubScenic_title',
                pro: 'title',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': tourism.config.constant['5001']
                    }
                }
            }, {
                id: 'pubScenic_show_status',
                pro: 'show_status',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }, {
                id: 'select_city',
                pro: 'city_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': tourism.config.constant['6002']
                    }
                }
            }, {
                id: 'select_area',
                pro: 'county_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': tourism.config.constant['6001']
                    }
                }
            }, {
                id: 'select_province',
                pro: 'province_id',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': true,
                        'msg': tourism.config.constant['6003']
                    }
                }
            }, {
                id: 'pubScenic_location_x',
                pro: 'location_x',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }, {
                id: 'pubScenic_location_y',
                pro: 'location_y',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }

            }, {
                id: 'pubScenic_c_image',
                pro: 'c_image',
                eleType: 'txtCarImg1',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }, {
                id: 'pubScenic_c_context',
                pro: 'c_context',
                eleType: 'inputcontext',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }

            }, {
                id: 'pubScenic_c_url',
                pro: 'c_url',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }, {
                id: 'pubScenic_url_content',
                pro: 'url_content',
                eleType: 'input',
                valids: {
                    'require': {
                        'is': false,
                        'msg': ''
                    }
                }
            }
            ];

            var sc2=$('.sc-10').find('textarea').size();
               console.info(sc2);
                     for(var m=1;m<sc2+1;m++){
                     var s2=[
                          {
                     id: 'pubScenic_c_image'+m,
                     pro: 'c_image',
                     eleType: 'txtCarImg1',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'pubScenic_c_context'+m,
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
            return validationToValue(pubScenicdatas);
        },
        submit: function (status) {
            var data = tourism.pubScenic.data();
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
                data2['c_image'] = data2['c_image'].substring(1);
                data2['c_context'] = data2['c_context'].substring(1);

                tourism.tool.ajax(tourism.config.pubScenic, data2, null, 'post', function (d) {
                    if (debug) {
                        console.log(d);
                    }

                    if (d.data && tourism.config.constant['0002'] == d.data) {
                        $.alert(tourism.config.constant['0004'], function () {
                            $.router.load("#pagePostChoose");
                        });
                    } else if (d.data) {
                        $.alert(tourism.config.constant['0005']);
                    }
                }, function (xhr, type) {
                    $.alert(tourism.config.constant['0001']);
                });
            }
        },


        init: function () {
            var id = $("#pubScenic_id").val();
            // if (id) {
            //     tourism.pubZPeopleService.eidt(id);
            // }
        }
    };


    //发布陪游
    tourism.pubCarFindPeople = {
        data: function () {
            var pubCarFindPeopledatas = [
                {
                    id: 'tu_wen',
                    pro: 'c_image',
                    eleType: 'txtCarImg1',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_shuoming',
                    pro: 'c_context',
                    eleType: 'inputcontext',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'link_name',
                    pro: 'username',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7003']
                        }
                    }
                }, {
                    id: 'you_age',
                    pro: 'age',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7004']
                        }
                    }
                }, {
                    id: 'sex',
                    pro: 'sex',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7005']
                        }
                    }
                }, {
                    id: 'you_price',
                    pro: 'price',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7006']
                        }
                    }
                }, {
                    id: 'you_telephone',
                    pro: 'telephone',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7007']
                        },
                        'isMobile': {
                            'is': true,
                            'msg': tourism.config.constant['4001']
                        }
                    }
                }, {
                    id: 'you_hours',
                    pro: 'hours',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7008']
                        }
                    }
                }, {
                    id: 'pubRent_configure',
                    pro: 'configure',
                    eleType: 'requireDanger',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7009']
                        }
                    }
                }, {
                    id: 'you_citys_th',
                    pro: 'place',
                    eleType: 'places',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': tourism.config.constant['7010']
                        }
                    }
                }, {
                    id: 'jing_img',
                    pro: 'place_img',
                    eleType: 'txtCarImg1',
                    valids: {
                        'require': {
                            'is': false,
                            'msg':''
                        }
                    }
                }, {
                    id: 'you_place_context',
                    pro: 'place_context',
                    eleType: 'inputcontext1',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'car_img',
                    pro: 'car_img',
                    eleType: 'txtCarImg1',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_car_context',
                    pro: 'car_context',
                    eleType: 'inputcontext2',
                    valids: {
                        'require': {
                            'is': false,
                            'msg':''
                        }
                    }
                }, {
                    id: 'you_brand',
                    pro: 'brand',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_category',
                    pro: 'category',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_car_price',
                    pro: 'car_price',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_car_hours',
                    pro: 'car_hours',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg':''
                        }
                    }
                }, {
                    id: 'you_message',
                    pro: 'message',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'select_province3',
                    pro: 'province_id',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7020']
                        }
                    }
                }, {
                    id: 'select_city3',
                    pro: 'city_id',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7021']
                        }
                    }
                }, {
                    id: 'select_area3',
                    pro: 'county_id',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7022']
                        }
                    }
                }, {
                    id: 'pubZPeopleService_location_x',
                    pro: 'location_x',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'pubZPeopleService_location_y',
                    pro: 'location_y',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': false,
                            'msg': ''
                        }
                    }
                }, {
                    id: 'you_car_c',
                    pro: 'car_c',
                    eleType: 'input',
                    valids: {
                        'require': {
                            'is': true,
                            'msg': tourism.config.constant['7023']
                        }
                    }
                }]; 

            var sc3=$('.sc-11').find('textarea').size();
               console.info(sc3);
                     for(var x=1;x<sc3+1;x++){
                     var s3=[
                          {

                     id: 'tu_wen'+x,
                     pro: 'c_image',
                     eleType: 'txtCarImg1',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'you_shuoming'+x,
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
                 pubCarFindPeopledatas=pubCarFindPeopledatas.concat(s3);
            }

            var sc4=$('.sc-12').find('textarea').size();
               console.info(sc4);
                     for(var y=1;y<sc4+1;y++){
                     var s4=[
                          {
                     id: 'jing_img'+y,
                     pro: 'place_img',
                     eleType: 'txtCarImg1',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'you_place_context'+y,
                     pro: 'place_context',
                     eleType: 'inputcontext',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 }
             ];
                 pubCarFindPeopledatas=pubCarFindPeopledatas.concat(s4);
            }

              var sc5=$('.sc-13').find('textarea').size();
               console.info(sc5);
                     for(var z=1;z<sc5+1;z++){
                     var s5=[
                          {
                     id: 'car_img'+z,
                     pro: 'car_img',
                     eleType: 'txtCarImg1',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 },{
                     id: 'you_car_context'+z,
                     pro: 'car_context',
                     eleType: 'inputcontext',
                     valids: {
                         'require': {
                             'is': false,
                             'msg': ''
                         }
                     }
                 }
             ];
                 pubCarFindPeopledatas=pubCarFindPeopledatas.concat(s5);
            }


            return validationToValue(pubCarFindPeopledatas);
        },
        submit: function (status) {
            var data = tourism.pubCarFindPeople.data();
            if (debug) {
                console.log('pubCarFindPeople validation ' + '--> ');
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
                data2['c_image'] = data2['c_image'].substring(1);
                data2['c_context'] = data2['c_context'].substring(1);
                data2['place_img'] = data2['place_img'].substring(1);
                data2['place_context'] = data2['place_context'].substring(1);
                data2['car_img'] = data2['car_img'].substring(1);
                data2['car_context'] = data2['car_context'].substring(1);

                tourism.tool.ajax(tourism.config.pubCarFindPeople, data2, null, 'post', function (d) {
                    if (debug) {
                        console.log(d);
                    }
                    if (d.data && tourism.config.constant['0002'] == d.data) {
                        $.alert(tourism.config.constant['0004'], function () {
                            $.router.load("#pagePostChoose");
                        });
                    } else if (d.data) {
                        $.alert(tourism.config.constant['0005']);
                    }
                }, function (xhr, type) {
                    $.alert(tourism.config.constant['0001']);
                });
            }
        },

        init: function () {
            var id = $("#pubCarFindPeople_id").val();
            // if (id) {
            //     tourism.pubCarFindPeople.eidt(id);
            // }
        }
    };
  
    $(document).on("pageInit", function(e, pageId, $page) {
                var url = location.search; //获取url中"?"符后的字串
                var strs = url.substr(1);
                var id=strs.split("=")[1];
             

        if (pageId == "pageIndex") {
            // tourism.index.query();
          if(!id){
          tourism.index.query();
         }

        } else if (pageId == "pageMyCollection") {
            tourism.myCollection.init();
        }else if(pageId == "pageScenicDetail"){
            tourism.index.detail(id); 
        }else if(pageId == "pageyoudetailes"){
            tourism.index.youdetail(id); 
        }
    });
$.init();

    $(function () {

        $("#btnPubScenic").click(function () {
            var id = $("#pubScenic_id").val();
            tourism.pubScenic.submit(1);
        });
        $("#btnSaveScenic").click(function () {
            var id = $("#pubScenic_id").val();
            tourism.pubScenic.submit(3);
        });
        $("#btnyousave").click(function () {
            var id = $("#pubZPeopleService_id").val();
            tourism.pubCarFindPeople.submit(3);
        });
        $("#btnyoufabu").click(function () {
            var id = $("#pubZPeopleService_id").val();
            tourism.pubCarFindPeople.submit(1);
        });
        $("#btnQuery").click(function () {
            tourism.index.query();
        });
        // $("#shouccang").click(function() {
        //         tourism.myCollection.query();
        //     });
        $("#service_c").click(function () {
            $("#service_c").attr("check", true);
            $("#need_c").attr("check", false);
            tourism.index.query();
        });
        $("#need_c").click(function () {
            $("#service_c").attr("check", false);
            $("#need_c").attr("check", true);
            tourism.index.query();
        });
        try {
            juicer.register('itemIcon', itemIcon);
            juicer.register('pubItemIcon', pubItemIcon);
        } catch (e) {
            console.log(e);
        }
    });

});


// function pageDetail(id) {
//     if (id) {
//         elid = 'ScenicDetail_id';
//         page = 'pageScenicDetail';
//         _field = 'ScenicDetail_';
//     }
//     tourism.index.detail(id, {
//         'elid': elid,
//         'page': page,
//         '_field': _field
//     });
// }

// function pageyouDetail(id) {
//     if (id) {
//         elid = 'pageyoudetailes_id';
//         page = 'pageyoudetailes';
//         _field = 'pageyoudetailes_';
//     }
//     tourism.index.youdetail(id, {
//         'elid': elid,
//         'page': page,
//         '_field': _field
//     });
// }

    var loading = false;
    $(document).on('infinite', function () {
     
     if (loading) return;

    if($(this).find('.infinite-scroll.active').attr('id') == "tab1"){
            if (loading||$("#queryList li").length<10) {
                      console.info($("#queryList li").length)
                 return
            }

        setTimeout(function () {
              loading = true;

            var pageNum = $("#rent_pageNum").val();
            if (pageNum == 1) {
                $('#tab1 .infinite-scroll-preloader').append('<div class="preloader"></div>');
            }
            $("#rent_pageNum").val(++pageNum);
            var param = tourism.index.data();
            param.pageNum = pageNum;
            param.PageSize = 10;
            tourism.tool.ajax(tourism.config.travellist, param, null, 'post', function (d) {
                if (debug) {
                    console.log(d);
                }
                ;
                if (d.data && tourism.config.constant['0003'] == d.data) {
                    $.alert(tourism.config.constant['0014']);
                    $("#tab1 .infinite-scroll-preloader").empty();
                } else if (d) {
                    var list = juicer(tourism.tpl.indexListTpl(), d);
                    $("#queryList").append(list);
                    $("#tab1 .infinite-scroll-preloader").empty();
                }
            }, function (xhr, type) {
                $.alert(tourism.config.constant['0001']);
                 $("#tab1 .infinite-scroll-preloader").empty();
            });
            $.refreshScroller();
        }, 500);
    }

   if($(this).find('.infinite-scroll .active').attr('id') == "tab2"){

    
        if (loading || $("#queryNeedList li").length < 10) {
              console.info($("#queryNeedList li").length)
                 return
        }


        setTimeout(function () {
            loading = true;
            var pageNum = $("#sell_pageNum").val();
            if (pageNum == 1) {
                $('#tab2 .infinite-scroll-preloader').append('<div class="preloader"></div>');
            }
            $("#sell_pageNum").val(++pageNum);
            var param = tourism.index.data();
            param.pageNum = pageNum;
            param.PageSize = 10;
            tourism.tool.ajax(tourism.config.travellist, param, null, 'post', function (d) {
                if (debug) {
                    console.log(d);
                }
                ;
                if (d.data && tourism.config.constant['0003'] == d.data) {
                    $.alert(tourism.config.constant['0014']);
                    $("#tab2 .infinite-scroll-preloader").empty();
                } else if (d) {
                    var list = juicer(tourism.tpl.indexListTpl(), d);
                    $("#queryNeedList").append(list);
                    $("#tab2 .infinite-scroll-preloader").empty();
                }
            }, function (xhr, type) {
                $.alert(tourism.config.constant['0001']);
                $("#tab2 .infinite-scroll-preloader").empty();
            });
            $.refreshScroller();
        }, 500);
    }
    });



var itemIcon = function (item) {
    var icon = getRequires(item.info_type, item.require);
    icon += getPriceType(item.info_type, item.price_type);
    icon += getSex(item.sex);
    return icon;
}

var pubItemIcon = function (item) {
    var icon = '';
    icon += '<span class="icon pos-r rup-icon" onclick="rupPublish(' + item.type + ',' + item.id + ')"></span>';
    icon += '<a class="icon icon-share pos-share alert-text" style="margin-right: 0.2rem;"></a>';
    icon += getPriceType(item.type, item.price_type);
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
    tourism.tool.ajax(tourism.config.storeinfo, data, null, 'post', function (d) {
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
        $.alert(tourism.config.constant['0001']);
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
    tourism.tool.ajax(tourism.config.reportinfo, data, null, 'post', function (d) {
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
    },function(xhr, type) {
        add = 'jbstart-line';
        remove = 'jbstart-fill';
        reportIcon($star, add, remove);
        $.alert(tourism.config.constant['0001']);
    });
}

function historyWatch(info_id, info_type,panduan) {
    var data = {
        'info_id': info_id,
        'info_type': info_type
    }
      tourism.tool.ajax(tourism.config.isreport, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && tourism.config.constant['0003'] == d.data) {
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
                $.toast(tourism.config.constant['0001'], function() {
                    $.router.back();
                });
                $.hidePreloader();
            });


             tourism.tool.ajax(tourism.config.isstore, data, null, 'post', function(d) {

                if (debug) {
                    console.log(d);
                };
                if (d && tourism.config.constant['0003'] == d.data) {
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
                $.toast(tourism.config.constant['0001'], function() {
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


var indexquery = true;


function getRequire(type) {
    if (1 == type) {
        return '需出门票';
    } else if (2 == type) {
        return '过路停车费';
    } else if (3 == type) {
        return '需提供早餐';
    } else if (4 == type) {
        return '需提供中餐';
    } else if (5 == type) {
        return '需提供晚餐';
    } else if (6 == type) {
        return '车内禁吸烟';
    } else if (7 == type) {
        return '禁止醉酒';
    } else if (8 == type) {
        return '无强制消耗';
    }
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

