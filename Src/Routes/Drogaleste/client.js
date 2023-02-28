const express = require('express');
const router = express.Router();
const package = require('../../../package.json');

const reportLog = require('../../Services/Functions/reportLog');
const verifyJWT = require('../../Services/Functions/VerifyJwt');
const execSQLDrogaleste = require('../../Services/Functions/drogalesteConnect');
const execSQLDrogalesteHomolog = require('../../Homolog/drogalesteConnectHomolog.js.old'); 

//RETORNA DADOS DE UM CLIENTE
router.get('/purchasehistoric/:cod', verifyJWT, async (req, res, next) => {

  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Cliente']
    #swagger.description = 'Obtem todas as alterações de cadastro de clientes na data atual.'
     swagger.parameters['cod'] = { 
                                    in: 'headers', 
                                    type: 'integer', 
                                    description: 'código do cliente.', 
                                    required: true
                                  }
    swagger.responses[200] = { 
                                schema: { $ref: "#/definitions/Cliente/purchasehistoric" },
                                description: 'Usuário encontrado.'
                              }
                               
  */

  reportLog(`Usário: ${req.email}`);

  let cod = req.params.cod;
    res.status(200).send({
      status: 'Em manutenção',
      version: package.version
    });
  });
  
//RETORNA HISTÓRICO DE COMPRAS
router.get('/:cod', verifyJWT, async (req, res, next) => {   

  const {cod} = req.params;

  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Cliente']
    #swagger.description = 'Obtem informações de um cliente de acordo com os parametros informados.'
     swagger.parameters['cod'] = { 
                                    in: 'headers', 
                                    type: 'integer', 
                                    description: 'código do cliente.', 
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
  if(!cod) // Verifica se o parametro foi informado
  {
    let error = {
      code: 400,
      message: 'Erro na identificação dos parametros',
      ex: 'Existem parametros que não foram informados!',
    }    

    res.status(400).send(error);
    reportLog(`Ex:         Erro na definição dos parametros`);
    console.log('');

    return;
  }

  if(!parseInt(cod)) // Verifica se o parametro é numérico
  {
    let error = {
      code: 400,
      message: 'Erro na validação dos parametros',
      ex: 'O parametro informado não foi reconhecido como valor numérico',
    }    

    res.status(400).send(error);
    reportLog(`Ex:       Erro na definição dos parametros`);
    console.log('');

    return;
  }

   //       Declaração/Validação de parametros         //
  //////////////////////////////////////////////////////  
  let cliente = cod;

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_CLIENT_GET '${cliente}'`, res);
  
});
  
module.exports = router;