import express from 'express';
import userRoutes from './routes/UserRoutes.js';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()
dotenv.config
const port = process.env.PORT || 8080
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
}
const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts']
}
const swaggerJsDoc = swaggerJSDoc(options)

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));


app.get('/', (req, res) => {
    res.status(200).send("Ola mundo")
})

app.listen(port, () => 
    console.log(`Example app listening on port ${port}!\n`)
)

app.use("/users", userRoutes)