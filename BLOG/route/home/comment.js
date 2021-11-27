const {Comment} = require('../../model/comment');

module.exports = async function(req, res){
	const {content, aid} = req.body;
	await Comment.create({
		content: content,
		uid: req.app.locals.userInfo._id,
		aid: aid,
		time: new Date()
	});
	
	// newcommentflags 为了新增评论时候定位到最底部
	res.redirect('/home/article?id=' + aid + '&newcommentflags=true');
};