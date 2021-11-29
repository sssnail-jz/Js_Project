const {Article} = require('../../model/article');
const {GitUser}= require('../../model/gituser');
const parseOriginArticleArr = require('../../tools/parseOriginArticleArr');

module.exports = async function(req, res){
	
	var label = req.query.label;
	var articles = null;
	if(label == null){
		articles = await Article.find().populate('author');
	}else{
		articles = await Article.find({label: label}).populate('author');
	}
	// 文章总数，用来显示
	var articleCount = await Article.countDocuments();

	// 查找到所有的用户
	var users = await GitUser.find();

	res.render('home/default', {
		articles: parseOriginArticleArr(articles),
		users: users,
		articleCount: articleCount
		});
}

