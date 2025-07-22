import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import RecordRepository from "../repositories/RecordRepository.js";
import RecordService from "../services/RecordService.js";
import RecordController from "../controllers/RecordController.js";

const recordsRouter = Router();
const recordRepository = new RecordRepository();
const recordService = new RecordService(recordRepository);
const recordController = new RecordController(recordService);

/**
 * @swagger
 * /records/search:
 *   get:
 *     summary: Realiza busca textual nos registros (records) do usuário autenticado
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Palavra-chave para busca textual no campo JSON dos registros
 *         schema:
 *           type: string
 *           example: João
 *     responses:
 *       200:
 *         description: Lista de registros que correspondem à busca
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 records:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       dataset_id:
 *                         type: string
 *                       dados_json:
 *                         type: object
 *                         additionalProperties: true
 *                       criado_em:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Parâmetro de busca ausente
 *       401:
 *         description: Usuário não autorizado
 *       500:
 *         description: Erro interno do servidor
 */

recordsRouter.get('/search', authMiddleware, (req, res) => recordController.queryRecords(req, res));

export default recordsRouter;
