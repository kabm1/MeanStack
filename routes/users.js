const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

/* GET user profile. */
router.get('/profile', function(req, res, next) {
    User.findOne({email: req.query.email}, (err, profile) => {
        if( !profile) {
            res.status(404).json({
                "status": "fail",
                "message": "No record found"
            });
        } else{
            res.status(200).json(profile);
        }
       
    });

    console.log('user profile');
});

router.post('/update', function(req, res, next) {
    
    User.updateOne({email: req.body.email}, {$set: {active: req.body.active}}, (err, profile) => {
        if (err) console.log('unable to update' + err);
        res.status(200).json(profile);
    });

    console.log('user profile updated');
});

router.get('/list', function(req, res, next) {
    User.find({}, null, { sort: 'firstName' }, (err, users) => {
        if (err) console.log(err)
        res.json(users);
    })

});

router.post('/validateEmail', (req, res) => {
  User.find({email: req.body.email}, (err, users) => {
      console.log(req.body.email);
      if (err) console.dir(err);
      res.status(200).json(users.length > 0);
  });
});

router.post('/signup', (req, res, next) => {
  //save
  let user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.userPassword.password; 
  user.active = req.body.active;
  user.previledge = req.body.previledge;

  console.log('preparing to save');
  user.save((err, doc) => {
      if (!err) {
          console.log('user saved succesfully');
          res.status(200).json({'sucess': 200});
      } else {
          next(err);
      }
  });
});

router.post('/signin', (req, res, next) => {
  let credentials = req.body;

  User.findOne({email: credentials.email}, (err, user) => {
      if (err) next(err);

      //email exists
      if (user) {
          if (!user.verifyPassword(credentials.password)) {
              res.status(400).json({
                  "status": "fail",
                  "message": "Incorrect password!"
              });
          } 
          else if( !user.active) {
            res.status(401).json({
                "status": "fail",
                "message": "Account is deactivated!"
            });
          }else {
              //token key
              const token = jwt.sign({}, RSA_PRIVATE_KEY, {
                  algorithm: 'RS256',
                  expiresIn: 3000,
                  subject: credentials.email
              });

            //   TODO: send token expired
              res.status(200).json(
                {idToken: token, user}
            );
          }
      } else {
          res.status(400).json({
              "status": "fail",
              "message": "username does not exist!"
          });
      }
  });
});

module.exports = router;
