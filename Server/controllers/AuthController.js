var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

var User = require('../models/User');

router.post('/register', (req, res)=>{
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var userObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        email: req.body.email
    }
    User.create(userObj, (err, user)=>{
        if(err)
            return res.status(500).send('Unable to create user');
        //console.log(user);
        //console.log(config.secretWord);
        var token = jwt.sign({id:user._id}, config.secretWord, {expiresIn:86400});
        res.status(200).send({auth: true, token: token});
    });
});

router.post('/login', (req, res)=>{
    User.findOne({email:req.body.email},  (err, user)=>{
        if(err)
            return res.status(500).send('Error occured');
        if(!user)
            return res.status(404).send('Not Found');
        var isValidUser = bcrypt.compareSync(req.body.password, user.password);
        if(!isValidUser) 
            return res.status(401).send({auth:false, message:'Invalid password'});
        var token = jwt.sign({id:user._id}, config.secretWord, {expiresIn:86400});
        var usr = {
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email
        };
        return res.status(200).send({auth:true, token: token, user: usr});        
    });
});

module.exports = router;