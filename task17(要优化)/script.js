    /* 数据格式演示
    var aqiSourceData = {
    "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
    }
    };
    */

    var color = ['#3cb4c9','#3ea0ca','#3f8ccb','#4078cc','#4265cd','#4351ce','#4b45d0','#6246d1','#7848d2','#8e49d3'];

    var $ = function(el){return document.querySelector(el);};

    // 以下两个函数用于随机模拟生成测试数据
    function getDateStr(dat) {
        var y = dat.getFullYear();
        var m = dat.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = dat.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }
    function randomBuildData(seed) {
        var returnData = {};
        var dat = new Date("2016-01-01");
        var datStr = ''
        for (var i = 1; i < 92; i++) {
            datStr = getDateStr(dat);
            returnData[datStr] = Math.ceil(Math.random() * seed);
            dat.setDate(dat.getDate() + 1);
        }
        return returnData;
    }

    var aqiSourceData = {
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "厦门": randomBuildData(100),
        "沈阳": randomBuildData(500)
    };

    // 用于渲染图表的数据
    var chartData = {};

    // 记录当前页面的表单选项
    var pageState = {
        nowSelectCity: -1,
        nowGraTime: "day"
    }

    /**
    * 渲染图表
    */
    function renderChart() {


        var citySel = $('#city').getElementsByTagName('select')[0];
        var cityName = citySel.value;
        function getArrNow(){
        var citySel = $('#city').getElementsByTagName('select')[0];
        var cityName = citySel.value;    
        var arr = JSON.stringify(aqiSourceData[cityName]).slice(1,-1).split(',');
        var arrDay = [];
        var arrWeek = [0,0,0,0,0,0,0,0,0,0,0,0,0];
        var arrMonth = [0,0,0];
        for (var i = 0; i < arr.length; i++) {
            arrDay[i] = Number(arr[i].substring(13));
        }
        arrWeek.length = Math.ceil(arrDay.length/7);
        for (var i = 0; i < arrWeek.length; i++) {
            var len = ((i * 7 + 7)<arrDay.length?(i * 7 + 7):arrDay.length);
            for (var j = i * 7; j < len; j++) {
                arrWeek[i] += Math.round((arrDay[j]/7));
            }
        }
        arrMonth.length = 3;
        for (var i = 0; i < arrMonth.length; i++) {
            var arrM = arr.filter(function(x){
                if(x.indexOf('2016-0' + (i+1))!==-1){
                    return x;
                }
            });
            for (var j = 0; j < arrM.length; j++) {
            arrMonth[i] += Math.round(Number(arrM[j].slice(13))/30);                
            }
        }
        var divClass = pageState.nowGraTime;
        var arrNow = (divClass === 'day')?arrDay:(divClass === 'week')?arrWeek:arrMonth;
        return arrNow;
        }
        var arrNow = getArrNow();
        var divClass = pageState.nowGraTime;
        var aqiChart = $('#aqi-chart');
        var inputs = $('#date').getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].onclick = function(){
                pageState.nowGraTime = this.id;
                renderChart();
            }
        }

        var str = '<span></span>';
        for(var i = 0; i < arrNow.length; i++){
            str += '<div style="height:' + 0 +'px;" class="' + divClass +  '"></div>';
        };
        $('#aqi-chart').innerHTML = str;
        var div = $('#aqi-chart').getElementsByTagName('div');


            for (var i = 0; i < div.length; i++) {
                div[i].style.height = Number(arrNow[i]) + 'px';
            }    
        citySel.onchange = function(){
            var div = $('#aqi-chart').getElementsByTagName('div');
            var cityName = citySel.value;
            var arrNow = getArrNow();
                for (var i = 0; i < div.length; i++) {
                    div[i].style.height = arrNow[i] + 'px';               
                }
        }
    }
    renderChart();
    /**
    * 日、周、月的radio事件点击时的处理函数
    */
    function graTimeChange() {
    // 确定是否选项发生了变化 

    // 设置对应数据

    // 调用图表渲染函数
    }

    /**
    * select发生变化时的处理函数
    */
    function citySelectChange() {
    // 确定是否选项发生了变化 

    // 设置对应数据

    // 调用图表渲染函数
    }

    /**
    * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
    */
    function initGraTimeForm() {

    }

    /**
    * 初始化城市Select下拉选择框中的选项
    */
    function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

    // 给select设置事件，当选项发生变化时调用函数citySelectChange

    }

    /**
    * 初始化图表需要的数据格式
    */
    function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    }

    /**
    * 初始化函数
    */
    function init() {
        initGraTimeForm()
        initCitySelector();
        initAqiChartData();
    }

    // init();


    // (function(){
    //     var citySel = $('#city').getElementsByTagName('select')[0];
    //     var str = '<span></span>';
    //     for(var i = 0; i < 90; i++){
    //         var high = Math.ceil(Math.random() * 500);
    //         str += '<div style="height:' + 0 +'px;"></div>';
    //     }
    //     $('#aqi-chart').innerHTML = str;
    // })();


    // (function(){
    //     var citySel = $('#city').getElementsByTagName('select')[0];
    //     var div = $('#aqi-chart').getElementsByTagName('div');
    //     citySel.onchange = function(){
    //         if (citySel.value === '沈阳') {
    //             var str = '<span></span>';
    //             for(var i = 0; i < 90; i++){
    //                 var high = Math.ceil(Math.random() * 500);
    //                 div[i].style.height = high + 'px';
    //             }
    //         }
    //     }
    // })();