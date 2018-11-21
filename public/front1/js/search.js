// 测试用
// var arr = ["あ","い","う","え","お"];
// localStorage.setItem("searchList",JSON.stringify(arr));

$(function () {
  
  render();

  // 搜索添加历史记录功能
  $(".addBtn").click(function () {
    
    var key = $("#ipt").val();

    if(key.trim() == ""){
      mui.toast("何も検索してないよ",{
        duration : 2000
      });
    }else{
      
      var arr = getList();
      
      // 搜索内容不能重复
      if(arr.indexOf(key) !== -1){
        arr.splice(arr.indexOf(key),1);
      }

      arr.unshift(key);

      // 历史记录不能超过5条
      if(arr.length > 5){
        arr.pop();
      }
    
      localStorage.setItem("searchList",JSON.stringify(arr));

      render();

      $("#ipt").val("");

      location.href = "searchList.html?key="+key;

    }

  });
  
  // 单个删除功能
  $(".history").on("click",".delBtn",function () {

     var index = $(this).data("index");

     var arr = getList();

     arr.splice(index,1);

     localStorage.setItem("searchList",JSON.stringify(arr));

     render();
     
  });
  

  // 全部删除功能
  $(".history").on("click",".right",function () {
     
    mui.confirm("世界を無に戻らせるつもりかい？","さ！選べ、時が来た",['いいえ','はい'],function (event) {   
      if(event.index == 1){
        localStorage.removeItem("searchList");  
        render();
      }
    }); 

  });
  
  // 读取localStorage 转成数组
  function getList() {
  
    var str = localStorage.getItem("searchList");

    var arr = JSON.parse(str) || [];

    return arr;

  }

  // 根据localStorage取出的数组 渲染历史记录
  function render() {
     
    var arr = getList();
    
    var str = template("historyTmp",{list : arr});

    $(".history").html(str);

  }

});　