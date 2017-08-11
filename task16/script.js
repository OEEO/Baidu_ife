/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */



function addAqiData() {
  var aqiCity = document.getElementById('aqi-city-input').value;
  var aqiValue = document.getElementById('aqi-value-input').value;
  //判断输入数据是否正确发出警告
  if(!aqiCity.match(/^[A-Za-z\u4E00-\u9FA5]+$/) && !aqiValue.match(/^\d+$/)){
    alert('城市名字必须为中英文，空气质量指数必须为整数');  
    return;  
  }
  else if(!aqiCity.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
    alert('城市名字必须为中英文');
    return;
  }
  else if(!aqiValue.match(/^\d+$/)){
    alert('空气质量指数必须为整数');
    return;
  }
  aqiData[aqiCity] = aqiValue;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var str = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
  var arr = [];
  var aqiTable = document.getElementById('aqi-table');
  //用for in遍历对象的属性以及属性的值，储存到二维数组arr中
  for(var key in aqiData){
   if(aqiData.hasOwnProperty(key) === true){
      arr.push([key,aqiData[key]]);
    }
  }
  //当arr长度大于0时，渲染表格
  if(arr.length > 0){
    for (var i = 0; i < arr.length; i++) {
      str += '<tr><td>' + arr[i][0] + '</td><td>' + arr[i][1] + '</td><td><button>删除</button></td></tr>';
    }
    aqiTable.innerHTML = str;    
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(obj) {
  // 获取点击删除按钮对应的城市名称
  var index = obj.parentNode.parentNode.children[0].innerHTML;
  var a = confirm('你确定要删除城市' + '“' + index + '”' + '吗？');
  if(a === true){
    delete aqiData[index];//删除aqiData中的数据
    //从表格中删除内容
    obj.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode);
    if(JSON.stringify(aqiData) === '{}'){
      var aqiTable = document.getElementById('aqi-table');
      aqiTable.innerHTML = '';
    }
  }

}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById('add-btn');
  addBtn.onclick = function(){
    addBtnHandle();
  }  

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var aqiTable = document.getElementById('aqi-table');
  aqiTable.addEventListener('click',function(e){
    if(e.target && e.target.nodeName === 'BUTTON'){
       delBtnHandle(e.target);
    }
  });
}
init();