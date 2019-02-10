const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const questionRouter = require('./routes/questions');
const usersRouter = require('./routes/users');
const answerRouter = require('./routes/answer')
const inviteRouter = require('./routes/invitation');

const app = express();
var db;
mongoose.connect(process.env.DB_URL)
  .then(() => {
    db = mongoose.connection.db;
    
    console.log("Connected to database!");
  })
   .catch((err) => {
    console.log("Connection to database failed!");
    console.log(err);
  });

  // mongoose.connect(process.env.DB_URL)
  //     .then(() => {
  //       console.log("Connected to database!");
  //     })
  //     .catch((err) => {
  //       console.log("Connection to database failed!");
  //       console.log(err);
  //     });

app.set('view engine', 'ejs');
  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(require('./middlewares/authenticate'));


app.use('/',(req,res,next)=>{
  req.db = db;
  next();
});
app.use('/invite', inviteRouter);
app.use('/questions', questionRouter);
app.use('/answer', answerRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
app.listen(4000);

//const PORT = process.env.PORT || 8000;
//app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;