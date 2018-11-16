
$(function () {
  
  var currentPage = 1;
  var pageSize = 5;

  // 保存用户id和状态

  var id;
  var isDelete;
  
  render();

  // 根据当前页请求渲染数据
  function render() {
    $.ajax({
      type : "get",
      url : "/user/queryUser",
      data : {
         page : currentPage,
         pageSize : pageSize
      },
      dataType : "json",
      success : function (info) { 
        // console.log(info);
        
        var str = template("tmp",info);
        $("tbody").html(str);
    
        $("#pagintor").bootstrapPaginator({
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
  
  // 事件委托绑定动态生成按钮
  $("tbody").on("click",".btn",function () {

    // 显示模态框
    $("#btnModal").modal("show");

    id = $(this).parent().data("id");
    
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

    // console.log(id,isDelete);
    
  });
  
  // 发送后台确定改变状态 重新渲染
  $("#StatusBtn").click(function () {
     
    $("#btnModal").modal("hide");
    
    // 让后台修改数据库用户状态 重新渲染
    $.ajax({
       type : "post",
       url : "/user/updateUser",
       data : {
         id : id,
         isDelete : isDelete
       },
       dataType : "json",
       success : function (info) {        
         if(info.success){
           render();
         }          
       }
    });

  });



});



