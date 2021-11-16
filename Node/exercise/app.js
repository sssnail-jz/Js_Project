var http = require('http');
var mongoose = require('mongoose');
var url = require('url');
const querystring = require('querystring');

// 创建数据库
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser : true})
.then(function(){
	console.log('数据库连接成功！')
}).catch(function(){
	console.log('数据库连接失败！')
});

// 创建集合规则
var userSchema = new mongoose.Schema({
	// 名字
	name: {
		type:String,
		required:true,
		minlength: 2,
		maxlength: 20
	},
	// 年龄
	age: {
		type: Number,
		min: 18,
		max: 80
	},
	// 密码
	password: String,
	// 邮箱
	email: String,
	// ****
	// 爱好
	hobbies: [String]
});

// 创建集合
var User = mongoose.model('User', userSchema);

// 创建服务器
var app = http.createServer();

app.on('request', async function (req, res){
	var method = req.method;
	var {pathname, query} = url.parse(req.url, true);
	if(method == 'GET'){
		if(pathname == '/list' || pathname == '/'){
			
			var users = await User.find();
			console.log(users);
			
			var list_end = '';
			
			var list_head = `<!DOCTYPE html>`;
			
			var list_1 = `
			<html>
				<head>
					<meta charset="utf-8">
					<title>用户列表</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7
					/dist/css/bootstrap.min.css"/>
				</head>
				<body>
					<div class="container">
						<h6>
							<a href="/add" class="btn btn-primary">添加用户</a>
						</h6>
						<table class="table table-striped table-bordered">
							<tr>
								<td>用户名</td>
								<td>年龄</td>
								<td>爱好</td>
								<td>邮箱</td>
								<td>操作</td>
							</tr>
			`;
			
			list_end = list_head + list_1;
			
			users.forEach(function(item){
				
				list_end += `
					<tr>
					<td>${item.name}</td>
					<td>${item.age}</td>
					<td>`;
					
					
				item.hobbies.forEach(function(item){
					list_end += `<span>${item}</span>`;
				});
				 
				list_end += `
					</td>
					<td>${item.email}</td>
					<td>
						<a href="/delete?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
						<a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
					</td>
					</tr>
				`;
			});
			
			var list_2 = `
			</table>
					</div>
				</body>
			</html>
			`;
			
			list_end += list_2;
			
			res.end(list_end);
		}
		if(pathname == '/add'){
			var add = `
			<!DOCTYPE html>
			<html>
				<head>
					<meta charset="utf-8">
					<title>添加用户</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7
					/dist/css/bootstrap.min.css"/>
				</head>
				<body>
					<div class="container">
						<h3>添加用户</h3>
						<form method = "post" action = "/add">
							<div class="form-group">
								<label>用户名</label>
								<input name = "name" type="text" class="form-control" placeholder="请输入用户名"/>
							</div>
							<div class="form-group">
								<label>密码</label>
								<input name = "password" type="text" class="form-control" placeholder="请输入用户名"/>
							</div>
							<div class="form-group">
								<label>年龄</label>
								<input name = "age" type="text" class="form-control" placeholder="请输入用户名"/>
							</div>
							<div class="form-group">
								<label>邮箱</label>
								<input name = "email" type="text" class="form-control" placeholder="请输入用户名"/>
							</div>
							<div class="form-group">
								<label>请选择爱好</label>
								<div>
									<label class="checkbox-inline"></label>
									<input type="checkbox" value="足球" name = "hobbies"/>足球
									<label class="checkbox-inline"></label>
									<input type="checkbox" value="篮球" name = "hobbies"/>篮球
									<label class="checkbox-inline"></label>
									<input type="checkbox" value="橄榄球" name = "hobbies"/>橄榄球
									<label class="checkbox-inline"></label>
									<input type="checkbox" value="敲代码" name = "hobbies"/>敲代码
								</div>
							</div>
							<button type = "submit" class = "btn btn-primary">添加用户</button>
						</form>
					</div>
				</body>
			</html>
			
			`;
			res.end(add);
		}
		if(pathname == '/modify'){
			var user = await User.findOne({_id: query.id});
			var hobbies = ['足球', '篮球','橄榄球','敲代码'];
			var modify =  `
			<!DOCTYPE html>
			<html>
				<head>
					<meta charset="utf-8">
					<title>修改用户</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7
					/dist/css/bootstrap.min.css"/>
				</head>
				<body>
					<div class="container">
						<h3>添加用户</h3>
						<form method = "post" action = "/modify?id=${user._id}">
							<div class="form-group">
								<label>用户名</label>
								<input value = "${user.name}" name = "name" type="text" class="form-control" placeholder="请输入用户名"/>
							</div>
							<div class="form-group">
								<label>密码</label>
								<input value = "${user.password}" name = "password" type="text" class="form-control" placeholder="请输入用户名"/>
							</div>
							<div class="form-group">
								<label>年龄</label>
								<input value = "${user.age}" name = "age" type="text" class="form-control" placeholder="请输入用户名"/>
							</div>
							<div class="form-group">
								<label>邮箱</label>
								<input value = "${user.email}" name = "email" type="text" class="form-control" placeholder="请输入用户名"/>
							</div>
							<div class="form-group">
								<label>请选择爱好</label>
								<div>
			`;
			
			hobbies.forEach(function(item){
				var isincludes = user.hobbies.includes(item);
				if(isincludes){
					modify +=`
						<label class="checkbox-inline"></label>
						<input type="checkbox" value="${item}" name = "hobbies" checked/>${item}
					`;
				}else{
					modify +=`
						<label class="checkbox-inline"></label>
						<input type="checkbox" value="${item}" name = "hobbies"/>${item}
					`;
				}
			});
			
			modify += `
				</div>
							</div>
							<button type = "submit" class = "btn btn-primary">修改用户</button>
						</form>
					</div>
				</body>
			</html>
			`;
			
			res.end(modify);
		}
		if(pathname == '/delete'){
			await User.deleteOne({_id: query.id});
			res.writeHead(301, {
				Location: '/list'
			});
			res.end();
		}
	}else if(method == 'POST'){
		if(pathname == '/add'){
			var formdata = '';
			req.on('data', function(param){
				formdata += param;
			});
			req.on('end', async function(){
				var user = querystring.parse(formdata);
				console.log(user);
				await User.create(user);
				res.writeHead(301, {
					Location: '/list'
				});
				res.end();
			});
		}
		if(pathname == '/modify'){
			var formdata = '';
			req.on('data', function(param){
				formdata += param;
			});
			req.on('end', async function(){
				var user = querystring.parse(formdata);
				console.log(user);
				await User.updateOne({_id: query.id}, user);
				res.writeHead(301, {
					Location: '/list'
				});
				res.end();
			});
		}
	}
});

app.listen(3000);

console.log('服务器启动成功！');