var http = require('http');
var url = require('url');

var app = http.createServer();

app.on('request', function(req, res){
	
	var method = req.method.toLowerCase();
	var pathname = url.parse(req.url).pathname;
	
	res.writeHead(200, {
		'content-type': 'text/html;charset=utf8'
	});
	
	if(method == 'get'){
		
		if(pathname == '/' || pathname == '/index'){
			res.end('欢迎来到主界面');
		}
		else if(pathname == '/list'){
			res.end('欢迎来到列表界面');
		}
		else{
			res.end("访问的页面不存在");
		}
		
	}
	if(method == 'post'){
		
	}
});

app.listen(3000);
console.log("服务器启动成功！");