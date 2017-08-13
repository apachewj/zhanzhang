$(function(){
    //初始化
    var test = false;
    var type=1;

    $.ajaxSetup({
        async: false
    });
    $.post("/user/master/userNum",{type:type}).then(function(data){
        console.log(data)
        $("#areaAll1").html(data.mainuser)
        $("#areaAdd1").html(data.adduser)
    })
    $.post("/user/master/clickNum",{type:type}).then(function(data){
        console.log(data)
        var html= _.template($("#tpl").html())

        ///console.log(html({list:data.data}))
        $(".contentHome").find("div.types_row").html(html({list:data}))

        if(data.length!==0) {
            $("#chartdiv").show();
            var chartData = [];
            for (var i = 0; i < data.length; i++) {
                chartData[i] = {
                    country: changeinto(data[i].info_type),
                    value: data[i].clicknum,
                }
            }
            chartData.push(chartData);

            var chart = AmCharts.makeChart("chartdiv", {
                "type": "pie",
                "theme": "light",
                "dataProvider": chartData,
                "valueField": "value",
                "radius": "43",
                "titleField": "country",
                "balloon": {
                    "fixedPosition": true
                },
                "export": {
                    "enabled": true
                }
            });
        }else{
            $("#chartdiv").hide();
        }

    })
    $.post("/user/master/moneyNum",{type:type}).then(function(data){
        console.log(data)
           if(data.data=="ERROR"){
             $(".OKmoney").html("￥"+0)
             $(".ADmoney").html("￥"+0)
            }else{
              $(".OKmoney").html("￥"+data.sumnum)
              $(".ADmoney").html("￥"+data.adnum)
            }
   
    })

    $(".time_row").on("click",".xuan",function(){
        $(this).parents(".time_row").find("a.active").removeClass("active")
        $(this).children("a").addClass("active")
    })
    //第一块
    $(".firstRow").on("click",".xuan",function(){
        var type=$(this).attr("type")
        $.post("/user/master/userNum",{type:type}).then(function(data){
            console.log(data)
            $("#areaAll1").html(data.mainuser)
            $("#areaAdd1").html(data.adduser)
  
        })
    })



$("#texttime").click(function(){
        var type=$(this).parents('.getday').attr("type");
        var day=$('#texttime').val();
        $.post("/user/master/userNum",{type:type,day:day}).then(function(data){
            console.log(data)
            $("#areaAll1").html(data.mainuser)
            $("#areaAdd1").html(data.adduser)
        })
    })




//    第二块
    $(".secondRow").on("click",".xuan",function(){
        var type=$(this).attr("type")
        $.post("/user/master/clickNum",{type:type}).then(function(data){
            console.log(data)
            var html= _.template($("#tpl").html())
            ///console.log(html({list:data.data}))
            $(".contentHome").find("div.types_row").html(html({list:data}))

            if(data.length!==0) {
                $("#chartdiv").show();
                var chartData = [];
                for (var i = 0; i < data.length; i++) {
                    chartData[i] = {
                        country: changeinto(data[i].info_type),
                        value: data[i].clicknum,
                    }
                }
                chartData.push(chartData);

                var chart = AmCharts.makeChart("chartdiv", {
                    "type": "pie",
                    "theme": "light",
                    "dataProvider": chartData,
                    "valueField": "value",
                    "radius": "43",
                    "titleField": "country",
                    "balloon": {
                        "fixedPosition": true
                    },
                    "export": {
                        "enabled": true
                    }
                });
            }else{
                $("#chartdiv").hide();
            }


        })
    })



    $("#texttime1").click(function(){
        var type=$(this).parents('.getday1').attr("type");
        var day=$('#texttime1').val();
        $.post("/user/master/clickNum",{type:type,day:day}).then(function(data){
            console.log(data)
            var html= _.template($("#tpl").html())

            ///console.log(html({list:data.data}))
            $(".contentHome").find("div.types_row").html(html({list:data}))

            if(data.length!==0) {
                $("#chartdiv").show();
                var chartData = [];
                for (var i = 0; i < data.length; i++) {
                    chartData[i] = {
                        country: changeinto(data[i].info_type),
                        value: data[i].clicknum,
                    }
                }
                chartData.push(chartData);

                var chart = AmCharts.makeChart("chartdiv", {
                    "type": "pie",
                    "theme": "light",
                    "dataProvider": chartData,
                    "valueField": "value",
                    "radius": "43",
                    "titleField": "country",
                    "balloon": {
                        "fixedPosition": true
                    },
                    "export": {
                        "enabled": true
                    }
                });
            }else{
                $("#chartdiv").hide();
            }


        })
    })

//第三块
    $(".thirdRow").on("click",".xuan",function(){
        var type=$(this).attr("type")
        $.post("/user/master/moneyNum",{type:type}).then(function(data){
            console.log(data)
            if(data.data=="ERROR"){
             $(".OKmoney").html("￥"+0)
             $(".ADmoney").html("￥"+0)
            }else{
              $(".OKmoney").html("￥"+data.sumnum)
              $(".ADmoney").html("￥"+data.adnum)
            }

        })
    })


    $("#texttime2").click(function(){
        var type=$(this).parents('.getday2').attr("type");
        var day=$('#texttime2').val();
        $.post("/user/master/moneyNum",{type:type,day:day}).then(function(data){
           console.log(data)
           if(data.data=="ERROR"){
             $(".OKmoney").html("￥"+0)
             $(".ADmoney").html("￥"+0)
            }else{
              $(".OKmoney").html("￥"+data.sumnum)
              $(".ADmoney").html("￥"+data.adnum)
            }
        })
    })


    //$.post("/user/master/clickNum",{type:1}).then(function(data){
    //    console.log(data)
    //    var html= _.template($("#tpl").html())
    //    var html2= _.template($("#tp2").html())
    //    var html3= _.template($("#tp3").html())
    //    ///console.log(html({list:data.data}))
    //    $(".contentHome").find("div.types_row").html(html({list:data}))
    //    $("#myThead5").html(html2({list:data}))
    //    $("#myTbody5").html(html3({list:data}))
    //})
})


function getCity(result) {
    var cityName = result.name;
    $('#xxx').html(cityName);

}
var myCity = new BMap.LocalCity();
myCity.get(getCity);


function changeinto(obj){
        if (1 == obj) {
            return '餐饮';
        } else if (2 == obj) {
            return '住宿';
        }  else if (3 == obj) {
            return '门店';
        } else if (4 == obj) {
            return '房屋租售';
        } else if (5 == obj) {
            return '的士顺车';
        } else if (6 == obj) {
            return '生活助手';
        } else if (7 == obj) {
            return '便民服务';
        } else if (8 == obj) {
            return '智能';
        } else if (9 == obj) {
            return '招聘征婚';
        } else if (10 == obj) {
            return '二手';
        } else if (11 == obj) {
            return '便民通知';
        } else if (12 == obj) {
            return '询价';
        } else if (13 == obj) {
            return '农林牧副';
        } else if (14 == obj) {
            return '爱心众筹';
        } else if (15 == obj) {
            return '本地企业';
        } else if (16 == obj) {
            return '金融保险';
        } else if (17 == obj) {
            return '本地特产';
        } else if (18 == obj) {
            return '旅游娱乐';
        }

}

