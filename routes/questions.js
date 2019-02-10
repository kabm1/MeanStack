var express = require('express');
var router = express.Router();
const Question = require('../models/questions');
var jwt = require('jwt-simple');

/* GET users listing. */
// router.get('/', function(req, res, next) {

//   const user = new User({
//     firstName: 'Eshetu',
//     lastName: 'Abebe',
//     email: 'eabebe7@mum.edu',
//     password: 'eshie347',
//     previledge: 'ADMIN'
//   });

//   user.save((err, doc) => {
//     if (!err) {
//         console.log('user saved');
//         res.status(200).json({'sucess': 200});
//     } else {
//         console.log("user not saved");
//         // next(err);
//     }
//   });

// });
/*router.get('/', function(req, res, next){
    req.db.collection('questions').find({"active":true}).toArray(function(err, data){
        var q = [];
        var t = [];
        for(let i=0; i< 3; i++){
                let n = Math.floor((Math.random() * data.length) + 0)
                for(let i in t){
                    if( n == t[i]){
                        n = Math.floor((Math.random() * data.length) + 0);
                    }
                }
                t.push(n);
                q.push(data[n]);
               
        }
        //console.log(q); // it will print your collection data
        console.log("here");
        res.send(q);
})});

// return all questions*/
router.get('/all', function(req, res, next){
    req.db.collection('questions').find().toArray(function(err, data){
        console.log("here");
        res.send(data);
})});
/*router.get('/:email/:token',function(req,res){
    
})});*/
router.get('/',function(req,res){
    var secret ='fe1a1915a379f3be5394b64d14794932-1506868106675'
    var payload = jwt.decode(req.query.token, secret);
    var hour = new Date().getHours();
    if(payload.email == req.query.email && hour - payload.time <= 2){
        req.db.collection('invitations').update(
            { "email": req.query.email },
            { $set: { "status": "ANSWERED" } }
         )
    req.db.collection('questions').find({"active":true}).toArray(function(err, data){
        var q = [];
        var t = [];
        for(let i=0; i< 3; i++){
                let n = Math.floor((Math.random() * data.length) + 0)
                for(let i in t){
                    if( n == t[i]){
                        n = Math.floor((Math.random() * data.length) + 0);
                    }
                }
                t.push(n);
                q.push(data[n]);
               
        }
        //console.log(q); // it will print your collection data
        console.log("here");
        res.send(q);
    })}
    else {
        var e = ['can not access question'];
        res.send(e);
                
    }});
   
    
router.post('/add', function(req, res, next) {
  //save
  const questions = new Question();
  questions.question = req.body.question;
  questions.active = req.body.active;

  console.log('preparing to save');
  questions.save((err, doc) => {
      if (!err) {
          console.log('Question saved succesfully');
          res.status(200).json({'sucess': 200});
      } else {
          next(err);
      }
  });
});

module.exports = router;
