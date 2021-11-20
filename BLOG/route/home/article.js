const {Article} = require('../../model/article');
const {Comment} = require('../../model/comment');

module.exports = async function(req, res){
	const id = req.query.id;
	// 查找到这篇文章
	var article = await Article.findOne({_id: id}); 
	// 查找到这篇文章的所有评论
	var comments = await Comment.find({aid: id});
	
	console.log(article.author.username);
	console.log(comments);
	
	res.render('home/article', {article, comments});
}