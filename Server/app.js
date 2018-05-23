var express = require('express');
var app = express();

var db = require('./db/db');

//import controllers here
var AuthController = require('./controllers/AuthController');
app.use('/auth', AuthController);
module.exports = app;