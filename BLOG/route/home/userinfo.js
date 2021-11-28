const { Article } = require('../../model/article');
const { User } = require('../../model/user');
const mongoose = require('mongoose');
const parseOriginArticleArr = require('../../tools/parseOriginArticleArr');

module.exports = async function(req, res) {

	const id = req.query.id;
	
	var label = req.query.label;
	var articles = null;
	if(label == null){
		articles = await Article.find({
			author: mongoose.Types.ObjectId(id)}).populate('author');
	}else{
		articles = await Article.find({
			label: label,
			// 这里 将 id 转换为 ObjectId 在进行比较 
			author: mongoose.Types.ObjectId(id)}).populate('author');
	}
	
    res.render('home/userinfo', {
		userinfoshow: true,
		// 传递用户信息到用户信息模板
		userInfo: req.app.locals.userInfo,
		// 传递此用户相关的文章列表到模板
		articles: parseOriginArticleArr(articles),
	});
}