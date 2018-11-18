$(function () {

  // 进入页面 请求数据 渲染页面
  var currentPage = 1;
  var pageSize = 3;
  // 管理上传图片的数组
  var imgArr = [];

  render();

  function render() {

    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        var str = template("tmp", info);
        $(".table tbody").html(str);

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

  // 表单校验初始化
  $("#product-form").bootstrapValidator({
    // 指定不校验的类型
    excluded: [],
    //  配置提示图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields: {

      brandId : {
         validators : {
             notEmpty : {
                message : "必须选择二级分类"
             }
         }
      },
      proName : {
        validators : {
           notEmpty : {
              message : "必须输入商品名称"
           }
        }
      },
      proDesc : {
        validators : {
          notEmpty : {
            message : "必须输入描述"
          }
        }
      },
      num : {
        validators : {
          notEmpty : {
            message : "不能为空"
          },
          regexp : {
            regexp: /^[1-9]\d*$/,
            message: "必须为非零开头的数字"
          }
        }
      },
      size : {
        validators : {
          notEmpty : {
            message : "不能为空"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '格式必须为xx-xx的数字'
          }
        }
      },
      oldPrice : {
         validators : {
           notEmpty : {
             message : "不能为空"
           }
         }
      },
      price : {
        validators : {
          notEmpty : {
            message : "不能为空"
          }
        }
      },
      imgurl : {
        validators : {
          notEmpty : {
             message : "必须选择三张图片"
          }
        }
      }

    }
  });

  // 创建表单验证实例
  var validator = $("#product-form").data("bootstrapValidator");

  // 点击添加按钮 弹出模态框
  $(".add-btn").click(function () {

    $("#addModal").modal("show");

    // 动态渲染下拉菜单
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        //  console.log(info);
        var str = template("tmp-ul", info);
        $(".dropdown-ul").html(str);
      }
    });
  });

  // 事件委托给a绑定事件
  $(".dropdown-ul").on("click", "a", function () {
    var txt = $(this).text();
    $("span.txt").text(txt);
    
    $("input[name='brandId']").val($(this).parent().data("id"));
    validator.updateStatus("brandId","VALID");
  });

  // 上传图片插件初始化
  $("#uploadimg").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      var imgObj = data.result;
      var imgSrc = data.result.picAddr;
      
      $("#imgbox").prepend('<img src="'+imgSrc+'" alt="" height="100" id="imgview">');

      imgArr.unshift(imgObj);

      if(imgArr.length > 3){
         imgArr.pop();
         $("#imgbox img:last-of-type").remove(); 
      }

      if(imgArr.length == 3){
         validator.updateStatus("imgurl","VALID");
      }
      
    }
  });
  
  // 表单验证通过后触发事件发送ajax请求
  $("#product-form").on("success.form.bv",function (event) {
      event.preventDefault();
      var str = $("#product-form").serialize();
      // console.log(str);
      str += "&picName1="+imgArr[0].picName+"&picAddr1="+imgArr[0].picAddr;
      str += "&picName2="+imgArr[1].picName+"&picAddr2="+imgArr[1].picAddr;
      str += "&picName3="+imgArr[2].picName+"&picAddr3="+imgArr[2].picAddr;
      // console.log(str);
      
      $.ajax({
        type : "post",
        url : "/product/addProduct",
        data : str,
        dataType : "json",
        success : function (info) {
          if(info.success){
            // 关闭模态框
            $("#addModal").modal("hide");
            // 重新渲染第一页
            currentPage = 1;
            render();
            // 重置模态框表单
            validator.resetForm(true);
            // 手动重置下拉菜单和图片
            $("span.txt").text("选择二级分类");
            $("#imgbox img").remove();
            imgArr = [];
          }
        }
      });
     
  })


});