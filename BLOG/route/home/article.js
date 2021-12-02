const {Article} = require('../../model/article');
const {Comment} = require('../../model/comment');
const {GitUser}= require('../../model/gituser');
const parseOriginOneArticle = require('../../tools/parseOriginOneArticle');
const parseOriginCommentArr = require('../../tools/parseOriginCommentArr');
const mongoose = require('mongoose');

module.exports = async function(req, res){
	req.app.locals.userInfo = await GitUser.findOne({node_id: req.session.node_id});
	
	const id = req.query.id;
	 
	// 为了新增评论时候定位到最底部
	const newcommentflags = req.query.newcommentflags;

	// 查找到这篇文章
	var originArticle = await Article.findOne({_id: mongoose.Types.ObjectId(id)}).populate('author'); 
	// 查找到这篇文章的所有评论
	var comments = await Comment.find({aid: id}).populate('uid');
	// 找到写这篇文章的人的信息
	var userinfoarticle = await GitUser.findOne({_id: originArticle.author._id});

	if(newcommentflags == null)
	{
		res.render('home/article', {
			article: parseOriginOneArticle(originArticle),
			userinfoarticle, userinfoarticle,
			comments: parseOriginCommentArr(comments)
		});
	}
	else{
		res.render('home/article', {
			article: parseOriginOneArticle(originArticle),
			comments: parseOriginCommentArr(comments),
			userinfoarticle, userinfoarticle,
			newcommentflags: true
		});
	}

}
