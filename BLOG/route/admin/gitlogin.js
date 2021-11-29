module.exports = function(req, res){
	console.log(req.query.gituserinfo);
	res.redirect('/home/');
}

// user 数据库设计
// {
// 	_id: 'akdhskfjlsdjfsjfdjslfj', // 用于集合关联
// 	node_id: '唯一标识git用户的ID', // 用于识别用户

// 	// 以下为信息字段
// 	login: 'git用户名',
// 	avatar_url: 'git用户的头像',
// 	html_url: 'git用户的主页'
// }