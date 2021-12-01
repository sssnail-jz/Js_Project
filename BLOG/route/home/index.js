const {Article} = require('../../model/article');
const {GitUser}= require('../../model/gituser');
const parseOriginArticleArr = require('../../tools/parseOriginArticleArr');
const assignArticleInfoToUser = require('../../tools/assignArticleInfoToUser');

module.exports = async function(req, res){
	req.app.locals.userInfo = await GitUser.findOne({node_id: req.session.node_id});
	
	var label = req.query.label;
	var articles = null;
	if(label == null){
		articles = await Article.find().populate('author');
	}else{
		articles = await Article.find({label: label}).populate('author');
	}

	res.render('home/default', {
		articles: parseOriginArticleArr(articles),
		users: await assignArticleInfoToUser()
		});
}

