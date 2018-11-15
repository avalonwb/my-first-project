// 每个页面的进度条

$(document).ajaxStart(function () {
    NProgress.start();
});

$(document).ajaxStop(function () { 
  setTimeout(function () {
      NProgress.done();
  },3000);
});