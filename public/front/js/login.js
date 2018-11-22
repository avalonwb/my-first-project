
$(function () {
  
  $("#loginBtn").click(function () {
     
    var username = $("#username").val();
    var password = $("#password").val();

    // 简单的非空校验
    if(username.trim() == "" || password.trim() == ""){
      mui.toast("没填啊");
      return;
    }

    // 发送登录请求
    $.ajax({
      type : "post",
      url : "/user/login",
      data : {
        username : username,
        password : password
      },
      dataType : "json",
      success : function (info) {
        // console.log(info);
        if(info.error == 403){
          mui.toast("用户名或密码错误,你猜是哪个呢?");
        }
        if(info.success){

          // 需不需要返回原来的地址
          if(location.search.trim() != ""){
            var reUrl = location.search.replace("?reUrl=","");
            
            location.href = reUrl;
         
          }else{

            location.href = "user.html";

          }
          
        }
      }
    });


  });
  
});