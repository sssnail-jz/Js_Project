const { Article } = require('../../model/article');
const {GitUser}= require('../../model/gituser');
const mongoose = require('mongoose');
const parseOriginArticleArr = require('../../tools/parseOriginArticleArr');

module.exports = async function(req, res) {

	// 用户id
	const id = req.query.id;
	 
	var label = req.query.label;
	var articles = null;

	// 查找到此用户对应的文章列表
	if(label == null){
		articles = await Article.find({
			author: mongoose.Types.ObjectId(id)}).populate('author');
	}else{
		articles = await Article.find({
			label: label,
			// 这里 将 id 转换为 ObjectId 在进行比较 
			author: mongoose.Types.ObjectId(id)}).populate('author');
	}
	
	// 查找到此用户的信息
	var userInfo_ = await GitUser.findOne({_id: id});

    res.render('home/userinfo', {
		userinfoshow: true,
		// 传递用户信息到用户信息模板
		userInfo_: userInfo_,
		// 传递此用户相关的文章列表到模板
		articles: parseOriginArticleArr(articles),
	});
}