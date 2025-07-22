import { Router } from "express";
import QueryRepository from "../repositories/QueryRepository.js";
import QueryService from "../services/QueryService.js";
import GeminiService from "../services/GeminiService.js";
import QueryController from "../controllers/QueryController.js";
import { authMiddleware } from "../middlewares/auth.js";

const queryRouter = Router()
const queryRepository = new QueryRepository()
const geminiService = new GeminiService()
const queryService = new QueryService(queryRepository, geminiService)
const queryController = new QueryController(queryService)

/**
 * @swagger
 * /queries:
 *   post:
 *     summary: Envia uma pergunta ao modelo de IA (Gemini) e armazena a resposta
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pergunta
 *               - dataset_id
 *             properties:
 *               pergunta:
 *                 type: string
 *                 example: Qual o tipo de vinho mais comum?
 *               dataset_id:
 *                 type: string
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       201:
 *         description: Pergunta registrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 query:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     pergunta:
 *                       type: string
 *                     resposta:
 *                       type: string
 *                     dataset_id:
 *                       type: string
 *                     usuario_id:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Dados ausentes ou inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
queryRouter.post('/', authMiddleware, (req, res)=>queryController.createQuery(req, res))

/**
 * @swagger
 * /queries:
 *   get:
 *     summary: Lista o histórico de perguntas e respostas do usuário autenticado
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Histórico de perguntas retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       pergunta:
 *                         type: string
 *                       resposta:
 *                         type: string
 *                       dataset_id:
 *                         type: string
 *                       usuario_id:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
queryRouter.get('/', authMiddleware, (req, res)=>queryController.getHistory(req, res))

export default queryRouter