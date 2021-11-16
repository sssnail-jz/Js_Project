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

var resultArr = Course.find().then(function(result){
	console.log(result);
});

var result = Course.find({_id: '6188eb680c9b52b0b253e791'}).then(function(result){
	console.log(result);
});