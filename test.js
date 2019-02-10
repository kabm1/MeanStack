 const URLService= require('./web/src/app/services/user.service.ts');


 var u = new URLService();
 console.log(u.getUsers('kjkjkj','k;kj;;kj'));
/*var urlBuilder = new RestURLBuilder();
RestURLBuilder.buildRestURL('http://localhost:4200/exam/');
RestURLBuilder.setNamedParameter('email','req.body.email');
RestURLBuilder.setNamedParameter('token','dfdfsdfadfadsfadsf');
console.log(RestURLBuilderr.get());*/