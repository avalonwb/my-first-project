
$(function () {
  
  // 进入页面 渲染用户信息
  
  $.ajax({
    type : "get",
    url : "/user/queryUserMessage",
    dataType : "json",
    success : function (info) {
      // console.log(info);
      var str = template("tmp",info);
      $("#userInfo").html(str);
    }
  });

  // 退出功能

  $("#logout").click(function () {
    // console.log(1);
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