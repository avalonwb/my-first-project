  // 存测试数据
  // var arr = ["红","橙","黄","岚"];
  // localStorage.setItem("searchList",JSON.stringify(arr));
  
  $(function () {
    
    // 进入页面 读取localStorage 渲染历史记录

    render();
    
    // 获取localStorage的json字符串 并转成数组
    function getList() {

      var str = localStorage.getItem("searchList");
    
      var arr = JSON.parse(str);

      return arr;
    }
    
    // 根据数组渲染历史记录
    function render() {
      // 没有记录时返回null,需要设置默认值 方便后面判断长度
      var arr = getList() || [];
      
      var htmlStr = template("historytmp",{ list : arr });
    
      $(".box").html(htmlStr);

    }

    $("#addBtn").click(function () {
      // console.log(1);
      
    });




  });