const http = require('http');
const yrl = require('url');

// app对象就是网站服务器对象
const app = http.createServer();

// 当客户端有请求过来的时候
app.on('request', function(req, res){
	// 获取请求方式
	// console.log(req.method)
	
	// 解析请求的 url
	console.log(req.url);
	// 1）要解析的 url
	// 2）将 url 解析为对象的形式
	var {query, pathname} = url.parse(req.url, true);
	console.log(query.name);
	console.log(query.pass);
	
	// 获取请求地址
	if(pathname == '/index' || pathname == '/'){
		res.end('<h2>欢迎来到首页</h2>');
	}
	else if(pathname == '/list'){
		res.end('welcome to listpage.');
	}
	else{
		res.end('not fond.');
	}
	
	// 书写响应的标头
	res.writeHead(200, {
		'content-type':'text/html;charset=utf8',
		'hello':'world'
	});
	
	// 获取请求标头
	// console.log(req.headers);
	// console.log(req.headers['accept']);
	
	// if(req.method == 'GET'){
	// 	res.end('get');
	// }
	// if(req.method == 'POST'){
	// 	res.end('post');
	// }
	
	// res.end('<h2>hello user</h2>');
});

// 监听端口
app.listen(3000);

console.log('网站服务器启动成功！');