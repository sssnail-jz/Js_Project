const {Article} = require('../../model/article');

module.exports = async function(req, res){
	
	const id = req.query.id;
	// 查找到这篇文章
	var article = await Article.findOne({_id: id}); 

	console.log(article);

	res.render('home/article-mod', {
		articleMod: true,
		article:article
	});
}