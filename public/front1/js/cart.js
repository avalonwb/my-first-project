
$(function () {
  
  // 进入页面 请求数据 渲染页面
  render();


  // 删除功能
  $(".mui-table-view").on("click",".btn_delete",function () {
     var id = $(this).data("id");
     
     $.ajax({
      type : "get",
      url : "/cart/deleteCart",
      data : {
        id : [id]
      },
      dataType : "json",
      success : function (info) {       
        if(info.success){
          render();
        }     
      }
     });
      
  });

  function render(){
    $.ajax({
      type : "get",
      url : "/cart/queryCart",
      dataType : "json",
      success : function (info) {
        // console.log(info);
        var str = template("tmp",{list : info});
        $(".mui-table-view").html(str);
        
      }
    });
  }

});