var jwt = require('jwt-simple');

function decodeme(email,token){
    var secret ='fe1a1915a379f3be5394b64d14794932-1506868106675'
    var payload = jwt.decode(token, secret);
    var hour = new Date().getHours();
    console.log('questions get');
    
    console.log(hour - payload.time);
    if(payload.email == email && hour - payload.time <= 2){
        return true;
}
return false;
}
module.exports = decodeme;