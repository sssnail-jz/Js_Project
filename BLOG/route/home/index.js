const {Article} = require('../../model/article');
const {GitUser}= require('../../model/gituser');
const parseOriginArticleArr = require('../../tools/parseOriginArticleArr');
const assignArticleInfoToUser = require('../../tools/assignArticleInfoToUser');

/***
 * 1，查出所有的文章
 * 2，查出所有的用户[每个用户拥有的文章总数]
 */
module.exports = async function(req, res){
	req.app.locals.userInfo = await GitUser.findOne({node_id: req.session.node_id});
	
	var label = req.query.label;
	var articles = null;
	if(label == null){
		articles = await Article.find().populate('author');
	}else{
		articles = await Article.find({label: label}).populate('author');
	}

	res.render('home/index', {
		articles: parseOriginArticleArr(articles),
		users: await assignArticleInfoToUser()
	});
}
