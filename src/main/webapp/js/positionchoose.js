var position = {
    latitudeP: 32163306,
    longitudeP: 118712513,
    accuracyP: 67.8021001352539
};
var debug = false;   


function getMyLocation(){
     // var geolocation = new BMap.Geolocation();
        // geolocation.getCurrentPosition(function(r){
        //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
        //         var geoc = new BMap.Geocoder();
        //         geoc.getLocation(r.point, function(rs){
        //         var addComp = rs.addressComponents; 
        //         var vcity=addComp.city||'';
        //         vcity=vcity.replace('市','');
        //         getCity(vcity+'.'+addComp.district);
                 
        //         });
        //     }
        // });
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function(position){
                var geoc = new BMap.Geocoder();
                var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
                geoc.getLocation(point, function(rs){
                    var addComp = rs.addressComponents; 
                    var vcity=addComp.city||'';
                    vcity=vcity.replace('市','');
                    var _city=vcity+'.'+addComp.district;
                    getCity(city);
                    guess(rentHouse.config.houseList, {
                        status: 2,
                        city:_city
                    }, rentHouse.tpl.rentListTpl(), 'indexGuessList');
                });
            },
            function(error){
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
            });
        } else {
            $.toast("浏览器无法获取您的位置信息！");
        }
}
getMyLocation();
function showMap(wdId, jdId) {
    var wdStr = $('#' + wdId).text();
    var jdStr = $('#' + jdId).text();
    if ($.trim(wdStr) == '' || $.trim(jdStr) == '') {
        $.alert('无法显示，位置信息有误！');
        return;
    }
    var wd = parseInt(wdStr) / Math.pow(10, 6);
    var jd = parseInt(jdStr) / Math.pow(10, 6);

    $.router.load("#pageMap");
    var map = new BMap.Map('map');
    var top_left_navigation = new BMap.NavigationControl();
    map.addControl(top_left_navigation);
    var point = new BMap.Point(jd, wd);
    var myIcon = new BMap.Icon("images/icon/this-pos.gif", new BMap.Size(66, 40), {
        offset: new BMap.Size(0, 0),
        imageOffset: new BMap.Size(0, 0)
    });
    var marker = new BMap.Marker(point, {
        icon: myIcon
    });
    map.addOverlay(marker);
    map.centerAndZoom(point, 15);
}