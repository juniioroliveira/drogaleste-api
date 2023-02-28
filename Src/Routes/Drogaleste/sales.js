const express = require('express');
const router = express.Router();
const package = require('../../../package.json');
const verifyJWT = require('../../Services/Functions/VerifyJwt');

const reportLog = require('../../Services/Functions/reportLog');

const execSQLDrogaleste = require('../../Services/Functions/drogalesteConnect');
const execSQLDrogalesteHomolog = require('../../Homolog/drogalesteConnectHomolog.js.old'); 

//RETORNA VENDAS BASEADAS NO PERIODO E LOJA INFORMDA
router.get('/', verifyJWT, async (req, res, next) => {   
  
  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Venda']
    #swagger.description = 'Obtem array de vendas no periodo informado'
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

  reportLog(`Usário:     ${req.email}`);
  reportLog(`Rota:       ${req.method}${req.originalUrl}`);

   //               Verificação de parametros          //
  //////////////////////////////////////////////////////
  if(!req.headers.loja || !req.headers.movimento)
  {
    let error = {
      code: 400,
      message: 'Erro na identificação dos parametros',
      ex: 'Existem parametros que não foram informados!',
    }    

    res.status(400).send(error);
    reportLog(`Ex:       Erro na definição dos parametros`);
    console.log('');

    return;
  }

   //       Declaração/Validação de parametros         //
  //////////////////////////////////////////////////////  
  let loja = req.headers.loja;
  let movimento = req.headers.movimento;

  let parametroDate = req.headers.movimento.split('/');
  let dd = parametroDate[0];
  let mm = parametroDate[1];
  let yy = parametroDate[2];

  movimento =  `${mm.padStart(2, '0')}-${dd.padStart(2, '0')}-${yy.padStart(4, '0')}`;

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_SALES_GET ${loja}, '${movimento}'`, res);

  });
  

module.exports = router;