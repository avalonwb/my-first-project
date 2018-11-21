// 区域滚动初始化

mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,
  indicators: false
});

// 提取地址栏数据的方法

function getData( key ) {
   
  var str = location.search;
  var obj = {};

  str = decodeURI(str);

  str = str.slice(1);

  var arr = str.split("&");

  arr.forEach(function (ele,index) {
     
     var k = ele.split("=")[0];

     var v = ele.split("=")[1];

     obj[k] = v;

  });

  return obj[key];

}


