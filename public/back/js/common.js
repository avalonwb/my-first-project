
// 公共功能

// 每个页面的进度条

$(document).ajaxStart(function () {
    NProgress.start();
});

$(document).ajaxStop(function () { 
  setTimeout(function () {
      NProgress.done();
  },3000);
});


$(function () {

  // 侧边栏显示隐藏下拉菜单
  $(".pull-down").click(function () {
    // console.log(1);
    $(this).next(".second").stop().slideToggle();
  }); 

  // 侧边栏显示高亮   每个页面写死的类

  // 菜单侧滑

  $(".site-top .icon-left").click(function () {
    //  移出侧边栏
    $(".aside").toggleClass("hide-slide");
    // 移出顶部左padding
    $(".site-top").toggleClass("hide-slide");
    // 移出内容左padding
    $(".main").toggleClass("hide-slide");
  });
  
  //退出功能

  $(".icon-right").click(function () {
    //  console.log(1);
    
    $(".modal").modal("show");

    $("#logoutBtn").click(function () { 
        $.ajax({
          type : "get",
          url : "/employee/employeeLogout",
          dataType : "json",
          success : function (info) {
            //  console.log(info);
            if(info.success){
              location.href = "login.html";
            }      
          }
        });
    });

  });


});