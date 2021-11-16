var mongoose = require('mongoose');

// 创建数据库
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser : true})
.then(function(){
	console.log('数据库连接成功！')
}).catch(function(){
	console.log('数据库连接失败！')
});

// 创建集合
var userSchema = new mongoose.Schema({
	name: {
		type:String,
		required:true
	}
});
var User = mongoose.model('User', userSchema);
	
var postSchema = new mongoose.Schema({
	title: {
		type:String
	},
	// 将 author 关联到另外一个集合
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});
var Post = mongoose.model('Post', postSchema);

// // 创建文档
// User.create({name: '语文'}, function(err, doc){
// 	console.log(err);
// 	console.log(doc);
// });

// Post.create({title: '《我的妈妈》', author: '6189156be1c346a928dd59a3'}, function(err, doc){
// 	console.log(err);
// 	console.log(doc);
// });

Post.find().populate('author').then(function(result){
	console.log(result);
});