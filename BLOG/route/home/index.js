const {Article} = require('../../model/article');
const {User}= require('../../model/user');
const parseOriginArticleArr = require('../../tools/parseOriginArticleArr');

module.exports = async function(req, res){
	
	var page = req.query.page;
	// var articles = await pagination(Article).find().page(page).size(4).display(5).exec();	
	var articles = await Article.find().populate('author');
	var users = await User.find();
	res.render('home/default', {
		articles: parseOriginArticleArr(articles),
		users: users
		});
}

