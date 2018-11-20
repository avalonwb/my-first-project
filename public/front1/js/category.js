
$(function () {
  
  // 进入页面 请求一级分类数据

  $.ajax({
    type : "get",
    url : "/category/queryTopCategory",
    dataType : "json",
    success : function (info) {
      var str = template("leftTmp",info);
      $(".left-content").html(str);
      
      renderById( info.rows[0].id );
    }
  });

  
  // 给一级目录动态绑定事件
  $(".left-content").on("click","a",function () {
    //  console.log(1);
    $(this).addClass("active").parent().siblings().find("a").removeClass("active");
    
    var id = $(this).data("id");

    renderById(id);
  });


  // 根据id动态渲染二级目录
  function renderById( id ) {
     
    $.ajax({
       type : "get",
       url : "/category/querySecondCategory",
       data : {
         id : id
       },
       dataType : "json",
       success : function (info) {
          // console.log(info);
          var str = template("rightTmp",info);
          $(".right-content").html(str);
       }
    });
  }

});