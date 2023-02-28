const express = require('express');
const router = express.Router();
const verifyJWT = require('../../Services/Functions/VerifyJwt');

const execSQLDrogaleste = require('../../Services/Functions/drogalesteConnect');
const reportLog = require('../../Services/Functions/reportLog');

  
  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Loja']
    #swagger.description = 'Obtem detalhes de uma loja '
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
 
  
//RETORNA DADOS DE UMA LOJA
router.get('/:cod', verifyJWT, async (req, res, next) => {   
  /*  #swagger.auto = false
      #swagger.sumary = 'teste sumary'
      #swagger.tags = ['Loja']
      swagger.path = '/api/drogaleste/store/{id}'
      swagger.method = 'get'
      #swagger.description = 'Obtem detalhes de uma loja '
      #swagger.produces = ["application/json"]
      #swagger.consumes = ["application/json"]
  */

  /*  #swagger.parameters['cod'] = {
          in: 'path',
          description: 'Código da loja',
          required: true,
          type: 'integer'
      }
      
      #swagger.responses[200] = 'Ok'
  */

  reportLog(`Usário:     ${req.email}`);
  reportLog(`Rota:       ${req.method}${req.originalUrl}`);

   //               Verificação de parametros          //
  //////////////////////////////////////////////////////
  if(!req.params.cod)
  {
    let error = {
      code: 400,
      message: 'Erro na geração do token',
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
  reportLog(`Parametro:*{loja: ${loja}}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_STORE_GET ${loja}`, res);

});

  
//RETORNA DADOS DE UMA LOJA
router.get('/', verifyJWT, async (req, res, next) => {  

  const {loja, matriz} = req.params;
  
  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Loja']
    #swagger.description = 'Obtem array de lojas '
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
                               
  */   

  reportLog(`Usário:     ${req.email}`);
  reportLog(`Rota:       ${req.method}${req.originalUrl}`);

    //               Verificação de parametros          //
  //////////////////////////////////////////////////////

  if(loja) // Verifica se o parametro é numérico
  {
    if(!parseInt(loja))
    {
      let error = {
        code: 400,
        message: 'Erro na paginação',
        ex: 'O parametro *loja informado não foi reconhecido como valor numérico',
      }    
  
      res.status(400).send(error);
      reportLog(`Ex:         O parametro *loja informado não foi reconhecido como valor numérico`);
      console.log('');
  
      return;
    }
  }

  if(matriz) // Verifica se o parametro é numérico
  {
    if(!parseInt(matriz))
    {
      let error = {
        code: 400,
        message: 'Erro na paginação',
        ex: 'O parametro *matriz informado não foi reconhecido como valor numérico',
      }    
  
      res.status(400).send(error);
      reportLog(`Ex:         O parametro *matriz informado não foi reconhecido como valor numérico`);
      console.log('');
  
      return;
    }
  }
  console.log(loja, matriz);

    //       Declaração/Validação de parametros         //
  //////////////////////////////////////////////////////   
  let loj = loja ? loja : 'NULL'; 
  let mat = matriz ? matriz : 'NULL'; 

  reportLog(`Parametro:  *{loja: ${loj}, matriz: ${mat}}`);  

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_STORE_GET ${loj}, ${mat}`, res);

});
  
module.exports = router;