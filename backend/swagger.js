const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
<<<<<<< backend/swagger.js
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
        host: 'i6a103.p.ssafy.io:3001',
        basePath: '/'
  },
  apis: ["./routes/*.js", "./swagger/*"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
