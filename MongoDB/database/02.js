var mongoose = require('mongoose');

// 创建数据库
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser : true})
.then(function(){
	console.log('数据库连接成功！')
}).catch(function(){
	console.log('数据库连接失败！')
});

// 创建集合
var courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	isPublished: Boolean
});
var Course = mongoose.model('Course', courseSchema);

// 创建文档
var course = new Course({
	name: '计算机科学',
	author: 'Jack Zheng',
	isPublished: true
});
course.save();