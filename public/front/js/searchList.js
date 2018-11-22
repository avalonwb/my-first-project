
$(function () {
  
  var key = getData("key");
  
  $("#ipt").val(key);
  
  // 进入页面 根据之前搜索key渲染一次
  render();
  
  // 绑定搜索按钮 点击根据输入的key渲染
  $("#addBtn").click(function () {
      render();
  });
   
  // 选项卡的a 绑定点击事件
  $(".selectUl a[data-type]").click(function () {
     
    //点击加上当前类  如果有了就切换箭头类
    if($(this).hasClass("current")){
      
      $(this).find("i").toggleClass("fa-angle-down")
      .toggleClass("fa-angle-up");

    }else{

      $(this).addClass("current").parent().siblings()
      .find("a").removeClass("current");

    }
    
    // console.log(type,rank);
    
    render();
     
  });

  // 渲染方法 判断有没有a被点击来决定传参
  function render() {

    // 每次渲染之前都先把 loading 加上
    $(".mui-scroll .product").html('<p class="loading"></p>');

    var options = {}

    // 判断是否是current的a
    var $currentA = $(".selectUl a.current");
    if($currentA.length == 1){
    
      // 判断是价格的a还是库存的a
      var type = $currentA.data("type");

      // 判断升序还是降序
      var rank = $currentA.find("i").hasClass("fa-angle-down") ? 2 : 1;

      options[type] = rank;
    } 

    options.proName = $("#ipt").val();
    options.page = 1;
    options.pageSize = 10;

    // console.log(options);
    
  
    // 模拟延迟
    setTimeout(function () {

      $.ajax({
        type : "get",
        url : "/product/queryProduct",
        data : options,
        dataType : "json",
        success : function (info) {
          // console.log(info);
          var str = template("tmp",info);
          $(".mui-scroll .product").html(str); 
        }
      });

    },1000);

  }

});