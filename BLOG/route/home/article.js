const {Article} = require('../../model/article');
const {Comment} = require('../../model/comment');
const parseOriginOneArticle = require('../../tools/parseOriginOneArticle');
const mongoose = require('mongoose');

module.exports = async function(req, res){
	const id = req.query.id;
	// 查找到这篇文章
	var originArticle = await Article.findOne({_id: mongoose.Types.ObjectId(id)}).populate('author'); 
	// 查找到这篇文章的所有评论
	var comments = await Comment.find({aid: id});

	res.render('home/article', {
		article: parseOriginOneArticle(originArticle),
		comments: comments
	});
}
