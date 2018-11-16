

$(function () {

  // 表单验证初始化
  $("#form").bootstrapValidator({
    //  配置提示图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //  配置需要校验的字段
    fields: {
      username: {
        // 配置校验规则
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLength: {
            max: 12,
            min: 4,
            message: "用户名长度为4-12"
          },
          callback : {
            message : "用户名错误"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            max: 12,
            min: 6,
            message: "密码长度为6-12"
          },
          callback : {
            message : "密码错误"
          }
        }
      }
    }
  });
  
  //  创建bootstrapValidator实例

  var bv = $("#form").data("bootstrapValidator");

  // 验证通过后触发验证通过事件,ajax提交,阻止提交按钮默认行为

  $("#form").on('success.form.bv', function (e) {
    // 阻止提交按钮默认行为
    e.preventDefault();

    $.ajax({
      type : "post",
      url : "/employee/employeeLogin",
      data : $('#form').serialize(),
      dataType : "json",
      success : function ( info ) {
        //  console.log(info);
        if(info.success){
          location.href = "index.html";
        }
        if(info.error === 1000){
          bv.updateStatus("username","INVALID","callback");
        }
        if(info.error === 1001){
          bv.updateStatus("password","INVALID","callback");
        }       
      }
    });
    
  }); 

  // 点击重置按钮 重置状态
  $("button[type='reset']").click(function () {
    //  console.log(1);
    bv.updateStatus("username", 'NOT_VALIDATED');
    bv.updateStatus("password", 'NOT_VALIDATED');
  });

});