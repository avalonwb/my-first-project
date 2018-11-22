
$(function () {
  
  // 进入页面 根据id请求产品数据
  var id = getData("productId");

  $.ajax({
    type : "get",
    url : "/product/queryProductDetail",
    data : {
      id : id
    },
    dataType : "json",
    success : function (info) {
      // console.log(info);
      var str = template("tmp",info);
      $(".lt_main .mui-scroll").html(str);

      // 生成html结构后 手动初始化插件
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 4000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      // 手动初始化 mui 数字框
      mui('.mui-numbox').numbox();  
    }
  });
  
  // 给尺码加点击事件
  $(".lt_main").on("click",".lt_size span",function () {
     $(this).addClass("current").siblings().removeClass("current");
  });
  
  // 点击加入购物车 判断
  $("#addCart").click(function () {
    
    //收集后台需要的参数
    var size = $(".lt_size span.current").text();
    var num = $(".mui-numbox-input").val();

    if(size === null){
      mui.toast("你总么回事");
      return;
    }
    
    $.ajax({
      type : "post",
      url : "/cart/addCart",
      data : {
        productId : id,
        num : num,
        size : size
      },
      dataType : "json",
      success : function (info) {
        // console.log(info);

        // 如果未登录 去登录 然后跳转回来
        if(info.error == 400){
          location.href = "login.html?reUrl="+location.href;
        }

        if(info.success){
          location.href = "cart.html"; 
        }
         
      }
    });
    
  });

});