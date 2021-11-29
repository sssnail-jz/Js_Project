const {Article} = require('../../model/article');
const {Comment} = require('../../model/comment');
const {GitUser}= require('../../model/gituser');
const parseOriginOneArticle = require('../../tools/parseOriginOneArticle');
const parseOriginOneCommentArr = require('../../tools/parseOriginOneCommentArr');
const mongoose = require('mongoose');

module.exports = async function(req, res){
	const id = req.query.id;
	 
	// 为了新增评论时候定位到最底部
	const newcommentflags = req.query.newcommentflags;

	// 查找到这篇文章
	var originArticle = await Article.findOne({_id: mongoose.Types.ObjectId(id)}).populate('author'); 
	// 查找到这篇文章的所有评论
	var comments = await Comment.find({aid: id}).populate('uid');
	// 找到写这篇文章的人的信息
	var userinfoarticle = await GitUser.findOne({_id: originArticle.author});

	if(newcommentflags == null)
	{
		res.render('home/article', {
			article: parseOriginOneArticle(originArticle),
			userinfoarticle, userinfoarticle,
			comments: parseOriginOneCommentArr(comments)
		});
	}
	else{
		res.render('home/article', {
			article: parseOriginOneArticle(originArticle),
			comments: parseOriginOneCommentArr(comments),
			userinfoarticle, userinfoarticle,
			newcommentflags: true
		});
	}

}
