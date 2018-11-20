// 区域滚动初始化

mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, 
  indicators: false
});

// 封装获取地址栏数据的方法

function getData( key ) {
    
   var str = location.search;  
   var obj = {};

   str = decodeURI(str);
   // ?key=月&name=12
   str = str.slice(1);
   // key=月&name=12
   var arr = str.split("&");
   // ["key=月", "name=12"]
   arr.forEach(function (ele,index) {
     var k = ele.split("=")[0];
     var v = ele.split("=")[1];

     obj[k] = v;
   });
   //{key: "月", name: "12"} 

   return obj[key];
     
}

