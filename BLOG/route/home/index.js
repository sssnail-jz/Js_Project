const {Article} = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async function(req, res){
	
	var page = req.query.page;
	var articles = await pagination(Article).find().page(page).size(4).display(5).exec();	
		
	res.render('home/default', {
		articles: articles,
		articleNew: true
		});
}