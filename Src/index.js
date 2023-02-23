const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit')
const listEndpoints = require('express-list-endpoints')

const app = express();


/////////////////Gera documentação Swagger/////////////////////////////////////////////////
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

app.use('/api/document', swaggerUi.serve, swaggerUi.setup(swaggerFile));
//////////////////////////////////////////////////////////////////////////////////////////


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
const drogalesteAutentication = require('./Routes/Drogaleste/oAuth')
app.use('/api/oauth', drogalesteAutentication);
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
////////////////////// Load routes DrogalesteAPI //////////////////////////
///////////////////////////////////////////////////////////////////////////
const drogalesteStatus = require('./Routes/Drogaleste/status');
app.use('/api/status', drogalesteStatus);

const drogalesteUser = require('./Routes/Drogaleste/User');
app.use('/api/user', drogalesteUser);

const drogalesteClient = require('./Routes/Drogaleste/client');
app.use('/api/drogaleste/client', drogalesteClient);

const drogalesteProduct = require('./Routes/Drogaleste/product');
app.use('/api/drogaleste/product', drogalesteProduct);

const drogalesteStore = require('./Routes/Drogaleste/store');
app.use('/api/drogaleste/store', drogalesteStore);

const drogalestePromotions = require('./Routes/Drogaleste/promotions');
app.use('/api/drogaleste/promotions', drogalestePromotions);

const drogalesteSales = require('./Routes/Drogaleste/sales');
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


module.exports = app;




