
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

// 侧边栏 点击高亮并显示下拉菜单

$(".list #slide-down").click(function () {
  $(this).next().stop().slideToggle();  
});

