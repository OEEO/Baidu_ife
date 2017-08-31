    function changeRank(){
    	var box = document.getElementById('box');
    	var input = document.getElementById('input');
    	var searchBtn = document.getElementById('search');
        var str = document.getElementById('str');
        var strArr = [];
        var single = document.getElementById('single');
        var sinArr = [];
        var tar = document.getElementById('tag');
        single.onkeydown = function(event){
            if (event.keyCode === 32 || event.keyCode === 13 || event.keyCode === 188) {
                singleValue = single.value.trim().match(/[0-9a-zA-Z\u4e00-\u9fa5]+/gm);
                if(singleValue === null){
                    alert('请输入数据');
                    return;
                }
                singleValue = singleValue.filter(function(x){
                    for (var i = 0; i < sinArr.length; i++) {
                        if (x === sinArr[i]){
                            return false;
                        }
                    }
                    return true;
                });
                sinArr = sinArr.concat(singleValue);

                if(sinArr.length > 10){
                    sinArr = sinArr.slice(-10);
                }
                var single1 = '';
                for (var i = sinArr.length -1; i >= 0; i--) {
                    single1 += '<div>' + sinArr[i] + '</div>';
                }
                tag.innerHTML = single1;
                var timer = setTimeout(function(){
                    single.value = '';
                },0);
            }
        }

    	//按钮点击事件
    	input.onclick = function(){
            var strValue = str.value.trim().match(/[0-9a-zA-Z\u4e00-\u9fa5]+/gm);
            if(strValue === null){
                alert('请输入数据');
                return;
            }
            strValue = strValue.filter(function(x,index){
                return strValue.indexOf(x,index+1) === -1;
            });
            strValue = strValue.filter(function(x){
                for (var i = 0; i < strArr.length; i++) {
                    if (x === strArr[i]){
                        return false;
                    }
                }
                return true;
            });
            strArr = strArr.concat(strValue);
            if(strArr.length > 10){
                strArr = strArr.slice(-10);
            }
            var str1 = '';
            for (var i = strArr.length -1; i >= 0; i--) {
                str1 += '<div>' + strArr[i] + '</div>';
            }
            box.innerHTML = str1;
            str.value = '';
    	}

    	searchBtn.onclick = function(){
    		var searchText = document.getElementById('search-text').value.trim();
    		if(searchText === undefined){
    			alert('请输入要搜索的内容');
    			return;
    		}
    		var div = box.getElementsByTagName('div');
    		for (var i = 0; i < div.length; i++) {
    			div[i].style.backgroundColor = '#580094';
    			if (div[i].innerHTML.search(new RegExp('^' + searchText + '$')) !== -1) {
    				div[i].style.backgroundColor = 'red';
    			}
    		}
    	}

        //元素onmouseover添加删除字样
        box.addEventListener('mouseover',function(e){
            if(e.target && e.target.nodeName === 'DIV'){
                e.target.innerHTML = '删除：' + e.target.innerHTML; 
            }
        })

        //元素onmouseout去掉删除字样
        box.addEventListener('mouseout',function(e){
            if(e.target && e.target.nodeName === 'DIV'){
                e.target.innerHTML = e.target.innerHTML.replace(/删除：/,''); 
            }
        })

        //元素点击移除事件
        box.addEventListener('click',function(e){
        	if(e.target && e.target.nodeName === 'DIV'){
        		box.removeChild(e.target);
        	}
        })

        //元素onmouseover添加删除字样
        tag.addEventListener('mouseover',function(e){
            if(e.target && e.target.nodeName === 'DIV'){
                e.target.innerHTML = '删除：' + e.target.innerHTML; 
            }
        })

        //元素onmouseout去掉删除字样
        tag.addEventListener('mouseout',function(e){
            if(e.target && e.target.nodeName === 'DIV'){
                e.target.innerHTML = e.target.innerHTML.replace(/删除：/,''); 
            }
        })

        //元素点击移除事件
        tag.addEventListener('click',function(e){
            if(e.target && e.target.nodeName === 'DIV'){
                tag.removeChild(e.target);
            }
        })


    }
    changeRank();