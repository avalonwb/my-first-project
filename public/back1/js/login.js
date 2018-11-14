// 表单验证初始化

$("#form").bootstrapValidator({

    // 配置显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置需要验证的字段
    fields : {
       username : {
         //配置验证规则
         validators : {
            notEmpty : {
              message : "用户名不能为空",
            }, 
            stringLength : {
              max : 12,
              min : 4,
              message : "用户名为4-12位"
            },
            callback : {
              message : "用户名不存在"
            }
         }
       },
       password : { 
         validators : {
            notEmpty : {
              message : "密码不能为空",
            },
            stringLength : {
              max : 12,
              min : 6,
              message : "密码为6-12位"
            },
            callback : {
              message : "密码错误"
            }
         }   
       }
    }

});

// 创建bootstrapValidator 的实例
var bv = $("#form").data("bootstrapValidator");

// console.log(bv);


// 通过表单验证后,触发插件的成功事件

$("#form").on("success.form.bv",function (event) {
  // 阻止按钮的默认提交行为
  event.preventDefault();
  
  // 发送ajax请求
  $.ajax({
     type : "post",
     url : "/employee/employeeLogin",
     data : $("#form").serialize(),
     dataType : "json",
     success : function (info) {
        // console.log(info);
        if(info.success){
           location.href = "index.html";
        }
        if(info.error == 1000){
           bv.updateStatus("username", "INVALID", "callback");
        }
        if(info.error == 1001){
           bv.updateStatus("password", "INVALID", "callba ck");
        }
     }
  });


});

// 重置按钮重置内容和状态
$("button[type='reset']").click(function () {
    // console.log(1);
    bv.resetForm();  
});
