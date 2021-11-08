var fs = require('fs');

var promise = new Promise(function(resolve, reject){
	fs.readFile('test.txt', 'utf8', function(error, result){
		if(error != null){
			reject(error);
		}
		else{
			resolve(result);
		}
	});
});

promise.then(function(result){
	console.log(result);
}).catch(function(error){
	console.log(error);
});