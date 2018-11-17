$(function () {

  var currentPage = 1;
  var pageSize = 5;

  render();

  // 表单验证初始化
  $("#second-form").bootstrapValidator({
    // 配置不校验的类型
    excluded: [],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {

      brandName: {

        validators: {

          notEmpty: {
            message: "必须选择二级分类"
          }
        }
      },
      categoryId: {

        validators: {

          notEmpty: {
            message: "必须选择一级分类"
          }
        }
      },
      brandLogo: {

        validators: {

          notEmpty: {
            message: "必须选择图片"
          }
        }
      }

    }
  });

  // 表单验证实例
  var validator = $("#second-form").data('bootstrapValidator');

  function render() {

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        //  console.log(info);
        var str = template("tmp", info);
        $("tbody").html(str);

        $("#pagebox").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    });
  }

  $(".add-btn").click(function () {

    $("#addModal").modal("show");

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 50
      },
      dataType: "json",
      success: function (info) {
        //  console.log(info);
        var str = template("tmp-ul", info);
        $(".dropdown-ul").html(str);
      }
    });


  });

  // 事件委托 给下拉菜单每个li绑定事件
  $(".dropdown-ul").on("click", "a", function () {
    //  console.log(1);
    var txt = $(this).text();
    $(".dropdown span.txt").html(txt);
    $(".dropdown input").val($(this).parent().data("id"));
    // 改变表单状态
    validator.updateStatus("categoryId", "VALID");
  });

  // 文件上传插件初始化
  $("#uploadimg").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data);
      var src = data.result.picAddr;
      $("#imgview").attr("src", src);
      $("#imgurl").val(src);
      // 改变表单状态
      validator.updateStatus("brandLogo", "VALID");
    }
  });
  
  // 表单验证通过后发送填加请求
  // $("#second-form").on('success.form.bv', function (event) {
  //     event.preventDefault();

  //     $.ajax({
  //        type : "post",
  //        url : "/category/addSecondCategory",

  //     });
    
  // });


});