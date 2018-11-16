
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