const mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
	title: {
		type: String,
		maxlength: 60,
		minlength: 1,
		required: [true, '请填写文章标题']
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, '请传递作者']
	},
	publishDate: {
		type: Date,
		default: Date.now
	},
	cover: {
		type: String,
		default: null
	},
	content: {
		type: String
	}
});

var Article = mongoose.model('Article', articleSchema);

module.exports = {
	Article
}