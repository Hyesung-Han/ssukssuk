const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'SSukSSuk API',
            version: '1.0.0',
            description: 'SSSS API with express',
        },
        securityDefinitions: {
            jwt: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header'
            }
        },
        security: [
            { jwt: [] }
        ],
        // host: 'localhost:3001',
        // host: '52.79.38.33:8080',
        basePath: '/'
    },
    apis: ['./routes/*.js', './swagger/*']
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};