
$(function () {

  var currentPage = 1;
  var pageSize = 5;

  var status;
  var id;
   
  render();

  function render() {
    $.ajax({
      type : "get",
      url: "/user/queryUser",
      data : {
        page : currentPage,
        pageSize : pageSize
      },
      dataType : "json",
      success : function ( info ) {
         var str = template("tmp",info);
         $("tbody").html(str);
 
         $("#pagebox").bootstrapPaginator({
           bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
           currentPage: currentPage, //当前页
           totalPages : Math.ceil(info.total / info.size), //总页数
           onPageClicked:function(event,originalEvent,type,page){
             // 把当前页改成被点击的页码
               currentPage = page;
             // 重新渲染当前页 
               render();
           }
         });
      }
   });
  }

  // 点击按钮弹出模态框
  $("tbody").on("click",".btn",function () {
    // 显示模态框
    $("#stateModal").modal("show");

    id = $(this).parent().data("id");
    status = $(this).hasClass("btn-danger") ? 0 : 1;
 
  });

  // 发送请求后台修改用户状态
  $("#yesBtn").click(function () {
     
     $.ajax({
       type : "post",
       url : "/user/updateUser",
       data : {
         id : id,
         isDelete : status
       },
       dataType : "json",
       success : function (info) {
          if(info.success){
            //  关闭模态框
            $("#stateModal").modal("hide");
            // 重新渲染当前页
            render();
          }
       }
     });
    
  });


});