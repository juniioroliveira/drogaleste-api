const express = require('express');
const router = express.Router();
const package = require('../../../package.json');
const verifyJWT = require('../../Services/Functions/VerifyJwt');

const reportLog = require('../../Services/Functions/reportLog');

const execSQLDrogaleste = require('../../Services/Functions/drogalesteConnect');
const execSQLDrogalesteHomolog = require('../../Homolog/drogalesteConnectHomolog.js.old'); 

//RETORNA VENDAS BASEADAS NO PERIODO E LOJA INFORMDA
router.get('/', verifyJWT, async (req, res, next) => {   
  
  const {loja, movimento, pagenumber, pagerows} = req.headers;

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
  if(!loja || !movimento)
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

  let parametroDate = movimento.split('/');
  let dd = parametroDate[0];
  let mm = parametroDate[1];
  let yy = parametroDate[2];

  let mov =  `${mm.padStart(2, '0')}-${dd.padStart(2, '0')}-${yy.padStart(4, '0')}`;

  let pagina = pagenumber ? pagenumber : 'NULL'; 
  let linhas = pagerows ? pagerows : 'NULL'; 

  reportLog(`Parametro:  *{loja: ${loja}, movimento: ${mov}, pageNumber: ${pagina}, pageRows: ${linhas}}`);  

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_SALES_GET ${loja}, '${mov}', ${pagina}, ${linhas}`, res);

  });
  

module.exports = router;