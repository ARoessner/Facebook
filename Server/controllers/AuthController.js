var express = require('express');   //import express
var router = express.Router();      //<--create a route handler
var bodyParser = require('body-parser');//import body parser

var jwt = require('jsonwebtoken');  //import JSON Web Token
var bcrypt = require('bcryptjs');   //import bcrypt
var config = require('../config');  //import config

router.use(bodyParser.urlencoded({extended:true}));//<--tell router to use body parser
router.use(bodyParser.json());//<--parse as json

var User = require('../models/User');//import user model

//register new user
router.post('/register', (req, res)=>{
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);//<--hash password
    var userObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,//<--store hashed password
        email: req.body.email
    }
    User.create(userObj, (err, user)=>{
        if(err)
            return res.status(500).send('Unable to create user');//error
        //console.log(user);
        //console.log(config.secretWord);
        var token = jwt.sign({id:user._id}, config.secretWord, {expiresIn:86400});//<--create json web token
        res.status(200).send({auth: true, token: token});//<--send back jwt
    });
});
//login
router.post('/login', (req, res)=>{
    User.findOne({email:req.body.email},  (err, user)=>{//find user
        if(err)
            return res.status(500).send('Error occured');//error
        if(!user)
            return res.status(404).send('Not Found');//user not found
        var isValidUser = bcrypt.compareSync(req.body.password, user.password);//<--compare hashed passwords
        if(!isValidUser)
            return res.status(401).send({auth:false, message:'Invalid password'});//invalid password 
        var token = jwt.sign({id:user._id}, config.secretWord, {expiresIn:86400});//<--create json web token
        var usr = {//<--user model
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email
        };
        return res.status(200).send({auth:true, token: token, user: usr});//<--send back jwt and usr        
    });
});

module.exports = router;