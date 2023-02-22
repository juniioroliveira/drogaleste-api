const express = require('express');
const router = express.Router();
const verifyJWT = require('../../Services/Functions/VerifyJwt');

const execSQLDrogaleste = require('../../Services/Functions/drogalesteConnect');
const reportLog = require('../../Services/Functions/reportLog');

  
//RETORNA DADOS DE UMA LOJA
router.get('/:cod', verifyJWT, async (req, res, next) => {   

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

  reportLog(`Usário:     ${req.email}`);
  reportLog(`Rota:       ${req.method}${req.originalUrl}`);

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_STORE_GET NULL`, res);

});
  
module.exports = router;