// 服务器端直接 res.jsonp({name: 'jack'}) 传递参数并调用函数
function jsonp(options){
	// 动态创建 script 元素
	var script = document.createElement('script');

	// 拼接 get 请求参数
	var params = '';

	for(var attr in options.data){
		params += '&' + attr + '=' + options.data[attr];
	}

	// 为全局window挂载随机函数
	var fnName = 'myJsonp' + Math.random().toString().replace('.','');
	window[fnName] = options.success;

	// 添加 src 属性
	script.src = options.url + '?callback=' + fnName + params;

	// 将 script 追加到页面中
	document.body.appendChild(script);

	// 删除 script 标签
	script.onload = function(){
		document.body.removeChild(script);
	}
}