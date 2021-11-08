const http = require('http');
const queryString = require('querystring');
const app = http.createServer();


// 当客户端有请求过来的时候
app.on('request', function(req, res){
	
	let postParams = '';
	req.on('data', function(param){
		postParams += param;
	});
	req.on('end', function(){
		console.log(queryString.parse(postParams));
	});
	res.end('OK');
	});

// 监听端口
app.listen(3000);

console.log('网站服务器启动成功！');