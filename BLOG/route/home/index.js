const {Article} = require('../../model/article');
const {User}= require('../../model/user');
const parseOriginArticleArr = require('../../tools/parseOriginArticleArr');

module.exports = async function(req, res){
	
	var label = req.query.label;
	var articles = null;
	if(label == null){
		articles = await Article.find().populate('author');
	}else{
		articles = await Article.find({label: label}).populate('author');
	}
	
	var users = await User.find();
	res.render('home/default', {
		articles: parseOriginArticleArr(articles),
		users: users
		});
}

