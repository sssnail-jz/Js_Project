const {GitUser}= require('../../model/gituser');

module.exports = async function(req, res){

	//// 测试环境
	// 记录用户已经登录的标志
	req.session.node_id = 'U_kgDOBa6p7w';

	// 将用户的信息保存进全局
	var gituser = await GitUser.findOne({node_id: 'U_kgDOBa6p7w'});
	req.app.locals.userInfo = gituser;

	res.redirect('/home/');

	//// 真实环境
	// res.render('admin/login');
}