  // 存测试数据
  // var arr = ["红","橙","黄","岚"];
  // localStorage.setItem("searchList",JSON.stringify(arr));
  
  $(function () {
    
    // 进入页面 读取localStorage 渲染历史记录

    render();
    
    // 获取localStorage的json字符串 并转成数组
    function getList() {

      var str = localStorage.getItem("searchList");

      // 没有记录时返回null,需要设置默认值 方便后面判断长度
      var arr = JSON.parse(str) || [];

      return arr;
    }
    
    // 根据数组渲染历史记录
    function render() {

      var arr = getList();
      
      var htmlStr = template("historytmp",{ list : arr });
    
      $(".box").html(htmlStr);

    }
    
    // 更新历史记录并渲染
    $("#addBtn").click(function () {
      // console.log(1);
      var key = $("#ipt").val();

      if(key.trim() === ""){
          mui.toast("搜索内容不能为空",{
            duration : 2000
          });
      }else{
        var arr = getList();
      
        // 判断有无重复 有就删除
        if(arr.indexOf(key) !== -1){
          arr.splice(arr.indexOf(key),1);
        }
        
        // 在最前面添加搜索词
        arr.unshift(key);
        
        // 历史记录最多不能超过5条
        if(arr.length > 5){
           arr.pop();
        }
  
        localStorage.setItem("searchList",JSON.stringify(arr));
  
        render();
  
        $("#ipt").val("");
        
        // 跳转到列表页
        location.href = "searchList.html?key="+key;
      }   
      
    });
    
    // 清空历史记录功能
    $(".box").on("click",".title .right",function () {
       
       // 配置提示框 
       mui.confirm("确定要全删吗","你确定?",['不确定','确定'],function (event) {
          // console.log(event);
          if(event.index == 1){
             localStorage.removeItem("searchList");
             // 删完重新渲染
             render();  
          }
       });
    });

    // 清空单个历史记录
    $(".box").on("click",".del-btn",function () {
      var index = $(this).data("index");

      var arr = getList();

      arr.splice(index,1);
      
      // 删完后 存回localStorage 重新渲染
      localStorage.setItem("searchList",JSON.stringify(arr));

      render();
      
    });


  });