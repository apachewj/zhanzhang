$(function () {
    //第一次请求ajax
    var page=1
     $.post("/user/manager/masterNoticeList").then(function (data){
                console.log(data)
               var html=_.template($("#tpl").html())
               $(".sct-bd").html(html({list:data.data}))
            })

     $(".sct-bd").on("click",".situation-box-item",function(data){
         
     	//渲染详情页
     	var info_id=$(this).attr("data-id")
     	$.post("/user/manager/masterNotice",{info_id:info_id}).then(function(data){
     		console.log(data)

			data.c_context=data.c_context||""
			data.c_image=data.c_image||""
			data.c_image=data.c_image.split(',')
			data.imgcontext=data.c_context.split(',')
			console.log(data)
     		var html=_.template($("#tpl2").html())
     		$("#pageNoticeDetails div.content").html(html({list:data}))
     	})
     	$("#pageNoticeDetails").show()
     })
	//


	// 发送
     //$("#mainSend").click(function(){
     //	$("#pageSendMessage").show()
     //	var title=$("#mainTitle").val()
     //	var ids=$("#Addressee").val()
     //	var c_image=[]
     //	var c_content=[]
     //	$.post("/user/manager/addMasterNotice",{title:title,ids:ids,c_image:c_image,c_content:c_content}).then(function(data){
     //		console.log(data)
     //		if(data.data=="SUCCESS"){
     //			alert('发送成功')
     //			location.href='StationNotice.html'
     //		}
     //	})
     //})
     //$("#suceeesss").click(function(){
		//	$("#pageSendMessage").show()
		//})
	$("#addit").on("click",".cert-upload",function(){
		$(this).next(".filesss").click()
	})
	$('#additem').click(function () {
		var str = '<li class="detail-li  item ">'
			+ '<div class="row">'
			+ ' <div class="col-33">'
			+ ' <div id="pubScenic_c_image"  class="inp-cert">'
			+ '<div class="cert-upload"></div>'
			+ '<input type="file" class="cert-upload fileInp-opacity filesss"  multiple accept="image/*"  value="" onchange="doUpload2(this)" style="display:none">'
			+ ' </div>'
			+ '</div>'
			+ ' <div class="col-50">'
			+ ' <textarea id="pubScenic_c_context" eleType="input"   class="inp-text tianjiatupian col-100" placeholder="请添加图片说明"></textarea>'
			+ ' </div>'
			+ ' </div>'
			+ ' <a href="" class="addDelete">'
			+ '</a>'
			+ ' </li>'
		$('#addit').append(str)
		$("#www").addClass("addDelete")
	})
	$("#pagebianji").on("click",".addDelete",function(){
		$(this).parents("li.item").remove()
		return false
	})
	var strs=location.search.substr(1);
	strs=decodeURI(strs)
	if(strs){
		var arr=strs.split('&');
		var names=arr[1].split('=')[1]
		console.log(arr)
		$('#buttonChoose').html(names)
	}

//发送
	$("#pageSendMessage").on("click",".button-success",function(){
		if(location.search){
			var arr=(location.search.substr(1).split('&'))
			var ids=arr[0].split('=')[1]
			var names=arr[1].split('=')[1]
			console.log(arr)
			$('#buttonChoose').html(names)
			var title=$("#mainTitle").val()
			var c_image='';
			var c_content='';
			console.log(ids)
			if(title==""){
				alert("请输入标题")
				return false
			}
			$(".filesss").each(function(){
				c_image+=$(this).attr("data")+","
			})
			$(".tianjiatupian").each(function(){
				c_content+=$(this).val()+","
			})
			$.post("/user/manager/addMasterNotice",{title:title,ids:ids,c_image:c_image,c_content:c_content}).then(function(data){
				console.log(data)
				if(data.data=="SUCCESS"){
					alert('发送成功')
					//var html=_.template($("#tpl").html())
					//$(".sct-bd").html(html({list:data.data}))
					return false
					location.href='StationNotice.html'
				}
			})
		}else{
			alert('请选择收件人	')
			return false
		}
	})
	//取消
	$("#pageSendMessage").on("click",".button-danger",function(){
		location.href="StationNotice.html"

	})
	//样式切换
	$(".buttons-row_content .button").click(function(){
		$(".buttons-row_content").find(".active").removeClass("active")
		$(this).addClass("active")
	})
	//	点击接收通知
	$("#jubao").click(function(){
		$.post("/user/manager/masterNoticeList").then(function (data){
			console.log(data)
			var html=_.template($("#tpl").html())
			$(".sct-bd").html(html({list:data.data}))
		})
	})
	//点击发布通知
	$("#shenhe").click(function(){
		$.post("/user/manager/myMasterNoticeList",{pageNum:page}).then(function(data){
			console.log(data)
			var html=_.template($("#tpl").html())
			$(".sct-bd").html(html({list:data.data}))
		})
	})


})
function doUpload2(self) {
	// alert(1)
	var formData1 = new FormData();
	formData1.append('up_file', self.files[0])
	return $.ajax({
		url: '/uploadFile',
		type: 'POST',
		data: formData1,
		async: false,
		cache: false,
		contentType: false,
		processData: false,
	}).then(function (data) {
		console.log(data)
		if (data.data != "ERROR") {
			$(self).attr('data', data.data)
			$(self).parents('.inp-cert').find('img').remove()
			$(self).parents('.inp-cert').append('<img style="position: absolute;width: 89px;height: 88px;top: 0;border-radius: 5px;">')
			$(self).parents('.inp-cert').append('<a href="#" class="adDelete0"></a> ')
			$(self).parents('.inp-cert').find('img')[0].src = window.URL.createObjectURL(self.files[0]);
		}
	});}


$("#pagebianji").on("click",".adDelete0",function () {
	$(this).parents("div.inp-cert").find("img,a").remove()
})