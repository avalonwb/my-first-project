
$(function () {
  
  $.ajax({
    type : "get",
    url : "/user/queryUserMessage",
    dataType : "json",
    success : function (info) {
      //  console.log(info);
      var str = template("tmp",info);
      $("#userInfo").html(str);
       
    }
  });

  // 退出功能
  $("#logout").click(function () {
    
    $.ajax({
      type : "get",
      url : "/user/logout",
      dataType : "json",
      success : function (info) {
         if(info.success){
            location.href = "login.html";
         }
      }
    });
     
  });

});