var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var invite = require('../models/invitation.js');
var mailer = require('../mailer.js');
var jwt = require('jwt-simple');
const url = require('url');
const RestURLBuilder = require('rest-url-builder');

/* GET home page. */
router.get('/', function(req, res, next) {
    req.db.collection('invitations').find({}).toArray(function(err, data){
        res.send(data);
    })});
router.post('/', function(req, res, next) {
      var today = new Date();
      var hour = today.getHours();
        var payload ={ email:req.body.email, time:hour};
        var secret = 'fe1a1915a379f3be5394b64d14794932-1506868106675'
       var token = jwt.encode(payload,secret);
       
      var urlToBeSent = url.format({
        slashes: true,
        protocol:'http',
        host:'localhost:4200',
      
        pathname:'exam',
        query:{
          email:req.body.email,
          token: token
        }
      });

        var mailOptions = {
            from: 'kabinad.melaku@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Subject of your email', // Subject line
            html: '<a href='+urlToBeSent+'>Click to take Exam</a>'// plain text body
          };
        mailer.sendMail(mailOptions,function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
        console.log(req.body);
        invite.create({email:req.body.email,status:req.body.status});
       
          res.status(200);
      
      });
      
module.exports = router;