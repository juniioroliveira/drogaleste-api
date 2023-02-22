const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const package = require('../../package.json');

const config = require('../../Bin/config.json');
const verifyJWT = require('../Services/Functions/VerifyJwt');
const execSQLDrogaleste = require('../Services/Functions/drogalesteConnect'); 
const reportLog = require('../Services/Functions/reportLog');


router.get('/', verifyJWT, async (req, res, next) => {  

    var path = require('path');
    var file = path.join('C:\\Users\\Junior Oliveira\\Downloads\\', 'heroku-x64.exe');

    res.download(file, function(err){
        if(err){
            console.log('Error');
            console.log(err);
        }else{
            console.log('Sucesso');
        }
    })

});

module.exports = router; 