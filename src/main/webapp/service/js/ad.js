$(function(){
	 window.local=null
		d=new Date()
		var vMon111 = d.getMonth() + 1
	    var year111 = d.getFullYear()
       $("#ag").val(year111);
       $("#ag option").text(year111);
	if(vMon111<10){
		$("#mon").val("0"+vMon111)
	}else{
		$("#mon").val(vMon111)
	}
	$('#addpush').click(function(){
		$('#pageadmanage').show()
		return false;
	})

	$('#admnue a').click(function(){
		local=($(this).attr('data'))
		$('#pageadpush').show()
	})

	$('.ping>div').click(function(){
		$(this).addClass('on').siblings().removeClass('on')
		 showtype=$(this).attr('data')
	})
	$('#ag').change(function(){
		var showtype=$('.ping>div.on').attr('data')
		if(!showtype){
			alert('请选择屏幕')
			return false;
		}
		$.post('/user/ad/applyDays',{showtype:showtype,month:$('#ag').val()+"-"+$('#mon').val()}).then(function(data){
			if(data.data=="ERROR"){
				renderdata([])
			}else{
				console.log(data.data);
				var arr=_.map(data.data,function(item){
					console.log(item);
					return item.day
				})

				console.log(arr);
				renderdata(arr)
			}
		})
	})
	$('#mon').change(function(){
		var showtype=$('.ping>div.on').attr('data')
		if(!showtype){
			alert('请选择屏幕')
			return false;
		}

		$.post('/user/ad/applyDays',{showtype:showtype,month:$('#ag').val()+"-"+$('#mon').val()}).then(function(data){
			if(data.data=="ERROR"){
				renderdata([])
			}else{
				console.log(data.data);
				var arr=_.map(data.data,function(item){
					console.log(item);
					return item.day
				})

				console.log(arr);
				renderdata(arr)
			}
		})
		
	})
	var showtype=$('.ping>div.on').attr('data')
	$.post('/user/ad/applyDays',{showtype:showtype,month:$('#ag').val()+"-"+$('#mon').val()}).then(function(data){
			if(data.data=="ERROR"){
				renderdata([])
			}else{
				console.log(data.data);
				var arr=_.map(data.data,function(item){
					console.log(item);
					return item.day
				})

				console.log(arr);
				renderdata(arr)
			}
		})
	$('.up_month').click(function(){
		var showtype=$('.ping>div.on').attr('data')
		var m=parseInt($('#mon').val())
		console.log(m);
			if(m==1){
				return false;
			}
			m--
			if(m<10){
				m="0"+m
			}
			
		console.log(m);
			$('#mon').val(m)
			if(!showtype){
			alert('请选择屏幕')
			return false;
		}
		$.post('/user/ad/applyDays',{showtype:showtype,month:$('#ag').val()+"-"+$('#mon').val()}).then(function(data){
			if(data.data=="ERROR"){
				renderdata([])
			}else{
				console.log(data.data);
				var arr=_.map(data.data,function(item){
					console.log(item);
					return item.day
				})

				console.log(arr);
				renderdata(arr)
			}
		})
	})
	$('.down_month').click(function(){
		var showtype=$('.ping>div.on').attr('data')
		var m=parseFloat($('#mon').val())
			console.log(m);
			if(m==12){
				return false;
			}
			if(m<9){
				m++
				m="0"+m
			}else{
				m++
			}
			$('#mon').val(m)
			
			if(!showtype){
			alert('请选择屏幕')
			return false;
			}
		$.post('/user/ad/applyDays',{showtype:showtype,month:$('#ag').val()+"-"+$('#mon').val()}).then(function(data){
			if(data.data=="ERROR"){
				renderdata([])
			}else{
				console.log(data.data);
				var arr=_.map(data.data,function(item){
					console.log(item);
					return item.day
				})

				console.log(arr);
				renderdata(arr)
			}
		})
	})

	function renderdata(arr){
		var y=$('#ag').val()
		var m=$('#mon').val()
		var date=new Date()
		var date2=new Date()
		m=m-1;
		date.setFullYear(y,m,1)
		var  y2=date2.getFullYear()
		var  m2=date2.getMonth()
		var  d2=date2.getDate()
		var init=date.getDay()
		$('.day').remove()
		//console.log(y2,y);
		var isselect=[]
		$('.isok').each(function(){
			isselect.push($(this).html())
		})
		console.log(isselect)
		m=$('#mon').val();
		m=parseInt(m)
		m2=m2+1

		console.log()
		if(y2<y){
			for(var i=1;i<31;i++){
				console.log(i%7);
				if(i%7==1){
					$('#w'+init).append("<div class='day fbExpired '>"+i+"</div>")
				}
				if(i%7==2){
					var init2=init+1
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==3){
					var init2=init+2
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==4){
					var init2=init+3
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
					if(i%7==5){
					var init2=init+4
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
					if(i%7==6){
					var init2=init+5
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==0){
					var init2=init+6
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}


			}
			return false
		}
		if(m<m2&&y2>=y&&(m==1||m==3||m==5||m==7||m==8||m==10||m==12)){
			m=$('#mon').val();
			for(var i=1;i<=31;i++){
			//	console.log(i%7);
				if(i%7==1){
					$('#w'+init).append("<div class='day fbExpired '>"+i+"</div>")
				}
				if(i%7==2){
					var init2=init+1
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==3){
					var init2=init+2
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==4){
					var init2=init+3
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
					if(i%7==5){
					var init2=init+4
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
					if(i%7==6){
					var init2=init+5
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==0){
					var init2=init+6
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}


			}
			return false
		}else if(m<m2&&y2>=y&&(m==4||m==6||m==9||m==11)){
			m=$('#mon').val();
		for(var i=1;i<31;i++){
			//	console.log(i%7);
			if(i%7==1){
				$('#w'+init).append("<div class='day fbExpired '>"+i+"</div>")
			}
			if(i%7==2){
				var init2=init+1
				if(init2>6){
					init2=init2-7
					if(i<=7){
						$('#w'+init2).append("<div class='day'></div>")
					}
				}
				$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
			}
			if(i%7==3){
				var init2=init+2
				if(init2>6){
					init2=init2-7
					if(i<=7){
						$('#w'+init2).append("<div class='day'></div>")
					}
				}
				$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
			}
			if(i%7==4){
				var init2=init+3
				if(init2>6){
					init2=init2-7
					if(i<=7){
						$('#w'+init2).append("<div class='day'></div>")
					}
				}
				$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
			}
			if(i%7==5){
				var init2=init+4
				if(init2>6){
					init2=init2-7
					if(i<=7){
						$('#w'+init2).append("<div class='day'></div>")
					}
				}
				$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
			}
			if(i%7==6){
				var init2=init+5
				if(init2>6){
					init2=init2-7
					if(i<=7){
						$('#w'+init2).append("<div class='day'></div>")
					}
				}
				$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
			}
			if(i%7==0){
				var init2=init+6
				if(init2>6){
					init2=init2-7
					if(i<=7){
						$('#w'+init2).append("<div class='day'></div>")
					}
				}
				$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
			}


		}
		return false
	    }else if(m<m2&&y2>=y&&(m==2&&(y%4==0)&&(y%100!=0)||(y%400==0))){
			m=$('#mon').val();
			for(var i=1;i<30;i++){
				//	console.log(i%7);
				if(i%7==1){
					$('#w'+init).append("<div class='day fbExpired '>"+i+"</div>")
				}
				if(i%7==2){
					var init2=init+1
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==3){
					var init2=init+2
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==4){
					var init2=init+3
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==5){
					var init2=init+4
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==6){
					var init2=init+5
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==0){
					var init2=init+6
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}


			}
			return false
		}else if(m<m2&&y2>=y&&(!(year%4)&&(year%100)||!(year%400)&&m==2)){
			m=$('#mon').val();
			for(var i=1;i<29;i++){
				//	console.log(i%7);
				if(i%7==1){
					$('#w'+init).append("<div class='day fbExpired '>"+i+"</div>")
				}
				if(i%7==2){
					var init2=init+1
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==3){
					var init2=init+2
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==4){
					var init2=init+3
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==5){
					var init2=init+4
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==6){
					var init2=init+5
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}
				if(i%7==0){
					var init2=init+6
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
				}


			}
			return false
		}
		if(m==m2&&y2>=y&&(m==1||m==3||m==5||m==7||m==8||m==10||m==12)){
			m=$('#mon').val();
			for(var i=1;i<=31;i++){
				//console.log(d2);
				if(d2>=i){
					if(i%7==1){
						$('#w'+init).append("<div class='day fbExpired '>"+i+"</div>")
					}
					if(i%7==2){
						var init2=init+1
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==3){
						var init2=init+2
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==4){
						var init2=init+3
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
						if(i%7==5){
						var init2=init+4
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
						if(i%7==6){
						var init2=init+5
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==0){
						var init2=init+6
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					continue;
				}
				//console.log(arr);
				//console.log(arr.indexOf(i+""));

				if(i%7==1){

					if(arr.indexOf(i+"")>-1){
						$('#w'+init).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init).append("<div class='day fbNot'>"+i+"</div>")
						}
					}

				}
				if(i%7==2){
					var init2=init+1
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}

				}
				if(i%7==3){
					var init2=init+2
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day  fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==4){
					var init2=init+3
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
					if(i%7==5){
					var init2=init+4
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
					if(i%7==6){
					var init2=init+5
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==0){
					var init2=init+6
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}




			}
			return false
		}
		else if(m==m2&&y2>=y&&(m==4||m==6||m==9||m==11)){
			m=$('#mon').val();
			for(var i=1;i<31;i++){
				//console.log(d2);
				if(d2>=i){
					if(i%7==1){
						$('#w'+init).append("<div class='day fbExpired '>"+i+"</div>")
					}
					if(i%7==2){
						var init2=init+1
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==3){
						var init2=init+2
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==4){
						var init2=init+3
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==5){
						var init2=init+4
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==6){
						var init2=init+5
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==0){
						var init2=init+6
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					continue;
				}
				//console.log(arr);
				//console.log(arr.indexOf(i+""));

				if(i%7==1){

					if(arr.indexOf(i+"")>-1){
						$('#w'+init).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init).append("<div class='day fbNot'>"+i+"</div>")
						}
					}

				}
				if(i%7==2){
					var init2=init+1
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}

				}
				if(i%7==3){
					var init2=init+2
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day  fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==4){
					var init2=init+3
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==5){
					var init2=init+4
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==6){
					var init2=init+5
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==0){
					var init2=init+6
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}




			}
			return false
		}else if(m==m2&&y2>=y&&(m==2&&(y%4==0)&&(y%100!=0)||(y%400==0))){
			m=$('#mon').val();
			for(var i=1;i<30;i++){
				//console.log(d2);
				if(d2>=i){
					if(i%7==1){
						$('#w'+init).append("<div class='day fbExpired '>"+i+"</div>")
					}
					if(i%7==2){
						var init2=init+1
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==3){
						var init2=init+2
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==4){
						var init2=init+3
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==5){
						var init2=init+4
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==6){
						var init2=init+5
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==0){
						var init2=init+6
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					continue;
				}
				//console.log(arr);
				//console.log(arr.indexOf(i+""));

				if(i%7==1){

					if(arr.indexOf(i+"")>-1){
						$('#w'+init).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init).append("<div class='day fbNot'>"+i+"</div>")
						}
					}

				}
				if(i%7==2){
					var init2=init+1
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}

				}
				if(i%7==3){
					var init2=init+2
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day  fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==4){
					var init2=init+3
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==5){
					var init2=init+4
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==6){
					var init2=init+5
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==0){
					var init2=init+6
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}




			}
			return false
		}else if(m==m2&&y2>=y&&(!(year%4)&&(year%100)||!(year%400)&&m==2)){
			m=$('#mon').val();
			for(var i=1;i<29;i++){
				//console.log(d2);
				if(d2>=i){
					if(i%7==1){
						$('#w'+init).append("<div class='day fbExpired '>"+i+"</div>")
					}
					if(i%7==2){
						var init2=init+1
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==3){
						var init2=init+2
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==4){
						var init2=init+3
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==5){
						var init2=init+4
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==6){
						var init2=init+5
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					if(i%7==0){
						var init2=init+6
						if(init2>6){
							init2=init2-7
							if(i<=7){
								$('#w'+init2).append("<div class='day'></div>")
							}
						}
						$('#w'+init2).append("<div class='day fbExpired'>"+i+"</div>")
					}
					continue;
				}
				//console.log(arr);
				//console.log(arr.indexOf(i+""));

				if(i%7==1){

					if(arr.indexOf(i+"")>-1){
						$('#w'+init).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init).append("<div class='day fbNot'>"+i+"</div>")
						}
					}

				}
				if(i%7==2){
					var init2=init+1
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}

				}
				if(i%7==3){
					var init2=init+2
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day  fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==4){
					var init2=init+3
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==5){
					var init2=init+4
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==6){
					var init2=init+5
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}
				if(i%7==0){
					var init2=init+6
					if(init2>6){
						init2=init2-7
						if(i<=7){
							$('#w'+init2).append("<div class='day'></div>")
						}
					}
					if(arr.indexOf(i+"")>-1){
						$('#w'+init2).append("<div class='day fbServed '>"+i+"</div>")

					}else{
						if(i<10){
							var k="0"+i
						}else{
							var k=i
						}
						if(isselect.indexOf(m+"-"+k)>-1){
							$('#w'+init2).append("<div class='day fbNot fbSelect'>"+i+"</div>")
						}else{
							$('#w'+init2).append("<div class='day fbNot'>"+i+"</div>")
						}
					}
				}




			}
			return false
		}
		if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){
			for (var i = 1; i <= 31; i++) {
				m = $('#mon').val();
				//	console.log(i%7);
				//	console.log(isselect);
				if (i % 7 == 1) {

					if (arr.indexOf(i + "") > -1) {
						$('#w' + init).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						console.log(m + "-" + k + "**********")
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init).append("<div class='day fbNot'>" + i + "</div>")
						}

					}

				}
				if (i % 7 == 2) {
					var init2 = init + 1
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 3) {
					var init2 = init + 2
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 4) {
					var init2 = init + 3
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day  fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 5) {
					var init2 = init + 4
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 6) {
					var init2 = init + 5
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						console.log(m + "-" + k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 0) {
					var init2 = init + 6
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						console.log(m + "-" + k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}


			}
		}
		else if(m==4||m==6||m==9||m==11){
			for (var i = 1; i <31; i++) {
				m = $('#mon').val();
				//	console.log(i%7);
				//	console.log(isselect);
				if (i % 7 == 1) {

					if (arr.indexOf(i + "") > -1) {
						$('#w' + init).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						console.log(m + "-" + k + "**********")
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init).append("<div class='day fbNot'>" + i + "</div>")
						}

					}

				}
				if (i % 7 == 2) {
					var init2 = init + 1
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 3) {
					var init2 = init + 2
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 4) {
					var init2 = init + 3
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day  fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 5) {
					var init2 = init + 4
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 6) {
					var init2 = init + 5
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						console.log(m + "-" + k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 0) {
					var init2 = init + 6
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						console.log(m + "-" + k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}


			}
		}
		else if(m==2&&(y%4==0)&&(y%100!=0)||(y%400==0)){
			for (var i = 1; i <30; i++) {
				m = $('#mon').val();
				//	console.log(i%7);
				//	console.log(isselect);
				if (i % 7 == 1) {

					if (arr.indexOf(i + "") > -1) {
						$('#w' + init).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						console.log(m + "-" + k + "**********")
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init).append("<div class='day fbNot'>" + i + "</div>")
						}

					}

				}
				if (i % 7 == 2) {
					var init2 = init + 1
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 3) {
					var init2 = init + 2
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 4) {
					var init2 = init + 3
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day  fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 5) {
					var init2 = init + 4
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 6) {
					var init2 = init + 5
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						console.log(m + "-" + k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 0) {
					var init2 = init + 6
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						console.log(m + "-" + k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}


			}
		}else if(!(year%4)&&(year%100)||!(year%400)&&m==2){
			for (var i = 1; i <29; i++) {
				m = $('#mon').val();
				//	console.log(i%7);
				//	console.log(isselect);
				if (i % 7 == 1) {

					if (arr.indexOf(i + "") > -1) {
						$('#w' + init).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						console.log(m + "-" + k + "**********")
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init).append("<div class='day fbNot'>" + i + "</div>")
						}

					}

				}
				if (i % 7 == 2) {
					var init2 = init + 1
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 3) {
					var init2 = init + 2
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 4) {
					var init2 = init + 3
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day  fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 5) {
					var init2 = init + 4
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						//console.log(m+"-"+k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 6) {
					var init2 = init + 5
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						console.log(m + "-" + k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}
				if (i % 7 == 0) {
					var init2 = init + 6
					if (init2 > 6) {
						init2 = init2 - 7
						if (i <= 7) {
							$('#w' + init2).append("<div class='day'></div>")
						}
					}
					if (arr.indexOf(i + "") > -1) {
						$('#w' + init2).append("<div class='day fbServed '>" + i + "</div>")

					} else {
						if (i < 10) {
							var k = "0" + i
						} else {
							var k = i
						}
						console.log(m + "-" + k);
						if (isselect.indexOf(m + "-" + k) > -1) {
							$('#w' + init2).append("<div class='day fbNot fbSelect'>" + i + "</div>")
						} else {
							$('#w' + init2).append("<div class='day fbNot'>" + i + "</div>")
						}
					}
				}


			}
		}
		//$('#w0').append()
	}
	$('.table').on('click','.fbNot',function(){
		
		if($(this).hasClass('fbSelect')){
			$(this).removeClass('fbSelect')
			var m=$('#mon').val()
			var d=$(this).html()	
				if(d<10){
					d="0"+d;
				}
				$("#"+m+"-"+d).remove()
		}else{
			$(this).addClass('fbSelect')
			var m=$('#mon').val()
			var d=$(this).html()	
				if(d<10){
					d="0"+d;
				}
			$('#tou').after("<span id="+m+"-"+d+" class='isok'>"+m+"-"+d+"</span>")
		}
		var showtype=$('.ping .on').attr("data")
		var days=[]
		$('.isok').each(function(){
			days.push($('#ag').val()+"-"+$(this).html());
		})
		$.ajax({
			type:"post",
			url:"/user/ad/applyMoney",
			data:{
				showtype:showtype,
				days:days
			}
			,'traditional':true}).then(function(data){
			console.log(data.money)
			var money=data.money
			if(money==undefined){
				$(".zhifu span").html("")
				$(".zhifu").hide()
			}else{
				$(".zhifu span").html(data.money+"元")
				$(".zhifu").show()
			}

		})
		
	})


})