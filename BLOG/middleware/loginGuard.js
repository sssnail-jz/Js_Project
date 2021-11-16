const guard = function(req,res,next){
	// 判断用户访问的是否是登陆页面
	// 判断用户的登录状态
	// 如果用户是登录的，将请求放行
	// 如果用户不是登录的，将请求重定向到登录页面
	// [如果用户以非 login 的路由访问服务器，但是携带的 cookie 是空的
	// 说明用户不是在登录状态访问非 login 路由，让用户到 login 页面，
	// 否则，用户以登录状态访问非 login 路由是允许的。]
	if(req.url != '/login' && !req.session.username){
		res.redirect('/admin/login');
	}else{
		next();
	}
}

module.exports = guard;
