var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var answer = require('../models/answer.js');


router.post('/',(req,res)=>{
    answer.create({question1:req.body.question1,answer1:req.body.answer1,question2:req.body.question2,answer2:req.body.answer2,question3:req.body.question3,answer3:req.body.answer3});
    res.status(200);
});

router.get('/all', function(req, res, next){
    req.db.collection('answers').find().toArray(function(err, data){
        console.log("here");
        res.send(data);
})});
module.exports = router;