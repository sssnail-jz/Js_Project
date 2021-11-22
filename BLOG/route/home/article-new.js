const {Article} = require('../../model/article');

module.exports = async function(req, res){
	
	res.render('home/article-new');
}