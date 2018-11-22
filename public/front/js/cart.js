
$(function () {
  
  render();
  
  // 删除功能
  $(".mui-table-view").on("click",".btn_delete",function () {
      // console.log(1);
      var id = $(this).data("id");

      $.ajax({
        type : "get",
        url : "/cart/deleteCart",
        data : {
          id : [id]
        },
        dataType : "json",
        success : function (info) {
          // console.log(info);
          if(info.success){
            render();
          } 
        } 
      });
      
  });


  function render() {

    $.ajax({
      type : "get",
      url : "/cart/queryCart",
      dataType : "json",
      success : function (info) {
        //  console.log(info);
        var str = template("tmp",{list : info});
        $(".lt_main .mui-table-view").html(str);
      }
    });

  }

});