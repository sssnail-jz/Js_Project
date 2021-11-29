const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const formidable = require('formidable');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/verifyEmailAddress', function(req, res){
	res.send('get email..');
});

app.post('/FormData', function(req, res){
	const form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		console.log(fields);
		res.send(fields);
	})
});

app.post('/upload', function(req, res){
	const form = new formidable.IncomingForm();
	form.uploadDir = path.join(__dirname, 'public', 'uploads');
	form.keepExtensions = true;
	form.parse(req, function(err, fields, files){
		res.send('ok');
	})
});

app.listen(3000);

console.log('server start scussessful!');