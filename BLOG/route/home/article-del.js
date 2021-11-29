const {Article} = require('../../model/article');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {

	const id = req.query.id;
	await Article.deleteOne({_id: mongoose.Types.ObjectId(id)});

	var articles = await Article.find({author: req.app.locals.userInfo._id});	

    res.render('home/userinfo', {
		userinfoshow: true,
		// 传递用户信息到用户信息模板
		userInfo_: req.app.locals.userInfo,
		// 传递此用户相关的文章列表到模板
		articles: articles
	});
}