
$(function () {
  
  var id = getData("productId");

  // 进入页面 请求商品详细
  $.ajax({
    type : "get",
    url : "/product/queryProductDetail",
    data : {
      id : id
    },
    dataType : "json",
    success : function (info) {
      //  console.log(info);
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

  // 给尺寸的span绑定点击事件
  $(".lt_main .mui-scroll").on("click",".lt_size span",function () {
     
    $(this).addClass("current").siblings().removeClass("current");
    
  });
  
  // 点击加入购物车按钮 判断
  $("#addCart").click(function () {
    // console.log(1);
    // 准备后台需要的参数
    var size = $(".lt_size span.current").text();
    var num = $(".mui-numbox .mui-numbox-input").val();

    if(size === null){
      mui.toast("你怎么回事小老弟",{
        duration : 2000
      });
      return;
    }
    
    // console.log(id,size,num);
     
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
        console.log(info);
        
        // 没登录的 要去登录 登陆后要跳回此页面
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