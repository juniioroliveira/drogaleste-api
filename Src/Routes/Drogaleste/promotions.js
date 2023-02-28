const express = require('express');
const router = express.Router();

const reportLog = require('../../Services/Functions/reportLog');
const verifyJWT = require('../../Services/Functions/VerifyJwt');
const execSQLDrogaleste = require('../../Services/Functions/drogalesteConnect');
const execSQLDrogalesteHomolog = require('../../Homolog/drogalesteConnectHomolog.js.old'); 



//RETORNA PRODUTOS DE ACORDO COM PROMOÇÃO
router.get('/current', verifyJWT, async (req, res, next) => {

  const {promotion, store, pagenumber, pagerows} = req.headers;

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
  if(!promotion || !store)
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

  if(pagenumber ) // Verifica se o parametro é numérico
  {
    if(!parseInt(pagenumber))
    {
      let error = {
        code: 400,
        message: 'Erro na paginação',
        ex: 'O parametro *pageNumber informado não foi reconhecido como valor numérico',
      }    
  
      res.status(400).send(error);
      reportLog(`Ex:         O parametro *pageNumber informado não foi reconhecido como valor numérico`);
      console.log('');
  
      return;
    }
  }
 
  if(pagerows ) // Verifica se o parametro é numérico
  {
    if(!parseInt(pagerows))
    {
      let error = {
        code: 400,
        message: 'Erro na paginação',
        ex: 'O parametro *pageRows informado não foi reconhecido como valor numérico',
      }    
  
      res.status(400).send(error);
      reportLog(`Ex:         O parametro *pageRows informado não foi reconhecido como valor numérico`);
      console.log('');
  
      return;
    }
  }

   //       Declaração/Validação de parametros         //
  //////////////////////////////////////////////////////  
  let pagina = pagenumber ? pagenumber : 'NULL'; 
  let linhas = pagerows ? pagerows : 'NULL'; 

  reportLog(`Parametro:  *{loja: ${store}, promocao: ${promotion}, pageNumber: ${pagina}, pageRows: ${linhas}}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PROMOTIONS_CURRENT_GET NULL, ${store}, NULL, ${promotion}, NULL, NULL, ${pagina}, ${linhas}`, res);

});




// RETORNA LISTA DE CAMPANHAS
router.get('/campaigns', verifyJWT, async (req, res, next) => { 

    const {campaign} = req.headers;
  
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

    //               Verificação de parametros          //
  //////////////////////////////////////////////////////

  if(campaign) // Verifica se o parametro é numérico
  {
    if(!parseInt(campaign))
    {
      let error = {
        code: 400,
        message: 'Erro na paginação',
        ex: 'O parametro *campanha informado não foi reconhecido como valor numérico',
      }    

      res.status(400).send(error);
      reportLog(`Ex:         O parametro *camoanha informado não foi reconhecido como valor numérico`);
      console.log('');

      return;
    }
  }

    //       Declaração/Validação de parametros         //
  //////////////////////////////////////////////////////   
  let cod = campaign ? campaign : 'NULL'; 

  reportLog(`Parametro:  *{campanha: ${cod}}`);  

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PROMOTIONS_CAMPAIGNS_GET ${cod}`, res);
 
});



//RETORNA SUGESTÃO DE PROMOÇÕES BASEADOS NO PRODUTO
router.get('/suggested', verifyJWT, async (req, res, next) => {

  const {product, store} = req.headers;
  
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
  if(!product || !store)
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

  if(product) // Verifica se o parametro é numérico
  {
    if(!parseInt(product))
    {
      let error = {
        code: 400,
        message: 'Erro na paginação',
        ex: 'O parametro *product informado não foi reconhecido como valor numérico',
      }    
  
      res.status(400).send(error);
      reportLog(`Ex:         O parametro *product informado não foi reconhecido como valor numérico`);
      console.log('');
  
      return;
    }
  }

  if(store) // Verifica se o parametro é numérico
  {
    if(!parseInt(store))
    {
      let error = {
        code: 400,
        message: 'Erro na paginação',
        ex: 'O parametro *store informado não foi reconhecido como valor numérico',
      }    
  
      res.status(400).send(error);
      reportLog(`Ex:         O parametro *store informado não foi reconhecido como valor numérico`);
      console.log('');
  
      return;
    }
  }

   //       Declaração/Validação de parametros         //
  //////////////////////////////////////////////////////  
  // let produto = req.headers.produto;
  // let loja = req.headers.loja;
  // reportLog(`Parametro:  *{loja: ${loja}, produto: ${produto}}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PROMOTIONS_CURRENT_GET NULL, ${store}, NULL, NULL, NULL, ${product}`, res);

});  

  
// RETORNA LISTA DE PROMOÇÕES
router.get('/', verifyJWT, async (req, res, next) => { 
  
  const {promotion} = req.headers;
  
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

  //               Verificação de parametros          //
//////////////////////////////////////////////////////

if(promotion) // Verifica se o parametro é numérico
{
  if(!parseInt(promotion))
  {
    let error = {
      code: 400,
      message: 'Erro na paginação',
      ex: 'O parametro *promocao informado não foi reconhecido como valor numérico',
    }    

    res.status(400).send(error);
    reportLog(`Ex:         O parametro *promocao informado não foi reconhecido como valor numérico`);
    console.log('');

    return;
  }
}

  //       Declaração/Validação de parametros         //
//////////////////////////////////////////////////////   
let cod = promotion ? promotion : 'NULL'; 

reportLog(`Parametro:  *{promocao: ${cod}}`);  

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PROMOTIONS_TYPE_GET ${cod}`, res);
});
  
module.exports = router;
