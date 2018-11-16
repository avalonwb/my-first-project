$(function () {

  // 进入页面 请求数据 渲染页面

  var currentPage = 1;
  var pageSize = 10;

  render();

  function render() {
    $.ajax({
      type : "get",
      url : "/category/queryTopCategoryPaging",
      data : {
        page : currentPage,
        pageSize : pageSize
      },
      success : function (info) {
        //  console.log(info);
        var str = template("tmp",info);
        $("tbody").html(str);
        
        
      }
    }); 
  
  }

  // 表单验证初始化

  $("#first-form").bootstrapValidator({

     fields : {

       categoryName : {

          validators : {

            notEmpty : {
               message : "不能为空"
            }
          }
       }
     }
  });
  
  // 点击按钮弹出模态框

  $(".add-btn").click(function () {
    $("#addModal").modal("show");
    
  });

});