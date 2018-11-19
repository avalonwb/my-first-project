
$(function () {
  
  // 进入页面 请求一级列表数据 渲染

  $.ajax({
    type : "get",
    url : "/category/queryTopCategory",
    dataType : "json",
    success : function (info) {

      var str = template("toptmp",info);
      $(".left-list").html(str);
      
      render(info.rows[0].id);

    }
  });

  // 事件委托给左侧a绑定事件
  $(".left-list").on("click","a",function () {
     var id = $(this).parent().data("id");

     $(this).addClass("active").parent().siblings().find("a").removeClass("active");

     render(id);
     
  })

  function render( id ) {

    $.ajax({
      type : "get",
      url : "/category/querySecondCategory",
      data : {
        id : id
      },
      dataType : "json",
      success : function (info) {
        var str = template("secondtmp",info);
        $(".right-list").html(str);
         
      }
    });

  }

});