const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/first', function(req, res){
	res.send('hello ajax');
});

app.post('/jsontest',function(req, res){
	res.send(req.body);
});

app.listen(3000);

console.log('server start scussessful!');