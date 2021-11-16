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

// 创建文档的第二种方式
// Course.create({name: '数学', author: 'jiang hai', isPublished: false}, function(err, doc){
// 	console.log(err);
// 	console.log(doc);
// });

Course.create({name: '语文', author: 'Jack Zheng', isPublished: false})
.then(function(doc){
	console.log(doc);
}).catch(function(err){
	console.log(err);
});