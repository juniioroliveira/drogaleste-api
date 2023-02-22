const jwt = require('jsonwebtoken');
const config = require('../../../Bin/config.json');
const reportLog = require('../../Services/Functions/reportLog');
// const SECRET = 'junioroliveira';
function verifyJWT(req, res, next){
   
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];


    reportLog(`Processo:   Verificando autorização`);

    jwt.verify(bearerToken, config.secretKey, function(err, decoded){
      if(err){
        reportLog(`Processo:   O token fornecido não foi autorizado`);
        console.log('');
        return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });          
      }else{    
        req.user = decoded.user;
        req.token = bearerToken;
        req.email = decoded.email;
        next();
      }
    })

  }else{
    res.sendStatus(403);
  }
        
}

module.exports = verifyJWT; 