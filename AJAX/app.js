const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/verifyEmailAddress', function(req, res){
	res.send('get email..');
});

app.post('/jsontest',function(req, res){
	res.send(req.body);
});

app.listen(3000);

console.log('server start scussessful!');