const moment = require('moment');

function parseOriginArticleArr(articleArr){
	var articles = [];

	for(var i = 0; i < articleArr.length; i++){
		var one = articleArr[i];

		articles.push({
			_id: one._id,
			title: one.title,
			authorname: one.author.username,
			publishDate: parseDate(one.publishDate),
			content: one.content,
			label: one.label
		});
	}
	return articles;
}

function parseDate(originDate){
	const date = new Date(originDate);
	var timeNum = Date.parse(date);
	return moment(timeNum).format('YYYY-MM-DD');
}

module.exports = parseOriginArticleArr