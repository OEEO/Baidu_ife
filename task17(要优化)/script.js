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

    function renderChart() {
        //选择菜单、日月周按钮、图表容器
        var citySel = $('#city').getElementsByTagName('select')[0];
        var inputs = $('#date').getElementsByTagName('input');
        var aqiChart = $('#aqi-chart');
        var aqiChartCaption = $('#aqi-chart-caption');
        var cityName;
        var nowGraTime = 'day';
        //获取目前要显示的数组
        function getArrNow(){
        cityName = citySel.value;    
        var arr = JSON.stringify(aqiSourceData[cityName]).slice(1,-1).split(',');
        //返回的二维数组，第一个数组是条形图的title，第二个数组是条形图的高度
        var arrNow = [[],[]];
        var arrDay = [];
        var arrWeek = [];
        var arrMonth = [];
        var arrDayTitle = [];
        var arrWeekTitle = [];
        var arrMonthTitle = [];
        //日数组
        for (var i = 0; i < arr.length; i++) {
            arrDay[i] = Number(arr[i].substring(13));
            arrDayTitle[i] = arr[i].slice(1,11);
        }
        //周数组
        arrWeek.length = Math.ceil(arrDay.length/7);
        arrWeek.fill(0);
        arrWeekTitle.fill(0);
        for (var i = 0; i < arrWeek.length; i++) {
            var len = ((i * 7 + 7)<arrDay.length?(i * 7 + 7):arrDay.length);
            for (var j = i * 7; j < len; j++) {
                arrWeek[i] += Math.round((arrDay[j]/7));
                arrWeekTitle[i] = '第' + i + '周';
            }
        }
        //月数组
        arrMonth.length = Math.ceil(arrDay.length/31);
        arrMonth.fill(0);
        arrMonthTitle.fill(0);
        for (var i = 0; i < arrMonth.length; i++) {
            var arrM = arr.filter(function(x){
                if(x.indexOf('2016-0' + (i+1))!==-1){
                    return x;
                }
            });
            for (var j = 0; j < arrM.length; j++) {
            arrMonth[i] += Math.round(Number(arrM[j].slice(13))/30); 
            arrMonthTitle[i] = i + '月';               
            }
        }
            var divClass = nowGraTime;
            arrNow[0] = (divClass === 'day')?arrDay:(divClass === 'week')?arrWeek:arrMonth;
            arrNow[1] = (divClass === 'day')?arrDayTitle:(divClass === 'week')?arrWeekTitle:arrMonthTitle;
            return arrNow;
        }

        // 图表初始化
        function int(){
            // 创建城市列表option
            var cityArr = [];
            for(var key in aqiSourceData){
                if (aqiSourceData.hasOwnProperty(key)) {
                    cityArr.push(key);
                }
            }
            var cityOption = '';
            for (var i = 0; i < cityArr.length; i++) {
                cityOption += '<option>' + cityArr[i] + '</option>';
            }
            citySel.innerHTML = cityOption;
            aqiChartCaption.innerHTML = '北京每日空气质量报告';
            // 刷新浏览器时初始化数据
            citySel.value = '北京';
            inputs[0].checked = true;
            var arrNow = getArrNow();
            var divClass = nowGraTime;
            var str = '<span></span>';
            for(var i = 0; i < arrNow[0].length; i++){
                str += '<div style="height:' + 0 +'px;" class="' + divClass +  '"></div>';
            };
            aqiChart.innerHTML = str;
            var div = aqiChart.getElementsByTagName('div');
            setTimeout(function(){
                for (var i = 0; i < div.length; i++) {
                    div[i].style.height = Number(arrNow[0][i]) + 'px';
                    div[i].title = arrNow[1][i];
                }                       
            },50);
        }
        int();

        // 日、周、月的radio事件点击时的处理函数
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].onclick = function(){
                nowGraTime = this.id;
                var arrNow = getArrNow();
                var divClass = nowGraTime;
                var chnNowGraTime = ((divClass === 'day')?'日':(divClass === 'week')?'周':'月');
                aqiChartCaption.innerHTML = aqiChartCaption.childNodes[0].nodeValue.replace(/[日周月]/,chnNowGraTime);
                var str = '<span></span>';
                for(var i = 0; i < arrNow[0].length; i++){
                    str += '<div style="height:' + 0 +'px;" class="' + divClass +  '"></div>';
                };

                var div = aqiChart.getElementsByTagName('div');
                aqiChart.innerHTML = str;
                setTimeout(function(){
                    for (var i = 0; i < div.length; i++) {
                        div[i].style.height = Number(arrNow[0][i]) + 'px';
                        div[i].title = arrNow[1][i];
                    }                       
                },50);
            }  
        }

        // 城市选择onchange的事件处理函数
        citySel.onchange = function(){
            cityName = citySel.value;
            aqiChartCaption.innerHTML = aqiChartCaption.childNodes[0].nodeValue.replace(/.+(?=每)/,cityName);
            var div = aqiChart.getElementsByTagName('div');
            var arrNow = getArrNow();
            for (var i = 0; i < div.length; i++) {
                div[i].style.height = arrNow[0][i] + 'px';
                div[i].title = arrNow[1][i];               
            }
        }
    }
    renderChart();
