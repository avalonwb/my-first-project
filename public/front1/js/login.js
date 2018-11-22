
$(function () {
  
  $("#loginBtn").click(function () {
    
    var username = $("#username").val();
    var password = $("#password").val();

    // 简单非空校验
    if(username.trim() == "" || password.trim() == ""){
       mui.toast("不能空");
       return;
    }

    $.ajax({
      type : "post",
      url : "/user/login",
      data : {
        username : username,
        password : password
      },
      dataType : "json",
      success : function (info) {
        
        // 判断需不需要跳回原来的页面
        if(location.search != ""){
          
          var reUrl = location.search.replace("?reUrl=","");
          location.href = reUrl;
          return;

        }

        if(info.success){
          location.href = "user.html";
        }
        
      }  
    });
    
  });

});