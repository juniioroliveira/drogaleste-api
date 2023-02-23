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
router.get('/stock/refresh/:cod', verifyJWT, async (req, res, next) => {     

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
  let loja = req.params.cod;
  reportLog(`Parametro:  *{loja: ${loja}}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PRODUCT_STOCK_GET NULL, ${loja}, 'S'`, res);

}); 


//////////////////////////////////////////////////////////////
/////RETORNA ESTOQUE DO PRODUTO BASEADO POR LOJA /////////////
//////////////////////////////////////////////////////////////
router.get('/stock', verifyJWT, async (req, res, next) => {     

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
  await execSQLDrogaleste(`EXEC API_PRODUCT_STOCK_GET '${produto}', ${loja}, 'N'`, res);

}); 

///////////////////////////////////////////////////////////////
///////////////// RETORNA CARGA DE PRODUTOS //////////////////
//////////////////////////////////////////////////////////////
router.get('/charge', verifyJWT, async (req, res, next) => {   

  reportLog(`Usário:     ${req.email}`);
  reportLog(`Rota:       ${req.method}${req.originalUrl}`);

   //               Verificação de parametros          //
  //////////////////////////////////////////////////////
  if(!req.headers.pagenumber || !req.headers.pagerows)
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

  let pagenumber = req.headers.pagenumber;
  let pagerows = req.headers.pagerows;
  reportLog(`Parametro:  *{pageNumber: ${pagenumber}, pageRows: ${pagerows}}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PRODUCT_GET NULL, NULL, 'N', 'JSON', ${pagenumber}, ${pagerows}`, res);

});
  

///////////////////////////////////////////////////////////////
///////// RETORNA ATUALIZAÇÃO DO CADASTRO DOS PRODUTOS ////////
//////////////////////////////////////////////////////////////
router.get('/refreshregistration', verifyJWT, async (req, res, next) => {    

  reportLog(`Usário:     ${req.email}`);
  reportLog(`Rota:       ${req.method}${req.originalUrl}`);

  //       Declaração/Validação de parametros         //
 //////////////////////////////////////////////////////   
 let loja = req.headers.loja ? req.headers.loja : 'NULL'; 

  if(loja === 'NULL'){
    reportLog(`Parametro:  *{loja: ${loja}}`);
  }

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PRODUCT_GET NULL, ${loja}, 'S', 'JSON', NULL, NULL`, res);

});



///////////////////////////////////////////////////////////////
////////////////// RETORNA UM PRODUTO /////////////////////////
//////////////////////////////////////////////////////////////
router.get('/:cod', verifyJWT, async (req, res, next) => {   

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
  let produto = req.params.cod;
  let loja = req.headers.loja ? req.headers.loja : 'NULL';

  reportLog(`Parametro:  *{produto: ${produto}}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_PRODUCT_GET ${produto}, ${loja}, 'N', 'JSON', NULL, NULL`, res);

}); 
  
module.exports = router; 
