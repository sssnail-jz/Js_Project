const express = require('express');

const admin = express.Router();

admin.get('/login', require('./admin/loginPage'));

admin.post('/login', require('./admin/login'));

admin.get('/user', require('./admin/userPage'));

admin.get('/logout', require('./admin/logout'));

// 修改和添加都获取同一个页面，走同一个路由
admin.get('/user-edit', require('./admin/user-edit'));

// 修改和添加在提交的时候走不一样的路由
admin.post('/user-edit', require('./admin/user-edit-fn'));
admin.post('/user-modify', require('./admin/user-modify-fn'));

// 删除
admin.post('/delete', require('./admin/delete'));
module.exports = admin;