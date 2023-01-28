const express = require('express');
// const teste = require('../Domain/testeGet');
const router = express.Router();

//STATUS API
router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'WhitespaceAPI',
    version: '1.0.0',
    status: 'Operando'
  });
});

router.get('/teste', (req, res, next) => {
    res.status(200).send('teste(deu ruim)');
});

module.exports = router;