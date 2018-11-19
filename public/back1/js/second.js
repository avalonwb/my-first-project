$(function () {

  var currentPage = 1;
  var pageSize = 10;

  render();

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
        // console.log(info);
        var str = template("tmp", info);
        $("tbody").html(str);

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

  //点击按钮显示模态框
  $(".addBtn").click(function () {
    // console.log(1);
    $("#addModal").modal("show");

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        //  console.log(info);
        var str = template("tmp-ul", info);
        $(".dropdown-menu").html(str);
      }
    });
  });

  // 初始化表单验证插件
  $("#form").bootstrapValidator({
    // 配置不校验类型
    excluded: [], 

    // 配置显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置需要验证的字段
    fields: {
      categoryId: {
        //配置验证规则
        validators: {
          notEmpty: {
            message: " 一級分類を選択して",
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "ブランドを選択して",
          }
        }
      },
      brandLogo: {
        validators : {
           notEmpty : {
             message : "画像を選択して"
           }
        }
      }
    }
  });

  //创建实例 
  var validator = $("#form").data("bootstrapValidator");

  //下拉菜单的a绑定事件
  $(".dropdown-menu").on("click", "a", function () {
    var txt = $(this).text();
    $(".txt").text(txt);

    $(".dropdown").next("input").val($(this).parent().data("id"));

    validator.updateStatus("categoryId","VALID");
  });

  //文件上传插件初始化
  $("#uploadimg").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      var src = data.result.picAddr;
      $("#imgView").prev().attr("src", src);

      $("#imgView").val(src);

      validator.updateStatus("brandLogo","VALID");
    }
  });

  // 验证通过后发送给后台
  $("#form").on("success.form.bv",function (event) {
      event.preventDefault();
      
      var str = $("#form").serialize();
      
      $.ajax({
         type : "post",
         url : "/category/addSecondCategory",
         data : str,
         dataType : "json",
         success :  function (info) {
          if(info.success){
            // 关闭模态框
            $("#addModal").modal("hide");
            // 重新渲染第一页
            currentPage = 1;
            render();
            // 重置模态框
            validator.resetForm(true);
            // 手动重置下拉菜单和图片
            $("span.txt").text("一級分類を選択してください");
            $(".imgbox img").attr("src","images/none.png")
          }
         }
      });
      
      
  })

});