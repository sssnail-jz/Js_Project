const express = require('express');

const home = express.Router();

home.get('/', require('./home/index'));

home.get('/article', require('./home/article'));

// 新建文章 get 路由
home.get('/article-new', require('./home/article-new'));

// 修改文章 get 路由
home.get('/article-mod', require('./home/article-mod'));

// 删除文章 get 路由
home.get('/article-del', require('./home/article-del'));

// 文章数据提交路由
home.post('/article-submit', require('./home/article-submit'));

// 文章数据修改提交路由
home.post('/article-mod-fn', require('./home/article-mod-fn'));

// 提交文章评论
home.post('/comment', require('./home/comment'));

// 个人信息展示
home.get('/userinfo', require('./home/userinfo'));

module.exports = home;