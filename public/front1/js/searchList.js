
$(function () {
  
  var k = getData("key");

  $("#ipt").val(k);

  render();
  
  // 选项卡绑定事件
  $(".selectList a[data-type]").click(function () {
    
    // 判断a是否有current类 没有就加 有就切换箭头类
    if($(this).hasClass("current")){

      $(this).find("i").toggleClass("fa-angle-down")
      .toggleClass("fa-angle-up");
      
    }else{

      $(this).addClass("current").parent().siblings()
      .find("a").removeClass("current");

    }

    render();
    
  });


  // 根据输入框内的key 请求数据渲染
  function render() {

    // 渲染前先填充动画
    $(".main .product").html('<div class="loading"></div>');
    
    // 收集后台需要的参数
    var options = {};

    options.proName = $("#ipt").val();
    options.page = 1;
    options.pageSize = 10;

    // 判断有没有a被点击
    $currentA = $(".selectList a.current");
    
    if($currentA.length == 1){
      
      var k = $currentA.data("type");
      var v = $currentA.find("i").hasClass("fa-angle-down") ? 2 : 1;
      
      options[k] = v;
     
    }

    // 模拟服务器延迟
    setTimeout(function () {

      $.ajax({
        type : "get",
        url : "/product/queryProduct",
        data : options,
        dataType : "json",
        success : function (info) {
          // console.log(info);
          var str = template("tmp",info);  
          $(".main .product").html(str);
          
        }
      });

    },800);

  }


});