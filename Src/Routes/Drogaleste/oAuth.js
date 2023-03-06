const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../../Bin/config.json');
const execSQLWhiteSpace = require('../../Services/Functions/whitespaceConnect');
const reportLog = require('../../Services/Functions/reportLog');
const errorCode = require('../../Homolog/statesError.json');

  /* DEFINIÇÕES DE DOCUMENTAÇÕES
    #swagger.tags = ['Autenticação']
    #swagger.description = 'Obtem token de acesso que deve ser usado nas demais chamadas.'
    swagger.parameters['cod'] = { 
                                    in: 'headers', 
                                    type: 'integer', 
                                    description: 'código do cliente.', 
                                    required: true
                                  }
    swagger.responses[400] = { 
                                schema: { $ref: "#/definitions/Cliente/purchasehistoric" },
                                description: 'Usuário encontrado.'
                              }
  
                               
  */


router.post('/', async (req, res, next) => {

  /*  #swagger.auto = false
      #swagger.sumary = 'teste sumary'
      #swagger.tags = ['Autenticação']
       swagger.path = '/api/drogaleste/store/{id}'
       swagger.method = 'get'
      #swagger.description = 'Obtem token de acesso que deve ser usado nas demais chamadas.'
      #swagger.produces = ["application/json"]
      #swagger.consumes = ["application/json"]
  */

  /*  #swagger.parameters['User'] = {
          in: 'body',
          required: true,
          type: 'object',
          schema: {
                    clientId: 'string',
                    clientSecret: 'string'
                  }
      }

      
      #swagger.responses[200] = {
                                  description: 'Sucesso',
                                  schema: {
                                    auth: 'boolean',
                                    tokenType: 'string',
                                    accessToken: 'string',
                                    expiresIn: 'integer'
                                  }
                              }
      #swagger.responses[400] = {
                                  description: 'Solicitação inválida',
                                  schema: {
                                    code: 'integer',
                                    process: 'string',
                                    router: 'string',
                                    message: 'string',
                                    ex: 'string'
                                  }
                              }
  */
 
  
  try{     

    reportLog(`Processo:   Gerando token de acesso`);


   //               Verificação de parametros          //
  //////////////////////////////////////////////////////
   const {clientId, clientSecret} = req.body  
  //  console.log(req.body);

    if(!clientId || !clientSecret)
    {
      let error = {
        code: errorCode.SolicitacaoIncorreta,
        process: 'Geração de token',
        router: `${req.method}${req.originalUrl}`,
        message: 'Erro na geração do token',
        ex: 'Existem parametros que não foram informados!',
      }    

      res.status(400).send(error);
      return;
    }

   //               Execução do processo               //
  //////////////////////////////////////////////////////
    var response = await execSQLWhiteSpace(`SELECT API_USUARIO, CLIENT_ID, CLIENT_SECRET, EMAIL FROM DL_APIS_USUARIOS WHERE SITUACAO = 'Ativo' AND CLIENT_ID = '${clientId}' AND CLIENT_SECRET = '${clientSecret}'`);
    

   //               Verificação de retorno             //
  //////////////////////////////////////////////////////
    if(!response){
      let error = {
        code: errorCode.NaoEncontrado,
        process: 'Geração de token',
        router: `${req.method}${req.originalUrl}`,
        message: 'Sem retorno de dados',
        ex: 'Os dados informados não foram encontrados',
      }    

      res.status(404).send(error);
      return;
    }

   //               Resultado final                    //
  //////////////////////////////////////////////////////

    reportLog(`Usário:     ${response.EMAIL}`);
    reportLog(`Rota:       ${req.method}${req.originalUrl}`);

    if(response.API_USUARIO){ 

        const email = response.EMAIL; //esse id viria do banco de dados
        const clientId = response.CLIENT_ID;
        const clientSecret = response.CLIENT_SECRET;
        const user = response.API_USUARIO

        const token = jwt.sign({ user, clientId, email }, config.secretKey, { expiresIn: config.expireToken });

        let objToken = {
          auth: true,
          tokenType: 'bearer',          
          accessToken: token,
          expiresIn: config.expireToken
        }

        reportLog(`Code:       200`);
        reportLog(`Message:    Token gerado com exito`);
        console.log('');
        return res.status(200).json(objToken);      
      
    }else{      

      reportLog(`Status:     Erro na geração do token`);

      let error = {
        code: errorCode.NaoEncontrado,
        process: 'Geração de token',
        router: `${req.method}${req.originalUrl}`,
        message: 'Login inválido',
        ex: 'Ocorreu um erro na validação do login',
      }

      res.status(401).json(error);
    }
   

  }catch(error){
    let mensagem = {
      cod: 404,
      message: 'Login inválido!' 
    }
    res.status(404).json(mensagem);
  }
  
});


  
module.exports = router;