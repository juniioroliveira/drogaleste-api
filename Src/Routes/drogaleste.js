const express = require('express');
const router = express.Router();

const execSQL = require('../Services/FunctionsConnect/drogaleste');

//STATUS API
router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'DrogalesteAPI',
    version: '1.0.0',
    status: 'Operando'
  });
});


//RETORNA DADOS DE UMA LOJA
router.get('/store', async (req, res, next) => {
  var response = await execSQL(`EXEC API_STORE_GET ${0}`)
  res.status(200).send(response);
});

//RETORNA DADOS DE UMA LOJA
router.get('/store/:id', async (req, res, next) => {
  let id = req.params.id;  
  var response = await execSQL(`EXEC API_STORE_GET ${id}`)
  res.status(200).send(response);
});

//RETORNA UM PRODUTO
router.get('/product/:cod', async (req, res, next) => {
  let cod = req.params.cod;
  var response = await execSQL(`EXEC API_PRODUCT_GET ${cod}`)
  res.status(200).send(response);
});

module.exports = router;