import { Router } from "express";
import DatasetRepository from "../repositories/DatasetRepository.js";
import DatasetService from "../services/DatasetService.js";
import DatasetController from "../controllers/DatasetController.js";
import { authMiddleware } from "../middlewares/auth.js";

const datasetRouter = Router();
const datasetRepository = new DatasetRepository();
const datasetService = new DatasetService(datasetRepository);
const datasetController = new DatasetController(datasetService);

/**
 * @swagger
 * tags:
 *   - name: Datasets
 *     description: Operações relacionadas a datasets e seus registros
 */

/**
 * @swagger
 * /datasets/{id}/records:
 *   get:
 *     summary: Lista todos os registros de um dataset pelo ID
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do dataset
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de registros do dataset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 records:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Usuário não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
datasetRouter.get('/:id/records', authMiddleware, (req, res) => {
  datasetController.listAllRecordsByDatasetId(req, res);
});

/**
 * @swagger
 * /datasets/upload:
 *   post:
 *     summary: Cria um novo dataset com upload de arquivo
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Meu Dataset"
 *               user_id:
 *                 type: string
 *                 example: "user123"
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Dataset criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dataset:
 *                   type: object
 *                   properties:
 *                     nome:
 *                       type: string
 *                     criado_em:
 *                       type: string
 *                     link:
 *                       type: string
 *                     records:
 *                       type: array
 *                       items:
 *                         type: object
 *       400:
 *         description: Nenhum arquivo enviado
 *       401:
 *         description: Usuário não autorizado
 *       500:
 *         description: Erro interno ao criar dataset
 */
datasetRouter.post('/upload', authMiddleware, (req, res) => datasetController.createDataset(req, res));

/**
 * @swagger
 * /datasets:
 *   get:
 *     summary: Lista todos os datasets do usuário autenticado
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de datasets do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 datasets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nome:
 *                         type: string
 *                       criado_em:
 *                         type: string
 *                       link:
 *                         type: string
 *                       records:
 *                         type: array
 *                         items:
 *                           type: object
 *       401:
 *         description: Usuário não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
datasetRouter.get('/', authMiddleware, (req, res) => datasetController.listAllUsersDatasets(req, res));

export default datasetRouter;
