const express = require('express');
const router = express.Router()
const reportLog = require('../../Services/Functions/reportLog');

const package = require('../../../package.json');

//STATUS API 
router.get('/', (req, res, next) => {
  
    /* DEFINIÇÕES DE DOCUMENTAÇÕES
      #swagger.tags = ['Delivery']
      #swagger.description = 'Solicita o cadastro de usuário'
       swagger.parameters['produto'] = { 
                                      in: 'headers', 
                                      type: 'integer', 
                                      description: 'código do produto.', 
                                      required: true
                                    }
       swagger.parameters['loja'] = { 
                                      in: 'headers', 
                                      type: 'integer', 
                                      description: 'código da loja.', 
                                      required: true
                                    }
      swagger.responses[200] = { 
                                  schema: { $ref: "#/definitions/Cliente/purchasehistoric" },
                                  description: 'Usuário encontrado.'
                                }
                                 
    */

  reportLog('Processo: Solicitação de status da api')
    res.status(200).send({
      title: 'Drogaleste-API',
      version: package.version,
      status: 'Operando'
    });
  }); 
   
module.exports = router;

