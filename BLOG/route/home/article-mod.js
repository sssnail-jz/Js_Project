const {Article} = require('../../model/article');
const parseOriginOneArticle = require('../../tools/parseOriginOneArticle');
const mongoose = require('mongoose');

module.exports = async function(req, res){
	
	const id = req.query.id;
	// 查找到这篇文章
	var article = await Article.findOne({_id: mongoose.Types.ObjectId(id)}).populate('author'); 

	console.log(article);

	res.render('home/article-mod', {
		articleMod: true,
		article:parseOriginOneArticle(article)
	});
}