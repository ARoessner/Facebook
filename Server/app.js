var express = require('express');
var app = express();

var db = require('./db/db');

//Enable CORS and request methods
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
	next();
});
//import controllers here
var AuthController = require('./controllers/AuthController');
app.use('/auth', AuthController);
module.exports = app;