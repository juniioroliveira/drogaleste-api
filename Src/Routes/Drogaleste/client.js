const express = require('express');
const router = express.Router();
const package = require('../../../package.json');

const reportLog = require('../../Services/Functions/reportLog');
const verifyJWT = require('../../Services/Functions/VerifyJwt');
const execSQLDrogaleste = require('../../Services/Functions/drogalesteConnect');
const execSQLDrogalesteHomolog = require('../../Homolog/drogalesteConnectHomolog.js.old'); 

//RETORNA DADOS DE UM CLIENTE
router.get('/purchasehistoric/:cod', verifyJWT, async (req, res, next) => {

  reportLog(`Usário: ${req.email}`);

  let cod = req.params.cod;
    res.status(200).send({
      status: 'Em manutenção',
      version: package.version
    });
  });
  
//RETORNA HISTÓRICO DE COMPRAS
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
  let cliente = req.params.cod;

   //               Execução do processo               //
  //////////////////////////////////////////////////////
  await execSQLDrogaleste(`EXEC API_CLIENT_GET '${cliente}'`, res);
  
});
  
module.exports = router;