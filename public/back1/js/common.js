
// 公共功能

// 进度条插件

$(document).ajaxStart(function () {
   NProgress.start();
});

$(document).ajaxStop(function () {
   setTimeout(function () {
     NProgress.done();
   },3000);
});



$(function () {

  // 侧边栏 点击高亮并显示下拉菜单
  $(".list #slide-down").click(function () {
    $(this).next().stop().slideToggle();  
  });

  // 侧滑菜单栏
  $("#icon-left").click(function () {
     $(".aside").toggleClass("slide-hide");
     $(".main").toggleClass("slide-hide");
     $(".site-top").toggleClass("slide-hide");
  });
  
  // 退出模态框
  $("#icon-right").click(function () {
     $("#logout").modal("show");
  });

  //  发送请求注销账户 关闭模态框 跳转登录页

  $("#logoutBtn").click(function () {   
     $("#logout").modal("hide"); 
     $.ajax({
       type : "get",
       url : "/employee/employeeLogout",
       dataType : "json",
       success : function (info) {
         if(info.success){          
            location.href = "login.html";
         }
       }
     });
  });

});

