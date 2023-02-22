const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit')
const listEndpoints = require('express-list-endpoints')
const app = express();

const  limiter  =  rateLimit ( { 
	windowMs : 1000,//15  *  60  *  1000 ,  // 15 minutos 
	max : 5, //100 ,  // Limita cada IP a 100 solicitações por `janela` (aqui, por 15 minutos ) 
	message: {code: 429, message: 'Too many requests. Please try again later.'},
	standardHeaders : true ,  // Retorna informações de limite de taxa nos cabeçalhos `RateLimit-*` 
	legacyHeaders : false ,  // Desabilita os cabeçalhos `X-RateLimit-*` 
} )

// Aplica o middleware de limitação de taxa a todas as requisições
app.use(limiter)

app.use(bodyParser.json())

//////////////////////// Load route autenticação //////////////////////////
const drogalesteAutentication = require('./Routes/Drogaleste/02 - oAuth')
app.use('/api/oauth', drogalesteAutentication);
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
////////////////////// Load routes DrogalesteAPI //////////////////////////
///////////////////////////////////////////////////////////////////////////
const drogalesteStatus = require('./Routes/Drogaleste/01 - status');
app.use('/api/status', drogalesteStatus);

const drogalesteUser = require('./Routes/Drogaleste/08 - user');
app.use('/api/user', drogalesteUser);

const drogalesteClient = require('./Routes/Drogaleste/04 - client');
app.use('/api/drogaleste/client', drogalesteClient);

const drogalesteProduct = require('./Routes/Drogaleste/05 - product');
app.use('/api/drogaleste/product', drogalesteProduct);

const drogalesteStore = require('./Routes/Drogaleste/03 - store');
app.use('/api/drogaleste/store', drogalesteStore);

const drogalestePromotions = require('./Routes/Drogaleste/06 - promotions');
app.use('/api/drogaleste/promotions', drogalestePromotions);

const drogalesteSales = require('./Routes/Drogaleste/07 - sales');
app.use('/api/drogaleste/sales', drogalesteSales);
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
////////////////////// Load routes maintenance //////////////////////////
///////////////////////////////////////////////////////////////////////////
app.get('/api/drogaleste/about', (req, res, next) => {
	let endpoints = listEndpoints(app);
	console.log(endpoints.path)
    res.status(200).send(endpoints);
  });  

const Download = require('./Homolog/TesteDownload');
app.use('/api/Download', Download);

const testEmail = require('./Homolog/generateCredentials');
app.use('/api/email/', testEmail);


module.exports = app;




