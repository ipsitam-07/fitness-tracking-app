import swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Fitness Tracking App',
      version: '0.1.0',
      description:
        'This is a simple Fitness Tracking CRUD API application made with Node, Typescript, Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'FitnessTracking',
        url: 'https://fit.com',
        email: 'info@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '65a1f6e031007b00e0057930',
            },
            name: {
              type: 'string',
              example: 'Ipsita Mohanty',
            },
            email: {
              type: 'string',
              example: 'ipsita@test.com',
            },
          },
        },

        RegisterUser: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              example: 'Ipsita',
            },
            email: {
              type: 'string',
              example: 'ipsita@test.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
          },
        },

        LoginUser: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              example: 'ipsita@test.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
          },
        },
      },
    },
  },
  apis: ['dist/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
