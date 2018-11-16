//  登录拦截 判断用户是否登录过

$.ajax({
  type : "get",
  url : "/employee/checkRootLogin",
  dataType : "json",
  success : function (info) {
    //  console.log(info);
    if(info.success){
      // console.log("已登录");   
    } 
    if(info.error == 400){
      location.href = "login.html";
    }
  }
});
      
