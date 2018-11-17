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
        $("#pagebox").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total / info.size),//总页数
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
        
      }
    }); 
  
  }

  // 表单验证初始化

  $("#first-form").bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

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
  
  var validator = $("#first-form").data('bootstrapValidator');

  //  验证通过后 发送
  
  $("#first-form").on("success.form.bv",function (event) {
      event.preventDefault();  

      $.ajax({
        type : "post",
        url : "/category/addTopCategory",
        data : $(this).serialize(),
        dataType : "json",
        success : function ( info ) {
          //  console.log(info);
          if(info.success){
            // 重置并关闭模态框
            $("#addModal").modal("hide");
            validator.resetForm(true);
            // 渲染第一页
            currentPage = 1;
            render();
          }  
        }  
      });

  });
  
  // 点击按钮弹出模态框

  $(".add-btn").click(function () {
    $("#addModal").modal("show");
    
  });

});