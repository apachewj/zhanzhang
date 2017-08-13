window.URL = window.URL || window.webkitURL;

var uploaddebug =true;


function getCity(result) {
    var cityName = result.name;
    $('#cityPos').find('a').html(cityName);
    $('#rent_city').find('a').html(cityName);
    $('#sell_city').find('a').html(cityName);
    $('#inquiryRent_city').find('a').html(cityName);
    $('#inquiryBuy_city').find('a').html(cityName);
    $('#pubRent_city').val(cityName);
    $('#pubSell_city').val(cityName);
    $('#pubInquiryRent_city').val(cityName);
    $('#pubInquiryBuy_city').val(cityName);
}
var myCity = new BMap.LocalCity();
myCity.get(getCity);

var cityNames=myCity.get(
    function(r){  
           _cityPosdata(r.name);

    }
  
);
