const express = require('express');

const home = express.Router();

home.get('/', require('./home/index'));

home.get('/article', require('./home/article'));

home.get('/article-new', require('./home/article-new'));

home.post('/comment', require('./home/comment'));

module.exports = home;