// echars

 $(function () {
      
   // 基于准备好的dom，初始化echarts实例
   var leftChart = echarts.init(document.querySelector(".eform .left"));
   var rightChart = echarts.init(document.querySelector(".eform .right"));

   // 指定图表的配置项和数据
   var option = {
       title: {
           text: '二酸化炭素の密度'
       },
       tooltip: {},
       legend: {
           data:['MPI']
       },
       xAxis: {
           data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
       },
       yAxis: {},
       series: [{
           name: 'MPI',
           type: 'line',
           data: [5, 20, 36, 10, 10, 20]
       }]
   };
   var option1 = {
    title : {
        text: 'ブランド製品',
        subtext: '2018.11.16',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['新聞','テレビ','広告','ネット','サーチエンジン']
    },
    series : [
        {
            name: '種類',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'新聞'},
                {value:310, name:'テレビ'},
                {value:234, name:'広告'},
                {value:135, name:'ネット'},
                {value:548, name:'サーチエンジン'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
   };

   // 使用刚指定的配置项和数据显示图表。
   leftChart.setOption(option);
   rightChart.setOption(option1);
  　　

 });