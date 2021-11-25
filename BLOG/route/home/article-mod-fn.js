const formidable = require('formidable');
const path = require('path');
const {Article} = require('../../model/article');
const mongoose = require('mongoose');

module.exports = function(req, res){

	const id = req.query.id;

	const form = new formidable.IncomingForm();
	form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
	form.keepExtensions = true;
	
	form.parse(req, async function(err, fields, files){
		console.log(fields);
		
		await Article.updateOne({_id: mongoose.Types.ObjectId(id)},{
			title: fields.title,
			publishDate: fields.publishDate,
			cover: files.cover.filepath.split('public')[1],
			content: fields.content
		});

		// 将文章信息写入数据库
		// await Article.create({
		// 	title: fields.title,
		// 	author: fields.author,
		// 	publishDate: fields.publishDate,
		// 	cover: files.cover.filepath.split('public')[1],
		// 	content: fields.content
		// });
		res.redirect('/admin/article');
	});
}