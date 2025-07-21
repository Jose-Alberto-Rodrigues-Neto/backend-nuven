import express from 'express';
import userRoutes from './routes/UserRoutes.js';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import datasetRouter from './routes/DatasetRoutes.js';
import recordsRouter from './routes/RecordsRoutes.js';

dotenv.config()

const app = express();
const port = process.env.PORT || 8080;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Swagger',
    version: '1.0.0',
    description: 'Documentação das rotas da API',
  },
  servers: [
    {
      url: 'http://localhost:8080',
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
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
}

const swaggerJsDocs = swaggerJSDoc(options);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));
app.use('/users', userRoutes)
app.use('/datasets', datasetRouter)
app.use('/records', recordsRouter)

app.get('/', (req, res) => {
  res.status(200).send('Ola mundo')
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
  console.log(`Swagger UI: http://localhost:${port}/api-docs`)
});
