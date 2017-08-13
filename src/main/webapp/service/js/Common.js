window.URL = window.URL || window.webkitURL;

var uploaddebug =true;


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
                url: filedate.config.uploadFile,
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
                        var path=test?d.data.replace('/filedate/',''):d.data; 
                        if (type=='image') {
                            showImgs(fileList, name, path);
                        } else if(type=='video'){
                            showVideos(fileList, name, path);
                        }
                      
                        
                    } else {
                        if (uploaddebug) {
                            $.alert('上传成功 路径返回错误，<br/>用于测试默认图片！');
                            showImgs(fileList, name, filedate.config.uploadDefult);
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
                    $.alert(filedate.config.constant['0001']);
                    console.log(xhr);
                    if (uploaddebug) {
                        $.alert('上传失败 路径返回错误，<br/>用于测试默认图片！');
                        showImgs(fileList, name, filedate.config.uploadDefult);
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
        img.src =  src;
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
}var url = location.href;


// function tiaoz(id){
//      
//    var ref = "#"+id;

//     var str = "";
//     if (url.indexOf('?') != -1){
//         str = url.substr(0,url.indexOf('?'));
//     }
  
//   str=str+ref;
//   location.href=str;

// }

$(document).on('click','.fileElem-photo', function () { 
    var imgList = $(this).attr('imgList');
    var pubImg = $(this).attr('pubImg');
    var modal = $.modal({
        afterText: '<div class="files-wrap">'+
                    '<div  class="row">'+
                        '<div class="col-50">'+
                            '<img src="images/icon/camera.png"  style="display:block">' +
                            '<div class="share-text">相机</div>'+
                            '<input type="file" class="fileInp fileInp-opacity" accept="image/*;capture=camera"   onchange="handleFiles(this,document.getElementById(\''+imgList+'\'),\''+pubImg+'\')" value="">'+
                        '</div>'+
                
                        '<div class="col-50">'+
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



// 地图

    function showMap(wdId, jdId,type,obj) {
  
        if(type){
           var wdId=$('#'+wdId).val();
            var jdId=$('#'+jdId).val();

       }else if(!type && !obj){
       event.preventDefault();

        }else if(obj){

       event.stopPropagation()
        }

         var wd;
        var jd;
        if (parseInt(jdId) > 999) {
            wd = parseInt(wdId)/Math.pow(10,6);
            jd = parseInt(jdId)/Math.pow(10,6)
        }else{
            wd = parseFloat(wdId).toFixed(6);
            jd = parseFloat(jdId).toFixed(6);
        }

        location.href="../service/map.html?lng="+wd+"&lat="+jd;

       
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

