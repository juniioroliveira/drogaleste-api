const app = require('../Src/index');
const http = require('http');
const debug = require('debug')('nodestr:server');
const config = require('./config.json');


//PORT //based on express-generator
function normalizePort(val){
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }

    if(port >= 0){
        return port
    }

    return false;
}

const port = normalizePort(process.env.PORT || config.porta);
app.set('port', port);

//error handler
function onError(error){
    if(error.syscall !== 'listen'){
        // throw error;
        console.info(error);
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch(error.code){
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
        
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
        
        default:
            // throw error;
            console.info(error);


    }
}

//listener handrler
function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}

//server
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(`API is alive on ${port}!`); 