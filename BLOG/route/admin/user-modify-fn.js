const {User}= require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async function(req, res, next){
	// 拿到表单对象
	const body = req.body;
	// 拿到路由参数
	const id = req.query.id;
	// 数据库中根据 id 查找单例
	var user = await User.findOne({_id : id});
	// 比对密码
	var isValid = await bcrypt.compare(body.password, user.password);
	if(isValid){
		await User.updateOne({_id : id},{
			username: body.username,
			email: body.email,
			role: body.role,
			state: body.state
		});
		req.app.locals.userInfo = await User.findOne({_id : id});
		res.redirect('/admin/user');
	}else{
		var obj = {path: '/admin/user-edit', message: "密码比对错误，请确认密码", id : id};
		return next(JSON.stringify(obj));
	}
}