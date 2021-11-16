const express = require('express');
const path = require('path');
// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
// 引入连接数据库模块
const mongoose = require('./model/connect');
// 引入 body-parser模块，用来处理 post 请求参数
const bodyParser = require('body-parser');
const session = require('express-session');
// // 创建用户
// require('./model/user');

// 创建网站服务器
const app = express();
	
// 配置模板文件位置
app.set('views', path.join(__dirname, 'views'));
// 配置模板后缀
app.set('view engine', 'art');
// 指定渲染 art 模板使用的引擎
app.engine('art', require('express-art-template'));
	
// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
// 配置 body-parser
app.use(bodyParser.urlencoded({extended: false}));
// 配置 session
app.use(session({secret: 'secret key'}));

// 设置消息中间件
app.use('/admin', require('./middleware/loginGuard'));

// 为路由匹配对象
app.use('/home', home);
app.use('/admin', admin);

// 设置错误处理消息中间件
app.use(function(err, req, res, next){
	var result = JSON.parse(err);
	// 拼接路由参数
	let params = [];
	for(var attr in result){
		if(attr != 'path'){
			params.push(attr + '=' + result[attr]);
		}
	}
	// 组合路由参数
	res.redirect(`${result.path}?${params.join('&')}`);
});

// 监听端口
app.listen(80);

console.log('server start success..');