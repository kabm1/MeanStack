const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const answerSchema = new Schema({
    question1 :{type: String},
    answer1 : {type: String},
    question2 :{type: String},
    answer2 : {type: String},
    question3 :{type: String},
    answer3 : {type: String},
    
   
});





module.exports = mongoose.model('answer', answerSchema);
