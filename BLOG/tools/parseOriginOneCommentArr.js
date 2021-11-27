const moment = require('moment');

function parseOriginOneCommentArr(comments){

	var resultarr = [];

	for(var i = 0; i < comments.length; i++){
		var one = comments[i];

		resultarr.push({
			_id: one._id,
			aid: one.aid._id,
			authorname: one.uid.username,
			authoremail: one.uid.email,
			time: parseDate(one.time),
			content: one.content
		});

	};
	return resultarr;
}

function parseDate(originDate){
	const date = new Date(originDate);
	var timeNum = Date.parse(date);
	return moment(timeNum).format('YYYY-MM-DD');
}

module.exports = parseOriginOneCommentArr;