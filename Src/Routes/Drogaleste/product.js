const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const package = require('../../../package.json');

const config = require('../../../Bin/config.json');
const verifyJWT = require('../../Services/Functions/VerifyJwt');
const execSQLDrogaleste = require('../../Services/Functions/drogalesteConnect'); 
const execSQLDrogalesteHomolog = require('../../Homolog/drogalesteConnectHomolog.js.old'); 
const reportLog = require('../../Services/Functions/reportLog');

/// <summary>
/// Códigos de status HTTP
/// Os seguintes códigos de status 4xx e 5xx indicam um erro:
/// 400: Solicitação incorreta
/// 401: Não autorizado
/// 403: Proibido
/// 404: Não encontrado
/// 405: Método não permitido
/// 406: Não aceitável
/// 408: Tempo limite da solicitação
/// 409: Conflito
/// 412: Falha na pré-condição
/// 429: solicitações em excesso
/// 500: Erro interno do terminal
/// 501: Não implementado
/// 502: Gateway inválido
/// 503: serviço não disponível
/// 504: Tempo limite do gateway
/// </summary> 


//////////////////////////////////////////////////////////////
/////RETORNA LISTA DE ESTOQUE ALTERADO /////////////
//////////////////////////////////////////////////////////////
router.get('/stock/refresh/:loja', verifyJWT, async (req, res, next) => {     

  const {loja, pagenumber, pagerows} = req.params;

  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Produto']
    #swagger.description = 'Obtem array de produtos que sofreram alteração de estoque na data atual'
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
  if(!loja)
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

  if(pagenumber) // Verifica se o parametro é numérico
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

  if(pagerows) // Verifica se o parametro é numérico
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

  reportLog(`Parametro:  *{loja: ${loja}, pageNumber: ${pagina}, pageRows: ${linhas}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PRODUCT_STOCK_GET NULL, ${loja}, 'S'`, res);

}); 


//////////////////////////////////////////////////////////////
/////RETORNA ESTOQUE DO PRODUTO BASEADO POR LOJA /////////////
//////////////////////////////////////////////////////////////
router.get('/stock', verifyJWT, async (req, res, next) => {     
  const {produto, loja, pagenumber, pagerows} = req.headers;

  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Produto']
    #swagger.description = 'Obtem estoque do produto'
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
  if(!loja)// Verifica se o parametro foi informado
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

  if(produto){
    if(!parseInt(produto) || !parseInt(loja)) // Verifica se o parametro é numérico
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

  reportLog(`Parametro:  *{loja: ${loja}, produto: ${produto}, pageNumber: ${pagenumber}, pageRows: ${pagerows}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PRODUCT_STOCK_GET '${produto}', ${loja}, NULL, ${pagina}, ${linhas}`, res);

}); 

///////////////////////////////////////////////////////////////
///////////////// RETORNA CARGA DE PRODUTOS //////////////////
//////////////////////////////////////////////////////////////
router.get('/charge', verifyJWT, async (req, res, next) => {   
  const {pagenumber, pagerows} = req.headers;

  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Produto']
    #swagger.description = 'Obtem array de cadastros de todos os produtos'
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

  reportLog(`Parametro:  *{pageNumber: ${pagina}, pageRows: ${linhas}}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PRODUCT_GET NULL, NULL, 'N', 'JSON', ${pagina}, ${linhas}`, res);

});
  

///////////////////////////////////////////////////////////////
///////// RETORNA ATUALIZAÇÃO DO CADASTRO DOS PRODUTOS ////////
//////////////////////////////////////////////////////////////
router.get('/refreshregistration', verifyJWT, async (req, res, next) => {   

  const {pagenumber, pagerows} = req.headers;
 

  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Produto']
    #swagger.description = 'Obtem array de produtos que sofreram alteração de cadastro na data atual'
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

  reportLog(`Parametro:  *{pageNumber: ${pagina}, pageRows: ${linhas}}`);  


   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PRODUCT_GET NULL, NULL, 'S', 'JSON', ${pagina}, ${linhas}`, res);

});



///////////////////////////////////////////////////////////////
////////////////// RETORNA UM PRODUTO /////////////////////////
//////////////////////////////////////////////////////////////
router.get('/:cod', verifyJWT, async (req, res, next) => {   

  const {cod} = req.params;

  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Produto']
    #swagger.description = 'Obtem detalhes do cadastro de um produto'
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
  let produto = cod;
  let loja = req.headers.loja ? req.headers.loja : 'NULL';

  reportLog(`Parametro:  *{produto: ${produto}}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PRODUCT_GET ${produto}, ${loja}, 'N', 'JSON', NULL, NULL`, res);

}); 
  
module.exports = router; 
