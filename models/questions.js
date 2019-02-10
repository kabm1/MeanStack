const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    question: { type: String, required: true },
    active: { type: Boolean, default: true },
  });


module.exports = mongoose.model('questions', questionSchema);
