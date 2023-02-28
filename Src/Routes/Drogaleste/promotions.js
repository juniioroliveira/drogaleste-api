const express = require('express');
const router = express.Router();

const reportLog = require('../../Services/Functions/reportLog');
const verifyJWT = require('../../Services/Functions/VerifyJwt');
const execSQLDrogaleste = require('../../Services/Functions/drogalesteConnect');
const execSQLDrogalesteHomolog = require('../../Homolog/drogalesteConnectHomolog.js.old'); 



//RETORNA PRODUTOS DE ACORDO COM PROMOÇÃO
router.get('/current', verifyJWT, async (req, res, next) => {

  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Promoção']
    #swagger.description = 'Obtem array de produtos da promoção recorrente informada '
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
  if(!req.headers.promocao || !req.headers.loja)
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
  let promocao = req.headers.promocao;
  let loja = req.headers.loja;
  reportLog(`Parametro:  *{loja: ${loja}, promocao: ${promocao}}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PROMOTIONS_CURRENT_GET NULL, ${loja}, NULL, ${promocao}, NULL, NULL`, res);

});




// RETORNA LISTA DE CAMPANHAS
router.get('/campaigns', verifyJWT, async (req, res, next) => { 
  
    /* DEFINIÇÕES DE DOCUMENTAÇÕES
      #swagger.tags = ['Promoção']
      #swagger.description = 'Obtem array dos tipos de promoções'
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

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PROMOTIONS_CAMPAIGNS_GET NULL`, res);
 
});



//RETORNA SUGESTÃO DE PROMOÇÕES BASEADOS NO PRODUTO
router.get('/suggested', verifyJWT, async (req, res, next) => {
  
  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Promoção']
    #swagger.description = 'Obtem array de promoções vigentes de um produto'
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
  if(!req.headers.produto || !req.headers.loja)
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
  let produto = req.headers.produto;
  let loja = req.headers.loja;
  reportLog(`Parametro:  *{loja: ${loja}, produto: ${produto}}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PROMOTIONS_CURRENT_GET NULL, ${loja}, NULL, NULL, NULL, ${produto}`, res);

});


  
// RETORNA PROMOÇÃO ESPECIFICA
router.get('/:cod', verifyJWT, async (req, res, next) => {
  
  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Promoção']
    #swagger.description = 'Obtem detalhes de uma promoção especifica'
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
  if(!req.params.cod)
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
  let promocao = req.params.cod;
  reportLog(`Parametro:  *{promocao: ${promocao}}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PROMOTIONS_TYPE_GET ${promocao}`, res);
  
});

  ///////////////////////////////////////////////////////////////////////////////////////

  
// RETORNA LISTA DE PROMOÇÕES
router.get('/', verifyJWT, async (req, res, next) => {  
  
  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Promoção']
    #swagger.description = 'Obtem array dos tipos de promoções'
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

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PROMOTIONS_TYPE_GET NULL`, res);
});
  
module.exports = router;
