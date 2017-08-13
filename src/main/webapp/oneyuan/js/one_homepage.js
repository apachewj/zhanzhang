

$(function(){

     $(".service_type ul a li").click(function() {
  console.log("sd");
         if ($(this).attr('title')==1) {
        
          $('#slist1').addClass('selected');
         }else if ($(this).attr('title')==2) {
     
          $('#slist2').addClass('selected');
         }else if ($(this).attr('title')==3) {
 
          $('#slist3').addClass('selected');
         }else if ($(this).attr('title')==4) {
  
           $('#slist4').addClass('selected');
         };
     });
});