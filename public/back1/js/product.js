$(function () {

  // 进入页面 请求数据 渲染当前页
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
        //  console.log(info);
        var str = template("tmp", info);
        $(".table tbody").html(str);

        // 初始化分页插件
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

  // 表单验证初始化
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
      brandId: {
        //配置验证规则
        validators: {
          notEmpty: {
            message: " 二級分類を選択して",
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "商品名を入力して",
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "説明を書いて"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "残量を確認して"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '零以外の数字を入力して'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "サイズを確認して"
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必ずxx-xxのフォマードを従って入力して'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "原価を書いて"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "価格を書いて"
          }
        }
      },
      imgtest : {
        validators : {
          notEmpty : {
            message : "必ず三つの写真を選んで"
          }
        }
      }
    }
  });
  
  // 创建实例
  var validator = $("#form").data("bootstrapValidator");

  // 点击按钮弹出模态框 动态渲染下拉菜单
  $(".addBtn").click(function () {
    $("#addModal").modal("show");

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        var str = template("tmp-ul", info);
        $("ul.dropdown-menu").html(str);
      }
    });
  });

  //事件委托 a绑定事件
  $("ul.dropdown-menu").on("click", "a", function () {
    var txt = $(this).text();
    $("span.txt").text(txt);

    $("input[name='brandId']").val($(this).parent().data("id"));
    
    validator.updateStatus("brandId","VALID");
  });

  //插件上传图片
  $("#uploadimg").fileupload({
    dataType: "json",
    done: function (e, data) {
      var imgObj = data.result;
      var imgSrc = imgObj.picAddr;

      imgArr.unshift(imgObj);

      $(".imgbox").prepend('<img src="' + imgSrc + '" alt="" height="100">');

      if (imgArr.length > 3) {
        imgArr.pop();
        $(".imgbox img:last-of-type").remove();
      }

      if(imgArr.length == 3){
        validator.updateStatus("imgtest","VALID");
      }

    }
  });
  
  //表单验证通过后发送后台
  $("#form").on("success.form.bv",function (event) {
       event.preventDefault();
       
       var str = $("#form").serialize();
       
       str += "&picName1="+imgArr[0].picName+"&picAddr1="+imgArr[0].picAddr;
       str += "&picName2="+imgArr[1].picName+"&picAddr2="+imgArr[1].picAddr;
       str += "&picName3="+imgArr[2].picName+"&picAddr3="+imgArr[2].picAddr;

       $.ajax({
         type : "post",
         url : "/product/addProduct",
         data : str,
         dataType : "json",
         success : function (info) {
          if(info.success){
             $("#addModal").modal("hide");

             currentPage = 1;
             render();

             validator.resetForm(true);

             $("span.txt").text("二級分類を選択してください");
             $(".imgbox img").remove();
             imgArr = [];
          }
         }
       });
  });

});