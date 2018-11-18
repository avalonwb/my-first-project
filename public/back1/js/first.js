$(function () {

  var currentPage = 1;
  var pageSize = 10;

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        var str = template("tmp", info);
        $("tbody").html(str);

        // 3版本要求容器是ul
        $("#pagebox").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function (event, originalEvent, type, page) {
            // 把当前页改成被点击的页码
            currentPage = page;
            // 重新渲染当前页 
            render();
          }
        });
      }
    });
  }

  $(".addBtn").click(function () {
    $("#addModal").modal("show");

  });

  // 表单验证初始化

  $("#form").bootstrapValidator({

    // 配置显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置需要验证的字段
    fields: {
      categoryName: {
        //配置验证规则
        validators: {
          notEmpty: {
            message: "null is not allowed to fill",
          }
        }
      },
    }

  });

  //实例 
  var validator = $("#form").data("bootstrapValidator");
  
  // 表单验证通过后触发 
  $("#form").on("success.form.bv",function (event) {
      event.preventDefault();
 
      $.ajax({
        type :"post",
        url : "/category/addTopCategory",
        data : $("#form").serialize(),
        dataType : "json",
        success : function (info) {
          //  console.log(info);
          if(info.success){
            $("#addModal").modal("hide");
            // 重置状态和内容
            validator.resetForm(true);
            // 重新渲染第一页
            currentPage = 1;
            render();
          } 
        }
      });
  });

});