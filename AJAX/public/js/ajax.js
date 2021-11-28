function ajax(option){

	var defaults = {
		type: 'get',
		url:'',
		data:{},
		header: {
			'Content-type': 'application/x-www-form-urlencoded'
		},
		success: function(){},
		error: function(){}
	}

	Object.assign(defaults, option);

	var xhr = new XMLHttpRequest();
	
	// 将 json 格式的参数拼接为urlencoded格式
	var params = '';
	for(var attr in defaults.data){
		params += attr + '=' + defaults.data[attr] + '&';
	}
	params = params.substr(0, params.length - 1);
	
	// 配置 open （get）
	if(defaults.type == 'get'){
		defaults.url = defaults.url + '?' + params;
	}
	xhr.open(defaults.type, defaults.url);
	
	// 配置 send （post）
	if(defaults.type == 'post'){
		// 配置 post 参数的编码格式
		var contentType = defaults.header['Content-Type'];
		xhr.setRequestHeader('Content-Type', contentType);
		
		if(contentType == 'application/x-www-form-urlencoded'){
			xhr.send(params);
		}else{
			xhr.send(JSON.stringify(defaults.data));
		}
	}
	else{ // get 方法不需要配置 send 函数
		xhr.send();
	}

	xhr.onload = function(){

		// 获取响应头中的数据
		var contentType = xhr.getResponseHeader('Content-Type');
		// 服务器端返回的数据
		var responseText = xhr.responseText;
		// 如果响应头中包含 application/json
		if(contentType.includes('application/json')){
			responseText = JSON.parse(responseText);
		}

		if(xhr.status == 200){
			defaults.success(xhr);
		}else{
			defaults.error(xhr);
		}	
	};
}