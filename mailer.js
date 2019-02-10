const nodemailer = require('nodemailer');
var decoodeme = require('./decoder');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'kabinad.melaku@gmail.com',
           pass: ''
       }
   });
   const mailOptions = {
    from: 'kabinad.melaku@gmail.com', // sender address
    to: 'kmelaku@mum.edu,kabinad.melaku@outlook.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>'// plain text body
  };
 //console.log(decoodeme("kmelaku@mum.edu","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImttZWxha3VAbXVtLmVkdSIsInRpbWUiOjIwfQ.oCQBGfz5zVykUhDdtwOU9ggRRomSsWFDLkUcEmol6yU"));
 module.exports = transporter;