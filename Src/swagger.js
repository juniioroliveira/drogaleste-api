
const swaggerAutogen = require('swagger-autogen')({ language: 'pt-BR' });

const outputFile = './swagger_output.json'; 
const endpointsFiles = ['./src/index.js']

const doc = {
    info: {
        version: "3.0.0",
        title: "Drogaleste API",
        description: "Documentação para integrações com empresas reservadas <b>swagger-autogen</b> module."
    },
    host: "apidrogaleste.ddns.net:7150",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: "Autenticação",
            description: "Endpoints"
        },
        {
            name: "Produto",
            description: "Endpoints"
        },
        {
            name: "Loja",
            description: "Endpoints"
        },
        {
            name: "Cliente",
            description: "Endpoints"
        },
        {
            name: "Promoção",
            description: "Endpoints"
        },
        {
            name: "Venda",
            description: "Endpoints"
        },
        {
            name: "Delivery",
            description: "Endpoints"
        },
        {
            name: "Estoque",
            description: "Endpoints"
        },
        {
            name: "Carga",
            description: "Endpoints"
        },
        {
            name: "Ferramenta",
            description: "Endpoints"
        },
    ],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "api_key",
            in: "header"
        },
        petstore_auth: {
            type: "oauth2",
            authorizationUrl: "http://apidrogaleste.ddns.net:7150/api/oauth",
            flow: "implicit",
            scopes: {
                read_pets: "read your pets",
                write_pets: "modify pets in your account"
            }
        }
    },
    definitions: {

    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
}) 


///  npm run swagger-autogen
///  rdme swagger swagger_output.json -- github