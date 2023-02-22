const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../../Bin/config.json');
const execSQLWhiteSpace = require('../../Services/Functions/whitespaceConnect');
const reportLog = require('../../Services/Functions/reportLog');
const errorCode = require('../../Homolog/statesError.json');


router.post('/', async (req, res, next) => {
  
  try{     

    reportLog(`Processo:   Gerando token de acesso`);
    // console.log(req.body);

   //               Verificação de parametros          //
  //////////////////////////////////////////////////////
    if(!req.body.clientId || !req.body.clientSecret)
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


   //       Declaração/Validação de parametros         //
  //////////////////////////////////////////////////////      
    var clientId = req.body.clientId;
    var clientSecret = req.body.clientSecret;


   //               Execução do processo               //
  //////////////////////////////////////////////////////
    var response = await execSQLWhiteSpace(`SELECT API_USUARIO, CLIENT_ID, CLIENT_SECRET, EMAIL FROM DL_APIS_USUARIOS WHERE SITUACAO = 'Ativo' AND CLIENT_ID = '${clientId}' AND CLIENT_SECRET = '${clientSecret}'`);
    console.log(response);
    // console.log(`SELECT API_USUARIO, CLIENT_ID, CLIENT_SECRET, EMAIL FROM DL_API_USUARIOS WHERE SITUACAO = 'Ativo' AND CLIENT_ID = '${clientId}' AND CLIENT_SECRET = '${clientSecret}'`);
    

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