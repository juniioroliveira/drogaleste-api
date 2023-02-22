const express = require('express');
const router = express.Router()
const reportLog = require('../../Services/Functions/reportLog');

const package = require('../../../package.json');

//STATUS API
router.get('/', (req, res, next) => {

  reportLog('Processo: Solicitação de status da api')
    res.status(200).send({
      title: 'Drogaleste-API',
      version: package.version,
      status: 'Operando'
    });
  }); 
  
module.exports = router;


