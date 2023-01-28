const express = require('express');

// App
const app = express();

// Load routes DrogalesteAPI
const drogalesteRoutes = require('./Routes/drogaleste');
app.use('/', drogalesteRoutes);
// const drogalesteRoutes = require('./Routes/drogaleste');
// app.use('/api/drogaleste', drogalesteRoutes);

// Load routes WhitespaceAPI
const whitespaceRoutes = require('./Routes/whitespace');
app.use('/api/whitespace', whitespaceRoutes);

module.exports = app;