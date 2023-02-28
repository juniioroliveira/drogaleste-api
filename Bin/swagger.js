module.exports = {
    info: {
      version: '1.0.0',
      title: 'Drogaleste API',
      description: 'Documentação da API da Drogaleste',
    },
    host: 'apidrogaleste.ddns.net:7150',
    basePath: '/api',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
      JWT: {
        description: 'JWT token',
        type: 'Bearer',
        in: 'body',
        name: 'Authorization',
      },
    },
    definitions: {
    },
  };