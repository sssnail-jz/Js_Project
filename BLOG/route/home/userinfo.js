const { Article } = require('../../model/article');
const { User } = require('../../model/user');
const mongoose = require('mongoose');

module.exports = async function(req, res) {

	const id = req.query.id;
	
	// 这里 将 id 转换为 ObjectId 在进行比较 
	var articles = await Article.find({author: mongoose.Types.ObjectId(id)});	

	console.log(articles);
    res.render('home/userinfo', {
		userinfoshow: true,
		// 传递用户信息到用户信息模板
		userInfo: req.app.locals.userInfo,
		// 传递此用户相关的文章列表到模板
		articles: articles
	});
}